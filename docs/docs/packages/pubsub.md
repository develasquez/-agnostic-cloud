---
title: '@agnostic-cloud/pubsub'
sidebar_label: Overview
---

import CloudTabs from '@site/src/components/CloudTabs';

# @agnostic-cloud/pubsub

Unified pub/sub messaging interface for AWS SNS/SQS, GCP Pub/Sub, and Azure Event Grid / Service Bus.

## Installation

```bash
npm install @agnostic-cloud/pubsub
```

Provider SDKs:
- AWS: `npm install @aws-sdk/client-sns @aws-sdk/client-sqs`
- GCP: `npm install @google-cloud/pubsub`
- Azure: `npm install @azure/eventgrid @azure/service-bus @azure/identity`

## Factory Function

```typescript
import { createPubSub } from '@agnostic-cloud/pubsub'

const pubsub = createPubSub({
  cloud: 'aws',
  region: 'us-east-1',
  config: {
    // cloud-specific options
  },
})
```

## Usage Examples

<CloudTabs
  aws={{
    title: 'AWS SNS/SQS',
    code: `const result = await pubsub.publish('my-topic', { message: 'Hello' })
console.log(result.messageId)`,
  }}
  gcp={{
    title: 'GCP Pub/Sub',
    code: `const result = await pubsub.publish('my-topic', { message: 'Hello' })
console.log(result.messageId)`,
  }}
  azure={{
    title: 'Azure Event Grid',
    code: `const result = await pubsub.publish('my-topic', { message: 'Hello' })
console.log(result.messageId)`,
  }}
/>

## Configuration

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `cloud` | `'aws' \| 'gcp' \| 'azure'` | yes | Cloud provider |
| `region` | string | no | Provider region |
| `config` | `Record<string, any>` | no | Passed verbatim to provider SDK |

## API Reference

See the [auto-generated API reference](/agnostic-layer/docs/next/api/@agnostic-cloud/pubsub) for full type signatures.

## Error Handling

| Error | When |
|-------|------|
| `AuthError` | Authentication failure |
| `TimeoutError` | Request timed out |
