# Task Specification: T010 — OCI KMS Strategy Implementation

**Task ID**: `T010`
**Feature**: `004-oci-support`
**Scope**: `@agnostic-cloud/kms`
**Status**: Pending

---

## 🎯 Objective

Implement `OciKmsStrategy` in [`packages/kms/src/oci.strategy.ts`](file:///Users/felipe/Desarrollo/agnostic-layer/packages/kms/src/oci.strategy.ts) implementing the `KmsStrategy` interface using the OCI Node.js SDK (`oci-sdk`). Ensure full capability to create keys, encrypt buffers, and decrypt ciphertexts against the `floci-oci` emulator on port `4599`.

---

## 🛠️ Design & Key Methods

### 1. Simple Auth Provider Setup
Construct OCI Client with `SimpleAuthenticationDetailsProvider` as specified in the plan:
```typescript
import * as common from 'oci-sdk/lib/common/index.js'
import * as keymanagement from 'oci-sdk/lib/keymanagement/index.js'
import { getOciAuthProvider, getOciEndpoint } from '@agnostic-cloud/test-helpers'

const provider = getOciAuthProvider()
const endpoint = getOciEndpoint()
```

### 2. Client Configurations
The OCI Key Management Service has three planes, requiring three separate clients:
- `KmsVaultClient` (for vault queries)
- `KmsManagementClient` (for key creation)
- `KmsCryptoClient` (for encryption/decryption)

For the local emulator, point all clients directly to `endpoint` (`http://localhost:4599`):
```typescript
const vaultClient = new keymanagement.KmsVaultClient({ authenticationDetailsProvider: provider })
vaultClient.endpoint = endpoint

const managementClient = new keymanagement.KmsManagementClient({ authenticationDetailsProvider: provider })
managementClient.endpoint = endpoint

const cryptoClient = new keymanagement.KmsCryptoClient({ authenticationDetailsProvider: provider })
cryptoClient.endpoint = endpoint
```

### 3. Implementing Interface Methods

#### `createKey`
```typescript
async createKey(alias: string, options?: CreateKeyOptions): Promise<KeyMetadata> {
  const response = await managementClient.createKey({
    compartmentId: 'ocid1.compartment.oc1..fake-compartment',
    createKeyDetails: {
      displayName: alias,
      keyShape: { algorithm: 'AES', length: 32 }, // 256-bit AES
      protectionMode: 'SOFTWARE'
    }
  })
  return {
    keyId: response.key.id,
    arn: response.key.id,
    alias,
    created: response.key.timeCreated || new Date(),
    enabled: response.key.lifecycleState === 'ACTIVE'
  }
}
```

#### `encrypt`
```typescript
async encrypt(keyId: string, plaintext: Buffer | string, context?: EncryptionContext): Promise<EncryptResult> {
  const content = typeof plaintext === 'string' ? plaintext : plaintext.toString('base64')
  const response = await cryptoClient.encrypt({
    keyId,
    encryptDataDetails: { plaintext: Buffer.from(content).toString('base64') }
  })
  return {
    ciphertext: Buffer.from(response.encryptedData.ciphertext, 'base64'),
    keyId
  }
}
```

#### `decrypt`
```typescript
async decrypt(keyId: string, ciphertext: Buffer, context?: EncryptionContext): Promise<DecryptResult> {
  const response = await cryptoClient.decrypt({
    keyId,
    decryptDataDetails: { ciphertext: ciphertext.toString('base64') }
  })
  return {
    plaintext: Buffer.from(response.decryptedData.plaintext, 'base64'),
    keyId
  }
}
```

---

## 🧪 Verification & Acceptance Criteria

- **Compilation**: Code compiles cleanly with strict TypeScript compiler options (`npm run build` in `@agnostic-cloud/kms`).
- **E2E Test**: Key is created, plaintext is encrypted, ciphertext is decrypted, and the decrypted plaintext matches the original plaintext when run against `floci-oci`.
