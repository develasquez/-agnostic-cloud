# Task Specification: T012 — Implement Emulator Provisioning Script

**Source**: `specs/003-floci-emulation/tasks.md` — Consolidated Local Emulation
**Classification**: `[API]` / `[INFRASTRUCTURE]`
**Created**: 2026-07-31

## Operational Classification

| Tag | Applies |
|-----|---------|
| `[DATABASE]` | **Yes** — Provisions DynamoDB tables, Firestore collections, and Cosmos DB containers |
| `[SECURITY-CRITICAL]` | No |
| `[API]` | **Yes** — Programmatically orchestrates client SDKs to construct default cloud resources |
| `[MIGRATION]` | No |
| `[UI]` | No |
| `[INFRASTRUCTURE]` | **Yes** — Boots and seeds local cloud emulation environments |

## Prerequisites Before Starting

- [ ] Load `specs/constitution.md` and verify this task aligns with all MUST principles
- [ ] Load `specs/003-floci-emulation/spec.md` for functional requirements
- [ ] Load `specs/003-floci-emulation/plan.md` for port and endpoints layout
- [ ] Verify T001, T002, T003, and T004 are complete (Compose environment configured and boot script mapped)

## Dependencies

- **Blocked by**: T001, T002, T003, T004
- **Blocks**: T013, T014, T015, T016 (Subsequent specific service seeding tasks)

---

## Execution Directives

### Before

1. Read `specs/constitution.md` — specifically principle V (Test-Driven & Modular Architecture) and III (Minimal Dependencies).
2. Verify all Floci containers can be successfully started locally (`docker compose up -d`).
3. Confirm that standard AWS, GCP, and Azure SDK client packages are accessible in root/package devDependencies.

### During

1. Scaffold the file `scripts/provision-emulators.ts` as a TypeScript execution script.
2. Implement a blocking wait/retry block checking health status on ports 4566, 4588, and 4577 before running client commands:
   ```typescript
   async function waitForEndpoint(url: string, retries = 10): Promise<boolean> {
     for (let i = 0; i < retries; i++) {
       try {
         const res = await fetch(url);
         if (res.ok) return true;
       } catch {}
       await new Promise(resolve => setTimeout(resolve, 500));
     }
     return false;
   }
   ```
3. Initialize the AWS S3 client pointing to `http://localhost:4566` and verify if the testing bucket `test-bucket` exists. If not, create it.
4. Initialize the GCP Storage client pointing to `http://localhost:4588` and verify if `test-bucket` exists. If not, create it.
5. Initialize the Azure Blob Storage client pointing to `http://localhost:4577` and verify if the container `test-bucket` exists. If not, create it.
6. Write descriptive log messages to output step-by-step progress (e.g. `[PROVISION] AWS S3 bucket "test-bucket" verified/created.`).

### After

1. Boot the emulators (`docker compose up -d`).
2. Run the script using tsx (`npx tsx scripts/provision-emulators.ts`).
3. Verify that `test-bucket` is successfully created across AWS, GCP, and Azure mock environments.
4. Shut down the containers using `docker compose down -v`.

---

## Definition of Done

- [ ] `scripts/provision-emulators.ts` is fully implemented and compiled with TypeScript strictness
- [ ] Script successfully waits for emulator ports to report HTTP 200 before proceeding
- [ ] Programmatic storage bucket creation is complete and verified across S3, GCS, and Azure Blob
- [ ] Complete execution output prints clear, professional terminal progress reports
- [ ] Task T012 marked as completed in `tasks.md`
