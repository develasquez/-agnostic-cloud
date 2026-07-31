# Technical Plan: floci-emulation

**Feature**: `003-floci-emulation`
**Tech Stack**: Docker / Docker Compose / Node.js / TypeScript
**Created**: 2026-07-31

---

## Technical Context

The purpose of this plan is to replace the verbose, fragmented, resource-intensive legacy local cloud emulation layer with the lightweight, unified **Floci** emulator suite (`floci.io`). This involves updating `docker-compose.yml`, creating an automated provisioning/lifecycle framework, and updating test configurations to target the consolidated Floci endpoints.

---

## Architecture

### High-Level Design

```
                     ┌──────────────────┐
                     │  docker compose  │
                     └────────┬─────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
   │    floci    │     │  floci-gcp  │     │  floci-az   │
   │  AWS (4566) │     │  GCP (4588) │     │ Azure (4577)│
   └──────┬──────┘     └──────┬──────┘     └──────┬──────┘
          │                   │                   │
  S3, SQS, SNS, KMS,  GCS, Secret Manager, Blob, Queue, Cosmos,
  Secrets, DynamoDB   Firestore, KMS,      Key Vault, Service Bus,
                      Pub/Sub              Event Hubs
```

### Consolidated Endpoint Mapping

| Legacy Service Emulator | Legacy Port(s) | Replacement Floci Emulator | Floci Endpoint / Port |
| :--- | :--- | :--- | :--- |
| `minio` (AWS S3) | `9000`, `9001` | `floci` | `http://localhost:4566` |
| `fake-gcs-server` (GCP Storage) | `4443` | `floci-gcp` | `http://localhost:4588` |
| `azurite` (Azure Blob) | `10000`-`10002` | `floci-az` | `http://localhost:4577` |
| `gcloud-pubsub` (GCP Pub/Sub) | `8085` | `floci-gcp` | `http://localhost:4588` |
| `dynamodb-local` (AWS DynamoDB) | `8000` | `floci` | `http://localhost:4566` |
| `firestore-emulator` (GCP Firestore) | `8086` | `floci-gcp` | `http://localhost:4588` |
| `local-kms` (AWS KMS) | `8099` | `floci` | `http://localhost:4566` |
| `nimbus` (AWS Secrets, SQS, SNS) | `4566` | `floci` | `http://localhost:4566` |
| `gcp-secret-manager` (GCP Secrets) | `9090`, `8087` | `floci-gcp` | `http://localhost:4588` |
| `azure-keyvault` (Azure Key Vault) | `4997` | `floci-az` | `http://localhost:4577` |
| `gcp-kms` (GCP KMS) | `9091`, `8088` | `floci-gcp` | `http://localhost:4588` |
| `cosmos-emulator` (Azure Cosmos DB) | `1234`, `8081` | `floci-az` | `http://localhost:4577` |
| `redis` (Cache) | `6379` | `redis` (Retained as is) | `http://localhost:6379` |

---

## Project Layout Changes

- **Update**: `docker-compose.yml` (Consolidate to Floci + Redis + UI)
- **Update**: `package.json` (Add script definitions for lifecycle hooks)
- **Create**: `scripts/provision-emulators.ts` (Automated seeding script)
- **Update**: `packages/*/test/*.test.ts` (Point to new environment endpoints)
- **Create**: `packages/test-helpers/` (Internal module containing a centralized `FakeTokenCredential` and Endpoint Resolver)

---

## Constitution Gates Verification

- **I. Executable Specifications First**: Checked. This technical plan has a direct correlation with `specs/003-floci-emulation/spec.md`.
- **II. Library-First API Design**: Checked. Zero modifications are made to the public API classes, strategies, or return signatures. Only test configurations and emulators are affected.
- **III. Minimal Dependencies**: Checked. No new production dependencies. Development tools use existing `docker-compose` and TypeScript execution frameworks already in place.
- **IV. TypeScript Strictness**: Checked. The provisioning script `scripts/provision-emulators.ts` is fully typed and compiled under TypeScript strict mode.
- **V. Test-Driven & Modular Architecture**: Checked. Moving to Floci retains all existing E2E coverage while making container boot isolated and predictable.
- **VI. Observability & Error Handling**: Checked. Healthchecks are declared at Docker levels, and the setup script explicitly handles and reports failure modes during emulator readiness hooks.

---

## Implementation Details & Steps

### Step 1: Replace `docker-compose.yml`

A clean, unified Docker Compose mapping Floci emulators, Redis, and the UI:

```yaml
version: "3.9"

services:
  # Unified Floci UI Console
  floci-ui:
    image: floci/floci-ui:latest
    ports:
      - "4500:4500"
    environment:
      - FLOCI_ENDPOINT=http://floci:4566
      - FLOCI_AZ_ENDPOINT=http://floci-az:4577
      - FLOCI_GCP_ENDPOINT=http://floci-gcp:4588

  # AWS Emulator
  floci:
    image: floci/floci:latest
    container_name: floci
    ports:
      - "4566:4566"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock # Expose host daemon for Lambda/RDS execution
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4566/health"]
      interval: 2s
      timeout: 2s
      retries: 5

  # GCP Emulator
  floci-gcp:
    image: floci/floci-gcp:latest
    container_name: floci-gcp
    ports:
      - "4588:4588"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4588/health"]
      interval: 2s
      timeout: 2s
      retries: 5

  # Azure Emulator
  floci-az:
    image: floci/floci-az:latest
    container_name: floci-az
    ports:
      - "4577:4577"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4577/health"]
      interval: 2s
      timeout: 2s
      retries: 5

  # Standalone Redis service for Agnostic Cache Strategy testing
  redis:
    image: redis:7-alpine
    container_name: floci-redis
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 2s
      timeout: 2s
      retries: 5
```

### Step 2: Establish the Provisioning Script `scripts/provision-emulators.ts`

This script will run after `docker compose up -d` has verified all containers are healthy. It utilizes the native SDKs (which are installed as devDependencies) to configure basic resources on the emulators:

1. **AWS S3 / GCP GCS / Azure Blob**: Create the common testing bucket `test-bucket`.
2. **AWS DynamoDB / GCP Firestore / Azure Cosmos**: Initialize standard document collections (`test-collection`).
3. **AWS SQS & SNS / GCP Pub/Sub**: Create default topics and subscription flows.
4. **AWS Secrets / GCP Secrets**: Add baseline secrets.
5. **AWS KMS / GCP KMS / Azure Key Vault Keys**: Create default keys.

### Step 3: Implement Lifecycle Hooks in Root `package.json`

Add the following commands to orchestrate the emulation flow:

```json
"scripts": {
  ...
  "emulators:start": "docker compose up -d && npx tsx scripts/provision-emulators.ts",
  "emulators:stop": "docker compose down -v",
  "emulators:status": "docker compose ps"
}
```

### Step 4: Refactor Test Suites to Fetch Unified Endpoints

Rather than having scattered hardcoded variables, we update E2E tests to consume standardized connection configurations:

- **AWS Tests**: Target `http://localhost:4566`.
- **GCP Tests**: Target `http://localhost:4588`.
- **Azure Tests**: Target `http://localhost:4577`.

Additionally, we maintain back-compat and customizable local developer setups by ensuring tests fall back to these endpoints if the specialized env vars (e.g. `AWS_EMULATOR_ENDPOINT`) are undefined.
