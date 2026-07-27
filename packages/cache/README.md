# @agnostic-cloud/cache

Unified cache interface for ElastiCache Redis, Memorystore, and Azure Cache for Redis.

## Installation

```bash
npm install @agnostic-cloud/cache
```

## Usage

```typescript
import { createCache } from '@agnostic-cloud/cache'

const cache = createCache({
  cloud: 'aws',
  region: 'us-east-1',
  host: 'my-cluster.xxxxx.ng.0001.use1.cache.amazonaws.com',
  port: 6379,
})

// Set
await cache.set('my-key', 'my-value', { ttlMs: 3600000 })

// Get
const value = await cache.get('my-key')

// Check existence
const exists = await cache.exists('my-key')

// Delete
await cache.del('my-key')
```

## API

### `createCache(config: CacheConfig): CacheStrategy`

| Method | Signature |
|--------|-----------|
| `get` | `(key) => Promise<string \| null>` |
| `set` | `(key, value, options?) => Promise<void>` |
| `del` | `(key) => Promise<void>` |
| `exists` | `(key) => Promise<boolean>` |

## Configuration

```typescript
interface CacheConfig {
  cloud?: 'aws' | 'gcp' | 'azure'
  region?: string
  config?: Record<string, any>
  host?: string
  port?: number
}
```

## Documentation

Full docs: https://develasquez.github.io/-agnostic-cloud/docs/next/packages/cache

API reference: https://develasquez.github.io/-agnostic-cloud/docs/next/api/@agnostic-cloud/cache
