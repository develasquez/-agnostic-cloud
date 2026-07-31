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
var SecretNotFoundError = class extends CloudError {
  constructor(cloud, service, name) {
    super(`Secret not found: ${name}`, cloud, service, "getSecret");
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
  SecretsManagerClient,
  GetSecretValueCommand,
  CreateSecretCommand,
  UpdateSecretCommand,
  DeleteSecretCommand,
  ListSecretsCommand
} from "@aws-sdk/client-secrets-manager";

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
var AwsSecretsStrategy = class {
  client;
  retryConfig;
  constructor(config) {
    resolveCloud(config, "secrets-manager");
    this.client = new SecretsManagerClient({ region: config.region ?? "us-east-1", ...config.config });
    this.retryConfig = {
      maxRetries: config.config?.["maxRetries"] ?? 3,
      baseDelayMs: config.config?.["baseDelayMs"] ?? 100
    };
  }
  async getSecret(name) {
    try {
      const result = await withRetry(() => this.client.send(new GetSecretValueCommand({ SecretId: name })), this.retryConfig);
      return {
        name: result.Name ?? name,
        value: result.SecretString ?? "",
        versionId: result.VersionId,
        created: result.CreatedDate ?? /* @__PURE__ */ new Date(),
        lastModified: result.CreatedDate ?? /* @__PURE__ */ new Date()
      };
    } catch (err) {
      if (err.name === "ResourceNotFoundException") throw new SecretNotFoundError("aws", "secrets-manager", name);
      if (err.name === "CredentialsProviderError") throw new AuthError("aws", "secrets-manager", "getSecret");
      throw err;
    }
  }
  async createSecret(name, value, options) {
    const result = await withRetry(() => this.client.send(new CreateSecretCommand({
      Name: name,
      SecretString: value,
      Description: options?.description,
      Tags: options?.tags ? Object.entries(options.tags).map(([Key, Value]) => ({ Key, Value })) : void 0
    })), this.retryConfig);
    return {
      name: result.Name ?? name,
      arn: result.ARN,
      created: /* @__PURE__ */ new Date()
    };
  }
  async updateSecret(name, value) {
    const result = await withRetry(() => this.client.send(new UpdateSecretCommand({
      SecretId: name,
      SecretString: value
    })), this.retryConfig);
    return {
      name: result.Name ?? name,
      arn: result.ARN,
      created: /* @__PURE__ */ new Date()
    };
  }
  async deleteSecret(name, options) {
    await withRetry(() => this.client.send(new DeleteSecretCommand({
      SecretId: name,
      RecoveryWindowInDays: options?.recoveryWindowDays ?? 30,
      ForceDeleteWithoutRecovery: options?.forceDelete
    })), this.retryConfig);
  }
  async listSecrets(options) {
    const result = await withRetry(() => this.client.send(new ListSecretsCommand({
      MaxResults: options?.maxResults,
      NextToken: options?.nextToken
    })), this.retryConfig);
    return {
      secrets: (result.SecretList ?? []).map((s) => ({
        name: s.Name,
        arn: s.ARN,
        created: s.CreatedDate ?? /* @__PURE__ */ new Date()
      })),
      nextToken: result.NextToken
    };
  }
};

// src/gcp.strategy.ts
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
var GcpSecretsStrategy = class {
  client;
  project;
  maxRetries;
  baseDelayMs;
  constructor(config) {
    resolveCloud(config, "secret-manager");
    this.client = new SecretManagerServiceClient(config.config);
    this.project = config.config?.["projectId"] ?? config.config?.["project"] ?? "unknown";
    this.maxRetries = config.config?.["maxRetries"] ?? 3;
    this.baseDelayMs = config.config?.["baseDelayMs"] ?? 100;
  }
  parent() {
    return `projects/${this.project}`;
  }
  secretPath(name) {
    return `${this.parent()}/secrets/${name}`;
  }
  versionPath(name, version = "latest") {
    return `${this.secretPath(name)}/versions/${version}`;
  }
  retry(fn) {
    return withRetry(fn, { maxRetries: this.maxRetries, baseDelayMs: this.baseDelayMs });
  }
  async getSecret(name) {
    try {
      const [version] = await this.retry(() => this.client.accessSecretVersion({ name: this.versionPath(name) }));
      const [secret] = await this.retry(() => this.client.getSecret({ name: this.secretPath(name) }));
      return {
        name,
        value: version.payload?.data?.toString() ?? "",
        created: fromTimestamp(secret.createTime),
        lastModified: fromTimestamp(secret.createTime)
      };
    } catch (err) {
      if (err.code === 5 || err.code === 404) throw new SecretNotFoundError("gcp", "secret-manager", name);
      if (err.code === 7 || err.code === 16) throw new AuthError("gcp", "secret-manager", "getSecret");
      throw err;
    }
  }
  async createSecret(name, value, options) {
    const [secret] = await this.retry(() => this.client.createSecret({
      parent: this.parent(),
      secretId: name,
      secret: {
        replication: { automatic: {} },
        labels: options?.tags
      }
    }));
    await this.retry(() => this.client.addSecretVersion({
      parent: secret.name,
      payload: { data: Buffer.from(value) }
    }));
    return {
      name,
      arn: secret.name ?? void 0,
      created: fromTimestamp(secret.createTime)
    };
  }
  async updateSecret(name, value) {
    const [secret] = await this.retry(() => this.client.getSecret({ name: this.secretPath(name) }));
    await this.retry(() => this.client.addSecretVersion({
      parent: secret.name,
      payload: { data: Buffer.from(value) }
    }));
    return {
      name,
      arn: secret.name ?? void 0,
      created: fromTimestamp(secret.createTime)
    };
  }
  async deleteSecret(name, _options) {
    try {
      await this.retry(() => this.client.deleteSecret({ name: this.secretPath(name) }));
    } catch (err) {
      if (err.code === 5) return;
      throw err;
    }
  }
  async listSecrets(options) {
    const [secrets] = await this.retry(() => this.client.listSecrets({
      parent: this.parent(),
      pageSize: options?.maxResults
    }));
    return {
      secrets: secrets.map((s) => ({
        name: s.name?.split("/").pop() ?? "",
        arn: s.name ?? void 0,
        created: fromTimestamp(s.createTime)
      }))
    };
  }
};
function fromTimestamp(ts) {
  if (!ts) return /* @__PURE__ */ new Date();
  const seconds = typeof ts.seconds === "number" ? ts.seconds : Number(ts.seconds ?? 0);
  return new Date(seconds * 1e3);
}

// src/azure.strategy.ts
import { SecretClient } from "@azure/keyvault-secrets";
import { DefaultAzureCredential } from "@azure/identity";
var AzureSecretsStrategy = class {
  client;
  vaultUrl;
  maxRetries;
  baseDelayMs;
  constructor(config) {
    resolveCloud(config, "keyvault");
    this.vaultUrl = config.config?.["vaultUrl"] ?? `https://${config.config?.["vaultName"] ?? "default"}.vault.azure.net`;
    const credential = config.config?.["credential"] ?? new DefaultAzureCredential();
    this.client = new SecretClient(this.vaultUrl, credential, config.config);
    this.maxRetries = config.config?.["maxRetries"] ?? 3;
    this.baseDelayMs = config.config?.["baseDelayMs"] ?? 100;
  }
  retry(fn) {
    return withRetry(fn, { maxRetries: this.maxRetries, baseDelayMs: this.baseDelayMs });
  }
  async getSecret(name) {
    try {
      const secret = await this.retry(() => this.client.getSecret(name));
      return {
        name: secret.name ?? name,
        value: secret.value ?? "",
        versionId: secret.properties.version,
        created: secret.properties.createdOn ?? /* @__PURE__ */ new Date(),
        lastModified: secret.properties.updatedOn ?? /* @__PURE__ */ new Date()
      };
    } catch (err) {
      if (err.statusCode === 404) throw new SecretNotFoundError("azure", "keyvault", name);
      if (err.statusCode === 403) throw new AuthError("azure", "keyvault", "getSecret");
      throw err;
    }
  }
  async createSecret(name, value, options) {
    const secret = await this.retry(() => this.client.setSecret(name, value, {
      tags: options?.tags
    }));
    return {
      name: secret.name ?? name,
      created: secret.properties.createdOn ?? /* @__PURE__ */ new Date()
    };
  }
  async updateSecret(name, value) {
    const secret = await this.retry(() => this.client.setSecret(name, value));
    return {
      name: secret.name ?? name,
      created: secret.properties.createdOn ?? /* @__PURE__ */ new Date()
    };
  }
  async deleteSecret(name, _options) {
    try {
      const poller = await this.retry(() => this.client.beginDeleteSecret(name));
      await poller.pollUntilDone();
    } catch (err) {
      if (err.statusCode === 404) return;
      throw err;
    }
  }
  async listSecrets(options) {
    const secrets = await this.retry(async () => {
      const results = [];
      let count = 0;
      for await (const secret of this.client.listPropertiesOfSecrets()) {
        results.push({
          name: secret.name,
          created: secret.createdOn ?? /* @__PURE__ */ new Date()
        });
        count++;
        if (options?.maxResults && count >= options.maxResults) break;
      }
      return results;
    });
    return { secrets };
  }
};

// src/index.ts
var strategyRegistry = {
  aws: AwsSecretsStrategy,
  gcp: GcpSecretsStrategy,
  azure: AzureSecretsStrategy
};
function createSecrets(config) {
  const cloud = resolveCloud(config, "secrets");
  const Strategy = strategyRegistry[cloud];
  if (!Strategy) throw new InvalidCloudError(cloud, "secrets");
  return new Strategy(config);
}
export {
  AuthError,
  CloudError,
  CloudNotConfiguredError,
  InvalidCloudError,
  NotImplementedError,
  SecretNotFoundError,
  TimeoutError,
  ValidationError,
  createSecrets
};
//# sourceMappingURL=index.js.map