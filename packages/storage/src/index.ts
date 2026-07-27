import type { StorageConfig } from './config.js'
import type { StorageStrategy } from './interface.js'
import { InvalidCloudError } from './errors.js'
import { resolveCloud } from './resolver.js'
import { S3StorageStrategy } from './s3.strategy.js'
import { GcsStorageStrategy } from './gcs.strategy.js'
import { AzureBlobStorageStrategy } from './azure-blob.strategy.js'

export type { StorageConfig, CloudConfig } from './config.js'
export type { StorageStrategy, PutObjectOptions, PutObjectResult, GetObjectResult, ListObjectsOptions, ListObjectsResult, ObjectSummary } from './interface.js'
export { CloudError, CloudNotConfiguredError, InvalidCloudError, ObjectNotFoundError, AuthError, TimeoutError, ValidationError, NotImplementedError } from './errors.js'

const strategyRegistry: Record<string, new (config: StorageConfig) => StorageStrategy> = {
  aws: S3StorageStrategy,
  gcp: GcsStorageStrategy,
  azure: AzureBlobStorageStrategy,
}

export function createStorage(config: StorageConfig): StorageStrategy {
  const cloud = resolveCloud(config, 'storage')
  const Strategy = strategyRegistry[cloud]
  if (!Strategy) throw new InvalidCloudError(cloud, 'storage')
  return new Strategy(config)
}
