export interface CloudConfig {
  cloud?: 'aws' | 'gcp' | 'azure'
  region?: string
  config?: Record<string, any>
}

export interface StorageConfig extends CloudConfig {
  bucket?: string
}
