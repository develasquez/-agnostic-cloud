---
title: '@agnostic-cloud/cache'
sidebar_label: Overview
---

import CloudTabs from '@site/src/components/CloudTabs';

# @agnostic-cloud/cache

Unified cache interface supporting AWS ElastiCache (Redis), GCP Memorystore (Redis), and Azure Cache for Redis.

## Installation

```bash
npm install @agnostic-cloud/cache
```

> **Note on Peer Dependencies**: Cloud provider SDKs are optional peer dependencies. You only need to install `ioredis` for Redis operations across AWS ElastiCache, GCP Memorystore, or Azure Cache for Redis.

### Supported Cloud Provider SDK Versions

| Cloud Provider | Required SDK Package | Current / Tested Version | Installation Command |
|---|---|---|---|
| **AWS / GCP / Azure** | `ioredis` | `^5.11.1` | `npm install ioredis` |

## Factory Function

```typescript
import { createCache } from '@agnostic-cloud/cache'

const cache = createCache({
  cloud: 'aws',
  config: {
    url: 'redis://localhost:6379',
  },
})
```

## Usage Examples

<CloudTabs
  aws={{
    title: 'AWS ElastiCache',
    code: `await cache.set('greeting', 'Hello World')
const value = await cache.get('greeting')
console.log(value) // 'Hello World'
await cache.delete('greeting')`,
  }}
  gcp={{
    title: 'GCP Memorystore',
    code: `await cache.set('greeting', 'Hello World')
const value = await cache.get('greeting')
console.log(value)`,
  }}
  azure={{
    title: 'Azure Cache for Redis',
    code: `await cache.set('greeting', 'Hello World')
const value = await cache.get('greeting')
console.log(value)`,
  }}
/>

## Configuration

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `cloud` | `'aws' \| 'gcp' \| 'azure'` | yes | Cloud provider |
| `config` | `Record<string, any>` | no | Passed verbatim (Redis URL, etc.) |

## API Reference

See the [auto-generated API reference](/-agnostic-cloud/docs/next/api/@agnostic-cloud/cache) for full type signatures.

## Error Handling

| Error | When |
|-------|------|
| `AuthError` | Authentication failure |
| `TimeoutError` | Request timed out |
