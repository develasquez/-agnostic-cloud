# @agnostic-cloud/pubsub

Unified pub/sub messaging for AWS SNS/SQS, GCP Pub/Sub, and Azure Service Bus.

## Installation

```bash
npm install @agnostic-cloud/pubsub
```

> **Note on Peer Dependencies**: Provider SDKs are optional peer dependencies. You only need to install the SDK for the cloud provider(s) you use.

### Supported Cloud Provider SDK Versions

| Cloud Provider | Required SDK Package | Current / Tested Version | Installation Command |
|---|---|---|---|
| **AWS** | `@aws-sdk/client-sns`<br/>`@aws-sdk/client-sqs` | `^3.1095.0`<br/>`^3.1095.0` | `npm install @aws-sdk/client-sns @aws-sdk/client-sqs` |
| **GCP** | `@google-cloud/pubsub` | `^4.11.0` | `npm install @google-cloud/pubsub` |
| **Azure** | `@azure/service-bus`<br/>`@azure/eventgrid`<br/>`@azure/event-hubs`<br/>`@azure/identity` | `^7.9.5`<br/>`^4.15.0`<br/>`^5.12.2`<br/>`^4.13.1` | `npm install @azure/service-bus @azure/eventgrid @azure/event-hubs @azure/identity` |

## Usage

```typescript
import { createPubSub } from '@agnostic-cloud/pubsub'

const pubsub = createPubSub({
  cloud: 'gcp',
  region: 'us-central1',
})

// Publish
const result = await pubsub.publish('my-topic', {
  data: Buffer.from('hello world'),
  attributes: { source: 'api' },
})

// Subscribe
const subscription = await pubsub.subscribe('my-topic', async (message) => {
  console.log('Received:', message.data.toString())
  await pubsub.acknowledge(subscription, message)
})

// Later: unsubscribe
await subscription.unsubscribe()
```

## API

### `createPubSub(config: PubSubConfig): PubSubStrategy`

| Method | Signature |
|--------|-----------|
| `publish` | `(topic, message) => Promise<PublishResult>` |
| `subscribe` | `(topic, handler, options?) => Promise<Subscription>` |
| `acknowledge` | `(subscription, message) => Promise<void>` |

## Configuration

```typescript
interface PubSubConfig {
  cloud?: 'aws' | 'gcp' | 'azure'
  region?: string
  config?: Record<string, any>
  azureService?: 'event-grid' | 'event-hubs' | 'service-bus'
}
```

## Documentation

Full docs: https://develasquez.github.io/-agnostic-cloud/docs/next/packages/pubsub

API reference: https://develasquez.github.io/-agnostic-cloud/docs/next/api/@agnostic-cloud/pubsub
