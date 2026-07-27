---
title: '@agnostic-cloud/nosql'
sidebar_label: Overview
---

import CloudTabs from '@site/src/components/CloudTabs';

# @agnostic-cloud/nosql

Unified NoSQL document database interface for AWS DynamoDB, GCP Firestore, and Azure Cosmos DB.

## Installation

```bash
npm install @agnostic-cloud/nosql
```

Provider SDKs:
- AWS: `npm install @aws-sdk/client-dynamodb @aws-sdk/util-dynamodb`
- GCP: `npm install @google-cloud/firestore`
- Azure: `npm install @azure/cosmos`

## Factory Function

```typescript
import { createNoSql } from '@agnostic-cloud/nosql'

const nosql = createNoSql({
  cloud: 'aws',
  region: 'us-east-1',
  config: {
    // cloud-specific options
  },
})
```

## Usage Examples

<CloudTabs
  aws={{
    title: 'AWS DynamoDB',
    code: `await nosql.putItem('users', 'user-1', { name: 'Alice', email: 'alice@example.com' })
const user = await nosql.getItem('users', 'user-1')
console.log(user)`,
  }}
  gcp={{
    title: 'GCP Firestore',
    code: `await nosql.putItem('users', 'user-1', { name: 'Alice', email: 'alice@example.com' })
const user = await nosql.getItem('users', 'user-1')
console.log(user)`,
  }}
  azure={{
    title: 'Azure Cosmos DB',
    code: `await nosql.putItem('users', 'user-1', { name: 'Alice', email: 'alice@example.com' })
const user = await nosql.getItem('users', 'user-1')
console.log(user)`,
  }}
/>

## Configuration

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `cloud` | `'aws' \| 'gcp' \| 'azure'` | yes | Cloud provider |
| `region` | string | no | Provider region |
| `config` | `Record<string, any>` | no | Passed verbatim to provider SDK |

## API Reference

See the [auto-generated API reference](/-agnostic-cloud/docs/next/api/@agnostic-cloud/nosql) for full type signatures.

## Error Handling

| Error | When |
|-------|------|
| `AuthError` | Authentication failure |
| `TimeoutError` | Request timed out |
