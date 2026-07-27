interface CloudConfig {
    cloud?: 'aws' | 'gcp' | 'azure';
    region?: string;
    config?: Record<string, any>;
}
interface CacheConfig extends CloudConfig {
    host?: string;
    port?: number;
}

interface SetOptions {
    ttlMs?: number;
}
interface CacheStrategy {
    get(key: string): Promise<string | null>;
    set(key: string, value: string, options?: SetOptions): Promise<void>;
    del(key: string): Promise<void>;
    exists(key: string): Promise<boolean>;
}

declare abstract class CloudError extends Error {
    readonly cloud: string;
    readonly service: string;
    readonly operation: string;
    constructor(message: string, cloud: string, service: string, operation: string);
}
declare class CloudNotConfiguredError extends CloudError {
    constructor(cloud: string, service: string);
}
declare class InvalidCloudError extends CloudError {
    constructor(cloud: string, service: string);
}
declare class AuthError extends CloudError {
    constructor(cloud: string, service: string, operation: string, message?: string);
}
declare class TimeoutError extends CloudError {
    constructor(cloud: string, service: string, operation: string);
}
declare class ValidationError extends CloudError {
    constructor(cloud: string, service: string, operation: string, message: string);
}
declare class NotImplementedError extends CloudError {
    constructor(cloud: string, service: string, operation: string);
}

declare function createCache(config: CacheConfig): CacheStrategy;

export { AuthError, type CacheConfig, type CacheStrategy, type CloudConfig, CloudError, CloudNotConfiguredError, InvalidCloudError, NotImplementedError, type SetOptions, TimeoutError, ValidationError, createCache };
