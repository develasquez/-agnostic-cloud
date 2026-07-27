import { describe, it, expect, beforeEach } from 'vitest'
import { resolveCloud } from '../src/resolver.js'
import { CloudNotConfiguredError, InvalidCloudError } from '../src/errors.js'

describe('resolveCloud (pubsub)', () => {
  beforeEach(() => { delete process.env['CLOUD_PROVIDER'] })

  it('should return aws', () => expect(resolveCloud({ cloud: 'aws' }, 'pubsub')).toBe('aws'))
  it('should return gcp', () => expect(resolveCloud({ cloud: 'gcp' }, 'pubsub')).toBe('gcp'))
  it('should return azure', () => expect(resolveCloud({ cloud: 'azure' }, 'pubsub')).toBe('azure'))
  it('should throw InvalidCloudError for invalid cloud', () => expect(() => resolveCloud({ cloud: 'invalid' as any }, 'pubsub')).toThrow(InvalidCloudError))
  it('should throw CloudNotConfiguredError when missing', () => expect(() => resolveCloud({}, 'pubsub')).toThrow(CloudNotConfiguredError))
  it('should read from CLOUD_PROVIDER env var', () => {
    process.env['CLOUD_PROVIDER'] = 'gcp'
    expect(resolveCloud({}, 'pubsub')).toBe('gcp')
  })
})

describe('createPubSub', () => {
  it('should be a function', async () => {
    const { createPubSub } = await import('../src/index.js')
    expect(typeof createPubSub).toBe('function')
  })
})
