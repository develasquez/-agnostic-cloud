# Performance Checklist: cloud-abstraction

**Purpose**: Verify performance-related requirements quality across the public API surface
**Created**: 2026-07-25
**Feature Spec**: `specs/001-cloud-abstraction/spec.md`

## Requirement Completeness

- [x] CHK001 Is there a documented maximum gzipped size per package (50KB)? [Spec §SC-005 — library code only, excludes peer deps]
- [ ] CHK002 Are there latency budgets defined for each strategy method (e.g., p95 `getObject` < 500ms under normal conditions)? [Gap — not specified]
- [x] CHK003 Is the streaming interface required to support backpressure when consuming large objects? [data-model.md §StorageStrategy — `Readable` inherently supports backpressure]
- [ ] CHK004 Is there a documented concurrency model (max concurrent connections, connection pooling per provider SDK)? [Gap — not specified]
- [ ] CHK005 Is cold-start latency (first factory call after module load) documented or bounded? [Gap — not specified]
- [ ] CHK006 Is the memory overhead of holding multiple strategy instances (e.g., storage + secrets) documented? [Gap — not specified]

## Requirement Clarity

- [x] CHK007 Is "90% test coverage" (SC-004) scoped to lines, branches, or public API methods? [Spec §SC-004 — branch coverage on public API surface]
- [x] CHK008 Is the retry backoff formula (`baseDelayMs * 2^attempt + jitter`) precisely specified, or is it implementation-defined? [Spec §FR-021 — strategy implementation detail]
- [x] CHK009 Is it clear whether `listObjects` pagination is lazy (async iterator) or eager (fetches all pages)? [data-model.md §ListObjectsResult — `isTruncated` + `nextContinuationToken` for manual pagination]
- [ ] CHK010 Is the serialization cost of `config: Record<string, any>` (JSON parse on every factory call) documented as a trade-off? [Gap — not specified]

## Requirement Consistency

- [x] CHK011 Does every async method consistently use the same timeout/retry policy, or is it per-strategy? [Spec §FR-021 — RetryConfig per strategy, timeout via config passthrough per SDK]
- [ ] CHK012 Are the overhead characteristics (lazy SDK client init vs eager) documented consistently across all packages? [Gap — not specified]
- [ ] CHK013 Is the approach to handling rate limits (SDK built-in vs library-implemented) consistent across all 3 providers? [Gap — not specified]

## Acceptance Criteria Quality

- [ ] CHK014 Is there a measurable acceptance criterion for `listObjects` with large prefixes (e.g., 10K objects under one prefix)? [Gap — not specified]
- [ ] CHK015 Is there a performance acceptance criterion for concurrent operations (e.g., 10 concurrent `putObject` calls)? [Gap — not specified]
- [ ] CHK016 Is there an acceptance criterion for streaming throughput (e.g., 100MB download in < 30s over localhost)? [Gap — not specified]

## Scenario Coverage

- [ ] CHK017 Are there scenarios covering large payloads (> 100MB) for `putObject` and `getObject`? [Gap — not specified]
- [ ] CHK018 Are there scenarios covering high-frequency `existsObject` calls (e.g., 1000/s) and their throttling behavior? [Gap — not specified]
- [ ] CHK019 Are there scenarios covering memory usage when listing very large buckets (> 1M objects)? [Gap — not specified]
- [ ] CHK020 Are there scenarios covering concurrent factory instantiation (multiple `createStorage` calls in parallel)? [Gap — not specified]

## Edge Case Coverage

- [ ] CHK021 Is there a documented behavior when `config` contains values that cause SDK constructor performance degradation (e.g., very large `endpoint` strings)? [Gap — not specified]
- [x] CHK022 Is there a documented behavior for network partitions during streaming operations (partial reads)? [Spec §Edge Cases — retry for transient failures]
- [ ] CHK023 Is there a documented maximum number of concurrent `subscribe` handlers per process? [Gap — not specified]
- [ ] CHK024 Is there a documented behavior when provider SDK connection pools are exhausted? [Gap — not specified]

## Non-Functional Requirements

- [x] CHK025 Is there a tree-shaking requirement — unused strategy implementations must not bloat the bundle? [Spec §FR-016 — independent packages, but each package bundles all 3 strategies]
- [x] CHK026 Is there a documented limit on the number of provider SDK peer dependencies a single consumer must install (6 packages × up to 3 SDKs each)? [plan.md §Dependency Table]
- [ ] CHK027 Is there a binary size budget for individual strategy implementations (not just the whole package)? [Gap — not specified]
- [ ] CHK028 Is lazy SDK client instantiation required (SDK is not initialized until the first method call)? [Gap — not specified]
- [x] CHK029 Is there a documented maximum execution time for the `resolveCloud` function (should be O(1) — no network calls in resolver)? [data-model.md — resolver is sync, reads only `cloud` field or env var]

## Dependencies & Assumptions

- [ ] CHK030 Does the library assume that provider SDKs have acceptable cold-start performance for serverless environments? [Gap — not specified]
- [ ] CHK031 Is there a documented assumption that users will use provider-specific performance tuning (e.g., S3 Transfer Acceleration) via `config` rather than expecting the library to abstract it? [Gap — not specified]
- [ ] CHK032 Is there a documented assumption that `config` passthrough does not add measurable overhead compared to direct SDK usage? [Gap — not specified]

## Ambiguities & Conflicts

- [x] CHK033 Is there a conflict between "minimal dependencies" (Constitution §III) and the desire to add retry with exponential backoff (FR-021) — should this be a dedicated dependency or inline implementation? [Spec §FR-021 — inline within each strategy]
- [x] CHK034 Is there a conflict between the 50KB package size limit (SC-005) and bundling 3 SDK integrations per package (AWS + GCP + Azure SDKs are typically > 50KB each)? [Spec §SC-005 — clarified as library code only, excluding peer deps]
- [x] CHK035 Is there a conflict between "zero code changes for migration" (SC-001) and the need to swap `config` values that affect performance behavior (e.g., different timeouts per cloud)? [Spec §FR-004 — `config` is env-var-driven, so migration changes env vars, not code]

## Verification Summary

- 13/35 items pass (covered by spec/plan/tasks)
- 22 items are aspirational enhancements not specified in current spec — would require new FRs
- Non-blocking for implementation
