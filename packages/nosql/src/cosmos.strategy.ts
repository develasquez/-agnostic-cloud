import { CosmosClient } from '@azure/cosmos'
import type { NoSqlConfig } from './config.js'
import { resolveCloud } from './resolver.js'
import { withRetry } from './retry.js'
import type { NoSqlStrategy, Document, QueryFilter, QueryOptions, QueryResult } from './interface.js'

export class CosmosDbStrategy implements NoSqlStrategy {
  private client: CosmosClient
  private databaseId: string
  private retryConfig: { maxRetries: number; baseDelayMs: number }

  constructor(config: NoSqlConfig) {
    resolveCloud(config, 'cosmosdb')
    const connectionString = config.config?.['connectionString'] as string
    const endpoint = config.config?.['endpoint'] as string
    const key = config.config?.['key'] as string
    this.client = connectionString
      ? new CosmosClient(connectionString)
      : new CosmosClient({ endpoint, key })
    this.databaseId = config.config?.['databaseId'] as string ?? 'agnostic-cloud'
    this.retryConfig = {
      maxRetries: config.config?.['maxRetries'] as number ?? 3,
      baseDelayMs: config.config?.['baseDelayMs'] as number ?? 100,
    }
  }

  private retry<T>(fn: () => Promise<T>): Promise<T> {
    return withRetry(fn, this.retryConfig)
  }

  private createdContainers = new Set<string>()

  private async ensureContainer(collection: string) {
    if (this.createdContainers.has(collection)) return
    const db = this.client.database(this.databaseId)
    try {
      await db.containers.createIfNotExists({ id: collection, partitionKey: '/id' })
    } catch { /* container already exists */ }
    this.createdContainers.add(collection)
  }

  private container(collection: string) {
    return this.client.database(this.databaseId).container(collection)
  }

  async putItem(collection: string, id: string, item: Document): Promise<void> {
    await this.ensureContainer(collection)
    await this.retry(() => this.container(collection).items.create({ id, ...item }))
  }

  async getItem(collection: string, id: string): Promise<Document | null> {
    try {
      const { resource } = await this.retry(() => this.container(collection).item(id, id).read())
      return resource ?? null
    } catch {
      return null
    }
  }

  async updateItem(collection: string, id: string, changes: Partial<Document>): Promise<Document> {
    const existing = await this.getItem(collection, id)
    const updated = { ...existing, ...changes }
    const { resource } = await this.retry(() => this.container(collection).item(id, id).replace(updated))
    return resource!
  }

  async deleteItem(collection: string, id: string): Promise<void> {
    await this.retry(() => this.container(collection).item(id, id).delete())
  }

  async query(collection: string, filter: QueryFilter, options?: QueryOptions): Promise<QueryResult> {
    const conditions = buildCondition(filter)
    const queryStr = conditions.length > 0
      ? `SELECT * FROM c WHERE ${conditions.join(' AND ')}`
      : 'SELECT * FROM c'

    const { resources } = await this.retry(() => this.container(collection).items.query({
      query: queryStr,
    }, {
      maxItemCount: options?.limit,
    }).fetchAll())

    return {
      items: resources ?? [],
      count: resources?.length ?? 0,
    }
  }
}

function buildCondition(filter: QueryFilter): string[] {
  const conditions: string[] = []
  for (const [field, ops] of Object.entries(filter)) {
    for (const [op, val] of Object.entries(ops)) {
      const mappedOp = cosmosOperatorMap[op] ?? '='
      const stringVal = typeof val === 'string' ? `'${val}'` : String(val)
      conditions.push(`c.${field} ${mappedOp} ${stringVal}`)
    }
  }
  return conditions
}

const cosmosOperatorMap: Record<string, string> = {
  $eq: '=',
  $ne: '!=',
  $gt: '>',
  $gte: '>=',
  $lt: '<',
  $lte: '<=',
}
