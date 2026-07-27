export interface CloudConfig {
  cloud?: 'aws' | 'gcp' | 'azure'
  region?: string
  config?: Record<string, any>
}

export interface PubSubConfig extends CloudConfig {
  azureService?: 'event-grid' | 'event-hubs' | 'service-bus'
}
