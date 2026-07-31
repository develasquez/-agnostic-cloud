import { describe, it, expect } from 'vitest'
import type { CacheConfig } from '../src/config.js'

describe.runIf(!process.env.CI)('cache e2e with redis', () => {
  it('should set, get, check existence, and delete via createCache', async () => {
    const { createCache } = await import('../src/index.js')
    const config: CacheConfig = {
      cloud: 'aws',
      region: 'us-east-1',
    }
    const cache = createCache(config)
    const key = `test-cache-${Date.now()}`
    await expect(cache.set(key, 'hello')).resolves.toBeUndefined()
    const val = await cache.get(key)
    expect(val).toBe('hello')
    await expect(cache.exists(key)).resolves.toBe(true)
    await cache.del(key)
    await expect(cache.exists(key)).resolves.toBe(false)
  })

  it('should support oci cloud mapping', async () => {
    const { createCache } = await import('../src/index.js')
    const config: CacheConfig = {
      cloud: 'oci',
    }
    const cache = createCache(config)
    const key = `test-cache-oci-${Date.now()}`
    await expect(cache.set(key, 'hello oci')).resolves.toBeUndefined()
    const val = await cache.get(key)
    expect(val).toBe('hello oci')
    await cache.del(key)
  })
})

