/**
 * Cross-cloud object migration demo.
 * Run: npx tsx examples/cross-cloud-migration.ts
 *
 * Copies an object from one cloud provider to another
 * by only changing the config — zero code changes.
 */

import { copyObject } from '@agnostic-cloud/migrate'

async function main() {
  console.log('\n  Cross-cloud migration demo\n')

  // Source: AWS S3
  const sourceConfig = {
    cloud: 'aws' as const,
    region: 'us-east-1',
    config: { maxRetries: 3, baseDelayMs: 100 },
  }

  // Destination: GCP GCS
  const destConfig = {
    cloud: 'gcp' as const,
    config: { maxRetries: 3, baseDelayMs: 100 },
  }

  // URLs use the standard format: scheme://bucket/key
  const sourceUrl = process.env.SOURCE_URL ?? 's3://source-bucket/my-file.txt'
  const destUrl = process.env.DEST_URL ?? 'gs://dest-bucket/my-file.txt'

  console.log(`  From: ${sourceUrl} (${sourceConfig.cloud})`)
  console.log(`  To:   ${destUrl} (${destConfig.cloud})\n`)

  const result = await copyObject(sourceConfig, sourceUrl, destConfig, destUrl)
  console.log(`  ✓ copyObject: ${result.bytesTransferred} bytes transferred`)
  console.log(`    source: ${result.sourceKey}`)
  console.log(`    dest:   ${result.destKey}\n`)

  console.log('  Migration completed successfully.\n')
}

main().catch(err => {
  console.error('  ✗ Error:', err.message)
  process.exit(1)
})
