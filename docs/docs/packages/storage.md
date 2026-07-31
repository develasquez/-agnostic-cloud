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

> **Note on Peer Dependencies**: Cloud provider SDKs are optional peer dependencies. You only need to install the SDK for the cloud provider(s) you use.

### Supported Cloud Provider SDK Versions

| Cloud Provider | Required SDK Package | Current / Tested Version | Installation Command |
|---|---|---|---|
| **AWS** | `@aws-sdk/client-s3` | `^3.1095.0` | `npm install @aws-sdk/client-s3` |
| **GCP** | `@google-cloud/storage` | `^7.21.0` | `npm install @google-cloud/storage` |
| **Azure** | `@azure/storage-blob`<br/>`@azure/identity` | `^12.32.0`<br/>`^4.13.1` | `npm install @azure/storage-blob @azure/identity` |
| **OCI** | `oci-sdk` | `^2.97.0` | `npm install oci-sdk` |

## Factory Function

```typescript
import { createStorage } from '@agnostic-cloud/storage'

const storage = createStorage({
  cloud: 'oci',          // 'aws' | 'gcp' | 'azure' | 'oci'
  region: 'us-ashburn-1',   // optional, defaults to provider default
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
  oci={{
    title: 'OCI Object Storage',
    code: `import { createStorage } from '@agnostic-cloud/storage'

const storage = createStorage({
  cloud: 'oci',
  config: {
    tenancy: process.env.OCI_TENANCY,
    user: process.env.OCI_USER,
    fingerprint: process.env.OCI_FINGERPRINT,
    privateKey: process.env.OCI_PRIVATE_KEY,
  },
})

await storage.putObject('my-bucket', 'hello.txt', Buffer.from('Hello World'))
const result = await storage.getObject('my-bucket', 'hello.txt')
console.log(result.body.toString())`,
  }}
/>

## Configuration

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `cloud` | `'aws' \| 'gcp' \| 'azure' \| 'oci'` | yes | Cloud provider |
| `region` | string | no | Provider region |
| `config` | `Record<string, any>` | no | Passed verbatim to provider SDK |

## API Reference

See the [auto-generated API reference](/-agnostic-cloud/docs/next/api/@agnostic-cloud/storage) for full type signatures.

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
