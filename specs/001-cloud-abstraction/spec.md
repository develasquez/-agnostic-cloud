# Feature Specification: cloud-abstraction

**Feature Branch**: `001-cloud-abstraction`
**Created**: 2026-07-24
**Status**: Draft
**Input**: User description: cloud abstraction layer for AWS, GCP, Azure

## Clarifications

### Session 2026-07-24

- Q: Package name and scope? → A: `@agnostic-cloud` scope with multiple atomic packages
- Q: Package granularity per category or per provider? → A: 1 package per service category (8 packages total)

## User Scenarios & Testing

### User Story 1 - Object Storage Abstraction (Priority: P1)

As a developer, I want a single unified interface to upload, download, list, and delete objects across S3, Cloud Storage, and Azure Blob Storage, so I can write storage code once and switch providers via configuration.

**Why this priority**: Object storage is the most common cloud service. A working P1 delivers immediate value for any cloud migration.

**Independent Test**: Can be tested by writing a file with the S3-compatible provider, reading it back with GCS, and verifying content integrity using each provider's local/emulator.

**Acceptance Scenarios**:

1. **Given** a configured cloud provider, **When** I call `putObject(bucket, key, data)`, **Then** the object is persisted in the underlying service.
2. **Given** an existing object, **When** I call `getObject(bucket, key)`, **Then** the object content and metadata are returned.
3. **Given** a bucket with objects, **When** I call `listObjects(bucket, prefix)`, **Then** a paginated list of matching objects is returned.
4. **Given** an existing object, **When** I call `deleteObject(bucket, key)`, **Then** the object is removed.
5. **Given** an invalid provider configuration, **When** I instantiate the client, **Then** a typed configuration error is thrown.

---

### User Story 2 - Consistent Cloud Config (Priority: P1)

As a developer, I want to configure every service with the same `{ cloud, region }` interface, so switching providers means changing only `cloud: 'aws'` → `cloud: 'gcp'` and my code stays identical.

**Why this priority**: A single, consistent config shape across all 6 service categories is what makes the library usable and maintainable.

**Independent Test**: Can be tested by creating a storage client with `{ cloud: 'aws' }` and a secrets client with the same `{ cloud: 'aws' }` — both pick the AWS provider without additional config.

**Acceptance Scenarios**:

1. **Given** `{ cloud: 'aws' }`, **When** creating any service client, **Then** the AWS strategy is selected.
2. **Given** `{ cloud: 'gcp' }`, **When** creating any service client, **Then** the GCP strategy is selected.
3. **Given** `{ cloud: 'azure' }`, **When** creating any service client, **Then** the Azure strategy is selected.
4. **Given** an invalid cloud value, **When** creating a client, **Then** an `InvalidCloudError` is thrown.

---

### User Story 3 - Secrets Management Abstraction (Priority: P2)

As a developer, I want a single interface to create, read, update, and delete secrets across AWS Secrets Manager, GCP Secret Manager, and Azure Key Vault, so I can migrate secret management between clouds without changing application code.

**Why this priority**: Secrets are one of the first things that break during migration. A unified interface here eliminates a major migration pain point.

**Independent Test**: Can be tested by creating a secret with one provider, reading it with another, and verifying the value, using emulators or mocked credentials.

**Acceptance Scenarios**:

1. **Given** a configured provider, **When** I call `getSecret(name)`, **Then** the secret value and metadata are returned.
2. **Given** a non-existent secret name, **When** I call `getSecret(name)`, **Then** a `SecretNotFoundError` is thrown.
3. **Given** a secret name and value, **When** I call `createSecret(name, value)`, **Then** the secret is persisted.
4. **Given** an existing secret, **When** I call `updateSecret(name, value)`, **Then** the secret value is updated.
5. **Given** an existing secret, **When** I call `deleteSecret(name)`, **Then** the secret is scheduled for removal or immediately deleted per provider semantics.

---

### User Story 4 - Cache / Redis Abstraction (Priority: P2)

As a developer, I want a unified key-value cache interface across ElastiCache (Redis), Memorystore, and Azure Cache for Redis, so my caching logic is portable between clouds.

**Why this priority**: Cache is a simple, well-defined interface (get/set/delete) and every cloud has an almost identical Redis offering.

**Independent Test**: Can be tested with a local Redis instance for all three providers since they all use Redis protocol.

**Acceptance Scenarios**:

1. **Given** a configured cache provider, **When** I call `set(key, value, ttl?)`, **Then** the value is stored with optional expiration.
2. **Given** a stored cache key, **When** I call `get(key)`, **Then** the stored value is returned.
3. **Given** a stored cache key, **When** I call `delete(key)`, **Then** the key is removed.
4. **Given** a non-existent key, **When** I call `get(key)`, **Then** `null` is returned.

---

### User Story 5 - Pub/Sub Abstraction (Priority: P3)

As a developer, I want a unified interface for publish/subscribe messaging across AWS (SNS/SQS), GCP (Pub/Sub), and Azure (Event Grid, Event Hubs, Service Bus), so I can migrate event-driven components between clouds without rewriting messaging logic.

**Why this priority**: Pub/Sub is more complex than storage due to different service models (topic vs queue vs event stream). P3 because storage, secrets, and cache form the MVP.

**Independent Test**: Can be tested by publishing a message with one provider and consuming it with the same provider using local emulators.

**Acceptance Scenarios**:

1. **Given** a configured pub/sub provider, **When** I call `publish(topic, message)`, **Then** the message is delivered to the underlying service.
2. **Given** a subscribed topic/queue, **When** a message is published, **Then** I can `subscribe(handler)` and receive the message.
3. **Given** a message with ordering requirements, **When** published to a service that supports ordering (SQS FIFO, Event Hubs, Pub/Sub ordering keys), **Then** messages are delivered in order.
4. **Given** an Azure configuration specifying Event Hubs, **When** publishing, **Then** the `AzureEventHubsStrategy` is used with its specific connection semantics.

---

### User Story 6 - Key Management / KMS Abstraction (Priority: P4)

As a developer, I want a unified interface to encrypt, decrypt, and manage keys across AWS KMS, GCP Cloud KMS, and Azure Key Vault Keys, so my cryptographic operations are portable between clouds.

**Why this priority**: KMS is critical for compliance, but migration patterns are less common than storage or secrets. P4 because the interface is small and well-defined.

**Independent Test**: Can be tested by encrypting a payload with one provider and decrypting with the same provider using mock KMS implementations.

**Acceptance Scenarios**:

1. **Given** a configured KMS provider and a key ID, **When** I call `encrypt(keyId, plaintext)`, **Then** the ciphertext is returned.
2. **Given** a KMS provider and a ciphertext, **When** I call `decrypt(keyId, ciphertext)`, **Then** the original plaintext is returned.
3. **Given** an alias, **When** I call `createKey(alias)`, **Then** a new key is created and its metadata returned.
4. **Given** a key ID, **When** I call `scheduleKeyDeletion(keyId, windowDays)`, **Then** the key is scheduled for deletion per provider semantics.

---

### User Story 7 - NoSQL Database Abstraction (Priority: P4)

As a developer, I want a unified document database interface across DynamoDB, Firestore, and Cosmos DB, so my data access logic works regardless of the underlying cloud provider.

**Why this priority**: NoSQL databases have significantly different query models, making this the most complex abstraction. P4 because it requires careful design to avoid leaking provider-specific semantics.

**Independent Test**: Can be tested by putting a document with one provider, querying it with another (using local emulators), and verifying the document structure is preserved.

**Acceptance Scenarios**:

1. **Given** a configured NoSQL provider, **When** I call `putItem(collection, id, item)`, **Then** the document is persisted.
2. **Given** an existing document, **When** I call `getItem(collection, id)`, **Then** the document is returned.
3. **Given** a stored document, **When** I call `updateItem(collection, id, partialItem)`, **Then** only the specified fields are updated.
4. **Given** an existing document, **When** I call `deleteItem(collection, id)`, **Then** the document is removed.
5. **Given** a collection with documents, **When** I call `query(collection, filter)`, **Then** matching documents are returned.

---

### User Story 8 - Multi-Cloud Migration Utilities (Priority: P5)

As a developer, I want utilities to copy data between providers and validate consistency, so I can migrate my application from one cloud to another with minimal downtime.

**Why this priority**: Builds on P1+P2. Useful but not critical for initial adoption.

**Independent Test**: Can be tested by copying an object from a mock S3 provider to a mock GCS provider and verifying checksums.

**Acceptance Scenarios**:

1. **Given** source and destination providers, **When** copying an object, **Then** the object is transferred and its integrity is verified.
2. **Given** a migration operation, **When** it fails mid-transfer, **Then** the system reports partial progress without data corruption.

---

### Edge Cases

- What happens when credentials expire mid-operation? The library should surface the auth error clearly.
- How does the library handle provider-specific features that have no equivalent? (e.g., S3 object locking vs GCS retention policies) — these should be exposed as optional provider-specific methods.
- What happens when a network timeout occurs? The library supports configurable retry via `RetryConfig` in each strategy's options (`maxRetries`, `baseDelayMs`). Defaults: 3 retries, 100ms base delay.
- How are large files (streaming, multipart) handled? The interface includes optional `getObjectStream`/`putObjectStream` methods that return Node.js `Readable`/`Writable` streams. Providers that don't support streaming throw `NotImplementedError`.
- What happens if the `cloud` field and the `bucket` URL scheme disagree? `cloud` wins — the URL scheme in `bucket` is informational only.
- How do NoSQL query filters differ across providers? DynamoDB uses expression attributes, Firestore uses structured queries, Cosmos DB uses SQL. The library defines a provider-agnostic filter syntax (`QueryFilter` in data-model.md) that each provider strategy translates internally to its native format.
- What happens when a secret is scheduled for deletion vs immediately deleted? The delete interface should reflect the provider's actual behavior (soft-delete vs hard-delete).
- How does encryption context work across providers? AWS KMS uses encryption context, GCP uses additional authenticated data (AAD), Azure uses encryption context. The interface should use a common "encryption context" map that each provider maps to its native equivalent.
- What if `config` contains fields irrelevant to the current cloud? Most SDKs silently ignore unknown fields at the constructor level. If an SDK throws on unknown fields, the strategy implementation filters the `config` object to only the recognized keys. The library prefers passthrough and only filters when required by the SDK.
- What if `cloud: 'aws'` but `config` is empty? The AWS SDK uses its default credential chain (env vars, instance metadata, ~/.aws/credentials).

## Requirements

### Functional Requirements

- **FR-001**: Each package MUST export a factory function (e.g., `createStorage`, `createSecrets`) that accepts a generic config with `{ cloud, region, config? }`. All provider-specific nuances are passed through the generic `config: Record<string, any>` field — never via named cloud-specific namespaces.
- **FR-002**: The `cloud` field is ALWAYS the provider name: `'aws'`, `'gcp'`, or `'azure'`. This is consistent across ALL packages.
- **FR-003**: Each package MUST support `cloud` detection via `CLOUD_PROVIDER` env var when `cloud` is not explicitly set.
- **FR-004**: All cloud-specific nuances MUST be passed through a single generic `config: Record<string, any>` field. The library passes it directly to the provider SDK — it never interprets cloud-specific fields by name. This ensures application code never references cloud-specific parameters.
- **FR-005**: Storage packages MUST accept a `bucket` field that can contain URL schemes (`s3://bucket`, `gs://bucket`, `azblob://container`) to extract the resource name, but the provider is determined by `cloud`, never by the URL.
- **FR-006**: Storage interface MUST include `putObject`, `getObject`, `listObjects`, `deleteObject`, and `existsObject`. Providers that support streaming MUST also implement `getObjectStream` and `putObjectStream`.
- **FR-007**: Pub/Sub interface MUST include `publish`, `subscribe`, and `acknowledge`.
- **FR-008**: All methods MUST accept and return typed, documented data structures (no `any`).
- **FR-009**: System MUST throw typed errors (e.g., `CloudNotConfiguredError`, `ObjectNotFoundError`, `InvalidCloudError`).
- **FR-010**: Azure storage provider MUST support Azure Blob Storage (connection string, managed identity, DefaultAzureCredential).
- **FR-011**: AWS storage provider MUST support S3 (access key, IAM role, profile).
- **FR-012**: GCP storage provider MUST support Cloud Storage (service account key, ADC).
- **FR-013**: Azure pub/sub MUST provide 3 separate strategies: `AzureEventGridStrategy`, `AzureEventHubsStrategy`, and `AzureServiceBusStrategy`, each implementing the same PubSubStrategy interface.
- **FR-014**: AWS pub/sub abstraction MUST handle SNS (topic publish) and SQS (queue subscribe) consistently.
- **FR-015**: GCP pub/sub abstraction MUST handle Pub/Sub topics and subscriptions.
- **FR-016**: Library MUST be published as independent packages under `@agnostic-cloud/*`, each with CommonJS and ESM builds. NO shared core package.
- **FR-017**: Secrets interface MUST include `getSecret`, `createSecret`, `updateSecret`, `deleteSecret`, and `listSecrets`.
- **FR-018**: Cache interface MUST include `get`, `set`, `delete`, and `exists`.
- **FR-019**: KMS interface MUST include `encrypt`, `decrypt`, `createKey`, and `scheduleKeyDeletion`.
- **FR-020**: NoSQL database interface MUST include `putItem`, `getItem`, `updateItem`, `deleteItem`, and `query`.
- **FR-021**: Each provider strategy MUST accept a `RetryConfig` in its options, surfaced through factory options or the `config` passthrough, with `maxRetries` (default 3) and `baseDelayMs` (default 100) fields.

### Key Entities

- **StorageStrategy**: Interface with `putObject`, `getObject`, `listObjects`, `deleteObject`, `existsObject`. Implementations: S3, GCS, Azure Blob. Created via `createStorage(config)`.
- **SecretsStrategy**: Interface with `getSecret`, `createSecret`, `updateSecret`, `deleteSecret`, `listSecrets`. Implementations: AWS Secrets Manager, GCP Secret Manager, Azure Key Vault. Created via `createSecrets(config)`.
- **CacheStrategy**: Interface with `get`, `set`, `delete`, `exists`. Implementations: ElastiCache (Redis), Memorystore, Azure Cache for Redis. Created via `createCache(config)`.
- **KmsStrategy**: Interface with `encrypt`, `decrypt`, `createKey`, `scheduleKeyDeletion`. Implementations: AWS KMS, GCP Cloud KMS, Azure Key Vault Keys. Created via `createKms(config)`.
- **NoSqlStrategy**: Interface with `putItem`, `getItem`, `updateItem`, `deleteItem`, `query`. Implementations: DynamoDB, Firestore, Cosmos DB. Created via `createNoSql(config)`.
- **PubSubStrategy**: Interface with `publish`, `subscribe`, `acknowledge`. Implementations: AWS (SNS/SQS), GCP Pub/Sub, Azure (Event Grid, Event Hubs, Service Bus). Created via `createPubSub(config)`.
- **CloudConfig**: Generic config `{ cloud, region, config? }` consistent across all packages. `config` is a passthrough to the provider SDK — the library never interprets its fields. This ensures migration requires only env var changes.
- **CloudError**: Base typed error with provider context. Subtypes: `ObjectNotFoundError`, `SecretNotFoundError`, `InvalidCloudError`, `AuthError`, `TimeoutError`.

## Success Criteria

### Measurable Outcomes

- **SC-001**: A developer can switch from AWS to GCP by changing `cloud: 'aws'` → `cloud: 'gcp'` — zero other code changes.
- **SC-002**: Every package accepts the same `{ cloud, region }` config shape.
- **SC-003**: Library compiles with TypeScript strict mode, zero errors.
- **SC-004**: Library has >=90% branch coverage on the public API surface (all exported functions and strategy methods) using provider emulators (minio, fake-gcs-server, azurite, local Redis, KMS mocks).
- **SC-005**: Each package's own source code (interfaces, strategies, config, errors, resolver — excluding provider SDK peer dependencies) does not exceed 50KB gzipped (measured by `size-limit` with `--import` to exclude peer deps).
- **SC-006**: Using `@agnostic-cloud/storage` does not require installing `@agnostic-cloud/secrets` or any other package.
- **SC-007**: No shared core package — each package is fully independent.

## Assumptions

- Users have provider credentials available via environment variables, instance metadata, or explicit config.
- Providers can be tested locally via emulators (minio for S3, fake-gcs-server for GCS, Azurite for Azure).
- The library does not implement cloud provider authentication flows — it delegates to each provider's SDK.
- The user is responsible for installing the relevant provider SDK packages (peer dependencies).
- Timeout configuration is exclusively handled through the `config` passthrough — each provider SDK accepts its own timeout options (e.g., `requestTimeout` in AWS, `timeout` in GCP). The library does not abstract timeout semantics.
- The library does not enforce payload size limits; each provider SDK enforces its own limits. Large payloads (>100MB) should use streaming methods (`getObjectStream`/`putObjectStream`) when available.
- Target runtime is Node.js >= 18 (LTS), which provides built-in `Readable`/`Writable` stream APIs used by the streaming interface.
