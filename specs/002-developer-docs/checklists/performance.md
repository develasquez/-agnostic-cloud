# Performance Checklist — Developer Documentation Site

## Requirement Completeness

- [ ] CHK001 Is the Docusaurus build performance budget specified (build time, bundle size)? [Spec §SC-005]
- [ ] CHK002 Are page-load performance targets documented (LCP, FCP, TTI)? [Gap]
- [ ] CHK003 Is the impact of TypeDoc generation on build time documented and measured? [Spec §FR-006]
- [ ] CHK004 Are image/assets optimization requirements specified (format, sizing, lazy loading)? [Gap]
- [ ] CHK005 Is the search indexing performance documented (initial build time vs incremental)? [Spec §FR-011]
- [ ] CHK006 Are bundle size budgets specified for Docusaurus output? [Gap]

## Requirement Clarity

- [ ] CHK007 Is "build completes in under 2 minutes" (SC-005) measured from clean install or cached? [Clarity, Spec §SC-005]
- [ ] CHK008 Is "search returns results within 1 second" (SC-006) measured from keystroke or from search activation? [Clarity, Spec §SC-006]
- [ ] CHK009 Are the Lighthouse performance metrics specified with device type and network conditions? [Clarity, Spec §SC-003]

## Requirement Consistency

- [ ] CHK010 Are build-time expectations consistent between local dev (`npm start`) and CI (`npm run build`)? [Consistency, Spec §US8]
- [ ] CHK011 Do all 7 package page templates have similar complexity to ensure consistent load times? [Consistency, Spec §FR-005]

## Acceptance Criteria Quality

- [ ] CHK012 Can SC-005 (build < 2 min) be verified in CI with a performance gate? [Measurability, Spec §SC-005]
- [ ] CHK013 Can SC-006 (search < 1 sec) be verified programmatically? [Measurability, Spec §SC-006]
- [ ] CHK014 Can SC-003 (Lighthouse >= 90) be enforced as a CI check? [Measurability, Spec §SC-003]

## Scenario Coverage

- [ ] CHK015 Does the quickstart page load benchmark meet the performance targets? [Coverage, Spec §US3]
- [ ] CHK016 Does the largest page (landing + architecture diagram + package grid) meet performance targets? [Coverage, Spec §US1]
- [ ] CHK017 Does the TypeDoc-generated API page with all types for one package meet performance targets? [Coverage, Spec §US2]
- [ ] CHK018 Does the search functionality maintain response time under load (multiple concurrent queries)? [Coverage, Spec §US7]

## Edge Case Coverage

- [ ] CHK019 Is there a performance degradation strategy when Algolia DocSearch is unavailable (fallback to local search)? [Edge Case, Spec §FR-016]
- [ ] CHK020 Is the build-time impact documented when all 7 packages change simultaneously vs incrementally? [Edge Case]
- [ ] CHK021 Is there a performance budget for the 404 page and error states? [Edge Case]

## Non-Functional Requirements (Performance)

- [ ] CHK022 Are image formats specified (WebP with PNG fallback) for docs assets? [Gap]
- [ ] CHK023 Is code-splitting / lazy loading configured for heavy components (Mermaid diagrams, TypeDoc pages)? [Gap]
- [ ] CHK024 Is there a CDN/caching strategy for static assets (long-lived cache headers)? [Gap]
- [ ] CHK025 Are font loading and subsetting strategies documented? [Gap]
- [ ] CHK026 Is the number of TypeDoc entry points impacting build time measured and documented? [Spec §FR-006]
- [ ] CHK027 Is there a preconnect/dns-prefetch strategy for external resources (Algolia, Google Fonts)? [Gap]

## Dependencies & Assumptions

- [ ] CHK028 Does the performance budget assume GitHub Pages hosting (no CDN configuration)? [Assumption, Spec §FR-002]
- [ ] CHK029 Does the build-time budget assume GitHub Actions runner performance? [Assumption, Spec §US8]
- [ ] CHK030 Does the search performance assume local index vs Algolia SaaS? [Assumption, Spec §FR-011, FR-016]

## Ambiguities & Conflicts

- [ ] CHK031 Is there a potential conflict between "rich TypeDoc API reference" and "build under 2 minutes" for large packages? [Conflict, Spec §SC-005 vs FR-006]
- [ ] CHK032 Is there a conflict between "Mermaid diagrams" (client-side rendering) and Lighthouse performance score? [Conflict, Spec §Architecture vs SC-003]
- [ ] CHK033 Is it clear whether performance targets apply to dev server (`docusaurus start`) or production build only? [Ambiguity, Spec §SC-005]
