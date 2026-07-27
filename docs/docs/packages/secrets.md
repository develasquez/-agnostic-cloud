---
title: '@agnostic-cloud/secrets'
sidebar_label: Overview
---

import CloudTabs from '@site/src/components/CloudTabs';

# @agnostic-cloud/secrets

Unified secrets management interface for AWS Secrets Manager, GCP Secret Manager, and Azure Key Vault.

## Installation

```bash
npm install @agnostic-cloud/secrets
```

Provider SDKs:
- AWS: `npm install @aws-sdk/client-secrets-manager`
- GCP: `npm install @google-cloud/secret-manager`
- Azure: `npm install @azure/keyvault-secrets @azure/identity`

## Factory Function

```typescript
import { createSecrets } from '@agnostic-cloud/secrets'

const secrets = createSecrets({
  cloud: 'aws',
  region: 'us-east-1',
  config: {
    // cloud-specific options
  },
})
```

## Usage Examples

<CloudTabs
  aws={{
    title: 'AWS Secrets Manager',
    code: `const secret = await secrets.createSecret('my-api-key', 'sk-1234')
const value = await secrets.getSecret('my-api-key')
console.log(value.secret)`,
  }}
  gcp={{
    title: 'GCP Secret Manager',
    code: `const secret = await secrets.createSecret('my-api-key', 'sk-1234')
const value = await secrets.getSecret('my-api-key')
console.log(value.secret)`,
  }}
  azure={{
    title: 'Azure Key Vault',
    code: `const secret = await secrets.createSecret('my-api-key', 'sk-1234')
const value = await secrets.getSecret('my-api-key')
console.log(value.secret)`,
  }}
/>

## Configuration

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `cloud` | `'aws' \| 'gcp' \| 'azure'` | yes | Cloud provider |
| `region` | string | no | Provider region |
| `config` | `Record<string, any>` | no | Passed verbatim to provider SDK |

## API Reference

See the [auto-generated API reference](/-agnostic-cloud/docs/next/api/@agnostic-cloud/secrets) for full type signatures.

## Error Handling

| Error | When |
|-------|------|
| `SecretNotFoundError` | Secret does not exist |
| `AuthError` | Authentication failure |
