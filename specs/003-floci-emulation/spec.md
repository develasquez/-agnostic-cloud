# Feature Specification: floci-emulation

**Feature Branch**: `003-floci-emulation`
**Created**: 2026-07-31
**Status**: Draft
**Input**: User description: Replace the entire emulation layer of the SDK with Floci local cloud emulators (floci.io) for all clouds (AWS, GCP, Azure) and include configuration, run scripts, and setups for each service.

## Clarifications

### Session 2026-07-31

- Q: What about the Redis emulator used for cache? → A: Redis is a standard, provider-agnostic service. We will keep the standalone `redis:7-alpine` container, as Floci does not natively bundle an independent Redis server, and it works perfectly for all cloud-cache provider strategies using standard Redis wire protocol.
- Q: Should the development dashboard `floci-ui` be enabled by default in the docker-compose environment? → A: Yes, enable `floci-ui` on port 4500 by default. It provides a visual dashboard for inspecting buckets, databases, and queues.
- Q: How should we transition port configurations in existing test suites to prevent breaking changes in local developer environments? → A: Standardize on an environment-override model where tests fallback to Floci ports (4566, 4588, 4577) if no custom env vars are set. This prevents breaking changes if developers use customized ports.

## User Scenarios & Testing

### User Story 1 - Consolidated Multi-Cloud Docker Compose (Priority: P1)

As a developer, I want to replace the 12 disparate and ad-hoc emulator containers with 3 official, lightweight Floci containers (plus Redis), so that local resources are conserved and emulator management is simplified.

**Why this priority**: It is the foundation of the emulation replacement, consolidating all cloud providers (AWS, GCP, Azure) into a single orchestration file.

**Independent Test**: Can be tested by starting the stack with `docker compose up -d` and sending health check queries to ports 4566, 4588, and 4577.

**Acceptance Scenarios**:

1. **Given** a Docker Compose file with Floci emulators, **When** I run `docker compose up -d`, **Then** the three containers `floci` (AWS, 4566), `floci-gcp` (GCP, 4588), and `floci-az` (Azure, 4577) start successfully.
2. **Given** running Floci containers, **When** I query each cloud provider's health endpoint, **Then** they respond with healthy states (HTTP 200).
3. **Given** the visual dashboard container `floci-ui`, **When** started, **Then** it exposes a management console on `http://localhost:4500` connected to all three emulators.

---

### User Story 2 - Uniform SDK Endpoint Configuration (Priority: P1)

As a developer, I want all `@agnostic-cloud` package strategies to automatically point to Floci's single-port endpoints for each cloud when running in local development or test mode, rather than referencing various random ports.

**Why this priority**: Prevents developers from writing custom endpoint redirection logic and ensures standard environment variable configurations.

**Independent Test**: Can be verified by running the e2e tests for `@agnostic-cloud/storage` and `@agnostic-cloud/secrets` pointing to the unified Floci ports and verifying that operations succeed.

**Acceptance Scenarios**:

1. **Given** `cloud: 'aws'`, **When** any AWS strategy is instantiated in development, **Then** it points to `http://localhost:4566` for all operations (S3, Secrets Manager, KMS, DynamoDB, Pub/Sub).
2. **Given** `cloud: 'gcp'`, **When** any GCP strategy is instantiated in development, **Then** it points to `http://localhost:4588` for GCS, Secrets, KMS, Firestore, and Pub/Sub.
3. **Given** `cloud: 'azure'`, **When** any Azure strategy is instantiated in development, **Then** it points to `http://localhost:4577` for Blob, Key Vault, Cosmos, and Pub/Sub.

---

### User Story 3 - Automated Setup & Provisioning Scripts (Priority: P2)

As a contributor or CI workflow runner, I want commands to automatically pull, start, verify, and seed initial test resources (like buckets, databases, pub/sub topics) with a single command, so that tests can execute deterministically on a fresh environment.

**Why this priority**: Essential for pipeline stability and developer onboarding, ensuring that required local resources exist before test suites attempt to connect to them.

**Independent Test**: Can be tested by running the setup script on a fresh Docker volume, and then asserting that buckets and topics are discoverable via the CLI or SDK.

**Acceptance Scenarios**:

1. **Given** a stopped emulation layer, **When** I execute `npm run emulators:start`, **Then** the containers are started and verified as healthy.
2. **Given** running emulators, **When** the startup script detects they are healthy, **Then** it runs a provisioning step to auto-create standard buckets (`test-bucket`), collections (`test-collection`), topics, and secrets.
3. **Given** active emulators, **When** I run `npm run emulators:stop`, **Then** the containers are stopped and all volumes and networks are completely pruned.

---

## Edge Cases

- **Container Socket Access for Lambda/Functions**: Floci AWS handles Lambda by spinning up real Docker-backed runtimes. This requires binding `/var/run/docker.sock` to the container. If the host machine doesn't have Docker Desktop running or has permission issues with the socket, Lambda emulation will fail. The system must degrade gracefully or warn the user.
- **Port Conflicts**: If the host machine already has ports 4566, 4588, or 4577 occupied by legacy emulators, the compose stack will fail to start. The setup script should check port availability before launching.
- **Azure Authentication Mocking**: Azure SDKs require a TokenCredential (e.g. `DefaultAzureCredential`). The emulator bypasses real signature validation but still expects a valid-looking JWT structure. We must provide a consistent `FakeTokenCredential` helper in the test configurations.
- **GCP Pub/Sub Subscription Flow**: GCP Pub/Sub in Floci requires specific project configurations. The provisioning script must ensure that the subscription is explicitly bound to its topic before the test suite starts.

## Requirements

### Functional Requirements

- **FR-001**: The system MUST consolidate all existing 12 ad-hoc emulation containers in `docker-compose.yml` into a unified stack utilizing:
  - AWS: `floci/floci:latest` (Port `4566`)
  - GCP: `floci/floci-gcp:latest` (Port `4588`)
  - Azure: `floci/floci-az:latest` (Port `4577`)
  - Redis: `redis:7-alpine` (Port `6379`)
  - UI Console: `floci/floci-ui:latest` (Port `4500`)
- **FR-002**: The `docker-compose.yml` file MUST define robust healthchecks for each Floci container to ensure other scripts can query their status.
- **FR-003**: The root `package.json` MUST export scripts:
  - `emulators:start`: Starts the stack and waits for healthchecks.
  - `emulators:stop`: Stops the stack and cleans up volumes.
  - `emulators:status`: Inspects the active health status of Floci endpoints.
- **FR-004**: System MUST include a provisioning utility script (`scripts/provision-emulators.ts`) that runs post-startup to create necessary cloud entities (e.g. AWS S3 buckets, GCP Pub/Sub topics, Azure Key Vaults) so test suites can immediately function.
- **FR-005**: All test configurations (e.g. `vitest.config.ts`, `vitest.workspace.ts`) and test suites MUST be updated to point to the consolidated Floci ports instead of old disparate ports (e.g., 9000 for Minio, 10000 for Azurite, 4443 for GCS, etc.).
- **FR-006**: Azure SDK integration in tests MUST utilize a unified `FakeTokenCredential` helper to safely communicate with `floci-az` on port `4577`.

### Key Entities

- **Docker Compose Stack**: The single file `docker-compose.yml` orchestrating Floci emulators, dashboard, and Redis cache.
- **Provisioning Helper**: A script `scripts/provision-emulators.ts` written in TypeScript to declare and initialize necessary default buckets, secrets, and KMS key rings on the healthy Floci emulators.
- **Test Config Helper**: A shared connection/endpoint resolver used by all package tests to determine emulator URLs based on environment variables or fallback defaults.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Total Docker containers required for full multi-cloud local E2E testing is reduced from 13 down to 5 (3 Floci, 1 Redis, 1 UI Console).
- **SC-002**: Cold startup and healthy-readiness time of the entire emulation layer is under 5 seconds (excluding initial image download).
- **SC-003**: All E2E test suites in `@agnostic-cloud/*` pass with 100% success rate when running against the Floci emulation layer.
- **SC-004**: No actual cloud credentials (AWS, GCP, Azure) are required to boot the emulation layer or pass the tests.
- **SC-005**: Ephemeral emulator data is completely isolated in Docker volumes and easily cleared via the cleanup script.

## Assumptions

- Docker and Docker Compose are installed on the developer's machine and CI runners.
- Docker daemon is running and accessible (including `/var/run/docker.sock` for advanced runtimes).
- Node.js version is compatible with executing the TypeScript provisioning scripts.
