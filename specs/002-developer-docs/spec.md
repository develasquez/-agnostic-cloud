# Feature Specification: Developer Documentation Site

**Feature Branch**: `002-developer-docs`
**Created**: 2026-07-26
**Status**: Draft
**Input**: User description: "Create comprehensive documentation for the agnostic-layer monorepo of 7 npm packages under @agnostic-cloud using Docusaurus, hosted on GitHub Pages, to give tranquility, confidence and guidance to developers and LLMs implementing these libraries."

## User Scenarios & Testing

### User Story 1 - Landing & Architecture Overview (Priority: P1)

As a developer evaluating `@agnostic-cloud`, I want to land on a documentation site that explains the project's purpose, architecture, and strategy pattern so that I can quickly decide if it fits my use case.

**Why this priority**: P1 — Without understanding what the project is and its architecture, no developer can use it.

**Independent Test**: A developer reading the landing page can answer: "What problem does this solve? How does the strategy pattern work? What clouds are supported?"

**Acceptance Scenarios**:

1. **Given** a developer visits the docs homepage, **When** they read the hero section, **Then** they understand it's a unified cloud abstraction layer for AWS, GCP, and Azure.
2. **Given** the architecture section, **When** they read it, **Then** they understand the Strategy pattern, the factory function pattern (`createStorage`, `createSecrets`, etc.), and how `config.cloud` selects the provider.
3. **Given** the package overview, **When** they scan the 7 packages, **Then** they see each package's name, description, and supported clouds.

---

### User Story 2 - Per-Package API Reference (Priority: P1)

As a developer integrating a specific service (e.g., storage), I want a complete API reference for that package with types, interfaces, and factory functions so that I can use it correctly without reading source code.

**Why this priority**: P1 — The API reference is the primary developer touchpoint.

**Independent Test**: A developer can look up a specific function signature and know the exact parameters and return types.

**Acceptance Scenarios**:

1. **Given** the `@agnostic-cloud/storage` API page, **When** a developer reads it, **Then** they see `createStorage(config: StorageConfig): StorageStrategy` with full parameter descriptions.
2. **Given** any interface page (e.g., `StorageStrategy`), **When** a developer reads it, **Then** they see all methods with signatures, return types, and descriptions.
3. **Given** any type page (e.g., `StorageConfig`), **When** a developer reads it, **Then** they see all fields with types and whether they are required or optional.
4. **Given** the error types page, **When** a developer reads it, **Then** they see the full error hierarchy (`CloudError` → `ObjectNotFoundError`, `AuthError`, etc.).

---

### User Story 3 - Quickstart & Usage Guides (Priority: P1)

As a new user, I want step-by-step guides for installation and basic usage so that I can have my first working example in under 5 minutes.

**Why this priority**: P1 — First-run experience determines adoption.

**Independent Test**: A developer can follow the quickstart and successfully run a cross-cloud example.

**Acceptance Scenarios**:

1. **Given** the Quickstart guide, **When** a developer follows the installation steps, **Then** they can `npm install @agnostic-cloud/storage` and import it.
2. **Given** the "Your First Storage Operation" guide, **When** they follow it, **Then** they can upload and download an object from S3, GCS, or Azure Blob.
3. **Given** the "Switching Clouds" example, **When** they change `cloud: 'aws'` to `cloud: 'gcp'`, **Then** the same code works with GCS.

---

### User Story 4 - Cross-Cloud Migration Guide (Priority: P2)

As a developer planning a cloud migration, I want a guide showing how to use `@agnostic-cloud/migrate` to copy data between providers so that I can plan my migration strategy.

**Why this priority**: P2 — Migration is a key differentiator but not needed for initial adoption.

**Independent Test**: A developer can follow the guide and migrate an object from S3 to GCS.

**Acceptance Scenarios**:

1. **Given** the Migration guide, **When** a developer reads it, **Then** they see how to configure source and destination providers.
2. **Given** the `copyObject` example, **When** executed, **Then** an object moves from one provider to another.
3. **Given** the `verifyIntegrity` example, **When** executed, **Then** the copied object's checksum matches the original.

---

### User Story 5 - Local Development & Emulators Guide (Priority: P2)

As a developer who wants to test locally without cloud costs, I want a guide on running the Docker Compose emulators and configuring each package for local development.

**Why this priority**: P2 — Important for development velocity but can use real clouds initially.

**Independent Test**: A developer can start the emulators and run all e2e tests locally.

**Acceptance Scenarios**:

1. **Given** the Emulators guide, **When** a developer runs `docker compose up -d`, **Then** all 12+ emulator services start.
2. **Given** the environment variables table, **When** a developer configures them, **Then** each package's e2e tests pass.
3. **Given** the troubleshooting section, **When** a developer encounters a common issue, **Then** they find a solution.

---

### User Story 6 - LLM-Optimized Context (Priority: P2)

As an LLM (or developer using an LLM coding assistant), I want a condensed, structured reference of the entire API surface so that the LLM can generate correct code without hallucinating APIs.

**Why this priority**: P2 — LLM guidance is a key differentiator that sets this documentation apart.

**Independent Test**: An LLM given the LLM reference page can generate syntactically correct calls to any strategy function.

**Acceptance Scenarios**:

1. **Given** the "LLM Reference" page, **When** an LLM reads it, **Then** it contains the complete config schema, factory function signatures, and return types in a compact format.
2. **Given** the LLM reference, **When** an LLM needs to generate a `createSecrets` call, **Then** it can determine the correct config shape for each cloud.
3. **Given** the LLM reference, **When** an LLM needs error handling, **Then** it knows the full error hierarchy and which errors to catch.

---

### User Story 7 - Search & Navigation (Priority: P3)

As a developer, I want full-text search across all documentation so that I can find relevant information quickly.

**Why this priority**: P3 — Search is a productivity feature; all content is still accessible via navigation.

**Independent Test**: A developer can type a query and find relevant results across packages.

**Acceptance Scenarios**:

1. **Given** the search bar, **When** a developer types "createStorage", **Then** they see results from the storage package API page and the quickstart guide.
2. **Given** the sidebar navigation, **When** a developer browses, **Then** they can navigate by package, by guide type, and by cloud provider.

---

### User Story 8 - Deployment & CI (Priority: P3)

As a maintainer, I want the documentation site to be automatically built and deployed to GitHub Pages on every push to `main` so that docs are always up to date.

**Why this priority**: P3 — The site can be deployed manually until CI is set up.

**Independent Test**: A maintainer pushes a change to the docs, and within minutes the live site reflects the change.

**Acceptance Scenarios**:

1. **Given** a GitHub Actions workflow, **When** code is pushed to `main`, **Then** the Docusaurus site builds and deploys to GitHub Pages.
2. **Given** a PR workflow, **When** a PR modifies docs, **Then** the build preview runs without deploying.

---

## Requirements

### Functional Requirements

- **FR-001**: The site MUST be built with Docusaurus ^3.6.
- **FR-002**: The site MUST be deployable to GitHub Pages.
- **FR-003**: The site MUST have a sidebar organized by package (`@agnostic-cloud/storage`, `secrets`, `cache`, `kms`, `pubsub`, `nosql`, `migrate`).
- **FR-004**: The site MUST include a landing page with project overview, architecture diagram, and package summary.
- **FR-005**: Each package MUST have a dedicated section with: Overview, API Reference, Usage Examples, and Configuration. Each API page MUST show the TypeScript signature, description, example, and cloud-specific notes.
- **FR-006**: The API Reference MUST be auto-generated from TypeScript source using TypeDoc or similar.
- **FR-007**: The site MUST include a Quickstart guide covering installation and first example.
- **FR-008**: The site MUST include a Guides section with: Cross-Cloud Migration, Emulators & Local Dev, and Multi-Service Patterns (covering storage + secrets + nosql composition).
- **FR-009**: The site MUST include an "LLM Reference" page with compact API surface for AI coding assistants.
- **FR-010**: The site MUST include an Error Reference page showing the full error hierarchy.
- **FR-011**: The site MUST support full-text search.
- **FR-012**: The site MUST have code examples with syntax highlighting, CloudTabs (AWS/GCP/Azure), and copy button for each service category. No browser execution required.
- **FR-013**: The doc source files MUST live in a `docs/` directory at the repository root.
- **FR-014**: The GitHub Actions workflow MUST build and deploy on push to `main` and build-only on PRs.
- **FR-015**: The site MUST include Docusaurus versioning from day one. Initial version `0.1.0`; `current` tracks `main`. Each npm release freezes a snapshot.
- **FR-016**: The site configuration MUST include Algolia DocSearch configuration for open-source indexing.

### Key Entities

- **Package**: One of the 7 npm packages under `@agnostic-cloud`. Each has a name, description, supported clouds, factory function, strategy interface, config type, and error types.
- **Strategy Interface**: The contract that each cloud-specific strategy implements (e.g., `StorageStrategy`, `SecretsStrategy`).
- **Factory Function**: The entry point for each package (e.g., `createStorage(config)`, `createSecrets(config)`).
- **Cloud Config**: The `{ cloud, region, config }` shape passed to factory functions.
- **Emulator**: A local service (Docker container) that mimics a cloud provider for testing.

## Success Criteria

### Measurable Outcomes

- **SC-001**: A new developer can go from landing page to working code example in under 5 minutes.
- **SC-002**: All 7 packages have complete API reference with signatures, descriptions, and examples.
- **SC-003**: The site passes Lighthouse 12 (desktop) accessibility audit with score >= 90.
- **SC-004**: LLM Reference page contains all factory signatures, config shapes, and error types — verified by automated script that parses TypeDoc JSON output.
- **SC-005**: The documentation build completes in under 2 minutes on CI.
- **SC-006**: Search results return relevant matches within 1 second.

## Clarifications

### Session 2026-07-26

- **Q1: Versioning strategy** → A: Docusaurus versioning desde el día 1. Versión inicial `0.1.0`. Cuando se publique una release nueva, se congela la snapshot actual como `0.1.0` y `current` apunta al desarrollo de la siguiente versión.
- **Q2: Interactive examples (FR-012)** → A: Bloques de código con syntax highlighting + pestañas CloudTabs (AWS/GCP/Azure) + botón "Copy". Sin ejecución en navegador.
- **Q3: docs/ package.json** → A: `docs/` con su propio `package.json` separado del workspace raíz. No es workspace member. Evita conflictos de dependencias React/Docusaurus con el monorepo.

## Assumptions

- The documentation site is a separate Docusaurus project within the monorepo at `docs/` with its own `package.json` (not a workspace member).
- The existing `examples/` directory will serve as source material for usage guides.
- TypeDoc will be used with `docusaurus-plugin-typedoc` for API reference generation.
- Algolia DocSearch will be requested after the site goes public.
- The site will be hosted at `https://agnostic-cloud.github.io/agnostic-layer/` (or custom domain if configured later).
- No browser execution of code examples (copy-paste model only).
- Packages must be built (`npm run build -w packages`) before TypeDoc generates API reference.
