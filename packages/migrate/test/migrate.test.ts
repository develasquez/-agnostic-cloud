import { describe, it, expect } from 'vitest'

describe('migrate', () => {
  it('should export copyObject function', async () => {
    const { copyObject } = await import('../src/index.js')
    expect(typeof copyObject).toBe('function')
  })

  it('should export verifyIntegrity function', async () => {
    const { verifyIntegrity } = await import('../src/index.js')
    expect(typeof verifyIntegrity).toBe('function')
  })
})
