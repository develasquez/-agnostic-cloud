import * as oci from 'oci-sdk'
import type { PubSubConfig } from './config.js'
import { resolveCloud } from './resolver.js'
import { withRetry } from './retry.js'
import type { PubSubStrategy, MessagePayload, PublishResult, Message, MessageHandler, SubscribeOptions, Subscription } from './interface.js'

export class OciPubSubStrategy implements PubSubStrategy {
  private adminClient: oci.queue.QueueAdminClient
  private queueClient: oci.queue.QueueClient
  private compartmentId: string
  private retryConfig: { maxRetries: number; baseDelayMs: number }
  private queueIdCache = new Map<string, string>()

  constructor(config: PubSubConfig) {
    resolveCloud(config, 'queue')

    const tenancy = config.config?.['tenancy'] || process.env['OCI_TENANCY'] || 'ocid1.tenancy.oc1..fake-tenancy-id'
    const user = config.config?.['user'] || process.env['OCI_USER'] || 'ocid1.user.oc1..fake-user-id'
    const fingerprint = config.config?.['fingerprint'] || process.env['OCI_FINGERPRINT'] || '20:3b:97:13:55:1c:cf:0d:86:14:ee:74:97:bc:fc:a1'
    const privateKey = config.config?.['privateKey'] || process.env['OCI_PRIVATE_KEY'] || `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA0I9R0ZO3gnewHu6qeeYnJ0rnqNc851JBKoe92V+nvqB83S8H
gS6j5UzHm3QY4ShKkin02EsT2hXpZz4YI7hjmSw2SVnI68nyOW4NtjUz/cGYSl3F
8udd8v3oIoRoN7yeyhkSHzmf4mGL2ngK3lltUZETVbgPoQgKfckuGzN/drtJ1gyc
n3pjZCiKj8u2lt1hw1OkjkrsrShSvNothyY5dRgIQBT0Fj0IH9sb7Zo5kGl1woNC
MrcySBE/SR/IijyBozLvva5q7Tp/sS4qwnAboJKM4DavmSYmkempXnHGp9ulVSIx
qtsuj+eQFZ0pT+oeWA2kUlaesCJW+m+C56my1QIDAQABAoIBACVEPsP6p7NV7LAS
SH8Aq6VfQpbOYxEYhxFw8PELIR+0cKtbMHWaXmnmNtKlw55UA0Mr4RbXD4SMHsk2
dLzJQW7I0ih4NSlAzBoL+sJArnoc4jgDmo/lXMnDKfwk+bRf7WXCZhUTSGj8si9G
/PYvN5P4HuLVwWEuXSWN0cHFiXSu/vyBXiCbtZuxtHYVxwyU8EZS3KfmFM5SqhRs
jEbExA03GFSSMtrNv2Q/1NN3FNsuw+aC+4u4nvudZfcWRPmBLQq3bLyC8YzUyrwu
v25lD+jmSuAxGbFv4AN7dqeVU0Noqkq5+WyYDMpJFu7E5NjubSNKqNYvVoI6Cfmy
+VnqN8ECgYEA8sK6N8w7Phk5b+NQcAQRTUMIvK/PcqjIwxDgKYMQwx/TAPlG07hF
JLeulutaPVhT/xzUuL5IqZ8nycFn5FMc476ZCHNmTBCZxrJCJhOWDt7SFGMr1S1c
VJF+vbKhvWYatcPZsQQ8IrcTHBX52LkozY02WQwhyiUiaZzxAk0H9HUCgYEA2+8a
ERlhImX1O5QoAVf1lfct3T0zHPgQ/CdYRlWfl9iSp6Sp3z5xYszkbqOHig59vL+c
dPS3wHnb/bvUQ+0v703+EgHlnWK8Ysys6jIU8meSaj8cioIjs6aw2Zz4Ov7tTwZU
pJPVIdp42hdcUc5Ufcx+87m28OflVEfBOF4heOECgYBaz8VhgiDXRhBabqp0fNEM
Gft2uj3cIo+XiQSSAtmOZKVGQ/ne0Zvr9Fp3Umtbb2Ncl6hrw6Li8QqtSpBWtVCl
UXNl2eV2pu8fiSd9nu4PegMUZVTMVj+n0xWaWOxwMXXkcPNKaM8mHV4kr4PbMsi0
vBKMlSE+wU1yPKdbuP000QKBgFlxszszBCL2LjbNuTtap2EXBosMYaYtaNLzuV3Z
Yq9hf7s4J3HINlrFEz2/uda2sAI8NwgFollf9c0KP3hklPMQ1/xA0z4fspfHv6b7
OTOgVZZqFlRqOtTMPO4zfWyY0rAp1fCcwrgi3rVrfLs0W35R1WuPosv0s3qEOBuR
hLFhAoGBANbYVrJNN1sJPT8x0CoE9M6Tjpxz8Pne1aKS9wCkTZa4Ja79N26HaE9k
a2zag3eyR0WREGmxsZEOqEmOh+LTeVyY3u8tTNUTAxTfaDszQgvgtKRqHY9HsWxV
HGq6/pzd9AJzylv1kGDbtZjRCeUc/aEzTIVapkl4HZ4hy3j5apE0
-----END RSA PRIVATE KEY-----`
    const region = config.region || process.env['OCI_REGION'] || 'us-ashburn-1'

    const regionObj = oci.common.Region.fromRegionId(region)
    const provider = new oci.SimpleAuthenticationDetailsProvider(
      tenancy,
      user,
      fingerprint,
      privateKey,
      null,
      regionObj
    )

    this.compartmentId = config.config?.['compartmentId'] || process.env['OCI_COMPARTMENT_ID'] || 'ocid1.compartment.oc1..fake'

    this.adminClient = new oci.queue.QueueAdminClient({ authenticationDetailsProvider: provider })
    this.queueClient = new oci.queue.QueueClient({ authenticationDetailsProvider: provider })

    const endpoint = config.config?.['endpoint'] || process.env['OCI_EMULATOR_ENDPOINT'] || 'http://localhost:4599'
    if (endpoint) {
      this.adminClient.endpoint = endpoint
      this.queueClient.endpoint = endpoint
    }

    this.retryConfig = {
      maxRetries: config.config?.['maxRetries'] as number ?? 3,
      baseDelayMs: config.config?.['baseDelayMs'] as number ?? 100,
    }
  }

  private async resolveQueueId(topic: string): Promise<string> {
    if (topic.startsWith('ocid1.')) {
      return topic
    }
    if (this.queueIdCache.has(topic)) {
      return this.queueIdCache.get(topic)!
    }

    const response = await withRetry(() => this.adminClient.listQueues({
      compartmentId: this.compartmentId,
      displayName: topic,
    }), this.retryConfig)

    const queue = response.queueCollection.items[0]
    if (!queue) {
      throw new Error(`Queue not found: ${topic}`)
    }

    this.queueIdCache.set(topic, queue.id)
    return queue.id
  }

  async publish(topic: string, message: MessagePayload): Promise<PublishResult> {
    const queueId = await this.resolveQueueId(topic)
    const content = typeof message.data === 'string' ? message.data : message.data.toString()

    const result = await withRetry(() => this.queueClient.putMessages({
      queueId,
      putMessagesDetails: {
        messages: [{
          content,
          metadata: message.attributes ? { channelId: '', customProperties: message.attributes } : undefined,
        }]
      }
    }), this.retryConfig)

    const firstMsg = result.putMessages.messages[0]
    if (!firstMsg) {
      throw new Error(`Failed to publish message to OCI queue: ${topic}`)
    }

    return { messageId: String(firstMsg.id) }
  }

  async subscribe(topic: string, handler: MessageHandler, options?: SubscribeOptions): Promise<Subscription> {
    const queueId = await this.resolveQueueId(topic)
    let active = true

    const poll = async () => {
      while (active) {
        try {
          const result = await this.queueClient.getMessages({
            queueId,
            limit: options?.maxMessages ?? 10,
            visibilityInSeconds: options?.visibilityTimeout ?? 30,
            timeoutInSeconds: 5,
          })

          if (!active) break

          if (result.getMessages && result.getMessages.messages && result.getMessages.messages.length > 0) {
            for (const msg of result.getMessages.messages) {
              if (!active) break

              const message: Message = {
                id: String(msg.id),
                data: Buffer.from(msg.content),
                attributes: msg.metadata?.customProperties ?? {},
                publishTime: msg.createdAt ? new Date(msg.createdAt) : new Date(),
                deliveryAttempt: msg.deliveryCount,
              }
              ;(message as any).receipt = msg.receipt

              await handler(message)
            }
          }
        } catch (err) {
          // Wait a second before polling again to prevent throttling or tight loops
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      }
    }

    poll()

    const subscription: Subscription = {
      id: queueId,
      unsubscribe: async () => {
        active = false
      }
    }

    return subscription
  }

  async acknowledge(subscription: Subscription, message: Message): Promise<void> {
    const queueId = subscription.id
    const messageReceipt = (message as any).receipt
    if (messageReceipt) {
      await withRetry(() => this.queueClient.deleteMessage({
        queueId,
        messageReceipt,
      }), this.retryConfig)
    }
  }
}
