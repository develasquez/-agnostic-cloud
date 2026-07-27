# Quickstart: cloud-abstraction

**Purpose**: Validation scenarios to prove the library works end-to-end.
**Feature Spec**: `specs/001-cloud-abstraction/spec.md`
**Data Model**: `specs/001-cloud-abstraction/data-model.md`

---

## Prerequisites

```bash
# Install only the packages you need
npm install @agnostic-cloud/storage     # S3 + GCS + Azure Blob
npm install @agnostic-cloud/secrets     # AWS Secrets + GCP Secret Mgr + Azure Key Vault
npm install @agnostic-cloud/cache       # Redis (all clouds)
npm install @agnostic-cloud/kms         # AWS KMS + GCP Cloud KMS + Azure Key Vault Keys
npm install @agnostic-cloud/pubsub      # SNS/SQS + GCP PubSub + Azure Event Grid/Hubs/Bus
npm install @agnostic-cloud/nosql       # DynamoDB + Firestore + Cosmos DB

# Peer dependencies are auto-detected — missing SDKs prompt clear install instructions
```

---

## Scenario 1: Object Storage

```typescript
import { createStorage } from '@agnostic-cloud/storage'

// El código es idéntico para AWS, GCP y Azure
// La migración es solo cambiar variables de entorno
const storage = createStorage({
  cloud: process.env.CLOUD,         // 'aws' | 'gcp' | 'azure' — único cambio al migrar
  bucket: process.env.STORAGE_URL,  // 's3://bucket', 'gs://bucket', 'azblob://container'
  region: process.env.REGION,
  config: JSON.parse(process.env.CONFIG || '{}'),  // passthrough al SDK del cloud activo
})

// Write
await storage.putObject('my-bucket', 'hello.txt', 'Hello World')

// Read
const result = await storage.getObject('my-bucket', 'hello.txt')
console.log(result.data.toString())  // 'Hello World'

// List
const listing = await storage.listObjects('my-bucket')
console.log(listing.objects.length)  // >= 1

// Delete
await storage.deleteObject('my-bucket', 'hello.txt')
```

**Expected outcome**: All operations succeed. Switch cloud by changing `CLOUD` env var.
**To test without cloud**: Start minio (`docker run -p 9000:9000 minio/minio server /data`).

---

## Scenario 2: Secrets Management

```typescript
import { createSecrets } from '@agnostic-cloud/secrets'

const secrets = createSecrets({
  cloud: process.env.CLOUD,   // 'aws' | 'gcp' | 'azure'
  region: process.env.REGION,
})

await secrets.createSecret('my-api-key', 'sk-123456')
const secret = await secrets.getSecret('my-api-key')
console.log(secret.value)  // 'sk-123456'
await secrets.deleteSecret('my-api-key', { recoveryWindowDays: 7 })
```

**Expected outcome**: Secret created, read, and deleted.
**To test without cloud**: Mock the provider SDK.

---

## Scenario 3: Cache Read/Write

```typescript
import { createCache } from '@agnostic-cloud/cache'

const cache = createCache({
  cloud: process.env.CLOUD,   // 'aws' | 'gcp' | 'azure'
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
})

await cache.set('session:123', 'user-data', 3600)
const val = await cache.get('session:123')
console.log(val)  // 'user-data'
const exists = await cache.exists('session:123')
console.log(exists)  // true
await cache.delete('session:123')
```

**Expected outcome**: Cache set, get, exists, delete all work with Redis protocol.

---

## Scenario 4: NoSQL Document CRUD + Query

```typescript
import { createNoSql } from '@agnostic-cloud/nosql'

const db = createNoSql({
  cloud: process.env.CLOUD,       // 'aws' | 'gcp' | 'azure'
  projectId: process.env.PROJECT,
})

await db.putItem('users', 'user-1', {
  name: 'Alice',
  email: 'alice@example.com',
  role: 'admin'
})

const user = await db.getItem('users', 'user-1')
console.log(user.name)  // 'Alice'

const admins = await db.query('users', { role: { $eq: 'admin' } })
console.log(admins.items.length)  // >= 1

await db.deleteItem('users', 'user-1')
```

**Expected outcome**: Document persisted, queried, and deleted consistently.

---

## Scenario 5: Provider Switch — Solo Cambian Env Vars

```bash
# Misma aplicación, 3 nubes, 0 cambios de código
CLOUD=aws   STORAGE_URL=s3://bucket   REGION=us-east-1 CONFIG='{"endpoint":"http://localhost:9000"}' npx ts-node app.ts
CLOUD=gcp   STORAGE_URL=gs://bucket   REGION=us-east1  CONFIG='{"projectId":"my-project"}'           npx ts-node app.ts
CLOUD=azure STORAGE_URL=azblob://c    REGION=eastus    CONFIG='{"connectionString":"..."}'            npx ts-node app.ts
```

```typescript
// app.ts — idéntico para las 3 nubes
const storage = createStorage({
  cloud: process.env.CLOUD,
  bucket: process.env.STORAGE_URL,
  region: process.env.REGION,
  config: JSON.parse(process.env.CONFIG || '{}'),
})
```

**Expected outcome**: Same code works across all 3 providers with zero changes.

---

## Scenario 6: Error Handling

```typescript
import { createStorage, ObjectNotFoundError } from '@agnostic-cloud/storage'

const storage = createStorage({ cloud: 'aws', region: 'us-east-1' })

try {
  await storage.getObject('non-existent-bucket', 'missing-key')
} catch (err) {
  if (err instanceof ObjectNotFoundError) {
    console.log('Object not found:', err.message)
    console.log('Cloud:', err.cloud, 'Service:', err.service)
  }
}
```

**Expected outcome**: Typed errors with cloud/service/operation context.

---

## Running Validation

```bash
# Unit tests (no cloud needed)
npx vitest run

# Integration tests with Docker emulators
docker compose up -d
npx vitest run --config vitest.integration.ts
docker compose down
```
