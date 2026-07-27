import { createStorage } from '@agnostic-cloud/storage'
import type { StorageConfig } from '@agnostic-cloud/storage'

export interface CopyResult {
  bytesTransferred: number
  sourceKey: string
  destKey: string
}

function parseUrl(url: string): { bucket: string; key: string } {
  const parsed = new URL(url)
  const bucket = parsed.hostname
  const key = parsed.pathname.replace(/^\//, '')
  return { bucket, key }
}

export async function copyObject(
  sourceConfig: StorageConfig,
  sourceUrl: string,
  destConfig: StorageConfig,
  destUrl: string,
): Promise<CopyResult> {
  const source = createStorage(sourceConfig)
  const dest = createStorage(destConfig)

  const { bucket: sourceBucket, key: sourceKey } = parseUrl(sourceUrl)
  const { bucket: destBucket, key: destKey } = parseUrl(destUrl)

  const result = await source.getObject(sourceBucket, sourceKey)
  await dest.putObject(destBucket, destKey, result.data)

  return {
    bytesTransferred: result.data.length,
    sourceKey,
    destKey,
  }
}
