/**
 * @agnostic-cloud — Public API Type Declarations
 *
 * Each package is independent. Import only what you need.
 *
 * Storage:  import { createStorage, StorageStrategy } from '@agnostic-cloud/storage'
 * Secrets:  import { createSecrets, SecretsStrategy } from '@agnostic-cloud/secrets'
 * Cache:    import { createCache, CacheStrategy } from '@agnostic-cloud/cache'
 * KMS:      import { createKms, KmsStrategy } from '@agnostic-cloud/kms'
 * PubSub:   import { createPubSub, PubSubStrategy } from '@agnostic-cloud/pubsub'
 * NoSQL:    import { createNoSql, NoSqlStrategy } from '@agnostic-cloud/nosql'
 * Migrate:  import { copyObject } from '@agnostic-cloud/migrate'
 */

// ── Common Config (same shape in every package) ────────────

export interface CloudConfig {
  cloud?: Cloud
  region?: string
  config?: Record<string, any>  // passthrough to provider SDK — cloud-specific nuances live here
}

export type Cloud = 'aws' | 'gcp' | 'azure'

// ── Storage (@agnostic-cloud/storage) ──────────────────────

export function createStorage(config: StorageConfig): StorageStrategy

export interface StorageConfig extends CloudConfig {
  bucket?: string        // "s3://bucket", "gs://bucket", "azblob://container", or plain name
}

export interface StorageStrategy {
  putObject(bucket: string, key: string, data: Buffer | NodeJS.ReadableStream, options?: PutObjectOptions): Promise<PutObjectResult>
  getObject(bucket: string, key: string): Promise<GetObjectResult>
  getObjectStream(bucket: string, key: string): Promise<NodeJS.ReadableStream>
  listObjects(bucket: string, options?: ListObjectsOptions): Promise<ListObjectsResult>
  deleteObject(bucket: string, key: string): Promise<void>
  existsObject(bucket: string, key: string): Promise<boolean>
}

export interface PutObjectOptions {
  contentType?: string
  metadata?: Record<string, string>
  cacheControl?: string
}

export interface PutObjectResult {
  etag: string
  versionId?: string
}

export interface GetObjectResult {
  data: Buffer
  contentType?: string
  metadata?: Record<string, string>
  etag?: string
  lastModified?: Date
}

export interface ListObjectsOptions {
  prefix?: string
  maxKeys?: number
  startAfter?: string
}

export interface ListObjectsResult {
  objects: ObjectSummary[]
  isTruncated: boolean
  nextContinuationToken?: string
}

export interface ObjectSummary {
  key: string
  size: number
  etag: string
  lastModified: Date
}

// ── Secrets (@agnostic-cloud/secrets) ──────────────────────

export function createSecrets(config: SecretsConfig): SecretsStrategy

export interface SecretsConfig extends CloudConfig {}

export interface SecretsStrategy {
  getSecret(name: string): Promise<SecretValue>
  createSecret(name: string, value: string, options?: CreateSecretOptions): Promise<SecretMetadata>
  updateSecret(name: string, value: string): Promise<SecretMetadata>
  deleteSecret(name: string, options?: DeleteSecretOptions): Promise<void>
  listSecrets(options?: ListSecretsOptions): Promise<ListSecretsResult>
}

export interface SecretValue {
  name: string
  value: string
  versionId?: string
  created: Date
  lastModified: Date
}

export interface SecretMetadata {
  name: string
  arn?: string
  created: Date
}

export interface CreateSecretOptions {
  description?: string
  tags?: Record<string, string>
}

export interface DeleteSecretOptions {
  recoveryWindowDays?: number
  forceDelete?: boolean
}

export interface ListSecretsOptions {
  maxResults?: number
  nextToken?: string
}

export interface ListSecretsResult {
  secrets: SecretMetadata[]
  nextToken?: string
}

// ── Cache (@agnostic-cloud/cache) ──────────────────────────

export function createCache(config: CacheConfig): CacheStrategy

export interface CacheConfig extends CloudConfig {
  host?: string
  port?: number
}

export interface CacheStrategy {
  get(key: string): Promise<string | null>
  set(key: string, value: string, ttlSeconds?: number): Promise<void>
  delete(key: string): Promise<void>
  exists(key: string): Promise<boolean>
}

// ── KMS (@agnostic-cloud/kms) ──────────────────────────────

export function createKms(config: KmsConfig): KmsStrategy

export interface KmsConfig extends CloudConfig {}

export interface KmsStrategy {
  encrypt(keyId: string, plaintext: Buffer | string, context?: EncryptionContext): Promise<EncryptResult>
  decrypt(keyId: string, ciphertext: Buffer, context?: EncryptionContext): Promise<DecryptResult>
  createKey(alias: string, options?: CreateKeyOptions): Promise<KeyMetadata>
  scheduleKeyDeletion(keyId: string, windowDays?: number): Promise<Date>
}

export interface EncryptionContext {
  [key: string]: string
}

export interface EncryptResult {
  ciphertext: Buffer
  keyId: string
  encryptionAlgorithm?: string
}

export interface DecryptResult {
  plaintext: Buffer
  keyId: string
}

export interface CreateKeyOptions {
  description?: string
  tags?: Record<string, string>
}

export interface KeyMetadata {
  keyId: string
  arn: string
  alias: string
  created: Date
  enabled: boolean
}

// ── Pub/Sub (@agnostic-cloud/pubsub) ───────────────────────

export function createPubSub(config: PubSubConfig): PubSubStrategy

export interface PubSubConfig extends CloudConfig {
  azureService?: 'event-grid' | 'event-hubs' | 'service-bus'
}

export interface PubSubStrategy {
  publish(topic: string, message: MessagePayload): Promise<PublishResult>
  subscribe(topic: string, handler: MessageHandler, options?: SubscribeOptions): Promise<SubscriptionHandle>
  acknowledge(subscription: SubscriptionHandle, message: Message): Promise<void>
}

export interface MessagePayload {
  data: Buffer | string
  attributes?: Record<string, string>
  orderingKey?: string
}

export interface PublishResult {
  messageId: string
  sequenceNumber?: string
}

export interface Message {
  id: string
  data: Buffer
  attributes: Record<string, string>
  publishTime: Date
  deliveryAttempt?: number
}

export type MessageHandler = (message: Message) => Promise<void>

export interface SubscribeOptions {
  maxMessages?: number
  visibilityTimeout?: number
}

export interface SubscriptionHandle {
  id: string
  unsubscribe(): Promise<void>
}

// ── NoSQL (@agnostic-cloud/nosql) ──────────────────────────

export function createNoSql(config: NoSqlConfig): NoSqlStrategy

export interface NoSqlConfig extends CloudConfig {
  projectId?: string
  databaseId?: string
}

export interface NoSqlStrategy {
  putItem(collection: string, id: string, item: Document): Promise<void>
  getItem(collection: string, id: string): Promise<Document | null>
  updateItem(collection: string, id: string, changes: Partial<Document>): Promise<Document>
  deleteItem(collection: string, id: string): Promise<void>
  query(collection: string, filter: QueryFilter, options?: QueryOptions): Promise<QueryResult>
}

export type Document = Record<string, unknown>

export interface QueryFilter {
  [field: string]: FilterOperator
}

export interface FilterOperator {
  $eq?: unknown
  $ne?: unknown
  $gt?: number | string | Date
  $gte?: number | string | Date
  $lt?: number | string | Date
  $lte?: number | string | Date
  $in?: unknown[]
  $contains?: string
  $exists?: boolean
}

export interface QueryOptions {
  limit?: number
  offset?: number
  orderBy?: { field: string; direction: 'asc' | 'desc' }
  select?: string[]
}

export interface QueryResult {
  items: Document[]
  count: number
  nextToken?: string
}

// ── Errors (defined in each package with same convention) ────

export abstract class CloudError extends Error {
  readonly cloud: string           // 'aws' | 'gcp' | 'azure'
  readonly service: string
  readonly operation: string
}

export class CloudNotConfiguredError extends CloudError {}
export class InvalidCloudError extends CloudError {}
export class ObjectNotFoundError extends CloudError {}
export class SecretNotFoundError extends CloudError {}
export class AuthError extends CloudError {}
export class TimeoutError extends CloudError {}
export class ValidationError extends CloudError {}
export class NotImplementedError extends CloudError {}

// ── Migrate (@agnostic-cloud/migrate) ────────────────────────

export function copyObject(config: CopyConfig): Promise<void>
export function verifyIntegrity(config: VerifyConfig): Promise<boolean>

export interface CopyConfig {
  source: { cloud: Cloud; bucket: string; key: string }
  dest: { cloud: Cloud; bucket: string; key: string }
}

export interface VerifyConfig {
  cloud: Cloud
  bucket: string
  key: string
  expectedChecksum: string
}
