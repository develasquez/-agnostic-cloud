# @agnostic-cloud

Unified TypeScript SDK for AWS, GCP, and Azure — zero-code-change cloud migration by swapping environment variables.

📖 **Documentation**: [https://develasquez.github.io/-agnostic-cloud/](https://develasquez.github.io/-agnostic-cloud/)

![Node](https://img.shields.io/badge/node-%3E%3D22.18-339933?logo=node.js)
![TypeScript](https://img.shields.io/badge/typescript-5.5%2B-3178C6?logo=typescript)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen)
![Tests](https://img.shields.io/badge/tests-70%20passed%2C%200%20failed-success)
![Cloud](https://img.shields.io/badge/cloud-AWS%20%7C%20GCP%20%7C%20Azure-FF9900)

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
