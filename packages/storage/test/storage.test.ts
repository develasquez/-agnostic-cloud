import { describe, it, expect } from 'vitest'
import { resolveCloud } from '../src/resolver.js'
import { CloudNotConfiguredError, InvalidCloudError } from '../src/errors.js'

describe('resolveCloud', () => {
  it('should return aws when cloud is aws', () => {
    expect(resolveCloud({ cloud: 'aws' }, 'storage')).toBe('aws')
  })

  it('should return gcp when cloud is gcp', () => {
    expect(resolveCloud({ cloud: 'gcp' }, 'storage')).toBe('gcp')
  })

  it('should return azure when cloud is azure', () => {
    expect(resolveCloud({ cloud: 'azure' }, 'storage')).toBe('azure')
  })

  it('should throw InvalidCloudError for invalid cloud value', () => {
    expect(() => resolveCloud({ cloud: 'invalid' as any }, 'storage')).toThrow(InvalidCloudError)
  })

  it('should throw CloudNotConfiguredError when cloud is missing and no env var', () => {
    delete process.env['CLOUD_PROVIDER']
    expect(() => resolveCloud({}, 'storage')).toThrow(CloudNotConfiguredError)
  })

  it('should read cloud from CLOUD_PROVIDER env var when cloud field is missing', () => {
    process.env['CLOUD_PROVIDER'] = 'aws'
    expect(resolveCloud({}, 'storage')).toBe('aws')
    delete process.env['CLOUD_PROVIDER']
  })
})

describe('createStorage', () => {
  it('should be a function', async () => {
    const { createStorage } = await import('../src/index.js')
    expect(typeof createStorage).toBe('function')
  })
})
