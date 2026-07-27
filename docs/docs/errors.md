---
title: Error Reference
sidebar_label: Error Reference
---

# Error Reference

All Agnostic Cloud errors extend `CloudError`, which extends the native `Error` class.

## Error Hierarchy

```
CloudError
├── CloudNotConfiguredError    — No cloud provider specified
├── InvalidCloudError          — Unrecognized cloud provider
├── AuthError                  — Authentication/authorization failure
├── TimeoutError               — Operation timed out
├── ValidationError            — Invalid input parameters
├── NotImplementedError        — Operation not supported by this provider
├── ObjectNotFoundError        — Requested object not found (storage)
├── SecretNotFoundError        — Requested secret not found (secrets)
```

## Per-Package Errors

### @agnostic-cloud/storage
| Error | Cause |
|-------|-------|
| `ObjectNotFoundError` | Object does not exist in the specified bucket/container |
| `AuthError` | Invalid or missing credentials |
| `TimeoutError` | Operation exceeded time limit |

### @agnostic-cloud/secrets
| Error | Cause |
|-------|-------|
| `SecretNotFoundError` | Secret does not exist |
| `AuthError` | Invalid or missing credentials |

### @agnostic-cloud/cache
| Error | Cause |
|-------|-------|
| `AuthError` | Redis authentication failed |
| `TimeoutError` | Cache operation timed out |

### @agnostic-cloud/kms
| Error | Cause |
|-------|-------|
| `AuthError` | Invalid or missing credentials |
| `TimeoutError` | Key operation timed out |

### @agnostic-cloud/pubsub
| Error | Cause |
|-------|-------|
| `AuthError` | Invalid or missing credentials |
| `TimeoutError` | Publish/subscribe timed out |

### @agnostic-cloud/nosql
| Error | Cause |
|-------|-------|
| `AuthError` | Invalid or missing credentials |
| `TimeoutError` | Database operation timed out |

### @agnostic-cloud/migrate
| Error | Cause |
|-------|-------|
| `AuthError` | Invalid or missing credentials for source or destination |
| `TimeoutError` | Migration operation timed out |

## Handling Errors

```typescript
import { CloudError, AuthError, TimeoutError } from '@agnostic-cloud/storage'
// or from any package — CloudError is re-exported by all packages

try {
  await storage.getObject('my-bucket', 'key')
} catch (err) {
  if (err instanceof AuthError) {
    console.error('Authentication failed. Check your credentials.')
  } else if (err instanceof TimeoutError) {
    console.error('Operation timed out. Retry with backoff.')
  } else if (err instanceof CloudError) {
    console.error('Cloud error:', err.message)
  } else {
    throw err
  }
}
```
