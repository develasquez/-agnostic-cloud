import { createHash } from 'node:crypto'
import { createStorage } from '@agnostic-cloud/storage'
import type { StorageConfig } from '@agnostic-cloud/storage'

export type HashAlgorithm = 'md5' | 'sha1' | 'sha256' | 'sha512'

function parseUrl(url: string): { bucket: string; key: string } {
  const parsed = new URL(url)
  const bucket = parsed.hostname
  const key = parsed.pathname.replace(/^\//, '')
  return { bucket, key }
}

export async function verifyIntegrity(
  config: StorageConfig,
  url: string,
  expectedChecksum: string,
  algorithm: HashAlgorithm = 'md5',
): Promise<boolean> {
  const storage = createStorage(config)
  const { bucket, key } = parseUrl(url)
  const result = await storage.getObject(bucket, key)
  const hash = createHash(algorithm).update(result.data).digest('hex')
  return hash === expectedChecksum.toLowerCase()
}
