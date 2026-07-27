export interface EncryptionContext {
  [key: string]: string
}

export interface EncryptResult {
  ciphertext: Buffer
  keyId: string
  encryptionAlgorithm?: string
}

export interface DecryptResult {
  plaintext: Buffer
  keyId: string
}

export interface CreateKeyOptions {
  description?: string
  tags?: Record<string, string>
}

export interface KeyMetadata {
  keyId: string
  arn: string
  alias: string
  created: Date
  enabled: boolean
}

export interface KmsStrategy {
  encrypt(keyId: string, plaintext: Buffer | string, context?: EncryptionContext): Promise<EncryptResult>
  decrypt(keyId: string, ciphertext: Buffer, context?: EncryptionContext): Promise<DecryptResult>
  createKey(alias: string, options?: CreateKeyOptions): Promise<KeyMetadata>
  scheduleKeyDeletion(keyId: string, windowDays?: number): Promise<Date>
}
