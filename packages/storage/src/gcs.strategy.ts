import { Readable } from 'node:stream'
import { Storage } from '@google-cloud/storage'
import type { StorageConfig } from './config.js'
import { ObjectNotFoundError, AuthError } from './errors.js'
import { resolveCloud } from './resolver.js'
import { withRetry } from './retry.js'
import type {
  StorageStrategy,
  PutObjectOptions,
  PutObjectResult,
  GetObjectResult,
  ListObjectsOptions,
  ListObjectsResult,
  ObjectSummary,
} from './interface.js'

export class GcsStorageStrategy implements StorageStrategy {
  private storage: Storage
  private defaultBucket?: string
  private retryConfig: { maxRetries: number; baseDelayMs: number }

  constructor(config: StorageConfig) {
    resolveCloud(config, 'gcs')
    this.storage = new Storage(config.config)
    this.defaultBucket = config.bucket ? this.parseBucket(config.bucket) : undefined
    this.retryConfig = {
      maxRetries: config.config?.['maxRetries'] as number ?? 3,
      baseDelayMs: config.config?.['baseDelayMs'] as number ?? 100,
    }
  }

  private retry<T>(fn: () => Promise<T>): Promise<T> {
    return withRetry(fn, this.retryConfig)
  }

  private parseBucket(bucket: string): string {
    return bucket.replace(/^gs:\/\//, '')
  }

  async putObject(bucket: string, key: string, data: Buffer | Readable, options?: PutObjectOptions): Promise<PutObjectResult> {
    const b = this.storage.bucket(this.parseBucket(bucket))
    const file = b.file(key)

    try {
      if (Buffer.isBuffer(data)) {
        await this.retry(() => file.save(data, {
          contentType: options?.contentType,
          metadata: options?.metadata,
        } as any))
      } else {
        await new Promise<void>((resolve, reject) => {
          data.pipe(file.createWriteStream({
            contentType: options?.contentType,
            metadata: options?.metadata,
          } as any))
            .on('error', reject)
            .on('finish', resolve)
        })
      }

      const [meta] = await this.retry(() => file.getMetadata())
      return {
        etag: (meta.etag as string)?.replace(/"/g, '') ?? '',
        versionId: (meta.generation as number)?.toString(),
      }
    } catch (err: any) {
      if (err.code === 401) throw new AuthError('gcp', 'gcs', 'putObject')
      throw err
    }
  }

  async getObject(bucket: string, key: string): Promise<GetObjectResult> {
    const b = this.storage.bucket(this.parseBucket(bucket))
    const file = b.file(key)

    try {
      const [exists] = await this.retry(() => file.exists())
      if (!exists) throw new ObjectNotFoundError('gcp', 'gcs', bucket, key)

      const [buffer, meta] = await Promise.all([
        this.retry(() => file.download()),
        this.retry(() => file.getMetadata()),
      ])

      return {
        data: buffer[0],
        contentType: meta[0].contentType,
        metadata: meta[0].metadata as Record<string, string> | undefined,
        etag: (meta[0].etag as string)?.replace(/"/g, ''),
        lastModified: new Date(meta[0].updated ?? Date.now()),
      }
    } catch (err: any) {
      if (err instanceof ObjectNotFoundError) throw err
      if (err.code === 401) throw new AuthError('gcp', 'gcs', 'getObject')
      throw err
    }
  }

  async getObjectStream(bucket: string, key: string): Promise<Readable> {
    const b = this.storage.bucket(this.parseBucket(bucket))
    return b.file(key).createReadStream()
  }

  async listObjects(bucket: string, options?: ListObjectsOptions): Promise<ListObjectsResult> {
    const b = this.storage.bucket(this.parseBucket(bucket))

    const [files] = await this.retry(() => b.getFiles({
      prefix: options?.prefix,
      maxResults: options?.maxKeys,
    }))

    const objects: ObjectSummary[] = files.map((file: typeof files[number]) => ({
      key: file.name,
      size: Number(file.metadata.size ?? 0),
      etag: (file.metadata.etag as string)?.replace(/"/g, '') ?? '',
      lastModified: new Date(file.metadata.updated ?? Date.now()),
    }))

    return {
      objects,
      isTruncated: false,
    }
  }

  async deleteObject(bucket: string, key: string): Promise<void> {
    const b = this.storage.bucket(this.parseBucket(bucket))
    await this.retry(() => b.file(key).delete())
  }

  async existsObject(bucket: string, key: string): Promise<boolean> {
    const b = this.storage.bucket(this.parseBucket(bucket))
    const [exists] = await this.retry(() => b.file(key).exists())
    return exists
  }
}
