"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  copyObject: () => copyObject,
  verifyIntegrity: () => verifyIntegrity
});
module.exports = __toCommonJS(index_exports);

// src/copy.ts
var import_storage = require("@agnostic-cloud/storage");
function parseUrl(url) {
  const parsed = new URL(url);
  const bucket = parsed.hostname;
  const key = parsed.pathname.replace(/^\//, "");
  return { bucket, key };
}
async function copyObject(sourceConfig, sourceUrl, destConfig, destUrl) {
  const source = (0, import_storage.createStorage)(sourceConfig);
  const dest = (0, import_storage.createStorage)(destConfig);
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
var import_node_crypto = require("crypto");
var import_storage2 = require("@agnostic-cloud/storage");
function parseUrl2(url) {
  const parsed = new URL(url);
  const bucket = parsed.hostname;
  const key = parsed.pathname.replace(/^\//, "");
  return { bucket, key };
}
async function verifyIntegrity(config, url, expectedChecksum, algorithm = "md5") {
  const storage = (0, import_storage2.createStorage)(config);
  const { bucket, key } = parseUrl2(url);
  const result = await storage.getObject(bucket, key);
  const hash = (0, import_node_crypto.createHash)(algorithm).update(result.data).digest("hex");
  return hash === expectedChecksum.toLowerCase();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  copyObject,
  verifyIntegrity
});
//# sourceMappingURL=index.cjs.map