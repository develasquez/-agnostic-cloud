# @agnostic-cloud/pubsub

Unified pub/sub messaging for AWS SNS/SQS, GCP Pub/Sub, and Azure Service Bus.

## Installation

```bash
npm install @agnostic-cloud/pubsub
```

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
