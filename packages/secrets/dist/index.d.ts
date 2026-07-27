interface CloudConfig {
    cloud?: 'aws' | 'gcp' | 'azure';
    region?: string;
    config?: Record<string, any>;
}
interface SecretsConfig extends CloudConfig {
}

interface CreateSecretOptions {
    description?: string;
    tags?: Record<string, string>;
}
interface DeleteSecretOptions {
    recoveryWindowDays?: number;
    forceDelete?: boolean;
}
interface ListSecretsOptions {
    maxResults?: number;
    nextToken?: string;
}
interface SecretValue {
    name: string;
    value: string;
    versionId?: string;
    created: Date;
    lastModified: Date;
}
interface SecretMetadata {
    name: string;
    arn?: string;
    created: Date;
}
interface ListSecretsResult {
    secrets: SecretMetadata[];
    nextToken?: string;
}
interface SecretsStrategy {
    getSecret(name: string): Promise<SecretValue>;
    createSecret(name: string, value: string, options?: CreateSecretOptions): Promise<SecretMetadata>;
    updateSecret(name: string, value: string): Promise<SecretMetadata>;
    deleteSecret(name: string, options?: DeleteSecretOptions): Promise<void>;
    listSecrets(options?: ListSecretsOptions): Promise<ListSecretsResult>;
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
declare class SecretNotFoundError extends CloudError {
    constructor(cloud: string, service: string, name: string);
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

declare function createSecrets(config: SecretsConfig): SecretsStrategy;

export { AuthError, type CloudConfig, CloudError, CloudNotConfiguredError, type CreateSecretOptions, type DeleteSecretOptions, InvalidCloudError, type ListSecretsOptions, type ListSecretsResult, NotImplementedError, type SecretMetadata, SecretNotFoundError, type SecretValue, type SecretsConfig, type SecretsStrategy, TimeoutError, ValidationError, createSecrets };
