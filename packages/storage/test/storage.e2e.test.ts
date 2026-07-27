import { describe, it, expect, beforeAll } from 'vitest'
import { createStorage } from '../src/index.js'
import type { StorageStrategy } from '../src/interface.js'

const TEST_BUCKET = 'test-bucket'
const TEST_KEY = 'hello.txt'
const TEST_DATA = Buffer.from('Hello, Agnostic Layer!')
const MINIO_CONFIG = {
  endpoint: 'http://localhost:9000',
  region: 'us-east-1',
  credentials: { accessKeyId: 'minioadmin', secretAccessKey: 'minioadmin' },
  forcePathStyle: true,
}

describe.runIf(process.env.CLOUD_PROVIDER || !process.env.CI)('storage e2e with emulators', () => {
  beforeAll(async () => {
    const { S3Client, CreateBucketCommand } = await import('@aws-sdk/client-s3')
    const s3 = new S3Client(MINIO_CONFIG)
    try { await s3.send(new CreateBucketCommand({ Bucket: TEST_BUCKET })) } catch {}
    s3.destroy()
  })

  beforeAll(async () => {
    const { Storage } = await import('@google-cloud/storage')
    const gcs = new Storage({ apiEndpoint: 'http://localhost:4443', projectId: 'test-project' })
    try { await gcs.createBucket(TEST_BUCKET) } catch {}
  })

  it('should put and get an object with S3 (minio)', async () => {
    const storage: StorageStrategy = createStorage({
      cloud: 'aws',
      bucket: TEST_BUCKET,
      region: 'us-east-1',
      config: MINIO_CONFIG,
    })

    await storage.putObject(TEST_BUCKET, TEST_KEY, TEST_DATA)
    const result = await storage.getObject(TEST_BUCKET, TEST_KEY)
    expect(result.data.toString()).toBe(TEST_DATA.toString())

    const exists = await storage.existsObject(TEST_BUCKET, TEST_KEY)
    expect(exists).toBe(true)

    const list = await storage.listObjects(TEST_BUCKET, { prefix: 'hello' })
    expect(list.objects.length).toBeGreaterThanOrEqual(1)

    await storage.deleteObject(TEST_BUCKET, TEST_KEY)
    const existsAfter = await storage.existsObject(TEST_BUCKET, TEST_KEY)
    expect(existsAfter).toBe(false)
  })

  it('should put and get an object with GCS (fake-gcs-server)', async () => {
    const storage: StorageStrategy = createStorage({
      cloud: 'gcp',
      bucket: TEST_BUCKET,
      config: {
        apiEndpoint: 'http://localhost:4443',
        projectId: 'test-project',
      },
    })

    await storage.putObject(TEST_BUCKET, TEST_KEY, TEST_DATA)
    const result = await storage.getObject(TEST_BUCKET, TEST_KEY)
    expect(result.data.toString()).toBe(TEST_DATA.toString())
  })

  it('should put and get an object with Azure Blob (azurite)', async () => {
    const { BlobServiceClient } = await import('@azure/storage-blob')
    const conn = 'DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;'
    const blobClient = BlobServiceClient.fromConnectionString(conn)
    try { await blobClient.createContainer(TEST_BUCKET) } catch {}

    const storage = createStorage({
      cloud: 'azure',
      bucket: TEST_BUCKET,
      config: { connectionString: conn },
    })

    await storage.putObject(TEST_BUCKET, TEST_KEY, TEST_DATA)
    const result = await storage.getObject(TEST_BUCKET, TEST_KEY)
    expect(result.data.toString()).toBe(TEST_DATA.toString())

    await storage.deleteObject(TEST_BUCKET, TEST_KEY)
    const existsAfter = await storage.existsObject(TEST_BUCKET, TEST_KEY)
    expect(existsAfter).toBe(false)
  })

  it('should throw ObjectNotFoundError for missing object (s3)', async () => {
    const storage: StorageStrategy = createStorage({
      cloud: 'aws',
      bucket: TEST_BUCKET,
      config: MINIO_CONFIG,
    })

    await expect(storage.getObject(TEST_BUCKET, 'nonexistent.txt')).rejects.toThrow()
  })
})
