import {
  SecretsManagerClient,
  GetSecretValueCommand,
  CreateSecretCommand,
  UpdateSecretCommand,
  DeleteSecretCommand,
  ListSecretsCommand,
} from '@aws-sdk/client-secrets-manager'
import type { SecretsConfig } from './config.js'
import { SecretNotFoundError, AuthError } from './errors.js'
import { resolveCloud } from './resolver.js'
import { withRetry } from './retry.js'
import type {
  SecretsStrategy,
  CreateSecretOptions,
  DeleteSecretOptions,
  ListSecretsOptions,
  SecretValue,
  SecretMetadata,
  ListSecretsResult,
} from './interface.js'

export class AwsSecretsStrategy implements SecretsStrategy {
  private client: SecretsManagerClient
  private retryConfig: { maxRetries: number; baseDelayMs: number }

  constructor(config: SecretsConfig) {
    resolveCloud(config, 'secrets-manager')
    this.client = new SecretsManagerClient({ region: config.region ?? 'us-east-1', ...config.config })
    this.retryConfig = {
      maxRetries: config.config?.['maxRetries'] as number ?? 3,
      baseDelayMs: config.config?.['baseDelayMs'] as number ?? 100,
    }
  }

  async getSecret(name: string): Promise<SecretValue> {
    try {
      const result = await withRetry(() => this.client.send(new GetSecretValueCommand({ SecretId: name })), this.retryConfig)
      return {
        name: result.Name ?? name,
        value: result.SecretString ?? '',
        versionId: result.VersionId,
        created: result.CreatedDate ?? new Date(),
        lastModified: result.CreatedDate ?? new Date(),
      }
    } catch (err: any) {
      if (err.name === 'ResourceNotFoundException') throw new SecretNotFoundError('aws', 'secrets-manager', name)
      if (err.name === 'CredentialsProviderError') throw new AuthError('aws', 'secrets-manager', 'getSecret')
      throw err
    }
  }

  async createSecret(name: string, value: string, options?: CreateSecretOptions): Promise<SecretMetadata> {
    const result = await withRetry(() => this.client.send(new CreateSecretCommand({
      Name: name,
      SecretString: value,
      Description: options?.description,
      Tags: options?.tags ? Object.entries(options.tags).map(([Key, Value]) => ({ Key, Value })) : undefined,
    })), this.retryConfig)

    return {
      name: result.Name ?? name,
      arn: result.ARN,
      created: new Date(),
    }
  }

  async updateSecret(name: string, value: string): Promise<SecretMetadata> {
    const result = await withRetry(() => this.client.send(new UpdateSecretCommand({
      SecretId: name,
      SecretString: value,
    })), this.retryConfig)

    return {
      name: result.Name ?? name,
      arn: result.ARN,
      created: new Date(),
    }
  }

  async deleteSecret(name: string, options?: DeleteSecretOptions): Promise<void> {
    await withRetry(() => this.client.send(new DeleteSecretCommand({
      SecretId: name,
      RecoveryWindowInDays: options?.recoveryWindowDays ?? 30,
      ForceDeleteWithoutRecovery: options?.forceDelete,
    })), this.retryConfig)
  }

  async listSecrets(options?: ListSecretsOptions): Promise<ListSecretsResult> {
    const result = await withRetry(() => this.client.send(new ListSecretsCommand({
      MaxResults: options?.maxResults,
      NextToken: options?.nextToken,
    })), this.retryConfig)

    return {
      secrets: (result.SecretList ?? []).map(s => ({
        name: s.Name!,
        arn: s.ARN,
        created: s.CreatedDate ?? new Date(),
      })),
      nextToken: result.NextToken,
    }
  }
}
