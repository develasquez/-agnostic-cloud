# agnostic-layer Constitution

## Core Principles

### I. Executable Specifications First (NON-NEGOTIABLE)
All features MUST start with a clear, unambiguous specification in `specs/`. Code serves specifications; specifications are the single source of truth.

### II. Library-First API Design
This is an npm library consumed by other projects. The public API surface MUST be explicitly designed, minimal, and stable. Breaking changes MUST be justified and versioned via semver.

### III. Minimal Dependencies
Do not add runtime dependencies unless they provide significant value. Prefer implementing lightweight utilities over pulling in external packages. Keep the dependency tree shallow.

### IV. TypeScript Strictness
All code MUST be written in TypeScript with strict mode enabled. Public API types MUST be explicitly exported and documented.

### V. Test-Driven & Modular Architecture
Modules MUST be self-contained and independently testable. High coupling between unrelated modules is prohibited. Tests MUST cover the public API surface.

### VI. Observability & Error Handling
All failure modes MUST be explicitly handled. Throw typed errors with clear messages. Silent failures are prohibited.

### VII. Security & Privacy
No plain text secrets in code or configuration repositories. Validate and sanitize all inputs at library boundaries.

## Governance

- This Constitution supersedes arbitrary design preferences.
- Any violation in `plan.md` MUST be explicitly justified.
- Amendments require updating this document and re-evaluating active implementation plans.

**Version**: 1.0.0 | **Ratified**: 2026-07-24
