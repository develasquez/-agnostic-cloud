---
title: '@agnostic-cloud/storage'
sidebar_label: Overview
---

import CloudTabs from '@site/src/components/CloudTabs';

# @agnostic-cloud/storage

Unified object storage interface for AWS S3, Google Cloud Storage, and Azure Blob Storage.

## Installation

```bash
npm install @agnostic-cloud/storage
```

You also need the provider SDK for your chosen cloud:
- AWS: `npm install @aws-sdk/client-s3`
- GCP: `npm install @google-cloud/storage`
- Azure: `npm install @azure/storage-blob @azure/identity`

## Factory Function

```typescript
import { createStorage } from '@agnostic-cloud/storage'

const storage = createStorage({
  cloud: 'aws',          // 'aws' | 'gcp' | 'azure'
  region: 'us-east-1',   // optional, defaults to provider default
  config: {              // passed verbatim to the provider SDK
    // cloud-specific options
  },
})
```

## Usage Examples

<CloudTabs
  aws={{
    title: 'AWS S3',
    code: `import { createStorage } from '@agnostic-cloud/storage'

const storage = createStorage({
  cloud: 'aws',
  region: 'us-east-1',
})

await storage.putObject('my-bucket', 'hello.txt', Buffer.from('Hello World'))
const result = await storage.getObject('my-bucket', 'hello.txt')
console.log(result.body.toString())`,
  }}
  gcp={{
    title: 'GCP GCS',
    code: `import { createStorage } from '@agnostic-cloud/storage'

const storage = createStorage({
  cloud: 'gcp',
  config: { projectId: 'my-project' },
})

await storage.putObject('my-bucket', 'hello.txt', Buffer.from('Hello World'))
const result = await storage.getObject('my-bucket', 'hello.txt')
console.log(result.body.toString())`,
  }}
  azure={{
    title: 'Azure Blob',
    code: `import { createStorage } from '@agnostic-cloud/storage'

const storage = createStorage({
  cloud: 'azure',
  config: { connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING },
})

await storage.putObject('my-container', 'hello.txt', Buffer.from('Hello World'))
const result = await storage.getObject('my-container', 'hello.txt')
console.log(result.body.toString())`,
  }}
/>

## Configuration

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `cloud` | `'aws' \| 'gcp' \| 'azure'` | yes | Cloud provider |
| `region` | string | no | Provider region |
| `config` | `Record<string, any>` | no | Passed verbatim to provider SDK |

## API Reference

See the [auto-generated API reference](/agnostic-layer/docs/next/api/@agnostic-cloud/storage) for full type signatures.

## Error Handling

```typescript
import { ObjectNotFoundError } from '@agnostic-cloud/storage'

try {
  await storage.getObject('my-bucket', 'missing.txt')
} catch (err) {
  if (err instanceof ObjectNotFoundError) {
    console.log('Object not found')
  }
}
```

| Error | When |
|-------|------|
| `ObjectNotFoundError` | Object does not exist |
| `AuthError` | Authentication failure |
| `TimeoutError` | Request timed out |
