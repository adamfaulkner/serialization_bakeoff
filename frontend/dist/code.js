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
var __commonJS = (cb, mod2) => function __require3() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target3) => (target3 = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target3, "default", { value: mod2, enumerable: true }) : target3,
  mod2
));

// node_modules/@protobufjs/aspromise/index.js
var require_aspromise = __commonJS({
  "node_modules/@protobufjs/aspromise/index.js"(exports2, module2) {
    "use strict";
    module2.exports = asPromise;
    function asPromise(fn, ctx) {
      var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
      while (index < arguments.length)
        params[offset++] = arguments[index++];
      return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err) {
          if (pending) {
            pending = false;
            if (err)
              reject(err);
            else {
              var params2 = new Array(arguments.length - 1), offset2 = 0;
              while (offset2 < params2.length)
                params2[offset2++] = arguments[offset2];
              resolve.apply(null, params2);
            }
          }
        };
        try {
          fn.apply(ctx || null, params);
        } catch (err) {
          if (pending) {
            pending = false;
            reject(err);
          }
        }
      });
    }
  }
});

// node_modules/@protobufjs/base64/index.js
var require_base64 = __commonJS({
  "node_modules/@protobufjs/base64/index.js"(exports2) {
    "use strict";
    var base64 = exports2;
    base64.length = function length(string) {
      var p = string.length;
      if (!p)
        return 0;
      var n = 0;
      while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
      return Math.ceil(string.length * 3) / 4 - n;
    };
    var b64 = new Array(64);
    var s64 = new Array(123);
    for (i = 0; i < 64; )
      s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
    var i;
    base64.encode = function encode3(buffer, start, end) {
      var parts = null, chunk = [];
      var i2 = 0, j = 0, t;
      while (start < end) {
        var b = buffer[start++];
        switch (j) {
          case 0:
            chunk[i2++] = b64[b >> 2];
            t = (b & 3) << 4;
            j = 1;
            break;
          case 1:
            chunk[i2++] = b64[t | b >> 4];
            t = (b & 15) << 2;
            j = 2;
            break;
          case 2:
            chunk[i2++] = b64[t | b >> 6];
            chunk[i2++] = b64[b & 63];
            j = 0;
            break;
        }
        if (i2 > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i2 = 0;
        }
      }
      if (j) {
        chunk[i2++] = b64[t];
        chunk[i2++] = 61;
        if (j === 1)
          chunk[i2++] = 61;
      }
      if (parts) {
        if (i2)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i2));
    };
    var invalidEncoding = "invalid encoding";
    base64.decode = function decode3(string, buffer, offset) {
      var start = offset;
      var j = 0, t;
      for (var i2 = 0; i2 < string.length; ) {
        var c = string.charCodeAt(i2++);
        if (c === 61 && j > 1)
          break;
        if ((c = s64[c]) === void 0)
          throw Error(invalidEncoding);
        switch (j) {
          case 0:
            t = c;
            j = 1;
            break;
          case 1:
            buffer[offset++] = t << 2 | (c & 48) >> 4;
            t = c;
            j = 2;
            break;
          case 2:
            buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
            t = c;
            j = 3;
            break;
          case 3:
            buffer[offset++] = (t & 3) << 6 | c;
            j = 0;
            break;
        }
      }
      if (j === 1)
        throw Error(invalidEncoding);
      return offset - start;
    };
    base64.test = function test(string) {
      return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
    };
  }
});

// node_modules/@protobufjs/eventemitter/index.js
var require_eventemitter = __commonJS({
  "node_modules/@protobufjs/eventemitter/index.js"(exports2, module2) {
    "use strict";
    module2.exports = EventEmitter;
    function EventEmitter() {
      this._listeners = {};
    }
    EventEmitter.prototype.on = function on(evt, fn, ctx) {
      (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn,
        ctx: ctx || this
      });
      return this;
    };
    EventEmitter.prototype.off = function off(evt, fn) {
      if (evt === void 0)
        this._listeners = {};
      else {
        if (fn === void 0)
          this._listeners[evt] = [];
        else {
          var listeners = this._listeners[evt];
          for (var i = 0; i < listeners.length; )
            if (listeners[i].fn === fn)
              listeners.splice(i, 1);
            else
              ++i;
        }
      }
      return this;
    };
    EventEmitter.prototype.emit = function emit(evt) {
      var listeners = this._listeners[evt];
      if (listeners) {
        var args = [], i = 1;
        for (; i < arguments.length; )
          args.push(arguments[i++]);
        for (i = 0; i < listeners.length; )
          listeners[i].fn.apply(listeners[i++].ctx, args);
      }
      return this;
    };
  }
});

// node_modules/@protobufjs/float/index.js
var require_float = __commonJS({
  "node_modules/@protobufjs/float/index.js"(exports2, module2) {
    "use strict";
    module2.exports = factory(factory);
    function factory(exports3) {
      if (typeof Float32Array !== "undefined") (function() {
        var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
        function writeFloat_f32_cpy(val, buf, pos) {
          f32[0] = val;
          buf[pos] = f8b[0];
          buf[pos + 1] = f8b[1];
          buf[pos + 2] = f8b[2];
          buf[pos + 3] = f8b[3];
        }
        function writeFloat_f32_rev(val, buf, pos) {
          f32[0] = val;
          buf[pos] = f8b[3];
          buf[pos + 1] = f8b[2];
          buf[pos + 2] = f8b[1];
          buf[pos + 3] = f8b[0];
        }
        exports3.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
        exports3.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
        function readFloat_f32_cpy(buf, pos) {
          f8b[0] = buf[pos];
          f8b[1] = buf[pos + 1];
          f8b[2] = buf[pos + 2];
          f8b[3] = buf[pos + 3];
          return f32[0];
        }
        function readFloat_f32_rev(buf, pos) {
          f8b[3] = buf[pos];
          f8b[2] = buf[pos + 1];
          f8b[1] = buf[pos + 2];
          f8b[0] = buf[pos + 3];
          return f32[0];
        }
        exports3.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
        exports3.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
      })();
      else (function() {
        function writeFloat_ieee754(writeUint, val, buf, pos) {
          var sign = val < 0 ? 1 : 0;
          if (sign)
            val = -val;
          if (val === 0)
            writeUint(1 / val > 0 ? (
              /* positive */
              0
            ) : (
              /* negative 0 */
              2147483648
            ), buf, pos);
          else if (isNaN(val))
            writeUint(2143289344, buf, pos);
          else if (val > 34028234663852886e22)
            writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
          else if (val < 11754943508222875e-54)
            writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
          else {
            var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
            writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
          }
        }
        exports3.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
        exports3.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
        function readFloat_ieee754(readUint, buf, pos) {
          var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
          return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
        }
        exports3.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
        exports3.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
      })();
      if (typeof Float64Array !== "undefined") (function() {
        var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
        function writeDouble_f64_cpy(val, buf, pos) {
          f64[0] = val;
          buf[pos] = f8b[0];
          buf[pos + 1] = f8b[1];
          buf[pos + 2] = f8b[2];
          buf[pos + 3] = f8b[3];
          buf[pos + 4] = f8b[4];
          buf[pos + 5] = f8b[5];
          buf[pos + 6] = f8b[6];
          buf[pos + 7] = f8b[7];
        }
        function writeDouble_f64_rev(val, buf, pos) {
          f64[0] = val;
          buf[pos] = f8b[7];
          buf[pos + 1] = f8b[6];
          buf[pos + 2] = f8b[5];
          buf[pos + 3] = f8b[4];
          buf[pos + 4] = f8b[3];
          buf[pos + 5] = f8b[2];
          buf[pos + 6] = f8b[1];
          buf[pos + 7] = f8b[0];
        }
        exports3.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
        exports3.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
        function readDouble_f64_cpy(buf, pos) {
          f8b[0] = buf[pos];
          f8b[1] = buf[pos + 1];
          f8b[2] = buf[pos + 2];
          f8b[3] = buf[pos + 3];
          f8b[4] = buf[pos + 4];
          f8b[5] = buf[pos + 5];
          f8b[6] = buf[pos + 6];
          f8b[7] = buf[pos + 7];
          return f64[0];
        }
        function readDouble_f64_rev(buf, pos) {
          f8b[7] = buf[pos];
          f8b[6] = buf[pos + 1];
          f8b[5] = buf[pos + 2];
          f8b[4] = buf[pos + 3];
          f8b[3] = buf[pos + 4];
          f8b[2] = buf[pos + 5];
          f8b[1] = buf[pos + 6];
          f8b[0] = buf[pos + 7];
          return f64[0];
        }
        exports3.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
        exports3.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
      })();
      else (function() {
        function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
          var sign = val < 0 ? 1 : 0;
          if (sign)
            val = -val;
          if (val === 0) {
            writeUint(0, buf, pos + off0);
            writeUint(1 / val > 0 ? (
              /* positive */
              0
            ) : (
              /* negative 0 */
              2147483648
            ), buf, pos + off1);
          } else if (isNaN(val)) {
            writeUint(0, buf, pos + off0);
            writeUint(2146959360, buf, pos + off1);
          } else if (val > 17976931348623157e292) {
            writeUint(0, buf, pos + off0);
            writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
          } else {
            var mantissa;
            if (val < 22250738585072014e-324) {
              mantissa = val / 5e-324;
              writeUint(mantissa >>> 0, buf, pos + off0);
              writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
            } else {
              var exponent = Math.floor(Math.log(val) / Math.LN2);
              if (exponent === 1024)
                exponent = 1023;
              mantissa = val * Math.pow(2, -exponent);
              writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
              writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
            }
          }
        }
        exports3.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
        exports3.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
        function readDouble_ieee754(readUint, off0, off1, buf, pos) {
          var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
          var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
          return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
        }
        exports3.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
        exports3.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
      })();
      return exports3;
    }
    function writeUintLE(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    function writeUintBE(val, buf, pos) {
      buf[pos] = val >>> 24;
      buf[pos + 1] = val >>> 16 & 255;
      buf[pos + 2] = val >>> 8 & 255;
      buf[pos + 3] = val & 255;
    }
    function readUintLE(buf, pos) {
      return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
    }
    function readUintBE(buf, pos) {
      return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
    }
  }
});

// node_modules/@protobufjs/inquire/index.js
var require_inquire = __commonJS({
  "node_modules/@protobufjs/inquire/index.js"(exports, module) {
    "use strict";
    module.exports = inquire;
    function inquire(moduleName) {
      try {
        var mod = eval("quire".replace(/^/, "re"))(moduleName);
        if (mod && (mod.length || Object.keys(mod).length))
          return mod;
      } catch (e) {
      }
      return null;
    }
  }
});

// node_modules/@protobufjs/utf8/index.js
var require_utf8 = __commonJS({
  "node_modules/@protobufjs/utf8/index.js"(exports2) {
    "use strict";
    var utf8 = exports2;
    utf8.length = function utf8_length(string) {
      var len = 0, c = 0;
      for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
          len += 1;
        else if (c < 2048)
          len += 2;
        else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
          ++i;
          len += 4;
        } else
          len += 3;
      }
      return len;
    };
    utf8.read = function utf8_read(buffer, start, end) {
      var len = end - start;
      if (len < 1)
        return "";
      var parts = null, chunk = [], i = 0, t;
      while (start < end) {
        t = buffer[start++];
        if (t < 128)
          chunk[i++] = t;
        else if (t > 191 && t < 224)
          chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
          t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
          chunk[i++] = 55296 + (t >> 10);
          chunk[i++] = 56320 + (t & 1023);
        } else
          chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i = 0;
        }
      }
      if (parts) {
        if (i)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i));
    };
    utf8.write = function utf8_write(string, buffer, offset) {
      var start = offset, c1, c2;
      for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
          buffer[offset++] = c1;
        } else if (c1 < 2048) {
          buffer[offset++] = c1 >> 6 | 192;
          buffer[offset++] = c1 & 63 | 128;
        } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
          c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
          ++i;
          buffer[offset++] = c1 >> 18 | 240;
          buffer[offset++] = c1 >> 12 & 63 | 128;
          buffer[offset++] = c1 >> 6 & 63 | 128;
          buffer[offset++] = c1 & 63 | 128;
        } else {
          buffer[offset++] = c1 >> 12 | 224;
          buffer[offset++] = c1 >> 6 & 63 | 128;
          buffer[offset++] = c1 & 63 | 128;
        }
      }
      return offset - start;
    };
  }
});

// node_modules/@protobufjs/pool/index.js
var require_pool = __commonJS({
  "node_modules/@protobufjs/pool/index.js"(exports2, module2) {
    "use strict";
    module2.exports = pool;
    function pool(alloc, slice, size) {
      var SIZE = size || 8192;
      var MAX = SIZE >>> 1;
      var slab = null;
      var offset = SIZE;
      return function pool_alloc(size2) {
        if (size2 < 1 || size2 > MAX)
          return alloc(size2);
        if (offset + size2 > SIZE) {
          slab = alloc(SIZE);
          offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size2);
        if (offset & 7)
          offset = (offset | 7) + 1;
        return buf;
      };
    }
  }
});

// node_modules/protobufjs/src/util/longbits.js
var require_longbits = __commonJS({
  "node_modules/protobufjs/src/util/longbits.js"(exports2, module2) {
    "use strict";
    module2.exports = LongBits;
    var util = require_minimal();
    function LongBits(lo, hi) {
      this.lo = lo >>> 0;
      this.hi = hi >>> 0;
    }
    var zero = LongBits.zero = new LongBits(0, 0);
    zero.toNumber = function() {
      return 0;
    };
    zero.zzEncode = zero.zzDecode = function() {
      return this;
    };
    zero.length = function() {
      return 1;
    };
    var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
    LongBits.fromNumber = function fromNumber(value) {
      if (value === 0)
        return zero;
      var sign = value < 0;
      if (sign)
        value = -value;
      var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
      if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
          lo = 0;
          if (++hi > 4294967295)
            hi = 0;
        }
      }
      return new LongBits(lo, hi);
    };
    LongBits.from = function from(value) {
      if (typeof value === "number")
        return LongBits.fromNumber(value);
      if (util.isString(value)) {
        if (util.Long)
          value = util.Long.fromString(value);
        else
          return LongBits.fromNumber(parseInt(value, 10));
      }
      return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
    };
    LongBits.prototype.toNumber = function toNumber(unsigned) {
      if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
        if (!lo)
          hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
      }
      return this.lo + this.hi * 4294967296;
    };
    LongBits.prototype.toLong = function toLong(unsigned) {
      return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
    };
    var charCodeAt = String.prototype.charCodeAt;
    LongBits.fromHash = function fromHash(hash) {
      if (hash === zeroHash)
        return zero;
      return new LongBits(
        (charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0,
        (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0
      );
    };
    LongBits.prototype.toHash = function toHash() {
      return String.fromCharCode(
        this.lo & 255,
        this.lo >>> 8 & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24,
        this.hi & 255,
        this.hi >>> 8 & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24
      );
    };
    LongBits.prototype.zzEncode = function zzEncode() {
      var mask = this.hi >> 31;
      this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
      this.lo = (this.lo << 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.zzDecode = function zzDecode() {
      var mask = -(this.lo & 1);
      this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
      this.hi = (this.hi >>> 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.length = function length() {
      var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
      return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
    };
  }
});

// node_modules/protobufjs/src/util/minimal.js
var require_minimal = __commonJS({
  "node_modules/protobufjs/src/util/minimal.js"(exports2) {
    "use strict";
    var util = exports2;
    util.asPromise = require_aspromise();
    util.base64 = require_base64();
    util.EventEmitter = require_eventemitter();
    util.float = require_float();
    util.inquire = require_inquire();
    util.utf8 = require_utf8();
    util.pool = require_pool();
    util.LongBits = require_longbits();
    util.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
    util.global = util.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports2;
    util.emptyArray = Object.freeze ? Object.freeze([]) : (
      /* istanbul ignore next */
      []
    );
    util.emptyObject = Object.freeze ? Object.freeze({}) : (
      /* istanbul ignore next */
      {}
    );
    util.isInteger = Number.isInteger || /* istanbul ignore next */
    function isInteger(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };
    util.isString = function isString(value) {
      return typeof value === "string" || value instanceof String;
    };
    util.isObject = function isObject(value) {
      return value && typeof value === "object";
    };
    util.isset = /**
     * Checks if a property on a message is considered to be present.
     * @param {Object} obj Plain object or message instance
     * @param {string} prop Property name
     * @returns {boolean} `true` if considered to be present, otherwise `false`
     */
    util.isSet = function isSet(obj, prop) {
      var value = obj[prop];
      if (value != null && obj.hasOwnProperty(prop))
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
      return false;
    };
    util.Buffer = function() {
      try {
        var Buffer3 = util.inquire("buffer").Buffer;
        return Buffer3.prototype.utf8Write ? Buffer3 : (
          /* istanbul ignore next */
          null
        );
      } catch (e) {
        return null;
      }
    }();
    util._Buffer_from = null;
    util._Buffer_allocUnsafe = null;
    util.newBuffer = function newBuffer(sizeOrArray) {
      return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
    };
    util.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    util.Long = /* istanbul ignore next */
    util.global.dcodeIO && /* istanbul ignore next */
    util.global.dcodeIO.Long || /* istanbul ignore next */
    util.global.Long || util.inquire("long");
    util.key2Re = /^true|false|0|1$/;
    util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    util.longToHash = function longToHash(value) {
      return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
    };
    util.longFromHash = function longFromHash(hash, unsigned) {
      var bits = util.LongBits.fromHash(hash);
      if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
      return bits.toNumber(Boolean(unsigned));
    };
    function merge(dst, src3, ifNotSet) {
      for (var keys = Object.keys(src3), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === void 0 || !ifNotSet)
          dst[keys[i]] = src3[keys[i]];
      return dst;
    }
    util.merge = merge;
    util.lcFirst = function lcFirst(str) {
      return str.charAt(0).toLowerCase() + str.substring(1);
    };
    function newError(name) {
      function CustomError(message, properties) {
        if (!(this instanceof CustomError))
          return new CustomError(message, properties);
        Object.defineProperty(this, "message", { get: function() {
          return message;
        } });
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, CustomError);
        else
          Object.defineProperty(this, "stack", { value: new Error().stack || "" });
        if (properties)
          merge(this, properties);
      }
      CustomError.prototype = Object.create(Error.prototype, {
        constructor: {
          value: CustomError,
          writable: true,
          enumerable: false,
          configurable: true
        },
        name: {
          get: function get() {
            return name;
          },
          set: void 0,
          enumerable: false,
          // configurable: false would accurately preserve the behavior of
          // the original, but I'm guessing that was not intentional.
          // For an actual error subclass, this property would
          // be configurable.
          configurable: true
        },
        toString: {
          value: function value() {
            return this.name + ": " + this.message;
          },
          writable: true,
          enumerable: false,
          configurable: true
        }
      });
      return CustomError;
    }
    util.newError = newError;
    util.ProtocolError = newError("ProtocolError");
    util.oneOfGetter = function getOneOf(fieldNames) {
      var fieldMap = {};
      for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;
      return function() {
        for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
          if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
            return keys[i2];
      };
    };
    util.oneOfSetter = function setOneOf(fieldNames) {
      return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
          if (fieldNames[i] !== name)
            delete this[fieldNames[i]];
      };
    };
    util.toJSONOptions = {
      longs: String,
      enums: String,
      bytes: String,
      json: true
    };
    util._configure = function() {
      var Buffer3 = util.Buffer;
      if (!Buffer3) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
      }
      util._Buffer_from = Buffer3.from !== Uint8Array.from && Buffer3.from || /* istanbul ignore next */
      function Buffer_from(value, encoding) {
        return new Buffer3(value, encoding);
      };
      util._Buffer_allocUnsafe = Buffer3.allocUnsafe || /* istanbul ignore next */
      function Buffer_allocUnsafe(size) {
        return new Buffer3(size);
      };
    };
  }
});

// node_modules/protobufjs/src/writer.js
var require_writer = __commonJS({
  "node_modules/protobufjs/src/writer.js"(exports2, module2) {
    "use strict";
    module2.exports = Writer;
    var util = require_minimal();
    var BufferWriter;
    var LongBits = util.LongBits;
    var base64 = util.base64;
    var utf8 = util.utf8;
    function Op(fn, len, val) {
      this.fn = fn;
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    function noop() {
    }
    function State(writer) {
      this.head = writer.head;
      this.tail = writer.tail;
      this.len = writer.len;
      this.next = writer.states;
    }
    function Writer() {
      this.len = 0;
      this.head = new Op(noop, 0, 0);
      this.tail = this.head;
      this.states = null;
    }
    var create = function create2() {
      return util.Buffer ? function create_buffer_setup() {
        return (Writer.create = function create_buffer() {
          return new BufferWriter();
        })();
      } : function create_array() {
        return new Writer();
      };
    };
    Writer.create = create();
    Writer.alloc = function alloc(size) {
      return new util.Array(size);
    };
    if (util.Array !== Array)
      Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
    Writer.prototype._push = function push(fn, len, val) {
      this.tail = this.tail.next = new Op(fn, len, val);
      this.len += len;
      return this;
    };
    function writeByte(val, buf, pos) {
      buf[pos] = val & 255;
    }
    function writeVarint32(val, buf, pos) {
      while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
      }
      buf[pos] = val;
    }
    function VarintOp(len, val) {
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    VarintOp.prototype = Object.create(Op.prototype);
    VarintOp.prototype.fn = writeVarint32;
    Writer.prototype.uint32 = function write_uint32(value) {
      this.len += (this.tail = this.tail.next = new VarintOp(
        (value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5,
        value
      )).len;
      return this;
    };
    Writer.prototype.int32 = function write_int32(value) {
      return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
    };
    Writer.prototype.sint32 = function write_sint32(value) {
      return this.uint32((value << 1 ^ value >> 31) >>> 0);
    };
    function writeVarint64(val, buf, pos) {
      while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
      }
      while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
      }
      buf[pos++] = val.lo;
    }
    Writer.prototype.uint64 = function write_uint64(value) {
      var bits = LongBits.from(value);
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer.prototype.int64 = Writer.prototype.uint64;
    Writer.prototype.sint64 = function write_sint64(value) {
      var bits = LongBits.from(value).zzEncode();
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer.prototype.bool = function write_bool(value) {
      return this._push(writeByte, 1, value ? 1 : 0);
    };
    function writeFixed32(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    Writer.prototype.fixed32 = function write_fixed32(value) {
      return this._push(writeFixed32, 4, value >>> 0);
    };
    Writer.prototype.sfixed32 = Writer.prototype.fixed32;
    Writer.prototype.fixed64 = function write_fixed64(value) {
      var bits = LongBits.from(value);
      return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
    };
    Writer.prototype.sfixed64 = Writer.prototype.fixed64;
    Writer.prototype.float = function write_float(value) {
      return this._push(util.float.writeFloatLE, 4, value);
    };
    Writer.prototype.double = function write_double(value) {
      return this._push(util.float.writeDoubleLE, 8, value);
    };
    var writeBytes = util.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
      buf.set(val, pos);
    } : function writeBytes_for(val, buf, pos) {
      for (var i = 0; i < val.length; ++i)
        buf[pos + i] = val[i];
    };
    Writer.prototype.bytes = function write_bytes(value) {
      var len = value.length >>> 0;
      if (!len)
        return this._push(writeByte, 1, 0);
      if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
      }
      return this.uint32(len)._push(writeBytes, len, value);
    };
    Writer.prototype.string = function write_string(value) {
      var len = utf8.length(value);
      return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
    };
    Writer.prototype.fork = function fork() {
      this.states = new State(this);
      this.head = this.tail = new Op(noop, 0, 0);
      this.len = 0;
      return this;
    };
    Writer.prototype.reset = function reset() {
      if (this.states) {
        this.head = this.states.head;
        this.tail = this.states.tail;
        this.len = this.states.len;
        this.states = this.states.next;
      } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len = 0;
      }
      return this;
    };
    Writer.prototype.ldelim = function ldelim() {
      var head = this.head, tail = this.tail, len = this.len;
      this.reset().uint32(len);
      if (len) {
        this.tail.next = head.next;
        this.tail = tail;
        this.len += len;
      }
      return this;
    };
    Writer.prototype.finish = function finish() {
      var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
      while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
      }
      return buf;
    };
    Writer._configure = function(BufferWriter_) {
      BufferWriter = BufferWriter_;
      Writer.create = create();
      BufferWriter._configure();
    };
  }
});

// node_modules/protobufjs/src/writer_buffer.js
var require_writer_buffer = __commonJS({
  "node_modules/protobufjs/src/writer_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferWriter;
    var Writer = require_writer();
    (BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
    var util = require_minimal();
    function BufferWriter() {
      Writer.call(this);
    }
    BufferWriter._configure = function() {
      BufferWriter.alloc = util._Buffer_allocUnsafe;
      BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos);
      } : function writeBytesBuffer_copy(val, buf, pos) {
        if (val.copy)
          val.copy(buf, pos, 0, val.length);
        else for (var i = 0; i < val.length; )
          buf[pos++] = val[i++];
      };
    };
    BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
      if (util.isString(value))
        value = util._Buffer_from(value, "base64");
      var len = value.length >>> 0;
      this.uint32(len);
      if (len)
        this._push(BufferWriter.writeBytesBuffer, len, value);
      return this;
    };
    function writeStringBuffer(val, buf, pos) {
      if (val.length < 40)
        util.utf8.write(val, buf, pos);
      else if (buf.utf8Write)
        buf.utf8Write(val, pos);
      else
        buf.write(val, pos);
    }
    BufferWriter.prototype.string = function write_string_buffer(value) {
      var len = util.Buffer.byteLength(value);
      this.uint32(len);
      if (len)
        this._push(writeStringBuffer, len, value);
      return this;
    };
    BufferWriter._configure();
  }
});

// node_modules/protobufjs/src/reader.js
var require_reader = __commonJS({
  "node_modules/protobufjs/src/reader.js"(exports2, module2) {
    "use strict";
    module2.exports = Reader;
    var util = require_minimal();
    var BufferReader;
    var LongBits = util.LongBits;
    var utf8 = util.utf8;
    function indexOutOfRange(reader, writeLength) {
      return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
    }
    function Reader(buffer) {
      this.buf = buffer;
      this.pos = 0;
      this.len = buffer.length;
    }
    var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
      if (buffer instanceof Uint8Array || Array.isArray(buffer))
        return new Reader(buffer);
      throw Error("illegal buffer");
    } : function create_array2(buffer) {
      if (Array.isArray(buffer))
        return new Reader(buffer);
      throw Error("illegal buffer");
    };
    var create = function create2() {
      return util.Buffer ? function create_buffer_setup(buffer) {
        return (Reader.create = function create_buffer(buffer2) {
          return util.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
        })(buffer);
      } : create_array;
    };
    Reader.create = create();
    Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */
    util.Array.prototype.slice;
    Reader.prototype.uint32 = /* @__PURE__ */ function read_uint32_setup() {
      var value = 4294967295;
      return function read_uint32() {
        value = (this.buf[this.pos] & 127) >>> 0;
        if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
        if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
        if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
        if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
        if (this.buf[this.pos++] < 128) return value;
        if ((this.pos += 5) > this.len) {
          this.pos = this.len;
          throw indexOutOfRange(this, 10);
        }
        return value;
      };
    }();
    Reader.prototype.int32 = function read_int32() {
      return this.uint32() | 0;
    };
    Reader.prototype.sint32 = function read_sint32() {
      var value = this.uint32();
      return value >>> 1 ^ -(value & 1) | 0;
    };
    function readLongVarint() {
      var bits = new LongBits(0, 0);
      var i = 0;
      if (this.len - this.pos > 4) {
        for (; i < 4; ++i) {
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
        if (this.buf[this.pos++] < 128)
          return bits;
        i = 0;
      } else {
        for (; i < 3; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
      }
      if (this.len - this.pos > 4) {
        for (; i < 5; ++i) {
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      } else {
        for (; i < 5; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      }
      throw Error("invalid varint encoding");
    }
    Reader.prototype.bool = function read_bool() {
      return this.uint32() !== 0;
    };
    function readFixed32_end(buf, end) {
      return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
    }
    Reader.prototype.fixed32 = function read_fixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4);
    };
    Reader.prototype.sfixed32 = function read_sfixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4) | 0;
    };
    function readFixed64() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);
      return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
    }
    Reader.prototype.float = function read_float() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readFloatLE(this.buf, this.pos);
      this.pos += 4;
      return value;
    };
    Reader.prototype.double = function read_double() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readDoubleLE(this.buf, this.pos);
      this.pos += 8;
      return value;
    };
    Reader.prototype.bytes = function read_bytes() {
      var length = this.uint32(), start = this.pos, end = this.pos + length;
      if (end > this.len)
        throw indexOutOfRange(this, length);
      this.pos += length;
      if (Array.isArray(this.buf))
        return this.buf.slice(start, end);
      if (start === end) {
        var nativeBuffer = util.Buffer;
        return nativeBuffer ? nativeBuffer.alloc(0) : new this.buf.constructor(0);
      }
      return this._slice.call(this.buf, start, end);
    };
    Reader.prototype.string = function read_string() {
      var bytes = this.bytes();
      return utf8.read(bytes, 0, bytes.length);
    };
    Reader.prototype.skip = function skip(length) {
      if (typeof length === "number") {
        if (this.pos + length > this.len)
          throw indexOutOfRange(this, length);
        this.pos += length;
      } else {
        do {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
      }
      return this;
    };
    Reader.prototype.skipType = function(wireType) {
      switch (wireType) {
        case 0:
          this.skip();
          break;
        case 1:
          this.skip(8);
          break;
        case 2:
          this.skip(this.uint32());
          break;
        case 3:
          while ((wireType = this.uint32() & 7) !== 4) {
            this.skipType(wireType);
          }
          break;
        case 5:
          this.skip(4);
          break;
        /* istanbul ignore next */
        default:
          throw Error("invalid wire type " + wireType + " at offset " + this.pos);
      }
      return this;
    };
    Reader._configure = function(BufferReader_) {
      BufferReader = BufferReader_;
      Reader.create = create();
      BufferReader._configure();
      var fn = util.Long ? "toLong" : (
        /* istanbul ignore next */
        "toNumber"
      );
      util.merge(Reader.prototype, {
        int64: function read_int64() {
          return readLongVarint.call(this)[fn](false);
        },
        uint64: function read_uint64() {
          return readLongVarint.call(this)[fn](true);
        },
        sint64: function read_sint64() {
          return readLongVarint.call(this).zzDecode()[fn](false);
        },
        fixed64: function read_fixed64() {
          return readFixed64.call(this)[fn](true);
        },
        sfixed64: function read_sfixed64() {
          return readFixed64.call(this)[fn](false);
        }
      });
    };
  }
});

// node_modules/protobufjs/src/reader_buffer.js
var require_reader_buffer = __commonJS({
  "node_modules/protobufjs/src/reader_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferReader;
    var Reader = require_reader();
    (BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
    var util = require_minimal();
    function BufferReader(buffer) {
      Reader.call(this, buffer);
    }
    BufferReader._configure = function() {
      if (util.Buffer)
        BufferReader.prototype._slice = util.Buffer.prototype.slice;
    };
    BufferReader.prototype.string = function read_string_buffer() {
      var len = this.uint32();
      return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
    };
    BufferReader._configure();
  }
});

// node_modules/protobufjs/src/rpc/service.js
var require_service = __commonJS({
  "node_modules/protobufjs/src/rpc/service.js"(exports2, module2) {
    "use strict";
    module2.exports = Service;
    var util = require_minimal();
    (Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
    function Service(rpcImpl, requestDelimited, responseDelimited) {
      if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");
      util.EventEmitter.call(this);
      this.rpcImpl = rpcImpl;
      this.requestDelimited = Boolean(requestDelimited);
      this.responseDelimited = Boolean(responseDelimited);
    }
    Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
      if (!request)
        throw TypeError("request must be specified");
      var self2 = this;
      if (!callback)
        return util.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
      if (!self2.rpcImpl) {
        setTimeout(function() {
          callback(Error("already ended"));
        }, 0);
        return void 0;
      }
      try {
        return self2.rpcImpl(
          method,
          requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
          function rpcCallback(err, response2) {
            if (err) {
              self2.emit("error", err, method);
              return callback(err);
            }
            if (response2 === null) {
              self2.end(
                /* endedByRPC */
                true
              );
              return void 0;
            }
            if (!(response2 instanceof responseCtor)) {
              try {
                response2 = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response2);
              } catch (err2) {
                self2.emit("error", err2, method);
                return callback(err2);
              }
            }
            self2.emit("data", response2, method);
            return callback(null, response2);
          }
        );
      } catch (err) {
        self2.emit("error", err, method);
        setTimeout(function() {
          callback(err);
        }, 0);
        return void 0;
      }
    };
    Service.prototype.end = function end(endedByRPC) {
      if (this.rpcImpl) {
        if (!endedByRPC)
          this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
      }
      return this;
    };
  }
});

// node_modules/protobufjs/src/rpc.js
var require_rpc = __commonJS({
  "node_modules/protobufjs/src/rpc.js"(exports2) {
    "use strict";
    var rpc = exports2;
    rpc.Service = require_service();
  }
});

// node_modules/protobufjs/src/roots.js
var require_roots = __commonJS({
  "node_modules/protobufjs/src/roots.js"(exports2, module2) {
    "use strict";
    module2.exports = {};
  }
});

// node_modules/protobufjs/src/index-minimal.js
var require_index_minimal = __commonJS({
  "node_modules/protobufjs/src/index-minimal.js"(exports2) {
    "use strict";
    var protobuf = exports2;
    protobuf.build = "minimal";
    protobuf.Writer = require_writer();
    protobuf.BufferWriter = require_writer_buffer();
    protobuf.Reader = require_reader();
    protobuf.BufferReader = require_reader_buffer();
    protobuf.util = require_minimal();
    protobuf.rpc = require_rpc();
    protobuf.roots = require_roots();
    protobuf.configure = configure;
    function configure() {
      protobuf.util._configure();
      protobuf.Writer._configure(protobuf.BufferWriter);
      protobuf.Reader._configure(protobuf.BufferReader);
    }
    configure();
  }
});

// node_modules/@protobufjs/codegen/index.js
var require_codegen = __commonJS({
  "node_modules/@protobufjs/codegen/index.js"(exports2, module2) {
    "use strict";
    module2.exports = codegen;
    function codegen(functionParams, functionName) {
      if (typeof functionParams === "string") {
        functionName = functionParams;
        functionParams = void 0;
      }
      var body = [];
      function Codegen(formatStringOrScope) {
        if (typeof formatStringOrScope !== "string") {
          var source = toString();
          if (codegen.verbose)
            console.log("codegen: " + source);
          source = "return " + source;
          if (formatStringOrScope) {
            var scopeKeys = Object.keys(formatStringOrScope), scopeParams = new Array(scopeKeys.length + 1), scopeValues = new Array(scopeKeys.length), scopeOffset = 0;
            while (scopeOffset < scopeKeys.length) {
              scopeParams[scopeOffset] = scopeKeys[scopeOffset];
              scopeValues[scopeOffset] = formatStringOrScope[scopeKeys[scopeOffset++]];
            }
            scopeParams[scopeOffset] = source;
            return Function.apply(null, scopeParams).apply(null, scopeValues);
          }
          return Function(source)();
        }
        var formatParams = new Array(arguments.length - 1), formatOffset = 0;
        while (formatOffset < formatParams.length)
          formatParams[formatOffset] = arguments[++formatOffset];
        formatOffset = 0;
        formatStringOrScope = formatStringOrScope.replace(/%([%dfijs])/g, function replace($0, $1) {
          var value = formatParams[formatOffset++];
          switch ($1) {
            case "d":
            case "f":
              return String(Number(value));
            case "i":
              return String(Math.floor(value));
            case "j":
              return JSON.stringify(value);
            case "s":
              return String(value);
          }
          return "%";
        });
        if (formatOffset !== formatParams.length)
          throw Error("parameter count mismatch");
        body.push(formatStringOrScope);
        return Codegen;
      }
      function toString(functionNameOverride) {
        return "function " + (functionNameOverride || functionName || "") + "(" + (functionParams && functionParams.join(",") || "") + "){\n  " + body.join("\n  ") + "\n}";
      }
      Codegen.toString = toString;
      return Codegen;
    }
    codegen.verbose = false;
  }
});

// node_modules/@protobufjs/fetch/index.js
var require_fetch = __commonJS({
  "node_modules/@protobufjs/fetch/index.js"(exports2, module2) {
    "use strict";
    module2.exports = fetch2;
    var asPromise = require_aspromise();
    var inquire2 = require_inquire();
    var fs = inquire2("fs");
    function fetch2(filename, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      } else if (!options)
        options = {};
      if (!callback)
        return asPromise(fetch2, this, filename, options);
      if (!options.xhr && fs && fs.readFile)
        return fs.readFile(filename, function fetchReadFileCallback(err, contents) {
          return err && typeof XMLHttpRequest !== "undefined" ? fetch2.xhr(filename, options, callback) : err ? callback(err) : callback(null, options.binary ? contents : contents.toString("utf8"));
        });
      return fetch2.xhr(filename, options, callback);
    }
    fetch2.xhr = function fetch_xhr(filename, options, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function fetchOnReadyStateChange() {
        if (xhr.readyState !== 4)
          return void 0;
        if (xhr.status !== 0 && xhr.status !== 200)
          return callback(Error("status " + xhr.status));
        if (options.binary) {
          var buffer = xhr.response;
          if (!buffer) {
            buffer = [];
            for (var i = 0; i < xhr.responseText.length; ++i)
              buffer.push(xhr.responseText.charCodeAt(i) & 255);
          }
          return callback(null, typeof Uint8Array !== "undefined" ? new Uint8Array(buffer) : buffer);
        }
        return callback(null, xhr.responseText);
      };
      if (options.binary) {
        if ("overrideMimeType" in xhr)
          xhr.overrideMimeType("text/plain; charset=x-user-defined");
        xhr.responseType = "arraybuffer";
      }
      xhr.open("GET", filename);
      xhr.send();
    };
  }
});

// node_modules/@protobufjs/path/index.js
var require_path = __commonJS({
  "node_modules/@protobufjs/path/index.js"(exports2) {
    "use strict";
    var path = exports2;
    var isAbsolute = (
      /**
       * Tests if the specified path is absolute.
       * @param {string} path Path to test
       * @returns {boolean} `true` if path is absolute
       */
      path.isAbsolute = function isAbsolute2(path2) {
        return /^(?:\/|\w+:)/.test(path2);
      }
    );
    var normalize = (
      /**
       * Normalizes the specified path.
       * @param {string} path Path to normalize
       * @returns {string} Normalized path
       */
      path.normalize = function normalize2(path2) {
        path2 = path2.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
        var parts = path2.split("/"), absolute = isAbsolute(path2), prefix = "";
        if (absolute)
          prefix = parts.shift() + "/";
        for (var i = 0; i < parts.length; ) {
          if (parts[i] === "..") {
            if (i > 0 && parts[i - 1] !== "..")
              parts.splice(--i, 2);
            else if (absolute)
              parts.splice(i, 1);
            else
              ++i;
          } else if (parts[i] === ".")
            parts.splice(i, 1);
          else
            ++i;
        }
        return prefix + parts.join("/");
      }
    );
    path.resolve = function resolve(originPath, includePath, alreadyNormalized) {
      if (!alreadyNormalized)
        includePath = normalize(includePath);
      if (isAbsolute(includePath))
        return includePath;
      if (!alreadyNormalized)
        originPath = normalize(originPath);
      return (originPath = originPath.replace(/(?:\/|^)[^/]+$/, "")).length ? normalize(originPath + "/" + includePath) : includePath;
    };
  }
});

// node_modules/protobufjs/src/types.js
var require_types = __commonJS({
  "node_modules/protobufjs/src/types.js"(exports2) {
    "use strict";
    var types = exports2;
    var util = require_util();
    var s = [
      "double",
      // 0
      "float",
      // 1
      "int32",
      // 2
      "uint32",
      // 3
      "sint32",
      // 4
      "fixed32",
      // 5
      "sfixed32",
      // 6
      "int64",
      // 7
      "uint64",
      // 8
      "sint64",
      // 9
      "fixed64",
      // 10
      "sfixed64",
      // 11
      "bool",
      // 12
      "string",
      // 13
      "bytes"
      // 14
    ];
    function bake(values, offset) {
      var i = 0, o = {};
      offset |= 0;
      while (i < values.length) o[s[i + offset]] = values[i++];
      return o;
    }
    types.basic = bake([
      /* double   */
      1,
      /* float    */
      5,
      /* int32    */
      0,
      /* uint32   */
      0,
      /* sint32   */
      0,
      /* fixed32  */
      5,
      /* sfixed32 */
      5,
      /* int64    */
      0,
      /* uint64   */
      0,
      /* sint64   */
      0,
      /* fixed64  */
      1,
      /* sfixed64 */
      1,
      /* bool     */
      0,
      /* string   */
      2,
      /* bytes    */
      2
    ]);
    types.defaults = bake([
      /* double   */
      0,
      /* float    */
      0,
      /* int32    */
      0,
      /* uint32   */
      0,
      /* sint32   */
      0,
      /* fixed32  */
      0,
      /* sfixed32 */
      0,
      /* int64    */
      0,
      /* uint64   */
      0,
      /* sint64   */
      0,
      /* fixed64  */
      0,
      /* sfixed64 */
      0,
      /* bool     */
      false,
      /* string   */
      "",
      /* bytes    */
      util.emptyArray,
      /* message  */
      null
    ]);
    types.long = bake([
      /* int64    */
      0,
      /* uint64   */
      0,
      /* sint64   */
      0,
      /* fixed64  */
      1,
      /* sfixed64 */
      1
    ], 7);
    types.mapKey = bake([
      /* int32    */
      0,
      /* uint32   */
      0,
      /* sint32   */
      0,
      /* fixed32  */
      5,
      /* sfixed32 */
      5,
      /* int64    */
      0,
      /* uint64   */
      0,
      /* sint64   */
      0,
      /* fixed64  */
      1,
      /* sfixed64 */
      1,
      /* bool     */
      0,
      /* string   */
      2
    ], 2);
    types.packed = bake([
      /* double   */
      1,
      /* float    */
      5,
      /* int32    */
      0,
      /* uint32   */
      0,
      /* sint32   */
      0,
      /* fixed32  */
      5,
      /* sfixed32 */
      5,
      /* int64    */
      0,
      /* uint64   */
      0,
      /* sint64   */
      0,
      /* fixed64  */
      1,
      /* sfixed64 */
      1,
      /* bool     */
      0
    ]);
  }
});

// node_modules/protobufjs/src/field.js
var require_field = __commonJS({
  "node_modules/protobufjs/src/field.js"(exports2, module2) {
    "use strict";
    module2.exports = Field;
    var ReflectionObject = require_object();
    ((Field.prototype = Object.create(ReflectionObject.prototype)).constructor = Field).className = "Field";
    var Enum = require_enum();
    var types = require_types();
    var util = require_util();
    var Type;
    var ruleRe = /^required|optional|repeated$/;
    Field.fromJSON = function fromJSON(name, json) {
      return new Field(name, json.id, json.type, json.rule, json.extend, json.options, json.comment);
    };
    function Field(name, id, type, rule, extend, options, comment) {
      if (util.isObject(rule)) {
        comment = extend;
        options = rule;
        rule = extend = void 0;
      } else if (util.isObject(extend)) {
        comment = options;
        options = extend;
        extend = void 0;
      }
      ReflectionObject.call(this, name, options);
      if (!util.isInteger(id) || id < 0)
        throw TypeError("id must be a non-negative integer");
      if (!util.isString(type))
        throw TypeError("type must be a string");
      if (rule !== void 0 && !ruleRe.test(rule = rule.toString().toLowerCase()))
        throw TypeError("rule must be a string rule");
      if (extend !== void 0 && !util.isString(extend))
        throw TypeError("extend must be a string");
      if (rule === "proto3_optional") {
        rule = "optional";
      }
      this.rule = rule && rule !== "optional" ? rule : void 0;
      this.type = type;
      this.id = id;
      this.extend = extend || void 0;
      this.required = rule === "required";
      this.optional = !this.required;
      this.repeated = rule === "repeated";
      this.map = false;
      this.message = null;
      this.partOf = null;
      this.typeDefault = null;
      this.defaultValue = null;
      this.long = util.Long ? types.long[type] !== void 0 : (
        /* istanbul ignore next */
        false
      );
      this.bytes = type === "bytes";
      this.resolvedType = null;
      this.extensionField = null;
      this.declaringField = null;
      this._packed = null;
      this.comment = comment;
    }
    Object.defineProperty(Field.prototype, "packed", {
      get: function() {
        if (this._packed === null)
          this._packed = this.getOption("packed") !== false;
        return this._packed;
      }
    });
    Field.prototype.setOption = function setOption(name, value, ifNotSet) {
      if (name === "packed")
        this._packed = null;
      return ReflectionObject.prototype.setOption.call(this, name, value, ifNotSet);
    };
    Field.prototype.toJSON = function toJSON(toJSONOptions) {
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "rule",
        this.rule !== "optional" && this.rule || void 0,
        "type",
        this.type,
        "id",
        this.id,
        "extend",
        this.extend,
        "options",
        this.options,
        "comment",
        keepComments ? this.comment : void 0
      ]);
    };
    Field.prototype.resolve = function resolve() {
      if (this.resolved)
        return this;
      if ((this.typeDefault = types.defaults[this.type]) === void 0) {
        this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type);
        if (this.resolvedType instanceof Type)
          this.typeDefault = null;
        else
          this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]];
      } else if (this.options && this.options.proto3_optional) {
        this.typeDefault = null;
      }
      if (this.options && this.options["default"] != null) {
        this.typeDefault = this.options["default"];
        if (this.resolvedType instanceof Enum && typeof this.typeDefault === "string")
          this.typeDefault = this.resolvedType.values[this.typeDefault];
      }
      if (this.options) {
        if (this.options.packed === true || this.options.packed !== void 0 && this.resolvedType && !(this.resolvedType instanceof Enum))
          delete this.options.packed;
        if (!Object.keys(this.options).length)
          this.options = void 0;
      }
      if (this.long) {
        this.typeDefault = util.Long.fromNumber(this.typeDefault, this.type.charAt(0) === "u");
        if (Object.freeze)
          Object.freeze(this.typeDefault);
      } else if (this.bytes && typeof this.typeDefault === "string") {
        var buf;
        if (util.base64.test(this.typeDefault))
          util.base64.decode(this.typeDefault, buf = util.newBuffer(util.base64.length(this.typeDefault)), 0);
        else
          util.utf8.write(this.typeDefault, buf = util.newBuffer(util.utf8.length(this.typeDefault)), 0);
        this.typeDefault = buf;
      }
      if (this.map)
        this.defaultValue = util.emptyObject;
      else if (this.repeated)
        this.defaultValue = util.emptyArray;
      else
        this.defaultValue = this.typeDefault;
      if (this.parent instanceof Type)
        this.parent.ctor.prototype[this.name] = this.defaultValue;
      return ReflectionObject.prototype.resolve.call(this);
    };
    Field.d = function decorateField(fieldId, fieldType, fieldRule, defaultValue) {
      if (typeof fieldType === "function")
        fieldType = util.decorateType(fieldType).name;
      else if (fieldType && typeof fieldType === "object")
        fieldType = util.decorateEnum(fieldType).name;
      return function fieldDecorator(prototype, fieldName) {
        util.decorateType(prototype.constructor).add(new Field(fieldName, fieldId, fieldType, fieldRule, { "default": defaultValue }));
      };
    };
    Field._configure = function configure(Type_) {
      Type = Type_;
    };
  }
});

// node_modules/protobufjs/src/oneof.js
var require_oneof = __commonJS({
  "node_modules/protobufjs/src/oneof.js"(exports2, module2) {
    "use strict";
    module2.exports = OneOf;
    var ReflectionObject = require_object();
    ((OneOf.prototype = Object.create(ReflectionObject.prototype)).constructor = OneOf).className = "OneOf";
    var Field = require_field();
    var util = require_util();
    function OneOf(name, fieldNames, options, comment) {
      if (!Array.isArray(fieldNames)) {
        options = fieldNames;
        fieldNames = void 0;
      }
      ReflectionObject.call(this, name, options);
      if (!(fieldNames === void 0 || Array.isArray(fieldNames)))
        throw TypeError("fieldNames must be an Array");
      this.oneof = fieldNames || [];
      this.fieldsArray = [];
      this.comment = comment;
    }
    OneOf.fromJSON = function fromJSON(name, json) {
      return new OneOf(name, json.oneof, json.options, json.comment);
    };
    OneOf.prototype.toJSON = function toJSON(toJSONOptions) {
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "options",
        this.options,
        "oneof",
        this.oneof,
        "comment",
        keepComments ? this.comment : void 0
      ]);
    };
    function addFieldsToParent(oneof) {
      if (oneof.parent) {
        for (var i = 0; i < oneof.fieldsArray.length; ++i)
          if (!oneof.fieldsArray[i].parent)
            oneof.parent.add(oneof.fieldsArray[i]);
      }
    }
    OneOf.prototype.add = function add2(field) {
      if (!(field instanceof Field))
        throw TypeError("field must be a Field");
      if (field.parent && field.parent !== this.parent)
        field.parent.remove(field);
      this.oneof.push(field.name);
      this.fieldsArray.push(field);
      field.partOf = this;
      addFieldsToParent(this);
      return this;
    };
    OneOf.prototype.remove = function remove(field) {
      if (!(field instanceof Field))
        throw TypeError("field must be a Field");
      var index = this.fieldsArray.indexOf(field);
      if (index < 0)
        throw Error(field + " is not a member of " + this);
      this.fieldsArray.splice(index, 1);
      index = this.oneof.indexOf(field.name);
      if (index > -1)
        this.oneof.splice(index, 1);
      field.partOf = null;
      return this;
    };
    OneOf.prototype.onAdd = function onAdd(parent) {
      ReflectionObject.prototype.onAdd.call(this, parent);
      var self2 = this;
      for (var i = 0; i < this.oneof.length; ++i) {
        var field = parent.get(this.oneof[i]);
        if (field && !field.partOf) {
          field.partOf = self2;
          self2.fieldsArray.push(field);
        }
      }
      addFieldsToParent(this);
    };
    OneOf.prototype.onRemove = function onRemove(parent) {
      for (var i = 0, field; i < this.fieldsArray.length; ++i)
        if ((field = this.fieldsArray[i]).parent)
          field.parent.remove(field);
      ReflectionObject.prototype.onRemove.call(this, parent);
    };
    OneOf.d = function decorateOneOf() {
      var fieldNames = new Array(arguments.length), index = 0;
      while (index < arguments.length)
        fieldNames[index] = arguments[index++];
      return function oneOfDecorator(prototype, oneofName) {
        util.decorateType(prototype.constructor).add(new OneOf(oneofName, fieldNames));
        Object.defineProperty(prototype, oneofName, {
          get: util.oneOfGetter(fieldNames),
          set: util.oneOfSetter(fieldNames)
        });
      };
    };
  }
});

// node_modules/protobufjs/src/namespace.js
var require_namespace = __commonJS({
  "node_modules/protobufjs/src/namespace.js"(exports2, module2) {
    "use strict";
    module2.exports = Namespace;
    var ReflectionObject = require_object();
    ((Namespace.prototype = Object.create(ReflectionObject.prototype)).constructor = Namespace).className = "Namespace";
    var Field = require_field();
    var util = require_util();
    var OneOf = require_oneof();
    var Type;
    var Service;
    var Enum;
    Namespace.fromJSON = function fromJSON(name, json) {
      return new Namespace(name, json.options).addJSON(json.nested);
    };
    function arrayToJSON(array, toJSONOptions) {
      if (!(array && array.length))
        return void 0;
      var obj = {};
      for (var i = 0; i < array.length; ++i)
        obj[array[i].name] = array[i].toJSON(toJSONOptions);
      return obj;
    }
    Namespace.arrayToJSON = arrayToJSON;
    Namespace.isReservedId = function isReservedId(reserved, id) {
      if (reserved) {
        for (var i = 0; i < reserved.length; ++i)
          if (typeof reserved[i] !== "string" && reserved[i][0] <= id && reserved[i][1] > id)
            return true;
      }
      return false;
    };
    Namespace.isReservedName = function isReservedName(reserved, name) {
      if (reserved) {
        for (var i = 0; i < reserved.length; ++i)
          if (reserved[i] === name)
            return true;
      }
      return false;
    };
    function Namespace(name, options) {
      ReflectionObject.call(this, name, options);
      this.nested = void 0;
      this._nestedArray = null;
    }
    function clearCache(namespace) {
      namespace._nestedArray = null;
      return namespace;
    }
    Object.defineProperty(Namespace.prototype, "nestedArray", {
      get: function() {
        return this._nestedArray || (this._nestedArray = util.toArray(this.nested));
      }
    });
    Namespace.prototype.toJSON = function toJSON(toJSONOptions) {
      return util.toObject([
        "options",
        this.options,
        "nested",
        arrayToJSON(this.nestedArray, toJSONOptions)
      ]);
    };
    Namespace.prototype.addJSON = function addJSON(nestedJson) {
      var ns = this;
      if (nestedJson) {
        for (var names = Object.keys(nestedJson), i = 0, nested; i < names.length; ++i) {
          nested = nestedJson[names[i]];
          ns.add(
            // most to least likely
            (nested.fields !== void 0 ? Type.fromJSON : nested.values !== void 0 ? Enum.fromJSON : nested.methods !== void 0 ? Service.fromJSON : nested.id !== void 0 ? Field.fromJSON : Namespace.fromJSON)(names[i], nested)
          );
        }
      }
      return this;
    };
    Namespace.prototype.get = function get(name) {
      return this.nested && this.nested[name] || null;
    };
    Namespace.prototype.getEnum = function getEnum(name) {
      if (this.nested && this.nested[name] instanceof Enum)
        return this.nested[name].values;
      throw Error("no such enum: " + name);
    };
    Namespace.prototype.add = function add2(object) {
      if (!(object instanceof Field && object.extend !== void 0 || object instanceof Type || object instanceof OneOf || object instanceof Enum || object instanceof Service || object instanceof Namespace))
        throw TypeError("object must be a valid nested object");
      if (!this.nested)
        this.nested = {};
      else {
        var prev = this.get(object.name);
        if (prev) {
          if (prev instanceof Namespace && object instanceof Namespace && !(prev instanceof Type || prev instanceof Service)) {
            var nested = prev.nestedArray;
            for (var i = 0; i < nested.length; ++i)
              object.add(nested[i]);
            this.remove(prev);
            if (!this.nested)
              this.nested = {};
            object.setOptions(prev.options, true);
          } else
            throw Error("duplicate name '" + object.name + "' in " + this);
        }
      }
      this.nested[object.name] = object;
      object.onAdd(this);
      return clearCache(this);
    };
    Namespace.prototype.remove = function remove(object) {
      if (!(object instanceof ReflectionObject))
        throw TypeError("object must be a ReflectionObject");
      if (object.parent !== this)
        throw Error(object + " is not a member of " + this);
      delete this.nested[object.name];
      if (!Object.keys(this.nested).length)
        this.nested = void 0;
      object.onRemove(this);
      return clearCache(this);
    };
    Namespace.prototype.define = function define(path, json) {
      if (util.isString(path))
        path = path.split(".");
      else if (!Array.isArray(path))
        throw TypeError("illegal path");
      if (path && path.length && path[0] === "")
        throw Error("path must be relative");
      var ptr = this;
      while (path.length > 0) {
        var part = path.shift();
        if (ptr.nested && ptr.nested[part]) {
          ptr = ptr.nested[part];
          if (!(ptr instanceof Namespace))
            throw Error("path conflicts with non-namespace objects");
        } else
          ptr.add(ptr = new Namespace(part));
      }
      if (json)
        ptr.addJSON(json);
      return ptr;
    };
    Namespace.prototype.resolveAll = function resolveAll() {
      var nested = this.nestedArray, i = 0;
      while (i < nested.length)
        if (nested[i] instanceof Namespace)
          nested[i++].resolveAll();
        else
          nested[i++].resolve();
      return this.resolve();
    };
    Namespace.prototype.lookup = function lookup(path, filterTypes, parentAlreadyChecked) {
      if (typeof filterTypes === "boolean") {
        parentAlreadyChecked = filterTypes;
        filterTypes = void 0;
      } else if (filterTypes && !Array.isArray(filterTypes))
        filterTypes = [filterTypes];
      if (util.isString(path) && path.length) {
        if (path === ".")
          return this.root;
        path = path.split(".");
      } else if (!path.length)
        return this;
      if (path[0] === "")
        return this.root.lookup(path.slice(1), filterTypes);
      var found = this.get(path[0]);
      if (found) {
        if (path.length === 1) {
          if (!filterTypes || filterTypes.indexOf(found.constructor) > -1)
            return found;
        } else if (found instanceof Namespace && (found = found.lookup(path.slice(1), filterTypes, true)))
          return found;
      } else
        for (var i = 0; i < this.nestedArray.length; ++i)
          if (this._nestedArray[i] instanceof Namespace && (found = this._nestedArray[i].lookup(path, filterTypes, true)))
            return found;
      if (this.parent === null || parentAlreadyChecked)
        return null;
      return this.parent.lookup(path, filterTypes);
    };
    Namespace.prototype.lookupType = function lookupType(path) {
      var found = this.lookup(path, [Type]);
      if (!found)
        throw Error("no such type: " + path);
      return found;
    };
    Namespace.prototype.lookupEnum = function lookupEnum(path) {
      var found = this.lookup(path, [Enum]);
      if (!found)
        throw Error("no such Enum '" + path + "' in " + this);
      return found;
    };
    Namespace.prototype.lookupTypeOrEnum = function lookupTypeOrEnum(path) {
      var found = this.lookup(path, [Type, Enum]);
      if (!found)
        throw Error("no such Type or Enum '" + path + "' in " + this);
      return found;
    };
    Namespace.prototype.lookupService = function lookupService(path) {
      var found = this.lookup(path, [Service]);
      if (!found)
        throw Error("no such Service '" + path + "' in " + this);
      return found;
    };
    Namespace._configure = function(Type_, Service_, Enum_) {
      Type = Type_;
      Service = Service_;
      Enum = Enum_;
    };
  }
});

// node_modules/protobufjs/src/mapfield.js
var require_mapfield = __commonJS({
  "node_modules/protobufjs/src/mapfield.js"(exports2, module2) {
    "use strict";
    module2.exports = MapField;
    var Field = require_field();
    ((MapField.prototype = Object.create(Field.prototype)).constructor = MapField).className = "MapField";
    var types = require_types();
    var util = require_util();
    function MapField(name, id, keyType, type, options, comment) {
      Field.call(this, name, id, type, void 0, void 0, options, comment);
      if (!util.isString(keyType))
        throw TypeError("keyType must be a string");
      this.keyType = keyType;
      this.resolvedKeyType = null;
      this.map = true;
    }
    MapField.fromJSON = function fromJSON(name, json) {
      return new MapField(name, json.id, json.keyType, json.type, json.options, json.comment);
    };
    MapField.prototype.toJSON = function toJSON(toJSONOptions) {
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "keyType",
        this.keyType,
        "type",
        this.type,
        "id",
        this.id,
        "extend",
        this.extend,
        "options",
        this.options,
        "comment",
        keepComments ? this.comment : void 0
      ]);
    };
    MapField.prototype.resolve = function resolve() {
      if (this.resolved)
        return this;
      if (types.mapKey[this.keyType] === void 0)
        throw Error("invalid key type: " + this.keyType);
      return Field.prototype.resolve.call(this);
    };
    MapField.d = function decorateMapField(fieldId, fieldKeyType, fieldValueType) {
      if (typeof fieldValueType === "function")
        fieldValueType = util.decorateType(fieldValueType).name;
      else if (fieldValueType && typeof fieldValueType === "object")
        fieldValueType = util.decorateEnum(fieldValueType).name;
      return function mapFieldDecorator(prototype, fieldName) {
        util.decorateType(prototype.constructor).add(new MapField(fieldName, fieldId, fieldKeyType, fieldValueType));
      };
    };
  }
});

// node_modules/protobufjs/src/method.js
var require_method = __commonJS({
  "node_modules/protobufjs/src/method.js"(exports2, module2) {
    "use strict";
    module2.exports = Method;
    var ReflectionObject = require_object();
    ((Method.prototype = Object.create(ReflectionObject.prototype)).constructor = Method).className = "Method";
    var util = require_util();
    function Method(name, type, requestType, responseType, requestStream, responseStream, options, comment, parsedOptions) {
      if (util.isObject(requestStream)) {
        options = requestStream;
        requestStream = responseStream = void 0;
      } else if (util.isObject(responseStream)) {
        options = responseStream;
        responseStream = void 0;
      }
      if (!(type === void 0 || util.isString(type)))
        throw TypeError("type must be a string");
      if (!util.isString(requestType))
        throw TypeError("requestType must be a string");
      if (!util.isString(responseType))
        throw TypeError("responseType must be a string");
      ReflectionObject.call(this, name, options);
      this.type = type || "rpc";
      this.requestType = requestType;
      this.requestStream = requestStream ? true : void 0;
      this.responseType = responseType;
      this.responseStream = responseStream ? true : void 0;
      this.resolvedRequestType = null;
      this.resolvedResponseType = null;
      this.comment = comment;
      this.parsedOptions = parsedOptions;
    }
    Method.fromJSON = function fromJSON(name, json) {
      return new Method(name, json.type, json.requestType, json.responseType, json.requestStream, json.responseStream, json.options, json.comment, json.parsedOptions);
    };
    Method.prototype.toJSON = function toJSON(toJSONOptions) {
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "type",
        this.type !== "rpc" && /* istanbul ignore next */
        this.type || void 0,
        "requestType",
        this.requestType,
        "requestStream",
        this.requestStream,
        "responseType",
        this.responseType,
        "responseStream",
        this.responseStream,
        "options",
        this.options,
        "comment",
        keepComments ? this.comment : void 0,
        "parsedOptions",
        this.parsedOptions
      ]);
    };
    Method.prototype.resolve = function resolve() {
      if (this.resolved)
        return this;
      this.resolvedRequestType = this.parent.lookupType(this.requestType);
      this.resolvedResponseType = this.parent.lookupType(this.responseType);
      return ReflectionObject.prototype.resolve.call(this);
    };
  }
});

// node_modules/protobufjs/src/service.js
var require_service2 = __commonJS({
  "node_modules/protobufjs/src/service.js"(exports2, module2) {
    "use strict";
    module2.exports = Service;
    var Namespace = require_namespace();
    ((Service.prototype = Object.create(Namespace.prototype)).constructor = Service).className = "Service";
    var Method = require_method();
    var util = require_util();
    var rpc = require_rpc();
    function Service(name, options) {
      Namespace.call(this, name, options);
      this.methods = {};
      this._methodsArray = null;
    }
    Service.fromJSON = function fromJSON(name, json) {
      var service = new Service(name, json.options);
      if (json.methods)
        for (var names = Object.keys(json.methods), i = 0; i < names.length; ++i)
          service.add(Method.fromJSON(names[i], json.methods[names[i]]));
      if (json.nested)
        service.addJSON(json.nested);
      service.comment = json.comment;
      return service;
    };
    Service.prototype.toJSON = function toJSON(toJSONOptions) {
      var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "options",
        inherited && inherited.options || void 0,
        "methods",
        Namespace.arrayToJSON(this.methodsArray, toJSONOptions) || /* istanbul ignore next */
        {},
        "nested",
        inherited && inherited.nested || void 0,
        "comment",
        keepComments ? this.comment : void 0
      ]);
    };
    Object.defineProperty(Service.prototype, "methodsArray", {
      get: function() {
        return this._methodsArray || (this._methodsArray = util.toArray(this.methods));
      }
    });
    function clearCache(service) {
      service._methodsArray = null;
      return service;
    }
    Service.prototype.get = function get(name) {
      return this.methods[name] || Namespace.prototype.get.call(this, name);
    };
    Service.prototype.resolveAll = function resolveAll() {
      var methods = this.methodsArray;
      for (var i = 0; i < methods.length; ++i)
        methods[i].resolve();
      return Namespace.prototype.resolve.call(this);
    };
    Service.prototype.add = function add2(object) {
      if (this.get(object.name))
        throw Error("duplicate name '" + object.name + "' in " + this);
      if (object instanceof Method) {
        this.methods[object.name] = object;
        object.parent = this;
        return clearCache(this);
      }
      return Namespace.prototype.add.call(this, object);
    };
    Service.prototype.remove = function remove(object) {
      if (object instanceof Method) {
        if (this.methods[object.name] !== object)
          throw Error(object + " is not a member of " + this);
        delete this.methods[object.name];
        object.parent = null;
        return clearCache(this);
      }
      return Namespace.prototype.remove.call(this, object);
    };
    Service.prototype.create = function create(rpcImpl, requestDelimited, responseDelimited) {
      var rpcService = new rpc.Service(rpcImpl, requestDelimited, responseDelimited);
      for (var i = 0, method; i < /* initializes */
      this.methodsArray.length; ++i) {
        var methodName = util.lcFirst((method = this._methodsArray[i]).resolve().name).replace(/[^$\w_]/g, "");
        rpcService[methodName] = util.codegen(["r", "c"], util.isReserved(methodName) ? methodName + "_" : methodName)("return this.rpcCall(m,q,s,r,c)")({
          m: method,
          q: method.resolvedRequestType.ctor,
          s: method.resolvedResponseType.ctor
        });
      }
      return rpcService;
    };
  }
});

// node_modules/protobufjs/src/message.js
var require_message = __commonJS({
  "node_modules/protobufjs/src/message.js"(exports2, module2) {
    "use strict";
    module2.exports = Message2;
    var util = require_minimal();
    function Message2(properties) {
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          this[keys[i]] = properties[keys[i]];
    }
    Message2.create = function create(properties) {
      return this.$type.create(properties);
    };
    Message2.encode = function encode3(message, writer) {
      return this.$type.encode(message, writer);
    };
    Message2.encodeDelimited = function encodeDelimited(message, writer) {
      return this.$type.encodeDelimited(message, writer);
    };
    Message2.decode = function decode3(reader) {
      return this.$type.decode(reader);
    };
    Message2.decodeDelimited = function decodeDelimited(reader) {
      return this.$type.decodeDelimited(reader);
    };
    Message2.verify = function verify(message) {
      return this.$type.verify(message);
    };
    Message2.fromObject = function fromObject(object) {
      return this.$type.fromObject(object);
    };
    Message2.toObject = function toObject(message, options) {
      return this.$type.toObject(message, options);
    };
    Message2.prototype.toJSON = function toJSON() {
      return this.$type.toObject(this, util.toJSONOptions);
    };
  }
});

// node_modules/protobufjs/src/decoder.js
var require_decoder = __commonJS({
  "node_modules/protobufjs/src/decoder.js"(exports2, module2) {
    "use strict";
    module2.exports = decoder4;
    var Enum = require_enum();
    var types = require_types();
    var util = require_util();
    function missing(field) {
      return "missing required '" + field.name + "'";
    }
    function decoder4(mtype) {
      var gen = util.codegen(["r", "l"], mtype.name + "$decode")("if(!(r instanceof Reader))")("r=Reader.create(r)")("var c=l===undefined?r.len:r.pos+l,m=new this.ctor" + (mtype.fieldsArray.filter(function(field2) {
        return field2.map;
      }).length ? ",k,value" : ""))("while(r.pos<c){")("var t=r.uint32()");
      if (mtype.group) gen("if((t&7)===4)")("break");
      gen("switch(t>>>3){");
      var i = 0;
      for (; i < /* initializes */
      mtype.fieldsArray.length; ++i) {
        var field = mtype._fieldsArray[i].resolve(), type = field.resolvedType instanceof Enum ? "int32" : field.type, ref = "m" + util.safeProp(field.name);
        gen("case %i: {", field.id);
        if (field.map) {
          gen("if(%s===util.emptyObject)", ref)("%s={}", ref)("var c2 = r.uint32()+r.pos");
          if (types.defaults[field.keyType] !== void 0) gen("k=%j", types.defaults[field.keyType]);
          else gen("k=null");
          if (types.defaults[type] !== void 0) gen("value=%j", types.defaults[type]);
          else gen("value=null");
          gen("while(r.pos<c2){")("var tag2=r.uint32()")("switch(tag2>>>3){")("case 1: k=r.%s(); break", field.keyType)("case 2:");
          if (types.basic[type] === void 0) gen("value=types[%i].decode(r,r.uint32())", i);
          else gen("value=r.%s()", type);
          gen("break")("default:")("r.skipType(tag2&7)")("break")("}")("}");
          if (types.long[field.keyType] !== void 0) gen('%s[typeof k==="object"?util.longToHash(k):k]=value', ref);
          else gen("%s[k]=value", ref);
        } else if (field.repeated) {
          gen("if(!(%s&&%s.length))", ref, ref)("%s=[]", ref);
          if (types.packed[type] !== void 0) gen("if((t&7)===2){")("var c2=r.uint32()+r.pos")("while(r.pos<c2)")("%s.push(r.%s())", ref, type)("}else");
          if (types.basic[type] === void 0) gen(field.resolvedType.group ? "%s.push(types[%i].decode(r))" : "%s.push(types[%i].decode(r,r.uint32()))", ref, i);
          else gen("%s.push(r.%s())", ref, type);
        } else if (types.basic[type] === void 0) gen(field.resolvedType.group ? "%s=types[%i].decode(r)" : "%s=types[%i].decode(r,r.uint32())", ref, i);
        else gen("%s=r.%s()", ref, type);
        gen("break")("}");
      }
      gen("default:")("r.skipType(t&7)")("break")("}")("}");
      for (i = 0; i < mtype._fieldsArray.length; ++i) {
        var rfield = mtype._fieldsArray[i];
        if (rfield.required) gen("if(!m.hasOwnProperty(%j))", rfield.name)("throw util.ProtocolError(%j,{instance:m})", missing(rfield));
      }
      return gen("return m");
    }
  }
});

// node_modules/protobufjs/src/verifier.js
var require_verifier = __commonJS({
  "node_modules/protobufjs/src/verifier.js"(exports2, module2) {
    "use strict";
    module2.exports = verifier;
    var Enum = require_enum();
    var util = require_util();
    function invalid(field, expected) {
      return field.name + ": " + expected + (field.repeated && expected !== "array" ? "[]" : field.map && expected !== "object" ? "{k:" + field.keyType + "}" : "") + " expected";
    }
    function genVerifyValue(gen, field, fieldIndex, ref) {
      if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) {
          gen("switch(%s){", ref)("default:")("return%j", invalid(field, "enum value"));
          for (var keys = Object.keys(field.resolvedType.values), j = 0; j < keys.length; ++j) gen("case %i:", field.resolvedType.values[keys[j]]);
          gen("break")("}");
        } else {
          gen("{")("var e=types[%i].verify(%s);", fieldIndex, ref)("if(e)")("return%j+e", field.name + ".")("}");
        }
      } else {
        switch (field.type) {
          case "int32":
          case "uint32":
          case "sint32":
          case "fixed32":
          case "sfixed32":
            gen("if(!util.isInteger(%s))", ref)("return%j", invalid(field, "integer"));
            break;
          case "int64":
          case "uint64":
          case "sint64":
          case "fixed64":
          case "sfixed64":
            gen("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", ref, ref, ref, ref)("return%j", invalid(field, "integer|Long"));
            break;
          case "float":
          case "double":
            gen('if(typeof %s!=="number")', ref)("return%j", invalid(field, "number"));
            break;
          case "bool":
            gen('if(typeof %s!=="boolean")', ref)("return%j", invalid(field, "boolean"));
            break;
          case "string":
            gen("if(!util.isString(%s))", ref)("return%j", invalid(field, "string"));
            break;
          case "bytes":
            gen('if(!(%s&&typeof %s.length==="number"||util.isString(%s)))', ref, ref, ref)("return%j", invalid(field, "buffer"));
            break;
        }
      }
      return gen;
    }
    function genVerifyKey(gen, field, ref) {
      switch (field.keyType) {
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32":
          gen("if(!util.key32Re.test(%s))", ref)("return%j", invalid(field, "integer key"));
          break;
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64":
          gen("if(!util.key64Re.test(%s))", ref)("return%j", invalid(field, "integer|Long key"));
          break;
        case "bool":
          gen("if(!util.key2Re.test(%s))", ref)("return%j", invalid(field, "boolean key"));
          break;
      }
      return gen;
    }
    function verifier(mtype) {
      var gen = util.codegen(["m"], mtype.name + "$verify")('if(typeof m!=="object"||m===null)')("return%j", "object expected");
      var oneofs = mtype.oneofsArray, seenFirstField = {};
      if (oneofs.length) gen("var p={}");
      for (var i = 0; i < /* initializes */
      mtype.fieldsArray.length; ++i) {
        var field = mtype._fieldsArray[i].resolve(), ref = "m" + util.safeProp(field.name);
        if (field.optional) gen("if(%s!=null&&m.hasOwnProperty(%j)){", ref, field.name);
        if (field.map) {
          gen("if(!util.isObject(%s))", ref)("return%j", invalid(field, "object"))("var k=Object.keys(%s)", ref)("for(var i=0;i<k.length;++i){");
          genVerifyKey(gen, field, "k[i]");
          genVerifyValue(gen, field, i, ref + "[k[i]]")("}");
        } else if (field.repeated) {
          gen("if(!Array.isArray(%s))", ref)("return%j", invalid(field, "array"))("for(var i=0;i<%s.length;++i){", ref);
          genVerifyValue(gen, field, i, ref + "[i]")("}");
        } else {
          if (field.partOf) {
            var oneofProp = util.safeProp(field.partOf.name);
            if (seenFirstField[field.partOf.name] === 1) gen("if(p%s===1)", oneofProp)("return%j", field.partOf.name + ": multiple values");
            seenFirstField[field.partOf.name] = 1;
            gen("p%s=1", oneofProp);
          }
          genVerifyValue(gen, field, i, ref);
        }
        if (field.optional) gen("}");
      }
      return gen("return null");
    }
  }
});

// node_modules/protobufjs/src/converter.js
var require_converter = __commonJS({
  "node_modules/protobufjs/src/converter.js"(exports2) {
    "use strict";
    var converter = exports2;
    var Enum = require_enum();
    var util = require_util();
    function genValuePartial_fromObject(gen, field, fieldIndex, prop) {
      var defaultAlreadyEmitted = false;
      if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) {
          gen("switch(d%s){", prop);
          for (var values = field.resolvedType.values, keys = Object.keys(values), i = 0; i < keys.length; ++i) {
            if (values[keys[i]] === field.typeDefault && !defaultAlreadyEmitted) {
              gen("default:")('if(typeof(d%s)==="number"){m%s=d%s;break}', prop, prop, prop);
              if (!field.repeated) gen("break");
              defaultAlreadyEmitted = true;
            }
            gen("case%j:", keys[i])("case %i:", values[keys[i]])("m%s=%j", prop, values[keys[i]])("break");
          }
          gen("}");
        } else gen('if(typeof d%s!=="object")', prop)("throw TypeError(%j)", field.fullName + ": object expected")("m%s=types[%i].fromObject(d%s)", prop, fieldIndex, prop);
      } else {
        var isUnsigned = false;
        switch (field.type) {
          case "double":
          case "float":
            gen("m%s=Number(d%s)", prop, prop);
            break;
          case "uint32":
          case "fixed32":
            gen("m%s=d%s>>>0", prop, prop);
            break;
          case "int32":
          case "sint32":
          case "sfixed32":
            gen("m%s=d%s|0", prop, prop);
            break;
          case "uint64":
            isUnsigned = true;
          // eslint-disable-next-line no-fallthrough
          case "int64":
          case "sint64":
          case "fixed64":
          case "sfixed64":
            gen("if(util.Long)")("(m%s=util.Long.fromValue(d%s)).unsigned=%j", prop, prop, isUnsigned)('else if(typeof d%s==="string")', prop)("m%s=parseInt(d%s,10)", prop, prop)('else if(typeof d%s==="number")', prop)("m%s=d%s", prop, prop)('else if(typeof d%s==="object")', prop)("m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)", prop, prop, prop, isUnsigned ? "true" : "");
            break;
          case "bytes":
            gen('if(typeof d%s==="string")', prop)("util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)", prop, prop, prop)("else if(d%s.length >= 0)", prop)("m%s=d%s", prop, prop);
            break;
          case "string":
            gen("m%s=String(d%s)", prop, prop);
            break;
          case "bool":
            gen("m%s=Boolean(d%s)", prop, prop);
            break;
        }
      }
      return gen;
    }
    converter.fromObject = function fromObject(mtype) {
      var fields = mtype.fieldsArray;
      var gen = util.codegen(["d"], mtype.name + "$fromObject")("if(d instanceof this.ctor)")("return d");
      if (!fields.length) return gen("return new this.ctor");
      gen("var m=new this.ctor");
      for (var i = 0; i < fields.length; ++i) {
        var field = fields[i].resolve(), prop = util.safeProp(field.name);
        if (field.map) {
          gen("if(d%s){", prop)('if(typeof d%s!=="object")', prop)("throw TypeError(%j)", field.fullName + ": object expected")("m%s={}", prop)("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){", prop);
          genValuePartial_fromObject(
            gen,
            field,
            /* not sorted */
            i,
            prop + "[ks[i]]"
          )("}")("}");
        } else if (field.repeated) {
          gen("if(d%s){", prop)("if(!Array.isArray(d%s))", prop)("throw TypeError(%j)", field.fullName + ": array expected")("m%s=[]", prop)("for(var i=0;i<d%s.length;++i){", prop);
          genValuePartial_fromObject(
            gen,
            field,
            /* not sorted */
            i,
            prop + "[i]"
          )("}")("}");
        } else {
          if (!(field.resolvedType instanceof Enum)) gen("if(d%s!=null){", prop);
          genValuePartial_fromObject(
            gen,
            field,
            /* not sorted */
            i,
            prop
          );
          if (!(field.resolvedType instanceof Enum)) gen("}");
        }
      }
      return gen("return m");
    };
    function genValuePartial_toObject(gen, field, fieldIndex, prop) {
      if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) gen("d%s=o.enums===String?(types[%i].values[m%s]===undefined?m%s:types[%i].values[m%s]):m%s", prop, fieldIndex, prop, prop, fieldIndex, prop, prop);
        else gen("d%s=types[%i].toObject(m%s,o)", prop, fieldIndex, prop);
      } else {
        var isUnsigned = false;
        switch (field.type) {
          case "double":
          case "float":
            gen("d%s=o.json&&!isFinite(m%s)?String(m%s):m%s", prop, prop, prop, prop);
            break;
          case "uint64":
            isUnsigned = true;
          // eslint-disable-next-line no-fallthrough
          case "int64":
          case "sint64":
          case "fixed64":
          case "sfixed64":
            gen('if(typeof m%s==="number")', prop)("d%s=o.longs===String?String(m%s):m%s", prop, prop, prop)("else")("d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s", prop, prop, prop, prop, isUnsigned ? "true" : "", prop);
            break;
          case "bytes":
            gen("d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s", prop, prop, prop, prop, prop);
            break;
          default:
            gen("d%s=m%s", prop, prop);
            break;
        }
      }
      return gen;
    }
    converter.toObject = function toObject(mtype) {
      var fields = mtype.fieldsArray.slice().sort(util.compareFieldsById);
      if (!fields.length)
        return util.codegen()("return {}");
      var gen = util.codegen(["m", "o"], mtype.name + "$toObject")("if(!o)")("o={}")("var d={}");
      var repeatedFields = [], mapFields = [], normalFields = [], i = 0;
      for (; i < fields.length; ++i)
        if (!fields[i].partOf)
          (fields[i].resolve().repeated ? repeatedFields : fields[i].map ? mapFields : normalFields).push(fields[i]);
      if (repeatedFields.length) {
        gen("if(o.arrays||o.defaults){");
        for (i = 0; i < repeatedFields.length; ++i) gen("d%s=[]", util.safeProp(repeatedFields[i].name));
        gen("}");
      }
      if (mapFields.length) {
        gen("if(o.objects||o.defaults){");
        for (i = 0; i < mapFields.length; ++i) gen("d%s={}", util.safeProp(mapFields[i].name));
        gen("}");
      }
      if (normalFields.length) {
        gen("if(o.defaults){");
        for (i = 0; i < normalFields.length; ++i) {
          var field = normalFields[i], prop = util.safeProp(field.name);
          if (field.resolvedType instanceof Enum) gen("d%s=o.enums===String?%j:%j", prop, field.resolvedType.valuesById[field.typeDefault], field.typeDefault);
          else if (field.long) gen("if(util.Long){")("var n=new util.Long(%i,%i,%j)", field.typeDefault.low, field.typeDefault.high, field.typeDefault.unsigned)("d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n", prop)("}else")("d%s=o.longs===String?%j:%i", prop, field.typeDefault.toString(), field.typeDefault.toNumber());
          else if (field.bytes) {
            var arrayDefault = "[" + Array.prototype.slice.call(field.typeDefault).join(",") + "]";
            gen("if(o.bytes===String)d%s=%j", prop, String.fromCharCode.apply(String, field.typeDefault))("else{")("d%s=%s", prop, arrayDefault)("if(o.bytes!==Array)d%s=util.newBuffer(d%s)", prop, prop)("}");
          } else gen("d%s=%j", prop, field.typeDefault);
        }
        gen("}");
      }
      var hasKs2 = false;
      for (i = 0; i < fields.length; ++i) {
        var field = fields[i], index = mtype._fieldsArray.indexOf(field), prop = util.safeProp(field.name);
        if (field.map) {
          if (!hasKs2) {
            hasKs2 = true;
            gen("var ks2");
          }
          gen("if(m%s&&(ks2=Object.keys(m%s)).length){", prop, prop)("d%s={}", prop)("for(var j=0;j<ks2.length;++j){");
          genValuePartial_toObject(
            gen,
            field,
            /* sorted */
            index,
            prop + "[ks2[j]]"
          )("}");
        } else if (field.repeated) {
          gen("if(m%s&&m%s.length){", prop, prop)("d%s=[]", prop)("for(var j=0;j<m%s.length;++j){", prop);
          genValuePartial_toObject(
            gen,
            field,
            /* sorted */
            index,
            prop + "[j]"
          )("}");
        } else {
          gen("if(m%s!=null&&m.hasOwnProperty(%j)){", prop, field.name);
          genValuePartial_toObject(
            gen,
            field,
            /* sorted */
            index,
            prop
          );
          if (field.partOf) gen("if(o.oneofs)")("d%s=%j", util.safeProp(field.partOf.name), field.name);
        }
        gen("}");
      }
      return gen("return d");
    };
  }
});

// node_modules/protobufjs/src/wrappers.js
var require_wrappers = __commonJS({
  "node_modules/protobufjs/src/wrappers.js"(exports2) {
    "use strict";
    var wrappers = exports2;
    var Message2 = require_message();
    wrappers[".google.protobuf.Any"] = {
      fromObject: function(object) {
        if (object && object["@type"]) {
          var name = object["@type"].substring(object["@type"].lastIndexOf("/") + 1);
          var type = this.lookup(name);
          if (type) {
            var type_url = object["@type"].charAt(0) === "." ? object["@type"].slice(1) : object["@type"];
            if (type_url.indexOf("/") === -1) {
              type_url = "/" + type_url;
            }
            return this.create({
              type_url,
              value: type.encode(type.fromObject(object)).finish()
            });
          }
        }
        return this.fromObject(object);
      },
      toObject: function(message, options) {
        var googleApi = "type.googleapis.com/";
        var prefix = "";
        var name = "";
        if (options && options.json && message.type_url && message.value) {
          name = message.type_url.substring(message.type_url.lastIndexOf("/") + 1);
          prefix = message.type_url.substring(0, message.type_url.lastIndexOf("/") + 1);
          var type = this.lookup(name);
          if (type)
            message = type.decode(message.value);
        }
        if (!(message instanceof this.ctor) && message instanceof Message2) {
          var object = message.$type.toObject(message, options);
          var messageName = message.$type.fullName[0] === "." ? message.$type.fullName.slice(1) : message.$type.fullName;
          if (prefix === "") {
            prefix = googleApi;
          }
          name = prefix + messageName;
          object["@type"] = name;
          return object;
        }
        return this.toObject(message, options);
      }
    };
  }
});

// node_modules/protobufjs/src/type.js
var require_type = __commonJS({
  "node_modules/protobufjs/src/type.js"(exports2, module2) {
    "use strict";
    module2.exports = Type;
    var Namespace = require_namespace();
    ((Type.prototype = Object.create(Namespace.prototype)).constructor = Type).className = "Type";
    var Enum = require_enum();
    var OneOf = require_oneof();
    var Field = require_field();
    var MapField = require_mapfield();
    var Service = require_service2();
    var Message2 = require_message();
    var Reader = require_reader();
    var Writer = require_writer();
    var util = require_util();
    var encoder = require_encoder();
    var decoder4 = require_decoder();
    var verifier = require_verifier();
    var converter = require_converter();
    var wrappers = require_wrappers();
    function Type(name, options) {
      Namespace.call(this, name, options);
      this.fields = {};
      this.oneofs = void 0;
      this.extensions = void 0;
      this.reserved = void 0;
      this.group = void 0;
      this._fieldsById = null;
      this._fieldsArray = null;
      this._oneofsArray = null;
      this._ctor = null;
    }
    Object.defineProperties(Type.prototype, {
      /**
       * Message fields by id.
       * @name Type#fieldsById
       * @type {Object.<number,Field>}
       * @readonly
       */
      fieldsById: {
        get: function() {
          if (this._fieldsById)
            return this._fieldsById;
          this._fieldsById = {};
          for (var names = Object.keys(this.fields), i = 0; i < names.length; ++i) {
            var field = this.fields[names[i]], id = field.id;
            if (this._fieldsById[id])
              throw Error("duplicate id " + id + " in " + this);
            this._fieldsById[id] = field;
          }
          return this._fieldsById;
        }
      },
      /**
       * Fields of this message as an array for iteration.
       * @name Type#fieldsArray
       * @type {Field[]}
       * @readonly
       */
      fieldsArray: {
        get: function() {
          return this._fieldsArray || (this._fieldsArray = util.toArray(this.fields));
        }
      },
      /**
       * Oneofs of this message as an array for iteration.
       * @name Type#oneofsArray
       * @type {OneOf[]}
       * @readonly
       */
      oneofsArray: {
        get: function() {
          return this._oneofsArray || (this._oneofsArray = util.toArray(this.oneofs));
        }
      },
      /**
       * The registered constructor, if any registered, otherwise a generic constructor.
       * Assigning a function replaces the internal constructor. If the function does not extend {@link Message} yet, its prototype will be setup accordingly and static methods will be populated. If it already extends {@link Message}, it will just replace the internal constructor.
       * @name Type#ctor
       * @type {Constructor<{}>}
       */
      ctor: {
        get: function() {
          return this._ctor || (this.ctor = Type.generateConstructor(this)());
        },
        set: function(ctor) {
          var prototype = ctor.prototype;
          if (!(prototype instanceof Message2)) {
            (ctor.prototype = new Message2()).constructor = ctor;
            util.merge(ctor.prototype, prototype);
          }
          ctor.$type = ctor.prototype.$type = this;
          util.merge(ctor, Message2, true);
          this._ctor = ctor;
          var i = 0;
          for (; i < /* initializes */
          this.fieldsArray.length; ++i)
            this._fieldsArray[i].resolve();
          var ctorProperties = {};
          for (i = 0; i < /* initializes */
          this.oneofsArray.length; ++i)
            ctorProperties[this._oneofsArray[i].resolve().name] = {
              get: util.oneOfGetter(this._oneofsArray[i].oneof),
              set: util.oneOfSetter(this._oneofsArray[i].oneof)
            };
          if (i)
            Object.defineProperties(ctor.prototype, ctorProperties);
        }
      }
    });
    Type.generateConstructor = function generateConstructor(mtype) {
      var gen = util.codegen(["p"], mtype.name);
      for (var i = 0, field; i < mtype.fieldsArray.length; ++i)
        if ((field = mtype._fieldsArray[i]).map) gen("this%s={}", util.safeProp(field.name));
        else if (field.repeated) gen("this%s=[]", util.safeProp(field.name));
      return gen("if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null)")("this[ks[i]]=p[ks[i]]");
    };
    function clearCache(type) {
      type._fieldsById = type._fieldsArray = type._oneofsArray = null;
      delete type.encode;
      delete type.decode;
      delete type.verify;
      return type;
    }
    Type.fromJSON = function fromJSON(name, json) {
      var type = new Type(name, json.options);
      type.extensions = json.extensions;
      type.reserved = json.reserved;
      var names = Object.keys(json.fields), i = 0;
      for (; i < names.length; ++i)
        type.add(
          (typeof json.fields[names[i]].keyType !== "undefined" ? MapField.fromJSON : Field.fromJSON)(names[i], json.fields[names[i]])
        );
      if (json.oneofs)
        for (names = Object.keys(json.oneofs), i = 0; i < names.length; ++i)
          type.add(OneOf.fromJSON(names[i], json.oneofs[names[i]]));
      if (json.nested)
        for (names = Object.keys(json.nested), i = 0; i < names.length; ++i) {
          var nested = json.nested[names[i]];
          type.add(
            // most to least likely
            (nested.id !== void 0 ? Field.fromJSON : nested.fields !== void 0 ? Type.fromJSON : nested.values !== void 0 ? Enum.fromJSON : nested.methods !== void 0 ? Service.fromJSON : Namespace.fromJSON)(names[i], nested)
          );
        }
      if (json.extensions && json.extensions.length)
        type.extensions = json.extensions;
      if (json.reserved && json.reserved.length)
        type.reserved = json.reserved;
      if (json.group)
        type.group = true;
      if (json.comment)
        type.comment = json.comment;
      return type;
    };
    Type.prototype.toJSON = function toJSON(toJSONOptions) {
      var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "options",
        inherited && inherited.options || void 0,
        "oneofs",
        Namespace.arrayToJSON(this.oneofsArray, toJSONOptions),
        "fields",
        Namespace.arrayToJSON(this.fieldsArray.filter(function(obj) {
          return !obj.declaringField;
        }), toJSONOptions) || {},
        "extensions",
        this.extensions && this.extensions.length ? this.extensions : void 0,
        "reserved",
        this.reserved && this.reserved.length ? this.reserved : void 0,
        "group",
        this.group || void 0,
        "nested",
        inherited && inherited.nested || void 0,
        "comment",
        keepComments ? this.comment : void 0
      ]);
    };
    Type.prototype.resolveAll = function resolveAll() {
      var fields = this.fieldsArray, i = 0;
      while (i < fields.length)
        fields[i++].resolve();
      var oneofs = this.oneofsArray;
      i = 0;
      while (i < oneofs.length)
        oneofs[i++].resolve();
      return Namespace.prototype.resolveAll.call(this);
    };
    Type.prototype.get = function get(name) {
      return this.fields[name] || this.oneofs && this.oneofs[name] || this.nested && this.nested[name] || null;
    };
    Type.prototype.add = function add2(object) {
      if (this.get(object.name))
        throw Error("duplicate name '" + object.name + "' in " + this);
      if (object instanceof Field && object.extend === void 0) {
        if (this._fieldsById ? (
          /* istanbul ignore next */
          this._fieldsById[object.id]
        ) : this.fieldsById[object.id])
          throw Error("duplicate id " + object.id + " in " + this);
        if (this.isReservedId(object.id))
          throw Error("id " + object.id + " is reserved in " + this);
        if (this.isReservedName(object.name))
          throw Error("name '" + object.name + "' is reserved in " + this);
        if (object.parent)
          object.parent.remove(object);
        this.fields[object.name] = object;
        object.message = this;
        object.onAdd(this);
        return clearCache(this);
      }
      if (object instanceof OneOf) {
        if (!this.oneofs)
          this.oneofs = {};
        this.oneofs[object.name] = object;
        object.onAdd(this);
        return clearCache(this);
      }
      return Namespace.prototype.add.call(this, object);
    };
    Type.prototype.remove = function remove(object) {
      if (object instanceof Field && object.extend === void 0) {
        if (!this.fields || this.fields[object.name] !== object)
          throw Error(object + " is not a member of " + this);
        delete this.fields[object.name];
        object.parent = null;
        object.onRemove(this);
        return clearCache(this);
      }
      if (object instanceof OneOf) {
        if (!this.oneofs || this.oneofs[object.name] !== object)
          throw Error(object + " is not a member of " + this);
        delete this.oneofs[object.name];
        object.parent = null;
        object.onRemove(this);
        return clearCache(this);
      }
      return Namespace.prototype.remove.call(this, object);
    };
    Type.prototype.isReservedId = function isReservedId(id) {
      return Namespace.isReservedId(this.reserved, id);
    };
    Type.prototype.isReservedName = function isReservedName(name) {
      return Namespace.isReservedName(this.reserved, name);
    };
    Type.prototype.create = function create(properties) {
      return new this.ctor(properties);
    };
    Type.prototype.setup = function setup() {
      var fullName = this.fullName, types = [];
      for (var i = 0; i < /* initializes */
      this.fieldsArray.length; ++i)
        types.push(this._fieldsArray[i].resolve().resolvedType);
      this.encode = encoder(this)({
        Writer,
        types,
        util
      });
      this.decode = decoder4(this)({
        Reader,
        types,
        util
      });
      this.verify = verifier(this)({
        types,
        util
      });
      this.fromObject = converter.fromObject(this)({
        types,
        util
      });
      this.toObject = converter.toObject(this)({
        types,
        util
      });
      var wrapper = wrappers[fullName];
      if (wrapper) {
        var originalThis = Object.create(this);
        originalThis.fromObject = this.fromObject;
        this.fromObject = wrapper.fromObject.bind(originalThis);
        originalThis.toObject = this.toObject;
        this.toObject = wrapper.toObject.bind(originalThis);
      }
      return this;
    };
    Type.prototype.encode = function encode_setup(message, writer) {
      return this.setup().encode(message, writer);
    };
    Type.prototype.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
    };
    Type.prototype.decode = function decode_setup(reader, length) {
      return this.setup().decode(reader, length);
    };
    Type.prototype.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof Reader))
        reader = Reader.create(reader);
      return this.decode(reader, reader.uint32());
    };
    Type.prototype.verify = function verify_setup(message) {
      return this.setup().verify(message);
    };
    Type.prototype.fromObject = function fromObject(object) {
      return this.setup().fromObject(object);
    };
    Type.prototype.toObject = function toObject(message, options) {
      return this.setup().toObject(message, options);
    };
    Type.d = function decorateType(typeName) {
      return function typeDecorator(target3) {
        util.decorateType(target3, typeName);
      };
    };
  }
});

// node_modules/protobufjs/src/root.js
var require_root = __commonJS({
  "node_modules/protobufjs/src/root.js"(exports2, module2) {
    "use strict";
    module2.exports = Root;
    var Namespace = require_namespace();
    ((Root.prototype = Object.create(Namespace.prototype)).constructor = Root).className = "Root";
    var Field = require_field();
    var Enum = require_enum();
    var OneOf = require_oneof();
    var util = require_util();
    var Type;
    var parse;
    var common;
    function Root(options) {
      Namespace.call(this, "", options);
      this.deferred = [];
      this.files = [];
    }
    Root.fromJSON = function fromJSON(json, root) {
      if (!root)
        root = new Root();
      if (json.options)
        root.setOptions(json.options);
      return root.addJSON(json.nested);
    };
    Root.prototype.resolvePath = util.path.resolve;
    Root.prototype.fetch = util.fetch;
    function SYNC() {
    }
    Root.prototype.load = function load2(filename, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = void 0;
      }
      var self2 = this;
      if (!callback)
        return util.asPromise(load2, self2, filename, options);
      var sync = callback === SYNC;
      function finish(err, root) {
        if (!callback)
          return;
        if (sync)
          throw err;
        var cb = callback;
        callback = null;
        cb(err, root);
      }
      function getBundledFileName(filename2) {
        var idx = filename2.lastIndexOf("google/protobuf/");
        if (idx > -1) {
          var altname = filename2.substring(idx);
          if (altname in common) return altname;
        }
        return null;
      }
      function process(filename2, source) {
        try {
          if (util.isString(source) && source.charAt(0) === "{")
            source = JSON.parse(source);
          if (!util.isString(source))
            self2.setOptions(source.options).addJSON(source.nested);
          else {
            parse.filename = filename2;
            var parsed = parse(source, self2, options), resolved2, i2 = 0;
            if (parsed.imports) {
              for (; i2 < parsed.imports.length; ++i2)
                if (resolved2 = getBundledFileName(parsed.imports[i2]) || self2.resolvePath(filename2, parsed.imports[i2]))
                  fetch2(resolved2);
            }
            if (parsed.weakImports) {
              for (i2 = 0; i2 < parsed.weakImports.length; ++i2)
                if (resolved2 = getBundledFileName(parsed.weakImports[i2]) || self2.resolvePath(filename2, parsed.weakImports[i2]))
                  fetch2(resolved2, true);
            }
          }
        } catch (err) {
          finish(err);
        }
        if (!sync && !queued)
          finish(null, self2);
      }
      function fetch2(filename2, weak) {
        filename2 = getBundledFileName(filename2) || filename2;
        if (self2.files.indexOf(filename2) > -1)
          return;
        self2.files.push(filename2);
        if (filename2 in common) {
          if (sync)
            process(filename2, common[filename2]);
          else {
            ++queued;
            setTimeout(function() {
              --queued;
              process(filename2, common[filename2]);
            });
          }
          return;
        }
        if (sync) {
          var source;
          try {
            source = util.fs.readFileSync(filename2).toString("utf8");
          } catch (err) {
            if (!weak)
              finish(err);
            return;
          }
          process(filename2, source);
        } else {
          ++queued;
          self2.fetch(filename2, function(err, source2) {
            --queued;
            if (!callback)
              return;
            if (err) {
              if (!weak)
                finish(err);
              else if (!queued)
                finish(null, self2);
              return;
            }
            process(filename2, source2);
          });
        }
      }
      var queued = 0;
      if (util.isString(filename))
        filename = [filename];
      for (var i = 0, resolved; i < filename.length; ++i)
        if (resolved = self2.resolvePath("", filename[i]))
          fetch2(resolved);
      if (sync)
        return self2;
      if (!queued)
        finish(null, self2);
      return void 0;
    };
    Root.prototype.loadSync = function loadSync(filename, options) {
      if (!util.isNode)
        throw Error("not supported");
      return this.load(filename, options, SYNC);
    };
    Root.prototype.resolveAll = function resolveAll() {
      if (this.deferred.length)
        throw Error("unresolvable extensions: " + this.deferred.map(function(field) {
          return "'extend " + field.extend + "' in " + field.parent.fullName;
        }).join(", "));
      return Namespace.prototype.resolveAll.call(this);
    };
    var exposeRe = /^[A-Z]/;
    function tryHandleExtension(root, field) {
      var extendedType = field.parent.lookup(field.extend);
      if (extendedType) {
        var sisterField = new Field(field.fullName, field.id, field.type, field.rule, void 0, field.options);
        if (extendedType.get(sisterField.name)) {
          return true;
        }
        sisterField.declaringField = field;
        field.extensionField = sisterField;
        extendedType.add(sisterField);
        return true;
      }
      return false;
    }
    Root.prototype._handleAdd = function _handleAdd(object) {
      if (object instanceof Field) {
        if (
          /* an extension field (implies not part of a oneof) */
          object.extend !== void 0 && /* not already handled */
          !object.extensionField
        ) {
          if (!tryHandleExtension(this, object))
            this.deferred.push(object);
        }
      } else if (object instanceof Enum) {
        if (exposeRe.test(object.name))
          object.parent[object.name] = object.values;
      } else if (!(object instanceof OneOf)) {
        if (object instanceof Type)
          for (var i = 0; i < this.deferred.length; )
            if (tryHandleExtension(this, this.deferred[i]))
              this.deferred.splice(i, 1);
            else
              ++i;
        for (var j = 0; j < /* initializes */
        object.nestedArray.length; ++j)
          this._handleAdd(object._nestedArray[j]);
        if (exposeRe.test(object.name))
          object.parent[object.name] = object;
      }
    };
    Root.prototype._handleRemove = function _handleRemove(object) {
      if (object instanceof Field) {
        if (
          /* an extension field */
          object.extend !== void 0
        ) {
          if (
            /* already handled */
            object.extensionField
          ) {
            object.extensionField.parent.remove(object.extensionField);
            object.extensionField = null;
          } else {
            var index = this.deferred.indexOf(object);
            if (index > -1)
              this.deferred.splice(index, 1);
          }
        }
      } else if (object instanceof Enum) {
        if (exposeRe.test(object.name))
          delete object.parent[object.name];
      } else if (object instanceof Namespace) {
        for (var i = 0; i < /* initializes */
        object.nestedArray.length; ++i)
          this._handleRemove(object._nestedArray[i]);
        if (exposeRe.test(object.name))
          delete object.parent[object.name];
      }
    };
    Root._configure = function(Type_, parse_, common_) {
      Type = Type_;
      parse = parse_;
      common = common_;
    };
  }
});

// node_modules/protobufjs/src/util.js
var require_util = __commonJS({
  "node_modules/protobufjs/src/util.js"(exports2, module2) {
    "use strict";
    var util = module2.exports = require_minimal();
    var roots = require_roots();
    var Type;
    var Enum;
    util.codegen = require_codegen();
    util.fetch = require_fetch();
    util.path = require_path();
    util.fs = util.inquire("fs");
    util.toArray = function toArray(object) {
      if (object) {
        var keys = Object.keys(object), array = new Array(keys.length), index = 0;
        while (index < keys.length)
          array[index] = object[keys[index++]];
        return array;
      }
      return [];
    };
    util.toObject = function toObject(array) {
      var object = {}, index = 0;
      while (index < array.length) {
        var key = array[index++], val = array[index++];
        if (val !== void 0)
          object[key] = val;
      }
      return object;
    };
    var safePropBackslashRe = /\\/g;
    var safePropQuoteRe = /"/g;
    util.isReserved = function isReserved(name) {
      return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(name);
    };
    util.safeProp = function safeProp(prop) {
      if (!/^[$\w_]+$/.test(prop) || util.isReserved(prop))
        return '["' + prop.replace(safePropBackslashRe, "\\\\").replace(safePropQuoteRe, '\\"') + '"]';
      return "." + prop;
    };
    util.ucFirst = function ucFirst(str) {
      return str.charAt(0).toUpperCase() + str.substring(1);
    };
    var camelCaseRe = /_([a-z])/g;
    util.camelCase = function camelCase(str) {
      return str.substring(0, 1) + str.substring(1).replace(camelCaseRe, function($0, $1) {
        return $1.toUpperCase();
      });
    };
    util.compareFieldsById = function compareFieldsById(a, b) {
      return a.id - b.id;
    };
    util.decorateType = function decorateType(ctor, typeName) {
      if (ctor.$type) {
        if (typeName && ctor.$type.name !== typeName) {
          util.decorateRoot.remove(ctor.$type);
          ctor.$type.name = typeName;
          util.decorateRoot.add(ctor.$type);
        }
        return ctor.$type;
      }
      if (!Type)
        Type = require_type();
      var type = new Type(typeName || ctor.name);
      util.decorateRoot.add(type);
      type.ctor = ctor;
      Object.defineProperty(ctor, "$type", { value: type, enumerable: false });
      Object.defineProperty(ctor.prototype, "$type", { value: type, enumerable: false });
      return type;
    };
    var decorateEnumIndex = 0;
    util.decorateEnum = function decorateEnum(object) {
      if (object.$type)
        return object.$type;
      if (!Enum)
        Enum = require_enum();
      var enm = new Enum("Enum" + decorateEnumIndex++, object);
      util.decorateRoot.add(enm);
      Object.defineProperty(object, "$type", { value: enm, enumerable: false });
      return enm;
    };
    util.setProperty = function setProperty(dst, path, value) {
      function setProp(dst2, path2, value2) {
        var part = path2.shift();
        if (part === "__proto__" || part === "prototype") {
          return dst2;
        }
        if (path2.length > 0) {
          dst2[part] = setProp(dst2[part] || {}, path2, value2);
        } else {
          var prevValue = dst2[part];
          if (prevValue)
            value2 = [].concat(prevValue).concat(value2);
          dst2[part] = value2;
        }
        return dst2;
      }
      if (typeof dst !== "object")
        throw TypeError("dst must be an object");
      if (!path)
        throw TypeError("path must be specified");
      path = path.split(".");
      return setProp(dst, path, value);
    };
    Object.defineProperty(util, "decorateRoot", {
      get: function() {
        return roots["decorated"] || (roots["decorated"] = new (require_root())());
      }
    });
  }
});

// node_modules/protobufjs/src/object.js
var require_object = __commonJS({
  "node_modules/protobufjs/src/object.js"(exports2, module2) {
    "use strict";
    module2.exports = ReflectionObject;
    ReflectionObject.className = "ReflectionObject";
    var util = require_util();
    var Root;
    function ReflectionObject(name, options) {
      if (!util.isString(name))
        throw TypeError("name must be a string");
      if (options && !util.isObject(options))
        throw TypeError("options must be an object");
      this.options = options;
      this.parsedOptions = null;
      this.name = name;
      this.parent = null;
      this.resolved = false;
      this.comment = null;
      this.filename = null;
    }
    Object.defineProperties(ReflectionObject.prototype, {
      /**
       * Reference to the root namespace.
       * @name ReflectionObject#root
       * @type {Root}
       * @readonly
       */
      root: {
        get: function() {
          var ptr = this;
          while (ptr.parent !== null)
            ptr = ptr.parent;
          return ptr;
        }
      },
      /**
       * Full name including leading dot.
       * @name ReflectionObject#fullName
       * @type {string}
       * @readonly
       */
      fullName: {
        get: function() {
          var path = [this.name], ptr = this.parent;
          while (ptr) {
            path.unshift(ptr.name);
            ptr = ptr.parent;
          }
          return path.join(".");
        }
      }
    });
    ReflectionObject.prototype.toJSON = /* istanbul ignore next */
    function toJSON() {
      throw Error();
    };
    ReflectionObject.prototype.onAdd = function onAdd(parent) {
      if (this.parent && this.parent !== parent)
        this.parent.remove(this);
      this.parent = parent;
      this.resolved = false;
      var root = parent.root;
      if (root instanceof Root)
        root._handleAdd(this);
    };
    ReflectionObject.prototype.onRemove = function onRemove(parent) {
      var root = parent.root;
      if (root instanceof Root)
        root._handleRemove(this);
      this.parent = null;
      this.resolved = false;
    };
    ReflectionObject.prototype.resolve = function resolve() {
      if (this.resolved)
        return this;
      if (this.root instanceof Root)
        this.resolved = true;
      return this;
    };
    ReflectionObject.prototype.getOption = function getOption(name) {
      if (this.options)
        return this.options[name];
      return void 0;
    };
    ReflectionObject.prototype.setOption = function setOption(name, value, ifNotSet) {
      if (!ifNotSet || !this.options || this.options[name] === void 0)
        (this.options || (this.options = {}))[name] = value;
      return this;
    };
    ReflectionObject.prototype.setParsedOption = function setParsedOption(name, value, propName) {
      if (!this.parsedOptions) {
        this.parsedOptions = [];
      }
      var parsedOptions = this.parsedOptions;
      if (propName) {
        var opt = parsedOptions.find(function(opt2) {
          return Object.prototype.hasOwnProperty.call(opt2, name);
        });
        if (opt) {
          var newValue = opt[name];
          util.setProperty(newValue, propName, value);
        } else {
          opt = {};
          opt[name] = util.setProperty({}, propName, value);
          parsedOptions.push(opt);
        }
      } else {
        var newOpt = {};
        newOpt[name] = value;
        parsedOptions.push(newOpt);
      }
      return this;
    };
    ReflectionObject.prototype.setOptions = function setOptions(options, ifNotSet) {
      if (options)
        for (var keys = Object.keys(options), i = 0; i < keys.length; ++i)
          this.setOption(keys[i], options[keys[i]], ifNotSet);
      return this;
    };
    ReflectionObject.prototype.toString = function toString() {
      var className = this.constructor.className, fullName = this.fullName;
      if (fullName.length)
        return className + " " + fullName;
      return className;
    };
    ReflectionObject._configure = function(Root_) {
      Root = Root_;
    };
  }
});

// node_modules/protobufjs/src/enum.js
var require_enum = __commonJS({
  "node_modules/protobufjs/src/enum.js"(exports2, module2) {
    "use strict";
    module2.exports = Enum;
    var ReflectionObject = require_object();
    ((Enum.prototype = Object.create(ReflectionObject.prototype)).constructor = Enum).className = "Enum";
    var Namespace = require_namespace();
    var util = require_util();
    function Enum(name, values, options, comment, comments, valuesOptions) {
      ReflectionObject.call(this, name, options);
      if (values && typeof values !== "object")
        throw TypeError("values must be an object");
      this.valuesById = {};
      this.values = Object.create(this.valuesById);
      this.comment = comment;
      this.comments = comments || {};
      this.valuesOptions = valuesOptions;
      this.reserved = void 0;
      if (values) {
        for (var keys = Object.keys(values), i = 0; i < keys.length; ++i)
          if (typeof values[keys[i]] === "number")
            this.valuesById[this.values[keys[i]] = values[keys[i]]] = keys[i];
      }
    }
    Enum.fromJSON = function fromJSON(name, json) {
      var enm = new Enum(name, json.values, json.options, json.comment, json.comments);
      enm.reserved = json.reserved;
      return enm;
    };
    Enum.prototype.toJSON = function toJSON(toJSONOptions) {
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "options",
        this.options,
        "valuesOptions",
        this.valuesOptions,
        "values",
        this.values,
        "reserved",
        this.reserved && this.reserved.length ? this.reserved : void 0,
        "comment",
        keepComments ? this.comment : void 0,
        "comments",
        keepComments ? this.comments : void 0
      ]);
    };
    Enum.prototype.add = function add2(name, id, comment, options) {
      if (!util.isString(name))
        throw TypeError("name must be a string");
      if (!util.isInteger(id))
        throw TypeError("id must be an integer");
      if (this.values[name] !== void 0)
        throw Error("duplicate name '" + name + "' in " + this);
      if (this.isReservedId(id))
        throw Error("id " + id + " is reserved in " + this);
      if (this.isReservedName(name))
        throw Error("name '" + name + "' is reserved in " + this);
      if (this.valuesById[id] !== void 0) {
        if (!(this.options && this.options.allow_alias))
          throw Error("duplicate id " + id + " in " + this);
        this.values[name] = id;
      } else
        this.valuesById[this.values[name] = id] = name;
      if (options) {
        if (this.valuesOptions === void 0)
          this.valuesOptions = {};
        this.valuesOptions[name] = options || null;
      }
      this.comments[name] = comment || null;
      return this;
    };
    Enum.prototype.remove = function remove(name) {
      if (!util.isString(name))
        throw TypeError("name must be a string");
      var val = this.values[name];
      if (val == null)
        throw Error("name '" + name + "' does not exist in " + this);
      delete this.valuesById[val];
      delete this.values[name];
      delete this.comments[name];
      if (this.valuesOptions)
        delete this.valuesOptions[name];
      return this;
    };
    Enum.prototype.isReservedId = function isReservedId(id) {
      return Namespace.isReservedId(this.reserved, id);
    };
    Enum.prototype.isReservedName = function isReservedName(name) {
      return Namespace.isReservedName(this.reserved, name);
    };
  }
});

// node_modules/protobufjs/src/encoder.js
var require_encoder = __commonJS({
  "node_modules/protobufjs/src/encoder.js"(exports2, module2) {
    "use strict";
    module2.exports = encoder;
    var Enum = require_enum();
    var types = require_types();
    var util = require_util();
    function genTypePartial(gen, field, fieldIndex, ref) {
      return field.resolvedType.group ? gen("types[%i].encode(%s,w.uint32(%i)).uint32(%i)", fieldIndex, ref, (field.id << 3 | 3) >>> 0, (field.id << 3 | 4) >>> 0) : gen("types[%i].encode(%s,w.uint32(%i).fork()).ldelim()", fieldIndex, ref, (field.id << 3 | 2) >>> 0);
    }
    function encoder(mtype) {
      var gen = util.codegen(["m", "w"], mtype.name + "$encode")("if(!w)")("w=Writer.create()");
      var i, ref;
      var fields = (
        /* initializes */
        mtype.fieldsArray.slice().sort(util.compareFieldsById)
      );
      for (var i = 0; i < fields.length; ++i) {
        var field = fields[i].resolve(), index = mtype._fieldsArray.indexOf(field), type = field.resolvedType instanceof Enum ? "int32" : field.type, wireType = types.basic[type];
        ref = "m" + util.safeProp(field.name);
        if (field.map) {
          gen("if(%s!=null&&Object.hasOwnProperty.call(m,%j)){", ref, field.name)("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){", ref)("w.uint32(%i).fork().uint32(%i).%s(ks[i])", (field.id << 3 | 2) >>> 0, 8 | types.mapKey[field.keyType], field.keyType);
          if (wireType === void 0) gen("types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()", index, ref);
          else gen(".uint32(%i).%s(%s[ks[i]]).ldelim()", 16 | wireType, type, ref);
          gen("}")("}");
        } else if (field.repeated) {
          gen("if(%s!=null&&%s.length){", ref, ref);
          if (field.packed && types.packed[type] !== void 0) {
            gen("w.uint32(%i).fork()", (field.id << 3 | 2) >>> 0)("for(var i=0;i<%s.length;++i)", ref)("w.%s(%s[i])", type, ref)("w.ldelim()");
          } else {
            gen("for(var i=0;i<%s.length;++i)", ref);
            if (wireType === void 0)
              genTypePartial(gen, field, index, ref + "[i]");
            else gen("w.uint32(%i).%s(%s[i])", (field.id << 3 | wireType) >>> 0, type, ref);
          }
          gen("}");
        } else {
          if (field.optional) gen("if(%s!=null&&Object.hasOwnProperty.call(m,%j))", ref, field.name);
          if (wireType === void 0)
            genTypePartial(gen, field, index, ref);
          else gen("w.uint32(%i).%s(%s)", (field.id << 3 | wireType) >>> 0, type, ref);
        }
      }
      return gen("return w");
    }
  }
});

// node_modules/protobufjs/src/index-light.js
var require_index_light = __commonJS({
  "node_modules/protobufjs/src/index-light.js"(exports2, module2) {
    "use strict";
    var protobuf = module2.exports = require_index_minimal();
    protobuf.build = "light";
    function load2(filename, root, callback) {
      if (typeof root === "function") {
        callback = root;
        root = new protobuf.Root();
      } else if (!root)
        root = new protobuf.Root();
      return root.load(filename, callback);
    }
    protobuf.load = load2;
    function loadSync(filename, root) {
      if (!root)
        root = new protobuf.Root();
      return root.loadSync(filename);
    }
    protobuf.loadSync = loadSync;
    protobuf.encoder = require_encoder();
    protobuf.decoder = require_decoder();
    protobuf.verifier = require_verifier();
    protobuf.converter = require_converter();
    protobuf.ReflectionObject = require_object();
    protobuf.Namespace = require_namespace();
    protobuf.Root = require_root();
    protobuf.Enum = require_enum();
    protobuf.Type = require_type();
    protobuf.Field = require_field();
    protobuf.OneOf = require_oneof();
    protobuf.MapField = require_mapfield();
    protobuf.Service = require_service2();
    protobuf.Method = require_method();
    protobuf.Message = require_message();
    protobuf.wrappers = require_wrappers();
    protobuf.types = require_types();
    protobuf.util = require_util();
    protobuf.ReflectionObject._configure(protobuf.Root);
    protobuf.Namespace._configure(protobuf.Type, protobuf.Service, protobuf.Enum);
    protobuf.Root._configure(protobuf.Type);
    protobuf.Field._configure(protobuf.Type);
  }
});

// node_modules/protobufjs/src/tokenize.js
var require_tokenize = __commonJS({
  "node_modules/protobufjs/src/tokenize.js"(exports2, module2) {
    "use strict";
    module2.exports = tokenize;
    var delimRe = /[\s{}=;:[\],'"()<>]/g;
    var stringDoubleRe = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g;
    var stringSingleRe = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g;
    var setCommentRe = /^ *[*/]+ */;
    var setCommentAltRe = /^\s*\*?\/*/;
    var setCommentSplitRe = /\n/g;
    var whitespaceRe = /\s/;
    var unescapeRe = /\\(.?)/g;
    var unescapeMap = {
      "0": "\0",
      "r": "\r",
      "n": "\n",
      "t": "	"
    };
    function unescape(str) {
      return str.replace(unescapeRe, function($0, $1) {
        switch ($1) {
          case "\\":
          case "":
            return $1;
          default:
            return unescapeMap[$1] || "";
        }
      });
    }
    tokenize.unescape = unescape;
    function tokenize(source, alternateCommentMode) {
      source = source.toString();
      var offset = 0, length = source.length, line = 1, lastCommentLine = 0, comments = {};
      var stack = [];
      var stringDelim = null;
      function illegal(subject) {
        return Error("illegal " + subject + " (line " + line + ")");
      }
      function readString() {
        var re = stringDelim === "'" ? stringSingleRe : stringDoubleRe;
        re.lastIndex = offset - 1;
        var match = re.exec(source);
        if (!match)
          throw illegal("string");
        offset = re.lastIndex;
        push(stringDelim);
        stringDelim = null;
        return unescape(match[1]);
      }
      function charAt(pos) {
        return source.charAt(pos);
      }
      function setComment(start, end, isLeading) {
        var comment = {
          type: source.charAt(start++),
          lineEmpty: false,
          leading: isLeading
        };
        var lookback;
        if (alternateCommentMode) {
          lookback = 2;
        } else {
          lookback = 3;
        }
        var commentOffset = start - lookback, c;
        do {
          if (--commentOffset < 0 || (c = source.charAt(commentOffset)) === "\n") {
            comment.lineEmpty = true;
            break;
          }
        } while (c === " " || c === "	");
        var lines = source.substring(start, end).split(setCommentSplitRe);
        for (var i = 0; i < lines.length; ++i)
          lines[i] = lines[i].replace(alternateCommentMode ? setCommentAltRe : setCommentRe, "").trim();
        comment.text = lines.join("\n").trim();
        comments[line] = comment;
        lastCommentLine = line;
      }
      function isDoubleSlashCommentLine(startOffset) {
        var endOffset = findEndOfLine(startOffset);
        var lineText = source.substring(startOffset, endOffset);
        var isComment = /^\s*\/\//.test(lineText);
        return isComment;
      }
      function findEndOfLine(cursor) {
        var endOffset = cursor;
        while (endOffset < length && charAt(endOffset) !== "\n") {
          endOffset++;
        }
        return endOffset;
      }
      function next() {
        if (stack.length > 0)
          return stack.shift();
        if (stringDelim)
          return readString();
        var repeat2, prev, curr, start, isDoc, isLeadingComment = offset === 0;
        do {
          if (offset === length)
            return null;
          repeat2 = false;
          while (whitespaceRe.test(curr = charAt(offset))) {
            if (curr === "\n") {
              isLeadingComment = true;
              ++line;
            }
            if (++offset === length)
              return null;
          }
          if (charAt(offset) === "/") {
            if (++offset === length) {
              throw illegal("comment");
            }
            if (charAt(offset) === "/") {
              if (!alternateCommentMode) {
                isDoc = charAt(start = offset + 1) === "/";
                while (charAt(++offset) !== "\n") {
                  if (offset === length) {
                    return null;
                  }
                }
                ++offset;
                if (isDoc) {
                  setComment(start, offset - 1, isLeadingComment);
                  isLeadingComment = true;
                }
                ++line;
                repeat2 = true;
              } else {
                start = offset;
                isDoc = false;
                if (isDoubleSlashCommentLine(offset - 1)) {
                  isDoc = true;
                  do {
                    offset = findEndOfLine(offset);
                    if (offset === length) {
                      break;
                    }
                    offset++;
                    if (!isLeadingComment) {
                      break;
                    }
                  } while (isDoubleSlashCommentLine(offset));
                } else {
                  offset = Math.min(length, findEndOfLine(offset) + 1);
                }
                if (isDoc) {
                  setComment(start, offset, isLeadingComment);
                  isLeadingComment = true;
                }
                line++;
                repeat2 = true;
              }
            } else if ((curr = charAt(offset)) === "*") {
              start = offset + 1;
              isDoc = alternateCommentMode || charAt(start) === "*";
              do {
                if (curr === "\n") {
                  ++line;
                }
                if (++offset === length) {
                  throw illegal("comment");
                }
                prev = curr;
                curr = charAt(offset);
              } while (prev !== "*" || curr !== "/");
              ++offset;
              if (isDoc) {
                setComment(start, offset - 2, isLeadingComment);
                isLeadingComment = true;
              }
              repeat2 = true;
            } else {
              return "/";
            }
          }
        } while (repeat2);
        var end = offset;
        delimRe.lastIndex = 0;
        var delim = delimRe.test(charAt(end++));
        if (!delim)
          while (end < length && !delimRe.test(charAt(end)))
            ++end;
        var token = source.substring(offset, offset = end);
        if (token === '"' || token === "'")
          stringDelim = token;
        return token;
      }
      function push(token) {
        stack.push(token);
      }
      function peek() {
        if (!stack.length) {
          var token = next();
          if (token === null)
            return null;
          push(token);
        }
        return stack[0];
      }
      function skip(expected, optional) {
        var actual = peek(), equals = actual === expected;
        if (equals) {
          next();
          return true;
        }
        if (!optional)
          throw illegal("token '" + actual + "', '" + expected + "' expected");
        return false;
      }
      function cmnt(trailingLine) {
        var ret = null;
        var comment;
        if (trailingLine === void 0) {
          comment = comments[line - 1];
          delete comments[line - 1];
          if (comment && (alternateCommentMode || comment.type === "*" || comment.lineEmpty)) {
            ret = comment.leading ? comment.text : null;
          }
        } else {
          if (lastCommentLine < trailingLine) {
            peek();
          }
          comment = comments[trailingLine];
          delete comments[trailingLine];
          if (comment && !comment.lineEmpty && (alternateCommentMode || comment.type === "/")) {
            ret = comment.leading ? null : comment.text;
          }
        }
        return ret;
      }
      return Object.defineProperty({
        next,
        peek,
        push,
        skip,
        cmnt
      }, "line", {
        get: function() {
          return line;
        }
      });
    }
  }
});

// node_modules/protobufjs/src/parse.js
var require_parse = __commonJS({
  "node_modules/protobufjs/src/parse.js"(exports2, module2) {
    "use strict";
    module2.exports = parse;
    parse.filename = null;
    parse.defaults = { keepCase: false };
    var tokenize = require_tokenize();
    var Root = require_root();
    var Type = require_type();
    var Field = require_field();
    var MapField = require_mapfield();
    var OneOf = require_oneof();
    var Enum = require_enum();
    var Service = require_service2();
    var Method = require_method();
    var types = require_types();
    var util = require_util();
    var base10Re = /^[1-9][0-9]*$/;
    var base10NegRe = /^-?[1-9][0-9]*$/;
    var base16Re = /^0[x][0-9a-fA-F]+$/;
    var base16NegRe = /^-?0[x][0-9a-fA-F]+$/;
    var base8Re = /^0[0-7]+$/;
    var base8NegRe = /^-?0[0-7]+$/;
    var numberRe = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/;
    var nameRe = /^[a-zA-Z_][a-zA-Z_0-9]*$/;
    var typeRefRe = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*$/;
    var fqTypeRefRe = /^(?:\.[a-zA-Z_][a-zA-Z_0-9]*)+$/;
    function parse(source, root, options) {
      if (!(root instanceof Root)) {
        options = root;
        root = new Root();
      }
      if (!options)
        options = parse.defaults;
      var preferTrailingComment = options.preferTrailingComment || false;
      var tn = tokenize(source, options.alternateCommentMode || false), next = tn.next, push = tn.push, peek = tn.peek, skip = tn.skip, cmnt = tn.cmnt;
      var head = true, pkg, imports, weakImports, syntax, isProto3 = false;
      var ptr = root;
      var applyCase = options.keepCase ? function(name) {
        return name;
      } : util.camelCase;
      function illegal(token2, name, insideTryCatch) {
        var filename = parse.filename;
        if (!insideTryCatch)
          parse.filename = null;
        return Error("illegal " + (name || "token") + " '" + token2 + "' (" + (filename ? filename + ", " : "") + "line " + tn.line + ")");
      }
      function readString() {
        var values = [], token2;
        do {
          if ((token2 = next()) !== '"' && token2 !== "'")
            throw illegal(token2);
          values.push(next());
          skip(token2);
          token2 = peek();
        } while (token2 === '"' || token2 === "'");
        return values.join("");
      }
      function readValue(acceptTypeRef) {
        var token2 = next();
        switch (token2) {
          case "'":
          case '"':
            push(token2);
            return readString();
          case "true":
          case "TRUE":
            return true;
          case "false":
          case "FALSE":
            return false;
        }
        try {
          return parseNumber(
            token2,
            /* insideTryCatch */
            true
          );
        } catch (e) {
          if (acceptTypeRef && typeRefRe.test(token2))
            return token2;
          throw illegal(token2, "value");
        }
      }
      function readRanges(target3, acceptStrings) {
        var token2, start;
        do {
          if (acceptStrings && ((token2 = peek()) === '"' || token2 === "'"))
            target3.push(readString());
          else
            target3.push([start = parseId(next()), skip("to", true) ? parseId(next()) : start]);
        } while (skip(",", true));
        var dummy = { options: void 0 };
        dummy.setOption = function(name, value) {
          if (this.options === void 0) this.options = {};
          this.options[name] = value;
        };
        ifBlock(
          dummy,
          function parseRange_block(token3) {
            if (token3 === "option") {
              parseOption(dummy, token3);
              skip(";");
            } else
              throw illegal(token3);
          },
          function parseRange_line() {
            parseInlineOptions(dummy);
          }
        );
      }
      function parseNumber(token2, insideTryCatch) {
        var sign = 1;
        if (token2.charAt(0) === "-") {
          sign = -1;
          token2 = token2.substring(1);
        }
        switch (token2) {
          case "inf":
          case "INF":
          case "Inf":
            return sign * Infinity;
          case "nan":
          case "NAN":
          case "Nan":
          case "NaN":
            return NaN;
          case "0":
            return 0;
        }
        if (base10Re.test(token2))
          return sign * parseInt(token2, 10);
        if (base16Re.test(token2))
          return sign * parseInt(token2, 16);
        if (base8Re.test(token2))
          return sign * parseInt(token2, 8);
        if (numberRe.test(token2))
          return sign * parseFloat(token2);
        throw illegal(token2, "number", insideTryCatch);
      }
      function parseId(token2, acceptNegative) {
        switch (token2) {
          case "max":
          case "MAX":
          case "Max":
            return 536870911;
          case "0":
            return 0;
        }
        if (!acceptNegative && token2.charAt(0) === "-")
          throw illegal(token2, "id");
        if (base10NegRe.test(token2))
          return parseInt(token2, 10);
        if (base16NegRe.test(token2))
          return parseInt(token2, 16);
        if (base8NegRe.test(token2))
          return parseInt(token2, 8);
        throw illegal(token2, "id");
      }
      function parsePackage() {
        if (pkg !== void 0)
          throw illegal("package");
        pkg = next();
        if (!typeRefRe.test(pkg))
          throw illegal(pkg, "name");
        ptr = ptr.define(pkg);
        skip(";");
      }
      function parseImport() {
        var token2 = peek();
        var whichImports;
        switch (token2) {
          case "weak":
            whichImports = weakImports || (weakImports = []);
            next();
            break;
          case "public":
            next();
          // eslint-disable-next-line no-fallthrough
          default:
            whichImports = imports || (imports = []);
            break;
        }
        token2 = readString();
        skip(";");
        whichImports.push(token2);
      }
      function parseSyntax() {
        skip("=");
        syntax = readString();
        isProto3 = syntax === "proto3";
        if (!isProto3 && syntax !== "proto2")
          throw illegal(syntax, "syntax");
        root.setOption("syntax", syntax);
        skip(";");
      }
      function parseCommon(parent, token2) {
        switch (token2) {
          case "option":
            parseOption(parent, token2);
            skip(";");
            return true;
          case "message":
            parseType(parent, token2);
            return true;
          case "enum":
            parseEnum(parent, token2);
            return true;
          case "service":
            parseService(parent, token2);
            return true;
          case "extend":
            parseExtension(parent, token2);
            return true;
        }
        return false;
      }
      function ifBlock(obj, fnIf, fnElse) {
        var trailingLine = tn.line;
        if (obj) {
          if (typeof obj.comment !== "string") {
            obj.comment = cmnt();
          }
          obj.filename = parse.filename;
        }
        if (skip("{", true)) {
          var token2;
          while ((token2 = next()) !== "}")
            fnIf(token2);
          skip(";", true);
        } else {
          if (fnElse)
            fnElse();
          skip(";");
          if (obj && (typeof obj.comment !== "string" || preferTrailingComment))
            obj.comment = cmnt(trailingLine) || obj.comment;
        }
      }
      function parseType(parent, token2) {
        if (!nameRe.test(token2 = next()))
          throw illegal(token2, "type name");
        var type = new Type(token2);
        ifBlock(type, function parseType_block(token3) {
          if (parseCommon(type, token3))
            return;
          switch (token3) {
            case "map":
              parseMapField(type, token3);
              break;
            case "required":
            case "repeated":
              parseField(type, token3);
              break;
            case "optional":
              if (isProto3) {
                parseField(type, "proto3_optional");
              } else {
                parseField(type, "optional");
              }
              break;
            case "oneof":
              parseOneOf(type, token3);
              break;
            case "extensions":
              readRanges(type.extensions || (type.extensions = []));
              break;
            case "reserved":
              readRanges(type.reserved || (type.reserved = []), true);
              break;
            default:
              if (!isProto3 || !typeRefRe.test(token3))
                throw illegal(token3);
              push(token3);
              parseField(type, "optional");
              break;
          }
        });
        parent.add(type);
      }
      function parseField(parent, rule, extend) {
        var type = next();
        if (type === "group") {
          parseGroup(parent, rule);
          return;
        }
        while (type.endsWith(".") || peek().startsWith(".")) {
          type += next();
        }
        if (!typeRefRe.test(type))
          throw illegal(type, "type");
        var name = next();
        if (!nameRe.test(name))
          throw illegal(name, "name");
        name = applyCase(name);
        skip("=");
        var field = new Field(name, parseId(next()), type, rule, extend);
        ifBlock(field, function parseField_block(token2) {
          if (token2 === "option") {
            parseOption(field, token2);
            skip(";");
          } else
            throw illegal(token2);
        }, function parseField_line() {
          parseInlineOptions(field);
        });
        if (rule === "proto3_optional") {
          var oneof = new OneOf("_" + name);
          field.setOption("proto3_optional", true);
          oneof.add(field);
          parent.add(oneof);
        } else {
          parent.add(field);
        }
        if (!isProto3 && field.repeated && (types.packed[type] !== void 0 || types.basic[type] === void 0))
          field.setOption(
            "packed",
            false,
            /* ifNotSet */
            true
          );
      }
      function parseGroup(parent, rule) {
        var name = next();
        if (!nameRe.test(name))
          throw illegal(name, "name");
        var fieldName = util.lcFirst(name);
        if (name === fieldName)
          name = util.ucFirst(name);
        skip("=");
        var id = parseId(next());
        var type = new Type(name);
        type.group = true;
        var field = new Field(fieldName, id, name, rule);
        field.filename = parse.filename;
        ifBlock(type, function parseGroup_block(token2) {
          switch (token2) {
            case "option":
              parseOption(type, token2);
              skip(";");
              break;
            case "required":
            case "repeated":
              parseField(type, token2);
              break;
            case "optional":
              if (isProto3) {
                parseField(type, "proto3_optional");
              } else {
                parseField(type, "optional");
              }
              break;
            case "message":
              parseType(type, token2);
              break;
            case "enum":
              parseEnum(type, token2);
              break;
            /* istanbul ignore next */
            default:
              throw illegal(token2);
          }
        });
        parent.add(type).add(field);
      }
      function parseMapField(parent) {
        skip("<");
        var keyType = next();
        if (types.mapKey[keyType] === void 0)
          throw illegal(keyType, "type");
        skip(",");
        var valueType = next();
        if (!typeRefRe.test(valueType))
          throw illegal(valueType, "type");
        skip(">");
        var name = next();
        if (!nameRe.test(name))
          throw illegal(name, "name");
        skip("=");
        var field = new MapField(applyCase(name), parseId(next()), keyType, valueType);
        ifBlock(field, function parseMapField_block(token2) {
          if (token2 === "option") {
            parseOption(field, token2);
            skip(";");
          } else
            throw illegal(token2);
        }, function parseMapField_line() {
          parseInlineOptions(field);
        });
        parent.add(field);
      }
      function parseOneOf(parent, token2) {
        if (!nameRe.test(token2 = next()))
          throw illegal(token2, "name");
        var oneof = new OneOf(applyCase(token2));
        ifBlock(oneof, function parseOneOf_block(token3) {
          if (token3 === "option") {
            parseOption(oneof, token3);
            skip(";");
          } else {
            push(token3);
            parseField(oneof, "optional");
          }
        });
        parent.add(oneof);
      }
      function parseEnum(parent, token2) {
        if (!nameRe.test(token2 = next()))
          throw illegal(token2, "name");
        var enm = new Enum(token2);
        ifBlock(enm, function parseEnum_block(token3) {
          switch (token3) {
            case "option":
              parseOption(enm, token3);
              skip(";");
              break;
            case "reserved":
              readRanges(enm.reserved || (enm.reserved = []), true);
              break;
            default:
              parseEnumValue(enm, token3);
          }
        });
        parent.add(enm);
      }
      function parseEnumValue(parent, token2) {
        if (!nameRe.test(token2))
          throw illegal(token2, "name");
        skip("=");
        var value = parseId(next(), true), dummy = {
          options: void 0
        };
        dummy.setOption = function(name, value2) {
          if (this.options === void 0)
            this.options = {};
          this.options[name] = value2;
        };
        ifBlock(dummy, function parseEnumValue_block(token3) {
          if (token3 === "option") {
            parseOption(dummy, token3);
            skip(";");
          } else
            throw illegal(token3);
        }, function parseEnumValue_line() {
          parseInlineOptions(dummy);
        });
        parent.add(token2, value, dummy.comment, dummy.options);
      }
      function parseOption(parent, token2) {
        var isCustom = skip("(", true);
        if (!typeRefRe.test(token2 = next()))
          throw illegal(token2, "name");
        var name = token2;
        var option = name;
        var propName;
        if (isCustom) {
          skip(")");
          name = "(" + name + ")";
          option = name;
          token2 = peek();
          if (fqTypeRefRe.test(token2)) {
            propName = token2.slice(1);
            name += token2;
            next();
          }
        }
        skip("=");
        var optionValue = parseOptionValue(parent, name);
        setParsedOption(parent, option, optionValue, propName);
      }
      function parseOptionValue(parent, name) {
        if (skip("{", true)) {
          var objectResult = {};
          while (!skip("}", true)) {
            if (!nameRe.test(token = next())) {
              throw illegal(token, "name");
            }
            if (token === null) {
              throw illegal(token, "end of input");
            }
            var value;
            var propName = token;
            skip(":", true);
            if (peek() === "{")
              value = parseOptionValue(parent, name + "." + token);
            else if (peek() === "[") {
              value = [];
              var lastValue;
              if (skip("[", true)) {
                do {
                  lastValue = readValue(true);
                  value.push(lastValue);
                } while (skip(",", true));
                skip("]");
                if (typeof lastValue !== "undefined") {
                  setOption(parent, name + "." + token, lastValue);
                }
              }
            } else {
              value = readValue(true);
              setOption(parent, name + "." + token, value);
            }
            var prevValue = objectResult[propName];
            if (prevValue)
              value = [].concat(prevValue).concat(value);
            objectResult[propName] = value;
            skip(",", true);
            skip(";", true);
          }
          return objectResult;
        }
        var simpleValue = readValue(true);
        setOption(parent, name, simpleValue);
        return simpleValue;
      }
      function setOption(parent, name, value) {
        if (parent.setOption)
          parent.setOption(name, value);
      }
      function setParsedOption(parent, name, value, propName) {
        if (parent.setParsedOption)
          parent.setParsedOption(name, value, propName);
      }
      function parseInlineOptions(parent) {
        if (skip("[", true)) {
          do {
            parseOption(parent, "option");
          } while (skip(",", true));
          skip("]");
        }
        return parent;
      }
      function parseService(parent, token2) {
        if (!nameRe.test(token2 = next()))
          throw illegal(token2, "service name");
        var service = new Service(token2);
        ifBlock(service, function parseService_block(token3) {
          if (parseCommon(service, token3))
            return;
          if (token3 === "rpc")
            parseMethod(service, token3);
          else
            throw illegal(token3);
        });
        parent.add(service);
      }
      function parseMethod(parent, token2) {
        var commentText = cmnt();
        var type = token2;
        if (!nameRe.test(token2 = next()))
          throw illegal(token2, "name");
        var name = token2, requestType, requestStream, responseType, responseStream;
        skip("(");
        if (skip("stream", true))
          requestStream = true;
        if (!typeRefRe.test(token2 = next()))
          throw illegal(token2);
        requestType = token2;
        skip(")");
        skip("returns");
        skip("(");
        if (skip("stream", true))
          responseStream = true;
        if (!typeRefRe.test(token2 = next()))
          throw illegal(token2);
        responseType = token2;
        skip(")");
        var method = new Method(name, type, requestType, responseType, requestStream, responseStream);
        method.comment = commentText;
        ifBlock(method, function parseMethod_block(token3) {
          if (token3 === "option") {
            parseOption(method, token3);
            skip(";");
          } else
            throw illegal(token3);
        });
        parent.add(method);
      }
      function parseExtension(parent, token2) {
        if (!typeRefRe.test(token2 = next()))
          throw illegal(token2, "reference");
        var reference = token2;
        ifBlock(null, function parseExtension_block(token3) {
          switch (token3) {
            case "required":
            case "repeated":
              parseField(parent, token3, reference);
              break;
            case "optional":
              if (isProto3) {
                parseField(parent, "proto3_optional", reference);
              } else {
                parseField(parent, "optional", reference);
              }
              break;
            default:
              if (!isProto3 || !typeRefRe.test(token3))
                throw illegal(token3);
              push(token3);
              parseField(parent, "optional", reference);
              break;
          }
        });
      }
      var token;
      while ((token = next()) !== null) {
        switch (token) {
          case "package":
            if (!head)
              throw illegal(token);
            parsePackage();
            break;
          case "import":
            if (!head)
              throw illegal(token);
            parseImport();
            break;
          case "syntax":
            if (!head)
              throw illegal(token);
            parseSyntax();
            break;
          case "option":
            parseOption(ptr, token);
            skip(";");
            break;
          default:
            if (parseCommon(ptr, token)) {
              head = false;
              continue;
            }
            throw illegal(token);
        }
      }
      parse.filename = null;
      return {
        "package": pkg,
        "imports": imports,
        weakImports,
        syntax,
        root
      };
    }
  }
});

// node_modules/protobufjs/src/common.js
var require_common = __commonJS({
  "node_modules/protobufjs/src/common.js"(exports2, module2) {
    "use strict";
    module2.exports = common;
    var commonRe = /\/|\./;
    function common(name, json) {
      if (!commonRe.test(name)) {
        name = "google/protobuf/" + name + ".proto";
        json = { nested: { google: { nested: { protobuf: { nested: json } } } } };
      }
      common[name] = json;
    }
    common("any", {
      /**
       * Properties of a google.protobuf.Any message.
       * @interface IAny
       * @type {Object}
       * @property {string} [typeUrl]
       * @property {Uint8Array} [bytes]
       * @memberof common
       */
      Any: {
        fields: {
          type_url: {
            type: "string",
            id: 1
          },
          value: {
            type: "bytes",
            id: 2
          }
        }
      }
    });
    var timeType;
    common("duration", {
      /**
       * Properties of a google.protobuf.Duration message.
       * @interface IDuration
       * @type {Object}
       * @property {number|Long} [seconds]
       * @property {number} [nanos]
       * @memberof common
       */
      Duration: timeType = {
        fields: {
          seconds: {
            type: "int64",
            id: 1
          },
          nanos: {
            type: "int32",
            id: 2
          }
        }
      }
    });
    common("timestamp", {
      /**
       * Properties of a google.protobuf.Timestamp message.
       * @interface ITimestamp
       * @type {Object}
       * @property {number|Long} [seconds]
       * @property {number} [nanos]
       * @memberof common
       */
      Timestamp: timeType
    });
    common("empty", {
      /**
       * Properties of a google.protobuf.Empty message.
       * @interface IEmpty
       * @memberof common
       */
      Empty: {
        fields: {}
      }
    });
    common("struct", {
      /**
       * Properties of a google.protobuf.Struct message.
       * @interface IStruct
       * @type {Object}
       * @property {Object.<string,IValue>} [fields]
       * @memberof common
       */
      Struct: {
        fields: {
          fields: {
            keyType: "string",
            type: "Value",
            id: 1
          }
        }
      },
      /**
       * Properties of a google.protobuf.Value message.
       * @interface IValue
       * @type {Object}
       * @property {string} [kind]
       * @property {0} [nullValue]
       * @property {number} [numberValue]
       * @property {string} [stringValue]
       * @property {boolean} [boolValue]
       * @property {IStruct} [structValue]
       * @property {IListValue} [listValue]
       * @memberof common
       */
      Value: {
        oneofs: {
          kind: {
            oneof: [
              "nullValue",
              "numberValue",
              "stringValue",
              "boolValue",
              "structValue",
              "listValue"
            ]
          }
        },
        fields: {
          nullValue: {
            type: "NullValue",
            id: 1
          },
          numberValue: {
            type: "double",
            id: 2
          },
          stringValue: {
            type: "string",
            id: 3
          },
          boolValue: {
            type: "bool",
            id: 4
          },
          structValue: {
            type: "Struct",
            id: 5
          },
          listValue: {
            type: "ListValue",
            id: 6
          }
        }
      },
      NullValue: {
        values: {
          NULL_VALUE: 0
        }
      },
      /**
       * Properties of a google.protobuf.ListValue message.
       * @interface IListValue
       * @type {Object}
       * @property {Array.<IValue>} [values]
       * @memberof common
       */
      ListValue: {
        fields: {
          values: {
            rule: "repeated",
            type: "Value",
            id: 1
          }
        }
      }
    });
    common("wrappers", {
      /**
       * Properties of a google.protobuf.DoubleValue message.
       * @interface IDoubleValue
       * @type {Object}
       * @property {number} [value]
       * @memberof common
       */
      DoubleValue: {
        fields: {
          value: {
            type: "double",
            id: 1
          }
        }
      },
      /**
       * Properties of a google.protobuf.FloatValue message.
       * @interface IFloatValue
       * @type {Object}
       * @property {number} [value]
       * @memberof common
       */
      FloatValue: {
        fields: {
          value: {
            type: "float",
            id: 1
          }
        }
      },
      /**
       * Properties of a google.protobuf.Int64Value message.
       * @interface IInt64Value
       * @type {Object}
       * @property {number|Long} [value]
       * @memberof common
       */
      Int64Value: {
        fields: {
          value: {
            type: "int64",
            id: 1
          }
        }
      },
      /**
       * Properties of a google.protobuf.UInt64Value message.
       * @interface IUInt64Value
       * @type {Object}
       * @property {number|Long} [value]
       * @memberof common
       */
      UInt64Value: {
        fields: {
          value: {
            type: "uint64",
            id: 1
          }
        }
      },
      /**
       * Properties of a google.protobuf.Int32Value message.
       * @interface IInt32Value
       * @type {Object}
       * @property {number} [value]
       * @memberof common
       */
      Int32Value: {
        fields: {
          value: {
            type: "int32",
            id: 1
          }
        }
      },
      /**
       * Properties of a google.protobuf.UInt32Value message.
       * @interface IUInt32Value
       * @type {Object}
       * @property {number} [value]
       * @memberof common
       */
      UInt32Value: {
        fields: {
          value: {
            type: "uint32",
            id: 1
          }
        }
      },
      /**
       * Properties of a google.protobuf.BoolValue message.
       * @interface IBoolValue
       * @type {Object}
       * @property {boolean} [value]
       * @memberof common
       */
      BoolValue: {
        fields: {
          value: {
            type: "bool",
            id: 1
          }
        }
      },
      /**
       * Properties of a google.protobuf.StringValue message.
       * @interface IStringValue
       * @type {Object}
       * @property {string} [value]
       * @memberof common
       */
      StringValue: {
        fields: {
          value: {
            type: "string",
            id: 1
          }
        }
      },
      /**
       * Properties of a google.protobuf.BytesValue message.
       * @interface IBytesValue
       * @type {Object}
       * @property {Uint8Array} [value]
       * @memberof common
       */
      BytesValue: {
        fields: {
          value: {
            type: "bytes",
            id: 1
          }
        }
      }
    });
    common("field_mask", {
      /**
       * Properties of a google.protobuf.FieldMask message.
       * @interface IDoubleValue
       * @type {Object}
       * @property {number} [value]
       * @memberof common
       */
      FieldMask: {
        fields: {
          paths: {
            rule: "repeated",
            type: "string",
            id: 1
          }
        }
      }
    });
    common.get = function get(file) {
      return common[file] || null;
    };
  }
});

// node_modules/protobufjs/src/index.js
var require_src = __commonJS({
  "node_modules/protobufjs/src/index.js"(exports2, module2) {
    "use strict";
    var protobuf = module2.exports = require_index_light();
    protobuf.build = "full";
    protobuf.tokenize = require_tokenize();
    protobuf.parse = require_parse();
    protobuf.common = require_common();
    protobuf.Root._configure(protobuf.Type, protobuf.parse, protobuf.common);
  }
});

// node_modules/protobufjs/index.js
var require_protobufjs = __commonJS({
  "node_modules/protobufjs/index.js"(exports2, module2) {
    "use strict";
    module2.exports = require_src();
  }
});

// code.ts
var protobufjs = __toESM(require_protobufjs(), 1);

// node_modules/msgpackr/unpack.js
var decoder;
try {
  decoder = new TextDecoder();
} catch (error) {
}
var src;
var srcEnd;
var position = 0;
var EMPTY_ARRAY = [];
var strings = EMPTY_ARRAY;
var stringPosition = 0;
var currentUnpackr = {};
var currentStructures;
var srcString;
var srcStringStart = 0;
var srcStringEnd = 0;
var bundledStrings;
var referenceMap;
var currentExtensions = [];
var dataView;
var defaultOptions = {
  useRecords: false,
  mapsAsObjects: true
};
var C1Type = class {
};
var C1 = new C1Type();
C1.name = "MessagePack 0xC1";
var sequentialMode = false;
var inlineObjectReadThreshold = 2;
var readStruct;
var onLoadedStructures;
var onSaveState;
try {
  new Function("");
} catch (error) {
  inlineObjectReadThreshold = Infinity;
}
var Unpackr = class _Unpackr {
  constructor(options) {
    if (options) {
      if (options.useRecords === false && options.mapsAsObjects === void 0)
        options.mapsAsObjects = true;
      if (options.sequential && options.trusted !== false) {
        options.trusted = true;
        if (!options.structures && options.useRecords != false) {
          options.structures = [];
          if (!options.maxSharedStructures)
            options.maxSharedStructures = 0;
        }
      }
      if (options.structures)
        options.structures.sharedLength = options.structures.length;
      else if (options.getStructures) {
        (options.structures = []).uninitialized = true;
        options.structures.sharedLength = 0;
      }
      if (options.int64AsNumber) {
        options.int64AsType = "number";
      }
    }
    Object.assign(this, options);
  }
  unpack(source, options) {
    if (src) {
      return saveState(() => {
        clearSource();
        return this ? this.unpack(source, options) : _Unpackr.prototype.unpack.call(defaultOptions, source, options);
      });
    }
    if (!source.buffer && source.constructor === ArrayBuffer)
      source = typeof Buffer !== "undefined" ? Buffer.from(source) : new Uint8Array(source);
    if (typeof options === "object") {
      srcEnd = options.end || source.length;
      position = options.start || 0;
    } else {
      position = 0;
      srcEnd = options > -1 ? options : source.length;
    }
    stringPosition = 0;
    srcStringEnd = 0;
    srcString = null;
    strings = EMPTY_ARRAY;
    bundledStrings = null;
    src = source;
    try {
      dataView = source.dataView || (source.dataView = new DataView(source.buffer, source.byteOffset, source.byteLength));
    } catch (error) {
      src = null;
      if (source instanceof Uint8Array)
        throw error;
      throw new Error("Source must be a Uint8Array or Buffer but was a " + (source && typeof source == "object" ? source.constructor.name : typeof source));
    }
    if (this instanceof _Unpackr) {
      currentUnpackr = this;
      if (this.structures) {
        currentStructures = this.structures;
        return checkedRead(options);
      } else if (!currentStructures || currentStructures.length > 0) {
        currentStructures = [];
      }
    } else {
      currentUnpackr = defaultOptions;
      if (!currentStructures || currentStructures.length > 0)
        currentStructures = [];
    }
    return checkedRead(options);
  }
  unpackMultiple(source, forEach) {
    let values, lastPosition = 0;
    try {
      sequentialMode = true;
      let size = source.length;
      let value = this ? this.unpack(source, size) : defaultUnpackr.unpack(source, size);
      if (forEach) {
        if (forEach(value, lastPosition, position) === false) return;
        while (position < size) {
          lastPosition = position;
          if (forEach(checkedRead(), lastPosition, position) === false) {
            return;
          }
        }
      } else {
        values = [value];
        while (position < size) {
          lastPosition = position;
          values.push(checkedRead());
        }
        return values;
      }
    } catch (error) {
      error.lastPosition = lastPosition;
      error.values = values;
      throw error;
    } finally {
      sequentialMode = false;
      clearSource();
    }
  }
  _mergeStructures(loadedStructures, existingStructures) {
    if (onLoadedStructures)
      loadedStructures = onLoadedStructures.call(this, loadedStructures);
    loadedStructures = loadedStructures || [];
    if (Object.isFrozen(loadedStructures))
      loadedStructures = loadedStructures.map((structure) => structure.slice(0));
    for (let i = 0, l = loadedStructures.length; i < l; i++) {
      let structure = loadedStructures[i];
      if (structure) {
        structure.isShared = true;
        if (i >= 32)
          structure.highByte = i - 32 >> 5;
      }
    }
    loadedStructures.sharedLength = loadedStructures.length;
    for (let id in existingStructures || []) {
      if (id >= 0) {
        let structure = loadedStructures[id];
        let existing = existingStructures[id];
        if (existing) {
          if (structure)
            (loadedStructures.restoreStructures || (loadedStructures.restoreStructures = []))[id] = structure;
          loadedStructures[id] = existing;
        }
      }
    }
    return this.structures = loadedStructures;
  }
  decode(source, options) {
    return this.unpack(source, options);
  }
};
function checkedRead(options) {
  try {
    if (!currentUnpackr.trusted && !sequentialMode) {
      let sharedLength = currentStructures.sharedLength || 0;
      if (sharedLength < currentStructures.length)
        currentStructures.length = sharedLength;
    }
    let result;
    if (currentUnpackr.randomAccessStructure && src[position] < 64 && src[position] >= 32 && readStruct) {
      result = readStruct(src, position, srcEnd, currentUnpackr);
      src = null;
      if (!(options && options.lazy) && result)
        result = result.toJSON();
      position = srcEnd;
    } else
      result = read();
    if (bundledStrings) {
      position = bundledStrings.postBundlePosition;
      bundledStrings = null;
    }
    if (sequentialMode)
      currentStructures.restoreStructures = null;
    if (position == srcEnd) {
      if (currentStructures && currentStructures.restoreStructures)
        restoreStructures();
      currentStructures = null;
      src = null;
      if (referenceMap)
        referenceMap = null;
    } else if (position > srcEnd) {
      throw new Error("Unexpected end of MessagePack data");
    } else if (!sequentialMode) {
      let jsonView;
      try {
        jsonView = JSON.stringify(result, (_, value) => typeof value === "bigint" ? `${value}n` : value).slice(0, 100);
      } catch (error) {
        jsonView = "(JSON view not available " + error + ")";
      }
      throw new Error("Data read, but end of buffer not reached " + jsonView);
    }
    return result;
  } catch (error) {
    if (currentStructures && currentStructures.restoreStructures)
      restoreStructures();
    clearSource();
    if (error instanceof RangeError || error.message.startsWith("Unexpected end of buffer") || position > srcEnd) {
      error.incomplete = true;
    }
    throw error;
  }
}
function restoreStructures() {
  for (let id in currentStructures.restoreStructures) {
    currentStructures[id] = currentStructures.restoreStructures[id];
  }
  currentStructures.restoreStructures = null;
}
function read() {
  let token = src[position++];
  if (token < 160) {
    if (token < 128) {
      if (token < 64)
        return token;
      else {
        let structure = currentStructures[token & 63] || currentUnpackr.getStructures && loadStructures()[token & 63];
        if (structure) {
          if (!structure.read) {
            structure.read = createStructureReader(structure, token & 63);
          }
          return structure.read();
        } else
          return token;
      }
    } else if (token < 144) {
      token -= 128;
      if (currentUnpackr.mapsAsObjects) {
        let object = {};
        for (let i = 0; i < token; i++) {
          let key = readKey();
          if (key === "__proto__")
            key = "__proto_";
          object[key] = read();
        }
        return object;
      } else {
        let map = /* @__PURE__ */ new Map();
        for (let i = 0; i < token; i++) {
          map.set(read(), read());
        }
        return map;
      }
    } else {
      token -= 144;
      let array = new Array(token);
      for (let i = 0; i < token; i++) {
        array[i] = read();
      }
      if (currentUnpackr.freezeData)
        return Object.freeze(array);
      return array;
    }
  } else if (token < 192) {
    let length = token - 160;
    if (srcStringEnd >= position) {
      return srcString.slice(position - srcStringStart, (position += length) - srcStringStart);
    }
    if (srcStringEnd == 0 && srcEnd < 140) {
      let string = length < 16 ? shortStringInJS(length) : longStringInJS(length);
      if (string != null)
        return string;
    }
    return readFixedString(length);
  } else {
    let value;
    switch (token) {
      case 192:
        return null;
      case 193:
        if (bundledStrings) {
          value = read();
          if (value > 0)
            return bundledStrings[1].slice(bundledStrings.position1, bundledStrings.position1 += value);
          else
            return bundledStrings[0].slice(bundledStrings.position0, bundledStrings.position0 -= value);
        }
        return C1;
      // "never-used", return special object to denote that
      case 194:
        return false;
      case 195:
        return true;
      case 196:
        value = src[position++];
        if (value === void 0)
          throw new Error("Unexpected end of buffer");
        return readBin(value);
      case 197:
        value = dataView.getUint16(position);
        position += 2;
        return readBin(value);
      case 198:
        value = dataView.getUint32(position);
        position += 4;
        return readBin(value);
      case 199:
        return readExt(src[position++]);
      case 200:
        value = dataView.getUint16(position);
        position += 2;
        return readExt(value);
      case 201:
        value = dataView.getUint32(position);
        position += 4;
        return readExt(value);
      case 202:
        value = dataView.getFloat32(position);
        if (currentUnpackr.useFloat32 > 2) {
          let multiplier = mult10[(src[position] & 127) << 1 | src[position + 1] >> 7];
          position += 4;
          return (multiplier * value + (value > 0 ? 0.5 : -0.5) >> 0) / multiplier;
        }
        position += 4;
        return value;
      case 203:
        value = dataView.getFloat64(position);
        position += 8;
        return value;
      // uint handlers
      case 204:
        return src[position++];
      case 205:
        value = dataView.getUint16(position);
        position += 2;
        return value;
      case 206:
        value = dataView.getUint32(position);
        position += 4;
        return value;
      case 207:
        if (currentUnpackr.int64AsType === "number") {
          value = dataView.getUint32(position) * 4294967296;
          value += dataView.getUint32(position + 4);
        } else if (currentUnpackr.int64AsType === "string") {
          value = dataView.getBigUint64(position).toString();
        } else if (currentUnpackr.int64AsType === "auto") {
          value = dataView.getBigUint64(position);
          if (value <= BigInt(2) << BigInt(52)) value = Number(value);
        } else
          value = dataView.getBigUint64(position);
        position += 8;
        return value;
      // int handlers
      case 208:
        return dataView.getInt8(position++);
      case 209:
        value = dataView.getInt16(position);
        position += 2;
        return value;
      case 210:
        value = dataView.getInt32(position);
        position += 4;
        return value;
      case 211:
        if (currentUnpackr.int64AsType === "number") {
          value = dataView.getInt32(position) * 4294967296;
          value += dataView.getUint32(position + 4);
        } else if (currentUnpackr.int64AsType === "string") {
          value = dataView.getBigInt64(position).toString();
        } else if (currentUnpackr.int64AsType === "auto") {
          value = dataView.getBigInt64(position);
          if (value >= BigInt(-2) << BigInt(52) && value <= BigInt(2) << BigInt(52)) value = Number(value);
        } else
          value = dataView.getBigInt64(position);
        position += 8;
        return value;
      case 212:
        value = src[position++];
        if (value == 114) {
          return recordDefinition(src[position++] & 63);
        } else {
          let extension = currentExtensions[value];
          if (extension) {
            if (extension.read) {
              position++;
              return extension.read(read());
            } else if (extension.noBuffer) {
              position++;
              return extension();
            } else
              return extension(src.subarray(position, ++position));
          } else
            throw new Error("Unknown extension " + value);
        }
      case 213:
        value = src[position];
        if (value == 114) {
          position++;
          return recordDefinition(src[position++] & 63, src[position++]);
        } else
          return readExt(2);
      case 214:
        return readExt(4);
      case 215:
        return readExt(8);
      case 216:
        return readExt(16);
      case 217:
        value = src[position++];
        if (srcStringEnd >= position) {
          return srcString.slice(position - srcStringStart, (position += value) - srcStringStart);
        }
        return readString8(value);
      case 218:
        value = dataView.getUint16(position);
        position += 2;
        if (srcStringEnd >= position) {
          return srcString.slice(position - srcStringStart, (position += value) - srcStringStart);
        }
        return readString16(value);
      case 219:
        value = dataView.getUint32(position);
        position += 4;
        if (srcStringEnd >= position) {
          return srcString.slice(position - srcStringStart, (position += value) - srcStringStart);
        }
        return readString32(value);
      case 220:
        value = dataView.getUint16(position);
        position += 2;
        return readArray(value);
      case 221:
        value = dataView.getUint32(position);
        position += 4;
        return readArray(value);
      case 222:
        value = dataView.getUint16(position);
        position += 2;
        return readMap(value);
      case 223:
        value = dataView.getUint32(position);
        position += 4;
        return readMap(value);
      default:
        if (token >= 224)
          return token - 256;
        if (token === void 0) {
          let error = new Error("Unexpected end of MessagePack data");
          error.incomplete = true;
          throw error;
        }
        throw new Error("Unknown MessagePack token " + token);
    }
  }
}
var validName = /^[a-zA-Z_$][a-zA-Z\d_$]*$/;
function createStructureReader(structure, firstId) {
  function readObject() {
    if (readObject.count++ > inlineObjectReadThreshold) {
      let readObject2 = structure.read = new Function("r", "return function(){return " + (currentUnpackr.freezeData ? "Object.freeze" : "") + "({" + structure.map((key) => key === "__proto__" ? "__proto_:r()" : validName.test(key) ? key + ":r()" : "[" + JSON.stringify(key) + "]:r()").join(",") + "})}")(read);
      if (structure.highByte === 0)
        structure.read = createSecondByteReader(firstId, structure.read);
      return readObject2();
    }
    let object = {};
    for (let i = 0, l = structure.length; i < l; i++) {
      let key = structure[i];
      if (key === "__proto__")
        key = "__proto_";
      object[key] = read();
    }
    if (currentUnpackr.freezeData)
      return Object.freeze(object);
    return object;
  }
  readObject.count = 0;
  if (structure.highByte === 0) {
    return createSecondByteReader(firstId, readObject);
  }
  return readObject;
}
var createSecondByteReader = (firstId, read0) => {
  return function() {
    let highByte = src[position++];
    if (highByte === 0)
      return read0();
    let id = firstId < 32 ? -(firstId + (highByte << 5)) : firstId + (highByte << 5);
    let structure = currentStructures[id] || loadStructures()[id];
    if (!structure) {
      throw new Error("Record id is not defined for " + id);
    }
    if (!structure.read)
      structure.read = createStructureReader(structure, firstId);
    return structure.read();
  };
};
function loadStructures() {
  let loadedStructures = saveState(() => {
    src = null;
    return currentUnpackr.getStructures();
  });
  return currentStructures = currentUnpackr._mergeStructures(loadedStructures, currentStructures);
}
var readFixedString = readStringJS;
var readString8 = readStringJS;
var readString16 = readStringJS;
var readString32 = readStringJS;
function readStringJS(length) {
  let result;
  if (length < 16) {
    if (result = shortStringInJS(length))
      return result;
  }
  if (length > 64 && decoder)
    return decoder.decode(src.subarray(position, position += length));
  const end = position + length;
  const units = [];
  result = "";
  while (position < end) {
    const byte1 = src[position++];
    if ((byte1 & 128) === 0) {
      units.push(byte1);
    } else if ((byte1 & 224) === 192) {
      const byte2 = src[position++] & 63;
      units.push((byte1 & 31) << 6 | byte2);
    } else if ((byte1 & 240) === 224) {
      const byte2 = src[position++] & 63;
      const byte3 = src[position++] & 63;
      units.push((byte1 & 31) << 12 | byte2 << 6 | byte3);
    } else if ((byte1 & 248) === 240) {
      const byte2 = src[position++] & 63;
      const byte3 = src[position++] & 63;
      const byte4 = src[position++] & 63;
      let unit = (byte1 & 7) << 18 | byte2 << 12 | byte3 << 6 | byte4;
      if (unit > 65535) {
        unit -= 65536;
        units.push(unit >>> 10 & 1023 | 55296);
        unit = 56320 | unit & 1023;
      }
      units.push(unit);
    } else {
      units.push(byte1);
    }
    if (units.length >= 4096) {
      result += fromCharCode.apply(String, units);
      units.length = 0;
    }
  }
  if (units.length > 0) {
    result += fromCharCode.apply(String, units);
  }
  return result;
}
function readArray(length) {
  let array = new Array(length);
  for (let i = 0; i < length; i++) {
    array[i] = read();
  }
  if (currentUnpackr.freezeData)
    return Object.freeze(array);
  return array;
}
function readMap(length) {
  if (currentUnpackr.mapsAsObjects) {
    let object = {};
    for (let i = 0; i < length; i++) {
      let key = readKey();
      if (key === "__proto__")
        key = "__proto_";
      object[key] = read();
    }
    return object;
  } else {
    let map = /* @__PURE__ */ new Map();
    for (let i = 0; i < length; i++) {
      map.set(read(), read());
    }
    return map;
  }
}
var fromCharCode = String.fromCharCode;
function longStringInJS(length) {
  let start = position;
  let bytes = new Array(length);
  for (let i = 0; i < length; i++) {
    const byte = src[position++];
    if ((byte & 128) > 0) {
      position = start;
      return;
    }
    bytes[i] = byte;
  }
  return fromCharCode.apply(String, bytes);
}
function shortStringInJS(length) {
  if (length < 4) {
    if (length < 2) {
      if (length === 0)
        return "";
      else {
        let a = src[position++];
        if ((a & 128) > 1) {
          position -= 1;
          return;
        }
        return fromCharCode(a);
      }
    } else {
      let a = src[position++];
      let b = src[position++];
      if ((a & 128) > 0 || (b & 128) > 0) {
        position -= 2;
        return;
      }
      if (length < 3)
        return fromCharCode(a, b);
      let c = src[position++];
      if ((c & 128) > 0) {
        position -= 3;
        return;
      }
      return fromCharCode(a, b, c);
    }
  } else {
    let a = src[position++];
    let b = src[position++];
    let c = src[position++];
    let d = src[position++];
    if ((a & 128) > 0 || (b & 128) > 0 || (c & 128) > 0 || (d & 128) > 0) {
      position -= 4;
      return;
    }
    if (length < 6) {
      if (length === 4)
        return fromCharCode(a, b, c, d);
      else {
        let e = src[position++];
        if ((e & 128) > 0) {
          position -= 5;
          return;
        }
        return fromCharCode(a, b, c, d, e);
      }
    } else if (length < 8) {
      let e = src[position++];
      let f = src[position++];
      if ((e & 128) > 0 || (f & 128) > 0) {
        position -= 6;
        return;
      }
      if (length < 7)
        return fromCharCode(a, b, c, d, e, f);
      let g = src[position++];
      if ((g & 128) > 0) {
        position -= 7;
        return;
      }
      return fromCharCode(a, b, c, d, e, f, g);
    } else {
      let e = src[position++];
      let f = src[position++];
      let g = src[position++];
      let h = src[position++];
      if ((e & 128) > 0 || (f & 128) > 0 || (g & 128) > 0 || (h & 128) > 0) {
        position -= 8;
        return;
      }
      if (length < 10) {
        if (length === 8)
          return fromCharCode(a, b, c, d, e, f, g, h);
        else {
          let i = src[position++];
          if ((i & 128) > 0) {
            position -= 9;
            return;
          }
          return fromCharCode(a, b, c, d, e, f, g, h, i);
        }
      } else if (length < 12) {
        let i = src[position++];
        let j = src[position++];
        if ((i & 128) > 0 || (j & 128) > 0) {
          position -= 10;
          return;
        }
        if (length < 11)
          return fromCharCode(a, b, c, d, e, f, g, h, i, j);
        let k = src[position++];
        if ((k & 128) > 0) {
          position -= 11;
          return;
        }
        return fromCharCode(a, b, c, d, e, f, g, h, i, j, k);
      } else {
        let i = src[position++];
        let j = src[position++];
        let k = src[position++];
        let l = src[position++];
        if ((i & 128) > 0 || (j & 128) > 0 || (k & 128) > 0 || (l & 128) > 0) {
          position -= 12;
          return;
        }
        if (length < 14) {
          if (length === 12)
            return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l);
          else {
            let m = src[position++];
            if ((m & 128) > 0) {
              position -= 13;
              return;
            }
            return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m);
          }
        } else {
          let m = src[position++];
          let n = src[position++];
          if ((m & 128) > 0 || (n & 128) > 0) {
            position -= 14;
            return;
          }
          if (length < 15)
            return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
          let o = src[position++];
          if ((o & 128) > 0) {
            position -= 15;
            return;
          }
          return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o);
        }
      }
    }
  }
}
function readOnlyJSString() {
  let token = src[position++];
  let length;
  if (token < 192) {
    length = token - 160;
  } else {
    switch (token) {
      case 217:
        length = src[position++];
        break;
      case 218:
        length = dataView.getUint16(position);
        position += 2;
        break;
      case 219:
        length = dataView.getUint32(position);
        position += 4;
        break;
      default:
        throw new Error("Expected string");
    }
  }
  return readStringJS(length);
}
function readBin(length) {
  return currentUnpackr.copyBuffers ? (
    // specifically use the copying slice (not the node one)
    Uint8Array.prototype.slice.call(src, position, position += length)
  ) : src.subarray(position, position += length);
}
function readExt(length) {
  let type = src[position++];
  if (currentExtensions[type]) {
    let end;
    return currentExtensions[type](src.subarray(position, end = position += length), (readPosition) => {
      position = readPosition;
      try {
        return read();
      } finally {
        position = end;
      }
    });
  } else
    throw new Error("Unknown extension type " + type);
}
var keyCache = new Array(4096);
function readKey() {
  let length = src[position++];
  if (length >= 160 && length < 192) {
    length = length - 160;
    if (srcStringEnd >= position)
      return srcString.slice(position - srcStringStart, (position += length) - srcStringStart);
    else if (!(srcStringEnd == 0 && srcEnd < 180))
      return readFixedString(length);
  } else {
    position--;
    return asSafeString(read());
  }
  let key = (length << 5 ^ (length > 1 ? dataView.getUint16(position) : length > 0 ? src[position] : 0)) & 4095;
  let entry = keyCache[key];
  let checkPosition = position;
  let end = position + length - 3;
  let chunk;
  let i = 0;
  if (entry && entry.bytes == length) {
    while (checkPosition < end) {
      chunk = dataView.getUint32(checkPosition);
      if (chunk != entry[i++]) {
        checkPosition = 1879048192;
        break;
      }
      checkPosition += 4;
    }
    end += 3;
    while (checkPosition < end) {
      chunk = src[checkPosition++];
      if (chunk != entry[i++]) {
        checkPosition = 1879048192;
        break;
      }
    }
    if (checkPosition === end) {
      position = checkPosition;
      return entry.string;
    }
    end -= 3;
    checkPosition = position;
  }
  entry = [];
  keyCache[key] = entry;
  entry.bytes = length;
  while (checkPosition < end) {
    chunk = dataView.getUint32(checkPosition);
    entry.push(chunk);
    checkPosition += 4;
  }
  end += 3;
  while (checkPosition < end) {
    chunk = src[checkPosition++];
    entry.push(chunk);
  }
  let string = length < 16 ? shortStringInJS(length) : longStringInJS(length);
  if (string != null)
    return entry.string = string;
  return entry.string = readFixedString(length);
}
function asSafeString(property) {
  if (typeof property === "string") return property;
  if (typeof property === "number" || typeof property === "boolean" || typeof property === "bigint") return property.toString();
  if (property == null) return property + "";
  throw new Error("Invalid property type for record", typeof property);
}
var recordDefinition = (id, highByte) => {
  let structure = read().map(asSafeString);
  let firstByte = id;
  if (highByte !== void 0) {
    id = id < 32 ? -((highByte << 5) + id) : (highByte << 5) + id;
    structure.highByte = highByte;
  }
  let existingStructure = currentStructures[id];
  if (existingStructure && (existingStructure.isShared || sequentialMode)) {
    (currentStructures.restoreStructures || (currentStructures.restoreStructures = []))[id] = existingStructure;
  }
  currentStructures[id] = structure;
  structure.read = createStructureReader(structure, firstByte);
  return structure.read();
};
currentExtensions[0] = () => {
};
currentExtensions[0].noBuffer = true;
currentExtensions[66] = (data) => {
  let length = data.length;
  let value = BigInt(data[0] & 128 ? data[0] - 256 : data[0]);
  for (let i = 1; i < length; i++) {
    value <<= BigInt(8);
    value += BigInt(data[i]);
  }
  return value;
};
var errors = { Error, TypeError, ReferenceError };
currentExtensions[101] = () => {
  let data = read();
  return (errors[data[0]] || Error)(data[1], { cause: data[2] });
};
currentExtensions[105] = (data) => {
  if (currentUnpackr.structuredClone === false) throw new Error("Structured clone extension is disabled");
  let id = dataView.getUint32(position - 4);
  if (!referenceMap)
    referenceMap = /* @__PURE__ */ new Map();
  let token = src[position];
  let target3;
  if (token >= 144 && token < 160 || token == 220 || token == 221)
    target3 = [];
  else
    target3 = {};
  let refEntry = { target: target3 };
  referenceMap.set(id, refEntry);
  let targetProperties = read();
  if (refEntry.used)
    return Object.assign(target3, targetProperties);
  refEntry.target = targetProperties;
  return targetProperties;
};
currentExtensions[112] = (data) => {
  if (currentUnpackr.structuredClone === false) throw new Error("Structured clone extension is disabled");
  let id = dataView.getUint32(position - 4);
  let refEntry = referenceMap.get(id);
  refEntry.used = true;
  return refEntry.target;
};
currentExtensions[115] = () => new Set(read());
var typedArrays = ["Int8", "Uint8", "Uint8Clamped", "Int16", "Uint16", "Int32", "Uint32", "Float32", "Float64", "BigInt64", "BigUint64"].map((type) => type + "Array");
var glbl = typeof globalThis === "object" ? globalThis : window;
currentExtensions[116] = (data) => {
  let typeCode = data[0];
  let typedArrayName = typedArrays[typeCode];
  if (!typedArrayName) {
    if (typeCode === 16) {
      let ab = new ArrayBuffer(data.length - 1);
      let u8 = new Uint8Array(ab);
      u8.set(data.subarray(1));
      return ab;
    }
    throw new Error("Could not find typed array for code " + typeCode);
  }
  return new glbl[typedArrayName](Uint8Array.prototype.slice.call(data, 1).buffer);
};
currentExtensions[120] = () => {
  let data = read();
  return new RegExp(data[0], data[1]);
};
var TEMP_BUNDLE = [];
currentExtensions[98] = (data) => {
  let dataSize = (data[0] << 24) + (data[1] << 16) + (data[2] << 8) + data[3];
  let dataPosition = position;
  position += dataSize - data.length;
  bundledStrings = TEMP_BUNDLE;
  bundledStrings = [readOnlyJSString(), readOnlyJSString()];
  bundledStrings.position0 = 0;
  bundledStrings.position1 = 0;
  bundledStrings.postBundlePosition = position;
  position = dataPosition;
  return read();
};
currentExtensions[255] = (data) => {
  if (data.length == 4)
    return new Date((data[0] * 16777216 + (data[1] << 16) + (data[2] << 8) + data[3]) * 1e3);
  else if (data.length == 8)
    return new Date(
      ((data[0] << 22) + (data[1] << 14) + (data[2] << 6) + (data[3] >> 2)) / 1e6 + ((data[3] & 3) * 4294967296 + data[4] * 16777216 + (data[5] << 16) + (data[6] << 8) + data[7]) * 1e3
    );
  else if (data.length == 12)
    return new Date(
      ((data[0] << 24) + (data[1] << 16) + (data[2] << 8) + data[3]) / 1e6 + ((data[4] & 128 ? -281474976710656 : 0) + data[6] * 1099511627776 + data[7] * 4294967296 + data[8] * 16777216 + (data[9] << 16) + (data[10] << 8) + data[11]) * 1e3
    );
  else
    return /* @__PURE__ */ new Date("invalid");
};
function saveState(callback) {
  if (onSaveState)
    onSaveState();
  let savedSrcEnd = srcEnd;
  let savedPosition = position;
  let savedStringPosition = stringPosition;
  let savedSrcStringStart = srcStringStart;
  let savedSrcStringEnd = srcStringEnd;
  let savedSrcString = srcString;
  let savedStrings = strings;
  let savedReferenceMap = referenceMap;
  let savedBundledStrings = bundledStrings;
  let savedSrc = new Uint8Array(src.slice(0, srcEnd));
  let savedStructures = currentStructures;
  let savedStructuresContents = currentStructures.slice(0, currentStructures.length);
  let savedPackr = currentUnpackr;
  let savedSequentialMode = sequentialMode;
  let value = callback();
  srcEnd = savedSrcEnd;
  position = savedPosition;
  stringPosition = savedStringPosition;
  srcStringStart = savedSrcStringStart;
  srcStringEnd = savedSrcStringEnd;
  srcString = savedSrcString;
  strings = savedStrings;
  referenceMap = savedReferenceMap;
  bundledStrings = savedBundledStrings;
  src = savedSrc;
  sequentialMode = savedSequentialMode;
  currentStructures = savedStructures;
  currentStructures.splice(0, currentStructures.length, ...savedStructuresContents);
  currentUnpackr = savedPackr;
  dataView = new DataView(src.buffer, src.byteOffset, src.byteLength);
  return value;
}
function clearSource() {
  src = null;
  referenceMap = null;
  currentStructures = null;
}
var mult10 = new Array(147);
for (let i = 0; i < 256; i++) {
  mult10[i] = +("1e" + Math.floor(45.15 - i * 0.30103));
}
var defaultUnpackr = new Unpackr({ useRecords: false });
var unpack = defaultUnpackr.unpack;
var unpackMultiple = defaultUnpackr.unpackMultiple;
var decode = defaultUnpackr.unpack;
var FLOAT32_OPTIONS = {
  NEVER: 0,
  ALWAYS: 1,
  DECIMAL_ROUND: 3,
  DECIMAL_FIT: 4
};
var f32Array = new Float32Array(1);
var u8Array = new Uint8Array(f32Array.buffer, 0, 4);

// node_modules/msgpackr/pack.js
var textEncoder;
try {
  textEncoder = new TextEncoder();
} catch (error) {
}
var extensions;
var extensionClasses;
var hasNodeBuffer = typeof Buffer !== "undefined";
var ByteArrayAllocate = hasNodeBuffer ? function(length) {
  return Buffer.allocUnsafeSlow(length);
} : Uint8Array;
var ByteArray = hasNodeBuffer ? Buffer : Uint8Array;
var MAX_BUFFER_SIZE = hasNodeBuffer ? 4294967296 : 2144337920;
var target;
var keysTarget;
var targetView;
var position2 = 0;
var safeEnd;
var bundledStrings2 = null;
var writeStructSlots;
var MAX_BUNDLE_SIZE = 21760;
var hasNonLatin = /[\u0080-\uFFFF]/;
var RECORD_SYMBOL = Symbol("record-id");
var Packr = class extends Unpackr {
  constructor(options) {
    super(options);
    this.offset = 0;
    let typeBuffer;
    let start;
    let hasSharedUpdate;
    let structures;
    let referenceMap3;
    let encodeUtf8 = ByteArray.prototype.utf8Write ? function(string, position5) {
      return target.utf8Write(string, position5, target.byteLength - position5);
    } : textEncoder && textEncoder.encodeInto ? function(string, position5) {
      return textEncoder.encodeInto(string, target.subarray(position5)).written;
    } : false;
    let packr = this;
    if (!options)
      options = {};
    let isSequential = options && options.sequential;
    let hasSharedStructures = options.structures || options.saveStructures;
    let maxSharedStructures = options.maxSharedStructures;
    if (maxSharedStructures == null)
      maxSharedStructures = hasSharedStructures ? 32 : 0;
    if (maxSharedStructures > 8160)
      throw new Error("Maximum maxSharedStructure is 8160");
    if (options.structuredClone && options.moreTypes == void 0) {
      this.moreTypes = true;
    }
    let maxOwnStructures = options.maxOwnStructures;
    if (maxOwnStructures == null)
      maxOwnStructures = hasSharedStructures ? 32 : 64;
    if (!this.structures && options.useRecords != false)
      this.structures = [];
    let useTwoByteRecords = maxSharedStructures > 32 || maxOwnStructures + maxSharedStructures > 64;
    let sharedLimitId = maxSharedStructures + 64;
    let maxStructureId = maxSharedStructures + maxOwnStructures + 64;
    if (maxStructureId > 8256) {
      throw new Error("Maximum maxSharedStructure + maxOwnStructure is 8192");
    }
    let recordIdsToRemove = [];
    let transitionsCount = 0;
    let serializationsSinceTransitionRebuild = 0;
    this.pack = this.encode = function(value, encodeOptions) {
      if (!target) {
        target = new ByteArrayAllocate(8192);
        targetView = target.dataView || (target.dataView = new DataView(target.buffer, 0, 8192));
        position2 = 0;
      }
      safeEnd = target.length - 10;
      if (safeEnd - position2 < 2048) {
        target = new ByteArrayAllocate(target.length);
        targetView = target.dataView || (target.dataView = new DataView(target.buffer, 0, target.length));
        safeEnd = target.length - 10;
        position2 = 0;
      } else
        position2 = position2 + 7 & 2147483640;
      start = position2;
      if (encodeOptions & RESERVE_START_SPACE) position2 += encodeOptions & 255;
      referenceMap3 = packr.structuredClone ? /* @__PURE__ */ new Map() : null;
      if (packr.bundleStrings && typeof value !== "string") {
        bundledStrings2 = [];
        bundledStrings2.size = Infinity;
      } else
        bundledStrings2 = null;
      structures = packr.structures;
      if (structures) {
        if (structures.uninitialized)
          structures = packr._mergeStructures(packr.getStructures());
        let sharedLength = structures.sharedLength || 0;
        if (sharedLength > maxSharedStructures) {
          throw new Error("Shared structures is larger than maximum shared structures, try increasing maxSharedStructures to " + structures.sharedLength);
        }
        if (!structures.transitions) {
          structures.transitions = /* @__PURE__ */ Object.create(null);
          for (let i = 0; i < sharedLength; i++) {
            let keys = structures[i];
            if (!keys)
              continue;
            let nextTransition, transition = structures.transitions;
            for (let j = 0, l = keys.length; j < l; j++) {
              let key = keys[j];
              nextTransition = transition[key];
              if (!nextTransition) {
                nextTransition = transition[key] = /* @__PURE__ */ Object.create(null);
              }
              transition = nextTransition;
            }
            transition[RECORD_SYMBOL] = i + 64;
          }
          this.lastNamedStructuresLength = sharedLength;
        }
        if (!isSequential) {
          structures.nextId = sharedLength + 64;
        }
      }
      if (hasSharedUpdate)
        hasSharedUpdate = false;
      let encodingError;
      try {
        if (packr.randomAccessStructure && value && value.constructor && value.constructor === Object)
          writeStruct(value);
        else
          pack3(value);
        let lastBundle = bundledStrings2;
        if (bundledStrings2)
          writeBundles(start, pack3, 0);
        if (referenceMap3 && referenceMap3.idsToInsert) {
          let idsToInsert = referenceMap3.idsToInsert.sort((a, b) => a.offset > b.offset ? 1 : -1);
          let i = idsToInsert.length;
          let incrementPosition = -1;
          while (lastBundle && i > 0) {
            let insertionPoint = idsToInsert[--i].offset + start;
            if (insertionPoint < lastBundle.stringsPosition + start && incrementPosition === -1)
              incrementPosition = 0;
            if (insertionPoint > lastBundle.position + start) {
              if (incrementPosition >= 0)
                incrementPosition += 6;
            } else {
              if (incrementPosition >= 0) {
                targetView.setUint32(
                  lastBundle.position + start,
                  targetView.getUint32(lastBundle.position + start) + incrementPosition
                );
                incrementPosition = -1;
              }
              lastBundle = lastBundle.previous;
              i++;
            }
          }
          if (incrementPosition >= 0 && lastBundle) {
            targetView.setUint32(
              lastBundle.position + start,
              targetView.getUint32(lastBundle.position + start) + incrementPosition
            );
          }
          position2 += idsToInsert.length * 6;
          if (position2 > safeEnd)
            makeRoom(position2);
          packr.offset = position2;
          let serialized = insertIds(target.subarray(start, position2), idsToInsert);
          referenceMap3 = null;
          return serialized;
        }
        packr.offset = position2;
        if (encodeOptions & REUSE_BUFFER_MODE) {
          target.start = start;
          target.end = position2;
          return target;
        }
        return target.subarray(start, position2);
      } catch (error) {
        encodingError = error;
        throw error;
      } finally {
        if (structures) {
          resetStructures();
          if (hasSharedUpdate && packr.saveStructures) {
            let sharedLength = structures.sharedLength || 0;
            let returnBuffer = target.subarray(start, position2);
            let newSharedData = prepareStructures(structures, packr);
            if (!encodingError) {
              if (packr.saveStructures(newSharedData, newSharedData.isCompatible) === false) {
                return packr.pack(value, encodeOptions);
              }
              packr.lastNamedStructuresLength = sharedLength;
              if (target.length > 1073741824) target = null;
              return returnBuffer;
            }
          }
        }
        if (target.length > 1073741824) target = null;
        if (encodeOptions & RESET_BUFFER_MODE)
          position2 = start;
      }
    };
    const resetStructures = () => {
      if (serializationsSinceTransitionRebuild < 10)
        serializationsSinceTransitionRebuild++;
      let sharedLength = structures.sharedLength || 0;
      if (structures.length > sharedLength && !isSequential)
        structures.length = sharedLength;
      if (transitionsCount > 1e4) {
        structures.transitions = null;
        serializationsSinceTransitionRebuild = 0;
        transitionsCount = 0;
        if (recordIdsToRemove.length > 0)
          recordIdsToRemove = [];
      } else if (recordIdsToRemove.length > 0 && !isSequential) {
        for (let i = 0, l = recordIdsToRemove.length; i < l; i++) {
          recordIdsToRemove[i][RECORD_SYMBOL] = 0;
        }
        recordIdsToRemove = [];
      }
    };
    const packArray = (value) => {
      var length = value.length;
      if (length < 16) {
        target[position2++] = 144 | length;
      } else if (length < 65536) {
        target[position2++] = 220;
        target[position2++] = length >> 8;
        target[position2++] = length & 255;
      } else {
        target[position2++] = 221;
        targetView.setUint32(position2, length);
        position2 += 4;
      }
      for (let i = 0; i < length; i++) {
        pack3(value[i]);
      }
    };
    const pack3 = (value) => {
      if (position2 > safeEnd)
        target = makeRoom(position2);
      var type = typeof value;
      var length;
      if (type === "string") {
        let strLength = value.length;
        if (bundledStrings2 && strLength >= 4 && strLength < 4096) {
          if ((bundledStrings2.size += strLength) > MAX_BUNDLE_SIZE) {
            let extStart;
            let maxBytes2 = (bundledStrings2[0] ? bundledStrings2[0].length * 3 + bundledStrings2[1].length : 0) + 10;
            if (position2 + maxBytes2 > safeEnd)
              target = makeRoom(position2 + maxBytes2);
            let lastBundle;
            if (bundledStrings2.position) {
              lastBundle = bundledStrings2;
              target[position2] = 200;
              position2 += 3;
              target[position2++] = 98;
              extStart = position2 - start;
              position2 += 4;
              writeBundles(start, pack3, 0);
              targetView.setUint16(extStart + start - 3, position2 - start - extStart);
            } else {
              target[position2++] = 214;
              target[position2++] = 98;
              extStart = position2 - start;
              position2 += 4;
            }
            bundledStrings2 = ["", ""];
            bundledStrings2.previous = lastBundle;
            bundledStrings2.size = 0;
            bundledStrings2.position = extStart;
          }
          let twoByte = hasNonLatin.test(value);
          bundledStrings2[twoByte ? 0 : 1] += value;
          target[position2++] = 193;
          pack3(twoByte ? -strLength : strLength);
          return;
        }
        let headerSize;
        if (strLength < 32) {
          headerSize = 1;
        } else if (strLength < 256) {
          headerSize = 2;
        } else if (strLength < 65536) {
          headerSize = 3;
        } else {
          headerSize = 5;
        }
        let maxBytes = strLength * 3;
        if (position2 + maxBytes > safeEnd)
          target = makeRoom(position2 + maxBytes);
        if (strLength < 64 || !encodeUtf8) {
          let i, c1, c2, strPosition = position2 + headerSize;
          for (i = 0; i < strLength; i++) {
            c1 = value.charCodeAt(i);
            if (c1 < 128) {
              target[strPosition++] = c1;
            } else if (c1 < 2048) {
              target[strPosition++] = c1 >> 6 | 192;
              target[strPosition++] = c1 & 63 | 128;
            } else if ((c1 & 64512) === 55296 && ((c2 = value.charCodeAt(i + 1)) & 64512) === 56320) {
              c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
              i++;
              target[strPosition++] = c1 >> 18 | 240;
              target[strPosition++] = c1 >> 12 & 63 | 128;
              target[strPosition++] = c1 >> 6 & 63 | 128;
              target[strPosition++] = c1 & 63 | 128;
            } else {
              target[strPosition++] = c1 >> 12 | 224;
              target[strPosition++] = c1 >> 6 & 63 | 128;
              target[strPosition++] = c1 & 63 | 128;
            }
          }
          length = strPosition - position2 - headerSize;
        } else {
          length = encodeUtf8(value, position2 + headerSize);
        }
        if (length < 32) {
          target[position2++] = 160 | length;
        } else if (length < 256) {
          if (headerSize < 2) {
            target.copyWithin(position2 + 2, position2 + 1, position2 + 1 + length);
          }
          target[position2++] = 217;
          target[position2++] = length;
        } else if (length < 65536) {
          if (headerSize < 3) {
            target.copyWithin(position2 + 3, position2 + 2, position2 + 2 + length);
          }
          target[position2++] = 218;
          target[position2++] = length >> 8;
          target[position2++] = length & 255;
        } else {
          if (headerSize < 5) {
            target.copyWithin(position2 + 5, position2 + 3, position2 + 3 + length);
          }
          target[position2++] = 219;
          targetView.setUint32(position2, length);
          position2 += 4;
        }
        position2 += length;
      } else if (type === "number") {
        if (value >>> 0 === value) {
          if (value < 32 || value < 128 && this.useRecords === false || value < 64 && !this.randomAccessStructure) {
            target[position2++] = value;
          } else if (value < 256) {
            target[position2++] = 204;
            target[position2++] = value;
          } else if (value < 65536) {
            target[position2++] = 205;
            target[position2++] = value >> 8;
            target[position2++] = value & 255;
          } else {
            target[position2++] = 206;
            targetView.setUint32(position2, value);
            position2 += 4;
          }
        } else if (value >> 0 === value) {
          if (value >= -32) {
            target[position2++] = 256 + value;
          } else if (value >= -128) {
            target[position2++] = 208;
            target[position2++] = value + 256;
          } else if (value >= -32768) {
            target[position2++] = 209;
            targetView.setInt16(position2, value);
            position2 += 2;
          } else {
            target[position2++] = 210;
            targetView.setInt32(position2, value);
            position2 += 4;
          }
        } else {
          let useFloat32;
          if ((useFloat32 = this.useFloat32) > 0 && value < 4294967296 && value >= -2147483648) {
            target[position2++] = 202;
            targetView.setFloat32(position2, value);
            let xShifted;
            if (useFloat32 < 4 || // this checks for rounding of numbers that were encoded in 32-bit float to nearest significant decimal digit that could be preserved
            (xShifted = value * mult10[(target[position2] & 127) << 1 | target[position2 + 1] >> 7]) >> 0 === xShifted) {
              position2 += 4;
              return;
            } else
              position2--;
          }
          target[position2++] = 203;
          targetView.setFloat64(position2, value);
          position2 += 8;
        }
      } else if (type === "object" || type === "function") {
        if (!value)
          target[position2++] = 192;
        else {
          if (referenceMap3) {
            let referee = referenceMap3.get(value);
            if (referee) {
              if (!referee.id) {
                let idsToInsert = referenceMap3.idsToInsert || (referenceMap3.idsToInsert = []);
                referee.id = idsToInsert.push(referee);
              }
              target[position2++] = 214;
              target[position2++] = 112;
              targetView.setUint32(position2, referee.id);
              position2 += 4;
              return;
            } else
              referenceMap3.set(value, { offset: position2 - start });
          }
          let constructor = value.constructor;
          if (constructor === Object) {
            writeObject(value);
          } else if (constructor === Array) {
            packArray(value);
          } else if (constructor === Map) {
            if (this.mapAsEmptyObject) target[position2++] = 128;
            else {
              length = value.size;
              if (length < 16) {
                target[position2++] = 128 | length;
              } else if (length < 65536) {
                target[position2++] = 222;
                target[position2++] = length >> 8;
                target[position2++] = length & 255;
              } else {
                target[position2++] = 223;
                targetView.setUint32(position2, length);
                position2 += 4;
              }
              for (let [key, entryValue] of value) {
                pack3(key);
                pack3(entryValue);
              }
            }
          } else {
            for (let i = 0, l = extensions.length; i < l; i++) {
              let extensionClass = extensionClasses[i];
              if (value instanceof extensionClass) {
                let extension = extensions[i];
                if (extension.write) {
                  if (extension.type) {
                    target[position2++] = 212;
                    target[position2++] = extension.type;
                    target[position2++] = 0;
                  }
                  let writeResult = extension.write.call(this, value);
                  if (writeResult === value) {
                    if (Array.isArray(value)) {
                      packArray(value);
                    } else {
                      writeObject(value);
                    }
                  } else {
                    pack3(writeResult);
                  }
                  return;
                }
                let currentTarget = target;
                let currentTargetView = targetView;
                let currentPosition = position2;
                target = null;
                let result;
                try {
                  result = extension.pack.call(this, value, (size) => {
                    target = currentTarget;
                    currentTarget = null;
                    position2 += size;
                    if (position2 > safeEnd)
                      makeRoom(position2);
                    return {
                      target,
                      targetView,
                      position: position2 - size
                    };
                  }, pack3);
                } finally {
                  if (currentTarget) {
                    target = currentTarget;
                    targetView = currentTargetView;
                    position2 = currentPosition;
                    safeEnd = target.length - 10;
                  }
                }
                if (result) {
                  if (result.length + position2 > safeEnd)
                    makeRoom(result.length + position2);
                  position2 = writeExtensionData(result, target, position2, extension.type);
                }
                return;
              }
            }
            if (Array.isArray(value)) {
              packArray(value);
            } else {
              if (value.toJSON) {
                const json = value.toJSON();
                if (json !== value)
                  return pack3(json);
              }
              if (type === "function")
                return pack3(this.writeFunction && this.writeFunction(value));
              writeObject(value);
            }
          }
        }
      } else if (type === "boolean") {
        target[position2++] = value ? 195 : 194;
      } else if (type === "bigint") {
        if (value < BigInt(1) << BigInt(63) && value >= -(BigInt(1) << BigInt(63))) {
          target[position2++] = 211;
          targetView.setBigInt64(position2, value);
        } else if (value < BigInt(1) << BigInt(64) && value > 0) {
          target[position2++] = 207;
          targetView.setBigUint64(position2, value);
        } else {
          if (this.largeBigIntToFloat) {
            target[position2++] = 203;
            targetView.setFloat64(position2, Number(value));
          } else if (this.largeBigIntToString) {
            return pack3(value.toString());
          } else if (this.useBigIntExtension && value < BigInt(2) ** BigInt(1023) && value > -(BigInt(2) ** BigInt(1023))) {
            target[position2++] = 199;
            position2++;
            target[position2++] = 66;
            let bytes = [];
            let alignedSign;
            do {
              let byte = value & BigInt(255);
              alignedSign = (byte & BigInt(128)) === (value < BigInt(0) ? BigInt(128) : BigInt(0));
              bytes.push(byte);
              value >>= BigInt(8);
            } while (!((value === BigInt(0) || value === BigInt(-1)) && alignedSign));
            target[position2 - 2] = bytes.length;
            for (let i = bytes.length; i > 0; ) {
              target[position2++] = Number(bytes[--i]);
            }
            return;
          } else {
            throw new RangeError(value + " was too large to fit in MessagePack 64-bit integer format, use useBigIntExtension, or set largeBigIntToFloat to convert to float-64, or set largeBigIntToString to convert to string");
          }
        }
        position2 += 8;
      } else if (type === "undefined") {
        if (this.encodeUndefinedAsNil)
          target[position2++] = 192;
        else {
          target[position2++] = 212;
          target[position2++] = 0;
          target[position2++] = 0;
        }
      } else {
        throw new Error("Unknown type: " + type);
      }
    };
    const writePlainObject = this.variableMapSize || this.coercibleKeyAsNumber || this.skipValues ? (object) => {
      let keys;
      if (this.skipValues) {
        keys = [];
        for (let key2 in object) {
          if ((typeof object.hasOwnProperty !== "function" || object.hasOwnProperty(key2)) && !this.skipValues.includes(object[key2]))
            keys.push(key2);
        }
      } else {
        keys = Object.keys(object);
      }
      let length = keys.length;
      if (length < 16) {
        target[position2++] = 128 | length;
      } else if (length < 65536) {
        target[position2++] = 222;
        target[position2++] = length >> 8;
        target[position2++] = length & 255;
      } else {
        target[position2++] = 223;
        targetView.setUint32(position2, length);
        position2 += 4;
      }
      let key;
      if (this.coercibleKeyAsNumber) {
        for (let i = 0; i < length; i++) {
          key = keys[i];
          let num = Number(key);
          pack3(isNaN(num) ? key : num);
          pack3(object[key]);
        }
      } else {
        for (let i = 0; i < length; i++) {
          pack3(key = keys[i]);
          pack3(object[key]);
        }
      }
    } : (object) => {
      target[position2++] = 222;
      let objectOffset = position2 - start;
      position2 += 2;
      let size = 0;
      for (let key in object) {
        if (typeof object.hasOwnProperty !== "function" || object.hasOwnProperty(key)) {
          pack3(key);
          pack3(object[key]);
          size++;
        }
      }
      if (size > 65535) {
        throw new Error('Object is too large to serialize with fast 16-bit map size, use the "variableMapSize" option to serialize this object');
      }
      target[objectOffset++ + start] = size >> 8;
      target[objectOffset + start] = size & 255;
    };
    const writeRecord = this.useRecords === false ? writePlainObject : options.progressiveRecords && !useTwoByteRecords ? (
      // this is about 2% faster for highly stable structures, since it only requires one for-in loop (but much more expensive when new structure needs to be written)
      (object) => {
        let nextTransition, transition = structures.transitions || (structures.transitions = /* @__PURE__ */ Object.create(null));
        let objectOffset = position2++ - start;
        let wroteKeys;
        for (let key in object) {
          if (typeof object.hasOwnProperty !== "function" || object.hasOwnProperty(key)) {
            nextTransition = transition[key];
            if (nextTransition)
              transition = nextTransition;
            else {
              let keys = Object.keys(object);
              let lastTransition = transition;
              transition = structures.transitions;
              let newTransitions = 0;
              for (let i = 0, l = keys.length; i < l; i++) {
                let key2 = keys[i];
                nextTransition = transition[key2];
                if (!nextTransition) {
                  nextTransition = transition[key2] = /* @__PURE__ */ Object.create(null);
                  newTransitions++;
                }
                transition = nextTransition;
              }
              if (objectOffset + start + 1 == position2) {
                position2--;
                newRecord(transition, keys, newTransitions);
              } else
                insertNewRecord(transition, keys, objectOffset, newTransitions);
              wroteKeys = true;
              transition = lastTransition[key];
            }
            pack3(object[key]);
          }
        }
        if (!wroteKeys) {
          let recordId = transition[RECORD_SYMBOL];
          if (recordId)
            target[objectOffset + start] = recordId;
          else
            insertNewRecord(transition, Object.keys(object), objectOffset, 0);
        }
      }
    ) : (object) => {
      let nextTransition, transition = structures.transitions || (structures.transitions = /* @__PURE__ */ Object.create(null));
      let newTransitions = 0;
      for (let key in object) if (typeof object.hasOwnProperty !== "function" || object.hasOwnProperty(key)) {
        nextTransition = transition[key];
        if (!nextTransition) {
          nextTransition = transition[key] = /* @__PURE__ */ Object.create(null);
          newTransitions++;
        }
        transition = nextTransition;
      }
      let recordId = transition[RECORD_SYMBOL];
      if (recordId) {
        if (recordId >= 96 && useTwoByteRecords) {
          target[position2++] = ((recordId -= 96) & 31) + 96;
          target[position2++] = recordId >> 5;
        } else
          target[position2++] = recordId;
      } else {
        newRecord(transition, transition.__keys__ || Object.keys(object), newTransitions);
      }
      for (let key in object)
        if (typeof object.hasOwnProperty !== "function" || object.hasOwnProperty(key)) {
          pack3(object[key]);
        }
    };
    const checkUseRecords = typeof this.useRecords == "function" && this.useRecords;
    const writeObject = checkUseRecords ? (object) => {
      checkUseRecords(object) ? writeRecord(object) : writePlainObject(object);
    } : writeRecord;
    const makeRoom = (end) => {
      let newSize;
      if (end > 16777216) {
        if (end - start > MAX_BUFFER_SIZE)
          throw new Error("Packed buffer would be larger than maximum buffer size");
        newSize = Math.min(
          MAX_BUFFER_SIZE,
          Math.round(Math.max((end - start) * (end > 67108864 ? 1.25 : 2), 4194304) / 4096) * 4096
        );
      } else
        newSize = (Math.max(end - start << 2, target.length - 1) >> 12) + 1 << 12;
      let newBuffer = new ByteArrayAllocate(newSize);
      targetView = newBuffer.dataView || (newBuffer.dataView = new DataView(newBuffer.buffer, 0, newSize));
      end = Math.min(end, target.length);
      if (target.copy)
        target.copy(newBuffer, 0, start, end);
      else
        newBuffer.set(target.slice(start, end));
      position2 -= start;
      start = 0;
      safeEnd = newBuffer.length - 10;
      return target = newBuffer;
    };
    const newRecord = (transition, keys, newTransitions) => {
      let recordId = structures.nextId;
      if (!recordId)
        recordId = 64;
      if (recordId < sharedLimitId && this.shouldShareStructure && !this.shouldShareStructure(keys)) {
        recordId = structures.nextOwnId;
        if (!(recordId < maxStructureId))
          recordId = sharedLimitId;
        structures.nextOwnId = recordId + 1;
      } else {
        if (recordId >= maxStructureId)
          recordId = sharedLimitId;
        structures.nextId = recordId + 1;
      }
      let highByte = keys.highByte = recordId >= 96 && useTwoByteRecords ? recordId - 96 >> 5 : -1;
      transition[RECORD_SYMBOL] = recordId;
      transition.__keys__ = keys;
      structures[recordId - 64] = keys;
      if (recordId < sharedLimitId) {
        keys.isShared = true;
        structures.sharedLength = recordId - 63;
        hasSharedUpdate = true;
        if (highByte >= 0) {
          target[position2++] = (recordId & 31) + 96;
          target[position2++] = highByte;
        } else {
          target[position2++] = recordId;
        }
      } else {
        if (highByte >= 0) {
          target[position2++] = 213;
          target[position2++] = 114;
          target[position2++] = (recordId & 31) + 96;
          target[position2++] = highByte;
        } else {
          target[position2++] = 212;
          target[position2++] = 114;
          target[position2++] = recordId;
        }
        if (newTransitions)
          transitionsCount += serializationsSinceTransitionRebuild * newTransitions;
        if (recordIdsToRemove.length >= maxOwnStructures)
          recordIdsToRemove.shift()[RECORD_SYMBOL] = 0;
        recordIdsToRemove.push(transition);
        pack3(keys);
      }
    };
    const insertNewRecord = (transition, keys, insertionOffset, newTransitions) => {
      let mainTarget = target;
      let mainPosition = position2;
      let mainSafeEnd = safeEnd;
      let mainStart = start;
      target = keysTarget;
      position2 = 0;
      start = 0;
      if (!target)
        keysTarget = target = new ByteArrayAllocate(8192);
      safeEnd = target.length - 10;
      newRecord(transition, keys, newTransitions);
      keysTarget = target;
      let keysPosition = position2;
      target = mainTarget;
      position2 = mainPosition;
      safeEnd = mainSafeEnd;
      start = mainStart;
      if (keysPosition > 1) {
        let newEnd = position2 + keysPosition - 1;
        if (newEnd > safeEnd)
          makeRoom(newEnd);
        let insertionPosition = insertionOffset + start;
        target.copyWithin(insertionPosition + keysPosition, insertionPosition + 1, position2);
        target.set(keysTarget.slice(0, keysPosition), insertionPosition);
        position2 = newEnd;
      } else {
        target[insertionOffset + start] = keysTarget[0];
      }
    };
    const writeStruct = (object) => {
      let newPosition = writeStructSlots(object, target, start, position2, structures, makeRoom, (value, newPosition2, notifySharedUpdate) => {
        if (notifySharedUpdate)
          return hasSharedUpdate = true;
        position2 = newPosition2;
        let startTarget = target;
        pack3(value);
        resetStructures();
        if (startTarget !== target) {
          return { position: position2, targetView, target };
        }
        return position2;
      }, this);
      if (newPosition === 0)
        return writeObject(object);
      position2 = newPosition;
    };
  }
  useBuffer(buffer) {
    target = buffer;
    target.dataView || (target.dataView = new DataView(target.buffer, target.byteOffset, target.byteLength));
    position2 = 0;
  }
  set position(value) {
    position2 = value;
  }
  get position() {
    return position2;
  }
  clearSharedData() {
    if (this.structures)
      this.structures = [];
    if (this.typedStructs)
      this.typedStructs = [];
  }
};
extensionClasses = [Date, Set, Error, RegExp, ArrayBuffer, Object.getPrototypeOf(Uint8Array.prototype).constructor, C1Type];
extensions = [{
  pack(date, allocateForWrite, pack3) {
    let seconds = date.getTime() / 1e3;
    if ((this.useTimestamp32 || date.getMilliseconds() === 0) && seconds >= 0 && seconds < 4294967296) {
      let { target: target3, targetView: targetView3, position: position5 } = allocateForWrite(6);
      target3[position5++] = 214;
      target3[position5++] = 255;
      targetView3.setUint32(position5, seconds);
    } else if (seconds > 0 && seconds < 4294967296) {
      let { target: target3, targetView: targetView3, position: position5 } = allocateForWrite(10);
      target3[position5++] = 215;
      target3[position5++] = 255;
      targetView3.setUint32(position5, date.getMilliseconds() * 4e6 + (seconds / 1e3 / 4294967296 >> 0));
      targetView3.setUint32(position5 + 4, seconds);
    } else if (isNaN(seconds)) {
      if (this.onInvalidDate) {
        allocateForWrite(0);
        return pack3(this.onInvalidDate());
      }
      let { target: target3, targetView: targetView3, position: position5 } = allocateForWrite(3);
      target3[position5++] = 212;
      target3[position5++] = 255;
      target3[position5++] = 255;
    } else {
      let { target: target3, targetView: targetView3, position: position5 } = allocateForWrite(15);
      target3[position5++] = 199;
      target3[position5++] = 12;
      target3[position5++] = 255;
      targetView3.setUint32(position5, date.getMilliseconds() * 1e6);
      targetView3.setBigInt64(position5 + 4, BigInt(Math.floor(seconds)));
    }
  }
}, {
  pack(set, allocateForWrite, pack3) {
    if (this.setAsEmptyObject) {
      allocateForWrite(0);
      return pack3({});
    }
    let array = Array.from(set);
    let { target: target3, position: position5 } = allocateForWrite(this.moreTypes ? 3 : 0);
    if (this.moreTypes) {
      target3[position5++] = 212;
      target3[position5++] = 115;
      target3[position5++] = 0;
    }
    pack3(array);
  }
}, {
  pack(error, allocateForWrite, pack3) {
    let { target: target3, position: position5 } = allocateForWrite(this.moreTypes ? 3 : 0);
    if (this.moreTypes) {
      target3[position5++] = 212;
      target3[position5++] = 101;
      target3[position5++] = 0;
    }
    pack3([error.name, error.message, error.cause]);
  }
}, {
  pack(regex, allocateForWrite, pack3) {
    let { target: target3, position: position5 } = allocateForWrite(this.moreTypes ? 3 : 0);
    if (this.moreTypes) {
      target3[position5++] = 212;
      target3[position5++] = 120;
      target3[position5++] = 0;
    }
    pack3([regex.source, regex.flags]);
  }
}, {
  pack(arrayBuffer, allocateForWrite) {
    if (this.moreTypes)
      writeExtBuffer(arrayBuffer, 16, allocateForWrite);
    else
      writeBuffer(hasNodeBuffer ? Buffer.from(arrayBuffer) : new Uint8Array(arrayBuffer), allocateForWrite);
  }
}, {
  pack(typedArray, allocateForWrite) {
    let constructor = typedArray.constructor;
    if (constructor !== ByteArray && this.moreTypes)
      writeExtBuffer(typedArray, typedArrays.indexOf(constructor.name), allocateForWrite);
    else
      writeBuffer(typedArray, allocateForWrite);
  }
}, {
  pack(c1, allocateForWrite) {
    let { target: target3, position: position5 } = allocateForWrite(1);
    target3[position5] = 193;
  }
}];
function writeExtBuffer(typedArray, type, allocateForWrite, encode3) {
  let length = typedArray.byteLength;
  if (length + 1 < 256) {
    var { target: target3, position: position5 } = allocateForWrite(4 + length);
    target3[position5++] = 199;
    target3[position5++] = length + 1;
  } else if (length + 1 < 65536) {
    var { target: target3, position: position5 } = allocateForWrite(5 + length);
    target3[position5++] = 200;
    target3[position5++] = length + 1 >> 8;
    target3[position5++] = length + 1 & 255;
  } else {
    var { target: target3, position: position5, targetView: targetView3 } = allocateForWrite(7 + length);
    target3[position5++] = 201;
    targetView3.setUint32(position5, length + 1);
    position5 += 4;
  }
  target3[position5++] = 116;
  target3[position5++] = type;
  if (!typedArray.buffer) typedArray = new Uint8Array(typedArray);
  target3.set(new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength), position5);
}
function writeBuffer(buffer, allocateForWrite) {
  let length = buffer.byteLength;
  var target3, position5;
  if (length < 256) {
    var { target: target3, position: position5 } = allocateForWrite(length + 2);
    target3[position5++] = 196;
    target3[position5++] = length;
  } else if (length < 65536) {
    var { target: target3, position: position5 } = allocateForWrite(length + 3);
    target3[position5++] = 197;
    target3[position5++] = length >> 8;
    target3[position5++] = length & 255;
  } else {
    var { target: target3, position: position5, targetView: targetView3 } = allocateForWrite(length + 5);
    target3[position5++] = 198;
    targetView3.setUint32(position5, length);
    position5 += 4;
  }
  target3.set(buffer, position5);
}
function writeExtensionData(result, target3, position5, type) {
  let length = result.length;
  switch (length) {
    case 1:
      target3[position5++] = 212;
      break;
    case 2:
      target3[position5++] = 213;
      break;
    case 4:
      target3[position5++] = 214;
      break;
    case 8:
      target3[position5++] = 215;
      break;
    case 16:
      target3[position5++] = 216;
      break;
    default:
      if (length < 256) {
        target3[position5++] = 199;
        target3[position5++] = length;
      } else if (length < 65536) {
        target3[position5++] = 200;
        target3[position5++] = length >> 8;
        target3[position5++] = length & 255;
      } else {
        target3[position5++] = 201;
        target3[position5++] = length >> 24;
        target3[position5++] = length >> 16 & 255;
        target3[position5++] = length >> 8 & 255;
        target3[position5++] = length & 255;
      }
  }
  target3[position5++] = type;
  target3.set(result, position5);
  position5 += length;
  return position5;
}
function insertIds(serialized, idsToInsert) {
  let nextId;
  let distanceToMove = idsToInsert.length * 6;
  let lastEnd = serialized.length - distanceToMove;
  while (nextId = idsToInsert.pop()) {
    let offset = nextId.offset;
    let id = nextId.id;
    serialized.copyWithin(offset + distanceToMove, offset, lastEnd);
    distanceToMove -= 6;
    let position5 = offset + distanceToMove;
    serialized[position5++] = 214;
    serialized[position5++] = 105;
    serialized[position5++] = id >> 24;
    serialized[position5++] = id >> 16 & 255;
    serialized[position5++] = id >> 8 & 255;
    serialized[position5++] = id & 255;
    lastEnd = offset;
  }
  return serialized;
}
function writeBundles(start, pack3, incrementPosition) {
  if (bundledStrings2.length > 0) {
    targetView.setUint32(bundledStrings2.position + start, position2 + incrementPosition - bundledStrings2.position - start);
    bundledStrings2.stringsPosition = position2 - start;
    let writeStrings = bundledStrings2;
    bundledStrings2 = null;
    pack3(writeStrings[0]);
    pack3(writeStrings[1]);
  }
}
function prepareStructures(structures, packr) {
  structures.isCompatible = (existingStructures) => {
    let compatible = !existingStructures || (packr.lastNamedStructuresLength || 0) === existingStructures.length;
    if (!compatible)
      packr._mergeStructures(existingStructures);
    return compatible;
  };
  return structures;
}
var defaultPackr = new Packr({ useRecords: false });
var pack = defaultPackr.pack;
var encode = defaultPackr.pack;
var { NEVER, ALWAYS, DECIMAL_ROUND, DECIMAL_FIT } = FLOAT32_OPTIONS;
var REUSE_BUFFER_MODE = 512;
var RESET_BUFFER_MODE = 1024;
var RESERVE_START_SPACE = 2048;

// node_modules/cbor-x/decode.js
var decoder2;
try {
  decoder2 = new TextDecoder();
} catch (error) {
}
var src2;
var srcEnd2;
var position3 = 0;
var EMPTY_ARRAY2 = [];
var LEGACY_RECORD_INLINE_ID = 105;
var RECORD_DEFINITIONS_ID = 57342;
var RECORD_INLINE_ID = 57343;
var BUNDLED_STRINGS_ID = 57337;
var PACKED_REFERENCE_TAG_ID = 6;
var STOP_CODE = {};
var maxArraySize = 11281e4;
var maxMapSize = 1681e4;
var strings2 = EMPTY_ARRAY2;
var stringPosition2 = 0;
var currentDecoder = {};
var currentStructures2;
var srcString2;
var srcStringStart2 = 0;
var srcStringEnd2 = 0;
var bundledStrings3;
var referenceMap2;
var currentExtensions2 = [];
var currentExtensionRanges = [];
var packedValues;
var dataView2;
var restoreMapsAsObject;
var defaultOptions2 = {
  useRecords: false,
  mapsAsObjects: true
};
var sequentialMode2 = false;
var inlineObjectReadThreshold2 = 2;
try {
  new Function("");
} catch (error) {
  inlineObjectReadThreshold2 = Infinity;
}
var Decoder2 = class _Decoder {
  constructor(options) {
    if (options) {
      if ((options.keyMap || options._keyMap) && !options.useRecords) {
        options.useRecords = false;
        options.mapsAsObjects = true;
      }
      if (options.useRecords === false && options.mapsAsObjects === void 0)
        options.mapsAsObjects = true;
      if (options.getStructures)
        options.getShared = options.getStructures;
      if (options.getShared && !options.structures)
        (options.structures = []).uninitialized = true;
      if (options.keyMap) {
        this.mapKey = /* @__PURE__ */ new Map();
        for (let [k, v] of Object.entries(options.keyMap)) this.mapKey.set(v, k);
      }
    }
    Object.assign(this, options);
  }
  /*
  decodeKey(key) {
  	return this.keyMap
  		? Object.keys(this.keyMap)[Object.values(this.keyMap).indexOf(key)] || key
  		: key
  }
  */
  decodeKey(key) {
    return this.keyMap ? this.mapKey.get(key) || key : key;
  }
  encodeKey(key) {
    return this.keyMap && this.keyMap.hasOwnProperty(key) ? this.keyMap[key] : key;
  }
  encodeKeys(rec) {
    if (!this._keyMap) return rec;
    let map = /* @__PURE__ */ new Map();
    for (let [k, v] of Object.entries(rec)) map.set(this._keyMap.hasOwnProperty(k) ? this._keyMap[k] : k, v);
    return map;
  }
  decodeKeys(map) {
    if (!this._keyMap || map.constructor.name != "Map") return map;
    if (!this._mapKey) {
      this._mapKey = /* @__PURE__ */ new Map();
      for (let [k, v] of Object.entries(this._keyMap)) this._mapKey.set(v, k);
    }
    let res = {};
    map.forEach((v, k) => res[safeKey(this._mapKey.has(k) ? this._mapKey.get(k) : k)] = v);
    return res;
  }
  mapDecode(source, end) {
    let res = this.decode(source);
    if (this._keyMap) {
      switch (res.constructor.name) {
        case "Array":
          return res.map((r) => this.decodeKeys(r));
      }
    }
    return res;
  }
  decode(source, end) {
    if (src2) {
      return saveState2(() => {
        clearSource2();
        return this ? this.decode(source, end) : _Decoder.prototype.decode.call(defaultOptions2, source, end);
      });
    }
    srcEnd2 = end > -1 ? end : source.length;
    position3 = 0;
    stringPosition2 = 0;
    srcStringEnd2 = 0;
    srcString2 = null;
    strings2 = EMPTY_ARRAY2;
    bundledStrings3 = null;
    src2 = source;
    try {
      dataView2 = source.dataView || (source.dataView = new DataView(source.buffer, source.byteOffset, source.byteLength));
    } catch (error) {
      src2 = null;
      if (source instanceof Uint8Array)
        throw error;
      throw new Error("Source must be a Uint8Array or Buffer but was a " + (source && typeof source == "object" ? source.constructor.name : typeof source));
    }
    if (this instanceof _Decoder) {
      currentDecoder = this;
      packedValues = this.sharedValues && (this.pack ? new Array(this.maxPrivatePackedValues || 16).concat(this.sharedValues) : this.sharedValues);
      if (this.structures) {
        currentStructures2 = this.structures;
        return checkedRead2();
      } else if (!currentStructures2 || currentStructures2.length > 0) {
        currentStructures2 = [];
      }
    } else {
      currentDecoder = defaultOptions2;
      if (!currentStructures2 || currentStructures2.length > 0)
        currentStructures2 = [];
      packedValues = null;
    }
    return checkedRead2();
  }
  decodeMultiple(source, forEach) {
    let values, lastPosition = 0;
    try {
      let size = source.length;
      sequentialMode2 = true;
      let value = this ? this.decode(source, size) : defaultDecoder.decode(source, size);
      if (forEach) {
        if (forEach(value) === false) {
          return;
        }
        while (position3 < size) {
          lastPosition = position3;
          if (forEach(checkedRead2()) === false) {
            return;
          }
        }
      } else {
        values = [value];
        while (position3 < size) {
          lastPosition = position3;
          values.push(checkedRead2());
        }
        return values;
      }
    } catch (error) {
      error.lastPosition = lastPosition;
      error.values = values;
      throw error;
    } finally {
      sequentialMode2 = false;
      clearSource2();
    }
  }
};
function checkedRead2() {
  try {
    let result = read2();
    if (bundledStrings3) {
      if (position3 >= bundledStrings3.postBundlePosition) {
        let error = new Error("Unexpected bundle position");
        error.incomplete = true;
        throw error;
      }
      position3 = bundledStrings3.postBundlePosition;
      bundledStrings3 = null;
    }
    if (position3 == srcEnd2) {
      currentStructures2 = null;
      src2 = null;
      if (referenceMap2)
        referenceMap2 = null;
    } else if (position3 > srcEnd2) {
      let error = new Error("Unexpected end of CBOR data");
      error.incomplete = true;
      throw error;
    } else if (!sequentialMode2) {
      throw new Error("Data read, but end of buffer not reached");
    }
    return result;
  } catch (error) {
    clearSource2();
    if (error instanceof RangeError || error.message.startsWith("Unexpected end of buffer")) {
      error.incomplete = true;
    }
    throw error;
  }
}
function read2() {
  let token = src2[position3++];
  let majorType = token >> 5;
  token = token & 31;
  if (token > 23) {
    switch (token) {
      case 24:
        token = src2[position3++];
        break;
      case 25:
        if (majorType == 7) {
          return getFloat16();
        }
        token = dataView2.getUint16(position3);
        position3 += 2;
        break;
      case 26:
        if (majorType == 7) {
          let value = dataView2.getFloat32(position3);
          if (currentDecoder.useFloat32 > 2) {
            let multiplier = mult102[(src2[position3] & 127) << 1 | src2[position3 + 1] >> 7];
            position3 += 4;
            return (multiplier * value + (value > 0 ? 0.5 : -0.5) >> 0) / multiplier;
          }
          position3 += 4;
          return value;
        }
        token = dataView2.getUint32(position3);
        position3 += 4;
        break;
      case 27:
        if (majorType == 7) {
          let value = dataView2.getFloat64(position3);
          position3 += 8;
          return value;
        }
        if (majorType > 1) {
          if (dataView2.getUint32(position3) > 0)
            throw new Error("JavaScript does not support arrays, maps, or strings with length over 4294967295");
          token = dataView2.getUint32(position3 + 4);
        } else if (currentDecoder.int64AsNumber) {
          token = dataView2.getUint32(position3) * 4294967296;
          token += dataView2.getUint32(position3 + 4);
        } else
          token = dataView2.getBigUint64(position3);
        position3 += 8;
        break;
      case 31:
        switch (majorType) {
          case 2:
          // byte string
          case 3:
            throw new Error("Indefinite length not supported for byte or text strings");
          case 4:
            let array = [];
            let value, i = 0;
            while ((value = read2()) != STOP_CODE) {
              if (i >= maxArraySize) throw new Error(`Array length exceeds ${maxArraySize}`);
              array[i++] = value;
            }
            return majorType == 4 ? array : majorType == 3 ? array.join("") : Buffer.concat(array);
          case 5:
            let key;
            if (currentDecoder.mapsAsObjects) {
              let object = {};
              let i2 = 0;
              if (currentDecoder.keyMap) {
                while ((key = read2()) != STOP_CODE) {
                  if (i2++ >= maxMapSize) throw new Error(`Property count exceeds ${maxMapSize}`);
                  object[safeKey(currentDecoder.decodeKey(key))] = read2();
                }
              } else {
                while ((key = read2()) != STOP_CODE) {
                  if (i2++ >= maxMapSize) throw new Error(`Property count exceeds ${maxMapSize}`);
                  object[safeKey(key)] = read2();
                }
              }
              return object;
            } else {
              if (restoreMapsAsObject) {
                currentDecoder.mapsAsObjects = true;
                restoreMapsAsObject = false;
              }
              let map = /* @__PURE__ */ new Map();
              if (currentDecoder.keyMap) {
                let i2 = 0;
                while ((key = read2()) != STOP_CODE) {
                  if (i2++ >= maxMapSize) {
                    throw new Error(`Map size exceeds ${maxMapSize}`);
                  }
                  map.set(currentDecoder.decodeKey(key), read2());
                }
              } else {
                let i2 = 0;
                while ((key = read2()) != STOP_CODE) {
                  if (i2++ >= maxMapSize) {
                    throw new Error(`Map size exceeds ${maxMapSize}`);
                  }
                  map.set(key, read2());
                }
              }
              return map;
            }
          case 7:
            return STOP_CODE;
          default:
            throw new Error("Invalid major type for indefinite length " + majorType);
        }
      default:
        throw new Error("Unknown token " + token);
    }
  }
  switch (majorType) {
    case 0:
      return token;
    case 1:
      return ~token;
    case 2:
      return readBin2(token);
    case 3:
      if (srcStringEnd2 >= position3) {
        return srcString2.slice(position3 - srcStringStart2, (position3 += token) - srcStringStart2);
      }
      if (srcStringEnd2 == 0 && srcEnd2 < 140 && token < 32) {
        let string = token < 16 ? shortStringInJS2(token) : longStringInJS2(token);
        if (string != null)
          return string;
      }
      return readFixedString2(token);
    case 4:
      if (token >= maxArraySize) throw new Error(`Array length exceeds ${maxArraySize}`);
      let array = new Array(token);
      for (let i = 0; i < token; i++) array[i] = read2();
      return array;
    case 5:
      if (token >= maxMapSize) throw new Error(`Map size exceeds ${maxArraySize}`);
      if (currentDecoder.mapsAsObjects) {
        let object = {};
        if (currentDecoder.keyMap) for (let i = 0; i < token; i++) object[safeKey(currentDecoder.decodeKey(read2()))] = read2();
        else for (let i = 0; i < token; i++) object[safeKey(read2())] = read2();
        return object;
      } else {
        if (restoreMapsAsObject) {
          currentDecoder.mapsAsObjects = true;
          restoreMapsAsObject = false;
        }
        let map = /* @__PURE__ */ new Map();
        if (currentDecoder.keyMap) for (let i = 0; i < token; i++) map.set(currentDecoder.decodeKey(read2()), read2());
        else for (let i = 0; i < token; i++) map.set(read2(), read2());
        return map;
      }
    case 6:
      if (token >= BUNDLED_STRINGS_ID) {
        let structure = currentStructures2[token & 8191];
        if (structure) {
          if (!structure.read) structure.read = createStructureReader2(structure);
          return structure.read();
        }
        if (token < 65536) {
          if (token == RECORD_INLINE_ID) {
            let length = readJustLength();
            let id = read2();
            let structure2 = read2();
            recordDefinition2(id, structure2);
            let object = {};
            if (currentDecoder.keyMap) for (let i = 2; i < length; i++) {
              let key = currentDecoder.decodeKey(structure2[i - 2]);
              object[safeKey(key)] = read2();
            }
            else for (let i = 2; i < length; i++) {
              let key = structure2[i - 2];
              object[safeKey(key)] = read2();
            }
            return object;
          } else if (token == RECORD_DEFINITIONS_ID) {
            let length = readJustLength();
            let id = read2();
            for (let i = 2; i < length; i++) {
              recordDefinition2(id++, read2());
            }
            return read2();
          } else if (token == BUNDLED_STRINGS_ID) {
            return readBundleExt();
          }
          if (currentDecoder.getShared) {
            loadShared();
            structure = currentStructures2[token & 8191];
            if (structure) {
              if (!structure.read)
                structure.read = createStructureReader2(structure);
              return structure.read();
            }
          }
        }
      }
      let extension = currentExtensions2[token];
      if (extension) {
        if (extension.handlesRead)
          return extension(read2);
        else
          return extension(read2());
      } else {
        let input = read2();
        for (let i = 0; i < currentExtensionRanges.length; i++) {
          let value = currentExtensionRanges[i](token, input);
          if (value !== void 0)
            return value;
        }
        return new Tag(input, token);
      }
    case 7:
      switch (token) {
        case 20:
          return false;
        case 21:
          return true;
        case 22:
          return null;
        case 23:
          return;
        // undefined
        case 31:
        default:
          let packedValue = (packedValues || getPackedValues())[token];
          if (packedValue !== void 0)
            return packedValue;
          throw new Error("Unknown token " + token);
      }
    default:
      if (isNaN(token)) {
        let error = new Error("Unexpected end of CBOR data");
        error.incomplete = true;
        throw error;
      }
      throw new Error("Unknown CBOR token " + token);
  }
}
var validName2 = /^[a-zA-Z_$][a-zA-Z\d_$]*$/;
function createStructureReader2(structure) {
  if (!structure) throw new Error("Structure is required in record definition");
  function readObject() {
    let length = src2[position3++];
    length = length & 31;
    if (length > 23) {
      switch (length) {
        case 24:
          length = src2[position3++];
          break;
        case 25:
          length = dataView2.getUint16(position3);
          position3 += 2;
          break;
        case 26:
          length = dataView2.getUint32(position3);
          position3 += 4;
          break;
        default:
          throw new Error("Expected array header, but got " + src2[position3 - 1]);
      }
    }
    let compiledReader = this.compiledReader;
    while (compiledReader) {
      if (compiledReader.propertyCount === length)
        return compiledReader(read2);
      compiledReader = compiledReader.next;
    }
    if (this.slowReads++ >= inlineObjectReadThreshold2) {
      let array = this.length == length ? this : this.slice(0, length);
      compiledReader = currentDecoder.keyMap ? new Function("r", "return {" + array.map((k) => currentDecoder.decodeKey(k)).map((k) => validName2.test(k) ? safeKey(k) + ":r()" : "[" + JSON.stringify(k) + "]:r()").join(",") + "}") : new Function("r", "return {" + array.map((key) => validName2.test(key) ? safeKey(key) + ":r()" : "[" + JSON.stringify(key) + "]:r()").join(",") + "}");
      if (this.compiledReader)
        compiledReader.next = this.compiledReader;
      compiledReader.propertyCount = length;
      this.compiledReader = compiledReader;
      return compiledReader(read2);
    }
    let object = {};
    if (currentDecoder.keyMap) for (let i = 0; i < length; i++) object[safeKey(currentDecoder.decodeKey(this[i]))] = read2();
    else for (let i = 0; i < length; i++) {
      object[safeKey(this[i])] = read2();
    }
    return object;
  }
  structure.slowReads = 0;
  return readObject;
}
function safeKey(key) {
  if (typeof key === "string") return key === "__proto__" ? "__proto_" : key;
  if (typeof key === "number" || typeof key === "boolean" || typeof key === "bigint") return key.toString();
  if (key == null) return key + "";
  throw new Error("Invalid property name type " + typeof key);
}
var readFixedString2 = readStringJS2;
function readStringJS2(length) {
  let result;
  if (length < 16) {
    if (result = shortStringInJS2(length))
      return result;
  }
  if (length > 64 && decoder2)
    return decoder2.decode(src2.subarray(position3, position3 += length));
  const end = position3 + length;
  const units = [];
  result = "";
  while (position3 < end) {
    const byte1 = src2[position3++];
    if ((byte1 & 128) === 0) {
      units.push(byte1);
    } else if ((byte1 & 224) === 192) {
      const byte2 = src2[position3++] & 63;
      units.push((byte1 & 31) << 6 | byte2);
    } else if ((byte1 & 240) === 224) {
      const byte2 = src2[position3++] & 63;
      const byte3 = src2[position3++] & 63;
      units.push((byte1 & 31) << 12 | byte2 << 6 | byte3);
    } else if ((byte1 & 248) === 240) {
      const byte2 = src2[position3++] & 63;
      const byte3 = src2[position3++] & 63;
      const byte4 = src2[position3++] & 63;
      let unit = (byte1 & 7) << 18 | byte2 << 12 | byte3 << 6 | byte4;
      if (unit > 65535) {
        unit -= 65536;
        units.push(unit >>> 10 & 1023 | 55296);
        unit = 56320 | unit & 1023;
      }
      units.push(unit);
    } else {
      units.push(byte1);
    }
    if (units.length >= 4096) {
      result += fromCharCode2.apply(String, units);
      units.length = 0;
    }
  }
  if (units.length > 0) {
    result += fromCharCode2.apply(String, units);
  }
  return result;
}
var fromCharCode2 = String.fromCharCode;
function longStringInJS2(length) {
  let start = position3;
  let bytes = new Array(length);
  for (let i = 0; i < length; i++) {
    const byte = src2[position3++];
    if ((byte & 128) > 0) {
      position3 = start;
      return;
    }
    bytes[i] = byte;
  }
  return fromCharCode2.apply(String, bytes);
}
function shortStringInJS2(length) {
  if (length < 4) {
    if (length < 2) {
      if (length === 0)
        return "";
      else {
        let a = src2[position3++];
        if ((a & 128) > 1) {
          position3 -= 1;
          return;
        }
        return fromCharCode2(a);
      }
    } else {
      let a = src2[position3++];
      let b = src2[position3++];
      if ((a & 128) > 0 || (b & 128) > 0) {
        position3 -= 2;
        return;
      }
      if (length < 3)
        return fromCharCode2(a, b);
      let c = src2[position3++];
      if ((c & 128) > 0) {
        position3 -= 3;
        return;
      }
      return fromCharCode2(a, b, c);
    }
  } else {
    let a = src2[position3++];
    let b = src2[position3++];
    let c = src2[position3++];
    let d = src2[position3++];
    if ((a & 128) > 0 || (b & 128) > 0 || (c & 128) > 0 || (d & 128) > 0) {
      position3 -= 4;
      return;
    }
    if (length < 6) {
      if (length === 4)
        return fromCharCode2(a, b, c, d);
      else {
        let e = src2[position3++];
        if ((e & 128) > 0) {
          position3 -= 5;
          return;
        }
        return fromCharCode2(a, b, c, d, e);
      }
    } else if (length < 8) {
      let e = src2[position3++];
      let f = src2[position3++];
      if ((e & 128) > 0 || (f & 128) > 0) {
        position3 -= 6;
        return;
      }
      if (length < 7)
        return fromCharCode2(a, b, c, d, e, f);
      let g = src2[position3++];
      if ((g & 128) > 0) {
        position3 -= 7;
        return;
      }
      return fromCharCode2(a, b, c, d, e, f, g);
    } else {
      let e = src2[position3++];
      let f = src2[position3++];
      let g = src2[position3++];
      let h = src2[position3++];
      if ((e & 128) > 0 || (f & 128) > 0 || (g & 128) > 0 || (h & 128) > 0) {
        position3 -= 8;
        return;
      }
      if (length < 10) {
        if (length === 8)
          return fromCharCode2(a, b, c, d, e, f, g, h);
        else {
          let i = src2[position3++];
          if ((i & 128) > 0) {
            position3 -= 9;
            return;
          }
          return fromCharCode2(a, b, c, d, e, f, g, h, i);
        }
      } else if (length < 12) {
        let i = src2[position3++];
        let j = src2[position3++];
        if ((i & 128) > 0 || (j & 128) > 0) {
          position3 -= 10;
          return;
        }
        if (length < 11)
          return fromCharCode2(a, b, c, d, e, f, g, h, i, j);
        let k = src2[position3++];
        if ((k & 128) > 0) {
          position3 -= 11;
          return;
        }
        return fromCharCode2(a, b, c, d, e, f, g, h, i, j, k);
      } else {
        let i = src2[position3++];
        let j = src2[position3++];
        let k = src2[position3++];
        let l = src2[position3++];
        if ((i & 128) > 0 || (j & 128) > 0 || (k & 128) > 0 || (l & 128) > 0) {
          position3 -= 12;
          return;
        }
        if (length < 14) {
          if (length === 12)
            return fromCharCode2(a, b, c, d, e, f, g, h, i, j, k, l);
          else {
            let m = src2[position3++];
            if ((m & 128) > 0) {
              position3 -= 13;
              return;
            }
            return fromCharCode2(a, b, c, d, e, f, g, h, i, j, k, l, m);
          }
        } else {
          let m = src2[position3++];
          let n = src2[position3++];
          if ((m & 128) > 0 || (n & 128) > 0) {
            position3 -= 14;
            return;
          }
          if (length < 15)
            return fromCharCode2(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
          let o = src2[position3++];
          if ((o & 128) > 0) {
            position3 -= 15;
            return;
          }
          return fromCharCode2(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o);
        }
      }
    }
  }
}
function readBin2(length) {
  return currentDecoder.copyBuffers ? (
    // specifically use the copying slice (not the node one)
    Uint8Array.prototype.slice.call(src2, position3, position3 += length)
  ) : src2.subarray(position3, position3 += length);
}
var f32Array2 = new Float32Array(1);
var u8Array2 = new Uint8Array(f32Array2.buffer, 0, 4);
function getFloat16() {
  let byte0 = src2[position3++];
  let byte1 = src2[position3++];
  let exponent = (byte0 & 127) >> 2;
  if (exponent === 31) {
    if (byte1 || byte0 & 3)
      return NaN;
    return byte0 & 128 ? -Infinity : Infinity;
  }
  if (exponent === 0) {
    let abs = ((byte0 & 3) << 8 | byte1) / (1 << 24);
    return byte0 & 128 ? -abs : abs;
  }
  u8Array2[3] = byte0 & 128 | // sign bit
  (exponent >> 1) + 56;
  u8Array2[2] = (byte0 & 7) << 5 | // last exponent bit and first two mantissa bits
  byte1 >> 3;
  u8Array2[1] = byte1 << 5;
  u8Array2[0] = 0;
  return f32Array2[0];
}
var keyCache2 = new Array(4096);
var Tag = class {
  constructor(value, tag) {
    this.value = value;
    this.tag = tag;
  }
};
currentExtensions2[0] = (dateString) => {
  return new Date(dateString);
};
currentExtensions2[1] = (epochSec) => {
  return new Date(Math.round(epochSec * 1e3));
};
currentExtensions2[2] = (buffer) => {
  let value = BigInt(0);
  for (let i = 0, l = buffer.byteLength; i < l; i++) {
    value = BigInt(buffer[i]) + (value << BigInt(8));
  }
  return value;
};
currentExtensions2[3] = (buffer) => {
  return BigInt(-1) - currentExtensions2[2](buffer);
};
currentExtensions2[4] = (fraction) => {
  return +(fraction[1] + "e" + fraction[0]);
};
currentExtensions2[5] = (fraction) => {
  return fraction[1] * Math.exp(fraction[0] * Math.log(2));
};
var recordDefinition2 = (id, structure) => {
  id = id - 57344;
  let existingStructure = currentStructures2[id];
  if (existingStructure && existingStructure.isShared) {
    (currentStructures2.restoreStructures || (currentStructures2.restoreStructures = []))[id] = existingStructure;
  }
  currentStructures2[id] = structure;
  structure.read = createStructureReader2(structure);
};
currentExtensions2[LEGACY_RECORD_INLINE_ID] = (data) => {
  let length = data.length;
  let structure = data[1];
  recordDefinition2(data[0], structure);
  let object = {};
  for (let i = 2; i < length; i++) {
    let key = structure[i - 2];
    object[safeKey(key)] = data[i];
  }
  return object;
};
currentExtensions2[14] = (value) => {
  if (bundledStrings3)
    return bundledStrings3[0].slice(bundledStrings3.position0, bundledStrings3.position0 += value);
  return new Tag(value, 14);
};
currentExtensions2[15] = (value) => {
  if (bundledStrings3)
    return bundledStrings3[1].slice(bundledStrings3.position1, bundledStrings3.position1 += value);
  return new Tag(value, 15);
};
var glbl2 = { Error, RegExp };
currentExtensions2[27] = (data) => {
  return (glbl2[data[0]] || Error)(data[1], data[2]);
};
var packedTable = (read3) => {
  if (src2[position3++] != 132) {
    let error = new Error("Packed values structure must be followed by a 4 element array");
    if (src2.length < position3)
      error.incomplete = true;
    throw error;
  }
  let newPackedValues = read3();
  if (!newPackedValues || !newPackedValues.length) {
    let error = new Error("Packed values structure must be followed by a 4 element array");
    error.incomplete = true;
    throw error;
  }
  packedValues = packedValues ? newPackedValues.concat(packedValues.slice(newPackedValues.length)) : newPackedValues;
  packedValues.prefixes = read3();
  packedValues.suffixes = read3();
  return read3();
};
packedTable.handlesRead = true;
currentExtensions2[51] = packedTable;
currentExtensions2[PACKED_REFERENCE_TAG_ID] = (data) => {
  if (!packedValues) {
    if (currentDecoder.getShared)
      loadShared();
    else
      return new Tag(data, PACKED_REFERENCE_TAG_ID);
  }
  if (typeof data == "number")
    return packedValues[16 + (data >= 0 ? 2 * data : -2 * data - 1)];
  let error = new Error("No support for non-integer packed references yet");
  if (data === void 0)
    error.incomplete = true;
  throw error;
};
currentExtensions2[28] = (read3) => {
  if (!referenceMap2) {
    referenceMap2 = /* @__PURE__ */ new Map();
    referenceMap2.id = 0;
  }
  let id = referenceMap2.id++;
  let startingPosition = position3;
  let token = src2[position3];
  let target3;
  if (token >> 5 == 4)
    target3 = [];
  else
    target3 = {};
  let refEntry = { target: target3 };
  referenceMap2.set(id, refEntry);
  let targetProperties = read3();
  if (refEntry.used) {
    if (Object.getPrototypeOf(target3) !== Object.getPrototypeOf(targetProperties)) {
      position3 = startingPosition;
      target3 = targetProperties;
      referenceMap2.set(id, { target: target3 });
      targetProperties = read3();
    }
    return Object.assign(target3, targetProperties);
  }
  refEntry.target = targetProperties;
  return targetProperties;
};
currentExtensions2[28].handlesRead = true;
currentExtensions2[29] = (id) => {
  let refEntry = referenceMap2.get(id);
  refEntry.used = true;
  return refEntry.target;
};
currentExtensions2[258] = (array) => new Set(array);
(currentExtensions2[259] = (read3) => {
  if (currentDecoder.mapsAsObjects) {
    currentDecoder.mapsAsObjects = false;
    restoreMapsAsObject = true;
  }
  return read3();
}).handlesRead = true;
function combine(a, b) {
  if (typeof a === "string")
    return a + b;
  if (a instanceof Array)
    return a.concat(b);
  return Object.assign({}, a, b);
}
function getPackedValues() {
  if (!packedValues) {
    if (currentDecoder.getShared)
      loadShared();
    else
      throw new Error("No packed values available");
  }
  return packedValues;
}
var SHARED_DATA_TAG_ID = 1399353956;
currentExtensionRanges.push((tag, input) => {
  if (tag >= 225 && tag <= 255)
    return combine(getPackedValues().prefixes[tag - 224], input);
  if (tag >= 28704 && tag <= 32767)
    return combine(getPackedValues().prefixes[tag - 28672], input);
  if (tag >= 1879052288 && tag <= 2147483647)
    return combine(getPackedValues().prefixes[tag - 1879048192], input);
  if (tag >= 216 && tag <= 223)
    return combine(input, getPackedValues().suffixes[tag - 216]);
  if (tag >= 27647 && tag <= 28671)
    return combine(input, getPackedValues().suffixes[tag - 27639]);
  if (tag >= 1811940352 && tag <= 1879048191)
    return combine(input, getPackedValues().suffixes[tag - 1811939328]);
  if (tag == SHARED_DATA_TAG_ID) {
    return {
      packedValues,
      structures: currentStructures2.slice(0),
      version: input
    };
  }
  if (tag == 55799)
    return input;
});
var isLittleEndianMachine = new Uint8Array(new Uint16Array([1]).buffer)[0] == 1;
var typedArrays2 = [
  Uint8Array,
  Uint8ClampedArray,
  Uint16Array,
  Uint32Array,
  typeof BigUint64Array == "undefined" ? { name: "BigUint64Array" } : BigUint64Array,
  Int8Array,
  Int16Array,
  Int32Array,
  typeof BigInt64Array == "undefined" ? { name: "BigInt64Array" } : BigInt64Array,
  Float32Array,
  Float64Array
];
var typedArrayTags = [64, 68, 69, 70, 71, 72, 77, 78, 79, 85, 86];
for (let i = 0; i < typedArrays2.length; i++) {
  registerTypedArray(typedArrays2[i], typedArrayTags[i]);
}
function registerTypedArray(TypedArray, tag) {
  let dvMethod = "get" + TypedArray.name.slice(0, -5);
  let bytesPerElement;
  if (typeof TypedArray === "function")
    bytesPerElement = TypedArray.BYTES_PER_ELEMENT;
  else
    TypedArray = null;
  for (let littleEndian = 0; littleEndian < 2; littleEndian++) {
    if (!littleEndian && bytesPerElement == 1)
      continue;
    let sizeShift = bytesPerElement == 2 ? 1 : bytesPerElement == 4 ? 2 : bytesPerElement == 8 ? 3 : 0;
    currentExtensions2[littleEndian ? tag : tag - 4] = bytesPerElement == 1 || littleEndian == isLittleEndianMachine ? (buffer) => {
      if (!TypedArray)
        throw new Error("Could not find typed array for code " + tag);
      if (!currentDecoder.copyBuffers) {
        if (bytesPerElement === 1 || bytesPerElement === 2 && !(buffer.byteOffset & 1) || bytesPerElement === 4 && !(buffer.byteOffset & 3) || bytesPerElement === 8 && !(buffer.byteOffset & 7))
          return new TypedArray(buffer.buffer, buffer.byteOffset, buffer.byteLength >> sizeShift);
      }
      return new TypedArray(Uint8Array.prototype.slice.call(buffer, 0).buffer);
    } : (buffer) => {
      if (!TypedArray)
        throw new Error("Could not find typed array for code " + tag);
      let dv = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
      let elements = buffer.length >> sizeShift;
      let ta = new TypedArray(elements);
      let method = dv[dvMethod];
      for (let i = 0; i < elements; i++) {
        ta[i] = method.call(dv, i << sizeShift, littleEndian);
      }
      return ta;
    };
  }
}
function readBundleExt() {
  let length = readJustLength();
  let bundlePosition = position3 + read2();
  for (let i = 2; i < length; i++) {
    let bundleLength = readJustLength();
    position3 += bundleLength;
  }
  let dataPosition = position3;
  position3 = bundlePosition;
  bundledStrings3 = [readStringJS2(readJustLength()), readStringJS2(readJustLength())];
  bundledStrings3.position0 = 0;
  bundledStrings3.position1 = 0;
  bundledStrings3.postBundlePosition = position3;
  position3 = dataPosition;
  return read2();
}
function readJustLength() {
  let token = src2[position3++] & 31;
  if (token > 23) {
    switch (token) {
      case 24:
        token = src2[position3++];
        break;
      case 25:
        token = dataView2.getUint16(position3);
        position3 += 2;
        break;
      case 26:
        token = dataView2.getUint32(position3);
        position3 += 4;
        break;
    }
  }
  return token;
}
function loadShared() {
  if (currentDecoder.getShared) {
    let sharedData = saveState2(() => {
      src2 = null;
      return currentDecoder.getShared();
    }) || {};
    let updatedStructures = sharedData.structures || [];
    currentDecoder.sharedVersion = sharedData.version;
    packedValues = currentDecoder.sharedValues = sharedData.packedValues;
    if (currentStructures2 === true)
      currentDecoder.structures = currentStructures2 = updatedStructures;
    else
      currentStructures2.splice.apply(currentStructures2, [0, updatedStructures.length].concat(updatedStructures));
  }
}
function saveState2(callback) {
  let savedSrcEnd = srcEnd2;
  let savedPosition = position3;
  let savedStringPosition = stringPosition2;
  let savedSrcStringStart = srcStringStart2;
  let savedSrcStringEnd = srcStringEnd2;
  let savedSrcString = srcString2;
  let savedStrings = strings2;
  let savedReferenceMap = referenceMap2;
  let savedBundledStrings = bundledStrings3;
  let savedSrc = new Uint8Array(src2.slice(0, srcEnd2));
  let savedStructures = currentStructures2;
  let savedDecoder = currentDecoder;
  let savedSequentialMode = sequentialMode2;
  let value = callback();
  srcEnd2 = savedSrcEnd;
  position3 = savedPosition;
  stringPosition2 = savedStringPosition;
  srcStringStart2 = savedSrcStringStart;
  srcStringEnd2 = savedSrcStringEnd;
  srcString2 = savedSrcString;
  strings2 = savedStrings;
  referenceMap2 = savedReferenceMap;
  bundledStrings3 = savedBundledStrings;
  src2 = savedSrc;
  sequentialMode2 = savedSequentialMode;
  currentStructures2 = savedStructures;
  currentDecoder = savedDecoder;
  dataView2 = new DataView(src2.buffer, src2.byteOffset, src2.byteLength);
  return value;
}
function clearSource2() {
  src2 = null;
  referenceMap2 = null;
  currentStructures2 = null;
}
var mult102 = new Array(147);
for (let i = 0; i < 256; i++) {
  mult102[i] = +("1e" + Math.floor(45.15 - i * 0.30103));
}
var defaultDecoder = new Decoder2({ useRecords: false });
var decode2 = defaultDecoder.decode;
var decodeMultiple = defaultDecoder.decodeMultiple;
var FLOAT32_OPTIONS2 = {
  NEVER: 0,
  ALWAYS: 1,
  DECIMAL_ROUND: 3,
  DECIMAL_FIT: 4
};

// node_modules/cbor-x/encode.js
var textEncoder2;
try {
  textEncoder2 = new TextEncoder();
} catch (error) {
}
var extensions2;
var extensionClasses2;
var Buffer2 = typeof globalThis === "object" && globalThis.Buffer;
var hasNodeBuffer2 = typeof Buffer2 !== "undefined";
var ByteArrayAllocate2 = hasNodeBuffer2 ? Buffer2.allocUnsafeSlow : Uint8Array;
var ByteArray2 = hasNodeBuffer2 ? Buffer2 : Uint8Array;
var MAX_STRUCTURES = 256;
var MAX_BUFFER_SIZE2 = hasNodeBuffer2 ? 4294967296 : 2144337920;
var throwOnIterable;
var target2;
var targetView2;
var position4 = 0;
var safeEnd2;
var bundledStrings4 = null;
var MAX_BUNDLE_SIZE2 = 61440;
var hasNonLatin2 = /[\u0080-\uFFFF]/;
var RECORD_SYMBOL2 = Symbol("record-id");
var Encoder2 = class extends Decoder2 {
  constructor(options) {
    super(options);
    this.offset = 0;
    let typeBuffer;
    let start;
    let sharedStructures;
    let hasSharedUpdate;
    let structures;
    let referenceMap3;
    options = options || {};
    let encodeUtf8 = ByteArray2.prototype.utf8Write ? function(string, position5, maxBytes) {
      return target2.utf8Write(string, position5, maxBytes);
    } : textEncoder2 && textEncoder2.encodeInto ? function(string, position5) {
      return textEncoder2.encodeInto(string, target2.subarray(position5)).written;
    } : false;
    let encoder = this;
    let hasSharedStructures = options.structures || options.saveStructures;
    let maxSharedStructures = options.maxSharedStructures;
    if (maxSharedStructures == null)
      maxSharedStructures = hasSharedStructures ? 128 : 0;
    if (maxSharedStructures > 8190)
      throw new Error("Maximum maxSharedStructure is 8190");
    let isSequential = options.sequential;
    if (isSequential) {
      maxSharedStructures = 0;
    }
    if (!this.structures)
      this.structures = [];
    if (this.saveStructures)
      this.saveShared = this.saveStructures;
    let samplingPackedValues, packedObjectMap2, sharedValues = options.sharedValues;
    let sharedPackedObjectMap2;
    if (sharedValues) {
      sharedPackedObjectMap2 = /* @__PURE__ */ Object.create(null);
      for (let i = 0, l = sharedValues.length; i < l; i++) {
        sharedPackedObjectMap2[sharedValues[i]] = i;
      }
    }
    let recordIdsToRemove = [];
    let transitionsCount = 0;
    let serializationsSinceTransitionRebuild = 0;
    this.mapEncode = function(value, encodeOptions) {
      if (this._keyMap && !this._mapped) {
        switch (value.constructor.name) {
          case "Array":
            value = value.map((r) => this.encodeKeys(r));
            break;
        }
      }
      return this.encode(value, encodeOptions);
    };
    this.encode = function(value, encodeOptions) {
      if (!target2) {
        target2 = new ByteArrayAllocate2(8192);
        targetView2 = new DataView(target2.buffer, 0, 8192);
        position4 = 0;
      }
      safeEnd2 = target2.length - 10;
      if (safeEnd2 - position4 < 2048) {
        target2 = new ByteArrayAllocate2(target2.length);
        targetView2 = new DataView(target2.buffer, 0, target2.length);
        safeEnd2 = target2.length - 10;
        position4 = 0;
      } else if (encodeOptions === REUSE_BUFFER_MODE2)
        position4 = position4 + 7 & 2147483640;
      start = position4;
      if (encoder.useSelfDescribedHeader) {
        targetView2.setUint32(position4, 3654940416);
        position4 += 3;
      }
      referenceMap3 = encoder.structuredClone ? /* @__PURE__ */ new Map() : null;
      if (encoder.bundleStrings && typeof value !== "string") {
        bundledStrings4 = [];
        bundledStrings4.size = Infinity;
      } else
        bundledStrings4 = null;
      sharedStructures = encoder.structures;
      if (sharedStructures) {
        if (sharedStructures.uninitialized) {
          let sharedData = encoder.getShared() || {};
          encoder.structures = sharedStructures = sharedData.structures || [];
          encoder.sharedVersion = sharedData.version;
          let sharedValues2 = encoder.sharedValues = sharedData.packedValues;
          if (sharedValues2) {
            sharedPackedObjectMap2 = {};
            for (let i = 0, l = sharedValues2.length; i < l; i++)
              sharedPackedObjectMap2[sharedValues2[i]] = i;
          }
        }
        let sharedStructuresLength = sharedStructures.length;
        if (sharedStructuresLength > maxSharedStructures && !isSequential)
          sharedStructuresLength = maxSharedStructures;
        if (!sharedStructures.transitions) {
          sharedStructures.transitions = /* @__PURE__ */ Object.create(null);
          for (let i = 0; i < sharedStructuresLength; i++) {
            let keys = sharedStructures[i];
            if (!keys)
              continue;
            let nextTransition, transition = sharedStructures.transitions;
            for (let j = 0, l = keys.length; j < l; j++) {
              if (transition[RECORD_SYMBOL2] === void 0)
                transition[RECORD_SYMBOL2] = i;
              let key = keys[j];
              nextTransition = transition[key];
              if (!nextTransition) {
                nextTransition = transition[key] = /* @__PURE__ */ Object.create(null);
              }
              transition = nextTransition;
            }
            transition[RECORD_SYMBOL2] = i | 1048576;
          }
        }
        if (!isSequential)
          sharedStructures.nextId = sharedStructuresLength;
      }
      if (hasSharedUpdate)
        hasSharedUpdate = false;
      structures = sharedStructures || [];
      packedObjectMap2 = sharedPackedObjectMap2;
      if (options.pack) {
        let packedValues2 = /* @__PURE__ */ new Map();
        packedValues2.values = [];
        packedValues2.encoder = encoder;
        packedValues2.maxValues = options.maxPrivatePackedValues || (sharedPackedObjectMap2 ? 16 : Infinity);
        packedValues2.objectMap = sharedPackedObjectMap2 || false;
        packedValues2.samplingPackedValues = samplingPackedValues;
        findRepetitiveStrings(value, packedValues2);
        if (packedValues2.values.length > 0) {
          target2[position4++] = 216;
          target2[position4++] = 51;
          writeArrayHeader(4);
          let valuesArray = packedValues2.values;
          encode3(valuesArray);
          writeArrayHeader(0);
          writeArrayHeader(0);
          packedObjectMap2 = Object.create(sharedPackedObjectMap2 || null);
          for (let i = 0, l = valuesArray.length; i < l; i++) {
            packedObjectMap2[valuesArray[i]] = i;
          }
        }
      }
      throwOnIterable = encodeOptions & THROW_ON_ITERABLE;
      try {
        if (throwOnIterable)
          return;
        encode3(value);
        if (bundledStrings4) {
          writeBundles2(start, encode3);
        }
        encoder.offset = position4;
        if (referenceMap3 && referenceMap3.idsToInsert) {
          position4 += referenceMap3.idsToInsert.length * 2;
          if (position4 > safeEnd2)
            makeRoom(position4);
          encoder.offset = position4;
          let serialized = insertIds2(target2.subarray(start, position4), referenceMap3.idsToInsert);
          referenceMap3 = null;
          return serialized;
        }
        if (encodeOptions & REUSE_BUFFER_MODE2) {
          target2.start = start;
          target2.end = position4;
          return target2;
        }
        return target2.subarray(start, position4);
      } finally {
        if (sharedStructures) {
          if (serializationsSinceTransitionRebuild < 10)
            serializationsSinceTransitionRebuild++;
          if (sharedStructures.length > maxSharedStructures)
            sharedStructures.length = maxSharedStructures;
          if (transitionsCount > 1e4) {
            sharedStructures.transitions = null;
            serializationsSinceTransitionRebuild = 0;
            transitionsCount = 0;
            if (recordIdsToRemove.length > 0)
              recordIdsToRemove = [];
          } else if (recordIdsToRemove.length > 0 && !isSequential) {
            for (let i = 0, l = recordIdsToRemove.length; i < l; i++) {
              recordIdsToRemove[i][RECORD_SYMBOL2] = void 0;
            }
            recordIdsToRemove = [];
          }
        }
        if (hasSharedUpdate && encoder.saveShared) {
          if (encoder.structures.length > maxSharedStructures) {
            encoder.structures = encoder.structures.slice(0, maxSharedStructures);
          }
          let returnBuffer = target2.subarray(start, position4);
          if (encoder.updateSharedData() === false)
            return encoder.encode(value);
          return returnBuffer;
        }
        if (encodeOptions & RESET_BUFFER_MODE2)
          position4 = start;
      }
    };
    this.findCommonStringsToPack = () => {
      samplingPackedValues = /* @__PURE__ */ new Map();
      if (!sharedPackedObjectMap2)
        sharedPackedObjectMap2 = /* @__PURE__ */ Object.create(null);
      return (options2) => {
        let threshold = options2 && options2.threshold || 4;
        let position5 = this.pack ? options2.maxPrivatePackedValues || 16 : 0;
        if (!sharedValues)
          sharedValues = this.sharedValues = [];
        for (let [key, status] of samplingPackedValues) {
          if (status.count > threshold) {
            sharedPackedObjectMap2[key] = position5++;
            sharedValues.push(key);
            hasSharedUpdate = true;
          }
        }
        while (this.saveShared && this.updateSharedData() === false) {
        }
        samplingPackedValues = null;
      };
    };
    const encode3 = (value) => {
      if (position4 > safeEnd2)
        target2 = makeRoom(position4);
      var type = typeof value;
      var length;
      if (type === "string") {
        if (packedObjectMap2) {
          let packedPosition = packedObjectMap2[value];
          if (packedPosition >= 0) {
            if (packedPosition < 16)
              target2[position4++] = packedPosition + 224;
            else {
              target2[position4++] = 198;
              if (packedPosition & 1)
                encode3(15 - packedPosition >> 1);
              else
                encode3(packedPosition - 16 >> 1);
            }
            return;
          } else if (samplingPackedValues && !options.pack) {
            let status = samplingPackedValues.get(value);
            if (status)
              status.count++;
            else
              samplingPackedValues.set(value, {
                count: 1
              });
          }
        }
        let strLength = value.length;
        if (bundledStrings4 && strLength >= 4 && strLength < 1024) {
          if ((bundledStrings4.size += strLength) > MAX_BUNDLE_SIZE2) {
            let extStart;
            let maxBytes2 = (bundledStrings4[0] ? bundledStrings4[0].length * 3 + bundledStrings4[1].length : 0) + 10;
            if (position4 + maxBytes2 > safeEnd2)
              target2 = makeRoom(position4 + maxBytes2);
            target2[position4++] = 217;
            target2[position4++] = 223;
            target2[position4++] = 249;
            target2[position4++] = bundledStrings4.position ? 132 : 130;
            target2[position4++] = 26;
            extStart = position4 - start;
            position4 += 4;
            if (bundledStrings4.position) {
              writeBundles2(start, encode3);
            }
            bundledStrings4 = ["", ""];
            bundledStrings4.size = 0;
            bundledStrings4.position = extStart;
          }
          let twoByte = hasNonLatin2.test(value);
          bundledStrings4[twoByte ? 0 : 1] += value;
          target2[position4++] = twoByte ? 206 : 207;
          encode3(strLength);
          return;
        }
        let headerSize;
        if (strLength < 32) {
          headerSize = 1;
        } else if (strLength < 256) {
          headerSize = 2;
        } else if (strLength < 65536) {
          headerSize = 3;
        } else {
          headerSize = 5;
        }
        let maxBytes = strLength * 3;
        if (position4 + maxBytes > safeEnd2)
          target2 = makeRoom(position4 + maxBytes);
        if (strLength < 64 || !encodeUtf8) {
          let i, c1, c2, strPosition = position4 + headerSize;
          for (i = 0; i < strLength; i++) {
            c1 = value.charCodeAt(i);
            if (c1 < 128) {
              target2[strPosition++] = c1;
            } else if (c1 < 2048) {
              target2[strPosition++] = c1 >> 6 | 192;
              target2[strPosition++] = c1 & 63 | 128;
            } else if ((c1 & 64512) === 55296 && ((c2 = value.charCodeAt(i + 1)) & 64512) === 56320) {
              c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
              i++;
              target2[strPosition++] = c1 >> 18 | 240;
              target2[strPosition++] = c1 >> 12 & 63 | 128;
              target2[strPosition++] = c1 >> 6 & 63 | 128;
              target2[strPosition++] = c1 & 63 | 128;
            } else {
              target2[strPosition++] = c1 >> 12 | 224;
              target2[strPosition++] = c1 >> 6 & 63 | 128;
              target2[strPosition++] = c1 & 63 | 128;
            }
          }
          length = strPosition - position4 - headerSize;
        } else {
          length = encodeUtf8(value, position4 + headerSize, maxBytes);
        }
        if (length < 24) {
          target2[position4++] = 96 | length;
        } else if (length < 256) {
          if (headerSize < 2) {
            target2.copyWithin(position4 + 2, position4 + 1, position4 + 1 + length);
          }
          target2[position4++] = 120;
          target2[position4++] = length;
        } else if (length < 65536) {
          if (headerSize < 3) {
            target2.copyWithin(position4 + 3, position4 + 2, position4 + 2 + length);
          }
          target2[position4++] = 121;
          target2[position4++] = length >> 8;
          target2[position4++] = length & 255;
        } else {
          if (headerSize < 5) {
            target2.copyWithin(position4 + 5, position4 + 3, position4 + 3 + length);
          }
          target2[position4++] = 122;
          targetView2.setUint32(position4, length);
          position4 += 4;
        }
        position4 += length;
      } else if (type === "number") {
        if (!this.alwaysUseFloat && value >>> 0 === value) {
          if (value < 24) {
            target2[position4++] = value;
          } else if (value < 256) {
            target2[position4++] = 24;
            target2[position4++] = value;
          } else if (value < 65536) {
            target2[position4++] = 25;
            target2[position4++] = value >> 8;
            target2[position4++] = value & 255;
          } else {
            target2[position4++] = 26;
            targetView2.setUint32(position4, value);
            position4 += 4;
          }
        } else if (!this.alwaysUseFloat && value >> 0 === value) {
          if (value >= -24) {
            target2[position4++] = 31 - value;
          } else if (value >= -256) {
            target2[position4++] = 56;
            target2[position4++] = ~value;
          } else if (value >= -65536) {
            target2[position4++] = 57;
            targetView2.setUint16(position4, ~value);
            position4 += 2;
          } else {
            target2[position4++] = 58;
            targetView2.setUint32(position4, ~value);
            position4 += 4;
          }
        } else {
          let useFloat32;
          if ((useFloat32 = this.useFloat32) > 0 && value < 4294967296 && value >= -2147483648) {
            target2[position4++] = 250;
            targetView2.setFloat32(position4, value);
            let xShifted;
            if (useFloat32 < 4 || // this checks for rounding of numbers that were encoded in 32-bit float to nearest significant decimal digit that could be preserved
            (xShifted = value * mult102[(target2[position4] & 127) << 1 | target2[position4 + 1] >> 7]) >> 0 === xShifted) {
              position4 += 4;
              return;
            } else
              position4--;
          }
          target2[position4++] = 251;
          targetView2.setFloat64(position4, value);
          position4 += 8;
        }
      } else if (type === "object") {
        if (!value)
          target2[position4++] = 246;
        else {
          if (referenceMap3) {
            let referee = referenceMap3.get(value);
            if (referee) {
              target2[position4++] = 216;
              target2[position4++] = 29;
              target2[position4++] = 25;
              if (!referee.references) {
                let idsToInsert = referenceMap3.idsToInsert || (referenceMap3.idsToInsert = []);
                referee.references = [];
                idsToInsert.push(referee);
              }
              referee.references.push(position4 - start);
              position4 += 2;
              return;
            } else
              referenceMap3.set(value, { offset: position4 - start });
          }
          let constructor = value.constructor;
          if (constructor === Object) {
            writeObject(value);
          } else if (constructor === Array) {
            length = value.length;
            if (length < 24) {
              target2[position4++] = 128 | length;
            } else {
              writeArrayHeader(length);
            }
            for (let i = 0; i < length; i++) {
              encode3(value[i]);
            }
          } else if (constructor === Map) {
            if (this.mapsAsObjects ? this.useTag259ForMaps !== false : this.useTag259ForMaps) {
              target2[position4++] = 217;
              target2[position4++] = 1;
              target2[position4++] = 3;
            }
            length = value.size;
            if (length < 24) {
              target2[position4++] = 160 | length;
            } else if (length < 256) {
              target2[position4++] = 184;
              target2[position4++] = length;
            } else if (length < 65536) {
              target2[position4++] = 185;
              target2[position4++] = length >> 8;
              target2[position4++] = length & 255;
            } else {
              target2[position4++] = 186;
              targetView2.setUint32(position4, length);
              position4 += 4;
            }
            if (encoder.keyMap) {
              for (let [key, entryValue] of value) {
                encode3(encoder.encodeKey(key));
                encode3(entryValue);
              }
            } else {
              for (let [key, entryValue] of value) {
                encode3(key);
                encode3(entryValue);
              }
            }
          } else {
            for (let i = 0, l = extensions2.length; i < l; i++) {
              let extensionClass = extensionClasses2[i];
              if (value instanceof extensionClass) {
                let extension = extensions2[i];
                let tag = extension.tag;
                if (tag == void 0)
                  tag = extension.getTag && extension.getTag.call(this, value);
                if (tag < 24) {
                  target2[position4++] = 192 | tag;
                } else if (tag < 256) {
                  target2[position4++] = 216;
                  target2[position4++] = tag;
                } else if (tag < 65536) {
                  target2[position4++] = 217;
                  target2[position4++] = tag >> 8;
                  target2[position4++] = tag & 255;
                } else if (tag > -1) {
                  target2[position4++] = 218;
                  targetView2.setUint32(position4, tag);
                  position4 += 4;
                }
                extension.encode.call(this, value, encode3, makeRoom);
                return;
              }
            }
            if (value[Symbol.iterator]) {
              if (throwOnIterable) {
                let error = new Error("Iterable should be serialized as iterator");
                error.iteratorNotHandled = true;
                throw error;
              }
              target2[position4++] = 159;
              for (let entry of value) {
                encode3(entry);
              }
              target2[position4++] = 255;
              return;
            }
            if (value[Symbol.asyncIterator] || isBlob(value)) {
              let error = new Error("Iterable/blob should be serialized as iterator");
              error.iteratorNotHandled = true;
              throw error;
            }
            if (this.useToJSON && value.toJSON) {
              const json = value.toJSON();
              if (json !== value)
                return encode3(json);
            }
            writeObject(value);
          }
        }
      } else if (type === "boolean") {
        target2[position4++] = value ? 245 : 244;
      } else if (type === "bigint") {
        if (value < BigInt(1) << BigInt(64) && value >= 0) {
          target2[position4++] = 27;
          targetView2.setBigUint64(position4, value);
        } else if (value > -(BigInt(1) << BigInt(64)) && value < 0) {
          target2[position4++] = 59;
          targetView2.setBigUint64(position4, -value - BigInt(1));
        } else {
          if (this.largeBigIntToFloat) {
            target2[position4++] = 251;
            targetView2.setFloat64(position4, Number(value));
          } else {
            if (value >= BigInt(0))
              target2[position4++] = 194;
            else {
              target2[position4++] = 195;
              value = BigInt(-1) - value;
            }
            let bytes = [];
            while (value) {
              bytes.push(Number(value & BigInt(255)));
              value >>= BigInt(8);
            }
            writeBuffer2(new Uint8Array(bytes.reverse()), makeRoom);
            return;
          }
        }
        position4 += 8;
      } else if (type === "undefined") {
        target2[position4++] = 247;
      } else {
        throw new Error("Unknown type: " + type);
      }
    };
    const writeObject = this.useRecords === false ? this.variableMapSize ? (object) => {
      let keys = Object.keys(object);
      let vals = Object.values(object);
      let length = keys.length;
      if (length < 24) {
        target2[position4++] = 160 | length;
      } else if (length < 256) {
        target2[position4++] = 184;
        target2[position4++] = length;
      } else if (length < 65536) {
        target2[position4++] = 185;
        target2[position4++] = length >> 8;
        target2[position4++] = length & 255;
      } else {
        target2[position4++] = 186;
        targetView2.setUint32(position4, length);
        position4 += 4;
      }
      let key;
      if (encoder.keyMap) {
        for (let i = 0; i < length; i++) {
          encode3(encoder.encodeKey(keys[i]));
          encode3(vals[i]);
        }
      } else {
        for (let i = 0; i < length; i++) {
          encode3(keys[i]);
          encode3(vals[i]);
        }
      }
    } : (object) => {
      target2[position4++] = 185;
      let objectOffset = position4 - start;
      position4 += 2;
      let size = 0;
      if (encoder.keyMap) {
        for (let key in object) if (typeof object.hasOwnProperty !== "function" || object.hasOwnProperty(key)) {
          encode3(encoder.encodeKey(key));
          encode3(object[key]);
          size++;
        }
      } else {
        for (let key in object) if (typeof object.hasOwnProperty !== "function" || object.hasOwnProperty(key)) {
          encode3(key);
          encode3(object[key]);
          size++;
        }
      }
      target2[objectOffset++ + start] = size >> 8;
      target2[objectOffset + start] = size & 255;
    } : (object, skipValues) => {
      let nextTransition, transition = structures.transitions || (structures.transitions = /* @__PURE__ */ Object.create(null));
      let newTransitions = 0;
      let length = 0;
      let parentRecordId;
      let keys;
      if (this.keyMap) {
        keys = Object.keys(object).map((k) => this.encodeKey(k));
        length = keys.length;
        for (let i = 0; i < length; i++) {
          let key = keys[i];
          nextTransition = transition[key];
          if (!nextTransition) {
            nextTransition = transition[key] = /* @__PURE__ */ Object.create(null);
            newTransitions++;
          }
          transition = nextTransition;
        }
      } else {
        for (let key in object) if (typeof object.hasOwnProperty !== "function" || object.hasOwnProperty(key)) {
          nextTransition = transition[key];
          if (!nextTransition) {
            if (transition[RECORD_SYMBOL2] & 1048576) {
              parentRecordId = transition[RECORD_SYMBOL2] & 65535;
            }
            nextTransition = transition[key] = /* @__PURE__ */ Object.create(null);
            newTransitions++;
          }
          transition = nextTransition;
          length++;
        }
      }
      let recordId = transition[RECORD_SYMBOL2];
      if (recordId !== void 0) {
        recordId &= 65535;
        target2[position4++] = 217;
        target2[position4++] = recordId >> 8 | 224;
        target2[position4++] = recordId & 255;
      } else {
        if (!keys)
          keys = transition.__keys__ || (transition.__keys__ = Object.keys(object));
        if (parentRecordId === void 0) {
          recordId = structures.nextId++;
          if (!recordId) {
            recordId = 0;
            structures.nextId = 1;
          }
          if (recordId >= MAX_STRUCTURES) {
            structures.nextId = (recordId = maxSharedStructures) + 1;
          }
        } else {
          recordId = parentRecordId;
        }
        structures[recordId] = keys;
        if (recordId < maxSharedStructures) {
          target2[position4++] = 217;
          target2[position4++] = recordId >> 8 | 224;
          target2[position4++] = recordId & 255;
          transition = structures.transitions;
          for (let i = 0; i < length; i++) {
            if (transition[RECORD_SYMBOL2] === void 0 || transition[RECORD_SYMBOL2] & 1048576)
              transition[RECORD_SYMBOL2] = recordId;
            transition = transition[keys[i]];
          }
          transition[RECORD_SYMBOL2] = recordId | 1048576;
          hasSharedUpdate = true;
        } else {
          transition[RECORD_SYMBOL2] = recordId;
          targetView2.setUint32(position4, 3655335680);
          position4 += 3;
          if (newTransitions)
            transitionsCount += serializationsSinceTransitionRebuild * newTransitions;
          if (recordIdsToRemove.length >= MAX_STRUCTURES - maxSharedStructures)
            recordIdsToRemove.shift()[RECORD_SYMBOL2] = void 0;
          recordIdsToRemove.push(transition);
          writeArrayHeader(length + 2);
          encode3(57344 + recordId);
          encode3(keys);
          if (skipValues) return;
          for (let key in object)
            if (typeof object.hasOwnProperty !== "function" || object.hasOwnProperty(key))
              encode3(object[key]);
          return;
        }
      }
      if (length < 24) {
        target2[position4++] = 128 | length;
      } else {
        writeArrayHeader(length);
      }
      if (skipValues) return;
      for (let key in object)
        if (typeof object.hasOwnProperty !== "function" || object.hasOwnProperty(key))
          encode3(object[key]);
    };
    const makeRoom = (end) => {
      let newSize;
      if (end > 16777216) {
        if (end - start > MAX_BUFFER_SIZE2)
          throw new Error("Encoded buffer would be larger than maximum buffer size");
        newSize = Math.min(
          MAX_BUFFER_SIZE2,
          Math.round(Math.max((end - start) * (end > 67108864 ? 1.25 : 2), 4194304) / 4096) * 4096
        );
      } else
        newSize = (Math.max(end - start << 2, target2.length - 1) >> 12) + 1 << 12;
      let newBuffer = new ByteArrayAllocate2(newSize);
      targetView2 = new DataView(newBuffer.buffer, 0, newSize);
      if (target2.copy)
        target2.copy(newBuffer, 0, start, end);
      else
        newBuffer.set(target2.slice(start, end));
      position4 -= start;
      start = 0;
      safeEnd2 = newBuffer.length - 10;
      return target2 = newBuffer;
    };
    let chunkThreshold = 100;
    let continuedChunkThreshold = 1e3;
    this.encodeAsIterable = function(value, options2) {
      return startEncoding(value, options2, encodeObjectAsIterable);
    };
    this.encodeAsAsyncIterable = function(value, options2) {
      return startEncoding(value, options2, encodeObjectAsAsyncIterable);
    };
    function* encodeObjectAsIterable(object, iterateProperties, finalIterable) {
      let constructor = object.constructor;
      if (constructor === Object) {
        let useRecords = encoder.useRecords !== false;
        if (useRecords)
          writeObject(object, true);
        else
          writeEntityLength(Object.keys(object).length, 160);
        for (let key in object) {
          let value = object[key];
          if (!useRecords) encode3(key);
          if (value && typeof value === "object") {
            if (iterateProperties[key])
              yield* encodeObjectAsIterable(value, iterateProperties[key]);
            else
              yield* tryEncode(value, iterateProperties, key);
          } else encode3(value);
        }
      } else if (constructor === Array) {
        let length = object.length;
        writeArrayHeader(length);
        for (let i = 0; i < length; i++) {
          let value = object[i];
          if (value && (typeof value === "object" || position4 - start > chunkThreshold)) {
            if (iterateProperties.element)
              yield* encodeObjectAsIterable(value, iterateProperties.element);
            else
              yield* tryEncode(value, iterateProperties, "element");
          } else encode3(value);
        }
      } else if (object[Symbol.iterator] && !object.buffer) {
        target2[position4++] = 159;
        for (let value of object) {
          if (value && (typeof value === "object" || position4 - start > chunkThreshold)) {
            if (iterateProperties.element)
              yield* encodeObjectAsIterable(value, iterateProperties.element);
            else
              yield* tryEncode(value, iterateProperties, "element");
          } else encode3(value);
        }
        target2[position4++] = 255;
      } else if (isBlob(object)) {
        writeEntityLength(object.size, 64);
        yield target2.subarray(start, position4);
        yield object;
        restartEncoding();
      } else if (object[Symbol.asyncIterator]) {
        target2[position4++] = 159;
        yield target2.subarray(start, position4);
        yield object;
        restartEncoding();
        target2[position4++] = 255;
      } else {
        encode3(object);
      }
      if (finalIterable && position4 > start) yield target2.subarray(start, position4);
      else if (position4 - start > chunkThreshold) {
        yield target2.subarray(start, position4);
        restartEncoding();
      }
    }
    function* tryEncode(value, iterateProperties, key) {
      let restart = position4 - start;
      try {
        encode3(value);
        if (position4 - start > chunkThreshold) {
          yield target2.subarray(start, position4);
          restartEncoding();
        }
      } catch (error) {
        if (error.iteratorNotHandled) {
          iterateProperties[key] = {};
          position4 = start + restart;
          yield* encodeObjectAsIterable.call(this, value, iterateProperties[key]);
        } else throw error;
      }
    }
    function restartEncoding() {
      chunkThreshold = continuedChunkThreshold;
      encoder.encode(null, THROW_ON_ITERABLE);
    }
    function startEncoding(value, options2, encodeIterable) {
      if (options2 && options2.chunkThreshold)
        chunkThreshold = continuedChunkThreshold = options2.chunkThreshold;
      else
        chunkThreshold = 100;
      if (value && typeof value === "object") {
        encoder.encode(null, THROW_ON_ITERABLE);
        return encodeIterable(value, encoder.iterateProperties || (encoder.iterateProperties = {}), true);
      }
      return [encoder.encode(value)];
    }
    async function* encodeObjectAsAsyncIterable(value, iterateProperties) {
      for (let encodedValue of encodeObjectAsIterable(value, iterateProperties, true)) {
        let constructor = encodedValue.constructor;
        if (constructor === ByteArray2 || constructor === Uint8Array)
          yield encodedValue;
        else if (isBlob(encodedValue)) {
          let reader = encodedValue.stream().getReader();
          let next;
          while (!(next = await reader.read()).done) {
            yield next.value;
          }
        } else if (encodedValue[Symbol.asyncIterator]) {
          for await (let asyncValue of encodedValue) {
            restartEncoding();
            if (asyncValue)
              yield* encodeObjectAsAsyncIterable(asyncValue, iterateProperties.async || (iterateProperties.async = {}));
            else yield encoder.encode(asyncValue);
          }
        } else {
          yield encodedValue;
        }
      }
    }
  }
  useBuffer(buffer) {
    target2 = buffer;
    targetView2 = new DataView(target2.buffer, target2.byteOffset, target2.byteLength);
    position4 = 0;
  }
  clearSharedData() {
    if (this.structures)
      this.structures = [];
    if (this.sharedValues)
      this.sharedValues = void 0;
  }
  updateSharedData() {
    let lastVersion = this.sharedVersion || 0;
    this.sharedVersion = lastVersion + 1;
    let structuresCopy = this.structures.slice(0);
    let sharedData = new SharedData(structuresCopy, this.sharedValues, this.sharedVersion);
    let saveResults = this.saveShared(
      sharedData,
      (existingShared) => (existingShared && existingShared.version || 0) == lastVersion
    );
    if (saveResults === false) {
      sharedData = this.getShared() || {};
      this.structures = sharedData.structures || [];
      this.sharedValues = sharedData.packedValues;
      this.sharedVersion = sharedData.version;
      this.structures.nextId = this.structures.length;
    } else {
      structuresCopy.forEach((structure, i) => this.structures[i] = structure);
    }
    return saveResults;
  }
};
function writeEntityLength(length, majorValue) {
  if (length < 24)
    target2[position4++] = majorValue | length;
  else if (length < 256) {
    target2[position4++] = majorValue | 24;
    target2[position4++] = length;
  } else if (length < 65536) {
    target2[position4++] = majorValue | 25;
    target2[position4++] = length >> 8;
    target2[position4++] = length & 255;
  } else {
    target2[position4++] = majorValue | 26;
    targetView2.setUint32(position4, length);
    position4 += 4;
  }
}
var SharedData = class {
  constructor(structures, values, version) {
    this.structures = structures;
    this.packedValues = values;
    this.version = version;
  }
};
function writeArrayHeader(length) {
  if (length < 24)
    target2[position4++] = 128 | length;
  else if (length < 256) {
    target2[position4++] = 152;
    target2[position4++] = length;
  } else if (length < 65536) {
    target2[position4++] = 153;
    target2[position4++] = length >> 8;
    target2[position4++] = length & 255;
  } else {
    target2[position4++] = 154;
    targetView2.setUint32(position4, length);
    position4 += 4;
  }
}
var BlobConstructor = typeof Blob === "undefined" ? function() {
} : Blob;
function isBlob(object) {
  if (object instanceof BlobConstructor)
    return true;
  let tag = object[Symbol.toStringTag];
  return tag === "Blob" || tag === "File";
}
function findRepetitiveStrings(value, packedValues2) {
  switch (typeof value) {
    case "string":
      if (value.length > 3) {
        if (packedValues2.objectMap[value] > -1 || packedValues2.values.length >= packedValues2.maxValues)
          return;
        let packedStatus = packedValues2.get(value);
        if (packedStatus) {
          if (++packedStatus.count == 2) {
            packedValues2.values.push(value);
          }
        } else {
          packedValues2.set(value, {
            count: 1
          });
          if (packedValues2.samplingPackedValues) {
            let status = packedValues2.samplingPackedValues.get(value);
            if (status)
              status.count++;
            else
              packedValues2.samplingPackedValues.set(value, {
                count: 1
              });
          }
        }
      }
      break;
    case "object":
      if (value) {
        if (value instanceof Array) {
          for (let i = 0, l = value.length; i < l; i++) {
            findRepetitiveStrings(value[i], packedValues2);
          }
        } else {
          let includeKeys = !packedValues2.encoder.useRecords;
          for (var key in value) {
            if (value.hasOwnProperty(key)) {
              if (includeKeys)
                findRepetitiveStrings(key, packedValues2);
              findRepetitiveStrings(value[key], packedValues2);
            }
          }
        }
      }
      break;
    case "function":
      console.log(value);
  }
}
var isLittleEndianMachine2 = new Uint8Array(new Uint16Array([1]).buffer)[0] == 1;
extensionClasses2 = [
  Date,
  Set,
  Error,
  RegExp,
  Tag,
  ArrayBuffer,
  Uint8Array,
  Uint8ClampedArray,
  Uint16Array,
  Uint32Array,
  typeof BigUint64Array == "undefined" ? function() {
  } : BigUint64Array,
  Int8Array,
  Int16Array,
  Int32Array,
  typeof BigInt64Array == "undefined" ? function() {
  } : BigInt64Array,
  Float32Array,
  Float64Array,
  SharedData
];
extensions2 = [
  {
    // Date
    tag: 1,
    encode(date, encode3) {
      let seconds = date.getTime() / 1e3;
      if ((this.useTimestamp32 || date.getMilliseconds() === 0) && seconds >= 0 && seconds < 4294967296) {
        target2[position4++] = 26;
        targetView2.setUint32(position4, seconds);
        position4 += 4;
      } else {
        target2[position4++] = 251;
        targetView2.setFloat64(position4, seconds);
        position4 += 8;
      }
    }
  },
  {
    // Set
    tag: 258,
    // https://github.com/input-output-hk/cbor-sets-spec/blob/master/CBOR_SETS.md
    encode(set, encode3) {
      let array = Array.from(set);
      encode3(array);
    }
  },
  {
    // Error
    tag: 27,
    // http://cbor.schmorp.de/generic-object
    encode(error, encode3) {
      encode3([error.name, error.message]);
    }
  },
  {
    // RegExp
    tag: 27,
    // http://cbor.schmorp.de/generic-object
    encode(regex, encode3) {
      encode3(["RegExp", regex.source, regex.flags]);
    }
  },
  {
    // Tag
    getTag(tag) {
      return tag.tag;
    },
    encode(tag, encode3) {
      encode3(tag.value);
    }
  },
  {
    // ArrayBuffer
    encode(arrayBuffer, encode3, makeRoom) {
      writeBuffer2(arrayBuffer, makeRoom);
    }
  },
  {
    // Uint8Array
    getTag(typedArray) {
      if (typedArray.constructor === Uint8Array) {
        if (this.tagUint8Array || hasNodeBuffer2 && this.tagUint8Array !== false)
          return 64;
      }
    },
    encode(typedArray, encode3, makeRoom) {
      writeBuffer2(typedArray, makeRoom);
    }
  },
  typedArrayEncoder(68, 1),
  typedArrayEncoder(69, 2),
  typedArrayEncoder(70, 4),
  typedArrayEncoder(71, 8),
  typedArrayEncoder(72, 1),
  typedArrayEncoder(77, 2),
  typedArrayEncoder(78, 4),
  typedArrayEncoder(79, 8),
  typedArrayEncoder(85, 4),
  typedArrayEncoder(86, 8),
  {
    encode(sharedData, encode3) {
      let packedValues2 = sharedData.packedValues || [];
      let sharedStructures = sharedData.structures || [];
      if (packedValues2.values.length > 0) {
        target2[position4++] = 216;
        target2[position4++] = 51;
        writeArrayHeader(4);
        let valuesArray = packedValues2.values;
        encode3(valuesArray);
        writeArrayHeader(0);
        writeArrayHeader(0);
        packedObjectMap = Object.create(sharedPackedObjectMap || null);
        for (let i = 0, l = valuesArray.length; i < l; i++) {
          packedObjectMap[valuesArray[i]] = i;
        }
      }
      if (sharedStructures) {
        targetView2.setUint32(position4, 3655335424);
        position4 += 3;
        let definitions = sharedStructures.slice(0);
        definitions.unshift(57344);
        definitions.push(new Tag(sharedData.version, 1399353956));
        encode3(definitions);
      } else
        encode3(new Tag(sharedData.version, 1399353956));
    }
  }
];
function typedArrayEncoder(tag, size) {
  if (!isLittleEndianMachine2 && size > 1)
    tag -= 4;
  return {
    tag,
    encode: function writeExtBuffer2(typedArray, encode3) {
      let length = typedArray.byteLength;
      let offset = typedArray.byteOffset || 0;
      let buffer = typedArray.buffer || typedArray;
      encode3(hasNodeBuffer2 ? Buffer2.from(buffer, offset, length) : new Uint8Array(buffer, offset, length));
    }
  };
}
function writeBuffer2(buffer, makeRoom) {
  let length = buffer.byteLength;
  if (length < 24) {
    target2[position4++] = 64 + length;
  } else if (length < 256) {
    target2[position4++] = 88;
    target2[position4++] = length;
  } else if (length < 65536) {
    target2[position4++] = 89;
    target2[position4++] = length >> 8;
    target2[position4++] = length & 255;
  } else {
    target2[position4++] = 90;
    targetView2.setUint32(position4, length);
    position4 += 4;
  }
  if (position4 + length >= target2.length) {
    makeRoom(position4 + length);
  }
  target2.set(buffer.buffer ? buffer : new Uint8Array(buffer), position4);
  position4 += length;
}
function insertIds2(serialized, idsToInsert) {
  let nextId;
  let distanceToMove = idsToInsert.length * 2;
  let lastEnd = serialized.length - distanceToMove;
  idsToInsert.sort((a, b) => a.offset > b.offset ? 1 : -1);
  for (let id = 0; id < idsToInsert.length; id++) {
    let referee = idsToInsert[id];
    referee.id = id;
    for (let position5 of referee.references) {
      serialized[position5++] = id >> 8;
      serialized[position5] = id & 255;
    }
  }
  while (nextId = idsToInsert.pop()) {
    let offset = nextId.offset;
    serialized.copyWithin(offset + distanceToMove, offset, lastEnd);
    distanceToMove -= 2;
    let position5 = offset + distanceToMove;
    serialized[position5++] = 216;
    serialized[position5++] = 28;
    lastEnd = offset;
  }
  return serialized;
}
function writeBundles2(start, encode3) {
  targetView2.setUint32(bundledStrings4.position + start, position4 - bundledStrings4.position - start + 1);
  let writeStrings = bundledStrings4;
  bundledStrings4 = null;
  encode3(writeStrings[0]);
  encode3(writeStrings[1]);
}
var defaultEncoder = new Encoder2({ useRecords: false });
var encode2 = defaultEncoder.encode;
var encodeAsIterable = defaultEncoder.encodeAsIterable;
var encodeAsAsyncIterable = defaultEncoder.encodeAsAsyncIterable;
var { NEVER: NEVER2, ALWAYS: ALWAYS2, DECIMAL_ROUND: DECIMAL_ROUND2, DECIMAL_FIT: DECIMAL_FIT2 } = FLOAT32_OPTIONS2;
var REUSE_BUFFER_MODE2 = 512;
var RESET_BUFFER_MODE2 = 1024;
var THROW_ON_ITERABLE = 2048;

// node_modules/bebop/dist/index.mjs
var __require2 = /* @__PURE__ */ ((x) => typeof __require !== "undefined" ? __require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof __require !== "undefined" ? __require : a)[b]
}) : x)(function(x) {
  if (typeof __require !== "undefined")
    return __require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var decoder3 = new TextDecoder();
var hexDigits = "0123456789abcdef";
var asciiToHex = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  10,
  11,
  12,
  13,
  14,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  10,
  11,
  12,
  13,
  14,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
];
var guidDelimiter = "-";
var ticksBetweenEpochs = 621355968000000000n;
var dateMask = 0x3fffffffffffffffn;
var emptyByteArray = new Uint8Array(0);
var emptyString = "";
var byteToHex = [];
for (const x of hexDigits) {
  for (const y of hexDigits) {
    byteToHex.push(x + y);
  }
}
var hasCryptoGetRandomValues = typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function";
var BebopRuntimeError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "BebopRuntimeError";
  }
};
var Guid = class _Guid {
  /**
     * Constructs a new Guid object with the specified value.
     * @param value The value of the GUID.
     */
  constructor(value) {
    this.value = value;
  }
  static empty = new _Guid("00000000-0000-0000-0000-000000000000");
  /**
   * Gets the string value of the Guid.
   * @returns The string representation of the Guid.
   */
  toString() {
    return this.value;
  }
  /**
    * Checks if the Guid is empty.
    * @returns true if the Guid is empty, false otherwise.
    */
  isEmpty() {
    return this.value === _Guid.empty.value;
  }
  /**
   * Checks if a value is a Guid.
   * @param value The value to be checked.
   * @returns true if the value is a Guid, false otherwise.
   */
  static isGuid(value) {
    return value instanceof _Guid;
  }
  /**
  * Parses a string into a Guid.
  * @param value The string to be parsed.
  * @returns A new Guid that represents the parsed value.
  * @throws {BebopRuntimeError} If the input string is not a valid Guid.
  */
  static parseGuid(value) {
    let cleanedInput = "";
    let count = 0;
    for (let i = 0; i < value.length; i++) {
      let ch = value[i].toLowerCase();
      if (hexDigits.indexOf(ch) !== -1) {
        cleanedInput += ch;
        count++;
      } else if (ch !== "-") {
        throw new BebopRuntimeError(`Invalid GUID: ${value}`);
      }
    }
    if (count !== 32) {
      throw new BebopRuntimeError(`Invalid GUID: ${value}`);
    }
    const guidString = cleanedInput.slice(0, 8) + "-" + cleanedInput.slice(8, 12) + "-" + cleanedInput.slice(12, 16) + "-" + cleanedInput.slice(16, 20) + "-" + cleanedInput.slice(20);
    return new _Guid(guidString);
  }
  /**
  * Creates a an insecure new Guid using Math.random.
  * @returns A new Guid.
  */
  static newGuid() {
    let guid = "";
    const now = Date.now();
    for (let i = 0; i < 36; i++) {
      if (i === 8 || i === 13 || i === 18 || i === 23) {
        guid += "-";
      } else if (i === 14) {
        guid += "4";
      } else if (i === 19) {
        guid += Math.random() > 0.5 ? "a" : "b";
      } else {
        guid += hexDigits[(Math.random() * 16 + now) % 16 | 0];
      }
    }
    return new _Guid(guid);
  }
  /**
  * Creates a new cryptographically secure Guid using Crypto.getRandomValues.
  * @returns A new secure Guid.
  * @throws {BebopRuntimeError} If Crypto.getRandomValues is not available.
  */
  static newSecureGuid() {
    if (!hasCryptoGetRandomValues) {
      throw new BebopRuntimeError(
        "Crypto.getRandomValues is not available. Please include a polyfill or use in an environment that supports it."
      );
    }
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = bytes[6] & 15 | 64;
    bytes[8] = bytes[8] & 63 | 128;
    return _Guid.fromBytes(bytes, 0);
  }
  /**
  * Checks if the Guid is equal to another Guid.
  * @param other The other Guid to be compared with.
  * @returns true if the Guids are equal, false otherwise.
  */
  equals(other) {
    if (this === other) {
      return true;
    }
    if (!(other instanceof _Guid)) {
      return false;
    }
    for (let i = 0; i < this.value.length; i++) {
      if (this.value[i] !== other.value[i]) {
        return false;
      }
    }
    return true;
  }
  /**
  * Writes the Guid to a DataView.
  * @param view The DataView to write to.
  * @param length The position to start writing at.
  */
  writeToView(view, length) {
    var p = 0, a = 0;
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    p += this.value.charCodeAt(p) === 45;
    view.setUint32(length, a, true);
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    p += this.value.charCodeAt(p) === 45;
    view.setUint16(length + 4, a, true);
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    p += this.value.charCodeAt(p) === 45;
    view.setUint16(length + 6, a, true);
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    p += this.value.charCodeAt(p) === 45;
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    view.setUint32(length + 8, a, false);
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    a = a << 4 | asciiToHex[this.value.charCodeAt(p++)];
    view.setUint32(length + 12, a, false);
  }
  /**
  * Creates a Guid from a byte array.
  * @param buffer The byte array to create the Guid from.
  * @param index The position in the array to start reading from.
  * @returns A new Guid that represents the byte array.
  */
  static fromBytes(buffer, index) {
    var s = byteToHex[buffer[index + 3]];
    s += byteToHex[buffer[index + 2]];
    s += byteToHex[buffer[index + 1]];
    s += byteToHex[buffer[index]];
    s += guidDelimiter;
    s += byteToHex[buffer[index + 5]];
    s += byteToHex[buffer[index + 4]];
    s += guidDelimiter;
    s += byteToHex[buffer[index + 7]];
    s += byteToHex[buffer[index + 6]];
    s += guidDelimiter;
    s += byteToHex[buffer[index + 8]];
    s += byteToHex[buffer[index + 9]];
    s += guidDelimiter;
    s += byteToHex[buffer[index + 10]];
    s += byteToHex[buffer[index + 11]];
    s += byteToHex[buffer[index + 12]];
    s += byteToHex[buffer[index + 13]];
    s += byteToHex[buffer[index + 14]];
    s += byteToHex[buffer[index + 15]];
    return new _Guid(s);
  }
  /**
  * Converts the Guid to a string when it's used as a primitive.
  * @returns The string representation of the Guid.
  */
  [Symbol.toPrimitive](hint) {
    if (hint === "string" || hint === "default") {
      return this.toString();
    }
    throw new Error(`Guid cannot be converted to ${hint}`);
  }
};
var GuidMap = class _GuidMap {
  map;
  /**
   * Creates a new GuidMap instance.
   * @param entries - An optional array or iterable containing key-value pairs to initialize the map.
   */
  constructor(entries) {
    if (entries instanceof Map) {
      this.map = new Map(
        entries
      );
    } else if (entries && typeof entries[Symbol.iterator] === "function") {
      this.map = new Map(
        [...entries].map(([key, value]) => [key.toString(), value])
      );
    } else {
      this.map = /* @__PURE__ */ new Map();
    }
  }
  /**
   * Sets the value associated with the specified `Guid` key in the map.
   * @param key The `Guid` key.
   * @param value The value to be set.
   * @returns The updated `GuidMap` instance.
   */
  set(key, value) {
    this.map.set(key.toString(), value);
    return this;
  }
  /**
   * Retrieves the value associated with the specified `Guid` key from the map.
   * @param key The `Guid` key.
   * @returns The associated value, or `undefined` if the key is not found.
   */
  get(key) {
    return this.map.get(key.toString());
  }
  /**
   * Deletes the value associated with the specified `Guid` key from the map.
   * @param key The `Guid` key.
   * @returns `true` if the key was found and deleted, or `false` otherwise.
   */
  delete(key) {
    return this.map.delete(key.toString());
  }
  /**
   * Checks if the map contains the specified `Guid` key.
   * @param key The `Guid` key.
   * @returns `true` if the key is found, or `false` otherwise.
   */
  has(key) {
    return this.map.has(key.toString());
  }
  /**
   * Removes all entries from the map.
   */
  clear() {
    this.map.clear();
  }
  /**
   * Returns the number of entries in the map.
   * @returns The number of entries in the map.
   */
  get size() {
    return this.map.size;
  }
  /**
   * Executes the provided callback function once for each key-value pair in the map.
   * @param callbackFn The callback function to execute.
   */
  forEach(callbackFn) {
    this.map.forEach((value, keyString) => {
      callbackFn(value, Guid.parseGuid(keyString), this);
    });
  }
  /**
   * Returns an iterator that yields key-value pairs in the map.
   * @returns An iterator for key-value pairs in the map.
   */
  *entries() {
    for (const [keyString, value] of this.map.entries()) {
      yield [Guid.parseGuid(keyString), value];
    }
  }
  /**
   * Returns an iterator that yields the keys of the map.
   * @returns An iterator for the keys of the map.
   */
  *keys() {
    for (const keyString of this.map.keys()) {
      yield Guid.parseGuid(keyString);
    }
  }
  /**
   * Returns an iterator that yields the values in the map.
   * @returns An iterator for the values in the map.
   */
  *values() {
    yield* this.map.values();
  }
  /**
   * Returns an iterator that yields key-value pairs in the map.
   * This method is invoked when using the spread operator or destructuring the map.
   * @returns An iterator for key-value pairs in the map.
   */
  [Symbol.iterator]() {
    return this.entries();
  }
  /**
   * The constructor function used to create derived objects.
   */
  get [Symbol.species]() {
    return _GuidMap;
  }
};
var BebopView = class _BebopView {
  static textDecoder;
  static writeBuffer = new Uint8Array(256);
  static writeBufferView = new DataView(_BebopView.writeBuffer.buffer);
  static instance;
  static getInstance() {
    if (!_BebopView.instance) {
      _BebopView.instance = new _BebopView();
    }
    return _BebopView.instance;
  }
  minimumTextDecoderLength = 300;
  buffer;
  view;
  index;
  // read pointer
  length;
  // write pointer
  constructor() {
    this.buffer = _BebopView.writeBuffer;
    this.view = _BebopView.writeBufferView;
    this.index = 0;
    this.length = 0;
  }
  startReading(buffer) {
    this.buffer = buffer;
    this.view = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
    this.index = 0;
    this.length = buffer.length;
  }
  startWriting() {
    this.buffer = _BebopView.writeBuffer;
    this.view = _BebopView.writeBufferView;
    this.index = 0;
    this.length = 0;
  }
  guaranteeBufferLength(length) {
    if (length > this.buffer.length) {
      const data = new Uint8Array(length << 1);
      data.set(this.buffer);
      this.buffer = data;
      this.view = new DataView(data.buffer);
    }
  }
  growBy(amount) {
    this.length += amount;
    this.guaranteeBufferLength(this.length);
  }
  skip(amount) {
    this.index += amount;
  }
  toArray() {
    return this.buffer.subarray(0, this.length);
  }
  readByte() {
    return this.buffer[this.index++];
  }
  readUint16() {
    const result = this.view.getUint16(this.index, true);
    this.index += 2;
    return result;
  }
  readInt16() {
    const result = this.view.getInt16(this.index, true);
    this.index += 2;
    return result;
  }
  readUint32() {
    const result = this.view.getUint32(this.index, true);
    this.index += 4;
    return result;
  }
  readInt32() {
    const result = this.view.getInt32(this.index, true);
    this.index += 4;
    return result;
  }
  readUint64() {
    const result = this.view.getBigUint64(this.index, true);
    this.index += 8;
    return result;
  }
  readInt64() {
    const result = this.view.getBigInt64(this.index, true);
    this.index += 8;
    return result;
  }
  readFloat32() {
    const result = this.view.getFloat32(this.index, true);
    this.index += 4;
    return result;
  }
  readFloat64() {
    const result = this.view.getFloat64(this.index, true);
    this.index += 8;
    return result;
  }
  writeByte(value) {
    const index = this.length;
    this.growBy(1);
    this.buffer[index] = value;
  }
  writeUint16(value) {
    const index = this.length;
    this.growBy(2);
    this.view.setUint16(index, value, true);
  }
  writeInt16(value) {
    const index = this.length;
    this.growBy(2);
    this.view.setInt16(index, value, true);
  }
  writeUint32(value) {
    const index = this.length;
    this.growBy(4);
    this.view.setUint32(index, value, true);
  }
  writeInt32(value) {
    const index = this.length;
    this.growBy(4);
    this.view.setInt32(index, value, true);
  }
  writeUint64(value) {
    const index = this.length;
    this.growBy(8);
    this.view.setBigUint64(index, value, true);
  }
  writeInt64(value) {
    const index = this.length;
    this.growBy(8);
    this.view.setBigInt64(index, value, true);
  }
  writeFloat32(value) {
    const index = this.length;
    this.growBy(4);
    this.view.setFloat32(index, value, true);
  }
  writeFloat64(value) {
    const index = this.length;
    this.growBy(8);
    this.view.setFloat64(index, value, true);
  }
  readBytes() {
    const length = this.readUint32();
    if (length === 0) {
      return emptyByteArray;
    }
    const start = this.index, end = start + length;
    this.index = end;
    return this.buffer.subarray(start, end);
  }
  writeBytes(value) {
    const byteCount = value.length;
    this.writeUint32(byteCount);
    if (byteCount === 0) {
      return;
    }
    const index = this.length;
    this.growBy(byteCount);
    this.buffer.set(value, index);
  }
  /**
   * Reads a length-prefixed UTF-8-encoded string.
   */
  readString() {
    const lengthBytes = this.readUint32();
    if (lengthBytes === 0) {
      return emptyString;
    }
    if (lengthBytes >= this.minimumTextDecoderLength) {
      if (typeof __require2 !== "undefined") {
        if (typeof TextDecoder === "undefined") {
          throw new BebopRuntimeError("TextDecoder is not defined on 'global'. Please include a polyfill.");
        }
      }
      if (_BebopView.textDecoder === void 0) {
        _BebopView.textDecoder = new TextDecoder();
      }
      return _BebopView.textDecoder.decode(this.buffer.subarray(this.index, this.index += lengthBytes));
    }
    const end = this.index + lengthBytes;
    let result = "";
    let codePoint;
    while (this.index < end) {
      const a = this.buffer[this.index++];
      if (a < 192) {
        codePoint = a;
      } else {
        const b = this.buffer[this.index++];
        if (a < 224) {
          codePoint = (a & 31) << 6 | b & 63;
        } else {
          const c = this.buffer[this.index++];
          if (a < 240) {
            codePoint = (a & 15) << 12 | (b & 63) << 6 | c & 63;
          } else {
            const d = this.buffer[this.index++];
            codePoint = (a & 7) << 18 | (b & 63) << 12 | (c & 63) << 6 | d & 63;
          }
        }
      }
      if (codePoint < 65536) {
        result += String.fromCharCode(codePoint);
      } else {
        codePoint -= 65536;
        result += String.fromCharCode((codePoint >> 10) + 55296, (codePoint & (1 << 10) - 1) + 56320);
      }
    }
    this.index = end;
    return result;
  }
  /**
   * Writes a length-prefixed UTF-8-encoded string.
   */
  writeString(value) {
    const stringLength = value.length;
    if (stringLength === 0) {
      this.writeUint32(0);
      return;
    }
    const maxBytes = 4 + stringLength * 3;
    this.guaranteeBufferLength(this.length + maxBytes);
    let w = this.length + 4;
    const start = w;
    let codePoint;
    for (let i = 0; i < stringLength; i++) {
      const a = value.charCodeAt(i);
      if (i + 1 === stringLength || a < 55296 || a >= 56320) {
        codePoint = a;
      } else {
        const b = value.charCodeAt(++i);
        codePoint = (a << 10) + b + (65536 - (55296 << 10) - 56320);
      }
      if (codePoint < 128) {
        this.buffer[w++] = codePoint;
      } else {
        if (codePoint < 2048) {
          this.buffer[w++] = codePoint >> 6 & 31 | 192;
        } else {
          if (codePoint < 65536) {
            this.buffer[w++] = codePoint >> 12 & 15 | 224;
          } else {
            this.buffer[w++] = codePoint >> 18 & 7 | 240;
            this.buffer[w++] = codePoint >> 12 & 63 | 128;
          }
          this.buffer[w++] = codePoint >> 6 & 63 | 128;
        }
        this.buffer[w++] = codePoint & 63 | 128;
      }
    }
    const written = w - start;
    this.view.setUint32(this.length, written, true);
    this.length += 4 + written;
  }
  readGuid() {
    const guid = Guid.fromBytes(this.buffer, this.index);
    this.index += 16;
    return guid;
  }
  writeGuid(value) {
    const i = this.length;
    this.growBy(16);
    value.writeToView(this.view, i);
  }
  // A note on these numbers:
  // 62135596800000 ms is the difference between the C# epoch (0001-01-01) and the Unix epoch (1970-01-01).
  // 0.0001 is the number of milliseconds per "tick" (a tick is 100 ns).
  // 429496.7296 is the number of milliseconds in 2^32 ticks.
  // 0x3fffffff is a mask to ignore the "Kind" bits of the Date.ToBinary value.
  // 0x40000000 is a mask to set the "Kind" bits to "DateTimeKind.Utc".
  readDate() {
    const ticks = this.readUint64() & dateMask;
    const ms = (ticks - ticksBetweenEpochs) / 10000n;
    return new Date(Number(ms));
  }
  writeDate(date) {
    const ms = BigInt(date.getTime());
    const ticks = ms * 10000n + ticksBetweenEpochs;
    this.writeUint64(ticks & dateMask);
  }
  /**
   * Reserve some space to write a message's length prefix, and return its index.
   * The length is stored as a little-endian fixed-width unsigned 32-bit integer, so 4 bytes are reserved.
   */
  reserveMessageLength() {
    const i = this.length;
    this.growBy(4);
    return i;
  }
  /**
   * Fill in a message's length prefix.
   */
  fillMessageLength(position5, messageLength) {
    this.view.setUint32(position5, messageLength, true);
  }
  /**
   * Read out a message's length prefix.
   */
  readMessageLength() {
    const result = this.view.getUint32(this.index, true);
    this.index += 4;
    return result;
  }
};
var typeMarker = "#btype";
var keyMarker = "#ktype";
var mapTag = 1;
var dateTag = 2;
var uint8ArrayTag = 3;
var bigIntTag = 4;
var guidTag = 5;
var mapGuidTag = 6;
var boolTag = 7;
var stringTag = 8;
var numberTag = 9;
var castScalarByTag = (value, tag) => {
  switch (tag) {
    case bigIntTag:
      return BigInt(value);
    case boolTag:
      return Boolean(value);
    case stringTag:
      return value;
    case numberTag:
      return Number(value);
    default:
      throw new BebopRuntimeError(`Unknown scalar tag: ${tag}`);
  }
};
var getMapKeyTag = (map) => {
  if (map.size === 0) {
    throw new BebopRuntimeError("Cannot determine key type of an empty map.");
  }
  const keyType = typeof map.keys().next().value;
  let keyTag;
  switch (keyType) {
    case "string":
      keyTag = stringTag;
      break;
    case "number":
      keyTag = numberTag;
      break;
    case "boolean":
      keyTag = boolTag;
      break;
    case "bigint":
      keyTag = bigIntTag;
      break;
    default:
      throw new BebopRuntimeError(`Not suitable map type tag found. Keys must be strings, numbers, booleans, or BigInts: ${keyType}`);
  }
  return keyTag;
};
var replacer = (_key, value) => {
  if (value === null)
    return value;
  switch (typeof value) {
    case "bigint":
      return { [typeMarker]: bigIntTag, value: value.toString() };
    case "string":
    case "number":
    case "boolean":
      return value;
  }
  if (value instanceof Date) {
    const ms = BigInt(value.getTime());
    const ticks = ms * 10000n + ticksBetweenEpochs;
    return { [typeMarker]: dateTag, value: (ticks & dateMask).toString() };
  }
  if (value instanceof Uint8Array) {
    return { [typeMarker]: uint8ArrayTag, value: Array.from(value) };
  }
  if (value instanceof Guid) {
    return { [typeMarker]: guidTag, value: value.toString() };
  }
  if (value instanceof GuidMap) {
    const obj = {};
    for (let [k, v] of value.entries()) {
      obj[k.toString()] = replacer(_key, v);
    }
    return { [typeMarker]: mapGuidTag, value: obj };
  }
  if (value instanceof Map) {
    const obj = {};
    let keyTag = getMapKeyTag(value);
    if (keyTag === void 0) {
      throw new BebopRuntimeError("Not suitable map key type tag found.");
    }
    for (let [k, v] of value.entries()) {
      obj[k] = replacer(_key, v);
    }
    return { [typeMarker]: mapTag, [keyMarker]: keyTag, value: obj };
  }
  if (Array.isArray(value)) {
    return value.map((v, i) => replacer(i, v));
  }
  if (typeof value === "object") {
    const newObj = {};
    for (let k in value) {
      newObj[k] = replacer(k, value[k]);
    }
    return newObj;
  }
  return value;
};
var reviver = (_key, value) => {
  if (_key === "__proto__" || _key === "prototype" || _key === "constructor")
    throw new BebopRuntimeError("potential prototype pollution");
  if (value && typeof value === "object" && !Array.isArray(value)) {
    if (value[typeMarker]) {
      switch (value[typeMarker]) {
        case bigIntTag:
          return BigInt(value.value);
        case dateTag:
          const ticks = BigInt(value.value) & dateMask;
          const ms = (ticks - ticksBetweenEpochs) / 10000n;
          return new Date(Number(ms));
        case uint8ArrayTag:
          return new Uint8Array(value.value);
        case mapTag:
          const keyTag = value[keyMarker];
          if (keyTag === void 0 || keyTag === null) {
            throw new BebopRuntimeError("Map key type tag not found.");
          }
          const map = /* @__PURE__ */ new Map();
          for (let k in value.value) {
            const trueKey = castScalarByTag(k, keyTag);
            map.set(trueKey, reviver(k, value.value[k]));
          }
          return map;
        case guidTag:
          return Guid.parseGuid(value.value);
        case mapGuidTag:
          const guidMap = new GuidMap();
          for (let k in value.value) {
            guidMap.set(Guid.parseGuid(k), reviver(k, value.value[k]));
          }
          return guidMap;
        default:
          throw new BebopRuntimeError(`Unknown type marker: ${value[typeMarker]}`);
      }
    }
  }
  return value;
};
var BebopJson = {
  /**
   * A custom replacer function for JSON.stringify that supports BigInt, Map,
   * Date, Uint8Array, including BigInt values inside Map and Array.
   * @param _key - The key of the property being stringified.
   * @param value - The value of the property being stringified.
   * @returns The modified value for the property, or the original value if not a BigInt or Map.
   */
  replacer,
  /**
   * A custom reviver function for JSON.parse that supports BigInt, Map, Date,
   * Uint8Array, including nested values
   * @param _key - The key of the property being parsed.
   * @param value - The value of the property being parsed.
   * @returns The modified value for the property, or the original value if not a marked type.
   */
  reviver
};
var ensureBoolean = (value) => {
  if (!(value === false || value === true || value instanceof Boolean || typeof value === "boolean")) {
    throw new BebopRuntimeError(`Invalid value for Boolean: ${value} / typeof ${typeof value}`);
  }
};
var ensureUint8 = (value) => {
  if (!Number.isInteger(value) || value < 0 || value > 255) {
    throw new BebopRuntimeError(`Invalid value for Uint8: ${value}`);
  }
};
var ensureInt16 = (value) => {
  if (!Number.isInteger(value) || value < -32768 || value > 32767) {
    throw new BebopRuntimeError(`Invalid value for Int16: ${value}`);
  }
};
var ensureUint16 = (value) => {
  if (!Number.isInteger(value) || value < 0 || value > 65535) {
    throw new BebopRuntimeError(`Invalid value for Uint16: ${value}`);
  }
};
var ensureInt32 = (value) => {
  if (!Number.isInteger(value) || value < -2147483648 || value > 2147483647) {
    throw new BebopRuntimeError(`Invalid value for Int32: ${value}`);
  }
};
var ensureUint32 = (value) => {
  if (!Number.isInteger(value) || value < 0 || value > 4294967295) {
    throw new BebopRuntimeError(`Invalid value for Uint32: ${value}`);
  }
};
var ensureInt64 = (value) => {
  const min = BigInt("-9223372036854775808");
  const max = BigInt("9223372036854775807");
  value = BigInt(value);
  if (value < min || value > max) {
    throw new BebopRuntimeError(`Invalid value for Int64: ${value}`);
  }
};
var ensureUint64 = (value) => {
  const max = BigInt("18446744073709551615");
  value = BigInt(value);
  if (value < BigInt(0) || value > max) {
    throw new BebopRuntimeError(`Invalid value for Uint64: ${value}`);
  }
};
var ensureBigInt = (value) => {
  if (typeof value !== "bigint") {
    throw new BebopRuntimeError(`Invalid value for BigInt: ${value}`);
  }
};
var ensureFloat = (value) => {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new BebopRuntimeError(`Invalid value for Float: ${value}`);
  }
};
var ensureMap = (value, keyTypeValidator, valueTypeValidator) => {
  if (!(value instanceof Map || value instanceof GuidMap)) {
    throw new BebopRuntimeError(`Invalid value for Map: ${value}`);
  }
  for (let [k, v] of value) {
    keyTypeValidator(k);
    valueTypeValidator(v);
  }
};
var ensureArray = (value, elementTypeValidator) => {
  if (!Array.isArray(value)) {
    throw new BebopRuntimeError(`Invalid value for Array: ${value}`);
  }
  for (let element of value) {
    elementTypeValidator(element);
  }
};
var ensureDate = (value) => {
  if (!(value instanceof Date)) {
    throw new BebopRuntimeError(`Invalid value for Date: ${value}`);
  }
};
var ensureUint8Array = (value) => {
  if (!(value instanceof Uint8Array)) {
    throw new BebopRuntimeError(`Invalid value for Uint8Array: ${value}`);
  }
};
var ensureString = (value) => {
  if (typeof value !== "string") {
    throw new BebopRuntimeError(`Invalid value for String: ${value}`);
  }
};
var ensureEnum = (value, enumValue) => {
  if (!Number.isInteger(value)) {
    throw new BebopRuntimeError(`Invalid value for enum, not an int: ${value}`);
  }
  if (!(value in enumValue)) {
    throw new BebopRuntimeError(`Invalid value for enum, not in enum: ${value}`);
  }
};
var ensureGuid = (value) => {
  if (!(value instanceof Guid)) {
    throw new BebopRuntimeError(`Invalid value for Guid: ${value}`);
  }
};
var BebopTypeGuard = {
  /**
   * Ensures that the given value is a valid boolean.
   * @param value - The value to check.
   * @throws {BebopRuntimeError} - If the value is not a valid boolean.
   */
  ensureBoolean,
  /**
   * Ensures that the given value is a valid Uint8 number (0 to 255).
   * @param value - The value to check.
   * @throws {BebopRuntimeError} - If the value is not a valid Uint8 number.
   */
  ensureUint8,
  /**
   * Ensures that the given value is a valid Int16 number (-32768 to 32767).
   * @param value - The value to check.
   * @throws {BebopRuntimeError} - If the value is not a valid Int16 number.
   */
  ensureInt16,
  /**
   * Ensures that the given value is a valid Uint16 number (0 to 65535).
   * @param value - The value to check.
   * @throws {BebopRuntimeError} - If the value is not a valid Uint16 number.
   */
  ensureUint16,
  /**
   * Ensures that the given value is a valid Int32 number (-2147483648 to 2147483647).
   * @param value - The value to check.
   * @throws {BebopRuntimeError} - If the value is not a valid Int32 number.
   */
  ensureInt32,
  /**
   * Ensures that the given value is a valid Uint32 number (0 to 4294967295).
   * @param value - The value to check.
   * @throws {BebopRuntimeError} - If the value is not a valid Uint32 number.
   */
  ensureUint32,
  /**
   * Ensures that the given value is a valid Int64 number (-9223372036854775808 to 9223372036854775807).
   * @param value - The value to check.
   * @throws {BebopRuntimeError} - If the value is not a valid Int64 number.
   */
  ensureInt64,
  /**
   * Ensures that the given value is a valid Uint64 number (0 to 18446744073709551615).
   * @param value - The value to check.
   * @throws {BebopRuntimeError} - If the value is not a valid Uint64 number.
   */
  ensureUint64,
  /**
   * Ensures that the given value is a valid BigInt number.
   * @param value - The value to check.
   * @throws {BebopRuntimeError} - If the value is not a valid BigInt number.
   */
  ensureBigInt,
  /**
   * Ensures that the given value is a valid float number.
   * @param value - The value to check.
   * @throws {BebopRuntimeError} - If the value is not a valid float number.
   */
  ensureFloat,
  /**
   * Ensures that the given value is a valid Map object, with keys and values that pass the specified validators.
   * @param value - The value to check.
   * @param keyTypeValidator - A function that validates the type of each key in the Map.
   * @param valueTypeValidator - A function that validates the type of each value in the Map.
   * @throws {BebopRuntimeError} - If the value is not a valid Map object, or if any key or value fails validation.
   */
  ensureMap,
  /**
   * Ensures that the given value is a valid Array object, with elements that pass the specified validator.
   * @param value - The value to check.
   * @param elementTypeValidator - A function that validates the type of each element in the Array.
   * @throws {BebopRuntimeError} - If the value is not a valid Array object, or if any element fails validation.
   */
  ensureArray,
  /**
   * Ensures that the given value is a valid Date object.
   * @param value - The value to check.
   * @throws {BebopRuntimeError} - If the value is not a valid Date object.
   */
  ensureDate,
  /**
   * Ensures that the given value is a valid Uint8Array object.
   * @param value - The value to check.
   * @throws {BebopRuntimeError} - If the value is not a valid Uint8Array object.
   */
  ensureUint8Array,
  /**
   * Ensures that the given value is a valid string.
   * @param value - The value to check.
   * @throws {BebopRuntimeError} - If the value is not a valid string.
   */
  ensureString,
  /**
   * Ensures that the given value is a valid enum value.
   * @param value - The value to check.
   * @param enumValues - An array of valid enum values.
   * @throws {BebopRuntimeError} - If the value is not a valid enum value.
   */
  ensureEnum,
  /**
   * Ensures that the given value is a valid GUID string.
   * @param value - The value to check.
   * @throws {BebopRuntimeError} - If the value is not a valid GUID string.
   */
  ensureGuid
};

// bops.gen.ts
var BEBOP_SCHEMA = new Uint8Array([
  3,
  4,
  0,
  0,
  0,
  82,
  105,
  100,
  101,
  97,
  98,
  108,
  101,
  84,
  121,
  112,
  101,
  0,
  4,
  0,
  251,
  255,
  255,
  255,
  0,
  4,
  0,
  0,
  0,
  3,
  85,
  78,
  75,
  78,
  79,
  87,
  78,
  0,
  0,
  0,
  0,
  0,
  0,
  66,
  73,
  67,
  89,
  67,
  76,
  69,
  0,
  0,
  1,
  0,
  0,
  0,
  69,
  66,
  73,
  67,
  89,
  67,
  76,
  69,
  0,
  0,
  2,
  0,
  0,
  0,
  77,
  101,
  109,
  98,
  101,
  114,
  67,
  97,
  115,
  117,
  97,
  108,
  0,
  4,
  0,
  251,
  255,
  255,
  255,
  0,
  4,
  0,
  0,
  0,
  3,
  85,
  78,
  75,
  78,
  79,
  87,
  78,
  0,
  0,
  0,
  0,
  0,
  0,
  77,
  69,
  77,
  66,
  69,
  82,
  0,
  0,
  1,
  0,
  0,
  0,
  67,
  65,
  83,
  85,
  65,
  76,
  0,
  0,
  2,
  0,
  0,
  0,
  84,
  114,
  105,
  112,
  0,
  1,
  0,
  0,
  76,
  0,
  0,
  0,
  0,
  13,
  114,
  105,
  100,
  101,
  95,
  105,
  100,
  0,
  245,
  255,
  255,
  255,
  0,
  114,
  105,
  100,
  101,
  97,
  98,
  108,
  101,
  95,
  116,
  121,
  112,
  101,
  0,
  0,
  0,
  0,
  0,
  0,
  115,
  116,
  97,
  114,
  116,
  101,
  100,
  95,
  97,
  116,
  0,
  243,
  255,
  255,
  255,
  0,
  101,
  110,
  100,
  101,
  100,
  95,
  97,
  116,
  0,
  243,
  255,
  255,
  255,
  0,
  115,
  116,
  97,
  114,
  116,
  95,
  115,
  116,
  97,
  116,
  105,
  111,
  110,
  95,
  110,
  97,
  109,
  101,
  0,
  245,
  255,
  255,
  255,
  0,
  115,
  116,
  97,
  114,
  116,
  95,
  115,
  116,
  97,
  116,
  105,
  111,
  110,
  95,
  105,
  100,
  0,
  245,
  255,
  255,
  255,
  0,
  101,
  110,
  100,
  95,
  115,
  116,
  97,
  116,
  105,
  111,
  110,
  95,
  110,
  97,
  109,
  101,
  0,
  245,
  255,
  255,
  255,
  0,
  101,
  110,
  100,
  95,
  115,
  116,
  97,
  116,
  105,
  111,
  110,
  95,
  105,
  100,
  0,
  245,
  255,
  255,
  255,
  0,
  115,
  116,
  97,
  114,
  116,
  95,
  108,
  97,
  116,
  0,
  246,
  255,
  255,
  255,
  0,
  115,
  116,
  97,
  114,
  116,
  95,
  108,
  110,
  103,
  0,
  246,
  255,
  255,
  255,
  0,
  101,
  110,
  100,
  95,
  108,
  97,
  116,
  0,
  246,
  255,
  255,
  255,
  0,
  101,
  110,
  100,
  95,
  108,
  110,
  103,
  0,
  246,
  255,
  255,
  255,
  0,
  109,
  101,
  109,
  98,
  101,
  114,
  95,
  99,
  97,
  115,
  117,
  97,
  108,
  0,
  1,
  0,
  0,
  0,
  0,
  83,
  101,
  114,
  118,
  101,
  114,
  82,
  101,
  115,
  112,
  111,
  110,
  115,
  101,
  65,
  108,
  108,
  0,
  2,
  0,
  5,
  0,
  0,
  0,
  1,
  116,
  114,
  105,
  112,
  115,
  0,
  242,
  255,
  255,
  255,
  0,
  2,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0
]);
var RideableType = /* @__PURE__ */ ((RideableType3) => {
  RideableType3[RideableType3["Unknown"] = 0] = "Unknown";
  RideableType3[RideableType3["Bicycle"] = 1] = "Bicycle";
  RideableType3[RideableType3["Ebicycle"] = 2] = "Ebicycle";
  return RideableType3;
})(RideableType || {});
var MemberCasual = /* @__PURE__ */ ((MemberCasual3) => {
  MemberCasual3[MemberCasual3["Unknown"] = 0] = "Unknown";
  MemberCasual3[MemberCasual3["Member"] = 1] = "Member";
  MemberCasual3[MemberCasual3["Casual"] = 2] = "Casual";
  return MemberCasual3;
})(MemberCasual || {});
var Trip = class _Trip {
  rideId;
  rideableType;
  startedAt;
  endedAt;
  startStationName;
  startStationId;
  endStationName;
  endStationId;
  startLat;
  startLng;
  endLat;
  endLng;
  memberCasual;
  constructor(record) {
    this.rideId = record.rideId;
    this.rideableType = record.rideableType;
    this.startedAt = record.startedAt;
    this.endedAt = record.endedAt;
    this.startStationName = record.startStationName;
    this.startStationId = record.startStationId;
    this.endStationName = record.endStationName;
    this.endStationId = record.endStationId;
    this.startLat = record.startLat;
    this.startLng = record.startLng;
    this.endLat = record.endLat;
    this.endLng = record.endLng;
    this.memberCasual = record.memberCasual;
  }
  /**
   * Serializes the current instance into a JSON-Over-Bebop string
   */
  stringify() {
    return _Trip.encodeToJSON(this);
  }
  /**
   * Serializes the specified object into a JSON-Over-Bebop string
   */
  static encodeToJSON(record) {
    return JSON.stringify(record, BebopJson.replacer);
  }
  /**
   * Validates that the runtime types of members in the current instance are correct.
   */
  validateTypes() {
    _Trip.validateCompatibility(this);
  }
  /**
   * Validates that the specified dynamic object can become an instance of {@link Trip}.
   */
  static validateCompatibility(record) {
    BebopTypeGuard.ensureString(record.rideId);
    BebopTypeGuard.ensureEnum(record.rideableType, RideableType);
    BebopTypeGuard.ensureDate(record.startedAt);
    BebopTypeGuard.ensureDate(record.endedAt);
    BebopTypeGuard.ensureString(record.startStationName);
    BebopTypeGuard.ensureString(record.startStationId);
    BebopTypeGuard.ensureString(record.endStationName);
    BebopTypeGuard.ensureString(record.endStationId);
    BebopTypeGuard.ensureFloat(record.startLat);
    BebopTypeGuard.ensureFloat(record.startLng);
    BebopTypeGuard.ensureFloat(record.endLat);
    BebopTypeGuard.ensureFloat(record.endLng);
    BebopTypeGuard.ensureEnum(record.memberCasual, MemberCasual);
  }
  /**
   * Unsafely creates an instance of {@link Trip} from the specified dynamic object. No type checking is performed.
   */
  static unsafeCast(record) {
    return new _Trip(record);
  }
  /**
   * Creates a new {@link Trip} instance from a JSON-Over-Bebop string. Type checking is performed.
   */
  static fromJSON(json) {
    if (typeof json !== "string" || json.trim().length === 0) {
      throw new BebopRuntimeError(`Trip.fromJSON: expected string`);
    }
    const parsed = JSON.parse(json, BebopJson.reviver);
    _Trip.validateCompatibility(parsed);
    return _Trip.unsafeCast(parsed);
  }
  encode() {
    return _Trip.encode(this);
  }
  static encode(record) {
    const view = BebopView.getInstance();
    view.startWriting();
    _Trip.encodeInto(record, view);
    return view.toArray();
  }
  static encodeInto(record, view) {
    const before = view.length;
    view.writeString(record.rideId);
    view.writeUint32(record.rideableType);
    view.writeDate(record.startedAt);
    view.writeDate(record.endedAt);
    view.writeString(record.startStationName);
    view.writeString(record.startStationId);
    view.writeString(record.endStationName);
    view.writeString(record.endStationId);
    view.writeFloat64(record.startLat);
    view.writeFloat64(record.startLng);
    view.writeFloat64(record.endLat);
    view.writeFloat64(record.endLng);
    view.writeUint32(record.memberCasual);
    const after = view.length;
    return after - before;
  }
  static decode(buffer) {
    const view = BebopView.getInstance();
    view.startReading(buffer);
    return _Trip.readFrom(view);
  }
  static readFrom(view) {
    let field0;
    field0 = view.readString();
    let field1;
    field1 = view.readUint32();
    let field2;
    field2 = view.readDate();
    let field3;
    field3 = view.readDate();
    let field4;
    field4 = view.readString();
    let field5;
    field5 = view.readString();
    let field6;
    field6 = view.readString();
    let field7;
    field7 = view.readString();
    let field8;
    field8 = view.readFloat64();
    let field9;
    field9 = view.readFloat64();
    let field10;
    field10 = view.readFloat64();
    let field11;
    field11 = view.readFloat64();
    let field12;
    field12 = view.readUint32();
    let message = {
      rideId: field0,
      rideableType: field1,
      startedAt: field2,
      endedAt: field3,
      startStationName: field4,
      startStationId: field5,
      endStationName: field6,
      endStationId: field7,
      startLat: field8,
      startLng: field9,
      endLat: field10,
      endLng: field11,
      memberCasual: field12
    };
    return new _Trip(message);
  }
};
var ServerResponseAll = class _ServerResponseAll {
  trips;
  constructor(record) {
    this.trips = record.trips;
  }
  /**
   * Serializes the current instance into a JSON-Over-Bebop string
   */
  stringify() {
    return _ServerResponseAll.encodeToJSON(this);
  }
  /**
   * Serializes the specified object into a JSON-Over-Bebop string
   */
  static encodeToJSON(record) {
    return JSON.stringify(record, BebopJson.replacer);
  }
  /**
   * Validates that the runtime types of members in the current instance are correct.
   */
  validateTypes() {
    _ServerResponseAll.validateCompatibility(this);
  }
  /**
   * Validates that the specified dynamic object can become an instance of {@link ServerResponseAll}.
   */
  static validateCompatibility(record) {
    if (record.trips !== void 0) {
      BebopTypeGuard.ensureArray(record.trips, Trip.validateCompatibility);
    }
  }
  /**
   * Unsafely creates an instance of {@link ServerResponseAll} from the specified dynamic object. No type checking is performed.
   */
  static unsafeCast(record) {
    return new _ServerResponseAll(record);
  }
  /**
   * Creates a new {@link ServerResponseAll} instance from a JSON-Over-Bebop string. Type checking is performed.
   */
  static fromJSON(json) {
    if (typeof json !== "string" || json.trim().length === 0) {
      throw new BebopRuntimeError(`ServerResponseAll.fromJSON: expected string`);
    }
    const parsed = JSON.parse(json, BebopJson.reviver);
    _ServerResponseAll.validateCompatibility(parsed);
    return _ServerResponseAll.unsafeCast(parsed);
  }
  encode() {
    return _ServerResponseAll.encode(this);
  }
  static encode(record) {
    const view = BebopView.getInstance();
    view.startWriting();
    _ServerResponseAll.encodeInto(record, view);
    return view.toArray();
  }
  static encodeInto(record, view) {
    const before = view.length;
    const pos = view.reserveMessageLength();
    const start = view.length;
    if (record.trips !== void 0) {
      view.writeByte(1);
      {
        const length0 = record.trips.length;
        view.writeUint32(length0);
        for (let i0 = 0; i0 < length0; i0++) {
          Trip.encodeInto(record.trips[i0], view);
        }
      }
    }
    view.writeByte(0);
    const end = view.length;
    view.fillMessageLength(pos, end - start);
    const after = view.length;
    return after - before;
  }
  static decode(buffer) {
    const view = BebopView.getInstance();
    view.startReading(buffer);
    return _ServerResponseAll.readFrom(view);
  }
  static readFrom(view) {
    let message = {};
    const length = view.readMessageLength();
    const end = view.index + length;
    while (true) {
      switch (view.readByte()) {
        case 0:
          return new _ServerResponseAll(message);
        case 1:
          {
            let length0 = view.readUint32();
            message.trips = new Array(length0);
            for (let i0 = 0; i0 < length0; i0++) {
              let x0;
              x0 = Trip.readFrom(view);
              message.trips[i0] = x0;
            }
          }
          break;
        default:
          view.index = end;
          return new _ServerResponseAll(message);
      }
    }
  }
};

// node_modules/capnp-es/dist/shared/capnp-es.DAoyiaGr.mjs
var ListElementSize = /* @__PURE__ */ ((ListElementSize2) => {
  ListElementSize2[ListElementSize2["VOID"] = 0] = "VOID";
  ListElementSize2[ListElementSize2["BIT"] = 1] = "BIT";
  ListElementSize2[ListElementSize2["BYTE"] = 2] = "BYTE";
  ListElementSize2[ListElementSize2["BYTE_2"] = 3] = "BYTE_2";
  ListElementSize2[ListElementSize2["BYTE_4"] = 4] = "BYTE_4";
  ListElementSize2[ListElementSize2["BYTE_8"] = 5] = "BYTE_8";
  ListElementSize2[ListElementSize2["POINTER"] = 6] = "POINTER";
  ListElementSize2[ListElementSize2["COMPOSITE"] = 7] = "COMPOSITE";
  return ListElementSize2;
})(ListElementSize || {});
var tmpWord = new DataView(new ArrayBuffer(8));
new Uint16Array(tmpWord.buffer)[0] = 258;
var DEFAULT_BUFFER_SIZE = 4096;
var DEFAULT_TRAVERSE_LIMIT = 64 << 20;
var LIST_SIZE_MASK = 7;
var MAX_BUFFER_DUMP_BYTES = 8192;
var MAX_INT32 = 2147483647;
var MAX_UINT32 = 4294967295;
var MIN_SINGLE_SEGMENT_GROWTH = 4096;
var NATIVE_LITTLE_ENDIAN = tmpWord.getUint8(0) === 2;
var PACK_SPAN_THRESHOLD = 2;
var POINTER_DOUBLE_FAR_MASK = 4;
var POINTER_TYPE_MASK = 3;
var MAX_DEPTH = MAX_INT32;
var MAX_SEGMENT_LENGTH = MAX_UINT32;
var INVARIANT_UNREACHABLE_CODE = "CAPNP-TS000 Unreachable code detected.";
function assertNever(n) {
  throw new Error(INVARIANT_UNREACHABLE_CODE + ` (never block hit with: ${n})`);
}
var MSG_INVALID_FRAME_HEADER = "CAPNP-TS001 Attempted to parse an invalid message frame header; are you sure this is a Cap'n Proto message?";
var MSG_PACK_NOT_WORD_ALIGNED = "CAPNP-TS003 Attempted to pack a message that was not word-aligned.";
var MSG_SEGMENT_OUT_OF_BOUNDS = "CAPNP-TS004 Segment ID %X is out of bounds for message %s.";
var MSG_SEGMENT_TOO_SMALL = "CAPNP-TS005 First segment must have at least enough room to hold the root pointer (8 bytes).";
var PTR_ADOPT_WRONG_MESSAGE = "CAPNP-TS008 Attempted to adopt %s into a pointer in a different message %s.";
var PTR_ALREADY_ADOPTED = "CAPNP-TS009 Attempted to adopt %s more than once.";
var PTR_COMPOSITE_SIZE_UNDEFINED = "CAPNP-TS010 Attempted to set a composite list without providing a composite element size.";
var PTR_DEPTH_LIMIT_EXCEEDED = "CAPNP-TS011 Nesting depth limit exceeded for %s.";
var PTR_INIT_COMPOSITE_STRUCT = "CAPNP-TS013 Attempted to initialize a struct member from a composite list (%s).";
var PTR_INVALID_FAR_TARGET = "CAPNP-TS015 Target of a far pointer (%s) is another far pointer.";
var PTR_INVALID_LIST_SIZE = "CAPNP-TS016 Invalid list element size: %x.";
var PTR_INVALID_POINTER_TYPE = "CAPNP-TS017 Invalid pointer type: %x.";
var PTR_INVALID_UNION_ACCESS = "CAPNP-TS018 Attempted to access getter on %s for union field %s that is not currently set (wanted: %d, found: %d).";
var PTR_OFFSET_OUT_OF_BOUNDS = "CAPNP-TS019 Pointer offset %a is out of bounds for underlying buffer.";
var PTR_STRUCT_DATA_OUT_OF_BOUNDS = "CAPNP-TS020 Attempted to access out-of-bounds struct data (struct: %s, %d bytes at %a, data words: %d).";
var PTR_STRUCT_POINTER_OUT_OF_BOUNDS = "CAPNP-TS021 Attempted to access out-of-bounds struct pointer (%s, index: %d, length: %d).";
var PTR_TRAVERSAL_LIMIT_EXCEEDED = "CAPNP-TS022 Traversal limit exceeded! Slow down! %s";
var PTR_WRONG_LIST_TYPE = "CAPNP-TS023 Cannot convert %s to a %s list.";
var PTR_WRONG_POINTER_TYPE = "CAPNP-TS024 Attempted to convert pointer %s to a %s type.";
var SEG_GET_NON_ZERO_SINGLE = "CAPNP-TS035 Attempted to get a segment other than 0 (%d) from a single segment arena.";
var SEG_ID_OUT_OF_BOUNDS = "CAPNP-TS036 Attempted to get an out-of-bounds segment (%d).";
var SEG_NOT_WORD_ALIGNED = "CAPNP-TS037 Segment buffer length %d is not a multiple of 8.";
var SEG_REPLACEMENT_BUFFER_TOO_SMALL = "CAPNP-TS038 Attempted to replace a segment buffer with one that is smaller than the allocated space.";
var SEG_SIZE_OVERFLOW = `CAPNP-TS039 Requested size %x exceeds maximum value (${MAX_SEGMENT_LENGTH}).`;
var TYPE_COMPOSITE_SIZE_UNDEFINED = "CAPNP-TS040 Must provide a composite element size for composite list pointers.";
var LIST_NO_MUTABLE = "CAPNP-TS045: Cannot call mutative methods on an immutable list.";
var LIST_NO_SEARCH = "CAPNP-TS046: Search is not supported for list.";
var RPC_NULL_CLIENT = "CAPNP-TS100 Call on null client.";
function bufferToHex(buffer) {
  const a = new Uint8Array(buffer);
  const h = [];
  for (let i = 0; i < a.byteLength; i++) {
    h.push(pad(a[i].toString(16), 2));
  }
  return `[${h.join(" ")}]`;
}
function dumpBuffer(buffer) {
  const b = buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  const byteLength = Math.min(b.byteLength, MAX_BUFFER_DUMP_BYTES);
  let r = format("\n=== buffer[%d] ===", byteLength);
  for (let j = 0; j < byteLength; j += 16) {
    r += `
${pad(j.toString(16), 8)}: `;
    let s = "";
    let k;
    for (k = 0; k < 16 && j + k < b.byteLength; k++) {
      const v = b[j + k];
      r += `${pad(v.toString(16), 2)} `;
      s += v > 31 && v < 255 ? String.fromCharCode(v) : "\xB7";
      if (k === 7) r += " ";
    }
    r += `${repeat((17 - k) * 3, " ")}${s}`;
  }
  r += "\n";
  if (byteLength !== b.byteLength) {
    r += format("=== (truncated %d bytes) ===\n", b.byteLength - byteLength);
  }
  return r;
}
function format(s, ...args) {
  const n = s.length;
  let arg;
  let argIndex = 0;
  let c;
  let escaped = false;
  let i = 0;
  let leadingZero = false;
  let precision;
  let result = "";
  function nextArg() {
    return args[argIndex++];
  }
  function slurpNumber() {
    let digits = "";
    while (/\d/.test(s[i])) {
      digits += s[i++];
      c = s[i];
    }
    return digits.length > 0 ? Number.parseInt(digits, 10) : null;
  }
  for (; i < n; ++i) {
    c = s[i];
    if (escaped) {
      escaped = false;
      if (c === ".") {
        leadingZero = false;
        c = s[++i];
      } else if (c === "0" && s[i + 1] === ".") {
        leadingZero = true;
        i += 2;
        c = s[i];
      } else {
        leadingZero = true;
      }
      precision = slurpNumber();
      switch (c) {
        case "a": {
          result += "0x" + pad(Number.parseInt(String(nextArg()), 10).toString(16), 8);
          break;
        }
        case "b": {
          result += Number.parseInt(String(nextArg()), 10).toString(2);
          break;
        }
        case "c": {
          arg = nextArg();
          result += typeof arg === "string" || arg instanceof String ? arg : String.fromCharCode(Number.parseInt(String(arg), 10));
          break;
        }
        case "d": {
          result += Number.parseInt(String(nextArg()), 10);
          break;
        }
        case "f": {
          const tmp = Number.parseFloat(String(nextArg())).toFixed(
            precision || 6
          );
          result += leadingZero ? tmp : tmp.replace(/^0/, "");
          break;
        }
        case "j": {
          result += JSON.stringify(nextArg());
          break;
        }
        case "o": {
          result += "0" + Number.parseInt(String(nextArg()), 10).toString(8);
          break;
        }
        case "s": {
          result += nextArg();
          break;
        }
        case "x": {
          result += "0x" + Number.parseInt(String(nextArg()), 10).toString(16);
          break;
        }
        case "X": {
          result += "0x" + Number.parseInt(String(nextArg()), 10).toString(16).toUpperCase();
          break;
        }
        default: {
          result += c;
          break;
        }
      }
    } else if (c === "%") {
      escaped = true;
    } else {
      result += c;
    }
  }
  return result;
}
function pad(v, width, pad2 = "0") {
  return v.length >= width ? v : Array.from({ length: width - v.length + 1 }).join(pad2) + v;
}
function padToWord$1(size) {
  return size + 7 & -8;
}
function repeat(times, str) {
  let out = "";
  let n = times;
  let s = str;
  if (n < 1 || n > Number.MAX_VALUE) return out;
  do {
    if (n % 2) out += s;
    n = Math.floor(n / 2);
    if (n) s += s;
  } while (n);
  return out;
}
var ObjectSize = class {
  /** The number of bytes required for the data section. */
  dataByteLength;
  /** The number of pointers in the object. */
  pointerLength;
  constructor(dataByteLength, pointerCount) {
    this.dataByteLength = dataByteLength;
    this.pointerLength = pointerCount;
  }
  toString() {
    return format(
      "ObjectSize_dw:%d,pc:%d",
      getDataWordLength(this),
      this.pointerLength
    );
  }
};
function getByteLength(o) {
  return o.dataByteLength + o.pointerLength * 8;
}
function getDataWordLength(o) {
  return o.dataByteLength / 8;
}
function getWordLength(o) {
  return o.dataByteLength / 8 + o.pointerLength;
}
function padToWord(o) {
  return new ObjectSize(padToWord$1(o.dataByteLength), o.pointerLength);
}
var Orphan = class {
  /** If this member is not present then the orphan has already been adopted, or something went very wrong. */
  _capnp;
  byteOffset;
  segment;
  constructor(src3) {
    const c = getContent(src3);
    this.segment = c.segment;
    this.byteOffset = c.byteOffset;
    this._capnp = {};
    this._capnp.type = getTargetPointerType(src3);
    switch (this._capnp.type) {
      case PointerType.STRUCT: {
        this._capnp.size = getTargetStructSize(src3);
        break;
      }
      case PointerType.LIST: {
        this._capnp.length = getTargetListLength(src3);
        this._capnp.elementSize = getTargetListElementSize(src3);
        if (this._capnp.elementSize === ListElementSize.COMPOSITE) {
          this._capnp.size = getTargetCompositeListSize(src3);
        }
        break;
      }
      case PointerType.OTHER: {
        this._capnp.capId = getCapabilityId(src3);
        break;
      }
      default: {
        throw new Error(PTR_INVALID_POINTER_TYPE);
      }
    }
    erasePointer(src3);
  }
  /**
   * Adopt (move) this orphan into the target pointer location. This will allocate far pointers in `dst` as needed.
   *
   * @param {T} dst The destination pointer.
   * @returns {void}
   */
  _moveTo(dst) {
    if (this._capnp === void 0) {
      throw new Error(format(PTR_ALREADY_ADOPTED, this));
    }
    if (this.segment.message !== dst.segment.message) {
      throw new Error(format(PTR_ADOPT_WRONG_MESSAGE, this, dst));
    }
    erase(dst);
    const res = initPointer(this.segment, this.byteOffset, dst);
    switch (this._capnp.type) {
      case PointerType.STRUCT: {
        setStructPointer(res.offsetWords, this._capnp.size, res.pointer);
        break;
      }
      case PointerType.LIST: {
        let offsetWords = res.offsetWords;
        if (this._capnp.elementSize === ListElementSize.COMPOSITE) {
          offsetWords--;
        }
        setListPointer(
          offsetWords,
          this._capnp.elementSize,
          this._capnp.length,
          res.pointer,
          this._capnp.size
        );
        break;
      }
      case PointerType.OTHER: {
        setInterfacePointer(this._capnp.capId, res.pointer);
        break;
      }
      /* istanbul ignore next */
      default: {
        throw new Error(PTR_INVALID_POINTER_TYPE);
      }
    }
    this._capnp = void 0;
  }
  dispose() {
    if (this._capnp === void 0) {
      return;
    }
    switch (this._capnp.type) {
      case PointerType.STRUCT: {
        this.segment.fillZeroWords(
          this.byteOffset,
          getWordLength(this._capnp.size)
        );
        break;
      }
      case PointerType.LIST: {
        const byteLength = getListByteLength(
          this._capnp.elementSize,
          this._capnp.length,
          this._capnp.size
        );
        this.segment.fillZeroWords(this.byteOffset, byteLength);
        break;
      }
    }
    this._capnp = void 0;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return format(
      "Orphan_%d@%a,type:%s",
      this.segment.id,
      this.byteOffset,
      this._capnp && this._capnp.type
    );
  }
};
function adopt(src3, p) {
  src3._moveTo(p);
}
function disown(p) {
  return new Orphan(p);
}
function dump(p) {
  return bufferToHex(p.segment.buffer.slice(p.byteOffset, p.byteOffset + 8));
}
function getListByteLength(elementSize, length, compositeSize) {
  switch (elementSize) {
    case ListElementSize.BIT: {
      return padToWord$1(length + 7 >>> 3);
    }
    case ListElementSize.BYTE:
    case ListElementSize.BYTE_2:
    case ListElementSize.BYTE_4:
    case ListElementSize.BYTE_8:
    case ListElementSize.POINTER:
    case ListElementSize.VOID: {
      return padToWord$1(getListElementByteLength(elementSize) * length);
    }
    /* istanbul ignore next */
    case ListElementSize.COMPOSITE: {
      if (compositeSize === void 0) {
        throw new Error(format(PTR_INVALID_LIST_SIZE, Number.NaN));
      }
      return length * padToWord$1(getByteLength(compositeSize));
    }
    /* istanbul ignore next */
    default: {
      throw new Error(PTR_INVALID_LIST_SIZE);
    }
  }
}
function getListElementByteLength(elementSize) {
  switch (elementSize) {
    /* istanbul ignore next */
    case ListElementSize.BIT: {
      return Number.NaN;
    }
    case ListElementSize.BYTE: {
      return 1;
    }
    case ListElementSize.BYTE_2: {
      return 2;
    }
    case ListElementSize.BYTE_4: {
      return 4;
    }
    case ListElementSize.BYTE_8:
    case ListElementSize.POINTER: {
      return 8;
    }
    /* istanbul ignore next */
    case ListElementSize.COMPOSITE: {
      return Number.NaN;
    }
    /* istanbul ignore next */
    case ListElementSize.VOID: {
      return 0;
    }
    /* istanbul ignore next */
    default: {
      throw new Error(format(PTR_INVALID_LIST_SIZE, elementSize));
    }
  }
}
function add(offset, p) {
  return new Pointer(p.segment, p.byteOffset + offset, p._capnp.depthLimit);
}
function copyFrom(src3, p) {
  if (p.segment === src3.segment && p.byteOffset === src3.byteOffset) {
    return;
  }
  erase(p);
  if (isNull(src3)) return;
  switch (getTargetPointerType(src3)) {
    case PointerType.STRUCT: {
      copyFromStruct(src3, p);
      break;
    }
    case PointerType.LIST: {
      copyFromList(src3, p);
      break;
    }
    case PointerType.OTHER: {
      copyFromInterface(src3, p);
      break;
    }
    /* istanbul ignore next */
    default: {
      throw new Error(
        format(PTR_INVALID_POINTER_TYPE, getTargetPointerType(p))
      );
    }
  }
}
function erase(p) {
  if (isNull(p)) return;
  let c;
  switch (getTargetPointerType(p)) {
    case PointerType.STRUCT: {
      const size = getTargetStructSize(p);
      c = getContent(p);
      c.segment.fillZeroWords(c.byteOffset, size.dataByteLength / 8);
      for (let i = 0; i < size.pointerLength; i++) {
        erase(add(i * 8, c));
      }
      break;
    }
    case PointerType.LIST: {
      const elementSize = getTargetListElementSize(p);
      const length = getTargetListLength(p);
      let contentWords = padToWord$1(
        length * getListElementByteLength(elementSize)
      );
      c = getContent(p);
      if (elementSize === ListElementSize.POINTER) {
        for (let i = 0; i < length; i++) {
          erase(
            new Pointer(
              c.segment,
              c.byteOffset + i * 8,
              p._capnp.depthLimit - 1
            )
          );
        }
        break;
      } else if (elementSize === ListElementSize.COMPOSITE) {
        const tag = add(-8, c);
        const compositeSize = getStructSize(tag);
        const compositeByteLength = getByteLength(compositeSize);
        contentWords = getOffsetWords(tag);
        c.segment.setWordZero(c.byteOffset - 8);
        for (let i = 0; i < length; i++) {
          for (let j = 0; j < compositeSize.pointerLength; j++) {
            erase(
              new Pointer(
                c.segment,
                c.byteOffset + i * compositeByteLength + j * 8,
                p._capnp.depthLimit - 1
              )
            );
          }
        }
      }
      c.segment.fillZeroWords(c.byteOffset, contentWords);
      break;
    }
    case PointerType.OTHER: {
      break;
    }
    default: {
      throw new Error(
        format(PTR_INVALID_POINTER_TYPE, getTargetPointerType(p))
      );
    }
  }
  erasePointer(p);
}
function erasePointer(p) {
  if (getPointerType(p) === PointerType.FAR) {
    const landingPad = followFar(p);
    if (isDoubleFar(p)) {
      landingPad.segment.setWordZero(landingPad.byteOffset + 8);
    }
    landingPad.segment.setWordZero(landingPad.byteOffset);
  }
  p.segment.setWordZero(p.byteOffset);
}
function followFar(p) {
  const targetSegment = p.segment.message.getSegment(
    p.segment.getUint32(p.byteOffset + 4)
  );
  const targetWordOffset = p.segment.getUint32(p.byteOffset) >>> 3;
  return new Pointer(
    targetSegment,
    targetWordOffset * 8,
    p._capnp.depthLimit - 1
  );
}
function followFars(p) {
  if (getPointerType(p) === PointerType.FAR) {
    const landingPad = followFar(p);
    if (isDoubleFar(p)) landingPad.byteOffset += 8;
    return landingPad;
  }
  return p;
}
function getCapabilityId(p) {
  return p.segment.getUint32(p.byteOffset + 4);
}
function isCompositeList(p) {
  return getTargetPointerType(p) === PointerType.LIST && getTargetListElementSize(p) === ListElementSize.COMPOSITE;
}
function getContent(p, ignoreCompositeIndex) {
  let c;
  if (isDoubleFar(p)) {
    const landingPad = followFar(p);
    c = new Pointer(
      p.segment.message.getSegment(getFarSegmentId(landingPad)),
      getOffsetWords(landingPad) * 8
    );
  } else {
    const target3 = followFars(p);
    c = new Pointer(
      target3.segment,
      target3.byteOffset + 8 + getOffsetWords(target3) * 8
    );
  }
  if (isCompositeList(p)) c.byteOffset += 8;
  if (!ignoreCompositeIndex && p._capnp.compositeIndex !== void 0) {
    c.byteOffset -= 8;
    c.byteOffset += 8 + p._capnp.compositeIndex * getByteLength(padToWord(getStructSize(c)));
  }
  return c;
}
function getFarSegmentId(p) {
  return p.segment.getUint32(p.byteOffset + 4);
}
function getListElementSize(p) {
  return p.segment.getUint32(p.byteOffset + 4) & LIST_SIZE_MASK;
}
function getListLength(p) {
  return p.segment.getUint32(p.byteOffset + 4) >>> 3;
}
function getOffsetWords(p) {
  const o = p.segment.getInt32(p.byteOffset);
  return o & 2 ? o >> 3 : o >> 2;
}
function getPointerType(p) {
  return p.segment.getUint32(p.byteOffset) & POINTER_TYPE_MASK;
}
function getStructDataWords(p) {
  return p.segment.getUint16(p.byteOffset + 4);
}
function getStructPointerLength(p) {
  return p.segment.getUint16(p.byteOffset + 6);
}
function getStructSize(p) {
  return new ObjectSize(getStructDataWords(p) * 8, getStructPointerLength(p));
}
function getTargetCompositeListTag(p) {
  const c = getContent(p);
  c.byteOffset -= 8;
  return c;
}
function getTargetCompositeListSize(p) {
  return getStructSize(getTargetCompositeListTag(p));
}
function getTargetListElementSize(p) {
  return getListElementSize(followFars(p));
}
function getTargetListLength(p) {
  const t = followFars(p);
  if (getListElementSize(t) === ListElementSize.COMPOSITE) {
    return getOffsetWords(getTargetCompositeListTag(p));
  }
  return getListLength(t);
}
function getTargetPointerType(p) {
  const t = getPointerType(followFars(p));
  if (t === PointerType.FAR) throw new Error(format(PTR_INVALID_FAR_TARGET, p));
  return t;
}
function getTargetStructSize(p) {
  return getStructSize(followFars(p));
}
function initPointer(contentSegment, contentOffset, p) {
  if (p.segment !== contentSegment) {
    if (!contentSegment.hasCapacity(8)) {
      const landingPad2 = p.segment.allocate(16);
      setFarPointer(true, landingPad2.byteOffset / 8, landingPad2.segment.id, p);
      setFarPointer(false, contentOffset / 8, contentSegment.id, landingPad2);
      landingPad2.byteOffset += 8;
      return new PointerAllocationResult(landingPad2, 0);
    }
    const landingPad = contentSegment.allocate(8);
    if (landingPad.segment.id !== contentSegment.id) {
      throw new Error(INVARIANT_UNREACHABLE_CODE);
    }
    setFarPointer(false, landingPad.byteOffset / 8, landingPad.segment.id, p);
    return new PointerAllocationResult(
      landingPad,
      (contentOffset - landingPad.byteOffset - 8) / 8
    );
  }
  return new PointerAllocationResult(p, (contentOffset - p.byteOffset - 8) / 8);
}
function isDoubleFar(p) {
  return getPointerType(p) === PointerType.FAR && (p.segment.getUint32(p.byteOffset) & POINTER_DOUBLE_FAR_MASK) !== 0;
}
function isNull(p) {
  return p.segment.isWordZero(p.byteOffset);
}
function relocateTo(dst, src3) {
  const t = followFars(src3);
  const lo = t.segment.getUint8(t.byteOffset) & 3;
  const hi = t.segment.getUint32(t.byteOffset + 4);
  erase(dst);
  const res = initPointer(
    t.segment,
    t.byteOffset + 8 + getOffsetWords(t) * 8,
    dst
  );
  res.pointer.segment.setUint32(
    res.pointer.byteOffset,
    lo | res.offsetWords << 2
  );
  res.pointer.segment.setUint32(res.pointer.byteOffset + 4, hi);
  erasePointer(src3);
}
function setFarPointer(doubleFar, offsetWords, segmentId, p) {
  const A = PointerType.FAR;
  const B = doubleFar ? 1 : 0;
  const C = offsetWords;
  const D = segmentId;
  p.segment.setUint32(p.byteOffset, A | B << 2 | C << 3);
  p.segment.setUint32(p.byteOffset + 4, D);
}
function setInterfacePointer(capId, p) {
  p.segment.setUint32(p.byteOffset, PointerType.OTHER);
  p.segment.setUint32(p.byteOffset + 4, capId);
}
function getInterfacePointer(p) {
  return p.segment.getUint32(p.byteOffset + 4);
}
function setListPointer(offsetWords, size, length, p, compositeSize) {
  const A = PointerType.LIST;
  const B = offsetWords;
  const C = size;
  let D = length;
  if (size === ListElementSize.COMPOSITE) {
    if (compositeSize === void 0) {
      throw new TypeError(TYPE_COMPOSITE_SIZE_UNDEFINED);
    }
    D *= getWordLength(compositeSize);
  }
  p.segment.setUint32(p.byteOffset, A | B << 2);
  p.segment.setUint32(p.byteOffset + 4, C | D << 3);
}
function setStructPointer(offsetWords, size, p) {
  const A = PointerType.STRUCT;
  const B = offsetWords;
  const C = getDataWordLength(size);
  const D = size.pointerLength;
  p.segment.setUint32(p.byteOffset, A | B << 2);
  p.segment.setUint16(p.byteOffset + 4, C);
  p.segment.setUint16(p.byteOffset + 6, D);
}
function validate(pointerType, p, elementSize) {
  if (isNull(p)) return;
  const t = followFars(p);
  const A = t.segment.getUint32(t.byteOffset) & POINTER_TYPE_MASK;
  if (A !== pointerType) {
    throw new Error(format(PTR_WRONG_POINTER_TYPE, p, pointerType));
  }
  if (elementSize !== void 0) {
    const C = t.segment.getUint32(t.byteOffset + 4) & LIST_SIZE_MASK;
    if (C !== elementSize) {
      throw new Error(
        format(PTR_WRONG_LIST_TYPE, p, ListElementSize[elementSize])
      );
    }
  }
}
function copyFromInterface(src3, dst) {
  const srcCapId = getInterfacePointer(src3);
  if (srcCapId < 0) {
    return;
  }
  const srcCapTable = src3.segment.message._capnp.capTable;
  if (!srcCapTable) {
    return;
  }
  const client = srcCapTable[srcCapId];
  if (!client) {
    return;
  }
  const dstCapId = dst.segment.message.addCap(client);
  setInterfacePointer(dstCapId, dst);
}
function copyFromList(src3, dst) {
  if (dst._capnp.depthLimit <= 0) throw new Error(PTR_DEPTH_LIMIT_EXCEEDED);
  const srcContent = getContent(src3);
  const srcElementSize = getTargetListElementSize(src3);
  const srcLength = getTargetListLength(src3);
  let srcCompositeSize;
  let srcStructByteLength;
  let dstContent;
  if (srcElementSize === ListElementSize.POINTER) {
    dstContent = dst.segment.allocate(srcLength << 3);
    for (let i = 0; i < srcLength; i++) {
      const srcPtr = new Pointer(
        srcContent.segment,
        srcContent.byteOffset + (i << 3),
        src3._capnp.depthLimit - 1
      );
      const dstPtr = new Pointer(
        dstContent.segment,
        dstContent.byteOffset + (i << 3),
        dst._capnp.depthLimit - 1
      );
      copyFrom(srcPtr, dstPtr);
    }
  } else if (srcElementSize === ListElementSize.COMPOSITE) {
    srcCompositeSize = padToWord(getTargetCompositeListSize(src3));
    srcStructByteLength = getByteLength(srcCompositeSize);
    dstContent = dst.segment.allocate(
      getByteLength(srcCompositeSize) * srcLength + 8
    );
    dstContent.segment.copyWord(
      dstContent.byteOffset,
      srcContent.segment,
      srcContent.byteOffset - 8
    );
    if (srcCompositeSize.dataByteLength > 0) {
      const wordLength = getWordLength(srcCompositeSize) * srcLength;
      dstContent.segment.copyWords(
        dstContent.byteOffset + 8,
        srcContent.segment,
        srcContent.byteOffset,
        wordLength
      );
    }
    for (let i = 0; i < srcLength; i++) {
      for (let j = 0; j < srcCompositeSize.pointerLength; j++) {
        const offset = i * srcStructByteLength + srcCompositeSize.dataByteLength + (j << 3);
        const srcPtr = new Pointer(
          srcContent.segment,
          srcContent.byteOffset + offset,
          src3._capnp.depthLimit - 1
        );
        const dstPtr = new Pointer(
          dstContent.segment,
          dstContent.byteOffset + offset + 8,
          dst._capnp.depthLimit - 1
        );
        copyFrom(srcPtr, dstPtr);
      }
    }
  } else {
    const byteLength = padToWord$1(
      srcElementSize === ListElementSize.BIT ? srcLength + 7 >>> 3 : getListElementByteLength(srcElementSize) * srcLength
    );
    const wordLength = byteLength >>> 3;
    dstContent = dst.segment.allocate(byteLength);
    dstContent.segment.copyWords(
      dstContent.byteOffset,
      srcContent.segment,
      srcContent.byteOffset,
      wordLength
    );
  }
  const res = initPointer(dstContent.segment, dstContent.byteOffset, dst);
  setListPointer(
    res.offsetWords,
    srcElementSize,
    srcLength,
    res.pointer,
    srcCompositeSize
  );
}
function copyFromStruct(src3, dst) {
  if (dst._capnp.depthLimit <= 0) throw new Error(PTR_DEPTH_LIMIT_EXCEEDED);
  const srcContent = getContent(src3);
  const srcSize = getTargetStructSize(src3);
  const srcDataWordLength = getDataWordLength(srcSize);
  const dstContent = dst.segment.allocate(getByteLength(srcSize));
  dstContent.segment.copyWords(
    dstContent.byteOffset,
    srcContent.segment,
    srcContent.byteOffset,
    srcDataWordLength
  );
  for (let i = 0; i < srcSize.pointerLength; i++) {
    const offset = srcSize.dataByteLength + i * 8;
    const srcPtr = new Pointer(
      srcContent.segment,
      srcContent.byteOffset + offset,
      src3._capnp.depthLimit - 1
    );
    const dstPtr = new Pointer(
      dstContent.segment,
      dstContent.byteOffset + offset,
      dst._capnp.depthLimit - 1
    );
    copyFrom(srcPtr, dstPtr);
  }
  if (dst._capnp.compositeList) return;
  const res = initPointer(dstContent.segment, dstContent.byteOffset, dst);
  setStructPointer(res.offsetWords, srcSize, res.pointer);
}
function trackPointerAllocation(message, p) {
  message._capnp.traversalLimit -= 8;
  if (message._capnp.traversalLimit <= 0) {
    throw new Error(format(PTR_TRAVERSAL_LIMIT_EXCEEDED, p));
  }
}
var PointerAllocationResult = class {
  offsetWords;
  pointer;
  constructor(pointer, offsetWords) {
    this.pointer = pointer;
    this.offsetWords = offsetWords;
  }
};
var PointerType = /* @__PURE__ */ ((PointerType2) => {
  PointerType2[PointerType2["STRUCT"] = 0] = "STRUCT";
  PointerType2[PointerType2["LIST"] = 1] = "LIST";
  PointerType2[PointerType2["FAR"] = 2] = "FAR";
  PointerType2[PointerType2["OTHER"] = 3] = "OTHER";
  return PointerType2;
})(PointerType || {});
var Pointer = class {
  static _capnp = {
    displayName: "Pointer"
  };
  _capnp;
  /** Offset, in bytes, from the start of the segment to the beginning of this pointer. */
  byteOffset;
  /**
   * The starting segment for this pointer's data. In the case of a far pointer, the actual content this pointer is
   * referencing will be in another segment within the same message.
   */
  segment;
  constructor(segment, byteOffset, depthLimit = MAX_DEPTH) {
    this._capnp = { compositeList: false, depthLimit };
    this.segment = segment;
    this.byteOffset = byteOffset;
    if (depthLimit < 1) {
      throw new Error(format(PTR_DEPTH_LIMIT_EXCEEDED, this));
    }
    trackPointerAllocation(segment.message, this);
    if (byteOffset < 0 || byteOffset > segment.byteLength) {
      throw new Error(format(PTR_OFFSET_OUT_OF_BOUNDS, byteOffset));
    }
  }
  [Symbol.toStringTag]() {
    return format("Pointer_%d", this.segment.id);
  }
  toString() {
    return format("->%d@%a%s", this.segment.id, this.byteOffset, dump(this));
  }
};
var List = class _List extends Pointer {
  static _capnp = {
    displayName: "List<Generic>",
    size: ListElementSize.VOID
  };
  constructor(segment, byteOffset, depthLimit) {
    super(segment, byteOffset, depthLimit);
    return new Proxy(this, _List.#proxyHandler);
  }
  static #proxyHandler = {
    get(target3, prop, receiver) {
      const val = Reflect.get(target3, prop, receiver);
      if (val !== void 0) return val;
      if (typeof prop === "string") {
        return target3.get(+prop);
      }
    }
  };
  get length() {
    return getTargetListLength(this);
  }
  toArray() {
    const length = this.length;
    const res = Array.from({ length });
    for (let i = 0; i < length; i++) {
      res[i] = this.at(i);
    }
    return res;
  }
  get(_index) {
    throw new TypeError("Cannot get from a generic list.");
  }
  set(_index, _value) {
    throw new TypeError("Cannot set on a generic list.");
  }
  at(index) {
    if (index < 0) {
      const length = this.length;
      index += length;
    }
    return this.get(index);
  }
  concat(other) {
    const length = this.length;
    const otherLength = other.length;
    const res = Array.from({ length: length + otherLength });
    for (let i = 0; i < length; i++) res[i] = this.at(i);
    for (let i = 0; i < otherLength; i++) res[i + length] = other.at(i);
    return res;
  }
  some(cb, _this) {
    const length = this.length;
    for (let i = 0; i < length; i++) {
      if (cb.call(_this, this.at(i), i, this)) {
        return true;
      }
    }
    return false;
  }
  filter(cb, _this) {
    const length = this.length;
    const res = [];
    for (let i = 0; i < length; i++) {
      const value = this.at(i);
      if (cb.call(_this, value, i, this)) {
        res.push(value);
      }
    }
    return res;
  }
  find(cb, _this) {
    const length = this.length;
    for (let i = 0; i < length; i++) {
      const value = this.at(i);
      if (cb.call(_this, value, i, this)) {
        return value;
      }
    }
    return void 0;
  }
  findIndex(cb, _this) {
    const length = this.length;
    for (let i = 0; i < length; i++) {
      const value = this.at(i);
      if (cb.call(_this, value, i, this)) {
        return i;
      }
    }
    return -1;
  }
  forEach(cb, _this) {
    const length = this.length;
    for (let i = 0; i < length; i++) {
      cb.call(_this, this.at(i), i, this);
    }
  }
  map(cb, _this) {
    const length = this.length;
    const res = Array.from({ length });
    for (let i = 0; i < length; i++) {
      res[i] = cb.call(_this, this.at(i), i, this);
    }
    return res;
  }
  flatMap(cb, _this) {
    const length = this.length;
    const res = [];
    for (let i = 0; i < length; i++) {
      const r = cb.call(_this, this.at(i), i, this);
      res.push(...Array.isArray(r) ? r : [r]);
    }
    return res;
  }
  every(cb, _this) {
    const length = this.length;
    for (let i = 0; i < length; i++) {
      if (!cb.call(_this, this.at(i), i, this)) {
        return false;
      }
    }
    return true;
  }
  reduce(cb, initialValue) {
    let i = 0;
    let res;
    if (initialValue === void 0) {
      res = this.at(0);
      i++;
    } else {
      res = initialValue;
    }
    for (; i < this.length; i++) {
      res = cb(res, this.at(i), i, this);
    }
    return res;
  }
  reduceRight(cb, initialValue) {
    let i = this.length - 1;
    let res;
    if (initialValue === void 0) {
      res = this.at(i);
      i--;
    } else {
      res = initialValue;
    }
    for (; i >= 0; i--) {
      res = cb(res, this.at(i), i, this);
    }
    return res;
  }
  slice(start = 0, end) {
    const length = end ? Math.min(this.length, end) : this.length;
    const res = Array.from({ length: length - start });
    for (let i = start; i < length; i++) res[i] = this.at(i);
    return res;
  }
  join(separator) {
    return this.toArray().join(separator);
  }
  toReversed() {
    return this.toArray().reverse();
  }
  toSorted(compareFn) {
    return this.toArray().sort(compareFn);
  }
  toSpliced(start, deleteCount, ...items) {
    return this.toArray().splice(start, deleteCount, ...items);
  }
  fill(value, start, end) {
    const length = this.length;
    const s = Math.max(start ?? 0, 0);
    const e = Math.min(end ?? length, length);
    for (let i = s; i < e; i++) {
      this.set(i, value);
    }
    return this;
  }
  copyWithin(target3, start, end) {
    const length = this.length;
    const e = end ?? length;
    const s = start < 0 ? Math.max(length + start, 0) : start;
    const t = target3 < 0 ? Math.max(length + target3, 0) : target3;
    const len = Math.min(e - s, length - t);
    for (let i = 0; i < len; i++) {
      this.set(t + i, this.at(s + i));
    }
    return this;
  }
  keys() {
    const length = this.length;
    return Array.from({ length }, (_, i) => i)[Symbol.iterator]();
  }
  values() {
    return this.toArray().values();
  }
  entries() {
    return this.toArray().entries();
  }
  flat(depth) {
    return this.toArray().flat(depth);
  }
  with(index, value) {
    return this.toArray().with(index, value);
  }
  includes(_searchElement, _fromIndex) {
    throw new Error(LIST_NO_SEARCH);
  }
  findLast(_cb, _thisArg) {
    throw new Error(LIST_NO_SEARCH);
  }
  findLastIndex(_cb, _t) {
    throw new Error(LIST_NO_SEARCH);
  }
  indexOf(_searchElement, _fromIndex) {
    throw new Error(LIST_NO_SEARCH);
  }
  lastIndexOf(_searchElement, _fromIndex) {
    throw new Error(LIST_NO_SEARCH);
  }
  pop() {
    throw new Error(LIST_NO_MUTABLE);
  }
  push(..._items) {
    throw new Error(LIST_NO_MUTABLE);
  }
  reverse() {
    throw new Error(LIST_NO_MUTABLE);
  }
  shift() {
    throw new Error(LIST_NO_MUTABLE);
  }
  unshift(..._items) {
    throw new Error(LIST_NO_MUTABLE);
  }
  splice(_start, _deleteCount, ..._rest) {
    throw new Error(LIST_NO_MUTABLE);
  }
  sort(_fn) {
    throw new Error(LIST_NO_MUTABLE);
  }
  get [Symbol.unscopables]() {
    return Array.prototype[Symbol.unscopables];
  }
  [Symbol.iterator]() {
    return this.values();
  }
  toJSON() {
    return this.toArray();
  }
  toString() {
    return this.join(",");
  }
  toLocaleString(_locales, _options) {
    return this.toString();
  }
  [Symbol.toStringTag]() {
    return "[object Array]";
  }
  static [Symbol.toStringTag]() {
    return this._capnp.displayName;
  }
};
function initList$1(elementSize, length, l, compositeSize) {
  let c;
  switch (elementSize) {
    case ListElementSize.BIT: {
      c = l.segment.allocate(Math.ceil(length / 8));
      break;
    }
    case ListElementSize.BYTE:
    case ListElementSize.BYTE_2:
    case ListElementSize.BYTE_4:
    case ListElementSize.BYTE_8:
    case ListElementSize.POINTER: {
      c = l.segment.allocate(length * getListElementByteLength(elementSize));
      break;
    }
    case ListElementSize.COMPOSITE: {
      if (compositeSize === void 0) {
        throw new Error(format(PTR_COMPOSITE_SIZE_UNDEFINED));
      }
      compositeSize = padToWord(compositeSize);
      const byteLength = getByteLength(compositeSize) * length;
      c = l.segment.allocate(byteLength + 8);
      setStructPointer(length, compositeSize, c);
      break;
    }
    case ListElementSize.VOID: {
      setListPointer(0, elementSize, length, l);
      return;
    }
    default: {
      throw new Error(format(PTR_INVALID_LIST_SIZE, elementSize));
    }
  }
  const res = initPointer(c.segment, c.byteOffset, l);
  setListPointer(
    res.offsetWords,
    elementSize,
    length,
    res.pointer,
    compositeSize
  );
}
var Data = class extends List {
  static fromPointer(pointer) {
    validate(PointerType.LIST, pointer, ListElementSize.BYTE);
    return this._fromPointerUnchecked(pointer);
  }
  static _fromPointerUnchecked(pointer) {
    return new this(
      pointer.segment,
      pointer.byteOffset,
      pointer._capnp.depthLimit
    );
  }
  /**
   * Copy the contents of `src` into this Data pointer. If `src` is smaller than the length of this pointer then the
   * remaining bytes will be zeroed out. Extra bytes in `src` are ignored.
   *
   * @param {(ArrayBuffer | ArrayBufferView)} src The source buffer.
   * @returns {void}
   */
  // TODO: Would be nice to have a way to zero-copy a buffer by allocating a new segment into the message with that
  // buffer data.
  copyBuffer(src3) {
    const c = getContent(this);
    const dstLength = this.length;
    const srcLength = src3.byteLength;
    const i = src3 instanceof ArrayBuffer ? new Uint8Array(src3) : new Uint8Array(
      src3.buffer,
      src3.byteOffset,
      Math.min(dstLength, srcLength)
    );
    const o = new Uint8Array(c.segment.buffer, c.byteOffset, this.length);
    o.set(i);
    if (dstLength > srcLength) {
      o.fill(0, srcLength, dstLength);
    }
  }
  /**
   * Read a byte from the specified offset.
   *
   * @param {number} byteOffset The byte offset to read.
   * @returns {number} The byte value.
   */
  get(byteOffset) {
    const c = getContent(this);
    return c.segment.getUint8(c.byteOffset + byteOffset);
  }
  /**
   * Write a byte at the specified offset.
   *
   * @param {number} byteOffset The byte offset to set.
   * @param {number} value The byte value to set.
   * @returns {void}
   */
  set(byteOffset, value) {
    const c = getContent(this);
    c.segment.setUint8(c.byteOffset + byteOffset, value);
  }
  /**
   * Creates a **copy** of the underlying buffer data and returns it as an ArrayBuffer.
   *
   * To obtain a reference to the underlying buffer instead, use `toUint8Array()` or `toDataView()`.
   *
   * @returns {ArrayBuffer} A copy of this data buffer.
   */
  toArrayBuffer() {
    const c = getContent(this);
    return c.segment.buffer.slice(c.byteOffset, c.byteOffset + this.length);
  }
  /**
   * Convert this Data pointer to a DataView representing the pointer's contents.
   *
   * WARNING: The DataView references memory from a message segment, so do not venture outside the bounds of the
   * DataView or else BAD THINGS.
   *
   * @returns {DataView} A live reference to the underlying buffer.
   */
  toDataView() {
    const c = getContent(this);
    return new DataView(c.segment.buffer, c.byteOffset, this.length);
  }
  [Symbol.toStringTag]() {
    return `Data_${super.toString()}`;
  }
  /**
   * Convert this Data pointer to a Uint8Array representing the pointer's contents.
   *
   * WARNING: The Uint8Array references memory from a message segment, so do not venture outside the bounds of the
   * Uint8Array or else BAD THINGS.
   *
   * @returns {DataView} A live reference to the underlying buffer.
   */
  toUint8Array() {
    const c = getContent(this);
    return new Uint8Array(c.segment.buffer, c.byteOffset, this.length);
  }
};
var textEncoder3 = new TextEncoder();
var textDecoder = new TextDecoder();
var Text = class extends List {
  static fromPointer(pointer) {
    validate(PointerType.LIST, pointer, ListElementSize.BYTE);
    return textFromPointerUnchecked(pointer);
  }
  /**
   * Read a utf-8 encoded string value from this pointer.
   *
   * @param {number} [index] The index at which to start reading; defaults to zero.
   * @returns {string} The string value.
   */
  get(index = 0) {
    if (isNull(this)) return "";
    const c = getContent(this);
    return textDecoder.decode(
      new Uint8Array(
        c.segment.buffer,
        c.byteOffset + index,
        this.length - index
      )
    );
  }
  /**
   * Get the number of utf-8 encoded bytes in this text. This does **not** include the NUL byte.
   *
   * @returns {number} The number of bytes allocated for the text.
   */
  get length() {
    return super.length - 1;
  }
  /**
   * Write a utf-8 encoded string value starting at the specified index.
   *
   * @param {number} index The index at which to start copying the string. Note that if this is not zero the bytes
   * before `index` will be left as-is. All bytes after `index` will be overwritten.
   * @param {string} value The string value to set.
   * @returns {void}
   */
  set(index, value) {
    const src3 = textEncoder3.encode(value);
    const dstLength = src3.byteLength + index;
    let c;
    let original;
    if (!isNull(this)) {
      c = getContent(this);
      let originalLength = this.length;
      if (originalLength >= index) {
        originalLength = index;
      }
      original = new Uint8Array(
        c.segment.buffer.slice(
          c.byteOffset,
          c.byteOffset + Math.min(originalLength, index)
        )
      );
      erase(this);
    }
    initList$1(ListElementSize.BYTE, dstLength + 1, this);
    c = getContent(this);
    const dst = new Uint8Array(c.segment.buffer, c.byteOffset, dstLength);
    if (original) dst.set(original);
    dst.set(src3, index);
  }
  toString() {
    return this.get();
  }
  toJSON() {
    return this.get();
  }
  [Symbol.toPrimitive]() {
    return this.get();
  }
  [Symbol.toStringTag]() {
    return `Text_${super.toString()}`;
  }
};
function textFromPointerUnchecked(pointer) {
  return new Text(
    pointer.segment,
    pointer.byteOffset,
    pointer._capnp.depthLimit
  );
}
var Struct = class extends Pointer {
  static _capnp = {
    displayName: "Struct"
  };
  /**
   * Create a new pointer to a struct.
   *
   * @constructor {Struct}
   * @param {Segment} segment The segment the pointer resides in.
   * @param {number} byteOffset The offset from the beginning of the segment to the beginning of the pointer data.
   * @param {any} [depthLimit=MAX_DEPTH] The nesting depth limit for this object.
   * @param {number} [compositeIndex] If set, then this pointer is actually a reference to a composite list
   * (`this._getPointerTargetType() === PointerType.LIST`), and this number is used as the index of the struct within
   * the list. It is not valid to call `initStruct()` on a composite struct – the struct contents are initialized when
   * the list pointer is initialized.
   */
  constructor(segment, byteOffset, depthLimit = MAX_DEPTH, compositeIndex) {
    super(segment, byteOffset, depthLimit);
    this._capnp.compositeIndex = compositeIndex;
    this._capnp.compositeList = compositeIndex !== void 0;
  }
  static [Symbol.toStringTag]() {
    return this._capnp.displayName;
  }
  [Symbol.toStringTag]() {
    return `Struct_${super.toString()}${this._capnp.compositeIndex === void 0 ? "" : `,ci:${this._capnp.compositeIndex}`} > ${getContent(this).toString()}`;
  }
};
var AnyStruct = class extends Struct {
  static _capnp = {
    displayName: "AnyStruct",
    id: "0",
    size: new ObjectSize(0, 0)
  };
};
var FixedAnswer = class {
  struct() {
    return Promise.resolve(this.structSync());
  }
};
var ErrorAnswer = class extends FixedAnswer {
  err;
  constructor(err) {
    super();
    this.err = err;
  }
  structSync() {
    throw this.err;
  }
  pipelineCall(_transform, _call) {
    return this;
  }
  pipelineClose(_transform) {
    throw this.err;
  }
};
var ErrorClient = class {
  err;
  constructor(err) {
    this.err = err;
  }
  call(_call) {
    return new ErrorAnswer(this.err);
  }
  close() {
    throw this.err;
  }
};
function clientOrNull(client) {
  return client ? client : new ErrorClient(new Error(RPC_NULL_CLIENT));
}
var TMP_WORD = new DataView(new ArrayBuffer(8));
function initStruct(size, s) {
  if (s._capnp.compositeIndex !== void 0) {
    throw new Error(format(PTR_INIT_COMPOSITE_STRUCT, s));
  }
  erase(s);
  const c = s.segment.allocate(getByteLength(size));
  const res = initPointer(c.segment, c.byteOffset, s);
  setStructPointer(res.offsetWords, size, res.pointer);
}
function initStructAt(index, StructClass, p) {
  const s = getPointerAs(index, StructClass, p);
  initStruct(StructClass._capnp.size, s);
  return s;
}
function checkPointerBounds(index, s) {
  const pointerLength = getSize(s).pointerLength;
  if (index < 0 || index >= pointerLength) {
    throw new Error(
      format(PTR_STRUCT_POINTER_OUT_OF_BOUNDS, s, index, pointerLength)
    );
  }
}
function getInterfaceClientOrNullAt(index, s) {
  return getInterfaceClientOrNull(getPointer(index, s));
}
function getInterfaceClientOrNull(p) {
  let client = null;
  const capId = getInterfacePointer(p);
  const capTable = p.segment.message._capnp.capTable;
  if (capTable && capId >= 0 && capId < capTable.length) {
    client = capTable[capId];
  }
  return clientOrNull(client);
}
function resize(dstSize, s) {
  const srcSize = getSize(s);
  const srcContent = getContent(s);
  const dstContent = s.segment.allocate(getByteLength(dstSize));
  dstContent.segment.copyWords(
    dstContent.byteOffset,
    srcContent.segment,
    srcContent.byteOffset,
    Math.min(getDataWordLength(srcSize), getDataWordLength(dstSize))
  );
  const res = initPointer(dstContent.segment, dstContent.byteOffset, s);
  setStructPointer(res.offsetWords, dstSize, res.pointer);
  for (let i = 0; i < Math.min(srcSize.pointerLength, dstSize.pointerLength); i++) {
    const srcPtr = new Pointer(
      srcContent.segment,
      srcContent.byteOffset + srcSize.dataByteLength + i * 8
    );
    if (isNull(srcPtr)) {
      continue;
    }
    const srcPtrTarget = followFars(srcPtr);
    const srcPtrContent = getContent(srcPtr);
    const dstPtr = new Pointer(
      dstContent.segment,
      dstContent.byteOffset + dstSize.dataByteLength + i * 8
    );
    if (getTargetPointerType(srcPtr) === PointerType.LIST && getTargetListElementSize(srcPtr) === ListElementSize.COMPOSITE) {
      srcPtrContent.byteOffset -= 8;
    }
    const r = initPointer(
      srcPtrContent.segment,
      srcPtrContent.byteOffset,
      dstPtr
    );
    const a = srcPtrTarget.segment.getUint8(srcPtrTarget.byteOffset) & 3;
    const b = srcPtrTarget.segment.getUint32(srcPtrTarget.byteOffset + 4);
    r.pointer.segment.setUint32(r.pointer.byteOffset, a | r.offsetWords << 2);
    r.pointer.segment.setUint32(r.pointer.byteOffset + 4, b);
  }
  srcContent.segment.fillZeroWords(
    srcContent.byteOffset,
    getWordLength(srcSize)
  );
}
function getAs(StructClass, s) {
  return new StructClass(
    s.segment,
    s.byteOffset,
    s._capnp.depthLimit,
    s._capnp.compositeIndex
  );
}
function getBit(bitOffset, s, defaultMask) {
  const byteOffset = Math.floor(bitOffset / 8);
  const bitMask = 1 << bitOffset % 8;
  checkDataBounds(byteOffset, 1, s);
  const ds = getDataSection(s);
  const v = ds.segment.getUint8(ds.byteOffset + byteOffset);
  if (defaultMask === void 0) return (v & bitMask) !== 0;
  const defaultValue = defaultMask.getUint8(0);
  return ((v ^ defaultValue) & bitMask) !== 0;
}
function getData(index, s, defaultValue) {
  checkPointerBounds(index, s);
  const ps = getPointerSection(s);
  ps.byteOffset += index * 8;
  const l = new Data(ps.segment, ps.byteOffset, s._capnp.depthLimit - 1);
  if (isNull(l)) {
    if (defaultValue) {
      copyFrom(defaultValue, l);
    } else {
      initList$1(ListElementSize.BYTE, 0, l);
    }
  }
  return l;
}
function getDataSection(s) {
  return getContent(s);
}
function getFloat32(byteOffset, s, defaultMask) {
  checkDataBounds(byteOffset, 4, s);
  const ds = getDataSection(s);
  if (defaultMask === void 0) {
    return ds.segment.getFloat32(ds.byteOffset + byteOffset);
  }
  const v = ds.segment.getUint32(ds.byteOffset + byteOffset) ^ defaultMask.getUint32(0, true);
  TMP_WORD.setUint32(0, v, NATIVE_LITTLE_ENDIAN);
  return TMP_WORD.getFloat32(0, NATIVE_LITTLE_ENDIAN);
}
function getFloat64(byteOffset, s, defaultMask) {
  checkDataBounds(byteOffset, 8, s);
  const ds = getDataSection(s);
  if (defaultMask !== void 0) {
    const lo = ds.segment.getUint32(ds.byteOffset + byteOffset) ^ defaultMask.getUint32(0, true);
    const hi = ds.segment.getUint32(ds.byteOffset + byteOffset + 4) ^ defaultMask.getUint32(4, true);
    TMP_WORD.setUint32(0, lo, NATIVE_LITTLE_ENDIAN);
    TMP_WORD.setUint32(4, hi, NATIVE_LITTLE_ENDIAN);
    return TMP_WORD.getFloat64(0, NATIVE_LITTLE_ENDIAN);
  }
  return ds.segment.getFloat64(ds.byteOffset + byteOffset);
}
function getInt16(byteOffset, s, defaultMask) {
  checkDataBounds(byteOffset, 2, s);
  const ds = getDataSection(s);
  if (defaultMask === void 0) {
    return ds.segment.getInt16(ds.byteOffset + byteOffset);
  }
  const v = ds.segment.getUint16(ds.byteOffset + byteOffset) ^ defaultMask.getUint16(0, true);
  TMP_WORD.setUint16(0, v, NATIVE_LITTLE_ENDIAN);
  return TMP_WORD.getInt16(0, NATIVE_LITTLE_ENDIAN);
}
function getInt32(byteOffset, s, defaultMask) {
  checkDataBounds(byteOffset, 4, s);
  const ds = getDataSection(s);
  if (defaultMask === void 0) {
    return ds.segment.getInt32(ds.byteOffset + byteOffset);
  }
  const v = ds.segment.getUint32(ds.byteOffset + byteOffset) ^ defaultMask.getUint16(0, true);
  TMP_WORD.setUint32(0, v, NATIVE_LITTLE_ENDIAN);
  return TMP_WORD.getInt32(0, NATIVE_LITTLE_ENDIAN);
}
function getInt64(byteOffset, s, defaultMask) {
  checkDataBounds(byteOffset, 8, s);
  const ds = getDataSection(s);
  if (defaultMask !== void 0) {
    const lo = ds.segment.getUint32(ds.byteOffset + byteOffset) ^ defaultMask.getUint32(0, true);
    const hi = ds.segment.getUint32(ds.byteOffset + byteOffset + 4) ^ defaultMask.getUint32(4, true);
    TMP_WORD.setUint32(NATIVE_LITTLE_ENDIAN ? 0 : 4, lo, NATIVE_LITTLE_ENDIAN);
    TMP_WORD.setUint32(NATIVE_LITTLE_ENDIAN ? 4 : 0, hi, NATIVE_LITTLE_ENDIAN);
    return TMP_WORD.getBigInt64(0, NATIVE_LITTLE_ENDIAN);
  }
  return ds.segment.getInt64(ds.byteOffset + byteOffset);
}
function getInt8(byteOffset, s, defaultMask) {
  checkDataBounds(byteOffset, 1, s);
  const ds = getDataSection(s);
  if (defaultMask === void 0) {
    return ds.segment.getInt8(ds.byteOffset + byteOffset);
  }
  const v = ds.segment.getUint8(ds.byteOffset + byteOffset) ^ defaultMask.getUint8(0);
  TMP_WORD.setUint8(0, v);
  return TMP_WORD.getInt8(0);
}
function getList(index, ListClass, s, defaultValue) {
  checkPointerBounds(index, s);
  const ps = getPointerSection(s);
  ps.byteOffset += index * 8;
  const l = new ListClass(ps.segment, ps.byteOffset, s._capnp.depthLimit - 1);
  if (isNull(l)) {
    if (defaultValue) {
      copyFrom(defaultValue, l);
    } else {
      initList$1(ListClass._capnp.size, 0, l, ListClass._capnp.compositeSize);
    }
  } else if (ListClass._capnp.compositeSize !== void 0) {
    const srcSize = getTargetCompositeListSize(l);
    const dstSize = ListClass._capnp.compositeSize;
    if (dstSize.dataByteLength > srcSize.dataByteLength || dstSize.pointerLength > srcSize.pointerLength) {
      const srcContent = getContent(l);
      const srcLength = getTargetListLength(l);
      const dstContent = l.segment.allocate(
        getByteLength(dstSize) * srcLength + 8
      );
      const res = initPointer(dstContent.segment, dstContent.byteOffset, l);
      setListPointer(
        res.offsetWords,
        ListClass._capnp.size,
        srcLength,
        res.pointer,
        dstSize
      );
      setStructPointer(srcLength, dstSize, dstContent);
      dstContent.byteOffset += 8;
      for (let i = 0; i < srcLength; i++) {
        const srcElementOffset = srcContent.byteOffset + i * getByteLength(srcSize);
        const dstElementOffset = dstContent.byteOffset + i * getByteLength(dstSize);
        dstContent.segment.copyWords(
          dstElementOffset,
          srcContent.segment,
          srcElementOffset,
          getWordLength(srcSize)
        );
        for (let j = 0; j < srcSize.pointerLength; j++) {
          const srcPtr = new Pointer(
            srcContent.segment,
            srcElementOffset + srcSize.dataByteLength + j * 8
          );
          const dstPtr = new Pointer(
            dstContent.segment,
            dstElementOffset + dstSize.dataByteLength + j * 8
          );
          const srcPtrTarget = followFars(srcPtr);
          const srcPtrContent = getContent(srcPtr);
          if (getTargetPointerType(srcPtr) === PointerType.LIST && getTargetListElementSize(srcPtr) === ListElementSize.COMPOSITE) {
            srcPtrContent.byteOffset -= 8;
          }
          const r = initPointer(
            srcPtrContent.segment,
            srcPtrContent.byteOffset,
            dstPtr
          );
          const a = srcPtrTarget.segment.getUint8(srcPtrTarget.byteOffset) & 3;
          const b = srcPtrTarget.segment.getUint32(srcPtrTarget.byteOffset + 4);
          r.pointer.segment.setUint32(
            r.pointer.byteOffset,
            a | r.offsetWords << 2
          );
          r.pointer.segment.setUint32(r.pointer.byteOffset + 4, b);
        }
      }
      srcContent.segment.fillZeroWords(
        srcContent.byteOffset,
        getWordLength(srcSize) * srcLength
      );
    }
  }
  return l;
}
function getPointer(index, s) {
  checkPointerBounds(index, s);
  const ps = getPointerSection(s);
  ps.byteOffset += index * 8;
  return new Pointer(ps.segment, ps.byteOffset, s._capnp.depthLimit - 1);
}
function getPointerAs(index, PointerClass, s) {
  checkPointerBounds(index, s);
  const ps = getPointerSection(s);
  ps.byteOffset += index * 8;
  return new PointerClass(ps.segment, ps.byteOffset, s._capnp.depthLimit - 1);
}
function getPointerSection(s) {
  const ps = getContent(s);
  ps.byteOffset += padToWord$1(getSize(s).dataByteLength);
  return ps;
}
function getSize(s) {
  if (s._capnp.compositeIndex !== void 0) {
    const c = getContent(s, true);
    c.byteOffset -= 8;
    return getStructSize(c);
  }
  return getTargetStructSize(s);
}
function getStruct(index, StructClass, s, defaultValue) {
  const t = getPointerAs(index, StructClass, s);
  if (isNull(t)) {
    if (defaultValue) {
      copyFrom(defaultValue, t);
    } else {
      initStruct(StructClass._capnp.size, t);
    }
  } else {
    validate(PointerType.STRUCT, t);
    const ts = getTargetStructSize(t);
    if (ts.dataByteLength < StructClass._capnp.size.dataByteLength || ts.pointerLength < StructClass._capnp.size.pointerLength) {
      resize(StructClass._capnp.size, t);
    }
  }
  return t;
}
function getText(index, s, defaultValue) {
  const t = Text.fromPointer(getPointer(index, s));
  if (isNull(t) && defaultValue) t.set(0, defaultValue);
  return t.get(0);
}
function getUint16(byteOffset, s, defaultMask) {
  checkDataBounds(byteOffset, 2, s);
  const ds = getDataSection(s);
  if (defaultMask === void 0) {
    return ds.segment.getUint16(ds.byteOffset + byteOffset);
  }
  return ds.segment.getUint16(ds.byteOffset + byteOffset) ^ defaultMask.getUint16(0, true);
}
function getUint32(byteOffset, s, defaultMask) {
  checkDataBounds(byteOffset, 4, s);
  const ds = getDataSection(s);
  if (defaultMask === void 0) {
    return ds.segment.getUint32(ds.byteOffset + byteOffset);
  }
  return ds.segment.getUint32(ds.byteOffset + byteOffset) ^ defaultMask.getUint32(0, true);
}
function getUint64(byteOffset, s, defaultMask) {
  checkDataBounds(byteOffset, 8, s);
  const ds = getDataSection(s);
  if (defaultMask !== void 0) {
    const lo = ds.segment.getUint32(ds.byteOffset + byteOffset) ^ defaultMask.getUint32(0, true);
    const hi = ds.segment.getUint32(ds.byteOffset + byteOffset + 4) ^ defaultMask.getUint32(4, true);
    TMP_WORD.setUint32(NATIVE_LITTLE_ENDIAN ? 0 : 4, lo, NATIVE_LITTLE_ENDIAN);
    TMP_WORD.setUint32(NATIVE_LITTLE_ENDIAN ? 4 : 0, hi, NATIVE_LITTLE_ENDIAN);
    return TMP_WORD.getBigUint64(0, NATIVE_LITTLE_ENDIAN);
  }
  return ds.segment.getUint64(ds.byteOffset + byteOffset);
}
function getUint8(byteOffset, s, defaultMask) {
  checkDataBounds(byteOffset, 1, s);
  const ds = getDataSection(s);
  if (defaultMask === void 0) {
    return ds.segment.getUint8(ds.byteOffset + byteOffset);
  }
  return ds.segment.getUint8(ds.byteOffset + byteOffset) ^ defaultMask.getUint8(0);
}
function initData(index, length, s) {
  checkPointerBounds(index, s);
  const ps = getPointerSection(s);
  ps.byteOffset += index * 8;
  const l = new Data(ps.segment, ps.byteOffset, s._capnp.depthLimit - 1);
  erase(l);
  initList$1(ListElementSize.BYTE, length, l);
  return l;
}
function initList(index, ListClass, length, s) {
  checkPointerBounds(index, s);
  const ps = getPointerSection(s);
  ps.byteOffset += index * 8;
  const l = new ListClass(ps.segment, ps.byteOffset, s._capnp.depthLimit - 1);
  erase(l);
  initList$1(ListClass._capnp.size, length, l, ListClass._capnp.compositeSize);
  return l;
}
function setBit(bitOffset, value, s, defaultMask) {
  const byteOffset = Math.floor(bitOffset / 8);
  const bitMask = 1 << bitOffset % 8;
  checkDataBounds(byteOffset, 1, s);
  const ds = getDataSection(s);
  const b = ds.segment.getUint8(ds.byteOffset + byteOffset);
  if (defaultMask !== void 0) {
    value = (defaultMask.getUint8(0) & bitMask) === 0 ? value : !value;
  }
  ds.segment.setUint8(
    ds.byteOffset + byteOffset,
    value ? b | bitMask : b & ~bitMask
  );
}
function setFloat32(byteOffset, value, s, defaultMask) {
  checkDataBounds(byteOffset, 4, s);
  const ds = getDataSection(s);
  if (defaultMask !== void 0) {
    TMP_WORD.setFloat32(0, value, NATIVE_LITTLE_ENDIAN);
    const v = TMP_WORD.getUint32(0, NATIVE_LITTLE_ENDIAN) ^ defaultMask.getUint32(0, true);
    ds.segment.setUint32(ds.byteOffset + byteOffset, v);
    return;
  }
  ds.segment.setFloat32(ds.byteOffset + byteOffset, value);
}
function setFloat64(byteOffset, value, s, defaultMask) {
  checkDataBounds(byteOffset, 8, s);
  const ds = getDataSection(s);
  if (defaultMask !== void 0) {
    TMP_WORD.setFloat64(0, value, NATIVE_LITTLE_ENDIAN);
    const lo = TMP_WORD.getUint32(0, NATIVE_LITTLE_ENDIAN) ^ defaultMask.getUint32(0, true);
    const hi = TMP_WORD.getUint32(4, NATIVE_LITTLE_ENDIAN) ^ defaultMask.getUint32(4, true);
    ds.segment.setUint32(ds.byteOffset + byteOffset, lo);
    ds.segment.setUint32(ds.byteOffset + byteOffset + 4, hi);
    return;
  }
  ds.segment.setFloat64(ds.byteOffset + byteOffset, value);
}
function setInt16(byteOffset, value, s, defaultMask) {
  checkDataBounds(byteOffset, 2, s);
  const ds = getDataSection(s);
  if (defaultMask !== void 0) {
    TMP_WORD.setInt16(0, value, NATIVE_LITTLE_ENDIAN);
    const v = TMP_WORD.getUint16(0, NATIVE_LITTLE_ENDIAN) ^ defaultMask.getUint16(0, true);
    ds.segment.setUint16(ds.byteOffset + byteOffset, v);
    return;
  }
  ds.segment.setInt16(ds.byteOffset + byteOffset, value);
}
function setInt32(byteOffset, value, s, defaultMask) {
  checkDataBounds(byteOffset, 4, s);
  const ds = getDataSection(s);
  if (defaultMask !== void 0) {
    TMP_WORD.setInt32(0, value, NATIVE_LITTLE_ENDIAN);
    const v = TMP_WORD.getUint32(0, NATIVE_LITTLE_ENDIAN) ^ defaultMask.getUint32(0, true);
    ds.segment.setUint32(ds.byteOffset + byteOffset, v);
    return;
  }
  ds.segment.setInt32(ds.byteOffset + byteOffset, value);
}
function setInt64(byteOffset, value, s, defaultMask) {
  checkDataBounds(byteOffset, 8, s);
  const ds = getDataSection(s);
  if (defaultMask !== void 0) {
    TMP_WORD.setBigInt64(0, value, NATIVE_LITTLE_ENDIAN);
    const lo = TMP_WORD.getUint32(NATIVE_LITTLE_ENDIAN ? 0 : 4, NATIVE_LITTLE_ENDIAN) ^ defaultMask.getUint32(0, true);
    const hi = TMP_WORD.getUint32(NATIVE_LITTLE_ENDIAN ? 4 : 0, NATIVE_LITTLE_ENDIAN) ^ defaultMask.getUint32(4, true);
    ds.segment.setUint32(ds.byteOffset + byteOffset, lo);
    ds.segment.setUint32(ds.byteOffset + byteOffset + 4, hi);
    return;
  }
  ds.segment.setInt64(ds.byteOffset + byteOffset, value);
}
function setInt8(byteOffset, value, s, defaultMask) {
  checkDataBounds(byteOffset, 1, s);
  const ds = getDataSection(s);
  if (defaultMask !== void 0) {
    TMP_WORD.setInt8(0, value);
    const v = TMP_WORD.getUint8(0) ^ defaultMask.getUint8(0);
    ds.segment.setUint8(ds.byteOffset + byteOffset, v);
    return;
  }
  ds.segment.setInt8(ds.byteOffset + byteOffset, value);
}
function setText(index, value, s) {
  Text.fromPointer(getPointer(index, s)).set(0, value);
}
function setUint16(byteOffset, value, s, defaultMask) {
  checkDataBounds(byteOffset, 2, s);
  const ds = getDataSection(s);
  if (defaultMask !== void 0) value ^= defaultMask.getUint16(0, true);
  ds.segment.setUint16(ds.byteOffset + byteOffset, value);
}
function setUint32(byteOffset, value, s, defaultMask) {
  checkDataBounds(byteOffset, 4, s);
  const ds = getDataSection(s);
  if (defaultMask !== void 0) value ^= defaultMask.getUint32(0, true);
  ds.segment.setUint32(ds.byteOffset + byteOffset, value);
}
function setUint64(byteOffset, value, s, defaultMask) {
  checkDataBounds(byteOffset, 8, s);
  const ds = getDataSection(s);
  if (defaultMask !== void 0) {
    TMP_WORD.setBigUint64(0, value, NATIVE_LITTLE_ENDIAN);
    const lo = TMP_WORD.getUint32(NATIVE_LITTLE_ENDIAN ? 0 : 4, NATIVE_LITTLE_ENDIAN) ^ defaultMask.getUint32(0, true);
    const hi = TMP_WORD.getUint32(NATIVE_LITTLE_ENDIAN ? 4 : 0, NATIVE_LITTLE_ENDIAN) ^ defaultMask.getUint32(4, true);
    ds.segment.setUint32(ds.byteOffset + byteOffset, lo);
    ds.segment.setUint32(ds.byteOffset + byteOffset + 4, hi);
    return;
  }
  ds.segment.setUint64(ds.byteOffset + byteOffset, value);
}
function setUint8(byteOffset, value, s, defaultMask) {
  checkDataBounds(byteOffset, 1, s);
  const ds = getDataSection(s);
  if (defaultMask !== void 0) value ^= defaultMask.getUint8(0);
  ds.segment.setUint8(ds.byteOffset + byteOffset, value);
}
function testWhich(name, found, wanted, s) {
  if (found !== wanted) {
    throw new Error(format(PTR_INVALID_UNION_ACCESS, s, name, found, wanted));
  }
}
function checkDataBounds(byteOffset, byteLength, s) {
  const dataByteLength = getSize(s).dataByteLength;
  if (byteOffset < 0 || byteLength < 0 || byteOffset + byteLength > dataByteLength) {
    throw new Error(
      format(
        PTR_STRUCT_DATA_OUT_OF_BOUNDS,
        s,
        byteLength,
        byteOffset,
        dataByteLength
      )
    );
  }
}

// node_modules/capnp-es/dist/shared/capnp-es.Cx0B_Qxd.mjs
var ArenaKind = /* @__PURE__ */ ((ArenaKind2) => {
  ArenaKind2[ArenaKind2["SINGLE_SEGMENT"] = 0] = "SINGLE_SEGMENT";
  ArenaKind2[ArenaKind2["MULTI_SEGMENT"] = 1] = "MULTI_SEGMENT";
  return ArenaKind2;
})(ArenaKind || {});
var ArenaAllocationResult = class {
  /**
   * The newly allocated buffer. This buffer might be a copy of an existing segment's buffer with free space appended.
   *
   * @type {ArrayBuffer}
   */
  buffer;
  /**
   * The id of the newly-allocated segment.
   *
   * @type {number}
   */
  id;
  constructor(id, buffer) {
    this.id = id;
    this.buffer = buffer;
  }
};
var MultiSegmentArena = class {
  constructor(buffers = [new ArrayBuffer(DEFAULT_BUFFER_SIZE)]) {
    this.buffers = buffers;
    let i = buffers.length;
    while (--i >= 0) {
      if ((buffers[i].byteLength & 7) !== 0) {
        throw new Error(format(SEG_NOT_WORD_ALIGNED, buffers[i].byteLength));
      }
    }
  }
  static allocate = allocate$2;
  static getBuffer = getBuffer$2;
  static getNumSegments = getNumSegments$2;
  kind = ArenaKind.MULTI_SEGMENT;
  toString() {
    return format("MultiSegmentArena_segments:%d", getNumSegments$2(this));
  }
};
function allocate$2(minSize, m) {
  const b = new ArrayBuffer(padToWord$1(Math.max(minSize, DEFAULT_BUFFER_SIZE)));
  m.buffers.push(b);
  return new ArenaAllocationResult(m.buffers.length - 1, b);
}
function getBuffer$2(id, m) {
  if (id < 0 || id >= m.buffers.length) {
    throw new Error(format(SEG_ID_OUT_OF_BOUNDS, id));
  }
  return m.buffers[id];
}
function getNumSegments$2(m) {
  return m.buffers.length;
}
var SingleSegmentArena = class {
  static allocate = allocate$1;
  static getBuffer = getBuffer$1;
  static getNumSegments = getNumSegments$1;
  buffer;
  kind = ArenaKind.SINGLE_SEGMENT;
  constructor(buffer = new ArrayBuffer(DEFAULT_BUFFER_SIZE)) {
    if ((buffer.byteLength & 7) !== 0) {
      throw new Error(format(SEG_NOT_WORD_ALIGNED, buffer.byteLength));
    }
    this.buffer = buffer;
  }
  toString() {
    return format("SingleSegmentArena_len:%x", this.buffer.byteLength);
  }
};
function allocate$1(minSize, segments, s) {
  const srcBuffer = segments.length > 0 ? segments[0].buffer : s.buffer;
  minSize = minSize < MIN_SINGLE_SEGMENT_GROWTH ? MIN_SINGLE_SEGMENT_GROWTH : padToWord$1(minSize);
  s.buffer = new ArrayBuffer(srcBuffer.byteLength + minSize);
  new Float64Array(s.buffer).set(new Float64Array(srcBuffer));
  return new ArenaAllocationResult(0, s.buffer);
}
function getBuffer$1(id, s) {
  if (id !== 0) throw new Error(format(SEG_GET_NON_ZERO_SINGLE, id));
  return s.buffer;
}
function getNumSegments$1() {
  return 1;
}
var Arena = class {
  static allocate = allocate;
  static copy = copy$1;
  static getBuffer = getBuffer;
  static getNumSegments = getNumSegments;
};
function allocate(minSize, segments, a) {
  switch (a.kind) {
    case ArenaKind.MULTI_SEGMENT: {
      return MultiSegmentArena.allocate(minSize, a);
    }
    case ArenaKind.SINGLE_SEGMENT: {
      return SingleSegmentArena.allocate(minSize, segments, a);
    }
    default: {
      return assertNever(a);
    }
  }
}
function copy$1(a) {
  switch (a.kind) {
    case ArenaKind.MULTI_SEGMENT: {
      let i = a.buffers.length;
      const buffers = Array.from({ length: i });
      while (--i >= 0) {
        buffers[i] = a.buffers[i].slice(0);
      }
      return new MultiSegmentArena(buffers);
    }
    case ArenaKind.SINGLE_SEGMENT: {
      return new SingleSegmentArena(a.buffer.slice(0));
    }
    default: {
      return assertNever(a);
    }
  }
}
function getBuffer(id, a) {
  switch (a.kind) {
    case ArenaKind.MULTI_SEGMENT: {
      return MultiSegmentArena.getBuffer(id, a);
    }
    case ArenaKind.SINGLE_SEGMENT: {
      return SingleSegmentArena.getBuffer(id, a);
    }
    default: {
      return assertNever(a);
    }
  }
}
function getNumSegments(a) {
  switch (a.kind) {
    case ArenaKind.MULTI_SEGMENT: {
      return MultiSegmentArena.getNumSegments(a);
    }
    case ArenaKind.SINGLE_SEGMENT: {
      return SingleSegmentArena.getNumSegments();
    }
    default: {
      return assertNever(a);
    }
  }
}
function getHammingWeight(x) {
  let w = x - (x >> 1 & 1431655765);
  w = (w & 858993459) + (w >> 2 & 858993459);
  return (w + (w >> 4) & 252645135) * 16843009 >> 24;
}
function getTagByte(a, b, c, d, e, f, g, h) {
  return (a === 0 ? 0 : 1) | (b === 0 ? 0 : 2) | (c === 0 ? 0 : 4) | (d === 0 ? 0 : 8) | (e === 0 ? 0 : 16) | (f === 0 ? 0 : 32) | (g === 0 ? 0 : 64) | (h === 0 ? 0 : 128);
}
function getUnpackedByteLength(packed) {
  const p = new Uint8Array(packed);
  let wordCount = 0;
  let lastTag = 119;
  for (let i = 0; i < p.byteLength; ) {
    const tag = p[i];
    if (lastTag === 0) {
      wordCount += tag;
      i++;
      lastTag = 119;
    } else if (lastTag === 255) {
      wordCount += tag;
      i += tag * 8 + 1;
      lastTag = 119;
    } else {
      wordCount++;
      i += getHammingWeight(tag) + 1;
      lastTag = tag;
    }
  }
  return wordCount * 8;
}
function getZeroByteCount(a, b, c, d, e, f, g, h) {
  return (a === 0 ? 1 : 0) + (b === 0 ? 1 : 0) + (c === 0 ? 1 : 0) + (d === 0 ? 1 : 0) + (e === 0 ? 1 : 0) + (f === 0 ? 1 : 0) + (g === 0 ? 1 : 0) + (h === 0 ? 1 : 0);
}
function pack2(unpacked, byteOffset = 0, byteLength) {
  if (unpacked.byteLength % 8 !== 0) throw new Error(MSG_PACK_NOT_WORD_ALIGNED);
  const src3 = new Uint8Array(unpacked, byteOffset, byteLength);
  const dst = [];
  let lastTag = 119;
  let spanWordCountOffset = 0;
  let rangeWordCount = 0;
  for (let srcByteOffset = 0; srcByteOffset < src3.byteLength; srcByteOffset += 8) {
    const a = src3[srcByteOffset];
    const b = src3[srcByteOffset + 1];
    const c = src3[srcByteOffset + 2];
    const d = src3[srcByteOffset + 3];
    const e = src3[srcByteOffset + 4];
    const f = src3[srcByteOffset + 5];
    const g = src3[srcByteOffset + 6];
    const h = src3[srcByteOffset + 7];
    const tag = getTagByte(a, b, c, d, e, f, g, h);
    let skipWriteWord = true;
    switch (lastTag) {
      case 0: {
        if (tag !== 0 || rangeWordCount >= 255) {
          dst.push(rangeWordCount);
          rangeWordCount = 0;
          skipWriteWord = false;
        } else {
          rangeWordCount++;
        }
        break;
      }
      case 255: {
        const zeroCount = getZeroByteCount(a, b, c, d, e, f, g, h);
        if (zeroCount >= PACK_SPAN_THRESHOLD || rangeWordCount >= 255) {
          dst[spanWordCountOffset] = rangeWordCount;
          rangeWordCount = 0;
          skipWriteWord = false;
        } else {
          dst.push(a, b, c, d, e, f, g, h);
          rangeWordCount++;
        }
        break;
      }
      default: {
        skipWriteWord = false;
        break;
      }
    }
    if (skipWriteWord) continue;
    dst.push(tag);
    lastTag = tag;
    if (a !== 0) dst.push(a);
    if (b !== 0) dst.push(b);
    if (c !== 0) dst.push(c);
    if (d !== 0) dst.push(d);
    if (e !== 0) dst.push(e);
    if (f !== 0) dst.push(f);
    if (g !== 0) dst.push(g);
    if (h !== 0) dst.push(h);
    if (tag === 255) {
      spanWordCountOffset = dst.length;
      dst.push(0);
    }
  }
  if (lastTag === 0) {
    dst.push(rangeWordCount);
  } else if (lastTag === 255) {
    dst[spanWordCountOffset] = rangeWordCount;
  }
  return new Uint8Array(dst).buffer;
}
function unpack2(packed) {
  const src3 = new Uint8Array(packed);
  const dst = new Uint8Array(new ArrayBuffer(getUnpackedByteLength(packed)));
  let lastTag = 119;
  for (let srcByteOffset = 0, dstByteOffset = 0; srcByteOffset < src3.byteLength; ) {
    const tag = src3[srcByteOffset];
    if (lastTag === 0) {
      dstByteOffset += tag * 8;
      srcByteOffset++;
      lastTag = 119;
    } else if (lastTag === 255) {
      const spanByteLength = tag * 8;
      dst.set(
        src3.subarray(srcByteOffset + 1, srcByteOffset + 1 + spanByteLength),
        dstByteOffset
      );
      dstByteOffset += spanByteLength;
      srcByteOffset += 1 + spanByteLength;
      lastTag = 119;
    } else {
      srcByteOffset++;
      for (let i = 1; i <= 128; i <<= 1) {
        if ((tag & i) !== 0) dst[dstByteOffset] = src3[srcByteOffset++];
        dstByteOffset++;
      }
      lastTag = tag;
    }
  }
  return dst.buffer;
}
var Segment = class {
  buffer;
  /** The number of bytes currently allocated in the segment. */
  byteLength;
  /**
   * This value should always be zero. It's only here to satisfy the DataView interface.
   *
   * In the future the Segment implementation (or a child class) may allow accessing the buffer from a nonzero offset,
   * but that adds a lot of extra arithmetic.
   */
  byteOffset;
  [Symbol.toStringTag] = "Segment";
  id;
  message;
  _dv;
  constructor(id, message, buffer, byteLength = 0) {
    this.id = id;
    this.message = message;
    this.buffer = buffer;
    this._dv = new DataView(buffer);
    this.byteOffset = 0;
    this.byteLength = byteLength;
  }
  /**
   * Attempt to allocate the requested number of bytes in this segment. If this segment is full this method will return
   * a pointer to freshly allocated space in another segment from the same message.
   *
   * @param {number} byteLength The number of bytes to allocate, will be rounded up to the nearest word.
   * @returns {Pointer} A pointer to the newly allocated space.
   */
  allocate(byteLength) {
    let segment = this;
    byteLength = padToWord$1(byteLength);
    if (byteLength > MAX_SEGMENT_LENGTH - 8) {
      throw new Error(format(SEG_SIZE_OVERFLOW, byteLength));
    }
    if (!segment.hasCapacity(byteLength)) {
      segment = segment.message.allocateSegment(byteLength);
    }
    const byteOffset = segment.byteLength;
    segment.byteLength = segment.byteLength + byteLength;
    return new Pointer(segment, byteOffset);
  }
  /**
   * Quickly copy a word (8 bytes) from `srcSegment` into this one at the given offset.
   *
   * @param {number} byteOffset The offset to write the word to.
   * @param {Segment} srcSegment The segment to copy the word from.
   * @param {number} srcByteOffset The offset from the start of `srcSegment` to copy from.
   * @returns {void}
   */
  copyWord(byteOffset, srcSegment, srcByteOffset) {
    const value = srcSegment._dv.getFloat64(
      srcByteOffset,
      NATIVE_LITTLE_ENDIAN
    );
    this._dv.setFloat64(byteOffset, value, NATIVE_LITTLE_ENDIAN);
  }
  /**
   * Quickly copy words from `srcSegment` into this one.
   *
   * @param {number} byteOffset The offset to start copying into.
   * @param {Segment} srcSegment The segment to copy from.
   * @param {number} srcByteOffset The start offset to copy from.
   * @param {number} wordLength The number of words to copy.
   * @returns {void}
   */
  copyWords(byteOffset, srcSegment, srcByteOffset, wordLength) {
    const dst = new Float64Array(this.buffer, byteOffset, wordLength);
    const src3 = new Float64Array(srcSegment.buffer, srcByteOffset, wordLength);
    dst.set(src3);
  }
  /**
   * Quickly fill a number of words in the buffer with zeroes.
   *
   * @param {number} byteOffset The first byte to set to zero.
   * @param {number} wordLength The number of words (not bytes!) to zero out.
   * @returns {void}
   */
  fillZeroWords(byteOffset, wordLength) {
    new Float64Array(this.buffer, byteOffset, wordLength).fill(0);
  }
  getBigInt64(byteOffset, littleEndian) {
    return this._dv.getBigInt64(byteOffset, littleEndian);
  }
  getBigUint64(byteOffset, littleEndian) {
    return this._dv.getBigUint64(byteOffset, littleEndian);
  }
  /**
   * Get the total number of bytes available in this segment (the size of its underlying buffer).
   *
   * @returns {number} The total number of bytes this segment can hold.
   */
  getCapacity() {
    return this.buffer.byteLength;
  }
  /**
   * Read a float32 value out of this segment.
   *
   * @param {number} byteOffset The offset in bytes to the value.
   * @returns {number} The value.
   */
  getFloat32(byteOffset) {
    return this._dv.getFloat32(byteOffset, true);
  }
  /**
   * Read a float64 value out of this segment.
   *
   * @param {number} byteOffset The offset in bytes to the value.
   * @returns {number} The value.
   */
  getFloat64(byteOffset) {
    return this._dv.getFloat64(byteOffset, true);
  }
  /**
   * Read an int16 value out of this segment.
   *
   * @param {number} byteOffset The offset in bytes to the value.
   * @returns {number} The value.
   */
  getInt16(byteOffset) {
    return this._dv.getInt16(byteOffset, true);
  }
  /**
   * Read an int32 value out of this segment.
   *
   * @param {number} byteOffset The offset in bytes to the value.
   * @returns {number} The value.
   */
  getInt32(byteOffset) {
    return this._dv.getInt32(byteOffset, true);
  }
  /**
   * Read an int64 value out of this segment.
   *
   * @param {number} byteOffset The offset in bytes to the value.
   * @returns {number} The value.
   */
  getInt64(byteOffset) {
    return this._dv.getBigInt64(byteOffset, true);
  }
  /**
   * Read an int8 value out of this segment.
   *
   * @param {number} byteOffset The offset in bytes to the value.
   * @returns {number} The value.
   */
  getInt8(byteOffset) {
    return this._dv.getInt8(byteOffset);
  }
  /**
   * Read a uint16 value out of this segment.
   *
   * @param {number} byteOffset The offset in bytes to the value.
   * @returns {number} The value.
   */
  getUint16(byteOffset) {
    return this._dv.getUint16(byteOffset, true);
  }
  /**
   * Read a uint32 value out of this segment.
   *
   * @param {number} byteOffset The offset in bytes to the value.
   * @returns {number} The value.
   */
  getUint32(byteOffset) {
    return this._dv.getUint32(byteOffset, true);
  }
  /**
   * Read a uint64 value (as a bigint) out of this segment.
   * NOTE: this does not copy the memory region, so updates to the underlying buffer will affect the returned value!
   *
   * @param {number} byteOffset The offset in bytes to the value.
   * @returns {number} The value.
   */
  getUint64(byteOffset) {
    return this._dv.getBigUint64(byteOffset, true);
  }
  /**
   * Read a uint8 value out of this segment.
   *
   * @param {number} byteOffset The offset in bytes to the value.
   * @returns {number} The value.
   */
  getUint8(byteOffset) {
    return this._dv.getUint8(byteOffset);
  }
  hasCapacity(byteLength) {
    return this.buffer.byteLength - this.byteLength >= byteLength;
  }
  /**
   * Quickly check the word at the given offset to see if it is equal to zero.
   *
   * PERF_V8: Fastest way to do this is by reading the whole word as a `number` (float64) in the _native_ endian format
   * and see if it's zero.
   *
   * Benchmark: http://jsben.ch/#/Pjooc
   *
   * @param {number} byteOffset The offset to the word.
   * @returns {boolean} `true` if the word is zero.
   */
  isWordZero(byteOffset) {
    return this._dv.getFloat64(byteOffset, NATIVE_LITTLE_ENDIAN) === 0;
  }
  /**
   * Swap out this segment's underlying buffer with a new one. It's assumed that the new buffer has the same content but
   * more free space, otherwise all existing pointers to this segment will be hilariously broken.
   *
   * @param {ArrayBuffer} buffer The new buffer to use.
   * @returns {void}
   */
  replaceBuffer(buffer) {
    if (this.buffer === buffer) return;
    if (buffer.byteLength < this.byteLength) {
      throw new Error(SEG_REPLACEMENT_BUFFER_TOO_SMALL);
    }
    this._dv = new DataView(buffer);
    this.buffer = buffer;
  }
  setBigInt64(byteOffset, value, littleEndian) {
    this._dv.setBigInt64(byteOffset, value, littleEndian);
  }
  /** WARNING: This function is not yet implemented.  */
  setBigUint64(byteOffset, value, littleEndian) {
    this._dv.setBigUint64(byteOffset, value, littleEndian);
  }
  /**
   * Write a float32 value to the specified offset.
   *
   * @param {number} byteOffset The offset from the beginning of the buffer.
   * @param {number} val The value to store.
   * @returns {void}
   */
  setFloat32(byteOffset, val) {
    this._dv.setFloat32(byteOffset, val, true);
  }
  /**
   * Write an float64 value to the specified offset.
   *
   * @param {number} byteOffset The offset from the beginning of the buffer.
   * @param {number} val The value to store.
   * @returns {void}
   */
  setFloat64(byteOffset, val) {
    this._dv.setFloat64(byteOffset, val, true);
  }
  /**
   * Write an int16 value to the specified offset.
   *
   * @param {number} byteOffset The offset from the beginning of the buffer.
   * @param {number} val The value to store.
   * @returns {void}
   */
  setInt16(byteOffset, val) {
    this._dv.setInt16(byteOffset, val, true);
  }
  /**
   * Write an int32 value to the specified offset.
   *
   * @param {number} byteOffset The offset from the beginning of the buffer.
   * @param {number} val The value to store.
   * @returns {void}
   */
  setInt32(byteOffset, val) {
    this._dv.setInt32(byteOffset, val, true);
  }
  /**
   * Write an int8 value to the specified offset.
   *
   * @param {number} byteOffset The offset from the beginning of the buffer.
   * @param {number} val The value to store.
   * @returns {void}
   */
  setInt8(byteOffset, val) {
    this._dv.setInt8(byteOffset, val);
  }
  /**
   * Write an int64 value to the specified offset.
   *
   * @param {number} byteOffset The offset from the beginning of the buffer.
   * @param {bigint} val The value to store.
   * @returns {void}
   */
  setInt64(byteOffset, val) {
    this._dv.setBigInt64(byteOffset, val, true);
  }
  /**
   * Write a uint16 value to the specified offset.
   *
   * @param {number} byteOffset The offset from the beginning of the buffer.
   * @param {number} val The value to store.
   * @returns {void}
   */
  setUint16(byteOffset, val) {
    this._dv.setUint16(byteOffset, val, true);
  }
  /**
   * Write a uint32 value to the specified offset.
   *
   * @param {number} byteOffset The offset from the beginning of the buffer.
   * @param {number} val The value to store.
   * @returns {void}
   */
  setUint32(byteOffset, val) {
    this._dv.setUint32(byteOffset, val, true);
  }
  /**
   * Write a uint64 value to the specified offset.
   *
   * @param {number} byteOffset The offset from the beginning of the buffer.
   * @param {bigint} val The value to store.
   * @returns {void}
   */
  setUint64(byteOffset, val) {
    this._dv.setBigUint64(byteOffset, val, true);
  }
  /**
   * Write a uint8 (byte) value to the specified offset.
   *
   * @param {number} byteOffset The offset from the beginning of the buffer.
   * @param {number} val The value to store.
   * @returns {void}
   */
  setUint8(byteOffset, val) {
    this._dv.setUint8(byteOffset, val);
  }
  /**
   * Write a zero word (8 bytes) to the specified offset. This is slightly faster than calling `setUint64` or
   * `setFloat64` with a zero value.
   *
   * Benchmark: http://jsben.ch/#/dUdPI
   *
   * @param {number} byteOffset The offset of the word to set to zero.
   * @returns {void}
   */
  setWordZero(byteOffset) {
    this._dv.setFloat64(byteOffset, 0, NATIVE_LITTLE_ENDIAN);
  }
  toString() {
    return format(
      "Segment_id:%d,off:%a,len:%a,cap:%a",
      this.id,
      this.byteLength,
      this.byteOffset,
      this.buffer.byteLength
    );
  }
};
var Message = class {
  static allocateSegment = allocateSegment;
  static dump = dump2;
  static getRoot = getRoot;
  static getSegment = getSegment;
  static initRoot = initRoot;
  static readRawPointer = readRawPointer;
  static toArrayBuffer = toArrayBuffer;
  static toPackedArrayBuffer = toPackedArrayBuffer;
  _capnp;
  /**
   * A Cap'n Proto message.
   *
   * SECURITY WARNING: In Node.js do not pass a Buffer's internal array buffer into this constructor. Pass the buffer
   * directly and everything will be fine. If not, your message will potentially be initialized with random memory
   * contents!
   *
   * The constructor method creates a new Message, optionally using a provided arena for segment allocation, or a buffer
   * to read from.
   *
   * @constructor {Message}
   *
   * @param {AnyArena|ArrayBufferView|ArrayBuffer} [src] The source for the message.
   * A value of `undefined` will cause the message to initialize with a single segment arena only big enough for the
   * root pointer; it will expand as you go. This is a reasonable choice for most messages.
   *
   * Passing an arena will cause the message to use that arena for its segment allocation. Contents will be accepted
   * as-is.
   *
   * Passing an array buffer view (like `DataView`, `Uint8Array` or `Buffer`) will create a **copy** of the source
   * buffer; beware of the potential performance cost!
   *
   * @param {boolean} [packed] Whether or not the message is packed. If `true` (the default), the message will be
   * unpacked.
   *
   * @param {boolean} [singleSegment] If true, `src` will be treated as a message consisting of a single segment without
   * a framing header.
   *
   */
  constructor(src3, packed = true, singleSegment = false) {
    this._capnp = initMessage(src3, packed, singleSegment);
    if (src3) preallocateSegments(this);
  }
  allocateSegment(byteLength) {
    return allocateSegment(byteLength, this);
  }
  /**
   * Copies the contents of this message into an identical message with its own ArrayBuffers.
   *
   * @returns A copy of this message.
   */
  copy() {
    return copy(this);
  }
  /**
   * Create a pretty-printed string dump of this message; incredibly useful for debugging.
   *
   * WARNING: Do not call this method on large messages!
   *
   * @returns {string} A big steaming pile of pretty hex digits.
   */
  dump() {
    return dump2(this);
  }
  /**
   * Get a struct pointer for the root of this message. This is primarily used when reading a message; it will not
   * overwrite existing data.
   *
   * @template T
   * @param {StructCtor<T>} RootStruct The struct type to use as the root.
   * @returns {T} A struct representing the root of the message.
   */
  getRoot(RootStruct) {
    return getRoot(RootStruct, this);
  }
  /**
   * Get a segment by its id.
   *
   * This will lazily allocate the first segment if it doesn't already exist.
   *
   * @param {number} id The segment id.
   * @returns {Segment} The requested segment.
   */
  getSegment(id) {
    return getSegment(id, this);
  }
  /**
   * Initialize a new message using the provided struct type as the root.
   *
   * @template T
   * @param {StructCtor<T>} RootStruct The struct type to use as the root.
   * @returns {T} An initialized struct pointing to the root of the message.
   */
  initRoot(RootStruct) {
    return initRoot(RootStruct, this);
  }
  /**
   * Set the root of the message to a copy of the given pointer. Used internally
   * to make copies of pointers for default values.
   *
   * @param {Pointer} src The source pointer to copy.
   * @returns {void}
   */
  setRoot(src3) {
    setRoot(src3, this);
  }
  /**
   * Combine the contents of this message's segments into a single array buffer and prepend a stream framing header
   * containing information about the following segment data.
   *
   * @returns {ArrayBuffer} An ArrayBuffer with the contents of this message.
   */
  toArrayBuffer() {
    return toArrayBuffer(this);
  }
  /**
   * Like `toArrayBuffer()`, but also applies the packing algorithm to the output. This is typically what you want to
   * use if you're sending the message over a network link or other slow I/O interface where size matters.
   *
   * @returns {ArrayBuffer} A packed message.
   */
  toPackedArrayBuffer() {
    return toPackedArrayBuffer(this);
  }
  addCap(client) {
    if (!this._capnp.capTable) {
      this._capnp.capTable = [];
    }
    const id = this._capnp.capTable.length;
    this._capnp.capTable.push(client);
    return id;
  }
  toString() {
    return `Message_arena:${this._capnp.arena}`;
  }
};
function initMessage(src3, packed = true, singleSegment = false) {
  if (src3 === void 0) {
    return {
      arena: new SingleSegmentArena(),
      segments: [],
      traversalLimit: DEFAULT_TRAVERSE_LIMIT
    };
  }
  if (isAnyArena(src3)) {
    return { arena: src3, segments: [], traversalLimit: DEFAULT_TRAVERSE_LIMIT };
  }
  let buf = src3;
  if (isArrayBufferView(buf)) {
    buf = buf.buffer.slice(
      buf.byteOffset,
      buf.byteOffset + buf.byteLength
    );
  }
  if (packed) buf = unpack2(buf);
  if (singleSegment) {
    return {
      arena: new SingleSegmentArena(buf),
      segments: [],
      traversalLimit: DEFAULT_TRAVERSE_LIMIT
    };
  }
  return {
    arena: new MultiSegmentArena(getFramedSegments(buf)),
    segments: [],
    traversalLimit: DEFAULT_TRAVERSE_LIMIT
  };
}
function getFramedSegments(message) {
  const dv = new DataView(message);
  const segmentCount = dv.getUint32(0, true) + 1;
  const segments = Array.from({ length: segmentCount });
  let byteOffset = 4 + segmentCount * 4;
  byteOffset += byteOffset % 8;
  if (byteOffset + segmentCount * 4 > message.byteLength) {
    throw new Error(MSG_INVALID_FRAME_HEADER);
  }
  for (let i = 0; i < segmentCount; i++) {
    const byteLength = dv.getUint32(4 + i * 4, true) * 8;
    if (byteOffset + byteLength > message.byteLength) {
      throw new Error(MSG_INVALID_FRAME_HEADER);
    }
    segments[i] = message.slice(byteOffset, byteOffset + byteLength);
    byteOffset += byteLength;
  }
  return segments;
}
function preallocateSegments(m) {
  const numSegments = Arena.getNumSegments(m._capnp.arena);
  m._capnp.segments = Array.from({ length: numSegments });
  for (let i = 0; i < numSegments; i++) {
    if (i === 0 && Arena.getBuffer(i, m._capnp.arena).byteLength < 8) {
      throw new Error(MSG_SEGMENT_TOO_SMALL);
    }
    const buffer = Arena.getBuffer(i, m._capnp.arena);
    const segment = new Segment(i, m, buffer, buffer.byteLength);
    m._capnp.segments[i] = segment;
  }
}
function isArrayBufferView(src3) {
  return src3.byteOffset !== void 0;
}
function isAnyArena(o) {
  return o.kind !== void 0;
}
function allocateSegment(byteLength, m) {
  const res = Arena.allocate(byteLength, m._capnp.segments, m._capnp.arena);
  let s;
  if (res.id === m._capnp.segments.length) {
    s = new Segment(res.id, m, res.buffer);
    m._capnp.segments.push(s);
  } else if (res.id < 0 || res.id > m._capnp.segments.length) {
    throw new Error(format(MSG_SEGMENT_OUT_OF_BOUNDS, res.id, m));
  } else {
    s = m._capnp.segments[res.id];
    s.replaceBuffer(res.buffer);
  }
  return s;
}
function dump2(m) {
  let r = "";
  if (m._capnp.segments.length === 0) {
    return "================\nNo Segments\n================\n";
  }
  for (let i = 0; i < m._capnp.segments.length; i++) {
    r += `================
Segment #${i}
================
`;
    const { buffer, byteLength } = m._capnp.segments[i];
    const b = new Uint8Array(buffer, 0, byteLength);
    r += dumpBuffer(b);
  }
  return r;
}
function getRoot(RootStruct, m) {
  const root = new RootStruct(m.getSegment(0), 0);
  validate(PointerType.STRUCT, root);
  const ts = getTargetStructSize(root);
  if (ts.dataByteLength < RootStruct._capnp.size.dataByteLength || ts.pointerLength < RootStruct._capnp.size.pointerLength) {
    resize(RootStruct._capnp.size, root);
  }
  return root;
}
function getSegment(id, m) {
  const segmentLength = m._capnp.segments.length;
  if (id === 0 && segmentLength === 0) {
    const arenaSegments = Arena.getNumSegments(m._capnp.arena);
    if (arenaSegments === 0) {
      allocateSegment(DEFAULT_BUFFER_SIZE, m);
    } else {
      m._capnp.segments[0] = new Segment(
        0,
        m,
        Arena.getBuffer(0, m._capnp.arena)
      );
    }
    if (!m._capnp.segments[0].hasCapacity(8)) {
      throw new Error(MSG_SEGMENT_TOO_SMALL);
    }
    m._capnp.segments[0].allocate(8);
    return m._capnp.segments[0];
  }
  if (id < 0 || id >= segmentLength) {
    throw new Error(format(MSG_SEGMENT_OUT_OF_BOUNDS, id, m));
  }
  return m._capnp.segments[id];
}
function initRoot(RootStruct, m) {
  const root = new RootStruct(m.getSegment(0), 0);
  initStruct(RootStruct._capnp.size, root);
  return root;
}
function readRawPointer(data) {
  return new Pointer(new Message(data).getSegment(0), 0);
}
function setRoot(src3, m) {
  copyFrom(src3, new Pointer(m.getSegment(0), 0));
}
function toArrayBuffer(m) {
  const streamFrame = getStreamFrame(m);
  if (m._capnp.segments.length === 0) getSegment(0, m);
  const segments = m._capnp.segments;
  const totalLength = streamFrame.byteLength + segments.reduce((l, s) => l + padToWord$1(s.byteLength), 0);
  const out = new Uint8Array(new ArrayBuffer(totalLength));
  let o = streamFrame.byteLength;
  out.set(new Uint8Array(streamFrame));
  for (const s of segments) {
    const segmentLength = padToWord$1(s.byteLength);
    out.set(new Uint8Array(s.buffer, 0, segmentLength), o);
    o += segmentLength;
  }
  return out.buffer;
}
function toPackedArrayBuffer(m) {
  const streamFrame = pack2(getStreamFrame(m));
  if (m._capnp.segments.length === 0) m.getSegment(0);
  const segments = m._capnp.segments.map(
    (s) => pack2(s.buffer, 0, padToWord$1(s.byteLength))
  );
  const totalLength = streamFrame.byteLength + segments.reduce((l, s) => l + s.byteLength, 0);
  const out = new Uint8Array(new ArrayBuffer(totalLength));
  let o = streamFrame.byteLength;
  out.set(new Uint8Array(streamFrame));
  for (const s of segments) {
    out.set(new Uint8Array(s), o);
    o += s.byteLength;
  }
  return out.buffer;
}
function getStreamFrame(m) {
  const length = m._capnp.segments.length;
  if (length === 0) {
    return new Float64Array(1).buffer;
  }
  const frameLength = 4 + length * 4 + (1 - length % 2) * 4;
  const out = new DataView(new ArrayBuffer(frameLength));
  out.setUint32(0, length - 1, true);
  for (const [i, s] of m._capnp.segments.entries()) {
    out.setUint32(i * 4 + 4, s.byteLength / 8, true);
  }
  return out.buffer;
}
function copy(m) {
  return new Message(Arena.copy(m._capnp.arena));
}

// node_modules/capnp-es/dist/shared/capnp-es.DCKndyix.mjs
function CompositeList(CompositeClass) {
  return class extends List {
    static _capnp = {
      compositeSize: CompositeClass._capnp.size,
      displayName: `List<${CompositeClass._capnp.displayName}>`,
      size: ListElementSize.COMPOSITE
    };
    get(index) {
      return new CompositeClass(
        this.segment,
        this.byteOffset,
        this._capnp.depthLimit - 1,
        index
      );
    }
    set(index, value) {
      copyFrom(value, this.get(index));
    }
    [Symbol.toStringTag]() {
      return `Composite_${super.toString()},cls:${CompositeClass.toString()}`;
    }
  };
}
function _makePrimitiveMaskFn(byteLength, setter) {
  return (x) => {
    const dv = new DataView(new ArrayBuffer(byteLength));
    setter.call(dv, 0, x, true);
    return dv;
  };
}
var getFloat32Mask = _makePrimitiveMaskFn(
  4,
  DataView.prototype.setFloat32
);
var getFloat64Mask = _makePrimitiveMaskFn(
  8,
  DataView.prototype.setFloat64
);
var getInt16Mask = _makePrimitiveMaskFn(
  2,
  DataView.prototype.setInt16
);
var getInt32Mask = _makePrimitiveMaskFn(
  4,
  DataView.prototype.setInt32
);
var getInt64Mask = _makePrimitiveMaskFn(
  8,
  DataView.prototype.setBigInt64
);
var getInt8Mask = _makePrimitiveMaskFn(1, DataView.prototype.setInt8);
var getUint16Mask = _makePrimitiveMaskFn(
  2,
  DataView.prototype.setUint16
);
var getUint32Mask = _makePrimitiveMaskFn(
  4,
  DataView.prototype.setUint32
);
var getUint64Mask = _makePrimitiveMaskFn(
  8,
  DataView.prototype.setBigUint64
);
var getUint8Mask = _makePrimitiveMaskFn(
  1,
  DataView.prototype.setUint8
);

// node_modules/capnp-es/dist/shared/capnp-es.B1ADXvSS.mjs
var Interface = class extends Pointer {
  static _capnp = {
    displayName: "Interface"
  };
  static getCapID = getCapID;
  static getAsInterface = getAsInterface;
  static isInterface = isInterface;
  static getClient = getClient;
  constructor(segment, byteOffset, depthLimit = MAX_DEPTH) {
    super(segment, byteOffset, depthLimit);
  }
  static fromPointer(p) {
    return getAsInterface(p);
  }
  getCapId() {
    return getCapID(this);
  }
  getClient() {
    return getClient(this);
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return format(
      "Interface_%d@%a,%d,limit:%x",
      this.segment.id,
      this.byteOffset,
      this.getCapId(),
      this._capnp.depthLimit
    );
  }
};
function getAsInterface(p) {
  if (getTargetPointerType(p) === PointerType.OTHER) {
    return new Interface(p.segment, p.byteOffset, p._capnp.depthLimit);
  }
  return null;
}
function isInterface(p) {
  return getTargetPointerType(p) === PointerType.OTHER;
}
function getCapID(i) {
  if (i.segment.getUint32(i.byteOffset) !== PointerType.OTHER) {
    return -1;
  }
  return i.segment.getUint32(i.byteOffset + 4);
}
function getClient(i) {
  const capID = getCapID(i);
  const { capTable } = i.segment.message._capnp;
  if (!capTable) {
    return null;
  }
  return capTable[capID];
}

// node_modules/capnp-es/dist/index.mjs
var Void = class extends Struct {
  static _capnp = {
    displayName: "Void",
    id: "0",
    size: new ObjectSize(0, 0)
  };
};
var utils = {
  __proto__: null,
  PointerAllocationResult,
  add,
  adopt,
  checkDataBounds,
  checkPointerBounds,
  copyFrom,
  copyFromInterface,
  copyFromList,
  copyFromStruct,
  disown,
  dump,
  erase,
  erasePointer,
  followFar,
  followFars,
  getAs,
  getBit,
  getCapabilityId,
  getContent,
  getData,
  getDataSection,
  getFarSegmentId,
  getFloat32,
  getFloat64,
  getInt16,
  getInt32,
  getInt64,
  getInt8,
  getInterfaceClientOrNull,
  getInterfaceClientOrNullAt,
  getInterfacePointer,
  getList,
  getListByteLength,
  getListElementByteLength,
  getListElementSize,
  getListLength,
  getOffsetWords,
  getPointer,
  getPointerAs,
  getPointerSection,
  getPointerType,
  getSize,
  getStruct,
  getStructDataWords,
  getStructPointerLength,
  getStructSize,
  getTargetCompositeListSize,
  getTargetCompositeListTag,
  getTargetListElementSize,
  getTargetListLength,
  getTargetPointerType,
  getTargetStructSize,
  getText,
  getUint16,
  getUint32,
  getUint64,
  getUint8,
  initData,
  initList,
  initPointer,
  initStruct,
  initStructAt,
  isDoubleFar,
  isNull,
  relocateTo,
  resize,
  setBit,
  setFarPointer,
  setFloat32,
  setFloat64,
  setInt16,
  setInt32,
  setInt64,
  setInt8,
  setInterfacePointer,
  setListPointer,
  setStructPointer,
  setText,
  setUint16,
  setUint32,
  setUint64,
  setUint8,
  testWhich,
  trackPointerAllocation,
  validate
};
function PointerList(PointerClass) {
  return class extends List {
    static _capnp = {
      displayName: `List<${PointerClass._capnp.displayName}>`,
      size: ListElementSize.POINTER
    };
    get(index) {
      const c = getContent(this);
      return new PointerClass(
        c.segment,
        c.byteOffset + index * 8,
        this._capnp.depthLimit - 1
      );
    }
    set(index, value) {
      copyFrom(value, this.get(index));
    }
    [Symbol.toStringTag]() {
      return `Pointer_${super.toString()},cls:${PointerClass.toString()}`;
    }
  };
}
var AnyPointerList = PointerList(Pointer);
var BoolList = class extends List {
  static _capnp = {
    displayName: "List<boolean>",
    size: ListElementSize.BIT
  };
  get(index) {
    const bitMask = 1 << index % 8;
    const byteOffset = index >>> 3;
    const c = getContent(this);
    const v = c.segment.getUint8(c.byteOffset + byteOffset);
    return (v & bitMask) !== 0;
  }
  set(index, value) {
    const bitMask = 1 << index % 8;
    const c = getContent(this);
    const byteOffset = c.byteOffset + (index >>> 3);
    const v = c.segment.getUint8(byteOffset);
    c.segment.setUint8(byteOffset, value ? v | bitMask : v & ~bitMask);
  }
  [Symbol.toStringTag]() {
    return `Bool_${super.toString()}`;
  }
};
var DataList = PointerList(Data);
var Float32List = class extends List {
  static _capnp = {
    displayName: "List<Float32>",
    size: ListElementSize.BYTE_4
  };
  get(index) {
    const c = getContent(this);
    return c.segment.getFloat32(c.byteOffset + index * 4);
  }
  set(index, value) {
    const c = getContent(this);
    c.segment.setFloat32(c.byteOffset + index * 4, value);
  }
  [Symbol.toStringTag]() {
    return `Float32_${super.toString()}`;
  }
};
var Float64List = class extends List {
  static _capnp = {
    displayName: "List<Float64>",
    size: ListElementSize.BYTE_8
  };
  get(index) {
    const c = getContent(this);
    return c.segment.getFloat64(c.byteOffset + index * 8);
  }
  set(index, value) {
    const c = getContent(this);
    c.segment.setFloat64(c.byteOffset + index * 8, value);
  }
  [Symbol.toStringTag]() {
    return `Float64_${super.toString()}`;
  }
};
var Int8List = class extends List {
  static _capnp = {
    displayName: "List<Int8>",
    size: ListElementSize.BYTE
  };
  get(index) {
    const c = getContent(this);
    return c.segment.getInt8(c.byteOffset + index);
  }
  set(index, value) {
    const c = getContent(this);
    c.segment.setInt8(c.byteOffset + index, value);
  }
  [Symbol.toStringTag]() {
    return `Int8_${super.toString()}`;
  }
};
var Int16List = class extends List {
  static _capnp = {
    displayName: "List<Int16>",
    size: ListElementSize.BYTE_2
  };
  get(index) {
    const c = getContent(this);
    return c.segment.getInt16(c.byteOffset + index * 2);
  }
  set(index, value) {
    const c = getContent(this);
    c.segment.setInt16(c.byteOffset + index * 2, value);
  }
  [Symbol.toStringTag]() {
    return `Int16_${super.toString()}`;
  }
};
var Int32List = class extends List {
  static _capnp = {
    displayName: "List<Int32>",
    size: ListElementSize.BYTE_4
  };
  get(index) {
    const c = getContent(this);
    return c.segment.getInt32(c.byteOffset + index * 4);
  }
  set(index, value) {
    const c = getContent(this);
    c.segment.setInt32(c.byteOffset + index * 4, value);
  }
  [Symbol.toStringTag]() {
    return `Int32_${super.toString()}`;
  }
};
var Int64List = class extends List {
  static _capnp = {
    displayName: "List<Int64>",
    size: ListElementSize.BYTE_8
  };
  get(index) {
    const c = getContent(this);
    return c.segment.getInt64(c.byteOffset + index * 8);
  }
  set(index, value) {
    const c = getContent(this);
    c.segment.setInt64(c.byteOffset + index * 8, value);
  }
  [Symbol.toStringTag]() {
    return `Int64_${super.toString()}`;
  }
};
var InterfaceList = PointerList(Interface);
var TextList = class extends List {
  static _capnp = {
    displayName: "List<Text>",
    size: ListElementSize.POINTER
  };
  get(index) {
    const c = getContent(this);
    c.byteOffset += index * 8;
    return Text.fromPointer(c).get(0);
  }
  set(index, value) {
    const c = getContent(this);
    c.byteOffset += index * 8;
    Text.fromPointer(c).set(0, value);
  }
  [Symbol.toStringTag]() {
    return `Text_${super.toString()}`;
  }
};
var Uint8List = class extends List {
  static _capnp = {
    displayName: "List<Uint8>",
    size: ListElementSize.BYTE
  };
  get(index) {
    const c = getContent(this);
    return c.segment.getUint8(c.byteOffset + index);
  }
  set(index, value) {
    const c = getContent(this);
    c.segment.setUint8(c.byteOffset + index, value);
  }
  [Symbol.toStringTag]() {
    return `Uint8_${super.toString()}`;
  }
};
var Uint16List = class extends List {
  static _capnp = {
    displayName: "List<Uint16>",
    size: ListElementSize.BYTE_2
  };
  get(index) {
    const c = getContent(this);
    return c.segment.getUint16(c.byteOffset + index * 2);
  }
  set(index, value) {
    const c = getContent(this);
    c.segment.setUint16(c.byteOffset + index * 2, value);
  }
  [Symbol.toStringTag]() {
    return `Uint16_${super.toString()}`;
  }
};
var Uint32List = class extends List {
  static _capnp = {
    displayName: "List<Uint32>",
    size: ListElementSize.BYTE_4
  };
  get(index) {
    const c = getContent(this);
    return c.segment.getUint32(c.byteOffset + index * 4);
  }
  set(index, value) {
    const c = getContent(this);
    c.segment.setUint32(c.byteOffset + index * 4, value);
  }
  [Symbol.toStringTag]() {
    return `Uint32_${super.toString()}`;
  }
};
var Uint64List = class extends List {
  static _capnp = {
    displayName: "List<Uint64>",
    size: ListElementSize.BYTE_8
  };
  get(index) {
    const c = getContent(this);
    return c.segment.getUint64(c.byteOffset + index * 8);
  }
  set(index, value) {
    const c = getContent(this);
    c.segment.setUint64(c.byteOffset + index * 8, value);
  }
  [Symbol.toStringTag]() {
    return `Uint64_${super.toString()}`;
  }
};
var VoidList = PointerList(Void);
var ConnWeakRefRegistry = globalThis.FinalizationRegistry ? new FinalizationRegistry((cb) => cb()) : void 0;

// capnp_trip.js
var _capnpFileId = BigInt("0xea5a8c37a1dc24de");
var Trip2 = class extends Struct {
  static _capnp = {
    displayName: "Trip",
    id: "923fdeee6e7a9a4d",
    size: new ObjectSize(56, 5)
  };
  get rideId() {
    return utils.getText(0, this);
  }
  set rideId(value) {
    utils.setText(0, value, this);
  }
  get rideableType() {
    return utils.getUint16(0, this);
  }
  set rideableType(value) {
    utils.setUint16(0, value, this);
  }
  get startedAtMs() {
    return utils.getInt64(8, this);
  }
  set startedAtMs(value) {
    utils.setInt64(8, value, this);
  }
  get endedAtMs() {
    return utils.getInt64(16, this);
  }
  set endedAtMs(value) {
    utils.setInt64(16, value, this);
  }
  get startStationName() {
    return utils.getText(1, this);
  }
  set startStationName(value) {
    utils.setText(1, value, this);
  }
  get startStationId() {
    return utils.getText(2, this);
  }
  set startStationId(value) {
    utils.setText(2, value, this);
  }
  get endStationName() {
    return utils.getText(3, this);
  }
  set endStationName(value) {
    utils.setText(3, value, this);
  }
  get endStationId() {
    return utils.getText(4, this);
  }
  set endStationId(value) {
    utils.setText(4, value, this);
  }
  get startLat() {
    return utils.getFloat64(24, this);
  }
  set startLat(value) {
    utils.setFloat64(24, value, this);
  }
  get startLng() {
    return utils.getFloat64(32, this);
  }
  set startLng(value) {
    utils.setFloat64(32, value, this);
  }
  get endLat() {
    return utils.getFloat64(40, this);
  }
  set endLat(value) {
    utils.setFloat64(40, value, this);
  }
  get endLng() {
    return utils.getFloat64(48, this);
  }
  set endLng(value) {
    utils.setFloat64(48, value, this);
  }
  get memberCasual() {
    return utils.getUint16(2, this);
  }
  set memberCasual(value) {
    utils.setUint16(2, value, this);
  }
  toString() {
    return "Trip_" + super.toString();
  }
};
var ServerResponseAll2 = class _ServerResponseAll extends Struct {
  static _capnp = {
    displayName: "ServerResponseAll",
    id: "af9b587efc9700d0",
    size: new ObjectSize(0, 1)
  };
  static _Trips;
  _adoptTrips(value) {
    utils.adopt(value, utils.getPointer(0, this));
  }
  _disownTrips() {
    return utils.disown(this.trips);
  }
  get trips() {
    return utils.getList(0, _ServerResponseAll._Trips, this);
  }
  _hasTrips() {
    return !utils.isNull(utils.getPointer(0, this));
  }
  _initTrips(length) {
    return utils.initList(0, _ServerResponseAll._Trips, length, this);
  }
  set trips(value) {
    utils.copyFrom(value, utils.getPointer(0, this));
  }
  toString() {
    return "ServerResponseAll_" + super.toString();
  }
};
ServerResponseAll2._Trips = CompositeList(Trip2);

// node_modules/flatbuffers/mjs/constants.js
var SIZEOF_INT = 4;
var FILE_IDENTIFIER_LENGTH = 4;
var SIZE_PREFIX_LENGTH = 4;

// node_modules/flatbuffers/mjs/utils.js
var int32 = new Int32Array(2);
var float32 = new Float32Array(int32.buffer);
var float64 = new Float64Array(int32.buffer);
var isLittleEndian = new Uint16Array(new Uint8Array([1, 0]).buffer)[0] === 1;

// node_modules/flatbuffers/mjs/encoding.js
var Encoding;
(function(Encoding2) {
  Encoding2[Encoding2["UTF8_BYTES"] = 1] = "UTF8_BYTES";
  Encoding2[Encoding2["UTF16_STRING"] = 2] = "UTF16_STRING";
})(Encoding || (Encoding = {}));

// node_modules/flatbuffers/mjs/byte-buffer.js
var ByteBuffer = class _ByteBuffer {
  /**
   * Create a new ByteBuffer with a given array of bytes (`Uint8Array`)
   */
  constructor(bytes_) {
    this.bytes_ = bytes_;
    this.position_ = 0;
    this.text_decoder_ = new TextDecoder();
  }
  /**
   * Create and allocate a new ByteBuffer with a given size.
   */
  static allocate(byte_size) {
    return new _ByteBuffer(new Uint8Array(byte_size));
  }
  clear() {
    this.position_ = 0;
  }
  /**
   * Get the underlying `Uint8Array`.
   */
  bytes() {
    return this.bytes_;
  }
  /**
   * Get the buffer's position.
   */
  position() {
    return this.position_;
  }
  /**
   * Set the buffer's position.
   */
  setPosition(position5) {
    this.position_ = position5;
  }
  /**
   * Get the buffer's capacity.
   */
  capacity() {
    return this.bytes_.length;
  }
  readInt8(offset) {
    return this.readUint8(offset) << 24 >> 24;
  }
  readUint8(offset) {
    return this.bytes_[offset];
  }
  readInt16(offset) {
    return this.readUint16(offset) << 16 >> 16;
  }
  readUint16(offset) {
    return this.bytes_[offset] | this.bytes_[offset + 1] << 8;
  }
  readInt32(offset) {
    return this.bytes_[offset] | this.bytes_[offset + 1] << 8 | this.bytes_[offset + 2] << 16 | this.bytes_[offset + 3] << 24;
  }
  readUint32(offset) {
    return this.readInt32(offset) >>> 0;
  }
  readInt64(offset) {
    return BigInt.asIntN(64, BigInt(this.readUint32(offset)) + (BigInt(this.readUint32(offset + 4)) << BigInt(32)));
  }
  readUint64(offset) {
    return BigInt.asUintN(64, BigInt(this.readUint32(offset)) + (BigInt(this.readUint32(offset + 4)) << BigInt(32)));
  }
  readFloat32(offset) {
    int32[0] = this.readInt32(offset);
    return float32[0];
  }
  readFloat64(offset) {
    int32[isLittleEndian ? 0 : 1] = this.readInt32(offset);
    int32[isLittleEndian ? 1 : 0] = this.readInt32(offset + 4);
    return float64[0];
  }
  writeInt8(offset, value) {
    this.bytes_[offset] = value;
  }
  writeUint8(offset, value) {
    this.bytes_[offset] = value;
  }
  writeInt16(offset, value) {
    this.bytes_[offset] = value;
    this.bytes_[offset + 1] = value >> 8;
  }
  writeUint16(offset, value) {
    this.bytes_[offset] = value;
    this.bytes_[offset + 1] = value >> 8;
  }
  writeInt32(offset, value) {
    this.bytes_[offset] = value;
    this.bytes_[offset + 1] = value >> 8;
    this.bytes_[offset + 2] = value >> 16;
    this.bytes_[offset + 3] = value >> 24;
  }
  writeUint32(offset, value) {
    this.bytes_[offset] = value;
    this.bytes_[offset + 1] = value >> 8;
    this.bytes_[offset + 2] = value >> 16;
    this.bytes_[offset + 3] = value >> 24;
  }
  writeInt64(offset, value) {
    this.writeInt32(offset, Number(BigInt.asIntN(32, value)));
    this.writeInt32(offset + 4, Number(BigInt.asIntN(32, value >> BigInt(32))));
  }
  writeUint64(offset, value) {
    this.writeUint32(offset, Number(BigInt.asUintN(32, value)));
    this.writeUint32(offset + 4, Number(BigInt.asUintN(32, value >> BigInt(32))));
  }
  writeFloat32(offset, value) {
    float32[0] = value;
    this.writeInt32(offset, int32[0]);
  }
  writeFloat64(offset, value) {
    float64[0] = value;
    this.writeInt32(offset, int32[isLittleEndian ? 0 : 1]);
    this.writeInt32(offset + 4, int32[isLittleEndian ? 1 : 0]);
  }
  /**
   * Return the file identifier.   Behavior is undefined for FlatBuffers whose
   * schema does not include a file_identifier (likely points at padding or the
   * start of a the root vtable).
   */
  getBufferIdentifier() {
    if (this.bytes_.length < this.position_ + SIZEOF_INT + FILE_IDENTIFIER_LENGTH) {
      throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");
    }
    let result = "";
    for (let i = 0; i < FILE_IDENTIFIER_LENGTH; i++) {
      result += String.fromCharCode(this.readInt8(this.position_ + SIZEOF_INT + i));
    }
    return result;
  }
  /**
   * Look up a field in the vtable, return an offset into the object, or 0 if the
   * field is not present.
   */
  __offset(bb_pos, vtable_offset) {
    const vtable = bb_pos - this.readInt32(bb_pos);
    return vtable_offset < this.readInt16(vtable) ? this.readInt16(vtable + vtable_offset) : 0;
  }
  /**
   * Initialize any Table-derived type to point to the union at the given offset.
   */
  __union(t, offset) {
    t.bb_pos = offset + this.readInt32(offset);
    t.bb = this;
    return t;
  }
  /**
   * Create a JavaScript string from UTF-8 data stored inside the FlatBuffer.
   * This allocates a new string and converts to wide chars upon each access.
   *
   * To avoid the conversion to string, pass Encoding.UTF8_BYTES as the
   * "optionalEncoding" argument. This is useful for avoiding conversion when
   * the data will just be packaged back up in another FlatBuffer later on.
   *
   * @param offset
   * @param opt_encoding Defaults to UTF16_STRING
   */
  __string(offset, opt_encoding) {
    offset += this.readInt32(offset);
    const length = this.readInt32(offset);
    offset += SIZEOF_INT;
    const utf8bytes = this.bytes_.subarray(offset, offset + length);
    if (opt_encoding === Encoding.UTF8_BYTES)
      return utf8bytes;
    else
      return this.text_decoder_.decode(utf8bytes);
  }
  /**
   * Handle unions that can contain string as its member, if a Table-derived type then initialize it,
   * if a string then return a new one
   *
   * WARNING: strings are immutable in JS so we can't change the string that the user gave us, this
   * makes the behaviour of __union_with_string different compared to __union
   */
  __union_with_string(o, offset) {
    if (typeof o === "string") {
      return this.__string(offset);
    }
    return this.__union(o, offset);
  }
  /**
   * Retrieve the relative offset stored at "offset"
   */
  __indirect(offset) {
    return offset + this.readInt32(offset);
  }
  /**
   * Get the start of data of a vector whose offset is stored at "offset" in this object.
   */
  __vector(offset) {
    return offset + this.readInt32(offset) + SIZEOF_INT;
  }
  /**
   * Get the length of a vector whose offset is stored at "offset" in this object.
   */
  __vector_len(offset) {
    return this.readInt32(offset + this.readInt32(offset));
  }
  __has_identifier(ident) {
    if (ident.length != FILE_IDENTIFIER_LENGTH) {
      throw new Error("FlatBuffers: file identifier must be length " + FILE_IDENTIFIER_LENGTH);
    }
    for (let i = 0; i < FILE_IDENTIFIER_LENGTH; i++) {
      if (ident.charCodeAt(i) != this.readInt8(this.position() + SIZEOF_INT + i)) {
        return false;
      }
    }
    return true;
  }
  /**
   * A helper function for generating list for obj api
   */
  createScalarList(listAccessor, listLength) {
    const ret = [];
    for (let i = 0; i < listLength; ++i) {
      const val = listAccessor(i);
      if (val !== null) {
        ret.push(val);
      }
    }
    return ret;
  }
  /**
   * A helper function for generating list for obj api
   * @param listAccessor function that accepts an index and return data at that index
   * @param listLength listLength
   * @param res result list
   */
  createObjList(listAccessor, listLength) {
    const ret = [];
    for (let i = 0; i < listLength; ++i) {
      const val = listAccessor(i);
      if (val !== null) {
        ret.push(val.unpack());
      }
    }
    return ret;
  }
};

// flatbuffers/trip.ts
var Trip3 = class _Trip {
  bb = null;
  bb_pos = 0;
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsTrip(bb, obj) {
    return (obj || new _Trip()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsTrip(bb, obj) {
    bb.setPosition(bb.position() + SIZE_PREFIX_LENGTH);
    return (obj || new _Trip()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  rideId(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  rideableType() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : 0 /* UNKNOWN_RIDEABLE_TYPE */;
  }
  startedAtMs() {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.readInt64(this.bb_pos + offset) : BigInt("0");
  }
  endedAtMs() {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.readInt64(this.bb_pos + offset) : BigInt("0");
  }
  startStationName(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  startStationId(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  endStationName(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  endStationId(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 18);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  startLat() {
    const offset = this.bb.__offset(this.bb_pos, 20);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  startLng() {
    const offset = this.bb.__offset(this.bb_pos, 22);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  endLat() {
    const offset = this.bb.__offset(this.bb_pos, 24);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  endLng() {
    const offset = this.bb.__offset(this.bb_pos, 26);
    return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0;
  }
  memberCasual() {
    const offset = this.bb.__offset(this.bb_pos, 28);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : 0 /* UNKNOWN_MEMBER_CASUAL */;
  }
  static startTrip(builder) {
    builder.startObject(13);
  }
  static addRideId(builder, rideIdOffset) {
    builder.addFieldOffset(0, rideIdOffset, 0);
  }
  static addRideableType(builder, rideableType) {
    builder.addFieldInt8(1, rideableType, 0 /* UNKNOWN_RIDEABLE_TYPE */);
  }
  static addStartedAtMs(builder, startedAtMs) {
    builder.addFieldInt64(2, startedAtMs, BigInt("0"));
  }
  static addEndedAtMs(builder, endedAtMs) {
    builder.addFieldInt64(3, endedAtMs, BigInt("0"));
  }
  static addStartStationName(builder, startStationNameOffset) {
    builder.addFieldOffset(4, startStationNameOffset, 0);
  }
  static addStartStationId(builder, startStationIdOffset) {
    builder.addFieldOffset(5, startStationIdOffset, 0);
  }
  static addEndStationName(builder, endStationNameOffset) {
    builder.addFieldOffset(6, endStationNameOffset, 0);
  }
  static addEndStationId(builder, endStationIdOffset) {
    builder.addFieldOffset(7, endStationIdOffset, 0);
  }
  static addStartLat(builder, startLat) {
    builder.addFieldFloat64(8, startLat, 0);
  }
  static addStartLng(builder, startLng) {
    builder.addFieldFloat64(9, startLng, 0);
  }
  static addEndLat(builder, endLat) {
    builder.addFieldFloat64(10, endLat, 0);
  }
  static addEndLng(builder, endLng) {
    builder.addFieldFloat64(11, endLng, 0);
  }
  static addMemberCasual(builder, memberCasual) {
    builder.addFieldInt8(12, memberCasual, 0 /* UNKNOWN_MEMBER_CASUAL */);
  }
  static endTrip(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createTrip(builder, rideIdOffset, rideableType, startedAtMs, endedAtMs, startStationNameOffset, startStationIdOffset, endStationNameOffset, endStationIdOffset, startLat, startLng, endLat, endLng, memberCasual) {
    _Trip.startTrip(builder);
    _Trip.addRideId(builder, rideIdOffset);
    _Trip.addRideableType(builder, rideableType);
    _Trip.addStartedAtMs(builder, startedAtMs);
    _Trip.addEndedAtMs(builder, endedAtMs);
    _Trip.addStartStationName(builder, startStationNameOffset);
    _Trip.addStartStationId(builder, startStationIdOffset);
    _Trip.addEndStationName(builder, endStationNameOffset);
    _Trip.addEndStationId(builder, endStationIdOffset);
    _Trip.addStartLat(builder, startLat);
    _Trip.addStartLng(builder, startLng);
    _Trip.addEndLat(builder, endLat);
    _Trip.addEndLng(builder, endLng);
    _Trip.addMemberCasual(builder, memberCasual);
    return _Trip.endTrip(builder);
  }
};

// flatbuffers/server-response-all.ts
var ServerResponseAll3 = class _ServerResponseAll {
  bb = null;
  bb_pos = 0;
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsServerResponseAll(bb, obj) {
    return (obj || new _ServerResponseAll()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsServerResponseAll(bb, obj) {
    bb.setPosition(bb.position() + SIZE_PREFIX_LENGTH);
    return (obj || new _ServerResponseAll()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  trips(index, obj) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? (obj || new Trip3()).__init(
      this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4),
      this.bb
    ) : null;
  }
  tripsLength() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  static startServerResponseAll(builder) {
    builder.startObject(1);
  }
  static addTrips(builder, tripsOffset) {
    builder.addFieldOffset(0, tripsOffset, 0);
  }
  static createTripsVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]);
    }
    return builder.endVector();
  }
  static startTripsVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static endServerResponseAll(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createServerResponseAll(builder, tripsOffset) {
    _ServerResponseAll.startServerResponseAll(builder);
    _ServerResponseAll.addTrips(builder, tripsOffset);
    return _ServerResponseAll.endServerResponseAll(builder);
  }
};

// code.ts
var response = await protobufjs.load("./dist/trip.proto");
var ServerResponseAllProtobuf = response.lookupType("trip_protobuf.ServerResponseAll");
var DESERIALIZERS = [
  {
    name: "json",
    deserializeAll: async (data) => {
      const decoder4 = new TextDecoder();
      return JSON.parse(decoder4.decode(data));
    },
    scanResult: async (deserialized, targetId) => {
      const trip = deserialized.trips.find((trip2) => trip2.rideId === targetId);
      return trip !== void 0;
    }
  },
  {
    name: "proto",
    deserializeAll: async (data) => {
      const response2 = ServerResponseAllProtobuf.decode(data);
      return { trips: response2.trips };
    },
    scanResult: async (deserialized, targetId) => {
      const trip = deserialized.trips.find((trip2) => trip2.rideId === targetId);
      return trip !== void 0;
    }
  },
  {
    name: "msgpack",
    deserializeAll: async (data) => {
      const response2 = await unpack(data);
      return { trips: response2.trips };
    },
    scanResult: async (deserialized, targetId) => {
      const trip = deserialized.trips.find((trip2) => trip2.rideId === targetId);
      return trip !== void 0;
    }
  },
  {
    name: "cbor",
    deserializeAll: async (data) => {
      const response2 = await decode2(data);
      return { trips: response2.trips };
    },
    scanResult: async (deserialized, targetId) => {
      const trip = deserialized.trips.find((trip2) => trip2.rideId === targetId);
      return trip !== void 0;
    }
  },
  {
    name: "bebop",
    deserializeAll: async (data) => {
      const response2 = ServerResponseAll.decode(data);
      return { trips: response2.trips };
    },
    scanResult: async (deserialized, targetId) => {
      const trip = deserialized.trips.find((trip2) => trip2.rideId === targetId);
      return trip !== void 0;
    }
  },
  {
    name: "capnp",
    deserializeAll: async (data) => {
      const responseMessage = new Message(data, true, true);
      const response2 = responseMessage.getRoot(ServerResponseAll2);
      return { trips: response2.trips };
    },
    scanResult: async (deserialized, targetId) => {
      const trip = deserialized.trips.find((trip2) => trip2.rideId === targetId);
      return trip !== void 0;
    }
  },
  {
    name: "flatbuffers",
    deserializeAll: async (data) => {
      const response2 = ServerResponseAll3.getRootAsServerResponseAll(
        new ByteBuffer(data)
      );
      return response2;
    },
    scanResult: async (deserialized, targetId) => {
      let t;
      let tripsLength = deserialized.tripsLength();
      for (let i = 0; i < tripsLength; i++) {
        t = deserialized.trips(i, t) ?? void 0;
        if (t?.rideId() === targetId) {
          return true;
        }
      }
      return false;
    }
  }
];
async function deserializeAllTest(d, zstd) {
  if (protobufjs === void 0) {
    throw new Error("protobuf is undefined");
  }
  const fetchStart = performance.now();
  const response2 = await fetch(`/${d.name}`, { headers: { "X-Zstd-Enabled": zstd.toString() } });
  const timeToFirstByte = performance.now() - fetchStart;
  const bodyBytes = await response2.bytes();
  const totalTransferTime = performance.now() - fetchStart;
  const encodeTime = parseInt(response2.headers.get("x-encode-duration") || "0");
  const resourceEntry = performance.getEntriesByType("resource").findLast(
    (entry) => entry.entryType === "resource" && entry.name.endsWith(`/${d.name}`)
  );
  const contentLength = resourceEntry.encodedBodySize;
  const deserializeStartTime = performance.now();
  const serverResponse = await d.deserializeAll(bodyBytes);
  const elapsedDeserializeTime = performance.now() - deserializeStartTime;
  const scanStartTime = performance.now();
  const scanResult = await d.scanResult(serverResponse, "123");
  const elapsedScanTime = performance.now() - scanStartTime;
  const zstdDuration = parseInt(response2.headers.get("x-zstd-duration") || "0");
  return {
    name: d.name,
    size: bodyBytes.length,
    contentLength,
    elapsedDeserializeTime,
    timeToFirstByte,
    totalTransferTime,
    encodeTime,
    elapsedScanTime,
    zstdDuration
  };
}
async function runDeserializeAllTests(useZstd) {
  const results = [];
  for (const d of DESERIALIZERS) {
    results.push(await deserializeAllTest(d, useZstd));
  }
  console.table(results);
}
await runDeserializeAllTests(false);
await runDeserializeAllTests(true);
console.log("done");
//# sourceMappingURL=code.js.map
