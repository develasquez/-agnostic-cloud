---
title: Cross-Cloud Migration
sidebar_label: Cross-Cloud Migration
---

# Cross-Cloud Migration

Learn how to migrate data between cloud providers using the `@agnostic-cloud/migrate` package.

## Prerequisites

```bash
npm install @agnostic-cloud/migrate
```

## Copy Objects Between Providers

```typescript
import { copyObject } from '@agnostic-cloud/migrate'

// S3 to GCS
await copyObject(
  { cloud: 'aws', region: 'us-east-1' },
  's3://my-source-bucket/file.txt',
  { cloud: 'gcp', config: { projectId: 'my-project' } },
  'gs://my-dest-bucket/file.txt',
)
```

## Verify Integrity

```typescript
import { verifyIntegrity } from '@agnostic-cloud/migrate'

const isIntact = await verifyIntegrity(
  { cloud: 'gcp', config: { projectId: 'my-project' } },
  'gs://my-dest-bucket/file.txt',
  'expected-sha256-checksum',
)
```

## Supported Provider Combinations

| Source | Destination | Notes |
|--------|-------------|-------|
| AWS S3 | GCP GCS | Direct copy via signed URLs |
| AWS S3 | Azure Blob | Download from S3, upload to Blob |
| GCP GCS | AWS S3 | Uses GCS signed URLs |
| GCP GCS | Azure Blob | Download from GCS, upload to Blob |
| Azure Blob | AWS S3 | Download from Blob, upload to S3 |
| Azure Blob | GCP GCS | Download from Blob, upload to GCS |
