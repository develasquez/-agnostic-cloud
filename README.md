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

## Provider SDK Requirements & Versions

All provider SDKs are declared as **optional peer dependencies** in `@agnostic-cloud/*`. You only need to install the provider SDKs for the cloud services you actually use.

| Package | Cloud Provider | Required SDK Package | Tested Version |
|---|---|---|---|
| `@agnostic-cloud/storage` | AWS<br/>GCP<br/>Azure | `@aws-sdk/client-s3`<br/>`@google-cloud/storage`<br/>`@azure/storage-blob`, `@azure/identity` | `^3.1095.0`<br/>`^7.21.0`<br/>`^12.32.0`, `^4.13.1` |
| `@agnostic-cloud/secrets` | AWS<br/>GCP<br/>Azure | `@aws-sdk/client-secrets-manager`<br/>`@google-cloud/secret-manager`<br/>`@azure/keyvault-secrets`, `@azure/identity` | `^3.1095.0`<br/>`^5.6.0`<br/>`^4.11.2`, `^4.13.1` |
| `@agnostic-cloud/cache` | AWS / GCP / Azure | `ioredis` | `^5.11.1` |
| `@agnostic-cloud/kms` | AWS<br/>GCP<br/>Azure | `@aws-sdk/client-kms`<br/>`@google-cloud/kms`<br/>`@azure/keyvault-keys`, `@azure/identity` | `^3.1095.0`<br/>`^4.5.0`<br/>`^4.10.2`, `^4.13.1` |
| `@agnostic-cloud/pubsub` | AWS<br/>GCP<br/>Azure | `@aws-sdk/client-sns`, `@aws-sdk/client-sqs`<br/>`@google-cloud/pubsub`<br/>`@azure/service-bus`, `@azure/eventgrid`, `@azure/event-hubs`, `@azure/identity` | `^3.1095.0`<br/>`^4.11.0`<br/>`^7.9.5`, `^4.15.0`, `^5.12.2`, `^4.13.1` |
| `@agnostic-cloud/nosql` | AWS<br/>GCP<br/>Azure | `@aws-sdk/client-dynamodb`, `@aws-sdk/util-dynamodb`<br/>`@google-cloud/firestore`<br/>`@azure/cosmos`, `@azure/identity` | `^3.1095.0`, `^3.996.7`<br/>`^7.11.6`<br/>`^4.9.3`, `^4.13.1` |
| `@agnostic-cloud/migrate` | AWS<br/>GCP<br/>Azure | `@aws-sdk/client-s3`<br/>`@google-cloud/storage`<br/>`@azure/storage-blob`, `@azure/identity` | `^3.1095.0`<br/>`^7.21.0`<br/>`^12.32.0`, `^4.13.1` |

## Requirements

- Node.js >= 22.18
- Provider SDKs are optional peer dependencies (install only those you use)
- Tests use emulators (see `docker-compose.yml`)
