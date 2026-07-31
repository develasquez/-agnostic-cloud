import type { PubSubConfig } from './config.js'
import type { PubSubStrategy } from './interface.js'
import { InvalidCloudError } from './errors.js'
import { resolveCloud } from './resolver.js'
import { SnsStrategy } from './sns.strategy.js'
import { GcpPubSubStrategy } from './gcp.strategy.js'
import { AzureServiceBusStrategy } from './azure.strategy.js'
import { OciPubSubStrategy } from './oci.strategy.js'

export type { PubSubConfig, CloudConfig } from './config.js'
export type { PubSubStrategy, MessagePayload, PublishResult, Message, MessageHandler, SubscribeOptions, Subscription } from './interface.js'
export { CloudError, CloudNotConfiguredError, InvalidCloudError, AuthError, TimeoutError, ValidationError, NotImplementedError } from './errors.js'

const strategyRegistry: Record<string, new (config: PubSubConfig) => PubSubStrategy> = {
  aws: SnsStrategy,
  gcp: GcpPubSubStrategy,
  azure: AzureServiceBusStrategy,
  oci: OciPubSubStrategy,
}

export function createPubSub(config: PubSubConfig): PubSubStrategy {
  const cloud = resolveCloud(config, 'pubsub')
  const Strategy = strategyRegistry[cloud]
  if (!Strategy) throw new InvalidCloudError(cloud, 'pubsub')
  return new Strategy(config)
}
