"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AuthError: () => AuthError,
  CloudError: () => CloudError,
  CloudNotConfiguredError: () => CloudNotConfiguredError,
  InvalidCloudError: () => InvalidCloudError,
  NotImplementedError: () => NotImplementedError,
  ObjectNotFoundError: () => ObjectNotFoundError,
  TimeoutError: () => TimeoutError,
  ValidationError: () => ValidationError,
  createStorage: () => createStorage
});
module.exports = __toCommonJS(index_exports);

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
var ObjectNotFoundError = class extends CloudError {
  constructor(cloud, service, bucket, key) {
    super(`Object not found: ${bucket}/${key}`, cloud, service, "getObject");
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

// src/s3.strategy.ts
var import_client_s3 = require("@aws-sdk/client-s3");

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

// src/s3.strategy.ts
var S3StorageStrategy = class {
  client;
  retryConfig;
  constructor(config) {
    resolveCloud(config, "s3");
    this.client = new import_client_s3.S3Client({
      region: config.region ?? "us-east-1",
      ...config.config
    });
    this.retryConfig = {
      maxRetries: config.config?.["maxRetries"] ?? 3,
      baseDelayMs: config.config?.["baseDelayMs"] ?? 100
    };
  }
  parseBucket(bucket) {
    return bucket.replace(/^s3:\/\//, "");
  }
  async putObject(bucket, key, data, options) {
    const cmd = new import_client_s3.PutObjectCommand({
      Bucket: this.parseBucket(bucket),
      Key: key,
      Body: data,
      ContentType: options?.contentType,
      Metadata: options?.metadata,
      CacheControl: options?.cacheControl
    });
    try {
      const result = await withRetry(() => this.client.send(cmd), this.retryConfig);
      return {
        etag: result.ETag?.replace(/"/g, "") ?? "",
        versionId: result.VersionId
      };
    } catch (err) {
      if (err.name === "CredentialsProviderError") throw new AuthError("aws", "s3", "putObject");
      throw err;
    }
  }
  async getObject(bucket, key) {
    try {
      const result = await withRetry(() => this.client.send(new import_client_s3.GetObjectCommand({
        Bucket: this.parseBucket(bucket),
        Key: key
      })), this.retryConfig);
      const stream = result.Body;
      const chunks = [];
      for await (const chunk of stream) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }
      return {
        data: Buffer.concat(chunks),
        contentType: result.ContentType,
        metadata: result.Metadata,
        etag: result.ETag?.replace(/"/g, ""),
        lastModified: result.LastModified
      };
    } catch (err) {
      if (err.name === "NoSuchKey") throw new ObjectNotFoundError("aws", "s3", bucket, key);
      if (err.name === "CredentialsProviderError") throw new AuthError("aws", "s3", "getObject");
      throw err;
    }
  }
  async getObjectStream(_bucket, _key) {
    throw new NotImplementedError("aws", "s3", "getObjectStream");
  }
  async listObjects(bucket, options) {
    const result = await withRetry(() => this.client.send(new import_client_s3.ListObjectsV2Command({
      Bucket: this.parseBucket(bucket),
      Prefix: options?.prefix,
      MaxKeys: options?.maxKeys,
      StartAfter: options?.startAfter
    })), this.retryConfig);
    const objects = (result.Contents ?? []).map((obj) => ({
      key: obj.Key,
      size: obj.Size,
      etag: obj.ETag?.replace(/"/g, "") ?? "",
      lastModified: obj.LastModified
    }));
    return {
      objects,
      isTruncated: result.IsTruncated ?? false,
      nextContinuationToken: result.NextContinuationToken
    };
  }
  async deleteObject(bucket, key) {
    await withRetry(() => this.client.send(new import_client_s3.DeleteObjectCommand({
      Bucket: this.parseBucket(bucket),
      Key: key
    })), this.retryConfig);
  }
  async existsObject(bucket, key) {
    try {
      await withRetry(() => this.client.send(new import_client_s3.HeadObjectCommand({
        Bucket: this.parseBucket(bucket),
        Key: key
      })), this.retryConfig);
      return true;
    } catch (err) {
      if (err.name === "NotFound") return false;
      throw err;
    }
  }
};

// src/gcs.strategy.ts
var import_storage = require("@google-cloud/storage");
var GcsStorageStrategy = class {
  storage;
  defaultBucket;
  retryConfig;
  constructor(config) {
    resolveCloud(config, "gcs");
    this.storage = new import_storage.Storage(config.config);
    this.defaultBucket = config.bucket ? this.parseBucket(config.bucket) : void 0;
    this.retryConfig = {
      maxRetries: config.config?.["maxRetries"] ?? 3,
      baseDelayMs: config.config?.["baseDelayMs"] ?? 100
    };
  }
  retry(fn) {
    return withRetry(fn, this.retryConfig);
  }
  parseBucket(bucket) {
    return bucket.replace(/^gs:\/\//, "");
  }
  async putObject(bucket, key, data, options) {
    const b = this.storage.bucket(this.parseBucket(bucket));
    const file = b.file(key);
    try {
      if (Buffer.isBuffer(data)) {
        await this.retry(() => file.save(data, {
          contentType: options?.contentType,
          metadata: options?.metadata
        }));
      } else {
        await new Promise((resolve, reject) => {
          data.pipe(file.createWriteStream({
            contentType: options?.contentType,
            metadata: options?.metadata
          })).on("error", reject).on("finish", resolve);
        });
      }
      const [meta] = await this.retry(() => file.getMetadata());
      return {
        etag: meta.etag?.replace(/"/g, "") ?? "",
        versionId: meta.generation?.toString()
      };
    } catch (err) {
      if (err.code === 401) throw new AuthError("gcp", "gcs", "putObject");
      throw err;
    }
  }
  async getObject(bucket, key) {
    const b = this.storage.bucket(this.parseBucket(bucket));
    const file = b.file(key);
    try {
      const [exists] = await this.retry(() => file.exists());
      if (!exists) throw new ObjectNotFoundError("gcp", "gcs", bucket, key);
      const [buffer, meta] = await Promise.all([
        this.retry(() => file.download()),
        this.retry(() => file.getMetadata())
      ]);
      return {
        data: buffer[0],
        contentType: meta[0].contentType,
        metadata: meta[0].metadata,
        etag: meta[0].etag?.replace(/"/g, ""),
        lastModified: new Date(meta[0].updated ?? Date.now())
      };
    } catch (err) {
      if (err instanceof ObjectNotFoundError) throw err;
      if (err.code === 401) throw new AuthError("gcp", "gcs", "getObject");
      throw err;
    }
  }
  async getObjectStream(bucket, key) {
    const b = this.storage.bucket(this.parseBucket(bucket));
    return b.file(key).createReadStream();
  }
  async listObjects(bucket, options) {
    const b = this.storage.bucket(this.parseBucket(bucket));
    const [files] = await this.retry(() => b.getFiles({
      prefix: options?.prefix,
      maxResults: options?.maxKeys
    }));
    const objects = files.map((file) => ({
      key: file.name,
      size: Number(file.metadata.size ?? 0),
      etag: file.metadata.etag?.replace(/"/g, "") ?? "",
      lastModified: new Date(file.metadata.updated ?? Date.now())
    }));
    return {
      objects,
      isTruncated: false
    };
  }
  async deleteObject(bucket, key) {
    const b = this.storage.bucket(this.parseBucket(bucket));
    await this.retry(() => b.file(key).delete());
  }
  async existsObject(bucket, key) {
    const b = this.storage.bucket(this.parseBucket(bucket));
    const [exists] = await this.retry(() => b.file(key).exists());
    return exists;
  }
};

// src/azure-blob.strategy.ts
var import_storage_blob = require("@azure/storage-blob");
var import_identity = require("@azure/identity");
var AzureBlobStorageStrategy = class {
  client;
  defaultContainer;
  retryConfig;
  constructor(config) {
    resolveCloud(config, "azure-blob");
    const connectionString = config.config?.["connectionString"];
    if (connectionString) {
      this.client = import_storage_blob.BlobServiceClient.fromConnectionString(connectionString, config.config);
    } else {
      const account = config.config?.["account"];
      const accountUrl = `https://${account ?? "devstoreaccount1"}.blob.core.windows.net`;
      this.client = new import_storage_blob.BlobServiceClient(accountUrl, new import_identity.DefaultAzureCredential(), config.config);
    }
    this.defaultContainer = config.bucket ? this.parseBucket(config.bucket) : void 0;
    this.retryConfig = {
      maxRetries: config.config?.["maxRetries"] ?? 3,
      baseDelayMs: config.config?.["baseDelayMs"] ?? 100
    };
  }
  retry(fn) {
    return withRetry(fn, this.retryConfig);
  }
  parseBucket(container) {
    return container.replace(/^azblob:\/\//, "");
  }
  getContainerClient(bucket) {
    return this.client.getContainerClient(this.parseBucket(bucket));
  }
  async putObject(bucket, key, data, options) {
    const container = this.getContainerClient(bucket);
    const blockBlob = container.getBlockBlobClient(key);
    try {
      let result;
      if (Buffer.isBuffer(data)) {
        result = await this.retry(() => blockBlob.uploadData(data, {
          blobHTTPHeaders: {
            blobContentType: options?.contentType,
            blobCacheControl: options?.cacheControl
          },
          metadata: options?.metadata
        }));
      } else {
        result = await this.retry(() => blockBlob.uploadStream(data, void 0, void 0, {
          blobHTTPHeaders: {
            blobContentType: options?.contentType,
            blobCacheControl: options?.cacheControl
          },
          metadata: options?.metadata
        }));
      }
      return {
        etag: result.etag?.replace(/"/g, "") ?? ""
      };
    } catch (err) {
      if (err.statusCode === 403) throw new AuthError("azure", "azure-blob", "putObject");
      throw err;
    }
  }
  async getObject(bucket, key) {
    const container = this.getContainerClient(bucket);
    const blockBlob = container.getBlockBlobClient(key);
    try {
      const result = await this.retry(() => blockBlob.download());
      const data = await streamToBuffer(result.readableStreamBody);
      return {
        data,
        contentType: result.contentType,
        metadata: result.metadata,
        etag: result.etag?.replace(/"/g, ""),
        lastModified: result.lastModified
      };
    } catch (err) {
      if (err.statusCode === 404) throw new ObjectNotFoundError("azure", "azure-blob", bucket, key);
      if (err.statusCode === 403) throw new AuthError("azure", "azure-blob", "getObject");
      throw err;
    }
  }
  async getObjectStream(bucket, key) {
    const container = this.getContainerClient(bucket);
    const blockBlob = container.getBlockBlobClient(key);
    const result = await this.retry(() => blockBlob.download());
    return result.readableStreamBody;
  }
  async listObjects(bucket, options) {
    const container = this.getContainerClient(bucket);
    const objects = [];
    for await (const blob of container.listBlobsFlat({ prefix: options?.prefix })) {
      objects.push({
        key: blob.name,
        size: blob.properties.contentLength ?? 0,
        etag: blob.properties.etag?.replace(/"/g, "") ?? "",
        lastModified: blob.properties.lastModified
      });
      if (options?.maxKeys && objects.length >= options.maxKeys) break;
    }
    return {
      objects,
      isTruncated: false
    };
  }
  async deleteObject(bucket, key) {
    const container = this.getContainerClient(bucket);
    const blockBlob = container.getBlockBlobClient(key);
    await this.retry(() => blockBlob.delete());
  }
  async existsObject(bucket, key) {
    const container = this.getContainerClient(bucket);
    const blockBlob = container.getBlockBlobClient(key);
    try {
      await this.retry(() => blockBlob.getProperties());
      return true;
    } catch (err) {
      if (err.statusCode === 404) return false;
      throw err;
    }
  }
};
async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

// src/index.ts
var strategyRegistry = {
  aws: S3StorageStrategy,
  gcp: GcsStorageStrategy,
  azure: AzureBlobStorageStrategy
};
function createStorage(config) {
  const cloud = resolveCloud(config, "storage");
  const Strategy = strategyRegistry[cloud];
  if (!Strategy) throw new InvalidCloudError(cloud, "storage");
  return new Strategy(config);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthError,
  CloudError,
  CloudNotConfiguredError,
  InvalidCloudError,
  NotImplementedError,
  ObjectNotFoundError,
  TimeoutError,
  ValidationError,
  createStorage
});
//# sourceMappingURL=index.cjs.map