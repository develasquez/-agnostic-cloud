# @agnostic-cloud/migrate

Utility functions for cross-cloud object migration between AWS S3, GCP GCS, and Azure Blob Storage.

## Installation

```bash
npm install @agnostic-cloud/migrate @agnostic-cloud/storage
```

> **Note on Peer Dependencies**: Provider SDKs are optional peer dependencies. You only need to install the SDKs for the source and destination cloud providers involved in your migration.

### Supported Cloud Provider SDK Versions

| Cloud Provider | Required SDK Package | Current / Tested Version | Installation Command |
|---|---|---|---|
| **AWS** | `@aws-sdk/client-s3` | `^3.1095.0` | `npm install @aws-sdk/client-s3` |
| **GCP** | `@google-cloud/storage` | `^7.21.0` | `npm install @google-cloud/storage` |
| **Azure** | `@azure/storage-blob`<br/>`@azure/identity` | `^12.32.0`<br/>`^4.13.1` | `npm install @azure/storage-blob @azure/identity` |

## Usage

```typescript
import { copyObject, verifyIntegrity } from '@agnostic-cloud/migrate'

// Copy from S3 to GCS
const result = await copyObject(
  { cloud: 'aws', region: 'us-east-1' },
  's3://source-bucket/path/to/file.txt',
  { cloud: 'gcp', region: 'us-central1' },
  'gs://dest-bucket/path/to/file.txt',
)

console.log(`Transferred ${result.bytesTransferred} bytes`)

// Verify integrity after migration
const checksum = 'abc123...'
const valid = await verifyIntegrity(
  { cloud: 'gcp', region: 'us-central1' },
  'gs://dest-bucket/path/to/file.txt',
  checksum,
  'sha256',
)
```

## API

### `copyObject(sourceConfig, sourceUrl, destConfig, destUrl): Promise<CopyResult>`

Copies an object from any cloud provider to any other cloud provider.

| Parameter | Type | Description |
|-----------|------|-------------|
| `sourceConfig` | `StorageConfig` | Source cloud configuration |
| `sourceUrl` | `string` | Source object URL (`s3://bucket/key`, `gs://bucket/key`, `azblob://container/key`) |
| `destConfig` | `StorageConfig` | Destination cloud configuration |
| `destUrl` | `string` | Destination object URL |

### `verifyIntegrity(config, url, expectedChecksum, algorithm?): Promise<boolean>`

Verifies object integrity by computing and comparing a checksum.

| Parameter | Type | Description |
|-----------|------|-------------|
| `config` | `StorageConfig` | Cloud configuration |
| `url` | `string` | Object URL |
| `expectedChecksum` | `string` | Expected hex checksum |
| `algorithm` | `HashAlgorithm` | `'md5'` \| `'sha1'` \| `'sha256'` \| `'sha512'` (default: `'md5'`) |

## Documentation

Full docs: https://develasquez.github.io/-agnostic-cloud/docs/next/packages/migrate

API reference: https://develasquez.github.io/-agnostic-cloud/docs/next/api/@agnostic-cloud/migrate
