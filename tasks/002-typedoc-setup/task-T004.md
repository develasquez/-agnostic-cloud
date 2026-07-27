# Task Specification: T004 — Configure docusaurus-plugin-typedoc

**Source**: `specs/002-developer-docs/tasks.md` — Developer Documentation Site
**Classification**: `[API]`
**Created**: 2026-07-26

## Operational Classification

| Tag | Applies |
|-----|---------|
| `[DATABASE]` | No |
| `[SECURITY-CRITICAL]` | No |
| `[API]` | **Yes** — Generates public API documentation from source |
| `[MIGRATION]` | No |
| `[UI]` | No |
| `[INFRASTRUCTURE]` | No |

## Prerequisites Before Starting

- [ ] Load `specs/constitution.md` and verify this task aligns with all MUST principles
- [ ] Load `specs/002-developer-docs/data-model.md` for API reference entity definition
- [ ] Load `specs/002-developer-docs/contracts/content-architecture.md` for page structure
- [ ] Verify T001 (Docusaurus scaffold) is complete

## Dependencies

- **Blocked by**: T001
- **Blocks**: T020 (TypeDoc verification)

---

## Execution Directives

### Before

1. Read `specs/constitution.md` — specifically principle IV (TypeScript Strictness) and II (Library-First API Design)
2. Verify `packages/*/src/index.ts` files exist and export the public API
3. Verify all packages are built (`npm run build -w packages`) — TypeDoc reads `.d.ts` files
4. Review `docusaurus-plugin-typedoc` documentation for multi-entry-point configuration

### During

1. Install `docusaurus-plugin-typedoc` and `typedoc` in `docs/package.json`
2. Configure `docs/docusaurus.config.ts`:

```typescript
plugins: [
  [
    'docusaurus-plugin-typedoc',
    {
      id: 'storage',
      entryPoints: ['../../packages/storage/src/index.ts'],
      tsconfig: '../../packages/storage/tsconfig.json',
      out: 'api/@agnostic-cloud/storage',
      plugin: ['typedoc-plugin-markdown'],
      readme: 'none',
      cleanOutputDir: true,
    },
  ],
  // Repeat for: secrets, cache, kms, pubsub, nosql, migrate
  // Each with unique `id` and `out` path
]
```

3. For each of the 7 packages, add a TypeDoc plugin entry with:
   - `id`: unique package identifier
   - `entryPoints`: path to `packages/[name]/src/index.ts` (relative to `docs/`)
   - `tsconfig`: path to package's `tsconfig.json`
   - `out`: `api/@agnostic-cloud/[name]`
4. Add sidebar items pointing to each generated API page:

```typescript
{
  type: 'category',
  label: '@agnostic-cloud/storage',
  items: [
    'packages/storage',  // manual overview page
    'api/@agnostic-cloud/storage/index',  // auto-generated
  ],
}
```

5. Test with `npm run build` in `docs/`
6. Verify output files exist at `docs/api/@agnostic-cloud/*/`

### After

1. Run `npm run build` in `docs/` and confirm no errors
2. Verify all 7 API directories exist under `docs/build/api/@agnostic-cloud/`
3. Check that type signatures in generated docs match actual source code
4. Log any TypeDoc configuration quirks in `.specify/decisions/`

---

## Definition of Done

- [ ] `docusaurus-plugin-typedoc` installed and configured for all 7 packages
- [ ] `npm run build` succeeds without TypeDoc errors
- [ ] API pages are generated at `docs/build/api/@agnostic-cloud/*/`
- [ ] Sidebar links to auto-generated API pages work
- [ ] Manual package overview pages (`docs/docs/packages/*.md`) link to the correct TypeDoc output
- [ ] Task T004 marked as completed in `tasks.md`
