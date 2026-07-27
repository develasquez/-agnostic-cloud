import { SNSClient, PublishCommand } from '@aws-sdk/client-sns'
import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand, GetQueueUrlCommand } from '@aws-sdk/client-sqs'
import type { PubSubConfig } from './config.js'
import { resolveCloud } from './resolver.js'
import { withRetry } from './retry.js'
import type { PubSubStrategy, MessagePayload, PublishResult, Message, MessageHandler, SubscribeOptions, Subscription } from './interface.js'

export class SnsStrategy implements PubSubStrategy {
  private sns: SNSClient
  private sqs: SQSClient
  private queueUrls = new Map<string, string>()
  private retryConfig: { maxRetries: number; baseDelayMs: number }

  constructor(config: PubSubConfig) {
    resolveCloud(config, 'sns')
    const region = config.region ?? 'us-east-1'
    this.sns = new SNSClient({ region, ...config.config })
    this.sqs = new SQSClient({ region, ...config.config })
    this.retryConfig = {
      maxRetries: config.config?.['maxRetries'] as number ?? 3,
      baseDelayMs: config.config?.['baseDelayMs'] as number ?? 100,
    }
  }

  async publish(topic: string, message: MessagePayload): Promise<PublishResult> {
    const result = await withRetry(() => this.sns.send(new PublishCommand({
      TopicArn: topic,
      Message: typeof message.data === 'string' ? message.data : message.data.toString(),
      MessageAttributes: message.attributes
        ? Object.fromEntries(
            Object.entries(message.attributes).map(([k, v]) => [k, { DataType: 'String', StringValue: v }])
          )
        : undefined,
    })), this.retryConfig)

    return { messageId: result.MessageId ?? '' }
  }

  async subscribe(topic: string, handler: MessageHandler, options?: SubscribeOptions): Promise<Subscription> {
    const queueName = `sub-${topic.split(':').pop()}-${Date.now()}`
    const id = `${topic}:${queueName}`

    const urlResult = await withRetry(() => this.sqs.send(new GetQueueUrlCommand({ QueueName: queueName })), this.retryConfig)
    const queueUrl = urlResult.QueueUrl!
    const sqs = this.sqs

    const poll = async () => {
      while (true) {
        const result = await sqs.send(new ReceiveMessageCommand({
          QueueUrl: queueUrl,
          MaxNumberOfMessages: options?.maxMessages ?? 10,
          VisibilityTimeout: options?.visibilityTimeout ?? 30,
          WaitTimeSeconds: 20,
        }))

        if (!result.Messages) continue

        for (const msg of result.Messages) {
          const message: Message = {
            id: msg.MessageId ?? '',
            data: Buffer.from(msg.Body ?? ''),
            attributes: msg.MessageAttributes
              ? Object.fromEntries(
                  Object.entries(msg.MessageAttributes).map(([k, v]) => [k, (v as any).StringValue ?? ''])
                )
              : {},
            publishTime: new Date(),
          }

          await handler(message)
          await sqs.send(new DeleteMessageCommand({
            QueueUrl: queueUrl,
            ReceiptHandle: msg.ReceiptHandle!,
          }))
        }
      }
    }

    poll()

    return {
      id,
      async unsubscribe() {
        // SQS queue would be deleted here in production
      },
    }
  }

  async acknowledge(_subscription: Subscription, _message: Message): Promise<void> {
    // handled inline in the poll loop
  }
}
