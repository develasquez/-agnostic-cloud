import { Readable } from 'node:stream'
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3'
import type { StorageConfig } from './config.js'
import { ObjectNotFoundError, TimeoutError, AuthError, NotImplementedError } from './errors.js'
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

export class S3StorageStrategy implements StorageStrategy {
  private client: S3Client
  private retryConfig: { maxRetries: number; baseDelayMs: number }

  constructor(config: StorageConfig) {
    resolveCloud(config, 's3')
    this.client = new S3Client({
      region: config.region ?? 'us-east-1',
      ...config.config,
    })
    this.retryConfig = {
      maxRetries: config.config?.['maxRetries'] as number ?? 3,
      baseDelayMs: config.config?.['baseDelayMs'] as number ?? 100,
    }
  }

  private parseBucket(bucket: string): string {
    return bucket.replace(/^s3:\/\//, '')
  }

  async putObject(bucket: string, key: string, data: Buffer | Readable, options?: PutObjectOptions): Promise<PutObjectResult> {
    const cmd = new PutObjectCommand({
      Bucket: this.parseBucket(bucket),
      Key: key,
      Body: data,
      ContentType: options?.contentType,
      Metadata: options?.metadata,
      CacheControl: options?.cacheControl,
    })

    try {
      const result = await withRetry(() => this.client.send(cmd), this.retryConfig)
      return {
        etag: result.ETag?.replace(/"/g, '') ?? '',
        versionId: result.VersionId,
      }
    } catch (err: any) {
      if (err.name === 'CredentialsProviderError') throw new AuthError('aws', 's3', 'putObject')
      throw err
    }
  }

  async getObject(bucket: string, key: string): Promise<GetObjectResult> {
    try {
      const result = await withRetry(() => this.client.send(new GetObjectCommand({
        Bucket: this.parseBucket(bucket),
        Key: key,
      })), this.retryConfig)

      const stream = result.Body! as Readable
      const chunks: Buffer[] = []
      for await (const chunk of stream) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk as any))
      }

      return {
        data: Buffer.concat(chunks),
        contentType: result.ContentType,
        metadata: result.Metadata,
        etag: result.ETag?.replace(/"/g, ''),
        lastModified: result.LastModified,
      }
    } catch (err: any) {
      if (err.name === 'NoSuchKey') throw new ObjectNotFoundError('aws', 's3', bucket, key)
      if (err.name === 'CredentialsProviderError') throw new AuthError('aws', 's3', 'getObject')
      throw err
    }
  }

  async getObjectStream(_bucket: string, _key: string): Promise<Readable> {
    throw new NotImplementedError('aws', 's3', 'getObjectStream')
  }

  async listObjects(bucket: string, options?: ListObjectsOptions): Promise<ListObjectsResult> {
    const result = await withRetry(() => this.client.send(new ListObjectsV2Command({
      Bucket: this.parseBucket(bucket),
      Prefix: options?.prefix,
      MaxKeys: options?.maxKeys,
      StartAfter: options?.startAfter,
    })), this.retryConfig)

    const objects: ObjectSummary[] = (result.Contents ?? []).map((obj: { Key?: string; Size?: number; ETag?: string; LastModified?: Date }) => ({
      key: obj.Key!,
      size: obj.Size!,
      etag: obj.ETag?.replace(/"/g, '') ?? '',
      lastModified: obj.LastModified!,
    }))

    return {
      objects,
      isTruncated: result.IsTruncated ?? false,
      nextContinuationToken: result.NextContinuationToken,
    }
  }

  async deleteObject(bucket: string, key: string): Promise<void> {
    await withRetry(() => this.client.send(new DeleteObjectCommand({
      Bucket: this.parseBucket(bucket),
      Key: key,
    })), this.retryConfig)
  }

  async existsObject(bucket: string, key: string): Promise<boolean> {
    try {
      await withRetry(() => this.client.send(new HeadObjectCommand({
        Bucket: this.parseBucket(bucket),
        Key: key,
      })), this.retryConfig)
      return true
    } catch (err: any) {
      if (err.name === 'NotFound') return false
      throw err
    }
  }
}
