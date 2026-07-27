# @agnostic-cloud

Unified TypeScript SDK for AWS, GCP, and Azure — zero-code-change cloud migration by swapping environment variables.

## Packages

| Package | Description | Interface |
|---------|-------------|-----------|
| `@agnostic-cloud/storage` | Object storage | `StorageStrategy` |
| `@agnostic-cloud/secrets` | Secrets management | `SecretsStrategy` |
| `@agnostic-cloud/cache` | Redis cache | `CacheStrategy` |
| `@agnostic-cloud/kms` | Key management | `KmsStrategy` |
| `@agnostic-cloud/pubsub` | Pub/sub messaging | `PubSubStrategy` |
| `@agnostic-cloud/nosql` | NoSQL document DB | `NoSqlStrategy` |
| `@agnostic-cloud/migrate` | Cross-provider copy & verify | `copyObject` / `verifyIntegrity` |

## Usage

```typescript
import { createStorage } from '@agnostic-cloud/storage'

const storage = createStorage({
  cloud: 'aws',           // 'aws' | 'gcp' | 'azure'
  region: 'us-east-1',
  config: {               // passthrough to provider SDK
    maxRetries: 5,
    baseDelayMs: 200,
  },
})

await storage.putObject('my-bucket', 'hello.txt', 'Hello, world!')
const result = await storage.getObject('my-bucket', 'hello.txt')
```

Change `cloud` to `'gcp'` or `'azure'` — no other code changes needed.

## Retry

Each strategy supports configurable exponential backoff with jitter:

```typescript
const client = createSecrets({
  cloud: 'aws',
  config: { maxRetries: 5, baseDelayMs: 200 },
})
```

## Migration

```typescript
import { copyObject } from '@agnostic-cloud/migrate'
import { createStorage } from '@agnostic-cloud/storage'

await copyObject(
  { cloud: 'aws', region: 'us-east-1' },
  's3://source-bucket/key',
  { cloud: 'gcp' },
  'gs://dest-bucket/key',
)
```

## Development

```bash
npm install
npm run build --workspaces
npm test
```

## Requirements

- Node.js >= 18
- Provider SDKs are optional peer dependencies (install only those you use)
- Tests use emulators (see `docker-compose.yml`)
