# Technical Plan: cloud-abstraction

**Feature**: `001-cloud-abstraction`
**Tech Stack**: TypeScript / Node.js
**Created**: 2026-07-24

---

## Technical Context

A TypeScript library providing a unified Strategy-pattern interface across 6 cloud service categories (storage, secrets, cache, KMS, pub/sub, NoSQL) for AWS, GCP, and Azure. Provider selection via URL prefix (storage) or environment variable. All provider SDKs are peer dependencies — users install only what they need.

---

## Architecture

### High-Level Design

```
@agnostic-cloud/storage
┌──────────────────────────────────────┐
│ createStorage({                       │
│   cloud: 'aws',                      │  ← Siempre el provider name
│   bucket: 's3://my-bucket',          │  ← URL scheme informativo
│   region: 'us-east-1',               │
│   config: { endpoint: '...' }        │  ← Passthrough al SDK (opaco para la lib)
│ })                                    │
└──────────┬───────────────────────────┘
           ▼
┌──────────────────────────────────────┐
│    StorageStrategy                    │
│  ┌──────┬──────┬──────────────────┐  │
│  │ S3   │ GCS  │ Azure Blob       │  │
│  │      │      │                  │  │
│  │ config →     config →          │  │
│  │ S3Client   Storage             │  │
│  └──────┴──────┴──────────────────┘  │
│   ↑ cloud 'aws'    cloud 'gcp'       │
│   ↑ determina      cloud 'azure'    │
│   ↑ la impl. y al SDK a pasar config│
└──────────────────────────────────────┘

Misma estructura exacta para:
  @agnostic-cloud/secrets    → createSecrets({ cloud, region, config })
  @agnostic-cloud/cache      → createCache({ cloud, host, port, config })
  @agnostic-cloud/kms        → createKms({ cloud, region, config })
  @agnostic-cloud/pubsub     → createPubSub({ cloud, region, config })
  @agnostic-cloud/nosql      → createNoSql({ cloud, config })
  @agnostic-cloud/migrate    → copyObject({ ... })
```

### Control Flow

1. User calls `createStorage({ cloud: 'aws', bucket: 's3://...', region: '...' })`
2. Factory reads `cloud` field → selects implementation: `'aws'` → S3, `'gcp'` → GCS, `'azure'` → Azure Blob
3. If `cloud` is missing, reads `CLOUD_PROVIDER` env var
4. If both missing → throw `CloudNotConfiguredError`
5. Returns the strategy interface

### Cloud Resolution Order

1. `cloud` field in config (explicit)
2. `CLOUD_PROVIDER` environment variable
3. If none → throw `CloudNotConfiguredError`

### Config Passthrough

The `config: Record<string, any>` field is passed directly to the active provider's SDK constructor. The library never reads specific keys from `config`:

```typescript
switch (cloud) {
  case 'aws':   return new S3Client(config)           // AWS SDK
  case 'gcp':   return new Storage(config)             // GCP SDK
  case 'azure': return new BlobServiceClient(config)   // Azure SDK
}
```

This ensures application code has zero cloud-specific parameter references — migration is purely an env var change.

---

## Project Layout

```
agnostic-layer/
├── package.json                    # Root workspace
├── tsconfig.base.json              # Shared TS strict config
├── .gitignore
├── specs/
│   ├── constitution.md
│   └── 001-cloud-abstraction/
│       ├── spec.md
│       ├── plan.md
│       ├── research.md
│       ├── data-model.md
│       ├── contracts/
│       ├── quickstart.md
│       └── checklists/
├── packages/
│   ├── storage/                    # @agnostic-cloud/storage
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   ├── index.ts           # createStorage()
│   │   │   ├── interface.ts       # StorageStrategy
│   │   │   ├── config.ts          # CloudConfig + storage-specific config
│   │   │   ├── errors.ts          # StorageError, ObjectNotFoundError, etc.
│   │   │   ├── resolver.ts        # cloud → provider implementation mapper
│   │   │   ├── s3.strategy.ts
│   │   │   ├── gcs.strategy.ts
│   │   │   └── azure-blob.strategy.ts
│   │   └── test/
│   ├── secrets/
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── index.ts           # createSecrets()
│   │   │   ├── interface.ts
│   │   │   ├── config.ts
│   │   │   ├── errors.ts
│   │   │   ├── resolver.ts
│   │   │   ├── aws.strategy.ts
│   │   │   ├── gcp.strategy.ts
│   │   │   └── azure.strategy.ts
│   │   └── test/
│   ├── cache/
│   ├── kms/
│   ├── pubsub/
│   ├── nosql/
│   └── migrate/
├── docker-compose.yml
└── .changeset/
```

---

## Dependency Table

| Package | Runtime Deps | Peer Dependencies |
|---|---|---|
| `@agnostic-cloud/storage` | none | `@aws-sdk/client-s3`, `@google-cloud/storage`, `@azure/storage-blob`, `@azure/identity` |
| `@agnostic-cloud/secrets` | none | `@aws-sdk/client-secrets-manager`, `@google-cloud/secret-manager`, `@azure/keyvault-secrets` |
| `@agnostic-cloud/cache` | none | `ioredis` |
| `@agnostic-cloud/kms` | none | `@aws-sdk/client-kms`, `@google-cloud/kms`, `@azure/keyvault-keys` |
| `@agnostic-cloud/pubsub` | none | `@aws-sdk/client-sns`, `@aws-sdk/client-sqs`, `@google-cloud/pubsub`, `@azure/event-hubs`, `@azure/eventgrid`, `@azure/service-bus` |
| `@agnostic-cloud/nosql` | none | `@aws-sdk/client-dynamodb`, `@google-cloud/firestore`, `@azure/cosmos` |
| `@agnostic-cloud/migrate` | none | `@agnostic-cloud/storage`, `@agnostic-cloud/pubsub` |

---

## Complexity Tracking

- **No Constitution violations found** — architecture aligns with all 7 principles.
- Potential complexity: No shared types between packages means some duplication of `{ cloud, region }` config types. Mitigated by keeping the config shape minimal and documented.
- Potential complexity: NoSQL query abstraction across 3 incompatible DSLs. Mitigated by using a simple MongoDB-inspired filter syntax and providing `.raw()` escape hatch.
- Potential complexity: Azure pub/sub has 3 distinct services. Mitigated by 3 separate strategies implementing the same interface.
