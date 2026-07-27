# LLM Reference Checklist — Developer Documentation Site

## Requirement Completeness

- [ ] CHK001 Are all 7 factory functions documented with exact TypeScript signatures in the LLM reference? [Spec §FR-009, US6]
- [ ] CHK002 Is the generic `CloudConfig` shape (`{ cloud, region, config }`) documented once as the shared pattern? [Spec §Key Entities]
- [ ] CHK003 Are all strategy interface methods listed with their signatures for every package? [Spec §US6]
- [ ] CHK004 Is the full error hierarchy (`CloudError` → all subtypes) documented in compact format? [Spec §FR-010, US6]
- [ ] CHK005 Are per-package error types listed alongside their parent package? [Spec §US6]
- [ ] CHK006 Is the migration module documented as standalone functions (`copyObject`, `verifyIntegrity`) rather than a strategy interface? [Spec §US4]
- [ ] CHK007 Are cloud-specific config notes (Azure `vaultUrl`, GCP `projectId`, AWS `region`) included per package? [Spec §FR-017]

## Requirement Clarity

- [ ] CHK008 Is the format compact enough to fit in an LLM context window without unnecessary prose? [Clarity, Spec §FR-019]
- [ ] CHK009 Are optional vs required parameters clearly distinguished (e.g., `opts?` vs `config`)? [Clarity]
- [ ] CHK010 Is the `config: Record<string, any>` passthrough explained with a single-line note? [Clarity, Spec §Key Entities]
- [ ] CHK011 Is it clear which functions return promises vs synchronous values? [Clarity]
- [ ] CHK012 Are discriminated unions (`'aws' | 'gcp' | 'azure'`) formatted for LLM parsing (pipe syntax vs bullet list)? [Clarity]

## Requirement Consistency

- [ ] CHK013 Do all package entries follow the same structural pattern (factory → methods → errors)? [Consistency]
- [ ] CHK014 Are method signatures consistently formatted across all 7 packages? [Consistency]
- [ ] CHK015 Is the error hierarchy naming consistent between LLM reference and actual source exports? [Consistency, Spec §FR-010]
- [ ] CHK016 Are return types named consistently (`PutObjectResult`, `GetObjectResult` vs `PutResult`, `GetResult`)? [Consistency]
- [ ] CHK017 Is the pattern for optional parameters consistent (`opts?` vs `options?`) across all packages? [Consistency]

## Acceptance Criteria Quality

- [ ] CHK018 Can T057 (`verify-llm-reference.ts`) programmatically verify that every expected symbol is present in the LLM reference page? [Measurability, SC-004]
- [ ] CHK019 Can an LLM given only the LLM reference page generate syntactically correct `create*` calls for all 7 packages? [Measurability, Spec §US6]
- [ ] CHK020 Can a developer verify the LLM reference is complete by cross-referencing with TypeDoc output? [Measurability, SC-004]

## Scenario Coverage

- [ ] CHK021 Does the LLM reference cover the "switch clouds by changing one line" pattern? [Coverage, Spec §US3]
- [ ] CHK022 Does the LLM reference include navigation schema / URL structure for crawlers? [Coverage, Spec §content-architecture.md]
- [ ] CHK023 Does the LLM reference cover the `CLOUD_PROVIDER` env var fallback? [Coverage, Spec §resolver.ts]

## Edge Case Coverage

- [ ] CHK024 Is the behavior documented when `config` is empty (default credential chain)? [Edge Case]
- [ ] CHK025 Is it clear which packages require additional peer dependencies per cloud? [Edge Case, Spec §US3]
- [ ] CHK026 Are overloaded or polymorphic method signatures documented (e.g., `encrypt` accepting string or Buffer)? [Edge Case]
- [ ] CHK027 Is the absence of certain methods in specific clouds documented (e.g., `listSecrets` in Azure)? [Edge Case]

## Non-Functional Requirements (LLM)

- [ ] CHK028 Is the LLM reference page under 10KB to minimize token consumption? [Gap]
- [ ] CHK029 Is the page free of Markdown features that LLMs parse poorly (nested tables, complex HTML)? [Gap]
- [ ] CHK030 Are code blocks using plain ```typescript rather than MDX imports that LLMs cannot resolve? [Gap]
- [ ] CHK031 Are all cross-references in plain text (not Docusaurus `@site/` links) for LLM portability? [Gap]
- [ ] CHK032 Is the page distributable as a standalone Markdown file (no JSX components)? [Gap]
- [ ] CHK033 Is a plain-text version available for direct LLM ingestion via URL? [Gap]

## Dependencies & Assumptions

- [ ] CHK034 Does the LLM reference assume the LLM has knowledge of AWS/GCP/Azure SDK conventions? [Assumption]
- [ ] CHK035 Does the LLM reference assume the LLM understands TypeScript generic syntax? [Assumption]
- [ ] CHK036 Is it assumed that the LLM reference will be updated whenever a package API changes? [Assumption]

## Ambiguities & Conflicts

- [ ] CHK037 Is there a conflict between "human-readable error reference" and "compact LLM format"? [Conflict, Spec §FR-009 vs FR-010]
- [ ] CHK038 Is it clear whether the LLM reference should duplicate or reference the error hierarchy from the error page? [Ambiguity]
- [ ] CHK039 Is it clear whether the LLM reference should include the migration guide logic or just function signatures? [Ambiguity, Spec §US4 vs US6]
