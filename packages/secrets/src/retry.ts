export interface RetryConfig {
  maxRetries?: number
  baseDelayMs?: number
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options?: RetryConfig
): Promise<T> {
  const maxRetries = options?.maxRetries ?? 3
  const baseDelayMs = options?.baseDelayMs ?? 100
  let lastError: Error | undefined

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (err) {
      lastError = err as Error
      if (attempt < maxRetries) {
        const delay = baseDelayMs * Math.pow(2, attempt) + Math.random() * baseDelayMs
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError
}
