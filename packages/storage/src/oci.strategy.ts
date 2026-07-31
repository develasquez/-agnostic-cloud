import { Readable } from 'node:stream'
import * as oci from 'oci-sdk'
import type { StorageConfig } from './config.js'
import { ObjectNotFoundError, NotImplementedError } from './errors.js'
import { resolveCloud } from './resolver.js'
import type {
  StorageStrategy,
  PutObjectOptions,
  PutObjectResult,
  GetObjectResult,
  ListObjectsOptions,
  ListObjectsResult,
  ObjectSummary,
} from './interface.js'

async function streamToBuffer(stream: any): Promise<Buffer> {
  if (!stream) return Buffer.alloc(0)

  if (typeof stream.getReader === 'function') {
    const reader = stream.getReader()
    const chunks: Uint8Array[] = []
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      if (value) {
        chunks.push(value)
      }
    }
    return Buffer.concat(chunks.map(c => Buffer.isBuffer(c) ? c : Buffer.from(c)))
  }

  if (Readable.isReadable(stream) || typeof stream[Symbol.asyncIterator] === 'function') {
    const chunks: Buffer[] = []
    for await (const chunk of stream) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk as any))
    }
    return Buffer.concat(chunks)
  }

  if (Buffer.isBuffer(stream)) {
    return stream
  }

  return Buffer.from(stream)
}

export class OciStorageStrategy implements StorageStrategy {
  private client: oci.objectstorage.ObjectStorageClient
  private namespacePromise: Promise<string> | null = null

  constructor(config: StorageConfig) {
    resolveCloud(config, 'objectstorage')
    const tenancy = config.config?.['tenancy'] || process.env['OCI_TENANCY'] || 'ocid1.tenancy.oc1..fake-tenancy-id'
    const user = config.config?.['user'] || process.env['OCI_USER'] || 'ocid1.user.oc1..fake-user-id'
    const fingerprint = config.config?.['fingerprint'] || process.env['OCI_FINGERPRINT'] || '20:3b:97:13:55:1c:cf:0d:86:14:ee:74:97:bc:fc:a1'
    const privateKey = config.config?.['privateKey'] || process.env['OCI_PRIVATE_KEY'] || `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA0I9R0ZO3gnewHu6qeeYnJ0rnqNc851JBKoe92V+nvqB83S8H
gS6j5UzHm3QY4ShKkin02EsT2hXpZz4YI7hjmSw2SVnI68nyOW4NtjUz/cGYSl3F
8udd8v3oIoRoN7yeyhkSHzmf4mGL2ngK3lltUZETVbgPoQgKfckuGzN/drtJ1gyc
n3pjZCiKj8u2lt1hw1OkjkrsrShSvNothyY5dRgIQBT0Fj0IH9sb7Zo5kGl1woNC
MrcySBE/SR/IijyBozLvva5q7Tp/sS4qwnAboJKM4DavmSYmkempXnHGp9ulVSIx
qtsuj+eQFZ0pT+oeWA2kUlaesCJW+m+C56my1QIDAQABAoIBACVEPsP6p7NV7LAS
SH8Aq6VfQpbOYxEYhxFw8PELIR+0cKtbMHWaXmnmNtKlw55UA0Mr4RbXD4SMHsk2
dLzJQW7I0ih4NSlAzBoL+sJArnoc4jgDmo/lXMnDKfwk+bRf7WXCZhUTSGj8si9G
/PYvN5P4HuLVwWEuXSWN0cHFiXSu/vyBXiCbtZuxtHYVxwyU8EZS3KfmFM5SqhRs
jEbExA03GFSSMtrNv2Q/1NN3FNsuw+aC+4u4nvudZfcWRPmBLQq3bLyC8YzUyrwu
v25lD+jmSuAxGbFv4AN7dqeVU0Noqkq5+WyYDMpJFu7E5NjubSNKqNYvVoI6Cfmy
+VnqN8ECgYEA8sK6N8w7Phk5b+NQcAQRTUMIvK/PcqjIwxDgKYMQwx/TAPlG07hF
JLeulutaPVhT/xzUuL5IqZ8nycFn5FMc476ZCHNmTBCZxrJCJhOWDt7SFGMr1S1c
VJF+vbKhvWYatcPZsQQ8IrcTHBX52LkozY02WQwhyiUiaZzxAk0H9HUCgYEA2+8a
ERlhImX1O5QoAVf1lfct3T0zHPgQ/CdYRlWfl9iSp6Sp3z5xYszkbqOHig59vL+c
dPS3wHnb/bvUQ+0v703+EgHlnWK8Ysys6jIU8meSaj8cioIjs6aw2Zz4Ov7tTwZU
pJPVIdp42hdcUc5Ufcx+87m28OflVEfBOF4heOECgYBaz8VhgiDXRhBabqp0fNEM
Gft2uj3cIo+XiQSSAtmOZKVGQ/ne0Zvr9Fp3Umtbb2Ncl6hrw6Li8QqtSpBWtVCl
UXNl2eV2pu8fiSd9nu4PegMUZVTMVj+n0xWaWOxwMXXkcPNKaM8mHV4kr4PbMsi0
vBKMlSE+wU1yPKdbuP000QKBgFlxszszBCL2LjbNuTtap2EXBosMYaYtaNLzuV3Z
Yq9hf7s4J3HINlrFEz2/uda2sAI8NwgFollf9c0KP3hklPMQ1/xA0z4fspfHv6b7
OTOgVZZqFlRqOtTMPO4zfWyY0rAp1fCcwrgi3rVrfLs0W35R1WuPosv0s3qEOBuR
hLFhAoGBANbYVrJNN1sJPT8x0CoE9M6Tjpxz8Pne1aKS9wCkTZa4Ja79N26HaE9k
a2zag3eyR0WREGmxsZEOqEmOh+LTeVyY3u8tTNUTAxTfaDszQgvgtKRqHY9HsWxV
HGq6/pzd9AJzylv1kGDbtZjRCeUc/aEzTIVapkl4HZ4hy3j5apE0
-----END RSA PRIVATE KEY-----`
    const region = config.region || process.env['OCI_REGION'] || 'us-phoenix-1'

    const regionObj = oci.common.Region.fromRegionId(region)
    const provider = new oci.SimpleAuthenticationDetailsProvider(
      tenancy,
      user,
      fingerprint,
      privateKey,
      null,
      regionObj
    )

    this.client = new oci.objectstorage.ObjectStorageClient({ authenticationDetailsProvider: provider })
    const endpoint = config.config?.['endpoint'] || process.env['OCI_EMULATOR_ENDPOINT'] || 'http://localhost:4599'
    if (endpoint) {
      this.client.endpoint = endpoint
    }
  }

  private getNamespace(): Promise<string> {
    if (!this.namespacePromise) {
      this.namespacePromise = this.client.getNamespace({}).then(res => res.value)
    }
    return this.namespacePromise
  }

  async putObject(bucket: string, key: string, data: Buffer | Readable, options?: PutObjectOptions): Promise<PutObjectResult> {
    const namespaceName = await this.getNamespace()
    const bodyData = await streamToBuffer(data)

    const response = await this.client.putObject({
      namespaceName,
      bucketName: bucket,
      objectName: key,
      putObjectBody: bodyData,
      contentType: options?.contentType,
      opcMeta: options?.metadata,
      cacheControl: options?.cacheControl,
    })

    return {
      etag: response.eTag?.replace(/"/g, '') ?? '',
      versionId: response.versionId,
    }
  }

  async getObject(bucket: string, key: string): Promise<GetObjectResult> {
    try {
      const namespaceName = await this.getNamespace()
      const response = await this.client.getObject({
        namespaceName,
        bucketName: bucket,
        objectName: key,
      })

      const buffer = await streamToBuffer(response.value)

      return {
        data: buffer,
        contentType: response.contentType,
        metadata: response.opcMeta,
        etag: response.eTag?.replace(/"/g, ''),
        lastModified: response.lastModified,
      }
    } catch (err: any) {
      if (err.statusCode === 404 || err.message?.includes('Not Found') || err.message?.includes('ObjectNotFound')) {
        throw new ObjectNotFoundError('oci', 'objectstorage', bucket, key)
      }
      throw err
    }
  }

  async getObjectStream(_bucket: string, _key: string): Promise<Readable> {
    throw new NotImplementedError('oci', 'objectstorage', 'getObjectStream')
  }

  async listObjects(bucket: string, options?: ListObjectsOptions): Promise<ListObjectsResult> {
    const namespaceName = await this.getNamespace()
    const response = await this.client.listObjects({
      namespaceName,
      bucketName: bucket,
      prefix: options?.prefix,
      limit: options?.maxKeys,
      start: options?.startAfter,
    })

    const objects: ObjectSummary[] = (response.listObjects.objects ?? []).map(obj => ({
      key: obj.name,
      size: obj.size,
      etag: obj.md5?.replace(/"/g, '') ?? '',
      lastModified: obj.timeCreated!,
    }))

    return {
      objects,
      isTruncated: false,
    }
  }

  async deleteObject(bucket: string, key: string): Promise<void> {
    const namespaceName = await this.getNamespace()
    await this.client.deleteObject({
      namespaceName,
      bucketName: bucket,
      objectName: key,
    })
  }

  async existsObject(bucket: string, key: string): Promise<boolean> {
    try {
      const namespaceName = await this.getNamespace()
      await this.client.headObject({
        namespaceName,
        bucketName: bucket,
        objectName: key,
      })
      return true
    } catch (err: any) {
      if (err.statusCode === 404 || err.message?.includes('Not Found') || err.message?.includes('ObjectNotFound')) {
        return false
      }
      throw err
    }
  }
}
