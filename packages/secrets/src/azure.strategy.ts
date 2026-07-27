import { SecretClient } from '@azure/keyvault-secrets'
import { DefaultAzureCredential } from '@azure/identity'
import { withRetry } from './retry.js'
import type { SecretsConfig } from './config.js'
import { SecretNotFoundError, AuthError } from './errors.js'
import { resolveCloud } from './resolver.js'
import type {
  SecretsStrategy,
  CreateSecretOptions,
  DeleteSecretOptions,
  ListSecretsOptions,
  SecretValue,
  SecretMetadata,
  ListSecretsResult,
} from './interface.js'
import type { TokenCredential } from '@azure/core-auth'

export class AzureSecretsStrategy implements SecretsStrategy {
  private client: SecretClient
  private vaultUrl: string
  private maxRetries: number
  private baseDelayMs: number

  constructor(config: SecretsConfig) {
    resolveCloud(config, 'keyvault')
    this.vaultUrl = config.config?.['vaultUrl'] as string ?? `https://${config.config?.['vaultName'] ?? 'default'}.vault.azure.net`
    const credential = (config.config?.['credential'] as TokenCredential | undefined) ?? new DefaultAzureCredential()
    this.client = new SecretClient(this.vaultUrl, credential, config.config)
    this.maxRetries = config.config?.['maxRetries'] as number ?? 3
    this.baseDelayMs = config.config?.['baseDelayMs'] as number ?? 100
  }

  private retry<T>(fn: () => Promise<T>): Promise<T> {
    return withRetry(fn, { maxRetries: this.maxRetries, baseDelayMs: this.baseDelayMs })
  }

  async getSecret(name: string): Promise<SecretValue> {
    try {
      const secret = await this.retry(() => this.client.getSecret(name))
      return {
        name: secret.name ?? name,
        value: secret.value ?? '',
        versionId: secret.properties.version,
        created: secret.properties.createdOn ?? new Date(),
        lastModified: secret.properties.updatedOn ?? new Date(),
      }
    } catch (err: any) {
      if (err.statusCode === 404) throw new SecretNotFoundError('azure', 'keyvault', name)
      if (err.statusCode === 403) throw new AuthError('azure', 'keyvault', 'getSecret')
      throw err
    }
  }

  async createSecret(name: string, value: string, options?: CreateSecretOptions): Promise<SecretMetadata> {
    const secret = await this.retry(() => this.client.setSecret(name, value, {
      tags: options?.tags,
    }))

    return {
      name: secret.name ?? name,
      created: secret.properties.createdOn ?? new Date(),
    }
  }

  async updateSecret(name: string, value: string): Promise<SecretMetadata> {
    const secret = await this.retry(() => this.client.setSecret(name, value))
    return {
      name: secret.name ?? name,
      created: secret.properties.createdOn ?? new Date(),
    }
  }

  async deleteSecret(name: string, _options?: DeleteSecretOptions): Promise<void> {
    try {
      const poller = await this.retry(() => this.client.beginDeleteSecret(name))
      await poller.pollUntilDone()
    } catch (err: any) {
      if (err.statusCode === 404) return
      throw err
    }
  }

  async listSecrets(options?: ListSecretsOptions): Promise<ListSecretsResult> {
    const secrets = await this.retry(async () => {
      const results: SecretMetadata[] = []
      let count = 0
      for await (const secret of this.client.listPropertiesOfSecrets()) {
        results.push({
          name: secret.name!,
          created: secret.createdOn ?? new Date(),
        })
        count++
        if (options?.maxResults && count >= options.maxResults) break
      }
      return results
    })

    return { secrets }
  }
}
