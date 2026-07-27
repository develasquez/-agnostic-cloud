import { describe, it, expect } from 'vitest'
import type { SecretsConfig } from '../src/config.js'

const SECRET_NAME = `test-secret-${Date.now()}`

describe.runIf(process.env.AWS_SECRETS_ENDPOINT)('secrets e2e with nimbus (aws)', () => {
  it('should create and retrieve secrets via createSecrets', async () => {
    const { createSecrets } = await import('../src/index.js')
    const config: SecretsConfig = {
      cloud: 'aws',
      region: 'us-east-1',
      config: {
        endpoint: process.env.AWS_SECRETS_ENDPOINT,
        credentials: { accessKeyId: 'fake', secretAccessKey: 'fake' },
      },
    }
    const strategy = createSecrets(config)
    await expect(strategy.createSecret(SECRET_NAME, 'hello-nimbus')).resolves.toBeDefined()
    const value = await strategy.getSecret(SECRET_NAME)
    expect(value.value).toBe('hello-nimbus')
    await strategy.deleteSecret(SECRET_NAME, { forceDelete: true })
  })
})

describe.runIf(process.env.GCP_SECRETS_PORT)('secrets e2e with gcp-emulator', () => {
  it('should create and retrieve secrets via createSecrets', async () => {
    const { createSecrets } = await import('../src/index.js')
    const grpcJs = await import('@grpc/grpc-js')
    const config: SecretsConfig = {
      cloud: 'gcp',
      config: {
        servicePath: 'localhost',
        port: Number(process.env.GCP_SECRETS_PORT) || 9090,
        projectId: 'test-project',
        sslCreds: grpcJs.credentials.createInsecure(),
      },
    }
    const strategy = createSecrets(config)
    const name = `${SECRET_NAME}-gcp`
    await expect(strategy.createSecret(name, 'hello-gcp')).resolves.toBeDefined()
    const value = await strategy.getSecret(name)
    expect(value.value).toBe('hello-gcp')
    await strategy.deleteSecret(name, { forceDelete: true })
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

describe.runIf(process.env.AZURE_VAULT_URL)('secrets e2e with azure-keyvault-emulator', () => {
  it('should create and retrieve secrets via createSecrets', async () => {
    const { createSecrets } = await import('../src/index.js')
    const config: SecretsConfig = {
      cloud: 'azure',
      config: {
        vaultUrl: process.env.AZURE_VAULT_URL,
        disableChallengeResourceVerification: true,
        credential: new FakeTokenCredential(),
      },
    }
    const strategy = createSecrets(config)
    const name = `${SECRET_NAME}-az`
    await expect(strategy.createSecret(name, 'hello-azure')).resolves.toBeDefined()
    const value = await strategy.getSecret(name)
    expect(value.value).toBe('hello-azure')
    await strategy.deleteSecret(name, { forceDelete: true })
  })
})