---
title: '@agnostic-cloud/kms'
sidebar_label: Overview
---

import CloudTabs from '@site/src/components/CloudTabs';

# @agnostic-cloud/kms

Unified key management and encryption interface for AWS KMS, GCP Cloud KMS, and Azure Key Vault.

## Installation

```bash
npm install @agnostic-cloud/kms
```

Provider SDKs:
- AWS: `npm install @aws-sdk/client-kms`
- GCP: `npm install @google-cloud/kms`
- Azure: `npm install @azure/keyvault-keys @azure/identity`

## Factory Function

```typescript
import { createKms } from '@agnostic-cloud/kms'

const kms = createKms({
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
    title: 'AWS KMS',
    code: `const key = await kms.createKey('my-key')
const encrypted = await kms.encrypt(key.id, Buffer.from('secret data'))
const decrypted = await kms.decrypt(key.id, encrypted.ciphertext)
console.log(decrypted.plaintext.toString())`,
  }}
  gcp={{
    title: 'GCP Cloud KMS',
    code: `const key = await kms.createKey('my-key')
const encrypted = await kms.encrypt(key.id, Buffer.from('secret data'))
const decrypted = await kms.decrypt(key.id, encrypted.ciphertext)
console.log(decrypted.plaintext.toString())`,
  }}
  azure={{
    title: 'Azure Key Vault',
    code: `const key = await kms.createKey('my-key')
const encrypted = await kms.encrypt(key.id, Buffer.from('secret data'))
const decrypted = await kms.decrypt(key.id, encrypted.ciphertext)
console.log(decrypted.plaintext.toString())`,
  }}
/>

## Configuration

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `cloud` | `'aws' \| 'gcp' \| 'azure'` | yes | Cloud provider |
| `region` | string | no | Provider region |
| `config` | `Record<string, any>` | no | Passed verbatim to provider SDK |

## API Reference

See the [auto-generated API reference](/agnostic-layer/docs/next/api/@agnostic-cloud/kms) for full type signatures.

## Error Handling

| Error | When |
|-------|------|
| `AuthError` | Authentication failure |
| `TimeoutError` | Request timed out |
