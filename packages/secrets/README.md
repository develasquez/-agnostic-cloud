# @agnostic-cloud/secrets

Unified secrets management for AWS Secrets Manager, GCP Secret Manager, and Azure Key Vault.

## Installation

```bash
npm install @agnostic-cloud/secrets
```

> **Note on Peer Dependencies**: Provider SDKs are optional peer dependencies. You only need to install the SDK for the cloud provider(s) you use.

### Supported Cloud Provider SDK Versions

| Cloud Provider | Required SDK Package | Current / Tested Version | Installation Command |
|---|---|---|---|
| **AWS** | `@aws-sdk/client-secrets-manager` | `^3.1095.0` | `npm install @aws-sdk/client-secrets-manager` |
| **GCP** | `@google-cloud/secret-manager` | `^5.6.0` | `npm install @google-cloud/secret-manager` |
| **Azure** | `@azure/keyvault-secrets`<br/>`@azure/identity` | `^4.11.2`<br/>`^4.13.1` | `npm install @azure/keyvault-secrets @azure/identity` |

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
