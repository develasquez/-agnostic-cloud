import type { CacheConfig } from './config.js'
import type { CacheStrategy } from './interface.js'
import { InvalidCloudError } from './errors.js'
import { resolveCloud } from './resolver.js'
import { RedisCacheStrategy } from './redis.strategy.js'

export type { CacheConfig, CloudConfig } from './config.js'
export type { CacheStrategy, SetOptions } from './interface.js'
export { CloudError, CloudNotConfiguredError, InvalidCloudError, AuthError, TimeoutError, ValidationError, NotImplementedError } from './errors.js'

const strategyRegistry: Record<string, new (config: CacheConfig) => CacheStrategy> = {
  aws: RedisCacheStrategy,
  gcp: RedisCacheStrategy,
  azure: RedisCacheStrategy,
  oci: RedisCacheStrategy,
}

export function createCache(config: CacheConfig): CacheStrategy {
  const cloud = resolveCloud(config, 'cache')
  const Strategy = strategyRegistry[cloud]
  if (!Strategy) throw new InvalidCloudError(cloud, 'cache')
  return new Strategy(config)
}
