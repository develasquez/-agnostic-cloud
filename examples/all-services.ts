/**
 * Comprehensive cross-cloud demo across all 6 service categories.
 * Run: CLOUD_PROVIDER=aws npx tsx examples/all-services.ts
 *
 * Change CLOUD_PROVIDER to 'gcp' or 'azure' to run the exact same
 * operations against a different cloud provider.
 *
 * This demonstrates the core value proposition:
 *   "zero-code-change cloud migration by swapping environment variables"
 */

import { createStorage } from '@agnostic-cloud/storage'
import { createSecrets } from '@agnostic-cloud/secrets'
import { createCache } from '@agnostic-cloud/cache'
import { createKms } from '@agnostic-cloud/kms'
import { createPubSub } from '@agnostic-cloud/pubsub'
import { createNoSql } from '@agnostic-cloud/nosql'

const cloud = (process.env.CLOUD_PROVIDER as 'aws' | 'gcp' | 'azure') ?? 'aws'

const region = process.env.AWS_REGION ?? 'us-east-1'
const project = process.env.GOOGLE_PROJECT_ID ?? 'my-project'

async function main() {
  console.log(`\n  🚀 agnostic-cloud demo — provider: ${cloud}\n`)

  // STORAGE
  {
    const storage = createStorage({ cloud, region })
    const bucket = `demo-bucket-${cloud}`
    await storage.putObject(bucket, 'test.txt', 'Hello!')
    const obj = await storage.getObject(bucket, 'test.txt')
    console.log(`  📦 Storage    ${cloud}: "${obj.data.toString()}"`)
  }

  // SECRETS
  {
    const secrets = createSecrets({ cloud, region, config: { projectId: project } })
    const name = `demo-secret-${Date.now()}`
    await secrets.createSecret(name, 'supersecret')
    const val = await secrets.getSecret(name)
    console.log(`  🔐 Secrets    ${cloud}: "${val.value}"`)
  }

  // CACHE (Redis — unified protocol)
  {
    const cache = createCache({ cloud, region })
    await cache.set('demo-key', 'cached-value')
    const val = await cache.get('demo-key')
    console.log(`  ⚡ Cache       ${cloud}: "${val}"`)
  }

  // KMS
  {
    const kms = createKms({ cloud, region, config: { projectId: project } })
    const key = await kms.createKey(`demo-key-${Date.now()}`)
    const encrypted = await kms.encrypt(key.keyId, 'sensitive-data')
    const decrypted = await kms.decrypt(key.keyId, encrypted.ciphertext)
    console.log(`  🔑 KMS         ${cloud}: "${decrypted.plaintext.toString()}"`)
  }

  // PUB/SUB
  {
    const pubsub = createPubSub({ cloud, region, config: { projectId: project } })
    const result = await pubsub.publish('demo-topic', {
      data: 'event-data',
      attributes: { source: 'demo' },
    })
    console.log(`  📨 Pub/Sub     ${cloud}: messageId="${result.messageId}"`)
  }

  // NOSQL
  {
    const db = createNoSql({ cloud, region, config: { databaseId: 'demo-db' } })
    await db.putItem('users', 'user-1', { name: 'Alice', email: 'alice@example.com' })
    const user = await db.getItem('users', 'user-1')
    console.log(`  🗄️  NoSQL       ${cloud}: "${user?.name}"`)
  }

  console.log(`\n  ✅ All ${cloud} operations completed.\n`)
}

main().catch(err => {
  console.error(`  ❌ ${cloud} error:`, err instanceof Error ? err.message : err)
  process.exit(1)
})
