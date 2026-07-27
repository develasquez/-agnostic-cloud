/**
 * Cross-cloud secrets demo.
 * Run: CLOUD_PROVIDER=aws npx tsx examples/secrets-demo.ts
 * Change CLOUD_PROVIDER to gcp or azure — same code, different cloud.
 */

import { createSecrets } from '@agnostic-cloud/secrets'
import type { SecretsConfig } from '@agnostic-cloud/secrets'

const cloud = (process.env.CLOUD_PROVIDER as 'aws' | 'gcp' | 'azure') ?? 'aws'

const config: SecretsConfig = {
  cloud,
  region: 'us-east-1',
}

async function main() {
  const secrets = createSecrets(config)
  const name = `agnostic-secret-${Date.now()}`

  console.log(`\n  Cloud: ${cloud}`)
  console.log(`  Secret name: ${name}\n`)

  const created = await secrets.createSecret(name, 'my-secret-value', {
    description: 'agnostic-cloud demo',
    tags: { demo: 'true' },
  })
  console.log(`  ✓ createSecret: ${created.arn}`)

  const value = await secrets.getSecret(name)
  console.log(`  ✓ getSecret: "${value.value}"`)

  const updated = await secrets.updateSecret(name, 'updated-value')
  console.log(`  ✓ updateSecret`)

  const list = await secrets.listSecrets()
  console.log(`  ✓ listSecrets: ${list.secrets.length} secrets`)

  await secrets.deleteSecret(name, { forceDelete: true })
  console.log('  ✓ deleteSecret')

  console.log('\n  All operations completed successfully.\n')
}

main().catch(err => {
  console.error('  ✗ Error:', err.message)
  process.exit(1)
})
