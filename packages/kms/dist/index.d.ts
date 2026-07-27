interface CloudConfig {
    cloud?: 'aws' | 'gcp' | 'azure';
    region?: string;
    config?: Record<string, any>;
}
interface KmsConfig extends CloudConfig {
}

interface EncryptionContext {
    [key: string]: string;
}
interface EncryptResult {
    ciphertext: Buffer;
    keyId: string;
    encryptionAlgorithm?: string;
}
interface DecryptResult {
    plaintext: Buffer;
    keyId: string;
}
interface CreateKeyOptions {
    description?: string;
    tags?: Record<string, string>;
}
interface KeyMetadata {
    keyId: string;
    arn: string;
    alias: string;
    created: Date;
    enabled: boolean;
}
interface KmsStrategy {
    encrypt(keyId: string, plaintext: Buffer | string, context?: EncryptionContext): Promise<EncryptResult>;
    decrypt(keyId: string, ciphertext: Buffer, context?: EncryptionContext): Promise<DecryptResult>;
    createKey(alias: string, options?: CreateKeyOptions): Promise<KeyMetadata>;
    scheduleKeyDeletion(keyId: string, windowDays?: number): Promise<Date>;
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

declare function createKms(config: KmsConfig): KmsStrategy;

export { AuthError, type CloudConfig, CloudError, CloudNotConfiguredError, type CreateKeyOptions, type DecryptResult, type EncryptResult, type EncryptionContext, InvalidCloudError, type KeyMetadata, type KmsConfig, type KmsStrategy, NotImplementedError, TimeoutError, ValidationError, createKms };
