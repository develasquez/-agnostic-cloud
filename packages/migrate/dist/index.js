// src/copy.ts
import { createStorage } from "@agnostic-cloud/storage";
function parseUrl(url) {
  const parsed = new URL(url);
  const bucket = parsed.hostname;
  const key = parsed.pathname.replace(/^\//, "");
  return { bucket, key };
}
async function copyObject(sourceConfig, sourceUrl, destConfig, destUrl) {
  const source = createStorage(sourceConfig);
  const dest = createStorage(destConfig);
  const { bucket: sourceBucket, key: sourceKey } = parseUrl(sourceUrl);
  const { bucket: destBucket, key: destKey } = parseUrl(destUrl);
  const result = await source.getObject(sourceBucket, sourceKey);
  await dest.putObject(destBucket, destKey, result.data);
  return {
    bytesTransferred: result.data.length,
    sourceKey,
    destKey
  };
}

// src/verify.ts
import { createHash } from "crypto";
import { createStorage as createStorage2 } from "@agnostic-cloud/storage";
function parseUrl2(url) {
  const parsed = new URL(url);
  const bucket = parsed.hostname;
  const key = parsed.pathname.replace(/^\//, "");
  return { bucket, key };
}
async function verifyIntegrity(config, url, expectedChecksum, algorithm = "md5") {
  const storage = createStorage2(config);
  const { bucket, key } = parseUrl2(url);
  const result = await storage.getObject(bucket, key);
  const hash = createHash(algorithm).update(result.data).digest("hex");
  return hash === expectedChecksum.toLowerCase();
}
export {
  copyObject,
  verifyIntegrity
};
//# sourceMappingURL=index.js.map