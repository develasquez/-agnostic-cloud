import type { NoSqlConfig } from './config.js'
import type { NoSqlStrategy } from './interface.js'
import { InvalidCloudError } from './errors.js'
import { resolveCloud } from './resolver.js'
import { DynamoDbStrategy } from './dynamodb.strategy.js'
import { FirestoreStrategy } from './firestore.strategy.js'
import { CosmosDbStrategy } from './cosmos.strategy.js'

export type { NoSqlConfig, CloudConfig } from './config.js'
export type { NoSqlStrategy, Document, QueryFilter, QueryOptions, QueryResult, FilterOperator } from './interface.js'
export { CloudError, CloudNotConfiguredError, InvalidCloudError, AuthError, TimeoutError, ValidationError, NotImplementedError } from './errors.js'

const strategyRegistry: Record<string, new (config: NoSqlConfig) => NoSqlStrategy> = {
  aws: DynamoDbStrategy,
  gcp: FirestoreStrategy,
  azure: CosmosDbStrategy,
}

export function createNoSql(config: NoSqlConfig): NoSqlStrategy {
  const cloud = resolveCloud(config, 'nosql')
  const Strategy = strategyRegistry[cloud]
  if (!Strategy) throw new InvalidCloudError(cloud, 'nosql')
  return new Strategy(config)
}
