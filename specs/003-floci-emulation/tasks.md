# Tasks: floci-emulation

**Input**: Design documents from `specs/003-floci-emulation/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `checklists/requirements.md`

---

## Phase 1: Setup

- [x] T001 [INFRASTRUCTURE] Update root `docker-compose.yml` to replace legacy services with 3 Floci services, standalone Redis, and `floci-ui` console
- [x] T002 [INFRASTRUCTURE] Declare robust healthcheck blocks for each service in `docker-compose.yml`

---

## Phase 2: Foundational

- [x] T003 Configure root `package.json` scripts (`emulators:start`, `emulators:stop`, `emulators:status`) for container lifecycle orchestration
- [x] T004 Create `scripts/provision-emulators.ts` TypeScript entry point and configure TypeScript execution compiler context (`tsx`)
- [x] T019 [P] Scaffold shared internal helpers in `packages/test-helpers/` to house the centralized `FakeTokenCredential` and endpoint connection resolvers

---

## Phase 3: User Story 1 — Consolidated Multi-Cloud Docker Compose (P1)

- [x] T005 [US1] [INFRASTRUCTURE] Test and verify AWS Floci container booting and healthcheck on port `4566`
- [x] T006 [US1] [INFRASTRUCTURE] Test and verify GCP Floci container booting and healthcheck on port `4588`
- [x] T007 [US1] [INFRASTRUCTURE] Test and verify Azure Floci container booting and healthcheck on port `4577`
- [x] T008 [US1] [INFRASTRUCTURE] Verify visual dashboard container `floci-ui` connects to all three endpoints on port `4500`

---

## Phase 4: User Story 2 — Uniform SDK Endpoint Configuration (P1)

- [x] T009 [US2] Update AWS package tests (`packages/*/test/*.test.ts`) to fall back to `http://localhost:4566` when `AWS_EMULATOR_ENDPOINT` is missing
- [x] T010 [US2] Update GCP package tests (`packages/*/test/*.test.ts`) to fall back to `http://localhost:4588` when `GCP_EMULATOR_ENDPOINT` is missing
- [x] T011 [US2] Update Azure package tests (`packages/*/test/*.test.ts`) to fall back to `http://localhost:4577` when `AZURE_EMULATOR_ENDPOINT` is missing

---

## Phase 5: User Story 3 — Automated Setup & Provisioning (P2)

- [x] T012 [P] [US3] [API] Implement programmatic S3, GCS, and Azure Blob storage bucket creation logic in `scripts/provision-emulators.ts` — see `tasks/003-provision-emulators/task-T012.md`
- [x] T013 [P] [US3] [API] Implement AWS Secrets, GCP Secret Manager, and Azure Key Vault Secrets seeding logic in `scripts/provision-emulators.ts`
- [x] T014 [P] [US3] [API] Implement DynamoDB, Firestore, and Cosmos DB collection/schema initialization logic in `scripts/provision-emulators.ts`
- [x] T015 [P] [US3] [API] Implement AWS SNS/SQS, GCP Pub/Sub, and Azure Service Bus messaging queue/topic creation logic in `scripts/provision-emulators.ts`
- [x] T016 [P] [US3] [API] Implement AWS/GCP KMS and Azure Key Vault Keys seeding logic in `scripts/provision-emulators.ts`

---

## Phase 6: Polish

- [x] T017 Verify that a full cold-boot and test run cycle executes without any errors across all workspaces
- [x] T018 Prune legacy docker configurations, obsolete files, and update developer documentation
