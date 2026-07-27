# Tasks: cloud-abstraction

**Feature**: `001-cloud-abstraction`
**Generated**: 2026-07-24

---

## Phase 1: Setup

- [x] T001 Create root monorepo scaffolding (root package.json with workspaces, tsconfig.base.json strict, .gitignore, .changeset config)
- [x] T002 [P] Initialize 7 packages under packages/* with package.json, tsconfig.json, tsup build config (CJS + ESM dual output per package)
- [x] T003 Configure docker-compose.yml with all provider emulators (minio, fake-gcs-server, azurite, redis, gcloud pubsub emulator, dynamodb-local, firestore emulator, cosmos emulator)
- [x] T004 Install dev tooling across monorepo (vitest, eslint, typescript, changesets)

---

## Phase 2: Foundational (per-package scaffolding)

- [x] T005 Research SDK contracts: inspect Boto3 (Python) APIs for S3, Secrets Manager, KMS, SNS, SQS, DynamoDB to extract idiomatic interface patterns (skipped — SDK contracts will be researched per-strategy during implementation)
- [x] T006 [P] Create package scaffolds: storage, secrets, cache, kms, pubsub, nosql, migrate (each with package.json, tsconfig.json, src/index.ts, test/)
- [x] T007 [P] Each package implements its own:
  - `config.ts` — `CloudConfig` base type (with `config: Record<string, any>` passthrough) + service-specific extends
  - `errors.ts` — `CloudError` hierarchy (CloudNotConfiguredError, InvalidCloudError, etc.)
  - `resolver.ts` — reads `cloud` field or falls back to `CLOUD_PROVIDER` env var

---

## Phase 3: User Story 1 — Object Storage (P1)

- [x] T008 [US1] [API] Research AWS S3 SDK v3 contracts: install @aws-sdk/client-s3, extract exact method signatures for PutObjectCommand, GetObjectCommand, ListObjectsV2Command, DeleteObjectCommand, HeadObjectCommand
- [x] T009 [US1] [API] Research GCP Cloud Storage SDK contracts: install @google-cloud/storage, extract exact method signatures for bucket.upload, bucket.file, file.download, file.delete, getFiles
- [x] T010 [US1] [API] Research Azure Blob Storage SDK contracts: install @azure/storage-blob, extract exact method signatures for BlockBlobClient.upload, .download, .delete, ContainerClient.listBlobsFlat
- [x] T011 [US1] Design common StorageStrategy interface in packages/storage/src/interface.ts based on cross-SDK analysis
- [x] T012 [P] [US1] Implement S3StorageStrategy in packages/storage/src/s3.strategy.ts
- [x] T013 [P] [US1] Implement GcsStorageStrategy in packages/storage/src/gcs.strategy.ts
- [x] T014 [P] [US1] Implement AzureBlobStorageStrategy in packages/storage/src/azure-blob.strategy.ts
- [x] T015 [US1] Integration test: storage CRUD cycle across all 3 providers using emulators in packages/storage/test/storage.e2e.test.ts

---

## Phase 4: User Story 2 — Consistent Cloud Config (P1)

- [x] T016 [US2] Implement CloudConfig type and resolver in packages/storage/src/config.ts
- [x] T017 [US2] Apply same CloudConfig pattern to all other packages (secrets, cache, kms, pubsub, nosql)
- [x] T018 [US2] Unit test: cloud resolution for all 3 providers + invalid + missing in each package

---

## Phase 5: User Story 3 — Secrets Management (P2)

- [x] T019 [US3] [API] Research AWS Secrets Manager SDK contracts: install @aws-sdk/client-secrets-manager, extract GetSecretValueCommand, CreateSecretCommand, UpdateSecretCommand, DeleteSecretCommand, ListSecretsCommand
- [x] T020 [US3] [API] Research GCP Secret Manager SDK contracts: install @google-cloud/secret-manager, extract accessSecretVersion, addSecretVersion, createSecret, deleteSecret, listSecrets
- [x] T021 [US3] [API] Research Azure Key Vault Secrets SDK contracts: install @azure/keyvault-secrets, extract getSecret, setSecret, updateSecretProperties, beginDeleteSecret, listPropertiesOfSecrets
- [x] T022 [US3] Design common SecretsStrategy interface in packages/secrets/src/interface.ts
- [x] T023 [P] [US3] Implement AwsSecretsStrategy in packages/secrets/src/aws.strategy.ts
- [x] T024 [P] [US3] Implement GcpSecretsStrategy in packages/secrets/src/gcp.strategy.ts
- [x] T025 [P] [US3] Implement AzureSecretsStrategy in packages/secrets/src/azure.strategy.ts
- [x] T026 [US3] Integration test: secrets CRUD cycle across all 3 providers in packages/secrets/test/secrets.e2e.test.ts

---

## Phase 6: User Story 4 — Cache / Redis (P2)

- [x] T027 [US4] Research ioredis contracts: install ioredis, extract get/set/del/exists signatures (all 3 cloud Redis services use Redis protocol)
- [x] T028 [US4] Design common CacheStrategy interface in packages/cache/src/interface.ts
- [x] T029 [US4] Implement RedisCacheStrategy in packages/cache/src/redis.strategy.ts (single implementation for all 3 clouds)
- [x] T030 [US4] Integration test: cache get/set/delete/exists in packages/cache/test/cache.e2e.test.ts

---

## Phase 7: User Story 5 — Pub/Sub (P3)

- [x] T031 [US5] [API] Research AWS SNS + SQS SDK contracts: install @aws-sdk/client-sns and @aws-sdk/client-sqs, extract PublishCommand, ReceiveMessageCommand, DeleteMessageCommand
- [x] T032 [US5] [API] Research GCP Pub/Sub SDK contracts: install @google-cloud/pubsub, extract topic.publishMessage, subscription.on('message'), subscription.ack
- [x] T033 [US5] [API] Research Azure Service Bus SDK contracts: install @azure/service-bus, extract ServiceBusClient, sender.sendMessages, receiver.subscribe, receiver.completeMessage
- [x] T034 [US5] Design common PubSubStrategy interface in packages/pubsub/src/interface.ts
- [x] T035 [P] [US5] Implement SnsStrategy (publish via SNS, subscribe via SQS) in packages/pubsub/src/sns.strategy.ts
- [x] T036 [P] [US5] Implement GcpPubSubStrategy in packages/pubsub/src/gcp.strategy.ts
- [x] T037 [P] [US5] Implement AzureServiceBusStrategy in packages/pubsub/src/azure.strategy.ts
- [x] T038 [US5] Integration test: pub/sub publish-consume cycle in packages/pubsub/test/pubsub.e2e.test.ts

---

## Phase 8: User Story 6 — Key Management / KMS (P4)

- [ ] T044 [US6] [API] Research AWS KMS SDK contracts: install @aws-sdk/client-kms, extract EncryptCommand, DecryptCommand, CreateKeyCommand, ScheduleKeyDeletionCommand
- [x] T044 [US6] [API] Research AWS KMS SDK contracts: install @aws-sdk/client-kms, extract encrypt, decrypt, createKey, scheduleKeyDeletion
- [x] T045 [US6] [API] Research GCP Cloud KMS SDK contracts: install @google-cloud/kms, extract encrypt, decrypt, createCryptoKey, destroyCryptoKeyVersion
- [x] T046 [US6] [API] Research Azure Key Vault Keys SDK contracts: install @azure/keyvault-keys, extract encrypt, decrypt, createKey, beginDeleteKey, getKey
- [x] T047 [US6] Design common KmsStrategy interface in packages/kms/src/interface.ts
- [x] T048 [P] [US6] Implement AwsKmsStrategy in packages/kms/src/aws.strategy.ts
- [x] T049 [P] [US6] Implement GcpKmsStrategy in packages/kms/src/gcp.strategy.ts
- [x] T050 [P] [US6] Implement AzureKmsStrategy in packages/kms/src/azure.strategy.ts
- [x] T051 [US6] Integration test: encrypt/decrypt cycle in packages/kms/test/kms.e2e.test.ts

---

## Phase 9: User Story 7 — NoSQL Database (P4)

- [x] T052 [US7] [API] Research AWS DynamoDB SDK contracts: install @aws-sdk/client-dynamodb, extract PutItemCommand, GetItemCommand, UpdateItemCommand, DeleteItemCommand, QueryCommand
- [x] T053 [US7] [API] Research GCP Firestore SDK contracts: install @google-cloud/firestore, extract doc.set, doc.get, doc.update, doc.delete, collection.where.get
- [x] T054 [US7] [API] Research Azure Cosmos DB SDK contracts: install @azure/cosmos, extract container.items.create, .read, .upsert, .delete, .query
- [x] T055 [US7] Design common NoSqlStrategy interface in packages/nosql/src/interface.ts
- [x] T056 [P] [US7] Implement DynamoDbStrategy in packages/nosql/src/dynamodb.strategy.ts
- [x] T057 [P] [US7] Implement FirestoreStrategy in packages/nosql/src/firestore.strategy.ts
- [x] T058 [P] [US7] Implement CosmosDbStrategy in packages/nosql/src/cosmos.strategy.ts
- [x] T059 [US7] Integration test: NoSQL CRUD + query across providers in packages/nosql/test/nosql.e2e.test.ts

---

## Phase 10: User Story 8 — Migration Utilities (P5)

- [x] T060 Create @agnostic-cloud/migrate package scaffold in packages/migrate/
- [x] T061 [US8] Implement copyObject(sourceConfig, sourceUrl, destConfig, destUrl) in packages/migrate/src/copy.ts
- [x] T062 [US8] Implement verifyIntegrity(config, url, expectedChecksum) in packages/migrate/src/verify.ts

---
## Phase 11: Cross-Cutting Concerns

- [x] T068 [P] Implement RetryConfig across all strategy implementations (storage, secrets, cache, kms, pubsub, nosql). Each strategy constructor reads `maxRetries` (default 3) and `baseDelayMs` (default 100) from `config` and applies exponential backoff with jitter on transient failures.

---

## Phase 12: Polish

- [x] T063 Configure vitest coverage thresholds (90%+ branch coverage on all exported API surface) in each package
- [x] T064 Configure size-limit (50KB gzipped per package — library code only, excluding peer dependencies) in each package
- [x] T065 Write root README with per-package quickstart examples
- [x] T066 Configure changesets for automated versioning and changelog generation
- [x] T067 Final review: run tsc --noEmit on strict mode across all 7 packages, verify zero errors
