import { PubSub } from '@google-cloud/pubsub'
import type { PubSubConfig } from './config.js'
import { resolveCloud } from './resolver.js'
import { withRetry } from './retry.js'
import type { PubSubStrategy, MessagePayload, PublishResult, Message, MessageHandler, SubscribeOptions, Subscription } from './interface.js'

export class GcpPubSubStrategy implements PubSubStrategy {
  private client: PubSub
  private project: string
  private retryConfig: { maxRetries: number; baseDelayMs: number }

  constructor(config: PubSubConfig) {
    resolveCloud(config, 'pubsub')
    this.client = new PubSub(config.config)
    this.project = config.config?.['projectId'] as string ?? config.config?.['project'] as string ?? 'unknown'
    this.retryConfig = {
      maxRetries: config.config?.['maxRetries'] as number ?? 3,
      baseDelayMs: config.config?.['baseDelayMs'] as number ?? 100,
    }
  }

  private retry<T>(fn: () => Promise<T>): Promise<T> {
    return withRetry(fn, this.retryConfig)
  }

  async publish(topic: string, message: MessagePayload): Promise<PublishResult> {
    const data = typeof message.data === 'string' ? message.data : message.data.toString('base64')
    const messageId = await this.retry(() => this.client.topic(topic).publishMessage({
      data: Buffer.from(data),
      attributes: message.attributes,
      orderingKey: message.orderingKey,
    }))

    return { messageId }
  }

  async subscribe(topic: string, handler: MessageHandler, options?: SubscribeOptions): Promise<Subscription> {
    const subName = `sub-${topic.split('/').pop()}-${Date.now()}`
    const [subscription] = await this.retry(() => this.client.topic(topic).createSubscription(subName, {
      ackDeadlineSeconds: options?.visibilityTimeout ?? 30,
    }))

    const retry = this.retry.bind(this)

    const poll = () => {
      subscription.on('message', async (message: any) => {
        const msg: Message = {
          id: message.id,
          data: message.data,
          attributes: message.attributes ?? {},
          publishTime: message.publishTime?.toDate() ?? new Date(),
          deliveryAttempt: message.deliveryAttempt,
        }
        await handler(msg)
        message.ack()
      })
    }

    poll()

    return {
      id: subName,
      async unsubscribe() {
        await retry(() => subscription.delete())
      },
    }
  }

  async acknowledge(_subscription: Subscription, _message: Message): Promise<void> {
    // handled via message.ack() in the event handler
  }
}
