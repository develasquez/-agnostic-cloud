# Quickstart: floci-emulation

**Purpose**: Practical workflows to start, run, inspect, and verify the Floci emulation layer.
**Feature Spec**: `specs/003-floci-emulation/spec.md`
**Technical Plan**: `specs/003-floci-emulation/plan.md`

---

## 1. Local Setup and Boot

To boot the unified Floci emulation layer, use the high-level scripts declared in the repository root:

```bash
# Clone and install dependencies
npm install

# Start the Docker-Compose emulation stack and run the seeding script
npm run emulators:start

# This command:
# 1. Boots 3 Floci native containers (AWS, GCP, Azure), Redis, and floci-ui
# 2. Waits for successful healthcheck responses on ports 4566, 4588, and 4577
# 3. Executes `scripts/provision-emulators.ts` to provision initial buckets, topics, and keys
```

---

## 2. Inspecting Resources Visually

Once started, open your browser and navigate to the developer console:

```
http://localhost:4500
```

This console provides deep real-time insights into your local resources:
- **AWS Tab (Port 4566)**: View active S3 Buckets, DynamoDB Tables, SQS Queues, and Secrets.
- **GCP Tab (Port 4588)**: View active Cloud Storage buckets, Pub/Sub Topics, and Secret Manager fields.
- **Azure Tab (Port 4577)**: View active Blob Containers, Cosmos DB documents, and Key Vault entities.

---

## 3. Manual Health & CLI Verification

You can verify the status of individual emulators via curl or standard CLI tools:

### AWS (Port 4566)
```bash
# Check Emulator Health
curl -s http://localhost:4566/health | jq

# List S3 Buckets using standard AWS CLI (redirected via endpoint override)
aws --endpoint-url=http://localhost:4566 s3 ls
```

### GCP (Port 4588)
```bash
# Check Emulator Health
curl -s http://localhost:4588/health

# List GCP Storage Buckets
export STORAGE_EMULATOR_HOST=http://localhost:4588
export CLOUDSDK_CORE_PROJECT=floci-local
gcloud storage buckets list
```

### Azure (Port 4577)
```bash
# Check Emulator Health
curl -s http://localhost:4577/health
```

---

## 4. Running the E2E Test Suite

To run all package tests against the healthy, pre-seeded Floci emulators, simply trigger Vitest:

```bash
# Runs the full TS workspace tests in parallel
npm run test
```

---

## 5. Cleaning Up

To stop all containers and completely purge ephemeral databases and volumes to ensure clean slates for subsequent testing sessions:

```bash
# Stops and purges docker-compose assets
npm run emulators:stop
```
