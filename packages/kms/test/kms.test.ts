import { describe, it, expect, beforeEach } from 'vitest'
import { resolveCloud } from '../src/resolver.js'
import { CloudNotConfiguredError, InvalidCloudError } from '../src/errors.js'

describe('resolveCloud (kms)', () => {
  beforeEach(() => { delete process.env['CLOUD_PROVIDER'] })

  it('should return aws', () => expect(resolveCloud({ cloud: 'aws' }, 'kms')).toBe('aws'))
  it('should return gcp', () => expect(resolveCloud({ cloud: 'gcp' }, 'kms')).toBe('gcp'))
  it('should return azure', () => expect(resolveCloud({ cloud: 'azure' }, 'kms')).toBe('azure'))
  it('should throw InvalidCloudError for invalid cloud', () => expect(() => resolveCloud({ cloud: 'invalid' as any }, 'kms')).toThrow(InvalidCloudError))
  it('should throw CloudNotConfiguredError when missing', () => expect(() => resolveCloud({}, 'kms')).toThrow(CloudNotConfiguredError))
  it('should read from CLOUD_PROVIDER env var', () => {
    process.env['CLOUD_PROVIDER'] = 'aws'
    expect(resolveCloud({}, 'kms')).toBe('aws')
  })
})

describe('createKms', () => {
  it('should be a function', async () => {
    const { createKms } = await import('../src/index.js')
    expect(typeof createKms).toBe('function')
  })
})
