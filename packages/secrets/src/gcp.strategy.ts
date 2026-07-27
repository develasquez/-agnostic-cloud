import { SecretManagerServiceClient } from '@google-cloud/secret-manager'
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

export class GcpSecretsStrategy implements SecretsStrategy {
  private client: SecretManagerServiceClient
  private project: string
  private maxRetries: number
  private baseDelayMs: number

  constructor(config: SecretsConfig) {
    resolveCloud(config, 'secret-manager')
    this.client = new SecretManagerServiceClient(config.config)
    this.project = config.config?.['projectId'] ?? (config.config?.['project'] as string) ?? 'unknown'
    this.maxRetries = config.config?.['maxRetries'] as number ?? 3
    this.baseDelayMs = config.config?.['baseDelayMs'] as number ?? 100
  }

  private parent(): string {
    return `projects/${this.project}`
  }

  private secretPath(name: string): string {
    return `${this.parent()}/secrets/${name}`
  }

  private versionPath(name: string, version: string = 'latest'): string {
    return `${this.secretPath(name)}/versions/${version}`
  }

  private retry<T>(fn: () => Promise<T>): Promise<T> {
    return withRetry(fn, { maxRetries: this.maxRetries, baseDelayMs: this.baseDelayMs })
  }

  async getSecret(name: string): Promise<SecretValue> {
    try {
      const [version] = await this.retry(() => this.client.accessSecretVersion({ name: this.versionPath(name) }))
      const [secret] = await this.retry(() => this.client.getSecret({ name: this.secretPath(name) }))

      return {
        name,
        value: version.payload?.data?.toString() ?? '',
        created: fromTimestamp(secret.createTime),
        lastModified: fromTimestamp(secret.createTime),
      }
    } catch (err: any) {
      if (err.code === 5 || err.code === 404) throw new SecretNotFoundError('gcp', 'secret-manager', name)
      if (err.code === 7 || err.code === 16) throw new AuthError('gcp', 'secret-manager', 'getSecret')
      throw err
    }
  }

  async createSecret(name: string, value: string, options?: CreateSecretOptions): Promise<SecretMetadata> {
    const [secret] = await this.retry(() => this.client.createSecret({
      parent: this.parent(),
      secretId: name,
      secret: {
        replication: { automatic: {} },
        labels: options?.tags,
      },
    }))

    await this.retry(() => this.client.addSecretVersion({
      parent: secret.name,
      payload: { data: Buffer.from(value) },
    }))

    return {
      name,
      arn: secret.name ?? undefined,
      created: fromTimestamp(secret.createTime),
    }
  }

  async updateSecret(name: string, value: string): Promise<SecretMetadata> {
    const [secret] = await this.retry(() => this.client.getSecret({ name: this.secretPath(name) }))
    await this.retry(() => this.client.addSecretVersion({
      parent: secret.name,
      payload: { data: Buffer.from(value) },
    }))

    return {
      name,
      arn: secret.name ?? undefined,
      created: fromTimestamp(secret.createTime),
    }
  }

  async deleteSecret(name: string, _options?: DeleteSecretOptions): Promise<void> {
    try {
      await this.retry(() => this.client.deleteSecret({ name: this.secretPath(name) }))
    } catch (err: any) {
      if (err.code === 5) return // already deleted
      throw err
    }
  }

  async listSecrets(options?: ListSecretsOptions): Promise<ListSecretsResult> {
    const [secrets] = await this.retry(() => this.client.listSecrets({
      parent: this.parent(),
      pageSize: options?.maxResults,
    }))

    return {
      secrets: secrets.map(s => ({
        name: s.name?.split('/').pop() ?? '',
        arn: s.name ?? undefined,
        created: fromTimestamp(s.createTime),
      })),
    }
  }
}

function fromTimestamp(ts: { seconds?: unknown; nanos?: number | null } | null | undefined): Date {
  if (!ts) return new Date()
  const seconds = typeof ts.seconds === 'number' ? ts.seconds : Number(ts.seconds ?? 0)
  return new Date(seconds * 1000)
}
