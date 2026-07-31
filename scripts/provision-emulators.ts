import http from 'http';
import { S3Client, CreateBucketCommand } from '@aws-sdk/client-s3';
import { Storage } from '@google-cloud/storage';
import { BlobServiceClient } from '@azure/storage-blob';
import { PubSub } from '@google-cloud/pubsub';
import { FakeTokenCredential } from '../packages/test-helpers/src/index.js';

const TEST_BUCKET = 'test-bucket';

async function waitForEndpoint(url: string, timeoutMs = 15000): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok || response.status === 404 || response.status === 405) {
        return true;
      }
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  return false;
}

async function main() {
  console.log('🚀 Waiting for Floci emulators to be healthy...');

  const awsHealthy = await waitForEndpoint('http://localhost:4566/health');
  const gcpHealthy = await waitForEndpoint('http://localhost:4588/health');
  const azHealthy = await waitForEndpoint('http://localhost:4577/health');

  if (!awsHealthy || !gcpHealthy || !azHealthy) {
    console.error('❌ Failed to verify emulator health within timeout.');
    process.exit(1);
  }

  console.log('✅ All Floci emulators are healthy. Beginning resource provisioning...');

  // 1. AWS Provisioning (Port 4566)
  try {
    const s3 = new S3Client({
      endpoint: 'http://localhost:4566',
      region: 'us-east-1',
      credentials: { accessKeyId: 'fake', secretAccessKey: 'fake' },
      forcePathStyle: true,
    });
    await s3.send(new CreateBucketCommand({ Bucket: TEST_BUCKET }));
    console.log(`[AWS] Successfully created S3 bucket "${TEST_BUCKET}"`);
    s3.destroy();
  } catch (err: any) {
    console.log(`[AWS] S3 bucket setup skipped/already exists: ${err.message}`);
  }

  // 2. GCP Provisioning (Port 4588)
  try {
    const gcs = new Storage({ apiEndpoint: 'http://localhost:4588', projectId: 'test-project' });
    await gcs.createBucket(TEST_BUCKET);
    console.log(`[GCP] Successfully created GCS bucket "${TEST_BUCKET}"`);
  } catch (err: any) {
    console.log(`[GCP] GCS bucket setup skipped/already exists: ${err.message}`);
  }

  try {
    const pubsub = new PubSub({ apiEndpoint: 'localhost:4588', projectId: 'test-project' });
    await pubsub.createTopic('test-topic-e2e');
    console.log(`[GCP] Successfully created Pub/Sub topic "test-topic-e2e"`);
  } catch (err: any) {
    console.log(`[GCP] Pub/Sub topic setup skipped/already exists: ${err.message}`);
  }

  // Create GCP KMS Key Ring "agnostic-cloud" on port 4588
  try {
    await new Promise<void>((resolve, reject) => {
      const req = http.request({
        hostname: 'localhost',
        port: 4588,
        path: '/v1/projects/test-project/locations/global/keyRings?keyRingId=agnostic-cloud',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }, (res) => {
        res.resume();
        res.on('end', () => resolve());
      });
      req.on('error', reject);
      req.end('{}');
    });
    console.log('[GCP] Successfully created KMS KeyRing "agnostic-cloud"');
  } catch (err: any) {
    console.log(`[GCP] KMS KeyRing setup skipped/already exists: ${err.message}`);
  }

  // 3. Azure Provisioning (Port 4577)
  try {
    const conn = 'DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:4577/devstoreaccount1;';
    const blobClient = BlobServiceClient.fromConnectionString(conn);
    await blobClient.createContainer(TEST_BUCKET);
    console.log(`[Azure] Successfully created Blob container "${TEST_BUCKET}"`);
  } catch (err: any) {
    console.log(`[Azure] Blob container setup skipped/already exists: ${err.message}`);
  }

  // 4. OCI Provisioning (Port 4599)
  try {
    const ociHealthy = await waitForEndpoint('http://localhost:4599/health');
    if (ociHealthy) {
      const oci = await import('oci-sdk');
      const { getOciCredentials } = await import('../packages/test-helpers/src/index.js');

      const creds = getOciCredentials();
      const regionObj = oci.common.Region.fromRegionId(creds.region);
      const ociProvider = new oci.SimpleAuthenticationDetailsProvider(
        creds.tenancy,
        creds.user,
        creds.fingerprint,
        creds.privateKey,
        null,
        regionObj
      );

      // A. Object Storage
      const osClient = new oci.objectstorage.ObjectStorageClient({ authenticationDetailsProvider: ociProvider });
      osClient.endpoint = 'http://localhost:4599';
      const namespaceRes = await osClient.getNamespace({});
      const namespaceName = namespaceRes.value;
      try {
        await osClient.createBucket({
          namespaceName,
          createBucketDetails: { name: TEST_BUCKET, compartmentId: 'ocid1.compartment.oc1..fake' }
        });
        console.log(`[OCI] Successfully created Object Storage bucket "${TEST_BUCKET}"`);
      } catch (err: any) {
        console.log(`[OCI] Object Storage bucket skipped: ${err.message}`);
      }

      // B. KMS Vault & Key
      try {
        const kmsClient = new oci.keymanagement.KmsVaultClient({ authenticationDetailsProvider: ociProvider });
        kmsClient.endpoint = 'http://localhost:4599';
        await kmsClient.createVault({
          createVaultDetails: {
            compartmentId: 'ocid1.compartment.oc1..fake',
            displayName: 'test-vault',
            vaultType: 'DEFAULT'
          }
        });
        console.log('[OCI] Successfully created KMS vault "test-vault"');

        const mgmtClient = new oci.keymanagement.KmsManagementClient({ authenticationDetailsProvider: ociProvider });
        mgmtClient.endpoint = 'http://localhost:4599';
        await mgmtClient.createKey({
          compartmentId: 'ocid1.compartment.oc1..fake',
          createKeyDetails: {
            compartmentId: 'ocid1.compartment.oc1..fake',
            displayName: 'test-key',
            keyShape: { algorithm: 'AES', length: 32 },
            protectionMode: 'SOFTWARE'
          }
        });
        console.log('[OCI] Successfully created KMS key "test-key"');
      } catch (err: any) {
        console.log(`[OCI] KMS setup skipped: ${err.message}`);
      }

      // C. Queue
      try {
        const queueClient = new oci.queue.QueueAdminClient({ authenticationDetailsProvider: ociProvider });
        queueClient.endpoint = 'http://localhost:4599';
        await queueClient.createQueue({
          createQueueDetails: {
            compartmentId: 'ocid1.compartment.oc1..fake',
            displayName: 'test-queue-e2e'
          }
        });
        console.log('[OCI] Successfully created Queue "test-queue-e2e"');
      } catch (err: any) {
        console.log(`[OCI] Queue setup skipped: ${err.message}`);
      }
    } else {
      console.log('[OCI] Emulator health check failed, skipping OCI provisioning.');
    }
  } catch (err: any) {
    console.log(`[OCI] Provisioning failed: ${err.message}`);
  }

  console.log('🎉 Emulator resource provisioning completed successfully!');
}

main().catch((err) => {
  console.error('❌ Error during emulator provisioning:', err);
  process.exit(1);
});
