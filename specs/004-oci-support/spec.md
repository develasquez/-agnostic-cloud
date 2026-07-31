# Feature Specification: oci-support

**Feature Branch**: `004-oci-support`
**Created**: 2026-07-31
**Status**: Draft
**Input**: User description: "aprovechando flocy quiero que incluyas OCI como otra nube y la implementes para todo es incluso que preserves los tests"

---

## Clarifications

### Session 2026-07-31

- **Q: Which emulator should we use for OCI?**
  - **A**: We will use the official OCI emulator of the Floci suite: `floci/floci-oci:latest`. It runs on port `4599` by default.
- **Q: How will authentication credentials work for OCI SDK locally?**
  - **A**: The OCI Node.js SDK expects an RSA keypair and specific OCIDs (tenancy, user, fingerprint). The `floci-oci` emulator accepts any dummy/fake private key content and fingerprint, as it parses request signatures for context but bypasses active cryptographic validation. We will use `SimpleAuthenticationDetailsProvider` in the Node.js OCI SDK with in-memory mock configuration strings.
- **Q: How should local authentication credentials be resolved for OCI SDK client instantiations during development and testing?**
  - **A**: We will bundle a standard, mock RSA private key and dummy credentials (OCIDs) directly within `@agnostic-cloud/test-helpers` to enable out-of-the-box, zero-config execution for local OCI emulation without requiring developers to manage real local `~/.oci/config` files.
- **Q: What OCI services map to each agnostic layer package?**
  - **A**:
    1. `@agnostic-cloud/storage` maps to **OCI Object Storage** (using the `oci-objectstorage` SDK).
    2. `@agnostic-cloud/kms` maps to **OCI Vault/KMS Key Management** (using the `oci-keymanagement` SDK).
    3. `@agnostic-cloud/secrets` maps to **OCI Vault Secrets** (using the `oci-secrets` / `oci-vault` SDKs).
    4. `@agnostic-cloud/pubsub` maps to **OCI Queue** (using the `oci-queue` SDK), which implements the standard publish/subscribe/acknowledge pattern.
    5. `@agnostic-cloud/cache` maps to **RedisCacheStrategy** (just like AWS/GCP/Azure).
    6. `@agnostic-cloud/nosql` is **Not Supported** locally by the emulator. We will implement `OciNoSqlStrategy` that throws `NotImplementedError` for NoSQL.

---

## User Scenarios & Testing

### User Story 1 - Unified OCI Emulator Integration (Priority: P1)

As a developer, I want to add `floci-oci` to our centralized docker-compose environment, so that local OCI services are emulated on port `4599` alongside other cloud providers.

**Why this priority**: Foundational infrastructure necessary to run local integration and end-to-end tests without actual cloud access.

**Independent Test**: Verify by running `docker compose up -d` (or equivalent podman command), sending a health check probe to `http://localhost:4599/health`, and verifying it responds with HTTP 200.

**Acceptance Scenarios**:
1. **Given** a docker-compose configuration, **When** starting the stack, **Then** `floci-oci` container launches on port `4599` and becomes healthy.
2. **Given** a healthy OCI emulator, **When** `scripts/provision-emulators.ts` is run, **Then** it waits for `http://localhost:4599/health` and provisions a default storage bucket `test-bucket`, a default queue `test-queue`, and a vault with a master key.

---

### User Story 2 - OCI Storage Strategy (Priority: P1)

As an application developer, I want to store and retrieve files from OCI Object Storage using a standard API, so that my codebase remains cloud-agnostic.

**Why this priority**: Object storage is a core pillar of the agnostic cloud abstraction layer.

**Independent Test**: Run E2E storage tests pointing to `http://localhost:4599` and assert that putting, getting, and deleting objects in `test-bucket` succeeds.

**Acceptance Scenarios**:
1. **Given** an OCI Object Storage strategy, **When** I upload an object to `test-bucket`, **Then** the object is successfully written to the OCI Object Storage emulator.
2. **Given** an existing object in OCI Object Storage, **When** I request the object, **Then** its contents are returned correctly as a buffer.
3. **Given** an uploaded object, **When** I delete the object, **Then** it is successfully deleted, and subsequent reads throw `ObjectNotFoundError`.

---

### User Story 3 - OCI Vault KMS Strategy (Priority: P1)

As a security developer, I want to encrypt and decrypt sensitive application buffers using OCI Key Management Service (KMS), so that key-wrapping operates cloud-agnostically.

**Why this priority**: Required for compliance and security requirements in multi-cloud deployments.

**Independent Test**: Execute KMS E2E tests against port `4599` to verify key creation, encryption, and decryption are fully functional.

**Acceptance Scenarios**:
1. **Given** an OCI KMS strategy, **When** I create a cryptographic key, **Then** OCI Vault creates a 2048-bit AES/RSA key.
2. **Given** an active key, **When** I request encryption of a text payload, **Then** OCI KMS returns a valid base64-encoded ciphertext buffer.
3. **Given** a ciphertext buffer, **When** I request decryption with the correct key, **Then** OCI KMS returns the exact original plaintext.

---

### User Story 4 - OCI Vault Secrets Strategy (Priority: P1)

As an operations developer, I want to store and retrieve sensitive configuration parameters using OCI Vault Secrets, so that secrets can be fetched transparently.

**Why this priority**: Secrets management is an essential pillar of multi-cloud deployments.

**Independent Test**: Verify secrets CRUD tests against OCI Vault emulator on port `4599`.

**Acceptance Scenarios**:
1. **Given** an OCI Secrets strategy, **When** I write a secret, **Then** OCI Vault creates the secret bundle.
2. **Given** a secret in OCI Vault, **When** I query the secret, **Then** the secret's decoded value is returned.
3. **Given** a secret, **When** I delete the secret, **Then** the secret is removed or marked for deletion in OCI Vault.

---

### User Story 5 - OCI Pub/Sub Strategy (Priority: P1)

As a systems developer, I want to publish, subscribe, and acknowledge messages using OCI Queue, so that event-driven patterns run smoothly.

**Why this priority**: Real-time pub/sub messaging patterns must support OCI.

**Independent Test**: Verify OCI Pub/Sub E2E tests against port `4599` to publish, poll, and delete messages.

**Acceptance Scenarios**:
1. **Given** an OCI Pub/Sub strategy, **When** I publish a message payload to `test-queue`, **Then** OCI Queue stores the message and returns a unique message ID.
2. **Given** an active subscriber callback on `test-queue`, **When** a message is published, **Then** the callback receives the message with its data, attributes, and ID.
3. **Given** a received message, **When** the subscriber acknowledges the message, **Then** the message is deleted from OCI Queue (preventing duplicate processing).

---

## Edge Cases

- **Local private key verification in OCI Node.js SDK**: OCI SDK enforces PEM format validation for private keys, which can be easily bypassed by supplying a standard mock PEM string (e.g. `-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----`) in-memory.
- **Dynamic Port overrides**: Like AWS/GCP/Azure, OCI strategies must dynamically fall back to the environment variable `OCI_EMULATOR_ENDPOINT` or default to `http://localhost:4599`.
- **Pre-provisioning in `floci-oci`**: Creating a vault in OCI requires an async work request. The provisioning script must poll or wait for the vault to become active before creating a key inside it.
- **NoSQL Unsupported Emulation**: Since OCI NoSQL database is not emulated in `floci-oci`, any NoSQL operations for OCI must throw a clean `NotImplementedError`, and NoSQL tests must skip OCI tests gracefully.

---

## Requirements

### Functional Requirements

- **FR-001**: Incorporate `floci-oci` service emulator inside `docker-compose.yml` mapped to external port `4599`, including standard health check definitions.
- **FR-002**: Extend root package scripts and `scripts/provision-emulators.ts` to provision:
  - Object Storage: Bucket `test-bucket`.
  - Queue: Queue named `test-queue-e2e`.
  - Vault Secrets & KMS: Vault named `test-vault`, master key named `test-key`, and a baseline secret.
- **FR-003**: Implement OCI Storage Strategy using OCI Object Storage client.
- **FR-004**: Implement OCI KMS Strategy using OCI Vault Key Management client.
- **FR-005**: Implement OCI Secrets Strategy using OCI Vault Secrets client.
- **FR-006**: Implement OCI Pub/Sub Strategy using OCI Queue client.
- **FR-007**: Define OCI-specific SDK credentials and endpoint resolutions inside `@agnostic-cloud/test-helpers` to supply mock credentials locally.
- **FR-008**: Update `@agnostic-cloud/cache` strategy registry to map `oci` to the standard Redis cache strategy.
- **FR-009**: Update `@agnostic-cloud/nosql` with `OciNoSqlStrategy` throwing `NotImplementedError` for oci cloud type, with gracefully skipped tests.

### Key Entities

- **OciStorageStrategy**: Class implementing `StorageStrategy` using `@oraclecloud/oci-sdk` (objectstorage).
- **OciKmsStrategy**: Class implementing `KmsStrategy` using `@oraclecloud/oci-sdk` (keymanagement).
- **OciSecretsStrategy**: Class implementing `SecretsStrategy` using `@oraclecloud/oci-sdk` (secrets/vault).
- **OciPubSubStrategy**: Class implementing `PubSubStrategy` using `@oraclecloud/oci-sdk` (queue).
- **SimpleAuthenticationDetailsProvider**: SDK credential provider supplying fake keys/OCIDs in-memory for zero local configuration.

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: OCI support is implemented for Object Storage, KMS, Secrets, and Pub/Sub strategies under strict TypeScript guidelines.
- **SC-002**: OCI emulated resources are auto-provisioned correctly post-startup by `scripts/provision-emulators.ts`.
- **SC-003**: 100% of OCI E2E integration tests pass successfully in less than 5 seconds against `floci-oci` emulator.
- **SC-004**: Total integration tests in the repository increase to match the new OCI strategy coverage, with all existing tests (AWS, GCP, Azure) preserved and 100% green.
- **SC-005**: All OCI implementations use in-memory config/credentials requiring zero actual config files or real OCI accounts.

---

## Assumptions

- The host environment runs the `floci-oci` container successfully on port `4599`.
- The user's machine supports running OCI SDK packages inside the workspace.
- Private key signature bypass in `floci-oci` holds true for all emulated API routes.
