# Technical Plan: oci-support

This plan describes the technical architecture, component designs, dependency changes, and local provisioning flows to introduce Oracle Cloud Infrastructure (OCI) support to the Agnostic Cloud abstraction layer.

---

## 🏛️ Architecture & Module Map

All OCI implementations will reside within the existing modular workspace directories, fully self-contained as separate strategy files, conforming to standard strategy interfaces.

```text
packages/
├── test-helpers/
│   └── src/
│       └── index.ts                 # Export getOciEndpoint() & getOciCredentials()
├── cache/
│   └── src/
│       └── index.ts                 # Add 'oci' mapping to RedisCacheStrategy
├── nosql/
│   └── src/
│       ├── index.ts                 # Add 'oci' mapping to OciNoSqlStrategy
│       └── oci.strategy.ts          # Stub throwing NotImplementedError
├── storage/
│   └── src/
│       ├── index.ts                 # Add 'oci' mapping to OciStorageStrategy
│       └── oci.strategy.ts          # Class OciStorageStrategy implementing StorageStrategy
├── secrets/
│   └── src/
│       ├── index.ts                 # Add 'oci' mapping to OciSecretsStrategy
│       └── oci.strategy.ts          # Class OciSecretsStrategy implementing SecretsStrategy
├── kms/
│   └── src/
│       ├── index.ts                 # Add 'oci' mapping to OciKmsStrategy
│       └── oci.strategy.ts          # Class OciKmsStrategy implementing KmsStrategy
└── pubsub/
    └── src/
        ├── index.ts                 # Add 'oci' mapping to OciPubSubStrategy
        └── oci.strategy.ts          # Class OciPubSubStrategy implementing PubSubStrategy
```

---

## 🔑 Authentication & Connection Design

To ensure local tests are 100% independent of actual cloud credentials, we will bundle dummy/mock RSA credentials inside `@agnostic-cloud/test-helpers`. The `floci-oci` emulator (port `4599`) parses request signatures for identity context (tenancy/user OCIDs) but bypasses cryptographic private key validation.

### Standard Credentials Provider
We will implement an OCI authentication helper in `@agnostic-cloud/test-helpers` using `oci-sdk/lib/common`:

```typescript
import * as common from 'oci-sdk/lib/common/index.js'

export function getOciEndpoint(): string {
  return process.env.OCI_EMULATOR_ENDPOINT || 'http://localhost:4599'
}

export function getOciCredentials() {
  const tenancy = 'ocid1.tenancy.oc1..fake-tenancy-id'
  const user = 'ocid1.user.oc1..fake-user-id'
  const fingerprint = '20:3b:97:13:55:1c:cf:0d:86:14:ee:74:97:bc:fc:a1'
  const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAn9... [valid dummy PEM private key] ...
-----END RSA PRIVATE KEY-----`
  
  return {
    tenancy,
    user,
    fingerprint,
    privateKey,
    region: 'us-phoenix-1'
  }
}

export function getOciAuthProvider() {
  const creds = getOciCredentials()
  return new common.SimpleAuthenticationDetailsProvider(
    creds.tenancy,
    creds.user,
    creds.fingerprint,
    creds.privateKey,
    null,
    creds.region
  )
}
```

---

## 📦 Strategy Designs

### 1. Storage (`OciStorageStrategy`)
* **Underlying Service**: OCI Object Storage.
* **SDK Module**: `oci-sdk/lib/objectstorage` (`ObjectStorageClient`).
* **Implementation Details**:
  * Override the dynamic endpoint: `client.endpoint = getOciEndpoint()`.
  * Retrieve namespace: Call `client.getNamespace({})` to cache the OCI Object Storage namespace name (required for all bucket operations).
  * **Operations**:
    * `putObject`: Map to `client.putObject({ namespaceName, bucketName, objectName, putObjectBody })`.
    * `getObject`: Map to `client.getObject({ namespaceName, bucketName, objectName })`. Read stream into a Node.js `Buffer`.
    * `deleteObject`: Map to `client.deleteObject({ namespaceName, bucketName, objectName })`.

### 2. Secrets (`OciSecretsStrategy`)
* **Underlying Service**: OCI Vault Secrets.
* **SDK Module**: `oci-sdk/lib/secrets` (`SecretsClient`) & `oci-sdk/lib/vault` (`VaultsClient`).
* **Implementation Details**:
  * Override endpoint: `client.endpoint = getOciEndpoint()`.
  * **Operations**:
    * `getSecret`: Call `client.getSecretBundle({ secretId })` and decode the secret content from base64.
    * `createSecret` / `putSecret`: Call `vaultsClient.createSecret({ createSecretDetails: { secretContent: { content: b64Value, contentType: 'BASE64' } } })`.

### 3. KMS (`OciKmsStrategy`)
* **Underlying Service**: OCI Key Management Service (KMS).
* **SDK Module**: `oci-sdk/lib/keymanagement` (`KmsVaultClient`, `KmsManagementClient`, `KmsCryptoClient`).
* **Implementation Details**:
  * Override endpoint: Set all KMS clients to `getOciEndpoint()`.
  * **Operations**:
    * `createKey`: Call `managementClient.createKey({ compartmentId, createKeyDetails: { keyShape: { algorithm: 'AES', length: 32 } } })`.
    * `encrypt`: Call `cryptoClient.encrypt({ encryptDataDetails: { plaintext: b64String }, keyId })`.
    * `decrypt`: Call `cryptoClient.decrypt({ decryptDataDetails: { ciphertext }, keyId })`.

### 4. Pub/Sub (`OciPubSubStrategy`)
* **Underlying Service**: OCI Queue.
* **SDK Module**: `oci-sdk/lib/queue` (`QueueClient`).
* **Implementation Details**:
  * Override endpoint: `client.endpoint = getOciEndpoint()`.
  * **Operations**:
    * `publish`: Call `client.putMessages({ queueId, putMessagesDetails: { messages: [{ content: b64String }] } })`.
    * `subscribe`: Long-poll via `client.getMessages({ queueId })`. Invoke callback and track message receipts.
    * `acknowledge`: Call `client.deleteMessage({ queueId, receipt })`.

---

## 🐳 Docker Compose & Post-Startup Provisioning

### 1. `docker-compose.yml` Configuration
We will add `floci-oci` to our central container stack:

```yaml
  # OCI Emulator
  floci-oci:
    image: floci/floci-oci:latest
    container_name: floci-oci
    ports:
      - "4599:4599"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4599/health"]
      interval: 2s
      timeout: 2s
      retries: 5
```

### 2. `scripts/provision-emulators.ts` Additions
Add provisions for OCI post-healthcheck:
1. Wait for `http://localhost:4599/health`.
2. Retrieve local object storage namespace.
3. Call `client.createBucket({ namespaceName, createBucketDetails: { name: 'test-bucket' } })`.
4. Create OCI Vault, KMS Key, and Queue resource entities so tests can execute immediately without bootstrapping.

---

## 🛠️ Package Dependency Map

We will declare `oci-sdk` as a dependency across the target workspaces to enable clean compilation:

```json
  "dependencies": {
    "oci-sdk": "^2.1120.0"
  }
```
*(Added to `packages/storage/package.json`, `packages/kms/package.json`, `packages/secrets/package.json`, `packages/pubsub/package.json`, and `packages/test-helpers/package.json`)*.
