export abstract class CloudError extends Error {
  constructor(
    message: string,
    public readonly cloud: string,
    public readonly service: string,
    public readonly operation: string,
  ) {
    super(message)
    this.name = this.constructor.name
  }
}

export class CloudNotConfiguredError extends CloudError {
  constructor(cloud: string, service: string) {
    super(`Cloud not configured: ${cloud}`, cloud, service, 'init')
  }
}

export class InvalidCloudError extends CloudError {
  constructor(cloud: string, service: string) {
    super(`Invalid cloud provider: ${cloud}. Must be 'aws', 'gcp', or 'azure'`, cloud, service, 'init')
  }
}

export class AuthError extends CloudError {
  constructor(cloud: string, service: string, operation: string, message?: string) {
    super(message ?? `Authentication failed for ${service}`, cloud, service, operation)
  }
}

export class TimeoutError extends CloudError {
  constructor(cloud: string, service: string, operation: string) {
    super(`Operation timed out: ${operation}`, cloud, service, operation)
  }
}

export class ValidationError extends CloudError {
  constructor(cloud: string, service: string, operation: string, message: string) {
    super(message, cloud, service, operation)
  }
}

export class NotImplementedError extends CloudError {
  constructor(cloud: string, service: string, operation: string) {
    super(`Operation not implemented for ${cloud} ${service}: ${operation}`, cloud, service, operation)
  }
}
