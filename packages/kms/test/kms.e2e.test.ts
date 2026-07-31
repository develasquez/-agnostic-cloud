import { describe, it, expect, beforeAll } from 'vitest'
import type { KmsConfig } from '../src/config.js'
import { getAwsEndpoint, getGcpEndpoint, getAzureEndpoint, FakeTokenCredential } from '../../test-helpers/src/index.js'

const KEY = `test-key-${Date.now()}`

describe('kms e2e with floci (aws)', () => {
  it('should encrypt and decrypt via createKms', async () => {
    const { createKms } = await import('../src/index.js')
    const config: KmsConfig = {
      cloud: 'aws',
      region: 'us-east-1',
      config: {
        endpoint: process.env.KMS_ENDPOINT || getAwsEndpoint(),
        credentials: { accessKeyId: 'fake', secretAccessKey: 'fake' },
      },
    }
    const kms = createKms(config)
    const key = await kms.createKey(`${KEY}-aws`)
    expect(key.keyId).toBeDefined()

    const encrypted = await kms.encrypt(key.keyId, 'secret data')
    expect(encrypted.ciphertext).toBeDefined()

    const decrypted = await kms.decrypt(key.keyId, encrypted.ciphertext)
    expect(decrypted.plaintext.toString()).toBe('secret data')
  })
})

describe('kms e2e with floci-gcp KMS emulator', () => {
  beforeAll(async () => {
    const http = await import('http')
    const gcpUrl = new URL(process.env.GCP_EMULATOR_ENDPOINT || getGcpEndpoint())
    const gcpPort = Number(gcpUrl.port) || 4588
    await new Promise<void>((resolve) => {
      const req = http.request({
        hostname: gcpUrl.hostname, port: gcpPort,
        path: '/v1/projects/test-project/locations/global/keyRings?keyRingId=agnostic-cloud',
        method: 'POST', headers: { 'Content-Type': 'application/json' },
      }, (res) => { res.resume(); res.on('end', resolve) })
      req.on('error', () => resolve())
      req.end('{}')
    })
  })

  it('should encrypt and decrypt via REST API', async () => {
    const http = await import('http')
    const keyId = `${KEY}-gcp`
    const gcpUrl = new URL(process.env.GCP_EMULATOR_ENDPOINT || getGcpEndpoint())
    const gcpPort = Number(gcpUrl.port) || 4588

    const keyName = await new Promise<string>((resolve, reject) => {
      const req = http.request({
        hostname: gcpUrl.hostname, port: gcpPort,
        path: `/v1/projects/test-project/locations/global/keyRings/agnostic-cloud/cryptoKeys?cryptoKeyId=${keyId}`,
        method: 'POST', headers: { 'Content-Type': 'application/json' },
      }, (res) => { let d = ''; res.on('data', (c) => d += c); res.on('end', () => resolve(JSON.parse(d).name)) })
      req.on('error', reject)
      req.end(JSON.stringify({ purpose: 'ENCRYPT_DECRYPT', versionTemplate: { algorithm: 'GOOGLE_SYMMETRIC_ENCRYPTION' } }))
    })

    const encResult = await new Promise<{ciphertext: string}>((resolve, reject) => {
      const req = http.request({
        hostname: gcpUrl.hostname, port: gcpPort,
        path: `/v1/${keyName}:encrypt`,
        method: 'POST', headers: { 'Content-Type': 'application/json' },
      }, (res) => { let d = ''; res.on('data', (c) => d += c); res.on('end', () => resolve(JSON.parse(d))) })
      req.on('error', reject)
      req.end(JSON.stringify({ plaintext: Buffer.from('hello kms rest').toString('base64') }))
    })
    expect(encResult.ciphertext).toBeDefined()

    const decResult = await new Promise<{plaintext: string}>((resolve, reject) => {
      const req = http.request({
        hostname: gcpUrl.hostname, port: gcpPort,
        path: `/v1/${keyName}:decrypt`,
        method: 'POST', headers: { 'Content-Type': 'application/json' },
      }, (res) => { let d = ''; res.on('data', (c) => d += c); res.on('end', () => resolve(JSON.parse(d))) })
      req.on('error', reject)
      req.end(JSON.stringify({ ciphertext: encResult.ciphertext }))
    })
    expect(Buffer.from(decResult.plaintext, 'base64').toString()).toBe('hello kms rest')
  })
})

describe('kms e2e with floci-az KMS', () => {
  // KeyVault Keys is not supported/present in the local floci-az emulator (which only supports Secrets).
  // We only run this test if a non-emulator vault URL is provided.
  const vaultUrl = process.env.AZURE_KMS_VAULT_URL || getAzureEndpoint()
  const isEmulator = vaultUrl.includes('localhost:4577') || vaultUrl.includes('127.0.0.1:4577')

  it.skipIf(isEmulator)('should encrypt and decrypt via createKms', async () => {
    const { createKms } = await import('../src/index.js')
    const config: KmsConfig = {
      cloud: 'azure',
      config: {
        vaultUrl,
        credential: new FakeTokenCredential(),
        allowInsecureConnection: true,
        disableChallengeResourceVerification: true,
      },
    }
    const kms = createKms(config)
    const key = await kms.createKey(`${KEY}-az`)
    expect(key.keyId).toBeDefined()

    const encrypted = await kms.encrypt(key.keyId, 'secret data')
    expect(encrypted.ciphertext).toBeDefined()

    const decrypted = await kms.decrypt(key.keyId, encrypted.ciphertext)
    expect(decrypted.plaintext.toString()).toBe('secret data')
  })
})

describe('kms e2e with floci-oci', () => {
  it('should encrypt and decrypt via createKms', async () => {
    const { createKms } = await import('../src/index.js')
    const config: KmsConfig = {
      cloud: 'oci',
      config: {
        endpoint: process.env.OCI_EMULATOR_ENDPOINT || 'http://localhost:4599',
        compartmentId: 'ocid1.compartment.oc1..fake',
      },
    }
    const kms = createKms(config)
    const key = await kms.createKey(`${KEY}-oci`)
    expect(key.keyId).toBeDefined()

    const encrypted = await kms.encrypt(key.keyId, 'secret data')
    expect(encrypted.ciphertext).toBeDefined()

    const decrypted = await kms.decrypt(key.keyId, encrypted.ciphertext)
    expect(decrypted.plaintext.toString()).toBe('secret data')

    const deletedDate = await kms.scheduleKeyDeletion(key.keyId)
    expect(deletedDate).toBeInstanceOf(Date)
  })
})

