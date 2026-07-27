# Data Model: cloud-abstraction

**Feature**: `001-cloud-abstraction`

---

## Generic CloudConfig (same shape in every package)

```typescript
interface CloudConfig {
  cloud?: 'aws' | 'gcp' | 'azure'   // if omitted, reads CLOUD_PROVIDER env var
  region?: string
  config?: Record<string, any>       // passthrough to the provider SDK — cloud-specific nuances live here
}
```

The `config` field is opaque to the library. It is passed directly to the underlying provider SDK constructor.
Since the library knows which cloud is active (from the `cloud` field), it knows which SDK config to apply it to.
Users NEVER reference cloud-specific fields in their application code — everything lives in environment variables.

### StorageConfig

```typescript
interface StorageConfig extends CloudConfig {
  bucket?: string    // "s3://my-bucket", "gs://my-bucket", "azblob://container", or plain name
}
```

### SecretsConfig

```typescript
interface SecretsConfig extends CloudConfig {}
```

### CacheConfig

```typescript
interface CacheConfig extends CloudConfig {
  host?: string
  port?: number
}
```

### KmsConfig

```typescript
interface KmsConfig extends CloudConfig {}
```

### PubSubConfig

```typescript
interface PubSubConfig extends CloudConfig {
  azureService?: 'event-grid' | 'event-hubs' | 'service-bus'  // Azure sub-service selector
}
```

### NoSqlConfig

```typescript
interface NoSqlConfig extends CloudConfig {
  databaseId?: string  // Cosmos DB database id
}
```

### Ejemplo de migración (solo cambian env vars)

```bash
# AWS → solo cambia CLOUD, STORAGE_URL, y REGION (y CONFIG si hace falta)
CLOUD=aws      STORAGE_URL=s3://bucket      REGION=us-east-1  CONFIG='{"endpoint":"..."}'           npx ts-node app.ts
CLOUD=gcp      STORAGE_URL=gs://bucket      REGION=us-east1   CONFIG='{"projectId":"my-project"}'   npx ts-node app.ts
CLOUD=azure    STORAGE_URL=azblob://container REGION=eastus     CONFIG='{"connectionString":"..."}'    npx ts-node app.ts
```

El código de la aplicación es idéntico en los 3 casos:

```typescript
const storage = createStorage({
  cloud: process.env.CLOUD,
  bucket: process.env.STORAGE_URL,
  region: process.env.REGION,
  config: JSON.parse(process.env.CONFIG || '{}'),
})
```

---

## Cloud Resolver (embedded in each package)

```typescript
type Cloud = 'aws' | 'gcp' | 'azure'

function resolveCloud(config: CloudConfig): Cloud {
  if (config.cloud) return config.cloud
  const env = process.env.CLOUD_PROVIDER?.toLowerCase()
  if (env === 'aws' || env === 'gcp' || env === 'azure') return env
  throw new CloudNotConfiguredError(...)
}
```

The `config` field is passed through to the provider SDK. Each cloud's SDK constructor receives it directly:

| Cloud | SDK Constructor | config passthrough |
|---|---|---|
| AWS | `new S3Client({ ...config })` | AWS SDK config (endpoint, credentials, etc.) |
| GCP | `new Storage({ ...config })` | GCP Storage config (projectId, keyFile, etc.) |
| Azure | `new BlobServiceClient(url, credential, { ...config })` | Azure SDK options |
| Redis | `new Redis({ ...config })` | ioredis options |

---

## Strategy Interfaces

### StorageStrategy

```typescript
interface StorageStrategy {
  putObject(
    bucket: string,
    key: string,
    data: Buffer | Readable,
    options?: PutObjectOptions
  ): Promise<PutObjectResult>

  getObject(
    bucket: string,
    key: string
  ): Promise<GetObjectResult>

  getObjectStream(
    bucket: string,
    key: string
  ): Promise<Readable>  // Optional: throws if not supported

  listObjects(
    bucket: string,
    options?: ListObjectsOptions
  ): Promise<ListObjectsResult>

  deleteObject(
    bucket: string,
    key: string
  ): Promise<void>

  existsObject(
    bucket: string,
    key: string
  ): Promise<boolean>
}

interface PutObjectOptions {
  contentType?: string
  metadata?: Record<string, string>
  cacheControl?: string
}

interface PutObjectResult {
  etag: string
  versionId?: string
}

interface GetObjectResult {
  data: Buffer
  contentType?: string
  metadata?: Record<string, string>
  etag?: string
  lastModified?: Date
}

interface ListObjectsOptions {
  prefix?: string
  maxKeys?: number
  startAfter?: string
}

interface ListObjectsResult {
  objects: ObjectSummary[]
  isTruncated: boolean
  nextContinuationToken?: string
}

interface ObjectSummary {
  key: string
  size: number
  etag: string
  lastModified: Date
}
```

### SecretsStrategy

```typescript
interface SecretsStrategy {
  getSecret(name: string): Promise<SecretValue>
  createSecret(name: string, value: string, options?: CreateSecretOptions): Promise<SecretMetadata>
  updateSecret(name: string, value: string): Promise<SecretMetadata>
  deleteSecret(name: string, options?: DeleteSecretOptions): Promise<void>
  listSecrets(options?: ListSecretsOptions): Promise<ListSecretsResult>
}

interface SecretValue {
  name: string
  value: string
  versionId?: string
  created: Date
  lastModified: Date
}

interface SecretMetadata {
  name: string
  arn?: string
  created: Date
}

interface CreateSecretOptions {
  description?: string
  tags?: Record<string, string>
}

interface DeleteSecretOptions {
  recoveryWindowDays?: number  // AWS: 7-30, GCP: 1-30, Azure: 7-90
  forceDelete?: boolean
}

interface ListSecretsOptions {
  maxResults?: number
  nextToken?: string
}

interface ListSecretsResult {
  secrets: SecretMetadata[]
  nextToken?: string
}
```

### CacheStrategy

```typescript
interface CacheStrategy {
  get(key: string): Promise<string | null>
  set(key: string, value: string, ttlSeconds?: number): Promise<void>
  delete(key: string): Promise<void>
  exists(key: string): Promise<boolean>
}
```

### KmsStrategy

```typescript
interface KmsStrategy {
  encrypt(keyId: string, plaintext: Buffer | string, context?: EncryptionContext): Promise<EncryptResult>
  decrypt(keyId: string, ciphertext: Buffer, context?: EncryptionContext): Promise<DecryptResult>
  createKey(alias: string, options?: CreateKeyOptions): Promise<KeyMetadata>
  scheduleKeyDeletion(keyId: string, windowDays?: number): Promise<Date>  // returns scheduled deletion date
}

interface EncryptionContext {
  [key: string]: string
}

interface EncryptResult {
  ciphertext: Buffer
  keyId: string
  encryptionAlgorithm?: string
}

interface DecryptResult {
  plaintext: Buffer
  keyId: string
}

interface CreateKeyOptions {
  description?: string
  tags?: Record<string, string>
}

interface KeyMetadata {
  keyId: string
  arn: string
  alias: string
  created: Date
  enabled: boolean
}
```

### PubSubStrategy

```typescript
interface PubSubStrategy {
  publish(topic: string, message: MessagePayload): Promise<PublishResult>
  subscribe(
    topic: string,
    handler: MessageHandler,
    options?: SubscribeOptions
  ): Promise<Subscription>
  acknowledge(subscription: Subscription, message: Message): Promise<void>
}

interface MessagePayload {
  data: Buffer | string
  attributes?: Record<string, string>
  orderingKey?: string
}

interface PublishResult {
  messageId: string
  sequenceNumber?: string
}

interface Message {
  id: string
  data: Buffer
  attributes: Record<string, string>
  publishTime: Date
  deliveryAttempt?: number
}

type MessageHandler = (message: Message) => Promise<void>

interface SubscribeOptions {
  maxMessages?: number
  visibilityTimeout?: number  // SQS visibility timeout equivalent
}

interface Subscription {
  id: string
  unsubscribe(): Promise<void>
}
```

### NoSqlStrategy

```typescript
interface NoSqlStrategy {
  putItem(collection: string, id: string, item: Document): Promise<void>
  getItem(collection: string, id: string): Promise<Document | null>
  updateItem(collection: string, id: string, changes: Partial<Document>): Promise<Document>
  deleteItem(collection: string, id: string): Promise<void>
  query(collection: string, filter: QueryFilter, options?: QueryOptions): Promise<QueryResult>
}

type Document = Record<string, any>

interface QueryFilter {
  [field: string]: FilterOperator
}

interface FilterOperator {
  $eq?: any
  $ne?: any
  $gt?: number | string | Date
  $gte?: number | string | Date
  $lt?: number | string | Date
  $lte?: number | string | Date
  $in?: any[]
  $contains?: string      // string containment
  $exists?: boolean        // field existence
}

interface QueryOptions {
  limit?: number
  offset?: number
  orderBy?: { field: string; direction: 'asc' | 'desc' }
  select?: string[]    // specific fields to return
}

interface QueryResult {
  items: Document[]
  count: number
  nextToken?: string
}
```

---

## Error Types (defined in each package, same naming convention)

```typescript
interface RetryConfig {
  maxRetries?: number     // default 3
  baseDelayMs?: number    // default 100
}

abstract class CloudError extends Error {
  constructor(
    message: string,
    public readonly cloud: string,     // 'aws' | 'gcp' | 'azure'
    public readonly service: string,   // 's3', 'secrets-manager', 'kms', etc.
    public readonly operation: string
  )
}

class CloudNotConfiguredError extends CloudError {}
class InvalidCloudError extends CloudError {}    // thrown when cloud value is not aws/gcp/azure
class ObjectNotFoundError extends CloudError {}
class SecretNotFoundError extends CloudError {}
class AuthError extends CloudError {}
class TimeoutError extends CloudError {}
class ValidationError extends CloudError {}
class NotImplementedError extends CloudError {}  // for optional methods
```

---

## Cloud Resolver (embedded in each package)

```typescript
type Cloud = 'aws' | 'gcp' | 'azure'

function resolveCloud(config: CloudConfig): Cloud {
  if (config.cloud) return config.cloud
  const env = process.env.CLOUD_PROVIDER?.toLowerCase()
  if (env === 'aws' || env === 'gcp' || env === 'azure') return env
  throw new CloudNotConfiguredError(...)
}
```
