interface CloudConfig {
    cloud?: 'aws' | 'gcp' | 'azure';
    region?: string;
    config?: Record<string, any>;
}
interface NoSqlConfig extends CloudConfig {
    databaseId?: string;
}

type Document = Record<string, any>;
interface FilterOperator {
    $eq?: any;
    $ne?: any;
    $gt?: number | string | Date;
    $gte?: number | string | Date;
    $lt?: number | string | Date;
    $lte?: number | string | Date;
    $in?: any[];
    $contains?: string;
    $exists?: boolean;
}
interface QueryFilter {
    [field: string]: FilterOperator;
}
interface QueryOptions {
    limit?: number;
    offset?: number;
    orderBy?: {
        field: string;
        direction: 'asc' | 'desc';
    };
    select?: string[];
}
interface QueryResult {
    items: Document[];
    count: number;
    nextToken?: string;
}
interface NoSqlStrategy {
    putItem(collection: string, id: string, item: Document): Promise<void>;
    getItem(collection: string, id: string): Promise<Document | null>;
    updateItem(collection: string, id: string, changes: Partial<Document>): Promise<Document>;
    deleteItem(collection: string, id: string): Promise<void>;
    query(collection: string, filter: QueryFilter, options?: QueryOptions): Promise<QueryResult>;
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

declare function createNoSql(config: NoSqlConfig): NoSqlStrategy;

export { AuthError, type CloudConfig, CloudError, CloudNotConfiguredError, type Document, type FilterOperator, InvalidCloudError, type NoSqlConfig, type NoSqlStrategy, NotImplementedError, type QueryFilter, type QueryOptions, type QueryResult, TimeoutError, ValidationError, createNoSql };
