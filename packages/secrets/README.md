# @agnostic-cloud/secrets

Unified secrets management for AWS Secrets Manager, GCP Secret Manager, and Azure Key Vault.

## Installation

```bash
npm install @agnostic-cloud/secrets
```

## Usage

```typescript
import { createSecrets } from '@agnostic-cloud/secrets'

const secrets = createSecrets({
  cloud: 'gcp',
  region: 'us-central1',
})

// Create
await secrets.createSecret('my-secret', 'supersecret', {
  description: 'API key',
})

// Read
const secret = await secrets.getSecret('my-secret')

// Update
await secrets.updateSecret('my-secret', 'newvalue')

// List
const result = await secrets.listSecrets()

// Delete
await secrets.deleteSecret('my-secret')
```

## API

### `createSecrets(config: SecretsConfig): SecretsStrategy`

| Method | Signature |
|--------|-----------|
| `getSecret` | `(name) => Promise<SecretValue>` |
| `createSecret` | `(name, value, options?) => Promise<SecretMetadata>` |
| `updateSecret` | `(name, value) => Promise<SecretMetadata>` |
| `deleteSecret` | `(name, options?) => Promise<void>` |
| `listSecrets` | `(options?) => Promise<ListSecretsResult>` |

## Configuration

```typescript
interface SecretsConfig {
  cloud?: 'aws' | 'gcp' | 'azure'
  region?: string
  config?: Record<string, any>
}
```

## Documentation

Full docs: https://develasquez.github.io/-agnostic-cloud/docs/next/packages/secrets

API reference: https://develasquez.github.io/-agnostic-cloud/docs/next/api/@agnostic-cloud/secrets
