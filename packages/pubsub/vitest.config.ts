import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['test/**/*.test.ts'],
    coverage: {
      reporter: ['text', 'lcov'],
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
      include: ['src/**/*.ts'],
      exclude: ['src/retry.ts'],
    },
  },
})
