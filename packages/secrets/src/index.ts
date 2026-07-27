import type { SecretsConfig } from './config.js'
import type { SecretsStrategy } from './interface.js'
import { InvalidCloudError } from './errors.js'
import { resolveCloud } from './resolver.js'
import { AwsSecretsStrategy } from './aws.strategy.js'
import { GcpSecretsStrategy } from './gcp.strategy.js'
import { AzureSecretsStrategy } from './azure.strategy.js'

export type { SecretsConfig, CloudConfig } from './config.js'
export type { SecretsStrategy, SecretValue, SecretMetadata, CreateSecretOptions, DeleteSecretOptions, ListSecretsOptions, ListSecretsResult } from './interface.js'
export { CloudError, CloudNotConfiguredError, InvalidCloudError, SecretNotFoundError, AuthError, TimeoutError, ValidationError, NotImplementedError } from './errors.js'

const strategyRegistry: Record<string, new (config: SecretsConfig) => SecretsStrategy> = {
  aws: AwsSecretsStrategy,
  gcp: GcpSecretsStrategy,
  azure: AzureSecretsStrategy,
}

export function createSecrets(config: SecretsConfig): SecretsStrategy {
  const cloud = resolveCloud(config, 'secrets')
  const Strategy = strategyRegistry[cloud]
  if (!Strategy) throw new InvalidCloudError(cloud, 'secrets')
  return new Strategy(config)
}
