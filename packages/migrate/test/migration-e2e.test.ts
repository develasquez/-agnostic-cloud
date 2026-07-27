import { describe, it, expect, beforeAll } from 'vitest'
import { copyObject, verifyIntegrity } from '../src/index.js'
import { createStorage } from '@agnostic-cloud/storage'
import type { StorageStrategy } from '@agnostic-cloud/storage'

const TEST_BUCKET = 'migration-test-bucket'
const TEST_KEY = 'migration-data.txt'
const TEST_DATA = Buffer.from('Cross-cloud migration test data!')

const MINIO_CONFIG = {
  cloud: 'aws' as const,
  bucket: TEST_BUCKET,
  region: 'us-east-1',
  config: {
    endpoint: 'http://localhost:9000',
    region: 'us-east-1',
    credentials: { accessKeyId: 'minioadmin', secretAccessKey: 'minioadmin' },
    forcePathStyle: true,
  },
}

const GCS_CONFIG = {
  cloud: 'gcp' as const,
  bucket: TEST_BUCKET,
  config: {
    apiEndpoint: 'http://localhost:4443',
    projectId: 'test-project',
  },
}

describe('cross-cloud migration S3 → GCS', () => {
  let s3: StorageStrategy
  let gcs: StorageStrategy

  beforeAll(async () => {
    const { S3Client, CreateBucketCommand } = await import('@aws-sdk/client-s3')
    const client = new S3Client({
      endpoint: 'http://localhost:9000',
      region: 'us-east-1',
      credentials: { accessKeyId: 'minioadmin', secretAccessKey: 'minioadmin' },
      forcePathStyle: true,
    })
    try { await client.send(new CreateBucketCommand({ Bucket: TEST_BUCKET })) } catch { }
    client.destroy()

    const { Storage } = await import('@google-cloud/storage')
    const gcsClient = new Storage({ apiEndpoint: 'http://localhost:4443', projectId: 'test-project' })
    try { await gcsClient.createBucket(TEST_BUCKET) } catch { }

    s3 = createStorage(MINIO_CONFIG)
    gcs = createStorage(GCS_CONFIG)
  })

  it('should copy an object from S3 to GCS and verify integrity', async () => {
    await s3.putObject(TEST_BUCKET, TEST_KEY, TEST_DATA)

    const s3Exists = await s3.existsObject(TEST_BUCKET, TEST_KEY)
    expect(s3Exists).toBe(true)

    const result = await copyObject(
      { cloud: 'aws', region: 'us-east-1', config: MINIO_CONFIG.config },
      `s3://${TEST_BUCKET}/${TEST_KEY}`,
      { cloud: 'gcp', config: GCS_CONFIG.config },
      `gs://${TEST_BUCKET}/${TEST_KEY}`,
    )

    expect(result.bytesTransferred).toBe(TEST_DATA.length)
    expect(result.sourceKey).toBe(TEST_KEY)
    expect(result.destKey).toBe(TEST_KEY)

    const gcsExists = await gcs.existsObject(TEST_BUCKET, TEST_KEY)
    expect(gcsExists).toBe(true)

    const gcsObj = await gcs.getObject(TEST_BUCKET, TEST_KEY)
    expect(gcsObj.data.toString()).toBe(TEST_DATA.toString())
  })

  it('should verify integrity after migration', async () => {
    const { createHash } = await import('node:crypto')
    const expectedChecksum = createHash('md5').update(TEST_DATA).digest('hex')

    const valid = await verifyIntegrity(
      { cloud: 'gcp', config: GCS_CONFIG.config },
      `gs://${TEST_BUCKET}/${TEST_KEY}`,
      expectedChecksum,
      'md5',
    )

    expect(valid).toBe(true)
  })

  it('should clean up test objects', async () => {
    await s3.deleteObject(TEST_BUCKET, TEST_KEY)
    await gcs.deleteObject(TEST_BUCKET, TEST_KEY)

    const s3Exists = await s3.existsObject(TEST_BUCKET, TEST_KEY)
    const gcsExists = await gcs.existsObject(TEST_BUCKET, TEST_KEY)
    expect(s3Exists).toBe(false)
    expect(gcsExists).toBe(false)
  })
})
