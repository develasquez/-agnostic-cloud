---
title: '@agnostic-cloud/migrate'
sidebar_label: Overview
---

import CloudTabs from '@site/src/components/CloudTabs';

# @agnostic-cloud/migrate

Cross-cloud migration utilities for copying data between providers and verifying integrity.

## Installation

```bash
npm install @agnostic-cloud/migrate @agnostic-cloud/storage
```

> **Note on Peer Dependencies**: Cloud provider SDKs are optional peer dependencies. You only need to install the SDKs for the source and destination cloud providers involved in your migration.

### Supported Cloud Provider SDK Versions

| Cloud Provider | Required SDK Package | Current / Tested Version | Installation Command |
|---|---|---|---|
| **AWS** | `@aws-sdk/client-s3` | `^3.1095.0` | `npm install @aws-sdk/client-s3` |
| **GCP** | `@google-cloud/storage` | `^7.21.0` | `npm install @google-cloud/storage` |
| **Azure** | `@azure/storage-blob`<br/>`@azure/identity` | `^12.32.0`<br/>`^4.13.1` | `npm install @azure/storage-blob @azure/identity` |

## Factory Function

Unlike other packages, `@agnostic-cloud/migrate` exports standalone functions:

```typescript
import { copyObject, verifyIntegrity } from '@agnostic-cloud/migrate'
```

## Usage Examples

<CloudTabs
  aws={{
    title: 'S3 to GCS',
    code: `import { copyObject } from '@agnostic-cloud/migrate'

await copyObject(
  { cloud: 'aws', region: 'us-east-1' },
  's3://my-bucket/hello.txt',
  { cloud: 'gcp', config: { projectId: 'my-project' } },
  'gs://my-bucket/hello.txt',
)`,
  }}
  gcp={{
    title: 'GCS to Azure',
    code: `import { copyObject } from '@agnostic-cloud/migrate'

await copyObject(
  { cloud: 'gcp', config: { projectId: 'my-project' } },
  'gs://my-bucket/hello.txt',
  { cloud: 'azure', config: { connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING } },
  'https://myaccount.blob.core.windows.net/my-container/hello.txt',
)`,
  }}
  azure={{
    title: 'Azure to S3',
    code: `import { copyObject } from '@agnostic-cloud/migrate'

await copyObject(
  { cloud: 'azure', config: { connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING } },
  'https://myaccount.blob.core.windows.net/my-container/hello.txt',
  { cloud: 'aws', region: 'us-east-1' },
  's3://my-bucket/hello.txt',
)`,
  }}
/>

## Integrity Verification

```typescript
import { verifyIntegrity } from '@agnostic-cloud/migrate'

const isValid = await verifyIntegrity(
  { cloud: 'aws', region: 'us-east-1' },
  's3://my-bucket/hello.txt',
  'expected-checksum-value',
)
console.log(isValid) // true or false
```

## Configuration

Source and destination configs follow the same `{ cloud, region, config }` pattern as factory functions.

## API Reference

See the [auto-generated API reference](/-agnostic-cloud/docs/next/api/@agnostic-cloud/migrate) for full type signatures.

## Error Handling

| Error | When |
|-------|------|
| `AuthError` | Authentication failure |
| `TimeoutError` | Request timed out |
