# Research & Decisions: floci-emulation

**Feature**: `003-floci-emulation`
**Created**: 2026-07-31

---

## Technology Decisions

### Decision 1: Consolidating Local Cloud Emulation via Floci

- **Context**: The existing local testing environment orchestrates 12 distinct containerized services (Minio, fake-gcs-server, Azurite, local-kms, Nimbus, GCP secret manager emulator, GCP KMS emulator, Blackwell emulators, Azure Key Vault emulator, Cosmos DB emulator, etc.) consuming up to ~4-6 GiB of RAM and taking over 30 seconds to boot and health-check in local and CI environments.
- **Decision**: Adopt the Floci emulator suite, running 3 unified multi-service containers:
  - `floci` (AWS) for S3, Secrets Manager, KMS, DynamoDB, SQS, and SNS.
  - `floci-gcp` (GCP) for GCS, Secret Manager, KMS, Firestore, and Pub/Sub.
  - `floci-az` (Azure) for Blob Storage, Key Vault (Secrets & Keys), Cosmos DB, and Service Bus/Event Hubs.
- **Rationale**:
  - **Memory & Startup Footprint**: Floci is written in Quarkus Native (GraalVM). Each container boots in ~25ms and has an idle memory footprint of ~13 MiB. Consolidating to Floci reduces local testing overhead to <100 MiB total idle RAM.
  - **Single-Port Architecture**: Traditional stacks map different ports per service. Floci groups all services for a cloud onto a single port (AWS: 4566, GCP: 4588, Azure: 4577), dramatically reducing port exhaustion risks and simplifying routing.
  - **MIT Licensed / Fully Open Source**: Unlike LocalStack, Floci has no feature gates or community-tier sunsetting.
- **Alternatives Considered**:
  - *Keep Legacy Stack*: Denied. Causes massive Docker Compose bloat (12 containers) and slow CI pipelines.
  - *LocalStack Community*: Denied. Only solves AWS. Leaving GCP/Azure to separate emulators would still require 8+ containers.
  - *Testcontainers directly in code*: Denied. Testcontainers are great but spinning them up per-test adds substantial runtime overhead compared to a persistent Compose-managed emulation layer.

---

### Decision 2: Standardizing Port / Endpoint Redirection in SDK Tests

- **Context**: E2E tests are scattered with hardcoded endpoints (e.g. `http://localhost:9000` for Minio, `http://localhost:4443` for GCS). Moving directly to new hardcoded Floci ports would prevent developers from overriding them if they run custom containers.
- **Decision**: Introduce a test configuration contract where strategies fetch the endpoint from standard environment variables (e.g. `AWS_EMULATOR_ENDPOINT`, `GCP_EMULATOR_ENDPOINT`, `AZURE_EMULATOR_ENDPOINT`) and fallback to Floci ports (`http://localhost:4566`, `http://localhost:4588`, `http://localhost:4577`) if not set.
- **Rationale**:
  - Promotes modular testing and avoids breaking change risks.
  - Enables flawless integration with customized dev environments or external registries.
  - Matches the "Library-First" and "Minimal Dependencies" constitution guidelines by keeping the fallback logic clean.

---

### Decision 3: Emulating Cache (Redis)

- **Context**: All three cloud strategies utilize Redis under the hood for `@agnostic-cloud/cache`.
- **Decision**: Retain the standalone `redis:7-alpine` Docker service in `docker-compose.yml`.
- **Rationale**: Redis is a provider-agnostic, third-party technology rather than a native cloud provider API. Floci does not natively emulate Redis, and utilizing a clean, lightweight alpine Redis container is the industry standard.

---

### Benchmarks and Expected Outcomes

| Metric | Legacy Emulator Stack | Floci Emulation Stack | Delta |
|---|---|---|---|
| **Container Count** | 12 | 5 (3 Floci + Redis + UI) | -58% |
| **Idle Memory Footprint** | ~3.5 GiB | ~120 MiB | -97% |
| **Boot & Readiness Time** | ~32 seconds | < 3 seconds | -89% |
| **Port Declarations** | 18 ports | 5 ports | -72% |
