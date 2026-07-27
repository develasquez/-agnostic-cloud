import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
  QueryCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import type { NoSqlConfig } from './config.js'
import { resolveCloud } from './resolver.js'
import { withRetry } from './retry.js'
import type { NoSqlStrategy, Document, QueryFilter, QueryOptions, QueryResult } from './interface.js'

export class DynamoDbStrategy implements NoSqlStrategy {
  private client: DynamoDBClient
  private retryConfig: { maxRetries: number; baseDelayMs: number }

  constructor(config: NoSqlConfig) {
    resolveCloud(config, 'dynamodb')
    this.client = new DynamoDBClient({ region: config.region ?? 'us-east-1', ...config.config })
    this.retryConfig = {
      maxRetries: config.config?.['maxRetries'] as number ?? 3,
      baseDelayMs: config.config?.['baseDelayMs'] as number ?? 100,
    }
  }

  async putItem(collection: string, id: string, item: Document): Promise<void> {
    await withRetry(() => this.client.send(new PutItemCommand({
      TableName: collection,
      Item: marshall({ id, ...item }),
    })), this.retryConfig)
  }

  async getItem(collection: string, id: string): Promise<Document | null> {
    const result = await withRetry(() => this.client.send(new GetItemCommand({
      TableName: collection,
      Key: marshall({ id }),
    })), this.retryConfig)

    if (!result.Item) return null
    return unmarshall(result.Item)
  }

  async updateItem(collection: string, id: string, changes: Partial<Document>): Promise<Document> {
    const updateExpression = Object.keys(changes)
      .map(key => `#${key} = :${key}`)
      .join(', ')
    const expressionAttributeNames = Object.keys(changes).reduce(
      (acc, key) => ({ ...acc, [`#${key}`]: key }),
      {} as Record<string, string>
    )
    const expressionAttributeValues = marshall(
      Object.entries(changes).reduce(
        (acc, [key, value]) => ({ ...acc, [`:${key}`]: value }),
        {} as Record<string, any>
      )
    )

    const result = await withRetry(() => this.client.send(new UpdateItemCommand({
      TableName: collection,
      Key: marshall({ id }),
      UpdateExpression: `SET ${updateExpression}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    })), this.retryConfig)

    return unmarshall(result.Attributes!)
  }

  async deleteItem(collection: string, id: string): Promise<void> {
    await withRetry(() => this.client.send(new DeleteItemCommand({
      TableName: collection,
      Key: marshall({ id }),
    })), this.retryConfig)
  }

  async query(collection: string, filter: QueryFilter, options?: QueryOptions): Promise<QueryResult> {
    const hasKeyFilter = Object.keys(filter).some(f => f === 'id')
    if (hasKeyFilter) {
      const expressions = buildQueryExpressions(filter)
      const result = await withRetry(() => this.client.send(new QueryCommand({
        TableName: collection,
        KeyConditionExpression: expressions.condition,
        FilterExpression: expressions.filter,
        ExpressionAttributeNames: expressions.names,
        ExpressionAttributeValues: marshall(expressions.values),
        Limit: options?.limit,
      })), this.retryConfig)
      return {
        items: (result.Items ?? []).map(i => unmarshall(i)),
        count: result.Count ?? 0,
        nextToken: result.LastEvaluatedKey?.['id']?.S,
      }
    }

    const expressions = buildQueryExpressions(filter)
    const result = await withRetry(() => this.client.send(new ScanCommand({
      TableName: collection,
      FilterExpression: expressions.filter ?? expressions.condition,
      ExpressionAttributeNames: expressions.names,
      ExpressionAttributeValues: marshall(expressions.values),
      Limit: options?.limit,
    })), this.retryConfig)
    return {
      items: (result.Items ?? []).map(i => unmarshall(i)),
      count: result.Count ?? 0,
      nextToken: result.LastEvaluatedKey?.['id']?.S,
    }
  }
}

function buildQueryExpressions(filter: QueryFilter): {
  condition?: string
  filter?: string
  names: Record<string, string>
  values: Record<string, any>
} {
  const names: Record<string, string> = {}
  const values: Record<string, any> = {}
  const conditions: string[] = []
  const filters: string[] = []

  for (const [field, ops] of Object.entries(filter)) {
    names[`#${field}`] = field
    for (const [op, val] of Object.entries(ops)) {
      const sanitizedOp = op.replace(/\$/g, '')
      const valueKey = `:${field}_${sanitizedOp}`
      values[valueKey] = val
      const expr = `#${field} ${operatorMap[op] ?? '='} ${valueKey}`
      if (op === '$eq' || op === '$gt' || op === '$gte') {
        conditions.push(expr)
      } else {
        filters.push(expr)
      }
    }
  }

  return {
    condition: conditions.length > 0 ? conditions.join(' AND ') : undefined,
    filter: filters.length > 0 ? filters.join(' AND ') : undefined,
    names,
    values,
  }
}

const operatorMap: Record<string, string> = {
  $eq: '=',
  $ne: '<>',
  $gt: '>',
  $gte: '>=',
  $lt: '<',
  $lte: '<=',
  $in: 'IN',
  $contains: 'CONTAINS',
  $exists: 'attribute_exists',
}
