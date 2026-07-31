# Task Checklist: oci-support

## Phase 1: Setup

- [ ] T001 [P1] [INFRASTRUCTURE] Add `oci-sdk` dependency to packages/storage/package.json, packages/kms/package.json, packages/secrets/package.json, packages/pubsub/package.json, and packages/test-helpers/package.json
- [ ] T002 [P1] [INFRASTRUCTURE] Implement OCI endpoint helper, mock credentials, and simple auth provider in packages/test-helpers/src/index.ts
- [ ] T003 [P1] [INFRASTRUCTURE] Add `floci-oci` container service and health checks to docker-compose.yml

## Phase 2: Foundational

- [ ] T004 [P1] [INFRASTRUCTURE] Extend scripts/provision-emulators.ts to wait for floci-oci healthcheck, and auto-provision 'test-bucket', 'test-queue-e2e', and 'test-vault'/'test-key'
- [ ] T005 [P1] Map 'oci' provider inside packages/cache/src/index.ts to RedisCacheStrategy
- [ ] T006 [P1] Implement OciNoSqlStrategy throwing NotImplementedError in packages/nosql/src/oci.strategy.ts and register in packages/nosql/src/index.ts

## Phase 3: User Story 2 (P1) - OCI Storage

- [ ] T007 [P1] [US2] [API] Implement OciStorageStrategy using ObjectStorageClient in packages/storage/src/oci.strategy.ts
- [ ] T008 [P1] [US2] Register OciStorageStrategy in packages/storage/src/index.ts strategy registry
- [ ] T009 [P1] [US2] Add OCI E2E storage test block in packages/storage/test/storage.e2e.test.ts

## Phase 4: User Story 3 (P1) - OCI KMS

- [ ] T010 [P1] [US3] [API] [SECURITY-CRITICAL] Implement OciKmsStrategy using KeyManagement/Crypto clients in packages/kms/src/oci.strategy.ts
- [ ] T011 [P1] [US3] Register OciKmsStrategy in packages/kms/src/index.ts strategy registry
- [ ] T012 [P1] [US3] Add OCI KMS E2E test block in packages/kms/test/kms.e2e.test.ts

## Phase 5: User Story 4 (P1) - OCI Secrets

- [ ] T013 [P1] [US4] [API] [SECURITY-CRITICAL] Implement OciSecretsStrategy using Secrets and Vaults clients in packages/secrets/src/oci.strategy.ts
- [ ] T014 [P1] [US4] Register OciSecretsStrategy in packages/secrets/src/index.ts strategy registry
- [ ] T015 [P1] [US4] Add OCI Secrets E2E test block in packages/secrets/test/secrets.e2e.test.ts

## Phase 6: User Story 5 (P1) - OCI Pub/Sub

- [ ] T016 [P1] [US5] [API] Implement OciPubSubStrategy using QueueClient in packages/pubsub/src/oci.strategy.ts
- [ ] T017 [P1] [US5] Register OciPubSubStrategy in packages/pubsub/src/index.ts strategy registry
- [ ] T018 [P1] [US5] Add OCI Pub/Sub E2E test block in packages/pubsub/test/pubsub.e2e.test.ts

## Phase 7: Polish

- [ ] T019 [P1] Execute sequential vitest run to verify 100% green across all provider strategies (AWS, GCP, Azure, OCI)
- [ ] T020 [P2] Add OCI coverage results section in test-results/2026-07-31.md execution report
