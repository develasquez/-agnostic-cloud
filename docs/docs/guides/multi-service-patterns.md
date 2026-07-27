---
title: Multi-Service Patterns
sidebar_label: Multi-Service Patterns
---

# Multi-Service Patterns

Combine multiple Agnostic Cloud packages to build complete applications.

## Storage + Secrets + NoSQL

Store encrypted data with keys managed across services:

```typescript
import { createStorage } from '@agnostic-cloud/storage'
import { createSecrets } from '@agnostic-cloud/secrets'
import { createNoSql } from '@agnostic-cloud/nosql'

const storage = createStorage({ cloud: 'aws', region: 'us-east-1' })
const secrets = createSecrets({ cloud: 'aws', region: 'us-east-1' })
const nosql = createNoSql({ cloud: 'aws', region: 'us-east-1' })

// Store a reference to a secret in the database
const apiKey = await secrets.createSecret('api-key', 'sk-1234')
await nosql.putItem('config', 'api-key-ref', {
  secretName: apiKey.name,
  createdAt: new Date().toISOString(),
})

// Upload file referencing the stored config
await storage.putObject('uploads', 'config-ref.json', Buffer.from(JSON.stringify({
  secretName: 'api-key-ref',
})))
```

## Cross-Cloud Composition

Mix cloud providers within the same application:

```typescript
const storage = createStorage({ cloud: 'aws', region: 'us-east-1' })
const secrets = createSecrets({ cloud: 'gcp', config: { projectId: 'my-project' } })
const nosql = createNoSql({ cloud: 'azure', config: { endpoint: process.env.COSMOS_ENDPOINT } })
```
