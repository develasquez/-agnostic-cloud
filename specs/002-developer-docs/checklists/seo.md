# SEO Checklist — Developer Documentation Site

## Requirement Completeness

- [ ] CHK001 Does every page have a unique, descriptive `<title>` tag? [Spec §FR-003]
- [ ] CHK002 Does every page have a unique `<meta name="description">` tag? [Spec §FR-003]
- [ ] CHK003 Is the canonical URL set on every page? [Gap]
- [ ] CHK004 Is there a `sitemap.xml` generated and submitted to search engines? [Gap]
- [ ] CHK005 Is there a `robots.txt` file with correct rules for prod and staging? [Gap]
- [ ] CHK006 Are all public pages indexable (no `noindex` on content pages)? [Gap]
- [ ] CHK007 Is the 404 page tagged with `<meta name="robots" content="noindex">`? [Gap]
- [ ] CHK008 Are Open Graph (`og:title`, `og:description`, `og:image`, `og:url`) tags present on every page? [Gap]
- [ ] CHK009 Are Twitter Card (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`) tags present? [Gap]

## Requirement Clarity

- [ ] CHK010 Is the meta description length specified (under 160 chars recommended)? [Clarity, Gap]
- [ ] CHK011 Is the title tag format documented (e.g., "Page Name | @agnostic-cloud")? [Clarity, Gap]

## Requirement Consistency

- [ ] CHK012 Do all pages follow the same title tag format (`"Topic · @agnostic-cloud"`)? [Consistency]
- [ ] CHK013 Are heading tags (h1–h3) used consistently with one h1 per page? [Consistency]
- [ ] CHK014 Are image alt attributes consistently provided across all documentation images? [Consistency]

## Acceptance Criteria Quality

- [ ] CHK015 Can CHK001–CHK003 be verified by running a crawler (e.g., `lighthouse seo` audit)? [Measurability]
- [ ] CHK016 Can CHK004–CHK006 be verified by checking `sitemap.xml` and `robots.txt` in CI? [Measurability]
- [ ] CHK017 Can CHK008–CHK009 be verified via social sharing preview tools? [Measurability]

## Scenario Coverage

- [ ] CHK018 Does the landing page rank for "agnostic cloud", "cloud agnostic library", "multi-cloud TypeScript"? [Coverage, Spec §US1]
- [ ] CHK019 Do per-package pages rank for "agnostic cloud storage", "agnostic cloud kms", etc.? [Coverage, Spec §US2]
- [ ] CHK020 Does the quickstart page rank for "getting started agnostic cloud"? [Coverage, Spec §US3]
- [ ] CHK021 Does the LLM reference section appear as a distinct search result for LLM crawlers? [Coverage, Spec §US5]

## Edge Case Coverage

- [ ] CHK022 Are TypeDoc-generated API pages correctly indexed (deep links to specific types/methods)? [Edge Case]
- [ ] CHK023 Are versioned docs (`next`, `0.1.0`) handled with correct canonical URLs to avoid duplicate content? [Edge Case, Spec §US6]
- [ ] CHK024 Is the search fallback page (no results) tagged `noindex`? [Edge Case]
- [ ] CHK025 Are paginated or filtered URL parameters handled via canonical URLs? [Edge Case]

## Non-Functional Requirements (SEO)

- [ ] CHK026 Is the site fully server-side rendered (SSR/SSG) for search crawlers? [Gap]
- [ ] CHK027 Is the page load speed under 3 seconds on mobile for SEO ranking? [Gap, ties to SC-003]
- [ ] CHK028 Are JavaScript-rendered elements (CloudTabs, Mermaid) crawler-accessible? [Gap]
- [ ] CHK029 Is structured data (JSON-LD) implemented for documentation pages (e.g., `TechArticle`, `SoftwareSourceCode`)? [Gap]
- [ ] CHK030 Are breadcrumbs implemented with structured data markup? [Gap]
- [ ] CHK031 Are internal links using descriptive anchor text instead of "click here"? [Gap]

## Dependencies & Assumptions

- [ ] CHK032 Does SEO assume GitHub Pages hosts at the root domain or a subpath (`/agnostic-layer`)? [Assumption, Spec §FR-002]
- [ ] CHK033 Does structured data generation assume a Docusaurus plugin or manual injection? [Assumption, Gap]
- [ ] CHK034 Does the sitemap assume Docusaurus `@docusaurus/plugin-sitemap` with default config? [Assumption]

## Ambiguities & Conflicts

- [ ] CHK035 Is there a conflict between "versioned docs" (multiple URL paths with same content) and "no duplicate content"? [Conflict, Spec §US6]
- [ ] CHK036 Is it clear whether LLM reference pages should be `noindex` (meant for LLMs, not humans) or indexed? [Ambiguity, Spec §US5]
- [ ] CHK037 Is it clear whether CloudTabs content (hidden tabs) is indexed by crawlers or client-side only? [Ambiguity, Spec §FR-012]
