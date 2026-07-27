import { describe, it, expect, beforeEach } from 'vitest'
import { resolveCloud } from '../src/resolver.js'
import { CloudNotConfiguredError, InvalidCloudError } from '../src/errors.js'

describe('resolveCloud (secrets)', () => {
  beforeEach(() => { delete process.env['CLOUD_PROVIDER'] })

  it('should return aws', () => expect(resolveCloud({ cloud: 'aws' }, 'secrets')).toBe('aws'))
  it('should return gcp', () => expect(resolveCloud({ cloud: 'gcp' }, 'secrets')).toBe('gcp'))
  it('should return azure', () => expect(resolveCloud({ cloud: 'azure' }, 'secrets')).toBe('azure'))
  it('should throw InvalidCloudError for invalid cloud', () => expect(() => resolveCloud({ cloud: 'invalid' as any }, 'secrets')).toThrow(InvalidCloudError))
  it('should throw CloudNotConfiguredError when missing', () => expect(() => resolveCloud({}, 'secrets')).toThrow(CloudNotConfiguredError))
  it('should read from CLOUD_PROVIDER env var', () => {
    process.env['CLOUD_PROVIDER'] = 'gcp'
    expect(resolveCloud({}, 'secrets')).toBe('gcp')
  })
})

describe('createSecrets', () => {
  it('should be a function', async () => {
    const { createSecrets } = await import('../src/index.js')
    expect(typeof createSecrets).toBe('function')
  })
})
