/**
 * Cross-cloud storage demo.
 * Run: CLOUD_PROVIDER=aws npx tsx examples/storage-demo.ts
 * Change CLOUD_PROVIDER to gcp or azure — same code, different cloud.
 *
 * Requires cloud credentials or local emulators (docker-compose.yml).
 */

import { createStorage } from '@agnostic-cloud/storage'
import type { StorageConfig } from '@agnostic-cloud/storage'

const cloud = (process.env.CLOUD_PROVIDER as 'aws' | 'gcp' | 'azure') ?? 'aws'

const config: StorageConfig = {
  cloud,
  region: process.env.AWS_REGION ?? 'us-east-1',
  config: {
    maxRetries: 3,
    baseDelayMs: 100,
    // cloud-specific config passthrough:
    // aws: { endpoint: 'http://localhost:9000', forcePathStyle: true }
    // gcp: { projectId: 'my-project' }
    // azure: { connectionString: '...' }
  },
}

async function main() {
  const storage = createStorage(config)
  const bucket = process.env.BUCKET ?? `agnostic-demo-${Date.now()}`
  const key = 'hello.txt'

  console.log(`\n  Cloud: ${cloud}`)
  console.log(`  Bucket: ${bucket}`)
  console.log(`  Key: ${key}\n`)

  await storage.putObject(bucket, key, 'Hello from agnostic-cloud!')
  console.log('  ✓ putObject')

  const result = await storage.getObject(bucket, key)
  console.log(`  ✓ getObject: "${result.data.toString()}"`)

  const exists = await storage.existsObject(bucket, key)
  console.log(`  ✓ existsObject: ${exists}`)

  const listed = await storage.listObjects(bucket)
  console.log(`  ✓ listObjects: ${listed.objects.length} objects`)

  await storage.deleteObject(bucket, key)
  console.log('  ✓ deleteObject')

  console.log('\n  All operations completed successfully.\n')
}

main().catch(err => {
  console.error('  ✗ Error:', err.message)
  process.exit(1)
})
