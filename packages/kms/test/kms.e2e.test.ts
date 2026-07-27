import { describe, it, expect, beforeAll } from 'vitest'
import type { KmsConfig } from '../src/config.js'

const KEY = `test-key-${Date.now()}`

describe.runIf(process.env.KMS_ENDPOINT)('kms e2e with local-kms (aws)', () => {
  it('should encrypt and decrypt via createKms', async () => {
    const { createKms } = await import('../src/index.js')
    const config: KmsConfig = {
      cloud: 'aws',
      region: 'us-east-1',
      config: {
        endpoint: process.env.KMS_ENDPOINT,
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

describe.runIf(process.env.GCP_KMS_REST_ENDPOINT)('kms e2e with gcp-kms-emulator', () => {
  beforeAll(async () => {
    const http = await import('http')
    await new Promise<void>((resolve) => {
      const req = http.request({
        hostname: 'localhost', port: 8088,
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

    const keyName = await new Promise<string>((resolve, reject) => {
      const req = http.request({
        hostname: 'localhost', port: 8088,
        path: `/v1/projects/test-project/locations/global/keyRings/agnostic-cloud/cryptoKeys?cryptoKeyId=${keyId}`,
        method: 'POST', headers: { 'Content-Type': 'application/json' },
      }, (res) => { let d = ''; res.on('data', (c) => d += c); res.on('end', () => resolve(JSON.parse(d).name)) })
      req.on('error', reject)
      req.end(JSON.stringify({ purpose: 'ENCRYPT_DECRYPT', versionTemplate: { algorithm: 'GOOGLE_SYMMETRIC_ENCRYPTION' } }))
    })

    const encResult = await new Promise<{ciphertext: string}>((resolve, reject) => {
      const req = http.request({
        hostname: 'localhost', port: 8088,
        path: `/v1/${keyName}:encrypt`,
        method: 'POST', headers: { 'Content-Type': 'application/json' },
      }, (res) => { let d = ''; res.on('data', (c) => d += c); res.on('end', () => resolve(JSON.parse(d))) })
      req.on('error', reject)
      req.end(JSON.stringify({ plaintext: Buffer.from('hello kms rest').toString('base64') }))
    })
    expect(encResult.ciphertext).toBeDefined()

    const decResult = await new Promise<{plaintext: string}>((resolve, reject) => {
      const req = http.request({
        hostname: 'localhost', port: 8088,
        path: `/v1/${keyName}:decrypt`,
        method: 'POST', headers: { 'Content-Type': 'application/json' },
      }, (res) => { let d = ''; res.on('data', (c) => d += c); res.on('end', () => resolve(JSON.parse(d))) })
      req.on('error', reject)
      req.end(JSON.stringify({ ciphertext: encResult.ciphertext }))
    })
    expect(Buffer.from(decResult.plaintext, 'base64').toString()).toBe('hello kms rest')
  })
})

function b64url(s: string): string {
  return Buffer.from(s).toString('base64url')
}

class FakeTokenCredential {
  async getToken(_scopes: string | string[], _options?: unknown) {
    const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT', kid: 'fake' }))
    const payload = b64url(JSON.stringify({
      aud: 'https://vault.azure.net',
      iss: 'fake',
      sub: 'fake',
      exp: Math.floor(Date.now() / 1000) + 36000,
    }))
    return { token: `${header}.${payload}.fakesig`, expiresOnTimestamp: Date.now() + 3600000 }
  }
}

describe.runIf(process.env.AZURE_KMS_VAULT_URL)('kms e2e with azure-keyvault-emulator', () => {
  it('should encrypt and decrypt via createKms', async () => {
    const { createKms } = await import('../src/index.js')
    const config: KmsConfig = {
      cloud: 'azure',
      config: {
        vaultUrl: process.env.AZURE_KMS_VAULT_URL,
        disableChallengeResourceVerification: true,
        credential: new FakeTokenCredential(),
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
