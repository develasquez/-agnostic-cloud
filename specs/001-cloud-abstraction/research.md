# Research: cloud-abstraction

**Feature**: `001-cloud-abstraction`
**Phase**: 0 — Technology & Design Research

---

## Decision: 7 Independent Packages — No Core
- **Rationale**: Zero coupling between packages. Each package owns its own config types, errors, and resolver. User installs only what they need. No plugin/discovery system needed.
- **Alternatives considered**: Monorepo with shared core package (adds coupling, requires plugin registration).
- **Tradeoff**: Minimal duplication of `{ cloud, region }` config type (~5 lines per package). Worth it for independence.

## Decision: `cloud` Field is Always the Provider Name
- **Rationale**: Consistency across all 7 packages. The `cloud` field is always `'aws'`, `'gcp'`, or `'azure'`. URL schemes appear only in resource-specific fields like `bucket` and are informational only.
- **Resolution order**: 1) explicit `cloud` field, 2) `CLOUD_PROVIDER` env var, 3) throw `CloudNotConfiguredError`

## Decision: `config` Passthrough — No Cloud-Specific Fields in Code
- **Rationale**: Application code must NEVER reference cloud-specific parameters. All nuances go into the generic `config: Record<string, any>` which is passed directly to the provider SDK. Migration = change env vars only.
- **Example**: `createStorage({ cloud, bucket, region, config: { projectId: '...' } })` — the library passes `{ projectId: '...' }` to the GCP Storage constructor. When switching to AWS, the `config` changes to `{ endpoint: '...' }` but the code stays identical.

## Decision: Peer Dependencies for Provider SDKs
- **Rationale**: Minimizes install size. AWS-only users don't download GCP/Azure SDKs. The core package depends only on TypeScript utilities (if any).
- **SDK Versions**: Latest stable at time of v1 release.

| Provider | SDK Package(s) |
|---|---|
| AWS | `@aws-sdk/client-s3`, `@aws-sdk/client-secrets-manager`, `@aws-sdk/client-kms`, `@aws-sdk/client-sns`, `@aws-sdk/client-sqs`, `@aws-sdk/client-dynamodb` |
| GCP | `@google-cloud/storage`, `@google-cloud/secret-manager`, `@google-cloud/kms`, `@google-cloud/pubsub`, `@google-cloud/firestore` |
| Azure | `@azure/storage-blob`, `@azure/keyvault-secrets`, `@azure/keyvault-keys`, `@azure/event-hubs`, `@azure/eventgrid`, `@azure/service-bus`, `@azure/cosmos`, `@azure/identity` |
| Cache (any) | `ioredis` (all 3 clouds use Redis-compatible services) |

## Decision: Common Filter Syntax for NoSQL Queries
- **Rationale**: DynamoDB, Firestore, and Cosmos DB have incompatible query DSLs. A common filter object (`{ field: { $eq, $gt, $lt, $in, $contains } }`) maps to each provider's native syntax internally.
- **Inspiration**: MongoDB query operators are familiar to most developers and map well across all 3 providers.
- **Limitation**: Complex queries (joins, subqueries, aggregations) are not abstracted — users fall back to provider-specific methods via `.raw()`.

## Decision: `cloud` Field Precedence Over Env Var
- **Rationale**: Explicit `cloud` field beats `CLOUD_PROVIDER` env var. Follows principle of least surprise.

## Decision: Factory Function Per Package
- **Rationale**: Each package exports its own factory (`createStorage`, `createSecrets`, etc.) with a consistent `{ cloud, region }` config shape.

## Decision: Testing via Emulators
- **Rationale**: Emulators provide reliable, fast, cost-free testing without cloud credentials.

| Service | Emulator |
|---|---|
| S3 | `minio` (Docker) |
| GCS | `fsouza/fake-gcs-server` (Docker) |
| Azure Blob | `azurite` (Docker or npm) |
| Redis | Native `redis-server` or `ioredis-mock` |
| KMS | Custom mock (providers lack official emulators) |
| Pub/Sub (GCP) | `gcloud emulators pubsub` |
| Event Hubs / Service Bus | `azurite` (limited) |
| DynamoDB | `@aws-sdk/lib-dynamodb` + DynamoDB Local (Docker) |
| Firestore | `@firebase/rules-unit-testing` or Firestore Emulator |
| Cosmos DB | `@azure/cosmos` with Cosmos DB Emulator |

## Decision: Error Taxonomy
- **Rationale**: Typed errors let consumers handle failures precisely. Each error carries cloud context (`cloud: 'aws'`, `service: 's3'`, `operation: 'putObject'`).

| Error | When Thrown |
|---|---|
| `CloudNotConfiguredError` | `cloud` field missing and `CLOUD_PROVIDER` env var not set |
| `InvalidCloudError` | `cloud` value is not `'aws'`, `'gcp'`, or `'azure'` |
| `ObjectNotFoundError` | Storage get/delete on missing key |
| `SecretNotFoundError` | Secrets get on missing name |
| `AuthError` | Credentials expired or invalid |
| `TimeoutError` | Provider request exceeded timeout |
| `ValidationError` | Input validation failed before provider call |
