import Redis from 'ioredis'
import type { CacheConfig } from './config.js'
import { resolveCloud } from './resolver.js'
import { withRetry } from './retry.js'
import type { CacheStrategy, SetOptions } from './interface.js'

export class RedisCacheStrategy implements CacheStrategy {
  private client: Redis
  private retryConfig: { maxRetries: number; baseDelayMs: number }

  constructor(config: CacheConfig) {
    resolveCloud(config, 'redis')
    const url = config.config?.['url'] as string | undefined ?? `redis://${config.config?.['host'] ?? 'localhost'}:${config.config?.['port'] ?? 6379}`
    this.client = new Redis(url)
    this.retryConfig = {
      maxRetries: config.config?.['maxRetries'] as number ?? 3,
      baseDelayMs: config.config?.['baseDelayMs'] as number ?? 100,
    }
  }

  private retry<T>(fn: () => Promise<T>): Promise<T> {
    return withRetry(fn, this.retryConfig)
  }

  async get(key: string): Promise<string | null> {
    return this.retry(() => this.client.get(key))
  }

  async set(key: string, value: string, options?: SetOptions): Promise<void> {
    if (options?.ttlMs) {
      const ttlMs = options.ttlMs
      await this.retry(() => this.client.set(key, value, 'EX', Math.ceil(ttlMs / 1000)) as Promise<'OK'>)
    } else {
      await this.retry(() => this.client.set(key, value))
    }
  }

  async del(key: string): Promise<void> {
    await this.retry(() => this.client.del(key))
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.retry(() => this.client.exists(key))
    return result === 1
  }
}
