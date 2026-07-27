import { ServiceBusClient } from '@azure/service-bus'
import type { PubSubConfig } from './config.js'
import { resolveCloud } from './resolver.js'
import { withRetry } from './retry.js'
import type { PubSubStrategy, MessagePayload, PublishResult, Message, MessageHandler, SubscribeOptions, Subscription } from './interface.js'

export class AzureServiceBusStrategy implements PubSubStrategy {
  private client: ServiceBusClient
  private retryConfig: { maxRetries: number; baseDelayMs: number }

  constructor(config: PubSubConfig) {
    resolveCloud(config, 'servicebus')
    const connectionString = config.config?.['connectionString'] as string
    this.client = new ServiceBusClient(connectionString, config.config)
    this.retryConfig = {
      maxRetries: config.config?.['maxRetries'] as number ?? 3,
      baseDelayMs: config.config?.['baseDelayMs'] as number ?? 100,
    }
  }

  private retry<T>(fn: () => Promise<T>): Promise<T> {
    return withRetry(fn, this.retryConfig)
  }

  async publish(topic: string, message: MessagePayload): Promise<PublishResult> {
    const sender = this.client.createSender(topic)
    const batch = await this.retry(() => sender.createMessageBatch())

    batch.tryAddMessage({
      body: typeof message.data === 'string' ? message.data : message.data.toString(),
      applicationProperties: message.attributes,
    })

    await this.retry(() => sender.sendMessages(batch))
    await sender.close()

    return { messageId: `${Date.now()}` }
  }

  async subscribe(topic: string, handler: MessageHandler, options?: SubscribeOptions): Promise<Subscription> {
    const subName = (options as any)?.['subscriptionName'] as string ?? `sub-${Date.now()}`
    const receiver = this.client.createReceiver(topic, subName, {
      receiveMode: 'peekLock',
      maxAutoLockRenewalDurationInMs: (options?.visibilityTimeout ?? 30) * 1000,
    })

    const poll = () => {
      receiver.subscribe({
        processMessage: async (message) => {
          const msg: Message = {
            id: String(message.messageId),
            data: Buffer.from(JSON.stringify(message.body)),
            attributes: message.applicationProperties as Record<string, string> ?? {},
            publishTime: message.enqueuedTimeUtc ?? new Date(),
          }
          await handler(msg)
          await receiver.completeMessage(message)
        },
        processError: async () => {},
      })
    }

    poll()

    return {
      id: subName,
      async unsubscribe() {
        await receiver.close()
      },
    }
  }

  async acknowledge(_subscription: Subscription, _message: Message): Promise<void> {
    // handled via receiver.completeMessage in the handler
  }
}
