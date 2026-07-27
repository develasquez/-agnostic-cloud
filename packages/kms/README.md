# @agnostic-cloud/kms

Unified key management for AWS KMS, GCP Cloud KMS, and Azure Key Vault Keys.

## Installation

```bash
npm install @agnostic-cloud/kms
```

## Usage

```typescript
import { createKms } from '@agnostic-cloud/kms'

const kms = createKms({
  cloud: 'aws',
  region: 'us-east-1',
})

// Create key
const key = await kms.createKey('my-key', {
  description: 'Encryption key for app secrets',
})

// Encrypt
const encrypted = await kms.encrypt(key.keyId, 'sensitive data')

// Decrypt
const decrypted = await kms.decrypt(key.keyId, encrypted.ciphertext)

// Schedule deletion
const deletionDate = await kms.scheduleKeyDeletion(key.keyId, 7)
```

## API

### `createKms(config: KmsConfig): KmsStrategy`

| Method | Signature |
|--------|-----------|
| `encrypt` | `(keyId, plaintext, context?) => Promise<EncryptResult>` |
| `decrypt` | `(keyId, ciphertext, context?) => Promise<DecryptResult>` |
| `createKey` | `(alias, options?) => Promise<KeyMetadata>` |
| `scheduleKeyDeletion` | `(keyId, windowDays?) => Promise<Date>` |

## Configuration

```typescript
interface KmsConfig {
  cloud?: 'aws' | 'gcp' | 'azure'
  region?: string
  config?: Record<string, any>
}
```

## Documentation

Full docs: https://develasquez.github.io/-agnostic-cloud/docs/next/packages/kms

API reference: https://develasquez.github.io/-agnostic-cloud/docs/next/api/@agnostic-cloud/kms
