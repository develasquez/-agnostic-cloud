import { StorageConfig } from '@agnostic-cloud/storage';

interface CopyResult {
    bytesTransferred: number;
    sourceKey: string;
    destKey: string;
}
declare function copyObject(sourceConfig: StorageConfig, sourceUrl: string, destConfig: StorageConfig, destUrl: string): Promise<CopyResult>;

type HashAlgorithm = 'md5' | 'sha1' | 'sha256' | 'sha512';
declare function verifyIntegrity(config: StorageConfig, url: string, expectedChecksum: string, algorithm?: HashAlgorithm): Promise<boolean>;

export { type CopyResult, type HashAlgorithm, copyObject, verifyIntegrity };
