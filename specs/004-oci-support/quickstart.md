# Quickstart & Verification Scenarios: oci-support

This quickstart guides you through validating that the OCI emulation layer is running, correctly configured, and responding to test requests locally.

---

## 🚀 1. Boot up the OCI Emulator

First, spin up the consolidated local emulation stack including `floci-oci` (port `4599`):

```bash
# Clean start the local emulator containers
npm run emulators:start
```

Ensure that the emulator responds to a basic health probe:

```bash
curl -f http://localhost:4599/health
```
*(Should return a status code of 200 indicating "healthy")*

---

## 🛠️ 2. Execute the Provisioning Script

Run the automated seed script to provision the required local OCI resources (bucket, queue, KMS vault, key, secrets) on the emulator:

```bash
npm run emulators:status
```
*(Verify OCI service is listed as active and configured)*

---

## 🧪 3. Run OCI Integration Tests

You can execute the newly introduced OCI E2E strategy tests sequentially using the test runner:

```bash
# Run storage E2E tests specifically
npx vitest run packages/storage/test/storage.e2e.test.ts

# Run KMS E2E tests specifically
npx vitest run packages/kms/test/kms.e2e.test.ts

# Run Secrets E2E tests specifically
npx vitest run packages/secrets/test/secrets.e2e.test.ts

# Run Pub/Sub E2E tests specifically
npx vitest run packages/pubsub/test/pubsub.e2e.test.ts
```

---

## 🔍 4. Verification Checklists

When OCI is fully supported:
1. **Docker Compose**: Running `docker ps` shows container `floci-oci` listening on `0.0.0.0:4599->4599/tcp`.
2. **TypeScript**: Running `npm run build` compiles all workspaces with zero TypeScript errors.
3. **NoSQL Fallback**: Instantiating NoSQL with `oci` provider throws a clean, typed `NotImplementedError` when executing documents actions.
4. **Cache**: Instantiating Cache with `oci` provider succeeds and connects to the local Redis instance.
