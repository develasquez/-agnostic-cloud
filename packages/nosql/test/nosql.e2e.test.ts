import { describe, it, expect, beforeAll } from 'vitest'
import type { NoSqlConfig } from '../src/config.js'

const COLLECTION = `test-nosql-${Date.now()}`
const ID = 'test-item'

async function createTable() {
  const { DynamoDBClient, CreateTableCommand } = await import('@aws-sdk/client-dynamodb')
  const client = new DynamoDBClient({
    endpoint: 'http://localhost:8000',
    region: 'us-east-1',
    credentials: { accessKeyId: 'fake', secretAccessKey: 'fake' },
  })
  try {
    await client.send(new CreateTableCommand({
      TableName: COLLECTION,
      KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
      AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
      BillingMode: 'PAY_PER_REQUEST',
    }))
  } catch {}
  client.destroy()
}

describe.runIf(process.env.DYNAMODB_ENDPOINT)('nosql e2e with dynamodb-local', () => {
  beforeAll(async () => {
    await createTable()
  })

  it('should put, get, update, query, and delete via createNoSql (aws)', async () => {
    const { createNoSql } = await import('../src/index.js')
    const config: NoSqlConfig = {
      cloud: 'aws',
      region: 'us-east-1',
      config: {
        endpoint: 'http://localhost:8000',
        region: 'us-east-1',
        credentials: { accessKeyId: 'fake', secretAccessKey: 'fake' },
      },
    }
    const db = createNoSql(config)

    await expect(db.putItem(COLLECTION, ID, { name: 'test', value: 42 })).resolves.toBeUndefined()
    const item = await db.getItem(COLLECTION, ID)
    expect(item).not.toBeNull()
    expect(item?.name).toBe('test')

    const updated = await db.updateItem(COLLECTION, ID, { value: 99 })
    expect(updated.value).toBe(99)

    const { items } = await db.query(COLLECTION, { name: { $eq: 'test' } })
    expect(items.length).toBeGreaterThanOrEqual(1)

    await expect(db.deleteItem(COLLECTION, ID)).resolves.toBeUndefined()
  })
})

  describe.runIf(process.env.COSMOSDB_ENDPOINT)('nosql e2e with cosmosdb-emulator', () => {
    beforeAll(async () => {
      const { CosmosClient } = await import('@azure/cosmos')
      const cosmos = new CosmosClient({
        endpoint: process.env.COSMOSDB_ENDPOINT!,
        key: process.env.COSMOSDB_KEY || 'C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==',
      })
      try { await cosmos.databases.createIfNotExists({ id: 'agnostic-cloud' }) } catch {}
      cosmos.dispose()
    })

    it('should put, get, and delete via createNoSql (azure)', async () => {
      const { createNoSql } = await import('../src/index.js')
      const config: NoSqlConfig = {
        cloud: 'azure',
        config: {
          endpoint: process.env.COSMOSDB_ENDPOINT,
          key: process.env.COSMOSDB_KEY || 'C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==',
        },
      }
      const db = createNoSql(config)
      const col = `test-cosmos-${Date.now()}`
      const id = 'test-item'

      await expect(db.putItem(col, id, { name: 'cosmos', value: 3 })).resolves.toBeUndefined()
      const item = await db.getItem(col, id)
      expect(item).not.toBeNull()
      expect(item?.name).toBe('cosmos')

      await expect(db.deleteItem(col, id)).resolves.toBeUndefined()
    })
  })

  describe.runIf(process.env.FIRESTORE_EMULATOR_HOST)('nosql e2e with firestore-emulator', () => {
  it('should put, get, and delete via createNoSql (gcp)', async () => {
    const { createNoSql } = await import('../src/index.js')
    const config: NoSqlConfig = {
      cloud: 'gcp',
      config: {
        projectId: process.env.GOOGLE_CLOUD_PROJECT || 'test-project',
      },
    }
    const db = createNoSql(config)
    const col = `test-firestore-${Date.now()}`
    const id = 'test-item'

    await expect(db.putItem(col, id, { name: 'firebase', value: 7 })).resolves.toBeUndefined()
    const item = await db.getItem(col, id)
    expect(item).not.toBeNull()
    expect(item?.name).toBe('firebase')

    await expect(db.deleteItem(col, id)).resolves.toBeUndefined()
  })
})
