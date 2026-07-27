import { Readable } from 'node:stream'
import { BlobServiceClient } from '@azure/storage-blob'
import { DefaultAzureCredential } from '@azure/identity'
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

export class AzureBlobStorageStrategy implements StorageStrategy {
  private client: BlobServiceClient
  private defaultContainer?: string
  private retryConfig: { maxRetries: number; baseDelayMs: number }

  constructor(config: StorageConfig) {
    resolveCloud(config, 'azure-blob')

    const connectionString = config.config?.['connectionString'] as string | undefined
    if (connectionString) {
      this.client = BlobServiceClient.fromConnectionString(connectionString, config.config)
    } else {
      const account = config.config?.['account'] as string | undefined
      const accountUrl = `https://${account ?? 'devstoreaccount1'}.blob.core.windows.net`
      this.client = new BlobServiceClient(accountUrl, new DefaultAzureCredential(), config.config)
    }

    this.defaultContainer = config.bucket ? this.parseBucket(config.bucket) : undefined
    this.retryConfig = {
      maxRetries: config.config?.['maxRetries'] as number ?? 3,
      baseDelayMs: config.config?.['baseDelayMs'] as number ?? 100,
    }
  }

  private retry<T>(fn: () => Promise<T>): Promise<T> {
    return withRetry(fn, this.retryConfig)
  }

  private parseBucket(container: string): string {
    return container.replace(/^azblob:\/\//, '')
  }

  private getContainerClient(bucket: string) {
    return this.client.getContainerClient(this.parseBucket(bucket))
  }

  async putObject(bucket: string, key: string, data: Buffer | Readable, options?: PutObjectOptions): Promise<PutObjectResult> {
    const container = this.getContainerClient(bucket)
    const blockBlob = container.getBlockBlobClient(key)

    try {
      let result
      if (Buffer.isBuffer(data)) {
        result = await this.retry(() => blockBlob.uploadData(data, {
          blobHTTPHeaders: {
            blobContentType: options?.contentType,
            blobCacheControl: options?.cacheControl,
          },
          metadata: options?.metadata,
        }))
      } else {
        result = await this.retry(() => blockBlob.uploadStream(data, undefined, undefined, {
          blobHTTPHeaders: {
            blobContentType: options?.contentType,
            blobCacheControl: options?.cacheControl,
          },
          metadata: options?.metadata,
        }))
      }

      return {
        etag: result.etag?.replace(/"/g, '') ?? '',
      }
    } catch (err: any) {
      if (err.statusCode === 403) throw new AuthError('azure', 'azure-blob', 'putObject')
      throw err
    }
  }

  async getObject(bucket: string, key: string): Promise<GetObjectResult> {
    const container = this.getContainerClient(bucket)
    const blockBlob = container.getBlockBlobClient(key)

    try {
      const result = await this.retry(() => blockBlob.download())
      const data = await streamToBuffer(result.readableStreamBody!)

      return {
        data,
        contentType: result.contentType,
        metadata: result.metadata,
        etag: result.etag?.replace(/"/g, ''),
        lastModified: result.lastModified,
      }
    } catch (err: any) {
      if (err.statusCode === 404) throw new ObjectNotFoundError('azure', 'azure-blob', bucket, key)
      if (err.statusCode === 403) throw new AuthError('azure', 'azure-blob', 'getObject')
      throw err
    }
  }

  async getObjectStream(bucket: string, key: string): Promise<Readable> {
    const container = this.getContainerClient(bucket)
    const blockBlob = container.getBlockBlobClient(key)
    const result = await this.retry(() => blockBlob.download())
    return result.readableStreamBody! as unknown as Readable
  }

  async listObjects(bucket: string, options?: ListObjectsOptions): Promise<ListObjectsResult> {
    const container = this.getContainerClient(bucket)
    const objects: ObjectSummary[] = []

    for await (const blob of container.listBlobsFlat({ prefix: options?.prefix })) {
      objects.push({
        key: blob.name,
        size: blob.properties.contentLength ?? 0,
        etag: blob.properties.etag?.replace(/"/g, '') ?? '',
        lastModified: blob.properties.lastModified!,
      })

      if (options?.maxKeys && objects.length >= options.maxKeys) break
    }

    return {
      objects,
      isTruncated: false,
    }
  }

  async deleteObject(bucket: string, key: string): Promise<void> {
    const container = this.getContainerClient(bucket)
    const blockBlob = container.getBlockBlobClient(key)
    await this.retry(() => blockBlob.delete())
  }

  async existsObject(bucket: string, key: string): Promise<boolean> {
    const container = this.getContainerClient(bucket)
    const blockBlob = container.getBlockBlobClient(key)

    try {
      await this.retry(() => blockBlob.getProperties())
      return true
    } catch (err: any) {
      if (err.statusCode === 404) return false
      throw err
    }
  }
}

async function streamToBuffer(stream: Readable | NodeJS.ReadableStream): Promise<Buffer> {
  const chunks: Buffer[] = []
  for await (const chunk of stream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk as any))
  }
  return Buffer.concat(chunks)
}
