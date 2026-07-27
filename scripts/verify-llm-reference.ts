import { execSync } from 'child_process'
import { readFileSync, existsSync } from 'fs'
import { resolve, relative } from 'path'

const DOCS_DIR = resolve(import.meta.dirname, '..', 'docs')
const TYPEDOC_JSON = resolve(DOCS_DIR, 'typedoc.json')
const PACKAGES_DIR = resolve(import.meta.dirname, '..', 'packages')

const EXPECTED_SYMBOLS: Record<string, string[]> = {
  '@agnostic-cloud/storage': [
    'createStorage', 'StorageStrategy', 'StorageConfig',
    'PutObjectResult', 'GetObjectResult', 'ListObjectsResult',
    'ObjectNotFoundError', 'AuthError', 'TimeoutError',
  ],
  '@agnostic-cloud/secrets': [
    'createSecrets', 'SecretsStrategy', 'SecretsConfig',
    'SecretValue', 'SecretMetadata', 'ListSecretsResult',
    'SecretNotFoundError', 'AuthError',
  ],
  '@agnostic-cloud/cache': [
    'createCache', 'CacheStrategy', 'CacheConfig',
    'SetOptions', 'AuthError', 'TimeoutError',
  ],
  '@agnostic-cloud/kms': [
    'createKms', 'KmsStrategy', 'KmsConfig',
    'EncryptResult', 'DecryptResult', 'KeyMetadata',
    'EncryptionContext', 'CreateKeyOptions',
    'AuthError', 'TimeoutError',
  ],
  '@agnostic-cloud/pubsub': [
    'createPubSub', 'PubSubStrategy', 'PubSubConfig',
    'PublishResult', 'Subscription',
    'AuthError', 'TimeoutError',
  ],
  '@agnostic-cloud/nosql': [
    'createNoSql', 'NoSqlStrategy', 'NoSqlConfig',
    'Document', 'QueryResult', 'QueryFilter', 'FilterOperator', 'QueryOptions',
    'AuthError', 'TimeoutError',
  ],
  '@agnostic-cloud/migrate': [
    'copyObject', 'verifyIntegrity',
    'CopyResult', 'HashAlgorithm',
  ],
}

const SHARED_ERRORS = ['CloudError', 'CloudNotConfiguredError', 'InvalidCloudError', 'NotImplementedError', 'ValidationError']

function generateTypedocJson(): void {
  const entryPoints = [
    'packages/storage/src/index.ts',
    'packages/secrets/src/index.ts',
    'packages/cache/src/index.ts',
    'packages/kms/src/index.ts',
    'packages/pubsub/src/index.ts',
    'packages/nosql/src/index.ts',
    'packages/migrate/src/index.ts',
  ]

  const args = [
    'npx typedoc',
    ...entryPoints.map((p) => `"${resolve(import.meta.dirname, '..', p)}"`),
    `--json "${TYPEDOC_JSON}"`,
      `--tsconfig "${resolve(import.meta.dirname, '..', 'tsconfig.typedoc.json')}"`,
    '--skipErrorChecking',
  ]

  execSync(args.join(' '), { cwd: DOCS_DIR, stdio: 'pipe' })
}

function collectExportedNames(json: any): Set<string> {
  const names = new Set<string>()

  function walk(children: any[] | undefined): void {
    if (!children) return
    for (const child of children) {
      if (child.kindString === 'Function' || child.kindString === 'Interface' || child.kindString === 'Class' || child.kindString === 'TypeAlias') {
        if (child.flags?.isExported) {
          names.add(child.name)
        }
      }
      walk(child.children)
      if (child.groups) {
        for (const group of child.groups) {
          if (group.title === 'Functions' || group.title === 'Classes' || group.title === 'Interfaces' || group.title === 'Type Aliases') {
            for (const childOfGroup of group.children) {
              const found = findChildById(json, childOfGroup)
              if (found?.name) names.add(found.name)
            }
          }
        }
      }
    }
  }

  walk(json.children)
  return names
}

function findChildById(json: any, id: number): any | undefined {
  function search(children: any[] | undefined): any | undefined {
    if (!children) return undefined
    for (const child of children) {
      if (child.id === id) return child
      const found = search(child.children)
      if (found) return found
    }
    return undefined
  }
  return search(json.children)
}

function main(): void {
  if (!existsSync(TYPEDOC_JSON)) {
    console.log('Generating TypeDoc JSON...')
    generateTypedocJson()
  }

  const json = JSON.parse(readFileSync(TYPEDOC_JSON, 'utf-8'))
  const exportedNames = collectExportedNames(json)

  let allPassed = true
  const errors: string[] = []

  for (const [pkg, symbols] of Object.entries(EXPECTED_SYMBOLS)) {
    for (const sym of symbols) {
      if (!exportedNames.has(sym)) {
        errors.push(`MISSING: ${pkg} → ${sym}`)
        allPassed = false
      }
    }
  }

  for (const sym of SHARED_ERRORS) {
    if (!exportedNames.has(sym)) {
      errors.push(`MISSING: shared error → ${sym}`)
      allPassed = false
    }
  }

  if (allPassed) {
    console.log(`✅ All ${Object.values(EXPECTED_SYMBOLS).flat().length + SHARED_ERRORS.length} expected symbols found.`)
    process.exit(0)
  } else {
    console.error('❌ Missing symbols:')
    for (const err of errors) {
      console.error(`  ${err}`)
    }
    process.exit(1)
  }
}

main()
