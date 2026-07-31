import { describe, it, expect } from 'vitest'
import type { SecretsConfig } from '../src/config.js'
import { getAwsEndpoint, getGcpEndpoint, getAzureEndpoint, FakeTokenCredential } from '../../test-helpers/src/index.js'

const SECRET_NAME = `test-secret-${Date.now()}`

describe('secrets e2e with floci (aws)', () => {
  it('should create and retrieve secrets via createSecrets', async () => {
    const { createSecrets } = await import('../src/index.js')
    const config: SecretsConfig = {
      cloud: 'aws',
      region: 'us-east-1',
      config: {
        endpoint: process.env.AWS_SECRETS_ENDPOINT || getAwsEndpoint(),
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

describe('secrets e2e with floci-gcp', () => {
  it('should create and retrieve secrets via createSecrets', async () => {
    const { createSecrets } = await import('../src/index.js')
    const grpcJs = await import('@grpc/grpc-js')
    
    // Parse floci-gcp host and port
    const gcpUrl = new URL(process.env.GCP_EMULATOR_ENDPOINT || getGcpEndpoint())
    const config: SecretsConfig = {
      cloud: 'gcp',
      config: {
        servicePath: gcpUrl.hostname,
        port: Number(gcpUrl.port) || 4588,
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

describe('secrets e2e with floci-az', () => {
  it('should create and retrieve secrets via createSecrets', async () => {
    const { createSecrets } = await import('../src/index.js')
    const config: SecretsConfig = {
      cloud: 'azure',
      config: {
        vaultUrl: process.env.AZURE_VAULT_URL || getAzureEndpoint(),
        disableChallengeResourceVerification: true,
        credential: new FakeTokenCredential(),
        allowInsecureConnection: true,
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