import { describe, it, expect, beforeAll } from 'vitest'
import { createStorage } from '../src/index.js'
import type { StorageStrategy } from '../src/interface.js'

import { getAwsEndpoint, getGcpEndpoint, getAzureEndpoint, getOciEndpoint } from '../../test-helpers/src/index.js'

const TEST_BUCKET = 'test-bucket'
const TEST_KEY = 'hello.txt'
const TEST_DATA = Buffer.from('Hello, Agnostic Layer!')
const AWS_CONFIG = {
  endpoint: getAwsEndpoint(),
  region: 'us-east-1',
  credentials: { accessKeyId: 'fake', secretAccessKey: 'fake' },
  forcePathStyle: true,
}

describe.runIf(process.env.CLOUD_PROVIDER || !process.env.CI)('storage e2e with emulators', () => {
  beforeAll(async () => {
    const { S3Client, CreateBucketCommand } = await import('@aws-sdk/client-s3')
    const s3 = new S3Client(AWS_CONFIG)
    try { await s3.send(new CreateBucketCommand({ Bucket: TEST_BUCKET })) } catch {}
    s3.destroy()
  })

  beforeAll(async () => {
    const { Storage } = await import('@google-cloud/storage')
    const gcs = new Storage({ apiEndpoint: getGcpEndpoint(), projectId: 'test-project' })
    try { await gcs.createBucket(TEST_BUCKET) } catch {}
  })

  it('should put and get an object with S3 (minio)', async () => {
    const storage: StorageStrategy = createStorage({
      cloud: 'aws',
      bucket: TEST_BUCKET,
      region: 'us-east-1',
      config: AWS_CONFIG,
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
        apiEndpoint: getGcpEndpoint(),
        projectId: 'test-project',
      },
    })

    await storage.putObject(TEST_BUCKET, TEST_KEY, TEST_DATA)
    const result = await storage.getObject(TEST_BUCKET, TEST_KEY)
    expect(result.data.toString()).toBe(TEST_DATA.toString())
  })

  it('should put and get an object with Azure Blob (azurite)', async () => {
    const { BlobServiceClient } = await import('@azure/storage-blob')
    const conn = `DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=${getAzureEndpoint()}/devstoreaccount1;`
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

  it('should put and get an object with OCI Object Storage (floci-oci)', async () => {
    const storage = createStorage({
      cloud: 'oci',
      bucket: TEST_BUCKET,
      config: {
        endpoint: getOciEndpoint(),
      },
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

  it('should throw ObjectNotFoundError for missing object (s3)', async () => {
    const storage: StorageStrategy = createStorage({
      cloud: 'aws',
      bucket: TEST_BUCKET,
      config: AWS_CONFIG,
    })

    await expect(storage.getObject(TEST_BUCKET, 'nonexistent.txt')).rejects.toThrow()
  })

  it('should throw ObjectNotFoundError for missing object (oci)', async () => {
    const storage = createStorage({
      cloud: 'oci',
      bucket: TEST_BUCKET,
      config: {
        endpoint: getOciEndpoint(),
      },
    })

    await expect(storage.getObject(TEST_BUCKET, 'nonexistent.txt')).rejects.toThrow()
  })
})
