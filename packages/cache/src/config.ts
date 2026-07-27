export interface CloudConfig {
  cloud?: 'aws' | 'gcp' | 'azure'
  region?: string
  config?: Record<string, any>
}

export interface CacheConfig extends CloudConfig {
  host?: string
  port?: number
}
