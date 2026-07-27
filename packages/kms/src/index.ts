import type { KmsConfig } from './config.js'
import type { KmsStrategy } from './interface.js'
import { InvalidCloudError } from './errors.js'
import { resolveCloud } from './resolver.js'
import { AwsKmsStrategy } from './aws.strategy.js'
import { GcpKmsStrategy } from './gcp.strategy.js'
import { AzureKmsStrategy } from './azure.strategy.js'

export type { KmsConfig, CloudConfig } from './config.js'
export type { KmsStrategy, EncryptResult, DecryptResult, CreateKeyOptions, KeyMetadata, EncryptionContext } from './interface.js'
export { CloudError, CloudNotConfiguredError, InvalidCloudError, AuthError, TimeoutError, ValidationError, NotImplementedError } from './errors.js'

const strategyRegistry: Record<string, new (config: KmsConfig) => KmsStrategy> = {
  aws: AwsKmsStrategy,
  gcp: GcpKmsStrategy,
  azure: AzureKmsStrategy,
}

export function createKms(config: KmsConfig): KmsStrategy {
  const cloud = resolveCloud(config, 'kms')
  const Strategy = strategyRegistry[cloud]
  if (!Strategy) throw new InvalidCloudError(cloud, 'kms')
  return new Strategy(config)
}
