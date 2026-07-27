# API Checklist — Developer Documentation Site

## Requirement Completeness

- [ ] CHK001 Are all 7 public API surfaces documented with exact TypeScript signatures? [Spec §FR-005, FR-006]
- [ ] CHK002 Is every factory function (`createStorage`, `createSecrets`, `createCache`, `createKms`, `createPubSub`, `createNoSql`) documented with its config type? [Spec §US2]
- [ ] CHK003 Is every strategy interface method documented across all packages? [Spec §FR-005]
- [ ] CHK004 Are the `migrate` module's standalone functions (`copyObject`, `verifyIntegrity`) documented separately? [Spec §US4]
- [ ] CHK005 Are cloud-specific config options documented per package (AWS `region`, GCP `projectId`, Azure `vaultUrl`)? [Spec §FR-017]
- [ ] CHK006 Are the return types for every method documented (`PutObjectResult`, `SecretValue`, `EncryptResult`, etc.)? [Spec §FR-005]

## Requirement Clarity

- [ ] CHK007 Is it clear which parameters are required vs optional in each factory function? [Clarity, Spec §US2]
- [ ] CHK008 Is the `config: Record<string, any>` passthrough mechanism explained with examples per cloud? [Clarity, Spec §Key Entities]
- [ ] CHK009 Are the generic type parameters (e.g., `Document` in NoSQL) explained with concrete examples? [Clarity, Spec §US2]
- [ ] CHK010 Is the difference between `cloud` field and `CLOUD_PROVIDER` env var clearly documented? [Clarity, Spec §resolver.ts]
- [ ] CHK011 Are overloaded method signatures (e.g., `encrypt` accepting both string and Buffer) documented? [Clarity, Gap]

## Requirement Consistency

- [ ] CHK012 Do all packages follow the same API pattern (factory → strategy interface → cloud implementations)? [Consistency, Spec §Architecture]
- [ ] CHK013 Are naming conventions consistent across packages (e.g., `putItem` in NoSQL, `putObject` in Storage)? [Consistency]
- [ ] CHK014 Are error types consistently named across packages (`AuthError`, `TimeoutError`, `ValidationError`)? [Consistency, Spec §FR-010]
- [ ] CHK015 Is the retry configuration API consistent across all packages (`maxRetries`, `baseDelayMs`)? [Consistency, Gap]
- [ ] CHK016 Are option bags consistently named (e.g., `CreateKeyOptions`, `DeleteSecretOptions`) across packages? [Consistency]

## Acceptance Criteria Quality

- [ ] CHK017 Can a developer verify the API documentation is correct by comparing against the source TypeScript types? [Measurability, Spec §SC-002]
- [ ] CHK018 Can a developer determine the exact import path for any type or function from the docs? [Measurability, Spec §US2]

## Scenario Coverage

- [ ] CHK019 Does each package page show CRUD examples for all supported clouds via CloudTabs? [Coverage, Spec §FR-012]
- [ ] CHK020 Does the API reference cover the `retry` utility shared across all packages? [Coverage, Gap]
- [ ] CHK021 Are the `@azure/identity` credential types documented for Azure strategies? [Coverage, Spec §Azure]
- [ ] CHK022 Is the `CloudConfig` base type (extended by all package configs) documented once vs duplicated? [Coverage, Spec §Key Entities]
- [ ] CHK023 Are the `peerDependencies` (which SDK to install per cloud) documented per package? [Coverage, Spec §US3]

## Edge Case Coverage

- [ ] CHK024 Is the behavior documented when an optional peer dependency is missing? [Edge Case, Gap]
- [ ] CHK025 Is there documentation on what happens when `CLOUD_PROVIDER` env var conflicts with `config.cloud`? [Edge Case, Spec §resolver.ts]
- [ ] CHK026 Are boundary conditions documented (e.g., max key length in KMS, max secret size in Secrets Manager)? [Edge Case, Gap]
- [ ] CHK027 Is the pagination behavior documented for `listSecrets` and `listObjects`? [Edge Case, Gap]

## Non-Functional Requirements (API)

- [ ] CHK028 Is there guidance on which methods are eventually consistent vs strongly consistent? [Gap]
- [ ] CHK029 Are idempotency guarantees documented for mutation methods? [Gap]
- [ ] CHK030 Is the retry strategy documented with default values and backoff formula? [Gap]
- [ ] CHK031 Are rate-limiting / throttling behaviors documented per cloud? [Gap]

## Dependencies & Assumptions

- [ ] CHK032 Does the API documentation assume knowledge of cloud provider SDKs? [Assumption, Spec §Assumptions]
- [ ] CHK033 Are the optional peer dependencies clearly listed with npm install commands per cloud? [Assumption, Spec §US3]

## Ambiguities & Conflicts

- [ ] CHK034 Could a developer confuse `config` (library-level cloud config) with `config.config` (provider passthrough)? [Ambiguity, Spec §Config]
- [ ] CHK035 Is it clear that the library does NOT wrap provider errors and they may surface as SDK-specific errors? [Ambiguity, Gap]
- [ ] CHK036 Is it clear whether `createCache` with `cloud: 'aws'` uses ElastiCache or the user provides their own Redis URL? [Ambiguity, Spec §Cache]
