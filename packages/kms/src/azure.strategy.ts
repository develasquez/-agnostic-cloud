import { KeyClient, CryptographyClient } from '@azure/keyvault-keys'
import { DefaultAzureCredential } from '@azure/identity'
import type { KmsConfig } from './config.js'
import { resolveCloud } from './resolver.js'
import { withRetry } from './retry.js'
import type { KmsStrategy, EncryptionContext, EncryptResult, DecryptResult, CreateKeyOptions, KeyMetadata } from './interface.js'
import type { TokenCredential } from '@azure/core-auth'

export class AzureKmsStrategy implements KmsStrategy {
  private client: KeyClient
  private vaultUrl: string
  private credential: TokenCredential
  private clientOptions: Record<string, unknown>
  private retryConfig: { maxRetries: number; baseDelayMs: number }

  constructor(config: KmsConfig) {
    resolveCloud(config, 'keyvault')
    this.vaultUrl = config.config?.['vaultUrl'] as string ?? `https://${config.config?.['vaultName'] ?? 'default'}.vault.azure.net`
    this.credential = (config.config?.['credential'] as TokenCredential | undefined) ?? new DefaultAzureCredential()
    this.clientOptions = config.config ?? {}
    this.client = new KeyClient(this.vaultUrl, this.credential, config.config)
    this.retryConfig = {
      maxRetries: config.config?.['maxRetries'] as number ?? 3,
      baseDelayMs: config.config?.['baseDelayMs'] as number ?? 100,
    }
  }

  private retry<T>(fn: () => Promise<T>): Promise<T> {
    return withRetry(fn, this.retryConfig)
  }

  private cryptoClient(keyId: string): CryptographyClient {
    return new CryptographyClient(keyId.startsWith('https://') ? keyId : `${this.vaultUrl}/keys/${keyId}`, this.credential, this.clientOptions)
  }

  async encrypt(keyId: string, plaintext: Buffer | string, _context?: EncryptionContext): Promise<EncryptResult> {
    const data = typeof plaintext === 'string' ? Buffer.from(plaintext) : plaintext
    const encryptResult = await this.retry(() => this.cryptoClient(keyId).encrypt('RSA-OAEP', data))

    return {
      ciphertext: Buffer.from(encryptResult.result!),
      keyId: encryptResult.keyID ?? keyId,
    }
  }

  async decrypt(_keyId: string, ciphertext: Buffer, _context?: EncryptionContext): Promise<DecryptResult> {
    const decryptResult = await this.retry(() => this.cryptoClient(_keyId).decrypt('RSA-OAEP', ciphertext))
    return {
      plaintext: Buffer.from(decryptResult.result!),
      keyId: decryptResult.keyID ?? '',
    }
  }

  async createKey(alias: string, options?: CreateKeyOptions): Promise<KeyMetadata> {
    const key = await this.retry(() => this.client.createKey(alias, 'RSA', {
        keyOps: ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey'],
      keySize: 2048,
      tags: options?.tags as Record<string, string>,
    }))

    return {
      keyId: key.id ?? alias,
      arn: key.id ?? '',
      alias,
      created: key.properties.createdOn ?? new Date(),
      enabled: key.properties.enabled ?? true,
    }
  }

  async scheduleKeyDeletion(keyId: string, windowDays?: number): Promise<Date> {
    const result = await this.retry(() => this.client.beginDeleteKey(keyId))
    const deletedKey = await result.pollUntilDone()
    const scheduledDate = deletedKey.properties.scheduledPurgeDate ?? new Date(Date.now() + (windowDays ?? 30) * 86400000)
    return scheduledDate
  }
}
