import type { Readable } from 'node:stream'

export interface PutObjectOptions {
  contentType?: string
  metadata?: Record<string, string>
  cacheControl?: string
}

export interface PutObjectResult {
  etag: string
  versionId?: string
}

export interface GetObjectResult {
  data: Buffer
  contentType?: string
  metadata?: Record<string, string>
  etag?: string
  lastModified?: Date
}

export interface ListObjectsOptions {
  prefix?: string
  maxKeys?: number
  startAfter?: string
}

export interface ListObjectsResult {
  objects: ObjectSummary[]
  isTruncated: boolean
  nextContinuationToken?: string
}

export interface ObjectSummary {
  key: string
  size: number
  etag: string
  lastModified: Date
}

export interface StorageStrategy {
  putObject(bucket: string, key: string, data: Buffer | Readable, options?: PutObjectOptions): Promise<PutObjectResult>
  getObject(bucket: string, key: string): Promise<GetObjectResult>
  getObjectStream(bucket: string, key: string): Promise<Readable>
  listObjects(bucket: string, options?: ListObjectsOptions): Promise<ListObjectsResult>
  deleteObject(bucket: string, key: string): Promise<void>
  existsObject(bucket: string, key: string): Promise<boolean>
}
