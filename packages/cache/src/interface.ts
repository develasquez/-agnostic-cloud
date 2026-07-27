export interface SetOptions {
  ttlMs?: number
}

export interface CacheStrategy {
  get(key: string): Promise<string | null>
  set(key: string, value: string, options?: SetOptions): Promise<void>
  del(key: string): Promise<void>
  exists(key: string): Promise<boolean>
}
