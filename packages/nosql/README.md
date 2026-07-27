# @agnostic-cloud/nosql

Unified NoSQL document database interface for DynamoDB, Firestore, and Cosmos DB.

## Installation

```bash
npm install @agnostic-cloud/nosql
```

## Usage

```typescript
import { createNoSql } from '@agnostic-cloud/nosql'

const db = createNoSql({
  cloud: 'aws',
  region: 'us-east-1',
  databaseId: 'my-db',
})

// Create
await db.putItem('users', 'user-1', {
  name: 'Alice',
  email: 'alice@example.com',
  role: 'admin',
})

// Read
const user = await db.getItem('users', 'user-1')

// Update
await db.updateItem('users', 'user-1', { role: 'editor' })

// Query
const result = await db.query('users', {
  role: { $eq: 'admin' },
}, { limit: 10 })

// Delete
await db.deleteItem('users', 'user-1')
```

## API

### `createNoSql(config: NoSqlConfig): NoSqlStrategy`

| Method | Signature |
|--------|-----------|
| `putItem` | `(collection, id, item) => Promise<void>` |
| `getItem` | `(collection, id) => Promise<Document \| null>` |
| `updateItem` | `(collection, id, changes) => Promise<Document>` |
| `deleteItem` | `(collection, id) => Promise<void>` |
| `query` | `(collection, filter, options?) => Promise<QueryResult>` |

## Configuration

```typescript
interface NoSqlConfig {
  cloud?: 'aws' | 'gcp' | 'azure'
  region?: string
  config?: Record<string, any>
  databaseId?: string
}
```

## Documentation

Full docs: https://develasquez.github.io/-agnostic-cloud/docs/next/packages/nosql

API reference: https://develasquez.github.io/-agnostic-cloud/docs/next/api/@agnostic-cloud/nosql
