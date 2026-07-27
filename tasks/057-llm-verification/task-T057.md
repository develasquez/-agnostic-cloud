# Task Specification: T057 — LLM Reference Verification Script

**Source**: `tasks.md` — Developer Documentation Site
**Classification**: `[API]`
**Created**: 2026-07-26

## Operational Classification

| Tag | Applies |
|-----|---------|
| `[DATABASE]` | No |
| `[SECURITY-CRITICAL]` | No |
| `[API]` | Yes |
| `[MIGRATION]` | No |
| `[UI]` | No |
| `[INFRASTRUCTURE]` | No |

## Prerequisites Before Starting

- [ ] Load `constitution.md` and verify this task aligns with all MUST principles
- [ ] Consult decision history in memory store for prior architectural decisions
- [ ] Search codebase for reference patterns relevant to this task
- [ ] Review related task specs

## Dependencies

- **Blocked by**: T004 (TypeDoc configured), T020 (TypeDoc generates API pages for all 7 packages), T041 (LLM reference page content written)
- **Blocks**: None

---

## Execution Directives

### Before

1. Read `specs/constitution.md` and confirm no principle violation
2. Confirm TypeDoc JSON output is produced during build (check `docs/typedoc.json` or similar)
3. Verify LLM reference page structure from `contracts/content-architecture.md`

### During

1. Create `scripts/verify-llm-reference.ts` at repo root (or `docs/scripts/`)
2. The script MUST:
   - Read TypeDoc JSON output after `npx typedoc` or `npm run build` in docs/
   - Parse all exported symbols (factory functions, interfaces, types, error classes)
   - Compare against a hardcoded manifest of expected symbols per package:
     - `@agnostic-cloud/storage`: `createStorage`, `StorageStrategy`, `StorageConfig`, `PutObjectResult`, `GetObjectResult`, `ListObjectsResult`, `ObjectNotFoundError`, `AuthError`, `TimeoutError`
     - `@agnostic-cloud/secrets`: `createSecrets`, `SecretsStrategy`, `SecretsConfig`, `SecretValue`, `SecretMetadata`, `ListSecretsResult`, `SecretNotFoundError`, `AuthError`
     - `@agnostic-cloud/cache`: `createCache`, `CacheStrategy`, `CacheConfig`
     - `@agnostic-cloud/kms`: `createKms`, `KmsStrategy`, `KmsConfig`, `EncryptResult`, `DecryptResult`, `KeyMetadata`
     - `@agnostic-cloud/pubsub`: `createPubSub`, `PubSubStrategy`, `PubSubConfig`, `PublishResult`, `Subscription`
     - `@agnostic-cloud/nosql`: `createNoSql`, `NoSqlStrategy`, `NoSqlConfig`, `Document`, `QueryResult`
     - `@agnostic-cloud/migrate`: `copyObject`, `verifyIntegrity`, `CopyResult`
   - Report missing symbols with exit code 1; report all-found with exit code 0
3. Add npm script in `docs/package.json`: `"verify-llm": "ts-node ../scripts/verify-llm-reference.ts"`
4. Verify the script passes when TypeDoc output is fresh; fails if symbols are removed

### After

1. Run the verification script against current build
2. Log any architectural decisions

---

## Definition of Done

- [ ] Script reads TypeDoc JSON and validates expected symbols
- [ ] Exit code 0 on success, 1 with error messages on mismatch
- [ ] npm script registered in `docs/package.json`
- [ ] Script passes against current TypeDoc output
- [ ] Task marked as completed in `tasks.md`
