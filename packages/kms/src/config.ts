export interface CloudConfig {
  cloud?: 'aws' | 'gcp' | 'azure'
  region?: string
  config?: Record<string, any>
}

export interface KmsConfig extends CloudConfig {}
