# Research — Developer Documentation Site

## Technology Decisions

### Docusaurus vs Alternatives

| Option | Verdict | Rationale |
|--------|---------|-----------|
| **Docusaurus** | ✅ **Selected** | Mature ecosystem, React-based (matches TypeScript/Node stack), built-in versioning, search, MDX, GitHub Pages deploy, Algolia integration, strong OSS adoption |
| VitePress | ❌ Rejected | Vue-based (mismatch with TS/React ecosystem), less mature plugin ecosystem |
| MkDocs (Material) | ❌ Rejected | Python-based, no native TypeDoc integration, limited MDX support |
| Typedoc standalone | ❌ Rejected | API-only, no landing pages, guides, or navigation |
| Storybook | ❌ Rejected | Component-focused, not suitable for library API documentation |
| Jekyll (GitHub Pages native) | ❌ Rejected | Ruby-based, no TypeDoc integration, limited interactivity |

### TypeDoc Plugin: `docusaurus-plugin-typedoc`

Two options exist:
1. **`docusaurus-plugin-typedoc`** — Wraps TypeDoc as a Docusaurus plugin; generates `.md` files during build
2. **`typedoc` standalone with `typedoc-plugin-markdown`** — Generates markdown, then imported into Docusaurus

Selected: **`docusaurus-plugin-typedoc`**. It integrates directly into the Docusaurus build pipeline, handles watch mode in dev, and supports incremental builds. The standalone approach requires an extra build step and manual synchronization.

### Search: Algolia DocSearch

Docusaurus built-in search (Lunr.js) works offline but has limited relevance. Algolia DocSearch is free for open-source projects and provides significantly better results. Strategy: Start with built-in search, apply for Algolia when the site is public.

### Diagram Format: Mermaid

Docusaurus supports Mermaid via `@docusaurus/theme-mermaid`. This avoids needing external diagram tools. Architecture and flow diagrams are written as Mermaid code blocks in MDX.

## Clarified Decisions

| Decision | Resolution |
|----------|-----------|
| **Versioning** | Docusaurus versioning desde día 1. Versión inicial `0.1.0`. Se congela snapshot en cada release. |
| **Interactive examples** | Code blocks + CloudTabs + Copy button. Sin ejecución en navegador. |
| **docs/ isolation** | `package.json` propio. No workspace member. Evita conflictos de dependencias React/Docusaurus. |

## Key Considerations

### Separate vs Root package.json for Docusaurus

**Decision: Separate `docs/package.json`**

Docusaurus requires React 18 and specific versions of `@docusaurus/*` packages. Installing them in the root `package.json`:
- Creates hoisting conflicts with the monorepo's workspace setup
- Adds runtime dependencies (Docusaurus deps include React, which is not needed at runtime for the library)
- The TypeDoc plugin needs access to all packages' source — this works because `node_modules` resolves up to the root

A separate `package.json` in `docs/` keeps Docusaurus deps isolated.

### Workspace vs Standalone Docusaurus

Docusaurus is a standalone project (not an npm workspace member) because:
- It has its own build pipeline (`docusaurus build`) separate from the library build (`tsup`)
- It depends on the built library output (`packages/*/dist/`) but not vice versa
- Adding it as a workspace member would trigger test runs and build steps unnecessarily
- The root `tsconfig.json` extended by workspaces may conflict with Docusaurus's React TSX config

### TypeDoc Entry Points

TypeDoc will scan `packages/*/src/index.ts` as entry points. This requires the packages to be built first (TypeDoc reads `.d.ts` files or raw TS). The build order must be:
1. `npm run build -w packages` (build all packages)
2. `npm run build` (in docs/, runs typedoc + docusaurus build)

## Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| TypeDoc generates incorrect/incomplete docs for complex types | Medium | Medium | Review generated output manually; add `@category`, `@ignore` tags as needed |
| Docusaurus version conflicts with React/TS versions | Low | High | Pin `@docusaurus/*` to compatible version; test in CI |
| GitHub Pages deployment fails | Low | Medium | Test with `docusaurus build` locally first; verify `publish_dir` path |
| Algolia DocSearch application rejected | Medium | Low | Built-in search is adequate fallback |
| LLM Reference becomes stale | Medium | Medium | Automate via pre-build script that reads TypeDoc JSON output |
