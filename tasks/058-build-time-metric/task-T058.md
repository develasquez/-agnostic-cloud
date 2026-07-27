# Task Specification: T058 — Build Time Measurement in CI

**Source**: `tasks.md` — Developer Documentation Site
**Classification**: `[INFRASTRUCTURE]`
**Created**: 2026-07-26

## Operational Classification

| Tag | Applies |
|-----|---------|
| `[DATABASE]` | No |
| `[SECURITY-CRITICAL]` | No |
| `[API]` | No |
| `[MIGRATION]` | No |
| `[UI]` | No |
| `[INFRASTRUCTURE]` | Yes |

## Prerequisites Before Starting

- [ ] Load `constitution.md` and verify this task aligns with all MUST principles
- [ ] Consult decision history in memory store for prior architectural decisions
- [ ] Review T047 (CI workflow) to understand current CI structure

## Dependencies

- **Blocked by**: T047 (CI workflow exists)
- **Blocks**: None

---

## Execution Directives

### Before

1. Read `spec.md` SC-005: "The documentation build completes in under 2 minutes on CI"
2. Review `.github/workflows/docs.yml` to understand current build steps

### During

1. Add build time measurement to the CI workflow:
   - Wrap the `npm run build` step with `time` command or GitHub Action `timeout` + elapsed time capture
   - Add a step that outputs elapsed time: `echo "Build completed in ${elapsed} seconds"`
2. Add a CI check (non-blocking warning) that flags if build exceeds 120 seconds
   - Use `if: steps.build.outcome == 'success'` with a conditional warning
   - Do NOT fail the build — SC-005 is a target, not a hard gate
3. Document baseline build time in the workflow step output
4. Optionally add a badge or log entry for tracking over time

### After

1. Trigger the CI workflow to verify measurement output appears
2. Log baseline build time in a comment on the workflow file

---

## Definition of Done

- [ ] CI workflow outputs build elapsed time in seconds
- [ ] Warning logged if build exceeds 120 seconds (non-blocking)
- [ ] Baseline build time documented
- [ ] Task marked as completed in `tasks.md`
