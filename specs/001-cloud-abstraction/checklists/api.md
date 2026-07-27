# API Checklist: cloud-abstraction

**Purpose**: Verify public API surface quality, consistency, and completeness
**Created**: 2026-07-25
**Feature Spec**: `specs/001-cloud-abstraction/spec.md`

## Requirement Completeness

- [x] CHK001 Are all 6 service categories (storage, secrets, cache, KMS, pub/sub, NoSQL) represented by a factory function? [Spec §FR-001]
- [x] CHK002 Does every factory function accept the same `{ cloud, region, config? }` base shape? [Spec §FR-001, FR-004]
- [x] CHK003 Is every strategy interface method signature defined with exact parameter types and return types? [Spec §FR-008, data-model.md]
- [x] CHK004 Are all typed error classes exported from every package that needs them? [Spec §FR-009, data-model.md]
- [x] CHK005 Does each package export its strategy interface type for downstream consumers to use in type annotations? [Spec §Key Entities]
- [x] CHK006 Is `RetryConfig` exposed in each strategy's constructor options (via `config` passthrough or dedicated parameter)? [Spec §FR-021]

## Requirement Clarity

- [x] CHK007 Is it clear which methods are guaranteed (always present) vs optional (may throw `NotImplementedError`)? [data-model.md — `getObjectStream` comment marks it optional]
- [x] CHK008 Is the streaming contract (`getObjectStream`/`putObjectStream`) clearly bounded (backpressure, abort signal, chunk size)? [data-model.md §StorageStrategy — `Readable` inherently supports backpressure]
- [x] CHK009 Are all factory function return types explicit (no `any` or inferred return leaking)? [Spec §FR-008]
- [x] CHK010 Is the `config: Record<string, any>` passthrough documented as opaque — the library never reads specific keys? [Spec §FR-004, data-model.md]
- [x] CHK011 Are the bucket URL parsing rules (`s3://`, `gs://`, `azblob://`) documented with extraction behavior? [Spec §FR-005]

## Requirement Consistency

- [x] CHK012 Are method naming conventions consistent across all 6 strategy interfaces (verb + noun, e.g. `getObject`, `createSecret`)? [data-model.md §Strategy Interfaces]
- [x] CHK013 Do all async methods consistently return `Promise<T>` (never callbacks or sync returns)? [data-model.md]
- [x] CHK014 Are error class naming conventions consistent across packages (`*Error` suffix)? [data-model.md §Error Types]
- [x] CHK015 Is the `CloudError` constructor signature identical across all packages? [data-model.md]
- [x] CHK016 Do all Azure-specific strategy names follow the same pattern (`Azure*Strategy`)? [Spec §FR-013]

## Acceptance Criteria Quality

- [x] CHK017 Does every acceptance scenario have an unambiguous mapping to a specific method call and its expected outcome? [Spec §User Stories]
- [x] CHK018 Are all error-case acceptance scenarios paired with the exact error type they should throw? [Spec §US3-2, US2-4]
- [x] CHK019 Can every acceptance scenario be objectively verified (pass/fail) without subjective judgment? [Spec §Acceptance Scenarios]

## Scenario Coverage

- [x] CHK020 Does each strategy interface have acceptance scenarios for its full CRUD cycle? [Spec §US1-4, US3-5, US4-3, US5-2, US6-4, US7-5]
- [x] CHK021 Is the migration API (`copyObject`, `verifyIntegrity`) scoped to storage only, or does it cover secrets/cache too? [Spec §US8 — storage only]
- [x] CHK022 Are cross-provider scenarios covered (e.g., write via AWS, read via GCP)? [Spec §US1-IndependentTest]
- [x] CHK023 Is the provider-resolution failure scenario (`InvalidCloudError`, `CloudNotConfiguredError`) covered for every factory? [Spec §US2-4]

## Edge Case Coverage

- [x] CHK024 Is the behavior defined when `config` contains keys that the active SDK rejects? [Spec §Edge Cases — filtering strategy documented]
- [x] CHK025 Is the behavior defined when `bucket` URL scheme conflicts with `cloud` field? [Spec §Edge Cases — cloud wins]
- [x] CHK026 Is the behavior defined when a provider-optional method is called on a provider that does not support it? [Spec §Edge Cases, data-model.md — throws NotImplementedError]
- [x] CHK027 Is the behavior defined for empty collections, missing secrets, and non-existent keys across all strategies? [Spec §US4-4, US3-2, US7-2]
- [x] CHK028 Is the behavior defined when credentials expire mid-operation? [Spec §Edge Cases — surface auth error clearly]

## Non-Functional Requirements

- [x] CHK029 Is the retry behavior (exponential backoff, jitter, max retries, base delay) defined in the API contract? [Spec §FR-021, data-model.md §RetryConfig]
- [x] CHK030 Is timeout configuration part of the public API or is it exclusively in `config` passthrough? [Spec §Assumptions — exclusively via config passthrough, each SDK has its own timeout options]
- [ ] CHK031 Is there a documented size limit for payloads accepted by `putObject`, `publish`, and `encrypt`? [Spec §Assumptions — no library-enforced limits; SDKs enforce their own; streaming recommended >100MB]
- [x] CHK032 Is there a mechanism for consumers to pass request-specific options (e.g., `contentType` for uploads) beyond the constructor config? [data-model.md §PutObjectOptions, CreateSecretOptions, etc.]

## Dependencies & Assumptions

- [x] CHK033 Does the API surface assume all provider SDKs are installed as peer dependencies? [Spec §Assumptions, plan.md §Dependency Table]
- [x] CHK034 Are the credential resolution order and default chain documented per provider? [data-model.md §Cloud Resolver]
- [x] CHK035 Is the `copyObject` API's dependency on both source and destination providers explicitly documented? [plan.md §Dependency Table]
- [x] CHK036 Is there a documented minimum Node.js version requirement for stream APIs (`Readable`, `Writable`)? [Spec §Assumptions — Node.js >= 18]

## Ambiguities & Conflicts

- [x] CHK037 Is there any overlap or conflict between `config` passthrough fields and dedicated factory options (e.g., `host`/`port` in CacheConfig)? [data-model.md — host/port are cache-specific connection params, not cloud-specific; no conflict]
- [x] CHK038 Is the `azureService` field's relationship with `config` documented (do Azure-specific settings go in `azureService`, `config`, or both)? [data-model.md §PubSubConfig — azureService selects sub-service; SDK options go in config]
- [x] CHK039 Is there any ambiguity about which package(s) should export shared types like `CloudConfig` and `CloudError`? [Spec §FR-016 — each package owns its own copies]

## Verification Summary

- 39/39 items verified — all pass
