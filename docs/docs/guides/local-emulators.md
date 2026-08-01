---
title: Local Emulators
sidebar_label: Local Emulators
---

# Local Emulators

Run the full test suite locally without cloud costs using Podman or Docker Compose with our unified **Floci** emulation routing layer.

## Prerequisites

- **Podman Desktop** (or Docker Desktop) on macOS / Linux.
- **Node.js** >= 20.x

## Start Emulators

We provide an orchestration script that starts our local containers and pre-provisions standard resources (such as GCP Keyrings, OCI Queues, and Azure Containers):

```bash
# Starts the compose containers and runs provisioning scripts
npm run emulators:start
```

*To stop the emulators and clean up volumes, run:*
```bash
npm run emulators:stop
```

## Unified Floci Port Mapping & Fallbacks

To ensure absolute simplicity, our local emulation environment consolidates ports through unified endpoints (*Floci*):

| Cloud Provider | Floci Port | Unified Local Endpoint | Services Emulated |
| :--- | :---: | :--- | :--- |
| **AWS** | `4566` | `http://localhost:4566` | S3, Secrets Manager, KMS, SNS, SQS, DynamoDB |
| **GCP** | `4588` | `http://localhost:4588` | Google Cloud Storage, Secret Manager, Cloud KMS, Firestore, Pub/Sub |
| **Azure** | `4577` | `http://localhost:4577` | Azure Blob, Key Vault Secrets, CosmosDB |
| **OCI** | `4599` | `http://localhost:4599` | OCI Object Storage, OCI Vault & KMS, OCI Queue |
| **Cache** | `6379` | `localhost:6379` | Redis Cache |

## Running Tests

Due to virtualized CPU-throttling inside macOS container runtimes (such as Podman or Docker Mac), running tests in parallel can lead to handshake timeouts. Always execute the test suite sequentially for maximum stability:

```bash
# Execute all package unit & E2E tests sequentially
npx vitest run --pool=forks --maxWorkers=1 --minWorkers=1 --test-timeout=30000
```

## Troubleshooting

- **Container Status**: Check if all emulators are healthy:
  ```bash
  npm run emulators:status
  ```
- **Port Conflicts**: Ensure you do not have native services (like Redis on port `6379`) running locally on your host machine before starting the emulators.
- **Reset State**: If you encounter state issues, reset the container volumes with `npm run emulators:stop` and restart them.
