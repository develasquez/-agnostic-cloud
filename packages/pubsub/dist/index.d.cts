interface CloudConfig {
    cloud?: 'aws' | 'gcp' | 'azure';
    region?: string;
    config?: Record<string, any>;
}
interface PubSubConfig extends CloudConfig {
    azureService?: 'event-grid' | 'event-hubs' | 'service-bus';
}

interface MessagePayload {
    data: Buffer | string;
    attributes?: Record<string, string>;
    orderingKey?: string;
}
interface PublishResult {
    messageId: string;
    sequenceNumber?: string;
}
interface Message {
    id: string;
    data: Buffer;
    attributes: Record<string, string>;
    publishTime: Date;
    deliveryAttempt?: number;
}
type MessageHandler = (message: Message) => Promise<void>;
interface SubscribeOptions {
    maxMessages?: number;
    visibilityTimeout?: number;
}
interface Subscription {
    id: string;
    unsubscribe(): Promise<void>;
}
interface PubSubStrategy {
    publish(topic: string, message: MessagePayload): Promise<PublishResult>;
    subscribe(topic: string, handler: MessageHandler, options?: SubscribeOptions): Promise<Subscription>;
    acknowledge(subscription: Subscription, message: Message): Promise<void>;
}

declare abstract class CloudError extends Error {
    readonly cloud: string;
    readonly service: string;
    readonly operation: string;
    constructor(message: string, cloud: string, service: string, operation: string);
}
declare class CloudNotConfiguredError extends CloudError {
    constructor(cloud: string, service: string);
}
declare class InvalidCloudError extends CloudError {
    constructor(cloud: string, service: string);
}
declare class AuthError extends CloudError {
    constructor(cloud: string, service: string, operation: string, message?: string);
}
declare class TimeoutError extends CloudError {
    constructor(cloud: string, service: string, operation: string);
}
declare class ValidationError extends CloudError {
    constructor(cloud: string, service: string, operation: string, message: string);
}
declare class NotImplementedError extends CloudError {
    constructor(cloud: string, service: string, operation: string);
}

declare function createPubSub(config: PubSubConfig): PubSubStrategy;

export { AuthError, type CloudConfig, CloudError, CloudNotConfiguredError, InvalidCloudError, type Message, type MessageHandler, type MessagePayload, NotImplementedError, type PubSubConfig, type PubSubStrategy, type PublishResult, type SubscribeOptions, type Subscription, TimeoutError, ValidationError, createPubSub };
