---
title: LLM Reference
sidebar_label: LLM Reference
description: Compact API surface optimized for AI coding assistants
---

# LLM Reference

Optimized for AI coding assistants. Complete API surface in compact format.

## Pattern

```
createXxx(config: { cloud: 'aws'|'gcp'|'azure', region?: string, config?: Record<string,any> }): XxxStrategy
```

## Config Shape (all packages)

```typescript
interface CloudConfig {
  cloud: 'aws' | 'gcp' | 'azure'
  region?: string
  config?: Record<string, any>  // passed verbatim to provider SDK
}
```

## Packages

### @agnostic-cloud/storage
`createStorage(config: StorageConfig): StorageStrategy`
- `putObject(bucket, key, body, opts?)` → `PutObjectResult`
- `getObject(bucket, key)` → `GetObjectResult`
- `deleteObject(bucket, key)` → `void`
- `listObjects(bucket, prefix?)` → `ListObjectsResult`
- Errors: `ObjectNotFoundError`, `AuthError`, `TimeoutError`

### @agnostic-cloud/secrets
`createSecrets(config: SecretsConfig): SecretsStrategy`
- `createSecret(name, value, opts?)` → `SecretMetadata`
- `getSecret(name)` → `SecretValue`
- `updateSecret(name, value)` → `SecretMetadata`
- `deleteSecret(name, opts?)` → `void`
- `listSecrets(opts?)` → `ListSecretsResult`
- Errors: `SecretNotFoundError`, `AuthError`

### @agnostic-cloud/cache
`createCache(config: CacheConfig): CacheStrategy`
- `set(key, value, opts?)` → `void`
- `get(key)` → `string | null`
- `delete(key)` → `void`
- `exists(key)` → `boolean`
- Errors: `AuthError`, `TimeoutError`

### @agnostic-cloud/kms
`createKms(config: KmsConfig): KmsStrategy`
- `encrypt(keyId, plaintext, context?)` → `EncryptResult`
- `decrypt(keyId, ciphertext, context?)` → `DecryptResult`
- `createKey(alias, opts?)` → `KeyMetadata`
- Errors: `AuthError`, `TimeoutError`

### @agnostic-cloud/pubsub
`createPubSub(config: PubSubConfig): PubSubStrategy`
- `publish(topic, message)` → `PublishResult`
- `subscribe(topic, handler, opts?)` → `Subscription`
- Errors: `AuthError`, `TimeoutError`

### @agnostic-cloud/nosql
`createNoSql(config: NoSqlConfig): NoSqlStrategy`
- `putItem(collection, id, item)` → `void`
- `getItem(collection, id)` → `Document | null`
- `updateItem(collection, id, changes)` → `Document`
- `deleteItem(collection, id)` → `void`
- `query(collection, filter, opts?)` → `QueryResult`
- Errors: `AuthError`, `TimeoutError`

### @agnostic-cloud/migrate
`copyObject(sourceConfig, sourceUrl, destConfig, destUrl)` → `CopyResult`
`verifyIntegrity(config, url, expectedChecksum, algorithm?)` → `boolean`

## Error Hierarchy

```
CloudError
├── CloudNotConfiguredError
├── InvalidCloudError
├── AuthError
├── TimeoutError
├── ValidationError
├── NotImplementedError
├── ObjectNotFoundError     (storage)
├── SecretNotFoundError     (secrets)
```
