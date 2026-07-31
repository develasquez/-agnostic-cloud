import * as oci from 'oci-sdk'
import type { KmsConfig } from './config.js'
import { resolveCloud } from './resolver.js'
import { withRetry } from './retry.js'
import type { KmsStrategy, EncryptionContext, EncryptResult, DecryptResult, CreateKeyOptions, KeyMetadata } from './interface.js'

export class OciKmsStrategy implements KmsStrategy {
  private mgmtClient: oci.keymanagement.KmsManagementClient
  private cryptoClient: oci.keymanagement.KmsCryptoClient
  private compartmentId: string
  private retryConfig: { maxRetries: number; baseDelayMs: number }

  constructor(config: KmsConfig) {
    resolveCloud(config, 'kms')

    const tenancy = config.config?.['tenancy'] || process.env['OCI_TENANCY'] || 'ocid1.tenancy.oc1..fake-tenancy-id'
    const user = config.config?.['user'] || process.env['OCI_USER'] || 'ocid1.user.oc1..fake-user-id'
    const fingerprint = config.config?.['fingerprint'] || process.env['OCI_FINGERPRINT'] || '20:3b:97:13:55:1c:cf:0d:86:14:ee:74:97:bc:fc:a1'
    const privateKey = config.config?.['privateKey'] || process.env['OCI_PRIVATE_KEY'] || `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA0I9R0ZO3gnewHu6qeeYnJ0rnqNc851JBKoe92V+nvqB83S8H
gS6j5UzHm3QY4ShKkin02EsT2hXpZz4YI7hjmSw2SVnI68nyOW4NtjUz/cGYSl3F
8udd8v3oIoRoN7yeyhkSHzmf4mGL2ngK3lltUZETVbgPoQgKfckuGzN/drtJ1gyc
n3pjZCiKj8u2lt1hw1OkjkrsrShSvNothyY5dRgIQBT0Fj0IH9sb7Zo5kGl1woNC
MrcySBE/SR/IijyBozLvva5q7Tp/sS4qwnAboJKM4DavmSYmkempXnHGp9ulVSIx
qtsuj+eQFZ0pT+oeWA2kUlaesCJW+m+C56my1QIDAQABAoIBACVEPsP6p7NV7LAS
SH8Aq6VfQpbOYxEYhxFw8PELIR+0cKtbMHWaXmnmNtKlw55UA0Mr4RbXD4SMHsk2
dLzJQW7I0ih4NSlAzBoL+sJArnoc4jgDmo/lXMnDKfwk+bRf7WXCZhUTSGj8si9G
/PYvN5P4HuLVwWEuXSWN0cHFiXSu/vyBXiCbtZuxtHYVxwyU8EZS3KfmFM5SqhRs
jEbExA03GFSSMtrNv2Q/1NN3FNsuw+aC+4u4nvudZfcWRPmBLQq3bLyC8YzUyrwu
v25lD+jmSuAxGbFv4AN7dqeVU0Noqkq5+WyYDMpJFu7E5NjubSNKqNYvVoI6Cfmy
+VnqN8ECgYEA8sK6N8w7Phk5b+NQcAQRTUMIvK/PcqjIwxDgKYMQwx/TAPlG07hF
JLeulutaPVhT/xzUuL5IqZ8nycFn5FMc476ZCHNmTBCZxrJCJhOWDt7SFGMr1S1c
VJF+vbKhvWYatcPZsQQ8IrcTHBX52LkozY02WQwhyiUiaZzxAk0H9HUCgYEA2+8a
ERlhImX1O5QoAVf1lfct3T0zHPgQ/CdYRlWfl9iSp6Sp3z5xYszkbqOHig59vL+c
dPS3wHnb/bvUQ+0v703+EgHlnWK8Ysys6jIU8meSaj8cioIjs6aw2Zz4Ov7tTwZU
pJPVIdp42hdcUc5Ufcx+87m28OflVEfBOF4heOECgYBaz8VhgiDXRhBabqp0fNEM
Gft2uj3cIo+XiQSSAtmOZKVGQ/ne0Zvr9Fp3Umtbb2Ncl6hrw6Li8QqtSpBWtVCl
UXNl2eV2pu8fiSd9nu4PegMUZVTMVj+n0xWaWOxwMXXkcPNKaM8mHV4kr4PbMsi0
vBKMlSE+wU1yPKdbuP000QKBgFlxszszBCL2LjbNuTtap2EXBosMYaYtaNLzuV3Z
Yq9hf7s4J3HINlrFEz2/uda2sAI8NwgFollf9c0KP3hklPMQ1/xA0z4fspfHv6b7
OTOgVZZqFlRqOtTMPO4zfWyY0rAp1fCcwrgi3rVrfLs0W35R1WuPosv0s3qEOBuR
hLFhAoGBANbYVrJNN1sJPT8x0CoE9M6Tjpxz8Pne1aKS9wCkTZa4Ja79N26HaE9k
a2zag3eyR0WREGmxsZEOqEmOh+LTeVyY3u8tTNUTAxTfaDszQgvgtKRqHY9HsWxV
HGq6/pzd9AJzylv1kGDbtZjRCeUc/aEzTIVapkl4HZ4hy3j5apE0
-----END RSA PRIVATE KEY-----`
    const region = config.region || process.env['OCI_REGION'] || 'us-ashburn-1'

    const regionObj = oci.common.Region.fromRegionId(region)
    const provider = new oci.SimpleAuthenticationDetailsProvider(
      tenancy,
      user,
      fingerprint,
      privateKey,
      null,
      regionObj
    )

    this.compartmentId = config.config?.['compartmentId'] || process.env['OCI_COMPARTMENT_ID'] || 'ocid1.compartment.oc1..fake'

    this.mgmtClient = new oci.keymanagement.KmsManagementClient({ authenticationDetailsProvider: provider })
    this.cryptoClient = new oci.keymanagement.KmsCryptoClient({ authenticationDetailsProvider: provider })

    const endpoint = config.config?.['endpoint'] || process.env['OCI_EMULATOR_ENDPOINT'] || 'http://localhost:4599'
    if (endpoint) {
      this.mgmtClient.endpoint = endpoint
      this.cryptoClient.endpoint = endpoint
    }

    this.retryConfig = {
      maxRetries: config.config?.['maxRetries'] as number ?? 3,
      baseDelayMs: config.config?.['baseDelayMs'] as number ?? 100,
    }
  }

  async encrypt(keyId: string, plaintext: Buffer | string, context?: EncryptionContext): Promise<EncryptResult> {
    const base64Plaintext = typeof plaintext === 'string'
      ? Buffer.from(plaintext).toString('base64')
      : plaintext.toString('base64')

    const result = await withRetry(() => this.cryptoClient.encrypt({
      encryptDataDetails: {
        keyId,
        plaintext: base64Plaintext,
        associatedData: context,
        encryptionAlgorithm: 'AES_256_GCM' as any,
      }
    }), this.retryConfig)

    return {
      ciphertext: Buffer.from(result.encryptedData.ciphertext, 'base64'),
      keyId: result.encryptedData.keyId ?? keyId,
      encryptionAlgorithm: result.encryptedData.encryptionAlgorithm ?? 'AES_256_GCM',
    }
  }

  async decrypt(keyId: string, ciphertext: Buffer, context?: EncryptionContext): Promise<DecryptResult> {
    const base64Ciphertext = ciphertext.toString('base64')

    const result = await withRetry(() => this.cryptoClient.decrypt({
      decryptDataDetails: {
        keyId,
        ciphertext: base64Ciphertext,
        associatedData: context,
        encryptionAlgorithm: 'AES_256_GCM' as any,
      }
    }), this.retryConfig)

    return {
      plaintext: Buffer.from(result.decryptedData.plaintext, 'base64'),
      keyId: result.decryptedData.keyId ?? keyId,
    }
  }

  async createKey(alias: string, options?: CreateKeyOptions): Promise<KeyMetadata> {
    const result = await withRetry(() => this.mgmtClient.createKey({
      createKeyDetails: {
        compartmentId: this.compartmentId,
        displayName: alias,
        keyShape: { algorithm: oci.keymanagement.models.KeyShape.Algorithm.Aes, length: 32 },
        protectionMode: 'SOFTWARE' as any,
      }
    }), this.retryConfig)

    return {
      keyId: result.key.id,
      arn: result.key.id,
      alias,
      created: new Date(result.key.timeCreated),
      enabled: result.key.lifecycleState === 'ENABLED',
    }
  }

  async scheduleKeyDeletion(keyId: string, windowDays?: number): Promise<Date> {
    const deletionTime = new Date(Date.now() + (windowDays ?? 30) * 24 * 60 * 60 * 1000)
    const result = await withRetry(() => this.mgmtClient.scheduleKeyDeletion({
      keyId,
      scheduleKeyDeletionDetails: {
        timeOfDeletion: deletionTime,
      }
    }), this.retryConfig)

    return result.key.timeOfDeletion ? new Date(result.key.timeOfDeletion) : deletionTime
  }
}
