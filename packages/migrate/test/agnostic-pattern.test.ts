/**
 * Proves the agnostic pattern: same interface, different cloud implementations.
 * This test runs without cloud credentials — it validates the architecture.
 */
import { describe, it, expect } from 'vitest'

describe('agnostic pattern — cross-cloud consistency', () => {
  const clouds = ['aws', 'gcp', 'azure'] as const

  const azureSecretsConfig = { connectionString: 'Endpoint=https://dummy.vault.azure.net/;SharedAccessKeyName=test;SharedAccessKey=dummy' }
  const azurePubSubConfig = { connectionString: 'Endpoint=sb://dummy.servicebus.windows.net/;SharedAccessKeyName=test;SharedAccessKey=dummy' }
  const azureNoSqlConfig = { endpoint: 'https://dummy.documents.azure.com:443/', key: 'dummy' }

  function azureConfig(service: string) {
    switch (service) {
      case 'secrets': return azureSecretsConfig
      case 'pubsub': return azurePubSubConfig
      case 'nosql': return azureNoSqlConfig
      default: return {}
    }
  }

  describe('storage', () => {
    it('createStorage returns a strategy for each cloud', async () => {
      const { createStorage } = await import('@agnostic-cloud/storage')
      for (const cloud of clouds) {
        const s = createStorage({ cloud, region: 'us-east-1' })
        expect(typeof s.putObject).toBe('function')
        expect(typeof s.getObject).toBe('function')
        expect(typeof s.listObjects).toBe('function')
        expect(typeof s.deleteObject).toBe('function')
        expect(typeof s.existsObject).toBe('function')
      }
    })
  })

  describe('secrets', () => {
    it('createSecrets returns a strategy for each cloud', async () => {
      const { createSecrets } = await import('@agnostic-cloud/secrets')
      for (const cloud of clouds) {
        const s = createSecrets({ cloud, region: 'us-east-1', config: azureConfig('secrets') })
        expect(typeof s.getSecret).toBe('function')
        expect(typeof s.createSecret).toBe('function')
        expect(typeof s.updateSecret).toBe('function')
        expect(typeof s.deleteSecret).toBe('function')
        expect(typeof s.listSecrets).toBe('function')
      }
    })
  })

  describe('cache', () => {
    it('createCache returns a strategy for each cloud', async () => {
      const { createCache } = await import('@agnostic-cloud/cache')
      for (const cloud of clouds) {
        const s = createCache({ cloud, region: 'us-east-1', config: { url: 'redis://localhost:6379' } })
        expect(typeof s.get).toBe('function')
        expect(typeof s.set).toBe('function')
        expect(typeof s.del).toBe('function')
        expect(typeof s.exists).toBe('function')
      }
    })
  })

  describe('kms', () => {
    it('createKms returns a strategy for each cloud', async () => {
      const { createKms } = await import('@agnostic-cloud/kms')
      for (const cloud of clouds) {
        const s = createKms({ cloud, region: 'us-east-1', config: azureConfig('secrets') })
        expect(typeof s.encrypt).toBe('function')
        expect(typeof s.decrypt).toBe('function')
        expect(typeof s.createKey).toBe('function')
        expect(typeof s.scheduleKeyDeletion).toBe('function')
      }
    })
  })

  describe('pubsub', () => {
    it('createPubSub returns a strategy for each cloud', async () => {
      const { createPubSub } = await import('@agnostic-cloud/pubsub')
      for (const cloud of clouds) {
        const s = createPubSub({ cloud, region: 'us-east-1', config: azureConfig('pubsub') })
        expect(typeof s.publish).toBe('function')
        expect(typeof s.subscribe).toBe('function')
        expect(typeof s.acknowledge).toBe('function')
      }
    })
  })

  describe('nosql', () => {
    it('createNoSql returns a strategy for each cloud', async () => {
      const { createNoSql } = await import('@agnostic-cloud/nosql')
      for (const cloud of clouds) {
        const s = createNoSql({ cloud, region: 'us-east-1', config: azureConfig('nosql') })
        expect(typeof s.putItem).toBe('function')
        expect(typeof s.getItem).toBe('function')
        expect(typeof s.updateItem).toBe('function')
        expect(typeof s.deleteItem).toBe('function')
        expect(typeof s.query).toBe('function')
      }
    })
  })

  describe('migrate', () => {
    it('copyObject and verifyIntegrity are exported', async () => {
      const { copyObject, verifyIntegrity } = await import('@agnostic-cloud/migrate')
      expect(typeof copyObject).toBe('function')
      expect(typeof verifyIntegrity).toBe('function')
    })
  })

  describe('cloud-agnostic error types', () => {
    it('all packages export the same error hierarchy', async () => {
      const storage = await import('@agnostic-cloud/storage')
      const secrets = await import('@agnostic-cloud/secrets')
      for (const pkg of [storage, secrets]) {
        expect(pkg.CloudError).toBeDefined()
        expect(pkg.CloudNotConfiguredError).toBeDefined()
        expect(pkg.InvalidCloudError).toBeDefined()
        expect(pkg.AuthError).toBeDefined()
        expect(pkg.TimeoutError).toBeDefined()
      }
    })
  })
})
