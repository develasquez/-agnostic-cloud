# @agnostic-cloud/storage

Unified object storage interface for AWS S3, Google Cloud Storage, and Azure Blob Storage.

## Installation

```bash
npm install @agnostic-cloud/storage
```

## Usage

```typescript
import { createStorage } from '@agnostic-cloud/storage'

const storage = createStorage({
  cloud: 'aws',
  region: 'us-east-1',
})

// Upload
await storage.putObject('my-bucket', 'path/to/file.txt', Buffer.from('hello'))

// Download
const file = await storage.getObject('my-bucket', 'path/to/file.txt')

// List
const result = await storage.listObjects('my-bucket', { prefix: 'path/' })

// Delete
await storage.deleteObject('my-bucket', 'path/to/file.txt')

// Check existence
const exists = await storage.existsObject('my-bucket', 'path/to/file.txt')
```

## API

### `createStorage(config: StorageConfig): StorageStrategy`

| Method | Signature |
|--------|-----------|
| `putObject` | `(bucket, key, data, options?) => Promise<PutObjectResult>` |
| `getObject` | `(bucket, key) => Promise<GetObjectResult>` |
| `getObjectStream` | `(bucket, key) => Promise<Readable>` |
| `listObjects` | `(bucket, options?) => Promise<ListObjectsResult>` |
| `deleteObject` | `(bucket, key) => Promise<void>` |
| `existsObject` | `(bucket, key) => Promise<boolean>` |

## Configuration

```typescript
interface StorageConfig {
  cloud?: 'aws' | 'gcp' | 'azure'
  region?: string
  config?: Record<string, any>
  bucket?: string
}
```

## Documentation

Full docs: https://develasquez.github.io/-agnostic-cloud/docs/next/packages/storage

API reference: https://develasquez.github.io/-agnostic-cloud/docs/next/api/@agnostic-cloud/storage
