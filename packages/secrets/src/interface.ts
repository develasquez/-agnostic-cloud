export interface CreateSecretOptions {
  description?: string
  tags?: Record<string, string>
}

export interface DeleteSecretOptions {
  recoveryWindowDays?: number
  forceDelete?: boolean
}

export interface ListSecretsOptions {
  maxResults?: number
  nextToken?: string
}

export interface SecretValue {
  name: string
  value: string
  versionId?: string
  created: Date
  lastModified: Date
}

export interface SecretMetadata {
  name: string
  arn?: string
  created: Date
}

export interface ListSecretsResult {
  secrets: SecretMetadata[]
  nextToken?: string
}

export interface SecretsStrategy {
  getSecret(name: string): Promise<SecretValue>
  createSecret(name: string, value: string, options?: CreateSecretOptions): Promise<SecretMetadata>
  updateSecret(name: string, value: string): Promise<SecretMetadata>
  deleteSecret(name: string, options?: DeleteSecretOptions): Promise<void>
  listSecrets(options?: ListSecretsOptions): Promise<ListSecretsResult>
}
