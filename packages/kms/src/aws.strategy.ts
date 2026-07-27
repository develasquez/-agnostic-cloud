import {
  KMSClient,
  EncryptCommand,
  DecryptCommand,
  CreateKeyCommand,
  ScheduleKeyDeletionCommand,
} from '@aws-sdk/client-kms'
import type { KmsConfig } from './config.js'
import { resolveCloud } from './resolver.js'
import { withRetry } from './retry.js'
import type { KmsStrategy, EncryptionContext, EncryptResult, DecryptResult, CreateKeyOptions, KeyMetadata } from './interface.js'

export class AwsKmsStrategy implements KmsStrategy {
  private client: KMSClient
  private retryConfig: { maxRetries: number; baseDelayMs: number }

  constructor(config: KmsConfig) {
    resolveCloud(config, 'kms')
    this.client = new KMSClient({ region: config.region ?? 'us-east-1', ...config.config })
    this.retryConfig = {
      maxRetries: config.config?.['maxRetries'] as number ?? 3,
      baseDelayMs: config.config?.['baseDelayMs'] as number ?? 100,
    }
  }

  async encrypt(keyId: string, plaintext: Buffer | string, context?: EncryptionContext): Promise<EncryptResult> {
    const result = await withRetry(() => this.client.send(new EncryptCommand({
      KeyId: keyId,
      Plaintext: typeof plaintext === 'string' ? Buffer.from(plaintext) : plaintext,
      EncryptionContext: context,
    })), this.retryConfig)

    return {
      ciphertext: Buffer.from(result.CiphertextBlob!),
      keyId: result.KeyId ?? keyId,
      encryptionAlgorithm: result.EncryptionAlgorithm,
    }
  }

  async decrypt(keyId: string, ciphertext: Buffer, context?: EncryptionContext): Promise<DecryptResult> {
    const result = await withRetry(() => this.client.send(new DecryptCommand({
      KeyId: keyId,
      CiphertextBlob: ciphertext,
      EncryptionContext: context,
    })), this.retryConfig)

    return {
      plaintext: Buffer.from(result.Plaintext!),
      keyId: result.KeyId ?? keyId,
    }
  }

  async createKey(alias: string, options?: CreateKeyOptions): Promise<KeyMetadata> {
    const result = await withRetry(() => this.client.send(new CreateKeyCommand({
      Description: options?.description,
      Tags: options?.tags ? Object.entries(options.tags).map(([TagKey, TagValue]) => ({ TagKey, TagValue })) : undefined,
    })), this.retryConfig)

    return {
      keyId: result.KeyMetadata?.KeyId ?? '',
      arn: result.KeyMetadata?.Arn ?? '',
      alias,
      created: result.KeyMetadata?.CreationDate ?? new Date(),
      enabled: result.KeyMetadata?.Enabled ?? true,
    }
  }

  async scheduleKeyDeletion(keyId: string, windowDays?: number): Promise<Date> {
    const result = await withRetry(() => this.client.send(new ScheduleKeyDeletionCommand({
      KeyId: keyId,
      PendingWindowInDays: windowDays ?? 30,
    })), this.retryConfig)

    return result.DeletionDate ?? new Date()
  }
}
