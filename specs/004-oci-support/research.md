# Research & Design Decisions: oci-support

## Decision 1: Use `oci-sdk` vs. Individual `@oraclecloud` Packages

- **Problem**: Should we install separate individual scoped packages like `@oraclecloud/oci-objectstorage` and `@oraclecloud/oci-common`, or a single consolidated `oci-sdk` package?
- **Decision**: Use the standard `oci-sdk` package.
- **Rationale**: 
  - The single `oci-sdk` package houses all services under unified paths (e.g. `oci-sdk/lib/common`, `oci-sdk/lib/objectstorage`, etc.).
  - It ensures total internal consistency for all shared models, credentials structures, request signers, and helper classes.
  - While individual scoped packages exist, compiling them separately in a TypeScript Monorepo often results in version mismatches or conflicting peer dependencies (e.g., conflicting versions of `@oraclecloud/oci-common` compiled across different sub-packages).
- **Alternatives**: Scoped individual `@oraclecloud/` packages (rejected due to TypeScript peer dependency collision risks in standard Monorepos).

---

## Decision 2: Local Auth Bypass Strategy via SimpleAuthenticationDetailsProvider

- **Problem**: OCI SDK clients strictly require cryptographic signatures, region matching, and configuration validation. How do we pass these locally without prompting developers to install and configure real OCI keys on their host machines?
- **Decision**: Bundle mock credentials and a dummy RSA private key within `@agnostic-cloud/test-helpers` using `SimpleAuthenticationDetailsProvider`.
- **Rationale**:
  - `SimpleAuthenticationDetailsProvider` lets us construct credentials entirely in-memory at runtime without calling the local filesystem (`~/.oci/config`).
  - `floci-oci` does not active-check signatures; it only parses the Authorization header to extract the tenancy ID and user context. Any syntactically valid RSA private key works.
  - This delivers a seamless, zero-config local experience for developers running tests.
- **Alternatives**: 
  - Generate a file `~/.oci/config` dynamically during `npm run emulators:start` (rejected: modifies host file system outside of project directory, which is a major security risk and developer annoyance).
  - Use environment variable parsing only (rejected: requires more verbose configuration setup).

---

## Decision 3: OCI Pub/Sub Strategy Mapping

- **Problem**: OCI offers **OCI Queue** (Message Queue) and **OCI Streaming** (Kafka-like partitioning). Which service should implement `@agnostic-cloud/pubsub`?
- **Decision**: Map to OCI Queue using `QueueClient`.
- **Rationale**:
  - The standard `@agnostic-cloud/pubsub` strategy defines a direct publish/subscribe/acknowledge pattern (`publish`, `subscribe`, `acknowledge`).
  - OCI Queue natively supports standard message queuing, long-polling, visibility timeouts, and message deletion via a receipt handle (identical to AWS SQS and GCP Pub/Sub).
  - OCI Streaming is designed around persistent partition logs, offsets, cursors, and consumer groups, which is a higher-level pattern that does not align as smoothly with a simple message ack-by-receipt contract.
- **Alternatives**: OCI Streaming (rejected due to misalignment with standard ack-by-receipt design).
