export interface MessagePayload {
  data: Buffer | string
  attributes?: Record<string, string>
  orderingKey?: string
}

export interface PublishResult {
  messageId: string
  sequenceNumber?: string
}

export interface Message {
  id: string
  data: Buffer
  attributes: Record<string, string>
  publishTime: Date
  deliveryAttempt?: number
}

export type MessageHandler = (message: Message) => Promise<void>

export interface SubscribeOptions {
  maxMessages?: number
  visibilityTimeout?: number
}

export interface Subscription {
  id: string
  unsubscribe(): Promise<void>
}

export interface PubSubStrategy {
  publish(topic: string, message: MessagePayload): Promise<PublishResult>
  subscribe(topic: string, handler: MessageHandler, options?: SubscribeOptions): Promise<Subscription>
  acknowledge(subscription: Subscription, message: Message): Promise<void>
}
