var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name3 in all)
    __defProp(target, name3, { get: all[name3], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/@azure/core-tracing/dist/commonjs/state.js
var require_state = __commonJS({
  "../../node_modules/@azure/core-tracing/dist/commonjs/state.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.state = void 0;
    exports.state = {
      instrumenterImplementation: void 0
    };
  }
});

// ../../node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "../../node_modules/safe-buffer/index.js"(exports, module) {
    "use strict";
    var buffer = __require("buffer");
    var Buffer3 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer3.from && Buffer3.alloc && Buffer3.allocUnsafe && Buffer3.allocUnsafeSlow) {
      module.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer3(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer3.prototype);
    copyProps(Buffer3, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer3(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer3(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer3(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// ../../node_modules/jws/lib/data-stream.js
var require_data_stream = __commonJS({
  "../../node_modules/jws/lib/data-stream.js"(exports, module) {
    "use strict";
    var Buffer3 = require_safe_buffer().Buffer;
    var Stream = __require("stream");
    var util2 = __require("util");
    function DataStream(data) {
      this.buffer = null;
      this.writable = true;
      this.readable = true;
      if (!data) {
        this.buffer = Buffer3.alloc(0);
        return this;
      }
      if (typeof data.pipe === "function") {
        this.buffer = Buffer3.alloc(0);
        data.pipe(this);
        return this;
      }
      if (data.length || typeof data === "object") {
        this.buffer = data;
        this.writable = false;
        process.nextTick(function() {
          this.emit("end", data);
          this.readable = false;
          this.emit("close");
        }.bind(this));
        return this;
      }
      throw new TypeError("Unexpected data type (" + typeof data + ")");
    }
    util2.inherits(DataStream, Stream);
    DataStream.prototype.write = function write(data) {
      this.buffer = Buffer3.concat([this.buffer, Buffer3.from(data)]);
      this.emit("data", data);
    };
    DataStream.prototype.end = function end(data) {
      if (data)
        this.write(data);
      this.emit("end", data);
      this.emit("close");
      this.writable = false;
      this.readable = false;
    };
    module.exports = DataStream;
  }
});

// ../../node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js
var require_param_bytes_for_alg = __commonJS({
  "../../node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js"(exports, module) {
    "use strict";
    function getParamSize(keySize) {
      var result = (keySize / 8 | 0) + (keySize % 8 === 0 ? 0 : 1);
      return result;
    }
    var paramBytesForAlg = {
      ES256: getParamSize(256),
      ES384: getParamSize(384),
      ES512: getParamSize(521)
    };
    function getParamBytesForAlg(alg) {
      var paramBytes = paramBytesForAlg[alg];
      if (paramBytes) {
        return paramBytes;
      }
      throw new Error('Unknown algorithm "' + alg + '"');
    }
    module.exports = getParamBytesForAlg;
  }
});

// ../../node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js
var require_ecdsa_sig_formatter = __commonJS({
  "../../node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js"(exports, module) {
    "use strict";
    var Buffer3 = require_safe_buffer().Buffer;
    var getParamBytesForAlg = require_param_bytes_for_alg();
    var MAX_OCTET = 128;
    var CLASS_UNIVERSAL = 0;
    var PRIMITIVE_BIT = 32;
    var TAG_SEQ = 16;
    var TAG_INT = 2;
    var ENCODED_TAG_SEQ = TAG_SEQ | PRIMITIVE_BIT | CLASS_UNIVERSAL << 6;
    var ENCODED_TAG_INT = TAG_INT | CLASS_UNIVERSAL << 6;
    function base64Url(base64) {
      return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    function signatureAsBuffer(signature) {
      if (Buffer3.isBuffer(signature)) {
        return signature;
      } else if ("string" === typeof signature) {
        return Buffer3.from(signature, "base64");
      }
      throw new TypeError("ECDSA signature must be a Base64 string or a Buffer");
    }
    function derToJose(signature, alg) {
      signature = signatureAsBuffer(signature);
      var paramBytes = getParamBytesForAlg(alg);
      var maxEncodedParamLength = paramBytes + 1;
      var inputLength = signature.length;
      var offset = 0;
      if (signature[offset++] !== ENCODED_TAG_SEQ) {
        throw new Error('Could not find expected "seq"');
      }
      var seqLength = signature[offset++];
      if (seqLength === (MAX_OCTET | 1)) {
        seqLength = signature[offset++];
      }
      if (inputLength - offset < seqLength) {
        throw new Error('"seq" specified length of "' + seqLength + '", only "' + (inputLength - offset) + '" remaining');
      }
      if (signature[offset++] !== ENCODED_TAG_INT) {
        throw new Error('Could not find expected "int" for "r"');
      }
      var rLength = signature[offset++];
      if (inputLength - offset - 2 < rLength) {
        throw new Error('"r" specified length of "' + rLength + '", only "' + (inputLength - offset - 2) + '" available');
      }
      if (maxEncodedParamLength < rLength) {
        throw new Error('"r" specified length of "' + rLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
      }
      var rOffset = offset;
      offset += rLength;
      if (signature[offset++] !== ENCODED_TAG_INT) {
        throw new Error('Could not find expected "int" for "s"');
      }
      var sLength = signature[offset++];
      if (inputLength - offset !== sLength) {
        throw new Error('"s" specified length of "' + sLength + '", expected "' + (inputLength - offset) + '"');
      }
      if (maxEncodedParamLength < sLength) {
        throw new Error('"s" specified length of "' + sLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
      }
      var sOffset = offset;
      offset += sLength;
      if (offset !== inputLength) {
        throw new Error('Expected to consume entire buffer, but "' + (inputLength - offset) + '" bytes remain');
      }
      var rPadding = paramBytes - rLength, sPadding = paramBytes - sLength;
      var dst = Buffer3.allocUnsafe(rPadding + rLength + sPadding + sLength);
      for (offset = 0; offset < rPadding; ++offset) {
        dst[offset] = 0;
      }
      signature.copy(dst, offset, rOffset + Math.max(-rPadding, 0), rOffset + rLength);
      offset = paramBytes;
      for (var o = offset; offset < o + sPadding; ++offset) {
        dst[offset] = 0;
      }
      signature.copy(dst, offset, sOffset + Math.max(-sPadding, 0), sOffset + sLength);
      dst = dst.toString("base64");
      dst = base64Url(dst);
      return dst;
    }
    function countPadding(buf, start, stop) {
      var padding = 0;
      while (start + padding < stop && buf[start + padding] === 0) {
        ++padding;
      }
      var needsSign = buf[start + padding] >= MAX_OCTET;
      if (needsSign) {
        --padding;
      }
      return padding;
    }
    function joseToDer(signature, alg) {
      signature = signatureAsBuffer(signature);
      var paramBytes = getParamBytesForAlg(alg);
      var signatureBytes = signature.length;
      if (signatureBytes !== paramBytes * 2) {
        throw new TypeError('"' + alg + '" signatures must be "' + paramBytes * 2 + '" bytes, saw "' + signatureBytes + '"');
      }
      var rPadding = countPadding(signature, 0, paramBytes);
      var sPadding = countPadding(signature, paramBytes, signature.length);
      var rLength = paramBytes - rPadding;
      var sLength = paramBytes - sPadding;
      var rsBytes = 1 + 1 + rLength + 1 + 1 + sLength;
      var shortLength = rsBytes < MAX_OCTET;
      var dst = Buffer3.allocUnsafe((shortLength ? 2 : 3) + rsBytes);
      var offset = 0;
      dst[offset++] = ENCODED_TAG_SEQ;
      if (shortLength) {
        dst[offset++] = rsBytes;
      } else {
        dst[offset++] = MAX_OCTET | 1;
        dst[offset++] = rsBytes & 255;
      }
      dst[offset++] = ENCODED_TAG_INT;
      dst[offset++] = rLength;
      if (rPadding < 0) {
        dst[offset++] = 0;
        offset += signature.copy(dst, offset, 0, paramBytes);
      } else {
        offset += signature.copy(dst, offset, rPadding, paramBytes);
      }
      dst[offset++] = ENCODED_TAG_INT;
      dst[offset++] = sLength;
      if (sPadding < 0) {
        dst[offset++] = 0;
        signature.copy(dst, offset, paramBytes);
      } else {
        signature.copy(dst, offset, paramBytes + sPadding);
      }
      return dst;
    }
    module.exports = {
      derToJose,
      joseToDer
    };
  }
});

// ../../node_modules/buffer-equal-constant-time/index.js
var require_buffer_equal_constant_time = __commonJS({
  "../../node_modules/buffer-equal-constant-time/index.js"(exports, module) {
    "use strict";
    var Buffer3 = __require("buffer").Buffer;
    var SlowBuffer = __require("buffer").SlowBuffer;
    module.exports = bufferEq;
    function bufferEq(a, b) {
      if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b)) {
        return false;
      }
      if (a.length !== b.length) {
        return false;
      }
      var c = 0;
      for (var i = 0; i < a.length; i++) {
        c |= a[i] ^ b[i];
      }
      return c === 0;
    }
    bufferEq.install = function() {
      Buffer3.prototype.equal = SlowBuffer.prototype.equal = function equal(that) {
        return bufferEq(this, that);
      };
    };
    var origBufEqual = Buffer3.prototype.equal;
    var origSlowBufEqual = SlowBuffer.prototype.equal;
    bufferEq.restore = function() {
      Buffer3.prototype.equal = origBufEqual;
      SlowBuffer.prototype.equal = origSlowBufEqual;
    };
  }
});

// ../../node_modules/jwa/index.js
var require_jwa = __commonJS({
  "../../node_modules/jwa/index.js"(exports, module) {
    "use strict";
    var Buffer3 = require_safe_buffer().Buffer;
    var crypto4 = __require("crypto");
    var formatEcdsa = require_ecdsa_sig_formatter();
    var util2 = __require("util");
    var MSG_INVALID_ALGORITHM = '"%s" is not a valid algorithm.\n  Supported algorithms are:\n  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".';
    var MSG_INVALID_SECRET = "secret must be a string or buffer";
    var MSG_INVALID_VERIFIER_KEY = "key must be a string or a buffer";
    var MSG_INVALID_SIGNER_KEY = "key must be a string, a buffer or an object";
    var supportsKeyObjects = typeof crypto4.createPublicKey === "function";
    if (supportsKeyObjects) {
      MSG_INVALID_VERIFIER_KEY += " or a KeyObject";
      MSG_INVALID_SECRET += "or a KeyObject";
    }
    function checkIsPublicKey(key) {
      if (Buffer3.isBuffer(key)) {
        return;
      }
      if (typeof key === "string") {
        return;
      }
      if (!supportsKeyObjects) {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key !== "object") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key.type !== "string") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key.asymmetricKeyType !== "string") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key.export !== "function") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
    }
    function checkIsPrivateKey(key) {
      if (Buffer3.isBuffer(key)) {
        return;
      }
      if (typeof key === "string") {
        return;
      }
      if (typeof key === "object") {
        return;
      }
      throw typeError(MSG_INVALID_SIGNER_KEY);
    }
    function checkIsSecretKey(key) {
      if (Buffer3.isBuffer(key)) {
        return;
      }
      if (typeof key === "string") {
        return key;
      }
      if (!supportsKeyObjects) {
        throw typeError(MSG_INVALID_SECRET);
      }
      if (typeof key !== "object") {
        throw typeError(MSG_INVALID_SECRET);
      }
      if (key.type !== "secret") {
        throw typeError(MSG_INVALID_SECRET);
      }
      if (typeof key.export !== "function") {
        throw typeError(MSG_INVALID_SECRET);
      }
    }
    function fromBase64(base64) {
      return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    function toBase64(base64url) {
      base64url = base64url.toString();
      var padding = 4 - base64url.length % 4;
      if (padding !== 4) {
        for (var i = 0; i < padding; ++i) {
          base64url += "=";
        }
      }
      return base64url.replace(/\-/g, "+").replace(/_/g, "/");
    }
    function typeError(template) {
      var args = [].slice.call(arguments, 1);
      var errMsg = util2.format.bind(util2, template).apply(null, args);
      return new TypeError(errMsg);
    }
    function bufferOrString(obj) {
      return Buffer3.isBuffer(obj) || typeof obj === "string";
    }
    function normalizeInput(thing) {
      if (!bufferOrString(thing))
        thing = JSON.stringify(thing);
      return thing;
    }
    function createHmacSigner(bits) {
      return function sign(thing, secret) {
        checkIsSecretKey(secret);
        thing = normalizeInput(thing);
        var hmac = crypto4.createHmac("sha" + bits, secret);
        var sig = (hmac.update(thing), hmac.digest("base64"));
        return fromBase64(sig);
      };
    }
    var bufferEqual;
    var timingSafeEqual = "timingSafeEqual" in crypto4 ? function timingSafeEqual2(a, b) {
      if (a.byteLength !== b.byteLength) {
        return false;
      }
      return crypto4.timingSafeEqual(a, b);
    } : function timingSafeEqual2(a, b) {
      if (!bufferEqual) {
        bufferEqual = require_buffer_equal_constant_time();
      }
      return bufferEqual(a, b);
    };
    function createHmacVerifier(bits) {
      return function verify(thing, signature, secret) {
        var computedSig = createHmacSigner(bits)(thing, secret);
        return timingSafeEqual(Buffer3.from(signature), Buffer3.from(computedSig));
      };
    }
    function createKeySigner(bits) {
      return function sign(thing, privateKey) {
        checkIsPrivateKey(privateKey);
        thing = normalizeInput(thing);
        var signer = crypto4.createSign("RSA-SHA" + bits);
        var sig = (signer.update(thing), signer.sign(privateKey, "base64"));
        return fromBase64(sig);
      };
    }
    function createKeyVerifier(bits) {
      return function verify(thing, signature, publicKey) {
        checkIsPublicKey(publicKey);
        thing = normalizeInput(thing);
        signature = toBase64(signature);
        var verifier = crypto4.createVerify("RSA-SHA" + bits);
        verifier.update(thing);
        return verifier.verify(publicKey, signature, "base64");
      };
    }
    function createPSSKeySigner(bits) {
      return function sign(thing, privateKey) {
        checkIsPrivateKey(privateKey);
        thing = normalizeInput(thing);
        var signer = crypto4.createSign("RSA-SHA" + bits);
        var sig = (signer.update(thing), signer.sign({
          key: privateKey,
          padding: crypto4.constants.RSA_PKCS1_PSS_PADDING,
          saltLength: crypto4.constants.RSA_PSS_SALTLEN_DIGEST
        }, "base64"));
        return fromBase64(sig);
      };
    }
    function createPSSKeyVerifier(bits) {
      return function verify(thing, signature, publicKey) {
        checkIsPublicKey(publicKey);
        thing = normalizeInput(thing);
        signature = toBase64(signature);
        var verifier = crypto4.createVerify("RSA-SHA" + bits);
        verifier.update(thing);
        return verifier.verify({
          key: publicKey,
          padding: crypto4.constants.RSA_PKCS1_PSS_PADDING,
          saltLength: crypto4.constants.RSA_PSS_SALTLEN_DIGEST
        }, signature, "base64");
      };
    }
    function createECDSASigner(bits) {
      var inner = createKeySigner(bits);
      return function sign() {
        var signature = inner.apply(null, arguments);
        signature = formatEcdsa.derToJose(signature, "ES" + bits);
        return signature;
      };
    }
    function createECDSAVerifer(bits) {
      var inner = createKeyVerifier(bits);
      return function verify(thing, signature, publicKey) {
        signature = formatEcdsa.joseToDer(signature, "ES" + bits).toString("base64");
        var result = inner(thing, signature, publicKey);
        return result;
      };
    }
    function createNoneSigner() {
      return function sign() {
        return "";
      };
    }
    function createNoneVerifier() {
      return function verify(thing, signature) {
        return signature === "";
      };
    }
    module.exports = function jwa(algorithm) {
      var signerFactories = {
        hs: createHmacSigner,
        rs: createKeySigner,
        ps: createPSSKeySigner,
        es: createECDSASigner,
        none: createNoneSigner
      };
      var verifierFactories = {
        hs: createHmacVerifier,
        rs: createKeyVerifier,
        ps: createPSSKeyVerifier,
        es: createECDSAVerifer,
        none: createNoneVerifier
      };
      var match = algorithm.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/);
      if (!match)
        throw typeError(MSG_INVALID_ALGORITHM, algorithm);
      var algo = (match[1] || match[3]).toLowerCase();
      var bits = match[2];
      return {
        sign: signerFactories[algo](bits),
        verify: verifierFactories[algo](bits)
      };
    };
  }
});

// ../../node_modules/jws/lib/tostring.js
var require_tostring = __commonJS({
  "../../node_modules/jws/lib/tostring.js"(exports, module) {
    "use strict";
    var Buffer3 = __require("buffer").Buffer;
    module.exports = function toString(obj) {
      if (typeof obj === "string")
        return obj;
      if (typeof obj === "number" || Buffer3.isBuffer(obj))
        return obj.toString();
      return JSON.stringify(obj);
    };
  }
});

// ../../node_modules/jws/lib/sign-stream.js
var require_sign_stream = __commonJS({
  "../../node_modules/jws/lib/sign-stream.js"(exports, module) {
    "use strict";
    var Buffer3 = require_safe_buffer().Buffer;
    var DataStream = require_data_stream();
    var jwa = require_jwa();
    var Stream = __require("stream");
    var toString = require_tostring();
    var util2 = __require("util");
    function base64url(string, encoding) {
      return Buffer3.from(string, encoding).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    function jwsSecuredInput(header, payload, encoding) {
      encoding = encoding || "utf8";
      var encodedHeader = base64url(toString(header), "binary");
      var encodedPayload = base64url(toString(payload), encoding);
      return util2.format("%s.%s", encodedHeader, encodedPayload);
    }
    function jwsSign(opts) {
      var header = opts.header;
      var payload = opts.payload;
      var secretOrKey = opts.secret || opts.privateKey;
      var encoding = opts.encoding;
      var algo = jwa(header.alg);
      var securedInput = jwsSecuredInput(header, payload, encoding);
      var signature = algo.sign(securedInput, secretOrKey);
      return util2.format("%s.%s", securedInput, signature);
    }
    function SignStream(opts) {
      var secret = opts.secret;
      secret = secret == null ? opts.privateKey : secret;
      secret = secret == null ? opts.key : secret;
      if (/^hs/i.test(opts.header.alg) === true && secret == null) {
        throw new TypeError("secret must be a string or buffer or a KeyObject");
      }
      var secretStream = new DataStream(secret);
      this.readable = true;
      this.header = opts.header;
      this.encoding = opts.encoding;
      this.secret = this.privateKey = this.key = secretStream;
      this.payload = new DataStream(opts.payload);
      this.secret.once("close", function() {
        if (!this.payload.writable && this.readable)
          this.sign();
      }.bind(this));
      this.payload.once("close", function() {
        if (!this.secret.writable && this.readable)
          this.sign();
      }.bind(this));
    }
    util2.inherits(SignStream, Stream);
    SignStream.prototype.sign = function sign() {
      try {
        var signature = jwsSign({
          header: this.header,
          payload: this.payload.buffer,
          secret: this.secret.buffer,
          encoding: this.encoding
        });
        this.emit("done", signature);
        this.emit("data", signature);
        this.emit("end");
        this.readable = false;
        return signature;
      } catch (e) {
        this.readable = false;
        this.emit("error", e);
        this.emit("close");
      }
    };
    SignStream.sign = jwsSign;
    module.exports = SignStream;
  }
});

// ../../node_modules/jws/lib/verify-stream.js
var require_verify_stream = __commonJS({
  "../../node_modules/jws/lib/verify-stream.js"(exports, module) {
    "use strict";
    var Buffer3 = require_safe_buffer().Buffer;
    var DataStream = require_data_stream();
    var jwa = require_jwa();
    var Stream = __require("stream");
    var toString = require_tostring();
    var util2 = __require("util");
    var JWS_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;
    function isObject2(thing) {
      return Object.prototype.toString.call(thing) === "[object Object]";
    }
    function safeJsonParse(thing) {
      if (isObject2(thing))
        return thing;
      try {
        return JSON.parse(thing);
      } catch (e) {
        return void 0;
      }
    }
    function headerFromJWS(jwsSig) {
      var encodedHeader = jwsSig.split(".", 1)[0];
      return safeJsonParse(Buffer3.from(encodedHeader, "base64").toString("binary"));
    }
    function securedInputFromJWS(jwsSig) {
      return jwsSig.split(".", 2).join(".");
    }
    function signatureFromJWS(jwsSig) {
      return jwsSig.split(".")[2];
    }
    function payloadFromJWS(jwsSig, encoding) {
      encoding = encoding || "utf8";
      var payload = jwsSig.split(".")[1];
      return Buffer3.from(payload, "base64").toString(encoding);
    }
    function isValidJws(string) {
      return JWS_REGEX.test(string) && !!headerFromJWS(string);
    }
    function jwsVerify(jwsSig, algorithm, secretOrKey) {
      if (!algorithm) {
        var err = new Error("Missing algorithm parameter for jws.verify");
        err.code = "MISSING_ALGORITHM";
        throw err;
      }
      jwsSig = toString(jwsSig);
      var signature = signatureFromJWS(jwsSig);
      var securedInput = securedInputFromJWS(jwsSig);
      var algo = jwa(algorithm);
      return algo.verify(securedInput, signature, secretOrKey);
    }
    function jwsDecode(jwsSig, opts) {
      opts = opts || {};
      jwsSig = toString(jwsSig);
      if (!isValidJws(jwsSig))
        return null;
      var header = headerFromJWS(jwsSig);
      if (!header)
        return null;
      var payload = payloadFromJWS(jwsSig);
      if (header.typ === "JWT" || opts.json)
        payload = JSON.parse(payload, opts.encoding);
      return {
        header,
        payload,
        signature: signatureFromJWS(jwsSig)
      };
    }
    function VerifyStream(opts) {
      opts = opts || {};
      var secretOrKey = opts.secret;
      secretOrKey = secretOrKey == null ? opts.publicKey : secretOrKey;
      secretOrKey = secretOrKey == null ? opts.key : secretOrKey;
      if (/^hs/i.test(opts.algorithm) === true && secretOrKey == null) {
        throw new TypeError("secret must be a string or buffer or a KeyObject");
      }
      var secretStream = new DataStream(secretOrKey);
      this.readable = true;
      this.algorithm = opts.algorithm;
      this.encoding = opts.encoding;
      this.secret = this.publicKey = this.key = secretStream;
      this.signature = new DataStream(opts.signature);
      this.secret.once("close", function() {
        if (!this.signature.writable && this.readable)
          this.verify();
      }.bind(this));
      this.signature.once("close", function() {
        if (!this.secret.writable && this.readable)
          this.verify();
      }.bind(this));
    }
    util2.inherits(VerifyStream, Stream);
    VerifyStream.prototype.verify = function verify() {
      try {
        var valid = jwsVerify(this.signature.buffer, this.algorithm, this.key.buffer);
        var obj = jwsDecode(this.signature.buffer, this.encoding);
        this.emit("done", valid, obj);
        this.emit("data", valid);
        this.emit("end");
        this.readable = false;
        return valid;
      } catch (e) {
        this.readable = false;
        this.emit("error", e);
        this.emit("close");
      }
    };
    VerifyStream.decode = jwsDecode;
    VerifyStream.isValid = isValidJws;
    VerifyStream.verify = jwsVerify;
    module.exports = VerifyStream;
  }
});

// ../../node_modules/jws/index.js
var require_jws = __commonJS({
  "../../node_modules/jws/index.js"(exports) {
    "use strict";
    var SignStream = require_sign_stream();
    var VerifyStream = require_verify_stream();
    var ALGORITHMS = [
      "HS256",
      "HS384",
      "HS512",
      "RS256",
      "RS384",
      "RS512",
      "PS256",
      "PS384",
      "PS512",
      "ES256",
      "ES384",
      "ES512"
    ];
    exports.ALGORITHMS = ALGORITHMS;
    exports.sign = SignStream.sign;
    exports.verify = VerifyStream.verify;
    exports.decode = VerifyStream.decode;
    exports.isValid = VerifyStream.isValid;
    exports.createSign = function createSign(opts) {
      return new SignStream(opts);
    };
    exports.createVerify = function createVerify(opts) {
      return new VerifyStream(opts);
    };
  }
});

// ../../node_modules/jsonwebtoken/decode.js
var require_decode = __commonJS({
  "../../node_modules/jsonwebtoken/decode.js"(exports, module) {
    "use strict";
    var jws = require_jws();
    module.exports = function(jwt2, options) {
      options = options || {};
      var decoded = jws.decode(jwt2, options);
      if (!decoded) {
        return null;
      }
      var payload = decoded.payload;
      if (typeof payload === "string") {
        try {
          var obj = JSON.parse(payload);
          if (obj !== null && typeof obj === "object") {
            payload = obj;
          }
        } catch (e) {
        }
      }
      if (options.complete === true) {
        return {
          header: decoded.header,
          payload,
          signature: decoded.signature
        };
      }
      return payload;
    };
  }
});

// ../../node_modules/jsonwebtoken/lib/JsonWebTokenError.js
var require_JsonWebTokenError = __commonJS({
  "../../node_modules/jsonwebtoken/lib/JsonWebTokenError.js"(exports, module) {
    "use strict";
    var JsonWebTokenError = function(message, error) {
      Error.call(this, message);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
      this.name = "JsonWebTokenError";
      this.message = message;
      if (error) this.inner = error;
    };
    JsonWebTokenError.prototype = Object.create(Error.prototype);
    JsonWebTokenError.prototype.constructor = JsonWebTokenError;
    module.exports = JsonWebTokenError;
  }
});

// ../../node_modules/jsonwebtoken/lib/NotBeforeError.js
var require_NotBeforeError = __commonJS({
  "../../node_modules/jsonwebtoken/lib/NotBeforeError.js"(exports, module) {
    "use strict";
    var JsonWebTokenError = require_JsonWebTokenError();
    var NotBeforeError = function(message, date) {
      JsonWebTokenError.call(this, message);
      this.name = "NotBeforeError";
      this.date = date;
    };
    NotBeforeError.prototype = Object.create(JsonWebTokenError.prototype);
    NotBeforeError.prototype.constructor = NotBeforeError;
    module.exports = NotBeforeError;
  }
});

// ../../node_modules/jsonwebtoken/lib/TokenExpiredError.js
var require_TokenExpiredError = __commonJS({
  "../../node_modules/jsonwebtoken/lib/TokenExpiredError.js"(exports, module) {
    "use strict";
    var JsonWebTokenError = require_JsonWebTokenError();
    var TokenExpiredError = function(message, expiredAt) {
      JsonWebTokenError.call(this, message);
      this.name = "TokenExpiredError";
      this.expiredAt = expiredAt;
    };
    TokenExpiredError.prototype = Object.create(JsonWebTokenError.prototype);
    TokenExpiredError.prototype.constructor = TokenExpiredError;
    module.exports = TokenExpiredError;
  }
});

// ../../node_modules/ms/index.js
var require_ms = __commonJS({
  "../../node_modules/ms/index.js"(exports, module) {
    "use strict";
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse2(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse2(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name3) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name3 + (isPlural ? "s" : "");
    }
  }
});

// ../../node_modules/jsonwebtoken/lib/timespan.js
var require_timespan = __commonJS({
  "../../node_modules/jsonwebtoken/lib/timespan.js"(exports, module) {
    "use strict";
    var ms = require_ms();
    module.exports = function(time, iat) {
      var timestamp = iat || Math.floor(Date.now() / 1e3);
      if (typeof time === "string") {
        var milliseconds = ms(time);
        if (typeof milliseconds === "undefined") {
          return;
        }
        return Math.floor(timestamp + milliseconds / 1e3);
      } else if (typeof time === "number") {
        return timestamp + time;
      } else {
        return;
      }
    };
  }
});

// ../../node_modules/semver/internal/constants.js
var require_constants = __commonJS({
  "../../node_modules/semver/internal/constants.js"(exports, module) {
    "use strict";
    var SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
    9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
    var RELEASE_TYPES = [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ];
    module.exports = {
      MAX_LENGTH,
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_SAFE_INTEGER,
      RELEASE_TYPES,
      SEMVER_SPEC_VERSION,
      FLAG_INCLUDE_PRERELEASE: 1,
      FLAG_LOOSE: 2
    };
  }
});

// ../../node_modules/semver/internal/debug.js
var require_debug = __commonJS({
  "../../node_modules/semver/internal/debug.js"(exports, module) {
    "use strict";
    var debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
    };
    module.exports = debug;
  }
});

// ../../node_modules/semver/internal/re.js
var require_re = __commonJS({
  "../../node_modules/semver/internal/re.js"(exports, module) {
    "use strict";
    var {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = require_constants();
    var debug = require_debug();
    exports = module.exports = {};
    var re = exports.re = [];
    var safeRe = exports.safeRe = [];
    var src = exports.src = [];
    var safeSrc = exports.safeSrc = [];
    var t = exports.t = {};
    var R = 0;
    var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    var safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    var makeSafeRegex = (value) => {
      for (const [token, max] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
      }
      return value;
    };
    var createToken = (name3, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R++;
      debug(name3, index, value);
      t[name3] = index;
      src[index] = value;
      safeSrc[index] = safe;
      re[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
    createToken("FULL", `^${src[t.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
    createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?(?:${src[t.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t.COERCE], true);
    createToken("COERCERTLFULL", src[t.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }
});

// ../../node_modules/semver/internal/parse-options.js
var require_parse_options = __commonJS({
  "../../node_modules/semver/internal/parse-options.js"(exports, module) {
    "use strict";
    var looseOption = Object.freeze({ loose: true });
    var emptyOpts = Object.freeze({});
    var parseOptions = (options) => {
      if (!options) {
        return emptyOpts;
      }
      if (typeof options !== "object") {
        return looseOption;
      }
      return options;
    };
    module.exports = parseOptions;
  }
});

// ../../node_modules/semver/internal/identifiers.js
var require_identifiers = __commonJS({
  "../../node_modules/semver/internal/identifiers.js"(exports, module) {
    "use strict";
    var numeric = /^[0-9]+$/;
    var compareIdentifiers = (a, b) => {
      if (typeof a === "number" && typeof b === "number") {
        return a === b ? 0 : a < b ? -1 : 1;
      }
      const anum = numeric.test(a);
      const bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    };
    var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
    module.exports = {
      compareIdentifiers,
      rcompareIdentifiers
    };
  }
});

// ../../node_modules/semver/classes/semver.js
var require_semver = __commonJS({
  "../../node_modules/semver/classes/semver.js"(exports, module) {
    "use strict";
    var debug = require_debug();
    var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants();
    var { safeRe: re, t } = require_re();
    var parseOptions = require_parse_options();
    var { compareIdentifiers } = require_identifiers();
    var isPrereleaseIdentifier = (prerelease, identifier) => {
      const identifiers = identifier.split(".");
      if (identifiers.length > prerelease.length) {
        return false;
      }
      for (let i = 0; i < identifiers.length; i++) {
        if (compareIdentifiers(prerelease[i], identifiers[i]) !== 0) {
          return false;
        }
      }
      return true;
    };
    var SemVer = class _SemVer {
      constructor(version3, options) {
        options = parseOptions(options);
        if (version3 instanceof _SemVer) {
          if (version3.loose === !!options.loose && version3.includePrerelease === !!options.includePrerelease) {
            return version3;
          } else {
            version3 = version3.version;
          }
        } else if (typeof version3 !== "string") {
          throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version3}".`);
        }
        if (version3.length > MAX_LENGTH) {
          throw new TypeError(
            `version is longer than ${MAX_LENGTH} characters`
          );
        }
        debug("SemVer", version3, options);
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        const m = version3.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) {
          throw new TypeError(`Invalid Version: ${version3}`);
        }
        this.raw = version3;
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
      }
      format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join(".")}`;
        }
        return this.version;
      }
      toString() {
        return this.version;
      }
      compare(other) {
        debug("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof _SemVer)) {
          if (typeof other === "string" && other === this.version) {
            return 0;
          }
          other = new _SemVer(other, this.options);
        }
        if (other.version === this.version) {
          return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
      }
      compareMain(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.major < other.major) {
          return -1;
        }
        if (this.major > other.major) {
          return 1;
        }
        if (this.minor < other.minor) {
          return -1;
        }
        if (this.minor > other.minor) {
          return 1;
        }
        if (this.patch < other.patch) {
          return -1;
        }
        if (this.patch > other.patch) {
          return 1;
        }
        return 0;
      }
      comparePre(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        let i = 0;
        do {
          const a = this.prerelease[i];
          const b = other.prerelease[i];
          debug("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      compareBuild(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        let i = 0;
        do {
          const a = this.build[i];
          const b = other.build[i];
          debug("build compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      // preminor will bump the version up to the next minor release, and immediately
      // down to pre-release. premajor and prepatch work the same way.
      inc(release, identifier, identifierBase) {
        if (release.startsWith("pre")) {
          if (!identifier && identifierBase === false) {
            throw new Error("invalid increment argument: identifier is empty");
          }
          if (identifier) {
            const match = `-${identifier}`.match(this.options.loose ? re[t.PRERELEASELOOSE] : re[t.PRERELEASE]);
            if (!match || match[1] !== identifier) {
              throw new Error(`invalid identifier: ${identifier}`);
            }
          }
        }
        switch (release) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier, identifierBase);
            this.inc("pre", identifier, identifierBase);
            break;
          // If the input is a non-prerelease version, this acts the same as
          // prepatch.
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier, identifierBase);
            }
            this.inc("pre", identifier, identifierBase);
            break;
          case "release":
            if (this.prerelease.length === 0) {
              throw new Error(`version ${this.raw} is not a prerelease`);
            }
            this.prerelease.length = 0;
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          // This probably shouldn't be used publicly.
          // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
          case "pre": {
            const base = Number(identifierBase) ? 1 : 0;
            if (this.prerelease.length === 0) {
              this.prerelease = [base];
            } else {
              let i = this.prerelease.length;
              while (--i >= 0) {
                if (typeof this.prerelease[i] === "number") {
                  this.prerelease[i]++;
                  i = -2;
                }
              }
              if (i === -1) {
                if (identifier === this.prerelease.join(".") && identifierBase === false) {
                  throw new Error("invalid increment argument: identifier already exists");
                }
                this.prerelease.push(base);
              }
            }
            if (identifier) {
              let prerelease = [identifier, base];
              if (identifierBase === false) {
                prerelease = [identifier];
              }
              if (isPrereleaseIdentifier(this.prerelease, identifier)) {
                const prereleaseBase = this.prerelease[identifier.split(".").length];
                if (isNaN(prereleaseBase)) {
                  this.prerelease = prerelease;
                }
              } else {
                this.prerelease = prerelease;
              }
            }
            break;
          }
          default:
            throw new Error(`invalid increment argument: ${release}`);
        }
        this.raw = this.format();
        if (this.build.length) {
          this.raw += `+${this.build.join(".")}`;
        }
        return this;
      }
    };
    module.exports = SemVer;
  }
});

// ../../node_modules/semver/functions/parse.js
var require_parse = __commonJS({
  "../../node_modules/semver/functions/parse.js"(exports, module) {
    "use strict";
    var SemVer = require_semver();
    var parse2 = (version3, options, throwErrors = false) => {
      if (version3 instanceof SemVer) {
        return version3;
      }
      try {
        return new SemVer(version3, options);
      } catch (er) {
        if (!throwErrors) {
          return null;
        }
        throw er;
      }
    };
    module.exports = parse2;
  }
});

// ../../node_modules/semver/functions/valid.js
var require_valid = __commonJS({
  "../../node_modules/semver/functions/valid.js"(exports, module) {
    "use strict";
    var parse2 = require_parse();
    var valid = (version3, options) => {
      const v = parse2(version3, options);
      return v ? v.version : null;
    };
    module.exports = valid;
  }
});

// ../../node_modules/semver/functions/clean.js
var require_clean = __commonJS({
  "../../node_modules/semver/functions/clean.js"(exports, module) {
    "use strict";
    var parse2 = require_parse();
    var clean = (version3, options) => {
      const s = parse2(version3.trim().replace(/^[=v]+/, ""), options);
      return s ? s.version : null;
    };
    module.exports = clean;
  }
});

// ../../node_modules/semver/functions/inc.js
var require_inc = __commonJS({
  "../../node_modules/semver/functions/inc.js"(exports, module) {
    "use strict";
    var SemVer = require_semver();
    var inc = (version3, release, options, identifier, identifierBase) => {
      if (typeof options === "string") {
        identifierBase = identifier;
        identifier = options;
        options = void 0;
      }
      try {
        return new SemVer(
          version3 instanceof SemVer ? version3.version : version3,
          options
        ).inc(release, identifier, identifierBase).version;
      } catch (er) {
        return null;
      }
    };
    module.exports = inc;
  }
});

// ../../node_modules/semver/functions/diff.js
var require_diff = __commonJS({
  "../../node_modules/semver/functions/diff.js"(exports, module) {
    "use strict";
    var parse2 = require_parse();
    var diff = (version1, version22) => {
      const v1 = parse2(version1, null, true);
      const v2 = parse2(version22, null, true);
      const comparison = v1.compare(v2);
      if (comparison === 0) {
        return null;
      }
      const v1Higher = comparison > 0;
      const highVersion = v1Higher ? v1 : v2;
      const lowVersion = v1Higher ? v2 : v1;
      const highHasPre = !!highVersion.prerelease.length;
      const lowHasPre = !!lowVersion.prerelease.length;
      if (lowHasPre && !highHasPre) {
        if (!lowVersion.patch && !lowVersion.minor) {
          return "major";
        }
        if (lowVersion.compareMain(highVersion) === 0) {
          if (lowVersion.minor && !lowVersion.patch) {
            return "minor";
          }
          return "patch";
        }
      }
      const prefix = highHasPre ? "pre" : "";
      if (v1.major !== v2.major) {
        return prefix + "major";
      }
      if (v1.minor !== v2.minor) {
        return prefix + "minor";
      }
      if (v1.patch !== v2.patch) {
        return prefix + "patch";
      }
      return "prerelease";
    };
    module.exports = diff;
  }
});

// ../../node_modules/semver/functions/major.js
var require_major = __commonJS({
  "../../node_modules/semver/functions/major.js"(exports, module) {
    "use strict";
    var SemVer = require_semver();
    var major = (a, loose) => new SemVer(a, loose).major;
    module.exports = major;
  }
});

// ../../node_modules/semver/functions/minor.js
var require_minor = __commonJS({
  "../../node_modules/semver/functions/minor.js"(exports, module) {
    "use strict";
    var SemVer = require_semver();
    var minor = (a, loose) => new SemVer(a, loose).minor;
    module.exports = minor;
  }
});

// ../../node_modules/semver/functions/patch.js
var require_patch = __commonJS({
  "../../node_modules/semver/functions/patch.js"(exports, module) {
    "use strict";
    var SemVer = require_semver();
    var patch = (a, loose) => new SemVer(a, loose).patch;
    module.exports = patch;
  }
});

// ../../node_modules/semver/functions/prerelease.js
var require_prerelease = __commonJS({
  "../../node_modules/semver/functions/prerelease.js"(exports, module) {
    "use strict";
    var parse2 = require_parse();
    var prerelease = (version3, options) => {
      const parsed = parse2(version3, options);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    };
    module.exports = prerelease;
  }
});

// ../../node_modules/semver/functions/compare.js
var require_compare = __commonJS({
  "../../node_modules/semver/functions/compare.js"(exports, module) {
    "use strict";
    var SemVer = require_semver();
    var compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
    module.exports = compare;
  }
});

// ../../node_modules/semver/functions/rcompare.js
var require_rcompare = __commonJS({
  "../../node_modules/semver/functions/rcompare.js"(exports, module) {
    "use strict";
    var compare = require_compare();
    var rcompare = (a, b, loose) => compare(b, a, loose);
    module.exports = rcompare;
  }
});

// ../../node_modules/semver/functions/compare-loose.js
var require_compare_loose = __commonJS({
  "../../node_modules/semver/functions/compare-loose.js"(exports, module) {
    "use strict";
    var compare = require_compare();
    var compareLoose = (a, b) => compare(a, b, true);
    module.exports = compareLoose;
  }
});

// ../../node_modules/semver/functions/compare-build.js
var require_compare_build = __commonJS({
  "../../node_modules/semver/functions/compare-build.js"(exports, module) {
    "use strict";
    var SemVer = require_semver();
    var compareBuild = (a, b, loose) => {
      const versionA = new SemVer(a, loose);
      const versionB = new SemVer(b, loose);
      return versionA.compare(versionB) || versionA.compareBuild(versionB);
    };
    module.exports = compareBuild;
  }
});

// ../../node_modules/semver/functions/sort.js
var require_sort = __commonJS({
  "../../node_modules/semver/functions/sort.js"(exports, module) {
    "use strict";
    var compareBuild = require_compare_build();
    var sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
    module.exports = sort;
  }
});

// ../../node_modules/semver/functions/rsort.js
var require_rsort = __commonJS({
  "../../node_modules/semver/functions/rsort.js"(exports, module) {
    "use strict";
    var compareBuild = require_compare_build();
    var rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
    module.exports = rsort;
  }
});

// ../../node_modules/semver/functions/gt.js
var require_gt = __commonJS({
  "../../node_modules/semver/functions/gt.js"(exports, module) {
    "use strict";
    var compare = require_compare();
    var gt = (a, b, loose) => compare(a, b, loose) > 0;
    module.exports = gt;
  }
});

// ../../node_modules/semver/functions/lt.js
var require_lt = __commonJS({
  "../../node_modules/semver/functions/lt.js"(exports, module) {
    "use strict";
    var compare = require_compare();
    var lt = (a, b, loose) => compare(a, b, loose) < 0;
    module.exports = lt;
  }
});

// ../../node_modules/semver/functions/eq.js
var require_eq = __commonJS({
  "../../node_modules/semver/functions/eq.js"(exports, module) {
    "use strict";
    var compare = require_compare();
    var eq = (a, b, loose) => compare(a, b, loose) === 0;
    module.exports = eq;
  }
});

// ../../node_modules/semver/functions/neq.js
var require_neq = __commonJS({
  "../../node_modules/semver/functions/neq.js"(exports, module) {
    "use strict";
    var compare = require_compare();
    var neq = (a, b, loose) => compare(a, b, loose) !== 0;
    module.exports = neq;
  }
});

// ../../node_modules/semver/functions/gte.js
var require_gte = __commonJS({
  "../../node_modules/semver/functions/gte.js"(exports, module) {
    "use strict";
    var compare = require_compare();
    var gte = (a, b, loose) => compare(a, b, loose) >= 0;
    module.exports = gte;
  }
});

// ../../node_modules/semver/functions/lte.js
var require_lte = __commonJS({
  "../../node_modules/semver/functions/lte.js"(exports, module) {
    "use strict";
    var compare = require_compare();
    var lte = (a, b, loose) => compare(a, b, loose) <= 0;
    module.exports = lte;
  }
});

// ../../node_modules/semver/functions/cmp.js
var require_cmp = __commonJS({
  "../../node_modules/semver/functions/cmp.js"(exports, module) {
    "use strict";
    var eq = require_eq();
    var neq = require_neq();
    var gt = require_gt();
    var gte = require_gte();
    var lt = require_lt();
    var lte = require_lte();
    var cmp = (a, op, b, loose) => {
      switch (op) {
        case "===":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a === b;
        case "!==":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError(`Invalid operator: ${op}`);
      }
    };
    module.exports = cmp;
  }
});

// ../../node_modules/semver/functions/coerce.js
var require_coerce = __commonJS({
  "../../node_modules/semver/functions/coerce.js"(exports, module) {
    "use strict";
    var SemVer = require_semver();
    var parse2 = require_parse();
    var { safeRe: re, t } = require_re();
    var coerce = (version3, options) => {
      if (version3 instanceof SemVer) {
        return version3;
      }
      if (typeof version3 === "number") {
        version3 = String(version3);
      }
      if (typeof version3 !== "string") {
        return null;
      }
      options = options || {};
      let match = null;
      if (!options.rtl) {
        match = version3.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
      } else {
        const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
        let next;
        while ((next = coerceRtlRegex.exec(version3)) && (!match || match.index + match[0].length !== version3.length)) {
          if (!match || next.index + next[0].length !== match.index + match[0].length) {
            match = next;
          }
          coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
        }
        coerceRtlRegex.lastIndex = -1;
      }
      if (match === null) {
        return null;
      }
      const major = match[2];
      const minor = match[3] || "0";
      const patch = match[4] || "0";
      const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : "";
      const build = options.includePrerelease && match[6] ? `+${match[6]}` : "";
      return parse2(`${major}.${minor}.${patch}${prerelease}${build}`, options);
    };
    module.exports = coerce;
  }
});

// ../../node_modules/semver/functions/truncate.js
var require_truncate = __commonJS({
  "../../node_modules/semver/functions/truncate.js"(exports, module) {
    "use strict";
    var parse2 = require_parse();
    var constants2 = require_constants();
    var SemVer = require_semver();
    var truncate = (version3, truncation, options) => {
      if (!constants2.RELEASE_TYPES.includes(truncation)) {
        return null;
      }
      const clonedVersion = cloneInputVersion(version3, options);
      return clonedVersion && doTruncation(clonedVersion, truncation);
    };
    var cloneInputVersion = (version3, options) => {
      const versionStringToParse = version3 instanceof SemVer ? version3.version : version3;
      return parse2(versionStringToParse, options);
    };
    var doTruncation = (version3, truncation) => {
      if (isPrerelease(truncation)) {
        return version3.version;
      }
      version3.prerelease = [];
      switch (truncation) {
        case "major":
          version3.minor = 0;
          version3.patch = 0;
          break;
        case "minor":
          version3.patch = 0;
          break;
      }
      return version3.format();
    };
    var isPrerelease = (type) => {
      return type.startsWith("pre");
    };
    module.exports = truncate;
  }
});

// ../../node_modules/semver/internal/lrucache.js
var require_lrucache = __commonJS({
  "../../node_modules/semver/internal/lrucache.js"(exports, module) {
    "use strict";
    var LRUCache = class {
      constructor() {
        this.max = 1e3;
        this.map = /* @__PURE__ */ new Map();
      }
      get(key) {
        const value = this.map.get(key);
        if (value === void 0) {
          return void 0;
        } else {
          this.map.delete(key);
          this.map.set(key, value);
          return value;
        }
      }
      delete(key) {
        return this.map.delete(key);
      }
      set(key, value) {
        const deleted = this.delete(key);
        if (!deleted && value !== void 0) {
          if (this.map.size >= this.max) {
            const firstKey = this.map.keys().next().value;
            this.delete(firstKey);
          }
          this.map.set(key, value);
        }
        return this;
      }
    };
    module.exports = LRUCache;
  }
});

// ../../node_modules/semver/classes/range.js
var require_range = __commonJS({
  "../../node_modules/semver/classes/range.js"(exports, module) {
    "use strict";
    var SPACE_CHARACTERS = /\s+/g;
    var Range = class _Range {
      constructor(range, options) {
        options = parseOptions(options);
        if (range instanceof _Range) {
          if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
            return range;
          } else {
            return new _Range(range.raw, options);
          }
        }
        if (range instanceof Comparator) {
          this.raw = range.value;
          this.set = [[range]];
          this.formatted = void 0;
          return this;
        }
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        this.raw = range.trim().replace(SPACE_CHARACTERS, " ");
        this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
        if (!this.set.length) {
          throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
        }
        if (this.set.length > 1) {
          const first = this.set[0];
          this.set = this.set.filter((c) => !isNullSet(c[0]));
          if (this.set.length === 0) {
            this.set = [first];
          } else if (this.set.length > 1) {
            for (const c of this.set) {
              if (c.length === 1 && isAny(c[0])) {
                this.set = [c];
                break;
              }
            }
          }
        }
        this.formatted = void 0;
      }
      get range() {
        if (this.formatted === void 0) {
          this.formatted = "";
          for (let i = 0; i < this.set.length; i++) {
            if (i > 0) {
              this.formatted += "||";
            }
            const comps = this.set[i];
            for (let k = 0; k < comps.length; k++) {
              if (k > 0) {
                this.formatted += " ";
              }
              this.formatted += comps[k].toString().trim();
            }
          }
        }
        return this.formatted;
      }
      format() {
        return this.range;
      }
      toString() {
        return this.range;
      }
      parseRange(range) {
        range = range.replace(BUILDSTRIPRE, "");
        const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
        const memoKey = memoOpts + ":" + range;
        const cached = cache.get(memoKey);
        if (cached) {
          return cached;
        }
        const loose = this.options.loose;
        const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
        debug("hyphen replace", range);
        range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
        debug("comparator trim", range);
        range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
        debug("tilde trim", range);
        range = range.replace(re[t.CARETTRIM], caretTrimReplace);
        debug("caret trim", range);
        let rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
        if (loose) {
          rangeList = rangeList.filter((comp) => {
            debug("loose invalid filter", comp, this.options);
            return !!comp.match(re[t.COMPARATORLOOSE]);
          });
        }
        debug("range list", rangeList);
        const rangeMap = /* @__PURE__ */ new Map();
        const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
        for (const comp of comparators) {
          if (isNullSet(comp)) {
            return [comp];
          }
          rangeMap.set(comp.value, comp);
        }
        if (rangeMap.size > 1 && rangeMap.has("")) {
          rangeMap.delete("");
        }
        const result = [...rangeMap.values()];
        cache.set(memoKey, result);
        return result;
      }
      intersects(range, options) {
        if (!(range instanceof _Range)) {
          throw new TypeError("a Range is required");
        }
        return this.set.some((thisComparators) => {
          return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => {
            return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                return thisComparator.intersects(rangeComparator, options);
              });
            });
          });
        });
      }
      // if ANY of the sets match ALL of its comparators, then pass
      test(version3) {
        if (!version3) {
          return false;
        }
        if (typeof version3 === "string") {
          try {
            version3 = new SemVer(version3, this.options);
          } catch (er) {
            return false;
          }
        }
        for (let i = 0; i < this.set.length; i++) {
          if (testSet(this.set[i], version3, this.options)) {
            return true;
          }
        }
        return false;
      }
    };
    module.exports = Range;
    var LRU = require_lrucache();
    var cache = new LRU();
    var parseOptions = require_parse_options();
    var Comparator = require_comparator();
    var debug = require_debug();
    var SemVer = require_semver();
    var {
      safeRe: re,
      src,
      t,
      comparatorTrimReplace,
      tildeTrimReplace,
      caretTrimReplace
    } = require_re();
    var { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = require_constants();
    var BUILDSTRIPRE = new RegExp(src[t.BUILD], "g");
    var isNullSet = (c) => c.value === "<0.0.0-0";
    var isAny = (c) => c.value === "";
    var isSatisfiable = (comparators, options) => {
      let result = true;
      const remainingComparators = comparators.slice();
      let testComparator = remainingComparators.pop();
      while (result && remainingComparators.length) {
        result = remainingComparators.every((otherComparator) => {
          return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
      }
      return result;
    };
    var parseComparator = (comp, options) => {
      comp = comp.replace(re[t.BUILD], "");
      debug("comp", comp, options);
      comp = replaceCarets(comp, options);
      debug("caret", comp);
      comp = replaceTildes(comp, options);
      debug("tildes", comp);
      comp = replaceXRanges(comp, options);
      debug("xrange", comp);
      comp = replaceStars(comp, options);
      debug("stars", comp);
      return comp;
    };
    var isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
    var invalidXRangeOrder = (M, m, p) => isX(M) && !isX(m) || isX(m) && p && !isX(p);
    var replaceTildes = (comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" ");
    };
    var replaceTilde = (comp, options) => {
      const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
      const z = options.includePrerelease ? "-0" : "";
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("tilde", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
        } else if (pr) {
          debug("replaceTilde pr", pr);
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
        }
        debug("tilde return", ret);
        return ret;
      });
    };
    var replaceCarets = (comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" ");
    };
    var replaceCaret = (comp, options) => {
      debug("caret", comp, options);
      const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
      const z = options.includePrerelease ? "-0" : "";
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("caret", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          if (M === "0") {
            ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
          } else {
            ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
          }
        } else if (pr) {
          debug("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
          }
        } else {
          debug("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
          }
        }
        debug("caret return", ret);
        return ret;
      });
    };
    var replaceXRanges = (comp, options) => {
      debug("replaceXRanges", comp, options);
      return comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ");
    };
    var replaceXRange = (comp, options) => {
      comp = comp.trim();
      const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
      return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
        debug("xRange", comp, ret, gtlt, M, m, p, pr);
        if (invalidXRangeOrder(M, m, p)) {
          return comp;
        }
        const xM = isX(M);
        const xm = xM || isX(m);
        const xp = xm || isX(p);
        const anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        pr = options.includePrerelease ? "-0" : "";
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0-0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          if (gtlt === "<") {
            pr = "-0";
          }
          ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) {
          ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        } else if (xp) {
          ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
        }
        debug("xRange return", ret);
        return ret;
      });
    };
    var replaceStars = (comp, options) => {
      debug("replaceStars", comp, options);
      return comp.trim().replace(re[t.STAR], "");
    };
    var replaceGTE0 = (comp, options) => {
      debug("replaceGTE0", comp, options);
      return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
    };
    var hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
      } else if (isX(fp)) {
        from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
      } else if (fpr) {
        from = `>=${from}`;
      } else {
        from = `>=${from}${incPr ? "-0" : ""}`;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = `<${+tM + 1}.0.0-0`;
      } else if (isX(tp)) {
        to = `<${tM}.${+tm + 1}.0-0`;
      } else if (tpr) {
        to = `<=${tM}.${tm}.${tp}-${tpr}`;
      } else if (incPr) {
        to = `<${tM}.${tm}.${+tp + 1}-0`;
      } else {
        to = `<=${to}`;
      }
      return `${from} ${to}`.trim();
    };
    var testSet = (set, version3, options) => {
      for (let i = 0; i < set.length; i++) {
        if (!set[i].test(version3)) {
          return false;
        }
      }
      if (version3.prerelease.length && !options.includePrerelease) {
        for (let i = 0; i < set.length; i++) {
          debug(set[i].semver);
          if (set[i].semver === Comparator.ANY) {
            continue;
          }
          if (set[i].semver.prerelease.length > 0) {
            const allowed = set[i].semver;
            if (allowed.major === version3.major && allowed.minor === version3.minor && allowed.patch === version3.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    };
  }
});

// ../../node_modules/semver/classes/comparator.js
var require_comparator = __commonJS({
  "../../node_modules/semver/classes/comparator.js"(exports, module) {
    "use strict";
    var ANY = /* @__PURE__ */ Symbol("SemVer ANY");
    var Comparator = class _Comparator {
      static get ANY() {
        return ANY;
      }
      constructor(comp, options) {
        options = parseOptions(options);
        if (comp instanceof _Comparator) {
          if (comp.loose === !!options.loose) {
            return comp;
          } else {
            comp = comp.value;
          }
        }
        comp = comp.trim().split(/\s+/).join(" ");
        debug("comparator", comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);
        if (this.semver === ANY) {
          this.value = "";
        } else {
          this.value = this.operator + this.semver.version;
        }
        debug("comp", this);
      }
      parse(comp) {
        const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
        const m = comp.match(r);
        if (!m) {
          throw new TypeError(`Invalid comparator: ${comp}`);
        }
        this.operator = m[1] !== void 0 ? m[1] : "";
        if (this.operator === "=") {
          this.operator = "";
        }
        if (!m[2]) {
          this.semver = ANY;
        } else {
          this.semver = new SemVer(m[2], this.options.loose);
        }
      }
      toString() {
        return this.value;
      }
      test(version3) {
        debug("Comparator.test", version3, this.options.loose);
        if (this.semver === ANY || version3 === ANY) {
          return true;
        }
        if (typeof version3 === "string") {
          try {
            version3 = new SemVer(version3, this.options);
          } catch (er) {
            return false;
          }
        }
        return cmp(version3, this.operator, this.semver, this.options);
      }
      intersects(comp, options) {
        if (!(comp instanceof _Comparator)) {
          throw new TypeError("a Comparator is required");
        }
        if (this.operator === "") {
          if (this.value === "") {
            return true;
          }
          return new Range(comp.value, options).test(this.value);
        } else if (comp.operator === "") {
          if (comp.value === "") {
            return true;
          }
          return new Range(this.value, options).test(comp.semver);
        }
        options = parseOptions(options);
        if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) {
          return false;
        }
        if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) {
          return false;
        }
        if (this.operator.startsWith(">") && comp.operator.startsWith(">")) {
          return true;
        }
        if (this.operator.startsWith("<") && comp.operator.startsWith("<")) {
          return true;
        }
        if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) {
          return true;
        }
        if (cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) {
          return true;
        }
        if (cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) {
          return true;
        }
        return false;
      }
    };
    module.exports = Comparator;
    var parseOptions = require_parse_options();
    var { safeRe: re, t } = require_re();
    var cmp = require_cmp();
    var debug = require_debug();
    var SemVer = require_semver();
    var Range = require_range();
  }
});

// ../../node_modules/semver/functions/satisfies.js
var require_satisfies = __commonJS({
  "../../node_modules/semver/functions/satisfies.js"(exports, module) {
    "use strict";
    var Range = require_range();
    var satisfies = (version3, range, options) => {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false;
      }
      return range.test(version3);
    };
    module.exports = satisfies;
  }
});

// ../../node_modules/semver/ranges/to-comparators.js
var require_to_comparators = __commonJS({
  "../../node_modules/semver/ranges/to-comparators.js"(exports, module) {
    "use strict";
    var Range = require_range();
    var toComparators = (range, options) => new Range(range, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
    module.exports = toComparators;
  }
});

// ../../node_modules/semver/ranges/max-satisfying.js
var require_max_satisfying = __commonJS({
  "../../node_modules/semver/ranges/max-satisfying.js"(exports, module) {
    "use strict";
    var SemVer = require_semver();
    var Range = require_range();
    var maxSatisfying = (versions, range, options) => {
      let max = null;
      let maxSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!max || maxSV.compare(v) === -1) {
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max;
    };
    module.exports = maxSatisfying;
  }
});

// ../../node_modules/semver/ranges/min-satisfying.js
var require_min_satisfying = __commonJS({
  "../../node_modules/semver/ranges/min-satisfying.js"(exports, module) {
    "use strict";
    var SemVer = require_semver();
    var Range = require_range();
    var minSatisfying = (versions, range, options) => {
      let min = null;
      let minSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!min || minSV.compare(v) === 1) {
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min;
    };
    module.exports = minSatisfying;
  }
});

// ../../node_modules/semver/ranges/min-version.js
var require_min_version = __commonJS({
  "../../node_modules/semver/ranges/min-version.js"(exports, module) {
    "use strict";
    var SemVer = require_semver();
    var Range = require_range();
    var gt = require_gt();
    var minVersion = (range, loose) => {
      range = new Range(range, loose);
      let minver = new SemVer("0.0.0");
      if (range.test(minver)) {
        return minver;
      }
      minver = new SemVer("0.0.0-0");
      if (range.test(minver)) {
        return minver;
      }
      minver = null;
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let setMin = null;
        comparators.forEach((comparator) => {
          const compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case ">":
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
            /* fallthrough */
            case "":
            case ">=":
              if (!setMin || gt(compver, setMin)) {
                setMin = compver;
              }
              break;
            case "<":
            case "<=":
              break;
            /* istanbul ignore next */
            default:
              throw new Error(`Unexpected operation: ${comparator.operator}`);
          }
        });
        if (setMin && (!minver || gt(minver, setMin))) {
          minver = setMin;
        }
      }
      if (minver && range.test(minver)) {
        return minver;
      }
      return null;
    };
    module.exports = minVersion;
  }
});

// ../../node_modules/semver/ranges/valid.js
var require_valid2 = __commonJS({
  "../../node_modules/semver/ranges/valid.js"(exports, module) {
    "use strict";
    var Range = require_range();
    var validRange = (range, options) => {
      try {
        return new Range(range, options).range || "*";
      } catch (er) {
        return null;
      }
    };
    module.exports = validRange;
  }
});

// ../../node_modules/semver/ranges/outside.js
var require_outside = __commonJS({
  "../../node_modules/semver/ranges/outside.js"(exports, module) {
    "use strict";
    var SemVer = require_semver();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var Range = require_range();
    var satisfies = require_satisfies();
    var gt = require_gt();
    var lt = require_lt();
    var lte = require_lte();
    var gte = require_gte();
    var outside = (version3, range, hilo, options) => {
      version3 = new SemVer(version3, options);
      range = new Range(range, options);
      let gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies(version3, range, options)) {
        return false;
      }
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let high = null;
        let low = null;
        comparators.forEach((comparator) => {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if ((!low.operator || low.operator === comp) && ltefn(version3, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version3, low.semver)) {
          return false;
        }
      }
      return true;
    };
    module.exports = outside;
  }
});

// ../../node_modules/semver/ranges/gtr.js
var require_gtr = __commonJS({
  "../../node_modules/semver/ranges/gtr.js"(exports, module) {
    "use strict";
    var outside = require_outside();
    var gtr = (version3, range, options) => outside(version3, range, ">", options);
    module.exports = gtr;
  }
});

// ../../node_modules/semver/ranges/ltr.js
var require_ltr = __commonJS({
  "../../node_modules/semver/ranges/ltr.js"(exports, module) {
    "use strict";
    var outside = require_outside();
    var ltr = (version3, range, options) => outside(version3, range, "<", options);
    module.exports = ltr;
  }
});

// ../../node_modules/semver/ranges/intersects.js
var require_intersects = __commonJS({
  "../../node_modules/semver/ranges/intersects.js"(exports, module) {
    "use strict";
    var Range = require_range();
    var intersects = (r1, r2, options) => {
      r1 = new Range(r1, options);
      r2 = new Range(r2, options);
      return r1.intersects(r2, options);
    };
    module.exports = intersects;
  }
});

// ../../node_modules/semver/ranges/simplify.js
var require_simplify = __commonJS({
  "../../node_modules/semver/ranges/simplify.js"(exports, module) {
    "use strict";
    var satisfies = require_satisfies();
    var compare = require_compare();
    module.exports = (versions, range, options) => {
      const set = [];
      let first = null;
      let prev = null;
      const v = versions.sort((a, b) => compare(a, b, options));
      for (const version3 of v) {
        const included = satisfies(version3, range, options);
        if (included) {
          prev = version3;
          if (!first) {
            first = version3;
          }
        } else {
          if (prev) {
            set.push([first, prev]);
          }
          prev = null;
          first = null;
        }
      }
      if (first) {
        set.push([first, null]);
      }
      const ranges = [];
      for (const [min, max] of set) {
        if (min === max) {
          ranges.push(min);
        } else if (!max && min === v[0]) {
          ranges.push("*");
        } else if (!max) {
          ranges.push(`>=${min}`);
        } else if (min === v[0]) {
          ranges.push(`<=${max}`);
        } else {
          ranges.push(`${min} - ${max}`);
        }
      }
      const simplified = ranges.join(" || ");
      const original = typeof range.raw === "string" ? range.raw : String(range);
      return simplified.length < original.length ? simplified : range;
    };
  }
});

// ../../node_modules/semver/ranges/subset.js
var require_subset = __commonJS({
  "../../node_modules/semver/ranges/subset.js"(exports, module) {
    "use strict";
    var Range = require_range();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var satisfies = require_satisfies();
    var compare = require_compare();
    var subset = (sub, dom, options = {}) => {
      if (sub === dom) {
        return true;
      }
      sub = new Range(sub, options);
      dom = new Range(dom, options);
      let sawNonNull = false;
      OUTER: for (const simpleSub of sub.set) {
        for (const simpleDom of dom.set) {
          const isSub = simpleSubset(simpleSub, simpleDom, options);
          sawNonNull = sawNonNull || isSub !== null;
          if (isSub) {
            continue OUTER;
          }
        }
        if (sawNonNull) {
          return false;
        }
      }
      return true;
    };
    var minimumVersionWithPreRelease = [new Comparator(">=0.0.0-0")];
    var minimumVersion = [new Comparator(">=0.0.0")];
    var simpleSubset = (sub, dom, options) => {
      if (sub === dom) {
        return true;
      }
      if (sub.length === 1 && sub[0].semver === ANY) {
        if (dom.length === 1 && dom[0].semver === ANY) {
          return true;
        } else if (options.includePrerelease) {
          sub = minimumVersionWithPreRelease;
        } else {
          sub = minimumVersion;
        }
      }
      if (dom.length === 1 && dom[0].semver === ANY) {
        if (options.includePrerelease) {
          return true;
        } else {
          dom = minimumVersion;
        }
      }
      const eqSet = /* @__PURE__ */ new Set();
      let gt, lt;
      for (const c of sub) {
        if (c.operator === ">" || c.operator === ">=") {
          gt = higherGT(gt, c, options);
        } else if (c.operator === "<" || c.operator === "<=") {
          lt = lowerLT(lt, c, options);
        } else {
          eqSet.add(c.semver);
        }
      }
      if (eqSet.size > 1) {
        return null;
      }
      let gtltComp;
      if (gt && lt) {
        gtltComp = compare(gt.semver, lt.semver, options);
        if (gtltComp > 0) {
          return null;
        } else if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<=")) {
          return null;
        }
      }
      for (const eq of eqSet) {
        if (gt && !satisfies(eq, String(gt), options)) {
          return null;
        }
        if (lt && !satisfies(eq, String(lt), options)) {
          return null;
        }
        for (const c of dom) {
          if (!satisfies(eq, String(c), options)) {
            return false;
          }
        }
        return true;
      }
      let higher, lower;
      let hasDomLT, hasDomGT;
      let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
      let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
      if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) {
        needDomLTPre = false;
      }
      for (const c of dom) {
        hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
        hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
        if (gt) {
          if (needDomGTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
              needDomGTPre = false;
            }
          }
          if (c.operator === ">" || c.operator === ">=") {
            higher = higherGT(gt, c, options);
            if (higher === c && higher !== gt) {
              return false;
            }
          } else if (gt.operator === ">=" && !c.test(gt.semver)) {
            return false;
          }
        }
        if (lt) {
          if (needDomLTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
              needDomLTPre = false;
            }
          }
          if (c.operator === "<" || c.operator === "<=") {
            lower = lowerLT(lt, c, options);
            if (lower === c && lower !== lt) {
              return false;
            }
          } else if (lt.operator === "<=" && !c.test(lt.semver)) {
            return false;
          }
        }
        if (!c.operator && (lt || gt) && gtltComp !== 0) {
          return false;
        }
      }
      if (gt && hasDomLT && !lt && gtltComp !== 0) {
        return false;
      }
      if (lt && hasDomGT && !gt && gtltComp !== 0) {
        return false;
      }
      if (needDomGTPre || needDomLTPre) {
        return false;
      }
      return true;
    };
    var higherGT = (a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare(a.semver, b.semver, options);
      return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
    };
    var lowerLT = (a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare(a.semver, b.semver, options);
      return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
    };
    module.exports = subset;
  }
});

// ../../node_modules/semver/index.js
var require_semver2 = __commonJS({
  "../../node_modules/semver/index.js"(exports, module) {
    "use strict";
    var internalRe = require_re();
    var constants2 = require_constants();
    var SemVer = require_semver();
    var identifiers = require_identifiers();
    var parse2 = require_parse();
    var valid = require_valid();
    var clean = require_clean();
    var inc = require_inc();
    var diff = require_diff();
    var major = require_major();
    var minor = require_minor();
    var patch = require_patch();
    var prerelease = require_prerelease();
    var compare = require_compare();
    var rcompare = require_rcompare();
    var compareLoose = require_compare_loose();
    var compareBuild = require_compare_build();
    var sort = require_sort();
    var rsort = require_rsort();
    var gt = require_gt();
    var lt = require_lt();
    var eq = require_eq();
    var neq = require_neq();
    var gte = require_gte();
    var lte = require_lte();
    var cmp = require_cmp();
    var coerce = require_coerce();
    var truncate = require_truncate();
    var Comparator = require_comparator();
    var Range = require_range();
    var satisfies = require_satisfies();
    var toComparators = require_to_comparators();
    var maxSatisfying = require_max_satisfying();
    var minSatisfying = require_min_satisfying();
    var minVersion = require_min_version();
    var validRange = require_valid2();
    var outside = require_outside();
    var gtr = require_gtr();
    var ltr = require_ltr();
    var intersects = require_intersects();
    var simplifyRange = require_simplify();
    var subset = require_subset();
    module.exports = {
      parse: parse2,
      valid,
      clean,
      inc,
      diff,
      major,
      minor,
      patch,
      prerelease,
      compare,
      rcompare,
      compareLoose,
      compareBuild,
      sort,
      rsort,
      gt,
      lt,
      eq,
      neq,
      gte,
      lte,
      cmp,
      coerce,
      truncate,
      Comparator,
      Range,
      satisfies,
      toComparators,
      maxSatisfying,
      minSatisfying,
      minVersion,
      validRange,
      outside,
      gtr,
      ltr,
      intersects,
      simplifyRange,
      subset,
      SemVer,
      re: internalRe.re,
      src: internalRe.src,
      tokens: internalRe.t,
      SEMVER_SPEC_VERSION: constants2.SEMVER_SPEC_VERSION,
      RELEASE_TYPES: constants2.RELEASE_TYPES,
      compareIdentifiers: identifiers.compareIdentifiers,
      rcompareIdentifiers: identifiers.rcompareIdentifiers
    };
  }
});

// ../../node_modules/jsonwebtoken/lib/asymmetricKeyDetailsSupported.js
var require_asymmetricKeyDetailsSupported = __commonJS({
  "../../node_modules/jsonwebtoken/lib/asymmetricKeyDetailsSupported.js"(exports, module) {
    "use strict";
    var semver = require_semver2();
    module.exports = semver.satisfies(process.version, ">=15.7.0");
  }
});

// ../../node_modules/jsonwebtoken/lib/rsaPssKeyDetailsSupported.js
var require_rsaPssKeyDetailsSupported = __commonJS({
  "../../node_modules/jsonwebtoken/lib/rsaPssKeyDetailsSupported.js"(exports, module) {
    "use strict";
    var semver = require_semver2();
    module.exports = semver.satisfies(process.version, ">=16.9.0");
  }
});

// ../../node_modules/jsonwebtoken/lib/validateAsymmetricKey.js
var require_validateAsymmetricKey = __commonJS({
  "../../node_modules/jsonwebtoken/lib/validateAsymmetricKey.js"(exports, module) {
    "use strict";
    var ASYMMETRIC_KEY_DETAILS_SUPPORTED = require_asymmetricKeyDetailsSupported();
    var RSA_PSS_KEY_DETAILS_SUPPORTED = require_rsaPssKeyDetailsSupported();
    var allowedAlgorithmsForKeys = {
      "ec": ["ES256", "ES384", "ES512"],
      "rsa": ["RS256", "PS256", "RS384", "PS384", "RS512", "PS512"],
      "rsa-pss": ["PS256", "PS384", "PS512"]
    };
    var allowedCurves = {
      ES256: "prime256v1",
      ES384: "secp384r1",
      ES512: "secp521r1"
    };
    module.exports = function(algorithm, key) {
      if (!algorithm || !key) return;
      const keyType = key.asymmetricKeyType;
      if (!keyType) return;
      const allowedAlgorithms = allowedAlgorithmsForKeys[keyType];
      if (!allowedAlgorithms) {
        throw new Error(`Unknown key type "${keyType}".`);
      }
      if (!allowedAlgorithms.includes(algorithm)) {
        throw new Error(`"alg" parameter for "${keyType}" key type must be one of: ${allowedAlgorithms.join(", ")}.`);
      }
      if (ASYMMETRIC_KEY_DETAILS_SUPPORTED) {
        switch (keyType) {
          case "ec":
            const keyCurve = key.asymmetricKeyDetails.namedCurve;
            const allowedCurve = allowedCurves[algorithm];
            if (keyCurve !== allowedCurve) {
              throw new Error(`"alg" parameter "${algorithm}" requires curve "${allowedCurve}".`);
            }
            break;
          case "rsa-pss":
            if (RSA_PSS_KEY_DETAILS_SUPPORTED) {
              const length = parseInt(algorithm.slice(-3), 10);
              const { hashAlgorithm, mgf1HashAlgorithm, saltLength } = key.asymmetricKeyDetails;
              if (hashAlgorithm !== `sha${length}` || mgf1HashAlgorithm !== hashAlgorithm) {
                throw new Error(`Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${algorithm}.`);
              }
              if (saltLength !== void 0 && saltLength > length >> 3) {
                throw new Error(`Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${algorithm}.`);
              }
            }
            break;
        }
      }
    };
  }
});

// ../../node_modules/jsonwebtoken/lib/psSupported.js
var require_psSupported = __commonJS({
  "../../node_modules/jsonwebtoken/lib/psSupported.js"(exports, module) {
    "use strict";
    var semver = require_semver2();
    module.exports = semver.satisfies(process.version, "^6.12.0 || >=8.0.0");
  }
});

// ../../node_modules/jsonwebtoken/verify.js
var require_verify = __commonJS({
  "../../node_modules/jsonwebtoken/verify.js"(exports, module) {
    "use strict";
    var JsonWebTokenError = require_JsonWebTokenError();
    var NotBeforeError = require_NotBeforeError();
    var TokenExpiredError = require_TokenExpiredError();
    var decode = require_decode();
    var timespan = require_timespan();
    var validateAsymmetricKey = require_validateAsymmetricKey();
    var PS_SUPPORTED = require_psSupported();
    var jws = require_jws();
    var { KeyObject, createSecretKey, createPublicKey } = __require("crypto");
    var PUB_KEY_ALGS = ["RS256", "RS384", "RS512"];
    var EC_KEY_ALGS = ["ES256", "ES384", "ES512"];
    var RSA_KEY_ALGS = ["RS256", "RS384", "RS512"];
    var HS_ALGS = ["HS256", "HS384", "HS512"];
    if (PS_SUPPORTED) {
      PUB_KEY_ALGS.splice(PUB_KEY_ALGS.length, 0, "PS256", "PS384", "PS512");
      RSA_KEY_ALGS.splice(RSA_KEY_ALGS.length, 0, "PS256", "PS384", "PS512");
    }
    module.exports = function(jwtString, secretOrPublicKey, options, callback) {
      if (typeof options === "function" && !callback) {
        callback = options;
        options = {};
      }
      if (!options) {
        options = {};
      }
      options = Object.assign({}, options);
      let done;
      if (callback) {
        done = callback;
      } else {
        done = function(err, data) {
          if (err) throw err;
          return data;
        };
      }
      if (options.clockTimestamp && typeof options.clockTimestamp !== "number") {
        return done(new JsonWebTokenError("clockTimestamp must be a number"));
      }
      if (options.nonce !== void 0 && (typeof options.nonce !== "string" || options.nonce.trim() === "")) {
        return done(new JsonWebTokenError("nonce must be a non-empty string"));
      }
      if (options.allowInvalidAsymmetricKeyTypes !== void 0 && typeof options.allowInvalidAsymmetricKeyTypes !== "boolean") {
        return done(new JsonWebTokenError("allowInvalidAsymmetricKeyTypes must be a boolean"));
      }
      const clockTimestamp = options.clockTimestamp || Math.floor(Date.now() / 1e3);
      if (!jwtString) {
        return done(new JsonWebTokenError("jwt must be provided"));
      }
      if (typeof jwtString !== "string") {
        return done(new JsonWebTokenError("jwt must be a string"));
      }
      const parts = jwtString.split(".");
      if (parts.length !== 3) {
        return done(new JsonWebTokenError("jwt malformed"));
      }
      let decodedToken;
      try {
        decodedToken = decode(jwtString, { complete: true });
      } catch (err) {
        return done(err);
      }
      if (!decodedToken) {
        return done(new JsonWebTokenError("invalid token"));
      }
      const header = decodedToken.header;
      let getSecret;
      if (typeof secretOrPublicKey === "function") {
        if (!callback) {
          return done(new JsonWebTokenError("verify must be called asynchronous if secret or public key is provided as a callback"));
        }
        getSecret = secretOrPublicKey;
      } else {
        getSecret = function(header2, secretCallback) {
          return secretCallback(null, secretOrPublicKey);
        };
      }
      return getSecret(header, function(err, secretOrPublicKey2) {
        if (err) {
          return done(new JsonWebTokenError("error in secret or public key callback: " + err.message));
        }
        const hasSignature = parts[2].trim() !== "";
        if (!hasSignature && secretOrPublicKey2) {
          return done(new JsonWebTokenError("jwt signature is required"));
        }
        if (hasSignature && !secretOrPublicKey2) {
          return done(new JsonWebTokenError("secret or public key must be provided"));
        }
        if (!hasSignature && !options.algorithms) {
          return done(new JsonWebTokenError('please specify "none" in "algorithms" to verify unsigned tokens'));
        }
        if (secretOrPublicKey2 != null && !(secretOrPublicKey2 instanceof KeyObject)) {
          try {
            secretOrPublicKey2 = createPublicKey(secretOrPublicKey2);
          } catch (_) {
            try {
              secretOrPublicKey2 = createSecretKey(typeof secretOrPublicKey2 === "string" ? Buffer.from(secretOrPublicKey2) : secretOrPublicKey2);
            } catch (_2) {
              return done(new JsonWebTokenError("secretOrPublicKey is not valid key material"));
            }
          }
        }
        if (!options.algorithms) {
          if (secretOrPublicKey2.type === "secret") {
            options.algorithms = HS_ALGS;
          } else if (["rsa", "rsa-pss"].includes(secretOrPublicKey2.asymmetricKeyType)) {
            options.algorithms = RSA_KEY_ALGS;
          } else if (secretOrPublicKey2.asymmetricKeyType === "ec") {
            options.algorithms = EC_KEY_ALGS;
          } else {
            options.algorithms = PUB_KEY_ALGS;
          }
        }
        if (options.algorithms.indexOf(decodedToken.header.alg) === -1) {
          return done(new JsonWebTokenError("invalid algorithm"));
        }
        if (header.alg.startsWith("HS") && secretOrPublicKey2.type !== "secret") {
          return done(new JsonWebTokenError(`secretOrPublicKey must be a symmetric key when using ${header.alg}`));
        } else if (/^(?:RS|PS|ES)/.test(header.alg) && secretOrPublicKey2.type !== "public") {
          return done(new JsonWebTokenError(`secretOrPublicKey must be an asymmetric key when using ${header.alg}`));
        }
        if (!options.allowInvalidAsymmetricKeyTypes) {
          try {
            validateAsymmetricKey(header.alg, secretOrPublicKey2);
          } catch (e) {
            return done(e);
          }
        }
        let valid;
        try {
          valid = jws.verify(jwtString, decodedToken.header.alg, secretOrPublicKey2);
        } catch (e) {
          return done(e);
        }
        if (!valid) {
          return done(new JsonWebTokenError("invalid signature"));
        }
        const payload = decodedToken.payload;
        if (typeof payload.nbf !== "undefined" && !options.ignoreNotBefore) {
          if (typeof payload.nbf !== "number") {
            return done(new JsonWebTokenError("invalid nbf value"));
          }
          if (payload.nbf > clockTimestamp + (options.clockTolerance || 0)) {
            return done(new NotBeforeError("jwt not active", new Date(payload.nbf * 1e3)));
          }
        }
        if (typeof payload.exp !== "undefined" && !options.ignoreExpiration) {
          if (typeof payload.exp !== "number") {
            return done(new JsonWebTokenError("invalid exp value"));
          }
          if (clockTimestamp >= payload.exp + (options.clockTolerance || 0)) {
            return done(new TokenExpiredError("jwt expired", new Date(payload.exp * 1e3)));
          }
        }
        if (options.audience) {
          const audiences = Array.isArray(options.audience) ? options.audience : [options.audience];
          const target = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
          const match = target.some(function(targetAudience) {
            return audiences.some(function(audience) {
              return audience instanceof RegExp ? audience.test(targetAudience) : audience === targetAudience;
            });
          });
          if (!match) {
            return done(new JsonWebTokenError("jwt audience invalid. expected: " + audiences.join(" or ")));
          }
        }
        if (options.issuer) {
          const invalid_issuer = typeof options.issuer === "string" && payload.iss !== options.issuer || Array.isArray(options.issuer) && options.issuer.indexOf(payload.iss) === -1;
          if (invalid_issuer) {
            return done(new JsonWebTokenError("jwt issuer invalid. expected: " + options.issuer));
          }
        }
        if (options.subject) {
          if (payload.sub !== options.subject) {
            return done(new JsonWebTokenError("jwt subject invalid. expected: " + options.subject));
          }
        }
        if (options.jwtid) {
          if (payload.jti !== options.jwtid) {
            return done(new JsonWebTokenError("jwt jwtid invalid. expected: " + options.jwtid));
          }
        }
        if (options.nonce) {
          if (payload.nonce !== options.nonce) {
            return done(new JsonWebTokenError("jwt nonce invalid. expected: " + options.nonce));
          }
        }
        if (options.maxAge) {
          if (typeof payload.iat !== "number") {
            return done(new JsonWebTokenError("iat required when maxAge is specified"));
          }
          const maxAgeTimestamp = timespan(options.maxAge, payload.iat);
          if (typeof maxAgeTimestamp === "undefined") {
            return done(new JsonWebTokenError('"maxAge" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
          }
          if (clockTimestamp >= maxAgeTimestamp + (options.clockTolerance || 0)) {
            return done(new TokenExpiredError("maxAge exceeded", new Date(maxAgeTimestamp * 1e3)));
          }
        }
        if (options.complete === true) {
          const signature = decodedToken.signature;
          return done(null, {
            header,
            payload,
            signature
          });
        }
        return done(null, payload);
      });
    };
  }
});

// ../../node_modules/lodash.includes/index.js
var require_lodash = __commonJS({
  "../../node_modules/lodash.includes/index.js"(exports, module) {
    "use strict";
    var INFINITY = 1 / 0;
    var MAX_SAFE_INTEGER = 9007199254740991;
    var MAX_INTEGER = 17976931348623157e292;
    var NAN = 0 / 0;
    var argsTag = "[object Arguments]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var freeParseInt = parseInt;
    function arrayMap(array, iteratee) {
      var index = -1, length = array ? array.length : 0, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }
    function baseIndexOf(array, value, fromIndex) {
      if (value !== value) {
        return baseFindIndex(array, baseIsNaN, fromIndex);
      }
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }
    function baseIsNaN(value) {
      return value !== value;
    }
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function baseValues(object, props) {
      return arrayMap(props, function(key) {
        return object[key];
      });
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectToString = objectProto.toString;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var nativeKeys = overArg(Object.keys, Object);
    var nativeMax = Math.max;
    function arrayLikeKeys(value, inherited) {
      var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
      var length = result.length, skipIndexes = !!length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    function includes(collection, value, fromIndex, guard) {
      collection = isArrayLike(collection) ? collection : values(collection);
      fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
      var length = collection.length;
      if (fromIndex < 0) {
        fromIndex = nativeMax(length + fromIndex, 0);
      }
      return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
    }
    function isArguments(value) {
      return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
    }
    var isArray = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    function isFunction(value) {
      var tag = isObject2(value) ? objectToString.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject2(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isString(value) {
      return typeof value == "string" || !isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag;
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject2(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject2(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    function values(object) {
      return object ? baseValues(object, keys(object)) : [];
    }
    module.exports = includes;
  }
});

// ../../node_modules/lodash.isboolean/index.js
var require_lodash2 = __commonJS({
  "../../node_modules/lodash.isboolean/index.js"(exports, module) {
    "use strict";
    var boolTag = "[object Boolean]";
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    function isBoolean(value) {
      return value === true || value === false || isObjectLike(value) && objectToString.call(value) == boolTag;
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    module.exports = isBoolean;
  }
});

// ../../node_modules/lodash.isinteger/index.js
var require_lodash3 = __commonJS({
  "../../node_modules/lodash.isinteger/index.js"(exports, module) {
    "use strict";
    var INFINITY = 1 / 0;
    var MAX_INTEGER = 17976931348623157e292;
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    function isInteger(value) {
      return typeof value == "number" && value == toInteger(value);
    }
    function isObject2(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject2(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject2(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module.exports = isInteger;
  }
});

// ../../node_modules/lodash.isnumber/index.js
var require_lodash4 = __commonJS({
  "../../node_modules/lodash.isnumber/index.js"(exports, module) {
    "use strict";
    var numberTag = "[object Number]";
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isNumber(value) {
      return typeof value == "number" || isObjectLike(value) && objectToString.call(value) == numberTag;
    }
    module.exports = isNumber;
  }
});

// ../../node_modules/lodash.isplainobject/index.js
var require_lodash5 = __commonJS({
  "../../node_modules/lodash.isplainobject/index.js"(exports, module) {
    "use strict";
    var objectTag = "[object Object]";
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != "function") {
        try {
          result = !!(value + "");
        } catch (e) {
        }
      }
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectCtorString = funcToString.call(Object);
    var objectToString = objectProto.toString;
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isPlainObject(value) {
      if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
      return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
    }
    module.exports = isPlainObject;
  }
});

// ../../node_modules/lodash.isstring/index.js
var require_lodash6 = __commonJS({
  "../../node_modules/lodash.isstring/index.js"(exports, module) {
    "use strict";
    var stringTag = "[object String]";
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    var isArray = Array.isArray;
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isString(value) {
      return typeof value == "string" || !isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag;
    }
    module.exports = isString;
  }
});

// ../../node_modules/lodash.once/index.js
var require_lodash7 = __commonJS({
  "../../node_modules/lodash.once/index.js"(exports, module) {
    "use strict";
    var FUNC_ERROR_TEXT = "Expected a function";
    var INFINITY = 1 / 0;
    var MAX_INTEGER = 17976931348623157e292;
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    function before(n, func) {
      var result;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      return function() {
        if (--n > 0) {
          result = func.apply(this, arguments);
        }
        if (n <= 1) {
          func = void 0;
        }
        return result;
      };
    }
    function once(func) {
      return before(2, func);
    }
    function isObject2(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject2(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject2(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module.exports = once;
  }
});

// ../../node_modules/jsonwebtoken/sign.js
var require_sign = __commonJS({
  "../../node_modules/jsonwebtoken/sign.js"(exports, module) {
    "use strict";
    var timespan = require_timespan();
    var PS_SUPPORTED = require_psSupported();
    var validateAsymmetricKey = require_validateAsymmetricKey();
    var jws = require_jws();
    var includes = require_lodash();
    var isBoolean = require_lodash2();
    var isInteger = require_lodash3();
    var isNumber = require_lodash4();
    var isPlainObject = require_lodash5();
    var isString = require_lodash6();
    var once = require_lodash7();
    var { KeyObject, createSecretKey, createPrivateKey: createPrivateKey2 } = __require("crypto");
    var SUPPORTED_ALGS = ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "HS256", "HS384", "HS512", "none"];
    if (PS_SUPPORTED) {
      SUPPORTED_ALGS.splice(3, 0, "PS256", "PS384", "PS512");
    }
    var sign_options_schema = {
      expiresIn: { isValid: function(value) {
        return isInteger(value) || isString(value) && value;
      }, message: '"expiresIn" should be a number of seconds or string representing a timespan' },
      notBefore: { isValid: function(value) {
        return isInteger(value) || isString(value) && value;
      }, message: '"notBefore" should be a number of seconds or string representing a timespan' },
      audience: { isValid: function(value) {
        return isString(value) || Array.isArray(value);
      }, message: '"audience" must be a string or array' },
      algorithm: { isValid: includes.bind(null, SUPPORTED_ALGS), message: '"algorithm" must be a valid string enum value' },
      header: { isValid: isPlainObject, message: '"header" must be an object' },
      encoding: { isValid: isString, message: '"encoding" must be a string' },
      issuer: { isValid: isString, message: '"issuer" must be a string' },
      subject: { isValid: isString, message: '"subject" must be a string' },
      jwtid: { isValid: isString, message: '"jwtid" must be a string' },
      noTimestamp: { isValid: isBoolean, message: '"noTimestamp" must be a boolean' },
      keyid: { isValid: isString, message: '"keyid" must be a string' },
      mutatePayload: { isValid: isBoolean, message: '"mutatePayload" must be a boolean' },
      allowInsecureKeySizes: { isValid: isBoolean, message: '"allowInsecureKeySizes" must be a boolean' },
      allowInvalidAsymmetricKeyTypes: { isValid: isBoolean, message: '"allowInvalidAsymmetricKeyTypes" must be a boolean' }
    };
    var registered_claims_schema = {
      iat: { isValid: isNumber, message: '"iat" should be a number of seconds' },
      exp: { isValid: isNumber, message: '"exp" should be a number of seconds' },
      nbf: { isValid: isNumber, message: '"nbf" should be a number of seconds' }
    };
    function validate(schema, allowUnknown, object, parameterName) {
      if (!isPlainObject(object)) {
        throw new Error('Expected "' + parameterName + '" to be a plain object.');
      }
      Object.keys(object).forEach(function(key) {
        const validator = schema[key];
        if (!validator) {
          if (!allowUnknown) {
            throw new Error('"' + key + '" is not allowed in "' + parameterName + '"');
          }
          return;
        }
        if (!validator.isValid(object[key])) {
          throw new Error(validator.message);
        }
      });
    }
    function validateOptions(options) {
      return validate(sign_options_schema, false, options, "options");
    }
    function validatePayload(payload) {
      return validate(registered_claims_schema, true, payload, "payload");
    }
    var options_to_payload = {
      "audience": "aud",
      "issuer": "iss",
      "subject": "sub",
      "jwtid": "jti"
    };
    var options_for_objects = [
      "expiresIn",
      "notBefore",
      "noTimestamp",
      "audience",
      "issuer",
      "subject",
      "jwtid"
    ];
    module.exports = function(payload, secretOrPrivateKey, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      } else {
        options = options || {};
      }
      const isObjectPayload = typeof payload === "object" && !Buffer.isBuffer(payload);
      const header = Object.assign({
        alg: options.algorithm || "HS256",
        typ: isObjectPayload ? "JWT" : void 0,
        kid: options.keyid
      }, options.header);
      function failure(err) {
        if (callback) {
          return callback(err);
        }
        throw err;
      }
      if (!secretOrPrivateKey && options.algorithm !== "none") {
        return failure(new Error("secretOrPrivateKey must have a value"));
      }
      if (secretOrPrivateKey != null && !(secretOrPrivateKey instanceof KeyObject)) {
        try {
          secretOrPrivateKey = createPrivateKey2(secretOrPrivateKey);
        } catch (_) {
          try {
            secretOrPrivateKey = createSecretKey(typeof secretOrPrivateKey === "string" ? Buffer.from(secretOrPrivateKey) : secretOrPrivateKey);
          } catch (_2) {
            return failure(new Error("secretOrPrivateKey is not valid key material"));
          }
        }
      }
      if (header.alg.startsWith("HS") && secretOrPrivateKey.type !== "secret") {
        return failure(new Error(`secretOrPrivateKey must be a symmetric key when using ${header.alg}`));
      } else if (/^(?:RS|PS|ES)/.test(header.alg)) {
        if (secretOrPrivateKey.type !== "private") {
          return failure(new Error(`secretOrPrivateKey must be an asymmetric key when using ${header.alg}`));
        }
        if (!options.allowInsecureKeySizes && !header.alg.startsWith("ES") && secretOrPrivateKey.asymmetricKeyDetails !== void 0 && //KeyObject.asymmetricKeyDetails is supported in Node 15+
        secretOrPrivateKey.asymmetricKeyDetails.modulusLength < 2048) {
          return failure(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`));
        }
      }
      if (typeof payload === "undefined") {
        return failure(new Error("payload is required"));
      } else if (isObjectPayload) {
        try {
          validatePayload(payload);
        } catch (error) {
          return failure(error);
        }
        if (!options.mutatePayload) {
          payload = Object.assign({}, payload);
        }
      } else {
        const invalid_options = options_for_objects.filter(function(opt) {
          return typeof options[opt] !== "undefined";
        });
        if (invalid_options.length > 0) {
          return failure(new Error("invalid " + invalid_options.join(",") + " option for " + typeof payload + " payload"));
        }
      }
      if (typeof payload.exp !== "undefined" && typeof options.expiresIn !== "undefined") {
        return failure(new Error('Bad "options.expiresIn" option the payload already has an "exp" property.'));
      }
      if (typeof payload.nbf !== "undefined" && typeof options.notBefore !== "undefined") {
        return failure(new Error('Bad "options.notBefore" option the payload already has an "nbf" property.'));
      }
      try {
        validateOptions(options);
      } catch (error) {
        return failure(error);
      }
      if (!options.allowInvalidAsymmetricKeyTypes) {
        try {
          validateAsymmetricKey(header.alg, secretOrPrivateKey);
        } catch (error) {
          return failure(error);
        }
      }
      const timestamp = payload.iat || Math.floor(Date.now() / 1e3);
      if (options.noTimestamp) {
        delete payload.iat;
      } else if (isObjectPayload) {
        payload.iat = timestamp;
      }
      if (typeof options.notBefore !== "undefined") {
        try {
          payload.nbf = timespan(options.notBefore, timestamp);
        } catch (err) {
          return failure(err);
        }
        if (typeof payload.nbf === "undefined") {
          return failure(new Error('"notBefore" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
        }
      }
      if (typeof options.expiresIn !== "undefined" && typeof payload === "object") {
        try {
          payload.exp = timespan(options.expiresIn, timestamp);
        } catch (err) {
          return failure(err);
        }
        if (typeof payload.exp === "undefined") {
          return failure(new Error('"expiresIn" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
        }
      }
      Object.keys(options_to_payload).forEach(function(key) {
        const claim = options_to_payload[key];
        if (typeof options[key] !== "undefined") {
          if (typeof payload[claim] !== "undefined") {
            return failure(new Error('Bad "options.' + key + '" option. The payload already has an "' + claim + '" property.'));
          }
          payload[claim] = options[key];
        }
      });
      const encoding = options.encoding || "utf8";
      if (typeof callback === "function") {
        callback = callback && once(callback);
        jws.createSign({
          header,
          privateKey: secretOrPrivateKey,
          payload,
          encoding
        }).once("error", callback).once("done", function(signature) {
          if (!options.allowInsecureKeySizes && /^(?:RS|PS)/.test(header.alg) && signature.length < 256) {
            return callback(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`));
          }
          callback(null, signature);
        });
      } else {
        let signature = jws.sign({ header, payload, secret: secretOrPrivateKey, encoding });
        if (!options.allowInsecureKeySizes && /^(?:RS|PS)/.test(header.alg) && signature.length < 256) {
          throw new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`);
        }
        return signature;
      }
    };
  }
});

// ../../node_modules/jsonwebtoken/index.js
var require_jsonwebtoken = __commonJS({
  "../../node_modules/jsonwebtoken/index.js"(exports, module) {
    "use strict";
    module.exports = {
      decode: require_decode(),
      verify: require_verify(),
      sign: require_sign(),
      JsonWebTokenError: require_JsonWebTokenError(),
      NotBeforeError: require_NotBeforeError(),
      TokenExpiredError: require_TokenExpiredError()
    };
  }
});

// ../../node_modules/debug/src/common.js
var require_common = __commonJS({
  "../../node_modules/debug/src/common.js"(exports, module) {
    "use strict";
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable2;
      createDebug.enable = enable2;
      createDebug.enabled = enabled2;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy2;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend2;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend2(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable2(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
        for (const ns of split) {
          if (ns[0] === "-") {
            createDebug.skips.push(ns.slice(1));
          } else {
            createDebug.names.push(ns);
          }
        }
      }
      function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while (searchIndex < search.length) {
          if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
            if (template[templateIndex] === "*") {
              starIndex = templateIndex;
              matchIndex = searchIndex;
              templateIndex++;
            } else {
              searchIndex++;
              templateIndex++;
            }
          } else if (starIndex !== -1) {
            templateIndex = starIndex + 1;
            matchIndex++;
            searchIndex = matchIndex;
          } else {
            return false;
          }
        }
        while (templateIndex < template.length && template[templateIndex] === "*") {
          templateIndex++;
        }
        return templateIndex === template.length;
      }
      function disable2() {
        const namespaces = [
          ...createDebug.names,
          ...createDebug.skips.map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled2(name3) {
        for (const skip of createDebug.skips) {
          if (matchesTemplate(name3, skip)) {
            return false;
          }
        }
        for (const ns of createDebug.names) {
          if (matchesTemplate(name3, ns)) {
            return true;
          }
        }
        return false;
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy2() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module.exports = setup;
  }
});

// ../../node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "../../node_modules/debug/src/browser.js"(exports, module) {
    "use strict";
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// ../../node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "../../node_modules/has-flag/index.js"(exports, module) {
    "use strict";
    module.exports = (flag, argv = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// ../../node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "../../node_modules/supports-color/index.js"(exports, module) {
    "use strict";
    var os4 = __require("os");
    var tty = __require("tty");
    var hasFlag = require_has_flag();
    var { env } = process;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      forceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = 1;
    }
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        forceColor = 1;
      } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
      } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(haveStream, streamIsTTY) {
      if (forceColor === 0) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (process.platform === "win32") {
        const osRelease = os4.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version3 = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version3 >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream, stream && stream.isTTY);
      return translateLevel(level);
    }
    module.exports = {
      supportsColor: getSupportLevel,
      stdout: translateLevel(supportsColor(true, tty.isatty(1))),
      stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    };
  }
});

// ../../node_modules/debug/src/node.js
var require_node = __commonJS({
  "../../node_modules/debug/src/node.js"(exports, module) {
    "use strict";
    var tty = __require("tty");
    var util2 = __require("util");
    exports.init = init;
    exports.log = log2;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util2.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name3, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name3} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name3 + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log2(...args) {
      return process.stderr.write(util2.formatWithOptions(exports.inspectOpts, ...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util2.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util2.inspect(v, this.inspectOpts);
    };
  }
});

// ../../node_modules/debug/src/index.js
var require_src = __commonJS({
  "../../node_modules/debug/src/index.js"(exports, module) {
    "use strict";
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module.exports = require_browser();
    } else {
      module.exports = require_node();
    }
  }
});

// ../../node_modules/agent-base/dist/helpers.js
var require_helpers = __commonJS({
  "../../node_modules/agent-base/dist/helpers.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.req = exports.json = exports.toBuffer = void 0;
    var http3 = __importStar(__require("http"));
    var https2 = __importStar(__require("https"));
    async function toBuffer(stream) {
      let length = 0;
      const chunks = [];
      for await (const chunk of stream) {
        length += chunk.length;
        chunks.push(chunk);
      }
      return Buffer.concat(chunks, length);
    }
    exports.toBuffer = toBuffer;
    async function json(stream) {
      const buf = await toBuffer(stream);
      const str = buf.toString("utf8");
      try {
        return JSON.parse(str);
      } catch (_err) {
        const err = _err;
        err.message += ` (input: ${str})`;
        throw err;
      }
    }
    exports.json = json;
    function req(url, opts = {}) {
      const href = typeof url === "string" ? url : url.href;
      const req2 = (href.startsWith("https:") ? https2 : http3).request(url, opts);
      const promise = new Promise((resolve, reject) => {
        req2.once("response", resolve).once("error", reject).end();
      });
      req2.then = promise.then.bind(promise);
      return req2;
    }
    exports.req = req;
  }
});

// ../../node_modules/agent-base/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/agent-base/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Agent = void 0;
    var net = __importStar(__require("net"));
    var http3 = __importStar(__require("http"));
    var https_1 = __require("https");
    __exportStar(require_helpers(), exports);
    var INTERNAL = /* @__PURE__ */ Symbol("AgentBaseInternalState");
    var Agent = class extends http3.Agent {
      constructor(opts) {
        super(opts);
        this[INTERNAL] = {};
      }
      /**
       * Determine whether this is an `http` or `https` request.
       */
      isSecureEndpoint(options) {
        if (options) {
          if (typeof options.secureEndpoint === "boolean") {
            return options.secureEndpoint;
          }
          if (typeof options.protocol === "string") {
            return options.protocol === "https:";
          }
        }
        const { stack } = new Error();
        if (typeof stack !== "string")
          return false;
        return stack.split("\n").some((l) => l.indexOf("(https.js:") !== -1 || l.indexOf("node:https:") !== -1);
      }
      // In order to support async signatures in `connect()` and Node's native
      // connection pooling in `http.Agent`, the array of sockets for each origin
      // has to be updated synchronously. This is so the length of the array is
      // accurate when `addRequest()` is next called. We achieve this by creating a
      // fake socket and adding it to `sockets[origin]` and incrementing
      // `totalSocketCount`.
      incrementSockets(name3) {
        if (this.maxSockets === Infinity && this.maxTotalSockets === Infinity) {
          return null;
        }
        if (!this.sockets[name3]) {
          this.sockets[name3] = [];
        }
        const fakeSocket = new net.Socket({ writable: false });
        this.sockets[name3].push(fakeSocket);
        this.totalSocketCount++;
        return fakeSocket;
      }
      decrementSockets(name3, socket) {
        if (!this.sockets[name3] || socket === null) {
          return;
        }
        const sockets = this.sockets[name3];
        const index = sockets.indexOf(socket);
        if (index !== -1) {
          sockets.splice(index, 1);
          this.totalSocketCount--;
          if (sockets.length === 0) {
            delete this.sockets[name3];
          }
        }
      }
      // In order to properly update the socket pool, we need to call `getName()` on
      // the core `https.Agent` if it is a secureEndpoint.
      getName(options) {
        const secureEndpoint = this.isSecureEndpoint(options);
        if (secureEndpoint) {
          return https_1.Agent.prototype.getName.call(this, options);
        }
        return super.getName(options);
      }
      createSocket(req, options, cb) {
        const connectOpts = {
          ...options,
          secureEndpoint: this.isSecureEndpoint(options)
        };
        const name3 = this.getName(connectOpts);
        const fakeSocket = this.incrementSockets(name3);
        Promise.resolve().then(() => this.connect(req, connectOpts)).then((socket) => {
          this.decrementSockets(name3, fakeSocket);
          if (socket instanceof http3.Agent) {
            try {
              return socket.addRequest(req, connectOpts);
            } catch (err) {
              return cb(err);
            }
          }
          this[INTERNAL].currentSocket = socket;
          super.createSocket(req, options, cb);
        }, (err) => {
          this.decrementSockets(name3, fakeSocket);
          cb(err);
        });
      }
      createConnection() {
        const socket = this[INTERNAL].currentSocket;
        this[INTERNAL].currentSocket = void 0;
        if (!socket) {
          throw new Error("No socket was returned in the `connect()` function");
        }
        return socket;
      }
      get defaultPort() {
        return this[INTERNAL].defaultPort ?? (this.protocol === "https:" ? 443 : 80);
      }
      set defaultPort(v) {
        if (this[INTERNAL]) {
          this[INTERNAL].defaultPort = v;
        }
      }
      get protocol() {
        return this[INTERNAL].protocol ?? (this.isSecureEndpoint() ? "https:" : "http:");
      }
      set protocol(v) {
        if (this[INTERNAL]) {
          this[INTERNAL].protocol = v;
        }
      }
    };
    exports.Agent = Agent;
  }
});

// ../../node_modules/https-proxy-agent/dist/parse-proxy-response.js
var require_parse_proxy_response = __commonJS({
  "../../node_modules/https-proxy-agent/dist/parse-proxy-response.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseProxyResponse = void 0;
    var debug_1 = __importDefault(require_src());
    var debug = (0, debug_1.default)("https-proxy-agent:parse-proxy-response");
    function parseProxyResponse(socket) {
      return new Promise((resolve, reject) => {
        let buffersLength = 0;
        const buffers = [];
        function read() {
          const b = socket.read();
          if (b)
            ondata(b);
          else
            socket.once("readable", read);
        }
        function cleanup() {
          socket.removeListener("end", onend);
          socket.removeListener("error", onerror);
          socket.removeListener("readable", read);
        }
        function onend() {
          cleanup();
          debug("onend");
          reject(new Error("Proxy connection ended before receiving CONNECT response"));
        }
        function onerror(err) {
          cleanup();
          debug("onerror %o", err);
          reject(err);
        }
        function ondata(b) {
          buffers.push(b);
          buffersLength += b.length;
          const buffered = Buffer.concat(buffers, buffersLength);
          const endOfHeaders = buffered.indexOf("\r\n\r\n");
          if (endOfHeaders === -1) {
            debug("have not received end of HTTP headers yet...");
            read();
            return;
          }
          const headerParts = buffered.slice(0, endOfHeaders).toString("ascii").split("\r\n");
          const firstLine = headerParts.shift();
          if (!firstLine) {
            socket.destroy();
            return reject(new Error("No header received from proxy CONNECT response"));
          }
          const firstLineParts = firstLine.split(" ");
          const statusCode = +firstLineParts[1];
          const statusText = firstLineParts.slice(2).join(" ");
          const headers = {};
          for (const header of headerParts) {
            if (!header)
              continue;
            const firstColon = header.indexOf(":");
            if (firstColon === -1) {
              socket.destroy();
              return reject(new Error(`Invalid header from proxy CONNECT response: "${header}"`));
            }
            const key = header.slice(0, firstColon).toLowerCase();
            const value = header.slice(firstColon + 1).trimStart();
            const current = headers[key];
            if (typeof current === "string") {
              headers[key] = [current, value];
            } else if (Array.isArray(current)) {
              current.push(value);
            } else {
              headers[key] = value;
            }
          }
          debug("got proxy server response: %o %o", firstLine, headers);
          cleanup();
          resolve({
            connect: {
              statusCode,
              statusText,
              headers
            },
            buffered
          });
        }
        socket.on("error", onerror);
        socket.on("end", onend);
        read();
      });
    }
    exports.parseProxyResponse = parseProxyResponse;
  }
});

// ../../node_modules/https-proxy-agent/dist/index.js
var require_dist2 = __commonJS({
  "../../node_modules/https-proxy-agent/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HttpsProxyAgent = void 0;
    var net = __importStar(__require("net"));
    var tls = __importStar(__require("tls"));
    var assert_1 = __importDefault(__require("assert"));
    var debug_1 = __importDefault(require_src());
    var agent_base_1 = require_dist();
    var url_1 = __require("url");
    var parse_proxy_response_1 = require_parse_proxy_response();
    var debug = (0, debug_1.default)("https-proxy-agent");
    var setServernameFromNonIpHost = (options) => {
      if (options.servername === void 0 && options.host && !net.isIP(options.host)) {
        return {
          ...options,
          servername: options.host
        };
      }
      return options;
    };
    var HttpsProxyAgent2 = class extends agent_base_1.Agent {
      constructor(proxy, opts) {
        super(opts);
        this.options = { path: void 0 };
        this.proxy = typeof proxy === "string" ? new url_1.URL(proxy) : proxy;
        this.proxyHeaders = opts?.headers ?? {};
        debug("Creating new HttpsProxyAgent instance: %o", this.proxy.href);
        const host = (this.proxy.hostname || this.proxy.host).replace(/^\[|\]$/g, "");
        const port = this.proxy.port ? parseInt(this.proxy.port, 10) : this.proxy.protocol === "https:" ? 443 : 80;
        this.connectOpts = {
          // Attempt to negotiate http/1.1 for proxy servers that support http/2
          ALPNProtocols: ["http/1.1"],
          ...opts ? omit(opts, "headers") : null,
          host,
          port
        };
      }
      /**
       * Called when the node-core HTTP client library is creating a
       * new HTTP request.
       */
      async connect(req, opts) {
        const { proxy } = this;
        if (!opts.host) {
          throw new TypeError('No "host" provided');
        }
        let socket;
        if (proxy.protocol === "https:") {
          debug("Creating `tls.Socket`: %o", this.connectOpts);
          socket = tls.connect(setServernameFromNonIpHost(this.connectOpts));
        } else {
          debug("Creating `net.Socket`: %o", this.connectOpts);
          socket = net.connect(this.connectOpts);
        }
        const headers = typeof this.proxyHeaders === "function" ? this.proxyHeaders() : { ...this.proxyHeaders };
        const host = net.isIPv6(opts.host) ? `[${opts.host}]` : opts.host;
        let payload = `CONNECT ${host}:${opts.port} HTTP/1.1\r
`;
        if (proxy.username || proxy.password) {
          const auth = `${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password)}`;
          headers["Proxy-Authorization"] = `Basic ${Buffer.from(auth).toString("base64")}`;
        }
        headers.Host = `${host}:${opts.port}`;
        if (!headers["Proxy-Connection"]) {
          headers["Proxy-Connection"] = this.keepAlive ? "Keep-Alive" : "close";
        }
        for (const name3 of Object.keys(headers)) {
          payload += `${name3}: ${headers[name3]}\r
`;
        }
        const proxyResponsePromise = (0, parse_proxy_response_1.parseProxyResponse)(socket);
        socket.write(`${payload}\r
`);
        const { connect, buffered } = await proxyResponsePromise;
        req.emit("proxyConnect", connect);
        this.emit("proxyConnect", connect, req);
        if (connect.statusCode === 200) {
          req.once("socket", resume);
          if (opts.secureEndpoint) {
            debug("Upgrading socket connection to TLS");
            return tls.connect({
              ...omit(setServernameFromNonIpHost(opts), "host", "path", "port"),
              socket
            });
          }
          return socket;
        }
        socket.destroy();
        const fakeSocket = new net.Socket({ writable: false });
        fakeSocket.readable = true;
        req.once("socket", (s) => {
          debug("Replaying proxy buffer for failed request");
          (0, assert_1.default)(s.listenerCount("data") > 0);
          s.push(buffered);
          s.push(null);
        });
        return fakeSocket;
      }
    };
    HttpsProxyAgent2.protocols = ["http", "https"];
    exports.HttpsProxyAgent = HttpsProxyAgent2;
    function resume(socket) {
      socket.resume();
    }
    function omit(obj, ...keys) {
      const ret = {};
      let key;
      for (key in obj) {
        if (!keys.includes(key)) {
          ret[key] = obj[key];
        }
      }
      return ret;
    }
  }
});

// ../../node_modules/http-proxy-agent/dist/index.js
var require_dist3 = __commonJS({
  "../../node_modules/http-proxy-agent/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HttpProxyAgent = void 0;
    var net = __importStar(__require("net"));
    var tls = __importStar(__require("tls"));
    var debug_1 = __importDefault(require_src());
    var events_1 = __require("events");
    var agent_base_1 = require_dist();
    var url_1 = __require("url");
    var debug = (0, debug_1.default)("http-proxy-agent");
    var HttpProxyAgent2 = class extends agent_base_1.Agent {
      constructor(proxy, opts) {
        super(opts);
        this.proxy = typeof proxy === "string" ? new url_1.URL(proxy) : proxy;
        this.proxyHeaders = opts?.headers ?? {};
        debug("Creating new HttpProxyAgent instance: %o", this.proxy.href);
        const host = (this.proxy.hostname || this.proxy.host).replace(/^\[|\]$/g, "");
        const port = this.proxy.port ? parseInt(this.proxy.port, 10) : this.proxy.protocol === "https:" ? 443 : 80;
        this.connectOpts = {
          ...opts ? omit(opts, "headers") : null,
          host,
          port
        };
      }
      addRequest(req, opts) {
        req._header = null;
        this.setRequestProps(req, opts);
        super.addRequest(req, opts);
      }
      setRequestProps(req, opts) {
        const { proxy } = this;
        const protocol = opts.secureEndpoint ? "https:" : "http:";
        const hostname = req.getHeader("host") || "localhost";
        const base = `${protocol}//${hostname}`;
        const url = new url_1.URL(req.path, base);
        if (opts.port !== 80) {
          url.port = String(opts.port);
        }
        req.path = String(url);
        const headers = typeof this.proxyHeaders === "function" ? this.proxyHeaders() : { ...this.proxyHeaders };
        if (proxy.username || proxy.password) {
          const auth = `${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password)}`;
          headers["Proxy-Authorization"] = `Basic ${Buffer.from(auth).toString("base64")}`;
        }
        if (!headers["Proxy-Connection"]) {
          headers["Proxy-Connection"] = this.keepAlive ? "Keep-Alive" : "close";
        }
        for (const name3 of Object.keys(headers)) {
          const value = headers[name3];
          if (value) {
            req.setHeader(name3, value);
          }
        }
      }
      async connect(req, opts) {
        req._header = null;
        if (!req.path.includes("://")) {
          this.setRequestProps(req, opts);
        }
        let first;
        let endOfHeaders;
        debug("Regenerating stored HTTP header string for request");
        req._implicitHeader();
        if (req.outputData && req.outputData.length > 0) {
          debug("Patching connection write() output buffer with updated header");
          first = req.outputData[0].data;
          endOfHeaders = first.indexOf("\r\n\r\n") + 4;
          req.outputData[0].data = req._header + first.substring(endOfHeaders);
          debug("Output buffer: %o", req.outputData[0].data);
        }
        let socket;
        if (this.proxy.protocol === "https:") {
          debug("Creating `tls.Socket`: %o", this.connectOpts);
          socket = tls.connect(this.connectOpts);
        } else {
          debug("Creating `net.Socket`: %o", this.connectOpts);
          socket = net.connect(this.connectOpts);
        }
        await (0, events_1.once)(socket, "connect");
        return socket;
      }
    };
    HttpProxyAgent2.protocols = ["http", "https"];
    exports.HttpProxyAgent = HttpProxyAgent2;
    function omit(obj, ...keys) {
      const ret = {};
      let key;
      for (key in obj) {
        if (!keys.includes(key)) {
          ret[key] = obj[key];
        }
      }
      return ret;
    }
  }
});

// ../../node_modules/@azure/core-client/dist/commonjs/state-cjs.js
var require_state_cjs = __commonJS({
  "../../node_modules/@azure/core-client/dist/commonjs/state-cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.state = void 0;
    exports.state = {
      operationRequestMap: /* @__PURE__ */ new WeakMap()
    };
  }
});

// ../../node_modules/is-docker/index.js
import fs from "fs";
function hasDockerEnv() {
  try {
    fs.statSync("/.dockerenv");
    return true;
  } catch {
    return false;
  }
}
function hasDockerCGroup() {
  try {
    return fs.readFileSync("/proc/self/cgroup", "utf8").includes("docker");
  } catch {
    return false;
  }
}
function isDocker() {
  if (isDockerCached === void 0) {
    isDockerCached = hasDockerEnv() || hasDockerCGroup();
  }
  return isDockerCached;
}
var isDockerCached;
var init_is_docker = __esm({
  "../../node_modules/is-docker/index.js"() {
    "use strict";
  }
});

// ../../node_modules/is-inside-container/index.js
import fs2 from "fs";
function isInsideContainer() {
  if (cachedResult === void 0) {
    cachedResult = hasContainerEnv() || isDocker();
  }
  return cachedResult;
}
var cachedResult, hasContainerEnv;
var init_is_inside_container = __esm({
  "../../node_modules/is-inside-container/index.js"() {
    "use strict";
    init_is_docker();
    hasContainerEnv = () => {
      try {
        fs2.statSync("/run/.containerenv");
        return true;
      } catch {
        return false;
      }
    };
  }
});

// ../../node_modules/is-wsl/index.js
import process6 from "process";
import os3 from "os";
import fs3 from "fs";
var isWsl, is_wsl_default;
var init_is_wsl = __esm({
  "../../node_modules/is-wsl/index.js"() {
    "use strict";
    init_is_inside_container();
    isWsl = () => {
      if (process6.platform !== "linux") {
        return false;
      }
      if (os3.release().toLowerCase().includes("microsoft")) {
        if (isInsideContainer()) {
          return false;
        }
        return true;
      }
      try {
        if (fs3.readFileSync("/proc/version", "utf8").toLowerCase().includes("microsoft")) {
          return !isInsideContainer();
        }
      } catch {
      }
      if (fs3.existsSync("/proc/sys/fs/binfmt_misc/WSLInterop") || fs3.existsSync("/run/WSL")) {
        return !isInsideContainer();
      }
      return false;
    };
    is_wsl_default = process6.env.__IS_WSL_TEST__ ? isWsl : isWsl();
  }
});

// ../../node_modules/wsl-utils/index.js
import process7 from "process";
import fs4, { constants as fsConstants } from "fs/promises";
var wslDrivesMountPoint, powerShellPathFromWsl, powerShellPath;
var init_wsl_utils = __esm({
  "../../node_modules/wsl-utils/index.js"() {
    "use strict";
    init_is_wsl();
    init_is_wsl();
    wslDrivesMountPoint = /* @__PURE__ */ (() => {
      const defaultMountPoint = "/mnt/";
      let mountPoint;
      return async function() {
        if (mountPoint) {
          return mountPoint;
        }
        const configFilePath = "/etc/wsl.conf";
        let isConfigFileExists = false;
        try {
          await fs4.access(configFilePath, fsConstants.F_OK);
          isConfigFileExists = true;
        } catch {
        }
        if (!isConfigFileExists) {
          return defaultMountPoint;
        }
        const configContent = await fs4.readFile(configFilePath, { encoding: "utf8" });
        const configMountPoint = /(?<!#.*)root\s*=\s*(?<mountPoint>.*)/g.exec(configContent);
        if (!configMountPoint) {
          return defaultMountPoint;
        }
        mountPoint = configMountPoint.groups.mountPoint.trim();
        mountPoint = mountPoint.endsWith("/") ? mountPoint : `${mountPoint}/`;
        return mountPoint;
      };
    })();
    powerShellPathFromWsl = async () => {
      const mountPoint = await wslDrivesMountPoint();
      return `${mountPoint}c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe`;
    };
    powerShellPath = async () => {
      if (is_wsl_default) {
        return powerShellPathFromWsl();
      }
      return `${process7.env.SYSTEMROOT || process7.env.windir || String.raw`C:\Windows`}\\System32\\WindowsPowerShell\\v1.0\\powershell.exe`;
    };
  }
});

// ../../node_modules/define-lazy-prop/index.js
function defineLazyProperty(object, propertyName, valueGetter) {
  const define = (value) => Object.defineProperty(object, propertyName, { value, enumerable: true, writable: true });
  Object.defineProperty(object, propertyName, {
    configurable: true,
    enumerable: true,
    get() {
      const result = valueGetter();
      define(result);
      return result;
    },
    set(value) {
      define(value);
    }
  });
  return object;
}
var init_define_lazy_prop = __esm({
  "../../node_modules/define-lazy-prop/index.js"() {
    "use strict";
  }
});

// ../../node_modules/default-browser-id/index.js
import { promisify } from "util";
import process8 from "process";
import { execFile } from "child_process";
async function defaultBrowserId() {
  if (process8.platform !== "darwin") {
    throw new Error("macOS only");
  }
  const { stdout } = await execFileAsync("defaults", ["read", "com.apple.LaunchServices/com.apple.launchservices.secure", "LSHandlers"]);
  const match = /LSHandlerRoleAll = "(?!-)(?<id>[^"]+?)";\s+?LSHandlerURLScheme = (?:http|https);/.exec(stdout);
  const browserId = match?.groups.id ?? "com.apple.Safari";
  if (browserId === "com.apple.safari") {
    return "com.apple.Safari";
  }
  return browserId;
}
var execFileAsync;
var init_default_browser_id = __esm({
  "../../node_modules/default-browser-id/index.js"() {
    "use strict";
    execFileAsync = promisify(execFile);
  }
});

// ../../node_modules/run-applescript/index.js
import process9 from "process";
import { promisify as promisify2 } from "util";
import { execFile as execFile2, execFileSync } from "child_process";
async function runAppleScript(script, { humanReadableOutput = true, signal } = {}) {
  if (process9.platform !== "darwin") {
    throw new Error("macOS only");
  }
  const outputArguments = humanReadableOutput ? [] : ["-ss"];
  const execOptions = {};
  if (signal) {
    execOptions.signal = signal;
  }
  const { stdout } = await execFileAsync2("osascript", ["-e", script, outputArguments], execOptions);
  return stdout.trim();
}
var execFileAsync2;
var init_run_applescript = __esm({
  "../../node_modules/run-applescript/index.js"() {
    "use strict";
    execFileAsync2 = promisify2(execFile2);
  }
});

// ../../node_modules/bundle-name/index.js
async function bundleName(bundleId) {
  return runAppleScript(`tell application "Finder" to set app_path to application file id "${bundleId}" as string
tell application "System Events" to get value of property list item "CFBundleName" of property list file (app_path & ":Contents:Info.plist")`);
}
var init_bundle_name = __esm({
  "../../node_modules/bundle-name/index.js"() {
    "use strict";
    init_run_applescript();
  }
});

// ../../node_modules/default-browser/windows.js
import { promisify as promisify3 } from "util";
import { execFile as execFile3 } from "child_process";
async function defaultBrowser(_execFileAsync = execFileAsync3) {
  const { stdout } = await _execFileAsync("reg", [
    "QUERY",
    " HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice",
    "/v",
    "ProgId"
  ]);
  const match = /ProgId\s*REG_SZ\s*(?<id>\S+)/.exec(stdout);
  if (!match) {
    throw new UnknownBrowserError(`Cannot find Windows browser in stdout: ${JSON.stringify(stdout)}`);
  }
  const { id } = match.groups;
  const dotIndex = id.lastIndexOf(".");
  const hyphenIndex = id.lastIndexOf("-");
  const baseIdByDot = dotIndex === -1 ? void 0 : id.slice(0, dotIndex);
  const baseIdByHyphen = hyphenIndex === -1 ? void 0 : id.slice(0, hyphenIndex);
  return windowsBrowserProgIds[id] ?? windowsBrowserProgIds[baseIdByDot] ?? windowsBrowserProgIds[baseIdByHyphen] ?? { name: id, id };
}
var execFileAsync3, windowsBrowserProgIds, _windowsBrowserProgIdMap, UnknownBrowserError;
var init_windows = __esm({
  "../../node_modules/default-browser/windows.js"() {
    "use strict";
    execFileAsync3 = promisify3(execFile3);
    windowsBrowserProgIds = {
      MSEdgeHTM: { name: "Edge", id: "com.microsoft.edge" },
      // The missing `L` is correct.
      MSEdgeBHTML: { name: "Edge Beta", id: "com.microsoft.edge.beta" },
      MSEdgeDHTML: { name: "Edge Dev", id: "com.microsoft.edge.dev" },
      AppXq0fevzme2pys62n3e0fbqa7peapykr8v: { name: "Edge", id: "com.microsoft.edge.old" },
      ChromeHTML: { name: "Chrome", id: "com.google.chrome" },
      ChromeBHTML: { name: "Chrome Beta", id: "com.google.chrome.beta" },
      ChromeDHTML: { name: "Chrome Dev", id: "com.google.chrome.dev" },
      ChromiumHTM: { name: "Chromium", id: "org.chromium.Chromium" },
      BraveHTML: { name: "Brave", id: "com.brave.Browser" },
      BraveBHTML: { name: "Brave Beta", id: "com.brave.Browser.beta" },
      BraveDHTML: { name: "Brave Dev", id: "com.brave.Browser.dev" },
      BraveSSHTM: { name: "Brave Nightly", id: "com.brave.Browser.nightly" },
      FirefoxURL: { name: "Firefox", id: "org.mozilla.firefox" },
      OperaStable: { name: "Opera", id: "com.operasoftware.Opera" },
      VivaldiHTM: { name: "Vivaldi", id: "com.vivaldi.Vivaldi" },
      "IE.HTTP": { name: "Internet Explorer", id: "com.microsoft.ie" }
    };
    _windowsBrowserProgIdMap = new Map(Object.entries(windowsBrowserProgIds));
    UnknownBrowserError = class extends Error {
    };
  }
});

// ../../node_modules/default-browser/index.js
import { promisify as promisify4 } from "util";
import process10 from "process";
import { execFile as execFile4 } from "child_process";
async function defaultBrowser2() {
  if (process10.platform === "darwin") {
    const id = await defaultBrowserId();
    const name3 = await bundleName(id);
    return { name: name3, id };
  }
  if (process10.platform === "linux") {
    const { stdout } = await execFileAsync4("xdg-mime", ["query", "default", "x-scheme-handler/http"]);
    const id = stdout.trim();
    const name3 = titleize(id.replace(/.desktop$/, "").replace("-", " "));
    return { name: name3, id };
  }
  if (process10.platform === "win32") {
    return defaultBrowser();
  }
  throw new Error("Only macOS, Linux, and Windows are supported");
}
var execFileAsync4, titleize;
var init_default_browser = __esm({
  "../../node_modules/default-browser/index.js"() {
    "use strict";
    init_default_browser_id();
    init_bundle_name();
    init_windows();
    execFileAsync4 = promisify4(execFile4);
    titleize = (string) => string.toLowerCase().replaceAll(/(?:^|\s|-)\S/g, (x) => x.toUpperCase());
  }
});

// ../../node_modules/open/index.js
var open_exports = {};
__export(open_exports, {
  apps: () => apps,
  default: () => open_default,
  openApp: () => openApp
});
import process11 from "process";
import { Buffer as Buffer2 } from "buffer";
import path2 from "path";
import { fileURLToPath } from "url";
import { promisify as promisify5 } from "util";
import childProcess from "child_process";
import fs5, { constants as fsConstants2 } from "fs/promises";
async function getWindowsDefaultBrowserFromWsl() {
  const powershellPath = await powerShellPath();
  const rawCommand = String.raw`(Get-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\Shell\Associations\UrlAssociations\http\UserChoice").ProgId`;
  const encodedCommand = Buffer2.from(rawCommand, "utf16le").toString("base64");
  const { stdout } = await execFile5(
    powershellPath,
    [
      "-NoProfile",
      "-NonInteractive",
      "-ExecutionPolicy",
      "Bypass",
      "-EncodedCommand",
      encodedCommand
    ],
    { encoding: "utf8" }
  );
  const progId = stdout.trim();
  const browserMap = {
    ChromeHTML: "com.google.chrome",
    BraveHTML: "com.brave.Browser",
    MSEdgeHTM: "com.microsoft.edge",
    FirefoxURL: "org.mozilla.firefox"
  };
  return browserMap[progId] ? { id: browserMap[progId] } : {};
}
function detectArchBinary(binary) {
  if (typeof binary === "string" || Array.isArray(binary)) {
    return binary;
  }
  const { [arch]: archBinary } = binary;
  if (!archBinary) {
    throw new Error(`${arch} is not supported`);
  }
  return archBinary;
}
function detectPlatformBinary({ [platform]: platformBinary }, { wsl }) {
  if (wsl && is_wsl_default) {
    return detectArchBinary(wsl);
  }
  if (!platformBinary) {
    throw new Error(`${platform} is not supported`);
  }
  return detectArchBinary(platformBinary);
}
var execFile5, __dirname, localXdgOpenPath, platform, arch, pTryEach, baseOpen, open, openApp, apps, open_default;
var init_open = __esm({
  "../../node_modules/open/index.js"() {
    "use strict";
    init_wsl_utils();
    init_define_lazy_prop();
    init_default_browser();
    init_is_inside_container();
    execFile5 = promisify5(childProcess.execFile);
    __dirname = path2.dirname(fileURLToPath(import.meta.url));
    localXdgOpenPath = path2.join(__dirname, "xdg-open");
    ({ platform, arch } = process11);
    pTryEach = async (array, mapper) => {
      let latestError;
      for (const item of array) {
        try {
          return await mapper(item);
        } catch (error) {
          latestError = error;
        }
      }
      throw latestError;
    };
    baseOpen = async (options) => {
      options = {
        wait: false,
        background: false,
        newInstance: false,
        allowNonzeroExitCode: false,
        ...options
      };
      if (Array.isArray(options.app)) {
        return pTryEach(options.app, (singleApp) => baseOpen({
          ...options,
          app: singleApp
        }));
      }
      let { name: app, arguments: appArguments = [] } = options.app ?? {};
      appArguments = [...appArguments];
      if (Array.isArray(app)) {
        return pTryEach(app, (appName) => baseOpen({
          ...options,
          app: {
            name: appName,
            arguments: appArguments
          }
        }));
      }
      if (app === "browser" || app === "browserPrivate") {
        const ids = {
          "com.google.chrome": "chrome",
          "google-chrome.desktop": "chrome",
          "com.brave.Browser": "brave",
          "org.mozilla.firefox": "firefox",
          "firefox.desktop": "firefox",
          "com.microsoft.msedge": "edge",
          "com.microsoft.edge": "edge",
          "com.microsoft.edgemac": "edge",
          "microsoft-edge.desktop": "edge"
        };
        const flags = {
          chrome: "--incognito",
          brave: "--incognito",
          firefox: "--private-window",
          edge: "--inPrivate"
        };
        const browser = is_wsl_default ? await getWindowsDefaultBrowserFromWsl() : await defaultBrowser2();
        if (browser.id in ids) {
          const browserName = ids[browser.id];
          if (app === "browserPrivate") {
            appArguments.push(flags[browserName]);
          }
          return baseOpen({
            ...options,
            app: {
              name: apps[browserName],
              arguments: appArguments
            }
          });
        }
        throw new Error(`${browser.name} is not supported as a default browser`);
      }
      let command;
      const cliArguments = [];
      const childProcessOptions = {};
      if (platform === "darwin") {
        command = "open";
        if (options.wait) {
          cliArguments.push("--wait-apps");
        }
        if (options.background) {
          cliArguments.push("--background");
        }
        if (options.newInstance) {
          cliArguments.push("--new");
        }
        if (app) {
          cliArguments.push("-a", app);
        }
      } else if (platform === "win32" || is_wsl_default && !isInsideContainer() && !app) {
        command = await powerShellPath();
        cliArguments.push(
          "-NoProfile",
          "-NonInteractive",
          "-ExecutionPolicy",
          "Bypass",
          "-EncodedCommand"
        );
        if (!is_wsl_default) {
          childProcessOptions.windowsVerbatimArguments = true;
        }
        const encodedArguments = ["Start"];
        if (options.wait) {
          encodedArguments.push("-Wait");
        }
        if (app) {
          encodedArguments.push(`"\`"${app}\`""`);
          if (options.target) {
            appArguments.push(options.target);
          }
        } else if (options.target) {
          encodedArguments.push(`"${options.target}"`);
        }
        if (appArguments.length > 0) {
          appArguments = appArguments.map((argument) => `"\`"${argument}\`""`);
          encodedArguments.push("-ArgumentList", appArguments.join(","));
        }
        options.target = Buffer2.from(encodedArguments.join(" "), "utf16le").toString("base64");
      } else {
        if (app) {
          command = app;
        } else {
          const isBundled = !__dirname || __dirname === "/";
          let exeLocalXdgOpen = false;
          try {
            await fs5.access(localXdgOpenPath, fsConstants2.X_OK);
            exeLocalXdgOpen = true;
          } catch {
          }
          const useSystemXdgOpen = process11.versions.electron ?? (platform === "android" || isBundled || !exeLocalXdgOpen);
          command = useSystemXdgOpen ? "xdg-open" : localXdgOpenPath;
        }
        if (appArguments.length > 0) {
          cliArguments.push(...appArguments);
        }
        if (!options.wait) {
          childProcessOptions.stdio = "ignore";
          childProcessOptions.detached = true;
        }
      }
      if (platform === "darwin" && appArguments.length > 0) {
        cliArguments.push("--args", ...appArguments);
      }
      if (options.target) {
        cliArguments.push(options.target);
      }
      const subprocess = childProcess.spawn(command, cliArguments, childProcessOptions);
      if (options.wait) {
        return new Promise((resolve, reject) => {
          subprocess.once("error", reject);
          subprocess.once("close", (exitCode) => {
            if (!options.allowNonzeroExitCode && exitCode > 0) {
              reject(new Error(`Exited with code ${exitCode}`));
              return;
            }
            resolve(subprocess);
          });
        });
      }
      subprocess.unref();
      return subprocess;
    };
    open = (target, options) => {
      if (typeof target !== "string") {
        throw new TypeError("Expected a `target`");
      }
      return baseOpen({
        ...options,
        target
      });
    };
    openApp = (name3, options) => {
      if (typeof name3 !== "string" && !Array.isArray(name3)) {
        throw new TypeError("Expected a valid `name`");
      }
      const { arguments: appArguments = [] } = options ?? {};
      if (appArguments !== void 0 && appArguments !== null && !Array.isArray(appArguments)) {
        throw new TypeError("Expected `appArguments` as Array type");
      }
      return baseOpen({
        ...options,
        app: {
          name: name3,
          arguments: appArguments
        }
      });
    };
    apps = {};
    defineLazyProperty(apps, "chrome", () => detectPlatformBinary({
      darwin: "google chrome",
      win32: "chrome",
      linux: ["google-chrome", "google-chrome-stable", "chromium"]
    }, {
      wsl: {
        ia32: "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
        x64: ["/mnt/c/Program Files/Google/Chrome/Application/chrome.exe", "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"]
      }
    }));
    defineLazyProperty(apps, "brave", () => detectPlatformBinary({
      darwin: "brave browser",
      win32: "brave",
      linux: ["brave-browser", "brave"]
    }, {
      wsl: {
        ia32: "/mnt/c/Program Files (x86)/BraveSoftware/Brave-Browser/Application/brave.exe",
        x64: ["/mnt/c/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe", "/mnt/c/Program Files (x86)/BraveSoftware/Brave-Browser/Application/brave.exe"]
      }
    }));
    defineLazyProperty(apps, "firefox", () => detectPlatformBinary({
      darwin: "firefox",
      win32: String.raw`C:\Program Files\Mozilla Firefox\firefox.exe`,
      linux: "firefox"
    }, {
      wsl: "/mnt/c/Program Files/Mozilla Firefox/firefox.exe"
    }));
    defineLazyProperty(apps, "edge", () => detectPlatformBinary({
      darwin: "microsoft edge",
      win32: "msedge",
      linux: ["microsoft-edge", "microsoft-edge-dev"]
    }, {
      wsl: "/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
    }));
    defineLazyProperty(apps, "browser", () => "browser");
    defineLazyProperty(apps, "browserPrivate", () => "browserPrivate");
    open_default = open;
  }
});

// src/errors.ts
var CloudError = class extends Error {
  constructor(message, cloud, service, operation) {
    super(message);
    this.cloud = cloud;
    this.service = service;
    this.operation = operation;
    this.name = this.constructor.name;
  }
  cloud;
  service;
  operation;
};
var CloudNotConfiguredError = class extends CloudError {
  constructor(cloud, service) {
    super(`Cloud not configured: ${cloud}`, cloud, service, "init");
  }
};
var InvalidCloudError = class extends CloudError {
  constructor(cloud, service) {
    super(`Invalid cloud provider: ${cloud}. Must be 'aws', 'gcp', or 'azure'`, cloud, service, "init");
  }
};
var SecretNotFoundError = class extends CloudError {
  constructor(cloud, service, name3) {
    super(`Secret not found: ${name3}`, cloud, service, "getSecret");
  }
};
var AuthError = class extends CloudError {
  constructor(cloud, service, operation, message) {
    super(message ?? `Authentication failed for ${service}`, cloud, service, operation);
  }
};
var TimeoutError = class extends CloudError {
  constructor(cloud, service, operation) {
    super(`Operation timed out: ${operation}`, cloud, service, operation);
  }
};
var ValidationError = class extends CloudError {
  constructor(cloud, service, operation, message) {
    super(message, cloud, service, operation);
  }
};
var NotImplementedError = class extends CloudError {
  constructor(cloud, service, operation) {
    super(`Operation not implemented for ${cloud} ${service}: ${operation}`, cloud, service, operation);
  }
};

// src/resolver.ts
function resolveCloud(config, service) {
  if (config.cloud) {
    if (config.cloud !== "aws" && config.cloud !== "gcp" && config.cloud !== "azure") {
      throw new InvalidCloudError(config.cloud, service);
    }
    return config.cloud;
  }
  const env = process.env["CLOUD_PROVIDER"]?.toLowerCase();
  if (env === "aws" || env === "gcp" || env === "azure") {
    return env;
  }
  throw new CloudNotConfiguredError(config.cloud ?? "undefined", service);
}

// src/aws.strategy.ts
import {
  SecretsManagerClient,
  GetSecretValueCommand,
  CreateSecretCommand,
  UpdateSecretCommand,
  DeleteSecretCommand,
  ListSecretsCommand
} from "@aws-sdk/client-secrets-manager";

// src/retry.ts
async function withRetry(fn, options) {
  const maxRetries = options?.maxRetries ?? 3;
  const baseDelayMs = options?.baseDelayMs ?? 100;
  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < maxRetries) {
        const delay4 = baseDelayMs * Math.pow(2, attempt) + Math.random() * baseDelayMs;
        await new Promise((resolve) => setTimeout(resolve, delay4));
      }
    }
  }
  throw lastError;
}

// src/aws.strategy.ts
var AwsSecretsStrategy = class {
  client;
  retryConfig;
  constructor(config) {
    resolveCloud(config, "secrets-manager");
    this.client = new SecretsManagerClient({ region: config.region ?? "us-east-1", ...config.config });
    this.retryConfig = {
      maxRetries: config.config?.["maxRetries"] ?? 3,
      baseDelayMs: config.config?.["baseDelayMs"] ?? 100
    };
  }
  async getSecret(name3) {
    try {
      const result = await withRetry(() => this.client.send(new GetSecretValueCommand({ SecretId: name3 })), this.retryConfig);
      return {
        name: result.Name ?? name3,
        value: result.SecretString ?? "",
        versionId: result.VersionId,
        created: result.CreatedDate ?? /* @__PURE__ */ new Date(),
        lastModified: result.CreatedDate ?? /* @__PURE__ */ new Date()
      };
    } catch (err) {
      if (err.name === "ResourceNotFoundException") throw new SecretNotFoundError("aws", "secrets-manager", name3);
      if (err.name === "CredentialsProviderError") throw new AuthError("aws", "secrets-manager", "getSecret");
      throw err;
    }
  }
  async createSecret(name3, value, options) {
    const result = await withRetry(() => this.client.send(new CreateSecretCommand({
      Name: name3,
      SecretString: value,
      Description: options?.description,
      Tags: options?.tags ? Object.entries(options.tags).map(([Key, Value]) => ({ Key, Value })) : void 0
    })), this.retryConfig);
    return {
      name: result.Name ?? name3,
      arn: result.ARN,
      created: /* @__PURE__ */ new Date()
    };
  }
  async updateSecret(name3, value) {
    const result = await withRetry(() => this.client.send(new UpdateSecretCommand({
      SecretId: name3,
      SecretString: value
    })), this.retryConfig);
    return {
      name: result.Name ?? name3,
      arn: result.ARN,
      created: /* @__PURE__ */ new Date()
    };
  }
  async deleteSecret(name3, options) {
    await withRetry(() => this.client.send(new DeleteSecretCommand({
      SecretId: name3,
      RecoveryWindowInDays: options?.recoveryWindowDays ?? 30,
      ForceDeleteWithoutRecovery: options?.forceDelete
    })), this.retryConfig);
  }
  async listSecrets(options) {
    const result = await withRetry(() => this.client.send(new ListSecretsCommand({
      MaxResults: options?.maxResults,
      NextToken: options?.nextToken
    })), this.retryConfig);
    return {
      secrets: (result.SecretList ?? []).map((s) => ({
        name: s.Name,
        arn: s.ARN,
        created: s.CreatedDate ?? /* @__PURE__ */ new Date()
      })),
      nextToken: result.NextToken
    };
  }
};

// src/gcp.strategy.ts
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
var GcpSecretsStrategy = class {
  client;
  project;
  maxRetries;
  baseDelayMs;
  constructor(config) {
    resolveCloud(config, "secret-manager");
    this.client = new SecretManagerServiceClient(config.config);
    this.project = config.config?.["projectId"] ?? config.config?.["project"] ?? "unknown";
    this.maxRetries = config.config?.["maxRetries"] ?? 3;
    this.baseDelayMs = config.config?.["baseDelayMs"] ?? 100;
  }
  parent() {
    return `projects/${this.project}`;
  }
  secretPath(name3) {
    return `${this.parent()}/secrets/${name3}`;
  }
  versionPath(name3, version3 = "latest") {
    return `${this.secretPath(name3)}/versions/${version3}`;
  }
  retry(fn) {
    return withRetry(fn, { maxRetries: this.maxRetries, baseDelayMs: this.baseDelayMs });
  }
  async getSecret(name3) {
    try {
      const [version3] = await this.retry(() => this.client.accessSecretVersion({ name: this.versionPath(name3) }));
      const [secret] = await this.retry(() => this.client.getSecret({ name: this.secretPath(name3) }));
      return {
        name: name3,
        value: version3.payload?.data?.toString() ?? "",
        created: fromTimestamp(secret.createTime),
        lastModified: fromTimestamp(secret.createTime)
      };
    } catch (err) {
      if (err.code === 5 || err.code === 404) throw new SecretNotFoundError("gcp", "secret-manager", name3);
      if (err.code === 7 || err.code === 16) throw new AuthError("gcp", "secret-manager", "getSecret");
      throw err;
    }
  }
  async createSecret(name3, value, options) {
    const [secret] = await this.retry(() => this.client.createSecret({
      parent: this.parent(),
      secretId: name3,
      secret: {
        replication: { automatic: {} },
        labels: options?.tags
      }
    }));
    await this.retry(() => this.client.addSecretVersion({
      parent: secret.name,
      payload: { data: Buffer.from(value) }
    }));
    return {
      name: name3,
      arn: secret.name ?? void 0,
      created: fromTimestamp(secret.createTime)
    };
  }
  async updateSecret(name3, value) {
    const [secret] = await this.retry(() => this.client.getSecret({ name: this.secretPath(name3) }));
    await this.retry(() => this.client.addSecretVersion({
      parent: secret.name,
      payload: { data: Buffer.from(value) }
    }));
    return {
      name: name3,
      arn: secret.name ?? void 0,
      created: fromTimestamp(secret.createTime)
    };
  }
  async deleteSecret(name3, _options) {
    try {
      await this.retry(() => this.client.deleteSecret({ name: this.secretPath(name3) }));
    } catch (err) {
      if (err.code === 5) return;
      throw err;
    }
  }
  async listSecrets(options) {
    const [secrets] = await this.retry(() => this.client.listSecrets({
      parent: this.parent(),
      pageSize: options?.maxResults
    }));
    return {
      secrets: secrets.map((s) => ({
        name: s.name?.split("/").pop() ?? "",
        arn: s.name ?? void 0,
        created: fromTimestamp(s.createTime)
      }))
    };
  }
};
function fromTimestamp(ts) {
  if (!ts) return /* @__PURE__ */ new Date();
  const seconds = typeof ts.seconds === "number" ? ts.seconds : Number(ts.seconds ?? 0);
  return new Date(seconds * 1e3);
}

// src/azure.strategy.ts
import { SecretClient } from "@azure/keyvault-secrets";

// ../../node_modules/@azure/identity/dist/esm/constants.js
var SDK_VERSION = `4.13.1`;
var DeveloperSignOnClientId = "04b07795-8ddb-461a-bbee-02f9e1bf7b46";
var DefaultTenantId = "common";
var AzureAuthorityHosts;
(function(AzureAuthorityHosts2) {
  AzureAuthorityHosts2["AzureChina"] = "https://login.chinacloudapi.cn";
  AzureAuthorityHosts2["AzureGermany"] = "https://login.microsoftonline.de";
  AzureAuthorityHosts2["AzureGovernment"] = "https://login.microsoftonline.us";
  AzureAuthorityHosts2["AzurePublicCloud"] = "https://login.microsoftonline.com";
})(AzureAuthorityHosts || (AzureAuthorityHosts = {}));
var DefaultAuthorityHost = AzureAuthorityHosts.AzurePublicCloud;
var DefaultAuthority = "login.microsoftonline.com";
var ALL_TENANTS = ["*"];
var CACHE_CAE_SUFFIX = "cae";
var CACHE_NON_CAE_SUFFIX = "nocae";
var DEFAULT_TOKEN_CACHE_NAME = "msal.cache";

// ../../node_modules/@azure/identity/dist/esm/msal/nodeFlows/msalPlugins.js
var persistenceProvider = void 0;
var nativeBrokerInfo = void 0;
var vsCodeAuthRecordPath = void 0;
var vsCodeBrokerInfo = void 0;
function hasVSCodePlugin() {
  return vsCodeAuthRecordPath !== void 0 && vsCodeBrokerInfo !== void 0;
}
function generatePluginConfiguration(options) {
  const config = {
    cache: {},
    broker: {
      ...options.brokerOptions,
      isEnabled: options.brokerOptions?.enabled ?? false,
      enableMsaPassthrough: options.brokerOptions?.legacyEnableMsaPassthrough ?? false
    }
  };
  if (options.tokenCachePersistenceOptions?.enabled) {
    if (persistenceProvider === void 0) {
      throw new Error([
        "Persistent token caching was requested, but no persistence provider was configured.",
        "You must install the identity-cache-persistence plugin package (`npm install --save @azure/identity-cache-persistence`)",
        "and enable it by importing `useIdentityPlugin` from `@azure/identity` and calling",
        "`useIdentityPlugin(cachePersistencePlugin)` before using `tokenCachePersistenceOptions`."
      ].join(" "));
    }
    const cacheBaseName = options.tokenCachePersistenceOptions.name || DEFAULT_TOKEN_CACHE_NAME;
    config.cache.cachePlugin = persistenceProvider({
      name: `${cacheBaseName}.${CACHE_NON_CAE_SUFFIX}`,
      ...options.tokenCachePersistenceOptions
    });
    config.cache.cachePluginCae = persistenceProvider({
      name: `${cacheBaseName}.${CACHE_CAE_SUFFIX}`,
      ...options.tokenCachePersistenceOptions
    });
  }
  if (options.brokerOptions?.enabled) {
    config.broker.nativeBrokerPlugin = getBrokerPlugin(options.isVSCodeCredential || false);
  }
  return config;
}
var brokerErrorTemplates = {
  missing: (credentialName6, packageName, pluginVar) => [
    `${credentialName6} was requested, but no plugin was configured or no authentication record was found.`,
    `You must install the ${packageName} plugin package (npm install --save ${packageName})`,
    "and enable it by importing `useIdentityPlugin` from `@azure/identity` and calling",
    `useIdentityPlugin(${pluginVar}) before using enableBroker.`
  ].join(" "),
  unavailable: (credentialName6, packageName) => [
    `${credentialName6} was requested, and the plugin is configured, but the broker is unavailable.`,
    `Ensure the ${credentialName6} plugin is properly installed and configured.`,
    "Check for missing native dependencies and ensure the package is properly installed.",
    `See the README for prerequisites on installing and using ${packageName}.`
  ].join(" ")
};
var brokerConfig = {
  vsCode: {
    credentialName: "Visual Studio Code Credential",
    packageName: "@azure/identity-vscode",
    pluginVar: "vsCodePlugin",
    get brokerInfo() {
      return vsCodeBrokerInfo;
    }
  },
  native: {
    credentialName: "Broker for WAM",
    packageName: "@azure/identity-broker",
    pluginVar: "nativeBrokerPlugin",
    get brokerInfo() {
      return nativeBrokerInfo;
    }
  }
};
function getBrokerPlugin(isVSCodePlugin) {
  const { credentialName: credentialName6, packageName, pluginVar, brokerInfo } = brokerConfig[isVSCodePlugin ? "vsCode" : "native"];
  if (brokerInfo === void 0) {
    throw new Error(brokerErrorTemplates.missing(credentialName6, packageName, pluginVar));
  }
  if (brokerInfo.broker.isBrokerAvailable === false) {
    throw new Error(brokerErrorTemplates.unavailable(credentialName6, packageName));
  }
  return brokerInfo.broker;
}
var msalPlugins = {
  generatePluginConfiguration
};

// ../../node_modules/@azure/identity/dist/esm/errors.js
function isErrorResponse(errorResponse) {
  return errorResponse && typeof errorResponse.error === "string" && typeof errorResponse.error_description === "string";
}
var CredentialUnavailableErrorName = "CredentialUnavailableError";
var CredentialUnavailableError = class extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = CredentialUnavailableErrorName;
  }
};
var AuthenticationErrorName = "AuthenticationError";
var AuthenticationError = class extends Error {
  /**
   * The HTTP status code returned from the authentication request.
   */
  statusCode;
  /**
   * The error response details.
   */
  errorResponse;
  constructor(statusCode, errorBody, options) {
    let errorResponse = {
      error: "unknown",
      errorDescription: "An unknown error occurred and no additional details are available."
    };
    if (isErrorResponse(errorBody)) {
      errorResponse = convertOAuthErrorResponseToErrorResponse(errorBody);
    } else if (typeof errorBody === "string") {
      try {
        const oauthErrorResponse = JSON.parse(errorBody);
        errorResponse = convertOAuthErrorResponseToErrorResponse(oauthErrorResponse);
      } catch (e) {
        if (statusCode === 400) {
          errorResponse = {
            error: "invalid_request",
            errorDescription: `The service indicated that the request was invalid.

${errorBody}`
          };
        } else {
          errorResponse = {
            error: "unknown_error",
            errorDescription: `An unknown error has occurred. Response body:

${errorBody}`
          };
        }
      }
    } else {
      errorResponse = {
        error: "unknown_error",
        errorDescription: "An unknown error occurred and no additional details are available."
      };
    }
    super(`${errorResponse.error} Status code: ${statusCode}
More details:
${errorResponse.errorDescription},`, options);
    this.statusCode = statusCode;
    this.errorResponse = errorResponse;
    this.name = AuthenticationErrorName;
  }
};
var AggregateAuthenticationErrorName = "AggregateAuthenticationError";
var AggregateAuthenticationError = class extends Error {
  /**
   * The array of error objects that were thrown while trying to authenticate
   * with the credentials in a {@link ChainedTokenCredential}.
   */
  errors;
  constructor(errors, errorMessage) {
    const errorDetail = errors.join("\n");
    super(`${errorMessage}
${errorDetail}`);
    this.errors = errors;
    this.name = AggregateAuthenticationErrorName;
  }
};
function convertOAuthErrorResponseToErrorResponse(errorBody) {
  return {
    error: errorBody.error,
    errorDescription: errorBody.error_description,
    correlationId: errorBody.correlation_id,
    errorCodes: errorBody.error_codes,
    timestamp: errorBody.timestamp,
    traceId: errorBody.trace_id
  };
}
var AuthenticationRequiredError = class extends Error {
  /**
   * The list of scopes for which the token will have access.
   */
  scopes;
  /**
   * The options passed to the getToken request.
   */
  getTokenOptions;
  constructor(options) {
    super(options.message, options.cause ? { cause: options.cause } : void 0);
    this.scopes = options.scopes;
    this.getTokenOptions = options.getTokenOptions;
    this.name = "AuthenticationRequiredError";
  }
};

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/logger/log.js
import { EOL } from "os";
import util from "util";
import process2 from "process";
function log(message, ...args) {
  process2.stderr.write(`${util.format(message, ...args)}${EOL}`);
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/env.js
import process3 from "process";
function getEnvironmentVariable(name3) {
  return process3.env[name3];
}
var isDeno = typeof process3.versions.deno === "string" && process3.versions.deno.length > 0;
var isBun = typeof process3.versions.bun === "string" && process3.versions.bun.length > 0;
var isNodeLike = true;

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/logger/debug.js
var debugEnvVariable = getEnvironmentVariable("DEBUG");
var enabledString;
var enabledNamespaces = [];
var skippedNamespaces = [];
var debuggers = [];
if (debugEnvVariable) {
  enable(debugEnvVariable);
}
var debugObj = Object.assign((namespace) => {
  return createDebugger(namespace);
}, {
  enable,
  enabled,
  disable,
  log
});
function enable(namespaces) {
  enabledString = namespaces;
  enabledNamespaces = [];
  skippedNamespaces = [];
  const namespaceList = namespaces.split(",").map((ns) => ns.trim());
  for (const ns of namespaceList) {
    if (ns.startsWith("-")) {
      skippedNamespaces.push(ns.substring(1));
    } else {
      enabledNamespaces.push(ns);
    }
  }
  for (const instance of debuggers) {
    instance.enabled = enabled(instance.namespace);
  }
}
function enabled(namespace) {
  if (namespace.endsWith("*")) {
    return true;
  }
  for (const skipped of skippedNamespaces) {
    if (namespaceMatches(namespace, skipped)) {
      return false;
    }
  }
  for (const enabledNamespace of enabledNamespaces) {
    if (namespaceMatches(namespace, enabledNamespace)) {
      return true;
    }
  }
  return false;
}
function namespaceMatches(namespace, patternToMatch) {
  if (patternToMatch.indexOf("*") === -1) {
    return namespace === patternToMatch;
  }
  let pattern = patternToMatch;
  if (patternToMatch.indexOf("**") !== -1) {
    const patternParts = [];
    let lastCharacter = "";
    for (const character of patternToMatch) {
      if (character === "*" && lastCharacter === "*") {
        continue;
      } else {
        lastCharacter = character;
        patternParts.push(character);
      }
    }
    pattern = patternParts.join("");
  }
  let namespaceIndex = 0;
  let patternIndex = 0;
  const patternLength = pattern.length;
  const namespaceLength = namespace.length;
  let lastWildcard = -1;
  let lastWildcardNamespace = -1;
  while (namespaceIndex < namespaceLength && patternIndex < patternLength) {
    if (pattern[patternIndex] === "*") {
      lastWildcard = patternIndex;
      patternIndex++;
      if (patternIndex === patternLength) {
        return true;
      }
      while (namespace[namespaceIndex] !== pattern[patternIndex]) {
        namespaceIndex++;
        if (namespaceIndex === namespaceLength) {
          return false;
        }
      }
      lastWildcardNamespace = namespaceIndex;
      namespaceIndex++;
      patternIndex++;
      continue;
    } else if (pattern[patternIndex] === namespace[namespaceIndex]) {
      patternIndex++;
      namespaceIndex++;
    } else if (lastWildcard >= 0) {
      patternIndex = lastWildcard + 1;
      namespaceIndex = lastWildcardNamespace + 1;
      if (namespaceIndex === namespaceLength) {
        return false;
      }
      while (namespace[namespaceIndex] !== pattern[patternIndex]) {
        namespaceIndex++;
        if (namespaceIndex === namespaceLength) {
          return false;
        }
      }
      lastWildcardNamespace = namespaceIndex;
      namespaceIndex++;
      patternIndex++;
      continue;
    } else {
      return false;
    }
  }
  const namespaceDone = namespaceIndex === namespace.length;
  const patternDone = patternIndex === pattern.length;
  const trailingWildCard = patternIndex === pattern.length - 1 && pattern[patternIndex] === "*";
  return namespaceDone && (patternDone || trailingWildCard);
}
function disable() {
  const result = enabledString || "";
  enable("");
  return result;
}
function createDebugger(namespace) {
  const newDebugger = Object.assign(debug, {
    enabled: enabled(namespace),
    destroy,
    log: debugObj.log,
    namespace,
    extend
  });
  function debug(...args) {
    if (!newDebugger.enabled) {
      return;
    }
    if (args.length > 0) {
      args[0] = `${namespace} ${args[0]}`;
    }
    newDebugger.log(...args);
  }
  debuggers.push(newDebugger);
  return newDebugger;
}
function destroy() {
  const index = debuggers.indexOf(this);
  if (index >= 0) {
    debuggers.splice(index, 1);
    return true;
  }
  return false;
}
function extend(namespace) {
  const newDebugger = createDebugger(`${this.namespace}:${namespace}`);
  newDebugger.log = this.log;
  return newDebugger;
}
var debug_default = debugObj;

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/logger/logger.js
var TYPESPEC_RUNTIME_LOG_LEVELS = ["verbose", "info", "warning", "error"];
var levelMap = {
  verbose: 400,
  info: 300,
  warning: 200,
  error: 100
};
function patchLogMethod(parent, child) {
  child.log = (...args) => {
    parent.log(...args);
  };
}
function isTypeSpecRuntimeLogLevel(level) {
  return TYPESPEC_RUNTIME_LOG_LEVELS.includes(level);
}
function createLoggerContext(options) {
  const registeredLoggers = /* @__PURE__ */ new Set();
  const logLevelFromEnv = getEnvironmentVariable(options.logLevelEnvVarName);
  let logLevel;
  const clientLogger = debug_default(options.namespace);
  clientLogger.log = (...args) => {
    debug_default.log(...args);
  };
  function contextSetLogLevel(level) {
    if (level && !isTypeSpecRuntimeLogLevel(level)) {
      throw new Error(`Unknown log level '${level}'. Acceptable values: ${TYPESPEC_RUNTIME_LOG_LEVELS.join(",")}`);
    }
    logLevel = level;
    const enabledNamespaces2 = [];
    for (const logger27 of registeredLoggers) {
      if (shouldEnable(logger27)) {
        enabledNamespaces2.push(logger27.namespace);
      }
    }
    debug_default.enable(enabledNamespaces2.join(","));
  }
  if (logLevelFromEnv) {
    if (isTypeSpecRuntimeLogLevel(logLevelFromEnv)) {
      contextSetLogLevel(logLevelFromEnv);
    } else {
      console.error(`${options.logLevelEnvVarName} set to unknown log level '${logLevelFromEnv}'; logging is not enabled. Acceptable values: ${TYPESPEC_RUNTIME_LOG_LEVELS.join(", ")}.`);
    }
  }
  function shouldEnable(logger27) {
    return Boolean(logLevel && levelMap[logger27.level] <= levelMap[logLevel]);
  }
  function createLogger(parent, level) {
    const logger27 = Object.assign(parent.extend(level), {
      level
    });
    patchLogMethod(parent, logger27);
    if (shouldEnable(logger27)) {
      const enabledNamespaces2 = debug_default.disable();
      debug_default.enable(enabledNamespaces2 + "," + logger27.namespace);
    }
    registeredLoggers.add(logger27);
    return logger27;
  }
  function contextGetLogLevel() {
    return logLevel;
  }
  function contextCreateClientLogger(namespace) {
    const clientRootLogger = clientLogger.extend(namespace);
    patchLogMethod(clientLogger, clientRootLogger);
    return {
      error: createLogger(clientRootLogger, "error"),
      warning: createLogger(clientRootLogger, "warning"),
      info: createLogger(clientRootLogger, "info"),
      verbose: createLogger(clientRootLogger, "verbose")
    };
  }
  return {
    setLogLevel: contextSetLogLevel,
    getLogLevel: contextGetLogLevel,
    createClientLogger: contextCreateClientLogger,
    logger: clientLogger
  };
}
var context = createLoggerContext({
  logLevelEnvVarName: "TYPESPEC_RUNTIME_LOG_LEVEL",
  namespace: "typeSpecRuntime"
});
var TypeSpecRuntimeLogger = context.logger;
function createClientLogger(namespace) {
  return context.createClientLogger(namespace);
}

// ../../node_modules/@azure/logger/dist/esm/index.js
var context2 = createLoggerContext({
  logLevelEnvVarName: "AZURE_LOG_LEVEL",
  namespace: "azure"
});
var AzureLogger = context2.logger;
function getLogLevel() {
  return context2.getLogLevel();
}
function createClientLogger2(namespace) {
  return context2.createClientLogger(namespace);
}

// ../../node_modules/@azure/identity/dist/esm/util/logging.js
var logger = createClientLogger2("identity");
function processEnvVars(supportedEnvVars) {
  return supportedEnvVars.reduce((acc, envVariable) => {
    if (process.env[envVariable]) {
      acc.assigned.push(envVariable);
    } else {
      acc.missing.push(envVariable);
    }
    return acc;
  }, { missing: [], assigned: [] });
}
function formatSuccess(scope) {
  return `SUCCESS. Scopes: ${Array.isArray(scope) ? scope.join(", ") : scope}.`;
}
function formatError(scope, error) {
  let message = "ERROR.";
  if (scope?.length) {
    message += ` Scopes: ${Array.isArray(scope) ? scope.join(", ") : scope}.`;
  }
  return `${message} Error message: ${typeof error === "string" ? error : error.message}.`;
}
function credentialLoggerInstance(title, parent, log2 = logger) {
  const fullTitle = parent ? `${parent.fullTitle} ${title}` : title;
  function info(message) {
    log2.info(`${fullTitle} =>`, message);
  }
  function warning(message) {
    log2.warning(`${fullTitle} =>`, message);
  }
  function verbose(message) {
    log2.verbose(`${fullTitle} =>`, message);
  }
  function error(message) {
    log2.error(`${fullTitle} =>`, message);
  }
  return {
    title,
    fullTitle,
    info,
    warning,
    verbose,
    error
  };
}
function credentialLogger(title, log2 = logger) {
  const credLogger = credentialLoggerInstance(title, void 0, log2);
  return {
    ...credLogger,
    parent: log2,
    getToken: credentialLoggerInstance("=> getToken()", credLogger, log2)
  };
}

// ../../node_modules/@azure/core-tracing/dist/esm/tracingContext.js
var knownContextKeys = {
  span: /* @__PURE__ */ Symbol.for("@azure/core-tracing span"),
  namespace: /* @__PURE__ */ Symbol.for("@azure/core-tracing namespace")
};
function createTracingContext(options = {}) {
  let context3 = new TracingContextImpl(options.parentContext);
  if (options.span) {
    context3 = context3.setValue(knownContextKeys.span, options.span);
  }
  if (options.namespace) {
    context3 = context3.setValue(knownContextKeys.namespace, options.namespace);
  }
  return context3;
}
var TracingContextImpl = class _TracingContextImpl {
  _contextMap;
  constructor(initialContext) {
    this._contextMap = initialContext instanceof _TracingContextImpl ? new Map(initialContext._contextMap) : /* @__PURE__ */ new Map();
  }
  setValue(key, value) {
    const newContext = new _TracingContextImpl(this);
    newContext._contextMap.set(key, value);
    return newContext;
  }
  getValue(key) {
    return this._contextMap.get(key);
  }
  deleteValue(key) {
    const newContext = new _TracingContextImpl(this);
    newContext._contextMap.delete(key);
    return newContext;
  }
};

// ../../node_modules/@azure/core-tracing/dist/esm/state.js
var import_state = __toESM(require_state(), 1);
var state = import_state.state;

// ../../node_modules/@azure/core-tracing/dist/esm/instrumenter.js
function createDefaultTracingSpan() {
  return {
    end: () => {
    },
    isRecording: () => false,
    recordException: () => {
    },
    setAttribute: () => {
    },
    setStatus: () => {
    },
    addEvent: () => {
    }
  };
}
function createDefaultInstrumenter() {
  return {
    createRequestHeaders: () => {
      return {};
    },
    parseTraceparentHeader: () => {
      return void 0;
    },
    startSpan: (_name, spanOptions) => {
      return {
        span: createDefaultTracingSpan(),
        tracingContext: createTracingContext({ parentContext: spanOptions.tracingContext })
      };
    },
    withContext(_context, callback, ...callbackArgs) {
      return callback(...callbackArgs);
    }
  };
}
function getInstrumenter() {
  if (!state.instrumenterImplementation) {
    state.instrumenterImplementation = createDefaultInstrumenter();
  }
  return state.instrumenterImplementation;
}

// ../../node_modules/@azure/core-tracing/dist/esm/tracingClient.js
function createTracingClient(options) {
  const { namespace, packageName, packageVersion } = options;
  function startSpan(name3, operationOptions, spanOptions) {
    const startSpanResult = getInstrumenter().startSpan(name3, {
      ...spanOptions,
      packageName,
      packageVersion,
      tracingContext: operationOptions?.tracingOptions?.tracingContext
    });
    let tracingContext = startSpanResult.tracingContext;
    const span = startSpanResult.span;
    if (!tracingContext.getValue(knownContextKeys.namespace)) {
      tracingContext = tracingContext.setValue(knownContextKeys.namespace, namespace);
    }
    span.setAttribute("az.namespace", tracingContext.getValue(knownContextKeys.namespace));
    const updatedOptions = Object.assign({}, operationOptions, {
      tracingOptions: { ...operationOptions?.tracingOptions, tracingContext }
    });
    return {
      span,
      updatedOptions
    };
  }
  async function withSpan(name3, operationOptions, callback, spanOptions) {
    const { span, updatedOptions } = startSpan(name3, operationOptions, spanOptions);
    try {
      const result = await withContext(updatedOptions.tracingOptions.tracingContext, () => Promise.resolve(callback(updatedOptions, span)));
      span.setStatus({ status: "success" });
      return result;
    } catch (err) {
      span.setStatus({ status: "error", error: err });
      throw err;
    } finally {
      span.end();
    }
  }
  function withContext(context3, callback, ...callbackArgs) {
    return getInstrumenter().withContext(context3, callback, ...callbackArgs);
  }
  function parseTraceparentHeader(traceparentHeader) {
    return getInstrumenter().parseTraceparentHeader(traceparentHeader);
  }
  function createRequestHeaders(tracingContext) {
    return getInstrumenter().createRequestHeaders(tracingContext);
  }
  return {
    startSpan,
    withSpan,
    withContext,
    parseTraceparentHeader,
    createRequestHeaders
  };
}

// ../../node_modules/@azure/identity/dist/esm/util/tracing.js
var tracingClient = createTracingClient({
  namespace: "Microsoft.AAD",
  packageName: "@azure/identity",
  packageVersion: SDK_VERSION
});

// ../../node_modules/@azure/identity/dist/esm/credentials/chainedTokenCredential.js
var logger2 = credentialLogger("ChainedTokenCredential");
var ChainedTokenCredential = class {
  _sources = [];
  /**
   * Creates an instance of ChainedTokenCredential using the given credentials.
   *
   * @param sources - `TokenCredential` implementations to be tried in order.
   *
   * Example usage:
   * ```ts snippet:chained_token_credential_example
   * import { ClientSecretCredential, ChainedTokenCredential } from "@azure/identity";
   *
   * const tenantId = "<tenant-id>";
   * const clientId = "<client-id>";
   * const clientSecret = "<client-secret>";
   * const anotherClientId = "<another-client-id>";
   * const anotherSecret = "<another-client-secret>";
   *
   * const firstCredential = new ClientSecretCredential(tenantId, clientId, clientSecret);
   * const secondCredential = new ClientSecretCredential(tenantId, anotherClientId, anotherSecret);
   *
   * const credentialChain = new ChainedTokenCredential(firstCredential, secondCredential);
   * ```
   */
  constructor(...sources) {
    this._sources = sources;
  }
  /**
   * Returns the first access token returned by one of the chained
   * `TokenCredential` implementations.  Throws an {@link AggregateAuthenticationError}
   * when one or more credentials throws an {@link AuthenticationError} and
   * no credentials have returned an access token.
   *
   * This method is called automatically by Azure SDK client libraries. You may call this method
   * directly, but you must also handle token caching and token refreshing.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                `TokenCredential` implementation might make.
   */
  async getToken(scopes, options = {}) {
    const { token } = await this.getTokenInternal(scopes, options);
    return token;
  }
  async getTokenInternal(scopes, options = {}) {
    let token = null;
    let successfulCredential;
    const errors = [];
    return tracingClient.withSpan("ChainedTokenCredential.getToken", options, async (updatedOptions) => {
      for (let i = 0; i < this._sources.length && token === null; i++) {
        try {
          token = await this._sources[i].getToken(scopes, updatedOptions);
          successfulCredential = this._sources[i];
        } catch (err) {
          if (err.name === "CredentialUnavailableError" || err.name === "AuthenticationRequiredError") {
            errors.push(err);
          } else {
            logger2.getToken.info(formatError(scopes, err));
            throw err;
          }
        }
      }
      if (!token && errors.length > 0) {
        const err = new AggregateAuthenticationError(errors, "ChainedTokenCredential authentication failed.");
        logger2.getToken.info(formatError(scopes, err));
        throw err;
      }
      logger2.getToken.info(`Result for ${successfulCredential.constructor.name}: ${formatSuccess(scopes)}`);
      if (token === null) {
        throw new CredentialUnavailableError("Failed to retrieve a valid token");
      }
      return { token, successfulCredential };
    });
  }
};

// ../../node_modules/@azure/msal-node/dist/index.mjs
var dist_exports = {};
__export(dist_exports, {
  AuthError: () => AuthError2,
  AuthErrorCodes: () => AuthErrorCodes_exports,
  AzureCloudInstance: () => AzureCloudInstance,
  ClientAssertion: () => ClientAssertion,
  ClientAuthError: () => ClientAuthError,
  ClientAuthErrorCodes: () => ClientAuthErrorCodes_exports,
  ClientConfigurationError: () => ClientConfigurationError,
  ClientConfigurationErrorCodes: () => ClientConfigurationErrorCodes_exports,
  ConfidentialClientApplication: () => ConfidentialClientApplication,
  CryptoProvider: () => CryptoProvider,
  DistributedCachePlugin: () => DistributedCachePlugin,
  InteractionRequiredAuthError: () => InteractionRequiredAuthError,
  InteractionRequiredAuthErrorCodes: () => InteractionRequiredAuthErrorCodes_exports,
  LogLevel: () => LogLevel,
  Logger: () => Logger,
  ManagedIdentityApplication: () => ManagedIdentityApplication,
  ManagedIdentitySourceNames: () => ManagedIdentitySourceNames,
  PromptValue: () => PromptValue2,
  ProtocolMode: () => ProtocolMode,
  PublicClientApplication: () => PublicClientApplication,
  ResponseMode: () => ResponseMode2,
  ServerError: () => ServerError,
  TokenCache: () => TokenCache,
  TokenCacheContext: () => TokenCacheContext,
  internals: () => internals_exports,
  version: () => version2
});

// ../../node_modules/@azure/msal-node/dist/internals.mjs
var internals_exports = {};
__export(internals_exports, {
  Deserializer: () => Deserializer,
  Serializer: () => Serializer
});

// ../../node_modules/@azure/msal-node/dist/cache/serializer/Serializer.mjs
var Serializer = class {
  /**
   * serialize the JSON blob
   * @param data - JSON blob cache
   */
  static serializeJSONBlob(data) {
    return JSON.stringify(data);
  }
  /**
   * Serialize Accounts
   * @param accCache - cache of accounts
   */
  static serializeAccounts(accCache) {
    const accounts = {};
    Object.keys(accCache).map(function(key) {
      const accountEntity = accCache[key];
      accounts[key] = {
        home_account_id: accountEntity.homeAccountId,
        environment: accountEntity.environment,
        realm: accountEntity.realm,
        local_account_id: accountEntity.localAccountId,
        username: accountEntity.username,
        authority_type: accountEntity.authorityType,
        name: accountEntity.name,
        client_info: accountEntity.clientInfo,
        last_modification_time: accountEntity.lastModificationTime,
        last_modification_app: accountEntity.lastModificationApp,
        tenantProfiles: accountEntity.tenantProfiles?.map((tenantProfile) => {
          return JSON.stringify(tenantProfile);
        })
      };
    });
    return accounts;
  }
  /**
   * Serialize IdTokens
   * @param idTCache - cache of ID tokens
   */
  static serializeIdTokens(idTCache) {
    const idTokens = {};
    Object.keys(idTCache).map(function(key) {
      const idTEntity = idTCache[key];
      idTokens[key] = {
        home_account_id: idTEntity.homeAccountId,
        environment: idTEntity.environment,
        credential_type: idTEntity.credentialType,
        client_id: idTEntity.clientId,
        secret: idTEntity.secret,
        realm: idTEntity.realm
      };
    });
    return idTokens;
  }
  /**
   * Serializes AccessTokens
   * @param atCache - cache of access tokens
   */
  static serializeAccessTokens(atCache) {
    const accessTokens = {};
    Object.keys(atCache).map(function(key) {
      const atEntity = atCache[key];
      accessTokens[key] = {
        home_account_id: atEntity.homeAccountId,
        environment: atEntity.environment,
        credential_type: atEntity.credentialType,
        client_id: atEntity.clientId,
        secret: atEntity.secret,
        realm: atEntity.realm,
        target: atEntity.target,
        cached_at: atEntity.cachedAt,
        expires_on: atEntity.expiresOn,
        extended_expires_on: atEntity.extendedExpiresOn,
        refresh_on: atEntity.refreshOn,
        key_id: atEntity.keyId,
        token_type: atEntity.tokenType,
        userAssertionHash: atEntity.userAssertionHash,
        resource: atEntity.resource,
        additionalCacheKeyComponents: atEntity.additionalCacheKeyComponents
      };
    });
    return accessTokens;
  }
  /**
   * Serialize refreshTokens
   * @param rtCache - cache of refresh tokens
   */
  static serializeRefreshTokens(rtCache) {
    const refreshTokens = {};
    Object.keys(rtCache).map(function(key) {
      const rtEntity = rtCache[key];
      refreshTokens[key] = {
        home_account_id: rtEntity.homeAccountId,
        environment: rtEntity.environment,
        credential_type: rtEntity.credentialType,
        client_id: rtEntity.clientId,
        secret: rtEntity.secret,
        family_id: rtEntity.familyId,
        target: rtEntity.target,
        realm: rtEntity.realm
      };
    });
    return refreshTokens;
  }
  /**
   * Serialize amdtCache
   * @param amdtCache - cache of app metadata
   */
  static serializeAppMetadata(amdtCache) {
    const appMetadata = {};
    Object.keys(amdtCache).map(function(key) {
      const amdtEntity = amdtCache[key];
      appMetadata[key] = {
        client_id: amdtEntity.clientId,
        environment: amdtEntity.environment,
        family_id: amdtEntity.familyId
      };
    });
    return appMetadata;
  }
  /**
   * Serialize the cache
   * @param inMemCache - itemised cache read from the JSON
   */
  static serializeAllCache(inMemCache) {
    return {
      Account: this.serializeAccounts(inMemCache.accounts),
      IdToken: this.serializeIdTokens(inMemCache.idTokens),
      AccessToken: this.serializeAccessTokens(inMemCache.accessTokens),
      RefreshToken: this.serializeRefreshTokens(inMemCache.refreshTokens),
      AppMetadata: this.serializeAppMetadata(inMemCache.appMetadata)
    };
  }
};

// ../../node_modules/@azure/msal-common/dist/constants/AADServerParamKeys.mjs
var AADServerParamKeys_exports = {};
__export(AADServerParamKeys_exports, {
  ACCESS_TOKEN: () => ACCESS_TOKEN,
  BROKER_CLIENT_ID: () => BROKER_CLIENT_ID,
  BROKER_REDIRECT_URI: () => BROKER_REDIRECT_URI,
  CCS_HEADER: () => CCS_HEADER,
  CLAIMS: () => CLAIMS,
  CLIENT_ASSERTION: () => CLIENT_ASSERTION,
  CLIENT_ASSERTION_TYPE: () => CLIENT_ASSERTION_TYPE,
  CLIENT_ID: () => CLIENT_ID,
  CLIENT_INFO: () => CLIENT_INFO,
  CLIENT_REQUEST_ID: () => CLIENT_REQUEST_ID,
  CLIENT_SECRET: () => CLIENT_SECRET,
  CLI_DATA: () => CLI_DATA,
  CODE: () => CODE,
  CODE_CHALLENGE: () => CODE_CHALLENGE,
  CODE_CHALLENGE_METHOD: () => CODE_CHALLENGE_METHOD,
  CODE_VERIFIER: () => CODE_VERIFIER,
  DEVICE_CODE: () => DEVICE_CODE,
  DOMAIN_HINT: () => DOMAIN_HINT,
  EAR_JWE_CRYPTO: () => EAR_JWE_CRYPTO,
  EAR_JWK: () => EAR_JWK,
  ERROR: () => ERROR,
  ERROR_DESCRIPTION: () => ERROR_DESCRIPTION,
  EXPIRES_IN: () => EXPIRES_IN,
  FMI_PATH: () => FMI_PATH,
  FOCI: () => FOCI,
  GRANT_TYPE: () => GRANT_TYPE,
  ID_TOKEN: () => ID_TOKEN,
  ID_TOKEN_HINT: () => ID_TOKEN_HINT,
  INSTANCE_AWARE: () => INSTANCE_AWARE,
  LOGIN_HINT: () => LOGIN_HINT,
  LOGOUT_HINT: () => LOGOUT_HINT,
  NATIVE_BROKER: () => NATIVE_BROKER,
  NONCE: () => NONCE,
  OBO_ASSERTION: () => OBO_ASSERTION,
  ON_BEHALF_OF: () => ON_BEHALF_OF,
  POST_LOGOUT_URI: () => POST_LOGOUT_URI,
  PROMPT: () => PROMPT,
  REDIRECT_URI: () => REDIRECT_URI,
  REFRESH_TOKEN: () => REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRES_IN: () => REFRESH_TOKEN_EXPIRES_IN,
  REQUESTED_TOKEN_USE: () => REQUESTED_TOKEN_USE,
  REQ_CNF: () => REQ_CNF,
  RESOURCE: () => RESOURCE,
  RESPONSE_MODE: () => RESPONSE_MODE,
  RESPONSE_TYPE: () => RESPONSE_TYPE,
  RETURN_SPA_CODE: () => RETURN_SPA_CODE,
  SCOPE: () => SCOPE,
  SESSION_STATE: () => SESSION_STATE,
  SID: () => SID,
  STATE: () => STATE,
  TOKEN_TYPE: () => TOKEN_TYPE,
  USERNAME: () => USERNAME,
  USER_FEDERATED_IDENTITY_CREDENTIAL: () => USER_FEDERATED_IDENTITY_CREDENTIAL,
  USER_ID: () => USER_ID,
  X_APP_NAME: () => X_APP_NAME,
  X_APP_VER: () => X_APP_VER,
  X_CLIENT_CPU: () => X_CLIENT_CPU,
  X_CLIENT_CURR_TELEM: () => X_CLIENT_CURR_TELEM,
  X_CLIENT_EXTRA_SKU: () => X_CLIENT_EXTRA_SKU,
  X_CLIENT_LAST_TELEM: () => X_CLIENT_LAST_TELEM,
  X_CLIENT_OS: () => X_CLIENT_OS,
  X_CLIENT_SKU: () => X_CLIENT_SKU,
  X_CLIENT_VER: () => X_CLIENT_VER,
  X_MS_LIB_CAPABILITY: () => X_MS_LIB_CAPABILITY
});
var CLIENT_ID = "client_id";
var REDIRECT_URI = "redirect_uri";
var RESPONSE_TYPE = "response_type";
var RESPONSE_MODE = "response_mode";
var GRANT_TYPE = "grant_type";
var CLAIMS = "claims";
var SCOPE = "scope";
var ERROR = "error";
var ERROR_DESCRIPTION = "error_description";
var ACCESS_TOKEN = "access_token";
var ID_TOKEN = "id_token";
var REFRESH_TOKEN = "refresh_token";
var EXPIRES_IN = "expires_in";
var REFRESH_TOKEN_EXPIRES_IN = "refresh_token_expires_in";
var STATE = "state";
var NONCE = "nonce";
var PROMPT = "prompt";
var SESSION_STATE = "session_state";
var CLIENT_INFO = "client_info";
var CODE = "code";
var CODE_CHALLENGE = "code_challenge";
var CODE_CHALLENGE_METHOD = "code_challenge_method";
var CODE_VERIFIER = "code_verifier";
var CLIENT_REQUEST_ID = "client-request-id";
var X_CLIENT_SKU = "x-client-SKU";
var X_CLIENT_VER = "x-client-VER";
var X_CLIENT_OS = "x-client-OS";
var X_CLIENT_CPU = "x-client-CPU";
var X_CLIENT_CURR_TELEM = "x-client-current-telemetry";
var X_CLIENT_LAST_TELEM = "x-client-last-telemetry";
var X_MS_LIB_CAPABILITY = "x-ms-lib-capability";
var X_APP_NAME = "x-app-name";
var X_APP_VER = "x-app-ver";
var POST_LOGOUT_URI = "post_logout_redirect_uri";
var ID_TOKEN_HINT = "id_token_hint";
var DEVICE_CODE = "device_code";
var CLIENT_SECRET = "client_secret";
var CLIENT_ASSERTION = "client_assertion";
var CLIENT_ASSERTION_TYPE = "client_assertion_type";
var TOKEN_TYPE = "token_type";
var REQ_CNF = "req_cnf";
var OBO_ASSERTION = "assertion";
var REQUESTED_TOKEN_USE = "requested_token_use";
var ON_BEHALF_OF = "on_behalf_of";
var FOCI = "foci";
var CCS_HEADER = "X-AnchorMailbox";
var RETURN_SPA_CODE = "return_spa_code";
var NATIVE_BROKER = "nativebroker";
var LOGOUT_HINT = "logout_hint";
var SID = "sid";
var LOGIN_HINT = "login_hint";
var DOMAIN_HINT = "domain_hint";
var X_CLIENT_EXTRA_SKU = "x-client-xtra-sku";
var BROKER_CLIENT_ID = "brk_client_id";
var BROKER_REDIRECT_URI = "brk_redirect_uri";
var INSTANCE_AWARE = "instance_aware";
var EAR_JWK = "ear_jwk";
var EAR_JWE_CRYPTO = "ear_jwe_crypto";
var RESOURCE = "resource";
var CLI_DATA = "clidata";
var USER_FEDERATED_IDENTITY_CREDENTIAL = "user_federated_identity_credential";
var USERNAME = "username";
var USER_ID = "user_id";
var FMI_PATH = "fmi_path";

// ../../node_modules/@azure/msal-common/dist/cache/utils/AccountEntityUtils.mjs
var AccountEntityUtils_exports = {};
__export(AccountEntityUtils_exports, {
  createAccountEntity: () => createAccountEntity,
  createAccountEntityFromAccountInfo: () => createAccountEntityFromAccountInfo,
  generateAccountId: () => generateAccountId,
  generateHomeAccountId: () => generateHomeAccountId,
  getAccountInfo: () => getAccountInfo,
  isAccountEntity: () => isAccountEntity,
  isSingleTenant: () => isSingleTenant
});

// ../../node_modules/@azure/msal-common/dist/utils/Constants.mjs
var Constants_exports = {};
__export(Constants_exports, {
  AADAuthority: () => AADAuthority,
  AAD_INSTANCE_DISCOVERY_ENDPT: () => AAD_INSTANCE_DISCOVERY_ENDPT,
  AAD_TENANT_DOMAIN_SUFFIX: () => AAD_TENANT_DOMAIN_SUFFIX,
  ADFS: () => ADFS,
  APP_METADATA: () => APP_METADATA,
  AUTHORITY_METADATA_CACHE_KEY: () => AUTHORITY_METADATA_CACHE_KEY,
  AUTHORITY_METADATA_REFRESH_TIME_SECONDS: () => AUTHORITY_METADATA_REFRESH_TIME_SECONDS,
  AUTHORIZATION_PENDING: () => AUTHORIZATION_PENDING,
  AZURE_REGION_AUTO_DISCOVER_FLAG: () => AZURE_REGION_AUTO_DISCOVER_FLAG,
  AuthenticationScheme: () => AuthenticationScheme,
  AuthorityMetadataSource: () => AuthorityMetadataSource,
  CACHE_ACCOUNT_TYPE_ADFS: () => CACHE_ACCOUNT_TYPE_ADFS,
  CACHE_ACCOUNT_TYPE_GENERIC: () => CACHE_ACCOUNT_TYPE_GENERIC,
  CACHE_ACCOUNT_TYPE_MSAV1: () => CACHE_ACCOUNT_TYPE_MSAV1,
  CACHE_ACCOUNT_TYPE_MSSTS: () => CACHE_ACCOUNT_TYPE_MSSTS,
  CACHE_KEY_SEPARATOR: () => CACHE_KEY_SEPARATOR,
  CIAM_AUTH_URL: () => CIAM_AUTH_URL,
  CLIENT_INFO: () => CLIENT_INFO2,
  CLIENT_INFO_SEPARATOR: () => CLIENT_INFO_SEPARATOR,
  CLIENT_MISMATCH_ERROR: () => CLIENT_MISMATCH_ERROR,
  CODE_GRANT_TYPE: () => CODE_GRANT_TYPE,
  CONSUMER_UTID: () => CONSUMER_UTID,
  CacheOutcome: () => CacheOutcome,
  CacheType: () => CacheType,
  ClaimsRequestKeys: () => ClaimsRequestKeys,
  CodeChallengeMethodValues: () => CodeChallengeMethodValues,
  CredentialType: () => CredentialType,
  DEFAULT_AUTHORITY: () => DEFAULT_AUTHORITY,
  DEFAULT_AUTHORITY_HOST: () => DEFAULT_AUTHORITY_HOST,
  DEFAULT_COMMON_TENANT: () => DEFAULT_COMMON_TENANT,
  DEFAULT_MAX_THROTTLE_TIME_SECONDS: () => DEFAULT_MAX_THROTTLE_TIME_SECONDS,
  DEFAULT_THROTTLE_TIME_SECONDS: () => DEFAULT_THROTTLE_TIME_SECONDS,
  DEFAULT_TOKEN_RENEWAL_OFFSET_SEC: () => DEFAULT_TOKEN_RENEWAL_OFFSET_SEC,
  DSTS: () => DSTS,
  EMAIL_SCOPE: () => EMAIL_SCOPE,
  EncodingTypes: () => EncodingTypes,
  FORWARD_SLASH: () => FORWARD_SLASH,
  GrantType: () => GrantType,
  HTTP_BAD_REQUEST: () => HTTP_BAD_REQUEST,
  HTTP_CLIENT_ERROR: () => HTTP_CLIENT_ERROR,
  HTTP_CLIENT_ERROR_RANGE_END: () => HTTP_CLIENT_ERROR_RANGE_END,
  HTTP_CLIENT_ERROR_RANGE_START: () => HTTP_CLIENT_ERROR_RANGE_START,
  HTTP_GATEWAY_TIMEOUT: () => HTTP_GATEWAY_TIMEOUT,
  HTTP_GONE: () => HTTP_GONE,
  HTTP_MULTI_SIDED_ERROR: () => HTTP_MULTI_SIDED_ERROR,
  HTTP_NOT_FOUND: () => HTTP_NOT_FOUND,
  HTTP_REDIRECT: () => HTTP_REDIRECT,
  HTTP_REQUEST_TIMEOUT: () => HTTP_REQUEST_TIMEOUT,
  HTTP_SERVER_ERROR: () => HTTP_SERVER_ERROR,
  HTTP_SERVER_ERROR_RANGE_END: () => HTTP_SERVER_ERROR_RANGE_END,
  HTTP_SERVER_ERROR_RANGE_START: () => HTTP_SERVER_ERROR_RANGE_START,
  HTTP_SERVICE_UNAVAILABLE: () => HTTP_SERVICE_UNAVAILABLE,
  HTTP_SUCCESS: () => HTTP_SUCCESS,
  HTTP_SUCCESS_RANGE_END: () => HTTP_SUCCESS_RANGE_END,
  HTTP_SUCCESS_RANGE_START: () => HTTP_SUCCESS_RANGE_START,
  HTTP_TOO_MANY_REQUESTS: () => HTTP_TOO_MANY_REQUESTS,
  HTTP_UNAUTHORIZED: () => HTTP_UNAUTHORIZED,
  HeaderNames: () => HeaderNames,
  HttpMethod: () => HttpMethod,
  IMDS_ENDPOINT: () => IMDS_ENDPOINT,
  IMDS_TIMEOUT: () => IMDS_TIMEOUT,
  IMDS_VERSION: () => IMDS_VERSION,
  INVALID_GRANT_ERROR: () => INVALID_GRANT_ERROR,
  INVALID_INSTANCE: () => INVALID_INSTANCE,
  JsonWebTokenTypes: () => JsonWebTokenTypes,
  KNOWN_PUBLIC_CLOUDS: () => KNOWN_PUBLIC_CLOUDS,
  NOT_APPLICABLE: () => NOT_APPLICABLE,
  NOT_AVAILABLE: () => NOT_AVAILABLE,
  OAuthResponseType: () => OAuthResponseType,
  OFFLINE_ACCESS_SCOPE: () => OFFLINE_ACCESS_SCOPE,
  OIDC_DEFAULT_SCOPES: () => OIDC_DEFAULT_SCOPES,
  OIDC_SCOPES: () => OIDC_SCOPES,
  ONE_DAY_IN_MS: () => ONE_DAY_IN_MS,
  OPENID_SCOPE: () => OPENID_SCOPE,
  PROFILE_SCOPE: () => PROFILE_SCOPE,
  PasswordGrantConstants: () => PasswordGrantConstants,
  PersistentCacheKeys: () => PersistentCacheKeys,
  PromptValue: () => PromptValue,
  REGIONAL_AUTH_PUBLIC_CLOUD_SUFFIX: () => REGIONAL_AUTH_PUBLIC_CLOUD_SUFFIX,
  RESOURCE_DELIM: () => RESOURCE_DELIM,
  RegionDiscoveryOutcomes: () => RegionDiscoveryOutcomes,
  RegionDiscoverySources: () => RegionDiscoverySources,
  ResponseMode: () => ResponseMode,
  S256_CODE_CHALLENGE_METHOD: () => S256_CODE_CHALLENGE_METHOD,
  SERVER_TELEM_CACHE_KEY: () => SERVER_TELEM_CACHE_KEY,
  SERVER_TELEM_CATEGORY_SEPARATOR: () => SERVER_TELEM_CATEGORY_SEPARATOR,
  SERVER_TELEM_MAX_CACHED_ERRORS: () => SERVER_TELEM_MAX_CACHED_ERRORS,
  SERVER_TELEM_MAX_CUR_HEADER_BYTES: () => SERVER_TELEM_MAX_CUR_HEADER_BYTES,
  SERVER_TELEM_MAX_LAST_HEADER_BYTES: () => SERVER_TELEM_MAX_LAST_HEADER_BYTES,
  SERVER_TELEM_OVERFLOW_FALSE: () => SERVER_TELEM_OVERFLOW_FALSE,
  SERVER_TELEM_OVERFLOW_TRUE: () => SERVER_TELEM_OVERFLOW_TRUE,
  SERVER_TELEM_SCHEMA_VERSION: () => SERVER_TELEM_SCHEMA_VERSION,
  SERVER_TELEM_UNKNOWN_ERROR: () => SERVER_TELEM_UNKNOWN_ERROR,
  SERVER_TELEM_VALUE_SEPARATOR: () => SERVER_TELEM_VALUE_SEPARATOR,
  SHR_NONCE_VALIDITY: () => SHR_NONCE_VALIDITY,
  SKU: () => SKU,
  THE_FAMILY_ID: () => THE_FAMILY_ID,
  THROTTLING_PREFIX: () => THROTTLING_PREFIX,
  URL_FORM_CONTENT_TYPE: () => URL_FORM_CONTENT_TYPE,
  X_MS_LIB_CAPABILITY_VALUE: () => X_MS_LIB_CAPABILITY_VALUE
});
var SKU = "msal.js.common";
var DEFAULT_AUTHORITY = "https://login.microsoftonline.com/common/";
var DEFAULT_AUTHORITY_HOST = "login.microsoftonline.com";
var DEFAULT_COMMON_TENANT = "common";
var ADFS = "adfs";
var DSTS = "dstsv2";
var AAD_INSTANCE_DISCOVERY_ENDPT = `${DEFAULT_AUTHORITY}discovery/instance?api-version=1.1&authorization_endpoint=`;
var CIAM_AUTH_URL = ".ciamlogin.com";
var AAD_TENANT_DOMAIN_SUFFIX = ".onmicrosoft.com";
var RESOURCE_DELIM = "|";
var CONSUMER_UTID = "9188040d-6c67-4c5b-b112-36a304b66dad";
var OPENID_SCOPE = "openid";
var PROFILE_SCOPE = "profile";
var OFFLINE_ACCESS_SCOPE = "offline_access";
var EMAIL_SCOPE = "email";
var CODE_GRANT_TYPE = "authorization_code";
var S256_CODE_CHALLENGE_METHOD = "S256";
var URL_FORM_CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf-8";
var AUTHORIZATION_PENDING = "authorization_pending";
var NOT_APPLICABLE = "N/A";
var NOT_AVAILABLE = "Not Available";
var FORWARD_SLASH = "/";
var IMDS_ENDPOINT = "http://169.254.169.254/metadata/instance/compute";
var IMDS_VERSION = "2021-02-01";
var IMDS_TIMEOUT = 2e3;
var AZURE_REGION_AUTO_DISCOVER_FLAG = "TryAutoDetect";
var REGIONAL_AUTH_PUBLIC_CLOUD_SUFFIX = "login.microsoft.com";
var KNOWN_PUBLIC_CLOUDS = [
  "login.microsoftonline.com",
  "login.windows.net",
  "login.microsoft.com",
  "sts.windows.net"
];
var SHR_NONCE_VALIDITY = 240;
var INVALID_INSTANCE = "invalid_instance";
var HTTP_SUCCESS = 200;
var HTTP_SUCCESS_RANGE_START = 200;
var HTTP_SUCCESS_RANGE_END = 299;
var HTTP_REDIRECT = 302;
var HTTP_CLIENT_ERROR = 400;
var HTTP_CLIENT_ERROR_RANGE_START = 400;
var HTTP_BAD_REQUEST = 400;
var HTTP_UNAUTHORIZED = 401;
var HTTP_NOT_FOUND = 404;
var HTTP_REQUEST_TIMEOUT = 408;
var HTTP_GONE = 410;
var HTTP_TOO_MANY_REQUESTS = 429;
var HTTP_CLIENT_ERROR_RANGE_END = 499;
var HTTP_SERVER_ERROR = 500;
var HTTP_SERVER_ERROR_RANGE_START = 500;
var HTTP_SERVICE_UNAVAILABLE = 503;
var HTTP_GATEWAY_TIMEOUT = 504;
var HTTP_SERVER_ERROR_RANGE_END = 599;
var HTTP_MULTI_SIDED_ERROR = 600;
var HttpMethod = {
  GET: "GET",
  POST: "POST"
};
var OIDC_DEFAULT_SCOPES = [
  OPENID_SCOPE,
  PROFILE_SCOPE,
  OFFLINE_ACCESS_SCOPE
];
var OIDC_SCOPES = [...OIDC_DEFAULT_SCOPES, EMAIL_SCOPE];
var HeaderNames = {
  CONTENT_TYPE: "Content-Type",
  CONTENT_LENGTH: "Content-Length",
  RETRY_AFTER: "Retry-After",
  CCS_HEADER: "X-AnchorMailbox",
  WWWAuthenticate: "WWW-Authenticate",
  AuthenticationInfo: "Authentication-Info",
  X_MS_REQUEST_ID: "x-ms-request-id",
  X_MS_HTTP_VERSION: "x-ms-httpver"
};
var PersistentCacheKeys = {
  ACTIVE_ACCOUNT_FILTERS: "active-account-filters"
  // new cache entry for active_account for a more robust version for browser
};
var AADAuthority = {
  COMMON: "common",
  ORGANIZATIONS: "organizations",
  CONSUMERS: "consumers"
};
var ClaimsRequestKeys = {
  ACCESS_TOKEN: "access_token",
  XMS_CC: "xms_cc",
  ID_TOKEN: "id_token",
  SIGNIN_STATE: "signin_state",
  LOGIN_HINT: "login_hint"
};
var PromptValue = {
  LOGIN: "login",
  SELECT_ACCOUNT: "select_account",
  CONSENT: "consent",
  NONE: "none",
  CREATE: "create",
  NO_SESSION: "no_session"
};
var CodeChallengeMethodValues = {
  PLAIN: "plain",
  S256: "S256"
};
var OAuthResponseType = {
  CODE: "code",
  IDTOKEN_TOKEN: "id_token token",
  IDTOKEN_TOKEN_REFRESHTOKEN: "id_token token refresh_token"
};
var ResponseMode = {
  QUERY: "query",
  FRAGMENT: "fragment",
  FORM_POST: "form_post"
};
var GrantType = {
  IMPLICIT_GRANT: "implicit",
  AUTHORIZATION_CODE_GRANT: "authorization_code",
  CLIENT_CREDENTIALS_GRANT: "client_credentials",
  RESOURCE_OWNER_PASSWORD_GRANT: "password",
  REFRESH_TOKEN_GRANT: "refresh_token",
  DEVICE_CODE_GRANT: "device_code",
  JWT_BEARER: "urn:ietf:params:oauth:grant-type:jwt-bearer",
  USER_FIC: "user_fic"
};
var CACHE_ACCOUNT_TYPE_MSSTS = "MSSTS";
var CACHE_ACCOUNT_TYPE_ADFS = "ADFS";
var CACHE_ACCOUNT_TYPE_MSAV1 = "MSA";
var CACHE_ACCOUNT_TYPE_GENERIC = "Generic";
var CACHE_KEY_SEPARATOR = "-";
var CLIENT_INFO_SEPARATOR = ".";
var CredentialType = {
  ID_TOKEN: "IdToken",
  ACCESS_TOKEN: "AccessToken",
  ACCESS_TOKEN_WITH_AUTH_SCHEME: "AccessToken_With_AuthScheme",
  REFRESH_TOKEN: "RefreshToken"
};
var CacheType = {
  ADFS: 1001,
  MSA: 1002,
  MSSTS: 1003,
  GENERIC: 1004,
  ACCESS_TOKEN: 2001,
  REFRESH_TOKEN: 2002,
  ID_TOKEN: 2003,
  APP_METADATA: 3001,
  UNDEFINED: 9999
};
var APP_METADATA = "appmetadata";
var CLIENT_INFO2 = "client_info";
var THE_FAMILY_ID = "1";
var AUTHORITY_METADATA_CACHE_KEY = "authority-metadata";
var AUTHORITY_METADATA_REFRESH_TIME_SECONDS = 3600 * 24;
var AuthorityMetadataSource = {
  CONFIG: "config",
  CACHE: "cache",
  NETWORK: "network",
  HARDCODED_VALUES: "hardcoded_values"
};
var SERVER_TELEM_SCHEMA_VERSION = 5;
var SERVER_TELEM_MAX_CUR_HEADER_BYTES = 80;
var SERVER_TELEM_MAX_LAST_HEADER_BYTES = 330;
var SERVER_TELEM_MAX_CACHED_ERRORS = 50;
var SERVER_TELEM_CACHE_KEY = "server-telemetry";
var SERVER_TELEM_CATEGORY_SEPARATOR = "|";
var SERVER_TELEM_VALUE_SEPARATOR = ",";
var SERVER_TELEM_OVERFLOW_TRUE = "1";
var SERVER_TELEM_OVERFLOW_FALSE = "0";
var SERVER_TELEM_UNKNOWN_ERROR = "unknown_error";
var AuthenticationScheme = {
  BEARER: "Bearer",
  POP: "pop",
  SSH: "ssh-cert"
};
var DEFAULT_THROTTLE_TIME_SECONDS = 60;
var DEFAULT_MAX_THROTTLE_TIME_SECONDS = 3600;
var THROTTLING_PREFIX = "throttling";
var X_MS_LIB_CAPABILITY_VALUE = "retry-after, h429";
var INVALID_GRANT_ERROR = "invalid_grant";
var CLIENT_MISMATCH_ERROR = "client_mismatch";
var PasswordGrantConstants = {
  username: "username",
  password: "password"
};
var RegionDiscoverySources = {
  FAILED_AUTO_DETECTION: "1",
  INTERNAL_CACHE: "2",
  ENVIRONMENT_VARIABLE: "3",
  IMDS: "4"
};
var RegionDiscoveryOutcomes = {
  CONFIGURED_MATCHES_DETECTED: "1",
  CONFIGURED_NO_AUTO_DETECTION: "2",
  CONFIGURED_NOT_DETECTED: "3",
  AUTO_DETECTION_REQUESTED_SUCCESSFUL: "4",
  AUTO_DETECTION_REQUESTED_FAILED: "5"
};
var CacheOutcome = {
  // When a token is found in the cache or the cache is not supposed to be hit when making the request
  NOT_APPLICABLE: "0",
  // When the token request goes to the identity provider because force_refresh was set to true. Also occurs if claims were requested
  FORCE_REFRESH_OR_CLAIMS: "1",
  // When the token request goes to the identity provider because no cached access token exists
  NO_CACHED_ACCESS_TOKEN: "2",
  // When the token request goes to the identity provider because cached access token expired
  CACHED_ACCESS_TOKEN_EXPIRED: "3",
  // When the token request goes to the identity provider because refresh_in was used and the existing token needs to be refreshed
  PROACTIVELY_REFRESHED: "4"
};
var JsonWebTokenTypes = {
  Jwt: "JWT",
  Jwk: "JWK",
  Pop: "pop"
};
var ONE_DAY_IN_MS = 864e5;
var DEFAULT_TOKEN_RENEWAL_OFFSET_SEC = 300;
var EncodingTypes = {
  BASE64: "base64",
  HEX: "hex",
  UTF8: "utf-8"
};

// ../../node_modules/@azure/msal-common/dist/error/AuthError.mjs
function getDefaultErrorMessage(code) {
  return `See https://aka.ms/msal.js.errors#${code} for details`;
}
var AuthError2 = class _AuthError extends Error {
  constructor(errorCode, correlationId, errorMessage, suberror) {
    const message = errorMessage || (errorCode ? getDefaultErrorMessage(errorCode) : "");
    const errorString = message ? `${errorCode}: ${message}` : errorCode;
    super(errorString);
    Object.setPrototypeOf(this, _AuthError.prototype);
    this.errorCode = errorCode || "";
    this.errorMessage = message || "";
    this.subError = suberror || "";
    this.correlationId = correlationId;
    this.name = "AuthError";
  }
};
function createAuthError(code, correlationId, additionalMessage) {
  return new AuthError2(code, correlationId, additionalMessage || getDefaultErrorMessage(code));
}

// ../../node_modules/@azure/msal-common/dist/error/ClientAuthError.mjs
var ClientAuthError = class _ClientAuthError extends AuthError2 {
  constructor(errorCode, correlationId, additionalMessage) {
    super(errorCode, correlationId, additionalMessage);
    this.name = "ClientAuthError";
    Object.setPrototypeOf(this, _ClientAuthError.prototype);
  }
};
function createClientAuthError(errorCode, correlationId, additionalMessage) {
  return new ClientAuthError(errorCode, correlationId, additionalMessage);
}

// ../../node_modules/@azure/msal-common/dist/error/ClientAuthErrorCodes.mjs
var ClientAuthErrorCodes_exports = {};
__export(ClientAuthErrorCodes_exports, {
  authorizationCodeMissingFromServerResponse: () => authorizationCodeMissingFromServerResponse,
  bindingKeyNotRemoved: () => bindingKeyNotRemoved,
  cannotAppendScopeSet: () => cannotAppendScopeSet,
  cannotRemoveEmptyScope: () => cannotRemoveEmptyScope,
  clientInfoDecodingError: () => clientInfoDecodingError,
  clientInfoEmptyError: () => clientInfoEmptyError,
  emptyInputScopeSet: () => emptyInputScopeSet,
  endSessionEndpointNotSupported: () => endSessionEndpointNotSupported,
  endpointResolutionError: () => endpointResolutionError,
  hashNotDeserialized: () => hashNotDeserialized,
  invalidCacheEnvironment: () => invalidCacheEnvironment,
  invalidCacheRecord: () => invalidCacheRecord,
  invalidState: () => invalidState,
  keyIdMissing: () => keyIdMissing,
  methodNotImplemented: () => methodNotImplemented,
  misplacedResourceParam: () => misplacedResourceParam,
  multipleMatchingAppMetadata: () => multipleMatchingAppMetadata,
  multipleMatchingTokens: () => multipleMatchingTokens,
  nestedAppAuthBridgeDisabled: () => nestedAppAuthBridgeDisabled,
  networkError: () => networkError,
  noAccountFound: () => noAccountFound,
  noAccountInSilentRequest: () => noAccountInSilentRequest,
  noCryptoObject: () => noCryptoObject,
  noNetworkConnectivity: () => noNetworkConnectivity,
  nonceMismatch: () => nonceMismatch,
  nullOrEmptyToken: () => nullOrEmptyToken,
  openIdConfigError: () => openIdConfigError,
  platformBrokerError: () => platformBrokerError,
  requestCannotBeMade: () => requestCannotBeMade,
  resourceParameterRequired: () => resourceParameterRequired,
  stateMismatch: () => stateMismatch,
  stateNotFound: () => stateNotFound,
  tokenClaimsCnfRequiredForSignedJwt: () => tokenClaimsCnfRequiredForSignedJwt,
  tokenParsingError: () => tokenParsingError,
  tokenRefreshRequired: () => tokenRefreshRequired,
  unexpectedCredentialType: () => unexpectedCredentialType,
  userCanceled: () => userCanceled
});
var clientInfoDecodingError = "client_info_decoding_error";
var clientInfoEmptyError = "client_info_empty_error";
var tokenParsingError = "token_parsing_error";
var nullOrEmptyToken = "null_or_empty_token";
var endpointResolutionError = "endpoints_resolution_error";
var networkError = "network_error";
var openIdConfigError = "openid_config_error";
var hashNotDeserialized = "hash_not_deserialized";
var invalidState = "invalid_state";
var stateMismatch = "state_mismatch";
var stateNotFound = "state_not_found";
var nonceMismatch = "nonce_mismatch";
var multipleMatchingTokens = "multiple_matching_tokens";
var multipleMatchingAppMetadata = "multiple_matching_appMetadata";
var requestCannotBeMade = "request_cannot_be_made";
var cannotRemoveEmptyScope = "cannot_remove_empty_scope";
var cannotAppendScopeSet = "cannot_append_scopeset";
var emptyInputScopeSet = "empty_input_scopeset";
var noAccountInSilentRequest = "no_account_in_silent_request";
var invalidCacheRecord = "invalid_cache_record";
var invalidCacheEnvironment = "invalid_cache_environment";
var noAccountFound = "no_account_found";
var noCryptoObject = "no_crypto_object";
var unexpectedCredentialType = "unexpected_credential_type";
var tokenRefreshRequired = "token_refresh_required";
var tokenClaimsCnfRequiredForSignedJwt = "token_claims_cnf_required_for_signedjwt";
var authorizationCodeMissingFromServerResponse = "authorization_code_missing_from_server_response";
var bindingKeyNotRemoved = "binding_key_not_removed";
var endSessionEndpointNotSupported = "end_session_endpoint_not_supported";
var keyIdMissing = "key_id_missing";
var noNetworkConnectivity = "no_network_connectivity";
var userCanceled = "user_canceled";
var methodNotImplemented = "method_not_implemented";
var nestedAppAuthBridgeDisabled = "nested_app_auth_bridge_disabled";
var platformBrokerError = "platform_broker_error";
var resourceParameterRequired = "resource_parameter_required";
var misplacedResourceParam = "misplaced_resource_parameter";

// ../../node_modules/@azure/msal-common/dist/account/ClientInfo.mjs
function buildClientInfo(rawClientInfo, base64Decode) {
  if (!rawClientInfo) {
    throw createClientAuthError(clientInfoEmptyError, "");
  }
  try {
    const decodedClientInfo = base64Decode(rawClientInfo);
    return JSON.parse(decodedClientInfo);
  } catch (e) {
    throw createClientAuthError(clientInfoDecodingError, "");
  }
}
function buildClientInfoFromHomeAccountId(homeAccountId) {
  if (!homeAccountId) {
    throw createClientAuthError(clientInfoDecodingError, "");
  }
  const clientInfoParts = homeAccountId.split(CLIENT_INFO_SEPARATOR, 2);
  return {
    uid: clientInfoParts[0],
    utid: clientInfoParts.length < 2 ? "" : clientInfoParts[1]
  };
}

// ../../node_modules/@azure/msal-common/dist/account/AuthToken.mjs
var AuthToken_exports = {};
__export(AuthToken_exports, {
  extractTokenClaims: () => extractTokenClaims,
  getJWSPayload: () => getJWSPayload,
  isKmsi: () => isKmsi
});
function extractTokenClaims(encodedToken, base64Decode, correlationId) {
  const jswPayload = getJWSPayload(encodedToken, correlationId);
  try {
    const base64Decoded = base64Decode(jswPayload);
    return JSON.parse(base64Decoded);
  } catch (err) {
    throw createClientAuthError(tokenParsingError, correlationId);
  }
}
function isKmsi(idTokenClaims) {
  if (!idTokenClaims.signin_state) {
    return false;
  }
  const kmsiClaims = ["kmsi", "dvc_dmjd"];
  return idTokenClaims.signin_state.some((value) => kmsiClaims.includes(value.trim().toLowerCase()));
}
function getJWSPayload(authToken, correlationId) {
  if (!authToken) {
    throw createClientAuthError(nullOrEmptyToken, correlationId);
  }
  const tokenPartsRegex = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/;
  const matches = tokenPartsRegex.exec(authToken);
  if (!matches || matches.length < 4) {
    throw createClientAuthError(tokenParsingError, correlationId);
  }
  return matches[2];
}

// ../../node_modules/@azure/msal-common/dist/account/AccountInfo.mjs
function tenantIdMatchesHomeTenant(tenantId, homeAccountId) {
  return !!tenantId && !!homeAccountId && tenantId === homeAccountId.split(".")[1];
}
function buildTenantProfile(homeAccountId, localAccountId, tenantId, nativeAccountId, idTokenClaims) {
  if (idTokenClaims) {
    const { oid, sub, tid, name: name3, tfp, acr, preferred_username, upn, login_hint } = idTokenClaims;
    const tenantId2 = tid || tfp || acr || "";
    return {
      tenantId: tenantId2,
      localAccountId: oid || sub || "",
      name: name3,
      username: preferred_username || upn || "",
      loginHint: login_hint,
      isHomeTenant: tenantIdMatchesHomeTenant(tenantId2, homeAccountId),
      upn,
      ...nativeAccountId && { nativeAccountId }
    };
  } else {
    return {
      tenantId,
      localAccountId,
      username: "",
      isHomeTenant: tenantIdMatchesHomeTenant(tenantId, homeAccountId),
      ...nativeAccountId && { nativeAccountId }
    };
  }
}
function updateAccountTenantProfileData(baseAccountInfo, tenantProfile, idTokenClaims, idTokenSecret) {
  let updatedAccountInfo = baseAccountInfo;
  if (tenantProfile) {
    const { isHomeTenant, ...tenantProfileOverride } = tenantProfile;
    updatedAccountInfo = { ...baseAccountInfo, ...tenantProfileOverride };
  }
  if (idTokenClaims) {
    const { isHomeTenant, ...claimsSourcedTenantProfile } = buildTenantProfile(baseAccountInfo.homeAccountId, baseAccountInfo.localAccountId, baseAccountInfo.tenantId, updatedAccountInfo.nativeAccountId, idTokenClaims);
    updatedAccountInfo = {
      ...updatedAccountInfo,
      ...claimsSourcedTenantProfile,
      idTokenClaims,
      idToken: idTokenSecret,
      kmsi: isKmsi(idTokenClaims)
    };
    return updatedAccountInfo;
  }
  return updatedAccountInfo;
}

// ../../node_modules/@azure/msal-common/dist/authority/AuthorityType.mjs
var AuthorityType = {
  Default: 0,
  Adfs: 1,
  Dsts: 2,
  Ciam: 3
};

// ../../node_modules/@azure/msal-common/dist/account/TokenClaims.mjs
function getTenantIdFromIdTokenClaims(idTokenClaims) {
  if (idTokenClaims) {
    const tenantId = idTokenClaims.tid || idTokenClaims.tfp || idTokenClaims.acr;
    return tenantId || null;
  }
  return null;
}

// ../../node_modules/@azure/msal-common/dist/authority/ProtocolMode.mjs
var ProtocolMode = {
  /**
   * Auth Code + PKCE with Entra ID (formerly AAD) specific optimizations and features
   */
  AAD: "AAD",
  /**
   * Auth Code + PKCE without Entra ID specific optimizations and features. For use only with non-Microsoft owned authorities.
   * Support is limited for this mode.
   */
  OIDC: "OIDC",
  /**
   * Encrypted Authorize Response (EAR) with Entra ID specific optimizations and features
   */
  EAR: "EAR"
};

// ../../node_modules/@azure/msal-common/dist/cache/utils/AccountEntityUtils.mjs
function generateAccountId(accountEntity) {
  const accountId = [
    accountEntity.homeAccountId,
    accountEntity.environment
  ];
  return accountId.join(CACHE_KEY_SEPARATOR).toLowerCase();
}
function getAccountInfo(accountEntity) {
  const tenantProfiles = accountEntity.tenantProfiles || [];
  if (tenantProfiles.length === 0 && accountEntity.realm && accountEntity.localAccountId) {
    tenantProfiles.push(buildTenantProfile(accountEntity.homeAccountId, accountEntity.localAccountId, accountEntity.realm, accountEntity.nativeAccountId));
  }
  const homeTenantProfile = tenantProfiles.find((tp) => tp.tenantId === accountEntity.realm);
  const nativeAccountId = homeTenantProfile?.nativeAccountId || accountEntity.nativeAccountId;
  return {
    homeAccountId: accountEntity.homeAccountId,
    environment: accountEntity.environment,
    tenantId: accountEntity.realm,
    username: accountEntity.username,
    localAccountId: accountEntity.localAccountId,
    loginHint: accountEntity.loginHint,
    name: accountEntity.name,
    nativeAccountId,
    authorityType: accountEntity.authorityType,
    // Deserialize tenant profiles array into a Map
    tenantProfiles: new Map(tenantProfiles.map((tenantProfile) => {
      return [tenantProfile.tenantId, tenantProfile];
    })),
    dataBoundary: accountEntity.dataBoundary
  };
}
function isSingleTenant(accountEntity) {
  return !accountEntity.tenantProfiles;
}
function createAccountEntity(accountDetails, authority, correlationId, base64Decode) {
  let authorityType;
  if (authority.authorityType === AuthorityType.Adfs) {
    authorityType = CACHE_ACCOUNT_TYPE_ADFS;
  } else if (authority.protocolMode === ProtocolMode.OIDC) {
    authorityType = CACHE_ACCOUNT_TYPE_GENERIC;
  } else {
    authorityType = CACHE_ACCOUNT_TYPE_MSSTS;
  }
  let clientInfo;
  let dataBoundary;
  if (accountDetails.clientInfo && base64Decode) {
    clientInfo = buildClientInfo(accountDetails.clientInfo, base64Decode);
    if (clientInfo.xms_tdbr) {
      dataBoundary = clientInfo.xms_tdbr === "EU" ? "EU" : "None";
    }
  }
  const env = accountDetails.environment || authority && authority.getPreferredCache();
  if (!env) {
    throw createClientAuthError(invalidCacheEnvironment, correlationId);
  }
  const preferredUsername = accountDetails.idTokenClaims?.preferred_username || accountDetails.idTokenClaims?.upn;
  const email = accountDetails.idTokenClaims?.emails ? accountDetails.idTokenClaims.emails[0] : null;
  const username = preferredUsername || email || "";
  const loginHint = accountDetails.idTokenClaims?.login_hint;
  const realm = clientInfo?.utid || getTenantIdFromIdTokenClaims(accountDetails.idTokenClaims) || "";
  const localAccountId = clientInfo?.uid || accountDetails.idTokenClaims?.oid || accountDetails.idTokenClaims?.sub || "";
  let tenantProfiles;
  if (accountDetails.tenantProfiles) {
    tenantProfiles = accountDetails.tenantProfiles;
  } else {
    const tenantProfile = buildTenantProfile(accountDetails.homeAccountId, localAccountId, realm, accountDetails.nativeAccountId, accountDetails.idTokenClaims);
    tenantProfiles = [tenantProfile];
  }
  return {
    homeAccountId: accountDetails.homeAccountId,
    environment: env,
    realm,
    localAccountId,
    username,
    authorityType,
    loginHint,
    clientInfo: accountDetails.clientInfo,
    name: accountDetails.idTokenClaims?.name || "",
    lastModificationTime: void 0,
    lastModificationApp: void 0,
    cloudGraphHostName: accountDetails.cloudGraphHostName,
    msGraphHost: accountDetails.msGraphHost,
    nativeAccountId: accountDetails.nativeAccountId,
    tenantProfiles,
    dataBoundary
  };
}
function createAccountEntityFromAccountInfo(accountInfo, cloudGraphHostName, msGraphHost) {
  const tenantProfiles = Array.from(accountInfo.tenantProfiles?.values() || []);
  if (tenantProfiles.length === 0 && accountInfo.tenantId && accountInfo.localAccountId) {
    tenantProfiles.push(buildTenantProfile(accountInfo.homeAccountId, accountInfo.localAccountId, accountInfo.tenantId, accountInfo.nativeAccountId, accountInfo.idTokenClaims));
  } else if (accountInfo.nativeAccountId) {
    const matchingProfile = tenantProfiles.find((tp) => tp.tenantId === accountInfo.tenantId);
    if (matchingProfile && !matchingProfile.nativeAccountId) {
      matchingProfile.nativeAccountId = accountInfo.nativeAccountId;
    }
  }
  return {
    authorityType: accountInfo.authorityType || CACHE_ACCOUNT_TYPE_GENERIC,
    homeAccountId: accountInfo.homeAccountId,
    localAccountId: accountInfo.localAccountId,
    nativeAccountId: accountInfo.nativeAccountId,
    realm: accountInfo.tenantId,
    environment: accountInfo.environment,
    username: accountInfo.username,
    loginHint: accountInfo.loginHint,
    name: accountInfo.name,
    cloudGraphHostName,
    msGraphHost,
    tenantProfiles,
    dataBoundary: accountInfo.dataBoundary
  };
}
function generateHomeAccountId(serverClientInfo, authType, logger27, cryptoObj, correlationId, idTokenClaims) {
  if (!(authType === AuthorityType.Adfs || authType === AuthorityType.Dsts)) {
    if (serverClientInfo) {
      try {
        const clientInfo = buildClientInfo(serverClientInfo, cryptoObj.base64Decode);
        if (clientInfo.uid && clientInfo.utid) {
          return `${clientInfo.uid}.${clientInfo.utid}`;
        }
      } catch (e) {
      }
    }
    logger27.warning("No client info in response", correlationId);
  }
  return idTokenClaims?.sub || "";
}
function isAccountEntity(entity) {
  if (!entity) {
    return false;
  }
  return entity.hasOwnProperty("homeAccountId") && entity.hasOwnProperty("environment") && entity.hasOwnProperty("realm") && entity.hasOwnProperty("localAccountId") && entity.hasOwnProperty("username") && entity.hasOwnProperty("authorityType");
}

// ../../node_modules/@azure/msal-common/dist/error/AuthErrorCodes.mjs
var AuthErrorCodes_exports = {};
__export(AuthErrorCodes_exports, {
  postRequestFailed: () => postRequestFailed,
  unexpectedError: () => unexpectedError
});
var unexpectedError = "unexpected_error";
var postRequestFailed = "post_request_failed";

// ../../node_modules/@azure/msal-common/dist/error/ClientConfigurationError.mjs
var ClientConfigurationError = class _ClientConfigurationError extends AuthError2 {
  constructor(errorCode, correlationId) {
    super(errorCode, correlationId);
    this.name = "ClientConfigurationError";
    Object.setPrototypeOf(this, _ClientConfigurationError.prototype);
  }
};
function createClientConfigurationError(errorCode, correlationId) {
  return new ClientConfigurationError(errorCode, correlationId);
}

// ../../node_modules/@azure/msal-common/dist/error/ClientConfigurationErrorCodes.mjs
var ClientConfigurationErrorCodes_exports = {};
__export(ClientConfigurationErrorCodes_exports, {
  authorityMismatch: () => authorityMismatch,
  authorityUriInsecure: () => authorityUriInsecure,
  cannotAllowPlatformBroker: () => cannotAllowPlatformBroker,
  cannotSetOIDCOptions: () => cannotSetOIDCOptions,
  claimsRequestParsingError: () => claimsRequestParsingError,
  emptyInputScopesError: () => emptyInputScopesError,
  invalidAuthenticationHeader: () => invalidAuthenticationHeader,
  invalidAuthorityMetadata: () => invalidAuthorityMetadata,
  invalidClaims: () => invalidClaims,
  invalidCloudDiscoveryMetadata: () => invalidCloudDiscoveryMetadata,
  invalidCodeChallengeMethod: () => invalidCodeChallengeMethod,
  invalidDpopHtm: () => invalidDpopHtm,
  invalidDpopHtu: () => invalidDpopHtu,
  invalidPlatformBrokerConfiguration: () => invalidPlatformBrokerConfiguration,
  invalidRequestMethodForEAR: () => invalidRequestMethodForEAR,
  invalidResponseMode: () => invalidResponseMode,
  issuerValidationFailed: () => issuerValidationFailed,
  logoutRequestEmpty: () => logoutRequestEmpty,
  missingNonceAuthenticationHeader: () => missingNonceAuthenticationHeader,
  missingSshJwk: () => missingSshJwk,
  missingSshKid: () => missingSshKid,
  pkceParamsMissing: () => pkceParamsMissing,
  redirectUriEmpty: () => redirectUriEmpty,
  tokenRequestEmpty: () => tokenRequestEmpty,
  untrustedAuthority: () => untrustedAuthority,
  urlEmptyError: () => urlEmptyError,
  urlParseError: () => urlParseError
});
var redirectUriEmpty = "redirect_uri_empty";
var claimsRequestParsingError = "claims_request_parsing_error";
var authorityUriInsecure = "authority_uri_insecure";
var urlParseError = "url_parse_error";
var urlEmptyError = "empty_url_error";
var emptyInputScopesError = "empty_input_scopes_error";
var invalidClaims = "invalid_claims";
var tokenRequestEmpty = "token_request_empty";
var logoutRequestEmpty = "logout_request_empty";
var invalidCodeChallengeMethod = "invalid_code_challenge_method";
var pkceParamsMissing = "pkce_params_missing";
var invalidCloudDiscoveryMetadata = "invalid_cloud_discovery_metadata";
var invalidAuthorityMetadata = "invalid_authority_metadata";
var untrustedAuthority = "untrusted_authority";
var missingSshJwk = "missing_ssh_jwk";
var missingSshKid = "missing_ssh_kid";
var missingNonceAuthenticationHeader = "missing_nonce_authentication_header";
var invalidAuthenticationHeader = "invalid_authentication_header";
var cannotSetOIDCOptions = "cannot_set_OIDCOptions";
var cannotAllowPlatformBroker = "cannot_allow_platform_broker";
var authorityMismatch = "authority_mismatch";
var invalidRequestMethodForEAR = "invalid_request_method_for_EAR";
var invalidPlatformBrokerConfiguration = "invalid_platform_broker_configuration";
var issuerValidationFailed = "issuer_validation_failed";
var invalidResponseMode = "invalid_response_mode";
var invalidDpopHtm = "invalid_dpop_htm";
var invalidDpopHtu = "invalid_dpop_htu";

// ../../node_modules/@azure/msal-common/dist/authority/OpenIdConfigResponse.mjs
function isOpenIdConfigResponse(response) {
  return response.hasOwnProperty("authorization_endpoint") && response.hasOwnProperty("token_endpoint") && response.hasOwnProperty("issuer") && response.hasOwnProperty("jwks_uri");
}

// ../../node_modules/@azure/msal-common/dist/utils/StringUtils.mjs
var StringUtils = class {
  /**
   * Check if stringified object is empty
   * @param strObj
   */
  static isEmptyObj(strObj) {
    if (strObj) {
      try {
        const obj = JSON.parse(strObj);
        return Object.keys(obj).length === 0;
      } catch (e) {
      }
    }
    return true;
  }
  static startsWith(str, search) {
    return str.indexOf(search) === 0;
  }
  static endsWith(str, search) {
    return str.length >= search.length && str.lastIndexOf(search) === str.length - search.length;
  }
  /**
   * Parses string into an object.
   *
   * @param query
   */
  static queryStringToObject(query) {
    const obj = {};
    const params = query.split("&");
    const decode = (s) => decodeURIComponent(s.replace(/\+/g, " "));
    params.forEach((pair) => {
      if (pair.trim()) {
        const [key, value] = pair.split(/=(.+)/g, 2);
        if (key && value) {
          obj[decode(key)] = decode(value);
        }
      }
    });
    return obj;
  }
  /**
   * Trims entries in an array.
   *
   * @param arr
   */
  static trimArrayEntries(arr) {
    return arr.map((entry) => entry.trim());
  }
  /**
   * Removes empty strings from array
   * @param arr
   */
  static removeEmptyStringsFromArray(arr) {
    return arr.filter((entry) => {
      return !!entry;
    });
  }
  /**
   * Attempts to parse a string into JSON
   * @param str
   */
  static jsonParseHelper(str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return null;
    }
  }
};

// ../../node_modules/@azure/msal-common/dist/url/UrlString.mjs
var UrlString = class _UrlString {
  get urlString() {
    return this._urlString;
  }
  constructor(url, correlationId) {
    this._urlString = url;
    this.correlationId = correlationId;
    if (!this._urlString) {
      throw createClientConfigurationError(urlEmptyError, correlationId);
    }
    if (!url.includes("#")) {
      this._urlString = _UrlString.canonicalizeUri(url);
    }
  }
  /**
   * Ensure urls are lower case and end with a / character.
   * @param url
   */
  static canonicalizeUri(url) {
    if (url) {
      let lowerCaseUrl = url.toLowerCase();
      if (StringUtils.endsWith(lowerCaseUrl, "?")) {
        lowerCaseUrl = lowerCaseUrl.slice(0, -1);
      } else if (StringUtils.endsWith(lowerCaseUrl, "?/")) {
        lowerCaseUrl = lowerCaseUrl.slice(0, -2);
      }
      if (!StringUtils.endsWith(lowerCaseUrl, "/")) {
        lowerCaseUrl += "/";
      }
      return lowerCaseUrl;
    }
    return url;
  }
  /**
   * Throws if urlString passed is not a valid authority URI string.
   */
  validateAsUri() {
    let components;
    try {
      components = this.getUrlComponents();
    } catch (e) {
      throw createClientConfigurationError(urlParseError, this.correlationId);
    }
    if (!components.HostNameAndPort || !components.PathSegments) {
      throw createClientConfigurationError(urlParseError, this.correlationId);
    }
    if (!components.Protocol || components.Protocol.toLowerCase() !== "https:") {
      throw createClientConfigurationError(authorityUriInsecure, this.correlationId);
    }
  }
  /**
   * Given a url and a query string return the url with provided query string appended
   * @param url
   * @param queryString
   */
  static appendQueryString(url, queryString) {
    if (!queryString) {
      return url;
    }
    return url.indexOf("?") < 0 ? `${url}?${queryString}` : `${url}&${queryString}`;
  }
  /**
   * Returns a url with the hash removed
   * @param url
   */
  static removeHashFromUrl(url) {
    return _UrlString.canonicalizeUri(url.split("#")[0]);
  }
  /**
   * Given a url like https://a:b/common/d?e=f#g, and a tenantId, returns https://a:b/tenantId/d
   * @param href The url
   * @param tenantId The tenant id to replace
   */
  replaceTenantPath(tenantId) {
    const urlObject = this.getUrlComponents();
    const pathArray = urlObject.PathSegments;
    if (tenantId && pathArray.length !== 0 && (pathArray[0] === AADAuthority.COMMON || pathArray[0] === AADAuthority.ORGANIZATIONS)) {
      pathArray[0] = tenantId;
    }
    return _UrlString.constructAuthorityUriFromObject(urlObject, this.correlationId);
  }
  /**
   * Parses out the components from a url string.
   * @returns An object with the various components. Please cache this value insted of calling this multiple times on the same url.
   */
  getUrlComponents() {
    const regEx = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?");
    const match = this.urlString.match(regEx);
    if (!match) {
      throw createClientConfigurationError(urlParseError, this.correlationId);
    }
    const urlComponents = {
      Protocol: match[1],
      HostNameAndPort: match[4],
      AbsolutePath: match[5],
      QueryString: match[7]
    };
    let pathSegments = urlComponents.AbsolutePath.split("/");
    pathSegments = pathSegments.filter((val) => val && val.length > 0);
    urlComponents.PathSegments = pathSegments;
    if (urlComponents.QueryString && urlComponents.QueryString.endsWith("/")) {
      urlComponents.QueryString = urlComponents.QueryString.substring(0, urlComponents.QueryString.length - 1);
    }
    return urlComponents;
  }
  static getDomainFromUrl(url, correlationId) {
    const regEx = RegExp("^([^:/?#]+://)?([^/?#]*)");
    const match = url.match(regEx);
    if (!match) {
      throw createClientConfigurationError(urlParseError, correlationId);
    }
    return match[2];
  }
  static getAbsoluteUrl(relativeUrl, baseUrl, correlationId) {
    if (relativeUrl[0] === FORWARD_SLASH) {
      const url = new _UrlString(baseUrl, correlationId);
      const baseComponents = url.getUrlComponents();
      return baseComponents.Protocol + "//" + baseComponents.HostNameAndPort + relativeUrl;
    }
    return relativeUrl;
  }
  static constructAuthorityUriFromObject(urlObject, correlationId) {
    return new _UrlString(urlObject.Protocol + "//" + urlObject.HostNameAndPort + "/" + urlObject.PathSegments.join("/"), correlationId);
  }
};

// ../../node_modules/@azure/msal-common/dist/authority/AuthorityMetadata.mjs
var endpointHosts = [
  { host: "login.microsoftonline.com" },
  {
    host: "login.chinacloudapi.cn",
    issuerHost: "login.partner.microsoftonline.cn"
    // Issuer differs
  },
  { host: "login.microsoftonline.us" },
  { host: "login.sovcloud-identity.fr" },
  { host: "login.sovcloud-identity.de" },
  { host: "login.sovcloud-identity.sg" }
];
function buildOpenIdConfig(host, issuerHost) {
  return {
    token_endpoint: `https://${host}/{tenantid}/oauth2/v2.0/token`,
    jwks_uri: `https://${host}/{tenantid}/discovery/v2.0/keys`,
    issuer: `https://${issuerHost}/{tenantid}/v2.0`,
    authorization_endpoint: `https://${host}/{tenantid}/oauth2/v2.0/authorize`,
    end_session_endpoint: `https://${host}/{tenantid}/oauth2/v2.0/logout`
  };
}
var dynamicEndpointMetadata = endpointHosts.reduce((acc, { host, issuerHost }) => {
  acc[host] = buildOpenIdConfig(host, issuerHost || host);
  return acc;
}, {});
var rawMetdataJSON = {
  endpointMetadata: dynamicEndpointMetadata,
  instanceDiscoveryMetadata: {
    metadata: [
      {
        preferred_network: "login.microsoftonline.com",
        preferred_cache: "login.windows.net",
        aliases: [
          "login.microsoftonline.com",
          "login.windows.net",
          "login.microsoft.com",
          "sts.windows.net"
        ]
      },
      {
        preferred_network: "login.partner.microsoftonline.cn",
        preferred_cache: "login.partner.microsoftonline.cn",
        aliases: [
          "login.partner.microsoftonline.cn",
          "login.chinacloudapi.cn"
        ]
      },
      {
        preferred_network: "login.microsoftonline.de",
        preferred_cache: "login.microsoftonline.de",
        aliases: ["login.microsoftonline.de"]
      },
      {
        preferred_network: "login.microsoftonline.us",
        preferred_cache: "login.microsoftonline.us",
        aliases: [
          "login.microsoftonline.us",
          "login.usgovcloudapi.net"
        ]
      },
      {
        preferred_network: "login-us.microsoftonline.com",
        preferred_cache: "login-us.microsoftonline.com",
        aliases: ["login-us.microsoftonline.com"]
      },
      {
        preferred_network: "login.sovcloud-identity.fr",
        preferred_cache: "login.sovcloud-identity.fr",
        aliases: ["login.sovcloud-identity.fr"]
      },
      {
        preferred_network: "login.sovcloud-identity.de",
        preferred_cache: "login.sovcloud-identity.de",
        aliases: ["login.sovcloud-identity.de"]
      },
      {
        preferred_network: "login.sovcloud-identity.sg",
        preferred_cache: "login.sovcloud-identity.sg",
        aliases: ["login.sovcloud-identity.sg"]
      },
      {
        preferred_network: "login.windows-ppe.net",
        preferred_cache: "login.windows-ppe.net",
        aliases: [
          "login.windows-ppe.net",
          "sts.windows-ppe.net",
          "login.microsoft-ppe.com"
        ]
      }
    ]
  }
};
var EndpointMetadata = rawMetdataJSON.endpointMetadata;
var InstanceDiscoveryMetadata = rawMetdataJSON.instanceDiscoveryMetadata;
var InstanceDiscoveryMetadataAliases = /* @__PURE__ */ new Set();
InstanceDiscoveryMetadata.metadata.forEach((metadataEntry) => {
  metadataEntry.aliases.forEach((alias) => {
    InstanceDiscoveryMetadataAliases.add(alias);
  });
});
function getAliasesFromStaticSources(staticAuthorityOptions, logger27, correlationId) {
  let staticAliases;
  const canonicalAuthority = staticAuthorityOptions.canonicalAuthority;
  if (canonicalAuthority) {
    const authorityHost = new UrlString(canonicalAuthority, correlationId).getUrlComponents().HostNameAndPort;
    staticAliases = getAliasesFromMetadata(logger27, correlationId, authorityHost, staticAuthorityOptions.cloudDiscoveryMetadata?.metadata, AuthorityMetadataSource.CONFIG) || getAliasesFromMetadata(logger27, correlationId, authorityHost, InstanceDiscoveryMetadata.metadata, AuthorityMetadataSource.HARDCODED_VALUES) || staticAuthorityOptions.knownAuthorities;
  }
  return staticAliases || [];
}
function getAliasesFromMetadata(logger27, correlationId, authorityHost, cloudDiscoveryMetadata, source) {
  logger27.trace(`getAliasesFromMetadata called with source: '${source}'`, correlationId);
  if (authorityHost && cloudDiscoveryMetadata) {
    const metadata = getCloudDiscoveryMetadataFromNetworkResponse(cloudDiscoveryMetadata, authorityHost);
    if (metadata) {
      logger27.trace(`getAliasesFromMetadata: found cloud discovery metadata in '${source}', returning aliases`, correlationId);
      return metadata.aliases;
    } else {
      logger27.trace(`getAliasesFromMetadata: did not find cloud discovery metadata in '${source}'`, correlationId);
    }
  }
  return null;
}
function getCloudDiscoveryMetadataFromHardcodedValues(authorityHost) {
  const metadata = getCloudDiscoveryMetadataFromNetworkResponse(InstanceDiscoveryMetadata.metadata, authorityHost);
  return metadata;
}
function getCloudDiscoveryMetadataFromNetworkResponse(response, authorityHost) {
  for (let i = 0; i < response.length; i++) {
    const metadata = response[i];
    if (metadata.aliases.includes(authorityHost)) {
      return metadata;
    }
  }
  return null;
}

// ../../node_modules/@azure/msal-common/dist/authority/AuthorityOptions.mjs
var AzureCloudInstance = {
  // AzureCloudInstance is not specified.
  None: "none",
  // Microsoft Azure public cloud
  AzurePublic: "https://login.microsoftonline.com",
  // Microsoft PPE
  AzurePpe: "https://login.windows-ppe.net",
  // Microsoft Chinese national/regional cloud
  AzureChina: "https://login.chinacloudapi.cn",
  // Microsoft German national/regional cloud ("Black Forest")
  AzureGermany: "https://login.microsoftonline.de",
  // US Government cloud
  AzureUsGovernment: "https://login.microsoftonline.us"
};

// ../../node_modules/@azure/msal-common/dist/authority/CloudInstanceDiscoveryResponse.mjs
function isCloudInstanceDiscoveryResponse(response) {
  return response.hasOwnProperty("tenant_discovery_endpoint") && response.hasOwnProperty("metadata");
}

// ../../node_modules/@azure/msal-common/dist/authority/CloudInstanceDiscoveryErrorResponse.mjs
function isCloudInstanceDiscoveryErrorResponse(response) {
  return response.hasOwnProperty("error") && response.hasOwnProperty("error_description");
}

// ../../node_modules/@azure/msal-common/dist/telemetry/performance/PerformanceEvents.mjs
var NetworkClientSendPostRequestAsync = "networkClientSendPostRequestAsync";
var RefreshTokenClientExecutePostToTokenEndpoint = "refreshTokenClientExecutePostToTokenEndpoint";
var AuthorizationCodeClientExecutePostToTokenEndpoint = "authorizationCodeClientExecutePostToTokenEndpoint";
var RefreshTokenClientExecuteTokenRequest = "refreshTokenClientExecuteTokenRequest";
var RefreshTokenClientAcquireToken = "refreshTokenClientAcquireToken";
var RefreshTokenClientAcquireTokenWithCachedRefreshToken = "refreshTokenClientAcquireTokenWithCachedRefreshToken";
var RefreshTokenClientCreateTokenRequestBody = "refreshTokenClientCreateTokenRequestBody";
var SilentFlowClientGenerateResultFromCacheRecord = "silentFlowClientGenerateResultFromCacheRecord";
var AuthClientExecuteTokenRequest = "authClientExecuteTokenRequest";
var AuthClientCreateTokenRequestBody = "authClientCreateTokenRequestBody";
var UpdateTokenEndpointAuthority = "updateTokenEndpointAuthority";
var PopTokenGenerateCnf = "popTokenGenerateCnf";
var HandleServerTokenResponse = "handleServerTokenResponse";
var AuthorityResolveEndpointsAsync = "authorityResolveEndpointsAsync";
var AuthorityGetCloudDiscoveryMetadataFromNetwork = "authorityGetCloudDiscoveryMetadataFromNetwork";
var AuthorityUpdateCloudDiscoveryMetadata = "authorityUpdateCloudDiscoveryMetadata";
var AuthorityGetEndpointMetadataFromNetwork = "authorityGetEndpointMetadataFromNetwork";
var AuthorityUpdateEndpointMetadata = "authorityUpdateEndpointMetadata";
var AuthorityUpdateMetadataWithRegionalInformation = "authorityUpdateMetadataWithRegionalInformation";
var RegionDiscoveryDetectRegion = "regionDiscoveryDetectRegion";
var RegionDiscoveryGetRegionFromIMDS = "regionDiscoveryGetRegionFromIMDS";
var RegionDiscoveryGetCurrentVersion = "regionDiscoveryGetCurrentVersion";
var CacheManagerGetRefreshToken = "cacheManagerGetRefreshToken";

// ../../node_modules/@azure/msal-common/dist/utils/FunctionWrappers.mjs
var invoke = (callback, eventName, logger27, telemetryClient, correlationId) => {
  return (...args) => {
    logger27.trace(`Executing function '${eventName}'`, correlationId);
    const inProgressEvent = telemetryClient.startMeasurement(eventName, correlationId);
    if (correlationId) {
      telemetryClient.incrementFields({ [`ext.${eventName}CallCount`]: 1 }, correlationId);
    }
    try {
      const result = callback(...args);
      inProgressEvent.end({
        success: true
      });
      logger27.trace(`Returning result from '${eventName}'`, correlationId);
      return result;
    } catch (e) {
      logger27.trace(`Error occurred in '${eventName}'`, correlationId);
      try {
        logger27.trace(JSON.stringify(e), correlationId);
      } catch (e2) {
        logger27.trace("Unable to print error message.", correlationId);
      }
      inProgressEvent.end({
        success: false
      }, e);
      throw e;
    }
  };
};
var invokeAsync = (callback, eventName, logger27, telemetryClient, correlationId) => {
  return (...args) => {
    logger27.trace(`Executing function '${eventName}'`, correlationId);
    const inProgressEvent = telemetryClient.startMeasurement(eventName, correlationId);
    if (correlationId) {
      telemetryClient.incrementFields({ [`ext.${eventName}CallCount`]: 1 }, correlationId);
    }
    return callback(...args).then((response) => {
      logger27.trace(`Returning result from '${eventName}'`, correlationId);
      inProgressEvent.end({
        success: true
      });
      return response;
    }).catch((e) => {
      logger27.trace(`Error occurred in '${eventName}'`, correlationId);
      try {
        logger27.trace(JSON.stringify(e), correlationId);
      } catch (e2) {
        logger27.trace("Unable to print error message.", correlationId);
      }
      inProgressEvent.end({
        success: false
      }, e);
      throw e;
    });
  };
};

// ../../node_modules/@azure/msal-common/dist/authority/RegionDiscovery.mjs
var RegionDiscovery = class _RegionDiscovery {
  constructor(networkInterface, logger27, performanceClient, correlationId) {
    this.networkInterface = networkInterface;
    this.logger = logger27;
    this.performanceClient = performanceClient;
    this.correlationId = correlationId;
  }
  /**
   * Detect the region from the application's environment.
   *
   * @returns Promise<string | null>
   */
  async detectRegion(environmentRegion, regionDiscoveryMetadata) {
    let autodetectedRegionName = environmentRegion;
    if (!autodetectedRegionName) {
      const options = _RegionDiscovery.IMDS_OPTIONS;
      try {
        const localIMDSVersionResponse = await invokeAsync(this.getRegionFromIMDS.bind(this), RegionDiscoveryGetRegionFromIMDS, this.logger, this.performanceClient, this.correlationId)(IMDS_VERSION, options);
        if (localIMDSVersionResponse.status === HTTP_SUCCESS) {
          autodetectedRegionName = localIMDSVersionResponse.body?.location;
          if (autodetectedRegionName) {
            regionDiscoveryMetadata.region_source = RegionDiscoverySources.IMDS;
          }
        }
        if (localIMDSVersionResponse.status === HTTP_BAD_REQUEST) {
          const currentIMDSVersion = await invokeAsync(this.getCurrentVersion.bind(this), RegionDiscoveryGetCurrentVersion, this.logger, this.performanceClient, this.correlationId)(options);
          if (!currentIMDSVersion) {
            regionDiscoveryMetadata.region_source = RegionDiscoverySources.FAILED_AUTO_DETECTION;
            return null;
          }
          const currentIMDSVersionResponse = await invokeAsync(this.getRegionFromIMDS.bind(this), RegionDiscoveryGetRegionFromIMDS, this.logger, this.performanceClient, this.correlationId)(currentIMDSVersion, options);
          if (currentIMDSVersionResponse.status === HTTP_SUCCESS) {
            autodetectedRegionName = currentIMDSVersionResponse.body?.location;
            if (autodetectedRegionName) {
              regionDiscoveryMetadata.region_source = RegionDiscoverySources.IMDS;
            }
          }
        }
      } catch (e) {
        regionDiscoveryMetadata.region_source = RegionDiscoverySources.FAILED_AUTO_DETECTION;
        return null;
      }
    } else {
      regionDiscoveryMetadata.region_source = RegionDiscoverySources.ENVIRONMENT_VARIABLE;
    }
    if (!autodetectedRegionName) {
      regionDiscoveryMetadata.region_source = RegionDiscoverySources.FAILED_AUTO_DETECTION;
    }
    return autodetectedRegionName || null;
  }
  /**
   * Make the call to the IMDS endpoint
   *
   * @param version
   * @param options
   * @returns Promise<NetworkResponse<ImdsComputeResponse>>
   */
  async getRegionFromIMDS(version3, options) {
    return this.networkInterface.sendGetRequestAsync(`${IMDS_ENDPOINT}?api-version=${version3}`, options, IMDS_TIMEOUT);
  }
  /**
   * Get the most recent version of the IMDS endpoint available
   *
   * @returns Promise<string | null>
   */
  async getCurrentVersion(options) {
    try {
      const response = await this.networkInterface.sendGetRequestAsync(`${IMDS_ENDPOINT}?format=json`, options);
      if (response.status === HTTP_BAD_REQUEST && response.body && response.body["newest-versions"] && response.body["newest-versions"].length > 0) {
        return response.body["newest-versions"][0];
      }
      return null;
    } catch (e) {
      return null;
    }
  }
};
RegionDiscovery.IMDS_OPTIONS = {
  headers: {
    Metadata: "true"
  }
};

// ../../node_modules/@azure/msal-common/dist/cache/utils/CacheHelpers.mjs
var CacheHelpers_exports = {};
__export(CacheHelpers_exports, {
  createAccessTokenEntity: () => createAccessTokenEntity,
  createIdTokenEntity: () => createIdTokenEntity,
  createRefreshTokenEntity: () => createRefreshTokenEntity,
  generateAppMetadataKey: () => generateAppMetadataKey,
  generateAuthorityMetadataExpiresAt: () => generateAuthorityMetadataExpiresAt,
  isAccessTokenEntity: () => isAccessTokenEntity,
  isAppMetadataEntity: () => isAppMetadataEntity,
  isAuthorityMetadataEntity: () => isAuthorityMetadataEntity,
  isAuthorityMetadataExpired: () => isAuthorityMetadataExpired,
  isCredentialEntity: () => isCredentialEntity,
  isIdTokenEntity: () => isIdTokenEntity,
  isRefreshTokenEntity: () => isRefreshTokenEntity,
  isServerTelemetryEntity: () => isServerTelemetryEntity,
  isThrottlingEntity: () => isThrottlingEntity,
  updateAuthorityEndpointMetadata: () => updateAuthorityEndpointMetadata,
  updateCloudDiscoveryMetadata: () => updateCloudDiscoveryMetadata
});

// ../../node_modules/@azure/msal-common/dist/utils/TimeUtils.mjs
var TimeUtils_exports = {};
__export(TimeUtils_exports, {
  delay: () => delay,
  isCacheExpired: () => isCacheExpired,
  isTokenExpired: () => isTokenExpired,
  nowSeconds: () => nowSeconds,
  toDateFromSeconds: () => toDateFromSeconds,
  toSecondsFromDate: () => toSecondsFromDate,
  wasClockTurnedBack: () => wasClockTurnedBack
});
function nowSeconds() {
  return Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3);
}
function toSecondsFromDate(date) {
  return date.getTime() / 1e3;
}
function toDateFromSeconds(seconds) {
  if (seconds) {
    return new Date(Number(seconds) * 1e3);
  }
  return /* @__PURE__ */ new Date();
}
function isTokenExpired(expiresOn, offset) {
  const expirationSec = Number(expiresOn) || 0;
  const offsetCurrentTimeSec = nowSeconds() + offset;
  return offsetCurrentTimeSec > expirationSec;
}
function isCacheExpired(lastUpdatedAt, cacheRetentionDays) {
  const cacheExpirationTimestamp = Number(lastUpdatedAt) + cacheRetentionDays * 24 * 60 * 60 * 1e3;
  return Date.now() > cacheExpirationTimestamp;
}
function wasClockTurnedBack(cachedAt) {
  const cachedAtSec = Number(cachedAt);
  return cachedAtSec > nowSeconds();
}
function delay(t, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), t));
}

// ../../node_modules/@azure/msal-common/dist/cache/utils/CacheHelpers.mjs
function createIdTokenEntity(homeAccountId, environment, idToken, clientId, tenantId) {
  const idTokenEntity = {
    credentialType: CredentialType.ID_TOKEN,
    homeAccountId,
    environment,
    clientId,
    secret: idToken,
    realm: tenantId,
    lastUpdatedAt: Date.now().toString()
    // Set the last updated time to now
  };
  return idTokenEntity;
}
function createAccessTokenEntity(homeAccountId, environment, accessToken, clientId, tenantId, scopes, expiresOn, extExpiresOn, base64Decode, correlationId, refreshOn, tokenType, userAssertionHash, keyId, additionalCacheKeyComponents) {
  const atEntity = {
    homeAccountId,
    credentialType: CredentialType.ACCESS_TOKEN,
    secret: accessToken,
    cachedAt: nowSeconds().toString(),
    expiresOn: expiresOn.toString(),
    extendedExpiresOn: extExpiresOn.toString(),
    environment,
    clientId,
    realm: tenantId,
    target: scopes,
    tokenType: tokenType || AuthenticationScheme.BEARER,
    lastUpdatedAt: Date.now().toString()
    // Set the last updated time to now
  };
  if (userAssertionHash) {
    atEntity.userAssertionHash = userAssertionHash;
  }
  if (refreshOn) {
    atEntity.refreshOn = refreshOn.toString();
  }
  if (atEntity.tokenType?.toLowerCase() !== AuthenticationScheme.BEARER.toLowerCase()) {
    atEntity.credentialType = CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME;
    switch (atEntity.tokenType) {
      case AuthenticationScheme.POP:
        const tokenClaims = extractTokenClaims(accessToken, base64Decode, correlationId);
        if (!tokenClaims?.cnf?.kid) {
          throw createClientAuthError(tokenClaimsCnfRequiredForSignedJwt, correlationId);
        }
        atEntity.keyId = tokenClaims.cnf.kid;
        break;
      case AuthenticationScheme.SSH:
        atEntity.keyId = keyId;
    }
  }
  if (additionalCacheKeyComponents && Object.keys(additionalCacheKeyComponents).length > 0) {
    atEntity.additionalCacheKeyComponents = additionalCacheKeyComponents;
  }
  return atEntity;
}
function createRefreshTokenEntity(homeAccountId, environment, refreshToken, clientId, familyId, userAssertionHash, expiresOn) {
  const rtEntity = {
    credentialType: CredentialType.REFRESH_TOKEN,
    homeAccountId,
    environment,
    clientId,
    secret: refreshToken,
    lastUpdatedAt: Date.now().toString()
  };
  if (userAssertionHash) {
    rtEntity.userAssertionHash = userAssertionHash;
  }
  if (familyId) {
    rtEntity.familyId = familyId;
  }
  if (expiresOn) {
    rtEntity.expiresOn = expiresOn.toString();
  }
  return rtEntity;
}
function isCredentialEntity(entity) {
  return entity.hasOwnProperty("homeAccountId") && entity.hasOwnProperty("environment") && entity.hasOwnProperty("credentialType") && entity.hasOwnProperty("clientId") && entity.hasOwnProperty("secret");
}
function isAccessTokenEntity(entity) {
  if (!entity) {
    return false;
  }
  return isCredentialEntity(entity) && entity.hasOwnProperty("realm") && entity.hasOwnProperty("target") && (entity["credentialType"] === CredentialType.ACCESS_TOKEN || entity["credentialType"] === CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME);
}
function isIdTokenEntity(entity) {
  if (!entity) {
    return false;
  }
  return isCredentialEntity(entity) && entity.hasOwnProperty("realm") && entity["credentialType"] === CredentialType.ID_TOKEN;
}
function isRefreshTokenEntity(entity) {
  if (!entity) {
    return false;
  }
  return isCredentialEntity(entity) && entity["credentialType"] === CredentialType.REFRESH_TOKEN;
}
function isServerTelemetryEntity(key, entity) {
  const validateKey = key.indexOf(SERVER_TELEM_CACHE_KEY) === 0;
  let validateEntity = true;
  if (entity) {
    validateEntity = entity.hasOwnProperty("failedRequests") && entity.hasOwnProperty("errors") && entity.hasOwnProperty("cacheHits");
  }
  return validateKey && validateEntity;
}
function isThrottlingEntity(key, entity) {
  let validateKey = false;
  if (key) {
    validateKey = key.indexOf(THROTTLING_PREFIX) === 0;
  }
  let validateEntity = true;
  if (entity) {
    validateEntity = entity.hasOwnProperty("throttleTime");
  }
  return validateKey && validateEntity;
}
function generateAppMetadataKey({ environment, clientId }) {
  const appMetaDataKeyArray = [
    APP_METADATA,
    environment,
    clientId
  ];
  return appMetaDataKeyArray.join(CACHE_KEY_SEPARATOR).toLowerCase();
}
function isAppMetadataEntity(key, entity) {
  if (!entity) {
    return false;
  }
  return key.indexOf(APP_METADATA) === 0 && entity.hasOwnProperty("clientId") && entity.hasOwnProperty("environment");
}
function isAuthorityMetadataEntity(key, entity) {
  if (!entity) {
    return false;
  }
  return key.indexOf(AUTHORITY_METADATA_CACHE_KEY) === 0 && entity.hasOwnProperty("aliases") && entity.hasOwnProperty("preferred_cache") && entity.hasOwnProperty("preferred_network") && entity.hasOwnProperty("canonical_authority") && entity.hasOwnProperty("authorization_endpoint") && entity.hasOwnProperty("token_endpoint") && entity.hasOwnProperty("issuer") && entity.hasOwnProperty("aliasesFromNetwork") && entity.hasOwnProperty("endpointsFromNetwork") && entity.hasOwnProperty("expiresAt") && entity.hasOwnProperty("jwks_uri");
}
function generateAuthorityMetadataExpiresAt() {
  return nowSeconds() + AUTHORITY_METADATA_REFRESH_TIME_SECONDS;
}
function updateAuthorityEndpointMetadata(authorityMetadata, updatedValues, fromNetwork) {
  authorityMetadata.authorization_endpoint = updatedValues.authorization_endpoint;
  authorityMetadata.token_endpoint = updatedValues.token_endpoint;
  authorityMetadata.end_session_endpoint = updatedValues.end_session_endpoint;
  authorityMetadata.issuer = updatedValues.issuer;
  authorityMetadata.endpointsFromNetwork = fromNetwork;
  authorityMetadata.jwks_uri = updatedValues.jwks_uri;
}
function updateCloudDiscoveryMetadata(authorityMetadata, updatedValues, fromNetwork) {
  authorityMetadata.aliases = updatedValues.aliases;
  authorityMetadata.preferred_cache = updatedValues.preferred_cache;
  authorityMetadata.preferred_network = updatedValues.preferred_network;
  authorityMetadata.aliasesFromNetwork = fromNetwork;
}
function isAuthorityMetadataExpired(metadata) {
  return metadata.expiresAt <= nowSeconds();
}

// ../../node_modules/@azure/msal-common/dist/authority/Authority.mjs
var Authority = class _Authority {
  constructor(authority, networkInterface, cacheManager, authorityOptions, logger27, correlationId, performanceClient, managedIdentity) {
    this.canonicalAuthority = authority;
    this._canonicalAuthority.validateAsUri();
    this.networkInterface = networkInterface;
    this.cacheManager = cacheManager;
    this.authorityOptions = authorityOptions;
    this.regionDiscoveryMetadata = {
      region_used: void 0,
      region_source: void 0,
      region_outcome: void 0
    };
    this.logger = logger27;
    this.performanceClient = performanceClient;
    this.correlationId = correlationId;
    this.managedIdentity = managedIdentity || false;
    this.regionDiscovery = new RegionDiscovery(networkInterface, this.logger, this.performanceClient, this.correlationId);
  }
  /**
   * Get {@link AuthorityType:type}
   * @param authorityUri {@link IUri}
   * @private
   */
  getAuthorityType(authorityUri) {
    if (authorityUri.HostNameAndPort.endsWith(CIAM_AUTH_URL)) {
      return AuthorityType.Ciam;
    }
    const pathSegments = authorityUri.PathSegments;
    if (pathSegments.length) {
      switch (pathSegments[0].toLowerCase()) {
        case ADFS:
          return AuthorityType.Adfs;
        case DSTS:
          return AuthorityType.Dsts;
      }
    }
    return AuthorityType.Default;
  }
  // See above for AuthorityType
  get authorityType() {
    return this.getAuthorityType(this.canonicalAuthorityUrlComponents);
  }
  /**
   * ProtocolMode enum representing the way endpoints are constructed.
   */
  get protocolMode() {
    return this.authorityOptions.protocolMode;
  }
  /**
   * Returns authorityOptions which can be used to reinstantiate a new authority instance
   */
  get options() {
    return this.authorityOptions;
  }
  /**
   * A URL that is the authority set by the developer
   */
  get canonicalAuthority() {
    return this._canonicalAuthority.urlString;
  }
  /**
   * Sets canonical authority.
   */
  set canonicalAuthority(url) {
    this._canonicalAuthority = new UrlString(url, this.correlationId);
    this._canonicalAuthority.validateAsUri();
    this._canonicalAuthorityUrlComponents = null;
  }
  /**
   * Get authority components.
   */
  get canonicalAuthorityUrlComponents() {
    if (!this._canonicalAuthorityUrlComponents) {
      this._canonicalAuthorityUrlComponents = this._canonicalAuthority.getUrlComponents();
    }
    return this._canonicalAuthorityUrlComponents;
  }
  /**
   * Get hostname and port i.e. login.microsoftonline.com
   */
  get hostnameAndPort() {
    return this.canonicalAuthorityUrlComponents.HostNameAndPort.toLowerCase();
  }
  /**
   * Get tenant for authority.
   */
  get tenant() {
    return this.canonicalAuthorityUrlComponents.PathSegments[0];
  }
  /**
   * OAuth /authorize endpoint for requests
   */
  get authorizationEndpoint() {
    if (this.discoveryComplete()) {
      return this.replacePath(this.metadata.authorization_endpoint);
    } else {
      throw createClientAuthError(endpointResolutionError, this.correlationId);
    }
  }
  /**
   * OAuth /token endpoint for requests
   */
  get tokenEndpoint() {
    if (this.discoveryComplete()) {
      return this.replacePath(this.metadata.token_endpoint);
    } else {
      throw createClientAuthError(endpointResolutionError, this.correlationId);
    }
  }
  get deviceCodeEndpoint() {
    if (this.discoveryComplete()) {
      return this.replacePath(this.metadata.token_endpoint.replace("/token", "/devicecode"));
    } else {
      throw createClientAuthError(endpointResolutionError, this.correlationId);
    }
  }
  /**
   * OAuth logout endpoint for requests
   */
  get endSessionEndpoint() {
    if (this.discoveryComplete()) {
      if (!this.metadata.end_session_endpoint) {
        throw createClientAuthError(endSessionEndpointNotSupported, this.correlationId);
      }
      return this.replacePath(this.metadata.end_session_endpoint);
    } else {
      throw createClientAuthError(endpointResolutionError, this.correlationId);
    }
  }
  /**
   * OAuth issuer for requests
   */
  get selfSignedJwtAudience() {
    if (this.discoveryComplete()) {
      return this.replacePath(this.metadata.issuer);
    } else {
      throw createClientAuthError(endpointResolutionError, this.correlationId);
    }
  }
  /**
   * Jwks_uri for token signing keys
   */
  get jwksUri() {
    if (this.discoveryComplete()) {
      return this.replacePath(this.metadata.jwks_uri);
    } else {
      throw createClientAuthError(endpointResolutionError, this.correlationId);
    }
  }
  /**
   * Returns a flag indicating that tenant name can be replaced in authority {@link IUri}
   * @param authorityUri {@link IUri}
   * @private
   */
  canReplaceTenant(authorityUri) {
    return authorityUri.PathSegments.length === 1 && !_Authority.reservedTenantDomains.has(authorityUri.PathSegments[0]) && this.getAuthorityType(authorityUri) === AuthorityType.Default && this.protocolMode !== ProtocolMode.OIDC;
  }
  /**
   * Replaces tenant in url path with current tenant. Defaults to common.
   * @param urlString
   */
  replaceTenant(urlString) {
    return urlString.replace(/{tenant}|{tenantid}/g, this.tenant);
  }
  /**
   * Replaces path such as tenant or policy with the current tenant or policy.
   * @param urlString
   */
  replacePath(urlString) {
    let endpoint = urlString;
    const cachedAuthorityUrl = new UrlString(this.metadata.canonical_authority, this.correlationId);
    const cachedAuthorityUrlComponents = cachedAuthorityUrl.getUrlComponents();
    const cachedAuthorityParts = cachedAuthorityUrlComponents.PathSegments;
    const currentAuthorityParts = this.canonicalAuthorityUrlComponents.PathSegments;
    currentAuthorityParts.forEach((currentPart, index) => {
      let cachedPart = cachedAuthorityParts[index];
      if (index === 0 && this.canReplaceTenant(cachedAuthorityUrlComponents)) {
        const tenantId = new UrlString(this.metadata.authorization_endpoint, this.correlationId).getUrlComponents().PathSegments[0];
        if (cachedPart !== tenantId) {
          this.logger.verbose(`Replacing tenant domain name '${cachedPart}' with id '${tenantId}'`, this.correlationId);
          cachedPart = tenantId;
        }
      }
      if (currentPart !== cachedPart) {
        endpoint = endpoint.replace(`/${cachedPart}/`, `/${currentPart}/`);
      }
    });
    return this.replaceTenant(endpoint);
  }
  /**
   * The default open id configuration endpoint for any canonical authority.
   */
  get defaultOpenIdConfigurationEndpoint() {
    const canonicalAuthorityHost = this.hostnameAndPort;
    if (this.canonicalAuthority.endsWith("v2.0/") || this.authorityType === AuthorityType.Adfs || this.protocolMode === ProtocolMode.OIDC && !this.isAliasOfKnownMicrosoftAuthority(canonicalAuthorityHost)) {
      return `${this.canonicalAuthority}.well-known/openid-configuration`;
    }
    return `${this.canonicalAuthority}v2.0/.well-known/openid-configuration`;
  }
  /**
   * Boolean that returns whether or not tenant discovery has been completed.
   */
  discoveryComplete() {
    return !!this.metadata;
  }
  /**
   * Perform endpoint discovery to discover aliases, preferred_cache, preferred_network
   * and the /authorize, /token and logout endpoints.
   */
  async resolveEndpointsAsync() {
    const metadataEntity = this.getCurrentMetadataEntity();
    const cloudDiscoverySource = await invokeAsync(this.updateCloudDiscoveryMetadata.bind(this), AuthorityUpdateCloudDiscoveryMetadata, this.logger, this.performanceClient, this.correlationId)(metadataEntity);
    this.canonicalAuthority = this.canonicalAuthority.replace(this.hostnameAndPort, metadataEntity.preferred_network);
    const endpointSource = await invokeAsync(this.updateEndpointMetadata.bind(this), AuthorityUpdateEndpointMetadata, this.logger, this.performanceClient, this.correlationId)(metadataEntity);
    this.updateCachedMetadata(metadataEntity, cloudDiscoverySource, {
      source: endpointSource
    });
    this.performanceClient?.addFields({
      cloudDiscoverySource,
      authorityEndpointSource: endpointSource
    }, this.correlationId);
  }
  /**
   * Returns metadata entity from cache if it exists, otherwise returns a new metadata entity built
   * from the configured canonical authority
   * @returns
   */
  getCurrentMetadataEntity() {
    let metadataEntity = this.cacheManager.getAuthorityMetadataByAlias(this.hostnameAndPort, this.correlationId);
    if (!metadataEntity) {
      metadataEntity = {
        aliases: [],
        preferred_cache: this.hostnameAndPort,
        preferred_network: this.hostnameAndPort,
        canonical_authority: this.canonicalAuthority,
        authorization_endpoint: "",
        token_endpoint: "",
        end_session_endpoint: "",
        issuer: "",
        aliasesFromNetwork: false,
        endpointsFromNetwork: false,
        expiresAt: generateAuthorityMetadataExpiresAt(),
        jwks_uri: ""
      };
    }
    return metadataEntity;
  }
  /**
   * Updates cached metadata based on metadata source and sets the instance's metadata
   * property to the same value
   * @param metadataEntity
   * @param cloudDiscoverySource
   * @param endpointMetadataResult
   */
  updateCachedMetadata(metadataEntity, cloudDiscoverySource, endpointMetadataResult) {
    if (cloudDiscoverySource !== AuthorityMetadataSource.CACHE && endpointMetadataResult?.source !== AuthorityMetadataSource.CACHE) {
      metadataEntity.expiresAt = generateAuthorityMetadataExpiresAt();
      metadataEntity.canonical_authority = this.canonicalAuthority;
    }
    const cacheKey = this.cacheManager.generateAuthorityMetadataCacheKey(metadataEntity.preferred_cache, this.correlationId);
    this.cacheManager.setAuthorityMetadata(cacheKey, metadataEntity, this.correlationId);
    this.metadata = metadataEntity;
  }
  /**
   * Update AuthorityMetadataEntity with new endpoints and return where the information came from
   * @param metadataEntity
   */
  async updateEndpointMetadata(metadataEntity) {
    const localMetadata = this.updateEndpointMetadataFromLocalSources(metadataEntity);
    if (localMetadata) {
      if (localMetadata.source === AuthorityMetadataSource.HARDCODED_VALUES) {
        if (this.authorityOptions.azureRegionConfiguration?.azureRegion) {
          if (localMetadata.metadata) {
            const hardcodedMetadata = await invokeAsync(this.updateMetadataWithRegionalInformation.bind(this), AuthorityUpdateMetadataWithRegionalInformation, this.logger, this.performanceClient, this.correlationId)(localMetadata.metadata);
            updateAuthorityEndpointMetadata(metadataEntity, hardcodedMetadata, false);
            metadataEntity.canonical_authority = this.canonicalAuthority;
          }
        }
      }
      return localMetadata.source;
    }
    let metadata = await invokeAsync(this.getEndpointMetadataFromNetwork.bind(this), AuthorityGetEndpointMetadataFromNetwork, this.logger, this.performanceClient, this.correlationId)();
    if (metadata) {
      this.validateIssuer(metadata.issuer);
      if (this.authorityOptions.azureRegionConfiguration?.azureRegion) {
        metadata = await invokeAsync(this.updateMetadataWithRegionalInformation.bind(this), AuthorityUpdateMetadataWithRegionalInformation, this.logger, this.performanceClient, this.correlationId)(metadata);
      }
      updateAuthorityEndpointMetadata(metadataEntity, metadata, true);
      return AuthorityMetadataSource.NETWORK;
    } else {
      throw createClientAuthError(openIdConfigError, this.defaultOpenIdConfigurationEndpoint, this.correlationId);
    }
  }
  /**
   * Updates endpoint metadata from local sources and returns where the information was retrieved from and the metadata config
   * response if the source is hardcoded metadata
   * @param metadataEntity
   * @returns
   */
  updateEndpointMetadataFromLocalSources(metadataEntity) {
    this.logger.verbose("Attempting to get endpoint metadata from authority configuration", this.correlationId);
    const configMetadata = this.getEndpointMetadataFromConfig();
    if (configMetadata) {
      this.logger.verbose("Found endpoint metadata in authority configuration", this.correlationId);
      updateAuthorityEndpointMetadata(metadataEntity, configMetadata, false);
      return {
        source: AuthorityMetadataSource.CONFIG
      };
    }
    this.logger.verbose("Did not find endpoint metadata in the config... Attempting to get endpoint metadata from the hardcoded values.", this.correlationId);
    const hardcodedMetadata = this.getEndpointMetadataFromHardcodedValues();
    if (hardcodedMetadata) {
      updateAuthorityEndpointMetadata(metadataEntity, hardcodedMetadata, false);
      return {
        source: AuthorityMetadataSource.HARDCODED_VALUES,
        metadata: hardcodedMetadata
      };
    } else {
      this.logger.verbose("Did not find endpoint metadata in hardcoded values... Attempting to get endpoint metadata from the network metadata cache.", this.correlationId);
    }
    const metadataEntityExpired = isAuthorityMetadataExpired(metadataEntity);
    if (this.isAuthoritySameType(metadataEntity) && metadataEntity.endpointsFromNetwork && !metadataEntityExpired) {
      this.logger.verbose("Found endpoint metadata in the cache.", "");
      return { source: AuthorityMetadataSource.CACHE };
    } else if (metadataEntityExpired) {
      this.logger.verbose("The metadata entity is expired.", "");
    }
    return null;
  }
  /**
   * Compares the number of url components after the domain to determine if the cached
   * authority metadata can be used for the requested authority. Protects against same domain different
   * authority such as login.microsoftonline.com/tenant and login.microsoftonline.com/tfp/tenant/policy
   * @param metadataEntity
   */
  isAuthoritySameType(metadataEntity) {
    const cachedAuthorityUrl = new UrlString(metadataEntity.canonical_authority, this.correlationId);
    const cachedParts = cachedAuthorityUrl.getUrlComponents().PathSegments;
    return cachedParts.length === this.canonicalAuthorityUrlComponents.PathSegments.length;
  }
  /**
   * Parse authorityMetadata config option
   */
  getEndpointMetadataFromConfig() {
    if (this.authorityOptions.authorityMetadata) {
      try {
        return JSON.parse(this.authorityOptions.authorityMetadata);
      } catch (e) {
        throw createClientConfigurationError(invalidAuthorityMetadata, this.correlationId);
      }
    }
    return null;
  }
  /**
   * Gets OAuth endpoints from the given OpenID configuration endpoint.
   *
   * @param hasHardcodedMetadata boolean
   */
  async getEndpointMetadataFromNetwork() {
    const options = {};
    const openIdConfigurationEndpoint = this.defaultOpenIdConfigurationEndpoint;
    this.logger.verbose(`Authority.getEndpointMetadataFromNetwork: attempting to retrieve OAuth endpoints from '${openIdConfigurationEndpoint}'`, this.correlationId);
    try {
      const response = await this.networkInterface.sendGetRequestAsync(openIdConfigurationEndpoint, options);
      const isValidResponse = isOpenIdConfigResponse(response.body);
      if (isValidResponse) {
        return response.body;
      } else {
        this.logger.verbose(`Authority.getEndpointMetadataFromNetwork: could not parse response as OpenID configuration`, this.correlationId);
        return null;
      }
    } catch (e) {
      this.logger.verbose(`Authority.getEndpointMetadataFromNetwork: '${e}'`, this.correlationId);
      return null;
    }
  }
  /**
   * Get OAuth endpoints for common authorities.
   */
  getEndpointMetadataFromHardcodedValues() {
    if (this.hostnameAndPort in EndpointMetadata) {
      return EndpointMetadata[this.hostnameAndPort];
    }
    return null;
  }
  /**
   * Update the retrieved metadata with regional information.
   * User selected Azure region will be used if configured.
   */
  async updateMetadataWithRegionalInformation(metadata) {
    const userConfiguredAzureRegion = this.authorityOptions.azureRegionConfiguration?.azureRegion;
    if (userConfiguredAzureRegion) {
      if (userConfiguredAzureRegion !== AZURE_REGION_AUTO_DISCOVER_FLAG) {
        this.regionDiscoveryMetadata.region_outcome = RegionDiscoveryOutcomes.CONFIGURED_NO_AUTO_DETECTION;
        this.regionDiscoveryMetadata.region_used = userConfiguredAzureRegion;
        return _Authority.replaceWithRegionalInformation(metadata, userConfiguredAzureRegion, this.correlationId);
      }
      const autodetectedRegionName = await invokeAsync(this.regionDiscovery.detectRegion.bind(this.regionDiscovery), RegionDiscoveryDetectRegion, this.logger, this.performanceClient, this.correlationId)(this.authorityOptions.azureRegionConfiguration?.environmentRegion, this.regionDiscoveryMetadata);
      if (autodetectedRegionName) {
        this.regionDiscoveryMetadata.region_outcome = RegionDiscoveryOutcomes.AUTO_DETECTION_REQUESTED_SUCCESSFUL;
        this.regionDiscoveryMetadata.region_used = autodetectedRegionName;
        return _Authority.replaceWithRegionalInformation(metadata, autodetectedRegionName, this.correlationId);
      }
      this.regionDiscoveryMetadata.region_outcome = RegionDiscoveryOutcomes.AUTO_DETECTION_REQUESTED_FAILED;
    }
    return metadata;
  }
  /**
   * Updates the AuthorityMetadataEntity with new aliases, preferred_network and preferred_cache
   * and returns where the information was retrieved from
   * @param metadataEntity
   * @returns AuthorityMetadataSource
   */
  async updateCloudDiscoveryMetadata(metadataEntity) {
    const localMetadataSource = this.updateCloudDiscoveryMetadataFromLocalSources(metadataEntity);
    if (localMetadataSource) {
      return localMetadataSource;
    }
    const metadata = await invokeAsync(this.getCloudDiscoveryMetadataFromNetwork.bind(this), AuthorityGetCloudDiscoveryMetadataFromNetwork, this.logger, this.performanceClient, this.correlationId)();
    if (metadata) {
      updateCloudDiscoveryMetadata(metadataEntity, metadata, true);
      return AuthorityMetadataSource.NETWORK;
    }
    throw createClientConfigurationError(untrustedAuthority, this.correlationId);
  }
  updateCloudDiscoveryMetadataFromLocalSources(metadataEntity) {
    this.logger.verbose("Attempting to get cloud discovery metadata from authority configuration", this.correlationId);
    this.logger.verbosePii(`Known Authorities: '${this.authorityOptions.knownAuthorities || NOT_APPLICABLE}'`, this.correlationId);
    this.logger.verbosePii(`Authority Metadata: '${this.authorityOptions.authorityMetadata || NOT_APPLICABLE}'`, this.correlationId);
    this.logger.verbosePii(`Canonical Authority: '${metadataEntity.canonical_authority || NOT_APPLICABLE}'`, this.correlationId);
    const metadata = this.getCloudDiscoveryMetadataFromConfig();
    if (metadata) {
      this.logger.verbose("Found cloud discovery metadata in authority configuration", this.correlationId);
      updateCloudDiscoveryMetadata(metadataEntity, metadata, false);
      return AuthorityMetadataSource.CONFIG;
    }
    this.logger.verbose("Did not find cloud discovery metadata in the config... Attempting to get cloud discovery metadata from the hardcoded values.", this.correlationId);
    const hardcodedMetadata = getCloudDiscoveryMetadataFromHardcodedValues(this.hostnameAndPort);
    if (hardcodedMetadata) {
      this.logger.verbose("Found cloud discovery metadata from hardcoded values.", this.correlationId);
      updateCloudDiscoveryMetadata(metadataEntity, hardcodedMetadata, false);
      return AuthorityMetadataSource.HARDCODED_VALUES;
    }
    this.logger.verbose("Did not find cloud discovery metadata in hardcoded values... Attempting to get cloud discovery metadata from the network metadata cache.", this.correlationId);
    const metadataEntityExpired = isAuthorityMetadataExpired(metadataEntity);
    if (this.isAuthoritySameType(metadataEntity) && metadataEntity.aliasesFromNetwork && !metadataEntityExpired) {
      this.logger.verbose("Found cloud discovery metadata in the cache.", "");
      return AuthorityMetadataSource.CACHE;
    } else if (metadataEntityExpired) {
      this.logger.verbose("The metadata entity is expired.", "");
    }
    return null;
  }
  /**
   * Parse cloudDiscoveryMetadata config or check knownAuthorities
   */
  getCloudDiscoveryMetadataFromConfig() {
    if (this.authorityType === AuthorityType.Ciam) {
      this.logger.verbose("CIAM authorities do not support cloud discovery metadata, generate the aliases from authority host.", this.correlationId);
      return _Authority.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort);
    }
    if (this.authorityOptions.cloudDiscoveryMetadata) {
      this.logger.verbose("The cloud discovery metadata has been provided as a network response, in the config.", this.correlationId);
      try {
        this.logger.verbose("Attempting to parse the cloud discovery metadata.", this.correlationId);
        const parsedResponse = JSON.parse(this.authorityOptions.cloudDiscoveryMetadata);
        const metadata = getCloudDiscoveryMetadataFromNetworkResponse(parsedResponse.metadata, this.hostnameAndPort);
        this.logger.verbose("Parsed the cloud discovery metadata.", "");
        if (metadata) {
          this.logger.verbose("There is returnable metadata attached to the parsed cloud discovery metadata.", this.correlationId);
          return metadata;
        } else {
          this.logger.verbose("There is no metadata attached to the parsed cloud discovery metadata.", this.correlationId);
        }
      } catch (e) {
        this.logger.verbose("Unable to parse the cloud discovery metadata. Throwing Invalid Cloud Discovery Metadata Error.", this.correlationId);
        throw createClientConfigurationError(invalidCloudDiscoveryMetadata, this.correlationId);
      }
    }
    if (this.isInKnownAuthorities(this.hostnameAndPort)) {
      this.logger.verbose("The host is included in knownAuthorities. Creating new cloud discovery metadata from the host.", this.correlationId);
      return _Authority.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort);
    }
    return null;
  }
  /**
   * Called to get metadata from network if CloudDiscoveryMetadata was not populated by config
   *
   * @param hasHardcodedMetadata boolean
   */
  async getCloudDiscoveryMetadataFromNetwork() {
    const instanceDiscoveryEndpoint = `${AAD_INSTANCE_DISCOVERY_ENDPT}${this.canonicalAuthority}oauth2/v2.0/authorize`;
    const options = {};
    let match = null;
    try {
      const response = await this.networkInterface.sendGetRequestAsync(instanceDiscoveryEndpoint, options);
      let typedResponseBody;
      let metadata;
      if (isCloudInstanceDiscoveryResponse(response.body)) {
        typedResponseBody = response.body;
        metadata = typedResponseBody.metadata;
        this.logger.verbosePii(`tenant_discovery_endpoint is: '${typedResponseBody.tenant_discovery_endpoint}'`, this.correlationId);
      } else if (isCloudInstanceDiscoveryErrorResponse(response.body)) {
        this.logger.warning(`A CloudInstanceDiscoveryErrorResponse was returned. The cloud instance discovery network request's status code is: '${response.status}'`, this.correlationId);
        typedResponseBody = response.body;
        if (typedResponseBody.error === INVALID_INSTANCE) {
          this.logger.error("The CloudInstanceDiscoveryErrorResponse error is invalid_instance.", this.correlationId);
          return null;
        }
        this.logger.warning(`The CloudInstanceDiscoveryErrorResponse error is '${typedResponseBody.error}'`, this.correlationId);
        this.logger.warning(`The CloudInstanceDiscoveryErrorResponse error description is '${typedResponseBody.error_description}'`, this.correlationId);
        this.logger.warning("Setting the value of the CloudInstanceDiscoveryMetadata (returned from the network, correlationId) to []", this.correlationId);
        metadata = [];
      } else {
        this.logger.error("AAD did not return a CloudInstanceDiscoveryResponse or CloudInstanceDiscoveryErrorResponse", this.correlationId);
        return null;
      }
      this.logger.verbose("Attempting to find a match between the developer's authority and the CloudInstanceDiscoveryMetadata returned from the network request.", this.correlationId);
      match = getCloudDiscoveryMetadataFromNetworkResponse(metadata, this.hostnameAndPort);
    } catch (error) {
      if (error instanceof AuthError2) {
        this.logger.error(`There was a network error while attempting to get the cloud discovery instance metadata.
Error: '${error.errorCode}'
Error Description: '${error.errorMessage}'`, this.correlationId);
      } else {
        const typedError = error;
        this.logger.error(`A non-MSALJS error was thrown while attempting to get the cloud instance discovery metadata.
Error: '${typedError.name}'
Error Description: '${typedError.message}'`, this.correlationId);
      }
      return null;
    }
    if (!match) {
      this.logger.warning("The developer's authority was not found within the CloudInstanceDiscoveryMetadata returned from the network request.", this.correlationId);
      this.logger.verbose("Creating custom Authority for custom domain scenario.", this.correlationId);
      match = _Authority.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort);
    }
    return match;
  }
  /**
   * Helper function to determine if a host is included in the knownAuthorities config option.
   */
  isInKnownAuthorities(host) {
    const normalizedHost = host.toLowerCase();
    const matches = this.authorityOptions.knownAuthorities.filter((authority) => {
      return authority && UrlString.getDomainFromUrl(authority, this.correlationId).toLowerCase() === normalizedHost;
    });
    return matches.length > 0;
  }
  /**
   * helper function to populate the authority based on azureCloudOptions
   * @param authorityString
   * @param azureCloudOptions
   */
  static generateAuthority(authorityString, azureCloudOptions) {
    let authorityAzureCloudInstance;
    if (azureCloudOptions && azureCloudOptions.azureCloudInstance !== AzureCloudInstance.None) {
      const tenant = azureCloudOptions.tenant ? azureCloudOptions.tenant : DEFAULT_COMMON_TENANT;
      authorityAzureCloudInstance = `${azureCloudOptions.azureCloudInstance}/${tenant}/`;
    }
    return authorityAzureCloudInstance ? authorityAzureCloudInstance : authorityString;
  }
  /**
   * Creates cloud discovery metadata object from a given host
   * @param host
   */
  static createCloudDiscoveryMetadataFromHost(host) {
    return {
      preferred_network: host,
      preferred_cache: host,
      aliases: [host]
    };
  }
  /**
   * helper function to generate environment from authority object
   */
  getPreferredCache() {
    if (this.managedIdentity) {
      return DEFAULT_AUTHORITY_HOST;
    } else if (this.discoveryComplete()) {
      return this.metadata.preferred_cache;
    } else {
      throw createClientAuthError(endpointResolutionError, this.correlationId);
    }
  }
  /**
   * Returns whether or not the provided host is an alias of this authority instance
   * @param host
   */
  isAlias(host) {
    return this.metadata.aliases.indexOf(host) > -1;
  }
  /**
   * Returns whether or not the provided host is an alias of a known Microsoft authority for purposes of endpoint discovery
   * @param host
   */
  isAliasOfKnownMicrosoftAuthority(host) {
    return InstanceDiscoveryMetadataAliases.has(host);
  }
  /**
   * Validates the `issuer` returned by an OIDC discovery document against
   * this authority, per
   * https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfigurationValidation
   *
   * The issuer is accepted when ANY of the following holds:
   *  1. The issuer scheme + host + port match the authority's (path may
   *     differ). Applies to all authorities.
   *  2. The authority is a Microsoft cloud authority (public, sovereign,
   *     or CIAM), the issuer is HTTPS, and the issuer host is in the known
   *     Microsoft authority host set.
   *  3. Same as (2), but the issuer host is a single-label regional variant
   *     of a known Microsoft host (e.g. `westus.login.microsoftonline.com`).
   *  4. Same as (2), but the issuer host matches the CIAM tenant pattern
   *     `{tenant}.ciamlogin.com` with an optional `/{tenant}[.onmicrosoft.com][/v2.0]`
   *     path.
   *  5. The issuer host is HTTPS and is explicitly listed in the
   *     developer-configured `knownAuthorities`. This covers scenarios where
   *     the OIDC discovery document returns an issuer host that differs from
   *     the authority (e.g., a GUID-based issuer for a name-based CIAM authority).
   *
   * @param issuer The `issuer` value returned in the OIDC discovery document.
   * @throws ClientConfigurationError("issuer_validation_failed") on failure.
   */
  validateIssuer(issuer) {
    if (!issuer) {
      throw createClientConfigurationError(issuerValidationFailed, this.correlationId);
    }
    let issuerUrl;
    try {
      issuerUrl = new URL(issuer);
    } catch {
      throw createClientConfigurationError(issuerValidationFailed, this.correlationId);
    }
    const issuerScheme = issuerUrl.protocol;
    const issuerHost = issuerUrl.host;
    const authorityScheme = (this.canonicalAuthorityUrlComponents.Protocol || "").toLowerCase();
    const authorityHost = (this.canonicalAuthorityUrlComponents.HostNameAndPort || "").toLowerCase();
    const matchesAuthorityOrigin = this.matchesAuthorityOrigin(issuerScheme, issuerHost, authorityScheme, authorityHost);
    const matchesKnownMicrosoftHost = issuerScheme === "https:" && this.isAliasOfKnownMicrosoftAuthority(issuerHost);
    const matchesRegionalMicrosoftHost = issuerScheme === "https:" && this.matchesRegionalMicrosoftHost(issuerHost);
    const matchesCiamTenantPattern = this.matchesCiamTenantPattern(issuerUrl, authorityHost, this.canonicalAuthorityUrlComponents.PathSegments);
    const matchesKnownAuthority = issuerScheme === "https:" && this.isInKnownAuthorities(issuerHost);
    if (matchesAuthorityOrigin || matchesKnownMicrosoftHost || matchesRegionalMicrosoftHost || matchesCiamTenantPattern || matchesKnownAuthority) {
      return;
    }
    throw createClientConfigurationError(issuerValidationFailed, this.correlationId);
  }
  /**
   * Rule 1: The issuer scheme + host (and port) match the authority's. Path
   * may differ. Applies to all authorities.
   */
  matchesAuthorityOrigin(issuerScheme, issuerHost, authorityScheme, authorityHost) {
    return issuerScheme === authorityScheme && issuerHost === authorityHost;
  }
  /**
   * Rule 3: The issuer host is a regional variant
   * (`{region}.{host}`) of a known Microsoft authority host.
   * E.g. `westus2.login.microsoft.com`.
   */
  matchesRegionalMicrosoftHost(issuerHost) {
    const firstDot = issuerHost.indexOf(".");
    if (firstDot > 0 && firstDot < issuerHost.length - 1) {
      const hostWithoutRegion = issuerHost.substring(firstDot + 1);
      return this.isAliasOfKnownMicrosoftAuthority(hostWithoutRegion);
    }
    return false;
  }
  /**
   * Rule 4: The issuer matches one of the well-known CIAM tenant patterns
   * (`https://{tenant}.ciamlogin.com[/{tenant}[.onmicrosoft.com][/v2.0]]`).
   *
   * The bare tenant name is extracted from the authority's first path segment
   * when available (stripping the `.onmicrosoft.com` suffix that
   * `transformCIAMAuthority` adds), or otherwise from the leftmost label of
   * the authority host (to support CIAM custom domain scenarios).
   *
   * Both `/{tenant}` and `/{tenant}.onmicrosoft.com` path forms are accepted
   * because the OIDC issuer may use either form depending on the authority URL
   * that was used to trigger discovery.
   */
  matchesCiamTenantPattern(issuerUrl, authorityHost, authorityPathSegments) {
    const pathSegment = authorityPathSegments[0];
    const tenantName = pathSegment ? pathSegment.endsWith(AAD_TENANT_DOMAIN_SUFFIX) ? pathSegment.slice(0, -AAD_TENANT_DOMAIN_SUFFIX.length) : pathSegment : authorityHost.split(".")[0];
    if (!tenantName) {
      return false;
    }
    const ciamBaseURL = `https://${tenantName}${CIAM_AUTH_URL}`;
    const validCiamPatterns = [
      ciamBaseURL,
      `${ciamBaseURL}/${tenantName}`,
      `${ciamBaseURL}/${tenantName}/v2.0`,
      `${ciamBaseURL}/${tenantName}${AAD_TENANT_DOMAIN_SUFFIX}`,
      `${ciamBaseURL}/${tenantName}${AAD_TENANT_DOMAIN_SUFFIX}/v2.0`
      // https://{tenant}.ciamlogin.com/{tenant}.onmicrosoft.com/v2.0
    ];
    const issuerPath = issuerUrl.pathname.replace(/\/+$/, "");
    const normalizedIssuer = `${issuerUrl.protocol}//${issuerUrl.host}${issuerPath}`;
    return validCiamPatterns.some((pattern) => pattern === normalizedIssuer);
  }
  /**
   * Checks whether the provided host is that of a public cloud authority
   *
   * @param authority string
   * @returns bool
   */
  static isPublicCloudAuthority(host) {
    return KNOWN_PUBLIC_CLOUDS.indexOf(host) >= 0;
  }
  /**
   * Rebuild the authority string with the region
   *
   * @param host string
   * @param region string
   */
  static buildRegionalAuthorityString(host, region, correlationId, queryString) {
    const authorityUrlInstance = new UrlString(host, correlationId);
    authorityUrlInstance.validateAsUri();
    const authorityUrlParts = authorityUrlInstance.getUrlComponents();
    let hostNameAndPort = `${region}.${authorityUrlParts.HostNameAndPort}`;
    if (this.isPublicCloudAuthority(authorityUrlParts.HostNameAndPort)) {
      hostNameAndPort = `${region}.${REGIONAL_AUTH_PUBLIC_CLOUD_SUFFIX}`;
    }
    const url = UrlString.constructAuthorityUriFromObject({
      ...authorityUrlInstance.getUrlComponents(),
      HostNameAndPort: hostNameAndPort
    }, correlationId).urlString;
    if (queryString)
      return `${url}?${queryString}`;
    return url;
  }
  /**
   * Replace the endpoints in the metadata object with their regional equivalents.
   *
   * @param metadata OpenIdConfigResponse
   * @param azureRegion string
   */
  static replaceWithRegionalInformation(metadata, azureRegion, correlationId) {
    const regionalMetadata = { ...metadata };
    regionalMetadata.authorization_endpoint = _Authority.buildRegionalAuthorityString(regionalMetadata.authorization_endpoint, azureRegion, correlationId);
    regionalMetadata.token_endpoint = _Authority.buildRegionalAuthorityString(regionalMetadata.token_endpoint, azureRegion, correlationId);
    if (regionalMetadata.end_session_endpoint) {
      regionalMetadata.end_session_endpoint = _Authority.buildRegionalAuthorityString(regionalMetadata.end_session_endpoint, azureRegion, correlationId);
    }
    return regionalMetadata;
  }
  /**
   * Transform CIAM_AUTHORIY as per the below rules:
   * If no path segments found and it is a CIAM authority (hostname ends with .ciamlogin.com), then transform it
   *
   * NOTE: The transformation path should go away once STS supports CIAM with the format: `tenantIdorDomain.ciamlogin.com`
   * `ciamlogin.com` can also change in the future and we should accommodate the same
   *
   * @param authority
   */
  static transformCIAMAuthority(authority, correlationId) {
    let ciamAuthority = authority;
    const authorityUrl = new UrlString(authority, correlationId);
    const authorityUrlComponents = authorityUrl.getUrlComponents();
    if (authorityUrlComponents.PathSegments.length === 0 && authorityUrlComponents.HostNameAndPort.endsWith(CIAM_AUTH_URL)) {
      const tenantIdOrDomain = authorityUrlComponents.HostNameAndPort.split(".")[0];
      ciamAuthority = `${ciamAuthority}${tenantIdOrDomain}${AAD_TENANT_DOMAIN_SUFFIX}`;
    }
    return ciamAuthority;
  }
};
Authority.reservedTenantDomains = /* @__PURE__ */ new Set([
  "{tenant}",
  "{tenantid}",
  AADAuthority.COMMON,
  AADAuthority.CONSUMERS,
  AADAuthority.ORGANIZATIONS
]);
function getTenantFromAuthorityString(authority, correlationId) {
  const authorityUrl = new UrlString(authority, correlationId);
  const authorityUrlComponents = authorityUrl.getUrlComponents();
  const tenantId = authorityUrlComponents.PathSegments.slice(-1)[0]?.toLowerCase();
  switch (tenantId) {
    case AADAuthority.COMMON:
    case AADAuthority.ORGANIZATIONS:
    case AADAuthority.CONSUMERS:
      return void 0;
    default:
      return tenantId;
  }
}
function formatAuthorityUri(authorityUri) {
  return authorityUri.endsWith(FORWARD_SLASH) ? authorityUri : `${authorityUri}${FORWARD_SLASH}`;
}
function buildStaticAuthorityOptions(authOptions) {
  const rawCloudDiscoveryMetadata = authOptions.cloudDiscoveryMetadata;
  let cloudDiscoveryMetadata = void 0;
  if (rawCloudDiscoveryMetadata) {
    try {
      cloudDiscoveryMetadata = JSON.parse(rawCloudDiscoveryMetadata);
    } catch (e) {
      throw createClientConfigurationError(invalidCloudDiscoveryMetadata, "");
    }
  }
  return {
    canonicalAuthority: authOptions.authority ? formatAuthorityUri(authOptions.authority) : void 0,
    knownAuthorities: authOptions.knownAuthorities,
    cloudDiscoveryMetadata
  };
}

// ../../node_modules/@azure/msal-common/dist/authority/AuthorityFactory.mjs
var AuthorityFactory_exports = {};
__export(AuthorityFactory_exports, {
  createDiscoveredInstance: () => createDiscoveredInstance
});
async function createDiscoveredInstance(authorityUri, networkClient, cacheManager, authorityOptions, logger27, correlationId, performanceClient) {
  const authorityUriFinal = Authority.transformCIAMAuthority(formatAuthorityUri(authorityUri), correlationId);
  const acquireTokenAuthority = new Authority(authorityUriFinal, networkClient, cacheManager, authorityOptions, logger27, correlationId, performanceClient);
  try {
    await invokeAsync(acquireTokenAuthority.resolveEndpointsAsync.bind(acquireTokenAuthority), AuthorityResolveEndpointsAsync, logger27, performanceClient, correlationId)();
    return acquireTokenAuthority;
  } catch (e) {
    throw createClientAuthError(endpointResolutionError, correlationId);
  }
}

// ../../node_modules/@azure/msal-common/dist/request/RequestParameterBuilder.mjs
var RequestParameterBuilder_exports = {};
__export(RequestParameterBuilder_exports, {
  addApplicationTelemetry: () => addApplicationTelemetry,
  addAuthorizationCode: () => addAuthorizationCode,
  addBrokerParameters: () => addBrokerParameters,
  addCcsOid: () => addCcsOid,
  addCcsUpn: () => addCcsUpn,
  addClaims: () => addClaims,
  addCliData: () => addCliData,
  addClientAssertion: () => addClientAssertion,
  addClientAssertionType: () => addClientAssertionType,
  addClientId: () => addClientId,
  addClientInfo: () => addClientInfo,
  addClientSecret: () => addClientSecret,
  addCodeChallengeParams: () => addCodeChallengeParams,
  addCodeVerifier: () => addCodeVerifier,
  addCorrelationId: () => addCorrelationId,
  addDeviceCode: () => addDeviceCode,
  addDomainHint: () => addDomainHint,
  addEARParameters: () => addEARParameters,
  addExtraParameters: () => addExtraParameters,
  addGrantType: () => addGrantType,
  addIdTokenHint: () => addIdTokenHint,
  addInstanceAware: () => addInstanceAware,
  addLibraryInfo: () => addLibraryInfo,
  addLoginHint: () => addLoginHint,
  addLogoutHint: () => addLogoutHint,
  addNativeBroker: () => addNativeBroker,
  addNonce: () => addNonce,
  addOboAssertion: () => addOboAssertion,
  addPassword: () => addPassword,
  addPopToken: () => addPopToken,
  addPostLogoutRedirectUri: () => addPostLogoutRedirectUri,
  addPrompt: () => addPrompt,
  addRedirectUri: () => addRedirectUri,
  addRefreshToken: () => addRefreshToken,
  addRequestTokenUse: () => addRequestTokenUse,
  addResource: () => addResource,
  addResponseMode: () => addResponseMode,
  addResponseType: () => addResponseType,
  addScopes: () => addScopes,
  addServerTelemetry: () => addServerTelemetry,
  addSid: () => addSid,
  addSshJwk: () => addSshJwk,
  addState: () => addState,
  addThrottling: () => addThrottling,
  addUsername: () => addUsername,
  buildMergedClaims: () => buildMergedClaims,
  instrumentBrokerParams: () => instrumentBrokerParams
});

// ../../node_modules/@azure/msal-common/dist/request/ScopeSet.mjs
var ScopeSet = class _ScopeSet {
  constructor(inputScopes, correlationId) {
    this.correlationId = correlationId;
    const scopeArr = inputScopes ? StringUtils.trimArrayEntries([...inputScopes]) : [];
    const filteredInput = scopeArr ? StringUtils.removeEmptyStringsFromArray(scopeArr) : [];
    if (!filteredInput || !filteredInput.length) {
      throw createClientConfigurationError(emptyInputScopesError, correlationId);
    }
    this.scopes = /* @__PURE__ */ new Set();
    filteredInput.forEach((scope) => this.scopes.add(scope));
  }
  /**
   * Factory method to create ScopeSet from space-delimited string
   * @param inputScopeString
   * @param appClientId
   * @param scopesRequired
   */
  static fromString(inputScopeString, correlationId) {
    const scopeString = inputScopeString || "";
    const inputScopes = scopeString.split(" ");
    return new _ScopeSet(inputScopes, correlationId);
  }
  /**
   * Creates the set of scopes to search for in cache lookups
   * @param inputScopeString
   * @returns
   */
  static createSearchScopes(inputScopeString, correlationId) {
    const scopesToUse = inputScopeString && inputScopeString.length > 0 ? inputScopeString : [...OIDC_DEFAULT_SCOPES];
    const scopeSet = new _ScopeSet(scopesToUse, correlationId);
    if (!scopeSet.containsOnlyOIDCScopes()) {
      scopeSet.removeOIDCScopes();
    } else {
      scopeSet.removeScope(OFFLINE_ACCESS_SCOPE);
    }
    return scopeSet;
  }
  /**
   * Check if a given scope is present in this set of scopes.
   * @param scope
   */
  containsScope(scope) {
    const lowerCaseScopes = this.printScopesLowerCase().split(" ");
    const lowerCaseScopesSet = new _ScopeSet(lowerCaseScopes, this.correlationId);
    return scope ? lowerCaseScopesSet.scopes.has(scope.toLowerCase()) : false;
  }
  /**
   * Check if a set of scopes is present in this set of scopes.
   * @param scopeSet
   */
  containsScopeSet(scopeSet) {
    if (!scopeSet || scopeSet.scopes.size <= 0) {
      return false;
    }
    return this.scopes.size >= scopeSet.scopes.size && scopeSet.asArray().every((scope) => this.containsScope(scope));
  }
  /**
   * Check if set of scopes contains only the defaults
   */
  containsOnlyOIDCScopes() {
    let defaultScopeCount = 0;
    OIDC_SCOPES.forEach((defaultScope) => {
      if (this.containsScope(defaultScope)) {
        defaultScopeCount += 1;
      }
    });
    return this.scopes.size === defaultScopeCount;
  }
  /**
   * Appends single scope if passed
   * @param newScope
   */
  appendScope(newScope) {
    if (newScope) {
      this.scopes.add(newScope.trim());
    }
  }
  /**
   * Appends multiple scopes if passed
   * @param newScopes
   */
  appendScopes(newScopes) {
    try {
      newScopes.forEach((newScope) => this.appendScope(newScope));
    } catch (e) {
      throw createClientAuthError(cannotAppendScopeSet, this.correlationId);
    }
  }
  /**
   * Removes element from set of scopes.
   * @param scope
   */
  removeScope(scope) {
    if (!scope) {
      throw createClientAuthError(cannotRemoveEmptyScope, this.correlationId);
    }
    this.scopes.delete(scope.trim());
  }
  /**
   * Removes default scopes from set of scopes
   * Primarily used to prevent cache misses if the default scopes are not returned from the server
   */
  removeOIDCScopes() {
    OIDC_SCOPES.forEach((defaultScope) => {
      this.scopes.delete(defaultScope);
    });
  }
  /**
   * Combines an array of scopes with the current set of scopes.
   * @param otherScopes
   */
  unionScopeSets(otherScopes) {
    if (!otherScopes) {
      throw createClientAuthError(emptyInputScopeSet, this.correlationId);
    }
    const unionScopes = /* @__PURE__ */ new Set();
    otherScopes.scopes.forEach((scope) => unionScopes.add(scope.toLowerCase()));
    this.scopes.forEach((scope) => unionScopes.add(scope.toLowerCase()));
    return unionScopes;
  }
  /**
   * Check if scopes intersect between this set and another.
   * @param otherScopes
   */
  intersectingScopeSets(otherScopes) {
    if (!otherScopes) {
      throw createClientAuthError(emptyInputScopeSet, this.correlationId);
    }
    if (!otherScopes.containsOnlyOIDCScopes()) {
      otherScopes.removeOIDCScopes();
    }
    const unionScopes = this.unionScopeSets(otherScopes);
    const sizeOtherScopes = otherScopes.getScopeCount();
    const sizeThisScopes = this.getScopeCount();
    const sizeUnionScopes = unionScopes.size;
    return sizeUnionScopes < sizeThisScopes + sizeOtherScopes;
  }
  /**
   * Returns size of set of scopes.
   */
  getScopeCount() {
    return this.scopes.size;
  }
  /**
   * Returns the scopes as an array of string values
   */
  asArray() {
    const array = [];
    this.scopes.forEach((val) => array.push(val));
    return array;
  }
  /**
   * Prints scopes into a space-delimited string
   */
  printScopes() {
    if (this.scopes) {
      const scopeArr = this.asArray();
      return scopeArr.join(" ");
    }
    return "";
  }
  /**
   * Prints scopes into a space-delimited lower-case string (used for caching)
   */
  printScopesLowerCase() {
    return this.printScopes().toLowerCase();
  }
};

// ../../node_modules/@azure/msal-common/dist/request/RequestParameterBuilder.mjs
function instrumentBrokerParams(parameters, correlationId, performanceClient) {
  if (!correlationId) {
    return;
  }
  const clientId = parameters.get(CLIENT_ID);
  if (clientId && parameters.has(BROKER_CLIENT_ID)) {
    performanceClient?.addFields({
      embeddedClientId: clientId,
      embeddedRedirectUri: parameters.get(REDIRECT_URI)
    }, correlationId);
  }
}
function addResponseType(parameters, responseType) {
  parameters.set(RESPONSE_TYPE, responseType);
}
function addResponseMode(parameters, responseMode) {
  parameters.set(RESPONSE_MODE, responseMode ? responseMode : ResponseMode.QUERY);
}
function addNativeBroker(parameters) {
  parameters.set(NATIVE_BROKER, "1");
}
function addScopes(parameters, scopes, correlationId, addOidcScopes = true, defaultScopes = OIDC_DEFAULT_SCOPES) {
  if (addOidcScopes && !defaultScopes.includes("openid") && !scopes.includes("openid")) {
    defaultScopes.push("openid");
  }
  const requestScopes = addOidcScopes ? [...scopes || [], ...defaultScopes] : scopes || [];
  const scopeSet = new ScopeSet(requestScopes, correlationId);
  parameters.set(SCOPE, scopeSet.printScopes());
}
function addClientId(parameters, clientId) {
  parameters.set(CLIENT_ID, clientId);
}
function addRedirectUri(parameters, redirectUri) {
  parameters.set(REDIRECT_URI, redirectUri);
}
function addPostLogoutRedirectUri(parameters, redirectUri) {
  parameters.set(POST_LOGOUT_URI, redirectUri);
}
function addIdTokenHint(parameters, idTokenHint) {
  parameters.set(ID_TOKEN_HINT, idTokenHint);
}
function addDomainHint(parameters, domainHint) {
  parameters.set(DOMAIN_HINT, domainHint);
}
function addLoginHint(parameters, loginHint) {
  parameters.set(LOGIN_HINT, loginHint);
}
function addCcsUpn(parameters, loginHint) {
  parameters.set(HeaderNames.CCS_HEADER, `UPN:${loginHint}`);
}
function addCcsOid(parameters, clientInfo) {
  parameters.set(HeaderNames.CCS_HEADER, `Oid:${clientInfo.uid}@${clientInfo.utid}`);
}
function addSid(parameters, sid) {
  parameters.set(SID, sid);
}
function addClaims(parameters, correlationId, claims, clientCapabilities, skipBrokerClaims) {
  const configClaims = skipBrokerClaims && parameters.has(BROKER_CLIENT_ID) ? void 0 : clientCapabilities;
  const mergedClaims = buildMergedClaims(claims, configClaims, correlationId);
  parameters.set(CLAIMS, mergedClaims);
}
function addCorrelationId(parameters, correlationId) {
  parameters.set(CLIENT_REQUEST_ID, correlationId);
}
function addLibraryInfo(parameters, libraryInfo) {
  parameters.set(X_CLIENT_SKU, libraryInfo.sku);
  parameters.set(X_CLIENT_VER, libraryInfo.version);
  if (libraryInfo.os) {
    parameters.set(X_CLIENT_OS, libraryInfo.os);
  }
  if (libraryInfo.cpu) {
    parameters.set(X_CLIENT_CPU, libraryInfo.cpu);
  }
}
function addApplicationTelemetry(parameters, appTelemetry) {
  if (appTelemetry?.appName) {
    parameters.set(X_APP_NAME, appTelemetry.appName);
  }
  if (appTelemetry?.appVersion) {
    parameters.set(X_APP_VER, appTelemetry.appVersion);
  }
}
function addPrompt(parameters, prompt) {
  parameters.set(PROMPT, prompt);
}
function addState(parameters, state3) {
  if (state3) {
    parameters.set(STATE, state3);
  }
}
function addNonce(parameters, nonce) {
  parameters.set(NONCE, nonce);
}
function addCodeChallengeParams(parameters, codeChallenge, codeChallengeMethod) {
  if (codeChallenge && codeChallengeMethod) {
    parameters.set(CODE_CHALLENGE, codeChallenge);
    parameters.set(CODE_CHALLENGE_METHOD, codeChallengeMethod);
  } else {
    throw createClientConfigurationError(pkceParamsMissing, "");
  }
}
function addAuthorizationCode(parameters, code) {
  parameters.set(CODE, code);
}
function addDeviceCode(parameters, code) {
  parameters.set(DEVICE_CODE, code);
}
function addRefreshToken(parameters, refreshToken) {
  parameters.set(REFRESH_TOKEN, refreshToken);
}
function addCodeVerifier(parameters, codeVerifier) {
  parameters.set(CODE_VERIFIER, codeVerifier);
}
function addClientSecret(parameters, clientSecret) {
  parameters.set(CLIENT_SECRET, clientSecret);
}
function addClientAssertion(parameters, clientAssertion) {
  if (clientAssertion) {
    parameters.set(CLIENT_ASSERTION, clientAssertion);
  }
}
function addClientAssertionType(parameters, clientAssertionType) {
  if (clientAssertionType) {
    parameters.set(CLIENT_ASSERTION_TYPE, clientAssertionType);
  }
}
function addOboAssertion(parameters, oboAssertion) {
  parameters.set(OBO_ASSERTION, oboAssertion);
}
function addRequestTokenUse(parameters, tokenUse) {
  parameters.set(REQUESTED_TOKEN_USE, tokenUse);
}
function addGrantType(parameters, grantType) {
  parameters.set(GRANT_TYPE, grantType);
}
function addClientInfo(parameters) {
  parameters.set(CLIENT_INFO2, "1");
}
function addCliData(parameters) {
  parameters.set(CLI_DATA, "1");
}
function addInstanceAware(parameters) {
  if (!parameters.has(INSTANCE_AWARE)) {
    parameters.set(INSTANCE_AWARE, "true");
  }
}
function addExtraParameters(parameters, extraParams) {
  Object.entries(extraParams).forEach(([key, value]) => {
    if (!parameters.has(key) && value) {
      parameters.set(key, value);
    }
  });
}
var DEFAULT_ID_TOKEN_CLAIMS = {
  [ClaimsRequestKeys.SIGNIN_STATE]: { essential: false },
  [ClaimsRequestKeys.LOGIN_HINT]: { essential: false }
};
function buildMergedClaims(claims, clientCapabilities, correlationId = "") {
  let mergedClaims;
  if (!claims) {
    mergedClaims = {};
  } else {
    try {
      const parsed = JSON.parse(claims);
      if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
        throw new Error("Claims must be a JSON object");
      }
      mergedClaims = parsed;
    } catch (e) {
      throw createClientConfigurationError(invalidClaims, correlationId);
    }
  }
  if (!Object.prototype.hasOwnProperty.call(mergedClaims, ClaimsRequestKeys.ID_TOKEN)) {
    mergedClaims[ClaimsRequestKeys.ID_TOKEN] = {};
  }
  const idTokenClaims = mergedClaims[ClaimsRequestKeys.ID_TOKEN];
  for (const [key, value] of Object.entries(DEFAULT_ID_TOKEN_CLAIMS)) {
    if (!(key in idTokenClaims)) {
      idTokenClaims[key] = value;
    }
  }
  if (clientCapabilities && clientCapabilities.length > 0) {
    if (!Object.prototype.hasOwnProperty.call(mergedClaims, ClaimsRequestKeys.ACCESS_TOKEN)) {
      mergedClaims[ClaimsRequestKeys.ACCESS_TOKEN] = {};
    }
    mergedClaims[ClaimsRequestKeys.ACCESS_TOKEN][ClaimsRequestKeys.XMS_CC] = {
      values: clientCapabilities
    };
  }
  return JSON.stringify(mergedClaims);
}
function addUsername(parameters, username) {
  parameters.set(PasswordGrantConstants.username, username);
}
function addPassword(parameters, password) {
  parameters.set(PasswordGrantConstants.password, password);
}
function addPopToken(parameters, cnfString) {
  if (cnfString) {
    parameters.set(TOKEN_TYPE, AuthenticationScheme.POP);
    parameters.set(REQ_CNF, cnfString);
  }
}
function addSshJwk(parameters, sshJwkString) {
  if (sshJwkString) {
    parameters.set(TOKEN_TYPE, AuthenticationScheme.SSH);
    parameters.set(REQ_CNF, sshJwkString);
  }
}
function addServerTelemetry(parameters, serverTelemetryManager) {
  parameters.set(X_CLIENT_CURR_TELEM, serverTelemetryManager.generateCurrentRequestHeaderValue());
  parameters.set(X_CLIENT_LAST_TELEM, serverTelemetryManager.generateLastRequestHeaderValue());
}
function addThrottling(parameters) {
  parameters.set(X_MS_LIB_CAPABILITY, X_MS_LIB_CAPABILITY_VALUE);
}
function addLogoutHint(parameters, logoutHint) {
  parameters.set(LOGOUT_HINT, logoutHint);
}
function addBrokerParameters(parameters, brokerClientId, brokerRedirectUri) {
  if (!parameters.has(BROKER_CLIENT_ID)) {
    parameters.set(BROKER_CLIENT_ID, brokerClientId);
  }
  if (!parameters.has(BROKER_REDIRECT_URI)) {
    parameters.set(BROKER_REDIRECT_URI, brokerRedirectUri);
  }
}
function addEARParameters(parameters, jwk) {
  parameters.set(EAR_JWK, encodeURIComponent(jwk));
  const jweCryptoB64Encoded = "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0";
  parameters.set(EAR_JWE_CRYPTO, jweCryptoB64Encoded);
}
function addResource(parameters, resource) {
  if (resource) {
    parameters.set(RESOURCE, resource);
  }
}

// ../../node_modules/@azure/msal-common/dist/utils/UrlUtils.mjs
var UrlUtils_exports = {};
__export(UrlUtils_exports, {
  getDeserializedResponse: () => getDeserializedResponse,
  mapToQueryString: () => mapToQueryString,
  normalizeUrlForComparison: () => normalizeUrlForComparison,
  stripLeadingHashOrQuery: () => stripLeadingHashOrQuery,
  validateUrl: () => validateUrl
});
function stripLeadingHashOrQuery(responseString) {
  if (responseString.startsWith("#/")) {
    return responseString.substring(2);
  } else if (responseString.startsWith("#") || responseString.startsWith("?")) {
    return responseString.substring(1);
  }
  return responseString;
}
function getDeserializedResponse(responseString) {
  if (!responseString || responseString.indexOf("=") < 0) {
    return null;
  }
  try {
    const normalizedResponse = stripLeadingHashOrQuery(responseString);
    const deserializedHash = Object.fromEntries(new URLSearchParams(normalizedResponse));
    if (deserializedHash.code || deserializedHash.ear_jwe || deserializedHash.error || deserializedHash.error_description || deserializedHash.state) {
      return deserializedHash;
    }
  } catch (e) {
    throw createClientAuthError(hashNotDeserialized, "");
  }
  return null;
}
function mapToQueryString(parameters) {
  const queryParameterArray = new Array();
  parameters.forEach((value, key) => {
    queryParameterArray.push(`${key}=${encodeURIComponent(value)}`);
  });
  return queryParameterArray.join("&");
}
function normalizeUrlForComparison(url, logger27, correlationId) {
  if (!url) {
    return url;
  }
  const urlWithoutHash = url.split("#")[0];
  if (!urlWithoutHash) {
    return urlWithoutHash;
  }
  try {
    const urlObj = new URL(urlWithoutHash);
    if (!urlObj.search) {
      urlObj.search = "";
    }
    let pathname;
    try {
      pathname = decodeURIComponent(urlObj.pathname);
    } catch (e) {
      pathname = urlObj.pathname;
    }
    if (!pathname.endsWith("/")) {
      pathname += "/";
    }
    urlObj.pathname = pathname;
    return urlObj.href;
  } catch (e) {
    logger27?.error(`Failed to normalize URL for comparison: '${e}'`, correlationId || "");
    throw createClientConfigurationError(urlParseError, correlationId || "");
  }
}
function validateUrl(url, logger27, correlationId) {
  try {
    new URL(url);
  } catch (e) {
    logger27?.error(`Failed to validate URL: '${e}'`, correlationId || "");
    throw createClientConfigurationError(urlParseError, correlationId || "");
  }
}

// ../../node_modules/@azure/msal-common/dist/crypto/ICrypto.mjs
var DEFAULT_CRYPTO_IMPLEMENTATION = {
  createNewGuid: () => {
    throw createClientAuthError(methodNotImplemented, "");
  },
  base64Decode: () => {
    throw createClientAuthError(methodNotImplemented, "");
  },
  base64Encode: () => {
    throw createClientAuthError(methodNotImplemented, "");
  },
  base64UrlEncode: () => {
    throw createClientAuthError(methodNotImplemented, "");
  },
  encodeKid: () => {
    throw createClientAuthError(methodNotImplemented, "");
  },
  async getPublicKeyThumbprint() {
    throw createClientAuthError(methodNotImplemented, "");
  },
  async removeTokenBindingKey() {
    throw createClientAuthError(methodNotImplemented, "");
  },
  async clearKeystore() {
    throw createClientAuthError(methodNotImplemented, "");
  },
  async signJwt() {
    throw createClientAuthError(methodNotImplemented, "");
  },
  async hashString() {
    throw createClientAuthError(methodNotImplemented, "");
  }
};

// ../../node_modules/@azure/msal-common/dist/logger/Logger.mjs
var LogLevel;
(function(LogLevel2) {
  LogLevel2[LogLevel2["Error"] = 0] = "Error";
  LogLevel2[LogLevel2["Warning"] = 1] = "Warning";
  LogLevel2[LogLevel2["Info"] = 2] = "Info";
  LogLevel2[LogLevel2["Verbose"] = 3] = "Verbose";
  LogLevel2[LogLevel2["Trace"] = 4] = "Trace";
})(LogLevel || (LogLevel = {}));
var CACHE_CAPACITY = 50;
var MAX_LOGS_PER_CORRELATION = 500;
var correlationCache = /* @__PURE__ */ new Map();
function markAsRecentlyUsed(correlationId, data) {
  correlationCache.delete(correlationId);
  correlationCache.set(correlationId, data);
}
function addLogToCache(correlationId, loggedMessage) {
  const currentTime = Date.now();
  let data = correlationCache.get(correlationId);
  if (data) {
    markAsRecentlyUsed(correlationId, data);
  } else {
    data = { logs: [], firstEventTime: currentTime };
    correlationCache.set(correlationId, data);
    if (correlationCache.size > CACHE_CAPACITY) {
      const firstKey = correlationCache.keys().next().value;
      if (firstKey !== void 0) {
        correlationCache.delete(firstKey);
      }
    }
  }
  data.logs.push({
    ...loggedMessage,
    milliseconds: currentTime - data.firstEventTime
  });
  if (data.logs.length > MAX_LOGS_PER_CORRELATION) {
    data.logs.shift();
  }
}
function getMessageHash(str) {
  if (str.length < 6) {
    return null;
  }
  if (str.length > 6 && str[6] !== " ") {
    return null;
  }
  for (let i = 0; i < 6; i++) {
    const char = str[i];
    const isAlphaNumeric = char >= "a" && char <= "z" || char >= "A" && char <= "Z" || char >= "0" && char <= "9";
    if (!isAlphaNumeric) {
      return null;
    }
  }
  return str.substring(0, 6);
}
var Logger = class _Logger {
  constructor(loggerOptions, packageName, packageVersion) {
    this.level = LogLevel.Info;
    const defaultLoggerCallback2 = () => {
      return;
    };
    const setLoggerOptions = loggerOptions || _Logger.createDefaultLoggerOptions();
    this.localCallback = setLoggerOptions.loggerCallback || defaultLoggerCallback2;
    this.piiLoggingEnabled = setLoggerOptions.piiLoggingEnabled || false;
    this.level = typeof setLoggerOptions.logLevel === "number" ? setLoggerOptions.logLevel : LogLevel.Info;
    this.packageName = packageName || "";
    this.packageVersion = packageVersion || "";
  }
  static createDefaultLoggerOptions() {
    return {
      loggerCallback: () => {
      },
      piiLoggingEnabled: false,
      logLevel: LogLevel.Info
    };
  }
  /**
   * Create new Logger with existing configurations.
   */
  clone(packageName, packageVersion) {
    return new _Logger({
      loggerCallback: this.localCallback,
      piiLoggingEnabled: this.piiLoggingEnabled,
      logLevel: this.level
    }, packageName, packageVersion);
  }
  /**
   * Log message with required options.
   */
  logMessage(logMessage, options) {
    const correlationId = options.correlationId;
    const messageHash = getMessageHash(logMessage);
    if (messageHash) {
      const loggedMessage = {
        hash: messageHash,
        level: options.logLevel,
        containsPii: options.containsPii || false,
        milliseconds: 0
        // Will be calculated in addLogToCache
      };
      addLogToCache(correlationId, loggedMessage);
    }
    if (options.logLevel > this.level || !this.piiLoggingEnabled && options.containsPii) {
      return;
    }
    const timestamp = (/* @__PURE__ */ new Date()).toUTCString();
    const logHeader = `[${timestamp}] : [${correlationId}]`;
    const log2 = `${logHeader} : ${this.packageName}@${this.packageVersion} : ${LogLevel[options.logLevel]} - ${logMessage}`;
    this.executeCallback(options.logLevel, log2, options.containsPii || false);
  }
  /**
   * Execute callback with message.
   */
  executeCallback(level, message, containsPii) {
    if (this.localCallback) {
      this.localCallback(level, message, containsPii);
    }
  }
  /**
   * Logs error messages.
   */
  error(message, correlationId) {
    this.logMessage(message, {
      logLevel: LogLevel.Error,
      containsPii: false,
      correlationId
    });
  }
  /**
   * Logs error messages with PII.
   */
  errorPii(message, correlationId) {
    this.logMessage(message, {
      logLevel: LogLevel.Error,
      containsPii: true,
      correlationId
    });
  }
  /**
   * Logs warning messages.
   */
  warning(message, correlationId) {
    this.logMessage(message, {
      logLevel: LogLevel.Warning,
      containsPii: false,
      correlationId
    });
  }
  /**
   * Logs warning messages with PII.
   */
  warningPii(message, correlationId) {
    this.logMessage(message, {
      logLevel: LogLevel.Warning,
      containsPii: true,
      correlationId
    });
  }
  /**
   * Logs info messages.
   */
  info(message, correlationId) {
    this.logMessage(message, {
      logLevel: LogLevel.Info,
      containsPii: false,
      correlationId
    });
  }
  /**
   * Logs info messages with PII.
   */
  infoPii(message, correlationId) {
    this.logMessage(message, {
      logLevel: LogLevel.Info,
      containsPii: true,
      correlationId
    });
  }
  /**
   * Logs verbose messages.
   */
  verbose(message, correlationId) {
    this.logMessage(message, {
      logLevel: LogLevel.Verbose,
      containsPii: false,
      correlationId
    });
  }
  /**
   * Logs verbose messages with PII.
   */
  verbosePii(message, correlationId) {
    this.logMessage(message, {
      logLevel: LogLevel.Verbose,
      containsPii: true,
      correlationId
    });
  }
  /**
   * Logs trace messages.
   */
  trace(message, correlationId) {
    this.logMessage(message, {
      logLevel: LogLevel.Trace,
      containsPii: false,
      correlationId
    });
  }
  /**
   * Logs trace messages with PII.
   */
  tracePii(message, correlationId) {
    this.logMessage(message, {
      logLevel: LogLevel.Trace,
      containsPii: true,
      correlationId
    });
  }
  /**
   * Returns whether PII Logging is enabled or not.
   */
  isPiiLoggingEnabled() {
    return this.piiLoggingEnabled || false;
  }
};

// ../../node_modules/@azure/msal-common/dist/packageMetadata.mjs
var name = "@azure/msal-common";
var version = "16.11.2";

// ../../node_modules/@azure/msal-common/dist/error/CacheErrorCodes.mjs
var cacheQuotaExceeded = "cache_quota_exceeded";
var cacheErrorUnknown = "cache_error_unknown";

// ../../node_modules/@azure/msal-common/dist/error/CacheError.mjs
var CacheError = class _CacheError extends Error {
  constructor(errorCode, errorMessage) {
    const message = errorMessage || getDefaultErrorMessage(errorCode);
    super(message);
    Object.setPrototypeOf(this, _CacheError.prototype);
    this.name = "CacheError";
    this.errorCode = errorCode;
    this.errorMessage = message;
  }
};
function createCacheError(e) {
  if (!(e instanceof Error)) {
    return new CacheError(cacheErrorUnknown);
  }
  if (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED" || e.message.includes("exceeded the quota")) {
    return new CacheError(cacheQuotaExceeded);
  } else {
    return new CacheError(e.name, e.message);
  }
}

// ../../node_modules/@azure/msal-common/dist/cache/CacheManager.mjs
var CacheManager = class {
  constructor(clientId, cryptoImpl, logger27, performanceClient, staticAuthorityOptions) {
    this.clientId = clientId;
    this.cryptoImpl = cryptoImpl;
    this.commonLogger = logger27.clone(name, version);
    this.staticAuthorityOptions = staticAuthorityOptions;
    this.performanceClient = performanceClient;
  }
  /**
   * Returns all the accounts in the cache that match the optional filter. If no filter is provided, all accounts are returned.
   * @param accountFilter - (Optional) filter to narrow down the accounts returned
   * @returns Array of AccountInfo objects in cache
   */
  getAllAccounts(accountFilter = {}, correlationId) {
    return this.buildTenantProfiles(this.getAccountsFilteredBy(accountFilter, correlationId), correlationId, accountFilter);
  }
  /**
   * Gets first tenanted AccountInfo object found based on provided filters
   */
  getAccountInfoFilteredBy(accountFilter, correlationId) {
    if (Object.keys(accountFilter).length === 0 || Object.values(accountFilter).every((value) => value === null || value === void 0 || value === "")) {
      this.commonLogger.warning("getAccountInfoFilteredBy: Account filter is empty or invalid, returning null", correlationId);
      return null;
    }
    const allAccounts = this.getAllAccounts(accountFilter, correlationId);
    if (allAccounts.length > 1) {
      const sortedAccounts = allAccounts.sort((a, b) => {
        const aHasClaims = a.idTokenClaims ? 1 : 0;
        const bHasClaims = b.idTokenClaims ? 1 : 0;
        return bHasClaims - aHasClaims;
      });
      return sortedAccounts[0];
    } else if (allAccounts.length === 1) {
      return allAccounts[0];
    } else {
      return null;
    }
  }
  /**
   * Returns a single matching
   * @param accountFilter
   * @returns
   */
  getBaseAccountInfo(accountFilter, correlationId) {
    const accountEntities = this.getAccountsFilteredBy(accountFilter, correlationId);
    if (accountEntities.length > 0) {
      return getAccountInfo(accountEntities[0]);
    } else {
      return null;
    }
  }
  /**
   * Matches filtered account entities with cached ID tokens that match the tenant profile-specific account filters
   * and builds the account info objects from the matching ID token's claims
   * @param cachedAccounts
   * @param accountFilter
   * @returns Array of AccountInfo objects that match account and tenant profile filters
   */
  buildTenantProfiles(cachedAccounts, correlationId, accountFilter) {
    return cachedAccounts.flatMap((accountEntity) => {
      return this.getTenantProfilesFromAccountEntity(accountEntity, correlationId, accountFilter?.tenantId, accountFilter);
    });
  }
  getTenantedAccountInfoByFilter(accountInfo, tokenKeys, tenantProfile, correlationId, tenantProfileFilter) {
    let tenantedAccountInfo = null;
    let idTokenClaims;
    if (tenantProfileFilter) {
      if (!this.tenantProfileMatchesFilter(tenantProfile, tenantProfileFilter)) {
        return null;
      }
    }
    const idToken = this.getIdToken(accountInfo, correlationId, tokenKeys, tenantProfile.tenantId);
    if (idToken) {
      idTokenClaims = extractTokenClaims(idToken.secret, this.cryptoImpl.base64Decode, correlationId);
      if (!this.idTokenClaimsMatchTenantProfileFilter(idTokenClaims, tenantProfileFilter)) {
        return null;
      }
    }
    tenantedAccountInfo = updateAccountTenantProfileData(accountInfo, tenantProfile, idTokenClaims, idToken?.secret);
    return tenantedAccountInfo;
  }
  getTenantProfilesFromAccountEntity(accountEntity, correlationId, targetTenantId, tenantProfileFilter) {
    const accountInfo = getAccountInfo(accountEntity);
    let searchTenantProfiles = accountInfo.tenantProfiles || /* @__PURE__ */ new Map();
    const tokenKeys = this.getTokenKeys();
    if (targetTenantId) {
      const tenantProfile = searchTenantProfiles.get(targetTenantId);
      if (tenantProfile) {
        searchTenantProfiles = /* @__PURE__ */ new Map([
          [targetTenantId, tenantProfile]
        ]);
      } else {
        return [];
      }
    }
    const matchingTenantProfiles = [];
    searchTenantProfiles.forEach((tenantProfile) => {
      const tenantedAccountInfo = this.getTenantedAccountInfoByFilter(accountInfo, tokenKeys, tenantProfile, correlationId, tenantProfileFilter);
      if (tenantedAccountInfo) {
        matchingTenantProfiles.push(tenantedAccountInfo);
      }
    });
    return matchingTenantProfiles;
  }
  tenantProfileMatchesFilter(tenantProfile, tenantProfileFilter) {
    if (!!tenantProfileFilter.localAccountId && !this.matchLocalAccountIdFromTenantProfile(tenantProfile, tenantProfileFilter.localAccountId)) {
      return false;
    }
    if (!!tenantProfileFilter.name && !(tenantProfile.name === tenantProfileFilter.name)) {
      return false;
    }
    if (tenantProfileFilter.isHomeTenant !== void 0 && !(tenantProfile.isHomeTenant === tenantProfileFilter.isHomeTenant)) {
      return false;
    }
    if (!!tenantProfileFilter.username && !this.matchUsername(tenantProfile.username, tenantProfileFilter.username) && !this.matchUsername(tenantProfile.upn, tenantProfileFilter.username)) {
      return false;
    }
    if (!!tenantProfileFilter.loginHint && !this.matchLoginHintWithTenantProfile(tenantProfile, tenantProfileFilter.loginHint)) {
      return false;
    }
    if (!!tenantProfileFilter.upn && !(tenantProfile.upn === tenantProfileFilter.upn)) {
      return false;
    }
    if (!!tenantProfileFilter.nativeAccountId && tenantProfile.nativeAccountId !== tenantProfileFilter.nativeAccountId) {
      return false;
    }
    return true;
  }
  idTokenClaimsMatchTenantProfileFilter(idTokenClaims, tenantProfileFilter) {
    if (tenantProfileFilter) {
      if (!!tenantProfileFilter.localAccountId && !this.matchLocalAccountIdFromTokenClaims(idTokenClaims, tenantProfileFilter.localAccountId)) {
        return false;
      }
      if (!!tenantProfileFilter.loginHint && !this.matchLoginHintFromTokenClaims(idTokenClaims, tenantProfileFilter.loginHint)) {
        return false;
      }
      if (!!tenantProfileFilter.username && !this.matchUsername(idTokenClaims.preferred_username, tenantProfileFilter.username) && !this.matchUsername(idTokenClaims.upn, tenantProfileFilter.username)) {
        return false;
      }
      if (!!tenantProfileFilter.name && !this.matchName(idTokenClaims, tenantProfileFilter.name)) {
        return false;
      }
      if (!!tenantProfileFilter.sid && !this.matchSid(idTokenClaims, tenantProfileFilter.sid)) {
        return false;
      }
    }
    return true;
  }
  /**
   * saves a cache record
   * @param cacheRecord {CacheRecord}
   * @param storeInCache {?StoreInCache}
   * @param correlationId {?string} correlation id
   */
  async saveCacheRecord(cacheRecord, correlationId, kmsi, apiId, storeInCache) {
    if (!cacheRecord) {
      throw createClientAuthError(invalidCacheRecord, correlationId);
    }
    try {
      if (!!cacheRecord.account) {
        await this.setAccount(cacheRecord.account, correlationId, kmsi, apiId);
      }
      if (!!cacheRecord.idToken && storeInCache?.idToken !== false) {
        await this.setIdTokenCredential(cacheRecord.idToken, correlationId, kmsi);
      }
      if (!!cacheRecord.accessToken && storeInCache?.accessToken !== false) {
        await this.saveAccessToken(cacheRecord.accessToken, correlationId, kmsi);
      }
      if (!!cacheRecord.refreshToken && storeInCache?.refreshToken !== false) {
        await this.setRefreshTokenCredential(cacheRecord.refreshToken, correlationId, kmsi);
      }
      if (!!cacheRecord.appMetadata) {
        this.setAppMetadata(cacheRecord.appMetadata, correlationId);
      }
    } catch (e) {
      this.commonLogger?.error(`CacheManager.saveCacheRecord: failed`, correlationId);
      if (e instanceof AuthError2) {
        throw e;
      } else {
        throw createCacheError(e);
      }
    }
  }
  /**
   * saves access token credential
   * @param credential
   */
  async saveAccessToken(credential, correlationId, kmsi) {
    const accessTokenFilter = {
      clientId: credential.clientId,
      credentialType: credential.credentialType,
      environment: credential.environment,
      homeAccountId: credential.homeAccountId,
      realm: credential.realm,
      tokenType: credential.tokenType
    };
    const tokenKeys = this.getTokenKeys();
    const currentScopes = ScopeSet.fromString(credential.target, correlationId);
    tokenKeys.accessToken.forEach((key) => {
      if (!this.accessTokenKeyMatchesFilter(key, accessTokenFilter, false)) {
        return;
      }
      const tokenEntity = this.getAccessTokenCredential(key, correlationId);
      if (tokenEntity && this.credentialMatchesFilter(tokenEntity, accessTokenFilter, correlationId)) {
        const tokenScopeSet = ScopeSet.fromString(tokenEntity.target, correlationId);
        if (tokenScopeSet.intersectingScopeSets(currentScopes)) {
          this.removeAccessToken(key, correlationId);
        }
      }
    });
    await this.setAccessTokenCredential(credential, correlationId, kmsi);
  }
  /**
   * Retrieve account entities matching all provided tenant-agnostic filters; if no filter is set, get all account entities in the cache
   * Not checking for casing as keys are all generated in lower case, remember to convert to lower case if object properties are compared
   * @param accountFilter - An object containing Account properties to filter by
   */
  getAccountsFilteredBy(accountFilter, correlationId) {
    const allAccountKeys = this.getAccountKeys();
    const matchingAccounts = [];
    allAccountKeys.forEach((cacheKey) => {
      const entity = this.getAccount(cacheKey, correlationId);
      if (!entity) {
        return;
      }
      if (!!accountFilter.homeAccountId && !this.matchHomeAccountId(entity, accountFilter.homeAccountId)) {
        return;
      }
      if (!!accountFilter.environment && !this.matchEnvironment(entity, accountFilter.environment, correlationId)) {
        return;
      }
      if (!!accountFilter.realm && !this.matchRealm(entity, accountFilter.realm)) {
        return;
      }
      if (!!accountFilter.authorityType && !this.matchAuthorityType(entity, accountFilter.authorityType)) {
        return;
      }
      const tenantProfileFilter = {
        localAccountId: accountFilter?.localAccountId,
        name: accountFilter?.name,
        username: accountFilter?.username,
        loginHint: accountFilter?.loginHint,
        upn: accountFilter?.upn,
        nativeAccountId: accountFilter?.nativeAccountId
      };
      const matchingTenantProfiles = entity.tenantProfiles?.filter((tenantProfile) => {
        return this.tenantProfileMatchesFilter(tenantProfile, tenantProfileFilter);
      });
      if (matchingTenantProfiles && matchingTenantProfiles.length === 0) {
        return;
      }
      matchingAccounts.push(entity);
    });
    return matchingAccounts;
  }
  /**
   * Returns whether or not the given credential entity matches the filter
   * @param entity
   * @param filter
   * @param correlationId
   * @returns
   */
  credentialMatchesFilter(entity, filter, correlationId) {
    if (!!filter.clientId && !this.matchClientId(entity, filter.clientId)) {
      return false;
    }
    if (!!filter.userAssertionHash && !this.matchUserAssertionHash(entity, filter.userAssertionHash)) {
      return false;
    }
    if (typeof filter.homeAccountId === "string" && !this.matchHomeAccountId(entity, filter.homeAccountId)) {
      return false;
    }
    if (!!filter.environment && !this.matchEnvironment(entity, filter.environment, correlationId)) {
      return false;
    }
    if (!!filter.realm && !this.matchRealm(entity, filter.realm)) {
      return false;
    }
    if (!!filter.credentialType && !this.matchCredentialType(entity, filter.credentialType)) {
      return false;
    }
    if (!!filter.familyId && !this.matchFamilyId(entity, filter.familyId)) {
      return false;
    }
    if (!!filter.target && !this.matchTarget(entity, filter.target, correlationId)) {
      return false;
    }
    if (entity.credentialType === CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME) {
      if (!!filter.tokenType && !this.matchTokenType(entity, filter.tokenType)) {
        return false;
      }
      if (filter.tokenType === AuthenticationScheme.SSH) {
        if (filter.keyId && !this.matchKeyId(entity, filter.keyId)) {
          return false;
        }
      }
    }
    const entityComponents = entity.additionalCacheKeyComponents;
    const filterComponents = filter.additionalCacheKeyComponents;
    const entityHasComponents = !!entityComponents && Object.keys(entityComponents).length > 0;
    const filterHasComponents = !!filterComponents && Object.keys(filterComponents).length > 0;
    if (entityHasComponents !== filterHasComponents) {
      return false;
    }
    if (entityHasComponents && filterHasComponents) {
      const entityKeys = Object.keys(entityComponents).sort();
      const filterKeys = Object.keys(filterComponents).sort();
      if (entityKeys.length !== filterKeys.length) {
        return false;
      }
      for (let i = 0; i < entityKeys.length; i++) {
        if (entityKeys[i] !== filterKeys[i] || entityComponents[entityKeys[i]] !== filterComponents[filterKeys[i]]) {
          return false;
        }
      }
    }
    return true;
  }
  /**
   * retrieve appMetadata matching all provided filters; if no filter is set, get all appMetadata
   * @param filter
   * @param correlationId
   */
  getAppMetadataFilteredBy(filter, correlationId) {
    const allCacheKeys = this.getKeys();
    const matchingAppMetadata = {};
    allCacheKeys.forEach((cacheKey) => {
      if (!this.isAppMetadata(cacheKey)) {
        return;
      }
      const entity = this.getAppMetadata(cacheKey, correlationId);
      if (!entity) {
        return;
      }
      if (!!filter.environment && !this.matchEnvironment(entity, filter.environment, correlationId)) {
        return;
      }
      if (!!filter.clientId && !this.matchClientId(entity, filter.clientId)) {
        return;
      }
      matchingAppMetadata[cacheKey] = entity;
    });
    return matchingAppMetadata;
  }
  /**
   * retrieve authorityMetadata that contains a matching alias
   * @param host
   * @param correlationId
   */
  getAuthorityMetadataByAlias(host, correlationId) {
    const allCacheKeys = this.getAuthorityMetadataKeys();
    let matchedEntity = null;
    allCacheKeys.forEach((cacheKey) => {
      if (!this.isAuthorityMetadata(cacheKey) || cacheKey.indexOf(this.clientId) === -1) {
        return;
      }
      const entity = this.getAuthorityMetadata(cacheKey, correlationId);
      if (!entity) {
        return;
      }
      if (entity.aliases.indexOf(host) === -1) {
        return;
      }
      matchedEntity = entity;
    });
    return matchedEntity;
  }
  /**
   * Removes all accounts and related tokens from cache.
   */
  removeAllAccounts(correlationId) {
    const accounts = this.getAllAccounts({}, correlationId);
    accounts.forEach((account) => {
      this.removeAccount(account, correlationId);
    });
  }
  /**
   * Removes the account and related tokens for a given account key
   * @param account
   */
  removeAccount(account, correlationId) {
    this.removeAccountContext(account, correlationId);
    const accountKeys = this.getAccountKeys();
    const keyFilter = (key) => {
      return key.includes(account.homeAccountId) && key.includes(account.environment);
    };
    accountKeys.filter(keyFilter).forEach((key) => {
      this.removeItem(key, correlationId);
      this.performanceClient.incrementFields({ accountsRemoved: 1 }, correlationId);
    });
  }
  /**
   * Removes credentials associated with the provided account
   * @param account
   */
  removeAccountContext(account, correlationId) {
    const allTokenKeys = this.getTokenKeys();
    const keyFilter = (key) => {
      return key.includes(account.homeAccountId) && key.includes(account.environment);
    };
    allTokenKeys.idToken.filter(keyFilter).forEach((key) => {
      this.removeIdToken(key, correlationId);
    });
    allTokenKeys.accessToken.filter(keyFilter).forEach((key) => {
      this.removeAccessToken(key, correlationId);
    });
    allTokenKeys.refreshToken.filter(keyFilter).forEach((key) => {
      this.removeRefreshToken(key, correlationId);
    });
  }
  /**
   * returns a boolean if the given credential is removed
   * @param key
   * @param correlationId
   */
  removeAccessToken(key, correlationId) {
    const credential = this.getAccessTokenCredential(key, correlationId);
    if (!credential) {
      return;
    }
    this.removeItem(key, correlationId);
    this.performanceClient.incrementFields({ accessTokensRemoved: 1 }, correlationId);
    if (credential.credentialType.toLowerCase() === CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME.toLowerCase()) {
      if (credential.tokenType === AuthenticationScheme.POP) {
        const accessTokenWithAuthSchemeEntity = credential;
        const kid = accessTokenWithAuthSchemeEntity.keyId;
        if (kid) {
          void this.cryptoImpl.removeTokenBindingKey(kid, correlationId).catch(() => {
            this.commonLogger.error(`Failed to remove token binding key '${kid}'`, correlationId);
            this.performanceClient?.incrementFields({ removeTokenBindingKeyFailure: 1 }, correlationId);
          });
        }
      }
    }
  }
  /**
   * Removes all app metadata objects from cache.
   */
  removeAppMetadata(correlationId) {
    const allCacheKeys = this.getKeys();
    allCacheKeys.forEach((cacheKey) => {
      if (this.isAppMetadata(cacheKey)) {
        this.removeItem(cacheKey, correlationId);
      }
    });
    return true;
  }
  /**
   * Retrieve IdTokenEntity from cache
   * @param account {AccountInfo}
   * @param tokenKeys {?TokenKeys}
   * @param targetRealm {?string}
   * @param performanceClient {?IPerformanceClient}
   * @param correlationId {?string}
   */
  getIdToken(account, correlationId, tokenKeys, targetRealm) {
    this.commonLogger.trace("CacheManager - getIdToken called", correlationId);
    const idTokenFilter = {
      homeAccountId: account.homeAccountId,
      environment: account.environment,
      credentialType: CredentialType.ID_TOKEN,
      clientId: this.clientId,
      realm: targetRealm
    };
    const idTokenMap = this.getIdTokensByFilter(idTokenFilter, correlationId, tokenKeys);
    const numIdTokens = idTokenMap.size;
    if (numIdTokens < 1) {
      this.commonLogger.info("CacheManager:getIdToken - No token found", correlationId);
      return null;
    } else if (numIdTokens > 1) {
      let tokensToBeRemoved = idTokenMap;
      if (!targetRealm) {
        const homeIdTokenMap = /* @__PURE__ */ new Map();
        idTokenMap.forEach((idToken, key) => {
          if (idToken.realm === account.tenantId) {
            homeIdTokenMap.set(key, idToken);
          }
        });
        const numHomeIdTokens = homeIdTokenMap.size;
        if (numHomeIdTokens < 1) {
          this.commonLogger.info("CacheManager:getIdToken - Multiple ID tokens found for account but none match account entity tenant id, returning first result", correlationId);
          return idTokenMap.values().next().value ?? null;
        } else if (numHomeIdTokens === 1) {
          this.commonLogger.info("CacheManager:getIdToken - Multiple ID tokens found for account, defaulting to home tenant profile", correlationId);
          return homeIdTokenMap.values().next().value ?? null;
        } else {
          tokensToBeRemoved = homeIdTokenMap;
        }
      }
      this.commonLogger.info("CacheManager:getIdToken - Multiple matching ID tokens found, clearing them", correlationId);
      tokensToBeRemoved.forEach((idToken, key) => {
        this.removeIdToken(key, correlationId);
      });
      this.performanceClient.addFields({ multiMatchedID: idTokenMap.size }, correlationId);
      return null;
    }
    this.commonLogger.info("CacheManager:getIdToken - Returning ID token", correlationId);
    return idTokenMap.values().next().value ?? null;
  }
  /**
   * Gets all idTokens matching the given filter
   * @param filter
   * @returns
   */
  getIdTokensByFilter(filter, correlationId, tokenKeys) {
    const idTokenKeys = tokenKeys && tokenKeys.idToken || this.getTokenKeys().idToken;
    const idTokens = /* @__PURE__ */ new Map();
    idTokenKeys.forEach((key) => {
      if (!this.idTokenKeyMatchesFilter(key, {
        clientId: this.clientId,
        ...filter
      })) {
        return;
      }
      const idToken = this.getIdTokenCredential(key, correlationId);
      if (idToken && this.credentialMatchesFilter(idToken, filter, correlationId)) {
        idTokens.set(key, idToken);
      }
    });
    return idTokens;
  }
  /**
   * Validate the cache key against filter before retrieving and parsing cache value
   * @param key
   * @param filter
   * @returns
   */
  idTokenKeyMatchesFilter(inputKey, filter) {
    const key = inputKey.toLowerCase();
    if (filter.clientId && key.indexOf(filter.clientId.toLowerCase()) === -1) {
      return false;
    }
    if (filter.homeAccountId && key.indexOf(filter.homeAccountId.toLowerCase()) === -1) {
      return false;
    }
    return true;
  }
  /**
   * Removes idToken from the cache
   * @param key
   */
  removeIdToken(key, correlationId) {
    this.removeItem(key, correlationId);
  }
  /**
   * Removes refresh token from the cache
   * @param key
   */
  removeRefreshToken(key, correlationId) {
    this.removeItem(key, correlationId);
  }
  /**
   * Retrieve AccessTokenEntity from cache
   * @param account {AccountInfo}
   * @param request {BaseAuthRequest}
   * @param tokenKeys {?TokenKeys}
   * @param performanceClient {?IPerformanceClient}
   */
  getAccessToken(account, request, tokenKeys, targetRealm) {
    const correlationId = request.correlationId;
    this.commonLogger.trace("CacheManager - getAccessToken called", correlationId);
    const scopes = ScopeSet.createSearchScopes(request.scopes, correlationId);
    const authScheme = request.authenticationScheme || AuthenticationScheme.BEARER;
    const credentialType = authScheme && authScheme.toLowerCase() !== AuthenticationScheme.BEARER.toLowerCase() ? CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME : CredentialType.ACCESS_TOKEN;
    const accessTokenFilter = {
      homeAccountId: account.homeAccountId,
      environment: account.environment,
      credentialType,
      clientId: this.clientId,
      realm: targetRealm || account.tenantId,
      target: scopes,
      tokenType: authScheme,
      keyId: request.sshKid
    };
    const accessTokenKeys = tokenKeys && tokenKeys.accessToken || this.getTokenKeys().accessToken;
    const accessTokens = [];
    accessTokenKeys.forEach((key) => {
      if (this.accessTokenKeyMatchesFilter(key, accessTokenFilter, true)) {
        const accessToken = this.getAccessTokenCredential(key, correlationId);
        if (accessToken && this.credentialMatchesFilter(accessToken, accessTokenFilter, correlationId)) {
          accessTokens.push(accessToken);
        }
      }
    });
    const numAccessTokens = accessTokens.length;
    if (numAccessTokens < 1) {
      this.commonLogger.info("CacheManager:getAccessToken - No token found", correlationId);
      return null;
    } else if (numAccessTokens > 1) {
      this.commonLogger.info("CacheManager:getAccessToken - Multiple access tokens found, clearing them", correlationId);
      accessTokens.forEach((accessToken) => {
        this.removeAccessToken(this.generateCredentialKey(accessToken), correlationId);
      });
      this.performanceClient.addFields({ multiMatchedAT: accessTokens.length }, correlationId);
      return null;
    }
    this.commonLogger.info("CacheManager:getAccessToken - Returning access token", correlationId);
    return accessTokens[0];
  }
  /**
   * Validate the cache key against filter before retrieving and parsing cache value
   * @param key
   * @param filter
   * @param keyMustContainAllScopes
   * @returns
   */
  accessTokenKeyMatchesFilter(inputKey, filter, keyMustContainAllScopes) {
    const key = inputKey.toLowerCase();
    if (filter.clientId && key.indexOf(filter.clientId.toLowerCase()) === -1) {
      return false;
    }
    if (filter.homeAccountId && key.indexOf(filter.homeAccountId.toLowerCase()) === -1) {
      return false;
    }
    if (filter.realm && key.indexOf(filter.realm.toLowerCase()) === -1) {
      return false;
    }
    if (filter.target) {
      const scopes = filter.target.asArray();
      for (let i = 0; i < scopes.length; i++) {
        if (keyMustContainAllScopes && !key.includes(scopes[i].toLowerCase())) {
          return false;
        } else if (!keyMustContainAllScopes && key.includes(scopes[i].toLowerCase())) {
          return true;
        }
      }
    }
    return true;
  }
  /**
   * Gets all access tokens matching the filter
   * @param filter
   * @returns
   */
  getAccessTokensByFilter(filter, correlationId) {
    const tokenKeys = this.getTokenKeys();
    const accessTokens = [];
    tokenKeys.accessToken.forEach((key) => {
      if (!this.accessTokenKeyMatchesFilter(key, filter, true)) {
        return;
      }
      const accessToken = this.getAccessTokenCredential(key, correlationId);
      if (accessToken && this.credentialMatchesFilter(accessToken, filter, correlationId)) {
        accessTokens.push(accessToken);
      }
    });
    return accessTokens;
  }
  /**
   * Helper to retrieve the appropriate refresh token from cache
   * @param account {AccountInfo}
   * @param familyRT {boolean}
   * @param tokenKeys {?TokenKeys}
   * @param performanceClient {?IPerformanceClient}
   * @param correlationId {?string}
   */
  getRefreshToken(account, familyRT, correlationId, tokenKeys) {
    this.commonLogger.trace("CacheManager - getRefreshToken called", correlationId);
    const id = familyRT ? THE_FAMILY_ID : void 0;
    const refreshTokenFilter = {
      homeAccountId: account.homeAccountId,
      environment: account.environment,
      credentialType: CredentialType.REFRESH_TOKEN,
      clientId: this.clientId,
      familyId: id
    };
    const refreshTokenKeys = tokenKeys && tokenKeys.refreshToken || this.getTokenKeys().refreshToken;
    const refreshTokens = [];
    refreshTokenKeys.forEach((key) => {
      if (this.refreshTokenKeyMatchesFilter(key, refreshTokenFilter)) {
        const refreshToken = this.getRefreshTokenCredential(key, correlationId);
        if (refreshToken && this.credentialMatchesFilter(refreshToken, refreshTokenFilter, correlationId)) {
          refreshTokens.push(refreshToken);
        }
      }
    });
    const numRefreshTokens = refreshTokens.length;
    if (numRefreshTokens < 1) {
      this.commonLogger.info("CacheManager:getRefreshToken - No refresh token found.", correlationId);
      return null;
    }
    if (numRefreshTokens > 1) {
      this.performanceClient.addFields({ multiMatchedRT: numRefreshTokens }, correlationId);
    }
    this.commonLogger.info("CacheManager:getRefreshToken - returning refresh token", correlationId);
    return refreshTokens[0];
  }
  /**
   * Validate the cache key against filter before retrieving and parsing cache value
   * @param key
   * @param filter
   */
  refreshTokenKeyMatchesFilter(inputKey, filter) {
    const key = inputKey.toLowerCase();
    if (filter.familyId && key.indexOf(filter.familyId.toLowerCase()) === -1) {
      return false;
    }
    if (!filter.familyId && filter.clientId && key.indexOf(filter.clientId.toLowerCase()) === -1) {
      return false;
    }
    if (filter.homeAccountId && key.indexOf(filter.homeAccountId.toLowerCase()) === -1) {
      return false;
    }
    return true;
  }
  /**
   * Retrieve AppMetadataEntity from cache
   */
  readAppMetadataFromCache(environment, correlationId) {
    const appMetadataFilter = {
      environment,
      clientId: this.clientId
    };
    const appMetadata = this.getAppMetadataFilteredBy(appMetadataFilter, correlationId);
    const appMetadataEntries = Object.keys(appMetadata).map((key) => appMetadata[key]);
    const numAppMetadata = appMetadataEntries.length;
    if (numAppMetadata < 1) {
      return null;
    } else if (numAppMetadata > 1) {
      throw createClientAuthError(multipleMatchingAppMetadata, correlationId);
    }
    return appMetadataEntries[0];
  }
  /**
   * Return the family_id value associated  with FOCI
   * @param environment
   * @param clientId
   */
  isAppMetadataFOCI(environment, correlationId) {
    const appMetadata = this.readAppMetadataFromCache(environment, correlationId);
    return !!(appMetadata && appMetadata.familyId === THE_FAMILY_ID);
  }
  /**
   * helper to match account ids
   * @param value
   * @param homeAccountId
   */
  matchHomeAccountId(entity, homeAccountId) {
    return !!(typeof entity.homeAccountId === "string" && homeAccountId === entity.homeAccountId);
  }
  /**
   * helper to match account ids
   * @param entity
   * @param localAccountId
   * @returns
   */
  matchLocalAccountIdFromTokenClaims(tokenClaims, localAccountId) {
    const idTokenLocalAccountId = tokenClaims.oid || tokenClaims.sub;
    return localAccountId === idTokenLocalAccountId;
  }
  matchLocalAccountIdFromTenantProfile(tenantProfile, localAccountId) {
    return tenantProfile.localAccountId === localAccountId;
  }
  /**
   * helper to match names
   * @param entity
   * @param name
   * @returns true if the downcased name properties are present and match in the filter and the entity
   */
  matchName(claims, name3) {
    return !!(name3.toLowerCase() === claims.name?.toLowerCase());
  }
  /**
   * helper to match usernames
   * @param entity
   * @param username
   * @returns
   */
  matchUsername(cachedUsername, filterUsername) {
    return !!(cachedUsername && typeof cachedUsername === "string" && filterUsername?.toLowerCase() === cachedUsername.toLowerCase());
  }
  /**
   * helper to match loginhints
   * @param entity
   * @param loginHint
   * @returns
   */
  matchLoginHintWithTenantProfile(tenantProfile, loginHintFilter) {
    return tenantProfile.loginHint === loginHintFilter || tenantProfile.username === loginHintFilter || tenantProfile.upn === loginHintFilter;
  }
  /**
   * helper to match assertion
   * @param value
   * @param oboAssertion
   */
  matchUserAssertionHash(entity, userAssertionHash) {
    return !!(entity.userAssertionHash && userAssertionHash === entity.userAssertionHash);
  }
  /**
   * helper to match environment
   * @param value
   * @param environment
   */
  matchEnvironment(entity, environment, correlationId) {
    if (this.staticAuthorityOptions) {
      const staticAliases = getAliasesFromStaticSources(this.staticAuthorityOptions, this.commonLogger, correlationId);
      if (staticAliases.includes(environment) && staticAliases.includes(entity.environment)) {
        return true;
      }
    }
    const cloudMetadata = this.getAuthorityMetadataByAlias(environment, correlationId);
    if (cloudMetadata && cloudMetadata.aliases.indexOf(entity.environment) > -1) {
      return true;
    }
    return false;
  }
  /**
   * helper to match credential type
   * @param entity
   * @param credentialType
   */
  matchCredentialType(entity, credentialType) {
    return entity.credentialType && credentialType.toLowerCase() === entity.credentialType.toLowerCase();
  }
  /**
   * helper to match client ids
   * @param entity
   * @param clientId
   */
  matchClientId(entity, clientId) {
    return !!(entity.clientId && clientId === entity.clientId);
  }
  /**
   * helper to match family ids
   * @param entity
   * @param familyId
   */
  matchFamilyId(entity, familyId) {
    return !!(entity.familyId && familyId === entity.familyId);
  }
  /**
   * helper to match realm
   * @param entity
   * @param realm
   */
  matchRealm(entity, realm) {
    return !!(entity.realm?.toLowerCase() === realm.toLowerCase());
  }
  /**
   * helper to match loginHint which can be either:
   * 1. login_hint ID token claim
   * 2. username in cached account object
   * 3. upn in ID token claims
   * @param entity
   * @param loginHint
   * @returns
   */
  matchLoginHintFromTokenClaims(tokenClaims, loginHint) {
    if (tokenClaims.login_hint === loginHint) {
      return true;
    }
    if (tokenClaims.preferred_username === loginHint) {
      return true;
    }
    if (tokenClaims.upn === loginHint) {
      return true;
    }
    if (tokenClaims.emails && tokenClaims.emails.includes(loginHint)) {
      return true;
    }
    return false;
  }
  /**
   * Helper to match sid
   * @param entity
   * @param sid
   * @returns true if the sid claim is present and matches the filter
   */
  matchSid(idTokenClaims, sid) {
    return idTokenClaims.sid === sid;
  }
  matchAuthorityType(entity, authorityType) {
    return !!(entity.authorityType && authorityType.toLowerCase() === entity.authorityType.toLowerCase());
  }
  /**
   * Returns true if the target scopes are a subset of the current entity's scopes, false otherwise.
   * @param entity
   * @param target
   */
  matchTarget(entity, target, correlationId) {
    const isNotAccessTokenCredential = entity.credentialType !== CredentialType.ACCESS_TOKEN && entity.credentialType !== CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME;
    if (isNotAccessTokenCredential || !entity.target) {
      return false;
    }
    const entityScopeSet = ScopeSet.fromString(entity.target, correlationId);
    return entityScopeSet.containsScopeSet(target);
  }
  /**
   * Returns true if the credential's tokenType or Authentication Scheme matches the one in the request, false otherwise
   * @param entity
   * @param tokenType
   */
  matchTokenType(entity, tokenType) {
    return !!(entity.tokenType && entity.tokenType === tokenType);
  }
  /**
   * Returns true if the credential's keyId matches the one in the request, false otherwise
   * @param entity
   * @param keyId
   */
  matchKeyId(entity, keyId) {
    return !!(entity.keyId && entity.keyId === keyId);
  }
  /**
   * returns if a given cache entity is of the type appmetadata
   * @param key
   */
  isAppMetadata(key) {
    return key.indexOf(APP_METADATA) !== -1;
  }
  /**
   * returns if a given cache entity is of the type authoritymetadata
   * @param key
   */
  isAuthorityMetadata(key) {
    return key.indexOf(AUTHORITY_METADATA_CACHE_KEY) !== -1;
  }
  /**
   * returns cache key used for cloud instance metadata
   */
  generateAuthorityMetadataCacheKey(authority) {
    return `${AUTHORITY_METADATA_CACHE_KEY}-${this.clientId}-${authority}`;
  }
  /**
   * Helper to convert serialized data to object
   * @param obj
   * @param json
   */
  static toObject(obj, json) {
    for (const propertyName in json) {
      obj[propertyName] = json[propertyName];
    }
    return obj;
  }
};
var DefaultStorageClass = class extends CacheManager {
  async setAccount() {
    throw createClientAuthError(methodNotImplemented, "");
  }
  getAccount() {
    throw createClientAuthError(methodNotImplemented, "");
  }
  async setIdTokenCredential() {
    throw createClientAuthError(methodNotImplemented, "");
  }
  getIdTokenCredential() {
    throw createClientAuthError(methodNotImplemented, "");
  }
  async setAccessTokenCredential() {
    throw createClientAuthError(methodNotImplemented, "");
  }
  getAccessTokenCredential() {
    throw createClientAuthError(methodNotImplemented, "");
  }
  async setRefreshTokenCredential() {
    throw createClientAuthError(methodNotImplemented, "");
  }
  getRefreshTokenCredential() {
    throw createClientAuthError(methodNotImplemented, "");
  }
  setAppMetadata() {
    throw createClientAuthError(methodNotImplemented, "");
  }
  getAppMetadata() {
    throw createClientAuthError(methodNotImplemented, "");
  }
  setServerTelemetry() {
    throw createClientAuthError(methodNotImplemented, "");
  }
  getServerTelemetry() {
    throw createClientAuthError(methodNotImplemented, "");
  }
  setAuthorityMetadata() {
    throw createClientAuthError(methodNotImplemented, "");
  }
  getAuthorityMetadata() {
    throw createClientAuthError(methodNotImplemented, "");
  }
  getAuthorityMetadataKeys() {
    throw createClientAuthError(methodNotImplemented, "");
  }
  setThrottlingCache() {
    throw createClientAuthError(methodNotImplemented, "");
  }
  getThrottlingCache() {
    throw createClientAuthError(methodNotImplemented, "");
  }
  removeItem() {
    throw createClientAuthError(methodNotImplemented, "");
  }
  getKeys() {
    throw createClientAuthError(methodNotImplemented, "");
  }
  getAccountKeys() {
    throw createClientAuthError(methodNotImplemented, "");
  }
  getTokenKeys() {
    throw createClientAuthError(methodNotImplemented, "");
  }
  generateCredentialKey() {
    throw createClientAuthError(methodNotImplemented, "");
  }
  generateAccountKey() {
    throw createClientAuthError(methodNotImplemented, "");
  }
};

// ../../node_modules/@azure/msal-common/dist/telemetry/performance/PerformanceEvent.mjs
var PerformanceEventStatus = {
  NotStarted: 0,
  InProgress: 1,
  Completed: 2
};

// ../../node_modules/@azure/msal-common/dist/telemetry/performance/StubPerformanceClient.mjs
var StubPerformanceClient = class {
  generateId() {
    return "callback-id";
  }
  startMeasurement(measureName, correlationId) {
    return {
      end: () => null,
      discard: () => {
      },
      add: () => {
      },
      increment: () => {
      },
      event: {
        eventId: this.generateId(),
        status: PerformanceEventStatus.InProgress,
        authority: "",
        libraryName: "",
        libraryVersion: "",
        clientId: "",
        name: measureName,
        startTimeMs: Date.now(),
        correlationId: correlationId || ""
      }
    };
  }
  endMeasurement() {
    return null;
  }
  discardMeasurements() {
    return;
  }
  removePerformanceCallback() {
    return true;
  }
  addPerformanceCallback() {
    return "";
  }
  emitEvents() {
    return;
  }
  addFields() {
    return;
  }
  addGlobalFields() {
    return;
  }
  incrementFields() {
    return;
  }
  cacheEventByCorrelationId() {
    return;
  }
};

// ../../node_modules/@azure/msal-common/dist/config/ClientConfiguration.mjs
var DEFAULT_SYSTEM_OPTIONS = {
  tokenRenewalOffsetSeconds: DEFAULT_TOKEN_RENEWAL_OFFSET_SEC,
  preventCorsPreflight: false
};
var DEFAULT_LOGGER_IMPLEMENTATION = {
  loggerCallback: () => {
  },
  piiLoggingEnabled: false,
  logLevel: LogLevel.Info,
  correlationId: ""
};
var DEFAULT_NETWORK_IMPLEMENTATION = {
  async sendGetRequestAsync() {
    throw createClientAuthError(methodNotImplemented, "");
  },
  async sendPostRequestAsync() {
    throw createClientAuthError(methodNotImplemented, "");
  }
};
var DEFAULT_LIBRARY_INFO = {
  sku: SKU,
  version,
  cpu: "",
  os: ""
};
var DEFAULT_CLIENT_CREDENTIALS = {
  clientSecret: "",
  clientAssertion: void 0
};
var DEFAULT_AZURE_CLOUD_OPTIONS = {
  azureCloudInstance: AzureCloudInstance.None,
  tenant: `${DEFAULT_COMMON_TENANT}`
};
var DEFAULT_TELEMETRY_OPTIONS = {
  application: {
    appName: "",
    appVersion: ""
  }
};
function buildClientConfiguration({ authOptions: userAuthOptions, systemOptions: userSystemOptions, loggerOptions: userLoggerOption, storageInterface: storageImplementation, networkInterface: networkImplementation, cryptoInterface: cryptoImplementation, clientCredentials, libraryInfo, telemetry, serverTelemetryManager, persistencePlugin, serializableCache }) {
  const loggerOptions = {
    ...DEFAULT_LOGGER_IMPLEMENTATION,
    ...userLoggerOption
  };
  return {
    authOptions: buildAuthOptions(userAuthOptions),
    systemOptions: { ...DEFAULT_SYSTEM_OPTIONS, ...userSystemOptions },
    loggerOptions,
    storageInterface: storageImplementation || new DefaultStorageClass(userAuthOptions.clientId, DEFAULT_CRYPTO_IMPLEMENTATION, new Logger(loggerOptions, name, version), new StubPerformanceClient()),
    networkInterface: networkImplementation || DEFAULT_NETWORK_IMPLEMENTATION,
    cryptoInterface: cryptoImplementation || DEFAULT_CRYPTO_IMPLEMENTATION,
    clientCredentials: clientCredentials || DEFAULT_CLIENT_CREDENTIALS,
    libraryInfo: { ...DEFAULT_LIBRARY_INFO, ...libraryInfo },
    telemetry: { ...DEFAULT_TELEMETRY_OPTIONS, ...telemetry },
    serverTelemetryManager: serverTelemetryManager || null,
    persistencePlugin: persistencePlugin || null,
    serializableCache: serializableCache || null
  };
}
function buildAuthOptions(authOptions) {
  return {
    clientCapabilities: [],
    azureCloudOptions: DEFAULT_AZURE_CLOUD_OPTIONS,
    instanceAware: false,
    isMcp: false,
    ...authOptions
  };
}
function isOidcProtocolMode(config) {
  return config.authOptions.authority.options.protocolMode === ProtocolMode.OIDC;
}

// ../../node_modules/@azure/msal-common/dist/cache/persistence/TokenCacheContext.mjs
var TokenCacheContext = class {
  constructor(tokenCache, hasChanged) {
    this.cache = tokenCache;
    this.hasChanged = hasChanged;
  }
  /**
   * boolean which indicates the changes in cache
   */
  get cacheHasChanged() {
    return this.hasChanged;
  }
  /**
   * function to retrieve the token cache
   */
  get tokenCache() {
    return this.cache;
  }
};

// ../../node_modules/@azure/msal-common/dist/crypto/PopTokenGenerator.mjs
var KeyLocation = {
  SW: "sw"
};
var PopTokenGenerator = class {
  constructor(cryptoUtils, performanceClient) {
    this.cryptoUtils = cryptoUtils;
    this.performanceClient = performanceClient;
  }
  /**
   * Generates the req_cnf validated at the RP in the POP protocol for SHR parameters
   * and returns an object containing the keyid, the full req_cnf string and the req_cnf string hash
   * @param request
   * @returns
   */
  async generateCnf(request, logger27) {
    const reqCnf = await invokeAsync(this.generateKid.bind(this), PopTokenGenerateCnf, logger27, this.performanceClient, request.correlationId)(request);
    const reqCnfString = this.cryptoUtils.base64UrlEncode(JSON.stringify(reqCnf));
    return {
      kid: reqCnf.kid,
      reqCnfString
    };
  }
  /**
   * Generates key_id for a SHR token request
   * @param request
   * @returns
   */
  async generateKid(request) {
    const kidThumbprint = await this.cryptoUtils.getPublicKeyThumbprint(request);
    return {
      kid: kidThumbprint,
      xms_ksl: KeyLocation.SW
    };
  }
  /**
   * Signs the POP access_token with the local generated key-pair
   * @param accessToken
   * @param request
   * @returns
   */
  async signPopToken(accessToken, keyId, request) {
    return this.signPayload(accessToken, keyId, request);
  }
  /**
   * Utility function to generate the signed JWT for an access_token
   * @param payload
   * @param kid
   * @param request
   * @param claims
   * @returns
   */
  async signPayload(payload, keyId, request, claims) {
    const { resourceRequestMethod, resourceRequestUri, shrClaims, shrNonce, shrOptions } = request;
    const resourceUrlString = resourceRequestUri ? new UrlString(resourceRequestUri, request.correlationId) : void 0;
    const resourceUrlComponents = resourceUrlString?.getUrlComponents();
    return this.cryptoUtils.signJwt({
      at: payload,
      ts: nowSeconds(),
      m: resourceRequestMethod?.toUpperCase(),
      u: resourceUrlComponents?.HostNameAndPort,
      nonce: shrNonce || this.cryptoUtils.createNewGuid(),
      p: resourceUrlComponents?.AbsolutePath,
      q: resourceUrlComponents?.QueryString ? [[], resourceUrlComponents.QueryString] : void 0,
      client_claims: shrClaims || void 0,
      ...claims
    }, keyId, shrOptions, request.correlationId);
  }
};

// ../../node_modules/@azure/msal-common/dist/error/InteractionRequiredAuthErrorCodes.mjs
var InteractionRequiredAuthErrorCodes_exports = {};
__export(InteractionRequiredAuthErrorCodes_exports, {
  badToken: () => badToken,
  consentRequired: () => consentRequired,
  interactionRequired: () => interactionRequired,
  interruptedUser: () => interruptedUser,
  loginRequired: () => loginRequired,
  nativeAccountUnavailable: () => nativeAccountUnavailable,
  noTokensFound: () => noTokensFound,
  refreshTokenExpired: () => refreshTokenExpired,
  uiNotAllowed: () => uiNotAllowed
});
var noTokensFound = "no_tokens_found";
var nativeAccountUnavailable = "native_account_unavailable";
var refreshTokenExpired = "refresh_token_expired";
var uiNotAllowed = "ui_not_allowed";
var interactionRequired = "interaction_required";
var consentRequired = "consent_required";
var loginRequired = "login_required";
var badToken = "bad_token";
var interruptedUser = "interrupted_user";

// ../../node_modules/@azure/msal-common/dist/error/InteractionRequiredAuthError.mjs
var InteractionRequiredServerErrorMessage = [
  interactionRequired,
  consentRequired,
  loginRequired,
  badToken,
  uiNotAllowed,
  interruptedUser
];
var InteractionRequiredAuthSubErrorMessage = [
  "message_only",
  "additional_action",
  "basic_action",
  "user_password_expired",
  "consent_required",
  "bad_token",
  "ui_not_allowed",
  "interrupted_user"
];
var InteractionRequiredAuthError = class _InteractionRequiredAuthError extends AuthError2 {
  constructor(errorCode, correlationId, errorMessage, subError, timestamp, traceId, claims, errorNo) {
    super(errorCode, correlationId, errorMessage, subError);
    Object.setPrototypeOf(this, _InteractionRequiredAuthError.prototype);
    this.timestamp = timestamp || "";
    this.traceId = traceId || "";
    this.claims = claims || "";
    this.name = "InteractionRequiredAuthError";
    this.errorNo = errorNo;
  }
};
function isInteractionRequiredError(errorCode, errorString, subError) {
  const isInteractionRequiredErrorCode = !!errorCode && InteractionRequiredServerErrorMessage.indexOf(errorCode) > -1;
  const isInteractionRequiredSubError = !!subError && InteractionRequiredAuthSubErrorMessage.indexOf(subError) > -1;
  const isInteractionRequiredErrorDesc = !!errorString && InteractionRequiredServerErrorMessage.some((irErrorCode) => {
    return errorString.indexOf(irErrorCode) > -1;
  });
  return isInteractionRequiredErrorCode || isInteractionRequiredErrorDesc || isInteractionRequiredSubError;
}
function createInteractionRequiredAuthError(errorCode, correlationId, errorMessage) {
  return new InteractionRequiredAuthError(errorCode, correlationId, errorMessage);
}

// ../../node_modules/@azure/msal-common/dist/error/ServerError.mjs
var ServerError = class _ServerError extends AuthError2 {
  constructor(errorCode, correlationId, errorMessage, subError, errorNo, status) {
    super(errorCode, correlationId, errorMessage, subError);
    this.name = "ServerError";
    this.errorNo = errorNo;
    this.status = status;
    Object.setPrototypeOf(this, _ServerError.prototype);
  }
};

// ../../node_modules/@azure/msal-common/dist/utils/ProtocolUtils.mjs
function parseRequestState(base64Decode, state3, correlationId) {
  if (!base64Decode) {
    throw createClientAuthError(noCryptoObject, correlationId);
  }
  if (!state3) {
    throw createClientAuthError(invalidState, correlationId);
  }
  try {
    const splitState = state3.split(RESOURCE_DELIM);
    const libraryState = splitState[0];
    const userState = splitState.length > 1 ? splitState.slice(1).join(RESOURCE_DELIM) : "";
    const libraryStateString = base64Decode(libraryState);
    const libraryStateObj = JSON.parse(libraryStateString);
    return {
      userRequestState: userState || "",
      libraryState: libraryStateObj
    };
  } catch (e) {
    throw createClientAuthError(invalidState, correlationId);
  }
}

// ../../node_modules/@azure/msal-common/dist/response/ResponseHandler.mjs
var ResponseHandler = class _ResponseHandler {
  constructor(clientId, cacheStorage, cryptoObj, logger27, performanceClient, serializableCache, persistencePlugin) {
    this.clientId = clientId;
    this.cacheStorage = cacheStorage;
    this.cryptoObj = cryptoObj;
    this.logger = logger27;
    this.performanceClient = performanceClient;
    this.serializableCache = serializableCache;
    this.persistencePlugin = persistencePlugin;
  }
  /**
   * Function which validates server authorization token response.
   * @param serverResponse
   * @param correlationId
   * @param refreshAccessToken
   */
  validateTokenResponse(serverResponse, correlationId, refreshAccessToken) {
    if (serverResponse.error || serverResponse.error_description || serverResponse.suberror) {
      const errString = `Error(s): ${serverResponse.error_codes || NOT_AVAILABLE} - Timestamp: ${serverResponse.timestamp || NOT_AVAILABLE} - Description: ${serverResponse.error_description || NOT_AVAILABLE} - Correlation ID: ${serverResponse.correlation_id || NOT_AVAILABLE} - Trace ID: ${serverResponse.trace_id || NOT_AVAILABLE}`;
      const serverErrorNo = serverResponse.error_codes?.length ? serverResponse.error_codes[0] : void 0;
      const serverError = new ServerError(serverResponse.error || "", serverResponse.correlation_id || "", errString, serverResponse.suberror, serverErrorNo, serverResponse.status);
      if (refreshAccessToken && serverResponse.status && serverResponse.status >= HTTP_SERVER_ERROR_RANGE_START && serverResponse.status <= HTTP_SERVER_ERROR_RANGE_END) {
        this.logger.warning(`executeTokenRequest:validateTokenResponse - AAD is currently unavailable and the access token is unable to be refreshed.
${serverError}`, correlationId);
        return;
      } else if (refreshAccessToken && serverResponse.status && serverResponse.status >= HTTP_CLIENT_ERROR_RANGE_START && serverResponse.status <= HTTP_CLIENT_ERROR_RANGE_END) {
        this.logger.warning(`executeTokenRequest:validateTokenResponse - AAD is currently available but is unable to refresh the access token.
${serverError}`, correlationId);
        return;
      }
      if (isInteractionRequiredError(serverResponse.error, serverResponse.error_description, serverResponse.suberror)) {
        throw new InteractionRequiredAuthError(serverResponse.error || "", serverResponse.correlation_id || "", serverResponse.error_description, serverResponse.suberror, serverResponse.timestamp || "", serverResponse.trace_id || "", serverResponse.claims || "", serverErrorNo);
      }
      throw serverError;
    }
  }
  /**
   * Returns a constructed token response based on given string. Also manages the cache updates and cleanups.
   * @param serverTokenResponse
   * @param authority
   */
  async handleServerTokenResponse(serverTokenResponse, authority, reqTimestamp, request, apiId, authCodePayload, userAssertionHash, handlingRefreshTokenResponse, forceCacheRefreshTokenResponse, serverRequestId, additionalCacheKeyComponents) {
    let idTokenClaims;
    if (serverTokenResponse.id_token) {
      idTokenClaims = extractTokenClaims(serverTokenResponse.id_token || "", this.cryptoObj.base64Decode, request.correlationId);
      if (authCodePayload && authCodePayload.nonce) {
        if (idTokenClaims.nonce !== authCodePayload.nonce) {
          throw createClientAuthError(nonceMismatch, request.correlationId);
        }
      }
    }
    this.homeAccountIdentifier = generateHomeAccountId(serverTokenResponse.client_info || "", authority.authorityType, this.logger, this.cryptoObj, request.correlationId, idTokenClaims);
    let requestStateObj;
    if (!!authCodePayload && !!authCodePayload.state) {
      requestStateObj = parseRequestState(this.cryptoObj.base64Decode, authCodePayload.state, request.correlationId);
    }
    serverTokenResponse.key_id = serverTokenResponse.key_id || request.sshKid || void 0;
    const cacheRecord = this.generateCacheRecord(serverTokenResponse, authority, reqTimestamp, request, idTokenClaims, userAssertionHash, authCodePayload, additionalCacheKeyComponents);
    let cacheContext;
    try {
      if (this.persistencePlugin && this.serializableCache) {
        this.logger.verbose("Persistence enabled, calling beforeCacheAccess", request.correlationId);
        cacheContext = new TokenCacheContext(this.serializableCache, true);
        await this.persistencePlugin.beforeCacheAccess(cacheContext);
      }
      if (handlingRefreshTokenResponse && !forceCacheRefreshTokenResponse && cacheRecord.account) {
        const cachedAccounts = this.cacheStorage.getAllAccounts({
          homeAccountId: cacheRecord.account.homeAccountId,
          environment: cacheRecord.account.environment
        }, request.correlationId);
        if (cachedAccounts.length < 1) {
          this.logger.warning("Account used to refresh tokens not in persistence, refreshed tokens will not be stored in the cache", request.correlationId);
          this.performanceClient?.addFields({
            acntLoggedOut: true
          }, request.correlationId);
          return await _ResponseHandler.generateAuthenticationResult(this.cryptoObj, authority, cacheRecord, false, request, this.performanceClient, idTokenClaims, requestStateObj, void 0, serverRequestId);
        }
      }
      await this.cacheStorage.saveCacheRecord(cacheRecord, request.correlationId, isKmsi(idTokenClaims || {}), apiId, request.storeInCache);
    } finally {
      if (this.persistencePlugin && this.serializableCache && cacheContext) {
        this.logger.verbose("Persistence enabled, calling afterCacheAccess", request.correlationId);
        await this.persistencePlugin.afterCacheAccess(cacheContext);
      }
    }
    return _ResponseHandler.generateAuthenticationResult(this.cryptoObj, authority, cacheRecord, false, request, this.performanceClient, idTokenClaims, requestStateObj, serverTokenResponse, serverRequestId);
  }
  /**
   * Generates CacheRecord
   * @param serverTokenResponse
   * @param idTokenObj
   * @param authority
   */
  generateCacheRecord(serverTokenResponse, authority, reqTimestamp, request, idTokenClaims, userAssertionHash, authCodePayload, additionalCacheKeyComponents) {
    const env = authority.getPreferredCache();
    if (!env) {
      throw createClientAuthError(invalidCacheEnvironment, request.correlationId);
    }
    const claimsTenantId = getTenantIdFromIdTokenClaims(idTokenClaims);
    let cachedIdToken;
    let cachedAccount;
    if (serverTokenResponse.id_token && !!idTokenClaims) {
      cachedIdToken = createIdTokenEntity(this.homeAccountIdentifier, env, serverTokenResponse.id_token, this.clientId, claimsTenantId || "");
      cachedAccount = buildAccountToCache(
        this.cacheStorage,
        authority,
        this.homeAccountIdentifier,
        this.cryptoObj.base64Decode,
        request.correlationId,
        idTokenClaims,
        serverTokenResponse.client_info,
        env,
        claimsTenantId,
        authCodePayload,
        void 0,
        // nativeAccountId
        this.logger,
        this.performanceClient
      );
    }
    let cachedAccessToken = null;
    if (serverTokenResponse.access_token) {
      const responseScopes = serverTokenResponse.scope ? ScopeSet.fromString(serverTokenResponse.scope, request.correlationId) : new ScopeSet(request.scopes || [], request.correlationId);
      const expiresIn = (typeof serverTokenResponse.expires_in === "string" ? parseInt(serverTokenResponse.expires_in, 10) : serverTokenResponse.expires_in) || 0;
      const extExpiresIn = (typeof serverTokenResponse.ext_expires_in === "string" ? parseInt(serverTokenResponse.ext_expires_in, 10) : serverTokenResponse.ext_expires_in) || 0;
      const refreshIn = (typeof serverTokenResponse.refresh_in === "string" ? parseInt(serverTokenResponse.refresh_in, 10) : serverTokenResponse.refresh_in) || void 0;
      const tokenExpirationSeconds = reqTimestamp + expiresIn;
      const extendedTokenExpirationSeconds = tokenExpirationSeconds + extExpiresIn;
      const refreshOnSeconds = refreshIn && refreshIn > 0 ? reqTimestamp + refreshIn : void 0;
      cachedAccessToken = createAccessTokenEntity(this.homeAccountIdentifier, env, serverTokenResponse.access_token, this.clientId, claimsTenantId || authority.tenant || "", responseScopes.printScopes(), tokenExpirationSeconds, extendedTokenExpirationSeconds, this.cryptoObj.base64Decode, request.correlationId, refreshOnSeconds, serverTokenResponse.token_type, userAssertionHash, serverTokenResponse.key_id, additionalCacheKeyComponents);
      const resource = request.resource || null;
      if (resource) {
        cachedAccessToken.resource = resource;
      }
    }
    let cachedRefreshToken = null;
    if (serverTokenResponse.refresh_token) {
      let rtExpiresOn;
      if (serverTokenResponse.refresh_token_expires_in) {
        const rtExpiresIn = typeof serverTokenResponse.refresh_token_expires_in === "string" ? parseInt(serverTokenResponse.refresh_token_expires_in, 10) : serverTokenResponse.refresh_token_expires_in;
        rtExpiresOn = reqTimestamp + rtExpiresIn;
        this.performanceClient?.addFields({ ntwkRtExpiresOnSeconds: rtExpiresOn }, request.correlationId);
      }
      cachedRefreshToken = createRefreshTokenEntity(this.homeAccountIdentifier, env, serverTokenResponse.refresh_token, this.clientId, serverTokenResponse.foci, userAssertionHash, rtExpiresOn);
    }
    let cachedAppMetadata = null;
    if (serverTokenResponse.foci) {
      cachedAppMetadata = {
        clientId: this.clientId,
        environment: env,
        familyId: serverTokenResponse.foci
      };
    }
    return {
      account: cachedAccount,
      idToken: cachedIdToken,
      accessToken: cachedAccessToken,
      refreshToken: cachedRefreshToken,
      appMetadata: cachedAppMetadata
    };
  }
  /**
   * Creates an @AuthenticationResult from @CacheRecord , @IdToken , and a boolean that states whether or not the result is from cache.
   *
   * Optionally takes a state string that is set as-is in the response.
   *
   * @param cacheRecord
   * @param idTokenObj
   * @param fromTokenCache
   * @param stateString
   */
  static async generateAuthenticationResult(cryptoObj, authority, cacheRecord, fromTokenCache, request, performanceClient, idTokenClaims, requestState, serverTokenResponse, requestId) {
    let accessToken = "";
    let responseScopes = [];
    let expiresOn = null;
    let extExpiresOn;
    let refreshOn;
    let familyId = "";
    if (cacheRecord.accessToken) {
      if (cacheRecord.accessToken.tokenType === AuthenticationScheme.POP && !request.popKid) {
        const popTokenGenerator = new PopTokenGenerator(cryptoObj, performanceClient);
        const { secret, keyId } = cacheRecord.accessToken;
        if (!keyId) {
          throw createClientAuthError(keyIdMissing, request.correlationId);
        }
        accessToken = await popTokenGenerator.signPopToken(secret, keyId, request);
      } else {
        accessToken = cacheRecord.accessToken.secret;
      }
      responseScopes = ScopeSet.fromString(cacheRecord.accessToken.target, request.correlationId).asArray();
      expiresOn = toDateFromSeconds(cacheRecord.accessToken.expiresOn);
      extExpiresOn = toDateFromSeconds(cacheRecord.accessToken.extendedExpiresOn);
      if (cacheRecord.accessToken.refreshOn) {
        refreshOn = toDateFromSeconds(cacheRecord.accessToken.refreshOn);
      }
    }
    if (cacheRecord.appMetadata) {
      familyId = cacheRecord.appMetadata.familyId === THE_FAMILY_ID ? THE_FAMILY_ID : "";
    }
    const uid = idTokenClaims?.oid || idTokenClaims?.sub || "";
    const tid = idTokenClaims?.tid || "";
    if (serverTokenResponse?.spa_accountid && !!cacheRecord.account) {
      cacheRecord.account.nativeAccountId = serverTokenResponse?.spa_accountid;
      const targetTenantId = tid || cacheRecord.account.realm;
      if (cacheRecord.account.tenantProfiles) {
        const matchingProfile = cacheRecord.account.tenantProfiles.find((tp) => tp.tenantId === targetTenantId);
        if (matchingProfile) {
          matchingProfile.nativeAccountId = serverTokenResponse.spa_accountid;
        }
      }
    }
    const accountInfo = cacheRecord.account ? updateAccountTenantProfileData(
      getAccountInfo(cacheRecord.account),
      void 0,
      // tenantProfile optional
      idTokenClaims,
      cacheRecord.idToken?.secret
    ) : null;
    return {
      authority: authority.canonicalAuthority,
      uniqueId: uid,
      tenantId: tid,
      scopes: responseScopes,
      account: accountInfo,
      idToken: cacheRecord?.idToken?.secret || "",
      idTokenClaims: idTokenClaims || {},
      accessToken,
      fromCache: fromTokenCache,
      expiresOn,
      extExpiresOn,
      refreshOn,
      correlationId: request.correlationId,
      requestId: requestId || "",
      familyId,
      tokenType: cacheRecord.accessToken?.tokenType || "",
      state: requestState ? requestState.userRequestState : "",
      cloudGraphHostName: cacheRecord.account?.cloudGraphHostName || "",
      msGraphHost: cacheRecord.account?.msGraphHost || "",
      code: serverTokenResponse?.spa_code,
      fromPlatformBroker: false
    };
  }
};
function buildAccountToCache(cacheStorage, authority, homeAccountId, base64Decode, correlationId, idTokenClaims, clientInfo, environment, claimsTenantId, authCodePayload, nativeAccountId, logger27, performanceClient) {
  logger27?.verbose("setCachedAccount called", correlationId);
  const accountEnvironment = environment || authority.getPreferredCache();
  const matchedAccounts = cacheStorage.getAccountsFilteredBy({ homeAccountId, environment: accountEnvironment }, correlationId);
  performanceClient?.addFields({ cacheMatchedAccounts: matchedAccounts.length }, correlationId);
  if (matchedAccounts.length > 1) {
    logger27?.warning("Multiple base accounts matched homeAccountId. Ignoring cached account and creating a new base account.", correlationId);
  }
  const cachedAccount = matchedAccounts.length === 1 ? matchedAccounts[0] : null;
  const baseAccount = cachedAccount || createAccountEntity({
    homeAccountId,
    idTokenClaims,
    clientInfo,
    environment,
    cloudGraphHostName: authCodePayload?.cloud_graph_host_name,
    msGraphHost: authCodePayload?.msgraph_host,
    nativeAccountId
  }, authority, correlationId, base64Decode);
  const tenantProfiles = baseAccount.tenantProfiles || [];
  const tenantId = claimsTenantId || baseAccount.realm;
  if (tenantId && !tenantProfiles.find((tenantProfile) => {
    return tenantProfile.tenantId === tenantId;
  })) {
    const newTenantProfile = buildTenantProfile(homeAccountId, baseAccount.localAccountId, tenantId, nativeAccountId, idTokenClaims);
    tenantProfiles.push(newTenantProfile);
  }
  baseAccount.tenantProfiles = tenantProfiles;
  return baseAccount;
}

// ../../node_modules/@azure/msal-common/dist/account/CcsCredential.mjs
var CcsCredentialType = {
  HOME_ACCOUNT_ID: "home_account_id",
  UPN: "UPN"
};

// ../../node_modules/@azure/msal-common/dist/utils/ClientAssertionUtils.mjs
async function getClientAssertion(clientAssertion, clientId, tokenEndpoint, fmiPath) {
  if (typeof clientAssertion === "string") {
    return clientAssertion;
  } else {
    const config = {
      clientId,
      tokenEndpoint,
      fmiPath
    };
    return clientAssertion(config);
  }
}

// ../../node_modules/@azure/msal-common/dist/network/RequestThumbprint.mjs
function getRequestThumbprint(clientId, request, homeAccountId) {
  return {
    clientId,
    authority: request.authority,
    scopes: request.scopes,
    homeAccountIdentifier: homeAccountId,
    claims: request.claims,
    authenticationScheme: request.authenticationScheme,
    resourceRequestMethod: request.resourceRequestMethod,
    resourceRequestUri: request.resourceRequestUri,
    shrClaims: request.shrClaims,
    sshKid: request.sshKid,
    embeddedClientId: request.embeddedClientId || request.extraParameters?.clientId,
    resource: request.resource
  };
}

// ../../node_modules/@azure/msal-common/dist/protocol/Token.mjs
var Token_exports = {};
__export(Token_exports, {
  createTokenQueryParameters: () => createTokenQueryParameters,
  createTokenRequestHeaders: () => createTokenRequestHeaders,
  executePostToTokenEndpoint: () => executePostToTokenEndpoint,
  sendPostRequest: () => sendPostRequest
});

// ../../node_modules/@azure/msal-common/dist/network/ThrottlingUtils.mjs
var ThrottlingUtils = class _ThrottlingUtils {
  /**
   * Prepares a RequestThumbprint to be stored as a key.
   * @param thumbprint
   */
  static generateThrottlingStorageKey(thumbprint) {
    return `${THROTTLING_PREFIX}.${JSON.stringify(thumbprint)}`;
  }
  /**
   * Performs necessary throttling checks before a network request.
   * @param cacheManager
   * @param thumbprint
   */
  static preProcess(cacheManager, thumbprint, correlationId) {
    const key = _ThrottlingUtils.generateThrottlingStorageKey(thumbprint);
    const value = cacheManager.getThrottlingCache(key, correlationId);
    if (value) {
      if (value.throttleTime < Date.now()) {
        cacheManager.removeItem(key, correlationId);
        return;
      }
      throw new ServerError(value.errorCodes?.join(" ") || "", correlationId, value.errorMessage, value.subError);
    }
  }
  /**
   * Performs necessary throttling checks after a network request.
   * @param cacheManager
   * @param thumbprint
   * @param response
   */
  static postProcess(cacheManager, thumbprint, response, correlationId) {
    if (_ThrottlingUtils.checkResponseStatus(response) || _ThrottlingUtils.checkResponseForRetryAfter(response)) {
      const thumbprintValue = {
        throttleTime: _ThrottlingUtils.calculateThrottleTime(parseInt(response.headers[HeaderNames.RETRY_AFTER])),
        error: response.body.error,
        errorCodes: response.body.error_codes,
        errorMessage: response.body.error_description,
        subError: response.body.suberror
      };
      cacheManager.setThrottlingCache(_ThrottlingUtils.generateThrottlingStorageKey(thumbprint), thumbprintValue, correlationId);
    }
  }
  /**
   * Checks a NetworkResponse object's status codes against 429 or 5xx
   * @param response
   */
  static checkResponseStatus(response) {
    return response.status === 429 || response.status >= 500 && response.status < 600;
  }
  /**
   * Checks a NetworkResponse object's RetryAfter header
   * @param response
   */
  static checkResponseForRetryAfter(response) {
    if (response.headers) {
      return response.headers.hasOwnProperty(HeaderNames.RETRY_AFTER) && (response.status < 200 || response.status >= 300);
    }
    return false;
  }
  /**
   * Calculates the Unix-time value for a throttle to expire given throttleTime in seconds.
   * @param throttleTime
   */
  static calculateThrottleTime(throttleTime) {
    const time = throttleTime <= 0 ? 0 : throttleTime;
    const currentSeconds = Date.now() / 1e3;
    return Math.floor(Math.min(currentSeconds + (time || DEFAULT_THROTTLE_TIME_SECONDS), currentSeconds + DEFAULT_MAX_THROTTLE_TIME_SECONDS) * 1e3);
  }
  static removeThrottle(cacheManager, clientId, request, homeAccountIdentifier) {
    const thumbprint = getRequestThumbprint(clientId, request, homeAccountIdentifier);
    const key = this.generateThrottlingStorageKey(thumbprint);
    cacheManager.removeItem(key, request.correlationId);
  }
};

// ../../node_modules/@azure/msal-common/dist/error/NetworkError.mjs
var NetworkError = class _NetworkError extends AuthError2 {
  constructor(error, httpStatus, responseHeaders) {
    super(error.errorCode, error.correlationId, error.errorMessage, error.subError);
    Object.setPrototypeOf(this, _NetworkError.prototype);
    this.name = "NetworkError";
    this.error = error;
    this.httpStatus = httpStatus;
    this.responseHeaders = responseHeaders;
  }
};
function createNetworkError(error, httpStatus, responseHeaders, additionalError) {
  error.errorMessage = `${error.errorMessage}, additionalErrorInfo: error.name:${additionalError?.name}, error.message:${additionalError?.message}`;
  return new NetworkError(error, httpStatus, responseHeaders);
}

// ../../node_modules/@azure/msal-common/dist/protocol/Token.mjs
function createTokenRequestHeaders(logger27, preventCorsPreflight, ccsCred) {
  const headers = {};
  headers[HeaderNames.CONTENT_TYPE] = URL_FORM_CONTENT_TYPE;
  if (!preventCorsPreflight && ccsCred) {
    switch (ccsCred.type) {
      case CcsCredentialType.HOME_ACCOUNT_ID:
        try {
          const clientInfo = buildClientInfoFromHomeAccountId(ccsCred.credential);
          headers[HeaderNames.CCS_HEADER] = `Oid:${clientInfo.uid}@${clientInfo.utid}`;
        } catch (e) {
          logger27.verbose(`Could not parse home account ID for CCS Header: '${e}'`, "");
        }
        break;
      case CcsCredentialType.UPN:
        headers[HeaderNames.CCS_HEADER] = `UPN: ${ccsCred.credential}`;
        break;
    }
  }
  return headers;
}
function createTokenQueryParameters(request, clientId, redirectUri, performanceClient) {
  const parameters = /* @__PURE__ */ new Map();
  if (request.embeddedClientId) {
    addBrokerParameters(parameters, clientId, redirectUri);
  }
  if (request.extraQueryParameters) {
    addExtraParameters(parameters, request.extraQueryParameters);
  }
  addCorrelationId(parameters, request.correlationId);
  instrumentBrokerParams(parameters, request.correlationId, performanceClient);
  return mapToQueryString(parameters);
}
async function executePostToTokenEndpoint(tokenEndpoint, queryString, headers, thumbprint, correlationId, cacheManager, networkClient, logger27, performanceClient, serverTelemetryManager) {
  const response = await sendPostRequest(thumbprint, tokenEndpoint, { body: queryString, headers }, correlationId, cacheManager, networkClient, logger27, performanceClient);
  if (serverTelemetryManager && response.status < 500 && response.status !== 429) {
    serverTelemetryManager.clearTelemetryCache();
  }
  return response;
}
async function sendPostRequest(thumbprint, tokenEndpoint, options, correlationId, cacheManager, networkClient, logger27, performanceClient) {
  ThrottlingUtils.preProcess(cacheManager, thumbprint, correlationId);
  let response;
  try {
    response = await invokeAsync(networkClient.sendPostRequestAsync.bind(networkClient), NetworkClientSendPostRequestAsync, logger27, performanceClient, correlationId)(tokenEndpoint, options);
    const responseHeaders = response.headers || {};
    performanceClient?.addFields({
      refreshTokenSize: response.body.refresh_token?.length || 0,
      httpVerToken: responseHeaders[HeaderNames.X_MS_HTTP_VERSION] || "",
      requestId: responseHeaders[HeaderNames.X_MS_REQUEST_ID] || ""
    }, correlationId);
  } catch (e) {
    if (e instanceof NetworkError) {
      const responseHeaders = e.responseHeaders;
      if (responseHeaders) {
        performanceClient?.addFields({
          httpVerToken: responseHeaders[HeaderNames.X_MS_HTTP_VERSION] || "",
          requestId: responseHeaders[HeaderNames.X_MS_REQUEST_ID] || "",
          contentTypeHeader: responseHeaders[HeaderNames.CONTENT_TYPE] || void 0,
          contentLengthHeader: responseHeaders[HeaderNames.CONTENT_LENGTH] || void 0,
          httpStatus: e.httpStatus
        }, correlationId);
      }
      throw e.error;
    }
    if (e instanceof AuthError2) {
      throw e;
    } else {
      throw createClientAuthError(networkError, correlationId);
    }
  }
  ThrottlingUtils.postProcess(cacheManager, thumbprint, response, correlationId);
  return response;
}

// ../../node_modules/@azure/msal-common/dist/client/AuthorizationCodeClient.mjs
var AuthorizationCodeClient = class {
  constructor(configuration, performanceClient) {
    this.includeRedirectUri = true;
    this.config = buildClientConfiguration(configuration);
    this.logger = new Logger(this.config.loggerOptions, name, version);
    this.cryptoUtils = this.config.cryptoInterface;
    this.cacheManager = this.config.storageInterface;
    this.networkClient = this.config.networkInterface;
    this.serverTelemetryManager = this.config.serverTelemetryManager;
    this.authority = this.config.authOptions.authority;
    this.performanceClient = performanceClient;
    this.oidcDefaultScopes = this.config.authOptions.authority.options.OIDCOptions?.defaultScopes;
  }
  /**
   * API to acquire a token in exchange of 'authorization_code` acquired by the user in the first leg of the
   * authorization_code_grant
   * @param request
   */
  async acquireToken(request, apiId, authCodePayload) {
    if (!request.code) {
      throw createClientAuthError(requestCannotBeMade, request.correlationId);
    }
    if (authCodePayload && authCodePayload.cloud_instance_host_name) {
      await invokeAsync(this.updateTokenEndpointAuthority.bind(this), UpdateTokenEndpointAuthority, this.logger, this.performanceClient, request.correlationId)(authCodePayload.cloud_instance_host_name, request.correlationId);
    }
    const reqTimestamp = nowSeconds();
    const response = await invokeAsync(this.executeTokenRequest.bind(this), AuthClientExecuteTokenRequest, this.logger, this.performanceClient, request.correlationId)(this.authority, request, this.serverTelemetryManager);
    const requestId = response.headers?.[HeaderNames.X_MS_REQUEST_ID];
    const responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.performanceClient, this.config.serializableCache, this.config.persistencePlugin);
    responseHandler.validateTokenResponse(response.body, request.correlationId);
    return invokeAsync(responseHandler.handleServerTokenResponse.bind(responseHandler), HandleServerTokenResponse, this.logger, this.performanceClient, request.correlationId)(response.body, this.authority, reqTimestamp, request, apiId, authCodePayload, void 0, void 0, void 0, requestId);
  }
  /**
   * Used to log out the current user, and redirect the user to the postLogoutRedirectUri.
   * Default behaviour is to redirect the user to `window.location.href`.
   * @param authorityUri
   */
  getLogoutUri(logoutRequest) {
    if (!logoutRequest) {
      throw createClientConfigurationError(logoutRequestEmpty, "");
    }
    const queryString = this.createLogoutUrlQueryString(logoutRequest);
    return UrlString.appendQueryString(this.authority.endSessionEndpoint, queryString);
  }
  /**
   * Executes POST request to token endpoint
   * @param authority
   * @param request
   */
  async executeTokenRequest(authority, request, serverTelemetryManager) {
    const queryParametersString = createTokenQueryParameters(request, this.config.authOptions.clientId, this.config.authOptions.redirectUri, this.performanceClient);
    const endpoint = UrlString.appendQueryString(authority.tokenEndpoint, queryParametersString);
    const requestBody = await invokeAsync(this.createTokenRequestBody.bind(this), AuthClientCreateTokenRequestBody, this.logger, this.performanceClient, request.correlationId)(request);
    let ccsCredential = void 0;
    if (request.clientInfo) {
      try {
        const clientInfo = buildClientInfo(request.clientInfo, this.cryptoUtils.base64Decode);
        ccsCredential = {
          credential: `${clientInfo.uid}${CLIENT_INFO_SEPARATOR}${clientInfo.utid}`,
          type: CcsCredentialType.HOME_ACCOUNT_ID
        };
      } catch (e) {
        this.logger.verbose(`Could not parse client info for CCS Header: '${e}'`, request.correlationId);
      }
    }
    const headers = createTokenRequestHeaders(this.logger, this.config.systemOptions.preventCorsPreflight, ccsCredential || request.ccsCredential);
    const thumbprint = getRequestThumbprint(this.config.authOptions.clientId, request);
    return invokeAsync(executePostToTokenEndpoint, AuthorizationCodeClientExecutePostToTokenEndpoint, this.logger, this.performanceClient, request.correlationId)(endpoint, requestBody, headers, thumbprint, request.correlationId, this.cacheManager, this.networkClient, this.logger, this.performanceClient, serverTelemetryManager);
  }
  /**
   * Generates a map for all the params to be sent to the service
   * @param request
   */
  async createTokenRequestBody(request) {
    const parameters = /* @__PURE__ */ new Map();
    addClientId(parameters, request.embeddedClientId || request.extraParameters?.[CLIENT_ID] || this.config.authOptions.clientId);
    if (!this.includeRedirectUri) {
      if (!request.redirectUri) {
        throw createClientConfigurationError(redirectUriEmpty, request.correlationId);
      }
    } else {
      addRedirectUri(parameters, request.redirectUri);
    }
    addScopes(parameters, request.scopes, request.correlationId, true, this.oidcDefaultScopes);
    addResource(parameters, request.resource);
    addAuthorizationCode(parameters, request.code);
    addLibraryInfo(parameters, this.config.libraryInfo);
    addApplicationTelemetry(parameters, this.config.telemetry.application);
    addThrottling(parameters);
    if (this.serverTelemetryManager && !isOidcProtocolMode(this.config)) {
      addServerTelemetry(parameters, this.serverTelemetryManager);
    }
    if (request.codeVerifier) {
      addCodeVerifier(parameters, request.codeVerifier);
    }
    if (this.config.clientCredentials.clientSecret) {
      addClientSecret(parameters, this.config.clientCredentials.clientSecret);
    }
    if (this.config.clientCredentials.clientAssertion) {
      const clientAssertion = this.config.clientCredentials.clientAssertion;
      addClientAssertion(parameters, await getClientAssertion(clientAssertion.assertion, this.config.authOptions.clientId, request.resourceRequestUri));
      addClientAssertionType(parameters, clientAssertion.assertionType);
    }
    addGrantType(parameters, GrantType.AUTHORIZATION_CODE_GRANT);
    addClientInfo(parameters);
    if (request.authenticationScheme === AuthenticationScheme.POP) {
      const popTokenGenerator = new PopTokenGenerator(this.cryptoUtils, this.performanceClient);
      let reqCnfData;
      if (!request.popKid) {
        const generatedReqCnfData = await invokeAsync(popTokenGenerator.generateCnf.bind(popTokenGenerator), PopTokenGenerateCnf, this.logger, this.performanceClient, request.correlationId)(request, this.logger);
        reqCnfData = generatedReqCnfData.reqCnfString;
      } else {
        reqCnfData = this.cryptoUtils.encodeKid(request.popKid);
      }
      addPopToken(parameters, reqCnfData);
    } else if (request.authenticationScheme === AuthenticationScheme.SSH) {
      if (request.sshJwk) {
        addSshJwk(parameters, request.sshJwk);
      } else {
        throw createClientConfigurationError(missingSshJwk, request.correlationId);
      }
    }
    let ccsCred = void 0;
    if (request.clientInfo) {
      try {
        const clientInfo = buildClientInfo(request.clientInfo, this.cryptoUtils.base64Decode);
        ccsCred = {
          credential: `${clientInfo.uid}${CLIENT_INFO_SEPARATOR}${clientInfo.utid}`,
          type: CcsCredentialType.HOME_ACCOUNT_ID
        };
      } catch (e) {
        this.logger.verbose(`Could not parse client info for CCS Header: '${e}'`, request.correlationId);
      }
    } else {
      ccsCred = request.ccsCredential;
    }
    if (this.config.systemOptions.preventCorsPreflight && ccsCred) {
      switch (ccsCred.type) {
        case CcsCredentialType.HOME_ACCOUNT_ID:
          try {
            const clientInfo = buildClientInfoFromHomeAccountId(ccsCred.credential);
            addCcsOid(parameters, clientInfo);
          } catch (e) {
            this.logger.verbose(`Could not parse home account ID for CCS Header: '${e}'`, request.correlationId);
          }
          break;
        case CcsCredentialType.UPN:
          addCcsUpn(parameters, ccsCred.credential);
          break;
      }
    }
    if (request.embeddedClientId) {
      addBrokerParameters(parameters, this.config.authOptions.clientId, this.config.authOptions.redirectUri);
    }
    if (request.extraParameters) {
      addExtraParameters(parameters, request.extraParameters);
    }
    if (request.enableSpaAuthorizationCode && (!request.extraParameters || !request.extraParameters[RETURN_SPA_CODE])) {
      addExtraParameters(parameters, {
        [RETURN_SPA_CODE]: "1"
      });
    }
    instrumentBrokerParams(parameters, request.correlationId, this.performanceClient);
    addClaims(parameters, request.correlationId, request.claims, this.config.authOptions.clientCapabilities, request.skipBrokerClaims);
    return mapToQueryString(parameters);
  }
  /**
   * This API validates the `EndSessionRequest` and creates a URL
   * @param request
   */
  createLogoutUrlQueryString(request) {
    const parameters = /* @__PURE__ */ new Map();
    if (request.postLogoutRedirectUri) {
      addPostLogoutRedirectUri(parameters, request.postLogoutRedirectUri);
    }
    if (request.correlationId) {
      addCorrelationId(parameters, request.correlationId);
    }
    if (request.idTokenHint) {
      addIdTokenHint(parameters, request.idTokenHint);
    }
    if (request.state) {
      addState(parameters, request.state);
    }
    if (request.logoutHint) {
      addLogoutHint(parameters, request.logoutHint);
    }
    if (request.extraQueryParameters) {
      addExtraParameters(parameters, request.extraQueryParameters);
    }
    if (this.config.authOptions.instanceAware) {
      addInstanceAware(parameters);
    }
    return mapToQueryString(parameters);
  }
  /**
   * Updates the authority to the cloud instance provided in the authorization response
   * @param cloudInstanceHostName - cloud instance host name from authorization code payload
   * @param correlationId - request correlation id
   */
  async updateTokenEndpointAuthority(cloudInstanceHostName, correlationId) {
    const cloudInstanceAuthorityUri = `https://${cloudInstanceHostName}/${this.authority.tenant}/`;
    const cloudInstanceAuthority = await createDiscoveredInstance(cloudInstanceAuthorityUri, this.networkClient, this.cacheManager, this.authority.options, this.logger, correlationId, this.performanceClient);
    this.authority = cloudInstanceAuthority;
  }
};

// ../../node_modules/@azure/msal-common/dist/protocol/Authorize.mjs
var Authorize_exports = {};
__export(Authorize_exports, {
  getAuthorizationCodePayload: () => getAuthorizationCodePayload,
  getAuthorizeUrl: () => getAuthorizeUrl,
  getStandardAuthorizeRequestParameters: () => getStandardAuthorizeRequestParameters,
  validateAuthorizationResponse: () => validateAuthorizationResponse
});
function getStandardAuthorizeRequestParameters(authOptions, request, logger27, performanceClient) {
  const correlationId = request.correlationId;
  const parameters = /* @__PURE__ */ new Map();
  addClientId(parameters, request.embeddedClientId || request.extraQueryParameters?.[CLIENT_ID] || authOptions.clientId);
  const requestScopes = [
    ...request.scopes || [],
    ...request.extraScopesToConsent || []
  ];
  addScopes(parameters, requestScopes, request.correlationId, true, authOptions.authority.options.OIDCOptions?.defaultScopes);
  addResource(parameters, request.resource);
  addRedirectUri(parameters, request.redirectUri);
  addCorrelationId(parameters, correlationId);
  addResponseMode(parameters, request.responseMode);
  addClientInfo(parameters);
  addCliData(parameters);
  if (request.prompt) {
    addPrompt(parameters, request.prompt);
    performanceClient?.addFields({ prompt: request.prompt }, correlationId);
  }
  if (request.domainHint) {
    addDomainHint(parameters, request.domainHint);
    performanceClient?.addFields({ domainHintFromRequest: true }, correlationId);
  }
  if (request.prompt !== PromptValue.SELECT_ACCOUNT) {
    if (request.sid && request.prompt === PromptValue.NONE) {
      logger27.verbose("createAuthCodeUrlQueryString: Prompt is none, adding sid from request", request.correlationId);
      addSid(parameters, request.sid);
      performanceClient?.addFields({ sidFromRequest: true }, correlationId);
    } else if (request.account) {
      const accountSid = extractAccountSid(request.account);
      let accountLoginHintClaim = extractLoginHint(request.account);
      if (accountLoginHintClaim && request.domainHint) {
        logger27.warning(`AuthorizationCodeClient.createAuthCodeUrlQueryString: "domainHint" param is set, skipping opaque "login_hint" claim. Please consider not passing domainHint`, request.correlationId);
        accountLoginHintClaim = null;
      }
      if (accountLoginHintClaim) {
        logger27.verbose("createAuthCodeUrlQueryString: login_hint claim present on account", request.correlationId);
        addLoginHint(parameters, accountLoginHintClaim);
        performanceClient?.addFields({ loginHintFromClaim: true }, correlationId);
        try {
          const clientInfo = buildClientInfoFromHomeAccountId(request.account.homeAccountId);
          addCcsOid(parameters, clientInfo);
        } catch (e) {
          logger27.verbose("createAuthCodeUrlQueryString: Could not parse home account ID for CCS Header", request.correlationId);
        }
      } else if (accountSid && request.prompt === PromptValue.NONE) {
        logger27.verbose("createAuthCodeUrlQueryString: Prompt is none, adding sid from account", request.correlationId);
        addSid(parameters, accountSid);
        performanceClient?.addFields({ sidFromClaim: true }, correlationId);
        try {
          const clientInfo = buildClientInfoFromHomeAccountId(request.account.homeAccountId);
          addCcsOid(parameters, clientInfo);
        } catch (e) {
          logger27.verbose("createAuthCodeUrlQueryString: Could not parse home account ID for CCS Header", request.correlationId);
        }
      } else if (request.loginHint) {
        logger27.verbose("createAuthCodeUrlQueryString: Adding login_hint from request", request.correlationId);
        addLoginHint(parameters, request.loginHint);
        addCcsUpn(parameters, request.loginHint);
        performanceClient?.addFields({ loginHintFromRequest: true }, correlationId);
      } else if (request.account.username) {
        logger27.verbose("createAuthCodeUrlQueryString: Adding login_hint from account", request.correlationId);
        addLoginHint(parameters, request.account.username);
        performanceClient?.addFields({ loginHintFromUpn: true }, correlationId);
        try {
          const clientInfo = buildClientInfoFromHomeAccountId(request.account.homeAccountId);
          addCcsOid(parameters, clientInfo);
        } catch (e) {
          logger27.verbose("createAuthCodeUrlQueryString: Could not parse home account ID for CCS Header", request.correlationId);
        }
      }
    } else if (request.loginHint) {
      logger27.verbose("createAuthCodeUrlQueryString: No account, adding login_hint from request", request.correlationId);
      addLoginHint(parameters, request.loginHint);
      addCcsUpn(parameters, request.loginHint);
      performanceClient?.addFields({ loginHintFromRequest: true }, correlationId);
    }
  } else {
    logger27.verbose("createAuthCodeUrlQueryString: Prompt is select_account, ignoring account hints", request.correlationId);
  }
  if (request.nonce) {
    addNonce(parameters, request.nonce);
  }
  if (request.state) {
    addState(parameters, request.state);
  }
  if (request.embeddedClientId) {
    addBrokerParameters(parameters, authOptions.clientId, authOptions.redirectUri);
  }
  addClaims(parameters, request.correlationId, request.claims, authOptions.clientCapabilities, request.skipBrokerClaims);
  if (authOptions.instanceAware && (!request.extraQueryParameters || !Object.keys(request.extraQueryParameters).includes(INSTANCE_AWARE))) {
    addInstanceAware(parameters);
  }
  return parameters;
}
function getAuthorizeUrl(authority, requestParameters) {
  const queryString = mapToQueryString(requestParameters);
  return UrlString.appendQueryString(authority.authorizationEndpoint, queryString);
}
function getAuthorizationCodePayload(serverParams, cachedState, correlationId) {
  validateAuthorizationResponse(serverParams, cachedState, correlationId);
  if (!serverParams.code) {
    throw createClientAuthError(authorizationCodeMissingFromServerResponse, correlationId);
  }
  return serverParams;
}
function validateAuthorizationResponse(serverResponse, requestState, correlationId) {
  if (!serverResponse.state || !requestState) {
    throw serverResponse.state ? createClientAuthError(stateNotFound, correlationId, "Cached State") : createClientAuthError(stateNotFound, correlationId, "Server State");
  }
  let decodedServerResponseState;
  let decodedRequestState;
  try {
    decodedServerResponseState = decodeURIComponent(serverResponse.state);
  } catch (e) {
    throw createClientAuthError(invalidState, correlationId, serverResponse.state);
  }
  try {
    decodedRequestState = decodeURIComponent(requestState);
  } catch (e) {
    throw createClientAuthError(invalidState, correlationId, serverResponse.state);
  }
  if (decodedServerResponseState !== decodedRequestState) {
    throw createClientAuthError(stateMismatch, correlationId);
  }
  if (serverResponse.error || serverResponse.error_description || serverResponse.suberror) {
    const serverErrorNo = parseServerErrorNo(serverResponse);
    if (isInteractionRequiredError(serverResponse.error, serverResponse.error_description, serverResponse.suberror)) {
      throw new InteractionRequiredAuthError(serverResponse.error || "", serverResponse.correlation_id || correlationId, serverResponse.error_description, serverResponse.suberror, serverResponse.timestamp || "", serverResponse.trace_id || "", serverResponse.claims || "", serverErrorNo);
    }
    throw new ServerError(serverResponse.error || "", serverResponse.correlation_id || correlationId, serverResponse.error_description, serverResponse.suberror, serverErrorNo);
  }
}
function parseServerErrorNo(serverResponse) {
  const errorCodePrefix = "code=";
  const errorCodePrefixIndex = serverResponse.error_uri?.lastIndexOf(errorCodePrefix);
  return errorCodePrefixIndex && errorCodePrefixIndex >= 0 ? serverResponse.error_uri?.substring(errorCodePrefixIndex + errorCodePrefix.length) : void 0;
}
function extractAccountSid(account) {
  return account.idTokenClaims?.sid || null;
}
function extractLoginHint(account) {
  return account.loginHint || account.idTokenClaims?.login_hint || null;
}

// ../../node_modules/@azure/msal-common/dist/client/RefreshTokenClient.mjs
var DEFAULT_REFRESH_TOKEN_EXPIRATION_OFFSET_SECONDS = 300;
var RefreshTokenClient = class {
  constructor(configuration, performanceClient) {
    this.config = buildClientConfiguration(configuration);
    this.logger = new Logger(this.config.loggerOptions, name, version);
    this.cryptoUtils = this.config.cryptoInterface;
    this.cacheManager = this.config.storageInterface;
    this.networkClient = this.config.networkInterface;
    this.serverTelemetryManager = this.config.serverTelemetryManager;
    this.authority = this.config.authOptions.authority;
    this.performanceClient = performanceClient;
  }
  async acquireToken(request, apiId) {
    const reqTimestamp = nowSeconds();
    const response = await invokeAsync(this.executeTokenRequest.bind(this), RefreshTokenClientExecuteTokenRequest, this.logger, this.performanceClient, request.correlationId)(request, this.authority);
    const requestId = response.headers?.[HeaderNames.X_MS_REQUEST_ID];
    const responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.performanceClient, this.config.serializableCache, this.config.persistencePlugin);
    responseHandler.validateTokenResponse(response.body, request.correlationId);
    return invokeAsync(responseHandler.handleServerTokenResponse.bind(responseHandler), HandleServerTokenResponse, this.logger, this.performanceClient, request.correlationId)(response.body, this.authority, reqTimestamp, request, apiId, void 0, void 0, true, request.forceCache, requestId);
  }
  /**
   * Gets cached refresh token and attaches to request, then calls acquireToken API
   * @param request
   */
  async acquireTokenByRefreshToken(request, apiId) {
    if (!request) {
      throw createClientConfigurationError(tokenRequestEmpty, "");
    }
    if (!request.account) {
      throw createClientAuthError(noAccountInSilentRequest, request.correlationId);
    }
    const isFOCI = this.cacheManager.isAppMetadataFOCI(request.account.environment, request.correlationId);
    if (isFOCI) {
      try {
        return await invokeAsync(this.acquireTokenWithCachedRefreshToken.bind(this), RefreshTokenClientAcquireTokenWithCachedRefreshToken, this.logger, this.performanceClient, request.correlationId)(request, true, apiId);
      } catch (e) {
        const noFamilyRTInCache = e instanceof InteractionRequiredAuthError && e.errorCode === noTokensFound;
        const clientMismatchErrorWithFamilyRT = e instanceof ServerError && e.errorCode === INVALID_GRANT_ERROR && e.subError === CLIENT_MISMATCH_ERROR;
        if (noFamilyRTInCache || clientMismatchErrorWithFamilyRT) {
          return invokeAsync(this.acquireTokenWithCachedRefreshToken.bind(this), RefreshTokenClientAcquireTokenWithCachedRefreshToken, this.logger, this.performanceClient, request.correlationId)(request, false, apiId);
        } else {
          throw e;
        }
      }
    }
    return invokeAsync(this.acquireTokenWithCachedRefreshToken.bind(this), RefreshTokenClientAcquireTokenWithCachedRefreshToken, this.logger, this.performanceClient, request.correlationId)(request, false, apiId);
  }
  /**
   * makes a network call to acquire tokens by exchanging RefreshToken available in userCache; throws if refresh token is not cached
   * @param request
   */
  async acquireTokenWithCachedRefreshToken(request, foci, apiId) {
    const refreshToken = invoke(this.cacheManager.getRefreshToken.bind(this.cacheManager), CacheManagerGetRefreshToken, this.logger, this.performanceClient, request.correlationId)(request.account, foci, request.correlationId, void 0);
    if (!refreshToken) {
      throw createInteractionRequiredAuthError(noTokensFound, request.correlationId);
    }
    if (refreshToken.expiresOn) {
      const offset = request.refreshTokenExpirationOffsetSeconds || DEFAULT_REFRESH_TOKEN_EXPIRATION_OFFSET_SECONDS;
      this.performanceClient?.addFields({
        cacheRtExpiresOnSeconds: Number(refreshToken.expiresOn),
        rtOffsetSeconds: offset
      }, request.correlationId);
      if (isTokenExpired(refreshToken.expiresOn, offset)) {
        throw createInteractionRequiredAuthError(refreshTokenExpired, request.correlationId);
      }
    }
    const refreshTokenRequest = {
      ...request,
      refreshToken: refreshToken.secret,
      authenticationScheme: request.authenticationScheme || AuthenticationScheme.BEARER,
      ccsCredential: {
        credential: request.account.homeAccountId,
        type: CcsCredentialType.HOME_ACCOUNT_ID
      }
    };
    try {
      return await invokeAsync(this.acquireToken.bind(this), RefreshTokenClientAcquireToken, this.logger, this.performanceClient, request.correlationId)(refreshTokenRequest, apiId);
    } catch (e) {
      if (e instanceof InteractionRequiredAuthError) {
        if (e.subError === badToken) {
          this.logger.verbose("acquireTokenWithRefreshToken: bad refresh token, removing from cache", request.correlationId);
          const badRefreshTokenKey = this.cacheManager.generateCredentialKey(refreshToken);
          this.cacheManager.removeRefreshToken(badRefreshTokenKey, request.correlationId);
        }
      }
      throw e;
    }
  }
  /**
   * Constructs the network message and makes a NW call to the underlying secure token service
   * @param request
   * @param authority
   */
  async executeTokenRequest(request, authority) {
    const queryParametersString = createTokenQueryParameters(request, this.config.authOptions.clientId, this.config.authOptions.redirectUri, this.performanceClient);
    const endpoint = UrlString.appendQueryString(authority.tokenEndpoint, queryParametersString);
    const requestBody = await invokeAsync(this.createTokenRequestBody.bind(this), RefreshTokenClientCreateTokenRequestBody, this.logger, this.performanceClient, request.correlationId)(request);
    const headers = createTokenRequestHeaders(this.logger, this.config.systemOptions.preventCorsPreflight, request.ccsCredential);
    const thumbprint = getRequestThumbprint(this.config.authOptions.clientId, request);
    return invokeAsync(executePostToTokenEndpoint, RefreshTokenClientExecutePostToTokenEndpoint, this.logger, this.performanceClient, request.correlationId)(endpoint, requestBody, headers, thumbprint, request.correlationId, this.cacheManager, this.networkClient, this.logger, this.performanceClient, this.serverTelemetryManager);
  }
  /**
   * Helper function to create the token request body
   * @param request
   */
  async createTokenRequestBody(request) {
    const parameters = /* @__PURE__ */ new Map();
    addClientId(parameters, request.embeddedClientId || request.extraParameters?.[CLIENT_ID] || this.config.authOptions.clientId);
    if (request.redirectUri) {
      addRedirectUri(parameters, request.redirectUri);
    }
    addScopes(parameters, request.scopes, request.correlationId, true, this.config.authOptions.authority.options.OIDCOptions?.defaultScopes);
    addGrantType(parameters, GrantType.REFRESH_TOKEN_GRANT);
    addClientInfo(parameters);
    addLibraryInfo(parameters, this.config.libraryInfo);
    addApplicationTelemetry(parameters, this.config.telemetry.application);
    addThrottling(parameters);
    if (this.serverTelemetryManager && !isOidcProtocolMode(this.config)) {
      addServerTelemetry(parameters, this.serverTelemetryManager);
    }
    addRefreshToken(parameters, request.refreshToken);
    if (this.config.clientCredentials.clientSecret) {
      addClientSecret(parameters, this.config.clientCredentials.clientSecret);
    }
    if (this.config.clientCredentials.clientAssertion) {
      const clientAssertion = this.config.clientCredentials.clientAssertion;
      addClientAssertion(parameters, await getClientAssertion(clientAssertion.assertion, this.config.authOptions.clientId, request.resourceRequestUri));
      addClientAssertionType(parameters, clientAssertion.assertionType);
    }
    if (request.authenticationScheme === AuthenticationScheme.POP) {
      const popTokenGenerator = new PopTokenGenerator(this.cryptoUtils, this.performanceClient);
      let reqCnfData;
      if (!request.popKid) {
        const generatedReqCnfData = await invokeAsync(popTokenGenerator.generateCnf.bind(popTokenGenerator), PopTokenGenerateCnf, this.logger, this.performanceClient, request.correlationId)(request, this.logger);
        reqCnfData = generatedReqCnfData.reqCnfString;
      } else {
        reqCnfData = this.cryptoUtils.encodeKid(request.popKid);
      }
      addPopToken(parameters, reqCnfData);
    } else if (request.authenticationScheme === AuthenticationScheme.SSH) {
      if (request.sshJwk) {
        addSshJwk(parameters, request.sshJwk);
      } else {
        throw createClientConfigurationError(missingSshJwk, request.correlationId);
      }
    }
    if (this.config.systemOptions.preventCorsPreflight && request.ccsCredential) {
      switch (request.ccsCredential.type) {
        case CcsCredentialType.HOME_ACCOUNT_ID:
          try {
            const clientInfo = buildClientInfoFromHomeAccountId(request.ccsCredential.credential);
            addCcsOid(parameters, clientInfo);
          } catch (e) {
            this.logger.verbose(`Could not parse home account ID for CCS Header: '${e}'`, request.correlationId);
          }
          break;
        case CcsCredentialType.UPN:
          addCcsUpn(parameters, request.ccsCredential.credential);
          break;
      }
    }
    if (request.embeddedClientId) {
      addBrokerParameters(parameters, this.config.authOptions.clientId, this.config.authOptions.redirectUri);
    }
    if (request.extraParameters) {
      addExtraParameters(parameters, {
        ...request.extraParameters
      });
    }
    instrumentBrokerParams(parameters, request.correlationId, this.performanceClient);
    addClaims(parameters, request.correlationId, request.claims, this.config.authOptions.clientCapabilities, request.skipBrokerClaims);
    return mapToQueryString(parameters);
  }
};

// ../../node_modules/@azure/msal-common/dist/telemetry/server/ServerTelemetryManager.mjs
var skuGroupSeparator = ",";
var skuValueSeparator = "|";
function makeExtraSkuString(params) {
  const { skus, libraryName, libraryVersion, extensionName, extensionVersion } = params;
  const skuMap = /* @__PURE__ */ new Map([
    [0, [libraryName, libraryVersion]],
    [2, [extensionName, extensionVersion]]
  ]);
  let skuArr = [];
  if (skus?.length) {
    skuArr = skus.split(skuGroupSeparator);
    if (skuArr.length < 4) {
      return skus;
    }
  } else {
    skuArr = Array.from({ length: 4 }, () => skuValueSeparator);
  }
  skuMap.forEach((value, key) => {
    if (value.length === 2 && value[0]?.length && value[1]?.length) {
      setSku({
        skuArr,
        index: key,
        skuName: value[0],
        skuVersion: value[1]
      });
    }
  });
  return skuArr.join(skuGroupSeparator);
}
function setSku(params) {
  const { skuArr, index, skuName, skuVersion } = params;
  if (index >= skuArr.length) {
    return;
  }
  skuArr[index] = [skuName, skuVersion].join(skuValueSeparator);
}
var ServerTelemetryManager = class _ServerTelemetryManager {
  constructor(telemetryRequest, cacheManager) {
    this.cacheOutcome = CacheOutcome.NOT_APPLICABLE;
    this.cacheManager = cacheManager;
    this.apiId = telemetryRequest.apiId;
    this.correlationId = telemetryRequest.correlationId;
    this.wrapperSKU = telemetryRequest.wrapperSKU || "";
    this.wrapperVer = telemetryRequest.wrapperVer || "";
    this.telemetryCacheKey = SERVER_TELEM_CACHE_KEY + CACHE_KEY_SEPARATOR + telemetryRequest.clientId;
  }
  /**
   * API to add MSER Telemetry to request
   */
  generateCurrentRequestHeaderValue() {
    const request = `${this.apiId}${SERVER_TELEM_VALUE_SEPARATOR}${this.cacheOutcome}`;
    const platformFieldsArr = [this.wrapperSKU, this.wrapperVer];
    const nativeBrokerErrorCode = this.getNativeBrokerErrorCode();
    if (nativeBrokerErrorCode?.length) {
      platformFieldsArr.push(`broker_error=${nativeBrokerErrorCode}`);
    }
    const platformFields = platformFieldsArr.join(SERVER_TELEM_VALUE_SEPARATOR);
    const regionDiscoveryFields = this.getRegionDiscoveryFields();
    const requestWithRegionDiscoveryFields = [
      request,
      regionDiscoveryFields
    ].join(SERVER_TELEM_VALUE_SEPARATOR);
    return [
      SERVER_TELEM_SCHEMA_VERSION,
      requestWithRegionDiscoveryFields,
      platformFields
    ].join(SERVER_TELEM_CATEGORY_SEPARATOR);
  }
  /**
   * API to add MSER Telemetry for the last failed request
   */
  generateLastRequestHeaderValue() {
    const lastRequests = this.getLastRequests();
    const maxErrors = _ServerTelemetryManager.maxErrorsToSend(lastRequests);
    const failedRequests = lastRequests.failedRequests.slice(0, 2 * maxErrors).join(SERVER_TELEM_VALUE_SEPARATOR);
    const errors = lastRequests.errors.slice(0, maxErrors).join(SERVER_TELEM_VALUE_SEPARATOR);
    const errorCount = lastRequests.errors.length;
    const overflow = maxErrors < errorCount ? SERVER_TELEM_OVERFLOW_TRUE : SERVER_TELEM_OVERFLOW_FALSE;
    const platformFields = [errorCount, overflow].join(SERVER_TELEM_VALUE_SEPARATOR);
    return [
      SERVER_TELEM_SCHEMA_VERSION,
      lastRequests.cacheHits,
      failedRequests,
      errors,
      platformFields
    ].join(SERVER_TELEM_CATEGORY_SEPARATOR);
  }
  /**
   * API to cache token failures for MSER data capture
   * @param error
   */
  cacheFailedRequest(error) {
    try {
      const lastRequests = this.getLastRequests();
      if (lastRequests.errors.length >= SERVER_TELEM_MAX_CACHED_ERRORS) {
        lastRequests.failedRequests.shift();
        lastRequests.failedRequests.shift();
        lastRequests.errors.shift();
      }
      lastRequests.failedRequests.push(this.apiId, this.correlationId);
      if (error instanceof Error && !!error && error.toString()) {
        if (error instanceof AuthError2) {
          if (error.subError) {
            lastRequests.errors.push(error.subError);
          } else if (error.errorCode) {
            lastRequests.errors.push(error.errorCode);
          } else {
            lastRequests.errors.push(error.toString());
          }
        } else {
          lastRequests.errors.push(error.toString());
        }
      } else {
        lastRequests.errors.push(SERVER_TELEM_UNKNOWN_ERROR);
      }
      this.cacheManager.setServerTelemetry(this.telemetryCacheKey, lastRequests, this.correlationId);
    } catch {
    }
    return;
  }
  /**
   * Update server telemetry cache entry by incrementing cache hit counter
   */
  incrementCacheHits() {
    const lastRequests = this.getLastRequests();
    lastRequests.cacheHits += 1;
    this.cacheManager.setServerTelemetry(this.telemetryCacheKey, lastRequests, this.correlationId);
    return lastRequests.cacheHits;
  }
  /**
   * Get the server telemetry entity from cache or initialize a new one
   */
  getLastRequests() {
    const initialValue = {
      failedRequests: [],
      errors: [],
      cacheHits: 0
    };
    const lastRequests = this.cacheManager.getServerTelemetry(this.telemetryCacheKey, this.correlationId);
    return lastRequests || initialValue;
  }
  /**
   * Remove server telemetry cache entry
   */
  clearTelemetryCache() {
    const lastRequests = this.getLastRequests();
    const numErrorsFlushed = _ServerTelemetryManager.maxErrorsToSend(lastRequests);
    const errorCount = lastRequests.errors.length;
    if (numErrorsFlushed === errorCount) {
      this.cacheManager.removeItem(this.telemetryCacheKey, this.correlationId);
    } else {
      const serverTelemEntity = {
        failedRequests: lastRequests.failedRequests.slice(numErrorsFlushed * 2),
        errors: lastRequests.errors.slice(numErrorsFlushed),
        cacheHits: 0
      };
      this.cacheManager.setServerTelemetry(this.telemetryCacheKey, serverTelemEntity, this.correlationId);
    }
  }
  /**
   * Returns the maximum number of errors that can be flushed to the server in the next network request
   * @param serverTelemetryEntity
   */
  static maxErrorsToSend(serverTelemetryEntity) {
    let i;
    let maxErrors = 0;
    let dataSize = 0;
    const errorCount = serverTelemetryEntity.errors.length;
    for (i = 0; i < errorCount; i++) {
      const apiId = serverTelemetryEntity.failedRequests[2 * i] || "";
      const correlationId = serverTelemetryEntity.failedRequests[2 * i + 1] || "";
      const errorCode = serverTelemetryEntity.errors[i] || "";
      dataSize += apiId.toString().length + correlationId.toString().length + errorCode.length + 3;
      if (dataSize < SERVER_TELEM_MAX_LAST_HEADER_BYTES) {
        maxErrors += 1;
      } else {
        break;
      }
    }
    return maxErrors;
  }
  /**
   * Get the region discovery fields
   *
   * @returns string
   */
  getRegionDiscoveryFields() {
    const regionDiscoveryFields = [];
    regionDiscoveryFields.push(this.regionUsed || "");
    regionDiscoveryFields.push(this.regionSource || "");
    regionDiscoveryFields.push(this.regionOutcome || "");
    return regionDiscoveryFields.join(",");
  }
  /**
   * Update the region discovery metadata
   *
   * @param regionDiscoveryMetadata
   * @returns void
   */
  updateRegionDiscoveryMetadata(regionDiscoveryMetadata) {
    this.regionUsed = regionDiscoveryMetadata.region_used;
    this.regionSource = regionDiscoveryMetadata.region_source;
    this.regionOutcome = regionDiscoveryMetadata.region_outcome;
  }
  /**
   * Set cache outcome
   */
  setCacheOutcome(cacheOutcome) {
    this.cacheOutcome = cacheOutcome;
  }
  setNativeBrokerErrorCode(errorCode) {
    const lastRequests = this.getLastRequests();
    lastRequests.nativeBrokerErrorCode = errorCode;
    this.cacheManager.setServerTelemetry(this.telemetryCacheKey, lastRequests, this.correlationId);
  }
  getNativeBrokerErrorCode() {
    return this.getLastRequests().nativeBrokerErrorCode;
  }
  clearNativeBrokerErrorCode() {
    const lastRequests = this.getLastRequests();
    delete lastRequests.nativeBrokerErrorCode;
    this.cacheManager.setServerTelemetry(this.telemetryCacheKey, lastRequests, this.correlationId);
  }
  static makeExtraSkuString(params) {
    return makeExtraSkuString(params);
  }
};

// ../../node_modules/@azure/msal-common/dist/client/SilentFlowClient.mjs
var SilentFlowClient = class {
  constructor(configuration, performanceClient) {
    this.config = buildClientConfiguration(configuration);
    this.logger = new Logger(this.config.loggerOptions, name, version);
    this.cryptoUtils = this.config.cryptoInterface;
    this.cacheManager = this.config.storageInterface;
    this.networkClient = this.config.networkInterface;
    this.serverTelemetryManager = this.config.serverTelemetryManager;
    this.authority = this.config.authOptions.authority;
    this.performanceClient = performanceClient;
  }
  /**
   * Retrieves token from cache or throws an error if it must be refreshed.
   * @param request
   */
  async acquireCachedToken(request) {
    let lastCacheOutcome = CacheOutcome.NOT_APPLICABLE;
    if (request.forceRefresh || !StringUtils.isEmptyObj(request.claims)) {
      this.setCacheOutcome(CacheOutcome.FORCE_REFRESH_OR_CLAIMS, request.correlationId);
      throw createClientAuthError(tokenRefreshRequired, request.correlationId);
    }
    if (!request.account) {
      throw createClientAuthError(noAccountInSilentRequest, request.correlationId);
    }
    const requestTenantId = request.account.tenantId || getTenantFromAuthorityString(request.authority, request.correlationId);
    const tokenKeys = this.cacheManager.getTokenKeys();
    const cachedAccessToken = this.cacheManager.getAccessToken(request.account, request, tokenKeys, requestTenantId);
    if (!cachedAccessToken) {
      this.setCacheOutcome(CacheOutcome.NO_CACHED_ACCESS_TOKEN, request.correlationId);
      throw createClientAuthError(tokenRefreshRequired, request.correlationId);
    } else if (wasClockTurnedBack(cachedAccessToken.cachedAt) || isTokenExpired(cachedAccessToken.expiresOn, this.config.systemOptions.tokenRenewalOffsetSeconds)) {
      this.setCacheOutcome(CacheOutcome.CACHED_ACCESS_TOKEN_EXPIRED, request.correlationId);
      throw createClientAuthError(tokenRefreshRequired, request.correlationId);
    } else if (request.resource) {
      if (cachedAccessToken.resource !== request.resource) {
        this.setCacheOutcome(CacheOutcome.NO_CACHED_ACCESS_TOKEN, request.correlationId);
        throw createClientAuthError(tokenRefreshRequired, request.correlationId);
      }
    } else if (cachedAccessToken.refreshOn && isTokenExpired(cachedAccessToken.refreshOn, 0)) {
      lastCacheOutcome = CacheOutcome.PROACTIVELY_REFRESHED;
    }
    const environment = request.authority || this.authority.getPreferredCache();
    const cacheRecord = {
      account: this.cacheManager.getAccount(this.cacheManager.generateAccountKey(request.account), request.correlationId),
      accessToken: cachedAccessToken,
      idToken: this.cacheManager.getIdToken(request.account, request.correlationId, tokenKeys, requestTenantId),
      refreshToken: null,
      appMetadata: this.cacheManager.readAppMetadataFromCache(environment, request.correlationId)
    };
    this.setCacheOutcome(lastCacheOutcome, request.correlationId);
    if (this.config.serverTelemetryManager) {
      this.config.serverTelemetryManager.incrementCacheHits();
    }
    return [
      await invokeAsync(this.generateResultFromCacheRecord.bind(this), SilentFlowClientGenerateResultFromCacheRecord, this.logger, this.performanceClient, request.correlationId)(cacheRecord, request),
      lastCacheOutcome
    ];
  }
  setCacheOutcome(cacheOutcome, correlationId) {
    this.serverTelemetryManager?.setCacheOutcome(cacheOutcome);
    this.performanceClient?.addFields({
      cacheOutcome
    }, correlationId);
    if (cacheOutcome !== CacheOutcome.NOT_APPLICABLE) {
      this.logger.info(`Token refresh is required due to cache outcome: '${cacheOutcome}'`, correlationId);
    }
  }
  /**
   * Helper function to build response object from the CacheRecord
   * @param cacheRecord
   */
  async generateResultFromCacheRecord(cacheRecord, request) {
    let idTokenClaims;
    if (cacheRecord.idToken) {
      idTokenClaims = extractTokenClaims(cacheRecord.idToken.secret, this.config.cryptoInterface.base64Decode, request.correlationId);
    }
    return ResponseHandler.generateAuthenticationResult(this.cryptoUtils, this.authority, cacheRecord, true, request, this.performanceClient, idTokenClaims);
  }
};

// ../../node_modules/@azure/msal-common/dist/request/BaseAuthRequest.mjs
function enforceResourceParameter(isMcp, request) {
  if (!isMcp) {
    return;
  }
  if (request.resource && (containsResourceParam(request.extraParameters) || containsResourceParam(request.extraQueryParameters))) {
    throw createClientAuthError(misplacedResourceParam, request.correlationId || "");
  }
  if (!request.resource) {
    throw createClientAuthError(resourceParameterRequired, request.correlationId || "");
  }
}
function containsResourceParam(params) {
  if (!params) {
    return false;
  }
  return Object.prototype.hasOwnProperty.call(params, "resource");
}

// ../../node_modules/@azure/msal-node/dist/cache/serializer/Deserializer.mjs
var Deserializer = class {
  /**
   * Parse the JSON blob in memory and deserialize the content
   * @param cachedJson - JSON blob cache
   */
  static deserializeJSONBlob(jsonFile) {
    const deserializedCache = !jsonFile ? {} : JSON.parse(jsonFile);
    return deserializedCache;
  }
  /**
   * Deserializes accounts to AccountEntity objects
   * @param accounts - accounts of type SerializedAccountEntity
   */
  static deserializeAccounts(accounts) {
    const accountObjects = {};
    if (accounts) {
      Object.keys(accounts).map(function(key) {
        const serializedAcc = accounts[key];
        const mappedAcc = {
          homeAccountId: serializedAcc.home_account_id,
          environment: serializedAcc.environment,
          realm: serializedAcc.realm,
          localAccountId: serializedAcc.local_account_id,
          username: serializedAcc.username,
          authorityType: serializedAcc.authority_type,
          name: serializedAcc.name,
          clientInfo: serializedAcc.client_info,
          lastModificationTime: serializedAcc.last_modification_time,
          lastModificationApp: serializedAcc.last_modification_app,
          tenantProfiles: serializedAcc.tenantProfiles?.map((serializedTenantProfile) => {
            return JSON.parse(serializedTenantProfile);
          }),
          lastUpdatedAt: Date.now().toString()
        };
        const account = {};
        CacheManager.toObject(account, mappedAcc);
        accountObjects[key] = account;
      });
    }
    return accountObjects;
  }
  /**
   * Deserializes id tokens to IdTokenEntity objects
   * @param idTokens - credentials of type SerializedIdTokenEntity
   */
  static deserializeIdTokens(idTokens) {
    const idObjects = {};
    if (idTokens) {
      Object.keys(idTokens).map(function(key) {
        const serializedIdT = idTokens[key];
        const idToken = {
          homeAccountId: serializedIdT.home_account_id,
          environment: serializedIdT.environment,
          credentialType: serializedIdT.credential_type,
          clientId: serializedIdT.client_id,
          secret: serializedIdT.secret,
          realm: serializedIdT.realm,
          lastUpdatedAt: Date.now().toString()
        };
        idObjects[key] = idToken;
      });
    }
    return idObjects;
  }
  /**
   * Deserializes access tokens to AccessTokenEntity objects
   * @param accessTokens - access tokens of type SerializedAccessTokenEntity
   */
  static deserializeAccessTokens(accessTokens) {
    const atObjects = {};
    if (accessTokens) {
      Object.keys(accessTokens).map(function(key) {
        const serializedAT = accessTokens[key];
        const accessToken = {
          homeAccountId: serializedAT.home_account_id,
          environment: serializedAT.environment,
          credentialType: serializedAT.credential_type,
          clientId: serializedAT.client_id,
          secret: serializedAT.secret,
          realm: serializedAT.realm,
          target: serializedAT.target,
          cachedAt: serializedAT.cached_at,
          expiresOn: serializedAT.expires_on,
          extendedExpiresOn: serializedAT.extended_expires_on,
          refreshOn: serializedAT.refresh_on,
          keyId: serializedAT.key_id,
          tokenType: serializedAT.token_type,
          userAssertionHash: serializedAT.userAssertionHash,
          resource: serializedAT.resource,
          additionalCacheKeyComponents: serializedAT.additionalCacheKeyComponents,
          lastUpdatedAt: Date.now().toString()
        };
        atObjects[key] = accessToken;
      });
    }
    return atObjects;
  }
  /**
   * Deserializes refresh tokens to RefreshTokenEntity objects
   * @param refreshTokens - refresh tokens of type SerializedRefreshTokenEntity
   */
  static deserializeRefreshTokens(refreshTokens) {
    const rtObjects = {};
    if (refreshTokens) {
      Object.keys(refreshTokens).map(function(key) {
        const serializedRT = refreshTokens[key];
        const refreshToken = {
          homeAccountId: serializedRT.home_account_id,
          environment: serializedRT.environment,
          credentialType: serializedRT.credential_type,
          clientId: serializedRT.client_id,
          secret: serializedRT.secret,
          familyId: serializedRT.family_id,
          target: serializedRT.target,
          realm: serializedRT.realm,
          lastUpdatedAt: Date.now().toString()
        };
        rtObjects[key] = refreshToken;
      });
    }
    return rtObjects;
  }
  /**
   * Deserializes appMetadata to AppMetaData objects
   * @param appMetadata - app metadata of type SerializedAppMetadataEntity
   */
  static deserializeAppMetadata(appMetadata) {
    const appMetadataObjects = {};
    if (appMetadata) {
      Object.keys(appMetadata).map(function(key) {
        const serializedAmdt = appMetadata[key];
        appMetadataObjects[key] = {
          clientId: serializedAmdt.client_id,
          environment: serializedAmdt.environment,
          familyId: serializedAmdt.family_id
        };
      });
    }
    return appMetadataObjects;
  }
  /**
   * Deserialize an inMemory Cache
   * @param jsonCache - JSON blob cache
   */
  static deserializeAllCache(jsonCache) {
    return {
      accounts: jsonCache.Account ? this.deserializeAccounts(jsonCache.Account) : {},
      idTokens: jsonCache.IdToken ? this.deserializeIdTokens(jsonCache.IdToken) : {},
      accessTokens: jsonCache.AccessToken ? this.deserializeAccessTokens(jsonCache.AccessToken) : {},
      refreshTokens: jsonCache.RefreshToken ? this.deserializeRefreshTokens(jsonCache.RefreshToken) : {},
      appMetadata: jsonCache.AppMetadata ? this.deserializeAppMetadata(jsonCache.AppMetadata) : {}
    };
  }
};

// ../../node_modules/@azure/msal-node/dist/utils/Constants.mjs
var DEFAULT_MANAGED_IDENTITY_ID = "system_assigned_managed_identity";
var MANAGED_IDENTITY_DEFAULT_TENANT = "managed_identity";
var DEFAULT_AUTHORITY_FOR_MANAGED_IDENTITY = `https://login.microsoftonline.com/${MANAGED_IDENTITY_DEFAULT_TENANT}/`;
var ManagedIdentityHeaders = {
  AUTHORIZATION_HEADER_NAME: "Authorization",
  METADATA_HEADER_NAME: "Metadata",
  APP_SERVICE_SECRET_HEADER_NAME: "X-IDENTITY-HEADER",
  ML_AND_SF_SECRET_HEADER_NAME: "secret",
  CLIENT_SKU: AADServerParamKeys_exports.X_CLIENT_SKU,
  CLIENT_VER: AADServerParamKeys_exports.X_CLIENT_VER,
  CLIENT_REQUEST_ID: "x-ms-client-request-id"
};
var ManagedIdentityQueryParameters = {
  API_VERSION: "api-version",
  RESOURCE: "resource",
  SHA256_TOKEN_TO_REFRESH: "token_sha256_to_refresh",
  XMS_CC: "xms_cc"
};
var ManagedIdentityEnvironmentVariableNames = {
  AZURE_POD_IDENTITY_AUTHORITY_HOST: "AZURE_POD_IDENTITY_AUTHORITY_HOST",
  DEFAULT_IDENTITY_CLIENT_ID: "DEFAULT_IDENTITY_CLIENT_ID",
  IDENTITY_ENDPOINT: "IDENTITY_ENDPOINT",
  IDENTITY_HEADER: "IDENTITY_HEADER",
  IDENTITY_SERVER_THUMBPRINT: "IDENTITY_SERVER_THUMBPRINT",
  IMDS_ENDPOINT: "IMDS_ENDPOINT",
  MSI_ENDPOINT: "MSI_ENDPOINT",
  MSI_SECRET: "MSI_SECRET"
};
var ManagedIdentitySourceNames = {
  APP_SERVICE: "AppService",
  AZURE_ARC: "AzureArc",
  CLOUD_SHELL: "CloudShell",
  DEFAULT_TO_IMDS: "DefaultToImds",
  IMDS: "Imds",
  MACHINE_LEARNING: "MachineLearning",
  SERVICE_FABRIC: "ServiceFabric"
};
var ManagedIdentityIdType = {
  SYSTEM_ASSIGNED: "system-assigned",
  USER_ASSIGNED_CLIENT_ID: "user-assigned-client-id",
  USER_ASSIGNED_RESOURCE_ID: "user-assigned-resource-id",
  USER_ASSIGNED_OBJECT_ID: "user-assigned-object-id"
};
var HttpMethod2 = {
  GET: "GET",
  POST: "POST"
};
var REGION_ENVIRONMENT_VARIABLE = "REGION_NAME";
var MSAL_FORCE_REGION = "MSAL_FORCE_REGION";
var RANDOM_OCTET_SIZE = 32;
var Hash = {
  SHA256: "sha256"
};
var CharSet = {
  CV_CHARSET: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~"
};
var CACHE = {
  KEY_SEPARATOR: "-"
};
var Constants = {
  MSAL_SKU: "msal.js.node",
  JWT_BEARER_ASSERTION_TYPE: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
  HTTP_PROTOCOL: "http://",
  LOCALHOST: "localhost"
};
var ApiId = {
  acquireTokenSilent: 62,
  acquireTokenByUsernamePassword: 371,
  acquireTokenByDeviceCode: 671,
  acquireTokenByClientCredential: 771,
  acquireTokenByOBO: 772,
  acquireTokenWithManagedIdentity: 773,
  acquireTokenByUserFederatedIdentityCredential: 774,
  acquireTokenByCode: 871,
  acquireTokenByRefreshToken: 872
};
var JwtConstants = {
  RSA_256: "RS256",
  PSS_256: "PS256",
  X5T_256: "x5t#S256",
  X5T: "x5t",
  X5C: "x5c",
  AUDIENCE: "aud",
  EXPIRATION_TIME: "exp",
  ISSUER: "iss",
  SUBJECT: "sub",
  NOT_BEFORE: "nbf",
  JWT_ID: "jti"
};
var LOOPBACK_SERVER_CONSTANTS = {
  INTERVAL_MS: 100,
  TIMEOUT_MS: 5e3
};
var AZURE_ARC_SECRET_FILE_MAX_SIZE_BYTES = 4096;

// ../../node_modules/@azure/msal-node/dist/network/HttpClient.mjs
var HttpClient = class {
  /**
   * Sends an HTTP GET request to the specified URL.
   *
   * This method handles GET requests with optional timeout support. The timeout
   * is implemented using AbortController, which provides a clean way to cancel
   * fetch requests that take too long to complete.
   *
   * @param url - The target URL for the GET request
   * @param options - Optional request configuration including headers
   * @param timeout - Optional timeout in milliseconds. If specified, the request
   *                  will be aborted if it doesn't complete within this time
   * @returns Promise that resolves to a NetworkResponse containing headers, body, and status
   * @throws {AuthError} When the request times out or response parsing fails
   * @throws {NetworkError} When the network request fails
   */
  async sendGetRequestAsync(url, options, timeout) {
    return this.sendRequest(url, HttpMethod2.GET, options, timeout);
  }
  /**
   * Sends an HTTP POST request to the specified URL.
   *
   * This method handles POST requests with request body support. Currently,
   * timeout functionality is not exposed for POST requests, but the underlying
   * implementation supports it through the shared sendRequest method.
   *
   * @param url - The target URL for the POST request
   * @param options - Optional request configuration including headers and body
   * @returns Promise that resolves to a NetworkResponse containing headers, body, and status
   * @throws {AuthError} When the request times out or response parsing fails
   * @throws {NetworkError} When the network request fails
   */
  async sendPostRequestAsync(url, options) {
    return this.sendRequest(url, HttpMethod2.POST, options);
  }
  /**
   * Core HTTP request implementation using native fetch API.
   *
   * This method handles GET and POST HTTP requests with comprehensive
   * timeout support and error handling. The timeout mechanism works as follows:
   *
   * 1. An AbortController is created for each request
   * 2. If a timeout is specified, setTimeout is used to call abort() after the delay
   * 3. The abort signal is passed to fetch, which will reject the promise if aborted
   * 4. Cleanup occurs in both success and error cases to prevent timer leaks
   *
   * Error handling priority:
   * 1. Timeout errors (AbortError) are converted to "Request timeout" messages
   * 2. Network/connection errors are wrapped with "Network request failed" prefix
   * 3. JSON parsing errors are wrapped with "Failed to parse response" prefix
   *
   * @param url - The target URL for the request
   * @param method - HTTP method (GET or POST)
   * @param options - Optional request configuration (headers, body)
   * @param timeout - Optional timeout in milliseconds for request cancellation
   * @returns Promise resolving to NetworkResponse with parsed JSON body
   * @throws {AuthError} For timeouts or JSON parsing errors
   * @throws {NetworkError} For network failures
   */
  async sendRequest(url, method, options, timeout) {
    const controller = new AbortController();
    let timeoutId;
    if (timeout) {
      timeoutId = setTimeout(() => {
        controller.abort();
      }, timeout);
    }
    const fetchOptions = {
      method,
      headers: getFetchHeaders(options),
      signal: controller.signal
      // Enable cancellation via AbortController
    };
    if (method === HttpMethod2.POST) {
      fetchOptions.body = options?.body || "";
    }
    let response;
    try {
      response = await fetch(url, fetchOptions);
    } catch (error) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (error instanceof Error && error.name === "AbortError") {
        throw createAuthError(ClientAuthErrorCodes_exports.networkError, "", "Request timeout");
      }
      const baseAuthError = createAuthError(ClientAuthErrorCodes_exports.networkError, "", `Network request failed: ${error instanceof Error ? error.message : "unknown"}`);
      throw createNetworkError(baseAuthError, void 0, void 0, error instanceof Error ? error : void 0);
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    try {
      return {
        headers: getHeaderDict(response.headers),
        body: await response.json(),
        status: response.status
      };
    } catch (error) {
      throw createAuthError(ClientAuthErrorCodes_exports.tokenParsingError, "", `Failed to parse response: ${error instanceof Error ? error.message : "unknown"}`);
    }
  }
};
function getHeaderDict(headers) {
  const headerDict = {};
  headers.forEach((value, key) => {
    headerDict[key] = value;
  });
  return headerDict;
}
function getFetchHeaders(options) {
  const headers = new Headers();
  if (!(options && options.headers)) {
    return headers;
  }
  Object.entries(options.headers).forEach(([key, value]) => {
    headers.append(key, value);
  });
  return headers;
}

// ../../node_modules/@azure/msal-node/dist/error/ManagedIdentityErrorCodes.mjs
var invalidFileExtension = "invalid_file_extension";
var invalidFilePath = "invalid_file_path";
var invalidManagedIdentityIdType = "invalid_managed_identity_id_type";
var invalidSecret = "invalid_secret";
var missingId = "missing_client_id";
var networkUnavailable = "network_unavailable";
var platformNotSupported = "platform_not_supported";
var unableToCreateAzureArc = "unable_to_create_azure_arc";
var unableToCreateCloudShell = "unable_to_create_cloud_shell";
var unableToCreateSource = "unable_to_create_source";
var unableToReadSecretFile = "unable_to_read_secret_file";
var userAssignedNotAvailableAtRuntime = "user_assigned_not_available_at_runtime";
var wwwAuthenticateHeaderMissing = "www_authenticate_header_missing";
var wwwAuthenticateHeaderUnsupportedFormat = "www_authenticate_header_unsupported_format";
var MsiEnvironmentVariableUrlMalformedErrorCodes = {
  [ManagedIdentityEnvironmentVariableNames.AZURE_POD_IDENTITY_AUTHORITY_HOST]: "azure_pod_identity_authority_host_url_malformed",
  [ManagedIdentityEnvironmentVariableNames.IDENTITY_ENDPOINT]: "identity_endpoint_url_malformed",
  [ManagedIdentityEnvironmentVariableNames.IMDS_ENDPOINT]: "imds_endpoint_url_malformed",
  [ManagedIdentityEnvironmentVariableNames.MSI_ENDPOINT]: "msi_endpoint_url_malformed"
};

// ../../node_modules/@azure/msal-node/dist/error/ManagedIdentityError.mjs
var ManagedIdentityErrorMessages = {
  [invalidFileExtension]: "The file path in the WWW-Authenticate header does not contain a .key file.",
  [invalidFilePath]: "The file path in the WWW-Authenticate header is not in a valid Windows or Linux Format.",
  [invalidManagedIdentityIdType]: "More than one ManagedIdentityIdType was provided.",
  [invalidSecret]: "The secret in the file on the file path in the WWW-Authenticate header is greater than 4096 bytes.",
  [platformNotSupported]: "The platform is not supported by Azure Arc. Azure Arc only supports Windows and Linux.",
  [missingId]: "A ManagedIdentityId id was not provided.",
  [MsiEnvironmentVariableUrlMalformedErrorCodes.AZURE_POD_IDENTITY_AUTHORITY_HOST]: `The Managed Identity's '${ManagedIdentityEnvironmentVariableNames.AZURE_POD_IDENTITY_AUTHORITY_HOST}' environment variable is malformed.`,
  [MsiEnvironmentVariableUrlMalformedErrorCodes.IDENTITY_ENDPOINT]: `The Managed Identity's '${ManagedIdentityEnvironmentVariableNames.IDENTITY_ENDPOINT}' environment variable is malformed.`,
  [MsiEnvironmentVariableUrlMalformedErrorCodes.IMDS_ENDPOINT]: `The Managed Identity's '${ManagedIdentityEnvironmentVariableNames.IMDS_ENDPOINT}' environment variable is malformed.`,
  [MsiEnvironmentVariableUrlMalformedErrorCodes.MSI_ENDPOINT]: `The Managed Identity's '${ManagedIdentityEnvironmentVariableNames.MSI_ENDPOINT}' environment variable is malformed.`,
  [networkUnavailable]: "Authentication unavailable. The request to the managed identity endpoint timed out.",
  [unableToCreateAzureArc]: "Azure Arc Managed Identities can only be system assigned.",
  [unableToCreateCloudShell]: "Cloud Shell Managed Identities can only be system assigned.",
  [unableToCreateSource]: "Unable to create a Managed Identity source based on environment variables.",
  [unableToReadSecretFile]: "Unable to read the secret file.",
  [userAssignedNotAvailableAtRuntime]: "Service Fabric user assigned managed identity ClientId or ResourceId is not configurable at runtime.",
  [wwwAuthenticateHeaderMissing]: "A 401 response was received form the Azure Arc Managed Identity, but the www-authenticate header is missing.",
  [wwwAuthenticateHeaderUnsupportedFormat]: "A 401 response was received form the Azure Arc Managed Identity, but the www-authenticate header is in an unsupported format."
};
var ManagedIdentityError = class _ManagedIdentityError extends AuthError2 {
  constructor(errorCode, correlationId) {
    super(errorCode, correlationId, ManagedIdentityErrorMessages[errorCode]);
    this.name = "ManagedIdentityError";
    Object.setPrototypeOf(this, _ManagedIdentityError.prototype);
  }
};
function createManagedIdentityError(errorCode, correlationId) {
  return new ManagedIdentityError(errorCode, correlationId);
}

// ../../node_modules/@azure/msal-node/dist/config/ManagedIdentityId.mjs
var ManagedIdentityId = class {
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }
  get idType() {
    return this._idType;
  }
  set idType(value) {
    this._idType = value;
  }
  constructor(managedIdentityIdParams) {
    const userAssignedClientId = managedIdentityIdParams?.userAssignedClientId;
    const userAssignedResourceId = managedIdentityIdParams?.userAssignedResourceId;
    const userAssignedObjectId = managedIdentityIdParams?.userAssignedObjectId;
    if (userAssignedClientId) {
      if (userAssignedResourceId || userAssignedObjectId) {
        throw createManagedIdentityError(invalidManagedIdentityIdType, "");
      }
      this.id = userAssignedClientId;
      this.idType = ManagedIdentityIdType.USER_ASSIGNED_CLIENT_ID;
    } else if (userAssignedResourceId) {
      if (userAssignedClientId || userAssignedObjectId) {
        throw createManagedIdentityError(invalidManagedIdentityIdType, "");
      }
      this.id = userAssignedResourceId;
      this.idType = ManagedIdentityIdType.USER_ASSIGNED_RESOURCE_ID;
    } else if (userAssignedObjectId) {
      if (userAssignedClientId || userAssignedResourceId) {
        throw createManagedIdentityError(invalidManagedIdentityIdType, "");
      }
      this.id = userAssignedObjectId;
      this.idType = ManagedIdentityIdType.USER_ASSIGNED_OBJECT_ID;
    } else {
      this.id = DEFAULT_MANAGED_IDENTITY_ID;
      this.idType = ManagedIdentityIdType.SYSTEM_ASSIGNED;
    }
  }
};

// ../../node_modules/@azure/msal-node/dist/error/NodeAuthError.mjs
var NodeAuthErrorMessage = {
  invalidLoopbackAddressType: {
    code: "invalid_loopback_server_address_type",
    desc: "Loopback server address is not type string. This is unexpected."
  },
  unableToLoadRedirectUri: {
    code: "unable_to_load_redirectUrl",
    desc: "Loopback server callback was invoked without a url. This is unexpected."
  },
  noAuthCodeInResponse: {
    code: "no_auth_code_in_response",
    desc: "No auth code found in the server response. Please check your network trace to determine what happened."
  },
  noLoopbackServerExists: {
    code: "no_loopback_server_exists",
    desc: "No loopback server exists yet."
  },
  loopbackServerAlreadyExists: {
    code: "loopback_server_already_exists",
    desc: "Loopback server already exists. Cannot create another."
  },
  loopbackServerTimeout: {
    code: "loopback_server_timeout",
    desc: "Timed out waiting for auth code listener to be registered."
  },
  stateNotFoundError: {
    code: "state_not_found",
    desc: "State not found. Please verify that the request originated from msal."
  },
  thumbprintMissing: {
    code: "thumbprint_missing_from_client_certificate",
    desc: "Client certificate does not contain a SHA-1 or SHA-256 thumbprint."
  },
  redirectUriNotSupported: {
    code: "redirect_uri_not_supported",
    desc: "RedirectUri is not supported in this scenario. Please remove redirectUri from the request."
  }
};
var NodeAuthError = class _NodeAuthError extends AuthError2 {
  constructor(errorCode, correlationId, errorMessage) {
    super(errorCode, correlationId, errorMessage);
    this.name = "NodeAuthError";
  }
  /**
   * Creates an error thrown if loopback server address is of type string.
   */
  static createInvalidLoopbackAddressTypeError() {
    return new _NodeAuthError(NodeAuthErrorMessage.invalidLoopbackAddressType.code, "", `${NodeAuthErrorMessage.invalidLoopbackAddressType.desc}`);
  }
  /**
   * Creates an error thrown if the loopback server is unable to get a url.
   */
  static createUnableToLoadRedirectUrlError() {
    return new _NodeAuthError(NodeAuthErrorMessage.unableToLoadRedirectUri.code, "", `${NodeAuthErrorMessage.unableToLoadRedirectUri.desc}`);
  }
  /**
   * Creates an error thrown if the server response does not contain an auth code.
   */
  static createNoAuthCodeInResponseError(correlationId = "") {
    return new _NodeAuthError(NodeAuthErrorMessage.noAuthCodeInResponse.code, correlationId, `${NodeAuthErrorMessage.noAuthCodeInResponse.desc}`);
  }
  /**
   * Creates an error thrown if the loopback server has not been spun up yet.
   */
  static createNoLoopbackServerExistsError() {
    return new _NodeAuthError(NodeAuthErrorMessage.noLoopbackServerExists.code, "", `${NodeAuthErrorMessage.noLoopbackServerExists.desc}`);
  }
  /**
   * Creates an error thrown if a loopback server already exists when attempting to create another one.
   */
  static createLoopbackServerAlreadyExistsError() {
    return new _NodeAuthError(NodeAuthErrorMessage.loopbackServerAlreadyExists.code, "", `${NodeAuthErrorMessage.loopbackServerAlreadyExists.desc}`);
  }
  /**
   * Creates an error thrown if the loopback server times out registering the auth code listener.
   */
  static createLoopbackServerTimeoutError(correlationId = "") {
    return new _NodeAuthError(NodeAuthErrorMessage.loopbackServerTimeout.code, correlationId, `${NodeAuthErrorMessage.loopbackServerTimeout.desc}`);
  }
  /**
   * Creates an error thrown when the state is not present.
   */
  static createStateNotFoundError(correlationId = "") {
    return new _NodeAuthError(NodeAuthErrorMessage.stateNotFoundError.code, correlationId, NodeAuthErrorMessage.stateNotFoundError.desc);
  }
  /**
   * Creates an error thrown when client certificate was provided, but neither the SHA-1 or SHA-256 thumbprints were provided
   */
  static createThumbprintMissingError() {
    return new _NodeAuthError(NodeAuthErrorMessage.thumbprintMissing.code, "", NodeAuthErrorMessage.thumbprintMissing.desc);
  }
  /**
   * Creates an error thrown when redirectUri is provided in an unsupported scenario
   */
  static createRedirectUriNotSupportedError(correlationId = "") {
    return new _NodeAuthError(NodeAuthErrorMessage.redirectUriNotSupported.code, correlationId, NodeAuthErrorMessage.redirectUriNotSupported.desc);
  }
};

// ../../node_modules/@azure/msal-node/dist/config/Configuration.mjs
var DEFAULT_AUTH_OPTIONS = {
  clientId: "",
  authority: Constants_exports.DEFAULT_AUTHORITY,
  clientSecret: "",
  clientAssertion: "",
  clientCertificate: {
    thumbprint: "",
    thumbprintSha256: "",
    privateKey: "",
    x5c: ""
  },
  knownAuthorities: [],
  cloudDiscoveryMetadata: "",
  authorityMetadata: "",
  clientCapabilities: [],
  azureCloudOptions: {
    azureCloudInstance: AzureCloudInstance.None,
    tenant: ""
  },
  isMcp: false
};
var DEFAULT_LOGGER_OPTIONS = {
  loggerCallback: () => {
  },
  piiLoggingEnabled: false,
  logLevel: LogLevel.Info
};
var DEFAULT_SYSTEM_OPTIONS2 = {
  loggerOptions: DEFAULT_LOGGER_OPTIONS,
  networkClient: new HttpClient(),
  disableInternalRetries: false,
  protocolMode: ProtocolMode.AAD
};
var DEFAULT_TELEMETRY_OPTIONS2 = {
  application: {
    appName: "",
    appVersion: ""
  }
};
function buildAppConfiguration({ auth, broker, cache, system, telemetry }) {
  const systemOptions = {
    ...DEFAULT_SYSTEM_OPTIONS2,
    networkClient: new HttpClient(),
    loggerOptions: system?.loggerOptions || DEFAULT_LOGGER_OPTIONS,
    disableInternalRetries: system?.disableInternalRetries || false
  };
  if (!!auth.clientCertificate && !!!auth.clientCertificate.thumbprint && !!!auth.clientCertificate.thumbprintSha256) {
    throw NodeAuthError.createStateNotFoundError();
  }
  return {
    auth: { ...DEFAULT_AUTH_OPTIONS, ...auth },
    broker: { ...broker },
    cache: { ...cache },
    system: { ...systemOptions, ...system },
    telemetry: { ...DEFAULT_TELEMETRY_OPTIONS2, ...telemetry }
  };
}
function buildManagedIdentityConfiguration({ clientCapabilities, managedIdentityIdParams, system }) {
  const managedIdentityId = new ManagedIdentityId(managedIdentityIdParams);
  const loggerOptions = system?.loggerOptions || DEFAULT_LOGGER_OPTIONS;
  let networkClient;
  if (system?.networkClient) {
    networkClient = system.networkClient;
  } else {
    networkClient = new HttpClient();
  }
  return {
    clientCapabilities: clientCapabilities || [],
    managedIdentityId,
    system: {
      loggerOptions,
      networkClient
    },
    disableInternalRetries: system?.disableInternalRetries || false
  };
}

// ../../node_modules/@azure/msal-node/dist/crypto/GuidGenerator.mjs
import { randomUUID } from "crypto";
var GuidGenerator = class {
  /**
   * Generates a random [RFC 4122](https://www.rfc-editor.org/rfc/rfc4122.txt) version 4 UUID. The UUID is generated using a
   * cryptographic pseudorandom number generator.
   */
  generateGuid() {
    return randomUUID();
  }
  /**
   * verifies if a string is  GUID
   * @param guid
   */
  isGuid(guid) {
    const regexGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regexGuid.test(guid);
  }
};

// ../../node_modules/@azure/msal-node/dist/utils/EncodingUtils.mjs
var EncodingUtils = class _EncodingUtils {
  /**
   * 'utf8': Multibyte encoded Unicode characters. Many web pages and other document formats use UTF-8.
   * 'base64': Base64 encoding.
   *
   * @param str text
   */
  static base64Encode(str, encoding) {
    return Buffer.from(str, encoding).toString(Constants_exports.EncodingTypes.BASE64);
  }
  /**
   * encode a URL
   * @param str
   */
  static base64EncodeUrl(str, encoding) {
    return _EncodingUtils.base64Encode(str, encoding).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  }
  /**
   * 'utf8': Multibyte encoded Unicode characters. Many web pages and other document formats use UTF-8.
   * 'base64': Base64 encoding.
   *
   * @param base64Str Base64 encoded text
   */
  static base64Decode(base64Str) {
    return Buffer.from(base64Str, Constants_exports.EncodingTypes.BASE64).toString("utf8");
  }
  /**
   * @param base64Str Base64 encoded Url
   */
  static base64DecodeUrl(base64Str) {
    let str = base64Str.replace(/-/g, "+").replace(/_/g, "/");
    while (str.length % 4) {
      str += "=";
    }
    return _EncodingUtils.base64Decode(str);
  }
};

// ../../node_modules/@azure/msal-node/dist/crypto/HashUtils.mjs
import crypto2 from "crypto";
var HashUtils = class {
  /**
   * generate 'SHA256' hash
   * @param buffer
   */
  sha256(buffer) {
    return crypto2.createHash(Hash.SHA256).update(buffer).digest();
  }
};

// ../../node_modules/@azure/msal-node/dist/crypto/PkceGenerator.mjs
import crypto3 from "crypto";
var PkceGenerator = class {
  constructor() {
    this.hashUtils = new HashUtils();
  }
  /**
   * generates the codeVerfier and the challenge from the codeVerfier
   * reference: https://tools.ietf.org/html/rfc7636#section-4.1 and https://tools.ietf.org/html/rfc7636#section-4.2
   */
  async generatePkceCodes() {
    const verifier = this.generateCodeVerifier();
    const challenge = this.generateCodeChallengeFromVerifier(verifier);
    return { verifier, challenge };
  }
  /**
   * generates the codeVerfier; reference: https://tools.ietf.org/html/rfc7636#section-4.1
   */
  generateCodeVerifier() {
    const charArr = [];
    const maxNumber = 256 - 256 % CharSet.CV_CHARSET.length;
    while (charArr.length <= RANDOM_OCTET_SIZE) {
      const byte = crypto3.randomBytes(1)[0];
      if (byte >= maxNumber) {
        continue;
      }
      const index = byte % CharSet.CV_CHARSET.length;
      charArr.push(CharSet.CV_CHARSET[index]);
    }
    const verifier = charArr.join("");
    return EncodingUtils.base64EncodeUrl(verifier);
  }
  /**
   * generate the challenge from the codeVerfier; reference: https://tools.ietf.org/html/rfc7636#section-4.2
   * @param codeVerifier
   */
  generateCodeChallengeFromVerifier(codeVerifier) {
    return EncodingUtils.base64EncodeUrl(this.hashUtils.sha256(codeVerifier).toString(Constants_exports.EncodingTypes.BASE64), Constants_exports.EncodingTypes.BASE64);
  }
};

// ../../node_modules/@azure/msal-node/dist/crypto/CryptoProvider.mjs
var CryptoProvider = class {
  constructor() {
    this.pkceGenerator = new PkceGenerator();
    this.guidGenerator = new GuidGenerator();
    this.hashUtils = new HashUtils();
  }
  /**
   * base64 URL safe encoded string
   */
  base64UrlEncode() {
    throw new Error("Method not implemented.");
  }
  /**
   * Stringifies and base64Url encodes input public key
   * @param inputKid - public key id
   * @returns Base64Url encoded public key
   */
  encodeKid() {
    throw new Error("Method not implemented.");
  }
  /**
   * Creates a new random GUID - used to populate state and nonce.
   * @returns string (GUID)
   */
  createNewGuid() {
    return this.guidGenerator.generateGuid();
  }
  /**
   * Encodes input string to base64.
   * @param input - string to be encoded
   */
  base64Encode(input) {
    return EncodingUtils.base64Encode(input);
  }
  /**
   * Decodes input string from base64.
   * @param input - string to be decoded
   */
  base64Decode(input) {
    return EncodingUtils.base64Decode(input);
  }
  /**
   * Generates PKCE codes used in Authorization Code Flow.
   */
  generatePkceCodes() {
    return this.pkceGenerator.generatePkceCodes();
  }
  /**
   * Generates a keypair, stores it and returns a thumbprint - not yet implemented for node
   */
  getPublicKeyThumbprint() {
    throw new Error("Method not implemented.");
  }
  /**
   * Removes cryptographic keypair from key store matching the keyId passed in
   * @param kid - public key id
   */
  removeTokenBindingKey() {
    throw new Error("Method not implemented.");
  }
  /**
   * Removes all cryptographic keys from Keystore
   */
  clearKeystore() {
    throw new Error("Method not implemented.");
  }
  /**
   * Signs the given object as a jwt payload with private key retrieved by given kid - currently not implemented for node
   */
  signJwt() {
    throw new Error("Method not implemented.");
  }
  /**
   * Returns the SHA-256 hash of an input string
   */
  async hashString(plainText) {
    return EncodingUtils.base64EncodeUrl(this.hashUtils.sha256(plainText).toString(Constants_exports.EncodingTypes.BASE64), Constants_exports.EncodingTypes.BASE64);
  }
};

// ../../node_modules/@azure/msal-node/dist/cache/CacheHelpers.mjs
import { createHash } from "crypto";
function computeAdditionalCacheKeyHash(components) {
  const sortedKeys = Object.keys(components).sort();
  const input = sortedKeys.map((k) => k + components[k]).join("");
  return createHash("sha256").update(input, "utf8").digest("base64url");
}
function generateCredentialKey(credential) {
  const familyId = credential.credentialType === Constants_exports.CredentialType.REFRESH_TOKEN && credential.familyId || credential.clientId;
  const scheme = credential.tokenType && credential.tokenType.toLowerCase() !== Constants_exports.AuthenticationScheme.BEARER.toLowerCase() ? credential.tokenType.toLowerCase() : "";
  const credentialKey = [
    credential.homeAccountId,
    credential.environment,
    credential.credentialType,
    familyId,
    credential.realm || "",
    credential.target || "",
    scheme
  ];
  if (credential.additionalCacheKeyComponents && Object.keys(credential.additionalCacheKeyComponents).length > 0) {
    credentialKey.push(computeAdditionalCacheKeyHash(credential.additionalCacheKeyComponents));
  }
  return credentialKey.join(CACHE.KEY_SEPARATOR).toLowerCase();
}
function generateAccountKey(account) {
  const homeTenantId = account.homeAccountId.split(".")[1];
  const accountKey = [
    account.homeAccountId,
    account.environment,
    homeTenantId || account.tenantId || ""
  ];
  return accountKey.join(CACHE.KEY_SEPARATOR).toLowerCase();
}

// ../../node_modules/@azure/msal-node/dist/cache/NodeStorage.mjs
var NodeStorage = class extends CacheManager {
  constructor(logger27, clientId, cryptoImpl, staticAuthorityOptions) {
    super(clientId, cryptoImpl, logger27, new StubPerformanceClient(), staticAuthorityOptions);
    this.cache = {};
    this.changeEmitters = [];
    this.logger = logger27;
  }
  /**
   * Queue up callbacks
   * @param func - a callback function for cache change indication
   */
  registerChangeEmitter(func) {
    this.changeEmitters.push(func);
  }
  /**
   * Invoke the callback when cache changes
   */
  emitChange() {
    this.changeEmitters.forEach((func) => func.call(null));
  }
  /**
   * Converts cacheKVStore to InMemoryCache
   * @param cache - key value store
   */
  cacheToInMemoryCache(cache) {
    const inMemoryCache = {
      accounts: {},
      idTokens: {},
      accessTokens: {},
      refreshTokens: {},
      appMetadata: {}
    };
    for (const key in cache) {
      const value = cache[key];
      if (typeof value !== "object") {
        continue;
      }
      if (AccountEntityUtils_exports.isAccountEntity(value)) {
        inMemoryCache.accounts[key] = value;
      } else if (CacheHelpers_exports.isIdTokenEntity(value)) {
        inMemoryCache.idTokens[key] = value;
      } else if (CacheHelpers_exports.isAccessTokenEntity(value)) {
        inMemoryCache.accessTokens[key] = value;
      } else if (CacheHelpers_exports.isRefreshTokenEntity(value)) {
        inMemoryCache.refreshTokens[key] = value;
      } else if (CacheHelpers_exports.isAppMetadataEntity(key, value)) {
        inMemoryCache.appMetadata[key] = value;
      } else {
        continue;
      }
    }
    return inMemoryCache;
  }
  /**
   * converts inMemoryCache to CacheKVStore
   * @param inMemoryCache - kvstore map for inmemory
   */
  inMemoryCacheToCache(inMemoryCache) {
    let cache = this.getCache();
    cache = {
      ...cache,
      ...inMemoryCache.accounts,
      ...inMemoryCache.idTokens,
      ...inMemoryCache.accessTokens,
      ...inMemoryCache.refreshTokens,
      ...inMemoryCache.appMetadata
    };
    return cache;
  }
  /**
   * gets the current in memory cache for the client
   */
  getInMemoryCache() {
    this.logger.trace("Getting in-memory cache", "");
    const inMemoryCache = this.cacheToInMemoryCache(this.getCache());
    return inMemoryCache;
  }
  /**
   * sets the current in memory cache for the client
   * @param inMemoryCache - key value map in memory
   */
  setInMemoryCache(inMemoryCache) {
    this.logger.trace("Setting in-memory cache", "");
    const cache = this.inMemoryCacheToCache(inMemoryCache);
    this.setCache(cache);
    this.emitChange();
  }
  /**
   * get the current cache key-value store
   */
  getCache() {
    this.logger.trace("Getting cache key-value store", "");
    return this.cache;
  }
  /**
   * sets the current cache (key value store)
   * @param cacheMap - key value map
   */
  setCache(cache) {
    this.logger.trace("Setting cache key value store", "");
    this.cache = cache;
    this.emitChange();
  }
  /**
   * Gets cache item with given key.
   * @param key - lookup key for the cache entry
   */
  getItem(key) {
    this.logger.tracePii(`Item key: ${key}`, "");
    const cache = this.getCache();
    return cache[key];
  }
  /**
   * Gets cache item with given key-value
   * @param key - lookup key for the cache entry
   * @param value - value of the cache entry
   */
  setItem(key, value) {
    this.logger.tracePii(`Item key: ${key}`, "");
    const cache = this.getCache();
    cache[key] = value;
    this.setCache(cache);
  }
  generateCredentialKey(credential) {
    return generateCredentialKey(credential);
  }
  generateAccountKey(account) {
    return generateAccountKey(account);
  }
  getAccountKeys() {
    const inMemoryCache = this.getInMemoryCache();
    const accountKeys = Object.keys(inMemoryCache.accounts);
    return accountKeys;
  }
  getTokenKeys() {
    const inMemoryCache = this.getInMemoryCache();
    const tokenKeys = {
      idToken: Object.keys(inMemoryCache.idTokens),
      accessToken: Object.keys(inMemoryCache.accessTokens),
      refreshToken: Object.keys(inMemoryCache.refreshTokens)
    };
    return tokenKeys;
  }
  /**
   * Reads account from cache, builds it into an account entity and returns it.
   * @param accountKey - lookup key to fetch cache type AccountEntity
   * @returns
   */
  getAccount(accountKey) {
    const cachedAccount = this.getItem(accountKey);
    return cachedAccount && typeof cachedAccount === "object" ? { ...cachedAccount } : null;
  }
  /**
   * set account entity
   * @param account - cache value to be set of type AccountEntity
   */
  async setAccount(account) {
    const accountKey = this.generateAccountKey(AccountEntityUtils_exports.getAccountInfo(account));
    this.setItem(accountKey, account);
  }
  /**
   * fetch the idToken credential
   * @param idTokenKey - lookup key to fetch cache type IdTokenEntity
   */
  getIdTokenCredential(idTokenKey) {
    const idToken = this.getItem(idTokenKey);
    if (CacheHelpers_exports.isIdTokenEntity(idToken)) {
      return idToken;
    }
    return null;
  }
  /**
   * set idToken credential
   * @param idToken - cache value to be set of type IdTokenEntity
   */
  async setIdTokenCredential(idToken) {
    const idTokenKey = this.generateCredentialKey(idToken);
    this.setItem(idTokenKey, idToken);
  }
  /**
   * fetch the accessToken credential
   * @param accessTokenKey - lookup key to fetch cache type AccessTokenEntity
   */
  getAccessTokenCredential(accessTokenKey) {
    const accessToken = this.getItem(accessTokenKey);
    if (CacheHelpers_exports.isAccessTokenEntity(accessToken)) {
      return accessToken;
    }
    return null;
  }
  /**
   * set accessToken credential
   * @param accessToken -  cache value to be set of type AccessTokenEntity
   */
  async setAccessTokenCredential(accessToken) {
    const accessTokenKey = this.generateCredentialKey(accessToken);
    this.setItem(accessTokenKey, accessToken);
  }
  /**
   * fetch the refreshToken credential
   * @param refreshTokenKey - lookup key to fetch cache type RefreshTokenEntity
   */
  getRefreshTokenCredential(refreshTokenKey) {
    const refreshToken = this.getItem(refreshTokenKey);
    if (CacheHelpers_exports.isRefreshTokenEntity(refreshToken)) {
      return refreshToken;
    }
    return null;
  }
  /**
   * set refreshToken credential
   * @param refreshToken - cache value to be set of type RefreshTokenEntity
   */
  async setRefreshTokenCredential(refreshToken) {
    const refreshTokenKey = this.generateCredentialKey(refreshToken);
    this.setItem(refreshTokenKey, refreshToken);
  }
  /**
   * fetch appMetadata entity from the platform cache
   * @param appMetadataKey - lookup key to fetch cache type AppMetadataEntity
   */
  getAppMetadata(appMetadataKey) {
    const appMetadata = this.getItem(appMetadataKey);
    if (CacheHelpers_exports.isAppMetadataEntity(appMetadataKey, appMetadata)) {
      return appMetadata;
    }
    return null;
  }
  /**
   * set appMetadata entity to the platform cache
   * @param appMetadata - cache value to be set of type AppMetadataEntity
   */
  setAppMetadata(appMetadata) {
    const appMetadataKey = CacheHelpers_exports.generateAppMetadataKey(appMetadata);
    this.setItem(appMetadataKey, appMetadata);
  }
  /**
   * fetch server telemetry entity from the platform cache
   * @param serverTelemetrykey - lookup key to fetch cache type ServerTelemetryEntity
   */
  getServerTelemetry(serverTelemetrykey) {
    const serverTelemetryEntity = this.getItem(serverTelemetrykey);
    if (serverTelemetryEntity && CacheHelpers_exports.isServerTelemetryEntity(serverTelemetrykey, serverTelemetryEntity)) {
      return serverTelemetryEntity;
    }
    return null;
  }
  /**
   * set server telemetry entity to the platform cache
   * @param serverTelemetryKey - lookup key to fetch cache type ServerTelemetryEntity
   * @param serverTelemetry - cache value to be set of type ServerTelemetryEntity
   */
  setServerTelemetry(serverTelemetryKey, serverTelemetry) {
    this.setItem(serverTelemetryKey, serverTelemetry);
  }
  /**
   * fetch authority metadata entity from the platform cache
   * @param key - lookup key to fetch cache type AuthorityMetadataEntity
   */
  getAuthorityMetadata(key) {
    const authorityMetadataEntity = this.getItem(key);
    if (authorityMetadataEntity && CacheHelpers_exports.isAuthorityMetadataEntity(key, authorityMetadataEntity)) {
      return authorityMetadataEntity;
    }
    return null;
  }
  /**
   * Get all authority metadata keys
   */
  getAuthorityMetadataKeys() {
    return this.getKeys().filter((key) => {
      return this.isAuthorityMetadata(key);
    });
  }
  /**
   * set authority metadata entity to the platform cache
   * @param key - lookup key to fetch cache type AuthorityMetadataEntity
   * @param metadata - cache value to be set of type AuthorityMetadataEntity
   */
  setAuthorityMetadata(key, metadata) {
    this.setItem(key, metadata);
  }
  /**
   * fetch throttling entity from the platform cache
   * @param throttlingCacheKey - lookup key to fetch cache type ThrottlingEntity
   */
  getThrottlingCache(throttlingCacheKey) {
    const throttlingCache = this.getItem(throttlingCacheKey);
    if (throttlingCache && CacheHelpers_exports.isThrottlingEntity(throttlingCacheKey, throttlingCache)) {
      return throttlingCache;
    }
    return null;
  }
  /**
   * set throttling entity to the platform cache
   * @param throttlingCacheKey - lookup key to fetch cache type ThrottlingEntity
   * @param throttlingCache - cache value to be set of type ThrottlingEntity
   */
  setThrottlingCache(throttlingCacheKey, throttlingCache) {
    this.setItem(throttlingCacheKey, throttlingCache);
  }
  /**
   * Removes the cache item from memory with the given key.
   * @param key - lookup key to remove a cache entity
   * @param inMemory - key value map of the cache
   */
  removeItem(key) {
    this.logger.tracePii(`Item key: ${key}`, "");
    let result = false;
    const cache = this.getCache();
    if (!!cache[key]) {
      delete cache[key];
      result = true;
    }
    if (result) {
      this.setCache(cache);
      this.emitChange();
    }
    return result;
  }
  /**
   * Remove account entity from the platform cache if it's outdated
   * @param accountKey - lookup key to fetch cache type AccountEntity
   */
  removeOutdatedAccount(accountKey) {
    this.removeItem(accountKey);
  }
  /**
   * Checks whether key is in cache.
   * @param key - look up key for a cache entity
   */
  containsKey(key) {
    return this.getKeys().includes(key);
  }
  /**
   * Gets all keys in window.
   */
  getKeys() {
    this.logger.trace("Retrieving all cache keys", "");
    const cache = this.getCache();
    return [...Object.keys(cache)];
  }
  /**
   * Clears all cache entries created by MSAL except authority metadata..
   */
  clear() {
    this.logger.trace("Clearing cache entries created by MSAL", "");
    const cacheKeys = this.getKeys();
    cacheKeys.forEach((key) => {
      if (this.isAuthorityMetadata(key)) {
        return;
      }
      this.removeItem(key);
    });
    this.emitChange();
  }
  /**
   * Initialize in memory cache from an exisiting cache vault
   * @param cache - blob formatted cache (JSON)
   */
  static generateInMemoryCache(cache) {
    return Deserializer.deserializeAllCache(Deserializer.deserializeJSONBlob(cache));
  }
  /**
   * retrieves the final JSON
   * @param inMemoryCache - itemised cache read from the JSON
   */
  static generateJsonCache(inMemoryCache) {
    return Serializer.serializeAllCache(inMemoryCache);
  }
  /**
   * Updates a credential's cache key if the current cache key is outdated
   */
  updateCredentialCacheKey(currentCacheKey, credential) {
    const updatedCacheKey = this.generateCredentialKey(credential);
    if (currentCacheKey !== updatedCacheKey) {
      const cacheItem = this.getItem(currentCacheKey);
      if (cacheItem) {
        this.removeItem(currentCacheKey);
        this.setItem(updatedCacheKey, cacheItem);
        this.logger.verbose(`Updated an outdated ${credential.credentialType} cache key`, "");
        return updatedCacheKey;
      } else {
        this.logger.error(`Attempted to update an outdated ${credential.credentialType} cache key but no item matching the outdated key was found in storage`, "");
      }
    }
    return currentCacheKey;
  }
};

// ../../node_modules/@azure/msal-node/dist/cache/TokenCache.mjs
var defaultSerializedCache = {
  Account: {},
  IdToken: {},
  AccessToken: {},
  RefreshToken: {},
  AppMetadata: {}
};
var TokenCache = class {
  constructor(storage, logger27, cachePlugin) {
    this.cacheHasChanged = false;
    this.storage = storage;
    this.storage.registerChangeEmitter(this.handleChangeEvent.bind(this));
    if (cachePlugin) {
      this.persistence = cachePlugin;
    }
    this.logger = logger27;
  }
  /**
   * Set to true if cache state has changed since last time serialize or writeToPersistence was called
   */
  hasChanged() {
    return this.cacheHasChanged;
  }
  /**
   * Serializes in memory cache to JSON
   */
  serialize() {
    this.logger.trace("Serializing in-memory cache", "");
    let finalState = Serializer.serializeAllCache(this.storage.getInMemoryCache());
    if (this.cacheSnapshot) {
      this.logger.trace("Reading cache snapshot from disk", "");
      finalState = this.mergeState(JSON.parse(this.cacheSnapshot), finalState);
    } else {
      this.logger.trace("No cache snapshot to merge", "");
    }
    this.cacheHasChanged = false;
    return JSON.stringify(finalState);
  }
  /**
   * Deserializes JSON to in-memory cache. JSON should be in MSAL cache schema format
   * @param cache - blob formatted cache
   */
  deserialize(cache) {
    this.logger.trace("Deserializing JSON to in-memory cache", "");
    this.cacheSnapshot = cache;
    if (this.cacheSnapshot) {
      this.logger.trace("Reading cache snapshot from disk", "");
      const deserializedCache = Deserializer.deserializeAllCache(this.overlayDefaults(JSON.parse(this.cacheSnapshot)));
      this.storage.setInMemoryCache(deserializedCache);
    } else {
      this.logger.trace("No cache snapshot to deserialize", "");
    }
  }
  /**
   * Fetches the cache key-value map
   */
  getKVStore() {
    return this.storage.getCache();
  }
  /**
   * Gets cache snapshot in CacheKVStore format
   */
  getCacheSnapshot() {
    const deserializedPersistentStorage = NodeStorage.generateInMemoryCache(this.cacheSnapshot);
    return this.storage.inMemoryCacheToCache(deserializedPersistentStorage);
  }
  /**
   * API that retrieves all accounts currently in cache to the user
   */
  async getAllAccounts(correlationId = new CryptoProvider().createNewGuid()) {
    this.logger.trace("getAllAccounts called", correlationId);
    let cacheContext;
    try {
      if (this.persistence) {
        cacheContext = new TokenCacheContext(this, false);
        await this.persistence.beforeCacheAccess(cacheContext);
      }
      return this.storage.getAllAccounts({}, correlationId);
    } finally {
      if (this.persistence && cacheContext) {
        await this.persistence.afterCacheAccess(cacheContext);
      }
    }
  }
  /**
   * Returns the signed in account matching homeAccountId.
   * (the account object is created at the time of successful login)
   * or null when no matching account is found
   * @param homeAccountId - unique identifier for an account (uid.utid)
   */
  async getAccountByHomeId(homeAccountId) {
    const allAccounts = await this.getAllAccounts();
    if (homeAccountId && allAccounts && allAccounts.length) {
      return allAccounts.filter((accountObj) => accountObj.homeAccountId === homeAccountId)[0] || null;
    } else {
      return null;
    }
  }
  /**
   * Returns the signed in account matching localAccountId.
   * (the account object is created at the time of successful login)
   * or null when no matching account is found
   * @param localAccountId - unique identifier of an account (sub/obj when homeAccountId cannot be populated)
   */
  async getAccountByLocalId(localAccountId) {
    const allAccounts = await this.getAllAccounts();
    if (localAccountId && allAccounts && allAccounts.length) {
      return allAccounts.filter((accountObj) => accountObj.localAccountId === localAccountId)[0] || null;
    } else {
      return null;
    }
  }
  /**
   * API to remove a specific account and the relevant data from cache
   * @param account - AccountInfo passed by the user
   */
  async removeAccount(account, correlationId) {
    this.logger.trace("removeAccount called", correlationId || "");
    let cacheContext;
    try {
      if (this.persistence) {
        cacheContext = new TokenCacheContext(this, true);
        await this.persistence.beforeCacheAccess(cacheContext);
      }
      this.storage.removeAccount(account, correlationId || new GuidGenerator().generateGuid());
    } finally {
      if (this.persistence && cacheContext) {
        await this.persistence.afterCacheAccess(cacheContext);
      }
    }
  }
  /**
   * Overwrites in-memory cache with persistent cache
   */
  async overwriteCache() {
    if (!this.persistence) {
      this.logger.info("No persistence layer specified, cache cannot be overwritten", "");
      return;
    }
    this.logger.info("Overwriting in-memory cache with persistent cache", "");
    this.storage.clear();
    const cacheContext = new TokenCacheContext(this, false);
    await this.persistence.beforeCacheAccess(cacheContext);
    const cacheSnapshot = this.getCacheSnapshot();
    this.storage.setCache(cacheSnapshot);
    await this.persistence.afterCacheAccess(cacheContext);
  }
  /**
   * Called when the cache has changed state.
   */
  handleChangeEvent() {
    this.cacheHasChanged = true;
  }
  /**
   * Merge in memory cache with the cache snapshot.
   * @param oldState - cache before changes
   * @param currentState - current cache state in the library
   */
  mergeState(oldState, currentState) {
    this.logger.trace("Merging in-memory cache with cache snapshot", "");
    const stateAfterRemoval = this.mergeRemovals(oldState, currentState);
    return this.mergeUpdates(stateAfterRemoval, currentState);
  }
  /**
   * Deep update of oldState based on newState values
   * @param oldState - cache before changes
   * @param newState - updated cache
   */
  mergeUpdates(oldState, newState) {
    Object.keys(newState).forEach((newKey) => {
      const newValue = newState[newKey];
      if (!oldState.hasOwnProperty(newKey)) {
        if (newValue !== null) {
          oldState[newKey] = newValue;
        }
      } else {
        const newValueNotNull = newValue !== null;
        const newValueIsObject = typeof newValue === "object";
        const newValueIsNotArray = !Array.isArray(newValue);
        const oldStateNotUndefinedOrNull = typeof oldState[newKey] !== "undefined" && oldState[newKey] !== null;
        if (newValueNotNull && newValueIsObject && newValueIsNotArray && oldStateNotUndefinedOrNull) {
          this.mergeUpdates(oldState[newKey], newValue);
        } else {
          oldState[newKey] = newValue;
        }
      }
    });
    return oldState;
  }
  /**
   * Removes entities in oldState that the were removed from newState. If there are any unknown values in root of
   * oldState that are not recognized, they are left untouched.
   * @param oldState - cache before changes
   * @param newState - updated cache
   */
  mergeRemovals(oldState, newState) {
    this.logger.trace("Remove updated entries in cache", "");
    const accounts = oldState.Account ? this.mergeRemovalsDict(oldState.Account, newState.Account) : oldState.Account;
    const accessTokens = oldState.AccessToken ? this.mergeRemovalsDict(oldState.AccessToken, newState.AccessToken) : oldState.AccessToken;
    const refreshTokens = oldState.RefreshToken ? this.mergeRemovalsDict(oldState.RefreshToken, newState.RefreshToken) : oldState.RefreshToken;
    const idTokens = oldState.IdToken ? this.mergeRemovalsDict(oldState.IdToken, newState.IdToken) : oldState.IdToken;
    const appMetadata = oldState.AppMetadata ? this.mergeRemovalsDict(oldState.AppMetadata, newState.AppMetadata) : oldState.AppMetadata;
    return {
      ...oldState,
      Account: accounts,
      AccessToken: accessTokens,
      RefreshToken: refreshTokens,
      IdToken: idTokens,
      AppMetadata: appMetadata
    };
  }
  /**
   * Helper to merge new cache with the old one
   * @param oldState - cache before changes
   * @param newState - updated cache
   */
  mergeRemovalsDict(oldState, newState) {
    const finalState = { ...oldState };
    Object.keys(oldState).forEach((oldKey) => {
      if (!newState || !newState.hasOwnProperty(oldKey)) {
        delete finalState[oldKey];
      }
    });
    return finalState;
  }
  /**
   * Helper to overlay as a part of cache merge
   * @param passedInCache - cache read from the blob
   */
  overlayDefaults(passedInCache) {
    this.logger.trace("Overlaying input cache with the default cache", "");
    return {
      Account: {
        ...defaultSerializedCache.Account,
        ...passedInCache.Account
      },
      IdToken: {
        ...defaultSerializedCache.IdToken,
        ...passedInCache.IdToken
      },
      AccessToken: {
        ...defaultSerializedCache.AccessToken,
        ...passedInCache.AccessToken
      },
      RefreshToken: {
        ...defaultSerializedCache.RefreshToken,
        ...passedInCache.RefreshToken
      },
      AppMetadata: {
        ...defaultSerializedCache.AppMetadata,
        ...passedInCache.AppMetadata
      }
    };
  }
};

// ../../node_modules/@azure/msal-node/dist/client/ClientAssertion.mjs
var import_jsonwebtoken = __toESM(require_jsonwebtoken(), 1);

// ../../node_modules/@azure/msal-node/dist/error/ClientAuthErrorCodes.mjs
var missingTenantIdError = "missing_tenant_id_error";
var userTimeoutReached = "user_timeout_reached";
var invalidAssertion = "invalid_assertion";
var invalidClientCredential = "invalid_client_credential";
var emptyFicAssertion = "empty_fic_assertion";
var conflictingUserIdentifiers = "conflicting_user_identifiers";
var missingUserIdentifier = "missing_user_identifier";
var deviceCodePollingCancelled = "device_code_polling_cancelled";
var deviceCodeExpired = "device_code_expired";
var deviceCodeUnknownError = "device_code_unknown_error";

// ../../node_modules/@azure/msal-node/dist/client/ClientAssertion.mjs
var ClientAssertion = class _ClientAssertion {
  /**
   * Initialize the ClientAssertion class from the clientAssertion passed by the user
   * @param assertion - refer https://tools.ietf.org/html/rfc7521
   */
  static fromAssertion(assertion) {
    const clientAssertion = new _ClientAssertion();
    clientAssertion.jwt = assertion;
    return clientAssertion;
  }
  /**
   * @deprecated Use fromCertificateWithSha256Thumbprint instead, with a SHA-256 thumprint
   * Initialize the ClientAssertion class from the certificate passed by the user
   * @param thumbprint - identifier of a certificate
   * @param privateKey - secret key
   * @param publicCertificate - electronic document provided to prove the ownership of the public key
   */
  static fromCertificate(thumbprint, privateKey, publicCertificate) {
    const clientAssertion = new _ClientAssertion();
    clientAssertion.privateKey = privateKey;
    clientAssertion.thumbprint = thumbprint;
    clientAssertion.useSha256 = false;
    if (publicCertificate) {
      clientAssertion.publicCertificate = this.parseCertificate(publicCertificate);
    }
    return clientAssertion;
  }
  /**
   * Initialize the ClientAssertion class from the certificate passed by the user
   * @param thumbprint - identifier of a certificate
   * @param privateKey - secret key
   * @param publicCertificate - electronic document provided to prove the ownership of the public key
   */
  static fromCertificateWithSha256Thumbprint(thumbprint, privateKey, publicCertificate) {
    const clientAssertion = new _ClientAssertion();
    clientAssertion.privateKey = privateKey;
    clientAssertion.thumbprint = thumbprint;
    clientAssertion.useSha256 = true;
    if (publicCertificate) {
      clientAssertion.publicCertificate = this.parseCertificate(publicCertificate);
    }
    return clientAssertion;
  }
  /**
   * Update JWT for certificate based clientAssertion, if passed by the user, uses it as is
   * @param cryptoProvider - library's crypto helper
   * @param issuer - iss claim
   * @param jwtAudience - aud claim
   */
  getJwt(cryptoProvider, issuer, jwtAudience) {
    if (this.privateKey && this.thumbprint) {
      if (this.jwt && !this.isExpired() && issuer === this.issuer && jwtAudience === this.jwtAudience) {
        return this.jwt;
      }
      return this.createJwt(cryptoProvider, issuer, jwtAudience);
    }
    if (this.jwt) {
      return this.jwt;
    }
    throw createClientAuthError(invalidAssertion, "");
  }
  /**
   * JWT format and required claims specified: https://tools.ietf.org/html/rfc7523#section-3
   */
  createJwt(cryptoProvider, issuer, jwtAudience) {
    this.issuer = issuer;
    this.jwtAudience = jwtAudience;
    const issuedAt = TimeUtils_exports.nowSeconds();
    this.expirationTime = issuedAt + 600;
    const algorithm = this.useSha256 ? JwtConstants.PSS_256 : JwtConstants.RSA_256;
    const header = {
      alg: algorithm
    };
    const thumbprintHeader = this.useSha256 ? JwtConstants.X5T_256 : JwtConstants.X5T;
    Object.assign(header, {
      [thumbprintHeader]: EncodingUtils.base64EncodeUrl(this.thumbprint, Constants_exports.EncodingTypes.HEX)
    });
    if (this.publicCertificate) {
      Object.assign(header, {
        [JwtConstants.X5C]: this.publicCertificate
      });
    }
    const payload = {
      [JwtConstants.AUDIENCE]: this.jwtAudience,
      [JwtConstants.EXPIRATION_TIME]: this.expirationTime,
      [JwtConstants.ISSUER]: this.issuer,
      [JwtConstants.SUBJECT]: this.issuer,
      [JwtConstants.NOT_BEFORE]: issuedAt,
      [JwtConstants.JWT_ID]: cryptoProvider.createNewGuid()
    };
    this.jwt = import_jsonwebtoken.default.sign(payload, this.privateKey, { header });
    return this.jwt;
  }
  /**
   * Utility API to check expiration
   */
  isExpired() {
    return this.expirationTime < TimeUtils_exports.nowSeconds();
  }
  /**
   * Extracts the raw certs from a given certificate string and returns them in an array.
   * @param publicCertificate - electronic document provided to prove the ownership of the public key
   */
  static parseCertificate(publicCertificate) {
    const regexToFindCerts = /-----BEGIN CERTIFICATE-----\r*\n(.+?)\r*\n-----END CERTIFICATE-----/gs;
    const certs = [];
    let matches;
    while ((matches = regexToFindCerts.exec(publicCertificate)) !== null) {
      certs.push(matches[1].replace(/\r*\n/g, ""));
    }
    return certs;
  }
};

// ../../node_modules/@azure/msal-node/dist/packageMetadata.mjs
var name2 = "@azure/msal-node";
var version2 = "5.4.2";

// ../../node_modules/@azure/msal-node/dist/client/BaseClient.mjs
var BaseClient = class {
  constructor(configuration) {
    this.config = buildClientConfiguration(configuration);
    this.logger = new Logger(this.config.loggerOptions, name2, version2);
    this.cryptoUtils = this.config.cryptoInterface;
    this.cacheManager = this.config.storageInterface;
    this.networkClient = this.config.networkInterface;
    this.serverTelemetryManager = this.config.serverTelemetryManager;
    this.authority = this.config.authOptions.authority;
    this.performanceClient = new StubPerformanceClient();
  }
  /**
   * Creates default headers for requests to token endpoint
   */
  createTokenRequestHeaders(ccsCred) {
    return Token_exports.createTokenRequestHeaders(this.logger, false, ccsCred);
  }
  /**
   * Http post to token endpoint
   * @param tokenEndpoint
   * @param queryString
   * @param headers
   * @param thumbprint
   */
  async executePostToTokenEndpoint(tokenEndpoint, queryString, headers, thumbprint, correlationId) {
    return Token_exports.executePostToTokenEndpoint(tokenEndpoint, queryString, headers, thumbprint, correlationId, this.cacheManager, this.networkClient, this.logger, this.performanceClient, this.serverTelemetryManager);
  }
  /**
   * Wraps sendPostRequestAsync with necessary preflight and postflight logic
   * @param thumbprint - Request thumbprint for throttling
   * @param tokenEndpoint - Endpoint to make the POST to
   * @param options - Body and Headers to include on the POST request
   * @param correlationId - CorrelationId for telemetry
   */
  async sendPostRequest(thumbprint, tokenEndpoint, options, correlationId) {
    return Token_exports.sendPostRequest(thumbprint, tokenEndpoint, options, correlationId, this.cacheManager, this.networkClient, this.logger, this.performanceClient);
  }
  /**
   * Creates query string for the /token request
   * @param request
   */
  createTokenQueryParameters(request) {
    return Token_exports.createTokenQueryParameters(request, this.config.authOptions.clientId, this.config.authOptions.redirectUri, this.performanceClient);
  }
};

// ../../node_modules/@azure/msal-node/dist/client/UsernamePasswordClient.mjs
var UsernamePasswordClient = class extends BaseClient {
  constructor(configuration) {
    super(configuration);
  }
  /**
   * API to acquire a token by passing the username and password to the service in exchage of credentials
   * password_grant
   * @param request - CommonUsernamePasswordRequest
   */
  async acquireToken(request) {
    this.logger.info("in acquireToken call in username-password client", request.correlationId);
    const reqTimestamp = TimeUtils_exports.nowSeconds();
    const response = await this.executeTokenRequest(this.authority, request);
    const responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.performanceClient, this.config.serializableCache, this.config.persistencePlugin);
    responseHandler.validateTokenResponse(response.body, request.correlationId);
    const tokenResponse = responseHandler.handleServerTokenResponse(response.body, this.authority, reqTimestamp, request, ApiId.acquireTokenByUsernamePassword);
    return tokenResponse;
  }
  /**
   * Executes POST request to token endpoint
   * @param authority - authority object
   * @param request - CommonUsernamePasswordRequest provided by the developer
   */
  async executeTokenRequest(authority, request) {
    const queryParametersString = this.createTokenQueryParameters(request);
    const endpoint = UrlString.appendQueryString(authority.tokenEndpoint, queryParametersString);
    const requestBody = await this.createTokenRequestBody(request);
    const headers = this.createTokenRequestHeaders({
      credential: request.username,
      type: CcsCredentialType.UPN
    });
    const thumbprint = {
      clientId: this.config.authOptions.clientId,
      authority: authority.canonicalAuthority,
      scopes: request.scopes,
      claims: request.claims,
      authenticationScheme: request.authenticationScheme,
      resourceRequestMethod: request.resourceRequestMethod,
      resourceRequestUri: request.resourceRequestUri,
      shrClaims: request.shrClaims,
      sshKid: request.sshKid
    };
    return this.executePostToTokenEndpoint(endpoint, requestBody, headers, thumbprint, request.correlationId);
  }
  /**
   * Generates a map for all the params to be sent to the service
   * @param request - CommonUsernamePasswordRequest provided by the developer
   */
  async createTokenRequestBody(request) {
    const parameters = /* @__PURE__ */ new Map();
    RequestParameterBuilder_exports.addClientId(parameters, this.config.authOptions.clientId);
    RequestParameterBuilder_exports.addUsername(parameters, request.username);
    RequestParameterBuilder_exports.addPassword(parameters, request.password);
    RequestParameterBuilder_exports.addScopes(parameters, request.scopes, request.correlationId);
    RequestParameterBuilder_exports.addResponseType(parameters, Constants_exports.OAuthResponseType.IDTOKEN_TOKEN);
    RequestParameterBuilder_exports.addGrantType(parameters, Constants_exports.GrantType.RESOURCE_OWNER_PASSWORD_GRANT);
    RequestParameterBuilder_exports.addClientInfo(parameters);
    RequestParameterBuilder_exports.addLibraryInfo(parameters, this.config.libraryInfo);
    RequestParameterBuilder_exports.addApplicationTelemetry(parameters, this.config.telemetry.application);
    RequestParameterBuilder_exports.addThrottling(parameters);
    if (this.serverTelemetryManager) {
      RequestParameterBuilder_exports.addServerTelemetry(parameters, this.serverTelemetryManager);
    }
    const correlationId = request.correlationId || this.config.cryptoInterface.createNewGuid();
    RequestParameterBuilder_exports.addCorrelationId(parameters, correlationId);
    if (this.config.clientCredentials.clientSecret) {
      RequestParameterBuilder_exports.addClientSecret(parameters, this.config.clientCredentials.clientSecret);
    }
    const clientAssertion = this.config.clientCredentials.clientAssertion;
    if (clientAssertion) {
      RequestParameterBuilder_exports.addClientAssertion(parameters, await getClientAssertion(clientAssertion.assertion, this.config.authOptions.clientId, request.resourceRequestUri));
      RequestParameterBuilder_exports.addClientAssertionType(parameters, clientAssertion.assertionType);
    }
    if (!StringUtils.isEmptyObj(request.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
      RequestParameterBuilder_exports.addClaims(parameters, request.correlationId, request.claims, this.config.authOptions.clientCapabilities);
    }
    if (this.config.systemOptions.preventCorsPreflight && request.username) {
      RequestParameterBuilder_exports.addCcsUpn(parameters, request.username);
    }
    return UrlUtils_exports.mapToQueryString(parameters);
  }
};

// ../../node_modules/@azure/msal-node/dist/protocol/Authorize.mjs
function getAuthCodeRequestUrl(config, authority, request, logger27) {
  const parameters = Authorize_exports.getStandardAuthorizeRequestParameters({
    ...config.auth,
    authority,
    redirectUri: request.redirectUri || ""
  }, request, logger27);
  RequestParameterBuilder_exports.addLibraryInfo(parameters, {
    sku: Constants.MSAL_SKU,
    version: version2,
    cpu: process.arch || "",
    os: process.platform || ""
  });
  if (config.system.protocolMode !== ProtocolMode.OIDC) {
    RequestParameterBuilder_exports.addApplicationTelemetry(parameters, config.telemetry.application);
  }
  RequestParameterBuilder_exports.addResponseType(parameters, Constants_exports.OAuthResponseType.CODE);
  if (request.codeChallenge && request.codeChallengeMethod) {
    RequestParameterBuilder_exports.addCodeChallengeParams(parameters, request.codeChallenge, request.codeChallengeMethod);
  }
  RequestParameterBuilder_exports.addExtraParameters(parameters, request.extraQueryParameters || {});
  return Authorize_exports.getAuthorizeUrl(authority, parameters);
}

// ../../node_modules/@azure/msal-node/dist/client/ClientApplication.mjs
var ClientApplication = class {
  /**
   * Constructor for the ClientApplication
   */
  constructor(configuration) {
    this.config = buildAppConfiguration(configuration);
    this.cryptoProvider = new CryptoProvider();
    this.logger = new Logger(this.config.system.loggerOptions, name2, version2);
    this.storage = new NodeStorage(this.logger, this.config.auth.clientId, this.cryptoProvider, buildStaticAuthorityOptions(this.config.auth));
    this.tokenCache = new TokenCache(this.storage, this.logger, this.config.cache.cachePlugin);
  }
  /**
   * Creates the URL of the authorization request, letting the user input credentials and consent to the
   * application. The URL targets the /authorize endpoint of the authority configured in the
   * application object.
   *
   * Once the user inputs their credentials and consents, the authority will send a response to the redirect URI
   * sent in the request and should contain an authorization code, which can then be used to acquire tokens via
   * `acquireTokenByCode(AuthorizationCodeRequest)`.
   */
  async getAuthCodeUrl(request) {
    this.logger.info("getAuthCodeUrl called", request.correlationId || "");
    const validRequest = {
      ...request,
      ...await this.initializeBaseRequest(request),
      responseMode: request.responseMode || Constants_exports.ResponseMode.QUERY,
      authenticationScheme: Constants_exports.AuthenticationScheme.BEARER,
      state: request.state || "",
      nonce: request.nonce || ""
    };
    const discoveredAuthority = await this.createAuthority(validRequest.authority, validRequest.correlationId, void 0, request.azureCloudOptions);
    return getAuthCodeRequestUrl(this.config, discoveredAuthority, validRequest, this.logger);
  }
  /**
   * Acquires a token by exchanging the Authorization Code received from the first step of OAuth2.0
   * Authorization Code flow.
   *
   * `getAuthCodeUrl(AuthorizationCodeUrlRequest)` can be used to create the URL for the first step of OAuth2.0
   * Authorization Code flow. Ensure that values for redirectUri and scopes in AuthorizationCodeUrlRequest and
   * AuthorizationCodeRequest are the same.
   */
  async acquireTokenByCode(request, authCodePayLoad) {
    this.logger.info("acquireTokenByCode called", request.correlationId || "");
    if (request.state && authCodePayLoad) {
      this.logger.info("acquireTokenByCode - validating state", request.correlationId || "");
      this.validateState(request.state, authCodePayLoad.state || "", request.correlationId || "");
      authCodePayLoad = { ...authCodePayLoad, state: "" };
    }
    const validRequest = {
      ...request,
      ...await this.initializeBaseRequest(request),
      authenticationScheme: Constants_exports.AuthenticationScheme.BEARER
    };
    const serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenByCode, validRequest.correlationId);
    try {
      const discoveredAuthority = await this.createAuthority(validRequest.authority, validRequest.correlationId, void 0, request.azureCloudOptions);
      const authClientConfig = await this.buildOauthClientConfiguration(discoveredAuthority, validRequest.correlationId, validRequest.redirectUri, serverTelemetryManager);
      const authorizationCodeClient = new AuthorizationCodeClient(authClientConfig, new StubPerformanceClient());
      this.logger.verbose("Auth code client created", validRequest.correlationId);
      return await authorizationCodeClient.acquireToken(validRequest, ApiId.acquireTokenByCode, authCodePayLoad);
    } catch (e) {
      if (e instanceof AuthError2) {
        e.correlationId = validRequest.correlationId;
      }
      serverTelemetryManager.cacheFailedRequest(e);
      throw e;
    }
  }
  /**
   * Acquires a token by exchanging the refresh token provided for a new set of tokens.
   *
   * This API is provided only for scenarios where you would like to migrate from ADAL to MSAL. Otherwise, it is
   * recommended that you use `acquireTokenSilent()` for silent scenarios. When using `acquireTokenSilent()`, MSAL will
   * handle the caching and refreshing of tokens automatically.
   */
  async acquireTokenByRefreshToken(request) {
    this.logger.info("acquireTokenByRefreshToken called", request.correlationId || "");
    const validRequest = {
      ...request,
      ...await this.initializeBaseRequest(request),
      authenticationScheme: Constants_exports.AuthenticationScheme.BEARER
    };
    const serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenByRefreshToken, validRequest.correlationId);
    try {
      const discoveredAuthority = await this.createAuthority(validRequest.authority, validRequest.correlationId, void 0, request.azureCloudOptions);
      const refreshTokenClientConfig = await this.buildOauthClientConfiguration(discoveredAuthority, validRequest.correlationId, validRequest.redirectUri || "", serverTelemetryManager);
      const refreshTokenClient = new RefreshTokenClient(refreshTokenClientConfig, new StubPerformanceClient());
      this.logger.verbose("Refresh token client created", validRequest.correlationId);
      return await refreshTokenClient.acquireToken(validRequest, ApiId.acquireTokenByRefreshToken);
    } catch (e) {
      if (e instanceof AuthError2) {
        e.correlationId = validRequest.correlationId;
      }
      serverTelemetryManager.cacheFailedRequest(e);
      throw e;
    }
  }
  /**
   * Acquires a token silently when a user specifies the account the token is requested for.
   *
   * This API expects the user to provide an account object and looks into the cache to retrieve the token if present.
   * There is also an optional "forceRefresh" boolean the user can send to bypass the cache for access_token and id_token.
   * In case the refresh_token is expired or not found, an error is thrown
   * and the guidance is for the user to call any interactive token acquisition API (eg: `acquireTokenByCode()`).
   */
  async acquireTokenSilent(request) {
    const validRequest = {
      ...request,
      ...await this.initializeBaseRequest(request),
      forceRefresh: request.forceRefresh || false
    };
    const serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenSilent, validRequest.correlationId, validRequest.forceRefresh);
    try {
      const discoveredAuthority = await this.createAuthority(validRequest.authority, validRequest.correlationId, void 0, request.azureCloudOptions);
      const clientConfiguration = await this.buildOauthClientConfiguration(discoveredAuthority, validRequest.correlationId, validRequest.redirectUri || "", serverTelemetryManager);
      const silentFlowClient = new SilentFlowClient(clientConfiguration, new StubPerformanceClient());
      this.logger.verbose("Silent flow client created", validRequest.correlationId);
      try {
        await this.tokenCache.overwriteCache();
        return await this.acquireCachedTokenSilent(validRequest, silentFlowClient, clientConfiguration);
      } catch (error) {
        if (error instanceof ClientAuthError && error.errorCode === ClientAuthErrorCodes_exports.tokenRefreshRequired) {
          const refreshTokenClient = new RefreshTokenClient(clientConfiguration, new StubPerformanceClient());
          return refreshTokenClient.acquireTokenByRefreshToken(validRequest, ApiId.acquireTokenSilent);
        }
        throw error;
      }
    } catch (error) {
      if (error instanceof AuthError2) {
        error.correlationId = validRequest.correlationId;
      }
      serverTelemetryManager.cacheFailedRequest(error);
      throw error;
    }
  }
  async acquireCachedTokenSilent(validRequest, silentFlowClient, clientConfiguration) {
    const [authResponse, cacheOutcome] = await silentFlowClient.acquireCachedToken({
      ...validRequest,
      scopes: validRequest.scopes?.length ? validRequest.scopes : [...Constants_exports.OIDC_DEFAULT_SCOPES]
    });
    if (cacheOutcome === Constants_exports.CacheOutcome.PROACTIVELY_REFRESHED) {
      this.logger.info("ClientApplication:acquireCachedTokenSilent - Cached access token's refreshOn property has been exceeded'. It's not expired, but must be refreshed.", validRequest.correlationId);
      const refreshTokenClient = new RefreshTokenClient(clientConfiguration, new StubPerformanceClient());
      try {
        await refreshTokenClient.acquireTokenByRefreshToken(validRequest, ApiId.acquireTokenSilent);
      } catch {
      }
    }
    return authResponse;
  }
  /**
   * Acquires tokens with password grant by exchanging client applications username and password for credentials
   *
   * The latest OAuth 2.0 Security Best Current Practice disallows the password grant entirely.
   * More details on this recommendation at https://tools.ietf.org/html/draft-ietf-oauth-security-topics-13#section-3.4
   * Microsoft's documentation and recommendations are at:
   * https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-authentication-flows#usernamepassword
   *
   * @param request - UsenamePasswordRequest
   * @deprecated - Use a more secure flow instead
   */
  async acquireTokenByUsernamePassword(request) {
    this.logger.info("acquireTokenByUsernamePassword called", request.correlationId || "");
    const validRequest = {
      ...request,
      ...await this.initializeBaseRequest(request)
    };
    const serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenByUsernamePassword, validRequest.correlationId);
    try {
      const discoveredAuthority = await this.createAuthority(validRequest.authority, validRequest.correlationId, void 0, request.azureCloudOptions);
      const usernamePasswordClientConfig = await this.buildOauthClientConfiguration(discoveredAuthority, validRequest.correlationId, "", serverTelemetryManager);
      const usernamePasswordClient = new UsernamePasswordClient(usernamePasswordClientConfig);
      this.logger.verbose("Username password client created", validRequest.correlationId);
      return await usernamePasswordClient.acquireToken(validRequest);
    } catch (e) {
      if (e instanceof AuthError2) {
        e.correlationId = validRequest.correlationId;
      }
      serverTelemetryManager.cacheFailedRequest(e);
      throw e;
    }
  }
  /**
   * Gets the token cache for the application.
   */
  getTokenCache() {
    this.logger.info("getTokenCache called", "");
    return this.tokenCache;
  }
  /**
   * Validates OIDC state by comparing the user cached state with the state received from the server.
   *
   * This API is provided for scenarios where you would use OAuth2.0 state parameter to mitigate against
   * CSRF attacks.
   * For more information about state, visit https://datatracker.ietf.org/doc/html/rfc6819#section-3.6.
   * @param state - Unique GUID generated by the user that is cached by the user and sent to the server during the first leg of the flow
   * @param cachedState - This string is sent back by the server with the authorization code
   */
  validateState(state3, cachedState, correlationId) {
    if (!state3) {
      throw NodeAuthError.createStateNotFoundError(correlationId);
    }
    if (state3 !== cachedState) {
      throw createClientAuthError(ClientAuthErrorCodes_exports.stateMismatch, correlationId);
    }
  }
  /**
   * Returns the logger instance
   */
  getLogger() {
    return this.logger;
  }
  /**
   * Replaces the default logger set in configurations with new Logger with new configurations
   * @param logger - Logger instance
   */
  setLogger(logger27) {
    this.logger = logger27;
  }
  /**
   * Builds the common configuration to be passed to the common component based on the platform configurarion
   * @param authority - user passed authority in configuration
   * @param serverTelemetryManager - initializes servertelemetry if passed
   */
  async buildOauthClientConfiguration(discoveredAuthority, requestCorrelationId, redirectUri, serverTelemetryManager) {
    this.logger.verbose("buildOauthClientConfiguration called", requestCorrelationId);
    this.logger.info(`Building oauth client configuration with the following authority: ${discoveredAuthority.tokenEndpoint}.`, requestCorrelationId);
    serverTelemetryManager?.updateRegionDiscoveryMetadata(discoveredAuthority.regionDiscoveryMetadata);
    const clientConfiguration = {
      authOptions: {
        clientId: this.config.auth.clientId,
        authority: discoveredAuthority,
        clientCapabilities: this.config.auth.clientCapabilities,
        redirectUri,
        isMcp: this.config.auth.isMcp
      },
      loggerOptions: {
        logLevel: this.config.system.loggerOptions.logLevel,
        loggerCallback: this.config.system.loggerOptions.loggerCallback,
        piiLoggingEnabled: this.config.system.loggerOptions.piiLoggingEnabled,
        correlationId: requestCorrelationId
      },
      cryptoInterface: this.cryptoProvider,
      networkInterface: this.config.system.networkClient,
      storageInterface: this.storage,
      serverTelemetryManager,
      clientCredentials: {
        clientSecret: this.clientSecret,
        clientAssertion: await this.getClientAssertion(discoveredAuthority)
      },
      libraryInfo: {
        sku: Constants.MSAL_SKU,
        version: version2,
        cpu: process.arch || "",
        os: process.platform || ""
      },
      telemetry: this.config.telemetry,
      persistencePlugin: this.config.cache.cachePlugin,
      serializableCache: this.tokenCache
    };
    return clientConfiguration;
  }
  async getClientAssertion(authority) {
    if (this.developerProvidedClientAssertion) {
      this.clientAssertion = ClientAssertion.fromAssertion(await getClientAssertion(this.developerProvidedClientAssertion, this.config.auth.clientId, authority.tokenEndpoint));
    }
    return this.clientAssertion && {
      assertion: this.clientAssertion.getJwt(this.cryptoProvider, this.config.auth.clientId, authority.tokenEndpoint),
      assertionType: Constants.JWT_BEARER_ASSERTION_TYPE
    };
  }
  /**
   * Generates a request with the default scopes & generates a correlationId.
   * @param authRequest - BaseAuthRequest for initialization
   */
  async initializeBaseRequest(authRequest) {
    const correlationId = authRequest.correlationId || this.cryptoProvider.createNewGuid();
    this.logger.verbose("initializeRequestScopes called", correlationId);
    if (authRequest.authenticationScheme && authRequest.authenticationScheme === Constants_exports.AuthenticationScheme.POP) {
      this.logger.verbose("Authentication Scheme 'pop' is not supported yet, setting Authentication Scheme to 'Bearer' for request", correlationId);
    }
    authRequest.authenticationScheme = Constants_exports.AuthenticationScheme.BEARER;
    return {
      ...authRequest,
      scopes: [
        ...authRequest && authRequest.scopes || [],
        ...Constants_exports.OIDC_DEFAULT_SCOPES
      ],
      correlationId,
      authority: authRequest.authority || this.config.auth.authority
    };
  }
  /**
   * Initializes the server telemetry payload
   * @param apiId - Id for a specific request
   * @param correlationId - GUID
   * @param forceRefresh - boolean to indicate network call
   */
  initializeServerTelemetryManager(apiId, correlationId, forceRefresh) {
    const telemetryPayload = {
      clientId: this.config.auth.clientId,
      correlationId,
      apiId,
      forceRefresh: forceRefresh || false
    };
    return new ServerTelemetryManager(telemetryPayload, this.storage);
  }
  /**
   * Create authority instance. If authority not passed in request, default to authority set on the application
   * object. If no authority set in application object, then default to common authority.
   * @param authorityString - authority from user configuration
   */
  async createAuthority(authorityString, requestCorrelationId, azureRegionConfiguration, azureCloudOptions) {
    this.logger.verbose("createAuthority called", requestCorrelationId);
    const authorityUrl = Authority.generateAuthority(authorityString, azureCloudOptions || this.config.auth.azureCloudOptions);
    const authorityOptions = {
      protocolMode: this.config.system.protocolMode,
      knownAuthorities: this.config.auth.knownAuthorities,
      cloudDiscoveryMetadata: this.config.auth.cloudDiscoveryMetadata,
      authorityMetadata: this.config.auth.authorityMetadata,
      azureRegionConfiguration
    };
    return AuthorityFactory_exports.createDiscoveredInstance(authorityUrl, this.config.system.networkClient, this.storage, authorityOptions, this.logger, requestCorrelationId, new StubPerformanceClient());
  }
  /**
   * Clear the cache except for authority metadata.
   */
  clearCache() {
    this.storage.clear();
  }
};

// ../../node_modules/@azure/msal-node/dist/network/LoopbackClient.mjs
import http from "http";
var LoopbackClient = class {
  constructor(preferredPort) {
    this.preferredPort = preferredPort;
  }
  /**
   * Spins up a loopback server which returns the server response when the localhost redirectUri is hit
   * @param successTemplate
   * @param errorTemplate
   * @returns
   */
  async listenForAuthCode(successTemplate, errorTemplate) {
    if (this.server) {
      throw NodeAuthError.createLoopbackServerAlreadyExistsError();
    }
    return new Promise((resolve, reject) => {
      this.server = http.createServer((req, res) => {
        const method = req.method?.toUpperCase();
        if (method !== "GET" && method !== "POST") {
          res.writeHead(405, {
            Allow: "GET, POST"
          });
          res.end("Method Not Allowed");
          return;
        }
        const url = req.url;
        if (!url) {
          res.end(errorTemplate || "Error occurred loading redirectUrl");
          reject(NodeAuthError.createUnableToLoadRedirectUrlError());
          return;
        } else if (url === Constants_exports.FORWARD_SLASH) {
          if (method === "POST") {
            this.handlePostRequest(req, res, resolve, successTemplate, errorTemplate);
            return;
          }
          res.end(successTemplate || "Auth code was successfully acquired. You can close this window now.");
          return;
        }
        if (method === "GET") {
          const redirectUri = this.getRedirectUri();
          const parsedUrl = new URL(url, redirectUri);
          const authCodeResponse = UrlUtils_exports.getDeserializedResponse(parsedUrl.search) || {};
          if (!authCodeResponse.code && !authCodeResponse.error) {
            res.writeHead(200);
            res.end();
            return;
          }
          if (authCodeResponse.code) {
            res.writeHead(Constants_exports.HTTP_REDIRECT, {
              location: redirectUri
            });
            res.end();
          }
          if (authCodeResponse.error) {
            res.end(errorTemplate || `Error occurred: ${authCodeResponse.error}`);
          }
          resolve(authCodeResponse);
        } else {
          res.writeHead(200);
          res.end();
        }
      });
      const port = this.preferredPort || 0;
      this.server.on("error", (err) => {
        if (err.code === "EADDRINUSE" && this.preferredPort && port !== 0) {
          this.server?.listen(0, "127.0.0.1");
        } else {
          reject(err);
        }
      });
      this.server.listen(port, "127.0.0.1");
    });
  }
  /**
   * Handles POST requests for form_post response mode
   */
  handlePostRequest(req, res, resolve, successTemplate, errorTemplate) {
    const contentType = req.headers["content-type"]?.split(";")[0]?.trim();
    if (contentType !== "application/x-www-form-urlencoded") {
      res.writeHead(415);
      res.end("Unsupported Media Type");
      return;
    }
    let body = "";
    req.on("error", () => {
      if (!res.headersSent) {
        res.writeHead(400);
      }
      res.end();
    });
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const authCodeResponse = UrlUtils_exports.getDeserializedResponse(`?${body}`) || {};
      if (!authCodeResponse.code && !authCodeResponse.error) {
        res.writeHead(200);
        res.end();
        return;
      }
      if (authCodeResponse.error) {
        res.writeHead(200);
        res.end(errorTemplate || `Error occurred: ${authCodeResponse.error}`);
      } else {
        res.writeHead(200);
        res.end(successTemplate || "Auth code was successfully acquired. You can close this window now.");
      }
      resolve(authCodeResponse);
    });
  }
  /**
   * Get the port that the loopback server is running on
   * @returns
   */
  getRedirectUri() {
    if (!this.server || !this.server.listening) {
      throw NodeAuthError.createNoLoopbackServerExistsError();
    }
    const address = this.server.address();
    if (!address || typeof address === "string" || !address.port) {
      this.closeServer();
      throw NodeAuthError.createInvalidLoopbackAddressTypeError();
    }
    const port = address && address.port;
    return `${Constants.HTTP_PROTOCOL}${Constants.LOCALHOST}:${port}`;
  }
  /**
   * Close the loopback server
   */
  closeServer() {
    if (this.server) {
      this.server.close();
      if (typeof this.server.closeAllConnections === "function") {
        this.server.closeAllConnections();
      }
      this.server.unref();
      this.server = void 0;
    }
  }
};

// ../../node_modules/@azure/msal-node/dist/client/DeviceCodeClient.mjs
var DeviceCodeClient = class extends BaseClient {
  constructor(configuration) {
    super(configuration);
  }
  /**
   * Gets device code from device code endpoint, calls back to with device code response, and
   * polls token endpoint to exchange device code for tokens
   * @param request - developer provided CommonDeviceCodeRequest
   */
  async acquireToken(request) {
    const deviceCodeResponse = await this.getDeviceCode(request);
    request.deviceCodeCallback(deviceCodeResponse);
    const reqTimestamp = TimeUtils_exports.nowSeconds();
    const response = await this.acquireTokenWithDeviceCode(request, deviceCodeResponse);
    const responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.performanceClient, this.config.serializableCache, this.config.persistencePlugin);
    responseHandler.validateTokenResponse(response, request.correlationId);
    return responseHandler.handleServerTokenResponse(response, this.authority, reqTimestamp, request, ApiId.acquireTokenByDeviceCode);
  }
  /**
   * Creates device code request and executes http GET
   * @param request - developer provided CommonDeviceCodeRequest
   */
  async getDeviceCode(request) {
    const queryParametersString = this.createExtraQueryParameters(request);
    const endpoint = UrlString.appendQueryString(this.authority.deviceCodeEndpoint, queryParametersString);
    const queryString = this.createQueryString(request);
    const headers = this.createTokenRequestHeaders();
    const thumbprint = {
      clientId: this.config.authOptions.clientId,
      authority: request.authority,
      scopes: request.scopes,
      claims: request.claims,
      authenticationScheme: request.authenticationScheme,
      resourceRequestMethod: request.resourceRequestMethod,
      resourceRequestUri: request.resourceRequestUri,
      shrClaims: request.shrClaims,
      sshKid: request.sshKid
    };
    return this.executePostRequestToDeviceCodeEndpoint(endpoint, queryString, headers, thumbprint, request.correlationId);
  }
  /**
   * Creates query string for the device code request
   * @param request - developer provided CommonDeviceCodeRequest
   */
  createExtraQueryParameters(request) {
    const parameters = /* @__PURE__ */ new Map();
    if (request.extraQueryParameters) {
      RequestParameterBuilder_exports.addExtraParameters(parameters, request.extraQueryParameters);
    }
    return UrlUtils_exports.mapToQueryString(parameters);
  }
  /**
   * Executes POST request to device code endpoint
   * @param deviceCodeEndpoint - token endpoint
   * @param queryString - string to be used in the body of the request
   * @param headers - headers for the request
   * @param thumbprint - unique request thumbprint
   * @param correlationId - correlation id to be used in the request
   */
  async executePostRequestToDeviceCodeEndpoint(deviceCodeEndpoint, queryString, headers, thumbprint, correlationId) {
    const { body: { user_code: userCode, device_code: deviceCode, verification_uri: verificationUri, expires_in: expiresIn, interval, message } } = await this.sendPostRequest(thumbprint, deviceCodeEndpoint, {
      body: queryString,
      headers
    }, correlationId);
    return {
      userCode,
      deviceCode,
      verificationUri,
      expiresIn,
      interval,
      message
    };
  }
  /**
   * Create device code endpoint query parameters and returns string
   * @param request - developer provided CommonDeviceCodeRequest
   */
  createQueryString(request) {
    const parameters = /* @__PURE__ */ new Map();
    RequestParameterBuilder_exports.addScopes(parameters, request.scopes, request.correlationId);
    RequestParameterBuilder_exports.addClientId(parameters, this.config.authOptions.clientId);
    if (request.extraQueryParameters) {
      RequestParameterBuilder_exports.addExtraParameters(parameters, request.extraQueryParameters);
    }
    if (request.claims || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
      RequestParameterBuilder_exports.addClaims(parameters, request.correlationId, request.claims, this.config.authOptions.clientCapabilities);
    }
    return UrlUtils_exports.mapToQueryString(parameters);
  }
  /**
   * Breaks the polling with specific conditions
   * @param deviceCodeExpirationTime - expiration time for the device code request
   * @param correlationId - correlation id of the request
   * @param userSpecifiedTimeout - developer provided timeout, to be compared against deviceCodeExpirationTime
   * @param userSpecifiedCancelFlag - boolean indicating the developer would like to cancel the request
   */
  continuePolling(deviceCodeExpirationTime, correlationId, userSpecifiedTimeout, userSpecifiedCancelFlag) {
    if (userSpecifiedCancelFlag) {
      this.logger.error("Token request cancelled by setting DeviceCodeRequest.cancel = true", correlationId);
      throw createClientAuthError(deviceCodePollingCancelled, correlationId);
    } else if (userSpecifiedTimeout && userSpecifiedTimeout < deviceCodeExpirationTime && TimeUtils_exports.nowSeconds() > userSpecifiedTimeout) {
      this.logger.error(`User defined timeout for device code polling reached. The timeout was set for ${userSpecifiedTimeout}`, correlationId);
      throw createClientAuthError(userTimeoutReached, correlationId);
    } else if (TimeUtils_exports.nowSeconds() > deviceCodeExpirationTime) {
      if (userSpecifiedTimeout) {
        this.logger.verbose(`User specified timeout ignored as the device code has expired before the timeout elapsed. The user specified timeout was set for ${userSpecifiedTimeout}`, correlationId);
      }
      this.logger.error(`Device code expired. Expiration time of device code was ${deviceCodeExpirationTime}`, correlationId);
      throw createClientAuthError(deviceCodeExpired, correlationId);
    }
    return true;
  }
  /**
   * Creates token request with device code response and polls token endpoint at interval set by the device code response
   * @param request - developer provided CommonDeviceCodeRequest
   * @param deviceCodeResponse - DeviceCodeResponse returned by the security token service device code endpoint
   */
  async acquireTokenWithDeviceCode(request, deviceCodeResponse) {
    const queryParametersString = this.createTokenQueryParameters(request);
    const endpoint = UrlString.appendQueryString(this.authority.tokenEndpoint, queryParametersString);
    const requestBody = this.createTokenRequestBody(request, deviceCodeResponse);
    const headers = this.createTokenRequestHeaders();
    const userSpecifiedTimeout = request.timeout ? TimeUtils_exports.nowSeconds() + request.timeout : void 0;
    const deviceCodeExpirationTime = TimeUtils_exports.nowSeconds() + deviceCodeResponse.expiresIn;
    const pollingIntervalMilli = deviceCodeResponse.interval * 1e3;
    while (this.continuePolling(deviceCodeExpirationTime, request.correlationId, userSpecifiedTimeout, request.cancel)) {
      const thumbprint = {
        clientId: this.config.authOptions.clientId,
        authority: request.authority,
        scopes: request.scopes,
        claims: request.claims,
        authenticationScheme: request.authenticationScheme,
        resourceRequestMethod: request.resourceRequestMethod,
        resourceRequestUri: request.resourceRequestUri,
        shrClaims: request.shrClaims,
        sshKid: request.sshKid
      };
      const response = await this.executePostToTokenEndpoint(endpoint, requestBody, headers, thumbprint, request.correlationId);
      if (response.body && response.body.error) {
        if (response.body.error === Constants_exports.AUTHORIZATION_PENDING) {
          this.logger.info("Authorization pending. Continue polling.", request.correlationId);
          await TimeUtils_exports.delay(pollingIntervalMilli);
        } else {
          this.logger.info("Unexpected error in polling from the server", request.correlationId);
          throw createAuthError(AuthErrorCodes_exports.postRequestFailed, request.correlationId, response.body.error);
        }
      } else {
        this.logger.verbose("Authorization completed successfully. Polling stopped.", request.correlationId);
        return response.body;
      }
    }
    this.logger.error("Polling stopped for unknown reasons.", request.correlationId);
    throw createClientAuthError(deviceCodeUnknownError, request.correlationId);
  }
  /**
   * Creates query parameters and converts to string.
   * @param request - developer provided CommonDeviceCodeRequest
   * @param deviceCodeResponse - DeviceCodeResponse returned by the security token service device code endpoint
   */
  createTokenRequestBody(request, deviceCodeResponse) {
    const parameters = /* @__PURE__ */ new Map();
    RequestParameterBuilder_exports.addScopes(parameters, request.scopes, request.correlationId);
    RequestParameterBuilder_exports.addClientId(parameters, this.config.authOptions.clientId);
    RequestParameterBuilder_exports.addGrantType(parameters, Constants_exports.GrantType.DEVICE_CODE_GRANT);
    RequestParameterBuilder_exports.addDeviceCode(parameters, deviceCodeResponse.deviceCode);
    const correlationId = request.correlationId || this.config.cryptoInterface.createNewGuid();
    RequestParameterBuilder_exports.addCorrelationId(parameters, correlationId);
    RequestParameterBuilder_exports.addClientInfo(parameters);
    RequestParameterBuilder_exports.addLibraryInfo(parameters, this.config.libraryInfo);
    RequestParameterBuilder_exports.addApplicationTelemetry(parameters, this.config.telemetry.application);
    RequestParameterBuilder_exports.addThrottling(parameters);
    if (this.serverTelemetryManager) {
      RequestParameterBuilder_exports.addServerTelemetry(parameters, this.serverTelemetryManager);
    }
    if (!StringUtils.isEmptyObj(request.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
      RequestParameterBuilder_exports.addClaims(parameters, request.correlationId, request.claims, this.config.authOptions.clientCapabilities);
    }
    return UrlUtils_exports.mapToQueryString(parameters);
  }
};

// ../../node_modules/@azure/msal-node/dist/client/PublicClientApplication.mjs
var PublicClientApplication = class extends ClientApplication {
  /**
   * Important attributes in the Configuration object for auth are:
   * - clientID: the application ID of your application. You can obtain one by registering your application with our Application registration portal.
   * - authority: the authority URL for your application.
   *
   * AAD authorities are of the form https://login.microsoftonline.com/\{Enter_the_Tenant_Info_Here\}.
   * - If your application supports Accounts in one organizational directory, replace "Enter_the_Tenant_Info_Here" value with the Tenant Id or Tenant name (for example, contoso.microsoft.com).
   * - If your application supports Accounts in any organizational directory, replace "Enter_the_Tenant_Info_Here" value with organizations.
   * - If your application supports Accounts in any organizational directory and personal Microsoft accounts, replace "Enter_the_Tenant_Info_Here" value with common.
   * - To restrict support to Personal Microsoft accounts only, replace "Enter_the_Tenant_Info_Here" value with consumers.
   *
   * Azure B2C authorities are of the form https://\{instance\}/\{tenant\}/\{policy\}. Each policy is considered
   * its own authority. You will have to set the all of the knownAuthorities at the time of the client application
   * construction.
   *
   * ADFS authorities are of the form https://\{instance\}/adfs.
   */
  constructor(configuration) {
    super(configuration);
    if (this.config.broker.nativeBrokerPlugin) {
      if (this.config.broker.nativeBrokerPlugin.isBrokerAvailable) {
        this.nativeBrokerPlugin = this.config.broker.nativeBrokerPlugin;
        this.nativeBrokerPlugin.setLogger(this.config.system.loggerOptions);
      } else {
        this.logger.warning("NativeBroker implementation was provided but the broker is unavailable.", "");
      }
    }
    this.skus = ServerTelemetryManager.makeExtraSkuString({
      libraryName: Constants.MSAL_SKU,
      libraryVersion: version2
    });
  }
  /**
   * Acquires a token from the authority using OAuth2.0 device code flow.
   * This flow is designed for devices that do not have access to a browser or have input constraints.
   * The authorization server issues a DeviceCode object with a verification code, an end-user code,
   * and the end-user verification URI. The DeviceCode object is provided through a callback, and the end-user should be
   * instructed to use another device to navigate to the verification URI to input credentials.
   * Since the client cannot receive incoming requests, it polls the authorization server repeatedly
   * until the end-user completes input of credentials.
   */
  async acquireTokenByDeviceCode(request) {
    this.logger.info("acquireTokenByDeviceCode called", request.correlationId || "");
    enforceResourceParameter(this.config.auth.isMcp, request);
    const validRequest = Object.assign(request, await this.initializeBaseRequest(request));
    const serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenByDeviceCode, validRequest.correlationId);
    try {
      const discoveredAuthority = await this.createAuthority(validRequest.authority, validRequest.correlationId, void 0, request.azureCloudOptions);
      const deviceCodeConfig = await this.buildOauthClientConfiguration(discoveredAuthority, validRequest.correlationId, "", serverTelemetryManager);
      const deviceCodeClient = new DeviceCodeClient(deviceCodeConfig);
      this.logger.verbose("Device code client created", validRequest.correlationId);
      return await deviceCodeClient.acquireToken(validRequest);
    } catch (e) {
      if (e instanceof AuthError2) {
        e.correlationId = validRequest.correlationId;
      }
      serverTelemetryManager.cacheFailedRequest(e);
      throw e;
    }
  }
  /**
   * Acquires a token interactively via the browser by requesting an authorization code then exchanging it for a token.
   */
  async acquireTokenInteractive(request) {
    const correlationId = request.correlationId || this.cryptoProvider.createNewGuid();
    this.logger.trace("acquireTokenInteractive called", correlationId);
    enforceResourceParameter(this.config.auth.isMcp, request);
    const { openBrowser, successTemplate, errorTemplate, windowHandle, loopbackClient: customLoopbackClient, preferredPort, ...remainingProperties } = request;
    if (customLoopbackClient) {
      this.logger.warning("The loopbackClient option is deprecated and will be removed in a future major version. Omit it to use the built-in loopback server, and set preferredPort when a fixed port is required.", correlationId);
    }
    if (this.nativeBrokerPlugin) {
      const brokerRequest = {
        ...remainingProperties,
        clientId: this.config.auth.clientId,
        scopes: request.scopes || Constants_exports.OIDC_DEFAULT_SCOPES,
        redirectUri: request.redirectUri || "",
        authority: request.authority || this.config.auth.authority,
        correlationId,
        extraParameters: {
          ...remainingProperties.extraQueryParameters,
          ...remainingProperties.extraParameters,
          [AADServerParamKeys_exports.X_CLIENT_EXTRA_SKU]: this.skus
        },
        accountId: remainingProperties.account?.nativeAccountId
      };
      return this.nativeBrokerPlugin.acquireTokenInteractive(brokerRequest, windowHandle);
    }
    if (request.redirectUri) {
      if (!this.config.broker.nativeBrokerPlugin) {
        throw NodeAuthError.createRedirectUriNotSupportedError(correlationId);
      }
      request.redirectUri = "";
    }
    const { verifier, challenge } = await this.cryptoProvider.generatePkceCodes();
    const loopbackClient = customLoopbackClient || new LoopbackClient(preferredPort);
    const responseMode = remainingProperties.responseMode ?? Constants_exports.ResponseMode.QUERY;
    if (responseMode !== Constants_exports.ResponseMode.QUERY && responseMode !== Constants_exports.ResponseMode.FORM_POST) {
      throw createClientConfigurationError(ClientConfigurationErrorCodes_exports.invalidResponseMode, correlationId);
    }
    let authCodeResponse = {};
    let authCodeListenerError = null;
    try {
      const authCodeListener = loopbackClient.listenForAuthCode(successTemplate, errorTemplate).then((response) => {
        authCodeResponse = response;
      }).catch((e) => {
        authCodeListenerError = e;
      });
      const redirectUri = await this.waitForRedirectUri(loopbackClient, correlationId);
      const validRequest = {
        ...remainingProperties,
        correlationId,
        scopes: request.scopes || Constants_exports.OIDC_DEFAULT_SCOPES,
        redirectUri,
        responseMode,
        codeChallenge: challenge,
        codeChallengeMethod: Constants_exports.CodeChallengeMethodValues.S256
      };
      const authCodeUrl = await this.getAuthCodeUrl(validRequest);
      await openBrowser(authCodeUrl);
      await authCodeListener;
      if (authCodeListenerError) {
        throw authCodeListenerError;
      }
      if (authCodeResponse.error) {
        throw new ServerError(authCodeResponse.error, correlationId, authCodeResponse.error_description, authCodeResponse.suberror);
      } else if (!authCodeResponse.code) {
        throw NodeAuthError.createNoAuthCodeInResponseError(correlationId);
      }
      const clientInfo = authCodeResponse.client_info;
      const tokenRequest = {
        code: authCodeResponse.code,
        codeVerifier: verifier,
        clientInfo: clientInfo || "",
        ...validRequest
      };
      return await this.acquireTokenByCode(tokenRequest);
    } finally {
      loopbackClient.closeServer();
    }
  }
  /**
   * Returns a token retrieved either from the cache or by exchanging the refresh token for a fresh access token. If brokering is enabled the token request will be serviced by the broker.
   * @param request - developer provided SilentFlowRequest
   * @returns
   */
  async acquireTokenSilent(request) {
    const correlationId = request.correlationId || this.cryptoProvider.createNewGuid();
    this.logger.trace("acquireTokenSilent called", correlationId);
    enforceResourceParameter(this.config.auth.isMcp, request);
    if (this.nativeBrokerPlugin) {
      const brokerRequest = {
        ...request,
        clientId: this.config.auth.clientId,
        scopes: request.scopes || Constants_exports.OIDC_DEFAULT_SCOPES,
        redirectUri: request.redirectUri || "",
        authority: request.authority || this.config.auth.authority,
        correlationId,
        extraParameters: {
          ...request.extraQueryParameters,
          ...request.extraParameters,
          [AADServerParamKeys_exports.X_CLIENT_EXTRA_SKU]: this.skus
        },
        accountId: request.account.nativeAccountId,
        forceRefresh: request.forceRefresh || false
      };
      return this.nativeBrokerPlugin.acquireTokenSilent(brokerRequest);
    }
    if (request.redirectUri) {
      if (!this.config.broker.nativeBrokerPlugin) {
        throw NodeAuthError.createRedirectUriNotSupportedError(correlationId);
      }
      request.redirectUri = "";
    }
    return super.acquireTokenSilent(request);
  }
  /**
   * Acquires a token by exchanging the authorization code received from the first step of OAuth 2.0 Authorization Code Flow.
   * In MCP mode, a resource parameter is required on the request.
   */
  async acquireTokenByCode(request, authCodePayLoad) {
    enforceResourceParameter(this.config.auth.isMcp, request);
    return super.acquireTokenByCode(request, authCodePayLoad);
  }
  /**
   * Acquires a token by exchanging the refresh token provided for a new set of tokens.
   * In MCP mode, a resource parameter is required on the request.
   */
  async acquireTokenByRefreshToken(request) {
    enforceResourceParameter(this.config.auth.isMcp, request);
    return super.acquireTokenByRefreshToken(request);
  }
  /**
   * Removes cache artifacts associated with the given account
   * @param request - developer provided SignOutRequest
   * @returns
   */
  async signOut(request) {
    if (this.nativeBrokerPlugin && request.account.nativeAccountId) {
      const signoutRequest = {
        clientId: this.config.auth.clientId,
        accountId: request.account.nativeAccountId,
        correlationId: request.correlationId || this.cryptoProvider.createNewGuid()
      };
      await this.nativeBrokerPlugin.signOut(signoutRequest);
    }
    await this.getTokenCache().removeAccount(request.account, request.correlationId);
  }
  /**
   * Returns all cached accounts for this application. If brokering is enabled this request will be serviced by the broker.
   * @returns
   */
  async getAllAccounts() {
    if (this.nativeBrokerPlugin) {
      const correlationId = this.cryptoProvider.createNewGuid();
      return this.nativeBrokerPlugin.getAllAccounts(this.config.auth.clientId, correlationId);
    }
    return this.getTokenCache().getAllAccounts();
  }
  /**
   * Attempts to retrieve the redirectUri from the loopback server. If the loopback server does not start listening for requests within the timeout this will throw.
   * @param loopbackClient - developer provided custom loopback server implementation
   * @param correlationId - correlation id of the request
   * @returns
   */
  async waitForRedirectUri(loopbackClient, correlationId) {
    return new Promise((resolve, reject) => {
      let ticks = 0;
      const id = setInterval(() => {
        if (LOOPBACK_SERVER_CONSTANTS.TIMEOUT_MS / LOOPBACK_SERVER_CONSTANTS.INTERVAL_MS < ticks) {
          clearInterval(id);
          reject(NodeAuthError.createLoopbackServerTimeoutError(correlationId));
          return;
        }
        try {
          const r = loopbackClient.getRedirectUri();
          clearInterval(id);
          resolve(r);
          return;
        } catch (e) {
          if (e instanceof AuthError2 && e.errorCode === NodeAuthErrorMessage.noLoopbackServerExists.code) {
            ticks++;
            return;
          }
          clearInterval(id);
          reject(e);
          return;
        }
      }, LOOPBACK_SERVER_CONSTANTS.INTERVAL_MS);
    });
  }
};

// ../../node_modules/@azure/msal-node/dist/client/ClientCredentialClient.mjs
var ClientCredentialClient = class extends BaseClient {
  constructor(configuration, appTokenProvider) {
    super(configuration);
    this.appTokenProvider = appTokenProvider;
  }
  /**
   * Public API to acquire a token with ClientCredential Flow for Confidential clients
   * @param request - CommonClientCredentialRequest provided by the developer
   */
  async acquireToken(request) {
    let additionalCacheKeyComponents;
    if (request.fmiPath) {
      additionalCacheKeyComponents = {
        fmi_path: request.fmiPath
      };
    }
    if (request.skipCache || request.claims) {
      return this.executeTokenRequest(
        request,
        this.authority,
        /* refreshAccessToken */
        void 0,
        additionalCacheKeyComponents
      );
    }
    const [cachedAuthenticationResult, lastCacheOutcome] = await this.getCachedAuthenticationResult(request, this.config, this.cryptoUtils, this.authority, this.cacheManager, this.serverTelemetryManager, additionalCacheKeyComponents);
    if (cachedAuthenticationResult) {
      if (lastCacheOutcome === Constants_exports.CacheOutcome.PROACTIVELY_REFRESHED) {
        this.logger.info("ClientCredentialClient:getCachedAuthenticationResult - Cached access token's refreshOn property has been exceeded'. It's not expired, but must be refreshed.", request.correlationId);
        const refreshAccessToken = true;
        await this.executeTokenRequest(request, this.authority, refreshAccessToken, additionalCacheKeyComponents);
      }
      return cachedAuthenticationResult;
    } else {
      return this.executeTokenRequest(
        request,
        this.authority,
        /* refreshAccessToken */
        void 0,
        additionalCacheKeyComponents
      );
    }
  }
  /**
   * looks up cache if the tokens are cached already
   */
  async getCachedAuthenticationResult(request, config, cryptoUtils, authority, cacheManager, serverTelemetryManager, additionalCacheKeyComponents) {
    const clientConfiguration = config;
    const managedIdentityConfiguration = config;
    let lastCacheOutcome = Constants_exports.CacheOutcome.NOT_APPLICABLE;
    let cacheContext;
    if (clientConfiguration.serializableCache && clientConfiguration.persistencePlugin) {
      cacheContext = new TokenCacheContext(clientConfiguration.serializableCache, false);
      await clientConfiguration.persistencePlugin.beforeCacheAccess(cacheContext);
    }
    const cachedAccessToken = this.readAccessTokenFromCache(authority, managedIdentityConfiguration.managedIdentityId?.id || clientConfiguration.authOptions.clientId, new ScopeSet(request.scopes || [], request.correlationId), cacheManager, request.correlationId, additionalCacheKeyComponents);
    if (clientConfiguration.serializableCache && clientConfiguration.persistencePlugin && cacheContext) {
      await clientConfiguration.persistencePlugin.afterCacheAccess(cacheContext);
    }
    if (!cachedAccessToken) {
      serverTelemetryManager?.setCacheOutcome(Constants_exports.CacheOutcome.NO_CACHED_ACCESS_TOKEN);
      return [null, Constants_exports.CacheOutcome.NO_CACHED_ACCESS_TOKEN];
    }
    if (TimeUtils_exports.isTokenExpired(cachedAccessToken.expiresOn, clientConfiguration.systemOptions?.tokenRenewalOffsetSeconds || Constants_exports.DEFAULT_TOKEN_RENEWAL_OFFSET_SEC)) {
      serverTelemetryManager?.setCacheOutcome(Constants_exports.CacheOutcome.CACHED_ACCESS_TOKEN_EXPIRED);
      return [null, Constants_exports.CacheOutcome.CACHED_ACCESS_TOKEN_EXPIRED];
    }
    if (cachedAccessToken.refreshOn && TimeUtils_exports.isTokenExpired(cachedAccessToken.refreshOn.toString(), 0)) {
      lastCacheOutcome = Constants_exports.CacheOutcome.PROACTIVELY_REFRESHED;
      serverTelemetryManager?.setCacheOutcome(Constants_exports.CacheOutcome.PROACTIVELY_REFRESHED);
    }
    return [
      await ResponseHandler.generateAuthenticationResult(cryptoUtils, authority, {
        account: null,
        idToken: null,
        accessToken: cachedAccessToken,
        refreshToken: null,
        appMetadata: null
      }, true, request, this.performanceClient),
      lastCacheOutcome
    ];
  }
  /**
   * Reads access token from the cache
   */
  readAccessTokenFromCache(authority, id, scopeSet, cacheManager, correlationId, additionalCacheKeyComponents) {
    const accessTokenFilter = {
      homeAccountId: "",
      environment: authority.canonicalAuthorityUrlComponents.HostNameAndPort,
      credentialType: Constants_exports.CredentialType.ACCESS_TOKEN,
      clientId: id,
      realm: authority.tenant,
      target: ScopeSet.createSearchScopes(scopeSet.asArray(), correlationId),
      additionalCacheKeyComponents
    };
    const accessTokens = cacheManager.getAccessTokensByFilter(accessTokenFilter, correlationId);
    if (accessTokens.length < 1) {
      return null;
    } else if (accessTokens.length > 1) {
      throw createClientAuthError(ClientAuthErrorCodes_exports.multipleMatchingTokens, correlationId);
    }
    return accessTokens[0];
  }
  /**
   * Makes a network call to request the token from the service
   * @param request - CommonClientCredentialRequest provided by the developer
   * @param authority - authority object
   */
  async executeTokenRequest(request, authority, refreshAccessToken, additionalCacheKeyComponents) {
    let serverTokenResponse;
    let reqTimestamp;
    if (this.appTokenProvider) {
      this.logger.info("Using appTokenProvider extensibility.", request.correlationId);
      const appTokenPropviderParameters = {
        correlationId: request.correlationId,
        tenantId: this.config.authOptions.authority.tenant,
        scopes: request.scopes,
        claims: request.claims
      };
      reqTimestamp = TimeUtils_exports.nowSeconds();
      const appTokenProviderResult = await this.appTokenProvider(appTokenPropviderParameters);
      serverTokenResponse = {
        access_token: appTokenProviderResult.accessToken,
        expires_in: appTokenProviderResult.expiresInSeconds,
        refresh_in: appTokenProviderResult.refreshInSeconds,
        token_type: Constants_exports.AuthenticationScheme.BEARER
      };
    } else {
      const queryParametersString = this.createTokenQueryParameters(request);
      const endpoint = UrlString.appendQueryString(authority.tokenEndpoint, queryParametersString);
      const requestBody = await this.createTokenRequestBody(request);
      const headers = this.createTokenRequestHeaders();
      const thumbprint = {
        clientId: this.config.authOptions.clientId,
        authority: request.authority,
        scopes: request.scopes,
        claims: request.claims,
        authenticationScheme: request.authenticationScheme,
        resourceRequestMethod: request.resourceRequestMethod,
        resourceRequestUri: request.resourceRequestUri,
        shrClaims: request.shrClaims,
        sshKid: request.sshKid
      };
      this.logger.info("Sending token request to endpoint: " + authority.tokenEndpoint, request.correlationId);
      reqTimestamp = TimeUtils_exports.nowSeconds();
      const response = await this.executePostToTokenEndpoint(endpoint, requestBody, headers, thumbprint, request.correlationId);
      serverTokenResponse = response.body;
      serverTokenResponse.status = response.status;
    }
    const responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.performanceClient, this.config.serializableCache, this.config.persistencePlugin);
    responseHandler.validateTokenResponse(serverTokenResponse, request.correlationId, refreshAccessToken);
    const tokenResponse = await responseHandler.handleServerTokenResponse(
      serverTokenResponse,
      this.authority,
      reqTimestamp,
      request,
      ApiId.acquireTokenByClientCredential,
      void 0,
      // authCodePayload
      void 0,
      // userAssertionHash
      void 0,
      // handlingRefreshTokenResponse
      void 0,
      // forceCacheRefreshTokenResponse
      void 0,
      // serverRequestId
      additionalCacheKeyComponents
    );
    return tokenResponse;
  }
  /**
   * generate the request to the server in the acceptable format
   * @param request - CommonClientCredentialRequest provided by the developer
   */
  async createTokenRequestBody(request) {
    const parameters = /* @__PURE__ */ new Map();
    RequestParameterBuilder_exports.addClientId(parameters, this.config.authOptions.clientId);
    RequestParameterBuilder_exports.addScopes(parameters, request.scopes, request.correlationId, false);
    RequestParameterBuilder_exports.addGrantType(parameters, Constants_exports.GrantType.CLIENT_CREDENTIALS_GRANT);
    RequestParameterBuilder_exports.addLibraryInfo(parameters, this.config.libraryInfo);
    RequestParameterBuilder_exports.addApplicationTelemetry(parameters, this.config.telemetry.application);
    RequestParameterBuilder_exports.addThrottling(parameters);
    if (this.serverTelemetryManager) {
      RequestParameterBuilder_exports.addServerTelemetry(parameters, this.serverTelemetryManager);
    }
    const correlationId = request.correlationId || this.config.cryptoInterface.createNewGuid();
    RequestParameterBuilder_exports.addCorrelationId(parameters, correlationId);
    if (this.config.clientCredentials.clientSecret) {
      RequestParameterBuilder_exports.addClientSecret(parameters, this.config.clientCredentials.clientSecret);
    }
    const clientAssertion = request.clientAssertion || this.config.clientCredentials.clientAssertion;
    if (clientAssertion) {
      RequestParameterBuilder_exports.addClientAssertion(parameters, await getClientAssertion(clientAssertion.assertion, this.config.authOptions.clientId, this.authority.tokenEndpoint, request.fmiPath));
      RequestParameterBuilder_exports.addClientAssertionType(parameters, clientAssertion.assertionType);
    }
    if (request.fmiPath) {
      parameters.set(AADServerParamKeys_exports.FMI_PATH, request.fmiPath);
    }
    if (!StringUtils.isEmptyObj(request.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
      RequestParameterBuilder_exports.addClaims(parameters, request.correlationId, request.claims, this.config.authOptions.clientCapabilities);
    }
    return UrlUtils_exports.mapToQueryString(parameters);
  }
};

// ../../node_modules/@azure/msal-node/dist/client/OnBehalfOfClient.mjs
var OnBehalfOfClient = class extends BaseClient {
  constructor(configuration) {
    super(configuration);
  }
  /**
   * Public API to acquire tokens with on behalf of flow
   * @param request - developer provided CommonOnBehalfOfRequest
   */
  async acquireToken(request) {
    this.scopeSet = new ScopeSet(request.scopes || [], request.correlationId);
    this.userAssertionHash = await this.cryptoUtils.hashString(request.oboAssertion);
    if (request.skipCache || request.claims) {
      return this.executeTokenRequest(request, this.authority, this.userAssertionHash);
    }
    try {
      return await this.getCachedAuthenticationResult(request);
    } catch (e) {
      return await this.executeTokenRequest(request, this.authority, this.userAssertionHash);
    }
  }
  /**
   * look up cache for tokens
   * Find idtoken in the cache
   * Find accessToken based on user assertion and account info in the cache
   * Please note we are not yet supported OBO tokens refreshed with long lived RT. User will have to send a new assertion if the current access token expires
   * This is to prevent security issues when the assertion changes over time, however, longlived RT helps retaining the session
   * @param request - developer provided CommonOnBehalfOfRequest
   */
  async getCachedAuthenticationResult(request) {
    const cachedAccessToken = this.readAccessTokenFromCacheForOBO(this.config.authOptions.clientId, request);
    if (!cachedAccessToken) {
      this.serverTelemetryManager?.setCacheOutcome(Constants_exports.CacheOutcome.NO_CACHED_ACCESS_TOKEN);
      this.logger.info("SilentFlowClient:acquireCachedToken - No access token found in cache for the given properties.", request.correlationId);
      throw createClientAuthError(ClientAuthErrorCodes_exports.tokenRefreshRequired, request.correlationId);
    } else if (TimeUtils_exports.isTokenExpired(cachedAccessToken.expiresOn, this.config.systemOptions.tokenRenewalOffsetSeconds)) {
      this.serverTelemetryManager?.setCacheOutcome(Constants_exports.CacheOutcome.CACHED_ACCESS_TOKEN_EXPIRED);
      this.logger.info(`OnbehalfofFlow:getCachedAuthenticationResult - Cached access token is expired or will expire within ${this.config.systemOptions.tokenRenewalOffsetSeconds} seconds.`, request.correlationId);
      throw createClientAuthError(ClientAuthErrorCodes_exports.tokenRefreshRequired, request.correlationId);
    }
    const cachedIdToken = this.readIdTokenFromCacheForOBO(cachedAccessToken.homeAccountId, request.correlationId);
    let idTokenClaims;
    let cachedAccount = null;
    if (cachedIdToken) {
      idTokenClaims = AuthToken_exports.extractTokenClaims(cachedIdToken.secret, EncodingUtils.base64Decode, request.correlationId);
      const localAccountId = idTokenClaims.oid || idTokenClaims.sub;
      const accountInfo = {
        homeAccountId: cachedIdToken.homeAccountId,
        environment: cachedIdToken.environment,
        tenantId: cachedIdToken.realm,
        username: "",
        localAccountId: localAccountId || ""
      };
      cachedAccount = this.cacheManager.getAccount(this.cacheManager.generateAccountKey(accountInfo), request.correlationId);
    }
    if (this.config.serverTelemetryManager) {
      this.config.serverTelemetryManager.incrementCacheHits();
    }
    return ResponseHandler.generateAuthenticationResult(this.cryptoUtils, this.authority, {
      account: cachedAccount,
      accessToken: cachedAccessToken,
      idToken: cachedIdToken,
      refreshToken: null,
      appMetadata: null
    }, true, request, this.performanceClient, idTokenClaims);
  }
  /**
   * read idtoken from cache, this is a specific implementation for OBO as the requirements differ from a generic lookup in the cacheManager
   * Certain use cases of OBO flow do not expect an idToken in the cache/or from the service
   * @param atHomeAccountId - account id
   */
  readIdTokenFromCacheForOBO(atHomeAccountId, correlationId) {
    const idTokenFilter = {
      homeAccountId: atHomeAccountId,
      environment: this.authority.canonicalAuthorityUrlComponents.HostNameAndPort,
      credentialType: Constants_exports.CredentialType.ID_TOKEN,
      clientId: this.config.authOptions.clientId,
      realm: this.authority.tenant
    };
    const idTokenMap = this.cacheManager.getIdTokensByFilter(idTokenFilter, correlationId);
    if (Object.values(idTokenMap).length < 1) {
      return null;
    }
    return Object.values(idTokenMap)[0];
  }
  /**
   * Fetches the cached access token based on incoming assertion
   * @param clientId - client id
   * @param request - developer provided CommonOnBehalfOfRequest
   */
  readAccessTokenFromCacheForOBO(clientId, request) {
    const authScheme = request.authenticationScheme || Constants_exports.AuthenticationScheme.BEARER;
    const credentialType = authScheme && authScheme.toLowerCase() !== Constants_exports.AuthenticationScheme.BEARER.toLowerCase() ? Constants_exports.CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME : Constants_exports.CredentialType.ACCESS_TOKEN;
    const accessTokenFilter = {
      credentialType,
      clientId,
      target: ScopeSet.createSearchScopes(this.scopeSet.asArray(), request.correlationId),
      tokenType: authScheme,
      keyId: request.sshKid,
      userAssertionHash: this.userAssertionHash
    };
    const accessTokens = this.cacheManager.getAccessTokensByFilter(accessTokenFilter, request.correlationId);
    const numAccessTokens = accessTokens.length;
    if (numAccessTokens < 1) {
      return null;
    } else if (numAccessTokens > 1) {
      throw createClientAuthError(ClientAuthErrorCodes_exports.multipleMatchingTokens, request.correlationId);
    }
    return accessTokens[0];
  }
  /**
   * Make a network call to the server requesting credentials
   * @param request - developer provided CommonOnBehalfOfRequest
   * @param authority - authority object
   */
  async executeTokenRequest(request, authority, userAssertionHash) {
    const queryParametersString = this.createTokenQueryParameters(request);
    const endpoint = UrlString.appendQueryString(authority.tokenEndpoint, queryParametersString);
    const requestBody = await this.createTokenRequestBody(request);
    const headers = this.createTokenRequestHeaders();
    const thumbprint = {
      clientId: this.config.authOptions.clientId,
      authority: request.authority,
      scopes: request.scopes,
      claims: request.claims,
      authenticationScheme: request.authenticationScheme,
      resourceRequestMethod: request.resourceRequestMethod,
      resourceRequestUri: request.resourceRequestUri,
      shrClaims: request.shrClaims,
      sshKid: request.sshKid
    };
    const reqTimestamp = TimeUtils_exports.nowSeconds();
    const response = await this.executePostToTokenEndpoint(endpoint, requestBody, headers, thumbprint, request.correlationId);
    const responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.performanceClient, this.config.serializableCache, this.config.persistencePlugin);
    responseHandler.validateTokenResponse(response.body, request.correlationId);
    const tokenResponse = await responseHandler.handleServerTokenResponse(response.body, this.authority, reqTimestamp, request, ApiId.acquireTokenByOBO, void 0, userAssertionHash);
    return tokenResponse;
  }
  /**
   * generate a server request in accepable format
   * @param request - developer provided CommonOnBehalfOfRequest
   */
  async createTokenRequestBody(request) {
    const parameters = /* @__PURE__ */ new Map();
    RequestParameterBuilder_exports.addClientId(parameters, this.config.authOptions.clientId);
    RequestParameterBuilder_exports.addScopes(parameters, request.scopes, request.correlationId);
    RequestParameterBuilder_exports.addGrantType(parameters, Constants_exports.GrantType.JWT_BEARER);
    RequestParameterBuilder_exports.addClientInfo(parameters);
    RequestParameterBuilder_exports.addLibraryInfo(parameters, this.config.libraryInfo);
    RequestParameterBuilder_exports.addApplicationTelemetry(parameters, this.config.telemetry.application);
    RequestParameterBuilder_exports.addThrottling(parameters);
    if (this.serverTelemetryManager) {
      RequestParameterBuilder_exports.addServerTelemetry(parameters, this.serverTelemetryManager);
    }
    const correlationId = request.correlationId || this.config.cryptoInterface.createNewGuid();
    RequestParameterBuilder_exports.addCorrelationId(parameters, correlationId);
    RequestParameterBuilder_exports.addRequestTokenUse(parameters, AADServerParamKeys_exports.ON_BEHALF_OF);
    RequestParameterBuilder_exports.addOboAssertion(parameters, request.oboAssertion);
    if (this.config.clientCredentials.clientSecret) {
      RequestParameterBuilder_exports.addClientSecret(parameters, this.config.clientCredentials.clientSecret);
    }
    const clientAssertion = this.config.clientCredentials.clientAssertion;
    if (clientAssertion) {
      RequestParameterBuilder_exports.addClientAssertion(parameters, await getClientAssertion(clientAssertion.assertion, this.config.authOptions.clientId, request.resourceRequestUri));
      RequestParameterBuilder_exports.addClientAssertionType(parameters, clientAssertion.assertionType);
    }
    if (request.claims || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
      RequestParameterBuilder_exports.addClaims(parameters, request.correlationId, request.claims, this.config.authOptions.clientCapabilities);
    }
    return UrlUtils_exports.mapToQueryString(parameters);
  }
};

// ../../node_modules/@azure/msal-node/dist/client/UserFederatedIdentityCredentialClient.mjs
var UserFederatedIdentityCredentialClient = class extends BaseClient {
  constructor(configuration) {
    super(configuration);
  }
  /**
   * Acquires a token using the user_fic grant type.
   * Always hits the network (no cache lookup for the network call).
   * Developers use acquireTokenSilent for cached FIC tokens.
   */
  async acquireToken(request) {
    return this.executeTokenRequest(request, this.authority);
  }
  /**
   * Makes a network call to the token endpoint
   */
  async executeTokenRequest(request, authority) {
    const scopeSet = new ScopeSet(request.scopes || [], request.correlationId);
    scopeSet.appendScopes(Constants_exports.OIDC_DEFAULT_SCOPES);
    const augmentedScopes = scopeSet.asArray();
    const queryParametersString = this.createTokenQueryParameters(request);
    const endpoint = UrlString.appendQueryString(authority.tokenEndpoint, queryParametersString);
    const requestBody = await this.createTokenRequestBody(request, augmentedScopes);
    const headers = this.createTokenRequestHeaders();
    const thumbprint = {
      clientId: this.config.authOptions.clientId,
      authority: request.authority,
      scopes: augmentedScopes,
      claims: request.claims,
      authenticationScheme: request.authenticationScheme,
      resourceRequestMethod: request.resourceRequestMethod,
      resourceRequestUri: request.resourceRequestUri,
      shrClaims: request.shrClaims,
      sshKid: request.sshKid
    };
    const reqTimestamp = TimeUtils_exports.nowSeconds();
    const response = await this.executePostToTokenEndpoint(endpoint, requestBody, headers, thumbprint, request.correlationId);
    const responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.performanceClient, this.config.serializableCache, this.config.persistencePlugin);
    responseHandler.validateTokenResponse(response.body, request.correlationId);
    const tokenResponse = await responseHandler.handleServerTokenResponse(response.body, this.authority, reqTimestamp, request, ApiId.acquireTokenByUserFederatedIdentityCredential);
    return tokenResponse;
  }
  /**
   * Builds the request body for the user_fic grant type
   */
  async createTokenRequestBody(request, augmentedScopes) {
    const parameters = /* @__PURE__ */ new Map();
    RequestParameterBuilder_exports.addClientId(parameters, this.config.authOptions.clientId);
    RequestParameterBuilder_exports.addScopes(parameters, augmentedScopes, request.correlationId);
    RequestParameterBuilder_exports.addGrantType(parameters, Constants_exports.GrantType.USER_FIC);
    RequestParameterBuilder_exports.addClientInfo(parameters);
    parameters.set(AADServerParamKeys_exports.USER_FEDERATED_IDENTITY_CREDENTIAL, request.assertion);
    if (request.username) {
      parameters.set(AADServerParamKeys_exports.USERNAME, request.username);
    } else if (request.userObjectId) {
      parameters.set(AADServerParamKeys_exports.USER_ID, request.userObjectId);
    }
    RequestParameterBuilder_exports.addLibraryInfo(parameters, this.config.libraryInfo);
    RequestParameterBuilder_exports.addApplicationTelemetry(parameters, this.config.telemetry.application);
    RequestParameterBuilder_exports.addThrottling(parameters);
    if (this.serverTelemetryManager) {
      RequestParameterBuilder_exports.addServerTelemetry(parameters, this.serverTelemetryManager);
    }
    const correlationId = request.correlationId || this.config.cryptoInterface.createNewGuid();
    RequestParameterBuilder_exports.addCorrelationId(parameters, correlationId);
    if (this.config.clientCredentials.clientSecret) {
      RequestParameterBuilder_exports.addClientSecret(parameters, this.config.clientCredentials.clientSecret);
    }
    const clientAssertion = request.clientAssertion || this.config.clientCredentials.clientAssertion;
    if (clientAssertion) {
      RequestParameterBuilder_exports.addClientAssertion(parameters, await getClientAssertion(clientAssertion.assertion, this.config.authOptions.clientId, this.authority.tokenEndpoint));
      RequestParameterBuilder_exports.addClientAssertionType(parameters, clientAssertion.assertionType);
    }
    if (request.claims || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
      RequestParameterBuilder_exports.addClaims(parameters, request.correlationId, request.claims, this.config.authOptions.clientCapabilities);
    }
    return UrlUtils_exports.mapToQueryString(parameters);
  }
};

// ../../node_modules/@azure/msal-node/dist/client/ConfidentialClientApplication.mjs
var ConfidentialClientApplication = class extends ClientApplication {
  /**
   * Constructor for the ConfidentialClientApplication
   *
   * Required attributes in the Configuration object are:
   * - clientID: the application ID of your application. You can obtain one by registering your application with our application registration portal
   * - authority: the authority URL for your application.
   * - client credential: Must set either client secret, certificate, or assertion for confidential clients. You can obtain a client secret from the application registration portal.
   *
   * In Azure AD, authority is a URL indicating of the form https://login.microsoftonline.com/\{Enter_the_Tenant_Info_Here\}.
   * If your application supports Accounts in one organizational directory, replace "Enter_the_Tenant_Info_Here" value with the Tenant Id or Tenant name (for example, contoso.microsoft.com).
   * If your application supports Accounts in any organizational directory, replace "Enter_the_Tenant_Info_Here" value with organizations.
   * If your application supports Accounts in any organizational directory and personal Microsoft accounts, replace "Enter_the_Tenant_Info_Here" value with common.
   * To restrict support to Personal Microsoft accounts only, replace "Enter_the_Tenant_Info_Here" value with consumers.
   *
   * In Azure B2C, authority is of the form https://\{instance\}/tfp/\{tenant\}/\{policyName\}/
   * Full B2C functionality will be available in this library in future versions.
   *
   * @param Configuration - configuration object for the MSAL ConfidentialClientApplication instance
   */
  constructor(configuration) {
    super(configuration);
    const clientSecretNotEmpty = !!this.config.auth.clientSecret;
    const clientAssertionNotEmpty = !!this.config.auth.clientAssertion;
    const certificateNotEmpty = (!!this.config.auth.clientCertificate?.thumbprint || !!this.config.auth.clientCertificate?.thumbprintSha256) && !!this.config.auth.clientCertificate?.privateKey;
    if (this.appTokenProvider) {
      return;
    }
    if (clientSecretNotEmpty && clientAssertionNotEmpty || clientAssertionNotEmpty && certificateNotEmpty || clientSecretNotEmpty && certificateNotEmpty) {
      throw createClientAuthError(invalidClientCredential, "");
    }
    if (this.config.auth.clientSecret) {
      this.clientSecret = this.config.auth.clientSecret;
      return;
    }
    if (this.config.auth.clientAssertion) {
      this.developerProvidedClientAssertion = this.config.auth.clientAssertion;
      return;
    }
    if (!certificateNotEmpty) {
      throw createClientAuthError(invalidClientCredential, "");
    } else {
      this.clientAssertion = !!this.config.auth.clientCertificate.thumbprintSha256 ? ClientAssertion.fromCertificateWithSha256Thumbprint(this.config.auth.clientCertificate.thumbprintSha256, this.config.auth.clientCertificate.privateKey, this.config.auth.clientCertificate.x5c) : ClientAssertion.fromCertificate(
        // guaranteed to be a string, due to prior error checking in this function
        this.config.auth.clientCertificate.thumbprint,
        this.config.auth.clientCertificate.privateKey,
        this.config.auth.clientCertificate.x5c
      );
    }
    this.appTokenProvider = void 0;
  }
  /**
   * This extensibility point only works for the client_credential flow, i.e. acquireTokenByClientCredential and
   * is meant for Azure SDK to enhance Managed Identity support.
   *
   * @param IAppTokenProvider  - Extensibility interface, which allows the app developer to return a token from a custom source.
   */
  SetAppTokenProvider(provider) {
    this.appTokenProvider = provider;
  }
  /**
   * Acquires tokens from the authority for the application (not for an end user).
   */
  async acquireTokenByClientCredential(request) {
    this.logger.info("acquireTokenByClientCredential called", request.correlationId || "");
    let clientAssertion;
    if (request.clientAssertion) {
      clientAssertion = {
        assertion: await getClientAssertion(
          request.clientAssertion,
          this.config.auth.clientId
          // tokenEndpoint will be undefined. resourceRequestUri is omitted in ClientCredentialRequest
        ),
        assertionType: Constants.JWT_BEARER_ASSERTION_TYPE
      };
    }
    const baseRequest = await this.initializeBaseRequest(request);
    const validBaseRequest = {
      ...baseRequest,
      scopes: baseRequest.scopes.filter((scope) => !Constants_exports.OIDC_DEFAULT_SCOPES.includes(scope))
    };
    const validRequest = {
      ...request,
      ...validBaseRequest,
      clientAssertion
    };
    const authority = new UrlString(validRequest.authority, validRequest.correlationId);
    const tenantId = authority.getUrlComponents().PathSegments[0];
    if (Object.values(Constants_exports.AADAuthority).includes(tenantId)) {
      throw createClientAuthError(missingTenantIdError, validRequest.correlationId);
    }
    const ENV_MSAL_FORCE_REGION = process.env[MSAL_FORCE_REGION];
    let region;
    if (validRequest.azureRegion !== "DisableMsalForceRegion") {
      if (!validRequest.azureRegion && ENV_MSAL_FORCE_REGION) {
        region = ENV_MSAL_FORCE_REGION;
      } else {
        region = validRequest.azureRegion;
      }
    }
    const azureRegionConfiguration = {
      azureRegion: region,
      environmentRegion: process.env[REGION_ENVIRONMENT_VARIABLE]
    };
    const serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenByClientCredential, validRequest.correlationId, validRequest.skipCache);
    try {
      const discoveredAuthority = await this.createAuthority(validRequest.authority, validRequest.correlationId, azureRegionConfiguration, request.azureCloudOptions);
      const clientCredentialConfig = await this.buildOauthClientConfiguration(discoveredAuthority, validRequest.correlationId, "", serverTelemetryManager);
      const clientCredentialClient = new ClientCredentialClient(clientCredentialConfig, this.appTokenProvider);
      this.logger.verbose("Client credential client created", validRequest.correlationId);
      return await clientCredentialClient.acquireToken(validRequest);
    } catch (e) {
      if (e instanceof AuthError2) {
        e.correlationId = validRequest.correlationId;
      }
      serverTelemetryManager.cacheFailedRequest(e);
      throw e;
    }
  }
  /**
   * Acquires tokens from the authority for the application.
   *
   * Used in scenarios where the current app is a middle-tier service which was called with a token
   * representing an end user. The current app can use the token (oboAssertion) to request another
   * token to access downstream web API, on behalf of that user.
   *
   * The current middle-tier app has no user interaction to obtain consent.
   * See how to gain consent upfront for your middle-tier app from this article.
   * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow#gaining-consent-for-the-middle-tier-application
   */
  async acquireTokenOnBehalfOf(request) {
    this.logger.info("acquireTokenOnBehalfOf called", request.correlationId || "");
    const validRequest = {
      ...request,
      ...await this.initializeBaseRequest(request)
    };
    try {
      const discoveredAuthority = await this.createAuthority(validRequest.authority, validRequest.correlationId, void 0, request.azureCloudOptions);
      const onBehalfOfConfig = await this.buildOauthClientConfiguration(discoveredAuthority, validRequest.correlationId, "", void 0);
      const oboClient = new OnBehalfOfClient(onBehalfOfConfig);
      this.logger.verbose("On behalf of client created", validRequest.correlationId);
      return await oboClient.acquireToken(validRequest);
    } catch (e) {
      if (e instanceof AuthError2) {
        e.correlationId = validRequest.correlationId;
      }
      throw e;
    }
  }
  /**
   * Acquires a user-scoped token using the user_fic grant type (Leg 3 of Agent Identity).
   *
   * Exchanges a federated identity credential (instance token from Leg 2) for a user-scoped token.
   * Exactly one of `userObjectId` or `username` must be provided to identify the target user.
   *
   * This method always makes a network call. Use `acquireTokenSilent` to retrieve cached FIC tokens.
   */
  async acquireTokenByUserFederatedIdentityCredential(request) {
    this.logger.info("acquireTokenByUserFederatedIdentityCredential called", request.correlationId || "");
    if (request.userObjectId && request.username) {
      throw createClientAuthError(conflictingUserIdentifiers, request.correlationId || "");
    }
    if (!request.userObjectId && !request.username) {
      throw createClientAuthError(missingUserIdentifier, request.correlationId || "");
    }
    if (!request.assertion) {
      throw createClientAuthError(emptyFicAssertion, request.correlationId || "");
    }
    let clientAssertion;
    if (request.clientAssertion) {
      clientAssertion = {
        assertion: await getClientAssertion(request.clientAssertion, this.config.auth.clientId),
        assertionType: Constants.JWT_BEARER_ASSERTION_TYPE
      };
    }
    const baseRequest = await this.initializeBaseRequest(request);
    const validRequest = {
      ...request,
      ...baseRequest,
      assertion: request.assertion,
      clientAssertion
    };
    const serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenByUserFederatedIdentityCredential, validRequest.correlationId);
    try {
      const discoveredAuthority = await this.createAuthority(validRequest.authority, validRequest.correlationId, void 0, request.azureCloudOptions);
      const clientConfig = await this.buildOauthClientConfiguration(discoveredAuthority, validRequest.correlationId, "", serverTelemetryManager);
      const ficClient = new UserFederatedIdentityCredentialClient(clientConfig);
      this.logger.verbose("UserFederatedIdentityCredential client created", validRequest.correlationId);
      return await ficClient.acquireToken(validRequest);
    } catch (e) {
      if (e instanceof AuthError2) {
        e.correlationId = validRequest.correlationId;
      }
      serverTelemetryManager.cacheFailedRequest(e);
      throw e;
    }
  }
};

// ../../node_modules/@azure/msal-node/dist/utils/TimeUtils.mjs
function isIso8601(dateString) {
  if (typeof dateString !== "string") {
    return false;
  }
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && date.toISOString() === dateString;
}

// ../../node_modules/@azure/msal-node/dist/network/HttpClientWithRetries.mjs
var HttpClientWithRetries = class {
  constructor(httpClientNoRetries, retryPolicy3, logger27) {
    this.httpClientNoRetries = httpClientNoRetries;
    this.retryPolicy = retryPolicy3;
    this.logger = logger27;
  }
  async sendNetworkRequestAsyncHelper(httpMethod, url, options) {
    if (httpMethod === HttpMethod2.GET) {
      return this.httpClientNoRetries.sendGetRequestAsync(url, options);
    } else {
      return this.httpClientNoRetries.sendPostRequestAsync(url, options);
    }
  }
  async sendNetworkRequestAsync(httpMethod, url, options) {
    let response = await this.sendNetworkRequestAsyncHelper(httpMethod, url, options);
    if ("isNewRequest" in this.retryPolicy) {
      this.retryPolicy.isNewRequest = true;
    }
    let currentRetry = 0;
    while (await this.retryPolicy.pauseForRetry(response.status, currentRetry, this.logger, response.headers[Constants_exports.HeaderNames.RETRY_AFTER])) {
      response = await this.sendNetworkRequestAsyncHelper(httpMethod, url, options);
      currentRetry++;
    }
    return response;
  }
  async sendGetRequestAsync(url, options) {
    return this.sendNetworkRequestAsync(HttpMethod2.GET, url, options);
  }
  async sendPostRequestAsync(url, options) {
    return this.sendNetworkRequestAsync(HttpMethod2.POST, url, options);
  }
};

// ../../node_modules/@azure/msal-node/dist/client/ManagedIdentitySources/BaseManagedIdentitySource.mjs
var ManagedIdentityUserAssignedIdQueryParameterNames = {
  MANAGED_IDENTITY_CLIENT_ID_2017: "clientid",
  MANAGED_IDENTITY_CLIENT_ID: "client_id",
  MANAGED_IDENTITY_OBJECT_ID: "object_id",
  MANAGED_IDENTITY_RESOURCE_ID_IMDS: "msi_res_id",
  MANAGED_IDENTITY_RESOURCE_ID_NON_IMDS: "mi_res_id"
};
var BaseManagedIdentitySource = class {
  /**
   * Creates an instance of BaseManagedIdentitySource.
   *
   * @param logger - Logger instance for diagnostic information
   * @param nodeStorage - Storage interface for caching tokens
   * @param networkClient - Network client for making HTTP requests
   * @param cryptoProvider - Cryptographic provider for token operations
   * @param disableInternalRetries - Whether to disable automatic retry logic
   */
  constructor(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries) {
    this.logger = logger27;
    this.nodeStorage = nodeStorage;
    this.networkClient = networkClient;
    this.cryptoProvider = cryptoProvider;
    this.disableInternalRetries = disableInternalRetries;
  }
  /**
   * Generates a new correlation ID for request tracing.
   *
   * @returns A new GUID string for use as a correlation or request ID
   */
  createCorrelationId() {
    return this.cryptoProvider.createNewGuid();
  }
  /**
   * Processes the network response and converts it to a standardized server token response.
   * This async version allows for source-specific response processing logic while maintaining
   * backward compatibility with the synchronous version.
   *
   * @param response - The network response containing the managed identity token
   * @param _networkClient - Network client used for the request (unused in base implementation)
   * @param _networkRequest - The original network request parameters (unused in base implementation)
   * @param _networkRequestOptions - The network request options (unused in base implementation)
   *
   * @returns Promise resolving to a standardized server authorization token response
   */
  async getServerTokenResponseAsync(response, _networkClient, _networkRequest, _networkRequestOptions) {
    return this.getServerTokenResponse(response);
  }
  /**
   * Converts a managed identity token response to a standardized server authorization token response.
   * Handles time format conversion, expiration calculation, and error mapping to ensure
   * compatibility with the MSAL response handling pipeline.
   *
   * @param response - The network response containing the managed identity token
   *
   * @returns Standardized server authorization token response with normalized fields
   */
  getServerTokenResponse(response) {
    let refreshIn, expiresIn;
    if (response.body.expires_on) {
      if (isIso8601(response.body.expires_on)) {
        response.body.expires_on = new Date(response.body.expires_on).getTime() / 1e3;
      }
      expiresIn = response.body.expires_on - TimeUtils_exports.nowSeconds();
      if (expiresIn > 2 * 3600) {
        refreshIn = expiresIn / 2;
      }
    }
    const serverTokenResponse = {
      status: response.status,
      // success
      access_token: response.body.access_token,
      expires_in: expiresIn,
      scope: response.body.resource,
      token_type: response.body.token_type,
      refresh_in: refreshIn,
      // error
      correlation_id: response.body.correlation_id || response.body.correlationId,
      error: typeof response.body.error === "string" ? response.body.error : response.body.error?.code,
      error_description: response.body.message || (typeof response.body.error === "string" ? response.body.error_description : response.body.error?.message),
      error_codes: response.body.error_codes,
      timestamp: response.body.timestamp,
      trace_id: response.body.trace_id
    };
    return serverTokenResponse;
  }
  /**
   * Acquires an access token using the managed identity endpoint for the specified resource.
   * This is the primary method for token acquisition, handling the complete flow from
   * request creation through response processing and token caching.
   *
   * @param managedIdentityRequest - The managed identity request containing resource and optional parameters
   * @param managedIdentityId - The managed identity configuration (system or user-assigned)
   * @param fakeAuthority - Authority instance used for token caching (managed identity uses a placeholder authority)
   * @param refreshAccessToken - Whether this is a token refresh operation
   *
   * @returns Promise resolving to an authentication result containing the access token and metadata
   *
   * @throws {AuthError} When network requests fail or token validation fails
   * @throws {ClientAuthError} When network errors occur during the request
   */
  async acquireTokenWithManagedIdentity(managedIdentityRequest, managedIdentityId, fakeAuthority, refreshAccessToken) {
    const networkRequest = this.createRequest(managedIdentityRequest.resource, managedIdentityId);
    if (managedIdentityRequest.revokedTokenSha256Hash) {
      this.logger.info(`[Managed Identity] The following claims are present in the request: ${managedIdentityRequest.claims}`, "");
      networkRequest.queryParameters[ManagedIdentityQueryParameters.SHA256_TOKEN_TO_REFRESH] = managedIdentityRequest.revokedTokenSha256Hash;
    }
    if (managedIdentityRequest.clientCapabilities?.length) {
      const clientCapabilities = managedIdentityRequest.clientCapabilities.toString();
      this.logger.info(`[Managed Identity] The following client capabilities are present in the request: ${clientCapabilities}`, "");
      networkRequest.queryParameters[ManagedIdentityQueryParameters.XMS_CC] = clientCapabilities;
    }
    const headers = networkRequest.headers;
    headers[Constants_exports.HeaderNames.CONTENT_TYPE] = Constants_exports.URL_FORM_CONTENT_TYPE;
    const networkRequestOptions = { headers };
    if (Object.keys(networkRequest.bodyParameters).length) {
      networkRequestOptions.body = networkRequest.computeParametersBodyString();
    }
    const networkClientHelper = this.disableInternalRetries ? this.networkClient : new HttpClientWithRetries(this.networkClient, networkRequest.retryPolicy, this.logger);
    const reqTimestamp = TimeUtils_exports.nowSeconds();
    let response;
    try {
      if (networkRequest.httpMethod === HttpMethod2.POST) {
        response = await networkClientHelper.sendPostRequestAsync(networkRequest.computeUri(), networkRequestOptions);
      } else {
        response = await networkClientHelper.sendGetRequestAsync(networkRequest.computeUri(), networkRequestOptions);
      }
    } catch (error) {
      if (error instanceof AuthError2) {
        throw error;
      } else {
        throw createClientAuthError(ClientAuthErrorCodes_exports.networkError, managedIdentityRequest.correlationId);
      }
    }
    const responseHandler = new ResponseHandler(managedIdentityId.id, this.nodeStorage, this.cryptoProvider, this.logger, new StubPerformanceClient(), null, null);
    const serverTokenResponse = await this.getServerTokenResponseAsync(response, networkClientHelper, networkRequest, networkRequestOptions);
    responseHandler.validateTokenResponse(serverTokenResponse, serverTokenResponse.correlation_id || "", refreshAccessToken);
    return responseHandler.handleServerTokenResponse(serverTokenResponse, fakeAuthority, reqTimestamp, managedIdentityRequest, ApiId.acquireTokenWithManagedIdentity);
  }
  /**
   * Determines the appropriate query parameter name for user-assigned managed identity
   * based on the identity type, API version, and endpoint characteristics.
   * Different Azure services and API versions use different parameter names for the same identity types.
   *
   * @param managedIdentityIdType - The type of user-assigned managed identity (client ID, object ID, or resource ID)
   * @param isImds - Whether the request is being made to the IMDS (Instance Metadata Service) endpoint
   * @param usesApi2017 - Whether the endpoint uses the 2017-09-01 API version (affects client ID parameter name)
   *
   * @returns The correct query parameter name for the specified identity type and endpoint
   *
   * @throws {ManagedIdentityError} When an invalid managed identity ID type is provided
   */
  getManagedIdentityUserAssignedIdQueryParameterKey(managedIdentityIdType, isImds, usesApi2017) {
    switch (managedIdentityIdType) {
      case ManagedIdentityIdType.USER_ASSIGNED_CLIENT_ID:
        this.logger.info(`[Managed Identity] [API version ${usesApi2017 ? "2017+" : "2019+"}] Adding user assigned client id to the request.`, "");
        return usesApi2017 ? ManagedIdentityUserAssignedIdQueryParameterNames.MANAGED_IDENTITY_CLIENT_ID_2017 : ManagedIdentityUserAssignedIdQueryParameterNames.MANAGED_IDENTITY_CLIENT_ID;
      case ManagedIdentityIdType.USER_ASSIGNED_RESOURCE_ID:
        this.logger.info("[Managed Identity] Adding user assigned resource id to the request.", "");
        return isImds ? ManagedIdentityUserAssignedIdQueryParameterNames.MANAGED_IDENTITY_RESOURCE_ID_IMDS : ManagedIdentityUserAssignedIdQueryParameterNames.MANAGED_IDENTITY_RESOURCE_ID_NON_IMDS;
      case ManagedIdentityIdType.USER_ASSIGNED_OBJECT_ID:
        this.logger.info("[Managed Identity] Adding user assigned object id to the request.", "");
        return ManagedIdentityUserAssignedIdQueryParameterNames.MANAGED_IDENTITY_OBJECT_ID;
      default:
        throw createManagedIdentityError(invalidManagedIdentityIdType, "");
    }
  }
};
BaseManagedIdentitySource.getValidatedEnvVariableUrlString = (envVariableStringName, envVariable, sourceName, logger27) => {
  try {
    return new UrlString(envVariable, "").urlString;
  } catch (error) {
    logger27.info(`[Managed Identity] ${sourceName} managed identity is unavailable because the '${envVariableStringName}' environment variable is malformed.`, "");
    throw createManagedIdentityError(MsiEnvironmentVariableUrlMalformedErrorCodes[envVariableStringName], "");
  }
};

// ../../node_modules/@azure/msal-node/dist/retry/LinearRetryStrategy.mjs
var LinearRetryStrategy = class {
  /**
   * Calculates the number of milliseconds to sleep based on the `retry-after` HTTP header.
   *
   * @param retryHeader - The value of the `retry-after` HTTP header. This can be either a number of seconds
   *                      or an HTTP date string.
   * @returns The number of milliseconds to sleep before retrying the request. If the `retry-after` header is not
   *          present or cannot be parsed, returns 0.
   */
  calculateDelay(retryHeader, minimumDelay) {
    if (!retryHeader) {
      return minimumDelay;
    }
    let millisToSleep = Math.round(parseFloat(retryHeader) * 1e3);
    if (isNaN(millisToSleep)) {
      millisToSleep = new Date(retryHeader).valueOf() - (/* @__PURE__ */ new Date()).valueOf();
    }
    return Math.max(minimumDelay, millisToSleep);
  }
};

// ../../node_modules/@azure/msal-node/dist/retry/DefaultManagedIdentityRetryPolicy.mjs
var DEFAULT_MANAGED_IDENTITY_MAX_RETRIES = 3;
var DEFAULT_MANAGED_IDENTITY_RETRY_DELAY_MS = 1e3;
var DEFAULT_MANAGED_IDENTITY_HTTP_STATUS_CODES_TO_RETRY_ON = [
  Constants_exports.HTTP_NOT_FOUND,
  Constants_exports.HTTP_REQUEST_TIMEOUT,
  Constants_exports.HTTP_TOO_MANY_REQUESTS,
  Constants_exports.HTTP_SERVER_ERROR,
  Constants_exports.HTTP_SERVICE_UNAVAILABLE,
  Constants_exports.HTTP_GATEWAY_TIMEOUT
];
var DefaultManagedIdentityRetryPolicy = class _DefaultManagedIdentityRetryPolicy {
  constructor() {
    this.linearRetryStrategy = new LinearRetryStrategy();
  }
  /*
   * this is defined here as a static variable despite being defined as a constant outside of the
   * class because it needs to be overridden in the unit tests so that the unit tests run faster
   */
  static get DEFAULT_MANAGED_IDENTITY_RETRY_DELAY_MS() {
    return DEFAULT_MANAGED_IDENTITY_RETRY_DELAY_MS;
  }
  async pauseForRetry(httpStatusCode, currentRetry, logger27, retryAfterHeader) {
    if (DEFAULT_MANAGED_IDENTITY_HTTP_STATUS_CODES_TO_RETRY_ON.includes(httpStatusCode) && currentRetry < DEFAULT_MANAGED_IDENTITY_MAX_RETRIES) {
      const retryAfterDelay = this.linearRetryStrategy.calculateDelay(retryAfterHeader, _DefaultManagedIdentityRetryPolicy.DEFAULT_MANAGED_IDENTITY_RETRY_DELAY_MS);
      logger27.verbose(`Retrying request in ${retryAfterDelay}ms (retry attempt: ${currentRetry + 1})`, "");
      await new Promise((resolve) => {
        return setTimeout(resolve, retryAfterDelay);
      });
      return true;
    }
    return false;
  }
};

// ../../node_modules/@azure/msal-node/dist/config/ManagedIdentityRequestParameters.mjs
var ManagedIdentityRequestParameters = class {
  constructor(httpMethod, endpoint, retryPolicy3) {
    this.httpMethod = httpMethod;
    this._baseEndpoint = endpoint;
    this.headers = {};
    this.bodyParameters = {};
    this.queryParameters = {};
    this.retryPolicy = retryPolicy3 || new DefaultManagedIdentityRetryPolicy();
  }
  computeUri() {
    const parameters = /* @__PURE__ */ new Map();
    if (this.queryParameters) {
      RequestParameterBuilder_exports.addExtraParameters(parameters, this.queryParameters);
    }
    const queryParametersString = UrlUtils_exports.mapToQueryString(parameters);
    return UrlString.appendQueryString(this._baseEndpoint, queryParametersString);
  }
  computeParametersBodyString() {
    const parameters = /* @__PURE__ */ new Map();
    if (this.bodyParameters) {
      RequestParameterBuilder_exports.addExtraParameters(parameters, this.bodyParameters);
    }
    return UrlUtils_exports.mapToQueryString(parameters);
  }
};

// ../../node_modules/@azure/msal-node/dist/client/ManagedIdentitySources/AppService.mjs
var APP_SERVICE_MSI_API_VERSION = "2019-08-01";
var AppService = class _AppService extends BaseManagedIdentitySource {
  /**
   * Creates a new instance of the AppService managed identity source.
   *
   * @param logger - Logger instance for diagnostic output
   * @param nodeStorage - Node.js storage implementation for caching
   * @param networkClient - Network client for making HTTP requests
   * @param cryptoProvider - Cryptographic operations provider
   * @param disableInternalRetries - Whether to disable internal retry logic
   * @param identityEndpoint - The App Service identity endpoint URL
   * @param identityHeader - The secret header value required for authentication
   */
  constructor(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries, identityEndpoint, identityHeader) {
    super(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries);
    this.identityEndpoint = identityEndpoint;
    this.identityHeader = identityHeader;
  }
  /**
   * Retrieves the required environment variables for App Service managed identity.
   *
   * App Service managed identity requires two environment variables:
   * - IDENTITY_ENDPOINT: The URL of the local metadata service
   * - IDENTITY_HEADER: A secret header value for authentication
   *
   * @returns An array containing [identityEndpoint, identityHeader] values from environment variables.
   *          Either value may be undefined if the environment variable is not set.
   */
  static getEnvironmentVariables() {
    const identityEndpoint = process.env[ManagedIdentityEnvironmentVariableNames.IDENTITY_ENDPOINT];
    const identityHeader = process.env[ManagedIdentityEnvironmentVariableNames.IDENTITY_HEADER];
    return [identityEndpoint, identityHeader];
  }
  /**
   * Attempts to create an AppService managed identity source if the environment supports it.
   *
   * This method checks for the presence of required environment variables and validates
   * the identity endpoint URL. If the environment is not suitable for App Service managed
   * identity (missing environment variables or invalid endpoint), it returns null.
   *
   * @param logger - Logger instance for diagnostic output
   * @param nodeStorage - Node.js storage implementation for caching
   * @param networkClient - Network client for making HTTP requests
   * @param cryptoProvider - Cryptographic operations provider
   * @param disableInternalRetries - Whether to disable internal retry logic
   *
   * @returns A new AppService instance if the environment is suitable, null otherwise
   */
  static tryCreate(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries) {
    const [identityEndpoint, identityHeader] = _AppService.getEnvironmentVariables();
    if (!identityEndpoint || !identityHeader) {
      logger27.info(`[Managed Identity] ${ManagedIdentitySourceNames.APP_SERVICE} managed identity is unavailable because one or both of the '${ManagedIdentityEnvironmentVariableNames.IDENTITY_HEADER}' and '${ManagedIdentityEnvironmentVariableNames.IDENTITY_ENDPOINT}' environment variables are not defined.`, "");
      return null;
    }
    const validatedIdentityEndpoint = _AppService.getValidatedEnvVariableUrlString(ManagedIdentityEnvironmentVariableNames.IDENTITY_ENDPOINT, identityEndpoint, ManagedIdentitySourceNames.APP_SERVICE, logger27);
    logger27.info(`[Managed Identity] Environment variables validation passed for ${ManagedIdentitySourceNames.APP_SERVICE} managed identity. Endpoint URI: ${validatedIdentityEndpoint}. Creating ${ManagedIdentitySourceNames.APP_SERVICE} managed identity.`, "");
    return new _AppService(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries, identityEndpoint, identityHeader);
  }
  /**
   * Creates a managed identity token request for the App Service environment.
   *
   * This method constructs an HTTP GET request to the App Service identity endpoint
   * with the required headers, query parameters, and managed identity configuration.
   * The request includes the secret header for authentication and appropriate API version.
   *
   * @param resource - The target resource/scope for which to request an access token (e.g., "https://graph.microsoft.com/.default")
   * @param managedIdentityId - The managed identity configuration specifying whether to use system-assigned or user-assigned identity
   *
   * @returns A configured ManagedIdentityRequestParameters object ready for network execution
   */
  createRequest(resource, managedIdentityId) {
    const request = new ManagedIdentityRequestParameters(HttpMethod2.GET, this.identityEndpoint);
    request.headers[ManagedIdentityHeaders.APP_SERVICE_SECRET_HEADER_NAME] = this.identityHeader;
    request.queryParameters[ManagedIdentityQueryParameters.API_VERSION] = APP_SERVICE_MSI_API_VERSION;
    request.queryParameters[ManagedIdentityQueryParameters.RESOURCE] = resource;
    if (managedIdentityId.idType !== ManagedIdentityIdType.SYSTEM_ASSIGNED) {
      request.queryParameters[this.getManagedIdentityUserAssignedIdQueryParameterKey(managedIdentityId.idType)] = managedIdentityId.id;
    }
    return request;
  }
};

// ../../node_modules/@azure/msal-node/dist/client/ManagedIdentitySources/AzureArc.mjs
import { accessSync, constants, statSync, readFileSync } from "fs";
import path from "path";
var ARC_API_VERSION = "2020-06-01";
var DEFAULT_AZURE_ARC_IDENTITY_ENDPOINT = "http://127.0.0.1:40342/metadata/identity/oauth2/token";
var HIMDS_EXECUTABLE_HELPER_STRING = "N/A: himds executable exists";
var SUPPORTED_AZURE_ARC_PLATFORMS = {
  win32: `${process.env["ProgramData"]}\\AzureConnectedMachineAgent\\Tokens\\`,
  linux: "/var/opt/azcmagent/tokens/"
};
var AZURE_ARC_FILE_DETECTION = {
  win32: `${process.env["ProgramFiles"]}\\AzureConnectedMachineAgent\\himds.exe`,
  linux: "/opt/azcmagent/bin/himds"
};
var AzureArc = class _AzureArc extends BaseManagedIdentitySource {
  /**
   * Creates a new instance of the AzureArc managed identity source.
   *
   * @param logger - Logger instance for capturing telemetry and diagnostic information
   * @param nodeStorage - Storage implementation for caching tokens and metadata
   * @param networkClient - Network client for making HTTP requests to the identity endpoint
   * @param cryptoProvider - Cryptographic operations provider for token validation and encryption
   * @param disableInternalRetries - Flag to disable automatic retry logic for failed requests
   * @param identityEndpoint - The Azure Arc identity endpoint URL for token requests
   */
  constructor(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries, identityEndpoint) {
    super(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries);
    this.identityEndpoint = identityEndpoint;
  }
  /**
   * Retrieves and validates Azure Arc environment variables for managed identity configuration.
   *
   * This method checks for IDENTITY_ENDPOINT and IMDS_ENDPOINT environment variables.
   * If either is missing, it attempts to detect the Azure Arc environment by checking for
   * the HIMDS executable at platform-specific paths. On successful detection, it returns
   * the default identity endpoint and a helper string indicating file-based detection.
   *
   * @returns An array containing [identityEndpoint, imdsEndpoint] where both values are
   *          strings if Azure Arc is available, or undefined if not available.
   */
  static getEnvironmentVariables() {
    let identityEndpoint = process.env[ManagedIdentityEnvironmentVariableNames.IDENTITY_ENDPOINT];
    let imdsEndpoint = process.env[ManagedIdentityEnvironmentVariableNames.IMDS_ENDPOINT];
    if (!identityEndpoint || !imdsEndpoint) {
      const fileDetectionPath = AZURE_ARC_FILE_DETECTION[process.platform];
      try {
        accessSync(fileDetectionPath, constants.F_OK | constants.R_OK);
        identityEndpoint = DEFAULT_AZURE_ARC_IDENTITY_ENDPOINT;
        imdsEndpoint = HIMDS_EXECUTABLE_HELPER_STRING;
      } catch (err) {
      }
    }
    return [identityEndpoint, imdsEndpoint];
  }
  /**
   * Attempts to create an AzureArc managed identity source instance.
   *
   * Validates the Azure Arc environment by checking environment variables
   * and performing file-based detection. It ensures that only system-assigned managed identities
   * are supported for Azure Arc scenarios. The method performs comprehensive validation of
   * endpoint URLs and logs detailed information about the detection process.
   *
   * @param logger - Logger instance for capturing creation and validation steps
   * @param nodeStorage - Storage implementation for the managed identity source
   * @param networkClient - Network client for HTTP communication
   * @param cryptoProvider - Cryptographic operations provider
   * @param disableInternalRetries - Whether to disable automatic retry mechanisms
   * @param managedIdentityId - The managed identity configuration, must be system-assigned
   *
   * @returns AzureArc instance if the environment supports Azure Arc managed identity, null otherwise
   *
   * @throws {ManagedIdentityError} When a user-assigned managed identity is specified (not supported for Azure Arc)
   */
  static tryCreate(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries, managedIdentityId) {
    const [identityEndpoint, imdsEndpoint] = _AzureArc.getEnvironmentVariables();
    if (!identityEndpoint || !imdsEndpoint) {
      logger27.info(`[Managed Identity] ${ManagedIdentitySourceNames.AZURE_ARC} managed identity is unavailable through environment variables because one or both of '${ManagedIdentityEnvironmentVariableNames.IDENTITY_ENDPOINT}' and '${ManagedIdentityEnvironmentVariableNames.IMDS_ENDPOINT}' are not defined. ${ManagedIdentitySourceNames.AZURE_ARC} managed identity is also unavailable through file detection.`, "");
      return null;
    }
    if (imdsEndpoint === HIMDS_EXECUTABLE_HELPER_STRING) {
      logger27.info(`[Managed Identity] ${ManagedIdentitySourceNames.AZURE_ARC} managed identity is available through file detection. Defaulting to known ${ManagedIdentitySourceNames.AZURE_ARC} endpoint: ${DEFAULT_AZURE_ARC_IDENTITY_ENDPOINT}. Creating ${ManagedIdentitySourceNames.AZURE_ARC} managed identity.`, "");
    } else {
      const validatedIdentityEndpoint = _AzureArc.getValidatedEnvVariableUrlString(ManagedIdentityEnvironmentVariableNames.IDENTITY_ENDPOINT, identityEndpoint, ManagedIdentitySourceNames.AZURE_ARC, logger27);
      validatedIdentityEndpoint.endsWith("/") ? validatedIdentityEndpoint.slice(0, -1) : validatedIdentityEndpoint;
      _AzureArc.getValidatedEnvVariableUrlString(ManagedIdentityEnvironmentVariableNames.IMDS_ENDPOINT, imdsEndpoint, ManagedIdentitySourceNames.AZURE_ARC, logger27);
      logger27.info(`[Managed Identity] Environment variables validation passed for ${ManagedIdentitySourceNames.AZURE_ARC} managed identity. Endpoint URI: ${validatedIdentityEndpoint}. Creating ${ManagedIdentitySourceNames.AZURE_ARC} managed identity.`, "");
    }
    if (managedIdentityId.idType !== ManagedIdentityIdType.SYSTEM_ASSIGNED) {
      throw createManagedIdentityError(unableToCreateAzureArc, "");
    }
    return new _AzureArc(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries, identityEndpoint);
  }
  /**
   * Creates a properly formatted HTTP request for acquiring tokens from the Azure Arc identity endpoint.
   *
   * This method constructs a GET request to the Azure Arc HIMDS endpoint with the required metadata header
   * and query parameters. The endpoint URL is normalized to use 127.0.0.1 instead of localhost for
   * consistency. Additional body parameters are calculated by the base class during token acquisition.
   *
   * @param resource - The target resource/scope for which to request an access token (e.g., "https://graph.microsoft.com/.default")
   *
   * @returns A configured ManagedIdentityRequestParameters object ready for network execution
   */
  createRequest(resource) {
    const request = new ManagedIdentityRequestParameters(HttpMethod2.GET, this.identityEndpoint.replace("localhost", "127.0.0.1"));
    request.headers[ManagedIdentityHeaders.METADATA_HEADER_NAME] = "true";
    request.queryParameters[ManagedIdentityQueryParameters.API_VERSION] = ARC_API_VERSION;
    request.queryParameters[ManagedIdentityQueryParameters.RESOURCE] = resource;
    return request;
  }
  /**
   * Processes the server response and handles Azure Arc-specific authentication challenges.
   *
   * This method implements the Azure Arc authentication flow which may require reading a secret file
   * for authorization. When the initial request returns HTTP 401 Unauthorized, it extracts the file
   * path from the WWW-Authenticate header, validates the file location and size, reads the secret,
   * and retries the request with Basic authentication. The method includes comprehensive security
   * validations to prevent path traversal and ensure file integrity.
   *
   * @param originalResponse - The initial HTTP response from the identity endpoint
   * @param networkClient - Network client for making the retry request if needed
   * @param networkRequest - The original request parameters (modified with auth header for retry)
   * @param networkRequestOptions - Additional options for network requests
   *
   * @returns A promise that resolves to the server token response with access token and metadata
   *
   * @throws {ManagedIdentityError} When:
   *   - WWW-Authenticate header is missing or has unsupported format
   *   - Platform is not supported (not Windows or Linux)
   *   - Secret file has invalid extension (not .key)
   *   - Secret file path doesn't match expected platform path
   *   - Secret file cannot be read or is too large (>4096 bytes)
   * @throws {ClientAuthError} When network errors occur during retry request
   */
  async getServerTokenResponseAsync(originalResponse, networkClient, networkRequest, networkRequestOptions) {
    let retryResponse;
    if (originalResponse.status === Constants_exports.HTTP_UNAUTHORIZED) {
      const wwwAuthHeader = originalResponse.headers["www-authenticate"];
      if (!wwwAuthHeader) {
        throw createManagedIdentityError(wwwAuthenticateHeaderMissing, "");
      }
      if (!wwwAuthHeader.includes("Basic realm=")) {
        throw createManagedIdentityError(wwwAuthenticateHeaderUnsupportedFormat, "");
      }
      const secretFilePath = wwwAuthHeader.split("Basic realm=")[1];
      if (!SUPPORTED_AZURE_ARC_PLATFORMS.hasOwnProperty(process.platform)) {
        throw createManagedIdentityError(platformNotSupported, "");
      }
      const expectedSecretFilePath = SUPPORTED_AZURE_ARC_PLATFORMS[process.platform];
      const fileName = path.basename(secretFilePath);
      if (!fileName.endsWith(".key")) {
        throw createManagedIdentityError(invalidFileExtension, "");
      }
      if (expectedSecretFilePath + fileName !== secretFilePath) {
        throw createManagedIdentityError(invalidFilePath, "");
      }
      let secretFileSize;
      try {
        secretFileSize = await statSync(secretFilePath).size;
      } catch (e) {
        throw createManagedIdentityError(unableToReadSecretFile, "");
      }
      if (secretFileSize > AZURE_ARC_SECRET_FILE_MAX_SIZE_BYTES) {
        throw createManagedIdentityError(invalidSecret, "");
      }
      let secret;
      try {
        secret = readFileSync(secretFilePath, Constants_exports.EncodingTypes.UTF8);
      } catch (e) {
        throw createManagedIdentityError(unableToReadSecretFile, "");
      }
      const authHeaderValue = `Basic ${secret}`;
      this.logger.info(`[Managed Identity] Adding authorization header to the request.`, "");
      networkRequest.headers[ManagedIdentityHeaders.AUTHORIZATION_HEADER_NAME] = authHeaderValue;
      try {
        retryResponse = await networkClient.sendGetRequestAsync(networkRequest.computeUri(), networkRequestOptions);
      } catch (error) {
        if (error instanceof AuthError2) {
          throw error;
        } else {
          throw createClientAuthError(ClientAuthErrorCodes_exports.networkError, "");
        }
      }
    }
    return this.getServerTokenResponse(retryResponse || originalResponse);
  }
};

// ../../node_modules/@azure/msal-node/dist/client/ManagedIdentitySources/CloudShell.mjs
var CloudShell = class _CloudShell extends BaseManagedIdentitySource {
  /**
   * Creates a new CloudShell managed identity source instance.
   *
   * @param logger - Logger instance for diagnostic logging
   * @param nodeStorage - Node.js storage implementation for caching
   * @param networkClient - HTTP client for making requests to the managed identity endpoint
   * @param cryptoProvider - Cryptographic operations provider
   * @param disableInternalRetries - Whether to disable automatic retry logic for failed requests
   * @param msiEndpoint - The MSI endpoint URL obtained from environment variables
   */
  constructor(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries, msiEndpoint) {
    super(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries);
    this.msiEndpoint = msiEndpoint;
  }
  /**
   * Retrieves the required environment variables for Cloud Shell managed identity.
   *
   * Cloud Shell requires the MSI_ENDPOINT environment variable to be set, which
   * contains the URL of the managed identity service endpoint.
   *
   * @returns An array containing the MSI_ENDPOINT environment variable value (or undefined if not set)
   */
  static getEnvironmentVariables() {
    const msiEndpoint = process.env[ManagedIdentityEnvironmentVariableNames.MSI_ENDPOINT];
    return [msiEndpoint];
  }
  /**
   * Attempts to create a CloudShell managed identity source instance.
   *
   * This method validates that the required environment variables are present and
   * creates a CloudShell instance if the environment is properly configured.
   * Cloud Shell only supports system-assigned managed identities.
   *
   * @param logger - Logger instance for diagnostic logging
   * @param nodeStorage - Node.js storage implementation for caching
   * @param networkClient - HTTP client for making requests
   * @param cryptoProvider - Cryptographic operations provider
   * @param disableInternalRetries - Whether to disable automatic retry logic
   * @param managedIdentityId - The managed identity configuration (must be system-assigned)
   *
   * @returns A CloudShell instance if the environment is valid, null otherwise
   *
   * @throws {ManagedIdentityError} When a user-assigned managed identity is requested,
   *         as Cloud Shell only supports system-assigned identities
   */
  static tryCreate(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries, managedIdentityId) {
    const [msiEndpoint] = _CloudShell.getEnvironmentVariables();
    if (!msiEndpoint) {
      logger27.info(`[Managed Identity] ${ManagedIdentitySourceNames.CLOUD_SHELL} managed identity is unavailable because the '${ManagedIdentityEnvironmentVariableNames.MSI_ENDPOINT} environment variable is not defined.`, "");
      return null;
    }
    const validatedMsiEndpoint = _CloudShell.getValidatedEnvVariableUrlString(ManagedIdentityEnvironmentVariableNames.MSI_ENDPOINT, msiEndpoint, ManagedIdentitySourceNames.CLOUD_SHELL, logger27);
    logger27.info(`[Managed Identity] Environment variable validation passed for ${ManagedIdentitySourceNames.CLOUD_SHELL} managed identity. Endpoint URI: ${validatedMsiEndpoint}. Creating ${ManagedIdentitySourceNames.CLOUD_SHELL} managed identity.`, "");
    if (managedIdentityId.idType !== ManagedIdentityIdType.SYSTEM_ASSIGNED) {
      throw createManagedIdentityError(unableToCreateCloudShell, "");
    }
    return new _CloudShell(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries, msiEndpoint);
  }
  /**
   * Creates an HTTP request to acquire an access token from the Cloud Shell managed identity endpoint.
   *
   * This method constructs a POST request to the MSI endpoint with the required headers and
   * body parameters for Cloud Shell authentication. The request includes the target resource
   * for which the access token is being requested.
   *
   * @param resource - The target resource/scope for which to request an access token (e.g., "https://graph.microsoft.com/.default")
   *
   * @returns A configured ManagedIdentityRequestParameters object ready for network execution
   */
  createRequest(resource) {
    const request = new ManagedIdentityRequestParameters(HttpMethod2.POST, this.msiEndpoint);
    request.headers[ManagedIdentityHeaders.METADATA_HEADER_NAME] = "true";
    request.bodyParameters[ManagedIdentityQueryParameters.RESOURCE] = resource;
    return request;
  }
};

// ../../node_modules/@azure/msal-node/dist/retry/ExponentialRetryStrategy.mjs
var ExponentialRetryStrategy = class {
  constructor(minExponentialBackoff, maxExponentialBackoff, exponentialDeltaBackoff) {
    this.minExponentialBackoff = minExponentialBackoff;
    this.maxExponentialBackoff = maxExponentialBackoff;
    this.exponentialDeltaBackoff = exponentialDeltaBackoff;
  }
  /**
   * Calculates the exponential delay based on the current retry attempt.
   *
   * @param {number} currentRetry - The current retry attempt number.
   * @returns {number} - The calculated exponential delay in milliseconds.
   *
   * The delay is calculated using the formula:
   * - If `currentRetry` is 0, it returns the minimum backoff time.
   * - Otherwise, it calculates the delay as the minimum of:
   *   - `(2^(currentRetry - 1)) * deltaBackoff`
   *   - `maxBackoff`
   *
   * This ensures that the delay increases exponentially with each retry attempt,
   * but does not exceed the maximum backoff time.
   */
  calculateDelay(currentRetry) {
    if (currentRetry === 0) {
      return this.minExponentialBackoff;
    }
    const exponentialDelay = Math.min(Math.pow(2, currentRetry - 1) * this.exponentialDeltaBackoff, this.maxExponentialBackoff);
    return exponentialDelay;
  }
};

// ../../node_modules/@azure/msal-node/dist/retry/ImdsRetryPolicy.mjs
var HTTP_STATUS_400_CODES_FOR_EXPONENTIAL_STRATEGY = [
  Constants_exports.HTTP_NOT_FOUND,
  Constants_exports.HTTP_REQUEST_TIMEOUT,
  Constants_exports.HTTP_GONE,
  Constants_exports.HTTP_TOO_MANY_REQUESTS
];
var EXPONENTIAL_STRATEGY_NUM_RETRIES = 3;
var LINEAR_STRATEGY_NUM_RETRIES = 7;
var MIN_EXPONENTIAL_BACKOFF_MS = 1e3;
var MAX_EXPONENTIAL_BACKOFF_MS = 4e3;
var EXPONENTIAL_DELTA_BACKOFF_MS = 2e3;
var HTTP_STATUS_GONE_RETRY_AFTER_MS = 10 * 1e3;
var ImdsRetryPolicy = class _ImdsRetryPolicy {
  constructor() {
    this.exponentialRetryStrategy = new ExponentialRetryStrategy(_ImdsRetryPolicy.MIN_EXPONENTIAL_BACKOFF_MS, _ImdsRetryPolicy.MAX_EXPONENTIAL_BACKOFF_MS, _ImdsRetryPolicy.EXPONENTIAL_DELTA_BACKOFF_MS);
  }
  /*
   * these are defined here as static variables despite being defined as constants outside of the
   * class because they need to be overridden in the unit tests so that the unit tests run faster
   */
  static get MIN_EXPONENTIAL_BACKOFF_MS() {
    return MIN_EXPONENTIAL_BACKOFF_MS;
  }
  static get MAX_EXPONENTIAL_BACKOFF_MS() {
    return MAX_EXPONENTIAL_BACKOFF_MS;
  }
  static get EXPONENTIAL_DELTA_BACKOFF_MS() {
    return EXPONENTIAL_DELTA_BACKOFF_MS;
  }
  static get HTTP_STATUS_GONE_RETRY_AFTER_MS() {
    return HTTP_STATUS_GONE_RETRY_AFTER_MS;
  }
  set isNewRequest(value) {
    this._isNewRequest = value;
  }
  /**
   * Pauses execution for a calculated delay before retrying a request.
   *
   * @param httpStatusCode - The HTTP status code of the response.
   * @param currentRetry - The current retry attempt number.
   * @param retryAfterHeader - The value of the "retry-after" header from the response.
   * @returns A promise that resolves to a boolean indicating whether a retry should be attempted.
   */
  async pauseForRetry(httpStatusCode, currentRetry, logger27) {
    if (this._isNewRequest) {
      this._isNewRequest = false;
      this.maxRetries = httpStatusCode === Constants_exports.HTTP_GONE ? LINEAR_STRATEGY_NUM_RETRIES : EXPONENTIAL_STRATEGY_NUM_RETRIES;
    }
    if ((HTTP_STATUS_400_CODES_FOR_EXPONENTIAL_STRATEGY.includes(httpStatusCode) || httpStatusCode >= Constants_exports.HTTP_SERVER_ERROR_RANGE_START && httpStatusCode <= Constants_exports.HTTP_SERVER_ERROR_RANGE_END && currentRetry < this.maxRetries) && currentRetry < this.maxRetries) {
      const retryAfterDelay = httpStatusCode === Constants_exports.HTTP_GONE ? _ImdsRetryPolicy.HTTP_STATUS_GONE_RETRY_AFTER_MS : this.exponentialRetryStrategy.calculateDelay(currentRetry);
      logger27.verbose(`Retrying request in ${retryAfterDelay}ms (retry attempt: ${currentRetry + 1})`, "");
      await new Promise((resolve) => {
        return setTimeout(resolve, retryAfterDelay);
      });
      return true;
    }
    return false;
  }
};

// ../../node_modules/@azure/msal-node/dist/client/ManagedIdentitySources/Imds.mjs
var IMDS_TOKEN_PATH = "/metadata/identity/oauth2/token";
var DEFAULT_IMDS_ENDPOINT = `http://169.254.169.254${IMDS_TOKEN_PATH}`;
var IMDS_API_VERSION = "2018-02-01";
var Imds = class _Imds extends BaseManagedIdentitySource {
  /**
   * Constructs an Imds instance with the specified configuration.
   *
   * @param logger - Logger instance for recording debug information and errors
   * @param nodeStorage - NodeStorage instance used for token caching operations
   * @param networkClient - Network client implementation for making HTTP requests to IMDS
   * @param cryptoProvider - CryptoProvider for generating correlation IDs and other cryptographic operations
   * @param disableInternalRetries - When true, disables the built-in retry logic for IMDS requests
   * @param identityEndpoint - The complete IMDS endpoint URL including the token path
   */
  constructor(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries, identityEndpoint) {
    super(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries);
    this.identityEndpoint = identityEndpoint;
  }
  /**
   * Creates an Imds instance with the appropriate endpoint configuration.
   *
   * This method checks for the presence of the AZURE_POD_IDENTITY_AUTHORITY_HOST environment
   * variable, which is used in Azure Kubernetes Service (AKS) environments with Azure AD
   * Pod Identity. If found, it uses that endpoint; otherwise, it falls back to the standard
   * IMDS endpoint (169.254.169.254).
   *
   * @param logger - Logger instance for recording endpoint discovery and validation
   * @param nodeStorage - NodeStorage instance for token caching
   * @param networkClient - Network client for HTTP requests
   * @param cryptoProvider - CryptoProvider for cryptographic operations
   * @param disableInternalRetries - Whether to disable built-in retry logic
   *
   * @returns A configured Imds instance ready to make token requests
   */
  static tryCreate(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries) {
    let validatedIdentityEndpoint;
    if (process.env[ManagedIdentityEnvironmentVariableNames.AZURE_POD_IDENTITY_AUTHORITY_HOST]) {
      logger27.info(`[Managed Identity] Environment variable ${ManagedIdentityEnvironmentVariableNames.AZURE_POD_IDENTITY_AUTHORITY_HOST} for ${ManagedIdentitySourceNames.IMDS} returned endpoint: ${process.env[ManagedIdentityEnvironmentVariableNames.AZURE_POD_IDENTITY_AUTHORITY_HOST]}`, "");
      validatedIdentityEndpoint = _Imds.getValidatedEnvVariableUrlString(ManagedIdentityEnvironmentVariableNames.AZURE_POD_IDENTITY_AUTHORITY_HOST, `${process.env[ManagedIdentityEnvironmentVariableNames.AZURE_POD_IDENTITY_AUTHORITY_HOST]}${IMDS_TOKEN_PATH}`, ManagedIdentitySourceNames.IMDS, logger27);
    } else {
      logger27.info(`[Managed Identity] Unable to find ${ManagedIdentityEnvironmentVariableNames.AZURE_POD_IDENTITY_AUTHORITY_HOST} environment variable for ${ManagedIdentitySourceNames.IMDS}, using the default endpoint.`, "");
      validatedIdentityEndpoint = DEFAULT_IMDS_ENDPOINT;
    }
    return new _Imds(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries, validatedIdentityEndpoint);
  }
  /**
   * Creates a properly configured HTTP request for acquiring an access token from IMDS.
   *
   * This method builds a complete request object with all necessary headers, query parameters,
   * and retry policies required by the Azure Instance Metadata Service.
   *
   * Key request components:
   * - HTTP GET method to the IMDS token endpoint
   * - Metadata header set to "true" (required by IMDS)
   * - API version parameter (currently "2018-02-01")
   * - Resource parameter specifying the target audience
   * - Identity-specific parameters for user-assigned managed identities
   * - IMDS-specific retry policy
   *
   * @param resource - The target resource/scope for which to request an access token (e.g., "https://graph.microsoft.com/.default")
   * @param managedIdentityId - The managed identity configuration specifying whether to use system-assigned or user-assigned identity
   *
   * @returns A configured ManagedIdentityRequestParameters object ready for network execution
   */
  createRequest(resource, managedIdentityId) {
    const request = new ManagedIdentityRequestParameters(HttpMethod2.GET, this.identityEndpoint);
    request.headers[ManagedIdentityHeaders.METADATA_HEADER_NAME] = "true";
    request.headers[ManagedIdentityHeaders.CLIENT_SKU] = Constants.MSAL_SKU;
    request.headers[ManagedIdentityHeaders.CLIENT_VER] = version2;
    request.headers[ManagedIdentityHeaders.CLIENT_REQUEST_ID] = this.createCorrelationId();
    request.queryParameters[ManagedIdentityQueryParameters.API_VERSION] = IMDS_API_VERSION;
    request.queryParameters[ManagedIdentityQueryParameters.RESOURCE] = resource;
    if (managedIdentityId.idType !== ManagedIdentityIdType.SYSTEM_ASSIGNED) {
      request.queryParameters[this.getManagedIdentityUserAssignedIdQueryParameterKey(
        managedIdentityId.idType,
        true
        // indicates source is IMDS
      )] = managedIdentityId.id;
    }
    request.retryPolicy = new ImdsRetryPolicy();
    return request;
  }
};

// ../../node_modules/@azure/msal-node/dist/client/ManagedIdentitySources/ServiceFabric.mjs
var SERVICE_FABRIC_MSI_API_VERSION = "2019-07-01-preview";
var ServiceFabric = class _ServiceFabric extends BaseManagedIdentitySource {
  /**
   * Constructs a new ServiceFabric managed identity source for acquiring tokens from Azure Service Fabric clusters.
   *
   * Service Fabric managed identity allows applications running in Service Fabric clusters to authenticate
   * without storing credentials in code. This source handles token acquisition using the Service Fabric
   * Managed Identity Token Service (MITS).
   *
   * @param logger - Logger instance for logging authentication events and debugging information
   * @param nodeStorage - NodeStorage instance for caching tokens and other authentication artifacts
   * @param networkClient - Network client for making HTTP requests to the Service Fabric identity endpoint
   * @param cryptoProvider - Crypto provider for cryptographic operations like token validation
   * @param disableInternalRetries - Whether to disable internal retry logic for failed requests
   * @param identityEndpoint - The Service Fabric managed identity endpoint URL
   * @param identityHeader - The Service Fabric managed identity secret header value
   */
  constructor(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries, identityEndpoint, identityHeader) {
    super(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries);
    this.identityEndpoint = identityEndpoint;
    this.identityHeader = identityHeader;
  }
  /**
   * Retrieves the environment variables required for Service Fabric managed identity authentication.
   *
   * Service Fabric managed identity requires three specific environment variables to be set by the
   * Service Fabric runtime:
   * - IDENTITY_ENDPOINT: The endpoint URL for the Managed Identity Token Service (MITS)
   * - IDENTITY_HEADER: A secret value used for authentication with the MITS
   * - IDENTITY_SERVER_THUMBPRINT: The thumbprint of the MITS server certificate for secure communication
   *
   * @returns An array containing the identity endpoint, identity header, and identity server thumbprint values.
   *          Elements will be undefined if the corresponding environment variables are not set.
   */
  static getEnvironmentVariables() {
    const identityEndpoint = process.env[ManagedIdentityEnvironmentVariableNames.IDENTITY_ENDPOINT];
    const identityHeader = process.env[ManagedIdentityEnvironmentVariableNames.IDENTITY_HEADER];
    const identityServerThumbprint = process.env[ManagedIdentityEnvironmentVariableNames.IDENTITY_SERVER_THUMBPRINT];
    return [identityEndpoint, identityHeader, identityServerThumbprint];
  }
  /**
   * Attempts to create a ServiceFabric managed identity source if the runtime environment supports it.
   *
   * Checks for the presence of all required Service Fabric environment variables
   * and validates the endpoint URL format. It will only create a ServiceFabric instance if the application
   * is running in a properly configured Service Fabric cluster with managed identity enabled.
   *
   * Note: User-assigned managed identities must be configured at the cluster level, not at runtime.
   * This method will log a warning if a user-assigned identity is requested.
   *
   * @param logger - Logger instance for logging creation events and validation results
   * @param nodeStorage - NodeStorage instance for caching tokens and authentication artifacts
   * @param networkClient - Network client for making HTTP requests to the identity endpoint
   * @param cryptoProvider - Crypto provider for cryptographic operations
   * @param disableInternalRetries - Whether to disable internal retry logic for failed requests
   * @param managedIdentityId - Managed identity identifier specifying system-assigned or user-assigned identity
   *
   * @returns A ServiceFabric instance if all environment variables are valid and present, otherwise null
   */
  static tryCreate(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries, managedIdentityId) {
    const [identityEndpoint, identityHeader, identityServerThumbprint] = _ServiceFabric.getEnvironmentVariables();
    if (!identityEndpoint || !identityHeader || !identityServerThumbprint) {
      logger27.info(`[Managed Identity] ${ManagedIdentitySourceNames.SERVICE_FABRIC} managed identity is unavailable because one or all of the '${ManagedIdentityEnvironmentVariableNames.IDENTITY_HEADER}', '${ManagedIdentityEnvironmentVariableNames.IDENTITY_ENDPOINT}' or '${ManagedIdentityEnvironmentVariableNames.IDENTITY_SERVER_THUMBPRINT}' environment variables are not defined.`, "");
      return null;
    }
    const validatedIdentityEndpoint = _ServiceFabric.getValidatedEnvVariableUrlString(ManagedIdentityEnvironmentVariableNames.IDENTITY_ENDPOINT, identityEndpoint, ManagedIdentitySourceNames.SERVICE_FABRIC, logger27);
    logger27.info(`[Managed Identity] Environment variables validation passed for ${ManagedIdentitySourceNames.SERVICE_FABRIC} managed identity. Endpoint URI: ${validatedIdentityEndpoint}. Creating ${ManagedIdentitySourceNames.SERVICE_FABRIC} managed identity.`, "");
    if (managedIdentityId.idType !== ManagedIdentityIdType.SYSTEM_ASSIGNED) {
      logger27.warning(`[Managed Identity] ${ManagedIdentitySourceNames.SERVICE_FABRIC} user assigned managed identity is configured in the cluster, not during runtime. See also: https://learn.microsoft.com/en-us/azure/service-fabric/configure-existing-cluster-enable-managed-identity-token-service.`, "");
    }
    return new _ServiceFabric(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries, identityEndpoint, identityHeader);
  }
  /**
   * Creates HTTP request parameters for acquiring an access token from the Service Fabric Managed Identity Token Service (MITS).
   *
   * This method constructs a properly formatted HTTP GET request that includes:
   * - The secret header for authentication with MITS
   * - API version parameter for the Service Fabric MSI endpoint
   * - Resource parameter specifying the target Azure service
   * - Optional identity parameters for user-assigned managed identities
   *
   * The request follows the Service Fabric managed identity protocol and uses the 2019-07-01-preview API version.
   * For user-assigned identities, the appropriate query parameter (client_id, object_id, or resource_id) is added
   * based on the identity type.
   *
   * @param resource - The Azure resource URI for which the access token is requested (e.g., "https://vault.azure.net/")
   * @param managedIdentityId - The managed identity configuration specifying system-assigned or user-assigned identity details
   *
   * @returns A configured ManagedIdentityRequestParameters object ready for network execution
   */
  createRequest(resource, managedIdentityId) {
    const request = new ManagedIdentityRequestParameters(HttpMethod2.GET, this.identityEndpoint);
    request.headers[ManagedIdentityHeaders.ML_AND_SF_SECRET_HEADER_NAME] = this.identityHeader;
    request.queryParameters[ManagedIdentityQueryParameters.API_VERSION] = SERVICE_FABRIC_MSI_API_VERSION;
    request.queryParameters[ManagedIdentityQueryParameters.RESOURCE] = resource;
    if (managedIdentityId.idType !== ManagedIdentityIdType.SYSTEM_ASSIGNED) {
      request.queryParameters[this.getManagedIdentityUserAssignedIdQueryParameterKey(managedIdentityId.idType)] = managedIdentityId.id;
    }
    return request;
  }
};

// ../../node_modules/@azure/msal-node/dist/client/ManagedIdentitySources/MachineLearning.mjs
var MACHINE_LEARNING_MSI_API_VERSION = "2017-09-01";
var MANAGED_IDENTITY_MACHINE_LEARNING_UNSUPPORTED_ID_TYPE_ERROR = `Only client id is supported for user-assigned managed identity in ${ManagedIdentitySourceNames.MACHINE_LEARNING}.`;
var MachineLearning = class _MachineLearning extends BaseManagedIdentitySource {
  /**
   * Creates a new MachineLearning managed identity source instance.
   *
   * @param logger - Logger instance for diagnostic information
   * @param nodeStorage - Node storage implementation for caching
   * @param networkClient - Network client for making HTTP requests
   * @param cryptoProvider - Cryptographic operations provider
   * @param disableInternalRetries - Whether to disable automatic request retries
   * @param msiEndpoint - The MSI endpoint URL from environment variables
   * @param secret - The MSI secret from environment variables
   */
  constructor(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries, msiEndpoint, secret) {
    super(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries);
    this.msiEndpoint = msiEndpoint;
    this.secret = secret;
  }
  /**
   * Retrieves the required environment variables for Azure Machine Learning managed identity.
   *
   * This method checks for the presence of MSI_ENDPOINT and MSI_SECRET environment variables
   * that are automatically set by the Azure Machine Learning platform when managed identity
   * is enabled for the compute instance or cluster.
   *
   * @returns An array containing [msiEndpoint, secret] where either value may be undefined
   *          if the corresponding environment variable is not set
   */
  static getEnvironmentVariables() {
    const msiEndpoint = process.env[ManagedIdentityEnvironmentVariableNames.MSI_ENDPOINT];
    const secret = process.env[ManagedIdentityEnvironmentVariableNames.MSI_SECRET];
    return [msiEndpoint, secret];
  }
  /**
   * Attempts to create a MachineLearning managed identity source.
   *
   * This method validates the Azure Machine Learning environment by checking for the required
   * MSI_ENDPOINT and MSI_SECRET environment variables. If both are present and valid,
   * it creates and returns a MachineLearning instance. If either is missing or invalid,
   * it returns null, indicating that this managed identity source is not available
   * in the current environment.
   *
   * @param logger - Logger instance for diagnostic information
   * @param nodeStorage - Node storage implementation for caching
   * @param networkClient - Network client for making HTTP requests
   * @param cryptoProvider - Cryptographic operations provider
   * @param disableInternalRetries - Whether to disable automatic request retries
   *
   * @returns A new MachineLearning instance if the environment is valid, null otherwise
   */
  static tryCreate(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries) {
    const [msiEndpoint, secret] = _MachineLearning.getEnvironmentVariables();
    if (!msiEndpoint || !secret) {
      logger27.info(`[Managed Identity] ${ManagedIdentitySourceNames.MACHINE_LEARNING} managed identity is unavailable because one or both of the '${ManagedIdentityEnvironmentVariableNames.MSI_ENDPOINT}' and '${ManagedIdentityEnvironmentVariableNames.MSI_SECRET}' environment variables are not defined.`, "");
      return null;
    }
    const validatedMsiEndpoint = _MachineLearning.getValidatedEnvVariableUrlString(ManagedIdentityEnvironmentVariableNames.MSI_ENDPOINT, msiEndpoint, ManagedIdentitySourceNames.MACHINE_LEARNING, logger27);
    logger27.info(`[Managed Identity] Environment variables validation passed for ${ManagedIdentitySourceNames.MACHINE_LEARNING} managed identity. Endpoint URI: ${validatedMsiEndpoint}. Creating ${ManagedIdentitySourceNames.MACHINE_LEARNING} managed identity.`, "");
    return new _MachineLearning(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries, msiEndpoint, secret);
  }
  /**
   * Creates a managed identity token request for Azure Machine Learning environments.
   *
   * This method constructs the HTTP request parameters needed to acquire an access token
   * from the Azure Machine Learning managed identity endpoint. It handles both system-assigned
   * and user-assigned managed identities with specific logic for each type:
   *
   * - System-assigned: Uses the DEFAULT_IDENTITY_CLIENT_ID environment variable
   * - User-assigned: Only supports client ID-based identification (not object ID or resource ID)
   *
   * The request uses the 2017-09-01 API version and includes the required secret header
   * for authentication with the MSI endpoint.
   *
   * @param resource - The target resource/scope for which to request an access token (e.g., "https://graph.microsoft.com/.default")
   * @param managedIdentityId - The managed identity configuration specifying whether to use system-assigned or user-assigned identity
   *
   * @returns A configured ManagedIdentityRequestParameters object ready for network execution
   *
   * @throws Error if an unsupported managed identity ID type is specified (only client ID is supported for user-assigned)
   */
  createRequest(resource, managedIdentityId) {
    const request = new ManagedIdentityRequestParameters(HttpMethod2.GET, this.msiEndpoint);
    request.headers[ManagedIdentityHeaders.METADATA_HEADER_NAME] = "true";
    request.headers[ManagedIdentityHeaders.ML_AND_SF_SECRET_HEADER_NAME] = this.secret;
    request.queryParameters[ManagedIdentityQueryParameters.API_VERSION] = MACHINE_LEARNING_MSI_API_VERSION;
    request.queryParameters[ManagedIdentityQueryParameters.RESOURCE] = resource;
    if (managedIdentityId.idType === ManagedIdentityIdType.SYSTEM_ASSIGNED) {
      request.queryParameters[ManagedIdentityUserAssignedIdQueryParameterNames.MANAGED_IDENTITY_CLIENT_ID_2017] = process.env[ManagedIdentityEnvironmentVariableNames.DEFAULT_IDENTITY_CLIENT_ID];
    } else if (managedIdentityId.idType === ManagedIdentityIdType.USER_ASSIGNED_CLIENT_ID) {
      request.queryParameters[this.getManagedIdentityUserAssignedIdQueryParameterKey(
        managedIdentityId.idType,
        false,
        // isIMDS
        true
        // uses2017API
      )] = managedIdentityId.id;
    } else {
      throw new Error(MANAGED_IDENTITY_MACHINE_LEARNING_UNSUPPORTED_ID_TYPE_ERROR);
    }
    return request;
  }
};

// ../../node_modules/@azure/msal-node/dist/client/ManagedIdentityClient.mjs
var ManagedIdentityClient = class _ManagedIdentityClient {
  constructor(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries) {
    this.logger = logger27;
    this.nodeStorage = nodeStorage;
    this.networkClient = networkClient;
    this.cryptoProvider = cryptoProvider;
    this.disableInternalRetries = disableInternalRetries;
  }
  async sendManagedIdentityTokenRequest(managedIdentityRequest, managedIdentityId, fakeAuthority, refreshAccessToken) {
    if (!_ManagedIdentityClient.identitySource) {
      _ManagedIdentityClient.identitySource = this.selectManagedIdentitySource(this.logger, this.nodeStorage, this.networkClient, this.cryptoProvider, this.disableInternalRetries, managedIdentityId);
    }
    return _ManagedIdentityClient.identitySource.acquireTokenWithManagedIdentity(managedIdentityRequest, managedIdentityId, fakeAuthority, refreshAccessToken);
  }
  allEnvironmentVariablesAreDefined(environmentVariables) {
    return Object.values(environmentVariables).every((environmentVariable) => {
      return environmentVariable !== void 0;
    });
  }
  /**
   * Determine the Managed Identity Source based on available environment variables. This API is consumed by ManagedIdentityApplication's getManagedIdentitySource.
   * @returns ManagedIdentitySourceNames - The Managed Identity source's name
   */
  getManagedIdentitySource() {
    _ManagedIdentityClient.sourceName = this.allEnvironmentVariablesAreDefined(ServiceFabric.getEnvironmentVariables()) ? ManagedIdentitySourceNames.SERVICE_FABRIC : this.allEnvironmentVariablesAreDefined(AppService.getEnvironmentVariables()) ? ManagedIdentitySourceNames.APP_SERVICE : this.allEnvironmentVariablesAreDefined(MachineLearning.getEnvironmentVariables()) ? ManagedIdentitySourceNames.MACHINE_LEARNING : this.allEnvironmentVariablesAreDefined(CloudShell.getEnvironmentVariables()) ? ManagedIdentitySourceNames.CLOUD_SHELL : this.allEnvironmentVariablesAreDefined(AzureArc.getEnvironmentVariables()) ? ManagedIdentitySourceNames.AZURE_ARC : ManagedIdentitySourceNames.DEFAULT_TO_IMDS;
    return _ManagedIdentityClient.sourceName;
  }
  /**
   * Tries to create a managed identity source for all sources
   * @returns the managed identity Source
   */
  selectManagedIdentitySource(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries, managedIdentityId) {
    const source = ServiceFabric.tryCreate(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries, managedIdentityId) || AppService.tryCreate(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries) || MachineLearning.tryCreate(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries) || CloudShell.tryCreate(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries, managedIdentityId) || AzureArc.tryCreate(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries, managedIdentityId) || Imds.tryCreate(logger27, nodeStorage, networkClient, cryptoProvider, disableInternalRetries);
    if (!source) {
      throw createManagedIdentityError(unableToCreateSource, "");
    }
    return source;
  }
};

// ../../node_modules/@azure/msal-node/dist/client/ManagedIdentityApplication.mjs
var SOURCES_THAT_SUPPORT_TOKEN_REVOCATION = [ManagedIdentitySourceNames.SERVICE_FABRIC];
var ManagedIdentityApplication = class _ManagedIdentityApplication {
  constructor(configuration) {
    this.config = buildManagedIdentityConfiguration(configuration || {});
    this.logger = new Logger(this.config.system.loggerOptions, name2, version2);
    const fakeStatusAuthorityOptions = {
      canonicalAuthority: Constants_exports.DEFAULT_AUTHORITY
    };
    if (!_ManagedIdentityApplication.nodeStorage) {
      _ManagedIdentityApplication.nodeStorage = new NodeStorage(this.logger, this.config.managedIdentityId.id, DEFAULT_CRYPTO_IMPLEMENTATION, fakeStatusAuthorityOptions);
    }
    this.networkClient = this.config.system.networkClient;
    this.cryptoProvider = new CryptoProvider();
    const fakeAuthorityOptions = {
      protocolMode: ProtocolMode.AAD,
      knownAuthorities: [DEFAULT_AUTHORITY_FOR_MANAGED_IDENTITY],
      cloudDiscoveryMetadata: "",
      authorityMetadata: ""
    };
    this.fakeAuthority = new Authority(
      DEFAULT_AUTHORITY_FOR_MANAGED_IDENTITY,
      this.networkClient,
      _ManagedIdentityApplication.nodeStorage,
      fakeAuthorityOptions,
      this.logger,
      this.cryptoProvider.createNewGuid(),
      // correlationID
      new StubPerformanceClient(),
      true
    );
    this.fakeClientCredentialClient = new ClientCredentialClient({
      authOptions: {
        clientId: this.config.managedIdentityId.id,
        authority: this.fakeAuthority
      }
    });
    this.managedIdentityClient = new ManagedIdentityClient(this.logger, _ManagedIdentityApplication.nodeStorage, this.networkClient, this.cryptoProvider, this.config.disableInternalRetries);
    this.hashUtils = new HashUtils();
  }
  /**
   * Acquire an access token from the cache or the managed identity
   * @param managedIdentityRequest - the ManagedIdentityRequestParams object passed in by the developer
   * @returns the access token
   */
  async acquireToken(managedIdentityRequestParams) {
    if (!managedIdentityRequestParams.resource) {
      throw createClientConfigurationError(ClientConfigurationErrorCodes_exports.urlEmptyError, "");
    }
    const managedIdentityRequest = {
      forceRefresh: managedIdentityRequestParams.forceRefresh,
      resource: managedIdentityRequestParams.resource.replace("/.default", ""),
      scopes: [
        managedIdentityRequestParams.resource.replace("/.default", "")
      ],
      authority: this.fakeAuthority.canonicalAuthority,
      correlationId: this.cryptoProvider.createNewGuid(),
      claims: managedIdentityRequestParams.claims,
      clientCapabilities: this.config.clientCapabilities
    };
    if (managedIdentityRequest.forceRefresh) {
      return this.acquireTokenFromManagedIdentity(managedIdentityRequest, this.config.managedIdentityId, this.fakeAuthority);
    }
    const [cachedAuthenticationResult, lastCacheOutcome] = await this.fakeClientCredentialClient.getCachedAuthenticationResult(managedIdentityRequest, this.config, this.cryptoProvider, this.fakeAuthority, _ManagedIdentityApplication.nodeStorage);
    if (managedIdentityRequest.claims) {
      const sourceName = this.managedIdentityClient.getManagedIdentitySource();
      if (cachedAuthenticationResult && SOURCES_THAT_SUPPORT_TOKEN_REVOCATION.includes(sourceName)) {
        const revokedTokenSha256Hash = this.hashUtils.sha256(cachedAuthenticationResult.accessToken).toString(Constants_exports.EncodingTypes.HEX);
        managedIdentityRequest.revokedTokenSha256Hash = revokedTokenSha256Hash;
      }
      return this.acquireTokenFromManagedIdentity(managedIdentityRequest, this.config.managedIdentityId, this.fakeAuthority);
    }
    if (cachedAuthenticationResult) {
      if (lastCacheOutcome === Constants_exports.CacheOutcome.PROACTIVELY_REFRESHED) {
        this.logger.info("ClientCredentialClient:getCachedAuthenticationResult - Cached access token's refreshOn property has been exceeded'. It's not expired, but must be refreshed.", managedIdentityRequest.correlationId);
        const refreshAccessToken = true;
        await this.acquireTokenFromManagedIdentity(managedIdentityRequest, this.config.managedIdentityId, this.fakeAuthority, refreshAccessToken);
      }
      return cachedAuthenticationResult;
    } else {
      return this.acquireTokenFromManagedIdentity(managedIdentityRequest, this.config.managedIdentityId, this.fakeAuthority);
    }
  }
  /**
   * Acquires a token from a managed identity endpoint.
   *
   * @param managedIdentityRequest - The request object containing parameters for the managed identity token request.
   * @param managedIdentityId - The identifier for the managed identity (e.g., client ID or resource ID).
   * @param fakeAuthority - A placeholder authority used for the token request.
   * @param refreshAccessToken - Optional flag indicating whether to force a refresh of the access token.
   * @returns A promise that resolves to an AuthenticationResult containing the acquired token and related information.
   */
  async acquireTokenFromManagedIdentity(managedIdentityRequest, managedIdentityId, fakeAuthority, refreshAccessToken) {
    return this.managedIdentityClient.sendManagedIdentityTokenRequest(managedIdentityRequest, managedIdentityId, fakeAuthority, refreshAccessToken);
  }
  /**
   * Determine the Managed Identity Source based on available environment variables. This API is consumed by Azure Identity SDK.
   * @returns ManagedIdentitySourceNames - The Managed Identity source's name
   */
  getManagedIdentitySource() {
    return ManagedIdentityClient.sourceName || this.managedIdentityClient.getManagedIdentitySource();
  }
};

// ../../node_modules/@azure/msal-node/dist/cache/distributed/DistributedCachePlugin.mjs
var DistributedCachePlugin = class {
  constructor(client, partitionManager) {
    this.client = client;
    this.partitionManager = partitionManager;
  }
  /**
   * Deserializes the cache before accessing it
   * @param cacheContext - TokenCacheContext
   */
  async beforeCacheAccess(cacheContext) {
    const partitionKey = await this.partitionManager.getKey();
    const cacheData = await this.client.get(partitionKey);
    cacheContext.tokenCache.deserialize(cacheData);
  }
  /**
   * Serializes the cache after accessing it
   * @param cacheContext - TokenCacheContext
   */
  async afterCacheAccess(cacheContext) {
    if (cacheContext.cacheHasChanged) {
      const kvStore = cacheContext.tokenCache.getKVStore();
      const accountEntities = Object.values(kvStore).filter((value) => AccountEntityUtils_exports.isAccountEntity(value));
      let partitionKey;
      if (accountEntities.length > 0) {
        const accountEntity = accountEntities[0];
        partitionKey = await this.partitionManager.extractKey(accountEntity);
      } else {
        partitionKey = await this.partitionManager.getKey();
      }
      await this.client.set(partitionKey, cacheContext.tokenCache.serialize());
    }
  }
};

// ../../node_modules/@azure/msal-node/dist/index.mjs
var PromptValue2 = Constants_exports.PromptValue;
var ResponseMode2 = Constants_exports.ResponseMode;

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/util/random.js
function getRandomIntegerInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const offset = Math.floor(Math.random() * (max - min + 1));
  return offset + min;
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/util/delay.js
function calculateRetryDelay(retryAttempt, config) {
  const exponentialDelay = config.retryDelayInMs * Math.pow(2, retryAttempt);
  const clampedDelay = Math.min(config.maxRetryDelayInMs, exponentialDelay);
  const retryAfterInMs = clampedDelay / 2 + getRandomIntegerInclusive(0, clampedDelay / 2);
  return { retryAfterInMs };
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/util/object.js
function isObject(input) {
  return typeof input === "object" && input !== null && !Array.isArray(input) && !(input instanceof RegExp) && !(input instanceof Date);
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/util/error.js
function isError(e) {
  if (isObject(e)) {
    const hasName = typeof e.name === "string";
    const hasMessage = typeof e.message === "string";
    return hasName && hasMessage;
  }
  return false;
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/util/sha256.js
import { createHash as createHash2, createHmac } from "crypto";

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/util/uuidUtils.js
function randomUUID2() {
  return crypto.randomUUID();
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/util/bytesEncoding.js
function stringToUint8Array(value, format) {
  return Buffer.from(value, format);
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/util/sanitizer.js
var RedactedString = "REDACTED";
var defaultAllowedHeaderNames = [
  "x-ms-client-request-id",
  "x-ms-return-client-request-id",
  "x-ms-useragent",
  "x-ms-correlation-request-id",
  "x-ms-request-id",
  "client-request-id",
  "ms-cv",
  "return-client-request-id",
  "traceparent",
  "Access-Control-Allow-Credentials",
  "Access-Control-Allow-Headers",
  "Access-Control-Allow-Methods",
  "Access-Control-Allow-Origin",
  "Access-Control-Expose-Headers",
  "Access-Control-Max-Age",
  "Access-Control-Request-Headers",
  "Access-Control-Request-Method",
  "Origin",
  "Accept",
  "Accept-Encoding",
  "Cache-Control",
  "Connection",
  "Content-Length",
  "Content-Type",
  "Date",
  "ETag",
  "Expires",
  "If-Match",
  "If-Modified-Since",
  "If-None-Match",
  "If-Unmodified-Since",
  "Last-Modified",
  "Pragma",
  "Request-Id",
  "Retry-After",
  "Server",
  "Transfer-Encoding",
  "User-Agent",
  "WWW-Authenticate"
];
var defaultAllowedQueryParameters = ["api-version"];
var Sanitizer = class {
  allowedHeaderNames;
  allowedQueryParameters;
  constructor({ additionalAllowedHeaderNames: allowedHeaderNames = [], additionalAllowedQueryParameters: allowedQueryParameters = [] } = {}) {
    allowedHeaderNames = defaultAllowedHeaderNames.concat(allowedHeaderNames);
    allowedQueryParameters = defaultAllowedQueryParameters.concat(allowedQueryParameters);
    this.allowedHeaderNames = new Set(allowedHeaderNames.map((n) => n.toLowerCase()));
    this.allowedQueryParameters = new Set(allowedQueryParameters.map((p) => p.toLowerCase()));
  }
  /**
   * Sanitizes an object for logging.
   * @param obj - The object to sanitize
   * @returns - The sanitized object as a string
   */
  sanitize(obj) {
    const seen = /* @__PURE__ */ new Set();
    return JSON.stringify(obj, (key, value) => {
      if (value instanceof Error) {
        return {
          ...value,
          name: value.name,
          message: value.message
        };
      }
      if (key === "headers" && isObject(value)) {
        return this.sanitizeHeaders(value);
      } else if (key === "url" && typeof value === "string") {
        return this.sanitizeUrl(value);
      } else if (key === "query" && isObject(value)) {
        return this.sanitizeQuery(value);
      } else if (key === "body") {
        return void 0;
      } else if (key === "response") {
        return void 0;
      } else if (key === "operationSpec") {
        return void 0;
      } else if (Array.isArray(value) || isObject(value)) {
        if (seen.has(value)) {
          return "[Circular]";
        }
        seen.add(value);
      }
      return value;
    }, 2);
  }
  /**
   * Sanitizes a URL for logging.
   * @param value - The URL to sanitize
   * @returns - The sanitized URL as a string
   */
  sanitizeUrl(value) {
    if (typeof value !== "string" || value === null || value === "") {
      return value;
    }
    const url = new URL(value);
    if (!url.search) {
      return value;
    }
    for (const [key] of url.searchParams) {
      if (!this.allowedQueryParameters.has(key.toLowerCase())) {
        url.searchParams.set(key, RedactedString);
      }
    }
    return url.toString();
  }
  sanitizeHeaders(obj) {
    const sanitized = {};
    for (const key of Object.keys(obj)) {
      if (this.allowedHeaderNames.has(key.toLowerCase())) {
        sanitized[key] = obj[key];
      } else {
        sanitized[key] = RedactedString;
      }
    }
    return sanitized;
  }
  sanitizeQuery(value) {
    if (typeof value !== "object" || value === null) {
      return value;
    }
    const sanitized = {};
    for (const k of Object.keys(value)) {
      if (this.allowedQueryParameters.has(k.toLowerCase())) {
        sanitized[k] = value[k];
      } else {
        sanitized[k] = RedactedString;
      }
    }
    return sanitized;
  }
};

// ../../node_modules/@azure/abort-controller/dist/esm/AbortError.js
var AbortError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "AbortError";
  }
};

// ../../node_modules/@azure/core-util/dist/esm/createAbortablePromise.js
function createAbortablePromise(buildPromise, options) {
  const { cleanupBeforeAbort, abortSignal, abortErrorMsg } = options ?? {};
  return new Promise((resolve, reject) => {
    function rejectOnAbort() {
      reject(new AbortError(abortErrorMsg ?? "The operation was aborted."));
    }
    function removeListeners() {
      abortSignal?.removeEventListener("abort", onAbort);
    }
    function onAbort() {
      cleanupBeforeAbort?.();
      removeListeners();
      rejectOnAbort();
    }
    if (abortSignal?.aborted) {
      return rejectOnAbort();
    }
    try {
      buildPromise((x) => {
        removeListeners();
        resolve(x);
      }, (x) => {
        removeListeners();
        reject(x);
      });
    } catch (err) {
      reject(err);
    }
    abortSignal?.addEventListener("abort", onAbort);
  });
}

// ../../node_modules/@azure/core-util/dist/esm/delay.js
var StandardAbortMessage = "The delay was aborted.";
function delay2(timeInMs, options) {
  let token;
  const { abortSignal, abortErrorMsg } = options ?? {};
  return createAbortablePromise((resolve) => {
    token = setTimeout(resolve, timeInMs);
  }, {
    cleanupBeforeAbort: () => clearTimeout(token),
    abortSignal,
    abortErrorMsg: abortErrorMsg ?? StandardAbortMessage
  });
}

// ../../node_modules/@azure/core-util/dist/esm/error.js
function getErrorMessage(e) {
  if (isError(e)) {
    return e.message;
  } else {
    let stringified;
    try {
      if (typeof e === "object" && e) {
        stringified = JSON.stringify(e);
      } else {
        stringified = String(e);
      }
    } catch (err) {
      stringified = "[unable to stringify input]";
    }
    return `Unknown error ${stringified}`;
  }
}

// ../../node_modules/@azure/core-util/dist/esm/index.js
function calculateRetryDelay2(retryAttempt, config) {
  return calculateRetryDelay(retryAttempt, config);
}
function isError2(e) {
  return isError(e);
}
var isNode = isNodeLike;
var isNodeLike2 = isNodeLike;

// ../../node_modules/@azure/identity/dist/esm/msal/utils.js
var logger3 = credentialLogger("IdentityUtils");
var LatestAuthenticationRecordVersion = "1.0";
function ensureValidMsalToken(scopes, msalToken, getTokenOptions) {
  const error = (message) => {
    logger3.getToken.info(message);
    return new AuthenticationRequiredError({
      scopes: Array.isArray(scopes) ? scopes : [scopes],
      getTokenOptions,
      message
    });
  };
  if (!msalToken) {
    throw error("No response");
  }
  if (!msalToken.expiresOn) {
    throw error(`Response had no "expiresOn" property.`);
  }
  if (!msalToken.accessToken) {
    throw error(`Response had no "accessToken" property.`);
  }
}
function getAuthorityHost(options) {
  let authorityHost = options?.authorityHost;
  if (!authorityHost && isNodeLike2) {
    authorityHost = process.env.AZURE_AUTHORITY_HOST;
  }
  return authorityHost ?? DefaultAuthorityHost;
}
function getAuthority(tenantId, host) {
  if (!host) {
    host = DefaultAuthorityHost;
  }
  if (new RegExp(`${tenantId}/?$`).test(host)) {
    return host;
  }
  if (host.endsWith("/")) {
    return host + tenantId;
  } else {
    return `${host}/${tenantId}`;
  }
}
function getKnownAuthorities(tenantId, authorityHost, disableInstanceDiscovery) {
  if (tenantId === "adfs" && authorityHost || disableInstanceDiscovery) {
    return [authorityHost];
  }
  return [];
}
var defaultLoggerCallback = (credLogger, platform2 = isNode ? "Node" : "Browser") => (level, message, containsPii) => {
  if (containsPii) {
    return;
  }
  switch (level) {
    case dist_exports.LogLevel.Error:
      credLogger.info(`MSAL ${platform2} V2 error: ${message}`);
      return;
    case dist_exports.LogLevel.Info:
      credLogger.info(`MSAL ${platform2} V2 info message: ${message}`);
      return;
    case dist_exports.LogLevel.Verbose:
      credLogger.info(`MSAL ${platform2} V2 verbose message: ${message}`);
      return;
    case dist_exports.LogLevel.Warning:
      credLogger.info(`MSAL ${platform2} V2 warning: ${message}`);
      return;
  }
};
function getMSALLogLevel(logLevel) {
  switch (logLevel) {
    case "error":
      return dist_exports.LogLevel.Error;
    case "info":
      return dist_exports.LogLevel.Info;
    case "verbose":
      return dist_exports.LogLevel.Verbose;
    case "warning":
      return dist_exports.LogLevel.Warning;
    default:
      return dist_exports.LogLevel.Info;
  }
}
function handleMsalError(scopes, error, getTokenOptions) {
  if (error.name === "AuthError" || error.name === "ClientAuthError" || error.name === "BrowserAuthError") {
    const msalError = error;
    switch (msalError.errorCode) {
      case "endpoints_resolution_error":
        logger3.info(formatError(scopes, error.message));
        return new CredentialUnavailableError(error.message);
      case "device_code_polling_cancelled":
        return new AbortError("The authentication has been aborted by the caller.");
      case "consent_required":
      case "interaction_required":
      case "login_required":
        logger3.info(formatError(scopes, `Authentication returned errorCode ${msalError.errorCode}`));
        break;
      default:
        logger3.info(formatError(scopes, `Failed to acquire token: ${error.message}`));
        break;
    }
  }
  if (error.name === "ClientConfigurationError" || error.name === "BrowserConfigurationAuthError" || error.name === "AbortError" || error.name === "AuthenticationError") {
    return error;
  }
  if (error.name === "NativeAuthError") {
    logger3.info(formatError(scopes, `Error from the native broker: ${error.message} with status code: ${error.statusCode}`));
    return error;
  }
  return new AuthenticationRequiredError({ scopes, getTokenOptions, message: error.message });
}
function publicToMsal(account) {
  return {
    localAccountId: account.homeAccountId,
    environment: account.authority,
    username: account.username,
    homeAccountId: account.homeAccountId,
    tenantId: account.tenantId
  };
}
function msalToPublic(clientId, account) {
  const record = {
    authority: account.environment ?? DefaultAuthority,
    homeAccountId: account.homeAccountId,
    tenantId: account.tenantId || DefaultTenantId,
    username: account.username,
    clientId,
    version: LatestAuthenticationRecordVersion
  };
  return record;
}
function deserializeAuthenticationRecord(serializedRecord) {
  const parsed = JSON.parse(serializedRecord);
  if (parsed.version && parsed.version !== LatestAuthenticationRecordVersion) {
    throw Error("Unsupported AuthenticationRecord version");
  }
  return parsed;
}

// ../../node_modules/@azure/core-client/dist/esm/interfaces.js
var XML_ATTRKEY = "$";
var XML_CHARKEY = "_";

// ../../node_modules/@azure/core-client/dist/esm/utils.js
function isPrimitiveBody(value, mapperTypeName) {
  return mapperTypeName !== "Composite" && mapperTypeName !== "Dictionary" && (typeof value === "string" || typeof value === "number" || typeof value === "boolean" || mapperTypeName?.match(/^(Date|DateTime|DateTimeRfc1123|UnixTime|ByteArray|Base64Url)$/i) !== null || value === void 0 || value === null);
}
function handleNullableResponseAndWrappableBody(responseObject) {
  const combinedHeadersAndBody = {
    ...responseObject.headers,
    ...responseObject.body
  };
  if (responseObject.hasNullableType && Object.getOwnPropertyNames(combinedHeadersAndBody).length === 0) {
    return responseObject.shouldWrapBody ? { body: null } : null;
  } else {
    return responseObject.shouldWrapBody ? {
      ...responseObject.headers,
      body: responseObject.body
    } : combinedHeadersAndBody;
  }
}
function flattenResponse(fullResponse, responseSpec) {
  const parsedHeaders = fullResponse.parsedHeaders;
  if (fullResponse.request.method === "HEAD") {
    return {
      ...parsedHeaders,
      body: fullResponse.parsedBody
    };
  }
  const bodyMapper = responseSpec && responseSpec.bodyMapper;
  const isNullable = Boolean(bodyMapper?.nullable);
  const expectedBodyTypeName = bodyMapper?.type.name;
  if (expectedBodyTypeName === "Stream") {
    return {
      ...parsedHeaders,
      blobBody: fullResponse.blobBody,
      readableStreamBody: fullResponse.readableStreamBody
    };
  }
  const modelProperties = expectedBodyTypeName === "Composite" && bodyMapper.type.modelProperties || {};
  const isPageableResponse = Object.keys(modelProperties).some((k) => modelProperties[k].serializedName === "");
  if (expectedBodyTypeName === "Sequence" || isPageableResponse) {
    const arrayResponse = fullResponse.parsedBody ?? [];
    for (const key of Object.keys(modelProperties)) {
      if (modelProperties[key].serializedName) {
        arrayResponse[key] = fullResponse.parsedBody?.[key];
      }
    }
    if (parsedHeaders) {
      for (const key of Object.keys(parsedHeaders)) {
        arrayResponse[key] = parsedHeaders[key];
      }
    }
    return isNullable && !fullResponse.parsedBody && !parsedHeaders && Object.getOwnPropertyNames(modelProperties).length === 0 ? null : arrayResponse;
  }
  return handleNullableResponseAndWrappableBody({
    body: fullResponse.parsedBody,
    headers: parsedHeaders,
    hasNullableType: isNullable,
    shouldWrapBody: isPrimitiveBody(fullResponse.parsedBody, expectedBodyTypeName)
  });
}

// ../../node_modules/@azure/core-client/dist/esm/serializer.js
var MapperTypeNames = {
  Base64Url: "Base64Url",
  Boolean: "Boolean",
  ByteArray: "ByteArray",
  Composite: "Composite",
  Date: "Date",
  DateTime: "DateTime",
  DateTimeRfc1123: "DateTimeRfc1123",
  Dictionary: "Dictionary",
  Enum: "Enum",
  Number: "Number",
  Object: "Object",
  Sequence: "Sequence",
  String: "String",
  Stream: "Stream",
  TimeSpan: "TimeSpan",
  UnixTime: "UnixTime"
};

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/abort-controller/AbortError.js
var AbortError2 = class extends Error {
  constructor(message) {
    super(message);
    this.name = "AbortError";
  }
};

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/httpHeaders.js
function normalizeName(name3) {
  return name3.toLowerCase();
}
function normalizeValue(value) {
  return String(value).trim().replace(/[\r\n]/g, "");
}
function* headerIterator(map) {
  for (const entry of map.values()) {
    yield [entry.name, entry.value];
  }
}
var HttpHeadersImpl = class {
  _headersMap;
  constructor(rawHeaders) {
    this._headersMap = /* @__PURE__ */ new Map();
    if (rawHeaders) {
      for (const headerName of Object.keys(rawHeaders)) {
        this.set(headerName, rawHeaders[headerName]);
      }
    }
  }
  /**
   * Set a header in this collection with the provided name and value. The name is
   * case-insensitive.
   * @param name - The name of the header to set. This value is case-insensitive.
   * @param value - The value of the header to set.
   */
  set(name3, value) {
    this._headersMap.set(normalizeName(name3), { name: name3, value: normalizeValue(value) });
  }
  /**
   * Get the header value for the provided header name, or undefined if no header exists in this
   * collection with the provided name.
   * @param name - The name of the header. This value is case-insensitive.
   */
  get(name3) {
    return this._headersMap.get(normalizeName(name3))?.value;
  }
  /**
   * Get whether or not this header collection contains a header entry for the provided header name.
   * @param name - The name of the header to set. This value is case-insensitive.
   */
  has(name3) {
    return this._headersMap.has(normalizeName(name3));
  }
  /**
   * Remove the header with the provided headerName.
   * @param name - The name of the header to remove.
   */
  delete(name3) {
    this._headersMap.delete(normalizeName(name3));
  }
  /**
   * Get the JSON object representation of this HTTP header collection.
   */
  toJSON(options = {}) {
    const result = {};
    if (options.preserveCase) {
      for (const entry of this._headersMap.values()) {
        result[entry.name] = entry.value;
      }
    } else {
      for (const [normalizedName, entry] of this._headersMap) {
        result[normalizedName] = entry.value;
      }
    }
    return result;
  }
  /**
   * Get the string representation of this HTTP header collection.
   */
  toString() {
    return JSON.stringify(this.toJSON({ preserveCase: true }));
  }
  /**
   * Iterate over tuples of header [name, value] pairs.
   */
  [Symbol.iterator]() {
    return headerIterator(this._headersMap);
  }
};
function createHttpHeaders(rawHeaders) {
  return new HttpHeadersImpl(rawHeaders);
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/pipelineRequest.js
var PipelineRequestImpl = class {
  url;
  method;
  headers;
  timeout;
  withCredentials;
  body;
  multipartBody;
  formData;
  streamResponseStatusCodes;
  enableBrowserStreams;
  proxySettings;
  disableKeepAlive;
  abortSignal;
  requestId;
  allowInsecureConnection;
  onUploadProgress;
  onDownloadProgress;
  requestOverrides;
  authSchemes;
  constructor(options) {
    this.url = options.url;
    this.body = options.body;
    this.headers = options.headers ?? createHttpHeaders();
    this.method = options.method ?? "GET";
    this.timeout = options.timeout ?? 0;
    this.multipartBody = options.multipartBody;
    this.formData = options.formData;
    this.disableKeepAlive = options.disableKeepAlive ?? false;
    this.proxySettings = options.proxySettings;
    this.streamResponseStatusCodes = options.streamResponseStatusCodes;
    this.withCredentials = options.withCredentials ?? false;
    this.abortSignal = options.abortSignal;
    this.onUploadProgress = options.onUploadProgress;
    this.onDownloadProgress = options.onDownloadProgress;
    this.requestId = options.requestId || randomUUID2();
    this.allowInsecureConnection = options.allowInsecureConnection ?? false;
    this.enableBrowserStreams = options.enableBrowserStreams ?? false;
    this.requestOverrides = options.requestOverrides;
    this.authSchemes = options.authSchemes;
  }
};
function createPipelineRequest(options) {
  return new PipelineRequestImpl(options);
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/pipeline.js
var ValidPhaseNames = /* @__PURE__ */ new Set(["Deserialize", "Serialize", "Retry", "Sign"]);
var HttpPipeline = class _HttpPipeline {
  _policies = [];
  _orderedPolicies;
  constructor(policies) {
    this._policies = policies?.slice(0) ?? [];
    this._orderedPolicies = void 0;
  }
  addPolicy(policy, options = {}) {
    if (options.phase && options.afterPhase) {
      throw new Error("Policies inside a phase cannot specify afterPhase.");
    }
    if (options.phase && !ValidPhaseNames.has(options.phase)) {
      throw new Error(`Invalid phase name: ${options.phase}`);
    }
    if (options.afterPhase && !ValidPhaseNames.has(options.afterPhase)) {
      throw new Error(`Invalid afterPhase name: ${options.afterPhase}`);
    }
    this._policies.push({
      policy,
      options
    });
    this._orderedPolicies = void 0;
  }
  removePolicy(options) {
    const removedPolicies = [];
    this._policies = this._policies.filter((policyDescriptor) => {
      if (options.name && policyDescriptor.policy.name === options.name || options.phase && policyDescriptor.options.phase === options.phase) {
        removedPolicies.push(policyDescriptor.policy);
        return false;
      } else {
        return true;
      }
    });
    this._orderedPolicies = void 0;
    return removedPolicies;
  }
  sendRequest(httpClient, request) {
    const policies = this.getOrderedPolicies();
    const pipeline = policies.reduceRight((next, policy) => {
      return (req) => {
        return policy.sendRequest(req, next);
      };
    }, (req) => httpClient.sendRequest(req));
    return pipeline(request);
  }
  getOrderedPolicies() {
    if (!this._orderedPolicies) {
      this._orderedPolicies = this.orderPolicies();
    }
    return this._orderedPolicies;
  }
  clone() {
    return new _HttpPipeline(this._policies);
  }
  static create() {
    return new _HttpPipeline();
  }
  orderPolicies() {
    const result = [];
    const policyMap = /* @__PURE__ */ new Map();
    function createPhase(name3) {
      return {
        name: name3,
        policies: /* @__PURE__ */ new Set(),
        hasRun: false,
        hasAfterPolicies: false
      };
    }
    const serializePhase = createPhase("Serialize");
    const noPhase = createPhase("None");
    const deserializePhase = createPhase("Deserialize");
    const retryPhase = createPhase("Retry");
    const signPhase = createPhase("Sign");
    const orderedPhases = [serializePhase, noPhase, deserializePhase, retryPhase, signPhase];
    function getPhase(phase) {
      if (phase === "Retry") {
        return retryPhase;
      } else if (phase === "Serialize") {
        return serializePhase;
      } else if (phase === "Deserialize") {
        return deserializePhase;
      } else if (phase === "Sign") {
        return signPhase;
      } else {
        return noPhase;
      }
    }
    for (const descriptor of this._policies) {
      const policy = descriptor.policy;
      const options = descriptor.options;
      const policyName = policy.name;
      if (policyMap.has(policyName)) {
        throw new Error("Duplicate policy names not allowed in pipeline");
      }
      const node = {
        policy,
        dependsOn: /* @__PURE__ */ new Set(),
        dependants: /* @__PURE__ */ new Set()
      };
      if (options.afterPhase) {
        node.afterPhase = getPhase(options.afterPhase);
        node.afterPhase.hasAfterPolicies = true;
      }
      policyMap.set(policyName, node);
      const phase = getPhase(options.phase);
      phase.policies.add(node);
    }
    for (const descriptor of this._policies) {
      const { policy, options } = descriptor;
      const policyName = policy.name;
      const node = policyMap.get(policyName);
      if (!node) {
        throw new Error(`Missing node for policy ${policyName}`);
      }
      if (options.afterPolicies) {
        for (const afterPolicyName of options.afterPolicies) {
          const afterNode = policyMap.get(afterPolicyName);
          if (afterNode) {
            node.dependsOn.add(afterNode);
            afterNode.dependants.add(node);
          }
        }
      }
      if (options.beforePolicies) {
        for (const beforePolicyName of options.beforePolicies) {
          const beforeNode = policyMap.get(beforePolicyName);
          if (beforeNode) {
            beforeNode.dependsOn.add(node);
            node.dependants.add(beforeNode);
          }
        }
      }
    }
    function walkPhase(phase) {
      phase.hasRun = true;
      for (const node of phase.policies) {
        if (node.afterPhase && (!node.afterPhase.hasRun || node.afterPhase.policies.size)) {
          continue;
        }
        if (node.dependsOn.size === 0) {
          result.push(node.policy);
          for (const dependant of node.dependants) {
            dependant.dependsOn.delete(node);
          }
          policyMap.delete(node.policy.name);
          phase.policies.delete(node);
        }
      }
    }
    function walkPhases() {
      for (const phase of orderedPhases) {
        walkPhase(phase);
        if (phase.policies.size > 0 && phase !== noPhase) {
          if (!noPhase.hasRun) {
            walkPhase(noPhase);
          }
          return;
        }
        if (phase.hasAfterPolicies) {
          walkPhase(noPhase);
        }
      }
    }
    let iteration = 0;
    while (policyMap.size > 0) {
      iteration++;
      const initialResultLength = result.length;
      walkPhases();
      if (result.length <= initialResultLength && iteration > 1) {
        throw new Error("Cannot satisfy policy dependencies due to requirements cycle.");
      }
    }
    return result;
  }
};
function createEmptyPipeline() {
  return HttpPipeline.create();
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/util/inspect.js
import { inspect } from "util";
var custom = inspect.custom;

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/restError.js
var errorSanitizer = new Sanitizer();
var RestError = class _RestError extends Error {
  /**
   * Something went wrong when making the request.
   * This means the actual request failed for some reason,
   * such as a DNS issue or the connection being lost.
   */
  static REQUEST_SEND_ERROR = "REQUEST_SEND_ERROR";
  /**
   * This means that parsing the response from the server failed.
   * It may have been malformed.
   */
  static PARSE_ERROR = "PARSE_ERROR";
  /**
   * The code of the error itself (use statics on RestError if possible.)
   */
  code;
  /**
   * The HTTP status code of the request (if applicable.)
   */
  statusCode;
  /**
   * The request that was made.
   * This property is non-enumerable.
   */
  request;
  /**
   * The response received (if any.)
   * This property is non-enumerable.
   */
  response;
  /**
   * Bonus property set by the throw site.
   */
  details;
  constructor(message, options = {}) {
    super(message);
    this.name = "RestError";
    this.code = options.code;
    this.statusCode = options.statusCode;
    Object.defineProperty(this, "request", { value: options.request, enumerable: false });
    Object.defineProperty(this, "response", { value: options.response, enumerable: false });
    const agent = this.request?.agent ? {
      maxFreeSockets: this.request.agent.maxFreeSockets,
      maxSockets: this.request.agent.maxSockets
    } : void 0;
    Object.defineProperty(this, custom, {
      value: () => {
        return `RestError: ${this.message} 
 ${errorSanitizer.sanitize({
          ...this,
          request: { ...this.request, agent },
          response: this.response
        })}`;
      },
      enumerable: false
    });
    Object.setPrototypeOf(this, _RestError.prototype);
  }
};
function isRestError(e) {
  if (e instanceof RestError) {
    return true;
  }
  return isError(e) && e.name === "RestError";
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/nodeHttpClient.js
import http2 from "http";
import https from "https";
import zlib from "zlib";
import { Transform } from "stream";

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/log.js
var logger4 = createClientLogger("ts-http-runtime");

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/nodeHttpClient.js
var DEFAULT_TLS_SETTINGS = {};
function isReadableStream(body) {
  return body && typeof body.pipe === "function";
}
function isStreamComplete(stream) {
  if (stream.readable === false) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    const handler = () => {
      resolve();
      stream.removeListener("close", handler);
      stream.removeListener("end", handler);
      stream.removeListener("error", handler);
    };
    stream.on("close", handler);
    stream.on("end", handler);
    stream.on("error", handler);
  });
}
function isArrayBuffer(body) {
  return body && typeof body.byteLength === "number";
}
var ReportTransform = class extends Transform {
  loadedBytes = 0;
  progressCallback;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  _transform(chunk, _encoding, callback) {
    this.push(chunk);
    this.loadedBytes += chunk.length;
    try {
      this.progressCallback({ loadedBytes: this.loadedBytes });
      callback();
    } catch (e) {
      callback(e);
    }
  }
  constructor(progressCallback) {
    super();
    this.progressCallback = progressCallback;
  }
};
var NodeHttpClient = class {
  cachedHttpAgent;
  cachedHttpsAgents = /* @__PURE__ */ new WeakMap();
  /**
   * Makes a request over an underlying transport layer and returns the response.
   * @param request - The request to be made.
   */
  async sendRequest(request) {
    const abortController = new AbortController();
    let abortListener;
    if (request.abortSignal) {
      if (request.abortSignal.aborted) {
        throw new AbortError2("The operation was aborted. Request has already been canceled.");
      }
      abortListener = (event) => {
        if (event.type === "abort") {
          abortController.abort();
        }
      };
      request.abortSignal.addEventListener("abort", abortListener);
    }
    let timeoutId;
    if (request.timeout > 0) {
      timeoutId = setTimeout(() => {
        const sanitizer = new Sanitizer();
        logger4.info(`request to '${sanitizer.sanitizeUrl(request.url)}' timed out. canceling...`);
        abortController.abort();
      }, request.timeout);
    }
    const acceptEncoding = request.headers.get("Accept-Encoding");
    const shouldDecompress = acceptEncoding?.includes("gzip") || acceptEncoding?.includes("deflate");
    let body = typeof request.body === "function" ? request.body() : request.body;
    if (body && !request.headers.has("Content-Length")) {
      const bodyLength = getBodyLength(body);
      if (bodyLength !== null) {
        request.headers.set("Content-Length", bodyLength);
      }
    }
    let responseStream;
    try {
      if (body && request.onUploadProgress) {
        const onUploadProgress = request.onUploadProgress;
        const uploadReportStream = new ReportTransform(onUploadProgress);
        uploadReportStream.on("error", (e) => {
          logger4.error("Error in upload progress", e);
        });
        if (isReadableStream(body)) {
          body.pipe(uploadReportStream);
        } else {
          uploadReportStream.end(body);
        }
        body = uploadReportStream;
      }
      const res = await this.makeRequest(request, abortController, body);
      if (timeoutId !== void 0) {
        clearTimeout(timeoutId);
      }
      const headers = getResponseHeaders(res);
      const status = res.statusCode ?? 0;
      const response = {
        status,
        headers,
        request
      };
      if (request.method === "HEAD") {
        res.resume();
        return response;
      }
      responseStream = shouldDecompress ? getDecodedResponseStream(res, headers) : res;
      const onDownloadProgress = request.onDownloadProgress;
      if (onDownloadProgress) {
        const downloadReportStream = new ReportTransform(onDownloadProgress);
        downloadReportStream.on("error", (e) => {
          logger4.error("Error in download progress", e);
        });
        responseStream.pipe(downloadReportStream);
        responseStream = downloadReportStream;
      }
      if (
        // Value of POSITIVE_INFINITY in streamResponseStatusCodes is considered as any status code
        request.streamResponseStatusCodes?.has(Number.POSITIVE_INFINITY) || request.streamResponseStatusCodes?.has(response.status)
      ) {
        response.readableStreamBody = responseStream;
      } else {
        response.bodyAsText = await streamToText(responseStream);
      }
      return response;
    } finally {
      if (request.abortSignal && abortListener) {
        let uploadStreamDone = Promise.resolve();
        if (isReadableStream(body)) {
          uploadStreamDone = isStreamComplete(body);
        }
        let downloadStreamDone = Promise.resolve();
        if (isReadableStream(responseStream)) {
          downloadStreamDone = isStreamComplete(responseStream);
        }
        Promise.all([uploadStreamDone, downloadStreamDone]).then(() => {
          if (abortListener) {
            request.abortSignal?.removeEventListener("abort", abortListener);
          }
        }).catch((e) => {
          logger4.warning("Error when cleaning up abortListener on httpRequest", e);
        });
      }
    }
  }
  makeRequest(request, abortController, body) {
    const url = new URL(request.url);
    const isInsecure = url.protocol !== "https:";
    if (isInsecure && !request.allowInsecureConnection) {
      throw new Error(`Cannot connect to ${request.url} while allowInsecureConnection is false.`);
    }
    const agent = request.agent ?? this.getOrCreateAgent(request, isInsecure);
    const options = {
      agent,
      hostname: url.hostname,
      path: `${url.pathname}${url.search}`,
      port: url.port,
      method: request.method,
      headers: request.headers.toJSON({ preserveCase: true }),
      ...request.requestOverrides
    };
    return new Promise((resolve, reject) => {
      const req = isInsecure ? http2.request(options, resolve) : https.request(options, resolve);
      req.once("error", (err) => {
        reject(new RestError(err.message, { code: err.code ?? RestError.REQUEST_SEND_ERROR, request }));
      });
      abortController.signal.addEventListener("abort", () => {
        const abortError = new AbortError2("The operation was aborted. Rejecting from abort signal callback while making request.");
        req.destroy(abortError);
        reject(abortError);
      });
      if (body && isReadableStream(body)) {
        body.pipe(req);
      } else if (body) {
        if (typeof body === "string" || Buffer.isBuffer(body)) {
          req.end(body);
        } else if (isArrayBuffer(body)) {
          req.end(ArrayBuffer.isView(body) ? Buffer.from(body.buffer, body.byteOffset, body.byteLength) : Buffer.from(body));
        } else {
          logger4.error("Unrecognized body type", body);
          reject(new RestError("Unrecognized body type"));
        }
      } else {
        req.end();
      }
    });
  }
  getOrCreateAgent(request, isInsecure) {
    const disableKeepAlive = request.disableKeepAlive;
    if (isInsecure) {
      if (disableKeepAlive) {
        return http2.globalAgent;
      }
      if (!this.cachedHttpAgent) {
        this.cachedHttpAgent = new http2.Agent({ keepAlive: true });
      }
      return this.cachedHttpAgent;
    } else {
      if (disableKeepAlive && !request.tlsSettings) {
        return https.globalAgent;
      }
      const tlsSettings = request.tlsSettings ?? DEFAULT_TLS_SETTINGS;
      let agent = this.cachedHttpsAgents.get(tlsSettings);
      if (agent && agent.options.keepAlive === !disableKeepAlive) {
        return agent;
      }
      logger4.info("No cached TLS Agent exist, creating a new Agent");
      agent = new https.Agent({
        // keepAlive is true if disableKeepAlive is false.
        keepAlive: !disableKeepAlive,
        // Since we are spreading, if no tslSettings were provided, nothing is added to the agent options.
        ...tlsSettings
      });
      this.cachedHttpsAgents.set(tlsSettings, agent);
      return agent;
    }
  }
};
function getResponseHeaders(res) {
  const headers = createHttpHeaders();
  for (const header of Object.keys(res.headers)) {
    const value = res.headers[header];
    if (Array.isArray(value)) {
      if (value.length > 0) {
        headers.set(header, value[0]);
      }
    } else if (value) {
      headers.set(header, value);
    }
  }
  return headers;
}
function getDecodedResponseStream(stream, headers) {
  const contentEncoding = headers.get("Content-Encoding");
  if (contentEncoding === "gzip") {
    const unzip = zlib.createGunzip();
    stream.pipe(unzip);
    return unzip;
  } else if (contentEncoding === "deflate") {
    const inflate = zlib.createInflate();
    stream.pipe(inflate);
    return inflate;
  }
  return stream;
}
function streamToText(stream) {
  return new Promise((resolve, reject) => {
    const buffer = [];
    stream.on("data", (chunk) => {
      if (Buffer.isBuffer(chunk)) {
        buffer.push(chunk);
      } else {
        buffer.push(Buffer.from(chunk));
      }
    });
    stream.on("end", () => {
      resolve(Buffer.concat(buffer).toString("utf8"));
    });
    stream.on("error", (e) => {
      if (e && e?.name === "AbortError") {
        reject(e);
      } else {
        reject(new RestError(`Error reading response as text: ${e.message}`, {
          code: RestError.PARSE_ERROR
        }));
      }
    });
  });
}
function getBodyLength(body) {
  if (!body) {
    return 0;
  } else if (Buffer.isBuffer(body)) {
    return body.length;
  } else if (isReadableStream(body)) {
    return null;
  } else if (isArrayBuffer(body)) {
    return body.byteLength;
  } else if (typeof body === "string") {
    return Buffer.from(body).length;
  } else {
    return null;
  }
}
function createNodeHttpClient() {
  return new NodeHttpClient();
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/defaultHttpClient.js
function createDefaultHttpClient() {
  return createNodeHttpClient();
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/policies/logPolicy.js
var logPolicyName = "logPolicy";
function logPolicy(options = {}) {
  const logger27 = options.logger ?? logger4.info;
  const sanitizer = new Sanitizer({
    additionalAllowedHeaderNames: options.additionalAllowedHeaderNames,
    additionalAllowedQueryParameters: options.additionalAllowedQueryParameters
  });
  return {
    name: logPolicyName,
    async sendRequest(request, next) {
      if (!logger27.enabled) {
        return next(request);
      }
      logger27(`Request: ${sanitizer.sanitize(request)}`);
      const response = await next(request);
      logger27(`Response status code: ${response.status}`);
      logger27(`Headers: ${sanitizer.sanitize(response.headers)}`);
      return response;
    }
  };
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/util/userAgentPlatform.js
import os from "os";
import process4 from "process";
function getHeaderName() {
  return "User-Agent";
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/constants.js
var DEFAULT_RETRY_POLICY_COUNT = 3;

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/util/userAgent.js
function getUserAgentHeaderName() {
  return getHeaderName();
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/policies/userAgentPolicy.js
var UserAgentHeaderName = getUserAgentHeaderName();

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/util/helpers.js
var StandardAbortMessage2 = "The operation was aborted.";
function delay3(delayInMs, value, options) {
  return new Promise((resolve, reject) => {
    let timer = void 0;
    let onAborted = void 0;
    const rejectOnAbort = () => {
      return reject(new AbortError2(options?.abortErrorMsg ? options?.abortErrorMsg : StandardAbortMessage2));
    };
    const removeListeners = () => {
      if (options?.abortSignal && onAborted) {
        options.abortSignal.removeEventListener("abort", onAborted);
      }
    };
    onAborted = () => {
      if (timer) {
        clearTimeout(timer);
      }
      removeListeners();
      return rejectOnAbort();
    };
    if (options?.abortSignal && options.abortSignal.aborted) {
      return rejectOnAbort();
    }
    timer = setTimeout(() => {
      removeListeners();
      resolve(value);
    }, delayInMs);
    if (options?.abortSignal) {
      options.abortSignal.addEventListener("abort", onAborted);
    }
  });
}
function parseHeaderValueAsNumber(response, headerName) {
  const value = response.headers.get(headerName);
  if (!value)
    return;
  const valueAsNum = Number(value);
  if (Number.isNaN(valueAsNum))
    return;
  return valueAsNum;
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/retryStrategies/throttlingRetryStrategy.js
var RetryAfterHeader = "Retry-After";
var AllRetryAfterHeaders = ["retry-after-ms", "x-ms-retry-after-ms", RetryAfterHeader];
function getRetryAfterInMs(response) {
  if (!(response && [429, 503].includes(response.status)))
    return void 0;
  try {
    for (const header of AllRetryAfterHeaders) {
      const retryAfterValue = parseHeaderValueAsNumber(response, header);
      if (retryAfterValue === 0 || retryAfterValue) {
        const multiplyingFactor = header === RetryAfterHeader ? 1e3 : 1;
        return retryAfterValue * multiplyingFactor;
      }
    }
    const retryAfterHeader = response.headers.get(RetryAfterHeader);
    if (!retryAfterHeader)
      return;
    const date = Date.parse(retryAfterHeader);
    const diff = date - Date.now();
    return Number.isFinite(diff) ? Math.max(0, diff) : void 0;
  } catch {
    return void 0;
  }
}
function isThrottlingRetryResponse(response) {
  return Number.isFinite(getRetryAfterInMs(response));
}
function throttlingRetryStrategy() {
  return {
    name: "throttlingRetryStrategy",
    retry({ response }) {
      const retryAfterInMs = getRetryAfterInMs(response);
      if (!Number.isFinite(retryAfterInMs)) {
        return { skipStrategy: true };
      }
      return {
        retryAfterInMs
      };
    }
  };
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/retryStrategies/exponentialRetryStrategy.js
var DEFAULT_CLIENT_RETRY_INTERVAL = 1e3;
var DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1e3 * 64;
function exponentialRetryStrategy(options = {}) {
  const retryInterval = options.retryDelayInMs ?? DEFAULT_CLIENT_RETRY_INTERVAL;
  const maxRetryInterval = options.maxRetryDelayInMs ?? DEFAULT_CLIENT_MAX_RETRY_INTERVAL;
  return {
    name: "exponentialRetryStrategy",
    retry({ retryCount, response, responseError }) {
      const matchedSystemError = isSystemError(responseError);
      const ignoreSystemErrors = matchedSystemError && options.ignoreSystemErrors;
      const isExponential = isExponentialRetryResponse(response);
      const ignoreExponentialResponse = isExponential && options.ignoreHttpStatusCodes;
      const unknownResponse = response && (isThrottlingRetryResponse(response) || !isExponential);
      if (unknownResponse || ignoreExponentialResponse || ignoreSystemErrors) {
        return { skipStrategy: true };
      }
      if (responseError && !matchedSystemError && !isExponential) {
        return { errorToThrow: responseError };
      }
      return calculateRetryDelay(retryCount, {
        retryDelayInMs: retryInterval,
        maxRetryDelayInMs: maxRetryInterval
      });
    }
  };
}
function isExponentialRetryResponse(response) {
  return Boolean(response && response.status !== void 0 && (response.status >= 500 || response.status === 408) && response.status !== 501 && response.status !== 505);
}
function isSystemError(err) {
  if (!err) {
    return false;
  }
  return err.code === "ETIMEDOUT" || err.code === "ESOCKETTIMEDOUT" || err.code === "ECONNREFUSED" || err.code === "ECONNRESET" || err.code === "ENOENT" || err.code === "ENOTFOUND";
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/policies/retryPolicy.js
var retryPolicyLogger = createClientLogger("ts-http-runtime retryPolicy");
var retryPolicyName = "retryPolicy";
function retryPolicy(strategies, options = { maxRetries: DEFAULT_RETRY_POLICY_COUNT }) {
  const logger27 = options.logger || retryPolicyLogger;
  return {
    name: retryPolicyName,
    async sendRequest(request, next) {
      let response;
      let responseError;
      let retryCount = -1;
      retryRequest: while (true) {
        retryCount += 1;
        response = void 0;
        responseError = void 0;
        try {
          logger27.info(`Retry ${retryCount}: Attempting to send request`, request.requestId);
          response = await next(request);
          logger27.info(`Retry ${retryCount}: Received a response from request`, request.requestId);
        } catch (e) {
          logger27.error(`Retry ${retryCount}: Received an error from request`, request.requestId);
          if (!isRestError(e)) {
            throw e;
          }
          responseError = e;
          response = e.response;
        }
        if (request.abortSignal?.aborted) {
          logger27.error(`Retry ${retryCount}: Request aborted.`);
          const abortError = new AbortError2();
          throw abortError;
        }
        if (retryCount >= (options.maxRetries ?? DEFAULT_RETRY_POLICY_COUNT)) {
          logger27.info(`Retry ${retryCount}: Maximum retries reached. Returning the last received response, or throwing the last received error.`);
          if (responseError) {
            throw responseError;
          } else if (response) {
            return response;
          } else {
            throw new Error("Maximum retries reached with no response or error to throw");
          }
        }
        logger27.info(`Retry ${retryCount}: Processing ${strategies.length} retry strategies.`);
        strategiesLoop: for (const strategy of strategies) {
          const strategyLogger = strategy.logger || logger27;
          strategyLogger.info(`Retry ${retryCount}: Processing retry strategy ${strategy.name}.`);
          const modifiers = strategy.retry({
            retryCount,
            response,
            responseError
          });
          if (modifiers.skipStrategy) {
            strategyLogger.info(`Retry ${retryCount}: Skipped.`);
            continue strategiesLoop;
          }
          const { errorToThrow, retryAfterInMs, redirectTo } = modifiers;
          if (errorToThrow) {
            strategyLogger.error(`Retry ${retryCount}: Retry strategy ${strategy.name} throws error:`, errorToThrow);
            throw errorToThrow;
          }
          if (retryAfterInMs || retryAfterInMs === 0) {
            strategyLogger.info(`Retry ${retryCount}: Retry strategy ${strategy.name} retries after ${retryAfterInMs}`);
            await delay3(retryAfterInMs, void 0, { abortSignal: request.abortSignal });
            continue retryRequest;
          }
          if (redirectTo) {
            strategyLogger.info(`Retry ${retryCount}: Retry strategy ${strategy.name} redirects to ${redirectTo}`);
            request.url = redirectTo;
            continue retryRequest;
          }
        }
        if (responseError) {
          logger27.info(`None of the retry strategies could work with the received error. Throwing it.`);
          throw responseError;
        }
        if (response) {
          logger27.info(`None of the retry strategies could work with the received response. Returning it.`);
          return response;
        }
      }
    }
  };
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/policies/defaultRetryPolicy.js
var defaultRetryPolicyName = "defaultRetryPolicy";
function defaultRetryPolicy(options = {}) {
  return {
    name: defaultRetryPolicyName,
    sendRequest: retryPolicy([throttlingRetryStrategy(), exponentialRetryStrategy(options)], {
      maxRetries: options.maxRetries ?? DEFAULT_RETRY_POLICY_COUNT
    }).sendRequest
  };
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/formData.js
function convertBodyToFormDataMap(body) {
  if (typeof FormData !== "undefined" && body instanceof FormData) {
    const formDataMap = {};
    for (const [key, value] of body.entries()) {
      const existing = formDataMap[key];
      if (Array.isArray(existing)) {
        existing.push(value);
      } else {
        formDataMap[key] = existing !== void 0 ? [existing, value] : [value];
      }
    }
    return formDataMap;
  }
  return void 0;
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/policies/formDataPolicy.js
var formDataPolicyName = "formDataPolicy";
function formDataPolicy() {
  return {
    name: formDataPolicyName,
    async sendRequest(request, next) {
      const converted = convertBodyToFormDataMap(request.body);
      if (converted) {
        request.formData = converted;
        request.body = void 0;
      }
      if (request.formData) {
        const contentType = request.headers.get("Content-Type");
        if (contentType && contentType.indexOf("application/x-www-form-urlencoded") !== -1) {
          request.body = wwwFormUrlEncode(request.formData);
        } else {
          await prepareFormData(request.formData, request);
        }
        request.formData = void 0;
      }
      return next(request);
    }
  };
}
function wwwFormUrlEncode(formData) {
  const urlSearchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(formData)) {
    if (Array.isArray(value)) {
      for (const subValue of value) {
        urlSearchParams.append(key, subValue.toString());
      }
    } else {
      urlSearchParams.append(key, value.toString());
    }
  }
  return urlSearchParams.toString();
}
async function prepareFormData(formData, request) {
  const contentType = request.headers.get("Content-Type");
  if (contentType && !contentType.startsWith("multipart/form-data")) {
    return;
  }
  request.headers.set("Content-Type", contentType ?? "multipart/form-data");
  const parts = [];
  for (const [fieldName, values] of Object.entries(formData)) {
    for (const value of Array.isArray(values) ? values : [values]) {
      if (typeof value === "string") {
        parts.push({
          headers: createHttpHeaders({
            "Content-Disposition": `form-data; name="${fieldName}"`
          }),
          body: stringToUint8Array(value, "utf-8")
        });
      } else if (value === void 0 || value === null || typeof value !== "object") {
        throw new Error(`Unexpected value for key ${fieldName}: ${value}. Value should be serialized to string first.`);
      } else {
        const fileName = value.name || "blob";
        const headers = createHttpHeaders();
        headers.set("Content-Disposition", `form-data; name="${fieldName}"; filename="${fileName}"`);
        headers.set("Content-Type", value.type || "application/octet-stream");
        parts.push({
          headers,
          body: value
        });
      }
    }
  }
  request.multipartBody = { parts };
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/policies/agentPolicy.js
var agentPolicyName = "agentPolicy";
function agentPolicy(agent) {
  return {
    name: agentPolicyName,
    sendRequest: async (req, next) => {
      if (!req.agent) {
        req.agent = agent;
      }
      return next(req);
    }
  };
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/policies/tlsPolicy.js
var tlsPolicyName = "tlsPolicy";
function tlsPolicy(tlsSettings) {
  return {
    name: tlsPolicyName,
    sendRequest: async (req, next) => {
      if (!req.tlsSettings) {
        req.tlsSettings = tlsSettings;
      }
      return next(req);
    }
  };
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/policies/proxyPolicy.js
var import_https_proxy_agent = __toESM(require_dist2(), 1);
var import_http_proxy_agent = __toESM(require_dist3(), 1);
var HTTPS_PROXY = "HTTPS_PROXY";
var HTTP_PROXY = "HTTP_PROXY";
var ALL_PROXY = "ALL_PROXY";
var NO_PROXY = "NO_PROXY";
var proxyPolicyName = "proxyPolicy";
var globalNoProxyList = [];
var noProxyListLoaded = false;
var globalBypassedMap = /* @__PURE__ */ new Map();
function getEnvironmentValue(name3) {
  if (process.env[name3]) {
    return process.env[name3];
  } else if (process.env[name3.toLowerCase()]) {
    return process.env[name3.toLowerCase()];
  }
  return void 0;
}
function loadEnvironmentProxyValue() {
  if (!process) {
    return void 0;
  }
  const httpsProxy = getEnvironmentValue(HTTPS_PROXY);
  const allProxy = getEnvironmentValue(ALL_PROXY);
  const httpProxy = getEnvironmentValue(HTTP_PROXY);
  return httpsProxy || allProxy || httpProxy;
}
function isBypassed(uri, noProxyList, bypassedMap) {
  if (noProxyList.length === 0) {
    return false;
  }
  const host = new URL(uri).hostname;
  if (bypassedMap?.has(host)) {
    return bypassedMap.get(host);
  }
  let isBypassedFlag = false;
  for (const pattern of noProxyList) {
    if (pattern[0] === ".") {
      if (host.endsWith(pattern)) {
        isBypassedFlag = true;
      } else {
        if (host.length === pattern.length - 1 && host === pattern.slice(1)) {
          isBypassedFlag = true;
        }
      }
    } else {
      if (host === pattern) {
        isBypassedFlag = true;
      }
    }
  }
  bypassedMap?.set(host, isBypassedFlag);
  return isBypassedFlag;
}
function loadNoProxy() {
  const noProxy = getEnvironmentValue(NO_PROXY);
  noProxyListLoaded = true;
  if (noProxy) {
    return noProxy.split(",").map((item) => item.trim()).filter((item) => item.length);
  }
  return [];
}
function getDefaultProxySettingsInternal() {
  const envProxy = loadEnvironmentProxyValue();
  return envProxy ? new URL(envProxy) : void 0;
}
function getUrlFromProxySettings(settings) {
  let parsedProxyUrl;
  try {
    parsedProxyUrl = new URL(settings.host);
  } catch {
    throw new Error(`Expecting a valid host string in proxy settings, but found "${settings.host}".`);
  }
  parsedProxyUrl.port = String(settings.port);
  if (settings.username) {
    parsedProxyUrl.username = settings.username;
  }
  if (settings.password) {
    parsedProxyUrl.password = settings.password;
  }
  return parsedProxyUrl;
}
function setProxyAgentOnRequest(request, cachedAgents, proxyUrl) {
  if (request.agent) {
    return;
  }
  const url = new URL(request.url);
  const isInsecure = url.protocol !== "https:";
  if (request.tlsSettings) {
    logger4.warning("TLS settings are not supported in combination with custom Proxy, certificates provided to the client will be ignored.");
  }
  if (isInsecure) {
    if (!cachedAgents.httpProxyAgent) {
      cachedAgents.httpProxyAgent = new import_http_proxy_agent.HttpProxyAgent(proxyUrl);
    }
    request.agent = cachedAgents.httpProxyAgent;
  } else {
    if (!cachedAgents.httpsProxyAgent) {
      cachedAgents.httpsProxyAgent = new import_https_proxy_agent.HttpsProxyAgent(proxyUrl);
    }
    request.agent = cachedAgents.httpsProxyAgent;
  }
}
function proxyPolicy(proxySettings, options) {
  if (!noProxyListLoaded) {
    globalNoProxyList.push(...loadNoProxy());
  }
  const defaultProxy = proxySettings ? getUrlFromProxySettings(proxySettings) : getDefaultProxySettingsInternal();
  const cachedAgents = {};
  return {
    name: proxyPolicyName,
    async sendRequest(request, next) {
      if (!request.proxySettings && defaultProxy && !isBypassed(request.url, options?.customNoProxyList ?? globalNoProxyList, options?.customNoProxyList ? void 0 : globalBypassedMap)) {
        setProxyAgentOnRequest(request, cachedAgents, defaultProxy);
      } else if (request.proxySettings) {
        setProxyAgentOnRequest(request, cachedAgents, getUrlFromProxySettings(request.proxySettings));
      }
      return next(request);
    }
  };
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/policies/decompressResponsePolicy.js
var decompressResponsePolicyName = "decompressResponsePolicy";
function decompressResponsePolicy() {
  return {
    name: decompressResponsePolicyName,
    async sendRequest(request, next) {
      if (request.method !== "HEAD") {
        request.headers.set("Accept-Encoding", "gzip,deflate");
      }
      return next(request);
    }
  };
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/policies/redirectPolicy.js
var redirectPolicyName = "redirectPolicy";
var allowedRedirect = ["GET", "HEAD"];
function redirectPolicy(options = {}) {
  const { maxRetries = 20, allowCrossOriginRedirects = false } = options;
  return {
    name: redirectPolicyName,
    async sendRequest(request, next) {
      const response = await next(request);
      return handleRedirect(next, response, maxRetries, allowCrossOriginRedirects);
    }
  };
}
async function handleRedirect(next, response, maxRetries, allowCrossOriginRedirects, currentRetries = 0) {
  const { request, status, headers } = response;
  const locationHeader = headers.get("location");
  if (locationHeader && (status === 300 || status === 301 && allowedRedirect.includes(request.method) || status === 302 && allowedRedirect.includes(request.method) || status === 303 && request.method === "POST" || status === 307) && currentRetries < maxRetries) {
    const url = new URL(locationHeader, request.url);
    if (!allowCrossOriginRedirects) {
      const originalUrl = new URL(request.url);
      if (url.origin !== originalUrl.origin) {
        logger4.verbose(`Skipping cross-origin redirect from ${originalUrl.origin} to ${url.origin}.`);
        return response;
      }
    }
    request.url = url.toString();
    if (status === 303) {
      request.method = "GET";
      request.headers.delete("Content-Length");
      delete request.body;
    }
    request.headers.delete("Authorization");
    const res = await next(request);
    return handleRedirect(next, res, maxRetries, allowCrossOriginRedirects, currentRetries + 1);
  }
  return response;
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/util/typeGuards.js
function isBlob(x) {
  return x instanceof Blob;
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/util/concat.js
import { Readable } from "stream";
async function* streamAsyncIterator() {
  const reader = this.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return;
      }
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}
function makeAsyncIterable(webStream) {
  if (!webStream[Symbol.asyncIterator]) {
    webStream[Symbol.asyncIterator] = streamAsyncIterator.bind(webStream);
  }
  if (!webStream.values) {
    webStream.values = streamAsyncIterator.bind(webStream);
  }
}
function ensureNodeStream(stream) {
  if (stream instanceof ReadableStream) {
    makeAsyncIterable(stream);
    return Readable.fromWeb(stream);
  } else {
    return stream;
  }
}
function toStream(source) {
  if (source instanceof Uint8Array) {
    return Readable.from(Buffer.from(source));
  } else if (isBlob(source)) {
    return ensureNodeStream(source.stream());
  } else {
    return ensureNodeStream(source);
  }
}
async function concat(sources) {
  return function() {
    const streams = sources.map((x) => typeof x === "function" ? x() : x).map(toStream);
    return Readable.from((async function* () {
      for (const stream of streams) {
        for await (const chunk of stream) {
          yield chunk;
        }
      }
    })());
  };
}

// ../../node_modules/@typespec/ts-http-runtime/dist/esm/policies/multipartPolicy.js
function generateBoundary() {
  return `----AzSDKFormBoundary${randomUUID2()}`;
}
function encodeHeaders(headers) {
  let result = "";
  for (const [key, value] of headers) {
    result += `${key}: ${value}\r
`;
  }
  return result;
}
function getLength(source) {
  if (source instanceof Uint8Array) {
    return source.byteLength;
  } else if (isBlob(source)) {
    return source.size === -1 ? void 0 : source.size;
  } else {
    return void 0;
  }
}
function getTotalLength(sources) {
  let total = 0;
  for (const source of sources) {
    const partLength = getLength(source);
    if (partLength === void 0) {
      return void 0;
    } else {
      total += partLength;
    }
  }
  return total;
}
async function buildRequestBody(request, parts, boundary) {
  const sources = [
    stringToUint8Array(`--${boundary}`, "utf-8"),
    ...parts.flatMap((part) => [
      stringToUint8Array("\r\n", "utf-8"),
      stringToUint8Array(encodeHeaders(part.headers), "utf-8"),
      stringToUint8Array("\r\n", "utf-8"),
      part.body,
      stringToUint8Array(`\r
--${boundary}`, "utf-8")
    ]),
    stringToUint8Array("--\r\n\r\n", "utf-8")
  ];
  const contentLength = getTotalLength(sources);
  if (contentLength) {
    request.headers.set("Content-Length", contentLength);
  }
  request.body = await concat(sources);
}
var multipartPolicyName = "multipartPolicy";
var maxBoundaryLength = 70;
var validBoundaryCharacters = new Set(`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'()+,-./:=?`);
function assertValidBoundary(boundary) {
  if (boundary.length > maxBoundaryLength) {
    throw new Error(`Multipart boundary "${boundary}" exceeds maximum length of 70 characters`);
  }
  if (Array.from(boundary).some((x) => !validBoundaryCharacters.has(x))) {
    throw new Error(`Multipart boundary "${boundary}" contains invalid characters`);
  }
}
function multipartPolicy() {
  return {
    name: multipartPolicyName,
    async sendRequest(request, next) {
      if (!request.multipartBody) {
        return next(request);
      }
      if (request.body) {
        throw new Error("multipartBody and regular body cannot be set at the same time");
      }
      let boundary = request.multipartBody.boundary;
      const contentTypeHeader = request.headers.get("Content-Type") ?? "multipart/mixed";
      const parsedHeader = contentTypeHeader.match(/^(multipart\/[^ ;]+)(?:; *boundary=(.+))?$/);
      if (!parsedHeader) {
        throw new Error(`Got multipart request body, but content-type header was not multipart: ${contentTypeHeader}`);
      }
      const [, contentType, parsedBoundary] = parsedHeader;
      if (parsedBoundary && boundary && parsedBoundary !== boundary) {
        throw new Error(`Multipart boundary was specified as ${parsedBoundary} in the header, but got ${boundary} in the request body`);
      }
      boundary ??= parsedBoundary;
      if (boundary) {
        assertValidBoundary(boundary);
      } else {
        boundary = generateBoundary();
      }
      request.headers.set("Content-Type", `${contentType}; boundary=${boundary}`);
      await buildRequestBody(request, request.multipartBody.parts, boundary);
      request.multipartBody = void 0;
      return next(request);
    }
  };
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/pipeline.js
function createEmptyPipeline2() {
  return createEmptyPipeline();
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/log.js
var logger5 = createClientLogger2("core-rest-pipeline");

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/policies/logPolicy.js
function logPolicy2(options = {}) {
  return logPolicy({
    logger: logger5.info,
    ...options
  });
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/policies/redirectPolicy.js
function redirectPolicy2(options = {}) {
  return redirectPolicy(options);
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/util/userAgentPlatform.js
import os2 from "os";
import process5 from "process";
function getHeaderName2() {
  return "User-Agent";
}
async function setPlatformSpecificData2(map) {
  if (process5 && process5.versions) {
    const osInfo = `${os2.type()} ${os2.release()}; ${os2.arch()}`;
    if (process5.versions.bun) {
      map.set("Bun", `${process5.versions.bun} (${osInfo})`);
    } else if (process5.versions.deno) {
      map.set("Deno", `${process5.versions.deno} (${osInfo})`);
    } else if (process5.versions.node) {
      map.set("Node", `${process5.versions.node} (${osInfo})`);
    }
  }
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/constants.js
var SDK_VERSION3 = "1.24.0";
var DEFAULT_RETRY_POLICY_COUNT2 = 3;

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/util/userAgent.js
function getUserAgentString(telemetryInfo) {
  const parts = [];
  for (const [key, value] of telemetryInfo) {
    const token = value ? `${key}/${value}` : key;
    parts.push(token);
  }
  return parts.join(" ");
}
function getUserAgentHeaderName2() {
  return getHeaderName2();
}
async function getUserAgentValue2(prefix) {
  const runtimeInfo = /* @__PURE__ */ new Map();
  runtimeInfo.set("core-rest-pipeline", SDK_VERSION3);
  await setPlatformSpecificData2(runtimeInfo);
  const defaultAgent = getUserAgentString(runtimeInfo);
  const userAgentValue = prefix ? `${prefix} ${defaultAgent}` : defaultAgent;
  return userAgentValue;
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/policies/userAgentPolicy.js
var UserAgentHeaderName2 = getUserAgentHeaderName2();
var userAgentPolicyName2 = "userAgentPolicy";
function userAgentPolicy2(options = {}) {
  const userAgentValue = getUserAgentValue2(options.userAgentPrefix);
  return {
    name: userAgentPolicyName2,
    async sendRequest(request, next) {
      if (!request.headers.has(UserAgentHeaderName2)) {
        request.headers.set(UserAgentHeaderName2, await userAgentValue);
      }
      return next(request);
    }
  };
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/util/file.js
var rawContent = /* @__PURE__ */ Symbol("rawContent");
function hasRawContent(x) {
  return typeof x[rawContent] === "function";
}
function getRawContent(blob) {
  if (hasRawContent(blob)) {
    return blob[rawContent]();
  } else {
    return blob;
  }
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/policies/multipartPolicy.js
var multipartPolicyName2 = multipartPolicyName;
function multipartPolicy2() {
  const tspPolicy = multipartPolicy();
  return {
    name: multipartPolicyName2,
    sendRequest: async (request, next) => {
      if (request.multipartBody) {
        for (const part of request.multipartBody.parts) {
          if (hasRawContent(part.body)) {
            part.body = getRawContent(part.body);
          }
        }
      }
      return tspPolicy.sendRequest(request, next);
    }
  };
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/policies/decompressResponsePolicy.js
function decompressResponsePolicy2() {
  return decompressResponsePolicy();
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/policies/defaultRetryPolicy.js
function defaultRetryPolicy2(options = {}) {
  return defaultRetryPolicy(options);
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/policies/formDataPolicy.js
function formDataPolicy2() {
  return formDataPolicy();
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/policies/proxyPolicy.js
function proxyPolicy2(proxySettings, options) {
  return proxyPolicy(proxySettings, options);
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/policies/setClientRequestIdPolicy.js
var setClientRequestIdPolicyName = "setClientRequestIdPolicy";
function setClientRequestIdPolicy(requestIdHeaderName = "x-ms-client-request-id") {
  return {
    name: setClientRequestIdPolicyName,
    async sendRequest(request, next) {
      if (!request.headers.has(requestIdHeaderName)) {
        request.headers.set(requestIdHeaderName, request.requestId);
      }
      return next(request);
    }
  };
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/policies/agentPolicy.js
function agentPolicy2(agent) {
  return agentPolicy(agent);
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/policies/tlsPolicy.js
function tlsPolicy2(tlsSettings) {
  return tlsPolicy(tlsSettings);
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/restError.js
var RestError2 = RestError;
function isRestError2(e) {
  return isRestError(e);
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/policies/tracingPolicy.js
var tracingPolicyName = "tracingPolicy";
function tracingPolicy(options = {}) {
  const userAgentPromise = getUserAgentValue2(options.userAgentPrefix);
  const sanitizer = new Sanitizer({
    additionalAllowedQueryParameters: options.additionalAllowedQueryParameters
  });
  const tracingClient2 = tryCreateTracingClient();
  return {
    name: tracingPolicyName,
    async sendRequest(request, next) {
      if (!tracingClient2) {
        return next(request);
      }
      const userAgent = await userAgentPromise;
      const spanAttributes = {
        "http.url": sanitizer.sanitizeUrl(request.url),
        "http.method": request.method,
        "http.user_agent": userAgent,
        requestId: request.requestId
      };
      if (userAgent) {
        spanAttributes["http.user_agent"] = userAgent;
      }
      const { span, tracingContext } = tryCreateSpan(tracingClient2, request, spanAttributes) ?? {};
      if (!span || !tracingContext) {
        return next(request);
      }
      try {
        const response = await tracingClient2.withContext(tracingContext, next, request);
        tryProcessResponse(span, response);
        return response;
      } catch (err) {
        tryProcessError(span, err);
        throw err;
      }
    }
  };
}
function tryCreateTracingClient() {
  try {
    return createTracingClient({
      namespace: "",
      packageName: "@azure/core-rest-pipeline",
      packageVersion: SDK_VERSION3
    });
  } catch (e) {
    logger5.warning(`Error when creating the TracingClient: ${getErrorMessage(e)}`);
    return void 0;
  }
}
function tryCreateSpan(tracingClient2, request, spanAttributes) {
  try {
    const { span, updatedOptions } = tracingClient2.startSpan(`HTTP ${request.method}`, { tracingOptions: request.tracingOptions }, {
      spanKind: "client",
      spanAttributes
    });
    if (!span.isRecording()) {
      span.end();
      return void 0;
    }
    const headers = tracingClient2.createRequestHeaders(updatedOptions.tracingOptions.tracingContext);
    for (const [key, value] of Object.entries(headers)) {
      request.headers.set(key, value);
    }
    return { span, tracingContext: updatedOptions.tracingOptions.tracingContext };
  } catch (e) {
    logger5.warning(`Skipping creating a tracing span due to an error: ${getErrorMessage(e)}`);
    return void 0;
  }
}
function tryProcessError(span, error) {
  try {
    span.setStatus({
      status: "error",
      error: isError2(error) ? error : void 0
    });
    if (isRestError2(error) && error.statusCode) {
      span.setAttribute("http.status_code", error.statusCode);
    }
    span.end();
  } catch (e) {
    logger5.warning(`Skipping tracing span processing due to an error: ${getErrorMessage(e)}`);
  }
}
function tryProcessResponse(span, response) {
  try {
    span.setAttribute("http.status_code", response.status);
    const serviceRequestId = response.headers.get("x-ms-request-id");
    if (serviceRequestId) {
      span.setAttribute("serviceRequestId", serviceRequestId);
    }
    if (response.status >= 400) {
      span.setStatus({
        status: "error"
      });
    }
    span.end();
  } catch (e) {
    logger5.warning(`Skipping tracing span processing due to an error: ${getErrorMessage(e)}`);
  }
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/util/wrapAbortSignal.js
function wrapAbortSignalLike(abortSignalLike) {
  if (abortSignalLike instanceof AbortSignal) {
    return { abortSignal: abortSignalLike };
  }
  if (abortSignalLike.aborted) {
    return {
      abortSignal: AbortSignal.abort("reason" in abortSignalLike ? abortSignalLike.reason : void 0)
    };
  }
  const controller = new AbortController();
  let needsCleanup = true;
  function cleanup() {
    if (needsCleanup) {
      abortSignalLike.removeEventListener("abort", listener);
      needsCleanup = false;
    }
  }
  function listener() {
    controller.abort("reason" in abortSignalLike ? abortSignalLike.reason : void 0);
    cleanup();
  }
  abortSignalLike.addEventListener("abort", listener);
  return { abortSignal: controller.signal, cleanup };
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/policies/wrapAbortSignalLikePolicy.js
var wrapAbortSignalLikePolicyName = "wrapAbortSignalLikePolicy";
function wrapAbortSignalLikePolicy() {
  return {
    name: wrapAbortSignalLikePolicyName,
    sendRequest: async (request, next) => {
      if (!request.abortSignal) {
        return next(request);
      }
      const { abortSignal, cleanup } = wrapAbortSignalLike(request.abortSignal);
      request.abortSignal = abortSignal;
      try {
        return await next(request);
      } finally {
        cleanup?.();
      }
    }
  };
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/createPipelineFromOptions.js
function createPipelineFromOptions2(options) {
  const pipeline = createEmptyPipeline2();
  if (isNodeLike2) {
    if (options.agent) {
      pipeline.addPolicy(agentPolicy2(options.agent));
    }
    if (options.tlsOptions) {
      pipeline.addPolicy(tlsPolicy2(options.tlsOptions));
    }
    pipeline.addPolicy(proxyPolicy2(options.proxyOptions));
    pipeline.addPolicy(decompressResponsePolicy2());
  }
  pipeline.addPolicy(wrapAbortSignalLikePolicy());
  pipeline.addPolicy(formDataPolicy2(), { beforePolicies: [multipartPolicyName2] });
  pipeline.addPolicy(userAgentPolicy2(options.userAgentOptions));
  pipeline.addPolicy(setClientRequestIdPolicy(options.telemetryOptions?.clientRequestIdHeaderName));
  pipeline.addPolicy(multipartPolicy2(), { afterPhase: "Deserialize" });
  pipeline.addPolicy(defaultRetryPolicy2(options.retryOptions), { phase: "Retry" });
  pipeline.addPolicy(tracingPolicy({ ...options.userAgentOptions, ...options.loggingOptions }), {
    afterPhase: "Retry"
  });
  if (isNodeLike2) {
    pipeline.addPolicy(redirectPolicy2(options.redirectOptions), { afterPhase: "Retry" });
  }
  pipeline.addPolicy(logPolicy2(options.loggingOptions), { afterPhase: "Sign" });
  return pipeline;
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/defaultHttpClient.js
function createDefaultHttpClient2() {
  const client = createDefaultHttpClient();
  return {
    async sendRequest(request) {
      const { abortSignal, cleanup } = request.abortSignal ? wrapAbortSignalLike(request.abortSignal) : {};
      try {
        request.abortSignal = abortSignal;
        return await client.sendRequest(request);
      } finally {
        cleanup?.();
      }
    }
  };
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/httpHeaders.js
function createHttpHeaders2(rawHeaders) {
  return createHttpHeaders(rawHeaders);
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/pipelineRequest.js
function createPipelineRequest2(options) {
  return createPipelineRequest(options);
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/policies/retryPolicy.js
var retryPolicyLogger2 = createClientLogger2("core-rest-pipeline retryPolicy");
function retryPolicy2(strategies, options = { maxRetries: DEFAULT_RETRY_POLICY_COUNT2 }) {
  return retryPolicy(strategies, {
    logger: retryPolicyLogger2,
    ...options
  });
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/util/tokenCycler.js
var DEFAULT_CYCLER_OPTIONS = {
  forcedRefreshWindowInMs: 1e3,
  // Force waiting for a refresh 1s before the token expires
  retryIntervalInMs: 3e3,
  // Allow refresh attempts every 3s
  refreshWindowInMs: 1e3 * 60 * 2
  // Start refreshing 2m before expiry
};
async function beginRefresh(getAccessToken, retryIntervalInMs, refreshTimeout) {
  async function tryGetAccessToken() {
    if (Date.now() < refreshTimeout) {
      try {
        return await getAccessToken();
      } catch {
        return null;
      }
    } else {
      const finalToken = await getAccessToken();
      if (finalToken === null) {
        throw new Error("Failed to refresh access token.");
      }
      return finalToken;
    }
  }
  let token = await tryGetAccessToken();
  while (token === null) {
    await delay2(retryIntervalInMs);
    token = await tryGetAccessToken();
  }
  return token;
}
function createTokenCycler(credential, tokenCyclerOptions) {
  let refreshWorker = null;
  let token = null;
  let tenantId;
  const options = {
    ...DEFAULT_CYCLER_OPTIONS,
    ...tokenCyclerOptions
  };
  const cycler = {
    /**
     * Produces true if a refresh job is currently in progress.
     */
    get isRefreshing() {
      return refreshWorker !== null;
    },
    /**
     * Produces true if the cycler SHOULD refresh (we are within the refresh
     * window and not already refreshing)
     */
    get shouldRefresh() {
      if (token === null) {
        return true;
      }
      if (cycler.isRefreshing) {
        return false;
      }
      if (token.refreshAfterTimestamp && token.refreshAfterTimestamp < Date.now()) {
        return true;
      }
      return token.expiresOnTimestamp - options.refreshWindowInMs < Date.now();
    },
    /**
     * Produces true if the cycler MUST refresh (null or nearly-expired
     * token).
     */
    get mustRefresh() {
      return token === null || token.expiresOnTimestamp - options.forcedRefreshWindowInMs < Date.now();
    }
  };
  function refresh(scopes, getTokenOptions) {
    if (!cycler.isRefreshing) {
      const tryGetAccessToken = () => credential.getToken(scopes, getTokenOptions);
      refreshWorker = beginRefresh(
        tryGetAccessToken,
        options.retryIntervalInMs,
        // If we don't have a token, then we should timeout immediately
        token?.expiresOnTimestamp ?? Date.now()
      ).then((_token) => {
        refreshWorker = null;
        token = _token;
        tenantId = getTokenOptions.tenantId;
        return token;
      }).catch((reason) => {
        refreshWorker = null;
        token = null;
        tenantId = void 0;
        throw reason;
      });
    }
    return refreshWorker;
  }
  return async (scopes, tokenOptions) => {
    const hasClaimChallenge = Boolean(tokenOptions.claims);
    const tenantIdChanged = tenantId !== tokenOptions.tenantId;
    if (hasClaimChallenge) {
      token = null;
    }
    const mustRefresh = tenantIdChanged || hasClaimChallenge || cycler.mustRefresh;
    if (mustRefresh) {
      return refresh(scopes, tokenOptions);
    }
    if (cycler.shouldRefresh) {
      refresh(scopes, tokenOptions);
    }
    return token;
  };
}

// ../../node_modules/@azure/core-rest-pipeline/dist/esm/policies/bearerTokenAuthenticationPolicy.js
var bearerTokenAuthenticationPolicyName = "bearerTokenAuthenticationPolicy";
async function trySendRequest(request, next) {
  try {
    return [await next(request), void 0];
  } catch (e) {
    if (isRestError2(e) && e.response) {
      return [e.response, e];
    } else {
      throw e;
    }
  }
}
async function defaultAuthorizeRequest(options) {
  const { scopes, getAccessToken, request } = options;
  const getTokenOptions = {
    abortSignal: request.abortSignal,
    tracingOptions: request.tracingOptions,
    enableCae: true
  };
  const accessToken = await getAccessToken(scopes, getTokenOptions);
  if (accessToken) {
    options.request.headers.set("Authorization", `Bearer ${accessToken.token}`);
  }
}
function isChallengeResponse(response) {
  return response.status === 401 && response.headers.has("WWW-Authenticate");
}
async function authorizeRequestOnCaeChallenge(onChallengeOptions, caeClaims) {
  const { scopes } = onChallengeOptions;
  const accessToken = await onChallengeOptions.getAccessToken(scopes, {
    enableCae: true,
    claims: caeClaims
  });
  if (!accessToken) {
    return false;
  }
  onChallengeOptions.request.headers.set("Authorization", `${accessToken.tokenType ?? "Bearer"} ${accessToken.token}`);
  return true;
}
function bearerTokenAuthenticationPolicy(options) {
  const { credential, scopes, challengeCallbacks } = options;
  const logger27 = options.logger || logger5;
  const callbacks = {
    authorizeRequest: challengeCallbacks?.authorizeRequest?.bind(challengeCallbacks) ?? defaultAuthorizeRequest,
    authorizeRequestOnChallenge: challengeCallbacks?.authorizeRequestOnChallenge?.bind(challengeCallbacks)
  };
  const getAccessToken = credential ? createTokenCycler(
    credential
    /* , options */
  ) : () => Promise.resolve(null);
  return {
    name: bearerTokenAuthenticationPolicyName,
    /**
     * If there's no challenge parameter:
     * - It will try to retrieve the token using the cache, or the credential's getToken.
     * - Then it will try the next policy with or without the retrieved token.
     *
     * It uses the challenge parameters to:
     * - Skip a first attempt to get the token from the credential if there's no cached token,
     *   since it expects the token to be retrievable only after the challenge.
     * - Prepare the outgoing request if the `prepareRequest` method has been provided.
     * - Send an initial request to receive the challenge if it fails.
     * - Process a challenge if the response contains it.
     * - Retrieve a token with the challenge information, then re-send the request.
     */
    async sendRequest(request, next) {
      if (!request.url.toLowerCase().startsWith("https://")) {
        throw new Error("Bearer token authentication is not permitted for non-TLS protected (non-https) URLs.");
      }
      await callbacks.authorizeRequest({
        scopes: Array.isArray(scopes) ? scopes : [scopes],
        request,
        getAccessToken,
        logger: logger27
      });
      let response;
      let error;
      let shouldSendRequest;
      [response, error] = await trySendRequest(request, next);
      if (isChallengeResponse(response)) {
        let claims = getCaeChallengeClaims(response.headers.get("WWW-Authenticate"));
        if (claims) {
          let parsedClaim;
          try {
            parsedClaim = atob(claims);
          } catch (e) {
            logger27.warning(`The WWW-Authenticate header contains "claims" that cannot be parsed. Unable to perform the Continuous Access Evaluation authentication flow. Unparsable claims: ${claims}`);
            return response;
          }
          shouldSendRequest = await authorizeRequestOnCaeChallenge({
            scopes: Array.isArray(scopes) ? scopes : [scopes],
            response,
            request,
            getAccessToken,
            logger: logger27
          }, parsedClaim);
          if (shouldSendRequest) {
            [response, error] = await trySendRequest(request, next);
          }
        } else if (callbacks.authorizeRequestOnChallenge) {
          shouldSendRequest = await callbacks.authorizeRequestOnChallenge({
            scopes: Array.isArray(scopes) ? scopes : [scopes],
            request,
            response,
            getAccessToken,
            logger: logger27
          });
          if (shouldSendRequest) {
            [response, error] = await trySendRequest(request, next);
          }
          if (isChallengeResponse(response)) {
            claims = getCaeChallengeClaims(response.headers.get("WWW-Authenticate") ?? "");
            if (claims) {
              let parsedClaim;
              try {
                parsedClaim = atob(claims);
              } catch (e) {
                logger27.warning(`The WWW-Authenticate header contains "claims" that cannot be parsed. Unable to perform the Continuous Access Evaluation authentication flow. Unparsable claims: ${claims}`);
                return response;
              }
              shouldSendRequest = await authorizeRequestOnCaeChallenge({
                scopes: Array.isArray(scopes) ? scopes : [scopes],
                response,
                request,
                getAccessToken,
                logger: logger27
              }, parsedClaim);
              if (shouldSendRequest) {
                [response, error] = await trySendRequest(request, next);
              }
            }
          }
        }
      }
      if (error) {
        throw error;
      } else {
        return response;
      }
    }
  };
}
function parseChallenges(challenges) {
  const challengeRegex = /(\w+)\s+((?:\w+=(?:"[^"]*"|[^,]*),?\s*)+)/g;
  const paramRegex = /(\w+)="([^"]*)"/g;
  const parsedChallenges = [];
  let match;
  while ((match = challengeRegex.exec(challenges)) !== null) {
    const scheme = match[1];
    const paramsString = match[2];
    const params = {};
    let paramMatch;
    while ((paramMatch = paramRegex.exec(paramsString)) !== null) {
      params[paramMatch[1]] = paramMatch[2];
    }
    parsedChallenges.push({ scheme, params });
  }
  return parsedChallenges;
}
function getCaeChallengeClaims(challenges) {
  if (!challenges) {
    return;
  }
  const parsedChallenges = parseChallenges(challenges);
  return parsedChallenges.find((x) => x.scheme === "Bearer" && x.params.claims && x.params.error === "insufficient_claims")?.params.claims;
}

// ../../node_modules/@azure/core-client/dist/esm/state.js
var import_state_cjs = __toESM(require_state_cjs(), 1);
var state2 = import_state_cjs.state;

// ../../node_modules/@azure/core-client/dist/esm/operationHelpers.js
function getOperationArgumentValueFromParameter(operationArguments, parameter, fallbackObject) {
  let parameterPath = parameter.parameterPath;
  const parameterMapper = parameter.mapper;
  let value;
  if (typeof parameterPath === "string") {
    parameterPath = [parameterPath];
  }
  if (Array.isArray(parameterPath)) {
    if (parameterPath.length > 0) {
      if (parameterMapper.isConstant) {
        value = parameterMapper.defaultValue;
      } else {
        let propertySearchResult = getPropertyFromParameterPath(operationArguments, parameterPath);
        if (!propertySearchResult.propertyFound && fallbackObject) {
          propertySearchResult = getPropertyFromParameterPath(fallbackObject, parameterPath);
        }
        let useDefaultValue = false;
        if (!propertySearchResult.propertyFound) {
          useDefaultValue = parameterMapper.required || parameterPath[0] === "options" && parameterPath.length === 2;
        }
        value = useDefaultValue ? parameterMapper.defaultValue : propertySearchResult.propertyValue;
      }
    }
  } else {
    if (parameterMapper.required) {
      value = {};
    }
    for (const [propertyName, propertyPath] of Object.entries(parameterPath)) {
      const propertyMapper = parameterMapper.type.modelProperties[propertyName];
      const propertyValue = getOperationArgumentValueFromParameter(operationArguments, {
        parameterPath: propertyPath,
        mapper: propertyMapper
      }, fallbackObject);
      if (propertyValue !== void 0) {
        if (!value) {
          value = {};
        }
        Object.defineProperty(value, propertyName, {
          value: propertyValue,
          enumerable: true,
          configurable: true,
          writable: true
        });
      }
    }
  }
  return value;
}
function getPropertyFromParameterPath(parent, parameterPath) {
  const result = { propertyFound: false };
  let i = 0;
  for (; i < parameterPath.length; ++i) {
    const parameterPathPart = parameterPath[i];
    if (parent && parameterPathPart in parent) {
      parent = parent[parameterPathPart];
    } else {
      break;
    }
  }
  if (i === parameterPath.length) {
    result.propertyValue = parent;
    result.propertyFound = true;
  }
  return result;
}
var originalRequestSymbol = /* @__PURE__ */ Symbol.for("@azure/core-client original request");
function hasOriginalRequest(request) {
  return originalRequestSymbol in request;
}
function getOperationRequestInfo(request) {
  if (hasOriginalRequest(request)) {
    return getOperationRequestInfo(request[originalRequestSymbol]);
  }
  let info = state2.operationRequestMap.get(request);
  if (!info) {
    info = {};
    state2.operationRequestMap.set(request, info);
  }
  return info;
}

// ../../node_modules/@azure/core-client/dist/esm/deserializationPolicy.js
var defaultJsonContentTypes = ["application/json", "text/json"];
var defaultXmlContentTypes = ["application/xml", "application/atom+xml"];
var deserializationPolicyName = "deserializationPolicy";
function deserializationPolicy(options = {}) {
  const jsonContentTypes = options.expectedContentTypes?.json ?? defaultJsonContentTypes;
  const xmlContentTypes = options.expectedContentTypes?.xml ?? defaultXmlContentTypes;
  const parseXML = options.parseXML;
  const serializerOptions = options.serializerOptions;
  const updatedOptions = {
    xml: {
      rootName: serializerOptions?.xml.rootName ?? "",
      includeRoot: serializerOptions?.xml.includeRoot ?? false,
      xmlCharKey: serializerOptions?.xml.xmlCharKey ?? XML_CHARKEY
    }
  };
  return {
    name: deserializationPolicyName,
    async sendRequest(request, next) {
      const response = await next(request);
      return deserializeResponseBody(jsonContentTypes, xmlContentTypes, response, updatedOptions, parseXML);
    }
  };
}
function getOperationResponseMap(parsedResponse) {
  let result;
  const request = parsedResponse.request;
  const operationInfo = getOperationRequestInfo(request);
  const operationSpec = operationInfo?.operationSpec;
  if (operationSpec) {
    if (!operationInfo?.operationResponseGetter) {
      result = operationSpec.responses[parsedResponse.status];
    } else {
      result = operationInfo?.operationResponseGetter(operationSpec, parsedResponse);
    }
  }
  return result;
}
function shouldDeserializeResponse(parsedResponse) {
  const request = parsedResponse.request;
  const operationInfo = getOperationRequestInfo(request);
  const shouldDeserialize = operationInfo?.shouldDeserialize;
  let result;
  if (shouldDeserialize === void 0) {
    result = true;
  } else if (typeof shouldDeserialize === "boolean") {
    result = shouldDeserialize;
  } else {
    result = shouldDeserialize(parsedResponse);
  }
  return result;
}
async function deserializeResponseBody(jsonContentTypes, xmlContentTypes, response, options, parseXML) {
  const parsedResponse = await parse(jsonContentTypes, xmlContentTypes, response, options, parseXML);
  if (!shouldDeserializeResponse(parsedResponse)) {
    return parsedResponse;
  }
  const operationInfo = getOperationRequestInfo(parsedResponse.request);
  const operationSpec = operationInfo?.operationSpec;
  if (!operationSpec || !operationSpec.responses) {
    return parsedResponse;
  }
  const responseSpec = getOperationResponseMap(parsedResponse);
  const { error, shouldReturnResponse } = handleErrorResponse(parsedResponse, operationSpec, responseSpec, options);
  if (error) {
    throw error;
  } else if (shouldReturnResponse) {
    return parsedResponse;
  }
  if (responseSpec) {
    if (responseSpec.bodyMapper) {
      let valueToDeserialize = parsedResponse.parsedBody;
      if (operationSpec.isXML && responseSpec.bodyMapper.type.name === MapperTypeNames.Sequence) {
        valueToDeserialize = typeof valueToDeserialize === "object" ? valueToDeserialize[responseSpec.bodyMapper.xmlElementName] : [];
      }
      try {
        parsedResponse.parsedBody = operationSpec.serializer.deserialize(responseSpec.bodyMapper, valueToDeserialize, "operationRes.parsedBody", options);
      } catch (deserializeError) {
        const restError = new RestError2(`Error ${deserializeError} occurred in deserializing the responseBody - ${parsedResponse.bodyAsText}`, {
          statusCode: parsedResponse.status,
          request: parsedResponse.request,
          response: parsedResponse
        });
        throw restError;
      }
    } else if (operationSpec.httpMethod === "HEAD") {
      parsedResponse.parsedBody = response.status >= 200 && response.status < 300;
    }
    if (responseSpec.headersMapper) {
      parsedResponse.parsedHeaders = operationSpec.serializer.deserialize(responseSpec.headersMapper, parsedResponse.headers.toJSON(), "operationRes.parsedHeaders", { xml: {}, ignoreUnknownProperties: true });
    }
  }
  return parsedResponse;
}
function isOperationSpecEmpty(operationSpec) {
  const expectedStatusCodes = Object.keys(operationSpec.responses);
  return expectedStatusCodes.length === 0 || expectedStatusCodes.length === 1 && expectedStatusCodes[0] === "default";
}
function handleErrorResponse(parsedResponse, operationSpec, responseSpec, options) {
  const isSuccessByStatus = 200 <= parsedResponse.status && parsedResponse.status < 300;
  const isExpectedStatusCode = isOperationSpecEmpty(operationSpec) ? isSuccessByStatus : !!responseSpec;
  if (isExpectedStatusCode) {
    if (responseSpec) {
      if (!responseSpec.isError) {
        return { error: null, shouldReturnResponse: false };
      }
    } else {
      return { error: null, shouldReturnResponse: false };
    }
  }
  const errorResponseSpec = responseSpec ?? operationSpec.responses.default;
  const initialErrorMessage = parsedResponse.request.streamResponseStatusCodes?.has(parsedResponse.status) ? `Unexpected status code: ${parsedResponse.status}` : parsedResponse.bodyAsText;
  const error = new RestError2(initialErrorMessage, {
    statusCode: parsedResponse.status,
    request: parsedResponse.request,
    response: parsedResponse
  });
  if (!errorResponseSpec && !(parsedResponse.parsedBody?.error?.code && parsedResponse.parsedBody?.error?.message)) {
    throw error;
  }
  const defaultBodyMapper = errorResponseSpec?.bodyMapper;
  const defaultHeadersMapper = errorResponseSpec?.headersMapper;
  try {
    if (parsedResponse.parsedBody) {
      const parsedBody = parsedResponse.parsedBody;
      let deserializedError;
      if (defaultBodyMapper) {
        let valueToDeserialize = parsedBody;
        if (operationSpec.isXML && defaultBodyMapper.type.name === MapperTypeNames.Sequence) {
          valueToDeserialize = [];
          const elementName = defaultBodyMapper.xmlElementName;
          if (typeof parsedBody === "object" && elementName) {
            valueToDeserialize = parsedBody[elementName];
          }
        }
        deserializedError = operationSpec.serializer.deserialize(defaultBodyMapper, valueToDeserialize, "error.response.parsedBody", options);
      }
      const internalError = parsedBody.error || deserializedError || parsedBody;
      error.code = internalError.code;
      if (internalError.message) {
        error.message = internalError.message;
      }
      if (defaultBodyMapper) {
        error.response.parsedBody = deserializedError;
      }
    }
    if (parsedResponse.headers && defaultHeadersMapper) {
      error.response.parsedHeaders = operationSpec.serializer.deserialize(defaultHeadersMapper, parsedResponse.headers.toJSON(), "operationRes.parsedHeaders");
    }
  } catch (defaultError) {
    error.message = `Error "${defaultError.message}" occurred in deserializing the responseBody - "${parsedResponse.bodyAsText}" for the default response.`;
  }
  return { error, shouldReturnResponse: false };
}
async function parse(jsonContentTypes, xmlContentTypes, operationResponse, opts, parseXML) {
  if (!operationResponse.request.streamResponseStatusCodes?.has(operationResponse.status) && operationResponse.bodyAsText) {
    const text = operationResponse.bodyAsText;
    const contentType = operationResponse.headers.get("Content-Type") || "";
    const contentComponents = !contentType ? [] : contentType.split(";").map((component) => component.toLowerCase());
    try {
      if (contentComponents.length === 0 || contentComponents.some((component) => jsonContentTypes.indexOf(component) !== -1)) {
        operationResponse.parsedBody = JSON.parse(text);
        return operationResponse;
      } else if (contentComponents.some((component) => xmlContentTypes.indexOf(component) !== -1)) {
        if (!parseXML) {
          throw new Error("Parsing XML not supported.");
        }
        const body = await parseXML(text, opts.xml);
        operationResponse.parsedBody = body;
        return operationResponse;
      }
    } catch (err) {
      const msg = `Error "${err}" occurred while parsing the response body - ${operationResponse.bodyAsText}.`;
      const errCode = err.code || RestError2.PARSE_ERROR;
      const e = new RestError2(msg, {
        code: errCode,
        statusCode: operationResponse.status,
        request: operationResponse.request,
        response: operationResponse
      });
      throw e;
    }
  }
  return operationResponse;
}

// ../../node_modules/@azure/core-client/dist/esm/interfaceHelpers.js
function getStreamingResponseStatusCodes(operationSpec) {
  const result = /* @__PURE__ */ new Set();
  for (const [statusCode, operationResponse] of Object.entries(operationSpec.responses)) {
    if (operationResponse.bodyMapper && operationResponse.bodyMapper.type.name === MapperTypeNames.Stream) {
      result.add(Number(statusCode));
    }
  }
  return result;
}
function getPathStringFromParameter(parameter) {
  const { parameterPath, mapper } = parameter;
  let result;
  if (typeof parameterPath === "string") {
    result = parameterPath;
  } else if (Array.isArray(parameterPath)) {
    result = parameterPath.join(".");
  } else {
    result = mapper.serializedName;
  }
  return result;
}

// ../../node_modules/@azure/core-client/dist/esm/serializationPolicy.js
var serializationPolicyName = "serializationPolicy";
function serializationPolicy(options = {}) {
  const stringifyXML = options.stringifyXML;
  return {
    name: serializationPolicyName,
    sendRequest(request, next) {
      const operationInfo = getOperationRequestInfo(request);
      const operationSpec = operationInfo?.operationSpec;
      const operationArguments = operationInfo?.operationArguments;
      if (operationSpec && operationArguments) {
        serializeHeaders(request, operationArguments, operationSpec);
        serializeRequestBody(request, operationArguments, operationSpec, stringifyXML);
      }
      return next(request);
    }
  };
}
function serializeHeaders(request, operationArguments, operationSpec) {
  if (operationSpec.headerParameters) {
    for (const headerParameter of operationSpec.headerParameters) {
      let headerValue = getOperationArgumentValueFromParameter(operationArguments, headerParameter);
      if (headerValue !== null && headerValue !== void 0 || headerParameter.mapper.required) {
        headerValue = operationSpec.serializer.serialize(headerParameter.mapper, headerValue, getPathStringFromParameter(headerParameter));
        const headerCollectionPrefix = headerParameter.mapper.headerCollectionPrefix;
        if (headerCollectionPrefix) {
          for (const key of Object.keys(headerValue)) {
            request.headers.set(headerCollectionPrefix + key, headerValue[key]);
          }
        } else {
          request.headers.set(headerParameter.mapper.serializedName || getPathStringFromParameter(headerParameter), headerValue);
        }
      }
    }
  }
  const customHeaders = operationArguments.options?.requestOptions?.customHeaders;
  if (customHeaders) {
    for (const customHeaderName of Object.keys(customHeaders)) {
      request.headers.set(customHeaderName, customHeaders[customHeaderName]);
    }
  }
}
function serializeRequestBody(request, operationArguments, operationSpec, stringifyXML = function() {
  throw new Error("XML serialization unsupported!");
}) {
  const serializerOptions = operationArguments.options?.serializerOptions;
  const updatedOptions = {
    xml: {
      rootName: serializerOptions?.xml.rootName ?? "",
      includeRoot: serializerOptions?.xml.includeRoot ?? false,
      xmlCharKey: serializerOptions?.xml.xmlCharKey ?? XML_CHARKEY
    }
  };
  const xmlCharKey = updatedOptions.xml.xmlCharKey;
  if (operationSpec.requestBody && operationSpec.requestBody.mapper) {
    request.body = getOperationArgumentValueFromParameter(operationArguments, operationSpec.requestBody);
    const bodyMapper = operationSpec.requestBody.mapper;
    const { required, serializedName, xmlName, xmlElementName, xmlNamespace, xmlNamespacePrefix, nullable } = bodyMapper;
    const typeName = bodyMapper.type.name;
    try {
      if (request.body !== void 0 && request.body !== null || nullable && request.body === null || required) {
        const requestBodyParameterPathString = getPathStringFromParameter(operationSpec.requestBody);
        request.body = operationSpec.serializer.serialize(bodyMapper, request.body, requestBodyParameterPathString, updatedOptions);
        const isStream = typeName === MapperTypeNames.Stream;
        if (operationSpec.isXML) {
          const xmlnsKey = xmlNamespacePrefix ? `xmlns:${xmlNamespacePrefix}` : "xmlns";
          const value = getXmlValueWithNamespace(xmlNamespace, xmlnsKey, typeName, request.body, updatedOptions);
          if (typeName === MapperTypeNames.Sequence) {
            request.body = stringifyXML(prepareXMLRootList(value, xmlElementName || xmlName || serializedName, xmlnsKey, xmlNamespace), { rootName: xmlName || serializedName, xmlCharKey });
          } else if (!isStream) {
            request.body = stringifyXML(value, {
              rootName: xmlName || serializedName,
              xmlCharKey
            });
          }
        } else if (typeName === MapperTypeNames.String && (operationSpec.contentType?.match("text/plain") || operationSpec.mediaType === "text")) {
          return;
        } else if (!isStream) {
          request.body = JSON.stringify(request.body);
        }
      }
    } catch (error) {
      throw new Error(`Error "${error.message}" occurred in serializing the payload - ${JSON.stringify(serializedName, void 0, "  ")}.`);
    }
  } else if (operationSpec.formDataParameters && operationSpec.formDataParameters.length > 0) {
    request.formData = {};
    for (const formDataParameter of operationSpec.formDataParameters) {
      const formDataParameterValue = getOperationArgumentValueFromParameter(operationArguments, formDataParameter);
      if (formDataParameterValue !== void 0 && formDataParameterValue !== null) {
        const formDataParameterPropertyName = formDataParameter.mapper.serializedName || getPathStringFromParameter(formDataParameter);
        request.formData[formDataParameterPropertyName] = operationSpec.serializer.serialize(formDataParameter.mapper, formDataParameterValue, getPathStringFromParameter(formDataParameter), updatedOptions);
      }
    }
  }
}
function getXmlValueWithNamespace(xmlNamespace, xmlnsKey, typeName, serializedValue, options) {
  if (xmlNamespace && !["Composite", "Sequence", "Dictionary"].includes(typeName)) {
    const result = {};
    result[options.xml.xmlCharKey] = serializedValue;
    result[XML_ATTRKEY] = { [xmlnsKey]: xmlNamespace };
    return result;
  }
  return serializedValue;
}
function prepareXMLRootList(obj, elementName, xmlNamespaceKey, xmlNamespace) {
  if (!Array.isArray(obj)) {
    obj = [obj];
  }
  if (!xmlNamespaceKey || !xmlNamespace) {
    return { [elementName]: obj };
  }
  const result = { [elementName]: obj };
  result[XML_ATTRKEY] = { [xmlNamespaceKey]: xmlNamespace };
  return result;
}

// ../../node_modules/@azure/core-client/dist/esm/pipeline.js
function createClientPipeline(options = {}) {
  const pipeline = createPipelineFromOptions2(options ?? {});
  if (options.credentialOptions) {
    pipeline.addPolicy(bearerTokenAuthenticationPolicy({
      credential: options.credentialOptions.credential,
      scopes: options.credentialOptions.credentialScopes
    }));
  }
  pipeline.addPolicy(serializationPolicy(options.serializationOptions), { phase: "Serialize" });
  pipeline.addPolicy(deserializationPolicy(options.deserializationOptions), {
    phase: "Deserialize"
  });
  return pipeline;
}

// ../../node_modules/@azure/core-client/dist/esm/httpClientCache.js
var cachedHttpClient;
function getCachedDefaultHttpClient() {
  if (!cachedHttpClient) {
    cachedHttpClient = createDefaultHttpClient2();
  }
  return cachedHttpClient;
}

// ../../node_modules/@azure/core-client/dist/esm/urlHelpers.js
var CollectionFormatToDelimiterMap = {
  CSV: ",",
  SSV: " ",
  Multi: "Multi",
  TSV: "	",
  Pipes: "|"
};
function getRequestUrl(baseUri, operationSpec, operationArguments, fallbackObject) {
  const urlReplacements = calculateUrlReplacements(operationSpec, operationArguments, fallbackObject);
  let isAbsolutePath = false;
  let requestUrl = replaceAll(baseUri, urlReplacements);
  if (operationSpec.path) {
    let path3 = replaceAll(operationSpec.path, urlReplacements);
    if (operationSpec.path === "/{nextLink}" && path3.startsWith("/")) {
      path3 = path3.substring(1);
    }
    if (isAbsoluteUrl(path3)) {
      requestUrl = path3;
      isAbsolutePath = true;
    } else {
      requestUrl = appendPath(requestUrl, path3);
    }
  }
  const { queryParams, sequenceParams } = calculateQueryParameters(operationSpec, operationArguments, fallbackObject);
  requestUrl = appendQueryParams(requestUrl, queryParams, sequenceParams, isAbsolutePath);
  return requestUrl;
}
function replaceAll(input, replacements) {
  let result = input;
  for (const [searchValue, replaceValue] of replacements) {
    result = result.split(searchValue).join(replaceValue);
  }
  return result;
}
function calculateUrlReplacements(operationSpec, operationArguments, fallbackObject) {
  const result = /* @__PURE__ */ new Map();
  if (operationSpec.urlParameters?.length) {
    for (const urlParameter of operationSpec.urlParameters) {
      let urlParameterValue = getOperationArgumentValueFromParameter(operationArguments, urlParameter, fallbackObject);
      const parameterPathString = getPathStringFromParameter(urlParameter);
      urlParameterValue = operationSpec.serializer.serialize(urlParameter.mapper, urlParameterValue, parameterPathString);
      if (!urlParameter.skipEncoding) {
        urlParameterValue = encodeURIComponent(urlParameterValue);
      }
      result.set(`{${urlParameter.mapper.serializedName || parameterPathString}}`, urlParameterValue);
    }
  }
  return result;
}
function isAbsoluteUrl(url) {
  return url.includes("://");
}
function appendPath(url, pathToAppend) {
  if (!pathToAppend) {
    return url;
  }
  const parsedUrl = new URL(url);
  let newPath = parsedUrl.pathname;
  if (!newPath.endsWith("/")) {
    newPath = `${newPath}/`;
  }
  if (pathToAppend.startsWith("/")) {
    pathToAppend = pathToAppend.substring(1);
  }
  const searchStart = pathToAppend.indexOf("?");
  if (searchStart !== -1) {
    const path3 = pathToAppend.substring(0, searchStart);
    const search = pathToAppend.substring(searchStart + 1);
    newPath = newPath + path3;
    if (search) {
      parsedUrl.search = parsedUrl.search ? `${parsedUrl.search}&${search}` : search;
    }
  } else {
    newPath = newPath + pathToAppend;
  }
  Object.assign(parsedUrl, { pathname: newPath });
  return parsedUrl.toString();
}
function calculateQueryParameters(operationSpec, operationArguments, fallbackObject) {
  const result = /* @__PURE__ */ new Map();
  const sequenceParams = /* @__PURE__ */ new Set();
  if (operationSpec.queryParameters?.length) {
    for (const queryParameter of operationSpec.queryParameters) {
      if (queryParameter.mapper.type.name === "Sequence" && queryParameter.mapper.serializedName) {
        sequenceParams.add(queryParameter.mapper.serializedName);
      }
      let queryParameterValue = getOperationArgumentValueFromParameter(operationArguments, queryParameter, fallbackObject);
      if (queryParameterValue !== void 0 && queryParameterValue !== null || queryParameter.mapper.required) {
        queryParameterValue = operationSpec.serializer.serialize(queryParameter.mapper, queryParameterValue, getPathStringFromParameter(queryParameter));
        const delimiter = queryParameter.collectionFormat ? CollectionFormatToDelimiterMap[queryParameter.collectionFormat] : "";
        if (Array.isArray(queryParameterValue)) {
          queryParameterValue = queryParameterValue.map((item) => {
            if (item === null || item === void 0) {
              return "";
            }
            return item;
          });
        }
        if (queryParameter.collectionFormat === "Multi" && queryParameterValue.length === 0) {
          continue;
        } else if (Array.isArray(queryParameterValue) && (queryParameter.collectionFormat === "SSV" || queryParameter.collectionFormat === "TSV")) {
          queryParameterValue = queryParameterValue.join(delimiter);
        }
        if (!queryParameter.skipEncoding) {
          if (Array.isArray(queryParameterValue)) {
            queryParameterValue = queryParameterValue.map((item) => {
              return encodeURIComponent(item);
            });
          } else {
            queryParameterValue = encodeURIComponent(queryParameterValue);
          }
        }
        if (Array.isArray(queryParameterValue) && (queryParameter.collectionFormat === "CSV" || queryParameter.collectionFormat === "Pipes")) {
          queryParameterValue = queryParameterValue.join(delimiter);
        }
        result.set(queryParameter.mapper.serializedName || getPathStringFromParameter(queryParameter), queryParameterValue);
      }
    }
  }
  return {
    queryParams: result,
    sequenceParams
  };
}
function simpleParseQueryParams(queryString) {
  const result = /* @__PURE__ */ new Map();
  if (!queryString || queryString[0] !== "?") {
    return result;
  }
  queryString = queryString.slice(1);
  const pairs = queryString.split("&");
  for (const pair of pairs) {
    const [name3, value] = pair.split("=", 2);
    const existingValue = result.get(name3);
    if (existingValue) {
      if (Array.isArray(existingValue)) {
        existingValue.push(value);
      } else {
        result.set(name3, [existingValue, value]);
      }
    } else {
      result.set(name3, value);
    }
  }
  return result;
}
function appendQueryParams(url, queryParams, sequenceParams, noOverwrite = false) {
  if (queryParams.size === 0) {
    return url;
  }
  const parsedUrl = new URL(url);
  const combinedParams = simpleParseQueryParams(parsedUrl.search);
  for (const [name3, value] of queryParams) {
    const existingValue = combinedParams.get(name3);
    if (Array.isArray(existingValue)) {
      if (Array.isArray(value)) {
        existingValue.push(...value);
        const valueSet = new Set(existingValue);
        combinedParams.set(name3, Array.from(valueSet));
      } else {
        existingValue.push(value);
      }
    } else if (existingValue) {
      if (Array.isArray(value)) {
        value.unshift(existingValue);
      } else if (sequenceParams.has(name3)) {
        combinedParams.set(name3, [existingValue, value]);
      }
      if (!noOverwrite) {
        combinedParams.set(name3, value);
      }
    } else {
      combinedParams.set(name3, value);
    }
  }
  const searchPieces = [];
  for (const [name3, value] of combinedParams) {
    if (typeof value === "string") {
      searchPieces.push(`${name3}=${value}`);
    } else if (Array.isArray(value)) {
      for (const subValue of value) {
        searchPieces.push(`${name3}=${subValue}`);
      }
    } else {
      searchPieces.push(`${name3}=${value}`);
    }
  }
  parsedUrl.search = searchPieces.length ? `?${searchPieces.join("&")}` : "";
  return parsedUrl.toString();
}

// ../../node_modules/@azure/core-client/dist/esm/log.js
var logger6 = createClientLogger2("core-client");

// ../../node_modules/@azure/core-client/dist/esm/serviceClient.js
var ServiceClient = class {
  /**
   * If specified, this is the base URI that requests will be made against for this ServiceClient.
   * If it is not specified, then all OperationSpecs must contain a baseUrl property.
   */
  _endpoint;
  /**
   * The default request content type for the service.
   * Used if no requestContentType is present on an OperationSpec.
   */
  _requestContentType;
  /**
   * Set to true if the request is sent over HTTP instead of HTTPS
   */
  _allowInsecureConnection;
  /**
   * The HTTP client that will be used to send requests.
   */
  _httpClient;
  /**
   * The pipeline used by this client to make requests
   */
  pipeline;
  /**
   * The ServiceClient constructor
   * @param options - The service client options that govern the behavior of the client.
   */
  constructor(options = {}) {
    this._requestContentType = options.requestContentType;
    this._endpoint = options.endpoint ?? options.baseUri;
    if (options.baseUri) {
      logger6.warning("The baseUri option for SDK Clients has been deprecated, please use endpoint instead.");
    }
    this._allowInsecureConnection = options.allowInsecureConnection;
    this._httpClient = options.httpClient || getCachedDefaultHttpClient();
    this.pipeline = options.pipeline || createDefaultPipeline2(options);
    if (options.additionalPolicies?.length) {
      for (const { policy, position } of options.additionalPolicies) {
        const afterPhase = position === "perRetry" ? "Sign" : void 0;
        this.pipeline.addPolicy(policy, {
          afterPhase
        });
      }
    }
  }
  /**
   * Send the provided httpRequest.
   */
  sendRequest(request) {
    return this.pipeline.sendRequest(this._httpClient, request);
  }
  /**
   * Send an HTTP request that is populated using the provided OperationSpec.
   * @typeParam T - The typed result of the request, based on the OperationSpec.
   * @param operationArguments - The arguments that the HTTP request's templated values will be populated from.
   * @param operationSpec - The OperationSpec to use to populate the httpRequest.
   */
  async sendOperationRequest(operationArguments, operationSpec) {
    const endpoint = operationSpec.baseUrl || this._endpoint;
    if (!endpoint) {
      throw new Error("If operationSpec.baseUrl is not specified, then the ServiceClient must have a endpoint string property that contains the base URL to use.");
    }
    const url = getRequestUrl(endpoint, operationSpec, operationArguments, this);
    const request = createPipelineRequest2({
      url
    });
    request.method = operationSpec.httpMethod;
    const operationInfo = getOperationRequestInfo(request);
    operationInfo.operationSpec = operationSpec;
    operationInfo.operationArguments = operationArguments;
    const contentType = operationSpec.contentType || this._requestContentType;
    if (contentType && operationSpec.requestBody) {
      request.headers.set("Content-Type", contentType);
    }
    const options = operationArguments.options;
    if (options) {
      const requestOptions = options.requestOptions;
      if (requestOptions) {
        if (requestOptions.timeout) {
          request.timeout = requestOptions.timeout;
        }
        if (requestOptions.onUploadProgress) {
          request.onUploadProgress = requestOptions.onUploadProgress;
        }
        if (requestOptions.onDownloadProgress) {
          request.onDownloadProgress = requestOptions.onDownloadProgress;
        }
        if (requestOptions.shouldDeserialize !== void 0) {
          operationInfo.shouldDeserialize = requestOptions.shouldDeserialize;
        }
        if (requestOptions.allowInsecureConnection) {
          request.allowInsecureConnection = true;
        }
      }
      if (options.abortSignal) {
        request.abortSignal = options.abortSignal;
      }
      if (options.tracingOptions) {
        request.tracingOptions = options.tracingOptions;
      }
    }
    if (this._allowInsecureConnection) {
      request.allowInsecureConnection = true;
    }
    if (request.streamResponseStatusCodes === void 0) {
      request.streamResponseStatusCodes = getStreamingResponseStatusCodes(operationSpec);
    }
    try {
      const rawResponse = await this.sendRequest(request);
      const flatResponse = flattenResponse(rawResponse, operationSpec.responses[rawResponse.status]);
      if (options?.onResponse) {
        options.onResponse(rawResponse, flatResponse);
      }
      return flatResponse;
    } catch (error) {
      if (typeof error === "object" && error?.response) {
        const rawResponse = error.response;
        const flatResponse = flattenResponse(rawResponse, operationSpec.responses[error.statusCode] || operationSpec.responses["default"]);
        error.details = flatResponse;
        if (options?.onResponse) {
          options.onResponse(rawResponse, flatResponse, error);
        }
      }
      throw error;
    }
  }
};
function createDefaultPipeline2(options) {
  const credentialScopes = getCredentialScopes(options);
  const credentialOptions = options.credential && credentialScopes ? { credentialScopes, credential: options.credential } : void 0;
  return createClientPipeline({
    ...options,
    credentialOptions
  });
}
function getCredentialScopes(options) {
  if (options.credentialScopes) {
    return options.credentialScopes;
  }
  if (options.endpoint) {
    return `${options.endpoint}/.default`;
  }
  if (options.baseUri) {
    return `${options.baseUri}/.default`;
  }
  if (options.credential) {
    throw new Error(`When using credentials, the ServiceClientOptions must contain either a endpoint or a credentialScopes. Unable to create a bearerTokenAuthenticationPolicy`);
  }
  return void 0;
}

// ../../node_modules/@azure/identity/dist/esm/util/identityTokenEndpoint.js
function getIdentityTokenEndpointSuffix(tenantId) {
  if (tenantId === "adfs") {
    return "oauth2/token";
  } else {
    return "oauth2/v2.0/token";
  }
}

// ../../node_modules/@azure/identity/dist/esm/credentials/managedIdentityCredential/utils.js
var DefaultScopeSuffix = "/.default";
var serviceFabricErrorMessage = "Specifying a `clientId` or `resourceId` is not supported by the Service Fabric managed identity environment. The managed identity configuration is determined by the Service Fabric cluster resource configuration. See https://aka.ms/servicefabricmi for more information";
function mapScopesToResource(scopes) {
  let scope = "";
  if (Array.isArray(scopes)) {
    if (scopes.length !== 1) {
      return;
    }
    scope = scopes[0];
  } else if (typeof scopes === "string") {
    scope = scopes;
  }
  if (!scope.endsWith(DefaultScopeSuffix)) {
    return scope;
  }
  return scope.substr(0, scope.lastIndexOf(DefaultScopeSuffix));
}
function parseExpirationTimestamp(body) {
  if (typeof body.expires_on === "number") {
    return body.expires_on * 1e3;
  }
  if (typeof body.expires_on === "string") {
    const asNumber = +body.expires_on;
    if (!isNaN(asNumber)) {
      return asNumber * 1e3;
    }
    const asDate = Date.parse(body.expires_on);
    if (!isNaN(asDate)) {
      return asDate;
    }
  }
  if (typeof body.expires_in === "number") {
    return Date.now() + body.expires_in * 1e3;
  }
  throw new Error(`Failed to parse token expiration from body. expires_in="${body.expires_in}", expires_on="${body.expires_on}"`);
}
function parseRefreshTimestamp(body) {
  if (body.refresh_on) {
    if (typeof body.refresh_on === "number") {
      return body.refresh_on * 1e3;
    }
    if (typeof body.refresh_on === "string") {
      const asNumber = +body.refresh_on;
      if (!isNaN(asNumber)) {
        return asNumber * 1e3;
      }
      const asDate = Date.parse(body.refresh_on);
      if (!isNaN(asDate)) {
        return asDate;
      }
    }
    throw new Error(`Failed to parse refresh_on from body. refresh_on="${body.refresh_on}"`);
  } else {
    return void 0;
  }
}

// ../../node_modules/@azure/identity/dist/esm/client/identityClient.js
var noCorrelationId = "noCorrelationId";
function getIdentityClientAuthorityHost(options) {
  let authorityHost = options?.authorityHost;
  if (isNode) {
    authorityHost = authorityHost ?? process.env.AZURE_AUTHORITY_HOST;
  }
  return authorityHost ?? DefaultAuthorityHost;
}
var IdentityClient = class extends ServiceClient {
  authorityHost;
  allowLoggingAccountIdentifiers;
  abortControllers;
  allowInsecureConnection = false;
  // used for WorkloadIdentity
  tokenCredentialOptions;
  constructor(options) {
    const packageDetails = `azsdk-js-identity/${SDK_VERSION}`;
    const userAgentPrefix = options?.userAgentOptions?.userAgentPrefix ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}` : `${packageDetails}`;
    const baseUri = getIdentityClientAuthorityHost(options);
    if (!baseUri.startsWith("https:")) {
      throw new Error("The authorityHost address must use the 'https' protocol.");
    }
    super({
      requestContentType: "application/json; charset=utf-8",
      retryOptions: {
        maxRetries: 3
      },
      ...options,
      userAgentOptions: {
        userAgentPrefix
      },
      baseUri
    });
    this.authorityHost = baseUri;
    this.abortControllers = /* @__PURE__ */ new Map();
    this.allowLoggingAccountIdentifiers = options?.loggingOptions?.allowLoggingAccountIdentifiers;
    this.tokenCredentialOptions = { ...options };
    if (options?.allowInsecureConnection) {
      this.allowInsecureConnection = options.allowInsecureConnection;
    }
  }
  async sendTokenRequest(request) {
    logger.info(`IdentityClient: sending token request to [${request.url}]`);
    const response = await this.sendRequest(request);
    if (response.bodyAsText && (response.status === 200 || response.status === 201)) {
      const parsedBody = JSON.parse(response.bodyAsText);
      if (!parsedBody.access_token) {
        return null;
      }
      this.logIdentifiers(response);
      const token = {
        accessToken: {
          token: parsedBody.access_token,
          expiresOnTimestamp: parseExpirationTimestamp(parsedBody),
          refreshAfterTimestamp: parseRefreshTimestamp(parsedBody),
          tokenType: "Bearer"
        },
        refreshToken: parsedBody.refresh_token
      };
      logger.info(`IdentityClient: [${request.url}] token acquired, expires on ${token.accessToken.expiresOnTimestamp}`);
      return token;
    } else {
      const error = new AuthenticationError(response.status, response.bodyAsText);
      logger.warning(`IdentityClient: authentication error. HTTP status: ${response.status}, ${error.errorResponse.errorDescription}`);
      throw error;
    }
  }
  async refreshAccessToken(tenantId, clientId, scopes, refreshToken, clientSecret, options = {}) {
    if (refreshToken === void 0) {
      return null;
    }
    logger.info(`IdentityClient: refreshing access token with client ID: ${clientId}, scopes: ${scopes} started`);
    const refreshParams = {
      grant_type: "refresh_token",
      client_id: clientId,
      refresh_token: refreshToken,
      scope: scopes
    };
    if (clientSecret !== void 0) {
      refreshParams.client_secret = clientSecret;
    }
    const query = new URLSearchParams(refreshParams);
    return tracingClient.withSpan("IdentityClient.refreshAccessToken", options, async (updatedOptions) => {
      try {
        const urlSuffix = getIdentityTokenEndpointSuffix(tenantId);
        const request = createPipelineRequest2({
          url: `${this.authorityHost}/${tenantId}/${urlSuffix}`,
          method: "POST",
          body: query.toString(),
          abortSignal: options.abortSignal,
          headers: createHttpHeaders2({
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }),
          tracingOptions: updatedOptions.tracingOptions
        });
        const response = await this.sendTokenRequest(request);
        logger.info(`IdentityClient: refreshed token for client ID: ${clientId}`);
        return response;
      } catch (err) {
        if (err.name === AuthenticationErrorName && err.errorResponse.error === "interaction_required") {
          logger.info(`IdentityClient: interaction required for client ID: ${clientId}`);
          return null;
        } else {
          logger.warning(`IdentityClient: failed refreshing token for client ID: ${clientId}: ${err}`);
          throw err;
        }
      }
    });
  }
  // Here is a custom layer that allows us to abort requests that go through MSAL,
  // since MSAL doesn't allow us to pass options all the way through.
  generateAbortSignal(correlationId) {
    const controller = new AbortController();
    const controllers = this.abortControllers.get(correlationId) || [];
    controllers.push(controller);
    this.abortControllers.set(correlationId, controllers);
    const existingOnAbort = controller.signal.onabort;
    controller.signal.onabort = (...params) => {
      this.abortControllers.set(correlationId, void 0);
      if (existingOnAbort) {
        existingOnAbort.apply(controller.signal, params);
      }
    };
    return controller.signal;
  }
  abortRequests(correlationId) {
    const key = correlationId || noCorrelationId;
    const controllers = [
      ...this.abortControllers.get(key) || [],
      // MSAL passes no correlation ID to the get requests...
      ...this.abortControllers.get(noCorrelationId) || []
    ];
    if (!controllers.length) {
      return;
    }
    for (const controller of controllers) {
      controller.abort();
    }
    this.abortControllers.set(key, void 0);
  }
  getCorrelationId(options) {
    const parameter = options?.body?.split("&").map((part) => part.split("=")).find(([key]) => key === "client-request-id");
    return parameter && parameter.length ? parameter[1] || noCorrelationId : noCorrelationId;
  }
  // The MSAL network module methods follow
  async sendGetRequestAsync(url, options) {
    const request = createPipelineRequest2({
      url,
      method: "GET",
      body: options?.body,
      allowInsecureConnection: this.allowInsecureConnection,
      headers: createHttpHeaders2(options?.headers),
      abortSignal: this.generateAbortSignal(noCorrelationId)
    });
    const response = await this.sendRequest(request);
    this.logIdentifiers(response);
    return {
      body: response.bodyAsText ? JSON.parse(response.bodyAsText) : void 0,
      headers: response.headers.toJSON(),
      status: response.status
    };
  }
  async sendPostRequestAsync(url, options) {
    const request = createPipelineRequest2({
      url,
      method: "POST",
      body: options?.body,
      headers: createHttpHeaders2(options?.headers),
      allowInsecureConnection: this.allowInsecureConnection,
      // MSAL doesn't send the correlation ID on the get requests.
      abortSignal: this.generateAbortSignal(this.getCorrelationId(options))
    });
    const response = await this.sendRequest(request);
    this.logIdentifiers(response);
    return {
      body: response.bodyAsText ? JSON.parse(response.bodyAsText) : void 0,
      headers: response.headers.toJSON(),
      status: response.status
    };
  }
  /**
   *
   * @internal
   */
  getTokenCredentialOptions() {
    return this.tokenCredentialOptions;
  }
  /**
   * If allowLoggingAccountIdentifiers was set on the constructor options
   * we try to log the account identifiers by parsing the received access token.
   *
   * The account identifiers we try to log are:
   * - `appid`: The application or Client Identifier.
   * - `upn`: User Principal Name.
   *   - It might not be available in some authentication scenarios.
   *   - If it's not available, we put a placeholder: "No User Principal Name available".
   * - `tid`: Tenant Identifier.
   * - `oid`: Object Identifier of the authenticated user.
   */
  logIdentifiers(response) {
    if (!this.allowLoggingAccountIdentifiers || !response.bodyAsText) {
      return;
    }
    const unavailableUpn = "No User Principal Name available";
    try {
      const parsed = response.parsedBody || JSON.parse(response.bodyAsText);
      const accessToken = parsed.access_token;
      if (!accessToken) {
        return;
      }
      const base64Metadata = accessToken.split(".")[1];
      const { appid, upn, tid, oid } = JSON.parse(Buffer.from(base64Metadata, "base64").toString("utf8"));
      logger.info(`[Authenticated account] Client ID: ${appid}. Tenant ID: ${tid}. User Principal Name: ${upn || unavailableUpn}. Object ID (user): ${oid}`);
    } catch (e) {
      logger.warning("allowLoggingAccountIdentifiers was set, but we couldn't log the account information. Error:", e.message);
    }
  }
};

// ../../node_modules/@azure/identity/dist/esm/regionalAuthority.js
var RegionalAuthority;
(function(RegionalAuthority2) {
  RegionalAuthority2["AutoDiscoverRegion"] = "AutoDiscoverRegion";
  RegionalAuthority2["USWest"] = "westus";
  RegionalAuthority2["USWest2"] = "westus2";
  RegionalAuthority2["USCentral"] = "centralus";
  RegionalAuthority2["USEast"] = "eastus";
  RegionalAuthority2["USEast2"] = "eastus2";
  RegionalAuthority2["USNorthCentral"] = "northcentralus";
  RegionalAuthority2["USSouthCentral"] = "southcentralus";
  RegionalAuthority2["USWestCentral"] = "westcentralus";
  RegionalAuthority2["CanadaCentral"] = "canadacentral";
  RegionalAuthority2["CanadaEast"] = "canadaeast";
  RegionalAuthority2["BrazilSouth"] = "brazilsouth";
  RegionalAuthority2["EuropeNorth"] = "northeurope";
  RegionalAuthority2["EuropeWest"] = "westeurope";
  RegionalAuthority2["UKSouth"] = "uksouth";
  RegionalAuthority2["UKWest"] = "ukwest";
  RegionalAuthority2["FranceCentral"] = "francecentral";
  RegionalAuthority2["FranceSouth"] = "francesouth";
  RegionalAuthority2["SwitzerlandNorth"] = "switzerlandnorth";
  RegionalAuthority2["SwitzerlandWest"] = "switzerlandwest";
  RegionalAuthority2["GermanyNorth"] = "germanynorth";
  RegionalAuthority2["GermanyWestCentral"] = "germanywestcentral";
  RegionalAuthority2["NorwayWest"] = "norwaywest";
  RegionalAuthority2["NorwayEast"] = "norwayeast";
  RegionalAuthority2["AsiaEast"] = "eastasia";
  RegionalAuthority2["AsiaSouthEast"] = "southeastasia";
  RegionalAuthority2["JapanEast"] = "japaneast";
  RegionalAuthority2["JapanWest"] = "japanwest";
  RegionalAuthority2["AustraliaEast"] = "australiaeast";
  RegionalAuthority2["AustraliaSouthEast"] = "australiasoutheast";
  RegionalAuthority2["AustraliaCentral"] = "australiacentral";
  RegionalAuthority2["AustraliaCentral2"] = "australiacentral2";
  RegionalAuthority2["IndiaCentral"] = "centralindia";
  RegionalAuthority2["IndiaSouth"] = "southindia";
  RegionalAuthority2["IndiaWest"] = "westindia";
  RegionalAuthority2["KoreaSouth"] = "koreasouth";
  RegionalAuthority2["KoreaCentral"] = "koreacentral";
  RegionalAuthority2["UAECentral"] = "uaecentral";
  RegionalAuthority2["UAENorth"] = "uaenorth";
  RegionalAuthority2["SouthAfricaNorth"] = "southafricanorth";
  RegionalAuthority2["SouthAfricaWest"] = "southafricawest";
  RegionalAuthority2["ChinaNorth"] = "chinanorth";
  RegionalAuthority2["ChinaEast"] = "chinaeast";
  RegionalAuthority2["ChinaNorth2"] = "chinanorth2";
  RegionalAuthority2["ChinaEast2"] = "chinaeast2";
  RegionalAuthority2["GermanyCentral"] = "germanycentral";
  RegionalAuthority2["GermanyNorthEast"] = "germanynortheast";
  RegionalAuthority2["GovernmentUSVirginia"] = "usgovvirginia";
  RegionalAuthority2["GovernmentUSIowa"] = "usgoviowa";
  RegionalAuthority2["GovernmentUSArizona"] = "usgovarizona";
  RegionalAuthority2["GovernmentUSTexas"] = "usgovtexas";
  RegionalAuthority2["GovernmentUSDodEast"] = "usdodeast";
  RegionalAuthority2["GovernmentUSDodCentral"] = "usdodcentral";
})(RegionalAuthority || (RegionalAuthority = {}));
function calculateRegionalAuthority(regionalAuthority) {
  let azureRegion = regionalAuthority;
  if (azureRegion === void 0 && globalThis.process?.env?.AZURE_REGIONAL_AUTHORITY_NAME !== void 0) {
    azureRegion = process.env.AZURE_REGIONAL_AUTHORITY_NAME;
  }
  if (azureRegion === RegionalAuthority.AutoDiscoverRegion) {
    return "AUTO_DISCOVER";
  }
  return azureRegion;
}

// ../../node_modules/@azure/identity/dist/esm/util/processMultiTenantRequest.js
function createConfigurationErrorMessage(tenantId) {
  return `The current credential is not configured to acquire tokens for tenant ${tenantId}. To enable acquiring tokens for this tenant add it to the AdditionallyAllowedTenants on the credential options, or add "*" to AdditionallyAllowedTenants to allow acquiring tokens for any tenant.`;
}
function processMultiTenantRequest(tenantId, getTokenOptions, additionallyAllowedTenantIds = [], logger27) {
  let resolvedTenantId;
  if (process.env.AZURE_IDENTITY_DISABLE_MULTITENANTAUTH) {
    resolvedTenantId = tenantId;
  } else if (tenantId === "adfs") {
    resolvedTenantId = tenantId;
  } else {
    resolvedTenantId = getTokenOptions?.tenantId ?? tenantId;
  }
  if (tenantId && resolvedTenantId !== tenantId && !additionallyAllowedTenantIds.includes("*") && !additionallyAllowedTenantIds.some((t) => t.localeCompare(resolvedTenantId) === 0)) {
    const message = createConfigurationErrorMessage(resolvedTenantId);
    logger27?.info(message);
    throw new CredentialUnavailableError(message);
  }
  return resolvedTenantId;
}

// ../../node_modules/@azure/identity/dist/esm/util/tenantIdUtils.js
function checkTenantId(logger27, tenantId) {
  if (!tenantId.match(/^[0-9a-zA-Z-.]+$/)) {
    const error = new Error("Invalid tenant id provided. You can locate your tenant id by following the instructions listed here: https://learn.microsoft.com/partner-center/find-ids-and-domain-names.");
    logger27.info(formatError("", error));
    throw error;
  }
}
function resolveTenantId(logger27, tenantId, clientId) {
  if (tenantId) {
    checkTenantId(logger27, tenantId);
    return tenantId;
  }
  if (!clientId) {
    clientId = DeveloperSignOnClientId;
  }
  if (clientId !== DeveloperSignOnClientId) {
    return "common";
  }
  return "organizations";
}
function resolveAdditionallyAllowedTenantIds(additionallyAllowedTenants) {
  if (!additionallyAllowedTenants || additionallyAllowedTenants.length === 0) {
    return [];
  }
  if (additionallyAllowedTenants.includes("*")) {
    return ALL_TENANTS;
  }
  return additionallyAllowedTenants;
}

// ../../node_modules/@azure/identity/dist/esm/msal/nodeFlows/msalClient.js
var msalLogger = credentialLogger("MsalClient");
function generateMsalConfiguration(clientId, tenantId, msalClientOptions = {}) {
  const resolvedTenant = resolveTenantId(msalClientOptions.logger ?? msalLogger, tenantId, clientId);
  const authority = getAuthority(resolvedTenant, getAuthorityHost(msalClientOptions));
  const httpClient = new IdentityClient({
    ...msalClientOptions.tokenCredentialOptions,
    authorityHost: authority,
    loggingOptions: msalClientOptions.loggingOptions
  });
  const msalConfig = {
    auth: {
      clientId,
      authority,
      knownAuthorities: getKnownAuthorities(resolvedTenant, authority, msalClientOptions.disableInstanceDiscovery)
    },
    system: {
      networkClient: httpClient,
      loggerOptions: {
        loggerCallback: defaultLoggerCallback(msalClientOptions.logger ?? msalLogger),
        logLevel: getMSALLogLevel(getLogLevel()),
        piiLoggingEnabled: msalClientOptions.loggingOptions?.enableUnsafeSupportLogging
      }
    }
  };
  return msalConfig;
}
function createMsalClient(clientId, tenantId, createMsalClientOptions = {}) {
  const state3 = {
    msalConfig: generateMsalConfiguration(clientId, tenantId, createMsalClientOptions),
    cachedAccount: createMsalClientOptions.authenticationRecord ? publicToMsal(createMsalClientOptions.authenticationRecord) : null,
    pluginConfiguration: msalPlugins.generatePluginConfiguration(createMsalClientOptions),
    logger: createMsalClientOptions.logger ?? msalLogger
  };
  const publicApps = /* @__PURE__ */ new Map();
  async function getPublicApp(options = {}) {
    const appKey = options.enableCae ? "CAE" : "default";
    let publicClientApp = publicApps.get(appKey);
    if (publicClientApp) {
      state3.logger.getToken.info("Existing PublicClientApplication found in cache, returning it.");
      return publicClientApp;
    }
    state3.logger.getToken.info(`Creating new PublicClientApplication with CAE ${options.enableCae ? "enabled" : "disabled"}.`);
    const cachePlugin = options.enableCae ? state3.pluginConfiguration.cache.cachePluginCae : state3.pluginConfiguration.cache.cachePlugin;
    state3.msalConfig.auth.clientCapabilities = options.enableCae ? ["cp1"] : void 0;
    publicClientApp = new PublicClientApplication({
      ...state3.msalConfig,
      broker: { nativeBrokerPlugin: state3.pluginConfiguration.broker.nativeBrokerPlugin },
      cache: { cachePlugin: await cachePlugin }
    });
    publicApps.set(appKey, publicClientApp);
    return publicClientApp;
  }
  const confidentialApps = /* @__PURE__ */ new Map();
  async function getConfidentialApp(options = {}) {
    const appKey = options.enableCae ? "CAE" : "default";
    let confidentialClientApp = confidentialApps.get(appKey);
    if (confidentialClientApp) {
      state3.logger.getToken.info("Existing ConfidentialClientApplication found in cache, returning it.");
      return confidentialClientApp;
    }
    state3.logger.getToken.info(`Creating new ConfidentialClientApplication with CAE ${options.enableCae ? "enabled" : "disabled"}.`);
    const cachePlugin = options.enableCae ? state3.pluginConfiguration.cache.cachePluginCae : state3.pluginConfiguration.cache.cachePlugin;
    state3.msalConfig.auth.clientCapabilities = options.enableCae ? ["cp1"] : void 0;
    confidentialClientApp = new ConfidentialClientApplication({
      ...state3.msalConfig,
      broker: { nativeBrokerPlugin: state3.pluginConfiguration.broker.nativeBrokerPlugin },
      cache: { cachePlugin: await cachePlugin }
    });
    confidentialApps.set(appKey, confidentialClientApp);
    return confidentialClientApp;
  }
  async function getTokenSilent(app, scopes, options = {}) {
    if (state3.cachedAccount === null) {
      state3.logger.getToken.info("No cached account found in local state.");
      throw new AuthenticationRequiredError({ scopes });
    }
    if (options.claims) {
      state3.cachedClaims = options.claims;
    }
    const silentRequest = {
      account: state3.cachedAccount,
      scopes,
      claims: state3.cachedClaims
    };
    if (state3.pluginConfiguration.broker.isEnabled) {
      silentRequest.extraQueryParameters ||= {};
      if (state3.pluginConfiguration.broker.enableMsaPassthrough) {
        silentRequest.extraQueryParameters["msal_request_type"] = "consumer_passthrough";
      }
    }
    if (options.proofOfPossessionOptions) {
      silentRequest.shrNonce = options.proofOfPossessionOptions.nonce;
      silentRequest.authenticationScheme = "pop";
      silentRequest.resourceRequestMethod = options.proofOfPossessionOptions.resourceRequestMethod;
      silentRequest.resourceRequestUri = options.proofOfPossessionOptions.resourceRequestUrl;
    }
    state3.logger.getToken.info("Attempting to acquire token silently");
    try {
      return await app.acquireTokenSilent(silentRequest);
    } catch (err) {
      throw handleMsalError(scopes, err, options);
    }
  }
  function calculateRequestAuthority(options) {
    if (options?.tenantId) {
      return getAuthority(options.tenantId, getAuthorityHost(createMsalClientOptions));
    }
    return state3.msalConfig.auth.authority;
  }
  async function withSilentAuthentication(msalApp, scopes, options, onAuthenticationRequired) {
    let response = null;
    try {
      response = await getTokenSilent(msalApp, scopes, options);
    } catch (e) {
      if (e.name !== "AuthenticationRequiredError") {
        throw e;
      }
      if (options.disableAutomaticAuthentication) {
        throw new AuthenticationRequiredError({
          scopes,
          getTokenOptions: options,
          message: "Automatic authentication has been disabled. You may call the authentication() method."
        });
      }
    }
    if (response === null) {
      try {
        response = await onAuthenticationRequired();
      } catch (err) {
        throw handleMsalError(scopes, err, options);
      }
    }
    ensureValidMsalToken(scopes, response, options);
    state3.cachedAccount = response?.account ?? null;
    state3.logger.getToken.info(formatSuccess(scopes));
    return {
      token: response.accessToken,
      expiresOnTimestamp: response.expiresOn.getTime(),
      refreshAfterTimestamp: response.refreshOn?.getTime(),
      tokenType: response.tokenType
    };
  }
  async function getTokenByClientSecret(scopes, clientSecret, options = {}) {
    state3.logger.getToken.info(`Attempting to acquire token using client secret`);
    state3.msalConfig.auth.clientSecret = clientSecret;
    const msalApp = await getConfidentialApp(options);
    try {
      const response = await msalApp.acquireTokenByClientCredential({
        scopes,
        authority: calculateRequestAuthority(options),
        azureRegion: calculateRegionalAuthority(),
        claims: options?.claims
      });
      ensureValidMsalToken(scopes, response, options);
      state3.logger.getToken.info(formatSuccess(scopes));
      return {
        token: response.accessToken,
        expiresOnTimestamp: response.expiresOn.getTime(),
        refreshAfterTimestamp: response.refreshOn?.getTime(),
        tokenType: response.tokenType
      };
    } catch (err) {
      throw handleMsalError(scopes, err, options);
    }
  }
  async function getTokenByClientAssertion(scopes, clientAssertion, options = {}) {
    state3.logger.getToken.info(`Attempting to acquire token using client assertion`);
    state3.msalConfig.auth.clientAssertion = clientAssertion;
    const msalApp = await getConfidentialApp(options);
    try {
      const response = await msalApp.acquireTokenByClientCredential({
        scopes,
        authority: calculateRequestAuthority(options),
        azureRegion: calculateRegionalAuthority(),
        claims: options?.claims,
        clientAssertion
      });
      ensureValidMsalToken(scopes, response, options);
      state3.logger.getToken.info(formatSuccess(scopes));
      return {
        token: response.accessToken,
        expiresOnTimestamp: response.expiresOn.getTime(),
        refreshAfterTimestamp: response.refreshOn?.getTime(),
        tokenType: response.tokenType
      };
    } catch (err) {
      throw handleMsalError(scopes, err, options);
    }
  }
  async function getTokenByClientCertificate(scopes, certificate, options = {}) {
    state3.logger.getToken.info(`Attempting to acquire token using client certificate`);
    state3.msalConfig.auth.clientCertificate = certificate;
    const msalApp = await getConfidentialApp(options);
    try {
      const response = await msalApp.acquireTokenByClientCredential({
        scopes,
        authority: calculateRequestAuthority(options),
        azureRegion: calculateRegionalAuthority(),
        claims: options?.claims
      });
      ensureValidMsalToken(scopes, response, options);
      state3.logger.getToken.info(formatSuccess(scopes));
      return {
        token: response.accessToken,
        expiresOnTimestamp: response.expiresOn.getTime(),
        refreshAfterTimestamp: response.refreshOn?.getTime(),
        tokenType: response.tokenType
      };
    } catch (err) {
      throw handleMsalError(scopes, err, options);
    }
  }
  async function getTokenByDeviceCode(scopes, deviceCodeCallback, options = {}) {
    state3.logger.getToken.info(`Attempting to acquire token using device code`);
    const msalApp = await getPublicApp(options);
    return withSilentAuthentication(msalApp, scopes, options, () => {
      const requestOptions = {
        scopes,
        cancel: options?.abortSignal?.aborted ?? false,
        deviceCodeCallback,
        authority: calculateRequestAuthority(options),
        claims: options?.claims
      };
      const deviceCodeRequest = msalApp.acquireTokenByDeviceCode(requestOptions);
      if (options.abortSignal) {
        options.abortSignal.addEventListener("abort", () => {
          requestOptions.cancel = true;
        });
      }
      return deviceCodeRequest;
    });
  }
  async function getTokenByUsernamePassword(scopes, username, password, options = {}) {
    state3.logger.getToken.info(`Attempting to acquire token using username and password`);
    const msalApp = await getPublicApp(options);
    return withSilentAuthentication(msalApp, scopes, options, () => {
      const requestOptions = {
        scopes,
        username,
        password,
        authority: calculateRequestAuthority(options),
        claims: options?.claims
      };
      return msalApp.acquireTokenByUsernamePassword(requestOptions);
    });
  }
  function getActiveAccount() {
    if (!state3.cachedAccount) {
      return void 0;
    }
    return msalToPublic(clientId, state3.cachedAccount);
  }
  async function getTokenByAuthorizationCode(scopes, redirectUri, authorizationCode, clientSecret, options = {}) {
    state3.logger.getToken.info(`Attempting to acquire token using authorization code`);
    let msalApp;
    if (clientSecret) {
      state3.msalConfig.auth.clientSecret = clientSecret;
      msalApp = await getConfidentialApp(options);
    } else {
      msalApp = await getPublicApp(options);
    }
    return withSilentAuthentication(msalApp, scopes, options, () => {
      return msalApp.acquireTokenByCode({
        scopes,
        redirectUri,
        code: authorizationCode,
        authority: calculateRequestAuthority(options),
        claims: options?.claims
      });
    });
  }
  async function getTokenOnBehalfOf(scopes, userAssertionToken, clientCredentials, options = {}) {
    msalLogger.getToken.info(`Attempting to acquire token on behalf of another user`);
    if (typeof clientCredentials === "string") {
      msalLogger.getToken.info(`Using client secret for on behalf of flow`);
      state3.msalConfig.auth.clientSecret = clientCredentials;
    } else if (typeof clientCredentials === "function") {
      msalLogger.getToken.info(`Using client assertion callback for on behalf of flow`);
      state3.msalConfig.auth.clientAssertion = clientCredentials;
    } else {
      msalLogger.getToken.info(`Using client certificate for on behalf of flow`);
      state3.msalConfig.auth.clientCertificate = clientCredentials;
    }
    const msalApp = await getConfidentialApp(options);
    try {
      const response = await msalApp.acquireTokenOnBehalfOf({
        scopes,
        authority: calculateRequestAuthority(options),
        claims: options.claims,
        oboAssertion: userAssertionToken
      });
      ensureValidMsalToken(scopes, response, options);
      msalLogger.getToken.info(formatSuccess(scopes));
      return {
        token: response.accessToken,
        expiresOnTimestamp: response.expiresOn.getTime(),
        refreshAfterTimestamp: response.refreshOn?.getTime(),
        tokenType: response.tokenType
      };
    } catch (err) {
      throw handleMsalError(scopes, err, options);
    }
  }
  function createBaseInteractiveRequest(scopes, options) {
    return {
      openBrowser: async (url) => {
        const open2 = await Promise.resolve().then(() => (init_open(), open_exports));
        await open2.default(url, { newInstance: true });
      },
      scopes,
      authority: calculateRequestAuthority(options),
      claims: options?.claims,
      loginHint: options?.loginHint,
      errorTemplate: options?.browserCustomizationOptions?.errorMessage,
      successTemplate: options?.browserCustomizationOptions?.successMessage,
      prompt: options?.loginHint ? "login" : "select_account"
    };
  }
  async function getBrokeredTokenInternal(scopes, useDefaultBrokerAccount, options = {}) {
    msalLogger.verbose("Authentication will resume through the broker");
    const app = await getPublicApp(options);
    const interactiveRequest = createBaseInteractiveRequest(scopes, options);
    if (state3.pluginConfiguration.broker.parentWindowHandle) {
      interactiveRequest.windowHandle = Buffer.from(state3.pluginConfiguration.broker.parentWindowHandle);
    } else {
      msalLogger.warning("Parent window handle is not specified for the broker. This may cause unexpected behavior. Please provide the parentWindowHandle.");
    }
    if (state3.pluginConfiguration.broker.enableMsaPassthrough) {
      (interactiveRequest.extraQueryParameters ??= {})["msal_request_type"] = "consumer_passthrough";
    }
    if (useDefaultBrokerAccount) {
      interactiveRequest.prompt = "none";
      msalLogger.verbose("Attempting broker authentication using the default broker account");
    } else {
      msalLogger.verbose("Attempting broker authentication without the default broker account");
    }
    if (options.proofOfPossessionOptions) {
      interactiveRequest.shrNonce = options.proofOfPossessionOptions.nonce;
      interactiveRequest.authenticationScheme = "pop";
      interactiveRequest.resourceRequestMethod = options.proofOfPossessionOptions.resourceRequestMethod;
      interactiveRequest.resourceRequestUri = options.proofOfPossessionOptions.resourceRequestUrl;
    }
    try {
      return await app.acquireTokenInteractive(interactiveRequest);
    } catch (e) {
      msalLogger.verbose(`Failed to authenticate through the broker: ${e.message}`);
      if (options.disableAutomaticAuthentication) {
        throw new AuthenticationRequiredError({
          scopes,
          getTokenOptions: options,
          message: "Cannot silently authenticate with default broker account."
        });
      }
      if (useDefaultBrokerAccount) {
        return getBrokeredTokenInternal(scopes, false, options);
      } else {
        throw e;
      }
    }
  }
  async function getBrokeredToken(scopes, useDefaultBrokerAccount, options = {}) {
    msalLogger.getToken.info(`Attempting to acquire token using brokered authentication with useDefaultBrokerAccount: ${useDefaultBrokerAccount}`);
    const response = await getBrokeredTokenInternal(scopes, useDefaultBrokerAccount, options);
    ensureValidMsalToken(scopes, response, options);
    state3.cachedAccount = response?.account ?? null;
    state3.logger.getToken.info(formatSuccess(scopes));
    return {
      token: response.accessToken,
      expiresOnTimestamp: response.expiresOn.getTime(),
      refreshAfterTimestamp: response.refreshOn?.getTime(),
      tokenType: response.tokenType
    };
  }
  async function getTokenByInteractiveRequest(scopes, options = {}) {
    msalLogger.getToken.info(`Attempting to acquire token interactively`);
    const app = await getPublicApp(options);
    return withSilentAuthentication(app, scopes, options, async () => {
      const interactiveRequest = createBaseInteractiveRequest(scopes, options);
      if (state3.pluginConfiguration.broker.isEnabled) {
        return getBrokeredTokenInternal(scopes, state3.pluginConfiguration.broker.useDefaultBrokerAccount ?? false, options);
      }
      if (options.proofOfPossessionOptions) {
        interactiveRequest.shrNonce = options.proofOfPossessionOptions.nonce;
        interactiveRequest.authenticationScheme = "pop";
        interactiveRequest.resourceRequestMethod = options.proofOfPossessionOptions.resourceRequestMethod;
        interactiveRequest.resourceRequestUri = options.proofOfPossessionOptions.resourceRequestUrl;
      }
      return app.acquireTokenInteractive(interactiveRequest);
    });
  }
  return {
    getActiveAccount,
    getBrokeredToken,
    getTokenByClientSecret,
    getTokenByClientAssertion,
    getTokenByClientCertificate,
    getTokenByDeviceCode,
    getTokenByUsernamePassword,
    getTokenByAuthorizationCode,
    getTokenOnBehalfOf,
    getTokenByInteractiveRequest
  };
}

// ../../node_modules/@azure/identity/dist/esm/credentials/clientCertificateCredential.js
import { createHash as createHash3, createPrivateKey } from "crypto";
import { readFile } from "fs/promises";
var credentialName = "ClientCertificateCredential";
var logger7 = credentialLogger(credentialName);
var ClientCertificateCredential = class {
  tenantId;
  additionallyAllowedTenantIds;
  certificateConfiguration;
  sendCertificateChain;
  msalClient;
  constructor(tenantId, clientId, certificatePathOrConfiguration, options = {}) {
    if (!tenantId || !clientId) {
      throw new Error(`${credentialName}: tenantId and clientId are required parameters.`);
    }
    this.tenantId = tenantId;
    this.additionallyAllowedTenantIds = resolveAdditionallyAllowedTenantIds(options?.additionallyAllowedTenants);
    this.sendCertificateChain = options.sendCertificateChain;
    this.certificateConfiguration = {
      ...typeof certificatePathOrConfiguration === "string" ? {
        certificatePath: certificatePathOrConfiguration
      } : certificatePathOrConfiguration
    };
    const certificate = this.certificateConfiguration.certificate;
    const certificatePath = this.certificateConfiguration.certificatePath;
    if (!this.certificateConfiguration || !(certificate || certificatePath)) {
      throw new Error(`${credentialName}: Provide either a PEM certificate in string form, or the path to that certificate in the filesystem. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.`);
    }
    if (certificate && certificatePath) {
      throw new Error(`${credentialName}: To avoid unexpected behaviors, providing both the contents of a PEM certificate and the path to a PEM certificate is forbidden. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.`);
    }
    this.msalClient = createMsalClient(clientId, tenantId, {
      ...options,
      logger: logger7,
      tokenCredentialOptions: options
    });
  }
  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(scopes, options = {}) {
    return tracingClient.withSpan(`${credentialName}.getToken`, options, async (newOptions) => {
      newOptions.tenantId = processMultiTenantRequest(this.tenantId, newOptions, this.additionallyAllowedTenantIds, logger7);
      const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
      const certificate = await this.buildClientCertificate();
      return this.msalClient.getTokenByClientCertificate(arrayScopes, certificate, newOptions);
    });
  }
  async buildClientCertificate() {
    const parts = await parseCertificate(this.certificateConfiguration, this.sendCertificateChain ?? false);
    let privateKey;
    if (this.certificateConfiguration.certificatePassword !== void 0) {
      privateKey = createPrivateKey({
        key: parts.certificateContents,
        passphrase: this.certificateConfiguration.certificatePassword,
        format: "pem"
      }).export({
        format: "pem",
        type: "pkcs8"
      }).toString();
    } else {
      privateKey = parts.certificateContents;
    }
    return {
      thumbprint: parts.thumbprint,
      thumbprintSha256: parts.thumbprintSha256,
      privateKey,
      x5c: parts.x5c
    };
  }
};
async function parseCertificate(certificateConfiguration, sendCertificateChain) {
  const certificate = certificateConfiguration.certificate;
  const certificatePath = certificateConfiguration.certificatePath;
  const certificateContents = certificate || await readFile(certificatePath, "utf8");
  const x5c = sendCertificateChain ? certificateContents : void 0;
  const certificatePattern = /(-+BEGIN CERTIFICATE-+)(\n\r?|\r\n?)([A-Za-z0-9+/\n\r]+=*)(\n\r?|\r\n?)(-+END CERTIFICATE-+)/g;
  const publicKeys = [];
  let match;
  do {
    match = certificatePattern.exec(certificateContents);
    if (match) {
      publicKeys.push(match[3]);
    }
  } while (match);
  if (publicKeys.length === 0) {
    throw new Error("The file at the specified path does not contain a PEM-encoded certificate.");
  }
  const thumbprint = createHash3("sha1").update(Buffer.from(publicKeys[0], "base64")).digest("hex").toUpperCase();
  const thumbprintSha256 = createHash3("sha256").update(Buffer.from(publicKeys[0], "base64")).digest("hex").toUpperCase();
  return {
    certificateContents,
    thumbprintSha256,
    thumbprint,
    x5c
  };
}

// ../../node_modules/@azure/identity/dist/esm/util/scopeUtils.js
function ensureScopes(scopes) {
  return Array.isArray(scopes) ? scopes : [scopes];
}
function ensureValidScopeForDevTimeCreds(scope, logger27) {
  if (!scope.match(/^[0-9a-zA-Z-_.:/]+$/)) {
    const error = new Error("Invalid scope was specified by the user or calling client");
    logger27.getToken.info(formatError(scope, error));
    throw error;
  }
}
function getScopeResource(scope) {
  return scope.replace(/\/.default$/, "");
}

// ../../node_modules/@azure/identity/dist/esm/credentials/clientSecretCredential.js
var logger8 = credentialLogger("ClientSecretCredential");
var ClientSecretCredential = class {
  tenantId;
  additionallyAllowedTenantIds;
  msalClient;
  clientSecret;
  /**
   * Creates an instance of the ClientSecretCredential with the details
   * needed to authenticate against Microsoft Entra ID with a client
   * secret.
   *
   * @param tenantId - The Microsoft Entra tenant (directory) ID.
   * @param clientId - The client (application) ID of an App Registration in the tenant.
   * @param clientSecret - A client secret that was generated for the App Registration.
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(tenantId, clientId, clientSecret, options = {}) {
    if (!tenantId) {
      throw new CredentialUnavailableError("ClientSecretCredential: tenantId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.");
    }
    if (!clientId) {
      throw new CredentialUnavailableError("ClientSecretCredential: clientId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.");
    }
    if (!clientSecret) {
      throw new CredentialUnavailableError("ClientSecretCredential: clientSecret is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.");
    }
    this.clientSecret = clientSecret;
    this.tenantId = tenantId;
    this.additionallyAllowedTenantIds = resolveAdditionallyAllowedTenantIds(options?.additionallyAllowedTenants);
    this.msalClient = createMsalClient(clientId, tenantId, {
      ...options,
      logger: logger8,
      tokenCredentialOptions: options
    });
  }
  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(scopes, options = {}) {
    return tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async (newOptions) => {
      newOptions.tenantId = processMultiTenantRequest(this.tenantId, newOptions, this.additionallyAllowedTenantIds, logger8);
      const arrayScopes = ensureScopes(scopes);
      return this.msalClient.getTokenByClientSecret(arrayScopes, this.clientSecret, newOptions);
    });
  }
};

// ../../node_modules/@azure/identity/dist/esm/credentials/usernamePasswordCredential.js
var logger9 = credentialLogger("UsernamePasswordCredential");
var UsernamePasswordCredential = class {
  tenantId;
  additionallyAllowedTenantIds;
  msalClient;
  username;
  password;
  /**
   * Creates an instance of the UsernamePasswordCredential with the details
   * needed to authenticate against Microsoft Entra ID with a username
   * and password.
   *
   * @param tenantId - The Microsoft Entra tenant (directory).
   * @param clientId - The client (application) ID of an App Registration in the tenant.
   * @param username - The user account's e-mail address (user name).
   * @param password - The user account's account password
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(tenantId, clientId, username, password, options = {}) {
    if (!tenantId) {
      throw new CredentialUnavailableError("UsernamePasswordCredential: tenantId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/usernamepasswordcredential/troubleshoot.");
    }
    if (!clientId) {
      throw new CredentialUnavailableError("UsernamePasswordCredential: clientId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/usernamepasswordcredential/troubleshoot.");
    }
    if (!username) {
      throw new CredentialUnavailableError("UsernamePasswordCredential: username is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/usernamepasswordcredential/troubleshoot.");
    }
    if (!password) {
      throw new CredentialUnavailableError("UsernamePasswordCredential: password is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/usernamepasswordcredential/troubleshoot.");
    }
    this.tenantId = tenantId;
    this.additionallyAllowedTenantIds = resolveAdditionallyAllowedTenantIds(options?.additionallyAllowedTenants);
    this.username = username;
    this.password = password;
    this.msalClient = createMsalClient(clientId, this.tenantId, {
      ...options,
      tokenCredentialOptions: options ?? {}
    });
  }
  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * If the user provided the option `disableAutomaticAuthentication`,
   * once the token can't be retrieved silently,
   * this method won't attempt to request user interaction to retrieve the token.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(scopes, options = {}) {
    return tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async (newOptions) => {
      newOptions.tenantId = processMultiTenantRequest(this.tenantId, newOptions, this.additionallyAllowedTenantIds, logger9);
      const arrayScopes = ensureScopes(scopes);
      return this.msalClient.getTokenByUsernamePassword(arrayScopes, this.username, this.password, newOptions);
    });
  }
};

// ../../node_modules/@azure/identity/dist/esm/credentials/environmentCredential.js
var AllSupportedEnvironmentVariables = [
  "AZURE_TENANT_ID",
  "AZURE_CLIENT_ID",
  "AZURE_CLIENT_SECRET",
  "AZURE_CLIENT_CERTIFICATE_PATH",
  "AZURE_CLIENT_CERTIFICATE_PASSWORD",
  "AZURE_USERNAME",
  "AZURE_PASSWORD",
  "AZURE_ADDITIONALLY_ALLOWED_TENANTS",
  "AZURE_CLIENT_SEND_CERTIFICATE_CHAIN"
];
function getAdditionallyAllowedTenants() {
  const additionallyAllowedValues = process.env.AZURE_ADDITIONALLY_ALLOWED_TENANTS ?? "";
  return additionallyAllowedValues.split(";");
}
var credentialName2 = "EnvironmentCredential";
var logger10 = credentialLogger(credentialName2);
function getSendCertificateChain() {
  const sendCertificateChain = (process.env.AZURE_CLIENT_SEND_CERTIFICATE_CHAIN ?? "").toLowerCase();
  const result = sendCertificateChain === "true" || sendCertificateChain === "1";
  logger10.verbose(`AZURE_CLIENT_SEND_CERTIFICATE_CHAIN: ${process.env.AZURE_CLIENT_SEND_CERTIFICATE_CHAIN}; sendCertificateChain: ${result}`);
  return result;
}
var EnvironmentCredential = class {
  _credential = void 0;
  /**
   * Creates an instance of the EnvironmentCredential class and decides what credential to use depending on the available environment variables.
   *
   * Required environment variables:
   * - `AZURE_TENANT_ID`: The Microsoft Entra tenant (directory) ID.
   * - `AZURE_CLIENT_ID`: The client (application) ID of an App Registration in the tenant.
   *
   * If setting the AZURE_TENANT_ID, then you can also set the additionally allowed tenants
   * - `AZURE_ADDITIONALLY_ALLOWED_TENANTS`: For multi-tenant applications, specifies additional tenants for which the credential may acquire tokens with a single semicolon delimited string. Use * to allow all tenants.
   *
   * Environment variables used for client credential authentication:
   * - `AZURE_CLIENT_SECRET`: A client secret that was generated for the App Registration.
   * - `AZURE_CLIENT_CERTIFICATE_PATH`: The path to a PEM certificate to use during the authentication, instead of the client secret.
   * - `AZURE_CLIENT_CERTIFICATE_PASSWORD`: (optional) password for the certificate file.
   * - `AZURE_CLIENT_SEND_CERTIFICATE_CHAIN`: (optional) indicates that the certificate chain should be set in x5c header to support subject name / issuer based authentication.
   *
   * Username and password authentication is deprecated, since it doesn't support multifactor authentication (MFA). See https://aka.ms/azsdk/identity/mfa for more details. Users can still provide environment variables for this authentication method:
   * - `AZURE_USERNAME`: Username to authenticate with.
   * - `AZURE_PASSWORD`: Password to authenticate with.
   *
   * If the environment variables required to perform the authentication are missing, a {@link CredentialUnavailableError} will be thrown.
   * If the authentication fails, or if there's an unknown error, an {@link AuthenticationError} will be thrown.
   *
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(options) {
    const assigned = processEnvVars(AllSupportedEnvironmentVariables).assigned.join(", ");
    logger10.info(`Found the following environment variables: ${assigned}`);
    const tenantId = process.env.AZURE_TENANT_ID, clientId = process.env.AZURE_CLIENT_ID, clientSecret = process.env.AZURE_CLIENT_SECRET;
    const additionallyAllowedTenantIds = getAdditionallyAllowedTenants();
    const sendCertificateChain = getSendCertificateChain();
    const newOptions = { ...options, additionallyAllowedTenantIds, sendCertificateChain };
    if (tenantId) {
      checkTenantId(logger10, tenantId);
    }
    if (tenantId && clientId && clientSecret) {
      logger10.info(`Invoking ClientSecretCredential with tenant ID: ${tenantId}, clientId: ${clientId} and clientSecret: [REDACTED]`);
      this._credential = new ClientSecretCredential(tenantId, clientId, clientSecret, newOptions);
      return;
    }
    const certificatePath = process.env.AZURE_CLIENT_CERTIFICATE_PATH;
    const certificatePassword = process.env.AZURE_CLIENT_CERTIFICATE_PASSWORD;
    if (tenantId && clientId && certificatePath) {
      logger10.info(`Invoking ClientCertificateCredential with tenant ID: ${tenantId}, clientId: ${clientId} and certificatePath: ${certificatePath}`);
      this._credential = new ClientCertificateCredential(tenantId, clientId, { certificatePath, certificatePassword }, newOptions);
      return;
    }
    const username = process.env.AZURE_USERNAME;
    const password = process.env.AZURE_PASSWORD;
    if (tenantId && clientId && username && password) {
      logger10.info(`Invoking UsernamePasswordCredential with tenant ID: ${tenantId}, clientId: ${clientId} and username: ${username}`);
      logger10.warning("Environment is configured to use username and password authentication. This authentication method is deprecated, as it doesn't support multifactor authentication (MFA). Use a more secure credential. For more details, see https://aka.ms/azsdk/identity/mfa.");
      this._credential = new UsernamePasswordCredential(tenantId, clientId, username, password, newOptions);
    }
  }
  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - Optional parameters. See {@link GetTokenOptions}.
   */
  async getToken(scopes, options = {}) {
    return tracingClient.withSpan(`${credentialName2}.getToken`, options, async (newOptions) => {
      if (this._credential) {
        try {
          const result = await this._credential.getToken(scopes, newOptions);
          logger10.getToken.info(formatSuccess(scopes));
          return result;
        } catch (err) {
          const authenticationError = new AuthenticationError(400, {
            error: `${credentialName2} authentication failed. To troubleshoot, visit https://aka.ms/azsdk/js/identity/environmentcredential/troubleshoot.`,
            error_description: err.message.toString().split("More details:").join("")
          });
          logger10.getToken.info(formatError(scopes, authenticationError));
          throw authenticationError;
        }
      }
      throw new CredentialUnavailableError(`${credentialName2} is unavailable. No underlying credential could be used. To troubleshoot, visit https://aka.ms/azsdk/js/identity/environmentcredential/troubleshoot.`);
    });
  }
};

// ../../node_modules/@azure/identity/dist/esm/credentials/managedIdentityCredential/imdsRetryPolicy.js
var DEFAULT_CLIENT_MAX_RETRY_INTERVAL2 = 1e3 * 64;
var MIN_DELAY_FOR_410_MS = 3e3;
function imdsRetryPolicy(msiRetryConfig) {
  return retryPolicy2([
    {
      name: "imdsRetryPolicy",
      retry: ({ retryCount, response }) => {
        if (response?.status !== 404 && response?.status !== 410) {
          return { skipStrategy: true };
        }
        const initialDelayMs = response?.status === 410 ? Math.max(MIN_DELAY_FOR_410_MS, msiRetryConfig.startDelayInMs) : msiRetryConfig.startDelayInMs;
        return calculateRetryDelay2(retryCount, {
          retryDelayInMs: initialDelayMs,
          maxRetryDelayInMs: DEFAULT_CLIENT_MAX_RETRY_INTERVAL2
        });
      }
    }
  ], {
    maxRetries: msiRetryConfig.maxRetries
  });
}

// ../../node_modules/@azure/identity/dist/esm/credentials/managedIdentityCredential/imdsMsi.js
var msiName = "ManagedIdentityCredential - IMDS";
var logger11 = credentialLogger(msiName);
var imdsHost = "http://169.254.169.254";
var imdsEndpointPath = "/metadata/identity/oauth2/token";
function prepareInvalidRequestOptions(scopes) {
  const resource = mapScopesToResource(scopes);
  if (!resource) {
    throw new Error(`${msiName}: Multiple scopes are not supported.`);
  }
  const url = new URL(imdsEndpointPath, process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST ?? imdsHost);
  const rawHeaders = {
    Accept: "application/json"
    // intentionally leave out the Metadata header to invoke an error from IMDS endpoint.
  };
  return {
    // intentionally not including any query
    url: `${url}`,
    method: "GET",
    headers: createHttpHeaders2(rawHeaders)
  };
}
var imdsMsi = {
  name: "imdsMsi",
  async isAvailable(options) {
    const { scopes, identityClient, getTokenOptions } = options;
    const resource = mapScopesToResource(scopes);
    if (!resource) {
      logger11.info(`${msiName}: Unavailable. Multiple scopes are not supported.`);
      return false;
    }
    if (process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST) {
      return true;
    }
    if (!identityClient) {
      throw new Error("Missing IdentityClient");
    }
    const requestOptions = prepareInvalidRequestOptions(resource);
    return tracingClient.withSpan("ManagedIdentityCredential-pingImdsEndpoint", getTokenOptions ?? {}, async (updatedOptions) => {
      requestOptions.tracingOptions = updatedOptions.tracingOptions;
      const request = createPipelineRequest2(requestOptions);
      request.timeout = updatedOptions.requestOptions?.timeout || 1e3;
      request.allowInsecureConnection = true;
      let response;
      try {
        logger11.info(`${msiName}: Pinging the Azure IMDS endpoint`);
        response = await identityClient.sendRequest(request);
      } catch (err) {
        if (isError2(err)) {
          logger11.verbose(`${msiName}: Caught error ${err.name}: ${err.message}`);
        }
        logger11.info(`${msiName}: The Azure IMDS endpoint is unavailable`);
        return false;
      }
      if (response.status === 403) {
        if (response.bodyAsText?.includes("unreachable")) {
          logger11.info(`${msiName}: The Azure IMDS endpoint is unavailable`);
          logger11.info(`${msiName}: ${response.bodyAsText}`);
          return false;
        }
      }
      logger11.info(`${msiName}: The Azure IMDS endpoint is available`);
      return true;
    });
  }
};

// ../../node_modules/@azure/identity/dist/esm/credentials/clientAssertionCredential.js
var logger12 = credentialLogger("ClientAssertionCredential");
var ClientAssertionCredential = class {
  msalClient;
  tenantId;
  additionallyAllowedTenantIds;
  getAssertion;
  options;
  /**
   * Creates an instance of the ClientAssertionCredential with the details
   * needed to authenticate against Microsoft Entra ID with a client
   * assertion provided by the developer through the `getAssertion` function parameter.
   *
   * @param tenantId - The Microsoft Entra tenant (directory) ID.
   * @param clientId - The client (application) ID of an App Registration in the tenant.
   * @param getAssertion - A function that retrieves the assertion for the credential to use.
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(tenantId, clientId, getAssertion, options = {}) {
    if (!tenantId) {
      throw new CredentialUnavailableError("ClientAssertionCredential: tenantId is a required parameter.");
    }
    if (!clientId) {
      throw new CredentialUnavailableError("ClientAssertionCredential: clientId is a required parameter.");
    }
    if (!getAssertion) {
      throw new CredentialUnavailableError("ClientAssertionCredential: clientAssertion is a required parameter.");
    }
    this.tenantId = tenantId;
    this.additionallyAllowedTenantIds = resolveAdditionallyAllowedTenantIds(options?.additionallyAllowedTenants);
    this.options = options;
    this.getAssertion = getAssertion;
    this.msalClient = createMsalClient(clientId, tenantId, {
      ...options,
      logger: logger12,
      tokenCredentialOptions: this.options
    });
  }
  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(scopes, options = {}) {
    return tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async (newOptions) => {
      newOptions.tenantId = processMultiTenantRequest(this.tenantId, newOptions, this.additionallyAllowedTenantIds, logger12);
      const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
      return this.msalClient.getTokenByClientAssertion(arrayScopes, this.getAssertion, newOptions);
    });
  }
};

// ../../node_modules/@azure/identity/dist/esm/credentials/workloadIdentityCredential.js
import { readFile as readFile2 } from "fs/promises";
var credentialName3 = "WorkloadIdentityCredential";
var SupportedWorkloadEnvironmentVariables = [
  "AZURE_TENANT_ID",
  "AZURE_CLIENT_ID",
  "AZURE_FEDERATED_TOKEN_FILE"
];
var logger13 = credentialLogger(credentialName3);
var WorkloadIdentityCredential = class {
  client;
  azureFederatedTokenFileContent = void 0;
  cacheDate = void 0;
  federatedTokenFilePath;
  /**
   * WorkloadIdentityCredential supports Microsoft Entra Workload ID on Kubernetes.
   *
   * @param options - The identity client options to use for authentication.
   */
  constructor(options) {
    const assignedEnv = processEnvVars(SupportedWorkloadEnvironmentVariables).assigned.join(", ");
    logger13.info(`Found the following environment variables: ${assignedEnv}`);
    const workloadIdentityCredentialOptions = options ?? {};
    const tenantId = workloadIdentityCredentialOptions.tenantId || process.env.AZURE_TENANT_ID;
    const clientId = workloadIdentityCredentialOptions.clientId || process.env.AZURE_CLIENT_ID;
    this.federatedTokenFilePath = workloadIdentityCredentialOptions.tokenFilePath || process.env.AZURE_FEDERATED_TOKEN_FILE;
    if (tenantId) {
      checkTenantId(logger13, tenantId);
    }
    if (!clientId) {
      throw new CredentialUnavailableError(`${credentialName3}: is unavailable. clientId is a required parameter. In DefaultAzureCredential and ManagedIdentityCredential, this can be provided as an environment variable - "AZURE_CLIENT_ID".
        See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/workloadidentitycredential/troubleshoot`);
    }
    if (!tenantId) {
      throw new CredentialUnavailableError(`${credentialName3}: is unavailable. tenantId is a required parameter. In DefaultAzureCredential and ManagedIdentityCredential, this can be provided as an environment variable - "AZURE_TENANT_ID".
        See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/workloadidentitycredential/troubleshoot`);
    }
    if (!this.federatedTokenFilePath) {
      throw new CredentialUnavailableError(`${credentialName3}: is unavailable. federatedTokenFilePath is a required parameter. In DefaultAzureCredential and ManagedIdentityCredential, this can be provided as an environment variable - "AZURE_FEDERATED_TOKEN_FILE".
        See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/workloadidentitycredential/troubleshoot`);
    }
    logger13.info(`Invoking ClientAssertionCredential with tenant ID: ${tenantId}, clientId: ${workloadIdentityCredentialOptions.clientId} and federated token path: [REDACTED]`);
    this.client = new ClientAssertionCredential(tenantId, clientId, this.readFileContents.bind(this), options);
  }
  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(scopes, options) {
    if (!this.client) {
      const errorMessage = `${credentialName3}: is unavailable. tenantId, clientId, and federatedTokenFilePath are required parameters. 
      In DefaultAzureCredential and ManagedIdentityCredential, these can be provided as environment variables - 
      "AZURE_TENANT_ID",
      "AZURE_CLIENT_ID",
      "AZURE_FEDERATED_TOKEN_FILE". See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/workloadidentitycredential/troubleshoot`;
      logger13.info(errorMessage);
      throw new CredentialUnavailableError(errorMessage);
    }
    logger13.info("Invoking getToken() of Client Assertion Credential");
    return this.client.getToken(scopes, options);
  }
  async readFileContents() {
    if (this.cacheDate !== void 0 && Date.now() - this.cacheDate >= 1e3 * 60 * 5) {
      this.azureFederatedTokenFileContent = void 0;
    }
    if (!this.federatedTokenFilePath) {
      throw new CredentialUnavailableError(`${credentialName3}: is unavailable. Invalid file path provided ${this.federatedTokenFilePath}.`);
    }
    if (!this.azureFederatedTokenFileContent) {
      const file = await readFile2(this.federatedTokenFilePath, "utf8");
      const value = file.trim();
      if (!value) {
        throw new CredentialUnavailableError(`${credentialName3}: is unavailable. No content on the file ${this.federatedTokenFilePath}.`);
      } else {
        this.azureFederatedTokenFileContent = value;
        this.cacheDate = Date.now();
      }
    }
    return this.azureFederatedTokenFileContent;
  }
};

// ../../node_modules/@azure/identity/dist/esm/credentials/managedIdentityCredential/tokenExchangeMsi.js
var msiName2 = "ManagedIdentityCredential - Token Exchange";
var logger14 = credentialLogger(msiName2);
var tokenExchangeMsi = {
  name: "tokenExchangeMsi",
  async isAvailable(clientId) {
    const env = process.env;
    const result = Boolean((clientId || env.AZURE_CLIENT_ID) && env.AZURE_TENANT_ID && process.env.AZURE_FEDERATED_TOKEN_FILE);
    if (!result) {
      logger14.info(`${msiName2}: Unavailable. The environment variables needed are: AZURE_CLIENT_ID (or the client ID sent through the parameters), AZURE_TENANT_ID and AZURE_FEDERATED_TOKEN_FILE`);
    }
    return result;
  },
  async getToken(configuration, getTokenOptions = {}) {
    const { scopes, clientId } = configuration;
    const identityClientTokenCredentialOptions = {};
    const workloadIdentityCredential = new WorkloadIdentityCredential({
      clientId,
      tenantId: process.env.AZURE_TENANT_ID,
      tokenFilePath: process.env.AZURE_FEDERATED_TOKEN_FILE,
      ...identityClientTokenCredentialOptions,
      disableInstanceDiscovery: true
    });
    return workloadIdentityCredential.getToken(scopes, getTokenOptions);
  }
};

// ../../node_modules/@azure/identity/dist/esm/credentials/managedIdentityCredential/index.js
var logger15 = credentialLogger("ManagedIdentityCredential");
var ManagedIdentityCredential = class {
  managedIdentityApp;
  identityClient;
  clientId;
  resourceId;
  objectId;
  msiRetryConfig = {
    maxRetries: 5,
    startDelayInMs: 800,
    intervalIncrement: 2
  };
  isAvailableIdentityClient;
  sendProbeRequest;
  /**
   * @internal
   * @hidden
   */
  constructor(clientIdOrOptions, options) {
    let _options;
    if (typeof clientIdOrOptions === "string") {
      this.clientId = clientIdOrOptions;
      _options = options ?? {};
    } else {
      this.clientId = clientIdOrOptions?.clientId;
      _options = clientIdOrOptions ?? {};
    }
    this.resourceId = _options?.resourceId;
    this.objectId = _options?.objectId;
    this.sendProbeRequest = _options?.sendProbeRequest ?? false;
    const providedIds = [
      { key: "clientId", value: this.clientId },
      { key: "resourceId", value: this.resourceId },
      { key: "objectId", value: this.objectId }
    ].filter((id) => id.value);
    if (providedIds.length > 1) {
      throw new Error(`ManagedIdentityCredential: only one of 'clientId', 'resourceId', or 'objectId' can be provided. Received values: ${JSON.stringify({ clientId: this.clientId, resourceId: this.resourceId, objectId: this.objectId })}`);
    }
    _options.allowInsecureConnection = true;
    if (_options.retryOptions?.maxRetries !== void 0) {
      this.msiRetryConfig.maxRetries = _options.retryOptions.maxRetries;
    }
    this.identityClient = new IdentityClient({
      ..._options,
      additionalPolicies: [{ policy: imdsRetryPolicy(this.msiRetryConfig), position: "perCall" }]
    });
    this.managedIdentityApp = new ManagedIdentityApplication({
      managedIdentityIdParams: {
        userAssignedClientId: this.clientId,
        userAssignedResourceId: this.resourceId,
        userAssignedObjectId: this.objectId
      },
      system: {
        disableInternalRetries: true,
        networkClient: this.identityClient,
        loggerOptions: {
          logLevel: getMSALLogLevel(getLogLevel()),
          piiLoggingEnabled: _options.loggingOptions?.enableUnsafeSupportLogging,
          loggerCallback: defaultLoggerCallback(logger15)
        }
      }
    });
    this.isAvailableIdentityClient = new IdentityClient({
      ..._options,
      retryOptions: {
        maxRetries: 0
      }
    });
    const managedIdentitySource = this.managedIdentityApp.getManagedIdentitySource();
    if (managedIdentitySource === "CloudShell") {
      if (this.clientId || this.resourceId || this.objectId) {
        logger15.warning(`CloudShell MSI detected with user-provided IDs - throwing. Received values: ${JSON.stringify({
          clientId: this.clientId,
          resourceId: this.resourceId,
          objectId: this.objectId
        })}.`);
        throw new CredentialUnavailableError("ManagedIdentityCredential: Specifying a user-assigned managed identity is not supported for CloudShell at runtime. When using Managed Identity in CloudShell, omit the clientId, resourceId, and objectId parameters.");
      }
    }
    if (managedIdentitySource === "ServiceFabric") {
      if (this.clientId || this.resourceId || this.objectId) {
        logger15.warning(`Service Fabric detected with user-provided IDs - throwing. Received values: ${JSON.stringify({
          clientId: this.clientId,
          resourceId: this.resourceId,
          objectId: this.objectId
        })}.`);
        throw new CredentialUnavailableError(`ManagedIdentityCredential: ${serviceFabricErrorMessage}`);
      }
    }
    logger15.info(`Using ${managedIdentitySource} managed identity.`);
    if (providedIds.length === 1) {
      const { key, value } = providedIds[0];
      logger15.info(`${managedIdentitySource} with ${key}: ${value}`);
    }
  }
  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   * If an unexpected error occurs, an {@link AuthenticationError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(scopes, options = {}) {
    logger15.getToken.info("Using the MSAL provider for Managed Identity.");
    const resource = mapScopesToResource(scopes);
    if (!resource) {
      throw new CredentialUnavailableError(`ManagedIdentityCredential: Multiple scopes are not supported. Scopes: ${JSON.stringify(scopes)}`);
    }
    return tracingClient.withSpan("ManagedIdentityCredential.getToken", options, async () => {
      try {
        const isTokenExchangeMsi = await tokenExchangeMsi.isAvailable(this.clientId);
        const identitySource = this.managedIdentityApp.getManagedIdentitySource();
        const isImdsMsi = identitySource === "DefaultToImds" || identitySource === "Imds";
        logger15.getToken.info(`MSAL Identity source: ${identitySource}`);
        if (isTokenExchangeMsi) {
          logger15.getToken.info("Using the token exchange managed identity.");
          const result = await tokenExchangeMsi.getToken({
            scopes,
            clientId: this.clientId,
            identityClient: this.identityClient,
            retryConfig: this.msiRetryConfig,
            resourceId: this.resourceId
          });
          if (result === null) {
            throw new CredentialUnavailableError("Attempted to use the token exchange managed identity, but received a null response.");
          }
          return result;
        } else if (isImdsMsi && this.sendProbeRequest) {
          logger15.getToken.info("Using the IMDS endpoint to probe for availability.");
          const isAvailable = await imdsMsi.isAvailable({
            scopes,
            clientId: this.clientId,
            getTokenOptions: options,
            identityClient: this.isAvailableIdentityClient,
            resourceId: this.resourceId
          });
          if (!isAvailable) {
            throw new CredentialUnavailableError(`Attempted to use the IMDS endpoint, but it is not available.`);
          }
        }
        logger15.getToken.info("Calling into MSAL for managed identity token.");
        const token = await this.managedIdentityApp.acquireToken({
          resource
        });
        this.ensureValidMsalToken(scopes, token, options);
        logger15.getToken.info(formatSuccess(scopes));
        return {
          expiresOnTimestamp: token.expiresOn.getTime(),
          token: token.accessToken,
          refreshAfterTimestamp: token.refreshOn?.getTime(),
          tokenType: "Bearer"
        };
      } catch (err) {
        logger15.getToken.error(formatError(scopes, err));
        if (err.name === "AuthenticationRequiredError") {
          throw err;
        }
        if (isNetworkError(err)) {
          throw new CredentialUnavailableError(`ManagedIdentityCredential: Network unreachable. Message: ${err.message}`, { cause: err });
        }
        throw new CredentialUnavailableError(`ManagedIdentityCredential: Authentication failed. Message ${err.message}`, { cause: err });
      }
    });
  }
  /**
   * Ensures the validity of the MSAL token
   */
  ensureValidMsalToken(scopes, msalToken, getTokenOptions) {
    const createError = (message) => {
      logger15.getToken.info(message);
      return new AuthenticationRequiredError({
        scopes: Array.isArray(scopes) ? scopes : [scopes],
        getTokenOptions,
        message
      });
    };
    if (!msalToken) {
      throw createError("No response.");
    }
    if (!msalToken.expiresOn) {
      throw createError(`Response had no "expiresOn" property.`);
    }
    if (!msalToken.accessToken) {
      throw createError(`Response had no "accessToken" property.`);
    }
  }
};
function isNetworkError(err) {
  if (err.errorCode === "network_error") {
    return true;
  }
  if (err.code === "ENETUNREACH" || err.code === "EHOSTUNREACH") {
    return true;
  }
  if (err.statusCode === 403 || err.code === 403) {
    if (err.message.includes("unreachable")) {
      return true;
    }
  }
  return false;
}

// ../../node_modules/@azure/identity/dist/esm/credentials/azureDeveloperCliCredential.js
import child_process from "child_process";
var logger16 = credentialLogger("AzureDeveloperCliCredential");
var azureDeveloperCliPublicErrorMessages = {
  notInstalled: "Azure Developer CLI couldn't be found. To mitigate this issue, see the troubleshooting guidelines at https://aka.ms/azsdk/js/identity/azdevclicredential/troubleshoot.",
  login: "Please run 'azd auth login' from a command prompt to authenticate before using this credential. For more information, see the troubleshooting guidelines at https://aka.ms/azsdk/js/identity/azdevclicredential/troubleshoot.",
  unknown: "Unknown error while trying to retrieve the access token",
  claim: "This credential doesn't support claims challenges. To authenticate with the required claims, please run the following command:"
};
var developerCliCredentialInternals = {
  /**
   * @internal
   */
  getSafeWorkingDir() {
    if (process.platform === "win32") {
      let systemRoot = process.env.SystemRoot || process.env["SYSTEMROOT"];
      if (!systemRoot) {
        logger16.getToken.warning("The SystemRoot environment variable is not set. This may cause issues when using the Azure Developer CLI credential.");
        systemRoot = "C:\\Windows";
      }
      return systemRoot;
    } else {
      return "/bin";
    }
  },
  /**
   * Gets the access token from Azure Developer CLI
   * @param scopes - The scopes to use when getting the token
   * @internal
   */
  async getAzdAccessToken(scopes, tenantId, timeout, claims) {
    let tenantSection = [];
    if (tenantId) {
      tenantSection = ["--tenant-id", tenantId];
    }
    let claimsSections = [];
    if (claims) {
      const encodedClaims = btoa(claims);
      claimsSections = ["--claims", encodedClaims];
    }
    return new Promise((resolve, reject) => {
      try {
        const args = [
          "auth",
          "token",
          "--output",
          "json",
          "--no-prompt",
          ...scopes.reduce((previous, current) => previous.concat("--scope", current), []),
          ...tenantSection,
          ...claimsSections
        ];
        const command = ["azd", ...args].join(" ");
        child_process.exec(command, {
          cwd: developerCliCredentialInternals.getSafeWorkingDir(),
          timeout
        }, (error, stdout, stderr) => {
          resolve({ stdout, stderr, error });
        });
      } catch (err) {
        reject(err);
      }
    });
  }
};
var AzureDeveloperCliCredential = class {
  tenantId;
  additionallyAllowedTenantIds;
  timeout;
  /**
   * Creates an instance of the {@link AzureDeveloperCliCredential}.
   *
   * To use this credential, ensure that you have already logged
   * in via the 'azd' tool using the command "azd auth login" from the commandline.
   *
   * @param options - Options, to optionally allow multi-tenant requests.
   */
  constructor(options) {
    if (options?.tenantId) {
      checkTenantId(logger16, options?.tenantId);
      this.tenantId = options?.tenantId;
    }
    this.additionallyAllowedTenantIds = resolveAdditionallyAllowedTenantIds(options?.additionallyAllowedTenants);
    this.timeout = options?.processTimeoutInMs;
  }
  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(scopes, options = {}) {
    const tenantId = processMultiTenantRequest(this.tenantId, options, this.additionallyAllowedTenantIds);
    if (tenantId) {
      checkTenantId(logger16, tenantId);
    }
    let scopeList;
    if (typeof scopes === "string") {
      scopeList = [scopes];
    } else {
      scopeList = scopes;
    }
    logger16.getToken.info(`Using the scopes ${scopes}`);
    return tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async () => {
      try {
        scopeList.forEach((scope) => {
          ensureValidScopeForDevTimeCreds(scope, logger16);
        });
        const obj = await developerCliCredentialInternals.getAzdAccessToken(scopeList, tenantId, this.timeout, options.claims);
        const isMFARequiredError = obj.stderr?.match("must use multi-factor authentication") || obj.stderr?.match("reauthentication required");
        const isNotLoggedInError = obj.stderr?.match("not logged in, run `azd login` to login") || obj.stderr?.match("not logged in, run `azd auth login` to login");
        const isNotInstallError = obj.stderr?.match("azd:(.*)not found") || obj.stderr?.startsWith("'azd' is not recognized");
        if (isNotInstallError || obj.error && obj.error.code === "ENOENT") {
          const error = new CredentialUnavailableError(azureDeveloperCliPublicErrorMessages.notInstalled);
          logger16.getToken.info(formatError(scopes, error));
          throw error;
        }
        if (isNotLoggedInError) {
          const error = new CredentialUnavailableError(azureDeveloperCliPublicErrorMessages.login);
          logger16.getToken.info(formatError(scopes, error));
          throw error;
        }
        if (isMFARequiredError) {
          const scope = scopeList.reduce((previous, current) => previous.concat("--scope", current), []).join(" ");
          const loginCmd = `azd auth login ${scope}`;
          const error = new CredentialUnavailableError(`${azureDeveloperCliPublicErrorMessages.claim} ${loginCmd}`);
          logger16.getToken.info(formatError(scopes, error));
          throw error;
        }
        try {
          const resp = JSON.parse(obj.stdout);
          logger16.getToken.info(formatSuccess(scopes));
          return {
            token: resp.token,
            expiresOnTimestamp: new Date(resp.expiresOn).getTime(),
            tokenType: "Bearer"
          };
        } catch (e) {
          if (obj.stderr) {
            throw new CredentialUnavailableError(obj.stderr);
          }
          throw e;
        }
      } catch (err) {
        const error = err.name === "CredentialUnavailableError" ? err : new CredentialUnavailableError(err.message || azureDeveloperCliPublicErrorMessages.unknown);
        logger16.getToken.info(formatError(scopes, error));
        throw error;
      }
    });
  }
};

// ../../node_modules/@azure/identity/dist/esm/credentials/azureCliCredential.js
import child_process2 from "child_process";

// ../../node_modules/@azure/identity/dist/esm/util/subscriptionUtils.js
function checkSubscription(logger27, subscription) {
  if (!subscription.match(/^[0-9a-zA-Z-._ ]+$/)) {
    const error = new Error(`Subscription '${subscription}' contains invalid characters. If this is the name of a subscription, use its ID instead. You can locate your subscription by following the instructions listed here: https://learn.microsoft.com/azure/azure-portal/get-subscription-tenant-id`);
    logger27.info(formatError("", error));
    throw error;
  }
}

// ../../node_modules/@azure/identity/dist/esm/credentials/azureCliCredential.js
var logger17 = credentialLogger("AzureCliCredential");
var azureCliPublicErrorMessages = {
  claim: "This credential doesn't support claims challenges. To authenticate with the required claims, please run the following command:",
  notInstalled: "Azure CLI could not be found. Please visit https://aka.ms/azure-cli for installation instructions and then, once installed, authenticate to your Azure account using 'az login'.",
  login: "Please run 'az login' from a command prompt to authenticate before using this credential.",
  unknown: "Unknown error while trying to retrieve the access token",
  unexpectedResponse: 'Unexpected response from Azure CLI when getting token. Expected "expiresOn" to be a RFC3339 date string. Got:'
};
var cliCredentialInternals = {
  /**
   * @internal
   */
  getSafeWorkingDir() {
    if (process.platform === "win32") {
      let systemRoot = process.env.SystemRoot || process.env["SYSTEMROOT"];
      if (!systemRoot) {
        logger17.getToken.warning("The SystemRoot environment variable is not set. This may cause issues when using the Azure CLI credential.");
        systemRoot = "C:\\Windows";
      }
      return systemRoot;
    } else {
      return "/bin";
    }
  },
  /**
   * Gets the access token from Azure CLI
   * @param resource - The resource to use when getting the token
   * @internal
   */
  async getAzureCliAccessToken(resource, tenantId, subscription, timeout) {
    let tenantSection = [];
    let subscriptionSection = [];
    if (tenantId) {
      tenantSection = ["--tenant", tenantId];
    }
    if (subscription) {
      subscriptionSection = ["--subscription", `"${subscription}"`];
    }
    return new Promise((resolve, reject) => {
      try {
        const args = [
          "account",
          "get-access-token",
          "--output",
          "json",
          "--resource",
          resource,
          ...tenantSection,
          ...subscriptionSection
        ];
        const command = ["az", ...args].join(" ");
        child_process2.exec(command, { cwd: cliCredentialInternals.getSafeWorkingDir(), timeout }, (error, stdout, stderr) => {
          resolve({ stdout, stderr, error });
        });
      } catch (err) {
        reject(err);
      }
    });
  }
};
var AzureCliCredential = class {
  tenantId;
  additionallyAllowedTenantIds;
  timeout;
  subscription;
  /**
   * Creates an instance of the {@link AzureCliCredential}.
   *
   * To use this credential, ensure that you have already logged
   * in via the 'az' tool using the command "az login" from the commandline.
   *
   * @param options - Options, to optionally allow multi-tenant requests.
   */
  constructor(options) {
    if (options?.tenantId) {
      checkTenantId(logger17, options?.tenantId);
      this.tenantId = options?.tenantId;
    }
    if (options?.subscription) {
      checkSubscription(logger17, options?.subscription);
      this.subscription = options?.subscription;
    }
    this.additionallyAllowedTenantIds = resolveAdditionallyAllowedTenantIds(options?.additionallyAllowedTenants);
    this.timeout = options?.processTimeoutInMs;
  }
  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  async getToken(scopes, options = {}) {
    const scope = typeof scopes === "string" ? scopes : scopes[0];
    const claimsValue = options.claims;
    if (claimsValue && claimsValue.trim()) {
      const encodedClaims = btoa(claimsValue);
      let loginCmd = `az login --claims-challenge ${encodedClaims} --scope ${scope}`;
      const tenantIdFromOptions = options.tenantId;
      if (tenantIdFromOptions) {
        loginCmd += ` --tenant ${tenantIdFromOptions}`;
      }
      const error = new CredentialUnavailableError(`${azureCliPublicErrorMessages.claim} ${loginCmd}`);
      logger17.getToken.info(formatError(scope, error));
      throw error;
    }
    const tenantId = processMultiTenantRequest(this.tenantId, options, this.additionallyAllowedTenantIds);
    if (tenantId) {
      checkTenantId(logger17, tenantId);
    }
    if (this.subscription) {
      checkSubscription(logger17, this.subscription);
    }
    logger17.getToken.info(`Using the scope ${scope}`);
    return tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async () => {
      try {
        ensureValidScopeForDevTimeCreds(scope, logger17);
        const resource = getScopeResource(scope);
        const obj = await cliCredentialInternals.getAzureCliAccessToken(resource, tenantId, this.subscription, this.timeout);
        const specificScope = obj.stderr?.match("(.*)az login --scope(.*)");
        const isLoginError2 = obj.stderr?.match("(.*)az login(.*)") && !specificScope;
        const isNotInstallError = obj.stderr?.match("az:(.*)not found") || obj.stderr?.startsWith("'az' is not recognized");
        if (isNotInstallError) {
          const error = new CredentialUnavailableError(azureCliPublicErrorMessages.notInstalled);
          logger17.getToken.info(formatError(scopes, error));
          throw error;
        }
        if (isLoginError2) {
          const error = new CredentialUnavailableError(azureCliPublicErrorMessages.login);
          logger17.getToken.info(formatError(scopes, error));
          throw error;
        }
        try {
          const responseData = obj.stdout;
          const response = this.parseRawResponse(responseData);
          logger17.getToken.info(formatSuccess(scopes));
          return response;
        } catch (e) {
          if (obj.stderr) {
            throw new CredentialUnavailableError(obj.stderr);
          }
          throw e;
        }
      } catch (err) {
        const error = err.name === "CredentialUnavailableError" ? err : new CredentialUnavailableError(err.message || azureCliPublicErrorMessages.unknown);
        logger17.getToken.info(formatError(scopes, error));
        throw error;
      }
    });
  }
  /**
   * Parses the raw JSON response from the Azure CLI into a usable AccessToken object
   *
   * @param rawResponse - The raw JSON response from the Azure CLI
   * @returns An access token with the expiry time parsed from the raw response
   *
   * The expiryTime of the credential's access token, in milliseconds, is calculated as follows:
   *
   * When available, expires_on (introduced in Azure CLI v2.54.0) will be preferred. Otherwise falls back to expiresOn.
   */
  parseRawResponse(rawResponse) {
    const response = JSON.parse(rawResponse);
    const token = response.accessToken;
    let expiresOnTimestamp = Number.parseInt(response.expires_on, 10) * 1e3;
    if (!isNaN(expiresOnTimestamp)) {
      logger17.getToken.info("expires_on is available and is valid, using it");
      return {
        token,
        expiresOnTimestamp,
        tokenType: "Bearer"
      };
    }
    expiresOnTimestamp = new Date(response.expiresOn).getTime();
    if (isNaN(expiresOnTimestamp)) {
      throw new CredentialUnavailableError(`${azureCliPublicErrorMessages.unexpectedResponse} "${response.expiresOn}"`);
    }
    return {
      token,
      expiresOnTimestamp,
      tokenType: "Bearer"
    };
  }
};

// ../../node_modules/@azure/identity/dist/esm/util/processUtils.js
import childProcess2 from "child_process";
var processUtils = {
  /**
   * Promisifying childProcess.execFile
   * @internal
   */
  execFile(file, params, options) {
    return new Promise((resolve, reject) => {
      childProcess2.execFile(file, params, options, (error, stdout, stderr) => {
        if (Buffer.isBuffer(stdout)) {
          stdout = stdout.toString("utf8");
        }
        if (Buffer.isBuffer(stderr)) {
          stderr = stderr.toString("utf8");
        }
        if (stderr || error) {
          reject(stderr ? new Error(stderr) : error);
        } else {
          resolve(stdout);
        }
      });
    });
  }
};

// ../../node_modules/@azure/identity/dist/esm/credentials/azurePowerShellCredential.js
var logger18 = credentialLogger("AzurePowerShellCredential");
var isWindows = process.platform === "win32";
function formatCommand(commandName) {
  if (isWindows) {
    return `${commandName}.exe`;
  } else {
    return commandName;
  }
}
async function runCommands(commands, timeout) {
  const results = [];
  for (const command of commands) {
    const [file, ...parameters] = command;
    const result = await processUtils.execFile(file, parameters, {
      encoding: "utf8",
      timeout
    });
    results.push(result);
  }
  return results;
}
var powerShellErrors = {
  login: "Run Connect-AzAccount to login",
  installed: "The specified module 'Az.Accounts' with version '2.2.0' was not loaded because no valid module file was found in any module directory"
};
var powerShellPublicErrorMessages = {
  login: "Please run 'Connect-AzAccount' from PowerShell to authenticate before using this credential.",
  installed: `The 'Az.Account' module >= 2.2.0 is not installed. Install the Azure Az PowerShell module with: "Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -Force".`,
  claim: "This credential doesn't support claims challenges. To authenticate with the required claims, please run the following command:",
  troubleshoot: `To troubleshoot, visit https://aka.ms/azsdk/js/identity/powershellcredential/troubleshoot.`
};
var isLoginError = (err) => err.message.match(`(.*)${powerShellErrors.login}(.*)`);
var isNotInstalledError = (err) => err.message.match(powerShellErrors.installed);
var commandStack = [formatCommand("pwsh")];
if (isWindows) {
  commandStack.push(formatCommand("powershell"));
}
var AzurePowerShellCredential = class {
  tenantId;
  additionallyAllowedTenantIds;
  timeout;
  /**
   * Creates an instance of the {@link AzurePowerShellCredential}.
   *
   * To use this credential:
   * - Install the Azure Az PowerShell module with:
   *   `Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -Force`.
   * - You have already logged in to Azure PowerShell using the command
   * `Connect-AzAccount` from the command line.
   *
   * @param options - Options, to optionally allow multi-tenant requests.
   */
  constructor(options) {
    if (options?.tenantId) {
      checkTenantId(logger18, options?.tenantId);
      this.tenantId = options?.tenantId;
    }
    this.additionallyAllowedTenantIds = resolveAdditionallyAllowedTenantIds(options?.additionallyAllowedTenants);
    this.timeout = options?.processTimeoutInMs;
  }
  /**
   * Gets the access token from Azure PowerShell
   * @param resource - The resource to use when getting the token
   */
  async getAzurePowerShellAccessToken(resource, tenantId, timeout) {
    for (const powerShellCommand of [...commandStack]) {
      try {
        await runCommands([[powerShellCommand, "/?"]], timeout);
      } catch (e) {
        commandStack.shift();
        continue;
      }
      const results = await runCommands([
        [
          powerShellCommand,
          "-NoProfile",
          "-NonInteractive",
          "-Command",
          `
          $tenantId = "${tenantId ?? ""}"
          $m = Import-Module Az.Accounts -MinimumVersion 2.2.0 -PassThru
          $useSecureString = $m.Version -ge [version]'2.17.0' -and $m.Version -lt [version]'5.0.0'

          $params = @{
            ResourceUrl = "${resource}"
          }

          if ($tenantId.Length -gt 0) {
            $params["TenantId"] = $tenantId
          }

          if ($useSecureString) {
            $params["AsSecureString"] = $true
          }

          $token = Get-AzAccessToken @params

          $result = New-Object -TypeName PSObject
          $result | Add-Member -MemberType NoteProperty -Name ExpiresOn -Value $token.ExpiresOn

          if ($token.Token -is [System.Security.SecureString]) {
            if ($PSVersionTable.PSVersion.Major -lt 7) {
              $ssPtr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($token.Token)
              try {
                $result | Add-Member -MemberType NoteProperty -Name Token -Value ([System.Runtime.InteropServices.Marshal]::PtrToStringBSTR($ssPtr))
              }
              finally {
                [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ssPtr)
              }
            }
            else {
              $result | Add-Member -MemberType NoteProperty -Name Token -Value ($token.Token | ConvertFrom-SecureString -AsPlainText)
            }
          }
          else {
            $result | Add-Member -MemberType NoteProperty -Name Token -Value $token.Token
          }

          Write-Output (ConvertTo-Json $result)
          `
        ]
      ]);
      const result = results[0];
      return parseJsonToken(result);
    }
    throw new Error(`Unable to execute PowerShell. Ensure that it is installed in your system`);
  }
  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If the authentication cannot be performed through PowerShell, a {@link CredentialUnavailableError} will be thrown.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this TokenCredential implementation might make.
   */
  async getToken(scopes, options = {}) {
    return tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async () => {
      const scope = typeof scopes === "string" ? scopes : scopes[0];
      const claimsValue = options.claims;
      if (claimsValue && claimsValue.trim()) {
        const encodedClaims = btoa(claimsValue);
        let loginCmd = `Connect-AzAccount -ClaimsChallenge ${encodedClaims}`;
        const tenantIdFromOptions = options.tenantId;
        if (tenantIdFromOptions) {
          loginCmd += ` -Tenant ${tenantIdFromOptions}`;
        }
        const error = new CredentialUnavailableError(`${powerShellPublicErrorMessages.claim} ${loginCmd}`);
        logger18.getToken.info(formatError(scope, error));
        throw error;
      }
      const tenantId = processMultiTenantRequest(this.tenantId, options, this.additionallyAllowedTenantIds);
      if (tenantId) {
        checkTenantId(logger18, tenantId);
      }
      try {
        ensureValidScopeForDevTimeCreds(scope, logger18);
        logger18.getToken.info(`Using the scope ${scope}`);
        const resource = getScopeResource(scope);
        const response = await this.getAzurePowerShellAccessToken(resource, tenantId, this.timeout);
        logger18.getToken.info(formatSuccess(scopes));
        return {
          token: response.Token,
          expiresOnTimestamp: new Date(response.ExpiresOn).getTime(),
          tokenType: "Bearer"
        };
      } catch (err) {
        if (isNotInstalledError(err)) {
          const error2 = new CredentialUnavailableError(powerShellPublicErrorMessages.installed);
          logger18.getToken.info(formatError(scope, error2));
          throw error2;
        } else if (isLoginError(err)) {
          const error2 = new CredentialUnavailableError(powerShellPublicErrorMessages.login);
          logger18.getToken.info(formatError(scope, error2));
          throw error2;
        }
        const error = new CredentialUnavailableError(`${err}. ${powerShellPublicErrorMessages.troubleshoot}`);
        logger18.getToken.info(formatError(scope, error));
        throw error;
      }
    });
  }
};
async function parseJsonToken(result) {
  const jsonRegex = /{[^{}]*}/g;
  const matches = result.match(jsonRegex);
  let resultWithoutToken = result;
  if (matches) {
    try {
      for (const item of matches) {
        try {
          const jsonContent = JSON.parse(item);
          if (jsonContent?.Token) {
            resultWithoutToken = resultWithoutToken.replace(item, "");
            if (resultWithoutToken) {
              logger18.getToken.warning(resultWithoutToken);
            }
            return jsonContent;
          }
        } catch (e) {
          continue;
        }
      }
    } catch (e) {
      throw new Error(`Unable to parse the output of PowerShell. Received output: ${result}`);
    }
  }
  throw new Error(`No access token found in the output. Received output: ${result}`);
}

// ../../node_modules/@azure/identity/dist/esm/credentials/visualStudioCodeCredential.js
import { readFile as readFile3 } from "fs/promises";
var CommonTenantId = "common";
var VSCodeClientId = "aebc6443-996d-45c2-90f0-388ff96faa56";
var logger19 = credentialLogger("VisualStudioCodeCredential");
var unsupportedTenantIds = {
  adfs: "The VisualStudioCodeCredential does not support authentication with ADFS tenants."
};
function checkUnsupportedTenant(tenantId) {
  const unsupportedTenantError = unsupportedTenantIds[tenantId];
  if (unsupportedTenantError) {
    throw new CredentialUnavailableError(unsupportedTenantError);
  }
}
var VisualStudioCodeCredential = class {
  tenantId;
  additionallyAllowedTenantIds;
  msalClient;
  options;
  /**
   * Creates an instance of VisualStudioCodeCredential to use for automatically authenticating via VSCode.
   *
   * **Note**: `VisualStudioCodeCredential` is provided by a plugin package:
   * `@azure/identity-vscode`. If this package is not installed, then authentication using
   * `VisualStudioCodeCredential` will not be available.
   *
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(options) {
    this.options = options || {};
    if (options && options.tenantId) {
      checkTenantId(logger19, options.tenantId);
      this.tenantId = options.tenantId;
    } else {
      this.tenantId = CommonTenantId;
    }
    this.additionallyAllowedTenantIds = resolveAdditionallyAllowedTenantIds(options?.additionallyAllowedTenants);
    checkUnsupportedTenant(this.tenantId);
  }
  /**
   * Runs preparations for any further getToken request:
   *   - Validates that the plugin is available.
   *   - Loads the authentication record from VSCode if available.
   *   - Creates the MSAL client with the loaded plugin and authentication record.
   */
  async prepare(scopes) {
    const tenantId = processMultiTenantRequest(this.tenantId, this.options, this.additionallyAllowedTenantIds, logger19) || this.tenantId;
    if (!hasVSCodePlugin() || !vsCodeAuthRecordPath) {
      throw new CredentialUnavailableError("Visual Studio Code Authentication is not available. Ensure you have have Azure Resources Extension installed in VS Code, signed into Azure via VS Code, installed the @azure/identity-vscode package, and properly configured the extension.");
    }
    const authenticationRecord = await this.loadAuthRecord(vsCodeAuthRecordPath, scopes);
    this.msalClient = createMsalClient(VSCodeClientId, tenantId, {
      ...this.options,
      isVSCodeCredential: true,
      brokerOptions: {
        enabled: true,
        parentWindowHandle: new Uint8Array(0),
        useDefaultBrokerAccount: true
      },
      authenticationRecord
    });
  }
  /**
   * The promise of the single preparation that will be executed at the first getToken request for an instance of this class.
   */
  preparePromise;
  /**
   * Runs preparations for any further getToken, but only once.
   */
  prepareOnce(scopes) {
    if (!this.preparePromise) {
      this.preparePromise = this.prepare(scopes);
    }
    return this.preparePromise;
  }
  /**
   * Returns the token found by searching VSCode's authentication cache or
   * returns null if no token could be found.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                `TokenCredential` implementation might make.
   */
  async getToken(scopes, options) {
    const scopeArray = ensureScopes(scopes);
    await this.prepareOnce(scopeArray);
    if (!this.msalClient) {
      throw new CredentialUnavailableError("Visual Studio Code Authentication failed to initialize. Ensure you have have Azure Resources Extension installed in VS Code, signed into Azure via VS Code, installed the @azure/identity-vscode package, and properly configured the extension.");
    }
    return this.msalClient.getTokenByInteractiveRequest(scopeArray, {
      ...options,
      disableAutomaticAuthentication: true
    });
  }
  /**
   * Loads the authentication record from the specified path.
   * @param authRecordPath - The path to the authentication record file.
   * @param scopes - The list of scopes for which the token will have access.
   * @returns The authentication record or undefined if loading fails.
   */
  async loadAuthRecord(authRecordPath, scopes) {
    try {
      const authRecordContent = await readFile3(authRecordPath, { encoding: "utf8" });
      return deserializeAuthenticationRecord(authRecordContent);
    } catch (error) {
      logger19.getToken.info(formatError(scopes, error));
      throw new CredentialUnavailableError("Cannot load authentication record in Visual Studio Code. Ensure you have have Azure Resources Extension installed in VS Code, signed into Azure via VS Code, installed the @azure/identity-vscode package, and properly configured the extension.");
    }
  }
};

// ../../node_modules/@azure/identity/dist/esm/credentials/brokerCredential.js
var logger20 = credentialLogger("BrokerCredential");
var BrokerCredential = class {
  brokerMsalClient;
  brokerTenantId;
  brokerAdditionallyAllowedTenantIds;
  /**
   * Creates an instance of BrokerCredential with the required broker options.
   *
   * This credential uses WAM (Web Account Manager) for authentication, which provides
   * better security and user experience on Windows platforms.
   *
   * @param options - Options for configuring the broker credential, including required broker options.
   */
  constructor(options) {
    this.brokerTenantId = resolveTenantId(logger20, options.tenantId);
    this.brokerAdditionallyAllowedTenantIds = resolveAdditionallyAllowedTenantIds(options?.additionallyAllowedTenants);
    const msalClientOptions = {
      ...options,
      tokenCredentialOptions: options,
      logger: logger20,
      brokerOptions: {
        enabled: true,
        parentWindowHandle: new Uint8Array(0),
        useDefaultBrokerAccount: true
      }
    };
    this.brokerMsalClient = createMsalClient(DeveloperSignOnClientId, this.brokerTenantId, msalClientOptions);
  }
  /**
   * Authenticates with Microsoft Entra ID using WAM broker and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * This method extends the base getToken method to support silentAuthenticationOnly option
   * when using broker authentication.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure the token request, including silentAuthenticationOnly option.
   */
  async getToken(scopes, options = {}) {
    return tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async (newOptions) => {
      newOptions.tenantId = processMultiTenantRequest(this.brokerTenantId, newOptions, this.brokerAdditionallyAllowedTenantIds, logger20);
      const arrayScopes = ensureScopes(scopes);
      try {
        return this.brokerMsalClient.getBrokeredToken(arrayScopes, true, {
          ...newOptions,
          disableAutomaticAuthentication: true
        });
      } catch (e) {
        logger20.getToken.info(formatError(arrayScopes, e));
        throw new CredentialUnavailableError("Failed to acquire token using broker authentication", { cause: e });
      }
    });
  }
};

// ../../node_modules/@azure/identity/dist/esm/credentials/defaultAzureCredentialFunctions.js
function createDefaultBrokerCredential(options = {}) {
  return new BrokerCredential(options);
}
function createDefaultVisualStudioCodeCredential(options = {}) {
  return new VisualStudioCodeCredential(options);
}
function createDefaultManagedIdentityCredential(options = {}) {
  options.retryOptions ??= {
    maxRetries: 5,
    retryDelayInMs: 800
  };
  options.sendProbeRequest ??= true;
  const managedIdentityClientId = options?.managedIdentityClientId ?? process.env.AZURE_CLIENT_ID;
  const workloadIdentityClientId = options?.workloadIdentityClientId ?? managedIdentityClientId;
  const managedResourceId = options?.managedIdentityResourceId;
  const workloadFile = process.env.AZURE_FEDERATED_TOKEN_FILE;
  const tenantId = options?.tenantId ?? process.env.AZURE_TENANT_ID;
  if (managedResourceId) {
    const managedIdentityResourceIdOptions = {
      ...options,
      resourceId: managedResourceId
    };
    return new ManagedIdentityCredential(managedIdentityResourceIdOptions);
  }
  if (workloadFile && workloadIdentityClientId) {
    const workloadIdentityCredentialOptions = {
      ...options,
      tenantId
    };
    return new ManagedIdentityCredential(workloadIdentityClientId, workloadIdentityCredentialOptions);
  }
  if (managedIdentityClientId) {
    const managedIdentityClientOptions = {
      ...options,
      clientId: managedIdentityClientId
    };
    return new ManagedIdentityCredential(managedIdentityClientOptions);
  }
  return new ManagedIdentityCredential(options);
}
function createDefaultWorkloadIdentityCredential(options) {
  const managedIdentityClientId = options?.managedIdentityClientId ?? process.env.AZURE_CLIENT_ID;
  const workloadIdentityClientId = options?.workloadIdentityClientId ?? managedIdentityClientId;
  const workloadFile = process.env.AZURE_FEDERATED_TOKEN_FILE;
  const tenantId = options?.tenantId ?? process.env.AZURE_TENANT_ID;
  if (workloadFile && workloadIdentityClientId) {
    const workloadIdentityCredentialOptions = {
      ...options,
      tenantId,
      clientId: workloadIdentityClientId,
      tokenFilePath: workloadFile
    };
    return new WorkloadIdentityCredential(workloadIdentityCredentialOptions);
  }
  if (tenantId) {
    const workloadIdentityClientTenantOptions = {
      ...options,
      tenantId
    };
    return new WorkloadIdentityCredential(workloadIdentityClientTenantOptions);
  }
  return new WorkloadIdentityCredential(options);
}
function createDefaultAzureDeveloperCliCredential(options = {}) {
  return new AzureDeveloperCliCredential(options);
}
function createDefaultAzureCliCredential(options = {}) {
  return new AzureCliCredential(options);
}
function createDefaultAzurePowershellCredential(options = {}) {
  return new AzurePowerShellCredential(options);
}
function createDefaultEnvironmentCredential(options = {}) {
  return new EnvironmentCredential(options);
}

// ../../node_modules/@azure/identity/dist/esm/credentials/defaultAzureCredential.js
var logger21 = credentialLogger("DefaultAzureCredential");
var UnavailableDefaultCredential = class {
  credentialUnavailableErrorMessage;
  credentialName;
  constructor(credentialName6, message) {
    this.credentialName = credentialName6;
    this.credentialUnavailableErrorMessage = message;
  }
  getToken() {
    logger21.getToken.info(`Skipping ${this.credentialName}, reason: ${this.credentialUnavailableErrorMessage}`);
    return Promise.resolve(null);
  }
};
var DefaultAzureCredential = class extends ChainedTokenCredential {
  constructor(options) {
    validateRequiredEnvVars(options);
    const azureTokenCredentials = process.env.AZURE_TOKEN_CREDENTIALS ? process.env.AZURE_TOKEN_CREDENTIALS.trim().toLowerCase() : void 0;
    const devCredentialFunctions = [
      createDefaultVisualStudioCodeCredential,
      createDefaultAzureCliCredential,
      createDefaultAzurePowershellCredential,
      createDefaultAzureDeveloperCliCredential,
      createDefaultBrokerCredential
    ];
    const prodCredentialFunctions = [
      createDefaultEnvironmentCredential,
      createDefaultWorkloadIdentityCredential,
      createDefaultManagedIdentityCredential
    ];
    let credentialFunctions = [];
    const validCredentialNames = "EnvironmentCredential, WorkloadIdentityCredential, ManagedIdentityCredential, VisualStudioCodeCredential, AzureCliCredential, AzurePowerShellCredential, AzureDeveloperCliCredential";
    if (azureTokenCredentials) {
      switch (azureTokenCredentials) {
        case "dev":
          credentialFunctions = devCredentialFunctions;
          break;
        case "prod":
          credentialFunctions = prodCredentialFunctions;
          break;
        case "environmentcredential":
          credentialFunctions = [createDefaultEnvironmentCredential];
          break;
        case "workloadidentitycredential":
          credentialFunctions = [createDefaultWorkloadIdentityCredential];
          break;
        case "managedidentitycredential":
          credentialFunctions = [
            () => createDefaultManagedIdentityCredential({ sendProbeRequest: false })
          ];
          break;
        case "visualstudiocodecredential":
          credentialFunctions = [createDefaultVisualStudioCodeCredential];
          break;
        case "azureclicredential":
          credentialFunctions = [createDefaultAzureCliCredential];
          break;
        case "azurepowershellcredential":
          credentialFunctions = [createDefaultAzurePowershellCredential];
          break;
        case "azuredeveloperclicredential":
          credentialFunctions = [createDefaultAzureDeveloperCliCredential];
          break;
        default: {
          const errorMessage = `Invalid value for AZURE_TOKEN_CREDENTIALS = ${process.env.AZURE_TOKEN_CREDENTIALS}. Valid values are 'prod' or 'dev' or any of these credentials - ${validCredentialNames}.`;
          logger21.warning(errorMessage);
          throw new Error(errorMessage);
        }
      }
    } else {
      credentialFunctions = [...prodCredentialFunctions, ...devCredentialFunctions];
    }
    const credentials = credentialFunctions.map((createCredentialFn) => {
      try {
        return createCredentialFn(options ?? {});
      } catch (err) {
        logger21.warning(`Skipped ${createCredentialFn.name} because of an error creating the credential: ${err}`);
        return new UnavailableDefaultCredential(createCredentialFn.name, err.message);
      }
    });
    super(...credentials);
  }
};
function validateRequiredEnvVars(options) {
  if (options?.requiredEnvVars) {
    const requiredVars = Array.isArray(options.requiredEnvVars) ? options.requiredEnvVars : [options.requiredEnvVars];
    const missing = requiredVars.filter((envVar) => !process.env[envVar]);
    if (missing.length > 0) {
      const errorMessage = `Required environment ${missing.length === 1 ? "variable" : "variables"} '${missing.join(", ")}' for DefaultAzureCredential ${missing.length === 1 ? "is" : "are"} not set or empty.`;
      logger21.warning(errorMessage);
      throw new Error(errorMessage);
    }
  }
}

// ../../node_modules/@azure/identity/dist/esm/credentials/interactiveBrowserCredential.js
var logger22 = credentialLogger("InteractiveBrowserCredential");

// ../../node_modules/@azure/identity/dist/esm/credentials/deviceCodeCredential.js
var logger23 = credentialLogger("DeviceCodeCredential");

// ../../node_modules/@azure/identity/dist/esm/credentials/azurePipelinesCredential.js
var credentialName4 = "AzurePipelinesCredential";
var logger24 = credentialLogger(credentialName4);

// ../../node_modules/@azure/identity/dist/esm/credentials/authorizationCodeCredential.js
var logger25 = credentialLogger("AuthorizationCodeCredential");

// ../../node_modules/@azure/identity/dist/esm/credentials/onBehalfOfCredential.js
import { createHash as createHash4 } from "crypto";
import { readFile as readFile4 } from "fs/promises";
var credentialName5 = "OnBehalfOfCredential";
var logger26 = credentialLogger(credentialName5);

// src/azure.strategy.ts
var AzureSecretsStrategy = class {
  client;
  vaultUrl;
  maxRetries;
  baseDelayMs;
  constructor(config) {
    resolveCloud(config, "keyvault");
    this.vaultUrl = config.config?.["vaultUrl"] ?? `https://${config.config?.["vaultName"] ?? "default"}.vault.azure.net`;
    const credential = config.config?.["credential"] ?? new DefaultAzureCredential();
    this.client = new SecretClient(this.vaultUrl, credential, config.config);
    this.maxRetries = config.config?.["maxRetries"] ?? 3;
    this.baseDelayMs = config.config?.["baseDelayMs"] ?? 100;
  }
  retry(fn) {
    return withRetry(fn, { maxRetries: this.maxRetries, baseDelayMs: this.baseDelayMs });
  }
  async getSecret(name3) {
    try {
      const secret = await this.retry(() => this.client.getSecret(name3));
      return {
        name: secret.name ?? name3,
        value: secret.value ?? "",
        versionId: secret.properties.version,
        created: secret.properties.createdOn ?? /* @__PURE__ */ new Date(),
        lastModified: secret.properties.updatedOn ?? /* @__PURE__ */ new Date()
      };
    } catch (err) {
      if (err.statusCode === 404) throw new SecretNotFoundError("azure", "keyvault", name3);
      if (err.statusCode === 403) throw new AuthError("azure", "keyvault", "getSecret");
      throw err;
    }
  }
  async createSecret(name3, value, options) {
    const secret = await this.retry(() => this.client.setSecret(name3, value, {
      tags: options?.tags
    }));
    return {
      name: secret.name ?? name3,
      created: secret.properties.createdOn ?? /* @__PURE__ */ new Date()
    };
  }
  async updateSecret(name3, value) {
    const secret = await this.retry(() => this.client.setSecret(name3, value));
    return {
      name: secret.name ?? name3,
      created: secret.properties.createdOn ?? /* @__PURE__ */ new Date()
    };
  }
  async deleteSecret(name3, _options) {
    try {
      const poller = await this.retry(() => this.client.beginDeleteSecret(name3));
      await poller.pollUntilDone();
    } catch (err) {
      if (err.statusCode === 404) return;
      throw err;
    }
  }
  async listSecrets(options) {
    const secrets = await this.retry(async () => {
      const results = [];
      let count = 0;
      for await (const secret of this.client.listPropertiesOfSecrets()) {
        results.push({
          name: secret.name,
          created: secret.createdOn ?? /* @__PURE__ */ new Date()
        });
        count++;
        if (options?.maxResults && count >= options.maxResults) break;
      }
      return results;
    });
    return { secrets };
  }
};

// src/index.ts
var strategyRegistry = {
  aws: AwsSecretsStrategy,
  gcp: GcpSecretsStrategy,
  azure: AzureSecretsStrategy
};
function createSecrets(config) {
  const cloud = resolveCloud(config, "secrets");
  const Strategy = strategyRegistry[cloud];
  if (!Strategy) throw new InvalidCloudError(cloud, "secrets");
  return new Strategy(config);
}
export {
  AuthError,
  CloudError,
  CloudNotConfiguredError,
  InvalidCloudError,
  NotImplementedError,
  SecretNotFoundError,
  TimeoutError,
  ValidationError,
  createSecrets
};
/*! Bundled license information:

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)

@azure/msal-node/dist/cache/serializer/Serializer.mjs:
@azure/msal-node/dist/cache/serializer/Deserializer.mjs:
@azure/msal-node/dist/internals.mjs:
@azure/msal-node/dist/utils/Constants.mjs:
@azure/msal-node/dist/network/HttpClient.mjs:
@azure/msal-node/dist/error/ManagedIdentityErrorCodes.mjs:
@azure/msal-node/dist/error/ManagedIdentityError.mjs:
@azure/msal-node/dist/config/ManagedIdentityId.mjs:
@azure/msal-node/dist/error/NodeAuthError.mjs:
@azure/msal-node/dist/config/Configuration.mjs:
@azure/msal-node/dist/crypto/GuidGenerator.mjs:
@azure/msal-node/dist/utils/EncodingUtils.mjs:
@azure/msal-node/dist/crypto/HashUtils.mjs:
@azure/msal-node/dist/crypto/PkceGenerator.mjs:
@azure/msal-node/dist/crypto/CryptoProvider.mjs:
@azure/msal-node/dist/cache/CacheHelpers.mjs:
@azure/msal-node/dist/cache/NodeStorage.mjs:
@azure/msal-node/dist/cache/TokenCache.mjs:
@azure/msal-node/dist/error/ClientAuthErrorCodes.mjs:
@azure/msal-node/dist/client/ClientAssertion.mjs:
@azure/msal-node/dist/packageMetadata.mjs:
@azure/msal-node/dist/client/BaseClient.mjs:
@azure/msal-node/dist/client/UsernamePasswordClient.mjs:
@azure/msal-node/dist/protocol/Authorize.mjs:
@azure/msal-node/dist/client/ClientApplication.mjs:
@azure/msal-node/dist/network/LoopbackClient.mjs:
@azure/msal-node/dist/client/DeviceCodeClient.mjs:
@azure/msal-node/dist/client/PublicClientApplication.mjs:
@azure/msal-node/dist/client/ClientCredentialClient.mjs:
@azure/msal-node/dist/client/OnBehalfOfClient.mjs:
@azure/msal-node/dist/client/UserFederatedIdentityCredentialClient.mjs:
@azure/msal-node/dist/client/ConfidentialClientApplication.mjs:
@azure/msal-node/dist/utils/TimeUtils.mjs:
@azure/msal-node/dist/network/HttpClientWithRetries.mjs:
@azure/msal-node/dist/client/ManagedIdentitySources/BaseManagedIdentitySource.mjs:
@azure/msal-node/dist/retry/LinearRetryStrategy.mjs:
@azure/msal-node/dist/retry/DefaultManagedIdentityRetryPolicy.mjs:
@azure/msal-node/dist/config/ManagedIdentityRequestParameters.mjs:
@azure/msal-node/dist/client/ManagedIdentitySources/AppService.mjs:
@azure/msal-node/dist/client/ManagedIdentitySources/AzureArc.mjs:
@azure/msal-node/dist/client/ManagedIdentitySources/CloudShell.mjs:
@azure/msal-node/dist/retry/ExponentialRetryStrategy.mjs:
@azure/msal-node/dist/retry/ImdsRetryPolicy.mjs:
@azure/msal-node/dist/client/ManagedIdentitySources/Imds.mjs:
@azure/msal-node/dist/client/ManagedIdentitySources/ServiceFabric.mjs:
@azure/msal-node/dist/client/ManagedIdentitySources/MachineLearning.mjs:
@azure/msal-node/dist/client/ManagedIdentityClient.mjs:
@azure/msal-node/dist/client/ManagedIdentityApplication.mjs:
@azure/msal-node/dist/cache/distributed/DistributedCachePlugin.mjs:
@azure/msal-node/dist/index.mjs:
  (*! @azure/msal-node v5.4.2 2026-07-21 *)

@azure/msal-common/dist/constants/AADServerParamKeys.mjs:
@azure/msal-common/dist/utils/Constants.mjs:
@azure/msal-common/dist/error/AuthError.mjs:
@azure/msal-common/dist/error/ClientAuthError.mjs:
@azure/msal-common/dist/error/ClientAuthErrorCodes.mjs:
@azure/msal-common/dist/account/ClientInfo.mjs:
@azure/msal-common/dist/account/AuthToken.mjs:
@azure/msal-common/dist/account/AccountInfo.mjs:
@azure/msal-common/dist/authority/AuthorityType.mjs:
@azure/msal-common/dist/account/TokenClaims.mjs:
@azure/msal-common/dist/authority/ProtocolMode.mjs:
@azure/msal-common/dist/cache/utils/AccountEntityUtils.mjs:
@azure/msal-common/dist/error/AuthErrorCodes.mjs:
@azure/msal-common/dist/error/ClientConfigurationError.mjs:
@azure/msal-common/dist/error/ClientConfigurationErrorCodes.mjs:
@azure/msal-common/dist/authority/OpenIdConfigResponse.mjs:
@azure/msal-common/dist/utils/StringUtils.mjs:
@azure/msal-common/dist/url/UrlString.mjs:
@azure/msal-common/dist/authority/AuthorityMetadata.mjs:
@azure/msal-common/dist/authority/AuthorityOptions.mjs:
@azure/msal-common/dist/authority/CloudInstanceDiscoveryResponse.mjs:
@azure/msal-common/dist/authority/CloudInstanceDiscoveryErrorResponse.mjs:
@azure/msal-common/dist/telemetry/performance/PerformanceEvents.mjs:
@azure/msal-common/dist/utils/FunctionWrappers.mjs:
@azure/msal-common/dist/authority/RegionDiscovery.mjs:
@azure/msal-common/dist/utils/TimeUtils.mjs:
@azure/msal-common/dist/cache/utils/CacheHelpers.mjs:
@azure/msal-common/dist/authority/Authority.mjs:
@azure/msal-common/dist/authority/AuthorityFactory.mjs:
@azure/msal-common/dist/request/ScopeSet.mjs:
@azure/msal-common/dist/request/RequestParameterBuilder.mjs:
@azure/msal-common/dist/utils/UrlUtils.mjs:
@azure/msal-common/dist/crypto/ICrypto.mjs:
@azure/msal-common/dist/logger/Logger.mjs:
@azure/msal-common/dist/packageMetadata.mjs:
@azure/msal-common/dist/error/CacheErrorCodes.mjs:
@azure/msal-common/dist/error/CacheError.mjs:
@azure/msal-common/dist/cache/CacheManager.mjs:
@azure/msal-common/dist/telemetry/performance/PerformanceEvent.mjs:
@azure/msal-common/dist/telemetry/performance/StubPerformanceClient.mjs:
@azure/msal-common/dist/config/ClientConfiguration.mjs:
@azure/msal-common/dist/cache/persistence/TokenCacheContext.mjs:
@azure/msal-common/dist/crypto/PopTokenGenerator.mjs:
@azure/msal-common/dist/error/InteractionRequiredAuthErrorCodes.mjs:
@azure/msal-common/dist/error/InteractionRequiredAuthError.mjs:
@azure/msal-common/dist/error/ServerError.mjs:
@azure/msal-common/dist/utils/ProtocolUtils.mjs:
@azure/msal-common/dist/response/ResponseHandler.mjs:
@azure/msal-common/dist/account/CcsCredential.mjs:
@azure/msal-common/dist/utils/ClientAssertionUtils.mjs:
@azure/msal-common/dist/network/RequestThumbprint.mjs:
@azure/msal-common/dist/network/ThrottlingUtils.mjs:
@azure/msal-common/dist/error/NetworkError.mjs:
@azure/msal-common/dist/protocol/Token.mjs:
@azure/msal-common/dist/client/AuthorizationCodeClient.mjs:
@azure/msal-common/dist/protocol/Authorize.mjs:
@azure/msal-common/dist/client/RefreshTokenClient.mjs:
@azure/msal-common/dist/telemetry/server/ServerTelemetryManager.mjs:
@azure/msal-common/dist/client/SilentFlowClient.mjs:
@azure/msal-common/dist/request/BaseAuthRequest.mjs:
@azure/msal-common/dist/index-node.mjs:
  (*! @azure/msal-common v16.11.2 2026-07-15 *)
*/
//# sourceMappingURL=index.js.map