import { describe, it, expect, beforeAll } from 'vitest'
import type { PubSubConfig } from '../src/config.js'
import { getAwsEndpoint, getGcpEndpoint } from '../../test-helpers/src/index.js'

const GCP_TOPIC = 'test-topic-e2e'
let SNS_TOPIC = 'arn:aws:sns:us-east-1:000000000000:test-topic'

describe('pubsub e2e with floci-gcp', () => {
  beforeAll(async () => {
    const { PubSub } = await import('@google-cloud/pubsub')
    const gcpUrl = new URL(process.env.PUBSUB_EMULATOR_HOST || getGcpEndpoint())
    const client = new PubSub({
      apiEndpoint: gcpUrl.host,
      projectId: process.env.GOOGLE_CLOUD_PROJECT || 'test-project',
    })
    try { await client.createTopic(GCP_TOPIC) } catch { }
  })

  it('should publish a message via createPubSub', async () => {
    const { createPubSub } = await import('../src/index.js')
    const gcpUrl = new URL(process.env.PUBSUB_EMULATOR_HOST || getGcpEndpoint())
    const config: PubSubConfig = {
      cloud: 'gcp',
      region: 'us-east-1',
      config: {
        apiEndpoint: gcpUrl.host,
        projectId: process.env.GOOGLE_CLOUD_PROJECT || 'test-project',
      },
    }
    const pubsub = createPubSub(config)
    const result = await pubsub.publish(GCP_TOPIC, {
      data: 'hello from agnostic-cloud',
      attributes: { source: 'test' },
    })
    expect(result.messageId).toBeDefined()
  })
})

describe('pubsub e2e with floci (aws sns)', () => {
  beforeAll(async () => {
    const { SNSClient, CreateTopicCommand } = await import('@aws-sdk/client-sns')
    const sns = new SNSClient({
      endpoint: process.env.AWS_SNS_ENDPOINT || getAwsEndpoint(),
      region: 'us-east-1',
      credentials: { accessKeyId: 'fake', secretAccessKey: 'fake' },
    })
    const result = await sns.send(new CreateTopicCommand({ Name: 'test-topic' }))
    if (result.TopicArn) SNS_TOPIC = result.TopicArn
    sns.destroy()
  })

  it('should publish a message via createPubSub', async () => {
    const { createPubSub } = await import('../src/index.js')
    const config: PubSubConfig = {
      cloud: 'aws',
      region: 'us-east-1',
      config: {
        endpoint: process.env.AWS_SNS_ENDPOINT || getAwsEndpoint(),
        credentials: { accessKeyId: 'fake', secretAccessKey: 'fake' },
      },
    }
    const pubsub = createPubSub(config)
    const result = await pubsub.publish(SNS_TOPIC, {
      data: 'hello from nimbus',
      attributes: { source: 'test' },
    })
    expect(result.messageId).toBeDefined()
  })
})

describe('pubsub e2e with floci-oci (queue)', () => {
  it('should publish, subscribe, and acknowledge a message via createPubSub', async () => {
    const { createPubSub } = await import('../src/index.js')
    const config: PubSubConfig = {
      cloud: 'oci',
      config: {
        endpoint: process.env.OCI_EMULATOR_ENDPOINT || 'http://localhost:4599',
        compartmentId: 'ocid1.compartment.oc1..fake',
      },
    }
    const pubsub = createPubSub(config)
    const queueName = 'test-queue-e2e'

    const publishResult = await pubsub.publish(queueName, {
      data: 'hello from agnostic-cloud-oci',
      attributes: { source: 'test-oci' },
    })
    expect(publishResult.messageId).toBeDefined()

    const receivedMessages: any[] = []
    const subscription = await pubsub.subscribe(queueName, async (msg) => {
      receivedMessages.push(msg)
    }, { maxMessages: 1 })

    // Wait a brief moment to allow polling and delivery
    await new Promise((resolve) => setTimeout(resolve, 2000))

    expect(receivedMessages.length).toBeGreaterThan(0)
    const msg = receivedMessages[0]
    expect(msg.data.toString()).toBe('hello from agnostic-cloud-oci')
    expect(msg.attributes.source).toBe('test-oci')

    await pubsub.acknowledge(subscription, msg)
    await subscription.unsubscribe()
  })
})

