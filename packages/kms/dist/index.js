// src/errors.ts
var CloudError = class extends Error {
  constructor(message, cloud, service, operation) {
    super(message);
    this.cloud = cloud;
    this.service = service;
    this.operation = operation;
    this.name = this.constructor.name;
  }
  cloud;
  service;
  operation;
};
var CloudNotConfiguredError = class extends CloudError {
  constructor(cloud, service) {
    super(`Cloud not configured: ${cloud}`, cloud, service, "init");
  }
};
var InvalidCloudError = class extends CloudError {
  constructor(cloud, service) {
    super(`Invalid cloud provider: ${cloud}. Must be 'aws', 'gcp', or 'azure'`, cloud, service, "init");
  }
};
var AuthError = class extends CloudError {
  constructor(cloud, service, operation, message) {
    super(message ?? `Authentication failed for ${service}`, cloud, service, operation);
  }
};
var TimeoutError = class extends CloudError {
  constructor(cloud, service, operation) {
    super(`Operation timed out: ${operation}`, cloud, service, operation);
  }
};
var ValidationError = class extends CloudError {
  constructor(cloud, service, operation, message) {
    super(message, cloud, service, operation);
  }
};
var NotImplementedError = class extends CloudError {
  constructor(cloud, service, operation) {
    super(`Operation not implemented for ${cloud} ${service}: ${operation}`, cloud, service, operation);
  }
};

// src/resolver.ts
function resolveCloud(config, service) {
  if (config.cloud) {
    if (config.cloud !== "aws" && config.cloud !== "gcp" && config.cloud !== "azure") {
      throw new InvalidCloudError(config.cloud, service);
    }
    return config.cloud;
  }
  const env = process.env["CLOUD_PROVIDER"]?.toLowerCase();
  if (env === "aws" || env === "gcp" || env === "azure") {
    return env;
  }
  throw new CloudNotConfiguredError(config.cloud ?? "undefined", service);
}

// src/aws.strategy.ts
import {
  KMSClient,
  EncryptCommand,
  DecryptCommand,
  CreateKeyCommand,
  ScheduleKeyDeletionCommand
} from "@aws-sdk/client-kms";

// src/retry.ts
async function withRetry(fn, options) {
  const maxRetries = options?.maxRetries ?? 3;
  const baseDelayMs = options?.baseDelayMs ?? 100;
  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < maxRetries) {
        const delay = baseDelayMs * Math.pow(2, attempt) + Math.random() * baseDelayMs;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
}

// src/aws.strategy.ts
var AwsKmsStrategy = class {
  client;
  retryConfig;
  constructor(config) {
    resolveCloud(config, "kms");
    this.client = new KMSClient({ region: config.region ?? "us-east-1", ...config.config });
    this.retryConfig = {
      maxRetries: config.config?.["maxRetries"] ?? 3,
      baseDelayMs: config.config?.["baseDelayMs"] ?? 100
    };
  }
  async encrypt(keyId, plaintext, context) {
    const result = await withRetry(() => this.client.send(new EncryptCommand({
      KeyId: keyId,
      Plaintext: typeof plaintext === "string" ? Buffer.from(plaintext) : plaintext,
      EncryptionContext: context
    })), this.retryConfig);
    return {
      ciphertext: Buffer.from(result.CiphertextBlob),
      keyId: result.KeyId ?? keyId,
      encryptionAlgorithm: result.EncryptionAlgorithm
    };
  }
  async decrypt(keyId, ciphertext, context) {
    const result = await withRetry(() => this.client.send(new DecryptCommand({
      KeyId: keyId,
      CiphertextBlob: ciphertext,
      EncryptionContext: context
    })), this.retryConfig);
    return {
      plaintext: Buffer.from(result.Plaintext),
      keyId: result.KeyId ?? keyId
    };
  }
  async createKey(alias, options) {
    const result = await withRetry(() => this.client.send(new CreateKeyCommand({
      Description: options?.description,
      Tags: options?.tags ? Object.entries(options.tags).map(([TagKey, TagValue]) => ({ TagKey, TagValue })) : void 0
    })), this.retryConfig);
    return {
      keyId: result.KeyMetadata?.KeyId ?? "",
      arn: result.KeyMetadata?.Arn ?? "",
      alias,
      created: result.KeyMetadata?.CreationDate ?? /* @__PURE__ */ new Date(),
      enabled: result.KeyMetadata?.Enabled ?? true
    };
  }
  async scheduleKeyDeletion(keyId, windowDays) {
    const result = await withRetry(() => this.client.send(new ScheduleKeyDeletionCommand({
      KeyId: keyId,
      PendingWindowInDays: windowDays ?? 30
    })), this.retryConfig);
    return result.DeletionDate ?? /* @__PURE__ */ new Date();
  }
};

// src/gcp.strategy.ts
import { KeyManagementServiceClient } from "@google-cloud/kms";
var GcpKmsStrategy = class {
  client;
  project;
  location;
  retryConfig;
  constructor(config) {
    resolveCloud(config, "kms");
    this.client = new KeyManagementServiceClient(config.config);
    this.project = config.config?.["projectId"] ?? config.config?.["project"] ?? "unknown";
    this.location = config.config?.["location"] ?? "global";
    this.retryConfig = {
      maxRetries: config.config?.["maxRetries"] ?? 3,
      baseDelayMs: config.config?.["baseDelayMs"] ?? 100
    };
  }
  retry(fn) {
    return withRetry(fn, this.retryConfig);
  }
  keyRingPath() {
    return this.client.keyRingPath(this.project, this.location, "agnostic-cloud");
  }
  cryptoKeyPath(keyId) {
    const parts = keyId.includes("/") ? keyId.split("/") : [keyId];
    const shortName = parts[parts.length - 1] ?? keyId;
    return this.client.cryptoKeyPath(this.project, this.location, "agnostic-cloud", shortName);
  }
  async encrypt(keyId, plaintext, context) {
    const [result] = await this.retry(() => this.client.encrypt({
      name: this.cryptoKeyPath(keyId),
      plaintext: typeof plaintext === "string" ? Buffer.from(plaintext) : plaintext,
      additionalAuthenticatedData: context ? Buffer.from(JSON.stringify(context)) : void 0
    }));
    return {
      ciphertext: Buffer.from(result.ciphertext),
      keyId
    };
  }
  async decrypt(_keyId, ciphertext, context) {
    const [result] = await this.retry(() => this.client.decrypt({
      ciphertext,
      additionalAuthenticatedData: context ? Buffer.from(JSON.stringify(context)) : void 0
    }));
    return {
      plaintext: Buffer.from(result.plaintext),
      keyId: ""
    };
  }
  async createKey(alias, options) {
    const [key] = await this.retry(() => this.client.createCryptoKey({
      parent: this.keyRingPath(),
      cryptoKeyId: alias,
      cryptoKey: {
        purpose: "ENCRYPT_DECRYPT",
        versionTemplate: { algorithm: "GOOGLE_SYMMETRIC_ENCRYPTION" },
        labels: options?.tags
      }
    }));
    return {
      keyId: alias,
      arn: key.name ?? "",
      alias,
      created: fromTimestamp(key.createTime),
      enabled: key.primary?.state === "ENABLED"
    };
  }
  async scheduleKeyDeletion(keyId, windowDays) {
    const [result] = await this.retry(() => this.client.destroyCryptoKeyVersion({
      name: `${this.cryptoKeyPath(keyId)}/cryptoKeyVersions/1`
    }));
    return new Date(Date.now() + (windowDays ?? 30) * 864e5);
  }
};
function fromTimestamp(ts) {
  if (!ts) return /* @__PURE__ */ new Date();
  const seconds = typeof ts.seconds === "number" ? ts.seconds : Number(ts.seconds ?? 0);
  return new Date(seconds * 1e3);
}

// src/azure.strategy.ts
import { KeyClient, CryptographyClient } from "@azure/keyvault-keys";
import { DefaultAzureCredential } from "@azure/identity";
var AzureKmsStrategy = class {
  client;
  vaultUrl;
  credential;
  clientOptions;
  retryConfig;
  constructor(config) {
    resolveCloud(config, "keyvault");
    this.vaultUrl = config.config?.["vaultUrl"] ?? `https://${config.config?.["vaultName"] ?? "default"}.vault.azure.net`;
    this.credential = config.config?.["credential"] ?? new DefaultAzureCredential();
    this.clientOptions = config.config ?? {};
    this.client = new KeyClient(this.vaultUrl, this.credential, config.config);
    this.retryConfig = {
      maxRetries: config.config?.["maxRetries"] ?? 3,
      baseDelayMs: config.config?.["baseDelayMs"] ?? 100
    };
  }
  retry(fn) {
    return withRetry(fn, this.retryConfig);
  }
  cryptoClient(keyId) {
    return new CryptographyClient(keyId.startsWith("https://") ? keyId : `${this.vaultUrl}/keys/${keyId}`, this.credential, this.clientOptions);
  }
  async encrypt(keyId, plaintext, _context) {
    const data = typeof plaintext === "string" ? Buffer.from(plaintext) : plaintext;
    const encryptResult = await this.retry(() => this.cryptoClient(keyId).encrypt("RSA-OAEP", data));
    return {
      ciphertext: Buffer.from(encryptResult.result),
      keyId: encryptResult.keyID ?? keyId
    };
  }
  async decrypt(_keyId, ciphertext, _context) {
    const decryptResult = await this.retry(() => this.cryptoClient(_keyId).decrypt("RSA-OAEP", ciphertext));
    return {
      plaintext: Buffer.from(decryptResult.result),
      keyId: decryptResult.keyID ?? ""
    };
  }
  async createKey(alias, options) {
    const key = await this.retry(() => this.client.createKey(alias, "RSA", {
      keyOps: ["encrypt", "decrypt", "wrapKey", "unwrapKey"],
      keySize: 2048,
      tags: options?.tags
    }));
    return {
      keyId: key.id ?? alias,
      arn: key.id ?? "",
      alias,
      created: key.properties.createdOn ?? /* @__PURE__ */ new Date(),
      enabled: key.properties.enabled ?? true
    };
  }
  async scheduleKeyDeletion(keyId, windowDays) {
    const result = await this.retry(() => this.client.beginDeleteKey(keyId));
    const deletedKey = await result.pollUntilDone();
    const scheduledDate = deletedKey.properties.scheduledPurgeDate ?? new Date(Date.now() + (windowDays ?? 30) * 864e5);
    return scheduledDate;
  }
};

// src/index.ts
var strategyRegistry = {
  aws: AwsKmsStrategy,
  gcp: GcpKmsStrategy,
  azure: AzureKmsStrategy
};
function createKms(config) {
  const cloud = resolveCloud(config, "kms");
  const Strategy = strategyRegistry[cloud];
  if (!Strategy) throw new InvalidCloudError(cloud, "kms");
  return new Strategy(config);
}
export {
  AuthError,
  CloudError,
  CloudNotConfiguredError,
  InvalidCloudError,
  NotImplementedError,
  TimeoutError,
  ValidationError,
  createKms
};
//# sourceMappingURL=index.js.map