"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AuthError: () => AuthError,
  CloudError: () => CloudError,
  CloudNotConfiguredError: () => CloudNotConfiguredError,
  InvalidCloudError: () => InvalidCloudError,
  NotImplementedError: () => NotImplementedError,
  TimeoutError: () => TimeoutError,
  ValidationError: () => ValidationError,
  createPubSub: () => createPubSub
});
module.exports = __toCommonJS(index_exports);

// src/errors.ts
var CloudError = class extends Error {
  constructor(message, cloud, service, operation) {
    super(message);
    this.cloud = cloud;
    this.service = service;
    this.operation = operation;
    this.name = this.constructor.name;
  }
  cloud;
  service;
  operation;
};
var CloudNotConfiguredError = class extends CloudError {
  constructor(cloud, service) {
    super(`Cloud not configured: ${cloud}`, cloud, service, "init");
  }
};
var InvalidCloudError = class extends CloudError {
  constructor(cloud, service) {
    super(`Invalid cloud provider: ${cloud}. Must be 'aws', 'gcp', or 'azure'`, cloud, service, "init");
  }
};
var AuthError = class extends CloudError {
  constructor(cloud, service, operation, message) {
    super(message ?? `Authentication failed for ${service}`, cloud, service, operation);
  }
};
var TimeoutError = class extends CloudError {
  constructor(cloud, service, operation) {
    super(`Operation timed out: ${operation}`, cloud, service, operation);
  }
};
var ValidationError = class extends CloudError {
  constructor(cloud, service, operation, message) {
    super(message, cloud, service, operation);
  }
};
var NotImplementedError = class extends CloudError {
  constructor(cloud, service, operation) {
    super(`Operation not implemented for ${cloud} ${service}: ${operation}`, cloud, service, operation);
  }
};

// src/resolver.ts
function resolveCloud(config, service) {
  if (config.cloud) {
    if (config.cloud !== "aws" && config.cloud !== "gcp" && config.cloud !== "azure") {
      throw new InvalidCloudError(config.cloud, service);
    }
    return config.cloud;
  }
  const env = process.env["CLOUD_PROVIDER"]?.toLowerCase();
  if (env === "aws" || env === "gcp" || env === "azure") {
    return env;
  }
  throw new CloudNotConfiguredError(config.cloud ?? "undefined", service);
}

// src/sns.strategy.ts
var import_client_sns = require("@aws-sdk/client-sns");
var import_client_sqs = require("@aws-sdk/client-sqs");

// src/retry.ts
async function withRetry(fn, options) {
  const maxRetries = options?.maxRetries ?? 3;
  const baseDelayMs = options?.baseDelayMs ?? 100;
  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < maxRetries) {
        const delay = baseDelayMs * Math.pow(2, attempt) + Math.random() * baseDelayMs;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
}

// src/sns.strategy.ts
var SnsStrategy = class {
  sns;
  sqs;
  queueUrls = /* @__PURE__ */ new Map();
  retryConfig;
  constructor(config) {
    resolveCloud(config, "sns");
    const region = config.region ?? "us-east-1";
    this.sns = new import_client_sns.SNSClient({ region, ...config.config });
    this.sqs = new import_client_sqs.SQSClient({ region, ...config.config });
    this.retryConfig = {
      maxRetries: config.config?.["maxRetries"] ?? 3,
      baseDelayMs: config.config?.["baseDelayMs"] ?? 100
    };
  }
  async publish(topic, message) {
    const result = await withRetry(() => this.sns.send(new import_client_sns.PublishCommand({
      TopicArn: topic,
      Message: typeof message.data === "string" ? message.data : message.data.toString(),
      MessageAttributes: message.attributes ? Object.fromEntries(
        Object.entries(message.attributes).map(([k, v]) => [k, { DataType: "String", StringValue: v }])
      ) : void 0
    })), this.retryConfig);
    return { messageId: result.MessageId ?? "" };
  }
  async subscribe(topic, handler, options) {
    const queueName = `sub-${topic.split(":").pop()}-${Date.now()}`;
    const id = `${topic}:${queueName}`;
    const urlResult = await withRetry(() => this.sqs.send(new import_client_sqs.GetQueueUrlCommand({ QueueName: queueName })), this.retryConfig);
    const queueUrl = urlResult.QueueUrl;
    const sqs = this.sqs;
    const poll = async () => {
      while (true) {
        const result = await sqs.send(new import_client_sqs.ReceiveMessageCommand({
          QueueUrl: queueUrl,
          MaxNumberOfMessages: options?.maxMessages ?? 10,
          VisibilityTimeout: options?.visibilityTimeout ?? 30,
          WaitTimeSeconds: 20
        }));
        if (!result.Messages) continue;
        for (const msg of result.Messages) {
          const message = {
            id: msg.MessageId ?? "",
            data: Buffer.from(msg.Body ?? ""),
            attributes: msg.MessageAttributes ? Object.fromEntries(
              Object.entries(msg.MessageAttributes).map(([k, v]) => [k, v.StringValue ?? ""])
            ) : {},
            publishTime: /* @__PURE__ */ new Date()
          };
          await handler(message);
          await sqs.send(new import_client_sqs.DeleteMessageCommand({
            QueueUrl: queueUrl,
            ReceiptHandle: msg.ReceiptHandle
          }));
        }
      }
    };
    poll();
    return {
      id,
      async unsubscribe() {
      }
    };
  }
  async acknowledge(_subscription, _message) {
  }
};

// src/gcp.strategy.ts
var import_pubsub = require("@google-cloud/pubsub");
var GcpPubSubStrategy = class {
  client;
  project;
  retryConfig;
  constructor(config) {
    resolveCloud(config, "pubsub");
    this.client = new import_pubsub.PubSub(config.config);
    this.project = config.config?.["projectId"] ?? config.config?.["project"] ?? "unknown";
    this.retryConfig = {
      maxRetries: config.config?.["maxRetries"] ?? 3,
      baseDelayMs: config.config?.["baseDelayMs"] ?? 100
    };
  }
  retry(fn) {
    return withRetry(fn, this.retryConfig);
  }
  async publish(topic, message) {
    const data = typeof message.data === "string" ? message.data : message.data.toString("base64");
    const messageId = await this.retry(() => this.client.topic(topic).publishMessage({
      data: Buffer.from(data),
      attributes: message.attributes,
      orderingKey: message.orderingKey
    }));
    return { messageId };
  }
  async subscribe(topic, handler, options) {
    const subName = `sub-${topic.split("/").pop()}-${Date.now()}`;
    const [subscription] = await this.retry(() => this.client.topic(topic).createSubscription(subName, {
      ackDeadlineSeconds: options?.visibilityTimeout ?? 30
    }));
    const retry = this.retry.bind(this);
    const poll = () => {
      subscription.on("message", async (message) => {
        const msg = {
          id: message.id,
          data: message.data,
          attributes: message.attributes ?? {},
          publishTime: message.publishTime?.toDate() ?? /* @__PURE__ */ new Date(),
          deliveryAttempt: message.deliveryAttempt
        };
        await handler(msg);
        message.ack();
      });
    };
    poll();
    return {
      id: subName,
      async unsubscribe() {
        await retry(() => subscription.delete());
      }
    };
  }
  async acknowledge(_subscription, _message) {
  }
};

// src/azure.strategy.ts
var import_service_bus = require("@azure/service-bus");
var AzureServiceBusStrategy = class {
  client;
  retryConfig;
  constructor(config) {
    resolveCloud(config, "servicebus");
    const connectionString = config.config?.["connectionString"];
    this.client = new import_service_bus.ServiceBusClient(connectionString, config.config);
    this.retryConfig = {
      maxRetries: config.config?.["maxRetries"] ?? 3,
      baseDelayMs: config.config?.["baseDelayMs"] ?? 100
    };
  }
  retry(fn) {
    return withRetry(fn, this.retryConfig);
  }
  async publish(topic, message) {
    const sender = this.client.createSender(topic);
    const batch = await this.retry(() => sender.createMessageBatch());
    batch.tryAddMessage({
      body: typeof message.data === "string" ? message.data : message.data.toString(),
      applicationProperties: message.attributes
    });
    await this.retry(() => sender.sendMessages(batch));
    await sender.close();
    return { messageId: `${Date.now()}` };
  }
  async subscribe(topic, handler, options) {
    const subName = options?.["subscriptionName"] ?? `sub-${Date.now()}`;
    const receiver = this.client.createReceiver(topic, subName, {
      receiveMode: "peekLock",
      maxAutoLockRenewalDurationInMs: (options?.visibilityTimeout ?? 30) * 1e3
    });
    const poll = () => {
      receiver.subscribe({
        processMessage: async (message) => {
          const msg = {
            id: String(message.messageId),
            data: Buffer.from(JSON.stringify(message.body)),
            attributes: message.applicationProperties ?? {},
            publishTime: message.enqueuedTimeUtc ?? /* @__PURE__ */ new Date()
          };
          await handler(msg);
          await receiver.completeMessage(message);
        },
        processError: async () => {
        }
      });
    };
    poll();
    return {
      id: subName,
      async unsubscribe() {
        await receiver.close();
      }
    };
  }
  async acknowledge(_subscription, _message) {
  }
};

// src/index.ts
var strategyRegistry = {
  aws: SnsStrategy,
  gcp: GcpPubSubStrategy,
  azure: AzureServiceBusStrategy
};
function createPubSub(config) {
  const cloud = resolveCloud(config, "pubsub");
  const Strategy = strategyRegistry[cloud];
  if (!Strategy) throw new InvalidCloudError(cloud, "pubsub");
  return new Strategy(config);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthError,
  CloudError,
  CloudNotConfiguredError,
  InvalidCloudError,
  NotImplementedError,
  TimeoutError,
  ValidationError,
  createPubSub
});
//# sourceMappingURL=index.cjs.map