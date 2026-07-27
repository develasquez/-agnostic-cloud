# Tasks: Developer Documentation Site

**Input**: Design documents from `specs/002-developer-docs/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`

## Phase 1: Setup (Shared Infrastructure) ✓

**Purpose**: Scaffold Docusaurus project and configure tooling

- [x] T001 Initialize Docusaurus 3.x in `docs/` with `npx create-docusaurus@latest docs classic --typescript`
- [x] T002 Configure `docs/docusaurus.config.ts` with title, tagline, url, baseUrl, GitHub Pages config, navbar, footer, search
- [x] T003 [P] Configure `docs/sidebars.ts` with package categories, guides, and reference sections per content-architecture.md
- [x] T004 [P] [API] Install and configure `docusaurus-plugin-typedoc` in `docs/docusaurus.config.ts` pointing to `packages/*/src/index.ts` — see `tasks/002-typedoc-setup/task-T004.md`
- [x] T005 [P] Install and configure `@docusaurus/theme-mermaid` in `docs/docusaurus.config.ts`
- [x] T006 [P] Configure `docs/tsconfig.json` for React/JSX support
- [x] T007 Create `docs/babel.config.js`
- [x] T008 [P] Verify `npm run build` succeeds in `docs/`
- [x] T056 [P] Configure Docusaurus versioning: freeze current as `0.1.0`, set `next` as default (FR-015)

---

## Phase 2: Foundational (Blocking Prerequisites) ✓

**Purpose**: React components and theme customizations needed by all pages

- [x] T009 Create `docs/src/components/CloudTabs.tsx` with AWS/GCP/Azure tabbed code blocks per component-specs.md
- [x] T010 Create `docs/src/components/ArchitectureDiagram.tsx` with Mermaid strategy pattern diagram per component-specs.md
- [x] T011 Create `docs/src/components/PackageGrid.tsx` with 3-column grid of 7 packages per component-specs.md
- [x] T012 Create `docs/src/css/custom.css` with brand colors, typography, and layout overrides
- [x] T013 [P] Create `docs/static/img/logo.svg` and `docs/static/img/favicon.ico`
- [x] T014 [P] Create `docs/static/img/og-image.png` for social sharing

**Checkpoint**: Foundation complete — components render in dev server

---

## Phase 3: User Story 1 — Landing & Architecture Overview (Priority: P1) 🎯 MVP ✓

**Goal**: Developer understands project purpose, architecture, and available packages
**Independent Test**: Visit landing page, read architecture description, see all 7 packages

- [x] T015 [P] [US1] Create `docs/src/pages/index.tsx` with hero section explaining unified cloud abstraction
- [x] T016 [US1] Add ArchitectureDiagram component to landing page
- [x] T017 [US1] Add PackageGrid component to landing page
- [x] T018 [P] [US1] Write landing page content: project description, strategy pattern explanation, supported clouds

**Checkpoint**: Landing page shows hero, architecture diagram, and package grid

---

## Phase 4: User Story 2 — Per-Package API Reference (Priority: P1) ✓

**Goal**: Developer can look up complete API reference for any package
**Independent Test**: Navigate to any package page and see factory function signatures, types, and methods

- [x] T019 [US2] Create `docs/docs/packages/` directory and overview index page
- [x] T020 [P] [US2] [`docusaurus-plugin-typedoc`] Verify TypeDoc generates API pages for all 7 packages in `docs/api/`
- [x] T021 [P] [US2] Create package overview page for `@agnostic-cloud/storage` with factory function, installation, examples, config table
- [x] T022 [P] [US2] Create package overview page for `@agnostic-cloud/secrets` with factory function, installation, examples, config table
- [x] T023 [P] [US2] Create package overview page for `@agnostic-cloud/cache` with factory function, installation, examples, config table
- [x] T024 [P] [US2] Create package overview page for `@agnostic-cloud/kms` with factory function, installation, examples, config table
- [x] T025 [P] [US2] Create package overview page for `@agnostic-cloud/pubsub` with factory function, installation, examples, config table
- [x] T026 [P] [US2] Create package overview page for `@agnostic-cloud/nosql` with factory function, installation, examples, config table
- [x] T027 [P] [US2] Create package overview page for `@agnostic-cloud/migrate` with `copyObject` and `verifyIntegrity` docs
- [x] T028 [US2] Link each overview page to auto-generated TypeDoc API reference

**Checkpoint**: All 7 package pages render with API reference content

---

## Phase 5: User Story 3 — Quickstart & Usage Guides (Priority: P1) ✓

**Goal**: New user has working code in under 5 minutes
**Independent Test**: Follow quickstart, install package, run first example

- [x] T029 [P] [US3] Write `docs/docs/quickstart.md` with installation, first storage operation, and cloud-switching example
- [x] T030 [US3] Add CloudTabs component to quickstart examples for AWS/GCP/Azure
- [x] T031 [US3] Write "Your First Storage Operation" example section with step-by-step instructions
- [x] T032 [P] [US3] Write "Switching Clouds" section showing same code with different `cloud` values

**Checkpoint**: Quickstart guide is complete and verifiable by following steps

---

## Phase 6: User Story 4 — Cross-Cloud Migration & Multi-Service Guide (Priority: P2) ✓

**Goal**: Developer can plan and execute cross-cloud migration and combine multiple services
**Independent Test**: Follow migration guide and run `copyObject` between providers

- [x] T033 [P] [US4] Write `docs/docs/guides/cross-cloud-migration.md` with `copyObject` and `verifyIntegrity` examples
- [x] T034 [US4] Add source/destination provider configuration examples (S3→GCS, GCS→Azure, etc.)
- [x] T035 [US4] Add integrity verification section with checksum examples
- [x] T036 [P] [US4] Write `docs/docs/guides/multi-service-patterns.md` with example combining storage, secrets, and nosql across clouds

**Checkpoint**: Migration and multi-service guides are complete

---

## Phase 7: User Story 5 — Local Development & Emulators Guide (Priority: P2) ✓

**Goal**: Developer can run all e2e tests locally without cloud costs
**Independent Test**: Start docker-compose and run any e2e test

- [x] T037 [P] [US5] Write `docs/docs/guides/local-emulators.md` with docker-compose setup instructions
- [x] T038 [US5] Create environment variables table mapping each emulator service to its required env vars
- [x] T039 [US5] Add troubleshooting section for common emulator issues (port conflicts, SSL certs, etc.)
- [x] T040 [US5] Add per-package e2e test commands referencing the emulator guide

**Checkpoint**: Emulators guide is complete

---

## Phase 8: User Story 6 — LLM-Optimized Context (Priority: P2) ✓

**Goal**: LLM can generate correct `@agnostic-cloud` code without hallucination
**Independent Test**: LLM given the reference can produce syntactically correct `create*` calls

- [x] T041 [P] [US6] Write `docs/docs/llm-reference.md` with compact API surface per content-architecture.md
- [x] T042 [P] Write `docs/docs/errors.md` with full error hierarchy diagram and per-package error tables (FR-010)
- [x] T043 [US6] Add cross-package migration hints and common patterns section
- [x] T057 [P] [US6] Create `scripts/verify-llm-reference.ts` that parses TypeDoc JSON output and verifies LLM reference contains all factory signatures, config shapes, and error types (SC-004)

**Checkpoint**: LLM Reference and Error Reference pages render

---

## Phase 9: User Story 7 — Search & Navigation (Priority: P3) ✓

**Goal**: Developer can search and navigate documentation efficiently
**Independent Test**: Type a query in search bar and find relevant results

- [x] T044 [P] [US7] Configure Docusaurus built-in search (local plugin) with full-text indexing
- [x] T045 [US7] Verify sidebar navigation follows content-architecture.md hierarchy
- [x] T046 [P] [US7] Apply for Algolia DocSearch program (open source tier) and add `algolia` section to `docusaurus.config.ts`
- [x] T060 [P] [US7] Configure Docusaurus local search as default with Algolia as enhancement — no breakage if Algolia unavailable (FR-016 fallback)

**Checkpoint**: Search returns results; sidebar navigation is complete

---

## Phase 10: User Story 8 — Deployment & CI (Priority: P3) ✓

**Goal**: Documentation auto-deploys to GitHub Pages on push to main
**Independent Test**: Push a change to docs/ → site updates automatically

- [x] T047 Create `.github/workflows/docs.yml` with build-on-PR and build+deploy-on-main triggers
- [x] T048 [P] [US8] Configure GitHub Pages source to `gh-pages` branch in repo settings
- [ ] T049 [US8] Verify first deployment with `npm run build` + manual deploy
- [ ] T050 [US8] Verify subsequent deployments via GitHub Actions

**Checkpoint**: Site is live at `https://agnostic-cloud.github.io/agnostic-layer/`

---

## Phase 11: Polish & Cross-Cutting Concerns ✓

- [ ] T051 [P] Run Lighthouse audit and fix accessibility issues (target SCORE >= 90) (SC-003)
- [x] T052 [P] Add SEO frontmatter (description, og:image, keywords) to all pages
- [x] T053 [P] Configure `@docusaurus/plugin-sitemap` for search engine indexing
- [x] T054 [P] Verify all internal and external links resolve correctly
- [x] T055 [P] Create `docs/README.md` with dev instructions for contributors
- [x] T058 [P] Add build-time measurement to CI and verify build completes in under 2 minutes (SC-005)
- [x] T059 [P] Add search latency check to verify results return within 1 second (SC-006)
