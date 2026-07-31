# @agnostic-cloud/nosql

Unified NoSQL document database interface for DynamoDB, Firestore, and Cosmos DB.

## Installation

```bash
npm install @agnostic-cloud/nosql
```

> **Note on Peer Dependencies**: Provider SDKs are optional peer dependencies. You only need to install the SDK for the cloud provider(s) you use.

### Supported Cloud Provider SDK Versions

| Cloud Provider | Required SDK Package | Current / Tested Version | Installation Command |
|---|---|---|---|
| **AWS** | `@aws-sdk/client-dynamodb`<br/>`@aws-sdk/util-dynamodb` | `^3.1095.0`<br/>`^3.996.7` | `npm install @aws-sdk/client-dynamodb @aws-sdk/util-dynamodb` |
| **GCP** | `@google-cloud/firestore` | `^7.11.6` | `npm install @google-cloud/firestore` |
| **Azure** | `@azure/cosmos`<br/>`@azure/identity` | `^4.9.3`<br/>`^4.13.1` | `npm install @azure/cosmos @azure/identity` |

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
