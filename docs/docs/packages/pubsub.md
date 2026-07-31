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

> **Note on Peer Dependencies**: Cloud provider SDKs are optional peer dependencies. You only need to install the SDK for the cloud provider(s) you use.

### Supported Cloud Provider SDK Versions

| Cloud Provider | Required SDK Package | Current / Tested Version | Installation Command |
|---|---|---|---|
| **AWS** | `@aws-sdk/client-sns`<br/>`@aws-sdk/client-sqs` | `^3.1095.0`<br/>`^3.1095.0` | `npm install @aws-sdk/client-sns @aws-sdk/client-sqs` |
| **GCP** | `@google-cloud/pubsub` | `^4.11.0` | `npm install @google-cloud/pubsub` |
| **Azure** | `@azure/service-bus`<br/>`@azure/eventgrid`<br/>`@azure/event-hubs`<br/>`@azure/identity` | `^7.9.5`<br/>`^4.15.0`<br/>`^5.12.2`<br/>`^4.13.1` | `npm install @azure/service-bus @azure/eventgrid @azure/event-hubs @azure/identity` |

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

See the [auto-generated API reference](/-agnostic-cloud/docs/next/api/@agnostic-cloud/pubsub) for full type signatures.

## Error Handling

| Error | When |
|-------|------|
| `AuthError` | Authentication failure |
| `TimeoutError` | Request timed out |
