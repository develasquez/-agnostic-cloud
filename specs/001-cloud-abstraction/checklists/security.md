# Security Checklist: cloud-abstraction

**Purpose**: Verify security requirements quality across the public API surface
**Created**: 2026-07-25
**Feature Spec**: `specs/001-cloud-abstraction/spec.md`

## Requirement Completeness

- [x] CHK001 Are all credential/secret inputs explicitly prohibited from being hardcoded in application code — they MUST come from env vars, instance metadata, or `config` passthrough? [Constitution §VII, Spec §Assumptions]
- [ ] CHK002 Is there a documented policy for how each strategy handles credentials passed through `config` (e.g., never logged, never serialized)? [Gap — not specified]
- [x] CHK003 Are all factory functions required to validate that `cloud` is one of `'aws' | 'gcp' | 'azure'` before initializing any SDK client? [Spec §FR-002, FR-009]
- [ ] CHK004 Is there a mechanism to prevent accidental credential exposure in error messages or stack traces? [Gap — not specified]
- [x] CHK005 Is input validation (type checks, bounds checks) defined at every public API boundary (factory functions and strategy methods)? [Constitution §VII]

## Requirement Clarity

- [x] CHK006 Is it clear whether `config` values are sanitized/filtered before being passed to the SDK constructor? [Spec §Edge Cases — filtered only if SDK throws on unknown keys]
- [x] CHK007 Is the distinction between "library-managed auth" (default credential chains) and "user-supplied auth" (via `config`) unambiguously documented? [data-model.md §Cloud Resolver]
- [ ] CHK008 Are the minimum permission scopes (IAM roles/policies) that each strategy needs documented for every provider? [Gap — not specified]
- [x] CHK009 Is the encryption context / AAD handling documented as a pass-through map with no library-side validation? [Spec §Edge Cases, data-model.md §EncryptionContext]
- [ ] CHK010 Is it clear which operations touch the network vs are purely local (e.g., validation errors)? [Gap — not specified]

## Requirement Consistency

- [x] CHK011 Is the auth resolution order documented consistently across all 7 packages? [data-model.md §Cloud Resolver]
- [ ] CHK012 Do all strategies consistently refuse to log or expose `config` values in error messages? [Gap — no consistent policy documented]
- [x] CHK013 Is there a consistent approach to handling temporary credentials (session tokens, short-lived keys) across all providers? [Spec §Edge Cases — credentials expiring mid-operation]

## Acceptance Criteria Quality

- [x] CHK014 Is there an acceptance scenario that verifies invalid or malicious input is rejected with a typed error before any SDK call is made? [Spec §US1-5, US2-4]
- [x] CHK015 Is there an acceptance scenario that verifies empty `config` successfully uses default credential chains? [Spec §Edge Cases]
- [ ] CHK016 Is there an acceptance scenario for cross-tenant/cross-account access rejection? [Gap — not specified]

## Scenario Coverage

- [ ] CHK017 Are there scenarios covering credential rotation (mid-session credential refresh)? [Gap — delegated to SDKs, not specified]
- [x] CHK018 Are there scenarios covering revoked permissions (previously valid credentials that lose access)? [Spec §Edge Cases — surface auth error clearly]
- [ ] CHK019 Are there scenarios covering secret value masking (secrets never returned in logs or error messages)? [Gap — not specified]

## Edge Case Coverage

- [x] CHK020 Is the behavior defined when `config` contains sensitive keys that overlap with SDK credential fields (e.g., `accessKeyId` in AWS)? [Spec §Edge Cases — SDK overrides its own defaults]
- [x] CHK021 Is the behavior defined when the environment has multiple credential sources (env vars + instance metadata + config file)? [data-model.md — SDK default chain handles precedence]
- [ ] CHK022 Is there a documented maximum size for `config` values to prevent memory exhaustion? [Gap — not specified]
- [ ] CHK023 Is there a documented approach for handling provider SDK security patches (e.g., via peer dependency minimum versions)? [Gap — not specified]

## Non-Functional Requirements

- [x] CHK024 Is there a requirement for each strategy to support authentication via workload/managed identity (IAM roles, ADC, managed identity) without any explicit credentials in `config`? [Spec §FR-010-FR-012]
- [x] CHK025 Is there a requirement that `config` secrets must NEVER be committed to version control? [Constitution §VII]
- [ ] CHK026 Is there a requirement that the library itself MUST NOT store, cache, or persist credentials beyond the lifetime of the SDK client instance? [Gap — not specified]
- [ ] CHK027 Is TLS/mTLS configuration documented as a passthrough responsibility (user provides it in `config`, library does not enforce)? [Gap — not specified]
- [ ] CHK028 Is there a documented dependency audit process for provider SDK peer dependencies? [Gap — not specified]

## Dependencies & Assumptions

- [x] CHK029 Does the API assume that the environment (env vars, metadata server) is secured by the deployment platform? [Spec §Assumptions]
- [ ] CHK030 Is there a documented assumption that the user is responsible for network-level security (VPCs, private endpoints, firewall rules)? [Gap — not specified]
- [x] CHK031 Is there a documented assumption that provider SDKs handle their own token refreshing and credential rotation? [Spec §Edge Cases]
- [ ] CHK032 Does the `migrate` package have documented security considerations for cross-cloud data transfer (encryption in transit, regional boundaries)? [Gap — not specified]

## Ambiguities & Conflicts

- [x] CHK033 Is there any conflict between "zero code changes for migration" (SC-001) and the need to add cloud-specific `config` values (which ARE code changes)? [Spec §FR-004 — config is opaque; user chooses to hardcode or env-var it]
- [x] CHK034 Is there any ambiguity about whether `config` is a security boundary (library never reads it) or just a convenience (library reserves the right to validate it)? [Spec §FR-004 — library never interprets config fields]
- [x] CHK035 Is there a conflict between "minimal dependencies" (Constitution §III) and delegating all auth to provider SDKs (which carry their own transitive dependencies)? [Spec §Assumptions — provider SDKs are peer deps]

## Verification Summary

- 20/35 items pass (covered by spec/plan/tasks/constitution)
- 15 items are aspirational enhancements not specified in current spec — would require new FRs or implementation-level policies
- Non-blocking for implementation
