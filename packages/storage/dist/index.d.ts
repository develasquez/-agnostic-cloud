import { Readable } from 'node:stream';

interface CloudConfig {
    cloud?: 'aws' | 'gcp' | 'azure';
    region?: string;
    config?: Record<string, any>;
}
interface StorageConfig extends CloudConfig {
    bucket?: string;
}

interface PutObjectOptions {
    contentType?: string;
    metadata?: Record<string, string>;
    cacheControl?: string;
}
interface PutObjectResult {
    etag: string;
    versionId?: string;
}
interface GetObjectResult {
    data: Buffer;
    contentType?: string;
    metadata?: Record<string, string>;
    etag?: string;
    lastModified?: Date;
}
interface ListObjectsOptions {
    prefix?: string;
    maxKeys?: number;
    startAfter?: string;
}
interface ListObjectsResult {
    objects: ObjectSummary[];
    isTruncated: boolean;
    nextContinuationToken?: string;
}
interface ObjectSummary {
    key: string;
    size: number;
    etag: string;
    lastModified: Date;
}
interface StorageStrategy {
    putObject(bucket: string, key: string, data: Buffer | Readable, options?: PutObjectOptions): Promise<PutObjectResult>;
    getObject(bucket: string, key: string): Promise<GetObjectResult>;
    getObjectStream(bucket: string, key: string): Promise<Readable>;
    listObjects(bucket: string, options?: ListObjectsOptions): Promise<ListObjectsResult>;
    deleteObject(bucket: string, key: string): Promise<void>;
    existsObject(bucket: string, key: string): Promise<boolean>;
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
declare class ObjectNotFoundError extends CloudError {
    constructor(cloud: string, service: string, bucket: string, key: string);
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

declare function createStorage(config: StorageConfig): StorageStrategy;

export { AuthError, type CloudConfig, CloudError, CloudNotConfiguredError, type GetObjectResult, InvalidCloudError, type ListObjectsOptions, type ListObjectsResult, NotImplementedError, ObjectNotFoundError, type ObjectSummary, type PutObjectOptions, type PutObjectResult, type StorageConfig, type StorageStrategy, TimeoutError, ValidationError, createStorage };
