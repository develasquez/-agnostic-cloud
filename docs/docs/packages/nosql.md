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

> **Note on Peer Dependencies**: Cloud provider SDKs are optional peer dependencies. You only need to install the SDK for the cloud provider(s) you use.

### Supported Cloud Provider SDK Versions

| Cloud Provider | Required SDK Package | Current / Tested Version | Installation Command |
|---|---|---|---|
| **AWS** | `@aws-sdk/client-dynamodb`<br/>`@aws-sdk/util-dynamodb` | `^3.1095.0`<br/>`^3.996.7` | `npm install @aws-sdk/client-dynamodb @aws-sdk/util-dynamodb` |
| **GCP** | `@google-cloud/firestore` | `^7.11.6` | `npm install @google-cloud/firestore` |
| **Azure** | `@azure/cosmos`<br/>`@azure/identity` | `^4.9.3`<br/>`^4.13.1` | `npm install @azure/cosmos @azure/identity` |

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
