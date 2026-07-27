import { describe, it, expect, beforeEach } from 'vitest'
import { resolveCloud } from '../src/resolver.js'
import { CloudNotConfiguredError, InvalidCloudError } from '../src/errors.js'

describe('resolveCloud (cache)', () => {
  beforeEach(() => { delete process.env['CLOUD_PROVIDER'] })

  it('should return aws', () => expect(resolveCloud({ cloud: 'aws' }, 'cache')).toBe('aws'))
  it('should return gcp', () => expect(resolveCloud({ cloud: 'gcp' }, 'cache')).toBe('gcp'))
  it('should return azure', () => expect(resolveCloud({ cloud: 'azure' }, 'cache')).toBe('azure'))
  it('should throw InvalidCloudError for invalid cloud', () => expect(() => resolveCloud({ cloud: 'invalid' as any }, 'cache')).toThrow(InvalidCloudError))
  it('should throw CloudNotConfiguredError when missing', () => expect(() => resolveCloud({}, 'cache')).toThrow(CloudNotConfiguredError))
  it('should read from CLOUD_PROVIDER env var', () => {
    process.env['CLOUD_PROVIDER'] = 'azure'
    expect(resolveCloud({}, 'cache')).toBe('azure')
  })
})

describe('createCache', () => {
  it('should be a function', async () => {
    const { createCache } = await import('../src/index.js')
    expect(typeof createCache).toBe('function')
  })
})
