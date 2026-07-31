import { Buffer } from 'buffer'

function b64url(s: string): string {
  return Buffer.from(s).toString('base64url')
}

export class FakeTokenCredential {
  async getToken(_scopes: string | string[], _options?: unknown) {
    const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT', kid: 'fake' }))
    const payload = b64url(JSON.stringify({
      aud: 'https://vault.azure.net',
      iss: 'fake',
      sub: 'fake',
      exp: Math.floor(Date.now() / 1000) + 36000,
    }))
    return { token: `${header}.${payload}.fakesig`, expiresOnTimestamp: Date.now() + 3600000 }
  }
}

export function getAwsEndpoint(): string {
  return process.env.AWS_EMULATOR_ENDPOINT || 'http://localhost:4566'
}

export function getGcpEndpoint(): string {
  return process.env.GCP_EMULATOR_ENDPOINT || 'http://localhost:4588'
}

export function getAzureEndpoint(): string {
  return process.env.AZURE_EMULATOR_ENDPOINT || 'http://localhost:4577'
}

export function getOciEndpoint(): string {
  return process.env.OCI_EMULATOR_ENDPOINT || 'http://localhost:4599'
}

export function getOciCredentials() {
  return {
    tenancy: 'ocid1.tenancy.oc1..fake-tenancy-id',
    user: 'ocid1.user.oc1..fake-user-id',
    fingerprint: '20:3b:97:13:55:1c:cf:0d:86:14:ee:74:97:bc:fc:a1',
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`,
    region: 'us-phoenix-1'
  }
}

