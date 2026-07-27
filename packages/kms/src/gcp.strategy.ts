import { KeyManagementServiceClient } from '@google-cloud/kms'
import type { KmsConfig } from './config.js'
import { resolveCloud } from './resolver.js'
import { withRetry } from './retry.js'
import type { KmsStrategy, EncryptionContext, EncryptResult, DecryptResult, CreateKeyOptions, KeyMetadata } from './interface.js'

export class GcpKmsStrategy implements KmsStrategy {
  private client: KeyManagementServiceClient
  private project: string
  private location: string
  private retryConfig: { maxRetries: number; baseDelayMs: number }

  constructor(config: KmsConfig) {
    resolveCloud(config, 'kms')
    this.client = new KeyManagementServiceClient(config.config)
    this.project = config.config?.['projectId'] as string ?? config.config?.['project'] as string ?? 'unknown'
    this.location = config.config?.['location'] as string ?? 'global'
    this.retryConfig = {
      maxRetries: config.config?.['maxRetries'] as number ?? 3,
      baseDelayMs: config.config?.['baseDelayMs'] as number ?? 100,
    }
  }

  private retry<T>(fn: () => Promise<T>): Promise<T> {
    return withRetry(fn, this.retryConfig)
  }

  private keyRingPath(): string {
    return this.client.keyRingPath(this.project, this.location, 'agnostic-cloud')
  }

  private cryptoKeyPath(keyId: string): string {
    const parts = keyId.includes('/') ? keyId.split('/') : [keyId]
    const shortName = parts[parts.length - 1] ?? keyId
    return this.client.cryptoKeyPath(this.project, this.location, 'agnostic-cloud', shortName)
  }

  async encrypt(keyId: string, plaintext: Buffer | string, context?: EncryptionContext): Promise<EncryptResult> {
    const [result] = await this.retry(() => this.client.encrypt({
      name: this.cryptoKeyPath(keyId),
      plaintext: typeof plaintext === 'string' ? Buffer.from(plaintext) : plaintext,
      additionalAuthenticatedData: context ? Buffer.from(JSON.stringify(context)) : undefined,
    }))

    return {
      ciphertext: Buffer.from(result.ciphertext!),
      keyId,
    }
  }

  async decrypt(_keyId: string, ciphertext: Buffer, context?: EncryptionContext): Promise<DecryptResult> {
    const [result] = await this.retry(() => this.client.decrypt({
      ciphertext,
      additionalAuthenticatedData: context ? Buffer.from(JSON.stringify(context)) : undefined,
    }))

    return {
      plaintext: Buffer.from(result.plaintext!),
      keyId: '',
    }
  }

  async createKey(alias: string, options?: CreateKeyOptions): Promise<KeyMetadata> {
    const [key] = await this.retry(() => this.client.createCryptoKey({
      parent: this.keyRingPath(),
      cryptoKeyId: alias,
      cryptoKey: {
        purpose: 'ENCRYPT_DECRYPT',
        versionTemplate: { algorithm: 'GOOGLE_SYMMETRIC_ENCRYPTION' },
        labels: options?.tags,
      },
    }))

    return {
      keyId: alias,
      arn: key.name ?? '',
      alias,
      created: fromTimestamp(key.createTime),
      enabled: key.primary?.state === 'ENABLED',
    }
  }

  async scheduleKeyDeletion(keyId: string, windowDays?: number): Promise<Date> {
    const [result] = await this.retry(() => this.client.destroyCryptoKeyVersion({
      name: `${this.cryptoKeyPath(keyId)}/cryptoKeyVersions/1`,
    }))
    return new Date(Date.now() + (windowDays ?? 30) * 86400000)
  }
}

function fromTimestamp(ts: { seconds?: unknown; nanos?: number | null } | null | undefined): Date {
  if (!ts) return new Date()
  const seconds = typeof ts.seconds === 'number' ? ts.seconds : Number(ts.seconds ?? 0)
  return new Date(seconds * 1000)
}
