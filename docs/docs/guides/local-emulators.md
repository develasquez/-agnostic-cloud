---
title: Local Emulators
sidebar_label: Local Emulators
---

# Local Emulators

Run the full test suite locally without cloud costs using Docker Compose.

## Prerequisites

- Docker Compose (or Podman — see note below)
- Node.js >= 18

## Start Emulators

```bash
docker compose up -d
```

This starts 12+ emulator services covering all 7 packages across AWS, GCP, and Azure.

## Environment Variables

| Package | Emulator | Port | Env Vars |
|---------|----------|------|----------|
| storage | MinIO (S3) | 9000 | `AWS_ENDPOINT`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` |
| storage | fake-gcs-server | 4443 | `STORAGE_EMULATOR_HOST` |
| storage | Azurite | 10000 | `AZURE_STORAGE_CONNECTION_STRING` |
| secrets | Nimbus (AWS) | 4566 | `AWS_ENDPOINT` |
| secrets | GCP Secret Manager | 9090 | `CLOUD_SECRETS_ENDPOINT` |
| secrets | Azurite | 10000 | `AZURE_KEY_VAULT_URL` |
| cache | Redis | 6379 | `REDIS_URL` |
| kms | local-kms (AWS) | 8099 | `AWS_ENDPOINT` |
| kms | GCP KMS (REST) | 8088 | `GCP_KMS_REST_ENDPOINT` |
| kms | Azure Key Vault | 4997 | `AZURE_KEY_VAULT_URL` |
| pubsub | Nimbus (SNS/SQS) | 4566 | `AWS_ENDPOINT` |
| pubsub | GCP Pub/Sub | 8085 | `PUBSUB_EMULATOR_HOST` |
| nosql | DynamoDB Local | 8000 | `AWS_ENDPOINT` |
| nosql | Firestore | 8086 | `FIRESTORE_EMULATOR_HOST` |
| nosql | CosmosDB vNext | 8081 | `COSMOS_ENDPOINT` |

## Run Tests

```bash
# All e2e tests
npm test

# Specific package
npm run test -w packages/storage
```

## Troubleshooting

See the [docker-compose.yml](https://github.com/agnostic-cloud/agnostic-layer/blob/main/docker-compose.yml) for exact service configurations.
