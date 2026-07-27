import { describe, it, expect, beforeEach } from 'vitest'
import { resolveCloud } from '../src/resolver.js'
import { CloudNotConfiguredError, InvalidCloudError } from '../src/errors.js'

describe('resolveCloud (nosql)', () => {
  beforeEach(() => { delete process.env['CLOUD_PROVIDER'] })

  it('should return aws', () => expect(resolveCloud({ cloud: 'aws' }, 'nosql')).toBe('aws'))
  it('should return gcp', () => expect(resolveCloud({ cloud: 'gcp' }, 'nosql')).toBe('gcp'))
  it('should return azure', () => expect(resolveCloud({ cloud: 'azure' }, 'nosql')).toBe('azure'))
  it('should throw InvalidCloudError for invalid cloud', () => expect(() => resolveCloud({ cloud: 'invalid' as any }, 'nosql')).toThrow(InvalidCloudError))
  it('should throw CloudNotConfiguredError when missing', () => expect(() => resolveCloud({}, 'nosql')).toThrow(CloudNotConfiguredError))
  it('should read from CLOUD_PROVIDER env var', () => {
    process.env['CLOUD_PROVIDER'] = 'azure'
    expect(resolveCloud({}, 'nosql')).toBe('azure')
  })
})

describe('createNoSql', () => {
  it('should be a function', async () => {
    const { createNoSql } = await import('../src/index.js')
    expect(typeof createNoSql).toBe('function')
  })
})
