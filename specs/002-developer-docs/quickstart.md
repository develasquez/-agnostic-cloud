# Quickstart — Developer Documentation Site (Validation Scenarios)

These scenarios verify the Docusaurus setup works end-to-end.

## Scenario 1: Local Development Server

```bash
cd docs
npm install
npm start
# → Opens http://localhost:3000 with the documentation site
# → Hot-reload on file changes
# → All 7 package API pages accessible via sidebar
# → Search bar works
```

## Scenario 2: Production Build

```bash
cd docs
npm run build
# → Output in docs/build/
# → No TypeScript errors
# → All internal links resolve
# → TypeDoc generated all API pages
```

## Scenario 3: API Reference Generation

```bash
# Build packages first (required for TypeDoc)
npm run build -w packages

# Then build docs
cd docs
npm run build
# → docs/build/api/@agnostic-cloud/ contains pages for all 7 packages
# → Each page shows exported types, functions, and interfaces
# → Type signatures match the actual source code
```

## Scenario 4: Verify All Package Pages

```bash
# Check that all 7 package API pages exist
ls docs/build/api/@agnostic-cloud/ | wc -l
# → Output: 7 (storage, secrets, cache, kms, pubsub, nosql, migrate)
```

## Scenario 5: GitHub Pages Deployment

```bash
# After push to main, verify at:
# https://agnostic-cloud.github.io/agnostic-layer/
# Or the configured custom domain
```
