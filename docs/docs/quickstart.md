---
title: Quickstart
sidebar_label: Quickstart
---

# Quickstart

Get your first Agnostic Cloud example running in under 5 minutes.

## 1. Install

```bash
npm install @agnostic-cloud/storage
npm install @aws-sdk/client-s3   # for AWS
```

## 2. Configure

```typescript
import { createStorage } from '@agnostic-cloud/storage'

const storage = createStorage({
  cloud: 'aws',
  region: 'us-east-1',
})
```

## 3. Use

```typescript
// Upload
await storage.putObject('my-bucket', 'hello.txt', Buffer.from('Hello World!'))

// Download
const result = await storage.getObject('my-bucket', 'hello.txt')
console.log(result.body.toString()) // 'Hello World!'
```

## 4. Switch Clouds

Change `cloud: 'aws'` to `cloud: 'gcp'`, `cloud: 'azure'`, or `cloud: 'oci'` — the same code works with Google Cloud Storage, Azure Blob Storage, and OCI Object Storage.

[See all packages →](/-agnostic-cloud/docs/next/packages/storage)
