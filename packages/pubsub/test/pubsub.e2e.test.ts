import { describe, it, expect, beforeAll } from 'vitest'
import type { PubSubConfig } from '../src/config.js'

const GCP_TOPIC = 'test-topic-e2e'
let SNS_TOPIC = 'arn:aws:sns:us-east-1:000000000000:test-topic'

describe.runIf(process.env.PUBSUB_EMULATOR_HOST)('pubsub e2e with gcp-emulator', () => {
  beforeAll(async () => {
    const { PubSub } = await import('@google-cloud/pubsub')
    const client = new PubSub({
      apiEndpoint: process.env.PUBSUB_EMULATOR_HOST,
      projectId: process.env.GOOGLE_CLOUD_PROJECT || 'test-project',
    })
    try { await client.createTopic(GCP_TOPIC) } catch { }
  })

  it('should publish a message via createPubSub', async () => {
    const { createPubSub } = await import('../src/index.js')
    const config: PubSubConfig = {
      cloud: 'gcp',
      region: 'us-east-1',
      config: {
        apiEndpoint: process.env.PUBSUB_EMULATOR_HOST,
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

describe.runIf(process.env.AWS_SNS_ENDPOINT)('pubsub e2e with nimbus (aws sns)', () => {
  beforeAll(async () => {
    const { SNSClient, CreateTopicCommand } = await import('@aws-sdk/client-sns')
    const sns = new SNSClient({
      endpoint: process.env.AWS_SNS_ENDPOINT,
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
        endpoint: process.env.AWS_SNS_ENDPOINT,
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
