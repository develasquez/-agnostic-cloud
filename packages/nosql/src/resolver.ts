import type { CloudConfig } from './config.js'
import { CloudNotConfiguredError, InvalidCloudError } from './errors.js'

export type Cloud = 'aws' | 'gcp' | 'azure'

export function resolveCloud(config: CloudConfig, service: string): Cloud {
  if (config.cloud) {
    if (config.cloud !== 'aws' && config.cloud !== 'gcp' && config.cloud !== 'azure') {
      throw new InvalidCloudError(config.cloud, service)
    }
    return config.cloud
  }

  const env = process.env['CLOUD_PROVIDER']?.toLowerCase()
  if (env === 'aws' || env === 'gcp' || env === 'azure') {
    return env
  }

  throw new CloudNotConfiguredError(config.cloud ?? 'undefined', service)
}
