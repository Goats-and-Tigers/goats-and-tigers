var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x2)(function(x2) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x2 + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

// node_modules/.pnpm/@sveltejs+kit@1.0.0-next.330_svelte@3.48.0/node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
import { MessageChannel } from "node:worker_threads";
function _fileName(headerValue) {
  const m2 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new File(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m3 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m3) {
        entryName = m3[2] || m3[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body2) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var s, S, f, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "node_modules/.pnpm/@sveltejs+kit@1.0.0-next.330_svelte@3.48.0/node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js"() {
    init_install_fetch();
    globalThis.DOMException || (() => {
      const port2 = new MessageChannel().port1;
      const ab = new ArrayBuffer(0);
      try {
        port2.postMessage(ab, [ab, ab]);
      } catch (err) {
        return err.constructor;
      }
    })();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++
    };
    f = 1;
    F = {
      PART_BOUNDARY: f,
      LAST_BOUNDARY: f *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c) => c | 32;
    noop = () => {
    };
    MultipartParser = class {
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i2 = 0; i2 < boundary.length; i2++) {
          ui8a[i2] = boundary.charCodeAt(i2);
          this.boundaryChars[ui8a[i2]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      write(data) {
        let i2 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name) => {
          this[name + "Mark"] = i2;
        };
        const clear = (name) => {
          delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i2, data);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i2 = 0; i2 < length_; i2++) {
          c = data[i2];
          switch (state) {
            case S.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c !== CR) {
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                  index = 0;
                  callback("onPartBegin");
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index + 2]) {
                index = -2;
              }
              if (c === boundary[index + 2]) {
                index++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark("onHeaderField");
              index = 0;
            case S.HEADER_FIELD:
              if (c === CR) {
                clear("onHeaderField");
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              mark("onHeaderValue");
              state = S.HEADER_VALUE;
            case S.HEADER_VALUE:
              if (c === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark("onPartData");
            case S.PART_DATA:
              previousIndex = index;
              if (index === 0) {
                i2 += boundaryEnd;
                while (i2 < bufferLength && !(data[i2] in boundaryChars)) {
                  i2 += boundaryLength;
                }
                i2 -= boundaryEnd;
                c = data[i2];
              }
              if (index < boundary.length) {
                if (boundary[index] === c) {
                  if (index === 0) {
                    dataCallback("onPartData", true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index = 0;
                  if (c === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    callback("onPartEnd");
                    state = S.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i2--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// node_modules/.pnpm/@sveltejs+kit@1.0.0-next.330_svelte@3.48.0/node_modules/@sveltejs/kit/dist/install-fetch.js
import http from "node:http";
import https from "node:https";
import zlib from "node:zlib";
import Stream, { PassThrough, pipeline } from "node:stream";
import { types, deprecate } from "node:util";
import { format } from "node:url";
import { isIP } from "net";
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base642 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i2 = 1; i2 < meta.length; i2++) {
    if (meta[i2] === "base64") {
      base642 = true;
    } else {
      typeFull += `;${meta[i2]}`;
      if (meta[i2].indexOf("charset=") === 0) {
        charset = meta[i2].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base642 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
async function* toIterator(parts, clone2 = true) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0;
      while (position !== part.size) {
        const chunk = part.slice(position, Math.min(part.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
function formDataToBlob(F2, B = Blob$1) {
  var b = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F2.forEach((v, n) => typeof v == "string" ? c.push(p + e(n) + `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c.push(p + e(n) + `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c.push(`--${b}--`);
  return new B(c, { type: "multipart/form-data; boundary=" + b });
}
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  const { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (!(body instanceof Stream)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error2 = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error2);
        throw error2;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    const error_ = error2 instanceof FetchBaseError ? error2 : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
function fromRawHeaders(headers = []) {
  return new Headers2(headers.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = isIP(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (/^(.+\.)*localhost$/.test(url.host)) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}
async function fetch2(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request2(url, options_);
    const { parsedURL, options } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dataUriToBuffer(request.url);
      const response2 = new Response2(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? https : http).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof Stream.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL, options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error2) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error2.message}`, "system", error2));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error2) => {
      response.body.destroy(error2);
    });
    if (process.version < "v14") {
      request_.on("socket", (s3) => {
        let endedWithEventsCount;
        s3.prependListener("end", () => {
          endedWithEventsCount = s3._eventsCount;
        });
        s3.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s3._eventsCount && !hadError) {
            const error2 = new Error("Premature close");
            error2.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error2);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location2 = headers.get("Location");
        const locationURL = location2 === null ? null : new URL(location2, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              headers.set("Location", locationURL);
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers2(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof Stream.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve2(fetch2(new Request2(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = pipeline(response_, new PassThrough(), reject);
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: zlib.Z_SYNC_FLUSH,
        finishFlush: zlib.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = pipeline(body, zlib.createGunzip(zlibOptions), reject);
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = pipeline(response_, new PassThrough(), reject);
        raw.once("data", (chunk) => {
          body = (chunk[0] & 15) === 8 ? pipeline(body, zlib.createInflate(), reject) : pipeline(body, zlib.createInflateRaw(), reject);
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = pipeline(body, zlib.createBrotliDecompress(), reject);
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error2 = new Error("Premature close");
        error2.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error2);
      }
    };
    socket.prependListener("close", onSocketClose);
    request.on("abort", () => {
      socket.removeListener("close", onSocketClose);
    });
    socket.on("data", (buf) => {
      properLastChunkReceived = Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    });
  });
}
function installFetch() {
  Object.defineProperties(globalThis, {
    fetch: {
      enumerable: true,
      configurable: true,
      value: fetch2
    },
    Response: {
      enumerable: true,
      configurable: true,
      value: Response2
    },
    Request: {
      enumerable: true,
      configurable: true,
      value: Request2
    },
    Headers: {
      enumerable: true,
      configurable: true,
      value: Headers2
    }
  });
}
var commonjsGlobal, ponyfill_es2018, POOL_SIZE$1, POOL_SIZE, _Blob, Blob2, Blob$1, _File, File, t, i, h, r, m, f2, e, x, FormData, FetchBaseError, FetchError, NAME, isURLSearchParameters, isBlob, isAbortSignal, INTERNALS$2, Body, clone, getNonSpecFormDataBoundary, extractContentType, getTotalBytes, writeToStream, validateHeaderName, validateHeaderValue, Headers2, redirectStatus, isRedirect, INTERNALS$1, Response2, getSearch, ReferrerPolicy, DEFAULT_REFERRER_POLICY, INTERNALS, isRequest, Request2, getNodeRequestOptions, AbortError, supportedSchemas;
var init_install_fetch = __esm({
  "node_modules/.pnpm/@sveltejs+kit@1.0.0-next.330_svelte@3.48.0/node_modules/@sveltejs/kit/dist/install-fetch.js"() {
    commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    ponyfill_es2018 = { exports: {} };
    (function(module, exports) {
      (function(global2, factory) {
        factory(exports);
      })(commonjsGlobal, function(exports2) {
        const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
        function noop3() {
          return void 0;
        }
        function getGlobals() {
          if (typeof self !== "undefined") {
            return self;
          } else if (typeof window !== "undefined") {
            return window;
          } else if (typeof commonjsGlobal !== "undefined") {
            return commonjsGlobal;
          }
          return void 0;
        }
        const globals = getGlobals();
        function typeIsObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        const rethrowAssertionErrorRejection = noop3;
        const originalPromise = Promise;
        const originalPromiseThen = Promise.prototype.then;
        const originalPromiseResolve = Promise.resolve.bind(originalPromise);
        const originalPromiseReject = Promise.reject.bind(originalPromise);
        function newPromise(executor) {
          return new originalPromise(executor);
        }
        function promiseResolvedWith(value) {
          return originalPromiseResolve(value);
        }
        function promiseRejectedWith(reason) {
          return originalPromiseReject(reason);
        }
        function PerformPromiseThen(promise, onFulfilled, onRejected) {
          return originalPromiseThen.call(promise, onFulfilled, onRejected);
        }
        function uponPromise(promise, onFulfilled, onRejected) {
          PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
        }
        function uponFulfillment(promise, onFulfilled) {
          uponPromise(promise, onFulfilled);
        }
        function uponRejection(promise, onRejected) {
          uponPromise(promise, void 0, onRejected);
        }
        function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
          return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
        }
        function setPromiseIsHandledToTrue(promise) {
          PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
        }
        const queueMicrotask = (() => {
          const globalQueueMicrotask = globals && globals.queueMicrotask;
          if (typeof globalQueueMicrotask === "function") {
            return globalQueueMicrotask;
          }
          const resolvedPromise = promiseResolvedWith(void 0);
          return (fn) => PerformPromiseThen(resolvedPromise, fn);
        })();
        function reflectCall(F2, V, args) {
          if (typeof F2 !== "function") {
            throw new TypeError("Argument is not a function");
          }
          return Function.prototype.apply.call(F2, V, args);
        }
        function promiseCall(F2, V, args) {
          try {
            return promiseResolvedWith(reflectCall(F2, V, args));
          } catch (value) {
            return promiseRejectedWith(value);
          }
        }
        const QUEUE_MAX_ARRAY_SIZE = 16384;
        class SimpleQueue {
          constructor() {
            this._cursor = 0;
            this._size = 0;
            this._front = {
              _elements: [],
              _next: void 0
            };
            this._back = this._front;
            this._cursor = 0;
            this._size = 0;
          }
          get length() {
            return this._size;
          }
          push(element) {
            const oldBack = this._back;
            let newBack = oldBack;
            if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
              newBack = {
                _elements: [],
                _next: void 0
              };
            }
            oldBack._elements.push(element);
            if (newBack !== oldBack) {
              this._back = newBack;
              oldBack._next = newBack;
            }
            ++this._size;
          }
          shift() {
            const oldFront = this._front;
            let newFront = oldFront;
            const oldCursor = this._cursor;
            let newCursor = oldCursor + 1;
            const elements = oldFront._elements;
            const element = elements[oldCursor];
            if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
              newFront = oldFront._next;
              newCursor = 0;
            }
            --this._size;
            this._cursor = newCursor;
            if (oldFront !== newFront) {
              this._front = newFront;
            }
            elements[oldCursor] = void 0;
            return element;
          }
          forEach(callback) {
            let i2 = this._cursor;
            let node = this._front;
            let elements = node._elements;
            while (i2 !== elements.length || node._next !== void 0) {
              if (i2 === elements.length) {
                node = node._next;
                elements = node._elements;
                i2 = 0;
                if (elements.length === 0) {
                  break;
                }
              }
              callback(elements[i2]);
              ++i2;
            }
          }
          peek() {
            const front = this._front;
            const cursor = this._cursor;
            return front._elements[cursor];
          }
        }
        function ReadableStreamReaderGenericInitialize(reader, stream) {
          reader._ownerReadableStream = stream;
          stream._reader = reader;
          if (stream._state === "readable") {
            defaultReaderClosedPromiseInitialize(reader);
          } else if (stream._state === "closed") {
            defaultReaderClosedPromiseInitializeAsResolved(reader);
          } else {
            defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
          }
        }
        function ReadableStreamReaderGenericCancel(reader, reason) {
          const stream = reader._ownerReadableStream;
          return ReadableStreamCancel(stream, reason);
        }
        function ReadableStreamReaderGenericRelease(reader) {
          if (reader._ownerReadableStream._state === "readable") {
            defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          } else {
            defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          }
          reader._ownerReadableStream._reader = void 0;
          reader._ownerReadableStream = void 0;
        }
        function readerLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released reader");
        }
        function defaultReaderClosedPromiseInitialize(reader) {
          reader._closedPromise = newPromise((resolve2, reject) => {
            reader._closedPromise_resolve = resolve2;
            reader._closedPromise_reject = reject;
          });
        }
        function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseReject(reader, reason);
        }
        function defaultReaderClosedPromiseInitializeAsResolved(reader) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseResolve(reader);
        }
        function defaultReaderClosedPromiseReject(reader, reason) {
          if (reader._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(reader._closedPromise);
          reader._closedPromise_reject(reason);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        function defaultReaderClosedPromiseResetToRejected(reader, reason) {
          defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
        }
        function defaultReaderClosedPromiseResolve(reader) {
          if (reader._closedPromise_resolve === void 0) {
            return;
          }
          reader._closedPromise_resolve(void 0);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
        const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
        const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
        const PullSteps = SymbolPolyfill("[[PullSteps]]");
        const NumberIsFinite = Number.isFinite || function(x2) {
          return typeof x2 === "number" && isFinite(x2);
        };
        const MathTrunc = Math.trunc || function(v) {
          return v < 0 ? Math.ceil(v) : Math.floor(v);
        };
        function isDictionary(x2) {
          return typeof x2 === "object" || typeof x2 === "function";
        }
        function assertDictionary(obj, context) {
          if (obj !== void 0 && !isDictionary(obj)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertFunction(x2, context) {
          if (typeof x2 !== "function") {
            throw new TypeError(`${context} is not a function.`);
          }
        }
        function isObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        function assertObject(x2, context) {
          if (!isObject(x2)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertRequiredArgument(x2, position, context) {
          if (x2 === void 0) {
            throw new TypeError(`Parameter ${position} is required in '${context}'.`);
          }
        }
        function assertRequiredField(x2, field, context) {
          if (x2 === void 0) {
            throw new TypeError(`${field} is required in '${context}'.`);
          }
        }
        function convertUnrestrictedDouble(value) {
          return Number(value);
        }
        function censorNegativeZero(x2) {
          return x2 === 0 ? 0 : x2;
        }
        function integerPart(x2) {
          return censorNegativeZero(MathTrunc(x2));
        }
        function convertUnsignedLongLongWithEnforceRange(value, context) {
          const lowerBound = 0;
          const upperBound = Number.MAX_SAFE_INTEGER;
          let x2 = Number(value);
          x2 = censorNegativeZero(x2);
          if (!NumberIsFinite(x2)) {
            throw new TypeError(`${context} is not a finite number`);
          }
          x2 = integerPart(x2);
          if (x2 < lowerBound || x2 > upperBound) {
            throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
          }
          if (!NumberIsFinite(x2) || x2 === 0) {
            return 0;
          }
          return x2;
        }
        function assertReadableStream(x2, context) {
          if (!IsReadableStream(x2)) {
            throw new TypeError(`${context} is not a ReadableStream.`);
          }
        }
        function AcquireReadableStreamDefaultReader(stream) {
          return new ReadableStreamDefaultReader(stream);
        }
        function ReadableStreamAddReadRequest(stream, readRequest) {
          stream._reader._readRequests.push(readRequest);
        }
        function ReadableStreamFulfillReadRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readRequest = reader._readRequests.shift();
          if (done) {
            readRequest._closeSteps();
          } else {
            readRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadRequests(stream) {
          return stream._reader._readRequests.length;
        }
        function ReadableStreamHasDefaultReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamDefaultReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamDefaultReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("read"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: () => resolvePromise({ value: void 0, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamDefaultReaderRead(this, readRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamDefaultReader(this)) {
              throw defaultReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamDefaultReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultReader",
            configurable: true
          });
        }
        function IsReadableStreamDefaultReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultReader;
        }
        function ReadableStreamDefaultReaderRead(reader, readRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "closed") {
            readRequest._closeSteps();
          } else if (stream._state === "errored") {
            readRequest._errorSteps(stream._storedError);
          } else {
            stream._readableStreamController[PullSteps](readRequest);
          }
        }
        function defaultReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
        }
        const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
        }).prototype);
        class ReadableStreamAsyncIteratorImpl {
          constructor(reader, preventCancel) {
            this._ongoingPromise = void 0;
            this._isFinished = false;
            this._reader = reader;
            this._preventCancel = preventCancel;
          }
          next() {
            const nextSteps = () => this._nextSteps();
            this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
            return this._ongoingPromise;
          }
          return(value) {
            const returnSteps = () => this._returnSteps(value);
            return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
          }
          _nextSteps() {
            if (this._isFinished) {
              return Promise.resolve({ value: void 0, done: true });
            }
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("iterate"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => {
                this._ongoingPromise = void 0;
                queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
              },
              _closeSteps: () => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                resolvePromise({ value: void 0, done: true });
              },
              _errorSteps: (reason) => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                rejectPromise(reason);
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promise;
          }
          _returnSteps(value) {
            if (this._isFinished) {
              return Promise.resolve({ value, done: true });
            }
            this._isFinished = true;
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("finish iterating"));
            }
            if (!this._preventCancel) {
              const result = ReadableStreamReaderGenericCancel(reader, value);
              ReadableStreamReaderGenericRelease(reader);
              return transformPromiseWith(result, () => ({ value, done: true }));
            }
            ReadableStreamReaderGenericRelease(reader);
            return promiseResolvedWith({ value, done: true });
          }
        }
        const ReadableStreamAsyncIteratorPrototype = {
          next() {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
            }
            return this._asyncIteratorImpl.next();
          },
          return(value) {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
            }
            return this._asyncIteratorImpl.return(value);
          }
        };
        if (AsyncIteratorPrototype !== void 0) {
          Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
        }
        function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
          const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
          iterator._asyncIteratorImpl = impl;
          return iterator;
        }
        function IsReadableStreamAsyncIterator(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
            return false;
          }
          try {
            return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
          } catch (_a) {
            return false;
          }
        }
        function streamAsyncIteratorBrandCheckException(name) {
          return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
        }
        const NumberIsNaN = Number.isNaN || function(x2) {
          return x2 !== x2;
        };
        function CreateArrayFromList(elements) {
          return elements.slice();
        }
        function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
          new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
        }
        function TransferArrayBuffer(O) {
          return O;
        }
        function IsDetachedBuffer(O) {
          return false;
        }
        function ArrayBufferSlice(buffer, begin, end) {
          if (buffer.slice) {
            return buffer.slice(begin, end);
          }
          const length = end - begin;
          const slice = new ArrayBuffer(length);
          CopyDataBlockBytes(slice, 0, buffer, begin, length);
          return slice;
        }
        function IsNonNegativeNumber(v) {
          if (typeof v !== "number") {
            return false;
          }
          if (NumberIsNaN(v)) {
            return false;
          }
          if (v < 0) {
            return false;
          }
          return true;
        }
        function CloneAsUint8Array(O) {
          const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
          return new Uint8Array(buffer);
        }
        function DequeueValue(container) {
          const pair = container._queue.shift();
          container._queueTotalSize -= pair.size;
          if (container._queueTotalSize < 0) {
            container._queueTotalSize = 0;
          }
          return pair.value;
        }
        function EnqueueValueWithSize(container, value, size) {
          if (!IsNonNegativeNumber(size) || size === Infinity) {
            throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
          }
          container._queue.push({ value, size });
          container._queueTotalSize += size;
        }
        function PeekQueueValue(container) {
          const pair = container._queue.peek();
          return pair.value;
        }
        function ResetQueue(container) {
          container._queue = new SimpleQueue();
          container._queueTotalSize = 0;
        }
        class ReadableStreamBYOBRequest {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get view() {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("view");
            }
            return this._view;
          }
          respond(bytesWritten) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respond");
            }
            assertRequiredArgument(bytesWritten, 1, "respond");
            bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(this._view.buffer))
              ;
            ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
          }
          respondWithNewView(view) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respondWithNewView");
            }
            assertRequiredArgument(view, 1, "respondWithNewView");
            if (!ArrayBuffer.isView(view)) {
              throw new TypeError("You can only respond with array buffer views");
            }
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
          }
        }
        Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
          respond: { enumerable: true },
          respondWithNewView: { enumerable: true },
          view: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBRequest",
            configurable: true
          });
        }
        class ReadableByteStreamController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get byobRequest() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("byobRequest");
            }
            return ReadableByteStreamControllerGetBYOBRequest(this);
          }
          get desiredSize() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("desiredSize");
            }
            return ReadableByteStreamControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("close");
            }
            if (this._closeRequested) {
              throw new TypeError("The stream has already been closed; do not close it again!");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
            }
            ReadableByteStreamControllerClose(this);
          }
          enqueue(chunk) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("enqueue");
            }
            assertRequiredArgument(chunk, 1, "enqueue");
            if (!ArrayBuffer.isView(chunk)) {
              throw new TypeError("chunk must be an array buffer view");
            }
            if (chunk.byteLength === 0) {
              throw new TypeError("chunk must have non-zero byteLength");
            }
            if (chunk.buffer.byteLength === 0) {
              throw new TypeError(`chunk's buffer must have non-zero byteLength`);
            }
            if (this._closeRequested) {
              throw new TypeError("stream is closed or draining");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
            }
            ReadableByteStreamControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("error");
            }
            ReadableByteStreamControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ReadableByteStreamControllerClearPendingPullIntos(this);
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableByteStreamControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableByteStream;
            if (this._queueTotalSize > 0) {
              const entry6 = this._queue.shift();
              this._queueTotalSize -= entry6.byteLength;
              ReadableByteStreamControllerHandleQueueDrain(this);
              const view = new Uint8Array(entry6.buffer, entry6.byteOffset, entry6.byteLength);
              readRequest._chunkSteps(view);
              return;
            }
            const autoAllocateChunkSize = this._autoAllocateChunkSize;
            if (autoAllocateChunkSize !== void 0) {
              let buffer;
              try {
                buffer = new ArrayBuffer(autoAllocateChunkSize);
              } catch (bufferE) {
                readRequest._errorSteps(bufferE);
                return;
              }
              const pullIntoDescriptor = {
                buffer,
                bufferByteLength: autoAllocateChunkSize,
                byteOffset: 0,
                byteLength: autoAllocateChunkSize,
                bytesFilled: 0,
                elementSize: 1,
                viewConstructor: Uint8Array,
                readerType: "default"
              };
              this._pendingPullIntos.push(pullIntoDescriptor);
            }
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableByteStreamControllerCallPullIfNeeded(this);
          }
        }
        Object.defineProperties(ReadableByteStreamController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          byobRequest: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableByteStreamController",
            configurable: true
          });
        }
        function IsReadableByteStreamController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
            return false;
          }
          return x2 instanceof ReadableByteStreamController;
        }
        function IsReadableStreamBYOBRequest(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBRequest;
        }
        function ReadableByteStreamControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableByteStreamControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableByteStreamControllerError(controller, e2);
          });
        }
        function ReadableByteStreamControllerClearPendingPullIntos(controller) {
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          controller._pendingPullIntos = new SimpleQueue();
        }
        function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
          let done = false;
          if (stream._state === "closed") {
            done = true;
          }
          const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
          if (pullIntoDescriptor.readerType === "default") {
            ReadableStreamFulfillReadRequest(stream, filledView, done);
          } else {
            ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
          }
        }
        function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
          const bytesFilled = pullIntoDescriptor.bytesFilled;
          const elementSize = pullIntoDescriptor.elementSize;
          return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
        }
        function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
          controller._queue.push({ buffer, byteOffset, byteLength });
          controller._queueTotalSize += byteLength;
        }
        function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
          const elementSize = pullIntoDescriptor.elementSize;
          const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
          const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
          const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
          const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
          let totalBytesToCopyRemaining = maxBytesToCopy;
          let ready = false;
          if (maxAlignedBytes > currentAlignedBytes) {
            totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
            ready = true;
          }
          const queue = controller._queue;
          while (totalBytesToCopyRemaining > 0) {
            const headOfQueue = queue.peek();
            const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
            const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
            if (headOfQueue.byteLength === bytesToCopy) {
              queue.shift();
            } else {
              headOfQueue.byteOffset += bytesToCopy;
              headOfQueue.byteLength -= bytesToCopy;
            }
            controller._queueTotalSize -= bytesToCopy;
            ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
            totalBytesToCopyRemaining -= bytesToCopy;
          }
          return ready;
        }
        function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
          pullIntoDescriptor.bytesFilled += size;
        }
        function ReadableByteStreamControllerHandleQueueDrain(controller) {
          if (controller._queueTotalSize === 0 && controller._closeRequested) {
            ReadableByteStreamControllerClearAlgorithms(controller);
            ReadableStreamClose(controller._controlledReadableByteStream);
          } else {
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
        }
        function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
          if (controller._byobRequest === null) {
            return;
          }
          controller._byobRequest._associatedReadableByteStreamController = void 0;
          controller._byobRequest._view = null;
          controller._byobRequest = null;
        }
        function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
          while (controller._pendingPullIntos.length > 0) {
            if (controller._queueTotalSize === 0) {
              return;
            }
            const pullIntoDescriptor = controller._pendingPullIntos.peek();
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
          const stream = controller._controlledReadableByteStream;
          let elementSize = 1;
          if (view.constructor !== DataView) {
            elementSize = view.constructor.BYTES_PER_ELEMENT;
          }
          const ctor = view.constructor;
          const buffer = TransferArrayBuffer(view.buffer);
          const pullIntoDescriptor = {
            buffer,
            bufferByteLength: buffer.byteLength,
            byteOffset: view.byteOffset,
            byteLength: view.byteLength,
            bytesFilled: 0,
            elementSize,
            viewConstructor: ctor,
            readerType: "byob"
          };
          if (controller._pendingPullIntos.length > 0) {
            controller._pendingPullIntos.push(pullIntoDescriptor);
            ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
            return;
          }
          if (stream._state === "closed") {
            const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
            readIntoRequest._closeSteps(emptyView);
            return;
          }
          if (controller._queueTotalSize > 0) {
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
              ReadableByteStreamControllerHandleQueueDrain(controller);
              readIntoRequest._chunkSteps(filledView);
              return;
            }
            if (controller._closeRequested) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              readIntoRequest._errorSteps(e2);
              return;
            }
          }
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
          const stream = controller._controlledReadableByteStream;
          if (ReadableStreamHasBYOBReader(stream)) {
            while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
              const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
          if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
            return;
          }
          ReadableByteStreamControllerShiftPendingPullInto(controller);
          const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
          if (remainderSize > 0) {
            const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
          }
          pullIntoDescriptor.bytesFilled -= remainderSize;
          ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        }
        function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            ReadableByteStreamControllerRespondInClosedState(controller);
          } else {
            ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerShiftPendingPullInto(controller) {
          const descriptor = controller._pendingPullIntos.shift();
          return descriptor;
        }
        function ReadableByteStreamControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return false;
          }
          if (controller._closeRequested) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableByteStreamControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
        }
        function ReadableByteStreamControllerClose(controller) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          if (controller._queueTotalSize > 0) {
            controller._closeRequested = true;
            return;
          }
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (firstPendingPullInto.bytesFilled > 0) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              throw e2;
            }
          }
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
        function ReadableByteStreamControllerEnqueue(controller, chunk) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          const buffer = chunk.buffer;
          const byteOffset = chunk.byteOffset;
          const byteLength = chunk.byteLength;
          const transferredBuffer = TransferArrayBuffer(buffer);
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (IsDetachedBuffer(firstPendingPullInto.buffer))
              ;
            firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
          }
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          if (ReadableStreamHasDefaultReader(stream)) {
            if (ReadableStreamGetNumReadRequests(stream) === 0) {
              ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            } else {
              if (controller._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerShiftPendingPullInto(controller);
              }
              const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
              ReadableStreamFulfillReadRequest(stream, transferredView, false);
            }
          } else if (ReadableStreamHasBYOBReader(stream)) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
          } else {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerError(controller, e2) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return;
          }
          ReadableByteStreamControllerClearPendingPullIntos(controller);
          ResetQueue(controller);
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableByteStreamControllerGetBYOBRequest(controller) {
          if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
            const firstDescriptor = controller._pendingPullIntos.peek();
            const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
            const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
            SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
            controller._byobRequest = byobRequest;
          }
          return controller._byobRequest;
        }
        function ReadableByteStreamControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableByteStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableByteStreamControllerRespond(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (bytesWritten !== 0) {
              throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
            }
          } else {
            if (bytesWritten === 0) {
              throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
            }
            if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
              throw new RangeError("bytesWritten out of range");
            }
          }
          firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
          ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
        }
        function ReadableByteStreamControllerRespondWithNewView(controller, view) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (view.byteLength !== 0) {
              throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
            }
          } else {
            if (view.byteLength === 0) {
              throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
            }
          }
          if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
            throw new RangeError("The region specified by view does not match byobRequest");
          }
          if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
            throw new RangeError("The buffer of view has different capacity than byobRequest");
          }
          if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
            throw new RangeError("The region specified by view is larger than byobRequest");
          }
          const viewByteLength = view.byteLength;
          firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
          ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
        }
        function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
          controller._controlledReadableByteStream = stream;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._byobRequest = null;
          controller._queue = controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._closeRequested = false;
          controller._started = false;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          controller._autoAllocateChunkSize = autoAllocateChunkSize;
          controller._pendingPullIntos = new SimpleQueue();
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableByteStreamControllerError(controller, r2);
          });
        }
        function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
          const controller = Object.create(ReadableByteStreamController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingByteSource.start !== void 0) {
            startAlgorithm = () => underlyingByteSource.start(controller);
          }
          if (underlyingByteSource.pull !== void 0) {
            pullAlgorithm = () => underlyingByteSource.pull(controller);
          }
          if (underlyingByteSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
          }
          const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
          if (autoAllocateChunkSize === 0) {
            throw new TypeError("autoAllocateChunkSize must be greater than 0");
          }
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
        }
        function SetUpReadableStreamBYOBRequest(request, controller, view) {
          request._associatedReadableByteStreamController = controller;
          request._view = view;
        }
        function byobRequestBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
        }
        function byteStreamControllerBrandCheckException(name) {
          return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
        }
        function AcquireReadableStreamBYOBReader(stream) {
          return new ReadableStreamBYOBReader(stream);
        }
        function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
          stream._reader._readIntoRequests.push(readIntoRequest);
        }
        function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readIntoRequest = reader._readIntoRequests.shift();
          if (done) {
            readIntoRequest._closeSteps(chunk);
          } else {
            readIntoRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadIntoRequests(stream) {
          return stream._reader._readIntoRequests.length;
        }
        function ReadableStreamHasBYOBReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamBYOBReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamBYOBReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            if (!IsReadableByteStreamController(stream._readableStreamController)) {
              throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readIntoRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read(view) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("read"));
            }
            if (!ArrayBuffer.isView(view)) {
              return promiseRejectedWith(new TypeError("view must be an array buffer view"));
            }
            if (view.byteLength === 0) {
              return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
            }
            if (view.buffer.byteLength === 0) {
              return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readIntoRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamBYOBReader(this)) {
              throw byobReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readIntoRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamBYOBReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBReader",
            configurable: true
          });
        }
        function IsReadableStreamBYOBReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBReader;
        }
        function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "errored") {
            readIntoRequest._errorSteps(stream._storedError);
          } else {
            ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
          }
        }
        function byobReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
        }
        function ExtractHighWaterMark(strategy, defaultHWM) {
          const { highWaterMark } = strategy;
          if (highWaterMark === void 0) {
            return defaultHWM;
          }
          if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
            throw new RangeError("Invalid highWaterMark");
          }
          return highWaterMark;
        }
        function ExtractSizeAlgorithm(strategy) {
          const { size } = strategy;
          if (!size) {
            return () => 1;
          }
          return size;
        }
        function convertQueuingStrategy(init3, context) {
          assertDictionary(init3, context);
          const highWaterMark = init3 === null || init3 === void 0 ? void 0 : init3.highWaterMark;
          const size = init3 === null || init3 === void 0 ? void 0 : init3.size;
          return {
            highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
            size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
          };
        }
        function convertQueuingStrategySize(fn, context) {
          assertFunction(fn, context);
          return (chunk) => convertUnrestrictedDouble(fn(chunk));
        }
        function convertUnderlyingSink(original, context) {
          assertDictionary(original, context);
          const abort = original === null || original === void 0 ? void 0 : original.abort;
          const close = original === null || original === void 0 ? void 0 : original.close;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          const write = original === null || original === void 0 ? void 0 : original.write;
          return {
            abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
            close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
            write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
            type
          };
        }
        function convertUnderlyingSinkAbortCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSinkCloseCallback(fn, original, context) {
          assertFunction(fn, context);
          return () => promiseCall(fn, original, []);
        }
        function convertUnderlyingSinkStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertUnderlyingSinkWriteCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        function assertWritableStream(x2, context) {
          if (!IsWritableStream(x2)) {
            throw new TypeError(`${context} is not a WritableStream.`);
          }
        }
        function isAbortSignal2(value) {
          if (typeof value !== "object" || value === null) {
            return false;
          }
          try {
            return typeof value.aborted === "boolean";
          } catch (_a) {
            return false;
          }
        }
        const supportsAbortController = typeof AbortController === "function";
        function createAbortController() {
          if (supportsAbortController) {
            return new AbortController();
          }
          return void 0;
        }
        class WritableStream {
          constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
            if (rawUnderlyingSink === void 0) {
              rawUnderlyingSink = null;
            } else {
              assertObject(rawUnderlyingSink, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
            InitializeWritableStream(this);
            const type = underlyingSink.type;
            if (type !== void 0) {
              throw new RangeError("Invalid type is specified");
            }
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
          }
          get locked() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("locked");
            }
            return IsWritableStreamLocked(this);
          }
          abort(reason = void 0) {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("abort"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
            }
            return WritableStreamAbort(this, reason);
          }
          close() {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("close"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
            }
            if (WritableStreamCloseQueuedOrInFlight(this)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamClose(this);
          }
          getWriter() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("getWriter");
            }
            return AcquireWritableStreamDefaultWriter(this);
          }
        }
        Object.defineProperties(WritableStream.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          getWriter: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStream",
            configurable: true
          });
        }
        function AcquireWritableStreamDefaultWriter(stream) {
          return new WritableStreamDefaultWriter(stream);
        }
        function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(WritableStream.prototype);
          InitializeWritableStream(stream);
          const controller = Object.create(WritableStreamDefaultController.prototype);
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function InitializeWritableStream(stream) {
          stream._state = "writable";
          stream._storedError = void 0;
          stream._writer = void 0;
          stream._writableStreamController = void 0;
          stream._writeRequests = new SimpleQueue();
          stream._inFlightWriteRequest = void 0;
          stream._closeRequest = void 0;
          stream._inFlightCloseRequest = void 0;
          stream._pendingAbortRequest = void 0;
          stream._backpressure = false;
        }
        function IsWritableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
            return false;
          }
          return x2 instanceof WritableStream;
        }
        function IsWritableStreamLocked(stream) {
          if (stream._writer === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamAbort(stream, reason) {
          var _a;
          if (stream._state === "closed" || stream._state === "errored") {
            return promiseResolvedWith(void 0);
          }
          stream._writableStreamController._abortReason = reason;
          (_a = stream._writableStreamController._abortController) === null || _a === void 0 ? void 0 : _a.abort();
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseResolvedWith(void 0);
          }
          if (stream._pendingAbortRequest !== void 0) {
            return stream._pendingAbortRequest._promise;
          }
          let wasAlreadyErroring = false;
          if (state === "erroring") {
            wasAlreadyErroring = true;
            reason = void 0;
          }
          const promise = newPromise((resolve2, reject) => {
            stream._pendingAbortRequest = {
              _promise: void 0,
              _resolve: resolve2,
              _reject: reject,
              _reason: reason,
              _wasAlreadyErroring: wasAlreadyErroring
            };
          });
          stream._pendingAbortRequest._promise = promise;
          if (!wasAlreadyErroring) {
            WritableStreamStartErroring(stream, reason);
          }
          return promise;
        }
        function WritableStreamClose(stream) {
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
          }
          const promise = newPromise((resolve2, reject) => {
            const closeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._closeRequest = closeRequest;
          });
          const writer = stream._writer;
          if (writer !== void 0 && stream._backpressure && state === "writable") {
            defaultWriterReadyPromiseResolve(writer);
          }
          WritableStreamDefaultControllerClose(stream._writableStreamController);
          return promise;
        }
        function WritableStreamAddWriteRequest(stream) {
          const promise = newPromise((resolve2, reject) => {
            const writeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._writeRequests.push(writeRequest);
          });
          return promise;
        }
        function WritableStreamDealWithRejection(stream, error2) {
          const state = stream._state;
          if (state === "writable") {
            WritableStreamStartErroring(stream, error2);
            return;
          }
          WritableStreamFinishErroring(stream);
        }
        function WritableStreamStartErroring(stream, reason) {
          const controller = stream._writableStreamController;
          stream._state = "erroring";
          stream._storedError = reason;
          const writer = stream._writer;
          if (writer !== void 0) {
            WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
          }
          if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
            WritableStreamFinishErroring(stream);
          }
        }
        function WritableStreamFinishErroring(stream) {
          stream._state = "errored";
          stream._writableStreamController[ErrorSteps]();
          const storedError = stream._storedError;
          stream._writeRequests.forEach((writeRequest) => {
            writeRequest._reject(storedError);
          });
          stream._writeRequests = new SimpleQueue();
          if (stream._pendingAbortRequest === void 0) {
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const abortRequest = stream._pendingAbortRequest;
          stream._pendingAbortRequest = void 0;
          if (abortRequest._wasAlreadyErroring) {
            abortRequest._reject(storedError);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
          uponPromise(promise, () => {
            abortRequest._resolve();
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          }, (reason) => {
            abortRequest._reject(reason);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          });
        }
        function WritableStreamFinishInFlightWrite(stream) {
          stream._inFlightWriteRequest._resolve(void 0);
          stream._inFlightWriteRequest = void 0;
        }
        function WritableStreamFinishInFlightWriteWithError(stream, error2) {
          stream._inFlightWriteRequest._reject(error2);
          stream._inFlightWriteRequest = void 0;
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamFinishInFlightClose(stream) {
          stream._inFlightCloseRequest._resolve(void 0);
          stream._inFlightCloseRequest = void 0;
          const state = stream._state;
          if (state === "erroring") {
            stream._storedError = void 0;
            if (stream._pendingAbortRequest !== void 0) {
              stream._pendingAbortRequest._resolve();
              stream._pendingAbortRequest = void 0;
            }
          }
          stream._state = "closed";
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseResolve(writer);
          }
        }
        function WritableStreamFinishInFlightCloseWithError(stream, error2) {
          stream._inFlightCloseRequest._reject(error2);
          stream._inFlightCloseRequest = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._reject(error2);
            stream._pendingAbortRequest = void 0;
          }
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamCloseQueuedOrInFlight(stream) {
          if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamHasOperationMarkedInFlight(stream) {
          if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamMarkCloseRequestInFlight(stream) {
          stream._inFlightCloseRequest = stream._closeRequest;
          stream._closeRequest = void 0;
        }
        function WritableStreamMarkFirstWriteRequestInFlight(stream) {
          stream._inFlightWriteRequest = stream._writeRequests.shift();
        }
        function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
          if (stream._closeRequest !== void 0) {
            stream._closeRequest._reject(stream._storedError);
            stream._closeRequest = void 0;
          }
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseReject(writer, stream._storedError);
          }
        }
        function WritableStreamUpdateBackpressure(stream, backpressure) {
          const writer = stream._writer;
          if (writer !== void 0 && backpressure !== stream._backpressure) {
            if (backpressure) {
              defaultWriterReadyPromiseReset(writer);
            } else {
              defaultWriterReadyPromiseResolve(writer);
            }
          }
          stream._backpressure = backpressure;
        }
        class WritableStreamDefaultWriter {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
            assertWritableStream(stream, "First parameter");
            if (IsWritableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive writing by another writer");
            }
            this._ownerWritableStream = stream;
            stream._writer = this;
            const state = stream._state;
            if (state === "writable") {
              if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
                defaultWriterReadyPromiseInitialize(this);
              } else {
                defaultWriterReadyPromiseInitializeAsResolved(this);
              }
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "erroring") {
              defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "closed") {
              defaultWriterReadyPromiseInitializeAsResolved(this);
              defaultWriterClosedPromiseInitializeAsResolved(this);
            } else {
              const storedError = stream._storedError;
              defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
              defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
            }
          }
          get closed() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          get desiredSize() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("desiredSize");
            }
            if (this._ownerWritableStream === void 0) {
              throw defaultWriterLockException("desiredSize");
            }
            return WritableStreamDefaultWriterGetDesiredSize(this);
          }
          get ready() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
            }
            return this._readyPromise;
          }
          abort(reason = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("abort"));
            }
            return WritableStreamDefaultWriterAbort(this, reason);
          }
          close() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("close"));
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("close"));
            }
            if (WritableStreamCloseQueuedOrInFlight(stream)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamDefaultWriterClose(this);
          }
          releaseLock() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("releaseLock");
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return;
            }
            WritableStreamDefaultWriterRelease(this);
          }
          write(chunk = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("write"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("write to"));
            }
            return WritableStreamDefaultWriterWrite(this, chunk);
          }
        }
        Object.defineProperties(WritableStreamDefaultWriter.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          releaseLock: { enumerable: true },
          write: { enumerable: true },
          closed: { enumerable: true },
          desiredSize: { enumerable: true },
          ready: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultWriter",
            configurable: true
          });
        }
        function IsWritableStreamDefaultWriter(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultWriter;
        }
        function WritableStreamDefaultWriterAbort(writer, reason) {
          const stream = writer._ownerWritableStream;
          return WritableStreamAbort(stream, reason);
        }
        function WritableStreamDefaultWriterClose(writer) {
          const stream = writer._ownerWritableStream;
          return WritableStreamClose(stream);
        }
        function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          return WritableStreamDefaultWriterClose(writer);
        }
        function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error2) {
          if (writer._closedPromiseState === "pending") {
            defaultWriterClosedPromiseReject(writer, error2);
          } else {
            defaultWriterClosedPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error2) {
          if (writer._readyPromiseState === "pending") {
            defaultWriterReadyPromiseReject(writer, error2);
          } else {
            defaultWriterReadyPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterGetDesiredSize(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (state === "errored" || state === "erroring") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
        }
        function WritableStreamDefaultWriterRelease(writer) {
          const stream = writer._ownerWritableStream;
          const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
          WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
          stream._writer = void 0;
          writer._ownerWritableStream = void 0;
        }
        function WritableStreamDefaultWriterWrite(writer, chunk) {
          const stream = writer._ownerWritableStream;
          const controller = stream._writableStreamController;
          const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
          if (stream !== writer._ownerWritableStream) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          const state = stream._state;
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
          }
          if (state === "erroring") {
            return promiseRejectedWith(stream._storedError);
          }
          const promise = WritableStreamAddWriteRequest(stream);
          WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
          return promise;
        }
        const closeSentinel = {};
        class WritableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get abortReason() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("abortReason");
            }
            return this._abortReason;
          }
          get signal() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("signal");
            }
            if (this._abortController === void 0) {
              throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
            }
            return this._abortController.signal;
          }
          error(e2 = void 0) {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("error");
            }
            const state = this._controlledWritableStream._state;
            if (state !== "writable") {
              return;
            }
            WritableStreamDefaultControllerError(this, e2);
          }
          [AbortSteps](reason) {
            const result = this._abortAlgorithm(reason);
            WritableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [ErrorSteps]() {
            ResetQueue(this);
          }
        }
        Object.defineProperties(WritableStreamDefaultController.prototype, {
          abortReason: { enumerable: true },
          signal: { enumerable: true },
          error: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultController",
            configurable: true
          });
        }
        function IsWritableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultController;
        }
        function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledWritableStream = stream;
          stream._writableStreamController = controller;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._abortReason = void 0;
          controller._abortController = createAbortController();
          controller._started = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._writeAlgorithm = writeAlgorithm;
          controller._closeAlgorithm = closeAlgorithm;
          controller._abortAlgorithm = abortAlgorithm;
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
          const startResult = startAlgorithm();
          const startPromise = promiseResolvedWith(startResult);
          uponPromise(startPromise, () => {
            controller._started = true;
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (r2) => {
            controller._started = true;
            WritableStreamDealWithRejection(stream, r2);
          });
        }
        function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(WritableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let writeAlgorithm = () => promiseResolvedWith(void 0);
          let closeAlgorithm = () => promiseResolvedWith(void 0);
          let abortAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSink.start !== void 0) {
            startAlgorithm = () => underlyingSink.start(controller);
          }
          if (underlyingSink.write !== void 0) {
            writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
          }
          if (underlyingSink.close !== void 0) {
            closeAlgorithm = () => underlyingSink.close();
          }
          if (underlyingSink.abort !== void 0) {
            abortAlgorithm = (reason) => underlyingSink.abort(reason);
          }
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function WritableStreamDefaultControllerClearAlgorithms(controller) {
          controller._writeAlgorithm = void 0;
          controller._closeAlgorithm = void 0;
          controller._abortAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function WritableStreamDefaultControllerClose(controller) {
          EnqueueValueWithSize(controller, closeSentinel, 0);
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
          try {
            return controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
            return 1;
          }
        }
        function WritableStreamDefaultControllerGetDesiredSize(controller) {
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
            return;
          }
          const stream = controller._controlledWritableStream;
          if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
          const stream = controller._controlledWritableStream;
          if (!controller._started) {
            return;
          }
          if (stream._inFlightWriteRequest !== void 0) {
            return;
          }
          const state = stream._state;
          if (state === "erroring") {
            WritableStreamFinishErroring(stream);
            return;
          }
          if (controller._queue.length === 0) {
            return;
          }
          const value = PeekQueueValue(controller);
          if (value === closeSentinel) {
            WritableStreamDefaultControllerProcessClose(controller);
          } else {
            WritableStreamDefaultControllerProcessWrite(controller, value);
          }
        }
        function WritableStreamDefaultControllerErrorIfNeeded(controller, error2) {
          if (controller._controlledWritableStream._state === "writable") {
            WritableStreamDefaultControllerError(controller, error2);
          }
        }
        function WritableStreamDefaultControllerProcessClose(controller) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkCloseRequestInFlight(stream);
          DequeueValue(controller);
          const sinkClosePromise = controller._closeAlgorithm();
          WritableStreamDefaultControllerClearAlgorithms(controller);
          uponPromise(sinkClosePromise, () => {
            WritableStreamFinishInFlightClose(stream);
          }, (reason) => {
            WritableStreamFinishInFlightCloseWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkFirstWriteRequestInFlight(stream);
          const sinkWritePromise = controller._writeAlgorithm(chunk);
          uponPromise(sinkWritePromise, () => {
            WritableStreamFinishInFlightWrite(stream);
            const state = stream._state;
            DequeueValue(controller);
            if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
              const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
              WritableStreamUpdateBackpressure(stream, backpressure);
            }
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (reason) => {
            if (stream._state === "writable") {
              WritableStreamDefaultControllerClearAlgorithms(controller);
            }
            WritableStreamFinishInFlightWriteWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerGetBackpressure(controller) {
          const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
          return desiredSize <= 0;
        }
        function WritableStreamDefaultControllerError(controller, error2) {
          const stream = controller._controlledWritableStream;
          WritableStreamDefaultControllerClearAlgorithms(controller);
          WritableStreamStartErroring(stream, error2);
        }
        function streamBrandCheckException$2(name) {
          return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
        }
        function defaultControllerBrandCheckException$2(name) {
          return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
        }
        function defaultWriterBrandCheckException(name) {
          return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
        }
        function defaultWriterLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released writer");
        }
        function defaultWriterClosedPromiseInitialize(writer) {
          writer._closedPromise = newPromise((resolve2, reject) => {
            writer._closedPromise_resolve = resolve2;
            writer._closedPromise_reject = reject;
            writer._closedPromiseState = "pending";
          });
        }
        function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseReject(writer, reason);
        }
        function defaultWriterClosedPromiseInitializeAsResolved(writer) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseResolve(writer);
        }
        function defaultWriterClosedPromiseReject(writer, reason) {
          if (writer._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._closedPromise);
          writer._closedPromise_reject(reason);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "rejected";
        }
        function defaultWriterClosedPromiseResetToRejected(writer, reason) {
          defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterClosedPromiseResolve(writer) {
          if (writer._closedPromise_resolve === void 0) {
            return;
          }
          writer._closedPromise_resolve(void 0);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "resolved";
        }
        function defaultWriterReadyPromiseInitialize(writer) {
          writer._readyPromise = newPromise((resolve2, reject) => {
            writer._readyPromise_resolve = resolve2;
            writer._readyPromise_reject = reject;
          });
          writer._readyPromiseState = "pending";
        }
        function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseReject(writer, reason);
        }
        function defaultWriterReadyPromiseInitializeAsResolved(writer) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseResolve(writer);
        }
        function defaultWriterReadyPromiseReject(writer, reason) {
          if (writer._readyPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._readyPromise);
          writer._readyPromise_reject(reason);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "rejected";
        }
        function defaultWriterReadyPromiseReset(writer) {
          defaultWriterReadyPromiseInitialize(writer);
        }
        function defaultWriterReadyPromiseResetToRejected(writer, reason) {
          defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterReadyPromiseResolve(writer) {
          if (writer._readyPromise_resolve === void 0) {
            return;
          }
          writer._readyPromise_resolve(void 0);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "fulfilled";
        }
        const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
        function isDOMExceptionConstructor(ctor) {
          if (!(typeof ctor === "function" || typeof ctor === "object")) {
            return false;
          }
          try {
            new ctor();
            return true;
          } catch (_a) {
            return false;
          }
        }
        function createDOMExceptionPolyfill() {
          const ctor = function DOMException2(message, name) {
            this.message = message || "";
            this.name = name || "Error";
            if (Error.captureStackTrace) {
              Error.captureStackTrace(this, this.constructor);
            }
          };
          ctor.prototype = Object.create(Error.prototype);
          Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
          return ctor;
        }
        const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
        function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
          const reader = AcquireReadableStreamDefaultReader(source);
          const writer = AcquireWritableStreamDefaultWriter(dest);
          source._disturbed = true;
          let shuttingDown = false;
          let currentWrite = promiseResolvedWith(void 0);
          return newPromise((resolve2, reject) => {
            let abortAlgorithm;
            if (signal !== void 0) {
              abortAlgorithm = () => {
                const error2 = new DOMException$1("Aborted", "AbortError");
                const actions = [];
                if (!preventAbort) {
                  actions.push(() => {
                    if (dest._state === "writable") {
                      return WritableStreamAbort(dest, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                if (!preventCancel) {
                  actions.push(() => {
                    if (source._state === "readable") {
                      return ReadableStreamCancel(source, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error2);
              };
              if (signal.aborted) {
                abortAlgorithm();
                return;
              }
              signal.addEventListener("abort", abortAlgorithm);
            }
            function pipeLoop() {
              return newPromise((resolveLoop, rejectLoop) => {
                function next(done) {
                  if (done) {
                    resolveLoop();
                  } else {
                    PerformPromiseThen(pipeStep(), next, rejectLoop);
                  }
                }
                next(false);
              });
            }
            function pipeStep() {
              if (shuttingDown) {
                return promiseResolvedWith(true);
              }
              return PerformPromiseThen(writer._readyPromise, () => {
                return newPromise((resolveRead, rejectRead) => {
                  ReadableStreamDefaultReaderRead(reader, {
                    _chunkSteps: (chunk) => {
                      currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop3);
                      resolveRead(false);
                    },
                    _closeSteps: () => resolveRead(true),
                    _errorSteps: rejectRead
                  });
                });
              });
            }
            isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
              if (!preventAbort) {
                shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesClosed(source, reader._closedPromise, () => {
              if (!preventClose) {
                shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
              } else {
                shutdown();
              }
            });
            if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
              const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
              } else {
                shutdown(true, destClosed);
              }
            }
            setPromiseIsHandledToTrue(pipeLoop());
            function waitForWritesToFinish() {
              const oldCurrentWrite = currentWrite;
              return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
            }
            function isOrBecomesErrored(stream, promise, action) {
              if (stream._state === "errored") {
                action(stream._storedError);
              } else {
                uponRejection(promise, action);
              }
            }
            function isOrBecomesClosed(stream, promise, action) {
              if (stream._state === "closed") {
                action();
              } else {
                uponFulfillment(promise, action);
              }
            }
            function shutdownWithAction(action, originalIsError, originalError) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), doTheRest);
              } else {
                doTheRest();
              }
              function doTheRest() {
                uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
              }
            }
            function shutdown(isError, error2) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error2));
              } else {
                finalize(isError, error2);
              }
            }
            function finalize(isError, error2) {
              WritableStreamDefaultWriterRelease(writer);
              ReadableStreamReaderGenericRelease(reader);
              if (signal !== void 0) {
                signal.removeEventListener("abort", abortAlgorithm);
              }
              if (isError) {
                reject(error2);
              } else {
                resolve2(void 0);
              }
            }
          });
        }
        class ReadableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("desiredSize");
            }
            return ReadableStreamDefaultControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("close");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits close");
            }
            ReadableStreamDefaultControllerClose(this);
          }
          enqueue(chunk = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("enqueue");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits enqueue");
            }
            return ReadableStreamDefaultControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("error");
            }
            ReadableStreamDefaultControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableStream;
            if (this._queue.length > 0) {
              const chunk = DequeueValue(this);
              if (this._closeRequested && this._queue.length === 0) {
                ReadableStreamDefaultControllerClearAlgorithms(this);
                ReadableStreamClose(stream);
              } else {
                ReadableStreamDefaultControllerCallPullIfNeeded(this);
              }
              readRequest._chunkSteps(chunk);
            } else {
              ReadableStreamAddReadRequest(stream, readRequest);
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
          }
        }
        Object.defineProperties(ReadableStreamDefaultController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultController",
            configurable: true
          });
        }
        function IsReadableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultController;
        }
        function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableStreamDefaultControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableStreamDefaultControllerError(controller, e2);
          });
        }
        function ReadableStreamDefaultControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableStream;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableStreamDefaultControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function ReadableStreamDefaultControllerClose(controller) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          controller._closeRequested = true;
          if (controller._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(controller);
            ReadableStreamClose(stream);
          }
        }
        function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            ReadableStreamFulfillReadRequest(stream, chunk, false);
          } else {
            let chunkSize;
            try {
              chunkSize = controller._strategySizeAlgorithm(chunk);
            } catch (chunkSizeE) {
              ReadableStreamDefaultControllerError(controller, chunkSizeE);
              throw chunkSizeE;
            }
            try {
              EnqueueValueWithSize(controller, chunk, chunkSize);
            } catch (enqueueE) {
              ReadableStreamDefaultControllerError(controller, enqueueE);
              throw enqueueE;
            }
          }
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }
        function ReadableStreamDefaultControllerError(controller, e2) {
          const stream = controller._controlledReadableStream;
          if (stream._state !== "readable") {
            return;
          }
          ResetQueue(controller);
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableStreamDefaultControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableStreamDefaultControllerHasBackpressure(controller) {
          if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
            return false;
          }
          return true;
        }
        function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
          const state = controller._controlledReadableStream._state;
          if (!controller._closeRequested && state === "readable") {
            return true;
          }
          return false;
        }
        function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledReadableStream = stream;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._started = false;
          controller._closeRequested = false;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableStreamDefaultControllerError(controller, r2);
          });
        }
        function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSource.start !== void 0) {
            startAlgorithm = () => underlyingSource.start(controller);
          }
          if (underlyingSource.pull !== void 0) {
            pullAlgorithm = () => underlyingSource.pull(controller);
          }
          if (underlyingSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
          }
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function defaultControllerBrandCheckException$1(name) {
          return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
        }
        function ReadableStreamTee(stream, cloneForBranch2) {
          if (IsReadableByteStreamController(stream._readableStreamController)) {
            return ReadableByteStreamTee(stream);
          }
          return ReadableStreamDefaultTee(stream);
        }
        function ReadableStreamDefaultTee(stream, cloneForBranch2) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgain = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function pullAlgorithm() {
            if (reading) {
              readAgain = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgain = false;
                  const chunk1 = chunk;
                  const chunk2 = chunk;
                  if (!canceled1) {
                    ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgain) {
                    pullAlgorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableStreamDefaultControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerClose(branch2._readableStreamController);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
          }
          branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
          branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
          uponRejection(reader._closedPromise, (r2) => {
            ReadableStreamDefaultControllerError(branch1._readableStreamController, r2);
            ReadableStreamDefaultControllerError(branch2._readableStreamController, r2);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          });
          return [branch1, branch2];
        }
        function ReadableByteStreamTee(stream) {
          let reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgainForBranch1 = false;
          let readAgainForBranch2 = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function forwardReaderError(thisReader) {
            uponRejection(thisReader._closedPromise, (r2) => {
              if (thisReader !== reader) {
                return;
              }
              ReadableByteStreamControllerError(branch1._readableStreamController, r2);
              ReadableByteStreamControllerError(branch2._readableStreamController, r2);
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            });
          }
          function pullWithDefaultReader() {
            if (IsReadableStreamBYOBReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamDefaultReader(stream);
              forwardReaderError(reader);
            }
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const chunk1 = chunk;
                  let chunk2 = chunk;
                  if (!canceled1 && !canceled2) {
                    try {
                      chunk2 = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                  }
                  if (!canceled1) {
                    ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableByteStreamControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerClose(branch2._readableStreamController);
                }
                if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
                }
                if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
          }
          function pullWithBYOBReader(view, forBranch2) {
            if (IsReadableStreamDefaultReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamBYOBReader(stream);
              forwardReaderError(reader);
            }
            const byobBranch = forBranch2 ? branch2 : branch1;
            const otherBranch = forBranch2 ? branch1 : branch2;
            const readIntoRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const byobCanceled = forBranch2 ? canceled2 : canceled1;
                  const otherCanceled = forBranch2 ? canceled1 : canceled2;
                  if (!otherCanceled) {
                    let clonedChunk;
                    try {
                      clonedChunk = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                    if (!byobCanceled) {
                      ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                    }
                    ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                  } else if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: (chunk) => {
                reading = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!byobCanceled) {
                  ReadableByteStreamControllerClose(byobBranch._readableStreamController);
                }
                if (!otherCanceled) {
                  ReadableByteStreamControllerClose(otherBranch._readableStreamController);
                }
                if (chunk !== void 0) {
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                    ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                  }
                }
                if (!byobCanceled || !otherCanceled) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
          }
          function pull1Algorithm() {
            if (reading) {
              readAgainForBranch1 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, false);
            }
            return promiseResolvedWith(void 0);
          }
          function pull2Algorithm() {
            if (reading) {
              readAgainForBranch2 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, true);
            }
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
            return;
          }
          branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
          branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
          forwardReaderError(reader);
          return [branch1, branch2];
        }
        function convertUnderlyingDefaultOrByteSource(source, context) {
          assertDictionary(source, context);
          const original = source;
          const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
          const cancel = original === null || original === void 0 ? void 0 : original.cancel;
          const pull = original === null || original === void 0 ? void 0 : original.pull;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          return {
            autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
            cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
            pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
            type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
          };
        }
        function convertUnderlyingSourceCancelCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSourcePullCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertUnderlyingSourceStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertReadableStreamType(type, context) {
          type = `${type}`;
          if (type !== "bytes") {
            throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
          }
          return type;
        }
        function convertReaderOptions(options, context) {
          assertDictionary(options, context);
          const mode = options === null || options === void 0 ? void 0 : options.mode;
          return {
            mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
          };
        }
        function convertReadableStreamReaderMode(mode, context) {
          mode = `${mode}`;
          if (mode !== "byob") {
            throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
          }
          return mode;
        }
        function convertIteratorOptions(options, context) {
          assertDictionary(options, context);
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          return { preventCancel: Boolean(preventCancel) };
        }
        function convertPipeOptions(options, context) {
          assertDictionary(options, context);
          const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
          const signal = options === null || options === void 0 ? void 0 : options.signal;
          if (signal !== void 0) {
            assertAbortSignal(signal, `${context} has member 'signal' that`);
          }
          return {
            preventAbort: Boolean(preventAbort),
            preventCancel: Boolean(preventCancel),
            preventClose: Boolean(preventClose),
            signal
          };
        }
        function assertAbortSignal(signal, context) {
          if (!isAbortSignal2(signal)) {
            throw new TypeError(`${context} is not an AbortSignal.`);
          }
        }
        function convertReadableWritablePair(pair, context) {
          assertDictionary(pair, context);
          const readable2 = pair === null || pair === void 0 ? void 0 : pair.readable;
          assertRequiredField(readable2, "readable", "ReadableWritablePair");
          assertReadableStream(readable2, `${context} has member 'readable' that`);
          const writable2 = pair === null || pair === void 0 ? void 0 : pair.writable;
          assertRequiredField(writable2, "writable", "ReadableWritablePair");
          assertWritableStream(writable2, `${context} has member 'writable' that`);
          return { readable: readable2, writable: writable2 };
        }
        class ReadableStream2 {
          constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
            if (rawUnderlyingSource === void 0) {
              rawUnderlyingSource = null;
            } else {
              assertObject(rawUnderlyingSource, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
            InitializeReadableStream(this);
            if (underlyingSource.type === "bytes") {
              if (strategy.size !== void 0) {
                throw new RangeError("The strategy for a byte stream cannot have a size function");
              }
              const highWaterMark = ExtractHighWaterMark(strategy, 0);
              SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
            } else {
              const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
              const highWaterMark = ExtractHighWaterMark(strategy, 1);
              SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
            }
          }
          get locked() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("locked");
            }
            return IsReadableStreamLocked(this);
          }
          cancel(reason = void 0) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("cancel"));
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
            }
            return ReadableStreamCancel(this, reason);
          }
          getReader(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("getReader");
            }
            const options = convertReaderOptions(rawOptions, "First parameter");
            if (options.mode === void 0) {
              return AcquireReadableStreamDefaultReader(this);
            }
            return AcquireReadableStreamBYOBReader(this);
          }
          pipeThrough(rawTransform, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("pipeThrough");
            }
            assertRequiredArgument(rawTransform, 1, "pipeThrough");
            const transform = convertReadableWritablePair(rawTransform, "First parameter");
            const options = convertPipeOptions(rawOptions, "Second parameter");
            if (IsReadableStreamLocked(this)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
            }
            if (IsWritableStreamLocked(transform.writable)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
            }
            const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
            setPromiseIsHandledToTrue(promise);
            return transform.readable;
          }
          pipeTo(destination, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
            }
            if (destination === void 0) {
              return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
            }
            if (!IsWritableStream(destination)) {
              return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
            }
            let options;
            try {
              options = convertPipeOptions(rawOptions, "Second parameter");
            } catch (e2) {
              return promiseRejectedWith(e2);
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
            }
            if (IsWritableStreamLocked(destination)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
            }
            return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
          }
          tee() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("tee");
            }
            const branches = ReadableStreamTee(this);
            return CreateArrayFromList(branches);
          }
          values(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("values");
            }
            const options = convertIteratorOptions(rawOptions, "First parameter");
            return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
          }
        }
        Object.defineProperties(ReadableStream2.prototype, {
          cancel: { enumerable: true },
          getReader: { enumerable: true },
          pipeThrough: { enumerable: true },
          pipeTo: { enumerable: true },
          tee: { enumerable: true },
          values: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStream",
            configurable: true
          });
        }
        if (typeof SymbolPolyfill.asyncIterator === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
            value: ReadableStream2.prototype.values,
            writable: true,
            configurable: true
          });
        }
        function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableByteStreamController.prototype);
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
          return stream;
        }
        function InitializeReadableStream(stream) {
          stream._state = "readable";
          stream._reader = void 0;
          stream._storedError = void 0;
          stream._disturbed = false;
        }
        function IsReadableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStream2;
        }
        function IsReadableStreamLocked(stream) {
          if (stream._reader === void 0) {
            return false;
          }
          return true;
        }
        function ReadableStreamCancel(stream, reason) {
          stream._disturbed = true;
          if (stream._state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (stream._state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          ReadableStreamClose(stream);
          const reader = stream._reader;
          if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._closeSteps(void 0);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
          const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
          return transformPromiseWith(sourceCancelPromise, noop3);
        }
        function ReadableStreamClose(stream) {
          stream._state = "closed";
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseResolve(reader);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._closeSteps();
            });
            reader._readRequests = new SimpleQueue();
          }
        }
        function ReadableStreamError(stream, e2) {
          stream._state = "errored";
          stream._storedError = e2;
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseReject(reader, e2);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._errorSteps(e2);
            });
            reader._readRequests = new SimpleQueue();
          } else {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._errorSteps(e2);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
        }
        function streamBrandCheckException$1(name) {
          return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
        }
        function convertQueuingStrategyInit(init3, context) {
          assertDictionary(init3, context);
          const highWaterMark = init3 === null || init3 === void 0 ? void 0 : init3.highWaterMark;
          assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
          return {
            highWaterMark: convertUnrestrictedDouble(highWaterMark)
          };
        }
        const byteLengthSizeFunction = (chunk) => {
          return chunk.byteLength;
        };
        Object.defineProperty(byteLengthSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class ByteLengthQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "ByteLengthQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("highWaterMark");
            }
            return this._byteLengthQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("size");
            }
            return byteLengthSizeFunction;
          }
        }
        Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "ByteLengthQueuingStrategy",
            configurable: true
          });
        }
        function byteLengthBrandCheckException(name) {
          return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
        }
        function IsByteLengthQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof ByteLengthQueuingStrategy;
        }
        const countSizeFunction = () => {
          return 1;
        };
        Object.defineProperty(countSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class CountQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "CountQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._countQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("highWaterMark");
            }
            return this._countQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("size");
            }
            return countSizeFunction;
          }
        }
        Object.defineProperties(CountQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "CountQueuingStrategy",
            configurable: true
          });
        }
        function countBrandCheckException(name) {
          return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
        }
        function IsCountQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof CountQueuingStrategy;
        }
        function convertTransformer(original, context) {
          assertDictionary(original, context);
          const flush = original === null || original === void 0 ? void 0 : original.flush;
          const readableType = original === null || original === void 0 ? void 0 : original.readableType;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const transform = original === null || original === void 0 ? void 0 : original.transform;
          const writableType = original === null || original === void 0 ? void 0 : original.writableType;
          return {
            flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
            readableType,
            start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
            transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
            writableType
          };
        }
        function convertTransformerFlushCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertTransformerStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertTransformerTransformCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        class TransformStream {
          constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
            if (rawTransformer === void 0) {
              rawTransformer = null;
            }
            const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
            const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
            const transformer = convertTransformer(rawTransformer, "First parameter");
            if (transformer.readableType !== void 0) {
              throw new RangeError("Invalid readableType specified");
            }
            if (transformer.writableType !== void 0) {
              throw new RangeError("Invalid writableType specified");
            }
            const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
            const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
            const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
            const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
            let startPromise_resolve;
            const startPromise = newPromise((resolve2) => {
              startPromise_resolve = resolve2;
            });
            InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
            SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
            if (transformer.start !== void 0) {
              startPromise_resolve(transformer.start(this._transformStreamController));
            } else {
              startPromise_resolve(void 0);
            }
          }
          get readable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("readable");
            }
            return this._readable;
          }
          get writable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("writable");
            }
            return this._writable;
          }
        }
        Object.defineProperties(TransformStream.prototype, {
          readable: { enumerable: true },
          writable: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStream",
            configurable: true
          });
        }
        function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
          function startAlgorithm() {
            return startPromise;
          }
          function writeAlgorithm(chunk) {
            return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
          }
          function abortAlgorithm(reason) {
            return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
          }
          function closeAlgorithm() {
            return TransformStreamDefaultSinkCloseAlgorithm(stream);
          }
          stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
          function pullAlgorithm() {
            return TransformStreamDefaultSourcePullAlgorithm(stream);
          }
          function cancelAlgorithm(reason) {
            TransformStreamErrorWritableAndUnblockWrite(stream, reason);
            return promiseResolvedWith(void 0);
          }
          stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          stream._backpressure = void 0;
          stream._backpressureChangePromise = void 0;
          stream._backpressureChangePromise_resolve = void 0;
          TransformStreamSetBackpressure(stream, true);
          stream._transformStreamController = void 0;
        }
        function IsTransformStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
            return false;
          }
          return x2 instanceof TransformStream;
        }
        function TransformStreamError(stream, e2) {
          ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e2);
          TransformStreamErrorWritableAndUnblockWrite(stream, e2);
        }
        function TransformStreamErrorWritableAndUnblockWrite(stream, e2) {
          TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
          WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e2);
          if (stream._backpressure) {
            TransformStreamSetBackpressure(stream, false);
          }
        }
        function TransformStreamSetBackpressure(stream, backpressure) {
          if (stream._backpressureChangePromise !== void 0) {
            stream._backpressureChangePromise_resolve();
          }
          stream._backpressureChangePromise = newPromise((resolve2) => {
            stream._backpressureChangePromise_resolve = resolve2;
          });
          stream._backpressure = backpressure;
        }
        class TransformStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("desiredSize");
            }
            const readableController = this._controlledTransformStream._readable._readableStreamController;
            return ReadableStreamDefaultControllerGetDesiredSize(readableController);
          }
          enqueue(chunk = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("enqueue");
            }
            TransformStreamDefaultControllerEnqueue(this, chunk);
          }
          error(reason = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("error");
            }
            TransformStreamDefaultControllerError(this, reason);
          }
          terminate() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("terminate");
            }
            TransformStreamDefaultControllerTerminate(this);
          }
        }
        Object.defineProperties(TransformStreamDefaultController.prototype, {
          enqueue: { enumerable: true },
          error: { enumerable: true },
          terminate: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStreamDefaultController",
            configurable: true
          });
        }
        function IsTransformStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
            return false;
          }
          return x2 instanceof TransformStreamDefaultController;
        }
        function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
          controller._controlledTransformStream = stream;
          stream._transformStreamController = controller;
          controller._transformAlgorithm = transformAlgorithm;
          controller._flushAlgorithm = flushAlgorithm;
        }
        function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
          const controller = Object.create(TransformStreamDefaultController.prototype);
          let transformAlgorithm = (chunk) => {
            try {
              TransformStreamDefaultControllerEnqueue(controller, chunk);
              return promiseResolvedWith(void 0);
            } catch (transformResultE) {
              return promiseRejectedWith(transformResultE);
            }
          };
          let flushAlgorithm = () => promiseResolvedWith(void 0);
          if (transformer.transform !== void 0) {
            transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
          }
          if (transformer.flush !== void 0) {
            flushAlgorithm = () => transformer.flush(controller);
          }
          SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
        }
        function TransformStreamDefaultControllerClearAlgorithms(controller) {
          controller._transformAlgorithm = void 0;
          controller._flushAlgorithm = void 0;
        }
        function TransformStreamDefaultControllerEnqueue(controller, chunk) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
            throw new TypeError("Readable side is not in a state that permits enqueue");
          }
          try {
            ReadableStreamDefaultControllerEnqueue(readableController, chunk);
          } catch (e2) {
            TransformStreamErrorWritableAndUnblockWrite(stream, e2);
            throw stream._readable._storedError;
          }
          const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
          if (backpressure !== stream._backpressure) {
            TransformStreamSetBackpressure(stream, true);
          }
        }
        function TransformStreamDefaultControllerError(controller, e2) {
          TransformStreamError(controller._controlledTransformStream, e2);
        }
        function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
          const transformPromise = controller._transformAlgorithm(chunk);
          return transformPromiseWith(transformPromise, void 0, (r2) => {
            TransformStreamError(controller._controlledTransformStream, r2);
            throw r2;
          });
        }
        function TransformStreamDefaultControllerTerminate(controller) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          ReadableStreamDefaultControllerClose(readableController);
          const error2 = new TypeError("TransformStream terminated");
          TransformStreamErrorWritableAndUnblockWrite(stream, error2);
        }
        function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
          const controller = stream._transformStreamController;
          if (stream._backpressure) {
            const backpressureChangePromise = stream._backpressureChangePromise;
            return transformPromiseWith(backpressureChangePromise, () => {
              const writable2 = stream._writable;
              const state = writable2._state;
              if (state === "erroring") {
                throw writable2._storedError;
              }
              return TransformStreamDefaultControllerPerformTransform(controller, chunk);
            });
          }
          return TransformStreamDefaultControllerPerformTransform(controller, chunk);
        }
        function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
          TransformStreamError(stream, reason);
          return promiseResolvedWith(void 0);
        }
        function TransformStreamDefaultSinkCloseAlgorithm(stream) {
          const readable2 = stream._readable;
          const controller = stream._transformStreamController;
          const flushPromise = controller._flushAlgorithm();
          TransformStreamDefaultControllerClearAlgorithms(controller);
          return transformPromiseWith(flushPromise, () => {
            if (readable2._state === "errored") {
              throw readable2._storedError;
            }
            ReadableStreamDefaultControllerClose(readable2._readableStreamController);
          }, (r2) => {
            TransformStreamError(stream, r2);
            throw readable2._storedError;
          });
        }
        function TransformStreamDefaultSourcePullAlgorithm(stream) {
          TransformStreamSetBackpressure(stream, false);
          return stream._backpressureChangePromise;
        }
        function defaultControllerBrandCheckException(name) {
          return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
        }
        function streamBrandCheckException(name) {
          return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
        }
        exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
        exports2.CountQueuingStrategy = CountQueuingStrategy;
        exports2.ReadableByteStreamController = ReadableByteStreamController;
        exports2.ReadableStream = ReadableStream2;
        exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
        exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
        exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
        exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
        exports2.TransformStream = TransformStream;
        exports2.TransformStreamDefaultController = TransformStreamDefaultController;
        exports2.WritableStream = WritableStream;
        exports2.WritableStreamDefaultController = WritableStreamDefaultController;
        exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    })(ponyfill_es2018, ponyfill_es2018.exports);
    POOL_SIZE$1 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = __require("node:process");
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {
          };
          Object.assign(globalThis, __require("node:stream/web"));
          process2.emitWarning = emitWarning;
        } catch (error2) {
          process2.emitWarning = emitWarning;
          throw error2;
        }
      } catch (error2) {
        Object.assign(globalThis, ponyfill_es2018.exports);
      }
    }
    try {
      const { Blob: Blob3 } = __require("buffer");
      if (Blob3 && !Blob3.prototype.stream) {
        Blob3.prototype.stream = function name(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE$1));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error2) {
    }
    POOL_SIZE = 65536;
    _Blob = class Blob {
      #parts = [];
      #type = "";
      #size = 0;
      constructor(blobParts = [], options = {}) {
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && typeof options !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options === null)
          options = {};
        const encoder2 = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof Blob) {
            part = element;
          } else {
            part = encoder2.encode(element);
          }
          this.#size += ArrayBuffer.isView(part) ? part.byteLength : part.size;
          this.#parts.push(part);
        }
        const type = options.type === void 0 ? "" : String(options.type);
        this.#type = /^[\x20-\x7E]*$/.test(type) ? type : "";
      }
      get size() {
        return this.#size;
      }
      get type() {
        return this.#type;
      }
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(this.#parts, false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator(this.#parts, false)) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        const it = toIterator(this.#parts, true);
        return new globalThis.ReadableStream({
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = this.#parts;
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new Blob([], { type: String(type).toLowerCase() });
        blob.#size = span;
        blob.#parts = blobParts;
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    };
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob2 = _Blob;
    Blob$1 = Blob2;
    _File = class File2 extends Blob$1 {
      #lastModified = 0;
      #name = "";
      constructor(fileBits, fileName, options = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options);
        if (options === null)
          options = {};
        const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
          this.#lastModified = lastModified;
        }
        this.#name = String(fileName);
      }
      get name() {
        return this.#name;
      }
      get lastModified() {
        return this.#lastModified;
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
    };
    File = _File;
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f2 = (a, b, c) => (a += "", /^(Blob|File)$/.test(b && b[t]) ? [(c = c !== void 0 ? c + "" : b[t] == "File" ? b.name : "blob", a), b.name !== c || b[t] == "blob" ? new File([b], c, b) : b] : [a, b + ""]);
    e = (c, f3) => (f3 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n, a, e2) => {
      if (a.length < e2) {
        throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e2} arguments required, but only ${a.length} present.`);
      }
    };
    FormData = class FormData2 {
      #d = [];
      constructor(...a) {
        if (a.length)
          throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h](o) {
        return o && typeof o === "object" && o[t] === "FormData" && !m.some((m2) => typeof o[m2] != "function");
      }
      append(...a) {
        x("append", arguments, 2);
        this.#d.push(f2(...a));
      }
      delete(a) {
        x("delete", arguments, 1);
        a += "";
        this.#d = this.#d.filter(([b]) => b !== a);
      }
      get(a) {
        x("get", arguments, 1);
        a += "";
        for (var b = this.#d, l = b.length, c = 0; c < l; c++)
          if (b[c][0] === a)
            return b[c][1];
        return null;
      }
      getAll(a, b) {
        x("getAll", arguments, 1);
        b = [];
        a += "";
        this.#d.forEach((c) => c[0] === a && b.push(c[1]));
        return b;
      }
      has(a) {
        x("has", arguments, 1);
        a += "";
        return this.#d.some((b) => b[0] === a);
      }
      forEach(a, b) {
        x("forEach", arguments, 1);
        for (var [c, d] of this)
          a.call(b, d, c, this);
      }
      set(...a) {
        x("set", arguments, 2);
        var b = [], c = true;
        a = f2(...a);
        this.#d.forEach((d) => {
          d[0] === a[0] ? c && (c = !b.push(a)) : b.push(d);
        });
        c && b.push(a);
        this.#d = b;
      }
      *entries() {
        yield* this.#d;
      }
      *keys() {
        for (var [a] of this)
          yield a;
      }
      *values() {
        for (var [, a] of this)
          yield a;
      }
    };
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
    FetchError = class extends FetchBaseError {
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
    };
    isBlob = (object) => {
      return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
    };
    isAbortSignal = (object) => {
      return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
    };
    INTERNALS$2 = Symbol("Body internals");
    Body = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters(body)) {
          body = Buffer.from(body.toString());
        } else if (isBlob(body))
          ;
        else if (Buffer.isBuffer(body))
          ;
        else if (types.isAnyArrayBuffer(body)) {
          body = Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof Stream)
          ;
        else if (body instanceof FormData) {
          body = formDataToBlob(body);
          boundary = body.type.split("=")[1];
        } else {
          body = Buffer.from(String(body));
        }
        let stream = body;
        if (Buffer.isBuffer(body)) {
          stream = Stream.Readable.from(body);
        } else if (isBlob(body)) {
          stream = Stream.Readable.from(body.stream());
        }
        this[INTERNALS$2] = {
          body,
          stream,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof Stream) {
          body.on("error", (error_) => {
            const error2 = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
            this[INTERNALS$2].error = error2;
          });
        }
      }
      get body() {
        return this[INTERNALS$2].stream;
      }
      get bodyUsed() {
        return this[INTERNALS$2].disturbed;
      }
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async formData() {
        const ct = this.headers.get("content-type");
        if (ct.startsWith("application/x-www-form-urlencoded")) {
          const formData = new FormData();
          const parameters = new URLSearchParams(await this.text());
          for (const [name, value] of parameters) {
            formData.append(name, value);
          }
          return formData;
        }
        const { toFormData: toFormData2 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
        return toFormData2(this.body, ct);
      }
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
        const buf = await this.buffer();
        return new Blob$1([buf], {
          type: ct
        });
      }
      async json() {
        const buffer = await consumeBody(this);
        return JSON.parse(buffer.toString());
      }
      async text() {
        const buffer = await consumeBody(this);
        return buffer.toString();
      }
      buffer() {
        return consumeBody(this);
      }
    };
    Body.prototype.buffer = deprecate(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true }
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance[INTERNALS$2];
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof Stream && typeof body.getBoundary !== "function") {
        p1 = new PassThrough({ highWaterMark });
        p2 = new PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS$2].stream = p1;
        body = p2;
      }
      return body;
    };
    getNonSpecFormDataBoundary = deprecate((body) => body.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167");
    extractContentType = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob(body)) {
        return body.type || null;
      }
      if (Buffer.isBuffer(body) || types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body instanceof FormData) {
        return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
      }
      if (body instanceof Stream) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes = (request) => {
      const { body } = request[INTERNALS$2];
      if (body === null) {
        return 0;
      }
      if (isBlob(body)) {
        return body.size;
      }
      if (Buffer.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      return null;
    };
    writeToStream = (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else {
        body.pipe(dest);
      }
    };
    validateHeaderName = typeof http.validateHeaderName === "function" ? http.validateHeaderName : (name) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
        const error2 = new TypeError(`Header name must be a valid HTTP token [${name}]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw error2;
      }
    };
    validateHeaderValue = typeof http.validateHeaderValue === "function" ? http.validateHeaderValue : (name, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const error2 = new TypeError(`Invalid character in header content ["${name}"]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_CHAR" });
        throw error2;
      }
    };
    Headers2 = class extends URLSearchParams {
      constructor(init3) {
        let result = [];
        if (init3 instanceof Headers2) {
          const raw = init3.raw();
          for (const [name, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name, value]));
          }
        } else if (init3 == null)
          ;
        else if (typeof init3 === "object" && !types.isBoxedPrimitive(init3)) {
          const method = init3[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init3));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init3].map((pair) => {
              if (typeof pair !== "object" || types.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name, value]) => {
          validateHeaderName(name);
          validateHeaderValue(name, String(value));
          return [String(name).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name, value) => {
                  validateHeaderName(name);
                  validateHeaderValue(name, String(value));
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase(), String(value));
                };
              case "delete":
              case "has":
              case "getAll":
                return (name) => {
                  validateHeaderName(name);
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase());
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name) {
        const values = this.getAll(name);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback, thisArg = void 0) {
        for (const name of this.keys()) {
          Reflect.apply(callback, thisArg, [this.get(name), name, this]);
        }
      }
      *values() {
        for (const name of this.keys()) {
          yield this.get(name);
        }
      }
      *entries() {
        for (const name of this.keys()) {
          yield [name, this.get(name)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      raw() {
        return [...this.keys()].reduce((result, key2) => {
          result[key2] = this.getAll(key2);
          return result;
        }, {});
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key2) => {
          const values = this.getAll(key2);
          if (key2 === "host") {
            result[key2] = values[0];
          } else {
            result[key2] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(Headers2.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
      result[property] = { enumerable: true };
      return result;
    }, {}));
    redirectStatus = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    isRedirect = (code) => {
      return redirectStatus.has(code);
    };
    INTERNALS$1 = Symbol("Response internals");
    Response2 = class extends Body {
      constructor(body = null, options = {}) {
        super(body, options);
        const status = options.status != null ? options.status : 200;
        const headers = new Headers2(options.headers);
        if (body !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body, this);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS$1] = {
          type: "default",
          url: options.url,
          status,
          statusText: options.statusText || "",
          headers,
          counter: options.counter,
          highWaterMark: options.highWaterMark
        };
      }
      get type() {
        return this[INTERNALS$1].type;
      }
      get url() {
        return this[INTERNALS$1].url || "";
      }
      get status() {
        return this[INTERNALS$1].status;
      }
      get ok() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
      }
      get redirected() {
        return this[INTERNALS$1].counter > 0;
      }
      get statusText() {
        return this[INTERNALS$1].statusText;
      }
      get headers() {
        return this[INTERNALS$1].headers;
      }
      get highWaterMark() {
        return this[INTERNALS$1].highWaterMark;
      }
      clone() {
        return new Response2(clone(this, this.highWaterMark), {
          type: this.type,
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size,
          highWaterMark: this.highWaterMark
        });
      }
      static redirect(url, status = 302) {
        if (!isRedirect(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new Response2(null, {
          headers: {
            location: new URL(url).toString()
          },
          status
        });
      }
      static error() {
        const response = new Response2(null, { status: 0, statusText: "" });
        response[INTERNALS$1].type = "error";
        return response;
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response2.prototype, {
      type: { enumerable: true },
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
    getSearch = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
    };
    ReferrerPolicy = /* @__PURE__ */ new Set([
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ]);
    DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
    INTERNALS = Symbol("Request internals");
    isRequest = (object) => {
      return typeof object === "object" && typeof object[INTERNALS] === "object";
    };
    Request2 = class extends Body {
      constructor(input, init3 = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        if (parsedURL.username !== "" || parsedURL.password !== "") {
          throw new TypeError(`${parsedURL} is an url with embedded credentails.`);
        }
        let method = init3.method || input.method || "GET";
        method = method.toUpperCase();
        if ((init3.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init3.body ? init3.body : isRequest(input) && input.body !== null ? clone(input) : null;
        super(inputBody, {
          size: init3.size || input.size || 0
        });
        const headers = new Headers2(init3.headers || input.headers || {});
        if (inputBody !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers.set("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init3) {
          signal = init3.signal;
        }
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
        }
        let referrer = init3.referrer == null ? input.referrer : init3.referrer;
        if (referrer === "") {
          referrer = "no-referrer";
        } else if (referrer) {
          const parsedReferrer = new URL(referrer);
          referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
        } else {
          referrer = void 0;
        }
        this[INTERNALS] = {
          method,
          redirect: init3.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal,
          referrer
        };
        this.follow = init3.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init3.follow;
        this.compress = init3.compress === void 0 ? input.compress === void 0 ? true : input.compress : init3.compress;
        this.counter = init3.counter || input.counter || 0;
        this.agent = init3.agent || input.agent;
        this.highWaterMark = init3.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init3.insecureHTTPParser || input.insecureHTTPParser || false;
        this.referrerPolicy = init3.referrerPolicy || input.referrerPolicy || "";
      }
      get method() {
        return this[INTERNALS].method;
      }
      get url() {
        return format(this[INTERNALS].parsedURL);
      }
      get headers() {
        return this[INTERNALS].headers;
      }
      get redirect() {
        return this[INTERNALS].redirect;
      }
      get signal() {
        return this[INTERNALS].signal;
      }
      get referrer() {
        if (this[INTERNALS].referrer === "no-referrer") {
          return "";
        }
        if (this[INTERNALS].referrer === "client") {
          return "about:client";
        }
        if (this[INTERNALS].referrer) {
          return this[INTERNALS].referrer.toString();
        }
        return void 0;
      }
      get referrerPolicy() {
        return this[INTERNALS].referrerPolicy;
      }
      set referrerPolicy(referrerPolicy) {
        this[INTERNALS].referrerPolicy = validateReferrerPolicy(referrerPolicy);
      }
      clone() {
        return new Request2(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request2.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true },
      referrer: { enumerable: true },
      referrerPolicy: { enumerable: true }
    });
    getNodeRequestOptions = (request) => {
      const { parsedURL } = request[INTERNALS];
      const headers = new Headers2(request[INTERNALS].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (request.referrerPolicy === "") {
        request.referrerPolicy = DEFAULT_REFERRER_POLICY;
      }
      if (request.referrer && request.referrer !== "no-referrer") {
        request[INTERNALS].referrer = determineRequestsReferrer(request);
      } else {
        request[INTERNALS].referrer = "no-referrer";
      }
      if (request[INTERNALS].referrer instanceof URL) {
        headers.set("Referer", request.referrer);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip,deflate,br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      const search = getSearch(parsedURL);
      const options = {
        path: parsedURL.pathname + search,
        method: request.method,
        headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return {
        parsedURL,
        options
      };
    };
    AbortError = class extends FetchBaseError {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
    supportedSchemas = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
  }
});

// .svelte-kit/output/server/chunks/index-11e5a9f0.js
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function escape2(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function escape_attribute_value(value) {
  return typeof value === "string" ? escape2(value) : value;
}
function each(items, fn) {
  let str = "";
  for (let i2 = 0; i2 < items.length; i2 += 1) {
    str += fn(items[i2], i2);
  }
  return str;
}
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css6) => css6.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape_attribute_value(value.toString())}"`;
  return ` ${name}${assignment}`;
}
var current_component, escaped, missing_component, on_destroy;
var init_index_11e5a9f0 = __esm({
  ".svelte-kit/output/server/chunks/index-11e5a9f0.js"() {
    Promise.resolve();
    escaped = {
      '"': "&quot;",
      "'": "&#39;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;"
    };
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/hooks-1c45ba0b.js
var hooks_1c45ba0b_exports = {};
var init_hooks_1c45ba0b = __esm({
  ".svelte-kit/output/server/chunks/hooks-1c45ba0b.js"() {
  }
});

// .svelte-kit/output/server/entries/pages/__layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => _layout
});
var _layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/__layout.svelte.js"() {
    init_index_11e5a9f0();
    _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${slots.default ? slots.default({}) : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  css: () => css,
  entry: () => entry,
  js: () => js,
  module: () => layout_svelte_exports
});
var entry, js, css;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_layout_svelte();
    entry = "pages/__layout.svelte-1e7cca4e.js";
    js = ["pages/__layout.svelte-1e7cca4e.js", "chunks/index-ec26513d.js"];
    css = ["assets/pages/__layout.svelte-2affb039.css"];
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2,
  load: () => load
});
function load({ error: error2, status }) {
  return { props: { error: error2, status } };
}
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_index_11e5a9f0();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { status } = $$props;
      let { error: error2 } = $$props;
      if ($$props.status === void 0 && $$bindings.status && status !== void 0)
        $$bindings.status(status);
      if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
        $$bindings.error(error2);
      return `<h1>${escape2(status)}</h1>

<pre>${escape2(error2.message)}</pre>



${error2.frame ? `<pre>${escape2(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape2(error2.stack)}</pre>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  css: () => css2,
  entry: () => entry2,
  js: () => js2,
  module: () => error_svelte_exports
});
var entry2, js2, css2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    init_error_svelte();
    entry2 = "error.svelte-93ba8f1a.js";
    js2 = ["error.svelte-93ba8f1a.js", "chunks/index-ec26513d.js"];
    css2 = [];
  }
});

// node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/yson.js
var require_yson = __commonJS({
  "node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/yson.js"(exports, module) {
    (function() {
      var yson = {}, u, sI = setTimeout.turn || typeof setImmediate != "" + u && setImmediate || setTimeout;
      yson.parseAsync = function(text, done, revive, M) {
        if (typeof text != "string") {
          try {
            done(u, JSON.parse(text));
          } catch (e2) {
            done(e2);
          }
          return;
        }
        var ctx = { i: 0, text, done, l: text.length, up: [] };
        M = M || 1024 * 32;
        parse2();
        function parse2() {
          var s3 = ctx.text;
          var i2 = ctx.i, l = ctx.l, j = 0;
          var w = ctx.w, b, tmp;
          while (j++ < M) {
            var c = s3[i2++];
            if (i2 > l) {
              ctx.end = true;
              break;
            }
            if (w) {
              i2 = s3.indexOf('"', i2 - 1);
              c = s3[i2];
              tmp = 0;
              while (s3[i2 - ++tmp] == "\\") {
              }
              ;
              tmp = !(tmp % 2);
              b = b || tmp;
              if (c == '"' && !tmp) {
                w = u;
                tmp = ctx.s;
                if (ctx.a) {
                  tmp = s3.slice(ctx.sl, i2);
                  if (b || 1 + tmp.indexOf("\\")) {
                    tmp = JSON.parse('"' + tmp + '"');
                  }
                  if (ctx.at instanceof Array) {
                    ctx.at.push(ctx.s = tmp);
                  } else {
                    if (!ctx.at) {
                      ctx.end = j = M;
                      tmp = u;
                    }
                    (ctx.at || {})[ctx.s] = ctx.s = tmp;
                  }
                  ctx.s = u;
                } else {
                  ctx.s = s3.slice(ctx.sl, i2);
                  if (b || 1 + ctx.s.indexOf("\\")) {
                    ctx.s = JSON.parse('"' + ctx.s + '"');
                  }
                }
                ctx.a = b = u;
              }
              ++i2;
            } else {
              switch (c) {
                case '"':
                  ctx.sl = i2;
                  w = true;
                  break;
                case ":":
                  ctx.ai = i2;
                  ctx.a = true;
                  break;
                case ",":
                  if (ctx.a || ctx.at instanceof Array) {
                    if (tmp = s3.slice(ctx.ai, i2 - 1)) {
                      if (u !== (tmp = value(tmp))) {
                        if (ctx.at instanceof Array) {
                          ctx.at.push(tmp);
                        } else {
                          ctx.at[ctx.s] = tmp;
                        }
                      }
                    }
                  }
                  ctx.a = u;
                  if (ctx.at instanceof Array) {
                    ctx.a = true;
                    ctx.ai = i2;
                  }
                  break;
                case "{":
                  ctx.up.push(ctx.at || (ctx.at = {}));
                  if (ctx.at instanceof Array) {
                    ctx.at.push(ctx.at = {});
                  } else if (u !== (tmp = ctx.s)) {
                    ctx.at[tmp] = ctx.at = {};
                  }
                  ctx.a = u;
                  break;
                case "}":
                  if (ctx.a) {
                    if (tmp = s3.slice(ctx.ai, i2 - 1)) {
                      if (u !== (tmp = value(tmp))) {
                        if (ctx.at instanceof Array) {
                          ctx.at.push(tmp);
                        } else {
                          if (!ctx.at) {
                            ctx.end = j = M;
                            tmp = u;
                          }
                          (ctx.at || {})[ctx.s] = tmp;
                        }
                      }
                    }
                  }
                  ctx.a = u;
                  ctx.at = ctx.up.pop();
                  break;
                case "[":
                  if (u !== (tmp = ctx.s)) {
                    ctx.up.push(ctx.at);
                    ctx.at[tmp] = ctx.at = [];
                  } else if (!ctx.at) {
                    ctx.up.push(ctx.at = []);
                  }
                  ctx.a = true;
                  ctx.ai = i2;
                  break;
                case "]":
                  if (ctx.a) {
                    if (tmp = s3.slice(ctx.ai, i2 - 1)) {
                      if (u !== (tmp = value(tmp))) {
                        if (ctx.at instanceof Array) {
                          ctx.at.push(tmp);
                        } else {
                          ctx.at[ctx.s] = tmp;
                        }
                      }
                    }
                  }
                  ctx.a = u;
                  ctx.at = ctx.up.pop();
                  break;
              }
            }
          }
          ctx.s = u;
          ctx.i = i2;
          ctx.w = w;
          if (ctx.end) {
            tmp = ctx.at;
            if (u === tmp) {
              try {
                tmp = JSON.parse(text);
              } catch (e2) {
                return ctx.done(e2);
              }
            }
            ctx.done(u, tmp);
          } else {
            sI(parse2);
          }
        }
      };
      function value(s3) {
        var n = parseFloat(s3);
        if (!isNaN(n)) {
          return n;
        }
        s3 = s3.trim();
        if (s3 == "true") {
          return true;
        }
        if (s3 == "false") {
          return false;
        }
        if (s3 == "null") {
          return null;
        }
      }
      yson.stringifyAsync = function(data, done, replacer, space, ctx) {
        ctx = ctx || {};
        ctx.text = ctx.text || "";
        ctx.up = [ctx.at = { d: data }];
        ctx.done = done;
        ctx.i = 0;
        var j = 0;
        ify();
        function ify() {
          var at = ctx.at, data2 = at.d, add = "", tmp;
          if (at.i && at.i - at.j > 0) {
            add += ",";
          }
          if (u !== (tmp = at.k)) {
            add += JSON.stringify(tmp) + ":";
          }
          switch (typeof data2) {
            case "boolean":
              add += "" + data2;
              break;
            case "string":
              add += JSON.stringify(data2);
              break;
            case "number":
              add += data2;
              break;
            case "object":
              if (!data2) {
                add += "null";
                break;
              }
              if (data2 instanceof Array) {
                add += "[";
                at = { i: -1, as: data2, up: at, j: 0 };
                at.l = data2.length;
                ctx.up.push(ctx.at = at);
                break;
              }
              if (typeof (data2 || "").toJSON != "function") {
                add += "{";
                at = { i: -1, ok: Object.keys(data2).sort(), as: data2, up: at, j: 0 };
                at.l = at.ok.length;
                ctx.up.push(ctx.at = at);
                break;
              }
              if (tmp = data2.toJSON()) {
                add += tmp;
                break;
              }
            case "function":
              if (at.as instanceof Array) {
                add += "null";
                break;
              }
            default:
              add = "";
              at.j++;
          }
          ctx.text += add;
          while (1 + at.i >= at.l) {
            ctx.text += at.ok ? "}" : "]";
            at = ctx.at = at.up;
          }
          if (++at.i < at.l) {
            if (tmp = at.ok) {
              at.d = at.as[at.k = tmp[at.i]];
            } else {
              at.d = at.as[at.i];
            }
            if (++j < 9) {
              return ify();
            } else {
              j = 0;
            }
            sI(ify);
            return;
          }
          ctx.done(u, ctx.text);
        }
      };
      if (typeof window != "" + u) {
        window.YSON = yson;
      }
      try {
        if (typeof module != "" + u) {
          module.exports = yson;
        }
      } catch (e2) {
      }
      if (typeof JSON != "" + u) {
        JSON.parseAsync = yson.parseAsync;
        JSON.stringifyAsync = yson.stringifyAsync;
      }
    })();
  }
});

// node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/gun.js
var require_gun = __commonJS({
  "node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/gun.js"(exports, module) {
    (function() {
      function USE(arg, req) {
        return req ? __require(arg) : arg.slice ? USE[R(arg)] : function(mod, path2) {
          arg(mod = { exports: {} });
          USE[R(path2)] = mod.exports;
        };
        function R(p) {
          return p.split("/").slice(-1).toString().replace(".js", "");
        }
      }
      if (typeof module !== "undefined") {
        var MODULE = module;
      }
      ;
      USE(function(module2) {
        String.random = function(l, c) {
          var s3 = "";
          l = l || 24;
          c = c || "0123456789ABCDEFGHIJKLMNOPQRSTUVWXZabcdefghijklmnopqrstuvwxyz";
          while (l-- > 0) {
            s3 += c.charAt(Math.floor(Math.random() * c.length));
          }
          return s3;
        };
        String.match = function(t2, o) {
          var tmp, u;
          if (typeof t2 !== "string") {
            return false;
          }
          if (typeof o == "string") {
            o = { "=": o };
          }
          o = o || {};
          tmp = o["="] || o["*"] || o[">"] || o["<"];
          if (t2 === tmp) {
            return true;
          }
          if (u !== o["="]) {
            return false;
          }
          tmp = o["*"] || o[">"];
          if (t2.slice(0, (tmp || "").length) === tmp) {
            return true;
          }
          if (u !== o["*"]) {
            return false;
          }
          if (u !== o[">"] && u !== o["<"]) {
            return t2 >= o[">"] && t2 <= o["<"] ? true : false;
          }
          if (u !== o[">"] && t2 >= o[">"]) {
            return true;
          }
          if (u !== o["<"] && t2 <= o["<"]) {
            return true;
          }
          return false;
        };
        String.hash = function(s3, c) {
          if (typeof s3 !== "string") {
            return;
          }
          c = c || 0;
          if (!s3.length) {
            return c;
          }
          for (var i2 = 0, l = s3.length, n; i2 < l; ++i2) {
            n = s3.charCodeAt(i2);
            c = (c << 5) - c + n;
            c |= 0;
          }
          return c;
        };
        var has = Object.prototype.hasOwnProperty;
        Object.plain = function(o) {
          return o ? o instanceof Object && o.constructor === Object || Object.prototype.toString.call(o).match(/^\[object (\w+)\]$/)[1] === "Object" : false;
        };
        Object.empty = function(o, n) {
          for (var k in o) {
            if (has.call(o, k) && (!n || n.indexOf(k) == -1)) {
              return false;
            }
          }
          return true;
        };
        Object.keys = Object.keys || function(o) {
          var l = [];
          for (var k in o) {
            if (has.call(o, k)) {
              l.push(k);
            }
          }
          return l;
        };
        (function() {
          var u, sT = setTimeout, l = 0, c = 0, sI = typeof setImmediate !== "" + u && setImmediate || sT;
          sT.hold = sT.hold || 9;
          sT.poll = sT.poll || function(f3) {
            if (sT.hold >= +new Date() - l && c++ < 3333) {
              f3();
              return;
            }
            sI(function() {
              l = +new Date();
              f3();
            }, c = 0);
          };
        })();
        ;
        (function() {
          var sT = setTimeout, t2 = sT.turn = sT.turn || function(f4) {
            s3.push(f4) == 1 && p(T);
          }, s3 = t2.s = [], p = sT.poll, i2 = 0, f3, T = function() {
            if (f3 = s3[i2++]) {
              f3();
            }
            if (i2 == s3.length || i2 == 99) {
              s3 = t2.s = s3.slice(i2);
              i2 = 0;
            }
            if (s3.length) {
              p(T);
            }
          };
        })();
        ;
        (function() {
          var u, sT = setTimeout, T = sT.turn;
          (sT.each = sT.each || function(l, f3, e2, S2) {
            S2 = S2 || 9;
            (function t2(s3, L, r2) {
              if (L = (s3 = (l || []).splice(0, S2)).length) {
                for (var i2 = 0; i2 < L; i2++) {
                  if (u !== (r2 = f3(s3[i2]))) {
                    break;
                  }
                }
                if (u === r2) {
                  T(t2);
                  return;
                }
              }
              e2 && e2(r2);
            })();
          })();
        })();
      })(USE, "./shim");
      ;
      USE(function(module2) {
        module2.exports = function onto(tag, arg, as) {
          if (!tag) {
            return { to: onto };
          }
          var u, f3 = typeof arg == "function", tag = (this.tag || (this.tag = {}))[tag] || f3 && (this.tag[tag] = { tag, to: onto._ = { next: function(arg2) {
            var tmp;
            if (tmp = this.to) {
              tmp.next(arg2);
            }
          } } });
          if (f3) {
            var be = {
              off: onto.off || (onto.off = function() {
                if (this.next === onto._.next) {
                  return true;
                }
                if (this === this.the.last) {
                  this.the.last = this.back;
                }
                this.to.back = this.back;
                this.next = onto._.next;
                this.back.to = this.to;
                if (this.the.last === this.the) {
                  delete this.on.tag[this.the.tag];
                }
              }),
              to: onto._,
              next: arg,
              the: tag,
              on: this,
              as
            };
            (be.back = tag.last || tag).to = be;
            return tag.last = be;
          }
          if ((tag = tag.to) && u !== arg) {
            tag.next(arg);
          }
          return tag;
        };
      })(USE, "./onto");
      ;
      USE(function(module2) {
        module2.exports = function(v) {
          return v === null || typeof v === "string" || typeof v === "boolean" || typeof v === "number" && v != Infinity && v != -Infinity && v === v || !!v && typeof v["#"] == "string" && Object.keys(v).length === 1 && v["#"];
        };
      })(USE, "./valid");
      ;
      USE(function(module2) {
        USE("./shim");
        function State() {
          var t2 = +new Date();
          if (last < t2) {
            return N = 0, last = t2 + State.drift;
          }
          return last = t2 + (N += 1) / D + State.drift;
        }
        State.drift = 0;
        var NI = -Infinity, N = 0, D = 999, last = NI, u;
        State.is = function(n, k, o) {
          var tmp = k && n && n._ && n._[">"] || o;
          if (!tmp) {
            return;
          }
          return typeof (tmp = tmp[k]) == "number" ? tmp : NI;
        };
        State.ify = function(n, k, s3, v, soul) {
          (n = n || {})._ = n._ || {};
          if (soul) {
            n._["#"] = soul;
          }
          var tmp = n._[">"] || (n._[">"] = {});
          if (u !== k && k !== "_") {
            if (typeof s3 == "number") {
              tmp[k] = s3;
            }
            if (u !== v) {
              n[k] = v;
            }
          }
          return n;
        };
        module2.exports = State;
      })(USE, "./state");
      ;
      USE(function(module2) {
        USE("./shim");
        function Dup(opt) {
          var dup = { s: {} }, s3 = dup.s;
          opt = opt || { max: 999, age: 1e3 * 9 };
          dup.check = function(id) {
            if (!s3[id]) {
              return false;
            }
            return dt(id);
          };
          var dt = dup.track = function(id) {
            var it = s3[id] || (s3[id] = {});
            it.was = dup.now = +new Date();
            if (!dup.to) {
              dup.to = setTimeout(dup.drop, opt.age + 9);
            }
            return it;
          };
          dup.drop = function(age) {
            dup.to = null;
            dup.now = +new Date();
            var l = Object.keys(s3);
            console.STAT && console.STAT(dup.now, +new Date() - dup.now, "dup drop keys");
            setTimeout.each(l, function(id) {
              var it = s3[id];
              if (it && (age || opt.age) > dup.now - it.was) {
                return;
              }
              delete s3[id];
            }, 0, 99);
          };
          return dup;
        }
        module2.exports = Dup;
      })(USE, "./dup");
      ;
      USE(function(module2) {
        USE("./onto");
        module2.exports = function ask(cb, as) {
          if (!this.on) {
            return;
          }
          var lack = (this.opt || {}).lack || 9e3;
          if (!(typeof cb == "function")) {
            if (!cb) {
              return;
            }
            var id = cb["#"] || cb, tmp = (this.tag || "")[id];
            if (!tmp) {
              return;
            }
            if (as) {
              tmp = this.on(id, as);
              clearTimeout(tmp.err);
              tmp.err = setTimeout(function() {
                tmp.off();
              }, lack);
            }
            return true;
          }
          var id = as && as["#"] || random(9);
          if (!cb) {
            return id;
          }
          var to = this.on(id, cb, as);
          to.err = to.err || setTimeout(function() {
            to.off();
            to.next({ err: "Error: No ACK yet.", lack: true });
          }, lack);
          return id;
        };
        var random = String.random || function() {
          return Math.random().toString(36).slice(2);
        };
      })(USE, "./ask");
      ;
      USE(function(module2) {
        function Gun2(o) {
          if (o instanceof Gun2) {
            return (this._ = { $: this }).$;
          }
          if (!(this instanceof Gun2)) {
            return new Gun2(o);
          }
          return Gun2.create(this._ = { $: this, opt: o });
        }
        Gun2.is = function($) {
          return $ instanceof Gun2 || $ && $._ && $ === $._.$ || false;
        };
        Gun2.version = 0.202;
        Gun2.chain = Gun2.prototype;
        Gun2.chain.toJSON = function() {
        };
        USE("./shim");
        Gun2.valid = USE("./valid");
        Gun2.state = USE("./state");
        Gun2.on = USE("./onto");
        Gun2.dup = USE("./dup");
        Gun2.ask = USE("./ask");
        ;
        (function() {
          Gun2.create = function(at) {
            at.root = at.root || at;
            at.graph = at.graph || {};
            at.on = at.on || Gun2.on;
            at.ask = at.ask || Gun2.ask;
            at.dup = at.dup || Gun2.dup();
            var gun = at.$.opt(at.opt);
            if (!at.once) {
              at.on("in", universe, at);
              at.on("out", universe, at);
              at.on("put", map, at);
              Gun2.on("create", at);
              at.on("create", at);
            }
            at.once = 1;
            return gun;
          };
          function universe(msg) {
            if (!msg) {
              return;
            }
            if (msg.out === universe) {
              this.to.next(msg);
              return;
            }
            var eve = this, as = eve.as, at = as.at || as, gun = at.$, dup = at.dup, tmp, DBG = msg.DBG;
            (tmp = msg["#"]) || (tmp = msg["#"] = text_rand(9));
            if (dup.check(tmp)) {
              return;
            }
            dup.track(tmp);
            tmp = msg._;
            msg._ = typeof tmp == "function" ? tmp : function() {
            };
            msg.$ && msg.$ === (msg.$._ || "").$ || (msg.$ = gun);
            if (msg["@"] && !msg.put) {
              ack(msg);
            }
            if (!at.ask(msg["@"], msg)) {
              DBG && (DBG.u = +new Date());
              if (msg.put) {
                put(msg);
                return;
              } else if (msg.get) {
                Gun2.on.get(msg, gun);
              }
            }
            DBG && (DBG.uc = +new Date());
            eve.to.next(msg);
            DBG && (DBG.ua = +new Date());
            if (msg.nts || msg.NTS) {
              return;
            }
            msg.out = universe;
            at.on("out", msg);
            DBG && (DBG.ue = +new Date());
          }
          function put(msg) {
            if (!msg) {
              return;
            }
            var ctx = msg._ || "", root = ctx.root = ((ctx.$ = msg.$ || "")._ || "").root;
            if (msg["@"] && ctx.faith && !ctx.miss) {
              msg.out = universe;
              root.on("out", msg);
              return;
            }
            ctx.latch = root.hatch;
            ctx.match = root.hatch = [];
            var put2 = msg.put;
            var DBG = ctx.DBG = msg.DBG, S2 = +new Date();
            CT = CT || S2;
            if (put2["#"] && put2["."]) {
              return;
            }
            DBG && (DBG.p = S2);
            ctx["#"] = msg["#"];
            ctx.msg = msg;
            ctx.all = 0;
            ctx.stun = 1;
            var nl = Object.keys(put2);
            console.STAT && console.STAT(S2, ((DBG || ctx).pk = +new Date()) - S2, "put sort");
            var ni = 0, nj, kl, soul, node, states, err, tmp;
            (function pop(o) {
              if (nj != ni) {
                nj = ni;
                if (!(soul = nl[ni])) {
                  console.STAT && console.STAT(S2, ((DBG || ctx).pd = +new Date()) - S2, "put");
                  fire(ctx);
                  return;
                }
                if (!(node = put2[soul])) {
                  err = ERR + cut(soul) + "no node.";
                } else if (!(tmp = node._)) {
                  err = ERR + cut(soul) + "no meta.";
                } else if (soul !== tmp["#"]) {
                  err = ERR + cut(soul) + "soul not same.";
                } else if (!(states = tmp[">"])) {
                  err = ERR + cut(soul) + "no state.";
                }
                kl = Object.keys(node || {});
              }
              if (err) {
                msg.err = ctx.err = err;
                fire(ctx);
                return;
              }
              var i2 = 0, key2;
              o = o || 0;
              while (o++ < 9 && (key2 = kl[i2++])) {
                if (key2 === "_") {
                  continue;
                }
                var val = node[key2], state = states[key2];
                if (u === state) {
                  err = ERR + cut(key2) + "on" + cut(soul) + "no state.";
                  break;
                }
                if (!valid(val)) {
                  err = ERR + cut(key2) + "on" + cut(soul) + "bad " + typeof val + cut(val);
                  break;
                }
                ham(val, key2, soul, state, msg);
                ++C2;
              }
              if ((kl = kl.slice(i2)).length) {
                turn(pop);
                return;
              }
              ++ni;
              kl = null;
              pop(o);
            })();
          }
          Gun2.on.put = put;
          function ham(val, key2, soul, state, msg) {
            var ctx = msg._ || "", root = ctx.root, graph = root.graph, lot, tmp;
            var vertex = graph[soul] || empty, was = state_is(vertex, key2, 1), known = vertex[key2];
            var DBG = ctx.DBG;
            if (tmp = console.STAT) {
              if (!graph[soul] || !known) {
                tmp.has = (tmp.has || 0) + 1;
              }
            }
            var now = State(), u2;
            if (state > now) {
              setTimeout(function() {
                ham(val, key2, soul, state, msg);
              }, (tmp = state - now) > MD ? MD : tmp);
              console.STAT && console.STAT((DBG || ctx).Hf = +new Date(), tmp, "future");
              return;
            }
            if (state < was) {
              if (!ctx.miss) {
                return;
              }
            }
            if (!ctx.faith) {
              if (state === was && (val === known || L(val) <= L(known))) {
                if (!ctx.miss) {
                  return;
                }
              }
            }
            ctx.stun++;
            var aid = msg["#"] + ctx.all++, id = { toString: function() {
              return aid;
            }, _: ctx };
            id.toJSON = id.toString;
            DBG && (DBG.ph = DBG.ph || +new Date());
            root.on("put", { "#": id, "@": msg["@"], put: { "#": soul, ".": key2, ":": val, ">": state }, _: ctx });
          }
          function map(msg) {
            var DBG;
            if (DBG = (msg._ || "").DBG) {
              DBG.pa = +new Date();
              DBG.pm = DBG.pm || +new Date();
            }
            var eve = this, root = eve.as, graph = root.graph, ctx = msg._, put2 = msg.put, soul = put2["#"], key2 = put2["."], val = put2[":"], state = put2[">"], id = msg["#"], tmp;
            if ((tmp = ctx.msg) && (tmp = tmp.put) && (tmp = tmp[soul])) {
              state_ify(tmp, key2, state, val, soul);
            }
            graph[soul] = state_ify(graph[soul], key2, state, val, soul);
            if (tmp = (root.next || "")[soul]) {
              tmp.on("in", msg);
            }
            fire(ctx);
            eve.to.next(msg);
          }
          function fire(ctx, msg) {
            var root;
            if (ctx.stop) {
              return;
            }
            if (!ctx.err && 0 < --ctx.stun) {
              return;
            }
            ctx.stop = 1;
            if (!(root = ctx.root)) {
              return;
            }
            var tmp = ctx.match;
            tmp.end = 1;
            if (tmp === root.hatch) {
              if (!(tmp = ctx.latch) || tmp.end) {
                delete root.hatch;
              } else {
                root.hatch = tmp;
              }
            }
            ctx.hatch && ctx.hatch();
            setTimeout.each(ctx.match, function(cb) {
              cb && cb();
            });
            if (!(msg = ctx.msg) || ctx.err || msg.err) {
              return;
            }
            msg.out = universe;
            ctx.root.on("out", msg);
            CF();
          }
          function ack(msg) {
            var id = msg["@"] || "", ctx;
            if (!(ctx = id._)) {
              return;
            }
            ctx.acks = (ctx.acks || 0) + 1;
            if (ctx.err = msg.err) {
              msg["@"] = ctx["#"];
              fire(ctx);
            }
            if (!ctx.stop && !ctx.crack) {
              ctx.crack = ctx.match && ctx.match.push(function() {
                back(ctx);
              });
            }
            back(ctx);
          }
          function back(ctx) {
            if (!ctx || !ctx.root) {
              return;
            }
            if (ctx.stun || ctx.acks !== ctx.all) {
              return;
            }
            ctx.root.on("in", { "@": ctx["#"], err: ctx.err, ok: ctx.err ? u : { "": 1 } });
          }
          var ERR = "Error: Invalid graph!";
          var cut = function(s3) {
            return " '" + ("" + s3).slice(0, 9) + "...' ";
          };
          var L = JSON.stringify, MD = 2147483647, State = Gun2.state;
          var C2 = 0, CT, CF = function() {
            if (C2 > 999 && C2 / -(CT - (CT = +new Date())) > 1) {
              Gun2.window && console.log("Warning: You're syncing 1K+ records a second, faster than DOM can update - consider limiting query.");
              CF = function() {
                C2 = 0;
              };
            }
          };
        })();
        ;
        (function() {
          Gun2.on.get = function(msg, gun) {
            var root = gun._, get = msg.get, soul = get["#"], node = root.graph[soul], has = get["."];
            var next = root.next || (root.next = {}), at = next[soul];
            var ctx = msg._ || {}, DBG = ctx.DBG = msg.DBG;
            DBG && (DBG.g = +new Date());
            if (!node) {
              return root.on("get", msg);
            }
            if (has) {
              if (typeof has != "string" || u === node[has]) {
                return root.on("get", msg);
              }
              node = state_ify({}, has, state_is(node, has), node[has], soul);
            }
            node && ack(msg, node);
            root.on("get", msg);
          };
          function ack(msg, node) {
            var S2 = +new Date(), ctx = msg._ || {}, DBG = ctx.DBG = msg.DBG;
            var to = msg["#"], id = text_rand(9), keys = Object.keys(node || "").sort(), soul = ((node || "")._ || "")["#"], kl = keys.length, j = 0, root = msg.$._.root, F2 = node === root.graph[soul];
            console.STAT && console.STAT(S2, ((DBG || ctx).gk = +new Date()) - S2, "got keys");
            node && function go() {
              S2 = +new Date();
              var i2 = 0, k, put = {}, tmp;
              while (i2 < 9 && (k = keys[i2++])) {
                state_ify(put, k, state_is(node, k), node[k], soul);
              }
              keys = keys.slice(i2);
              (tmp = {})[soul] = put;
              put = tmp;
              var faith;
              if (F2) {
                faith = function() {
                };
                faith.ram = faith.faith = true;
              }
              tmp = keys.length;
              console.STAT && console.STAT(S2, -(S2 - (S2 = +new Date())), "got copied some");
              DBG && (DBG.ga = +new Date());
              root.on("in", { "@": to, "#": id, put, "%": tmp ? id = text_rand(9) : u, $: root.$, _: faith, DBG });
              console.STAT && console.STAT(S2, +new Date() - S2, "got in");
              if (!tmp) {
                return;
              }
              setTimeout.turn(go);
            }();
            if (!node) {
              root.on("in", { "@": msg["#"] });
            }
          }
          Gun2.on.get.ack = ack;
        })();
        ;
        (function() {
          Gun2.chain.opt = function(opt) {
            opt = opt || {};
            var gun = this, at = gun._, tmp = opt.peers || opt;
            if (!Object.plain(opt)) {
              opt = {};
            }
            if (!Object.plain(at.opt)) {
              at.opt = opt;
            }
            if (typeof tmp == "string") {
              tmp = [tmp];
            }
            if (!Object.plain(at.opt.peers)) {
              at.opt.peers = {};
            }
            if (tmp instanceof Array) {
              opt.peers = {};
              tmp.forEach(function(url) {
                var p = {};
                p.id = p.url = url;
                opt.peers[url] = at.opt.peers[url] = at.opt.peers[url] || p;
              });
            }
            obj_each(opt, function each2(k) {
              var v = this[k];
              if (this && this.hasOwnProperty(k) || typeof v == "string" || Object.empty(v)) {
                this[k] = v;
                return;
              }
              if (v && v.constructor !== Object && !(v instanceof Array)) {
                return;
              }
              obj_each(v, each2);
            });
            at.opt.from = opt;
            Gun2.on("opt", at);
            at.opt.uuid = at.opt.uuid || function uuid(l) {
              return Gun2.state().toString(36).replace(".", "") + String.random(l || 12);
            };
            return gun;
          };
        })();
        var obj_each = function(o, f3) {
          Object.keys(o).forEach(f3, o);
        }, text_rand = String.random, turn = setTimeout.turn, valid = Gun2.valid, state_is = Gun2.state.is, state_ify = Gun2.state.ify, u, empty = {}, C;
        Gun2.log = function() {
          return !Gun2.log.off && C.log.apply(C, arguments), [].slice.call(arguments).join(" ");
        };
        Gun2.log.once = function(w, s3, o) {
          return (o = Gun2.log.once)[w] = o[w] || 0, o[w]++ || Gun2.log(s3);
        };
        if (typeof window !== "undefined") {
          (window.GUN = window.Gun = Gun2).window = window;
        }
        try {
          if (typeof MODULE !== "undefined") {
            MODULE.exports = Gun2;
          }
        } catch (e2) {
        }
        module2.exports = Gun2;
        (Gun2.window || {}).console = (Gun2.window || {}).console || { log: function() {
        } };
        (C = console).only = function(i2, s3) {
          return C.only.i && i2 === C.only.i && C.only.i++ && (C.log.apply(C, arguments) || s3);
        };
        ;
        "Please do not remove welcome log unless you are paying for a monthly sponsorship, thanks!";
        Gun2.log.once("welcome", "Hello wonderful person! :) Thanks for using GUN, please ask for help on http://chat.gun.eco if anything takes you longer than 5min to figure out!");
      })(USE, "./root");
      ;
      USE(function(module2) {
        var Gun2 = USE("./root");
        Gun2.chain.back = function(n, opt) {
          var tmp;
          n = n || 1;
          if (n === -1 || n === Infinity) {
            return this._.root.$;
          } else if (n === 1) {
            return (this._.back || this._).$;
          }
          var gun = this, at = gun._;
          if (typeof n === "string") {
            n = n.split(".");
          }
          if (n instanceof Array) {
            var i2 = 0, l = n.length, tmp = at;
            for (i2; i2 < l; i2++) {
              tmp = (tmp || empty)[n[i2]];
            }
            if (u !== tmp) {
              return opt ? gun : tmp;
            } else if (tmp = at.back) {
              return tmp.$.back(n, opt);
            }
            return;
          }
          if (typeof n == "function") {
            var yes, tmp = { back: at };
            while ((tmp = tmp.back) && u === (yes = n(tmp, opt))) {
            }
            return yes;
          }
          if (typeof n == "number") {
            return (at.back || at).$.back(n - 1);
          }
          return this;
        };
        var empty = {}, u;
      })(USE, "./back");
      ;
      USE(function(module2) {
        var Gun2 = USE("./root");
        Gun2.chain.chain = function(sub) {
          var gun = this, at = gun._, chain = new (sub || gun).constructor(gun), cat = chain._, root;
          cat.root = root = at.root;
          cat.id = ++root.once;
          cat.back = gun._;
          cat.on = Gun2.on;
          cat.on("in", Gun2.on.in, cat);
          cat.on("out", Gun2.on.out, cat);
          return chain;
        };
        function output(msg) {
          var put, get, at = this.as, back = at.back, root = at.root, tmp;
          if (!msg.$) {
            msg.$ = at.$;
          }
          this.to.next(msg);
          if (at.err) {
            at.on("in", { put: at.put = u, $: at.$ });
            return;
          }
          if (get = msg.get) {
            if (root.pass) {
              root.pass[at.id] = at;
            }
            if (at.lex) {
              Object.keys(at.lex).forEach(function(k) {
                tmp[k] = at.lex[k];
              }, tmp = msg.get = msg.get || {});
            }
            if (get["#"] || at.soul) {
              get["#"] = get["#"] || at.soul;
              msg["#"] || (msg["#"] = text_rand(9));
              back = root.$.get(get["#"])._;
              if (!(get = get["."])) {
                tmp = back.ask && back.ask[""];
                (back.ask || (back.ask = {}))[""] = back;
                if (u !== back.put) {
                  back.on("in", back);
                  if (tmp) {
                    return;
                  }
                }
                msg.$ = back.$;
              } else if (obj_has(back.put, get)) {
                tmp = back.ask && back.ask[get];
                (back.ask || (back.ask = {}))[get] = back.$.get(get)._;
                back.on("in", { get, put: { "#": back.soul, ".": get, ":": back.put[get], ">": state_is(root.graph[back.soul], get) } });
                if (tmp) {
                  return;
                }
              }
              root.ask(ack, msg);
              return root.on("in", msg);
            }
            if (get["."]) {
              if (at.get) {
                msg = { get: { ".": at.get }, $: at.$ };
                (back.ask || (back.ask = {}))[at.get] = msg.$._;
                return back.on("out", msg);
              }
              msg = { get: at.lex ? msg.get : {}, $: at.$ };
              return back.on("out", msg);
            }
            (at.ask || (at.ask = {}))[""] = at;
            if (at.get) {
              get["."] = at.get;
              (back.ask || (back.ask = {}))[at.get] = msg.$._;
              return back.on("out", msg);
            }
          }
          return back.on("out", msg);
        }
        ;
        Gun2.on.out = output;
        function input(msg, cat) {
          cat = cat || this.as;
          var root = cat.root, gun = msg.$ || (msg.$ = cat.$), at = (gun || "")._ || empty, tmp = msg.put || "", soul = tmp["#"], key2 = tmp["."], change = u !== tmp["="] ? tmp["="] : tmp[":"], state2 = tmp[">"] || -Infinity, sat;
          if (u !== msg.put && (u === tmp["#"] || u === tmp["."] || u === tmp[":"] && u === tmp["="] || u === tmp[">"])) {
            if (!valid(tmp)) {
              if (!(soul = ((tmp || "")._ || "")["#"])) {
                console.log("chain not yet supported for", tmp, "...", msg, cat);
                return;
              }
              gun = cat.root.$.get(soul);
              return setTimeout.each(Object.keys(tmp).sort(), function(k) {
                if (k == "_" || u === (state2 = state_is(tmp, k))) {
                  return;
                }
                cat.on("in", { $: gun, put: { "#": soul, ".": k, "=": tmp[k], ">": state2 }, VIA: msg });
              });
            }
            cat.on("in", { $: at.back.$, put: { "#": soul = at.back.soul, ".": key2 = at.has || at.get, "=": tmp, ">": state_is(at.back.put, key2) }, via: msg });
            return;
          }
          if ((msg.seen || "")[cat.id]) {
            return;
          }
          (msg.seen || (msg.seen = function() {
          }))[cat.id] = cat;
          if (cat !== at) {
            Object.keys(msg).forEach(function(k) {
              tmp[k] = msg[k];
            }, tmp = {});
            tmp.get = cat.get || tmp.get;
            if (!cat.soul && !cat.has) {
              tmp.$$$ = tmp.$$$ || cat.$;
            } else if (at.soul) {
              tmp.$ = cat.$;
              tmp.$$ = tmp.$$ || at.$;
            }
            msg = tmp;
          }
          unlink(msg, cat);
          if ((cat.soul || msg.$$) && state2 >= state_is(root.graph[soul], key2)) {
            (tmp = root.$.get(soul)._).put = state_ify(tmp.put, key2, state2, change, soul);
          }
          if (!at.soul && state2 >= state_is(root.graph[soul], key2) && (sat = (root.$.get(soul)._.next || "")[key2])) {
            sat.put = change;
            if (typeof (tmp = valid(change)) == "string") {
              sat.put = root.$.get(tmp)._.put || change;
            }
          }
          this.to && this.to.next(msg);
          cat.any && setTimeout.each(Object.keys(cat.any), function(any) {
            (any = cat.any[any]) && any(msg);
          }, 0, 99);
          cat.echo && setTimeout.each(Object.keys(cat.echo), function(lat) {
            (lat = cat.echo[lat]) && lat.on("in", msg);
          }, 0, 99);
          if (((msg.$$ || "")._ || at).soul) {
            if ((sat = cat.next) && (sat = sat[key2])) {
              tmp = {};
              Object.keys(msg).forEach(function(k) {
                tmp[k] = msg[k];
              });
              tmp.$ = (msg.$$ || msg.$).get(tmp.get = key2);
              delete tmp.$$;
              delete tmp.$$$;
              sat.on("in", tmp);
            }
          }
          link(msg, cat);
        }
        ;
        Gun2.on.in = input;
        function link(msg, cat) {
          cat = cat || this.as || msg.$._;
          if (msg.$$ && this !== Gun2.on) {
            return;
          }
          if (!msg.put || cat.soul) {
            return;
          }
          var put = msg.put || "", link2 = put["="] || put[":"], tmp;
          var root = cat.root, tat = root.$.get(put["#"]).get(put["."])._;
          if (typeof (link2 = valid(link2)) != "string") {
            if (this === Gun2.on) {
              (tat.echo || (tat.echo = {}))[cat.id] = cat;
            }
            return;
          }
          if ((tat.echo || (tat.echo = {}))[cat.id] && !(root.pass || "")[cat.id]) {
            return;
          }
          if (tmp = root.pass) {
            if (tmp[link2 + cat.id]) {
              return;
            }
            tmp[link2 + cat.id] = 1;
          }
          (tat.echo || (tat.echo = {}))[cat.id] = cat;
          if (cat.has) {
            cat.link = link2;
          }
          var sat = root.$.get(tat.link = link2)._;
          (sat.echo || (sat.echo = {}))[tat.id] = tat;
          var tmp = cat.ask || "";
          if (tmp[""] || cat.lex) {
            sat.on("out", { get: { "#": link2 } });
          }
          setTimeout.each(Object.keys(tmp), function(get, sat2) {
            if (!get || !(sat2 = tmp[get])) {
              return;
            }
            sat2.on("out", { get: { "#": link2, ".": get } });
          }, 0, 99);
        }
        ;
        Gun2.on.link = link;
        function unlink(msg, cat) {
          var put = msg.put || "", change = u !== put["="] ? put["="] : put[":"], root = cat.root, link2, tmp;
          if (u === change) {
            if (cat.soul && u !== cat.put) {
              return;
            }
            tmp = (msg.$$ || msg.$ || "")._ || "";
            if (msg["@"] && (u !== tmp.put || u !== cat.put)) {
              return;
            }
            if (link2 = cat.link || msg.linked) {
              delete (root.$.get(link2)._.echo || "")[cat.id];
            }
            if (cat.has) {
              cat.link = null;
            }
            cat.put = u;
            setTimeout.each(Object.keys(cat.next || ""), function(get, sat) {
              if (!(sat = cat.next[get])) {
                return;
              }
              if (link2) {
                delete (root.$.get(link2).get(get)._.echo || "")[sat.id];
              }
              sat.on("in", { get, put: u, $: sat.$ });
            }, 0, 99);
            return;
          }
          if (cat.soul) {
            return;
          }
          if (msg.$$) {
            return;
          }
          link2 = valid(change);
          tmp = msg.$._ || "";
          if (link2 === tmp.link || cat.has && !tmp.link) {
            if ((root.pass || "")[cat.id] && typeof link2 !== "string") {
            } else {
              return;
            }
          }
          delete (tmp.echo || "")[cat.id];
          unlink({ get: cat.get, put: u, $: msg.$, linked: msg.linked = msg.linked || tmp.link }, cat);
        }
        ;
        Gun2.on.unlink = unlink;
        function ack(msg, ev) {
          var as = this.as, at = as.$._, root = at.root, get = as.get || "", tmp = (msg.put || "")[get["#"]] || "";
          if (!msg.put || typeof get["."] == "string" && u === tmp[get["."]]) {
            if (u !== at.put) {
              return;
            }
            if (!at.soul && !at.has) {
              return;
            }
            at.ack = (at.ack || 0) + 1;
            at.on("in", {
              get: at.get,
              put: at.put = u,
              $: at.$,
              "@": msg["@"]
            });
            return;
          }
          (msg._ || {}).miss = 1;
          Gun2.on.put(msg);
          return;
        }
        var empty = {}, u, text_rand = String.random, valid = Gun2.valid, obj_has = function(o, k) {
          return o && Object.prototype.hasOwnProperty.call(o, k);
        }, state = Gun2.state, state_is = state.is, state_ify = state.ify;
      })(USE, "./chain");
      ;
      USE(function(module2) {
        var Gun2 = USE("./root");
        Gun2.chain.get = function(key2, cb, as) {
          var gun, tmp;
          if (typeof key2 === "string") {
            if (key2.length == 0) {
              (gun = this.chain())._.err = { err: Gun2.log("0 length key!", key2) };
              if (cb) {
                cb.call(gun, gun._.err);
              }
              return gun;
            }
            var back = this, cat = back._;
            var next = cat.next || empty;
            if (!(gun = next[key2])) {
              gun = key2 && cache(key2, back);
            }
            gun = gun && gun.$;
          } else if (typeof key2 == "function") {
            let any2 = function(msg, eve, f3) {
              if (any2.stun) {
                return;
              }
              if ((tmp2 = root.pass) && !tmp2[id]) {
                return;
              }
              var at = msg.$._, sat = (msg.$$ || "")._, data = (sat || at).put, odd = !at.has && !at.soul, test = {}, link, tmp2;
              if (odd || u === data) {
                data = u === ((tmp2 = msg.put) || "")["="] ? u === (tmp2 || "")[":"] ? tmp2 : tmp2[":"] : tmp2["="];
              }
              if (link = typeof (tmp2 = Gun2.valid(data)) == "string") {
                data = u === (tmp2 = root.$.get(tmp2)._.put) ? opt.not ? u : data : tmp2;
              }
              if (opt.not && u === data) {
                return;
              }
              if (u === opt.stun) {
                if ((tmp2 = root.stun) && tmp2.on) {
                  cat.$.back(function(a) {
                    tmp2.on("" + a.id, test = {});
                    if ((test.run || 0) < any2.id) {
                      return test;
                    }
                  });
                  !test.run && tmp2.on("" + at.id, test = {});
                  !test.run && sat && tmp2.on("" + sat.id, test = {});
                  if (any2.id > test.run) {
                    if (!test.stun || test.stun.end) {
                      test.stun = tmp2.on("stun");
                      test.stun = test.stun && test.stun.last;
                    }
                    if (test.stun && !test.stun.end) {
                      (test.stun.add || (test.stun.add = {}))[id] = function() {
                        any2(msg, eve, 1);
                      };
                      return;
                    }
                  }
                }
                if (u === data) {
                  f3 = 0;
                }
                if ((tmp2 = root.hatch) && !tmp2.end && u === opt.hatch && !f3) {
                  if (wait[at.$._.id]) {
                    return;
                  }
                  wait[at.$._.id] = 1;
                  tmp2.push(function() {
                    any2(msg, eve, 1);
                  });
                  return;
                }
                ;
                wait = {};
              }
              if (root.pass) {
                if (root.pass[id + at.id]) {
                  return;
                }
                root.pass[id + at.id] = 1;
              }
              if (opt.on) {
                opt.ok.call(at.$, data, at.get, msg, eve || any2);
                return;
              }
              if (opt.v2020) {
                opt.ok(msg, eve || any2);
                return;
              }
              Object.keys(msg).forEach(function(k) {
                tmp2[k] = msg[k];
              }, tmp2 = {});
              msg = tmp2;
              msg.put = data;
              opt.ok.call(opt.as, msg, eve || any2);
            };
            var any = any2;
            if (cb === true) {
              return soul(this, key2, cb, as), this;
            }
            gun = this;
            var cat = gun._, opt = cb || {}, root = cat.root, id;
            opt.at = cat;
            opt.ok = key2;
            var wait = {};
            ;
            any2.at = cat;
            (cat.any || (cat.any = {}))[id = String.random(7)] = any2;
            any2.off = function() {
              any2.stun = 1;
              if (!cat.any) {
                return;
              }
              delete cat.any[id];
            };
            any2.rid = rid;
            any2.id = opt.run || ++root.once;
            tmp = root.pass;
            (root.pass = {})[id] = 1;
            opt.out = opt.out || { get: {} };
            cat.on("out", opt.out);
            root.pass = tmp;
            return gun;
          } else if (typeof key2 == "number") {
            return this.get("" + key2, cb, as);
          } else if (typeof (tmp = valid(key2)) == "string") {
            return this.get(tmp, cb, as);
          } else if (tmp = this.get.next) {
            gun = tmp(this, key2);
          }
          if (!gun) {
            (gun = this.chain())._.err = { err: Gun2.log("Invalid get request!", key2) };
            if (cb) {
              cb.call(gun, gun._.err);
            }
            return gun;
          }
          if (cb && typeof cb == "function") {
            gun.get(cb, as);
          }
          return gun;
        };
        function cache(key2, back) {
          var cat = back._, next = cat.next, gun = back.chain(), at = gun._;
          if (!next) {
            next = cat.next = {};
          }
          next[at.get = key2] = at;
          if (back === cat.root.$) {
            at.soul = key2;
          } else if (cat.soul || cat.has) {
            at.has = key2;
          }
          return at;
        }
        function soul(gun, cb, opt, as) {
          var cat = gun._, acks = 0, tmp;
          if (tmp = cat.soul || cat.link) {
            return cb(tmp, as, cat);
          }
          if (cat.jam) {
            return cat.jam.push([cb, as]);
          }
          cat.jam = [[cb, as]];
          gun.get(function go(msg, eve) {
            if (u === msg.put && !cat.root.opt.super && (tmp = Object.keys(cat.root.opt.peers).length) && ++acks <= tmp) {
              return;
            }
            eve.rid(msg);
            var at = (at = msg.$) && at._ || {}, i2 = 0, as2;
            tmp = cat.jam;
            delete cat.jam;
            while (as2 = tmp[i2++]) {
              var cb2 = as2[0], id;
              as2 = as2[1];
              cb2 && cb2(id = at.link || at.soul || Gun2.valid(msg.put) || ((msg.put || {})._ || {})["#"], as2, msg, eve);
            }
          }, { out: { get: { ".": true } } });
          return gun;
        }
        function rid(at) {
          var cat = this.at || this.on;
          if (!at || cat.soul || cat.has) {
            return this.off();
          }
          if (!(at = (at = (at = at.$ || at)._ || at).id)) {
            return;
          }
          var map = cat.map, tmp, seen;
          if (tmp = (seen = this.seen || (this.seen = {}))[at]) {
            return true;
          }
          seen[at] = true;
          return;
          return;
        }
        var empty = {}, valid = Gun2.valid, u;
      })(USE, "./get");
      ;
      USE(function(module2) {
        var Gun2 = USE("./root");
        Gun2.chain.put = function(data, cb, as) {
          var gun = this, at = gun._, root = at.root;
          as = as || {};
          as.root = at.root;
          as.run || (as.run = root.once);
          stun(as, at.id);
          as.ack = as.ack || cb;
          as.via = as.via || gun;
          as.data = as.data || data;
          as.soul || (as.soul = at.soul || typeof cb == "string" && cb);
          var s3 = as.state = as.state || Gun2.state();
          if (typeof data == "function") {
            data(function(d) {
              as.data = d;
              gun.put(u, u, as);
            });
            return gun;
          }
          if (!as.soul) {
            return get(as), gun;
          }
          as.$ = root.$.get(as.soul);
          as.todo = [{ it: as.data, ref: as.$ }];
          as.turn = as.turn || turn;
          as.ran = as.ran || ran;
          (function walk() {
            var to = as.todo, at2 = to.pop(), d = at2.it, cid = at2.ref && at2.ref._.id, v, k, cat, tmp, g;
            stun(as, at2.ref);
            if (tmp = at2.todo) {
              k = tmp.pop();
              d = d[k];
              if (tmp.length) {
                to.push(at2);
              }
            }
            k && (to.path || (to.path = [])).push(k);
            if (!(v = valid(d)) && !(g = Gun2.is(d))) {
              if (!Object.plain(d)) {
                ran.err(as, "Invalid data: " + check(d) + " at " + (as.via.back(function(at3) {
                  at3.get && tmp.push(at3.get);
                }, tmp = []) || tmp.join(".")) + "." + (to.path || []).join("."));
                return;
              }
              var seen = as.seen || (as.seen = []), i2 = seen.length;
              while (i2--) {
                if (d === (tmp = seen[i2]).it) {
                  v = d = tmp.link;
                  break;
                }
              }
            }
            if (k && v) {
              at2.node = state_ify(at2.node, k, s3, d);
            } else {
              let resolve3 = function(msg, eve) {
                var end = cat.link["#"];
                if (eve) {
                  eve.off();
                  eve.rid(msg);
                }
                var soul = end || msg.soul || (tmp = (msg.$$ || msg.$)._ || "").soul || tmp.link || ((tmp = tmp.put || "")._ || "")["#"] || tmp["#"] || ((tmp = msg.put || "") && msg.$$ ? tmp["#"] : (tmp["="] || tmp[":"] || "")["#"]);
                !end && stun(as, msg.$);
                if (!soul && !at2.link["#"]) {
                  (at2.wait || (at2.wait = [])).push(function() {
                    resolve3(msg, eve);
                  });
                  return;
                }
                if (!soul) {
                  soul = [];
                  (msg.$$ || msg.$).back(function(at3) {
                    if (tmp = at3.soul || at3.link) {
                      return soul.push(tmp);
                    }
                    soul.push(at3.get);
                  });
                  soul = soul.reverse().join("/");
                }
                cat.link["#"] = soul;
                !g && (((as.graph || (as.graph = {}))[soul] = cat.node || (cat.node = { _: {} }))._["#"] = soul);
                delete as.wait[id];
                cat.wait && setTimeout.each(cat.wait, function(cb2) {
                  cb2 && cb2();
                });
                as.ran(as);
              };
              var resolve2 = resolve3;
              if (!as.seen) {
                ran.err(as, "Data at root of graph must be a node (an object).");
                return;
              }
              as.seen.push(cat = { it: d, link: {}, todo: g ? [] : Object.keys(d).sort().reverse(), path: (to.path || []).slice(), up: at2 });
              at2.node = state_ify(at2.node, k, s3, cat.link);
              !g && cat.todo.length && to.push(cat);
              var id = as.seen.length;
              (as.wait || (as.wait = {}))[id] = "";
              tmp = (cat.ref = g ? d : k ? at2.ref.get(k) : at2.ref)._;
              (tmp = d && (d._ || "")["#"] || tmp.soul || tmp.link) ? resolve3({ soul: tmp }) : cat.ref.get(resolve3, { run: as.run, v2020: 1, out: { get: { ".": " " } } });
              ;
            }
            if (!to.length) {
              return as.ran(as);
            }
            as.turn(walk);
          })();
          return gun;
        };
        function stun(as, id) {
          if (!id) {
            return;
          }
          id = (id._ || "").id || id;
          var run2 = as.root.stun || (as.root.stun = { on: Gun2.on }), test = {}, tmp;
          as.stun || (as.stun = run2.on("stun", function() {
          }));
          if (tmp = run2.on("" + id)) {
            tmp.the.last.next(test);
          }
          if (test.run >= as.run) {
            return;
          }
          run2.on("" + id, function(test2) {
            if (as.stun.end) {
              this.off();
              this.to.next(test2);
              return;
            }
            test2.run = test2.run || as.run;
            test2.stun = test2.stun || as.stun;
            return;
            if (this.to.to) {
              this.the.last.next(test2);
              return;
            }
            test2.stun = as.stun;
          });
        }
        function ran(as) {
          if (as.err) {
            ran.end(as.stun, as.root);
            return;
          }
          if (as.todo.length || as.end || !Object.empty(as.wait)) {
            return;
          }
          as.end = 1;
          var cat = as.$.back(-1)._, root = cat.root, ask = cat.ask(function(ack) {
            root.on("ack", ack);
            if (ack.err) {
              Gun2.log(ack);
            }
            if (++acks > (as.acks || 0)) {
              this.off();
            }
            if (!as.ack) {
              return;
            }
            as.ack(ack, this);
          }, as.opt), acks = 0, stun2 = as.stun, tmp;
          (tmp = function() {
            if (!stun2) {
              return;
            }
            ran.end(stun2, root);
            setTimeout.each(Object.keys(stun2 = stun2.add || ""), function(cb) {
              if (cb = stun2[cb]) {
                cb();
              }
            });
          }).hatch = tmp;
          as.via._.on("out", { put: as.out = as.graph, opt: as.opt, "#": ask, _: tmp });
        }
        ;
        ran.end = function(stun2, root) {
          stun2.end = noop3;
          if (stun2.the.to === stun2 && stun2 === stun2.the.last) {
            delete root.stun;
          }
          stun2.off();
        };
        ran.err = function(as, err) {
          (as.ack || noop3).call(as, as.out = { err: as.err = Gun2.log(err) });
          as.ran(as);
        };
        function get(as) {
          var at = as.via._, tmp;
          as.via = as.via.back(function(at2) {
            if (at2.soul || !at2.get) {
              return at2.$;
            }
            tmp = as.data;
            (as.data = {})[at2.get] = tmp;
          });
          if (!as.via || !as.via._.soul) {
            as.via = at.root.$.get(((as.data || "")._ || "")["#"] || at.$.back("opt.uuid")());
          }
          as.via.put(as.data, as.ack, as);
          return;
          if (at.get && at.back.soul) {
            tmp = as.data;
            as.via = at.back.$;
            (as.data = {})[at.get] = tmp;
            as.via.put(as.data, as.ack, as);
            return;
          }
        }
        function check(d, tmp) {
          return d && (tmp = d.constructor) && tmp.name || typeof d;
        }
        var u, empty = {}, noop3 = function() {
        }, turn = setTimeout.turn, valid = Gun2.valid, state_ify = Gun2.state.ify;
        var iife = function(fn, as) {
          fn.call(as || empty);
        };
      })(USE, "./put");
      ;
      USE(function(module2) {
        var Gun2 = USE("./root");
        USE("./chain");
        USE("./back");
        USE("./put");
        USE("./get");
        module2.exports = Gun2;
      })(USE, "./index");
      ;
      USE(function(module2) {
        var Gun2 = USE("./index");
        Gun2.chain.on = function(tag, arg, eas, as) {
          var gun = this, cat = gun._, root = cat.root, act, off, id, tmp;
          if (typeof tag === "string") {
            if (!arg) {
              return cat.on(tag);
            }
            act = cat.on(tag, arg, eas || cat, as);
            if (eas && eas.$) {
              (eas.subs || (eas.subs = [])).push(act);
            }
            return gun;
          }
          var opt = arg;
          (opt = opt === true ? { change: true } : opt || {}).not = 1;
          opt.on = 1;
          var wait = {};
          gun.get(tag, opt);
          return gun;
        };
        Gun2.chain.once = function(cb, opt) {
          opt = opt || {};
          if (!cb) {
            return none(this, opt);
          }
          var gun = this, cat = gun._, root = cat.root, data = cat.put, id = String.random(7), one, tmp;
          gun.get(function(data2, key2, msg, eve) {
            var $ = this, at = $._, one2 = at.one || (at.one = {});
            if (eve.stun) {
              return;
            }
            if (one2[id] === "") {
              return;
            }
            if ((tmp = Gun2.valid(data2)) === true) {
              once();
              return;
            }
            if (typeof tmp == "string") {
              return;
            }
            clearTimeout((cat.one || "")[id]);
            clearTimeout(one2[id]);
            one2[id] = setTimeout(once, opt.wait || 99);
            function once(f3) {
              if (!at.has && !at.soul) {
                at = { put: data2, get: key2 };
              }
              if (u === (tmp = at.put)) {
                tmp = ((msg.$$ || "")._ || "").put;
              }
              if (typeof Gun2.valid(tmp) == "string") {
                tmp = root.$.get(tmp)._.put;
                if (tmp === u && !f3) {
                  one2[id] = setTimeout(function() {
                    once(1);
                  }, opt.wait || 99);
                  return;
                }
              }
              if (eve.stun) {
                return;
              }
              if (one2[id] === "") {
                return;
              }
              one2[id] = "";
              if (cat.soul || cat.has) {
                eve.off();
              }
              cb.call($, tmp, at.get);
              clearTimeout(one2[id]);
            }
            ;
          }, { on: 1 });
          return gun;
        };
        function none(gun, opt, chain) {
          Gun2.log.once("valonce", "Chainable val is experimental, its behavior and API may change moving forward. Please play with it and report bugs and ideas on how to improve it.");
          (chain = gun.chain())._.nix = gun.once(function(data, key2) {
            chain._.on("in", this._);
          });
          chain._.lex = gun._.lex;
          return chain;
        }
        Gun2.chain.off = function() {
          var gun = this, at = gun._, tmp;
          var cat = at.back;
          if (!cat) {
            return;
          }
          at.ack = 0;
          if (tmp = cat.next) {
            if (tmp[at.get]) {
              delete tmp[at.get];
            } else {
            }
          }
          if (tmp = cat.ask) {
            delete tmp[at.get];
          }
          if (tmp = cat.put) {
            delete tmp[at.get];
          }
          if (tmp = at.soul) {
            delete cat.root.graph[tmp];
          }
          if (tmp = at.map) {
            Object.keys(tmp).forEach(function(i2, at2) {
              at2 = tmp[i2];
              if (at2.link) {
                cat.root.$.get(at2.link).off();
              }
            });
          }
          if (tmp = at.next) {
            Object.keys(tmp).forEach(function(i2, neat) {
              neat = tmp[i2];
              neat.$.off();
            });
          }
          at.on("off", {});
          return gun;
        };
        var empty = {}, noop3 = function() {
        }, u;
      })(USE, "./on");
      ;
      USE(function(module2) {
        var Gun2 = USE("./index"), next = Gun2.chain.get.next;
        Gun2.chain.get.next = function(gun, lex) {
          var tmp;
          if (!Object.plain(lex)) {
            return (next || noop3)(gun, lex);
          }
          if (tmp = ((tmp = lex["#"]) || "")["="] || tmp) {
            return gun.get(tmp);
          }
          (tmp = gun.chain()._).lex = lex;
          gun.on("in", function(eve) {
            if (String.match(eve.get || (eve.put || "")["."], lex["."] || lex["#"] || lex)) {
              tmp.on("in", eve);
            }
            this.to.next(eve);
          });
          return tmp.$;
        };
        Gun2.chain.map = function(cb, opt, t2) {
          var gun = this, cat = gun._, lex, chain;
          if (Object.plain(cb)) {
            lex = cb["."] ? cb : { ".": cb };
            cb = u;
          }
          if (!cb) {
            if (chain = cat.each) {
              return chain;
            }
            (cat.each = chain = gun.chain())._.lex = lex || chain._.lex || cat.lex;
            chain._.nix = gun.back("nix");
            gun.on("in", map, chain._);
            return chain;
          }
          Gun2.log.once("mapfn", "Map functions are experimental, their behavior and API may change moving forward. Please play with it and report bugs and ideas on how to improve it.");
          chain = gun.chain();
          gun.map().on(function(data, key2, msg, eve) {
            var next2 = (cb || noop3).call(this, data, key2, msg, eve);
            if (u === next2) {
              return;
            }
            if (data === next2) {
              return chain._.on("in", msg);
            }
            if (Gun2.is(next2)) {
              return chain._.on("in", next2._);
            }
            var tmp = {};
            Object.keys(msg.put).forEach(function(k) {
              tmp[k] = msg.put[k];
            }, tmp);
            tmp["="] = next2;
            chain._.on("in", { get: key2, put: tmp });
          });
          return chain;
        };
        function map(msg) {
          this.to.next(msg);
          var cat = this.as, gun = msg.$, at = gun._, put = msg.put, tmp;
          if (!at.soul && !msg.$$) {
            return;
          }
          if ((tmp = cat.lex) && !String.match(msg.get || (put || "")["."], tmp["."] || tmp["#"] || tmp)) {
            return;
          }
          Gun2.on.link(msg, cat);
        }
        var noop3 = function() {
        }, event = { stun: noop3, off: noop3 }, u;
      })(USE, "./map");
      ;
      USE(function(module2) {
        var Gun2 = USE("./index");
        Gun2.chain.set = function(item, cb, opt) {
          var gun = this, root = gun.back(-1), soul, tmp;
          cb = cb || function() {
          };
          opt = opt || {};
          opt.item = opt.item || item;
          if (soul = ((item || "")._ || "")["#"]) {
            (item = {})["#"] = soul;
          }
          if (typeof (tmp = Gun2.valid(item)) == "string") {
            return gun.get(soul = tmp).put(item, cb, opt);
          }
          if (!Gun2.is(item)) {
            if (Object.plain(item)) {
              item = root.get(soul = gun.back("opt.uuid")()).put(item);
            }
            return gun.get(soul || root.back("opt.uuid")(7)).put(item, cb, opt);
          }
          gun.put(function(go) {
            item.get(function(soul2, o, msg) {
              if (!soul2) {
                return cb.call(gun, { err: Gun2.log('Only a node can be linked! Not "' + msg.put + '"!') });
              }
              (tmp = {})[soul2] = { "#": soul2 };
              go(tmp);
            }, true);
          });
          return item;
        };
      })(USE, "./set");
      ;
      USE(function(module2) {
        USE("./shim");
        var noop3 = function() {
        };
        var parse2 = JSON.parseAsync || function(t2, cb, r2) {
          var u2, d = +new Date();
          try {
            cb(u2, JSON.parse(t2, r2), json.sucks(+new Date() - d));
          } catch (e2) {
            cb(e2);
          }
        };
        var json = JSON.stringifyAsync || function(v, cb, r2, s3) {
          var u2, d = +new Date();
          try {
            cb(u2, JSON.stringify(v, r2, s3), json.sucks(+new Date() - d));
          } catch (e2) {
            cb(e2);
          }
        };
        json.sucks = function(d) {
          if (d > 99) {
            console.log("Warning: JSON blocking CPU detected. Add `gun/lib/yson.js` to fix.");
            json.sucks = noop3;
          }
        };
        function Mesh(root) {
          var mesh = function() {
          };
          var opt = root.opt || {};
          opt.log = opt.log || console.log;
          opt.gap = opt.gap || opt.wait || 0;
          opt.max = opt.max || (opt.memory ? opt.memory * 999 * 999 : 3e8) * 0.3;
          opt.pack = opt.pack || opt.max * 0.01 * 0.01;
          opt.puff = opt.puff || 9;
          var puff = setTimeout.turn || setTimeout;
          var dup = root.dup, dup_check = dup.check, dup_track = dup.track;
          var ST = +new Date(), LT = ST;
          var hear = mesh.hear = function(raw, peer) {
            if (!raw) {
              return;
            }
            if (opt.max <= raw.length) {
              return mesh.say({ dam: "!", err: "Message too big!" }, peer);
            }
            if (mesh === this) {
              hear.d += raw.length || 0;
              ++hear.c;
            }
            var S2 = peer.SH = +new Date();
            var tmp = raw[0], msg;
            if (tmp === "[") {
              parse2(raw, function(err, msg2) {
                if (err || !msg2) {
                  return mesh.say({ dam: "!", err: "DAM JSON parse error." }, peer);
                }
                console.STAT && console.STAT(+new Date(), msg2.length, "# on hear batch");
                var P = opt.puff;
                (function go() {
                  var S3 = +new Date();
                  var i2 = 0, m2;
                  while (i2 < P && (m2 = msg2[i2++])) {
                    mesh.hear(m2, peer);
                  }
                  msg2 = msg2.slice(i2);
                  console.STAT && console.STAT(S3, +new Date() - S3, "hear loop");
                  flush(peer);
                  if (!msg2.length) {
                    return;
                  }
                  puff(go, 0);
                })();
              });
              raw = "";
              return;
            }
            if (tmp === "{" || (raw["#"] || Object.plain(raw)) && (msg = raw)) {
              if (msg) {
                return hear.one(msg, peer, S2);
              }
              parse2(raw, function(err, msg2) {
                if (err || !msg2) {
                  return mesh.say({ dam: "!", err: "DAM JSON parse error." }, peer);
                }
                hear.one(msg2, peer, S2);
              });
              return;
            }
          };
          hear.one = function(msg, peer, S2) {
            var id, hash2, tmp, ash, DBG;
            if (msg.DBG) {
              msg.DBG = DBG = { DBG: msg.DBG };
            }
            DBG && (DBG.h = S2);
            DBG && (DBG.hp = +new Date());
            if (!(id = msg["#"])) {
              id = msg["#"] = String.random(9);
            }
            if (tmp = dup_check(id)) {
              return;
            }
            if (!(hash2 = msg["##"]) && false) {
            }
            if (hash2 && (tmp = msg["@"] || msg.get && id) && dup.check(ash = tmp + hash2)) {
              return;
            }
            (msg._ = function() {
            }).via = mesh.leap = peer;
            if ((tmp = msg["><"]) && typeof tmp == "string") {
              tmp.slice(0, 99).split(",").forEach(function(k) {
                this[k] = 1;
              }, msg._.yo = {});
            }
            if (tmp = msg.dam) {
              if (tmp = mesh.hear[tmp]) {
                tmp(msg, peer, root);
              }
              dup_track(id);
              return;
            }
            var S2 = +new Date();
            DBG && (DBG.is = S2);
            peer.SI = id;
            root.on("in", mesh.last = msg);
            DBG && (DBG.hd = +new Date());
            console.STAT && console.STAT(S2, +new Date() - S2, msg.get ? "msg get" : msg.put ? "msg put" : "msg");
            (tmp = dup_track(id)).via = peer;
            if (msg.get) {
              tmp.it = msg;
            }
            if (ash) {
              dup_track(ash);
            }
            mesh.leap = mesh.last = null;
          };
          var tomap = function(k, i2, m2) {
            m2(k, true);
          };
          hear.c = hear.d = 0;
          ;
          (function() {
            var SMIA = 0;
            var loop;
            mesh.hash = function(msg, peer) {
              var h2, s3, t2;
              var S2 = +new Date();
              json(msg.put, function hash2(err, text) {
                var ss = (s3 || (s3 = t2 = text || "")).slice(0, 32768);
                h2 = String.hash(ss, h2);
                s3 = s3.slice(32768);
                if (s3) {
                  puff(hash2, 0);
                  return;
                }
                console.STAT && console.STAT(S2, +new Date() - S2, "say json+hash");
                msg._.$put = t2;
                msg["##"] = h2;
                mesh.say(msg, peer);
                delete msg._.$put;
              }, sort);
            };
            function sort(k, v) {
              var tmp;
              if (!(v instanceof Object)) {
                return v;
              }
              Object.keys(v).sort().forEach(sorta, { to: tmp = {}, on: v });
              return tmp;
            }
            function sorta(k) {
              this.to[k] = this.on[k];
            }
            var say = mesh.say = function(msg, peer) {
              var tmp;
              if ((tmp = this) && (tmp = tmp.to) && tmp.next) {
                tmp.next(msg);
              }
              if (!msg) {
                return false;
              }
              var id, hash2, raw, ack = msg["@"];
              var meta = msg._ || (msg._ = function() {
              });
              var DBG = msg.DBG, S2 = +new Date();
              meta.y = meta.y || S2;
              if (!peer) {
                DBG && (DBG.y = S2);
              }
              if (!(id = msg["#"])) {
                id = msg["#"] = String.random(9);
              }
              !loop && dup_track(id);
              if (msg.put && (msg.err || (dup.s[id] || "").err)) {
                return false;
              }
              if (!(hash2 = msg["##"]) && u !== msg.put && !meta.via && ack) {
                mesh.hash(msg, peer);
                return;
              }
              if (!peer && ack) {
                peer = (tmp = dup.s[ack]) && (tmp.via || (tmp = tmp.it) && (tmp = tmp._) && tmp.via) || (tmp = mesh.last) && ack === tmp["#"] && mesh.leap;
              }
              if (!peer && ack) {
                if (dup.s[ack]) {
                  return;
                }
                console.STAT && console.STAT(+new Date(), ++SMIA, "total no peer to ack to");
                return false;
              }
              if (!peer && mesh.way) {
                return mesh.way(msg);
              }
              DBG && (DBG.yh = +new Date());
              if (!(raw = meta.raw)) {
                mesh.raw(msg, peer);
                return;
              }
              DBG && (DBG.yr = +new Date());
              if (!peer || !peer.id) {
                if (!Object.plain(peer || opt.peers)) {
                  return false;
                }
                var S2 = +new Date();
                var P = opt.puff, ps = opt.peers, pl = Object.keys(peer || opt.peers || {});
                console.STAT && console.STAT(S2, +new Date() - S2, "peer keys");
                ;
                (function go() {
                  var S3 = +new Date();
                  loop = 1;
                  var wr = meta.raw;
                  meta.raw = raw;
                  var i2 = 0, p;
                  while (i2 < 9 && (p = (pl || "")[i2++])) {
                    if (!(p = ps[p])) {
                      continue;
                    }
                    mesh.say(msg, p);
                  }
                  meta.raw = wr;
                  loop = 0;
                  pl = pl.slice(i2);
                  console.STAT && console.STAT(S3, +new Date() - S3, "say loop");
                  if (!pl.length) {
                    return;
                  }
                  puff(go, 0);
                  ack && dup_track(ack);
                })();
                return;
              }
              if (!peer.wire && mesh.wire) {
                mesh.wire(peer);
              }
              if (id === peer.last) {
                return;
              }
              peer.last = id;
              if (peer === meta.via) {
                return false;
              }
              if ((tmp = meta.yo) && (tmp[peer.url] || tmp[peer.pid] || tmp[peer.id])) {
                return false;
              }
              console.STAT && console.STAT(S2, ((DBG || meta).yp = +new Date()) - (meta.y || S2), "say prep");
              !loop && ack && dup_track(ack);
              if (peer.batch) {
                peer.tail = (tmp = peer.tail || 0) + raw.length;
                if (peer.tail <= opt.pack) {
                  peer.batch += (tmp ? "," : "") + raw;
                  return;
                }
                flush(peer);
              }
              peer.batch = "[";
              var ST2 = +new Date();
              setTimeout(function() {
                console.STAT && console.STAT(ST2, +new Date() - ST2, "0ms TO");
                flush(peer);
              }, opt.gap);
              send(raw, peer);
              console.STAT && ack === peer.SI && console.STAT(S2, +new Date() - peer.SH, "say ack");
            };
            mesh.say.c = mesh.say.d = 0;
            mesh.raw = function(msg, peer) {
              if (!msg) {
                return "";
              }
              var meta = msg._ || {}, put, tmp;
              if (tmp = meta.raw) {
                return tmp;
              }
              if (typeof msg == "string") {
                return msg;
              }
              var hash2 = msg["##"], ack = msg["@"];
              if (hash2 && ack) {
                if (!meta.via && dup_check(ack + hash2)) {
                  return false;
                }
                if ((tmp = (dup.s[ack] || "").it) || (tmp = mesh.last) && ack === tmp["#"]) {
                  if (hash2 === tmp["##"]) {
                    return false;
                  }
                  if (!tmp["##"]) {
                    tmp["##"] = hash2;
                  }
                }
              }
              if (!msg.dam) {
                var i2 = 0, to = [];
                tmp = opt.peers;
                for (var k in tmp) {
                  var p = tmp[k];
                  to.push(p.url || p.pid || p.id);
                  if (++i2 > 6) {
                    break;
                  }
                }
                if (i2 > 1) {
                  msg["><"] = to.join();
                }
              }
              if (put = meta.$put) {
                tmp = {};
                Object.keys(msg).forEach(function(k2) {
                  tmp[k2] = msg[k2];
                });
                tmp.put = ":])([:";
                json(tmp, function(err, raw) {
                  if (err) {
                    return;
                  }
                  var S2 = +new Date();
                  tmp = raw.indexOf('"put":":])([:"');
                  res(u, raw = raw.slice(0, tmp + 6) + put + raw.slice(tmp + 14));
                  console.STAT && console.STAT(S2, +new Date() - S2, "say slice");
                });
                return;
              }
              json(msg, res);
              function res(err, raw) {
                if (err) {
                  return;
                }
                meta.raw = raw;
                mesh.say(msg, peer);
              }
            };
          })();
          function flush(peer) {
            var tmp = peer.batch, t2 = typeof tmp == "string", l;
            if (t2) {
              tmp += "]";
            }
            peer.batch = peer.tail = null;
            if (!tmp) {
              return;
            }
            if (t2 ? 3 > tmp.length : !tmp.length) {
              return;
            }
            if (!t2) {
              try {
                tmp = tmp.length === 1 ? tmp[0] : JSON.stringify(tmp);
              } catch (e2) {
                return opt.log("DAM JSON stringify error", e2);
              }
            }
            if (!tmp) {
              return;
            }
            send(tmp, peer);
          }
          function send(raw, peer) {
            try {
              var wire = peer.wire;
              if (peer.say) {
                peer.say(raw);
              } else if (wire.send) {
                wire.send(raw);
              }
              mesh.say.d += raw.length || 0;
              ++mesh.say.c;
            } catch (e2) {
              (peer.queue = peer.queue || []).push(raw);
            }
          }
          mesh.hi = function(peer) {
            var wire = peer.wire, tmp;
            if (!wire) {
              mesh.wire(peer.length && { url: peer } || peer);
              return;
            }
            if (peer.id) {
              opt.peers[peer.url || peer.id] = peer;
            } else {
              tmp = peer.id = peer.id || String.random(9);
              mesh.say({ dam: "?", pid: root.opt.pid }, opt.peers[tmp] = peer);
              delete dup.s[peer.last];
            }
            peer.met = peer.met || +new Date();
            if (!wire.hied) {
              root.on(wire.hied = "hi", peer);
            }
            tmp = peer.queue;
            peer.queue = [];
            setTimeout.each(tmp || [], function(msg) {
              send(msg, peer);
            }, 0, 9);
          };
          mesh.bye = function(peer) {
            root.on("bye", peer);
            var tmp = +new Date();
            tmp = tmp - (peer.met || tmp);
            mesh.bye.time = ((mesh.bye.time || tmp) + tmp) / 2;
          };
          mesh.hear["!"] = function(msg, peer) {
            opt.log("Error:", msg.err);
          };
          mesh.hear["?"] = function(msg, peer) {
            if (msg.pid) {
              if (!peer.pid) {
                peer.pid = msg.pid;
              }
              if (msg["@"]) {
                return;
              }
            }
            mesh.say({ dam: "?", pid: opt.pid, "@": msg["#"] }, peer);
            delete dup.s[peer.last];
          };
          root.on("create", function(root2) {
            root2.opt.pid = root2.opt.pid || String.random(9);
            this.to.next(root2);
            root2.on("out", mesh.say);
          });
          root.on("bye", function(peer, tmp) {
            peer = opt.peers[peer.id || peer] || peer;
            this.to.next(peer);
            peer.bye ? peer.bye() : (tmp = peer.wire) && tmp.close && tmp.close();
            delete opt.peers[peer.id];
            peer.wire = null;
          });
          var gets = {};
          root.on("bye", function(peer, tmp) {
            this.to.next(peer);
            if (tmp = console.STAT) {
              tmp.peers = (tmp.peers || 0) - 1;
            }
            if (!(tmp = peer.url)) {
              return;
            }
            gets[tmp] = true;
            setTimeout(function() {
              delete gets[tmp];
            }, opt.lack || 9e3);
          });
          root.on("hi", function(peer, tmp) {
            this.to.next(peer);
            if (tmp = console.STAT) {
              tmp.peers = (tmp.peers || 0) + 1;
            }
            if (!(tmp = peer.url) || !gets[tmp]) {
              return;
            }
            delete gets[tmp];
            if (opt.super) {
              return;
            }
            setTimeout.each(Object.keys(root.next), function(soul) {
              var node = root.next[soul];
              tmp = {};
              tmp[soul] = root.graph[soul];
              tmp = String.hash(tmp);
              mesh.say({ "##": tmp, get: { "#": soul } }, peer);
            });
          });
          return mesh;
        }
        var empty = {}, ok = true, u;
        try {
          module2.exports = Mesh;
        } catch (e2) {
        }
      })(USE, "./mesh");
      ;
      USE(function(module2) {
        var Gun2 = USE("../index");
        Gun2.Mesh = USE("./mesh");
        Gun2.on("opt", function(root) {
          this.to.next(root);
          if (root.once) {
            return;
          }
          var opt = root.opt;
          if (opt.WebSocket === false) {
            return;
          }
          var env = Gun2.window || {};
          var websocket = opt.WebSocket || env.WebSocket || env.webkitWebSocket || env.mozWebSocket;
          if (!websocket) {
            return;
          }
          opt.WebSocket = websocket;
          var mesh = opt.mesh = opt.mesh || Gun2.Mesh(root);
          var wire = mesh.wire || opt.wire;
          mesh.wire = opt.wire = open;
          function open(peer) {
            try {
              if (!peer || !peer.url) {
                return wire2 && wire2(peer);
              }
              var url = peer.url.replace(/^http/, "ws");
              var wire2 = peer.wire = new opt.WebSocket(url);
              wire2.onclose = function() {
                opt.mesh.bye(peer);
                reconnect(peer);
              };
              wire2.onerror = function(error2) {
                reconnect(peer);
              };
              wire2.onopen = function() {
                opt.mesh.hi(peer);
              };
              wire2.onmessage = function(msg) {
                if (!msg) {
                  return;
                }
                opt.mesh.hear(msg.data || msg, peer);
              };
              return wire2;
            } catch (e2) {
            }
          }
          setTimeout(function() {
            !opt.super && root.on("out", { dam: "hi" });
          }, 1);
          var wait = 2 * 999;
          function reconnect(peer) {
            clearTimeout(peer.defer);
            if (!opt.peers[peer.url]) {
              return;
            }
            if (doc && peer.retry <= 0) {
              return;
            }
            peer.retry = (peer.retry || opt.retry + 1 || 60) - (-peer.tried + (peer.tried = +new Date()) < wait * 4 ? 1 : 0);
            peer.defer = setTimeout(function to() {
              if (doc && doc.hidden) {
                return setTimeout(to, wait);
              }
              open(peer);
            }, wait);
          }
          var doc = "" + u !== typeof document && document;
        });
        var noop3 = function() {
        }, u;
      })(USE, "./websocket");
      ;
      USE(function(module2) {
        if (typeof Gun === "undefined") {
          return;
        }
        var noop3 = function() {
        }, store, u;
        try {
          store = (Gun.window || noop3).localStorage;
        } catch (e2) {
        }
        if (!store) {
          Gun.log("Warning: No localStorage exists to persist data to!");
          store = { setItem: function(k, v) {
            this[k] = v;
          }, removeItem: function(k) {
            delete this[k];
          }, getItem: function(k) {
            return this[k];
          } };
        }
        var parse2 = JSON.parseAsync || function(t2, cb, r2) {
          var u2;
          try {
            cb(u2, JSON.parse(t2, r2));
          } catch (e2) {
            cb(e2);
          }
        };
        var json = JSON.stringifyAsync || function(v, cb, r2, s3) {
          var u2;
          try {
            cb(u2, JSON.stringify(v, r2, s3));
          } catch (e2) {
            cb(e2);
          }
        };
        Gun.on("create", function lg(root) {
          this.to.next(root);
          var opt = root.opt, graph = root.graph, acks = [], disk, to, size, stop;
          if (opt.localStorage === false) {
            return;
          }
          opt.prefix = opt.file || "gun/";
          try {
            disk = lg[opt.prefix] = lg[opt.prefix] || JSON.parse(size = store.getItem(opt.prefix)) || {};
          } catch (e2) {
            disk = lg[opt.prefix] = {};
          }
          size = (size || "").length;
          root.on("get", function(msg) {
            this.to.next(msg);
            var lex = msg.get, soul, data, tmp, u2;
            if (!lex || !(soul = lex["#"])) {
              return;
            }
            data = disk[soul] || u2;
            if (data && (tmp = lex["."]) && !Object.plain(tmp)) {
              data = Gun.state.ify({}, tmp, Gun.state.is(data, tmp), data[tmp], soul);
            }
            Gun.on.get.ack(msg, data);
          });
          root.on("put", function(msg) {
            this.to.next(msg);
            var put = msg.put, soul = put["#"], key2 = put["."], id = msg["#"], tmp;
            disk[soul] = Gun.state.ify(disk[soul], key2, put[">"], put[":"], soul);
            if (stop && size > 4999880) {
              root.on("in", { "@": id, err: "localStorage max!" });
              return;
            }
            if (!msg["@"]) {
              acks.push(id);
            }
            if (to) {
              return;
            }
            to = setTimeout(flush, 9 + size / 333);
          });
          function flush() {
            if (!acks.length && ((setTimeout.turn || "").s || "").length) {
              setTimeout(flush, 99);
              return;
            }
            var err, ack = acks;
            clearTimeout(to);
            to = false;
            acks = [];
            json(disk, function(err2, tmp) {
              try {
                !err2 && store.setItem(opt.prefix, tmp);
              } catch (e2) {
                err2 = stop = e2 || "localStorage failure";
              }
              if (err2) {
                Gun.log(err2 + " Consider using GUN's IndexedDB plugin for RAD for more storage space, https://gun.eco/docs/RAD#install");
                root.on("localStorage:error", { err: err2, get: opt.prefix, put: disk });
              }
              size = tmp.length;
              if (!err2 && !Object.empty(opt.peers)) {
                return;
              }
              setTimeout.each(ack, function(id) {
                root.on("in", { "@": id, err: err2, ok: 0 });
              }, 0, 99);
            });
          }
        });
      })(USE, "./localStorage");
    })();
    (function() {
      var u;
      if ("" + u == typeof Gun) {
        return;
      }
      var DEP = function(n) {
        console.warn("Warning! Deprecated internal utility will break in next version:", n);
      };
      var Type = Gun;
      Type.fn = Type.fn || { is: function(fn2) {
        DEP("fn");
        return !!fn2 && typeof fn2 == "function";
      } };
      Type.bi = Type.bi || { is: function(b) {
        DEP("bi");
        return b instanceof Boolean || typeof b == "boolean";
      } };
      Type.num = Type.num || { is: function(n) {
        DEP("num");
        return !list_is(n) && (n - parseFloat(n) + 1 >= 0 || n === Infinity || n === -Infinity);
      } };
      Type.text = Type.text || { is: function(t2) {
        DEP("text");
        return typeof t2 == "string";
      } };
      Type.text.ify = Type.text.ify || function(t2) {
        DEP("text.ify");
        if (Type.text.is(t2)) {
          return t2;
        }
        if (typeof JSON !== "undefined") {
          return JSON.stringify(t2);
        }
        return t2 && t2.toString ? t2.toString() : t2;
      };
      Type.text.random = Type.text.random || function(l, c) {
        DEP("text.random");
        var s3 = "";
        l = l || 24;
        c = c || "0123456789ABCDEFGHIJKLMNOPQRSTUVWXZabcdefghijklmnopqrstuvwxyz";
        while (l > 0) {
          s3 += c.charAt(Math.floor(Math.random() * c.length));
          l--;
        }
        return s3;
      };
      Type.text.match = Type.text.match || function(t2, o) {
        var tmp, u2;
        DEP("text.match");
        if (typeof t2 !== "string") {
          return false;
        }
        if (typeof o == "string") {
          o = { "=": o };
        }
        o = o || {};
        tmp = o["="] || o["*"] || o[">"] || o["<"];
        if (t2 === tmp) {
          return true;
        }
        if (u2 !== o["="]) {
          return false;
        }
        tmp = o["*"] || o[">"] || o["<"];
        if (t2.slice(0, (tmp || "").length) === tmp) {
          return true;
        }
        if (u2 !== o["*"]) {
          return false;
        }
        if (u2 !== o[">"] && u2 !== o["<"]) {
          return t2 >= o[">"] && t2 <= o["<"] ? true : false;
        }
        if (u2 !== o[">"] && t2 >= o[">"]) {
          return true;
        }
        if (u2 !== o["<"] && t2 <= o["<"]) {
          return true;
        }
        return false;
      };
      Type.text.hash = Type.text.hash || function(s3, c) {
        DEP("text.hash");
        if (typeof s3 !== "string") {
          return;
        }
        c = c || 0;
        if (!s3.length) {
          return c;
        }
        for (var i2 = 0, l = s3.length, n; i2 < l; ++i2) {
          n = s3.charCodeAt(i2);
          c = (c << 5) - c + n;
          c |= 0;
        }
        return c;
      };
      Type.list = Type.list || { is: function(l) {
        DEP("list");
        return l instanceof Array;
      } };
      Type.list.slit = Type.list.slit || Array.prototype.slice;
      Type.list.sort = Type.list.sort || function(k) {
        DEP("list.sort");
        return function(A2, B) {
          if (!A2 || !B) {
            return 0;
          }
          A2 = A2[k];
          B = B[k];
          if (A2 < B) {
            return -1;
          } else if (A2 > B) {
            return 1;
          } else {
            return 0;
          }
        };
      };
      Type.list.map = Type.list.map || function(l, c, _) {
        DEP("list.map");
        return obj_map(l, c, _);
      };
      Type.list.index = 1;
      Type.obj = Type.boj || { is: function(o) {
        DEP("obj");
        return o ? o instanceof Object && o.constructor === Object || Object.prototype.toString.call(o).match(/^\[object (\w+)\]$/)[1] === "Object" : false;
      } };
      Type.obj.put = Type.obj.put || function(o, k, v) {
        DEP("obj.put");
        return (o || {})[k] = v, o;
      };
      Type.obj.has = Type.obj.has || function(o, k) {
        DEP("obj.has");
        return o && Object.prototype.hasOwnProperty.call(o, k);
      };
      Type.obj.del = Type.obj.del || function(o, k) {
        DEP("obj.del");
        if (!o) {
          return;
        }
        o[k] = null;
        delete o[k];
        return o;
      };
      Type.obj.as = Type.obj.as || function(o, k, v, u2) {
        DEP("obj.as");
        return o[k] = o[k] || (u2 === v ? {} : v);
      };
      Type.obj.ify = Type.obj.ify || function(o) {
        DEP("obj.ify");
        if (obj_is(o)) {
          return o;
        }
        try {
          o = JSON.parse(o);
        } catch (e2) {
          o = {};
        }
        ;
        return o;
      };
      (function() {
        var u2;
        function map(v, k) {
          if (obj_has(this, k) && u2 !== this[k]) {
            return;
          }
          this[k] = v;
        }
        Type.obj.to = Type.obj.to || function(from, to) {
          DEP("obj.to");
          to = to || {};
          obj_map(from, map, to);
          return to;
        };
      })();
      Type.obj.copy = Type.obj.copy || function(o) {
        DEP("obj.copy");
        return !o ? o : JSON.parse(JSON.stringify(o));
      };
      (function() {
        function empty(v, i2) {
          var n = this.n, u2;
          if (n && (i2 === n || obj_is(n) && obj_has(n, i2))) {
            return;
          }
          if (u2 !== i2) {
            return true;
          }
        }
        Type.obj.empty = Type.obj.empty || function(o, n) {
          DEP("obj.empty");
          if (!o) {
            return true;
          }
          return obj_map(o, empty, { n }) ? false : true;
        };
      })();
      ;
      (function() {
        function t2(k, v) {
          if (arguments.length === 2) {
            t2.r = t2.r || {};
            t2.r[k] = v;
            return;
          }
          t2.r = t2.r || [];
          t2.r.push(k);
        }
        ;
        var keys = Object.keys, map, u2;
        Object.keys = Object.keys || function(o) {
          return map(o, function(v, k, t3) {
            t3(k);
          });
        };
        Type.obj.map = map = Type.obj.map || function(l, c, _) {
          DEP("obj.map");
          var u3, i2 = 0, x2, r2, ll, lle, f3 = typeof c == "function";
          t2.r = u3;
          if (keys && obj_is(l)) {
            ll = keys(l);
            lle = true;
          }
          _ = _ || {};
          if (list_is(l) || ll) {
            x2 = (ll || l).length;
            for (; i2 < x2; i2++) {
              var ii = i2 + Type.list.index;
              if (f3) {
                r2 = lle ? c.call(_, l[ll[i2]], ll[i2], t2) : c.call(_, l[i2], ii, t2);
                if (r2 !== u3) {
                  return r2;
                }
              } else {
                if (c === l[lle ? ll[i2] : i2]) {
                  return ll ? ll[i2] : ii;
                }
              }
            }
          } else {
            for (i2 in l) {
              if (f3) {
                if (obj_has(l, i2)) {
                  r2 = _ ? c.call(_, l[i2], i2, t2) : c(l[i2], i2, t2);
                  if (r2 !== u3) {
                    return r2;
                  }
                }
              } else {
                if (c === l[i2]) {
                  return i2;
                }
              }
            }
          }
          return f3 ? t2.r : Type.list.index ? 0 : -1;
        };
      })();
      Type.time = Type.time || {};
      Type.time.is = Type.time.is || function(t2) {
        DEP("time");
        return t2 ? t2 instanceof Date : +new Date().getTime();
      };
      var fn_is = Type.fn.is;
      var list_is = Type.list.is;
      var obj = Type.obj, obj_is = obj.is, obj_has = obj.has, obj_map = obj.map;
      var Val = {};
      Val.is = function(v) {
        DEP("val.is");
        if (v === u) {
          return false;
        }
        if (v === null) {
          return true;
        }
        if (v === Infinity) {
          return false;
        }
        if (text_is(v) || bi_is(v) || num_is(v)) {
          return true;
        }
        return Val.link.is(v) || false;
      };
      Val.link = Val.rel = { _: "#" };
      ;
      (function() {
        Val.link.is = function(v) {
          DEP("val.link.is");
          if (v && v[rel_] && !v._ && obj_is(v)) {
            var o = {};
            obj_map(v, map, o);
            if (o.id) {
              return o.id;
            }
          }
          return false;
        };
        function map(s3, k) {
          var o = this;
          if (o.id) {
            return o.id = false;
          }
          if (k == rel_ && text_is(s3)) {
            o.id = s3;
          } else {
            return o.id = false;
          }
        }
      })();
      Val.link.ify = function(t2) {
        DEP("val.link.ify");
        return obj_put({}, rel_, t2);
      };
      Type.obj.has._ = ".";
      var rel_ = Val.link._, u;
      var bi_is = Type.bi.is;
      var num_is = Type.num.is;
      var text_is = Type.text.is;
      var obj = Type.obj, obj_is = obj.is, obj_put = obj.put, obj_map = obj.map;
      Type.val = Type.val || Val;
      var Node = { _: "_" };
      Node.soul = function(n, o) {
        DEP("node.soul");
        return n && n._ && n._[o || soul_];
      };
      Node.soul.ify = function(n, o) {
        DEP("node.soul.ify");
        o = typeof o === "string" ? { soul: o } : o || {};
        n = n || {};
        n._ = n._ || {};
        n._[soul_] = o.soul || n._[soul_] || text_random();
        return n;
      };
      Node.soul._ = Val.link._;
      ;
      (function() {
        Node.is = function(n, cb, as) {
          DEP("node.is");
          var s3;
          if (!obj_is(n)) {
            return false;
          }
          if (s3 = Node.soul(n)) {
            return !obj_map(n, map, { as, cb, s: s3, n });
          }
          return false;
        };
        function map(v, k) {
          if (k === Node._) {
            return;
          }
          if (!Val.is(v)) {
            return true;
          }
          if (this.cb) {
            this.cb.call(this.as, v, k, this.n, this.s);
          }
        }
      })();
      ;
      (function() {
        Node.ify = function(obj2, o, as) {
          DEP("node.ify");
          if (!o) {
            o = {};
          } else if (typeof o === "string") {
            o = { soul: o };
          } else if (typeof o == "function") {
            o = { map: o };
          }
          if (o.map) {
            o.node = o.map.call(as, obj2, u, o.node || {});
          }
          if (o.node = Node.soul.ify(o.node || {}, o)) {
            obj_map(obj2, map, { o, as });
          }
          return o.node;
        };
        function map(v, k) {
          var o = this.o, tmp, u2;
          if (o.map) {
            tmp = o.map.call(this.as, v, "" + k, o.node);
            if (u2 === tmp) {
              obj_del(o.node, k);
            } else if (o.node) {
              o.node[k] = tmp;
            }
            return;
          }
          if (Val.is(v)) {
            o.node[k] = v;
          }
        }
      })();
      var obj = Type.obj, obj_is = obj.is, obj_del = obj.del, obj_map = obj.map;
      var text = Type.text, text_random = text.random;
      var soul_ = Node.soul._;
      var u;
      Type.node = Type.node || Node;
      var State = Type.state;
      State.lex = function() {
        DEP("state.lex");
        return State().toString(36).replace(".", "");
      };
      State.to = function(from, k, to) {
        DEP("state.to");
        var val = (from || {})[k];
        if (obj_is(val)) {
          val = obj_copy(val);
        }
        return State.ify(to, k, State.is(from, k), val, Node.soul(from));
      };
      (function() {
        State.map = function(cb, s3, as) {
          DEP("state.map");
          var u2;
          var o = obj_is(o = cb || s3) ? o : null;
          cb = fn_is(cb = cb || s3) ? cb : null;
          if (o && !cb) {
            s3 = num_is(s3) ? s3 : State();
            o[N_] = o[N_] || {};
            obj_map(o, map, { o, s: s3 });
            return o;
          }
          as = as || obj_is(s3) ? s3 : u2;
          s3 = num_is(s3) ? s3 : State();
          return function(v, k, o2, opt) {
            if (!cb) {
              map.call({ o: o2, s: s3 }, v, k);
              return v;
            }
            cb.call(as || this || {}, v, k, o2, opt);
            if (obj_has(o2, k) && u2 === o2[k]) {
              return;
            }
            map.call({ o: o2, s: s3 }, v, k);
          };
        };
        function map(v, k) {
          if (N_ === k) {
            return;
          }
          State.ify(this.o, k, this.s);
        }
      })();
      var obj = Type.obj, obj_as = obj.as, obj_has = obj.has, obj_is = obj.is, obj_map = obj.map, obj_copy = obj.copy;
      var num = Type.num, num_is = num.is;
      var fn = Type.fn, fn_is = fn.is;
      var N_ = Node._, u;
      var Graph = {};
      ;
      (function() {
        Graph.is = function(g, cb, fn2, as) {
          DEP("graph.is");
          if (!g || !obj_is(g) || obj_empty(g)) {
            return false;
          }
          return !obj_map(g, map, { cb, fn: fn2, as });
        };
        function map(n, s3) {
          if (!n || s3 !== Node.soul(n) || !Node.is(n, this.fn, this.as)) {
            return true;
          }
          if (!this.cb) {
            return;
          }
          nf.n = n;
          nf.as = this.as;
          this.cb.call(nf.as, n, s3, nf);
        }
        function nf(fn2) {
          if (fn2) {
            Node.is(nf.n, fn2, nf.as);
          }
        }
      })();
      ;
      (function() {
        Graph.ify = function(obj2, env, as) {
          DEP("graph.ify");
          var at = { path: [], obj: obj2 };
          if (!env) {
            env = {};
          } else if (typeof env === "string") {
            env = { soul: env };
          } else if (typeof env == "function") {
            env.map = env;
          }
          if (typeof as === "string") {
            env.soul = env.soul || as;
            as = u;
          }
          if (env.soul) {
            at.link = Val.link.ify(env.soul);
          }
          env.shell = (as || {}).shell;
          env.graph = env.graph || {};
          env.seen = env.seen || [];
          env.as = env.as || as;
          node(env, at);
          env.root = at.node;
          return env.graph;
        };
        function node(env, at) {
          var tmp;
          if (tmp = seen(env, at)) {
            return tmp;
          }
          at.env = env;
          at.soul = soul;
          if (Node.ify(at.obj, map, at)) {
            at.link = at.link || Val.link.ify(Node.soul(at.node));
            if (at.obj !== env.shell) {
              env.graph[Val.link.is(at.link)] = at.node;
            }
          }
          return at;
        }
        function map(v, k, n) {
          var at = this, env = at.env, is, tmp;
          if (Node._ === k && obj_has(v, Val.link._)) {
            return n._;
          }
          if (!(is = valid(v, k, n, at, env))) {
            return;
          }
          if (!k) {
            at.node = at.node || n || {};
            if (obj_has(v, Node._) && Node.soul(v)) {
              at.node._ = obj_copy(v._);
            }
            at.node = Node.soul.ify(at.node, Val.link.is(at.link));
            at.link = at.link || Val.link.ify(Node.soul(at.node));
          }
          if (tmp = env.map) {
            tmp.call(env.as || {}, v, k, n, at);
            if (obj_has(n, k)) {
              v = n[k];
              if (u === v) {
                obj_del(n, k);
                return;
              }
              if (!(is = valid(v, k, n, at, env))) {
                return;
              }
            }
          }
          if (!k) {
            return at.node;
          }
          if (is === true) {
            return v;
          }
          tmp = node(env, { obj: v, path: at.path.concat(k) });
          if (!tmp.node) {
            return;
          }
          return tmp.link;
        }
        function soul(id) {
          var at = this;
          var prev = Val.link.is(at.link), graph = at.env.graph;
          at.link = at.link || Val.link.ify(id);
          at.link[Val.link._] = id;
          if (at.node && at.node[Node._]) {
            at.node[Node._][Val.link._] = id;
          }
          if (obj_has(graph, prev)) {
            graph[id] = graph[prev];
            obj_del(graph, prev);
          }
        }
        function valid(v, k, n, at, env) {
          var tmp;
          if (Val.is(v)) {
            return true;
          }
          if (obj_is(v)) {
            return 1;
          }
          if (tmp = env.invalid) {
            v = tmp.call(env.as || {}, v, k, n);
            return valid(v, k, n, at, env);
          }
          env.err = "Invalid value at '" + at.path.concat(k).join(".") + "'!";
          if (Type.list.is(v)) {
            env.err += " Use `.set(item)` instead of an Array.";
          }
        }
        function seen(env, at) {
          var arr = env.seen, i2 = arr.length, has;
          while (i2--) {
            has = arr[i2];
            if (at.obj === has.obj) {
              return has;
            }
          }
          arr.push(at);
        }
      })();
      Graph.node = function(node) {
        DEP("graph.node");
        var soul = Node.soul(node);
        if (!soul) {
          return;
        }
        return obj_put({}, soul, node);
      };
      (function() {
        Graph.to = function(graph, root, opt) {
          DEP("graph.to");
          if (!graph) {
            return;
          }
          var obj2 = {};
          opt = opt || { seen: {} };
          obj_map(graph[root], map, { obj: obj2, graph, opt });
          return obj2;
        };
        function map(v, k) {
          var tmp, obj2;
          if (Node._ === k) {
            if (obj_empty(v, Val.link._)) {
              return;
            }
            this.obj[k] = obj_copy(v);
            return;
          }
          if (!(tmp = Val.link.is(v))) {
            this.obj[k] = v;
            return;
          }
          if (obj2 = this.opt.seen[tmp]) {
            this.obj[k] = obj2;
            return;
          }
          this.obj[k] = this.opt.seen[tmp] = Graph.to(this.graph, tmp, this.opt);
        }
      })();
      var fn_is = Type.fn.is;
      var obj = Type.obj, obj_is = obj.is, obj_del = obj.del, obj_has = obj.has, obj_empty = obj.empty, obj_put = obj.put, obj_map = obj.map, obj_copy = obj.copy;
      var u;
      Type.graph = Type.graph || Graph;
    })();
  }
});

// node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/serve.js
var require_serve = __commonJS({
  "node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/serve.js"(exports, module) {
    var fs = __require("fs");
    var path2 = __require("path");
    var dot = /\.\.+/g;
    var slash = /\/\/+/g;
    function CDN(dir) {
      return function(req, res) {
        req.url = (req.url || "").replace(dot, "").replace(slash, "/");
        if (serve(req, res)) {
          return;
        }
        if (req.url.slice(-3) === ".js") {
          res.writeHead(200, { "Content-Type": "text/javascript" });
        }
        fs.createReadStream(path2.join(dir, req.url)).on("error", function(tmp) {
          fs.readFile(path2.join(dir, "index.html"), function(err, tmp2) {
            try {
              res.writeHead(200, { "Content-Type": "text/html" });
              res.end(tmp2 + "");
            } catch (e2) {
            }
          });
        }).pipe(res);
      };
    }
    function serve(req, res, next) {
      var tmp;
      if (typeof req === "string") {
        return CDN(req);
      }
      if (!req || !res) {
        return false;
      }
      next = next || serve;
      if (!req.url) {
        return next();
      }
      if (res.setHeader) {
        res.setHeader("Access-Control-Allow-Origin", "*");
      }
      if (0 <= req.url.indexOf("gun.js")) {
        res.writeHead(200, { "Content-Type": "text/javascript" });
        res.end(serve.js = serve.js || __require("fs").readFileSync(__dirname + "/../gun.js"));
        return true;
      }
      if (0 <= req.url.indexOf("gun/")) {
        var path3 = __dirname + "/../" + req.url.split("/").slice(2).join("/");
        if (path3.slice(-1) === "/") {
          fs.readdir(path3, function(err, dir) {
            res.end((dir || err && 404) + "");
          });
          return true;
        }
        var S2 = +new Date();
        var rs = fs.createReadStream(path3);
        rs.on("open", function() {
          console.STAT && console.STAT(S2, +new Date() - S2, "serve file open");
          rs.pipe(res);
        });
        rs.on("error", function(err) {
          res.end(404 + "");
        });
        rs.on("end", function() {
          console.STAT && console.STAT(S2, +new Date() - S2, "serve file end");
        });
        return true;
      }
      if ((tmp = req.socket) && (tmp = tmp.server) && (tmp = tmp.route)) {
        var url;
        if (tmp = tmp[((req.url || "").slice(1).split("/")[0] || "").split(".")[0]]) {
          try {
            return tmp(req, res, next);
          } catch (e2) {
            console.log(req.url + " crashed with " + e2);
          }
        }
      }
      return next();
    }
    module.exports = serve;
  }
});

// node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/radix.js
var require_radix = __commonJS({
  "node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/radix.js"(exports, module) {
    (function() {
      function Radix() {
        var radix = function(key2, val, t2) {
          radix.unit = 0;
          if (!t2 && u !== val) {
            radix.last = "" + key2 < radix.last ? radix.last : "" + key2;
            delete (radix.$ || {})[_];
          }
          t2 = t2 || radix.$ || (radix.$ = {});
          if (!key2 && Object.keys(t2).length) {
            return t2;
          }
          key2 = "" + key2;
          var i2 = 0, l = key2.length - 1, k = key2[i2], at, tmp;
          while (!(at = t2[k]) && i2 < l) {
            k += key2[++i2];
          }
          if (!at) {
            if (!each2(t2, function(r2, s3) {
              var ii = 0, kk = "";
              if ((s3 || "").length) {
                while (s3[ii] == key2[ii]) {
                  kk += s3[ii++];
                }
              }
              if (kk) {
                if (u === val) {
                  if (ii <= l) {
                    return;
                  }
                  (tmp || (tmp = {}))[s3.slice(ii)] = r2;
                  return r2;
                }
                var __ = {};
                __[s3.slice(ii)] = r2;
                ii = key2.slice(ii);
                ii === "" ? __[""] = val : (__[ii] = {})[""] = val;
                t2[kk] = __;
                if (Radix.debug && "" + kk === "undefined") {
                  console.log(0, kk);
                  debugger;
                }
                delete t2[s3];
                return true;
              }
            })) {
              if (u === val) {
                return;
              }
              (t2[k] || (t2[k] = {}))[""] = val;
              if (Radix.debug && "" + k === "undefined") {
                console.log(1, k);
                debugger;
              }
            }
            if (u === val) {
              return tmp;
            }
          } else if (i2 == l) {
            if (u === val) {
              return u === (tmp = at[""]) ? at : (radix.unit = 1) && tmp;
            }
            at[""] = val;
          } else {
            if (u !== val) {
              delete at[_];
            }
            return radix(key2.slice(++i2), val, at || (at = {}));
          }
        };
        return radix;
      }
      ;
      Radix.map = function rap(radix, cb, opt, pre) {
        pre = pre || [];
        var t2 = typeof radix == "function" ? radix.$ || {} : radix;
        if (!t2) {
          return;
        }
        if (typeof t2 == "string") {
          if (Radix.debug) {
            throw ["BUG:", radix, cb, opt, pre];
          }
          return;
        }
        var keys = (t2[_] || no).sort || (t2[_] = function $() {
          $.sort = Object.keys(t2).sort();
          return $;
        }()).sort, rev;
        opt = opt === true ? { branch: true } : opt || {};
        if (rev = opt.reverse) {
          keys = keys.slice(0).reverse();
        }
        var start = opt.start, end = opt.end, END = "\uFFFF";
        var i2 = 0, l = keys.length;
        for (; i2 < l; i2++) {
          var key2 = keys[i2], tree = t2[key2], tmp, p, pt;
          if (!tree || key2 === "" || _ === key2 || key2 === "undefined") {
            continue;
          }
          p = pre.slice(0);
          p.push(key2);
          pt = p.join("");
          if (u !== start && pt < (start || "").slice(0, pt.length)) {
            continue;
          }
          if (u !== end && (end || END) < pt) {
            continue;
          }
          if (rev) {
            tmp = rap(tree, cb, opt, p);
            if (u !== tmp) {
              return tmp;
            }
          }
          if (u !== (tmp = tree[""])) {
            var yes = 1;
            if (u !== start && pt < (start || "")) {
              yes = 0;
            }
            if (u !== end && pt > (end || END)) {
              yes = 0;
            }
            if (yes) {
              tmp = cb(tmp, pt, key2, pre);
              if (u !== tmp) {
                return tmp;
              }
            }
          } else if (opt.branch) {
            tmp = cb(u, pt, key2, pre);
            if (u !== tmp) {
              return tmp;
            }
          }
          pre = p;
          if (!rev) {
            tmp = rap(tree, cb, opt, pre);
            if (u !== tmp) {
              return tmp;
            }
          }
          pre.pop();
        }
      };
      if (typeof window !== "undefined") {
        window.Radix = Radix;
      } else {
        try {
          module.exports = Radix;
        } catch (e2) {
        }
      }
      var each2 = Radix.object = function(o, f3, r2) {
        for (var k in o) {
          if (!o.hasOwnProperty(k)) {
            continue;
          }
          if ((r2 = f3(o[k], k)) !== u) {
            return r2;
          }
        }
      }, no = {}, u;
      var _ = String.fromCharCode(24);
    })();
  }
});

// node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/radmigtmp.js
var require_radmigtmp = __commonJS({
  "node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/radmigtmp.js"(exports, module) {
    module.exports = function(r2) {
      var Radix = require_radix();
      r2.find("a", function() {
        var l = [];
        Radix.map(r2.list, function(v2, f4) {
          if (!(f4.indexOf("%1B") + 1)) {
            return;
          }
          if (!v2) {
            return;
          }
          l.push([f4, v2]);
        });
        if (l.length) {
          console.log("\n! ! ! WARNING ! ! !\nRAD v0.2020.x has detected OLD v0.2019.x data & automatically migrating. Automatic migration will be turned OFF in future versions! If you are just developing/testing, we recommend you reset your data. Please contact us if you have any concerns.\nThis message should only log once.");
        }
        var f3, v;
        l.forEach(function(a) {
          f3 = a[0];
          v = a[1];
          r2.list(decodeURIComponent(f3), v);
          r2.list(f3, 0);
        });
        if (!f3) {
          return;
        }
        r2.find.bad(f3);
      });
    };
  }
});

// node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/radisk.js
var require_radisk = __commonJS({
  "node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/radisk.js"(exports, module) {
    (function() {
      function Radisk(opt) {
        opt = opt || {};
        opt.log = opt.log || console.log;
        opt.file = String(opt.file || "radata");
        var has = (Radisk.has || (Radisk.has = {}))[opt.file];
        if (has) {
          return has;
        }
        opt.max = opt.max || (opt.memory ? opt.memory * 999 * 999 : 3e8) * 0.3;
        opt.until = opt.until || opt.wait || 250;
        opt.batch = opt.batch || 10 * 1e3;
        opt.chunk = opt.chunk || 1024 * 1024 * 1;
        opt.code = opt.code || {};
        opt.code.from = opt.code.from || "!";
        opt.jsonify = true;
        function ename(t2) {
          return encodeURIComponent(t2).replace(/\*/g, "%2A");
        }
        function atomic(v) {
          return u !== v && (!v || typeof v != "object");
        }
        var timediate = "" + u === typeof setImmediate ? setTimeout : setImmediate;
        var puff = setTimeout.turn || timediate, u;
        var map = Radix.object;
        var ST = 0;
        if (!opt.store) {
          return opt.log("ERROR: Radisk needs `opt.store` interface with `{get: fn, put: fn (, list: fn)}`!");
        }
        if (!opt.store.put) {
          return opt.log("ERROR: Radisk needs `store.put` interface with `(file, data, cb)`!");
        }
        if (!opt.store.get) {
          return opt.log("ERROR: Radisk needs `store.get` interface with `(file, cb)`!");
        }
        if (!opt.store.list) {
        }
        if ("" + u != typeof __require) {
          require_yson();
        }
        var parse2 = JSON.parseAsync || function(t2, cb, r3) {
          var u2;
          try {
            cb(u2, JSON.parse(t2, r3));
          } catch (e2) {
            cb(e2);
          }
        };
        var json = JSON.stringifyAsync || function(v, cb, r3, s3) {
          var u2;
          try {
            cb(u2, JSON.stringify(v, r3, s3));
          } catch (e2) {
            cb(e2);
          }
        };
        var r2 = function(key2, data, cb, tag, DBG) {
          if (typeof data === "function") {
            var o = cb || {};
            cb = data;
            r2.read(key2, cb, o, DBG || tag);
            return;
          }
          r2.save(key2, data, cb, tag, DBG);
        };
        r2.save = function(key2, data, cb, tag, DBG) {
          var s3 = { key: key2 }, tags, f3, d, q;
          s3.find = function(file) {
            var tmp;
            s3.file = file || (file = opt.code.from);
            DBG && (DBG = DBG[file] = DBG[file] || {});
            DBG && (DBG.sf = DBG.sf || +new Date());
            if (tmp = r2.disk[file]) {
              s3.mix(u, tmp);
              return;
            }
            r2.parse(file, s3.mix, u, DBG);
          };
          s3.mix = function(err, disk) {
            DBG && (DBG.sml = +new Date());
            DBG && (DBG.sm = DBG.sm || +new Date());
            if (s3.err = err || s3.err) {
              cb(err);
              return;
            }
            var file = s3.file = (disk || "").file || s3.file, tmp;
            if (!disk && file !== opt.code.from) {
              r2.find.bad(file);
              r2.save(key2, data, cb, tag);
              return;
            }
            (disk = r2.disk[file] || (r2.disk[file] = disk || Radix())).file || (disk.file = file);
            if (opt.compare) {
              data = opt.compare(disk(key2), data, key2, file);
              if (u === data) {
                cb(err, -1);
                return;
              }
            }
            (s3.disk = disk)(key2, data);
            if (tag) {
              (tmp = (tmp = disk.tags || (disk.tags = {}))[tag] || (tmp[tag] = r2.tags[tag] || (r2.tags[tag] = {})))[file] || (tmp[file] = r2.one[tag] || (r2.one[tag] = cb));
              cb = null;
            }
            DBG && (DBG.st = DBG.st || +new Date());
            if (disk.Q) {
              cb && disk.Q.push(cb);
              return;
            }
            disk.Q = cb ? [cb] : [];
            disk.to = setTimeout(s3.write, opt.until);
          };
          s3.write = function() {
            DBG && (DBG.sto = DBG.sto || +new Date());
            var file = f3 = s3.file, disk = d = s3.disk;
            q = s3.q = disk.Q;
            tags = s3.tags = disk.tags;
            delete disk.Q;
            delete r2.disk[file];
            delete disk.tags;
            r2.write(file, disk, s3.ack, u, DBG);
          };
          s3.ack = function(err, ok) {
            DBG && (DBG.sa = DBG.sa || +new Date());
            DBG && (DBG.sal = q.length);
            var ack, tmp;
            for (var id in r2.tags) {
              if (!r2.tags.hasOwnProperty(id)) {
                continue;
              }
              var tag2 = r2.tags[id];
              if ((tmp = r2.disk[f3]) && (tmp = tmp.tags) && tmp[tag2]) {
                continue;
              }
              ack = tag2[f3];
              delete tag2[f3];
              var ne;
              for (var k in tag2) {
                if (tag2.hasOwnProperty(k)) {
                  ne = true;
                  break;
                }
              }
              if (ne) {
                continue;
              }
              delete r2.tags[tag2];
              ack && ack(err, ok);
            }
            !q && (q = "");
            var l = q.length, i2 = 0;
            var S2 = +new Date();
            for (; i2 < l; i2++) {
              (ack = q[i2]) && ack(err, ok);
            }
            console.STAT && console.STAT(S2, +new Date() - S2, "rad acks", ename(s3.file));
            console.STAT && console.STAT(S2, q.length, "rad acks #", ename(s3.file));
          };
          cb || (cb = function(err, ok) {
            if (!err) {
              return;
            }
          });
          r2.find(key2, s3.find);
        };
        r2.disk = {};
        r2.one = {};
        r2.tags = {};
        var RWC = 0;
        r2.write = function(file, rad, cb, o, DBG) {
          if (!rad) {
            cb("No radix!");
            return;
          }
          o = typeof o == "object" ? o : { force: o };
          var f3 = function Fractal() {
          }, a, b;
          f3.text = "";
          f3.file = file = rad.file || (rad.file = file);
          if (!file) {
            cb("What file?");
            return;
          }
          f3.write = function() {
            var text = rad.raw = f3.text;
            r2.disk[file = rad.file || f3.file || file] = rad;
            var S2 = +new Date();
            DBG && (DBG.wd = S2);
            r2.find.add(file, function add(err) {
              DBG && (DBG.wa = +new Date());
              if (err) {
                cb(err);
                return;
              }
              opt.store.put(ename(file), text, function safe(err2, ok) {
                DBG && (DBG.wp = +new Date());
                console.STAT && console.STAT(S2, ST = +new Date() - S2, "wrote disk", JSON.stringify(file), ++RWC, "total all writes.");
                cb(err2, ok || 1);
                if (!rad.Q) {
                  delete r2.disk[file];
                }
              });
            });
          };
          f3.split = function() {
            var S2 = +new Date();
            DBG && (DBG.wf = S2);
            f3.text = "";
            if (!f3.count) {
              f3.count = 0;
              Radix.map(rad, function count() {
                f3.count++;
              });
            }
            DBG && (DBG.wfc = f3.count);
            f3.limit = Math.ceil(f3.count / 2);
            var SC = f3.count;
            f3.count = 0;
            DBG && (DBG.wf1 = +new Date());
            f3.sub = Radix();
            Radix.map(rad, f3.slice, { reverse: 1 });
            DBG && (DBG.wf2 = +new Date());
            r2.write(f3.end, f3.sub, f3.both, o);
            DBG && (DBG.wf3 = +new Date());
            f3.hub = Radix();
            Radix.map(rad, f3.stop);
            DBG && (DBG.wf4 = +new Date());
            r2.write(rad.file, f3.hub, f3.both, o);
            DBG && (DBG.wf5 = +new Date());
            console.STAT && console.STAT(S2, +new Date() - S2, "rad split", ename(rad.file), SC);
            return true;
          };
          f3.slice = function(val, key2) {
            f3.sub(f3.end = key2, val);
            if (f3.limit <= ++f3.count) {
              return true;
            }
          };
          f3.stop = function(val, key2) {
            if (key2 >= f3.end) {
              return true;
            }
            f3.hub(key2, val);
          };
          f3.both = function(err, ok) {
            DBG && (DBG.wfd = +new Date());
            if (b) {
              cb(err || b);
              return;
            }
            if (a) {
              cb(err, ok);
              return;
            }
            a = true;
            b = err;
          };
          f3.each = function(val, key2, k, pre) {
            if (u !== val) {
              f3.count++;
            }
            if (opt.max <= (val || "").length) {
              return cb("Data too big!"), true;
            }
            var enc = Radisk.encode(pre.length) + "#" + Radisk.encode(k) + (u === val ? "" : ":" + Radisk.encode(val)) + "\n";
            if (opt.chunk < f3.text.length + enc.length && 1 < f3.count && !o.force) {
              return f3.split();
            }
            f3.text += enc;
          };
          if (opt.jsonify) {
            r2.write.jsonify(f3, rad, cb, o, DBG);
            return;
          }
          if (!Radix.map(rad, f3.each, true)) {
            f3.write();
          }
        };
        r2.write.jsonify = function(f3, rad, cb, o, DBG) {
          var raw;
          var S2 = +new Date();
          DBG && (DBG.w = S2);
          try {
            raw = JSON.stringify(rad.$);
          } catch (e2) {
            cb("Cannot radisk!");
            return;
          }
          DBG && (DBG.ws = +new Date());
          console.STAT && console.STAT(S2, +new Date() - S2, "rad stringified JSON");
          if (opt.chunk < raw.length && !o.force) {
            var c = 0;
            Radix.map(rad, function() {
              if (c++) {
                return true;
              }
            });
            if (c > 1) {
              return f3.split();
            }
          }
          f3.text = raw;
          f3.write();
        };
        r2.range = function(tree, o) {
          if (!tree || !o) {
            return;
          }
          if (u === o.start && u === o.end) {
            return tree;
          }
          if (atomic(tree)) {
            return tree;
          }
          var sub = Radix();
          Radix.map(tree, function(v, k) {
            sub(k, v);
          }, o);
          return sub("");
        };
        (function() {
          r2.read = function(key2, cb, o, DBG) {
            o = o || {};
            var g = { key: key2 };
            g.find = function(file) {
              var tmp;
              g.file = file || (file = opt.code.from);
              DBG && (DBG = DBG[file] = DBG[file] || {});
              DBG && (DBG.rf = DBG.rf || +new Date());
              if (tmp = r2.disk[g.file = file]) {
                g.check(u, tmp);
                return;
              }
              r2.parse(file, g.check, u, DBG);
            };
            g.get = function(err, disk, info) {
              DBG && (DBG.rgl = +new Date());
              DBG && (DBG.rg = DBG.rg || +new Date());
              if (g.err = err || g.err) {
                cb(err);
                return;
              }
              var file = g.file = (disk || "").file || g.file;
              if (!disk && file !== opt.code.from) {
                r2.find.bad(file);
                r2.read(key2, cb, o);
                return;
              }
              disk = r2.disk[file] || (r2.disk[file] = disk);
              if (!disk) {
                cb(file === opt.code.from ? u : "No file!");
                return;
              }
              disk.file || (disk.file = file);
              var data = r2.range(disk(key2), o);
              DBG && (DBG.rr = +new Date());
              o.unit = disk.unit;
              o.chunks = (o.chunks || 0) + 1;
              o.parsed = (o.parsed || 0) + ((info || "").parsed || o.chunks * opt.chunk);
              o.more = 1;
              o.next = u;
              Radix.map(r2.list, function next2(v, f3) {
                if (!v || file === f3) {
                  return;
                }
                o.next = f3;
                return 1;
              }, o.reverse ? { reverse: 1, end: file } : { start: file });
              DBG && (DBG.rl = +new Date());
              if (!o.next) {
                o.more = 0;
              }
              if (o.next) {
                if (!o.reverse && (key2 < o.next && o.next.indexOf(key2) != 0 || u !== o.end && (o.end || "\uFFFF") < o.next)) {
                  o.more = 0;
                }
                if (o.reverse && (key2 > o.next && key2.indexOf(o.next) != 0 || u !== o.start && (o.start || "") > o.next && file <= o.start)) {
                  o.more = 0;
                }
              }
              if (!o.more) {
                cb(g.err, data, o);
                return;
              }
              if (data) {
                cb(g.err, data, o);
              }
              if (o.parsed >= o.limit) {
                return;
              }
              var S2 = +new Date();
              DBG && (DBG.rm = S2);
              var next = o.next;
              timediate(function() {
                console.STAT && console.STAT(S2, +new Date() - S2, "rad more");
                r2.parse(next, g.check);
              }, 0);
            };
            g.check = function(err, disk, info) {
              g.get(err, disk, info);
              if (!disk || disk.check) {
                return;
              }
              disk.check = 1;
              var S2 = +new Date();
              (info || (info = {})).file || (info.file = g.file);
              Radix.map(disk, function(val, key3) {
                r2.find(key3, function(file) {
                  if ((file || (file = opt.code.from)) === info.file) {
                    return;
                  }
                  var id = ("" + Math.random()).slice(-3);
                  puff(function() {
                    r2.save(key3, val, function ack(err2, ok) {
                      if (err2) {
                        r2.save(key3, val, ack);
                        return;
                      }
                      console.STAT && console.STAT("MISLOCATED DATA CORRECTED", id, ename(key3), ename(info.file), ename(file));
                    });
                  }, 0);
                });
              });
              console.STAT && console.STAT(S2, +new Date() - S2, "rad check");
            };
            r2.find(key2 || (o.reverse ? o.end || "" : o.start || ""), g.find);
          };
          function rev(a, b) {
            return b;
          }
          var revo = { reverse: true };
        })();
        ;
        (function() {
          var RPC = 0;
          var Q = {}, s3 = String.fromCharCode(31);
          r2.parse = function(file, cb, raw, DBG) {
            var q;
            if (!file) {
              return cb();
            }
            if (q = Q[file]) {
              q.push(cb);
              return;
            }
            q = Q[file] = [cb];
            var p = function Parse() {
            }, info = { file };
            (p.disk = Radix()).file = file;
            p.read = function(err, data) {
              var tmp;
              DBG && (DBG.rpg = +new Date());
              console.STAT && console.STAT(S2, +new Date() - S2, "read disk", JSON.stringify(file), ++RPC, "total all parses.");
              if ((p.err = err) || (p.not = !data)) {
                delete Q[file];
                p.map(q, p.ack);
                return;
              }
              if (typeof data !== "string") {
                try {
                  if (opt.max <= data.length) {
                    p.err = "Chunk too big!";
                  } else {
                    data = data.toString();
                  }
                } catch (e2) {
                  p.err = e2;
                }
                if (p.err) {
                  delete Q[file];
                  p.map(q, p.ack);
                  return;
                }
              }
              info.parsed = data.length;
              DBG && (DBG.rpl = info.parsed);
              DBG && (DBG.rpa = q.length);
              S2 = +new Date();
              if (!(opt.jsonify || data[0] === "{")) {
                p.radec(err, data);
                return;
              }
              parse2(data, function(err2, tree) {
                if (!err2) {
                  delete Q[file];
                  p.disk.$ = tree;
                  console.STAT && (ST = +new Date() - S2) > 9 && console.STAT(S2, ST, "rad parsed JSON");
                  DBG && (DBG.rpd = +new Date());
                  p.map(q, p.ack);
                  return;
                }
                if (data[0] === "{") {
                  delete Q[file];
                  p.err = tmp || "JSON error!";
                  p.map(q, p.ack);
                  return;
                }
                p.radec(err2, data);
              });
            };
            p.map = function() {
              if (!q || !q.length) {
                return;
              }
              var S3 = +new Date();
              var err = p.err, data = p.not ? u : p.disk;
              var i2 = 0, ack;
              while (i2 < 9 && (ack = q[i2++])) {
                ack(err, data, info);
              }
              console.STAT && console.STAT(S3, +new Date() - S3, "rad packs", ename(file));
              console.STAT && console.STAT(S3, i2, "rad packs #", ename(file));
              if (!(q = q.slice(i2)).length) {
                return;
              }
              puff(p.map, 0);
            };
            p.ack = function(cb2) {
              if (!cb2) {
                return;
              }
              if (p.err || p.not) {
                cb2(p.err, u, info);
                return;
              }
              cb2(u, p.disk, info);
            };
            p.radec = function(err, data) {
              delete Q[file];
              S2 = +new Date();
              var tmp = p.split(data), pre = [], i2, k, v;
              if (!tmp || tmp[1] !== 0) {
                p.err = "File '" + file + "' does not have root radix! ";
                p.map(q, p.ack);
                return;
              }
              while (tmp) {
                k = v = u;
                i2 = tmp[1];
                tmp = p.split(tmp[2]) || "";
                if (tmp[0] == "#") {
                  k = tmp[1];
                  pre = pre.slice(0, i2);
                  if (i2 <= pre.length) {
                    pre.push(k);
                  }
                }
                tmp = p.split(tmp[2]) || "";
                if (tmp[0] == "\n") {
                  continue;
                }
                if (tmp[0] == "=" || tmp[0] == ":") {
                  v = tmp[1];
                }
                if (u !== k && u !== v) {
                  p.disk(pre.join(""), v);
                }
                tmp = p.split(tmp[2]);
              }
              console.STAT && console.STAT(S2, +new Date() - S2, "parsed RAD");
              p.map(q, p.ack);
            };
            p.split = function(t2) {
              if (!t2) {
                return;
              }
              var l = [], o = {}, i2 = -1, a = "", b, c;
              i2 = t2.indexOf(s3);
              if (!t2[i2]) {
                return;
              }
              a = t2.slice(0, i2);
              l[0] = a;
              l[1] = b = Radisk.decode(t2.slice(i2), o);
              l[2] = t2.slice(i2 + o.i);
              return l;
            };
            if (r2.disk) {
              raw || (raw = (r2.disk[file] || "").raw);
            }
            var S2 = +new Date(), SM, SL;
            DBG && (DBG.rp = S2);
            if (raw) {
              return puff(function() {
                p.read(u, raw);
              }, 0);
            }
            opt.store.get(ename(file), p.read);
          };
        })();
        ;
        (function() {
          var dir, f3 = String.fromCharCode(28), Q;
          r2.find = function(key2, cb) {
            if (!dir) {
              if (Q) {
                Q.push([key2, cb]);
                return;
              }
              Q = [[key2, cb]];
              r2.parse(f3, init3);
              return;
            }
            Radix.map(r2.list = dir, function(val, key3) {
              if (!val) {
                return;
              }
              return cb(key3) || true;
            }, { reverse: 1, end: key2 }) || cb(opt.code.from);
          };
          r2.find.add = function(file, cb) {
            var has2 = dir(file);
            if (has2 || file === f3) {
              cb(u, 1);
              return;
            }
            dir(file, 1);
            cb.found = (cb.found || 0) + 1;
            r2.write(f3, dir, function(err, ok) {
              if (err) {
                cb(err);
                return;
              }
              cb.found = (cb.found || 0) - 1;
              if (cb.found !== 0) {
                return;
              }
              cb(u, 1);
            }, true);
          };
          r2.find.bad = function(file, cb) {
            dir(file, 0);
            r2.write(f3, dir, cb || noop3);
          };
          function init3(err, disk) {
            if (err) {
              opt.log("list", err);
              setTimeout(function() {
                r2.parse(f3, init3);
              }, 1e3);
              return;
            }
            if (disk) {
              drain(disk);
              return;
            }
            dir = dir || disk || Radix();
            if (!opt.store.list) {
              drain(dir);
              return;
            }
            opt.store.list(function(file) {
              if (!file) {
                drain(dir);
                return;
              }
              r2.find.add(file, noop3);
            });
          }
          function drain(rad, tmp) {
            dir = dir || rad;
            dir.file = f3;
            tmp = Q;
            Q = null;
            map(tmp, function(arg) {
              r2.find(arg[0], arg[1]);
            });
          }
        })();
        try {
          !Gun2.window && require_radmigtmp()(r2);
        } catch (e2) {
        }
        var noop3 = function() {
        }, RAD, u;
        Radisk.has[opt.file] = r2;
        return r2;
      }
      ;
      (function() {
        var _ = String.fromCharCode(31), u;
        Radisk.encode = function(d, o, s3) {
          s3 = s3 || _;
          var t2 = s3, tmp;
          if (typeof d == "string") {
            var i2 = d.indexOf(s3);
            while (i2 != -1) {
              t2 += s3;
              i2 = d.indexOf(s3, i2 + 1);
            }
            return t2 + '"' + d + s3;
          } else if (d && d["#"] && Object.keys(d).length == 1) {
            return t2 + "#" + tmp + t2;
          } else if (typeof d == "number") {
            return t2 + "+" + (d || 0) + t2;
          } else if (d === null) {
            return t2 + " " + t2;
          } else if (d === true) {
            return t2 + "+" + t2;
          } else if (d === false) {
            return t2 + "-" + t2;
          }
        };
        Radisk.decode = function(t2, o, s3) {
          s3 = s3 || _;
          var d = "", i2 = -1, n = 0, c, p;
          if (s3 !== t2[0]) {
            return;
          }
          while (s3 === t2[++i2]) {
            ++n;
          }
          p = t2[c = n] || true;
          while (--n >= 0) {
            i2 = t2.indexOf(s3, i2 + 1);
          }
          if (i2 == -1) {
            i2 = t2.length;
          }
          d = t2.slice(c + 1, i2);
          if (o) {
            o.i = i2 + 1;
          }
          if (p === '"') {
            return d;
          } else if (p === "#") {
            return { "#": d };
          } else if (p === "+") {
            if (d.length === 0) {
              return true;
            }
            return parseFloat(d);
          } else if (p === " ") {
            return null;
          } else if (p === "-") {
            return false;
          }
        };
      })();
      if (typeof window !== "undefined") {
        var Gun2 = window.Gun;
        var Radix = window.Radix;
        window.Radisk = Radisk;
      } else {
        var Gun2 = require_gun();
        var Radix = require_radix();
        try {
          module.exports = Radisk;
        } catch (e2) {
        }
      }
      Radisk.Radix = Radix;
    })();
  }
});

// node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/store.js
var require_store = __commonJS({
  "node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/store.js"() {
    var Gun2 = typeof window !== "undefined" ? window.Gun : require_gun();
    Gun2.on("create", function(root) {
      if (Gun2.TESTING) {
        root.opt.file = "radatatest";
      }
      this.to.next(root);
      var opt = root.opt, empty = {}, u;
      if (opt.rad === false || opt.radisk === false) {
        return;
      }
      if (u + "" != typeof process && "" + (process.env || "").RAD === "false") {
        return;
      }
      var Radisk = Gun2.window && Gun2.window.Radisk || require_radisk();
      var Radix = Radisk.Radix;
      var dare = Radisk(opt), esc = String.fromCharCode(27);
      var ST = 0;
      root.on("put", function(msg) {
        this.to.next(msg);
        if ((msg._ || "").rad) {
          return;
        }
        var id = msg["#"], put = msg.put, soul = put["#"], key2 = put["."], val = put[":"], state = put[">"], tmp;
        var DBG = (msg._ || "").DBG;
        DBG && (DBG.sp = DBG.sp || +new Date());
        var S2 = (msg._ || "").RPS || ((msg._ || "").RPS = +new Date());
        dare(soul + esc + key2, { ":": val, ">": state }, function(err, ok) {
          DBG && (DBG.spd = DBG.spd || +new Date());
          console.STAT && console.STAT(S2, +new Date() - S2, "put");
          if (err) {
            root.on("in", { "@": id, err, DBG });
            return;
          }
          root.on("in", { "@": id, ok, DBG });
        }, false, DBG && (DBG.r = DBG.r || {}));
        DBG && (DBG.sps = DBG.sps || +new Date());
      });
      var count = {}, obj_empty = Object.empty;
      root.on("get", function(msg) {
        this.to.next(msg);
        var ctx = msg._ || "", DBG = ctx.DBG = msg.DBG;
        DBG && (DBG.sg = +new Date());
        var id = msg["#"], get = msg.get, soul = msg.get["#"], has = msg.get["."] || "", o = {}, graph, lex, key2, tmp, force;
        if (typeof soul == "string") {
          key2 = soul;
        } else if (soul) {
          if (u !== (tmp = soul["*"])) {
            o.limit = force = 1;
          }
          if (u !== soul[">"]) {
            o.start = soul[">"];
          }
          if (u !== soul["<"]) {
            o.end = soul["<"];
          }
          key2 = force ? "" + tmp : tmp || soul["="];
          force = null;
        }
        if (key2 && !o.limit) {
          if (typeof has == "string") {
            key2 = key2 + esc + (o.atom = has);
          } else if (has) {
            if (u !== has[">"]) {
              o.start = has[">"];
              o.limit = 1;
            }
            if (u !== has["<"]) {
              o.end = has["<"];
              o.limit = 1;
            }
            if (u !== (tmp = has["*"])) {
              o.limit = force = 1;
            }
            if (key2) {
              key2 = key2 + esc + (force ? "" + (tmp || "") : tmp || (o.atom = has["="] || ""));
            }
          }
        }
        if ((tmp = get["%"]) || o.limit) {
          o.limit = tmp <= (o.pack || 1e3 * 100) ? tmp : 1;
        }
        if (has["-"] || (soul || {})["-"] || get["-"]) {
          o.reverse = true;
        }
        if ((tmp = (root.next || "")[soul]) && tmp.put) {
          if (o.atom) {
            tmp = (tmp.next || "")[o.atom];
            if (tmp && tmp.rad) {
              return;
            }
          } else if (tmp && tmp.rad) {
            return;
          }
        }
        var now = Gun2.state();
        var S2 = +new Date(), C = 0, SPT = 0;
        DBG && (DBG.sgm = S2);
        dare(key2 || "", function(err, data, info) {
          DBG && (DBG.sgr = +new Date());
          DBG && (DBG.sgi = info);
          try {
            opt.store.stats.get.time[statg % 50] = +new Date() - S2;
            ++statg;
            opt.store.stats.get.count++;
            if (err) {
              opt.store.stats.get.err = err;
            }
          } catch (e2) {
          }
          console.STAT && console.STAT(S2, +new Date() - S2, "got", JSON.stringify(key2));
          S2 = +new Date();
          info = info || "";
          var va, ve;
          if (info.unit && data && u !== (va = data[":"]) && u !== (ve = data[">"])) {
            var tmp2 = key2.split(esc), so = tmp2[0], ha = tmp2[1];
            (graph = graph || {})[so] = Gun2.state.ify(graph[so], ha, ve, va, so);
            root.$.get(so).get(ha)._.rad = now;
          } else if (data) {
            if (typeof data !== "string") {
              if (o.atom) {
                data = u;
              } else {
                Radix.map(data, each2, o);
              }
            }
            if (!graph && data) {
              each2(data, "");
            }
            if (!o.atom && !has & typeof soul == "string" && !o.limit && !o.more) {
              root.$.get(soul)._.rad = now;
            }
          }
          DBG && (DBG.sgp = +new Date());
          if (console.STAT && (ST = +new Date() - S2) > 9) {
            console.STAT(S2, ST, "got prep time");
            console.STAT(S2, C, "got prep #");
          }
          SPT += ST;
          C = 0;
          S2 = +new Date();
          var faith = function() {
          };
          faith.faith = true;
          faith.rad = get;
          root.on("in", { "@": id, put: graph, "%": info.more ? 1 : u, err: err ? err : u, _: faith, DBG });
          console.STAT && (ST = +new Date() - S2) > 9 && console.STAT(S2, ST, "got emit", Object.keys(graph || {}).length);
          graph = u;
        }, o, DBG && (DBG.r = DBG.r || {}));
        DBG && (DBG.sgd = +new Date());
        console.STAT && (ST = +new Date() - S2) > 9 && console.STAT(S2, ST, "get call");
        function each2(val, has2, a, b) {
          C++;
          if (!val) {
            return;
          }
          has2 = (key2 + has2).split(esc);
          var soul2 = has2.slice(0, 1)[0];
          has2 = has2.slice(-1)[0];
          if (o.limit && o.limit <= o.count) {
            return true;
          }
          var va, ve, so = soul2, ha = has2;
          if (typeof val != "string") {
            va = val[":"];
            ve = val[">"];
            (graph = graph || {})[so] = Gun2.state.ify(graph[so], ha, ve, va, so);
            o.count = (o.count || 0) + ((va || "").length || 9);
            return;
          }
          o.count = (o.count || 0) + val.length;
          var tmp2 = val.lastIndexOf(">");
          var state = Radisk.decode(val.slice(tmp2 + 1), null, esc);
          val = Radisk.decode(val.slice(0, tmp2), null, esc);
          (graph = graph || {})[soul2] = Gun2.state.ify(graph[soul2], has2, state, val, soul2);
        }
      });
      var val_is = Gun2.valid;
      (opt.store || {}).stats = { get: { time: {}, count: 0 }, put: { time: {}, count: 0 } };
      var statg = 0, statp = 0;
    });
  }
});

// node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/rfs.js
var require_rfs = __commonJS({
  "node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/rfs.js"(exports, module) {
    function Store(opt) {
      opt = opt || {};
      opt.log = opt.log || console.log;
      opt.file = String(opt.file || "radata");
      var fs = __require("fs"), u;
      var store = function Store2() {
      };
      if (Store[opt.file]) {
        console.log("Warning: reusing same fs store and options as 1st.");
        return Store[opt.file];
      }
      Store[opt.file] = store;
      var puts = {};
      store.put = function(file, data, cb) {
        var random = Math.random().toString(36).slice(-3);
        puts[file] = { id: random, data };
        var tmp = opt.file + "-" + file + "-" + random + ".tmp";
        fs.writeFile(tmp, data, function(err, ok) {
          if (err) {
            if (random === (puts[file] || "").id) {
              delete puts[file];
            }
            return cb(err);
          }
          move(tmp, opt.file + "/" + file, function(err2, ok2) {
            if (random === (puts[file] || "").id) {
              delete puts[file];
            }
            cb(err2, ok2 || !err2);
          });
        });
      };
      store.get = function(file, cb) {
        var tmp;
        if (tmp = puts[file]) {
          cb(u, tmp.data);
          return;
        }
        fs.readFile(opt.file + "/" + file, function(err, data) {
          if (err) {
            if ((err.code || "").toUpperCase() === "ENOENT") {
              return cb();
            }
            opt.log("ERROR:", err);
          }
          cb(err, data);
        });
      };
      if (!fs.existsSync(opt.file)) {
        fs.mkdirSync(opt.file);
      }
      function move(oldPath, newPath, cb) {
        fs.rename(oldPath, newPath, function(err) {
          if (err) {
            if (err.code === "EXDEV") {
              var readStream = fs.createReadStream(oldPath);
              var writeStream = fs.createWriteStream(newPath);
              readStream.on("error", cb);
              writeStream.on("error", cb);
              readStream.on("close", function() {
                fs.unlink(oldPath, cb);
              });
              readStream.pipe(writeStream);
            } else {
              cb(err);
            }
          } else {
            cb();
          }
        });
      }
      ;
      store.list = function(cb, match, params, cbs) {
        var dir = fs.readdirSync(opt.file);
        dir.forEach(function(file) {
          cb(file);
        });
        cb();
      };
      return store;
    }
    var Gun2 = typeof window !== "undefined" ? window.Gun : require_gun();
    Gun2.on("create", function(root) {
      this.to.next(root);
      var opt = root.opt;
      if (opt.rfs === false) {
        return;
      }
      opt.store = opt.store || !Gun2.window && Store(opt);
    });
    module.exports = Store;
  }
});

// node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/rfsmix.js
var require_rfsmix = __commonJS({
  "node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/rfsmix.js"(exports, module) {
    module.exports = function(opt, store) {
      var rfs = require_rfs()(opt);
      var p = store.put;
      var g = store.get;
      store.put = function(file, data, cb) {
        var a, b, c = function(err, ok) {
          if (b) {
            return cb(err || b);
          }
          if (a) {
            return cb(err, ok);
          }
          a = true;
          b = err;
        };
        p(file, data, c);
        rfs.put(file, data, c);
      };
      store.get = function(file, cb) {
        rfs.get(file, function(err, data) {
          if (data) {
            return cb(err, data);
          }
          g(file, cb);
        });
      };
      return store;
    };
  }
});

// node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/rs3.js
var require_rs3 = __commonJS({
  "node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/rs3.js"(exports, module) {
    var Gun2 = require_gun();
    var Radisk = require_radisk();
    var fs = __require("fs");
    var Radix = Radisk.Radix;
    var u;
    var AWS;
    Gun2.on("create", function(root) {
      this.to.next(root);
      var opt = root.opt;
      if (!opt.s3 && !process.env.AWS_S3_BUCKET) {
        return;
      }
      try {
        AWS = __require("aws-sdk");
      } catch (e2) {
        console.log("Please `npm install aws-sdk` or add it to your package.json !");
        AWS_SDK_NOT_INSTALLED;
      }
      var opts = opt.s3 || (opt.s3 = {});
      opts.bucket = opts.bucket || process.env.AWS_S3_BUCKET;
      opts.region = opts.region || process.env.AWS_REGION || "us-east-1";
      opts.accessKeyId = opts.key = opts.key || opts.accessKeyId || process.env.AWS_ACCESS_KEY_ID;
      opts.secretAccessKey = opts.secret = opts.secret || opts.secretAccessKey || process.env.AWS_SECRET_ACCESS_KEY;
      if (opt.fakes3 = opt.fakes3 || process.env.fakes3) {
        opts.endpoint = opt.fakes3;
        opts.sslEnabled = false;
        opts.bucket = opts.bucket.replace(".", "p");
      }
      opts.config = new AWS.Config(opts);
      opts.s3 = opts.s3 || new AWS.S3(opts.config);
      opt.store = Object.keys(opts.s3).length === 0 ? opt.store : Store(opt);
    });
    function Store(opt) {
      opt = opt || {};
      opt.file = String(opt.file || "radata");
      var opts = opt.s3, s3 = opts.s3;
      var c = { p: {}, g: {}, l: {} };
      var store = function Store2() {
      };
      if (Store[opt.file]) {
        console.log("Warning: reusing same S3 store and options as 1st.");
        return Store[opt.file];
      }
      Store[opt.file] = store;
      store.put = function(file, data, cb) {
        var params = { Bucket: opts.bucket, Key: file, Body: data };
        c.p[file] = data;
        delete c.g[file];
        delete c.l[1];
        s3.putObject(params, function(err, ok) {
          delete c.p[file];
          cb(err, "s3");
        });
      };
      store.get = function(file, cb) {
        var tmp;
        if (tmp = c.p[file]) {
          cb(u, tmp);
          return;
        }
        if (tmp = c.g[file]) {
          tmp.push(cb);
          return;
        }
        var cbs = c.g[file] = [cb];
        var params = { Bucket: opts.bucket, Key: file || "" };
        s3.getObject(params, function got(err, ack) {
          if (err && err.code === "NoSuchKey") {
            err = u;
          }
          delete c.g[file];
          var data, data = (ack || "").Body;
          var i2 = 0, cba;
          while (cba = cbs[i2++]) {
            cba && cba(err, data);
          }
        });
      };
      store.list = function(cb, match, params, cbs) {
        if (!cbs) {
          if (c.l[1]) {
            return c.l[1].push(cb);
          }
          cbs = c.l[1] = [cb];
        }
        params = params || { Bucket: opts.bucket };
        s3.listObjectsV2(params, function(err, data) {
          if (err) {
            return Gun2.log(err, err.stack);
          }
          var IT = data.IsTruncated, cbe = function(cb2) {
            if (cb2.end) {
              return;
            }
            if (Gun2.obj.map(data.Contents, function(content) {
              return cb2(content.Key);
            })) {
              cb2.end = true;
              return;
            }
            if (IT) {
              return;
            }
            cb2.end = true;
            cb2();
          };
          Gun2.obj.map(cbs, cbe);
          if (!IT) {
            Gun2.obj.del(c.l, 1);
            return;
          }
          params.ContinuationToken = data.NextContinuationToken;
          store.list(cb, match, params, cbs);
        });
      };
      if (opt.rfs !== false) {
        require_rfsmix()(opt, store);
      }
      return store;
    }
    module.exports = Store;
  }
});

// node_modules/.pnpm/ws@7.5.7/node_modules/ws/lib/constants.js
var require_constants = __commonJS({
  "node_modules/.pnpm/ws@7.5.7/node_modules/ws/lib/constants.js"(exports, module) {
    "use strict";
    module.exports = {
      BINARY_TYPES: ["nodebuffer", "arraybuffer", "fragments"],
      GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
      kStatusCode: Symbol("status-code"),
      kWebSocket: Symbol("websocket"),
      EMPTY_BUFFER: Buffer.alloc(0),
      NOOP: () => {
      }
    };
  }
});

// node_modules/.pnpm/ws@7.5.7/node_modules/ws/lib/buffer-util.js
var require_buffer_util = __commonJS({
  "node_modules/.pnpm/ws@7.5.7/node_modules/ws/lib/buffer-util.js"(exports, module) {
    "use strict";
    var { EMPTY_BUFFER } = require_constants();
    function concat(list, totalLength) {
      if (list.length === 0)
        return EMPTY_BUFFER;
      if (list.length === 1)
        return list[0];
      const target = Buffer.allocUnsafe(totalLength);
      let offset = 0;
      for (let i2 = 0; i2 < list.length; i2++) {
        const buf = list[i2];
        target.set(buf, offset);
        offset += buf.length;
      }
      if (offset < totalLength)
        return target.slice(0, offset);
      return target;
    }
    function _mask(source, mask, output, offset, length) {
      for (let i2 = 0; i2 < length; i2++) {
        output[offset + i2] = source[i2] ^ mask[i2 & 3];
      }
    }
    function _unmask(buffer, mask) {
      const length = buffer.length;
      for (let i2 = 0; i2 < length; i2++) {
        buffer[i2] ^= mask[i2 & 3];
      }
    }
    function toArrayBuffer(buf) {
      if (buf.byteLength === buf.buffer.byteLength) {
        return buf.buffer;
      }
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    }
    function toBuffer(data) {
      toBuffer.readOnly = true;
      if (Buffer.isBuffer(data))
        return data;
      let buf;
      if (data instanceof ArrayBuffer) {
        buf = Buffer.from(data);
      } else if (ArrayBuffer.isView(data)) {
        buf = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
      } else {
        buf = Buffer.from(data);
        toBuffer.readOnly = false;
      }
      return buf;
    }
    try {
      const bufferUtil = __require("bufferutil");
      const bu = bufferUtil.BufferUtil || bufferUtil;
      module.exports = {
        concat,
        mask(source, mask, output, offset, length) {
          if (length < 48)
            _mask(source, mask, output, offset, length);
          else
            bu.mask(source, mask, output, offset, length);
        },
        toArrayBuffer,
        toBuffer,
        unmask(buffer, mask) {
          if (buffer.length < 32)
            _unmask(buffer, mask);
          else
            bu.unmask(buffer, mask);
        }
      };
    } catch (e2) {
      module.exports = {
        concat,
        mask: _mask,
        toArrayBuffer,
        toBuffer,
        unmask: _unmask
      };
    }
  }
});

// node_modules/.pnpm/ws@7.5.7/node_modules/ws/lib/limiter.js
var require_limiter = __commonJS({
  "node_modules/.pnpm/ws@7.5.7/node_modules/ws/lib/limiter.js"(exports, module) {
    "use strict";
    var kDone = Symbol("kDone");
    var kRun = Symbol("kRun");
    var Limiter = class {
      constructor(concurrency) {
        this[kDone] = () => {
          this.pending--;
          this[kRun]();
        };
        this.concurrency = concurrency || Infinity;
        this.jobs = [];
        this.pending = 0;
      }
      add(job) {
        this.jobs.push(job);
        this[kRun]();
      }
      [kRun]() {
        if (this.pending === this.concurrency)
          return;
        if (this.jobs.length) {
          const job = this.jobs.shift();
          this.pending++;
          job(this[kDone]);
        }
      }
    };
    module.exports = Limiter;
  }
});

// node_modules/.pnpm/ws@7.5.7/node_modules/ws/lib/permessage-deflate.js
var require_permessage_deflate = __commonJS({
  "node_modules/.pnpm/ws@7.5.7/node_modules/ws/lib/permessage-deflate.js"(exports, module) {
    "use strict";
    var zlib2 = __require("zlib");
    var bufferUtil = require_buffer_util();
    var Limiter = require_limiter();
    var { kStatusCode, NOOP } = require_constants();
    var TRAILER = Buffer.from([0, 0, 255, 255]);
    var kPerMessageDeflate = Symbol("permessage-deflate");
    var kTotalLength = Symbol("total-length");
    var kCallback = Symbol("callback");
    var kBuffers = Symbol("buffers");
    var kError = Symbol("error");
    var zlibLimiter;
    var PerMessageDeflate = class {
      constructor(options, isServer, maxPayload) {
        this._maxPayload = maxPayload | 0;
        this._options = options || {};
        this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024;
        this._isServer = !!isServer;
        this._deflate = null;
        this._inflate = null;
        this.params = null;
        if (!zlibLimiter) {
          const concurrency = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
          zlibLimiter = new Limiter(concurrency);
        }
      }
      static get extensionName() {
        return "permessage-deflate";
      }
      offer() {
        const params = {};
        if (this._options.serverNoContextTakeover) {
          params.server_no_context_takeover = true;
        }
        if (this._options.clientNoContextTakeover) {
          params.client_no_context_takeover = true;
        }
        if (this._options.serverMaxWindowBits) {
          params.server_max_window_bits = this._options.serverMaxWindowBits;
        }
        if (this._options.clientMaxWindowBits) {
          params.client_max_window_bits = this._options.clientMaxWindowBits;
        } else if (this._options.clientMaxWindowBits == null) {
          params.client_max_window_bits = true;
        }
        return params;
      }
      accept(configurations) {
        configurations = this.normalizeParams(configurations);
        this.params = this._isServer ? this.acceptAsServer(configurations) : this.acceptAsClient(configurations);
        return this.params;
      }
      cleanup() {
        if (this._inflate) {
          this._inflate.close();
          this._inflate = null;
        }
        if (this._deflate) {
          const callback = this._deflate[kCallback];
          this._deflate.close();
          this._deflate = null;
          if (callback) {
            callback(new Error("The deflate stream was closed while data was being processed"));
          }
        }
      }
      acceptAsServer(offers) {
        const opts = this._options;
        const accepted = offers.find((params) => {
          if (opts.serverNoContextTakeover === false && params.server_no_context_takeover || params.server_max_window_bits && (opts.serverMaxWindowBits === false || typeof opts.serverMaxWindowBits === "number" && opts.serverMaxWindowBits > params.server_max_window_bits) || typeof opts.clientMaxWindowBits === "number" && !params.client_max_window_bits) {
            return false;
          }
          return true;
        });
        if (!accepted) {
          throw new Error("None of the extension offers can be accepted");
        }
        if (opts.serverNoContextTakeover) {
          accepted.server_no_context_takeover = true;
        }
        if (opts.clientNoContextTakeover) {
          accepted.client_no_context_takeover = true;
        }
        if (typeof opts.serverMaxWindowBits === "number") {
          accepted.server_max_window_bits = opts.serverMaxWindowBits;
        }
        if (typeof opts.clientMaxWindowBits === "number") {
          accepted.client_max_window_bits = opts.clientMaxWindowBits;
        } else if (accepted.client_max_window_bits === true || opts.clientMaxWindowBits === false) {
          delete accepted.client_max_window_bits;
        }
        return accepted;
      }
      acceptAsClient(response) {
        const params = response[0];
        if (this._options.clientNoContextTakeover === false && params.client_no_context_takeover) {
          throw new Error('Unexpected parameter "client_no_context_takeover"');
        }
        if (!params.client_max_window_bits) {
          if (typeof this._options.clientMaxWindowBits === "number") {
            params.client_max_window_bits = this._options.clientMaxWindowBits;
          }
        } else if (this._options.clientMaxWindowBits === false || typeof this._options.clientMaxWindowBits === "number" && params.client_max_window_bits > this._options.clientMaxWindowBits) {
          throw new Error('Unexpected or invalid parameter "client_max_window_bits"');
        }
        return params;
      }
      normalizeParams(configurations) {
        configurations.forEach((params) => {
          Object.keys(params).forEach((key2) => {
            let value = params[key2];
            if (value.length > 1) {
              throw new Error(`Parameter "${key2}" must have only a single value`);
            }
            value = value[0];
            if (key2 === "client_max_window_bits") {
              if (value !== true) {
                const num = +value;
                if (!Number.isInteger(num) || num < 8 || num > 15) {
                  throw new TypeError(`Invalid value for parameter "${key2}": ${value}`);
                }
                value = num;
              } else if (!this._isServer) {
                throw new TypeError(`Invalid value for parameter "${key2}": ${value}`);
              }
            } else if (key2 === "server_max_window_bits") {
              const num = +value;
              if (!Number.isInteger(num) || num < 8 || num > 15) {
                throw new TypeError(`Invalid value for parameter "${key2}": ${value}`);
              }
              value = num;
            } else if (key2 === "client_no_context_takeover" || key2 === "server_no_context_takeover") {
              if (value !== true) {
                throw new TypeError(`Invalid value for parameter "${key2}": ${value}`);
              }
            } else {
              throw new Error(`Unknown parameter "${key2}"`);
            }
            params[key2] = value;
          });
        });
        return configurations;
      }
      decompress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._decompress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      compress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._compress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      _decompress(data, fin, callback) {
        const endpoint = this._isServer ? "client" : "server";
        if (!this._inflate) {
          const key2 = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key2] !== "number" ? zlib2.Z_DEFAULT_WINDOWBITS : this.params[key2];
          this._inflate = zlib2.createInflateRaw(__spreadProps(__spreadValues({}, this._options.zlibInflateOptions), {
            windowBits
          }));
          this._inflate[kPerMessageDeflate] = this;
          this._inflate[kTotalLength] = 0;
          this._inflate[kBuffers] = [];
          this._inflate.on("error", inflateOnError);
          this._inflate.on("data", inflateOnData);
        }
        this._inflate[kCallback] = callback;
        this._inflate.write(data);
        if (fin)
          this._inflate.write(TRAILER);
        this._inflate.flush(() => {
          const err = this._inflate[kError];
          if (err) {
            this._inflate.close();
            this._inflate = null;
            callback(err);
            return;
          }
          const data2 = bufferUtil.concat(this._inflate[kBuffers], this._inflate[kTotalLength]);
          if (this._inflate._readableState.endEmitted) {
            this._inflate.close();
            this._inflate = null;
          } else {
            this._inflate[kTotalLength] = 0;
            this._inflate[kBuffers] = [];
            if (fin && this.params[`${endpoint}_no_context_takeover`]) {
              this._inflate.reset();
            }
          }
          callback(null, data2);
        });
      }
      _compress(data, fin, callback) {
        const endpoint = this._isServer ? "server" : "client";
        if (!this._deflate) {
          const key2 = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key2] !== "number" ? zlib2.Z_DEFAULT_WINDOWBITS : this.params[key2];
          this._deflate = zlib2.createDeflateRaw(__spreadProps(__spreadValues({}, this._options.zlibDeflateOptions), {
            windowBits
          }));
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          this._deflate.on("error", NOOP);
          this._deflate.on("data", deflateOnData);
        }
        this._deflate[kCallback] = callback;
        this._deflate.write(data);
        this._deflate.flush(zlib2.Z_SYNC_FLUSH, () => {
          if (!this._deflate) {
            return;
          }
          let data2 = bufferUtil.concat(this._deflate[kBuffers], this._deflate[kTotalLength]);
          if (fin)
            data2 = data2.slice(0, data2.length - 4);
          this._deflate[kCallback] = null;
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          if (fin && this.params[`${endpoint}_no_context_takeover`]) {
            this._deflate.reset();
          }
          callback(null, data2);
        });
      }
    };
    module.exports = PerMessageDeflate;
    function deflateOnData(chunk) {
      this[kBuffers].push(chunk);
      this[kTotalLength] += chunk.length;
    }
    function inflateOnData(chunk) {
      this[kTotalLength] += chunk.length;
      if (this[kPerMessageDeflate]._maxPayload < 1 || this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload) {
        this[kBuffers].push(chunk);
        return;
      }
      this[kError] = new RangeError("Max payload size exceeded");
      this[kError].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH";
      this[kError][kStatusCode] = 1009;
      this.removeListener("data", inflateOnData);
      this.reset();
    }
    function inflateOnError(err) {
      this[kPerMessageDeflate]._inflate = null;
      err[kStatusCode] = 1007;
      this[kCallback](err);
    }
  }
});

// node_modules/.pnpm/ws@7.5.7/node_modules/ws/lib/validation.js
var require_validation = __commonJS({
  "node_modules/.pnpm/ws@7.5.7/node_modules/ws/lib/validation.js"(exports, module) {
    "use strict";
    function isValidStatusCode(code) {
      return code >= 1e3 && code <= 1014 && code !== 1004 && code !== 1005 && code !== 1006 || code >= 3e3 && code <= 4999;
    }
    function _isValidUTF8(buf) {
      const len = buf.length;
      let i2 = 0;
      while (i2 < len) {
        if ((buf[i2] & 128) === 0) {
          i2++;
        } else if ((buf[i2] & 224) === 192) {
          if (i2 + 1 === len || (buf[i2 + 1] & 192) !== 128 || (buf[i2] & 254) === 192) {
            return false;
          }
          i2 += 2;
        } else if ((buf[i2] & 240) === 224) {
          if (i2 + 2 >= len || (buf[i2 + 1] & 192) !== 128 || (buf[i2 + 2] & 192) !== 128 || buf[i2] === 224 && (buf[i2 + 1] & 224) === 128 || buf[i2] === 237 && (buf[i2 + 1] & 224) === 160) {
            return false;
          }
          i2 += 3;
        } else if ((buf[i2] & 248) === 240) {
          if (i2 + 3 >= len || (buf[i2 + 1] & 192) !== 128 || (buf[i2 + 2] & 192) !== 128 || (buf[i2 + 3] & 192) !== 128 || buf[i2] === 240 && (buf[i2 + 1] & 240) === 128 || buf[i2] === 244 && buf[i2 + 1] > 143 || buf[i2] > 244) {
            return false;
          }
          i2 += 4;
        } else {
          return false;
        }
      }
      return true;
    }
    try {
      let isValidUTF8 = __require("utf-8-validate");
      if (typeof isValidUTF8 === "object") {
        isValidUTF8 = isValidUTF8.Validation.isValidUTF8;
      }
      module.exports = {
        isValidStatusCode,
        isValidUTF8(buf) {
          return buf.length < 150 ? _isValidUTF8(buf) : isValidUTF8(buf);
        }
      };
    } catch (e2) {
      module.exports = {
        isValidStatusCode,
        isValidUTF8: _isValidUTF8
      };
    }
  }
});

// node_modules/.pnpm/ws@7.5.7/node_modules/ws/lib/receiver.js
var require_receiver = __commonJS({
  "node_modules/.pnpm/ws@7.5.7/node_modules/ws/lib/receiver.js"(exports, module) {
    "use strict";
    var { Writable } = __require("stream");
    var PerMessageDeflate = require_permessage_deflate();
    var {
      BINARY_TYPES,
      EMPTY_BUFFER,
      kStatusCode,
      kWebSocket
    } = require_constants();
    var { concat, toArrayBuffer, unmask } = require_buffer_util();
    var { isValidStatusCode, isValidUTF8 } = require_validation();
    var GET_INFO = 0;
    var GET_PAYLOAD_LENGTH_16 = 1;
    var GET_PAYLOAD_LENGTH_64 = 2;
    var GET_MASK = 3;
    var GET_DATA = 4;
    var INFLATING = 5;
    var Receiver = class extends Writable {
      constructor(binaryType, extensions, isServer, maxPayload) {
        super();
        this._binaryType = binaryType || BINARY_TYPES[0];
        this[kWebSocket] = void 0;
        this._extensions = extensions || {};
        this._isServer = !!isServer;
        this._maxPayload = maxPayload | 0;
        this._bufferedBytes = 0;
        this._buffers = [];
        this._compressed = false;
        this._payloadLength = 0;
        this._mask = void 0;
        this._fragmented = 0;
        this._masked = false;
        this._fin = false;
        this._opcode = 0;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragments = [];
        this._state = GET_INFO;
        this._loop = false;
      }
      _write(chunk, encoding, cb) {
        if (this._opcode === 8 && this._state == GET_INFO)
          return cb();
        this._bufferedBytes += chunk.length;
        this._buffers.push(chunk);
        this.startLoop(cb);
      }
      consume(n) {
        this._bufferedBytes -= n;
        if (n === this._buffers[0].length)
          return this._buffers.shift();
        if (n < this._buffers[0].length) {
          const buf = this._buffers[0];
          this._buffers[0] = buf.slice(n);
          return buf.slice(0, n);
        }
        const dst = Buffer.allocUnsafe(n);
        do {
          const buf = this._buffers[0];
          const offset = dst.length - n;
          if (n >= buf.length) {
            dst.set(this._buffers.shift(), offset);
          } else {
            dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
            this._buffers[0] = buf.slice(n);
          }
          n -= buf.length;
        } while (n > 0);
        return dst;
      }
      startLoop(cb) {
        let err;
        this._loop = true;
        do {
          switch (this._state) {
            case GET_INFO:
              err = this.getInfo();
              break;
            case GET_PAYLOAD_LENGTH_16:
              err = this.getPayloadLength16();
              break;
            case GET_PAYLOAD_LENGTH_64:
              err = this.getPayloadLength64();
              break;
            case GET_MASK:
              this.getMask();
              break;
            case GET_DATA:
              err = this.getData(cb);
              break;
            default:
              this._loop = false;
              return;
          }
        } while (this._loop);
        cb(err);
      }
      getInfo() {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        const buf = this.consume(2);
        if ((buf[0] & 48) !== 0) {
          this._loop = false;
          return error2(RangeError, "RSV2 and RSV3 must be clear", true, 1002, "WS_ERR_UNEXPECTED_RSV_2_3");
        }
        const compressed = (buf[0] & 64) === 64;
        if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
          this._loop = false;
          return error2(RangeError, "RSV1 must be clear", true, 1002, "WS_ERR_UNEXPECTED_RSV_1");
        }
        this._fin = (buf[0] & 128) === 128;
        this._opcode = buf[0] & 15;
        this._payloadLength = buf[1] & 127;
        if (this._opcode === 0) {
          if (compressed) {
            this._loop = false;
            return error2(RangeError, "RSV1 must be clear", true, 1002, "WS_ERR_UNEXPECTED_RSV_1");
          }
          if (!this._fragmented) {
            this._loop = false;
            return error2(RangeError, "invalid opcode 0", true, 1002, "WS_ERR_INVALID_OPCODE");
          }
          this._opcode = this._fragmented;
        } else if (this._opcode === 1 || this._opcode === 2) {
          if (this._fragmented) {
            this._loop = false;
            return error2(RangeError, `invalid opcode ${this._opcode}`, true, 1002, "WS_ERR_INVALID_OPCODE");
          }
          this._compressed = compressed;
        } else if (this._opcode > 7 && this._opcode < 11) {
          if (!this._fin) {
            this._loop = false;
            return error2(RangeError, "FIN must be set", true, 1002, "WS_ERR_EXPECTED_FIN");
          }
          if (compressed) {
            this._loop = false;
            return error2(RangeError, "RSV1 must be clear", true, 1002, "WS_ERR_UNEXPECTED_RSV_1");
          }
          if (this._payloadLength > 125) {
            this._loop = false;
            return error2(RangeError, `invalid payload length ${this._payloadLength}`, true, 1002, "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");
          }
        } else {
          this._loop = false;
          return error2(RangeError, `invalid opcode ${this._opcode}`, true, 1002, "WS_ERR_INVALID_OPCODE");
        }
        if (!this._fin && !this._fragmented)
          this._fragmented = this._opcode;
        this._masked = (buf[1] & 128) === 128;
        if (this._isServer) {
          if (!this._masked) {
            this._loop = false;
            return error2(RangeError, "MASK must be set", true, 1002, "WS_ERR_EXPECTED_MASK");
          }
        } else if (this._masked) {
          this._loop = false;
          return error2(RangeError, "MASK must be clear", true, 1002, "WS_ERR_UNEXPECTED_MASK");
        }
        if (this._payloadLength === 126)
          this._state = GET_PAYLOAD_LENGTH_16;
        else if (this._payloadLength === 127)
          this._state = GET_PAYLOAD_LENGTH_64;
        else
          return this.haveLength();
      }
      getPayloadLength16() {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        this._payloadLength = this.consume(2).readUInt16BE(0);
        return this.haveLength();
      }
      getPayloadLength64() {
        if (this._bufferedBytes < 8) {
          this._loop = false;
          return;
        }
        const buf = this.consume(8);
        const num = buf.readUInt32BE(0);
        if (num > Math.pow(2, 53 - 32) - 1) {
          this._loop = false;
          return error2(RangeError, "Unsupported WebSocket frame: payload length > 2^53 - 1", false, 1009, "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");
        }
        this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
        return this.haveLength();
      }
      haveLength() {
        if (this._payloadLength && this._opcode < 8) {
          this._totalPayloadLength += this._payloadLength;
          if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
            this._loop = false;
            return error2(RangeError, "Max payload size exceeded", false, 1009, "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");
          }
        }
        if (this._masked)
          this._state = GET_MASK;
        else
          this._state = GET_DATA;
      }
      getMask() {
        if (this._bufferedBytes < 4) {
          this._loop = false;
          return;
        }
        this._mask = this.consume(4);
        this._state = GET_DATA;
      }
      getData(cb) {
        let data = EMPTY_BUFFER;
        if (this._payloadLength) {
          if (this._bufferedBytes < this._payloadLength) {
            this._loop = false;
            return;
          }
          data = this.consume(this._payloadLength);
          if (this._masked)
            unmask(data, this._mask);
        }
        if (this._opcode > 7)
          return this.controlMessage(data);
        if (this._compressed) {
          this._state = INFLATING;
          this.decompress(data, cb);
          return;
        }
        if (data.length) {
          this._messageLength = this._totalPayloadLength;
          this._fragments.push(data);
        }
        return this.dataMessage();
      }
      decompress(data, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        perMessageDeflate.decompress(data, this._fin, (err, buf) => {
          if (err)
            return cb(err);
          if (buf.length) {
            this._messageLength += buf.length;
            if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
              return cb(error2(RangeError, "Max payload size exceeded", false, 1009, "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"));
            }
            this._fragments.push(buf);
          }
          const er = this.dataMessage();
          if (er)
            return cb(er);
          this.startLoop(cb);
        });
      }
      dataMessage() {
        if (this._fin) {
          const messageLength = this._messageLength;
          const fragments = this._fragments;
          this._totalPayloadLength = 0;
          this._messageLength = 0;
          this._fragmented = 0;
          this._fragments = [];
          if (this._opcode === 2) {
            let data;
            if (this._binaryType === "nodebuffer") {
              data = concat(fragments, messageLength);
            } else if (this._binaryType === "arraybuffer") {
              data = toArrayBuffer(concat(fragments, messageLength));
            } else {
              data = fragments;
            }
            this.emit("message", data);
          } else {
            const buf = concat(fragments, messageLength);
            if (!isValidUTF8(buf)) {
              this._loop = false;
              return error2(Error, "invalid UTF-8 sequence", true, 1007, "WS_ERR_INVALID_UTF8");
            }
            this.emit("message", buf.toString());
          }
        }
        this._state = GET_INFO;
      }
      controlMessage(data) {
        if (this._opcode === 8) {
          this._loop = false;
          if (data.length === 0) {
            this.emit("conclude", 1005, "");
            this.end();
          } else if (data.length === 1) {
            return error2(RangeError, "invalid payload length 1", true, 1002, "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");
          } else {
            const code = data.readUInt16BE(0);
            if (!isValidStatusCode(code)) {
              return error2(RangeError, `invalid status code ${code}`, true, 1002, "WS_ERR_INVALID_CLOSE_CODE");
            }
            const buf = data.slice(2);
            if (!isValidUTF8(buf)) {
              return error2(Error, "invalid UTF-8 sequence", true, 1007, "WS_ERR_INVALID_UTF8");
            }
            this.emit("conclude", code, buf.toString());
            this.end();
          }
        } else if (this._opcode === 9) {
          this.emit("ping", data);
        } else {
          this.emit("pong", data);
        }
        this._state = GET_INFO;
      }
    };
    module.exports = Receiver;
    function error2(ErrorCtor, message, prefix, statusCode, errorCode) {
      const err = new ErrorCtor(prefix ? `Invalid WebSocket frame: ${message}` : message);
      Error.captureStackTrace(err, error2);
      err.code = errorCode;
      err[kStatusCode] = statusCode;
      return err;
    }
  }
});

// node_modules/.pnpm/ws@7.5.7/node_modules/ws/lib/sender.js
var require_sender = __commonJS({
  "node_modules/.pnpm/ws@7.5.7/node_modules/ws/lib/sender.js"(exports, module) {
    "use strict";
    var net = __require("net");
    var tls = __require("tls");
    var { randomFillSync } = __require("crypto");
    var PerMessageDeflate = require_permessage_deflate();
    var { EMPTY_BUFFER } = require_constants();
    var { isValidStatusCode } = require_validation();
    var { mask: applyMask, toBuffer } = require_buffer_util();
    var mask = Buffer.alloc(4);
    var Sender = class {
      constructor(socket, extensions) {
        this._extensions = extensions || {};
        this._socket = socket;
        this._firstFragment = true;
        this._compress = false;
        this._bufferedBytes = 0;
        this._deflating = false;
        this._queue = [];
      }
      static frame(data, options) {
        const merge = options.mask && options.readOnly;
        let offset = options.mask ? 6 : 2;
        let payloadLength = data.length;
        if (data.length >= 65536) {
          offset += 8;
          payloadLength = 127;
        } else if (data.length > 125) {
          offset += 2;
          payloadLength = 126;
        }
        const target = Buffer.allocUnsafe(merge ? data.length + offset : offset);
        target[0] = options.fin ? options.opcode | 128 : options.opcode;
        if (options.rsv1)
          target[0] |= 64;
        target[1] = payloadLength;
        if (payloadLength === 126) {
          target.writeUInt16BE(data.length, 2);
        } else if (payloadLength === 127) {
          target.writeUInt32BE(0, 2);
          target.writeUInt32BE(data.length, 6);
        }
        if (!options.mask)
          return [target, data];
        randomFillSync(mask, 0, 4);
        target[1] |= 128;
        target[offset - 4] = mask[0];
        target[offset - 3] = mask[1];
        target[offset - 2] = mask[2];
        target[offset - 1] = mask[3];
        if (merge) {
          applyMask(data, mask, target, offset, data.length);
          return [target];
        }
        applyMask(data, mask, data, 0, data.length);
        return [target, data];
      }
      close(code, data, mask2, cb) {
        let buf;
        if (code === void 0) {
          buf = EMPTY_BUFFER;
        } else if (typeof code !== "number" || !isValidStatusCode(code)) {
          throw new TypeError("First argument must be a valid error code number");
        } else if (data === void 0 || data === "") {
          buf = Buffer.allocUnsafe(2);
          buf.writeUInt16BE(code, 0);
        } else {
          const length = Buffer.byteLength(data);
          if (length > 123) {
            throw new RangeError("The message must not be greater than 123 bytes");
          }
          buf = Buffer.allocUnsafe(2 + length);
          buf.writeUInt16BE(code, 0);
          buf.write(data, 2);
        }
        if (this._deflating) {
          this.enqueue([this.doClose, buf, mask2, cb]);
        } else {
          this.doClose(buf, mask2, cb);
        }
      }
      doClose(data, mask2, cb) {
        this.sendFrame(Sender.frame(data, {
          fin: true,
          rsv1: false,
          opcode: 8,
          mask: mask2,
          readOnly: false
        }), cb);
      }
      ping(data, mask2, cb) {
        const buf = toBuffer(data);
        if (buf.length > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        if (this._deflating) {
          this.enqueue([this.doPing, buf, mask2, toBuffer.readOnly, cb]);
        } else {
          this.doPing(buf, mask2, toBuffer.readOnly, cb);
        }
      }
      doPing(data, mask2, readOnly, cb) {
        this.sendFrame(Sender.frame(data, {
          fin: true,
          rsv1: false,
          opcode: 9,
          mask: mask2,
          readOnly
        }), cb);
      }
      pong(data, mask2, cb) {
        const buf = toBuffer(data);
        if (buf.length > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        if (this._deflating) {
          this.enqueue([this.doPong, buf, mask2, toBuffer.readOnly, cb]);
        } else {
          this.doPong(buf, mask2, toBuffer.readOnly, cb);
        }
      }
      doPong(data, mask2, readOnly, cb) {
        this.sendFrame(Sender.frame(data, {
          fin: true,
          rsv1: false,
          opcode: 10,
          mask: mask2,
          readOnly
        }), cb);
      }
      send(data, options, cb) {
        const buf = toBuffer(data);
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        let opcode = options.binary ? 2 : 1;
        let rsv1 = options.compress;
        if (this._firstFragment) {
          this._firstFragment = false;
          if (rsv1 && perMessageDeflate) {
            rsv1 = buf.length >= perMessageDeflate._threshold;
          }
          this._compress = rsv1;
        } else {
          rsv1 = false;
          opcode = 0;
        }
        if (options.fin)
          this._firstFragment = true;
        if (perMessageDeflate) {
          const opts = {
            fin: options.fin,
            rsv1,
            opcode,
            mask: options.mask,
            readOnly: toBuffer.readOnly
          };
          if (this._deflating) {
            this.enqueue([this.dispatch, buf, this._compress, opts, cb]);
          } else {
            this.dispatch(buf, this._compress, opts, cb);
          }
        } else {
          this.sendFrame(Sender.frame(buf, {
            fin: options.fin,
            rsv1: false,
            opcode,
            mask: options.mask,
            readOnly: toBuffer.readOnly
          }), cb);
        }
      }
      dispatch(data, compress, options, cb) {
        if (!compress) {
          this.sendFrame(Sender.frame(data, options), cb);
          return;
        }
        const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
        this._bufferedBytes += data.length;
        this._deflating = true;
        perMessageDeflate.compress(data, options.fin, (_, buf) => {
          if (this._socket.destroyed) {
            const err = new Error("The socket was closed while data was being compressed");
            if (typeof cb === "function")
              cb(err);
            for (let i2 = 0; i2 < this._queue.length; i2++) {
              const callback = this._queue[i2][4];
              if (typeof callback === "function")
                callback(err);
            }
            return;
          }
          this._bufferedBytes -= data.length;
          this._deflating = false;
          options.readOnly = false;
          this.sendFrame(Sender.frame(buf, options), cb);
          this.dequeue();
        });
      }
      dequeue() {
        while (!this._deflating && this._queue.length) {
          const params = this._queue.shift();
          this._bufferedBytes -= params[1].length;
          Reflect.apply(params[0], this, params.slice(1));
        }
      }
      enqueue(params) {
        this._bufferedBytes += params[1].length;
        this._queue.push(params);
      }
      sendFrame(list, cb) {
        if (list.length === 2) {
          this._socket.cork();
          this._socket.write(list[0]);
          this._socket.write(list[1], cb);
          this._socket.uncork();
        } else {
          this._socket.write(list[0], cb);
        }
      }
    };
    module.exports = Sender;
  }
});

// node_modules/.pnpm/ws@7.5.7/node_modules/ws/lib/event-target.js
var require_event_target = __commonJS({
  "node_modules/.pnpm/ws@7.5.7/node_modules/ws/lib/event-target.js"(exports, module) {
    "use strict";
    var Event = class {
      constructor(type, target) {
        this.target = target;
        this.type = type;
      }
    };
    var MessageEvent = class extends Event {
      constructor(data, target) {
        super("message", target);
        this.data = data;
      }
    };
    var CloseEvent = class extends Event {
      constructor(code, reason, target) {
        super("close", target);
        this.wasClean = target._closeFrameReceived && target._closeFrameSent;
        this.reason = reason;
        this.code = code;
      }
    };
    var OpenEvent = class extends Event {
      constructor(target) {
        super("open", target);
      }
    };
    var ErrorEvent = class extends Event {
      constructor(error2, target) {
        super("error", target);
        this.message = error2.message;
        this.error = error2;
      }
    };
    var EventTarget = {
      addEventListener(type, listener, options) {
        if (typeof listener !== "function")
          return;
        function onMessage(data) {
          listener.call(this, new MessageEvent(data, this));
        }
        function onClose(code, message) {
          listener.call(this, new CloseEvent(code, message, this));
        }
        function onError(error2) {
          listener.call(this, new ErrorEvent(error2, this));
        }
        function onOpen() {
          listener.call(this, new OpenEvent(this));
        }
        const method = options && options.once ? "once" : "on";
        if (type === "message") {
          onMessage._listener = listener;
          this[method](type, onMessage);
        } else if (type === "close") {
          onClose._listener = listener;
          this[method](type, onClose);
        } else if (type === "error") {
          onError._listener = listener;
          this[method](type, onError);
        } else if (type === "open") {
          onOpen._listener = listener;
          this[method](type, onOpen);
        } else {
          this[method](type, listener);
        }
      },
      removeEventListener(type, listener) {
        const listeners = this.listeners(type);
        for (let i2 = 0; i2 < listeners.length; i2++) {
          if (listeners[i2] === listener || listeners[i2]._listener === listener) {
            this.removeListener(type, listeners[i2]);
          }
        }
      }
    };
    module.exports = EventTarget;
  }
});

// node_modules/.pnpm/ws@7.5.7/node_modules/ws/lib/extension.js
var require_extension = __commonJS({
  "node_modules/.pnpm/ws@7.5.7/node_modules/ws/lib/extension.js"(exports, module) {
    "use strict";
    var tokenChars = [
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
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0
    ];
    function push(dest, name, elem) {
      if (dest[name] === void 0)
        dest[name] = [elem];
      else
        dest[name].push(elem);
    }
    function parse2(header) {
      const offers = /* @__PURE__ */ Object.create(null);
      if (header === void 0 || header === "")
        return offers;
      let params = /* @__PURE__ */ Object.create(null);
      let mustUnescape = false;
      let isEscaping = false;
      let inQuotes = false;
      let extensionName;
      let paramName;
      let start = -1;
      let end = -1;
      let i2 = 0;
      for (; i2 < header.length; i2++) {
        const code = header.charCodeAt(i2);
        if (extensionName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1)
              start = i2;
          } else if (code === 32 || code === 9) {
            if (end === -1 && start !== -1)
              end = i2;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i2}`);
            }
            if (end === -1)
              end = i2;
            const name = header.slice(start, end);
            if (code === 44) {
              push(offers, name, params);
              params = /* @__PURE__ */ Object.create(null);
            } else {
              extensionName = name;
            }
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i2}`);
          }
        } else if (paramName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1)
              start = i2;
          } else if (code === 32 || code === 9) {
            if (end === -1 && start !== -1)
              end = i2;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i2}`);
            }
            if (end === -1)
              end = i2;
            push(params, header.slice(start, end), true);
            if (code === 44) {
              push(offers, extensionName, params);
              params = /* @__PURE__ */ Object.create(null);
              extensionName = void 0;
            }
            start = end = -1;
          } else if (code === 61 && start !== -1 && end === -1) {
            paramName = header.slice(start, i2);
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i2}`);
          }
        } else {
          if (isEscaping) {
            if (tokenChars[code] !== 1) {
              throw new SyntaxError(`Unexpected character at index ${i2}`);
            }
            if (start === -1)
              start = i2;
            else if (!mustUnescape)
              mustUnescape = true;
            isEscaping = false;
          } else if (inQuotes) {
            if (tokenChars[code] === 1) {
              if (start === -1)
                start = i2;
            } else if (code === 34 && start !== -1) {
              inQuotes = false;
              end = i2;
            } else if (code === 92) {
              isEscaping = true;
            } else {
              throw new SyntaxError(`Unexpected character at index ${i2}`);
            }
          } else if (code === 34 && header.charCodeAt(i2 - 1) === 61) {
            inQuotes = true;
          } else if (end === -1 && tokenChars[code] === 1) {
            if (start === -1)
              start = i2;
          } else if (start !== -1 && (code === 32 || code === 9)) {
            if (end === -1)
              end = i2;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i2}`);
            }
            if (end === -1)
              end = i2;
            let value = header.slice(start, end);
            if (mustUnescape) {
              value = value.replace(/\\/g, "");
              mustUnescape = false;
            }
            push(params, paramName, value);
            if (code === 44) {
              push(offers, extensionName, params);
              params = /* @__PURE__ */ Object.create(null);
              extensionName = void 0;
            }
            paramName = void 0;
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i2}`);
          }
        }
      }
      if (start === -1 || inQuotes) {
        throw new SyntaxError("Unexpected end of input");
      }
      if (end === -1)
        end = i2;
      const token = header.slice(start, end);
      if (extensionName === void 0) {
        push(offers, token, params);
      } else {
        if (paramName === void 0) {
          push(params, token, true);
        } else if (mustUnescape) {
          push(params, paramName, token.replace(/\\/g, ""));
        } else {
          push(params, paramName, token);
        }
        push(offers, extensionName, params);
      }
      return offers;
    }
    function format2(extensions) {
      return Object.keys(extensions).map((extension) => {
        let configurations = extensions[extension];
        if (!Array.isArray(configurations))
          configurations = [configurations];
        return configurations.map((params) => {
          return [extension].concat(Object.keys(params).map((k) => {
            let values = params[k];
            if (!Array.isArray(values))
              values = [values];
            return values.map((v) => v === true ? k : `${k}=${v}`).join("; ");
          })).join("; ");
        }).join(", ");
      }).join(", ");
    }
    module.exports = { format: format2, parse: parse2 };
  }
});

// node_modules/.pnpm/ws@7.5.7/node_modules/ws/lib/websocket.js
var require_websocket = __commonJS({
  "node_modules/.pnpm/ws@7.5.7/node_modules/ws/lib/websocket.js"(exports, module) {
    "use strict";
    var EventEmitter = __require("events");
    var https2 = __require("https");
    var http2 = __require("http");
    var net = __require("net");
    var tls = __require("tls");
    var { randomBytes, createHash } = __require("crypto");
    var { Readable: Readable2 } = __require("stream");
    var { URL: URL2 } = __require("url");
    var PerMessageDeflate = require_permessage_deflate();
    var Receiver = require_receiver();
    var Sender = require_sender();
    var {
      BINARY_TYPES,
      EMPTY_BUFFER,
      GUID,
      kStatusCode,
      kWebSocket,
      NOOP
    } = require_constants();
    var { addEventListener, removeEventListener } = require_event_target();
    var { format: format2, parse: parse2 } = require_extension();
    var { toBuffer } = require_buffer_util();
    var readyStates = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
    var protocolVersions = [8, 13];
    var closeTimeout = 30 * 1e3;
    var WebSocket = class extends EventEmitter {
      constructor(address, protocols, options) {
        super();
        this._binaryType = BINARY_TYPES[0];
        this._closeCode = 1006;
        this._closeFrameReceived = false;
        this._closeFrameSent = false;
        this._closeMessage = "";
        this._closeTimer = null;
        this._extensions = {};
        this._protocol = "";
        this._readyState = WebSocket.CONNECTING;
        this._receiver = null;
        this._sender = null;
        this._socket = null;
        if (address !== null) {
          this._bufferedAmount = 0;
          this._isServer = false;
          this._redirects = 0;
          if (Array.isArray(protocols)) {
            protocols = protocols.join(", ");
          } else if (typeof protocols === "object" && protocols !== null) {
            options = protocols;
            protocols = void 0;
          }
          initAsClient(this, address, protocols, options);
        } else {
          this._isServer = true;
        }
      }
      get binaryType() {
        return this._binaryType;
      }
      set binaryType(type) {
        if (!BINARY_TYPES.includes(type))
          return;
        this._binaryType = type;
        if (this._receiver)
          this._receiver._binaryType = type;
      }
      get bufferedAmount() {
        if (!this._socket)
          return this._bufferedAmount;
        return this._socket._writableState.length + this._sender._bufferedBytes;
      }
      get extensions() {
        return Object.keys(this._extensions).join();
      }
      get onclose() {
        return void 0;
      }
      set onclose(listener) {
      }
      get onerror() {
        return void 0;
      }
      set onerror(listener) {
      }
      get onopen() {
        return void 0;
      }
      set onopen(listener) {
      }
      get onmessage() {
        return void 0;
      }
      set onmessage(listener) {
      }
      get protocol() {
        return this._protocol;
      }
      get readyState() {
        return this._readyState;
      }
      get url() {
        return this._url;
      }
      setSocket(socket, head, maxPayload) {
        const receiver = new Receiver(this.binaryType, this._extensions, this._isServer, maxPayload);
        this._sender = new Sender(socket, this._extensions);
        this._receiver = receiver;
        this._socket = socket;
        receiver[kWebSocket] = this;
        socket[kWebSocket] = this;
        receiver.on("conclude", receiverOnConclude);
        receiver.on("drain", receiverOnDrain);
        receiver.on("error", receiverOnError);
        receiver.on("message", receiverOnMessage);
        receiver.on("ping", receiverOnPing);
        receiver.on("pong", receiverOnPong);
        socket.setTimeout(0);
        socket.setNoDelay();
        if (head.length > 0)
          socket.unshift(head);
        socket.on("close", socketOnClose);
        socket.on("data", socketOnData);
        socket.on("end", socketOnEnd);
        socket.on("error", socketOnError);
        this._readyState = WebSocket.OPEN;
        this.emit("open");
      }
      emitClose() {
        if (!this._socket) {
          this._readyState = WebSocket.CLOSED;
          this.emit("close", this._closeCode, this._closeMessage);
          return;
        }
        if (this._extensions[PerMessageDeflate.extensionName]) {
          this._extensions[PerMessageDeflate.extensionName].cleanup();
        }
        this._receiver.removeAllListeners();
        this._readyState = WebSocket.CLOSED;
        this.emit("close", this._closeCode, this._closeMessage);
      }
      close(code, data) {
        if (this.readyState === WebSocket.CLOSED)
          return;
        if (this.readyState === WebSocket.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          return abortHandshake(this, this._req, msg);
        }
        if (this.readyState === WebSocket.CLOSING) {
          if (this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted)) {
            this._socket.end();
          }
          return;
        }
        this._readyState = WebSocket.CLOSING;
        this._sender.close(code, data, !this._isServer, (err) => {
          if (err)
            return;
          this._closeFrameSent = true;
          if (this._closeFrameReceived || this._receiver._writableState.errorEmitted) {
            this._socket.end();
          }
        });
        this._closeTimer = setTimeout(this._socket.destroy.bind(this._socket), closeTimeout);
      }
      ping(data, mask, cb) {
        if (this.readyState === WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number")
          data = data.toString();
        if (this.readyState !== WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0)
          mask = !this._isServer;
        this._sender.ping(data || EMPTY_BUFFER, mask, cb);
      }
      pong(data, mask, cb) {
        if (this.readyState === WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number")
          data = data.toString();
        if (this.readyState !== WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0)
          mask = !this._isServer;
        this._sender.pong(data || EMPTY_BUFFER, mask, cb);
      }
      send(data, options, cb) {
        if (this.readyState === WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof options === "function") {
          cb = options;
          options = {};
        }
        if (typeof data === "number")
          data = data.toString();
        if (this.readyState !== WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        const opts = __spreadValues({
          binary: typeof data !== "string",
          mask: !this._isServer,
          compress: true,
          fin: true
        }, options);
        if (!this._extensions[PerMessageDeflate.extensionName]) {
          opts.compress = false;
        }
        this._sender.send(data || EMPTY_BUFFER, opts, cb);
      }
      terminate() {
        if (this.readyState === WebSocket.CLOSED)
          return;
        if (this.readyState === WebSocket.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          return abortHandshake(this, this._req, msg);
        }
        if (this._socket) {
          this._readyState = WebSocket.CLOSING;
          this._socket.destroy();
        }
      }
    };
    Object.defineProperty(WebSocket, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket.prototype, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket.prototype, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket.prototype, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    Object.defineProperty(WebSocket.prototype, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    [
      "binaryType",
      "bufferedAmount",
      "extensions",
      "protocol",
      "readyState",
      "url"
    ].forEach((property) => {
      Object.defineProperty(WebSocket.prototype, property, { enumerable: true });
    });
    ["open", "error", "close", "message"].forEach((method) => {
      Object.defineProperty(WebSocket.prototype, `on${method}`, {
        enumerable: true,
        get() {
          const listeners = this.listeners(method);
          for (let i2 = 0; i2 < listeners.length; i2++) {
            if (listeners[i2]._listener)
              return listeners[i2]._listener;
          }
          return void 0;
        },
        set(listener) {
          const listeners = this.listeners(method);
          for (let i2 = 0; i2 < listeners.length; i2++) {
            if (listeners[i2]._listener)
              this.removeListener(method, listeners[i2]);
          }
          this.addEventListener(method, listener);
        }
      });
    });
    WebSocket.prototype.addEventListener = addEventListener;
    WebSocket.prototype.removeEventListener = removeEventListener;
    module.exports = WebSocket;
    function initAsClient(websocket, address, protocols, options) {
      const opts = __spreadProps(__spreadValues({
        protocolVersion: protocolVersions[1],
        maxPayload: 100 * 1024 * 1024,
        perMessageDeflate: true,
        followRedirects: false,
        maxRedirects: 10
      }, options), {
        createConnection: void 0,
        socketPath: void 0,
        hostname: void 0,
        protocol: void 0,
        timeout: void 0,
        method: void 0,
        host: void 0,
        path: void 0,
        port: void 0
      });
      if (!protocolVersions.includes(opts.protocolVersion)) {
        throw new RangeError(`Unsupported protocol version: ${opts.protocolVersion} (supported versions: ${protocolVersions.join(", ")})`);
      }
      let parsedUrl;
      if (address instanceof URL2) {
        parsedUrl = address;
        websocket._url = address.href;
      } else {
        parsedUrl = new URL2(address);
        websocket._url = address;
      }
      const isUnixSocket = parsedUrl.protocol === "ws+unix:";
      if (!parsedUrl.host && (!isUnixSocket || !parsedUrl.pathname)) {
        const err = new Error(`Invalid URL: ${websocket.url}`);
        if (websocket._redirects === 0) {
          throw err;
        } else {
          emitErrorAndClose(websocket, err);
          return;
        }
      }
      const isSecure = parsedUrl.protocol === "wss:" || parsedUrl.protocol === "https:";
      const defaultPort = isSecure ? 443 : 80;
      const key2 = randomBytes(16).toString("base64");
      const get = isSecure ? https2.get : http2.get;
      let perMessageDeflate;
      opts.createConnection = isSecure ? tlsConnect : netConnect;
      opts.defaultPort = opts.defaultPort || defaultPort;
      opts.port = parsedUrl.port || defaultPort;
      opts.host = parsedUrl.hostname.startsWith("[") ? parsedUrl.hostname.slice(1, -1) : parsedUrl.hostname;
      opts.headers = __spreadValues({
        "Sec-WebSocket-Version": opts.protocolVersion,
        "Sec-WebSocket-Key": key2,
        Connection: "Upgrade",
        Upgrade: "websocket"
      }, opts.headers);
      opts.path = parsedUrl.pathname + parsedUrl.search;
      opts.timeout = opts.handshakeTimeout;
      if (opts.perMessageDeflate) {
        perMessageDeflate = new PerMessageDeflate(opts.perMessageDeflate !== true ? opts.perMessageDeflate : {}, false, opts.maxPayload);
        opts.headers["Sec-WebSocket-Extensions"] = format2({
          [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
        });
      }
      if (protocols) {
        opts.headers["Sec-WebSocket-Protocol"] = protocols;
      }
      if (opts.origin) {
        if (opts.protocolVersion < 13) {
          opts.headers["Sec-WebSocket-Origin"] = opts.origin;
        } else {
          opts.headers.Origin = opts.origin;
        }
      }
      if (parsedUrl.username || parsedUrl.password) {
        opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
      }
      if (isUnixSocket) {
        const parts = opts.path.split(":");
        opts.socketPath = parts[0];
        opts.path = parts[1];
      }
      if (opts.followRedirects) {
        if (websocket._redirects === 0) {
          websocket._originalHost = parsedUrl.host;
          const headers = options && options.headers;
          options = __spreadProps(__spreadValues({}, options), { headers: {} });
          if (headers) {
            for (const [key3, value] of Object.entries(headers)) {
              options.headers[key3.toLowerCase()] = value;
            }
          }
        } else if (parsedUrl.host !== websocket._originalHost) {
          delete opts.headers.authorization;
          delete opts.headers.cookie;
          delete opts.headers.host;
          opts.auth = void 0;
        }
        if (opts.auth && !options.headers.authorization) {
          options.headers.authorization = "Basic " + Buffer.from(opts.auth).toString("base64");
        }
      }
      let req = websocket._req = get(opts);
      if (opts.timeout) {
        req.on("timeout", () => {
          abortHandshake(websocket, req, "Opening handshake has timed out");
        });
      }
      req.on("error", (err) => {
        if (req === null || req.aborted)
          return;
        req = websocket._req = null;
        emitErrorAndClose(websocket, err);
      });
      req.on("response", (res) => {
        const location2 = res.headers.location;
        const statusCode = res.statusCode;
        if (location2 && opts.followRedirects && statusCode >= 300 && statusCode < 400) {
          if (++websocket._redirects > opts.maxRedirects) {
            abortHandshake(websocket, req, "Maximum redirects exceeded");
            return;
          }
          req.abort();
          let addr;
          try {
            addr = new URL2(location2, address);
          } catch (err) {
            emitErrorAndClose(websocket, err);
            return;
          }
          initAsClient(websocket, addr, protocols, options);
        } else if (!websocket.emit("unexpected-response", req, res)) {
          abortHandshake(websocket, req, `Unexpected server response: ${res.statusCode}`);
        }
      });
      req.on("upgrade", (res, socket, head) => {
        websocket.emit("upgrade", res);
        if (websocket.readyState !== WebSocket.CONNECTING)
          return;
        req = websocket._req = null;
        const digest = createHash("sha1").update(key2 + GUID).digest("base64");
        if (res.headers["sec-websocket-accept"] !== digest) {
          abortHandshake(websocket, socket, "Invalid Sec-WebSocket-Accept header");
          return;
        }
        const serverProt = res.headers["sec-websocket-protocol"];
        const protList = (protocols || "").split(/, */);
        let protError;
        if (!protocols && serverProt) {
          protError = "Server sent a subprotocol but none was requested";
        } else if (protocols && !serverProt) {
          protError = "Server sent no subprotocol";
        } else if (serverProt && !protList.includes(serverProt)) {
          protError = "Server sent an invalid subprotocol";
        }
        if (protError) {
          abortHandshake(websocket, socket, protError);
          return;
        }
        if (serverProt)
          websocket._protocol = serverProt;
        const secWebSocketExtensions = res.headers["sec-websocket-extensions"];
        if (secWebSocketExtensions !== void 0) {
          if (!perMessageDeflate) {
            const message = "Server sent a Sec-WebSocket-Extensions header but no extension was requested";
            abortHandshake(websocket, socket, message);
            return;
          }
          let extensions;
          try {
            extensions = parse2(secWebSocketExtensions);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Extensions header";
            abortHandshake(websocket, socket, message);
            return;
          }
          const extensionNames = Object.keys(extensions);
          if (extensionNames.length) {
            if (extensionNames.length !== 1 || extensionNames[0] !== PerMessageDeflate.extensionName) {
              const message = "Server indicated an extension that was not requested";
              abortHandshake(websocket, socket, message);
              return;
            }
            try {
              perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
            } catch (err) {
              const message = "Invalid Sec-WebSocket-Extensions header";
              abortHandshake(websocket, socket, message);
              return;
            }
            websocket._extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
          }
        }
        websocket.setSocket(socket, head, opts.maxPayload);
      });
    }
    function emitErrorAndClose(websocket, err) {
      websocket._readyState = WebSocket.CLOSING;
      websocket.emit("error", err);
      websocket.emitClose();
    }
    function netConnect(options) {
      options.path = options.socketPath;
      return net.connect(options);
    }
    function tlsConnect(options) {
      options.path = void 0;
      if (!options.servername && options.servername !== "") {
        options.servername = net.isIP(options.host) ? "" : options.host;
      }
      return tls.connect(options);
    }
    function abortHandshake(websocket, stream, message) {
      websocket._readyState = WebSocket.CLOSING;
      const err = new Error(message);
      Error.captureStackTrace(err, abortHandshake);
      if (stream.setHeader) {
        stream.abort();
        if (stream.socket && !stream.socket.destroyed) {
          stream.socket.destroy();
        }
        stream.once("abort", websocket.emitClose.bind(websocket));
        websocket.emit("error", err);
      } else {
        stream.destroy(err);
        stream.once("error", websocket.emit.bind(websocket, "error"));
        stream.once("close", websocket.emitClose.bind(websocket));
      }
    }
    function sendAfterClose(websocket, data, cb) {
      if (data) {
        const length = toBuffer(data).length;
        if (websocket._socket)
          websocket._sender._bufferedBytes += length;
        else
          websocket._bufferedAmount += length;
      }
      if (cb) {
        const err = new Error(`WebSocket is not open: readyState ${websocket.readyState} (${readyStates[websocket.readyState]})`);
        cb(err);
      }
    }
    function receiverOnConclude(code, reason) {
      const websocket = this[kWebSocket];
      websocket._closeFrameReceived = true;
      websocket._closeMessage = reason;
      websocket._closeCode = code;
      if (websocket._socket[kWebSocket] === void 0)
        return;
      websocket._socket.removeListener("data", socketOnData);
      process.nextTick(resume, websocket._socket);
      if (code === 1005)
        websocket.close();
      else
        websocket.close(code, reason);
    }
    function receiverOnDrain() {
      this[kWebSocket]._socket.resume();
    }
    function receiverOnError(err) {
      const websocket = this[kWebSocket];
      if (websocket._socket[kWebSocket] !== void 0) {
        websocket._socket.removeListener("data", socketOnData);
        process.nextTick(resume, websocket._socket);
        websocket.close(err[kStatusCode]);
      }
      websocket.emit("error", err);
    }
    function receiverOnFinish() {
      this[kWebSocket].emitClose();
    }
    function receiverOnMessage(data) {
      this[kWebSocket].emit("message", data);
    }
    function receiverOnPing(data) {
      const websocket = this[kWebSocket];
      websocket.pong(data, !websocket._isServer, NOOP);
      websocket.emit("ping", data);
    }
    function receiverOnPong(data) {
      this[kWebSocket].emit("pong", data);
    }
    function resume(stream) {
      stream.resume();
    }
    function socketOnClose() {
      const websocket = this[kWebSocket];
      this.removeListener("close", socketOnClose);
      this.removeListener("data", socketOnData);
      this.removeListener("end", socketOnEnd);
      websocket._readyState = WebSocket.CLOSING;
      let chunk;
      if (!this._readableState.endEmitted && !websocket._closeFrameReceived && !websocket._receiver._writableState.errorEmitted && (chunk = websocket._socket.read()) !== null) {
        websocket._receiver.write(chunk);
      }
      websocket._receiver.end();
      this[kWebSocket] = void 0;
      clearTimeout(websocket._closeTimer);
      if (websocket._receiver._writableState.finished || websocket._receiver._writableState.errorEmitted) {
        websocket.emitClose();
      } else {
        websocket._receiver.on("error", receiverOnFinish);
        websocket._receiver.on("finish", receiverOnFinish);
      }
    }
    function socketOnData(chunk) {
      if (!this[kWebSocket]._receiver.write(chunk)) {
        this.pause();
      }
    }
    function socketOnEnd() {
      const websocket = this[kWebSocket];
      websocket._readyState = WebSocket.CLOSING;
      websocket._receiver.end();
      this.end();
    }
    function socketOnError() {
      const websocket = this[kWebSocket];
      this.removeListener("error", socketOnError);
      this.on("error", NOOP);
      if (websocket) {
        websocket._readyState = WebSocket.CLOSING;
        this.destroy();
      }
    }
  }
});

// node_modules/.pnpm/ws@7.5.7/node_modules/ws/lib/stream.js
var require_stream = __commonJS({
  "node_modules/.pnpm/ws@7.5.7/node_modules/ws/lib/stream.js"(exports, module) {
    "use strict";
    var { Duplex } = __require("stream");
    function emitClose(stream) {
      stream.emit("close");
    }
    function duplexOnEnd() {
      if (!this.destroyed && this._writableState.finished) {
        this.destroy();
      }
    }
    function duplexOnError(err) {
      this.removeListener("error", duplexOnError);
      this.destroy();
      if (this.listenerCount("error") === 0) {
        this.emit("error", err);
      }
    }
    function createWebSocketStream(ws, options) {
      let resumeOnReceiverDrain = true;
      let terminateOnDestroy = true;
      function receiverOnDrain() {
        if (resumeOnReceiverDrain)
          ws._socket.resume();
      }
      if (ws.readyState === ws.CONNECTING) {
        ws.once("open", function open() {
          ws._receiver.removeAllListeners("drain");
          ws._receiver.on("drain", receiverOnDrain);
        });
      } else {
        ws._receiver.removeAllListeners("drain");
        ws._receiver.on("drain", receiverOnDrain);
      }
      const duplex = new Duplex(__spreadProps(__spreadValues({}, options), {
        autoDestroy: false,
        emitClose: false,
        objectMode: false,
        writableObjectMode: false
      }));
      ws.on("message", function message(msg) {
        if (!duplex.push(msg)) {
          resumeOnReceiverDrain = false;
          ws._socket.pause();
        }
      });
      ws.once("error", function error2(err) {
        if (duplex.destroyed)
          return;
        terminateOnDestroy = false;
        duplex.destroy(err);
      });
      ws.once("close", function close() {
        if (duplex.destroyed)
          return;
        duplex.push(null);
      });
      duplex._destroy = function(err, callback) {
        if (ws.readyState === ws.CLOSED) {
          callback(err);
          process.nextTick(emitClose, duplex);
          return;
        }
        let called = false;
        ws.once("error", function error2(err2) {
          called = true;
          callback(err2);
        });
        ws.once("close", function close() {
          if (!called)
            callback(err);
          process.nextTick(emitClose, duplex);
        });
        if (terminateOnDestroy)
          ws.terminate();
      };
      duplex._final = function(callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._final(callback);
          });
          return;
        }
        if (ws._socket === null)
          return;
        if (ws._socket._writableState.finished) {
          callback();
          if (duplex._readableState.endEmitted)
            duplex.destroy();
        } else {
          ws._socket.once("finish", function finish() {
            callback();
          });
          ws.close();
        }
      };
      duplex._read = function() {
        if ((ws.readyState === ws.OPEN || ws.readyState === ws.CLOSING) && !resumeOnReceiverDrain) {
          resumeOnReceiverDrain = true;
          if (!ws._receiver._writableState.needDrain)
            ws._socket.resume();
        }
      };
      duplex._write = function(chunk, encoding, callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._write(chunk, encoding, callback);
          });
          return;
        }
        ws.send(chunk, callback);
      };
      duplex.on("end", duplexOnEnd);
      duplex.on("error", duplexOnError);
      return duplex;
    }
    module.exports = createWebSocketStream;
  }
});

// node_modules/.pnpm/ws@7.5.7/node_modules/ws/lib/websocket-server.js
var require_websocket_server = __commonJS({
  "node_modules/.pnpm/ws@7.5.7/node_modules/ws/lib/websocket-server.js"(exports, module) {
    "use strict";
    var EventEmitter = __require("events");
    var http2 = __require("http");
    var https2 = __require("https");
    var net = __require("net");
    var tls = __require("tls");
    var { createHash } = __require("crypto");
    var PerMessageDeflate = require_permessage_deflate();
    var WebSocket = require_websocket();
    var { format: format2, parse: parse2 } = require_extension();
    var { GUID, kWebSocket } = require_constants();
    var keyRegex = /^[+/0-9A-Za-z]{22}==$/;
    var RUNNING = 0;
    var CLOSING = 1;
    var CLOSED = 2;
    var WebSocketServer = class extends EventEmitter {
      constructor(options, callback) {
        super();
        options = __spreadValues({
          maxPayload: 100 * 1024 * 1024,
          perMessageDeflate: false,
          handleProtocols: null,
          clientTracking: true,
          verifyClient: null,
          noServer: false,
          backlog: null,
          server: null,
          host: null,
          path: null,
          port: null
        }, options);
        if (options.port == null && !options.server && !options.noServer || options.port != null && (options.server || options.noServer) || options.server && options.noServer) {
          throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');
        }
        if (options.port != null) {
          this._server = http2.createServer((req, res) => {
            const body = http2.STATUS_CODES[426];
            res.writeHead(426, {
              "Content-Length": body.length,
              "Content-Type": "text/plain"
            });
            res.end(body);
          });
          this._server.listen(options.port, options.host, options.backlog, callback);
        } else if (options.server) {
          this._server = options.server;
        }
        if (this._server) {
          const emitConnection = this.emit.bind(this, "connection");
          this._removeListeners = addListeners(this._server, {
            listening: this.emit.bind(this, "listening"),
            error: this.emit.bind(this, "error"),
            upgrade: (req, socket, head) => {
              this.handleUpgrade(req, socket, head, emitConnection);
            }
          });
        }
        if (options.perMessageDeflate === true)
          options.perMessageDeflate = {};
        if (options.clientTracking)
          this.clients = /* @__PURE__ */ new Set();
        this.options = options;
        this._state = RUNNING;
      }
      address() {
        if (this.options.noServer) {
          throw new Error('The server is operating in "noServer" mode');
        }
        if (!this._server)
          return null;
        return this._server.address();
      }
      close(cb) {
        if (cb)
          this.once("close", cb);
        if (this._state === CLOSED) {
          process.nextTick(emitClose, this);
          return;
        }
        if (this._state === CLOSING)
          return;
        this._state = CLOSING;
        if (this.clients) {
          for (const client of this.clients)
            client.terminate();
        }
        const server2 = this._server;
        if (server2) {
          this._removeListeners();
          this._removeListeners = this._server = null;
          if (this.options.port != null) {
            server2.close(emitClose.bind(void 0, this));
            return;
          }
        }
        process.nextTick(emitClose, this);
      }
      shouldHandle(req) {
        if (this.options.path) {
          const index = req.url.indexOf("?");
          const pathname = index !== -1 ? req.url.slice(0, index) : req.url;
          if (pathname !== this.options.path)
            return false;
        }
        return true;
      }
      handleUpgrade(req, socket, head, cb) {
        socket.on("error", socketOnError);
        const key2 = req.headers["sec-websocket-key"] !== void 0 ? req.headers["sec-websocket-key"].trim() : false;
        const version = +req.headers["sec-websocket-version"];
        const extensions = {};
        if (req.method !== "GET" || req.headers.upgrade.toLowerCase() !== "websocket" || !key2 || !keyRegex.test(key2) || version !== 8 && version !== 13 || !this.shouldHandle(req)) {
          return abortHandshake(socket, 400);
        }
        if (this.options.perMessageDeflate) {
          const perMessageDeflate = new PerMessageDeflate(this.options.perMessageDeflate, true, this.options.maxPayload);
          try {
            const offers = parse2(req.headers["sec-websocket-extensions"]);
            if (offers[PerMessageDeflate.extensionName]) {
              perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
              extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
            }
          } catch (err) {
            return abortHandshake(socket, 400);
          }
        }
        if (this.options.verifyClient) {
          const info = {
            origin: req.headers[`${version === 8 ? "sec-websocket-origin" : "origin"}`],
            secure: !!(req.socket.authorized || req.socket.encrypted),
            req
          };
          if (this.options.verifyClient.length === 2) {
            this.options.verifyClient(info, (verified, code, message, headers) => {
              if (!verified) {
                return abortHandshake(socket, code || 401, message, headers);
              }
              this.completeUpgrade(key2, extensions, req, socket, head, cb);
            });
            return;
          }
          if (!this.options.verifyClient(info))
            return abortHandshake(socket, 401);
        }
        this.completeUpgrade(key2, extensions, req, socket, head, cb);
      }
      completeUpgrade(key2, extensions, req, socket, head, cb) {
        if (!socket.readable || !socket.writable)
          return socket.destroy();
        if (socket[kWebSocket]) {
          throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");
        }
        if (this._state > RUNNING)
          return abortHandshake(socket, 503);
        const digest = createHash("sha1").update(key2 + GUID).digest("base64");
        const headers = [
          "HTTP/1.1 101 Switching Protocols",
          "Upgrade: websocket",
          "Connection: Upgrade",
          `Sec-WebSocket-Accept: ${digest}`
        ];
        const ws = new WebSocket(null);
        let protocol = req.headers["sec-websocket-protocol"];
        if (protocol) {
          protocol = protocol.split(",").map(trim);
          if (this.options.handleProtocols) {
            protocol = this.options.handleProtocols(protocol, req);
          } else {
            protocol = protocol[0];
          }
          if (protocol) {
            headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
            ws._protocol = protocol;
          }
        }
        if (extensions[PerMessageDeflate.extensionName]) {
          const params = extensions[PerMessageDeflate.extensionName].params;
          const value = format2({
            [PerMessageDeflate.extensionName]: [params]
          });
          headers.push(`Sec-WebSocket-Extensions: ${value}`);
          ws._extensions = extensions;
        }
        this.emit("headers", headers, req);
        socket.write(headers.concat("\r\n").join("\r\n"));
        socket.removeListener("error", socketOnError);
        ws.setSocket(socket, head, this.options.maxPayload);
        if (this.clients) {
          this.clients.add(ws);
          ws.on("close", () => this.clients.delete(ws));
        }
        cb(ws, req);
      }
    };
    module.exports = WebSocketServer;
    function addListeners(server2, map) {
      for (const event of Object.keys(map))
        server2.on(event, map[event]);
      return function removeListeners() {
        for (const event of Object.keys(map)) {
          server2.removeListener(event, map[event]);
        }
      };
    }
    function emitClose(server2) {
      server2._state = CLOSED;
      server2.emit("close");
    }
    function socketOnError() {
      this.destroy();
    }
    function abortHandshake(socket, code, message, headers) {
      if (socket.writable) {
        message = message || http2.STATUS_CODES[code];
        headers = __spreadValues({
          Connection: "close",
          "Content-Type": "text/html",
          "Content-Length": Buffer.byteLength(message)
        }, headers);
        socket.write(`HTTP/1.1 ${code} ${http2.STATUS_CODES[code]}\r
` + Object.keys(headers).map((h2) => `${h2}: ${headers[h2]}`).join("\r\n") + "\r\n\r\n" + message);
      }
      socket.removeListener("error", socketOnError);
      socket.destroy();
    }
    function trim(str) {
      return str.trim();
    }
  }
});

// node_modules/.pnpm/ws@7.5.7/node_modules/ws/index.js
var require_ws = __commonJS({
  "node_modules/.pnpm/ws@7.5.7/node_modules/ws/index.js"(exports, module) {
    "use strict";
    var WebSocket = require_websocket();
    WebSocket.createWebSocketStream = require_stream();
    WebSocket.Server = require_websocket_server();
    WebSocket.Receiver = require_receiver();
    WebSocket.Sender = require_sender();
    module.exports = WebSocket;
  }
});

// node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/wire.js
var require_wire = __commonJS({
  "node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/wire.js"() {
    var Gun2 = require_gun();
    Gun2.on("opt", function(root) {
      var opt = root.opt;
      if (opt.ws === false || opt.once) {
        this.to.next(root);
        return;
      }
      var url = __require("url");
      opt.mesh = opt.mesh || Gun2.Mesh(root);
      opt.WebSocket = opt.WebSocket || require_ws();
      var ws = opt.ws = opt.ws || {};
      ws.path = ws.path || "/gun";
      if (!ws.noServer) {
        ws.server = ws.server || opt.web;
        if (!ws.server) {
          this.to.next(root);
          return;
        }
      }
      ws.web = ws.web || new opt.WebSocket.Server(ws);
      ws.web.on("connection", function(wire, req) {
        var peer;
        wire.headers = wire.headers || (req || "").headers || "";
        console.STAT && ((console.STAT.sites || (console.STAT.sites = {}))[wire.headers.origin] = 1);
        opt.mesh.hi(peer = { wire });
        wire.on("message", function(msg) {
          opt.mesh.hear(msg.data || msg, peer);
        });
        wire.on("close", function() {
          opt.mesh.bye(peer);
        });
        wire.on("error", function(e2) {
        });
        setTimeout(function heart() {
          if (!opt.peers[peer.id]) {
            return;
          }
          try {
            wire.send("[]");
          } catch (e2) {
          }
          ;
          setTimeout(heart, 1e3 * 20);
        }, 1e3 * 20);
      });
      this.to.next(root);
    });
  }
});

// node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/sea.js
var require_sea = __commonJS({
  "node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/sea.js"(exports, module) {
    (function() {
      function USE(arg, req) {
        return req ? __require(arg) : arg.slice ? USE[R(arg)] : function(mod, path2) {
          arg(mod = { exports: {} });
          USE[R(path2)] = mod.exports;
        };
        function R(p) {
          return p.split("/").slice(-1).toString().replace(".js", "");
        }
      }
      if (typeof module !== "undefined") {
        var MODULE = module;
      }
      ;
      USE(function(module2) {
        if (typeof window !== "undefined") {
          module2.window = window;
        }
        var tmp = module2.window || module2, u;
        var SEA = tmp.SEA || {};
        if (SEA.window = module2.window) {
          SEA.window.SEA = SEA;
        }
        try {
          if (u + "" !== typeof MODULE) {
            MODULE.exports = SEA;
          }
        } catch (e2) {
        }
        module2.exports = SEA;
      })(USE, "./root");
      ;
      USE(function(module2) {
        var SEA = USE("./root");
        try {
          if (SEA.window) {
            if (location.protocol.indexOf("s") < 0 && location.host.indexOf("localhost") < 0 && !/^127\.\d+\.\d+\.\d+$/.test(location.hostname) && location.protocol.indexOf("file:") < 0) {
              console.warn("HTTPS needed for WebCrypto in SEA, redirecting...");
              location.protocol = "https:";
            }
          }
        } catch (e2) {
        }
      })(USE, "./https");
      ;
      USE(function(module2) {
        var u;
        if (u + "" == typeof btoa) {
          if (u + "" == typeof Buffer) {
            try {
              global.Buffer = USE("buffer", 1).Buffer;
            } catch (e2) {
              console.log("Please `npm install buffer` or add it to your package.json !");
            }
          }
          global.btoa = function(data) {
            return Buffer.from(data, "binary").toString("base64");
          };
          global.atob = function(data) {
            return Buffer.from(data, "base64").toString("binary");
          };
        }
      })(USE, "./base64");
      ;
      USE(function(module2) {
        USE("./base64");
        function SeaArray() {
        }
        Object.assign(SeaArray, { from: Array.from });
        SeaArray.prototype = Object.create(Array.prototype);
        SeaArray.prototype.toString = function(enc, start, end) {
          enc = enc || "utf8";
          start = start || 0;
          const length = this.length;
          if (enc === "hex") {
            const buf = new Uint8Array(this);
            return [...Array((end && end + 1 || length) - start).keys()].map((i2) => buf[i2 + start].toString(16).padStart(2, "0")).join("");
          }
          if (enc === "utf8") {
            return Array.from({ length: (end || length) - start }, (_, i2) => String.fromCharCode(this[i2 + start])).join("");
          }
          if (enc === "base64") {
            return btoa(this);
          }
        };
        module2.exports = SeaArray;
      })(USE, "./array");
      ;
      USE(function(module2) {
        USE("./base64");
        var SeaArray = USE("./array");
        function SafeBuffer(...props) {
          console.warn("new SafeBuffer() is depreciated, please use SafeBuffer.from()");
          return SafeBuffer.from(...props);
        }
        SafeBuffer.prototype = Object.create(Array.prototype);
        Object.assign(SafeBuffer, {
          from() {
            if (!Object.keys(arguments).length || arguments[0] == null) {
              throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
            }
            const input = arguments[0];
            let buf;
            if (typeof input === "string") {
              const enc = arguments[1] || "utf8";
              if (enc === "hex") {
                const bytes = input.match(/([\da-fA-F]{2})/g).map((byte) => parseInt(byte, 16));
                if (!bytes || !bytes.length) {
                  throw new TypeError("Invalid first argument for type 'hex'.");
                }
                buf = SeaArray.from(bytes);
              } else if (enc === "utf8" || enc === "binary") {
                const length2 = input.length;
                const words = new Uint16Array(length2);
                Array.from({ length: length2 }, (_, i2) => words[i2] = input.charCodeAt(i2));
                buf = SeaArray.from(words);
              } else if (enc === "base64") {
                const dec = atob(input);
                const length2 = dec.length;
                const bytes = new Uint8Array(length2);
                Array.from({ length: length2 }, (_, i2) => bytes[i2] = dec.charCodeAt(i2));
                buf = SeaArray.from(bytes);
              } else if (enc === "binary") {
                buf = SeaArray.from(input);
              } else {
                console.info("SafeBuffer.from unknown encoding: " + enc);
              }
              return buf;
            }
            const byteLength = input.byteLength;
            const length = input.byteLength ? input.byteLength : input.length;
            if (length) {
              let buf2;
              if (input instanceof ArrayBuffer) {
                buf2 = new Uint8Array(input);
              }
              return SeaArray.from(buf2 || input);
            }
          },
          alloc(length, fill = 0) {
            return SeaArray.from(new Uint8Array(Array.from({ length }, () => fill)));
          },
          allocUnsafe(length) {
            return SeaArray.from(new Uint8Array(Array.from({ length })));
          },
          concat(arr) {
            if (!Array.isArray(arr)) {
              throw new TypeError("First argument must be Array containing ArrayBuffer or Uint8Array instances.");
            }
            return SeaArray.from(arr.reduce((ret, item) => ret.concat(Array.from(item)), []));
          }
        });
        SafeBuffer.prototype.from = SafeBuffer.from;
        SafeBuffer.prototype.toString = SeaArray.prototype.toString;
        module2.exports = SafeBuffer;
      })(USE, "./buffer");
      ;
      USE(function(module2) {
        const SEA = USE("./root");
        const api2 = { Buffer: USE("./buffer") };
        var o = {}, u;
        JSON.parseAsync = JSON.parseAsync || function(t2, cb, r2) {
          var u2;
          try {
            cb(u2, JSON.parse(t2, r2));
          } catch (e2) {
            cb(e2);
          }
        };
        JSON.stringifyAsync = JSON.stringifyAsync || function(v, cb, r2, s3) {
          var u2;
          try {
            cb(u2, JSON.stringify(v, r2, s3));
          } catch (e2) {
            cb(e2);
          }
        };
        api2.parse = function(t2, r2) {
          return new Promise(function(res, rej) {
            JSON.parseAsync(t2, function(err, raw) {
              err ? rej(err) : res(raw);
            }, r2);
          });
        };
        api2.stringify = function(v, r2, s3) {
          return new Promise(function(res, rej) {
            JSON.stringifyAsync(v, function(err, raw) {
              err ? rej(err) : res(raw);
            }, r2, s3);
          });
        };
        if (SEA.window) {
          api2.crypto = window.crypto || window.msCrypto;
          api2.subtle = (api2.crypto || o).subtle || (api2.crypto || o).webkitSubtle;
          api2.TextEncoder = window.TextEncoder;
          api2.TextDecoder = window.TextDecoder;
          api2.random = (len) => api2.Buffer.from(api2.crypto.getRandomValues(new Uint8Array(api2.Buffer.alloc(len))));
        }
        if (!api2.TextDecoder) {
          const { TextEncoder: TextEncoder2, TextDecoder: TextDecoder2 } = USE((u + "" == typeof MODULE ? "." : "") + "./lib/text-encoding", 1);
          api2.TextDecoder = TextDecoder2;
          api2.TextEncoder = TextEncoder2;
        }
        if (!api2.crypto) {
          try {
            var crypto2 = USE("crypto", 1);
            Object.assign(api2, {
              crypto: crypto2,
              random: (len) => api2.Buffer.from(crypto2.randomBytes(len))
            });
            const { Crypto: WebCrypto } = USE("@peculiar/webcrypto", 1);
            api2.ossl = api2.subtle = new WebCrypto({ directory: "ossl" }).subtle;
          } catch (e2) {
            console.log("Please `npm install @peculiar/webcrypto` or add it to your package.json !");
          }
        }
        module2.exports = api2;
      })(USE, "./shim");
      ;
      USE(function(module2) {
        var SEA = USE("./root");
        var shim = USE("./shim");
        var s3 = {};
        s3.pbkdf2 = { hash: { name: "SHA-256" }, iter: 1e5, ks: 64 };
        s3.ecdsa = {
          pair: { name: "ECDSA", namedCurve: "P-256" },
          sign: { name: "ECDSA", hash: { name: "SHA-256" } }
        };
        s3.ecdh = { name: "ECDH", namedCurve: "P-256" };
        s3.jwk = function(pub, d) {
          pub = pub.split(".");
          var x2 = pub[0], y = pub[1];
          var jwk = { kty: "EC", crv: "P-256", x: x2, y, ext: true };
          jwk.key_ops = d ? ["sign"] : ["verify"];
          if (d) {
            jwk.d = d;
          }
          return jwk;
        };
        s3.keyToJwk = function(keyBytes) {
          const keyB64 = keyBytes.toString("base64");
          const k = keyB64.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
          return { kty: "oct", k, ext: false, alg: "A256GCM" };
        };
        s3.recall = {
          validity: 12 * 60 * 60,
          hook: function(props) {
            return props;
          }
        };
        s3.check = function(t2) {
          return typeof t2 == "string" && t2.slice(0, 4) === "SEA{";
        };
        s3.parse = async function p(t2) {
          try {
            var yes = typeof t2 == "string";
            if (yes && t2.slice(0, 4) === "SEA{") {
              t2 = t2.slice(3);
            }
            return yes ? await shim.parse(t2) : t2;
          } catch (e2) {
          }
          return t2;
        };
        SEA.opt = s3;
        module2.exports = s3;
      })(USE, "./settings");
      ;
      USE(function(module2) {
        var shim = USE("./shim");
        module2.exports = async function(d, o) {
          var t2 = typeof d == "string" ? d : await shim.stringify(d);
          var hash2 = await shim.subtle.digest({ name: o || "SHA-256" }, new shim.TextEncoder().encode(t2));
          return shim.Buffer.from(hash2);
        };
      })(USE, "./sha256");
      ;
      USE(function(module2) {
        const __shim = USE("./shim");
        const subtle = __shim.subtle;
        const ossl = __shim.ossl ? __shim.ossl : subtle;
        const sha1hash2 = (b) => ossl.digest({ name: "SHA-1" }, new ArrayBuffer(b));
        module2.exports = sha1hash2;
      })(USE, "./sha1");
      ;
      USE(function(module2) {
        var SEA = USE("./root");
        var shim = USE("./shim");
        var S2 = USE("./settings");
        var sha = USE("./sha256");
        var u;
        SEA.work = SEA.work || (async (data, pair, cb, opt) => {
          try {
            var salt = (pair || {}).epub || pair;
            opt = opt || {};
            if (salt instanceof Function) {
              cb = salt;
              salt = u;
            }
            data = typeof data == "string" ? data : await shim.stringify(data);
            if ((opt.name || "").toLowerCase().slice(0, 3) === "sha") {
              var rsha = shim.Buffer.from(await sha(data, opt.name), "binary").toString(opt.encode || "base64");
              if (cb) {
                try {
                  cb(rsha);
                } catch (e2) {
                  console.log(e2);
                }
              }
              return rsha;
            }
            salt = salt || shim.random(9);
            var key2 = await (shim.ossl || shim.subtle).importKey("raw", new shim.TextEncoder().encode(data), { name: opt.name || "PBKDF2" }, false, ["deriveBits"]);
            var work = await (shim.ossl || shim.subtle).deriveBits({
              name: opt.name || "PBKDF2",
              iterations: opt.iterations || S2.pbkdf2.iter,
              salt: new shim.TextEncoder().encode(opt.salt || salt),
              hash: opt.hash || S2.pbkdf2.hash
            }, key2, opt.length || S2.pbkdf2.ks * 8);
            data = shim.random(data.length);
            var r2 = shim.Buffer.from(work, "binary").toString(opt.encode || "base64");
            if (cb) {
              try {
                cb(r2);
              } catch (e2) {
                console.log(e2);
              }
            }
            return r2;
          } catch (e2) {
            console.log(e2);
            SEA.err = e2;
            if (SEA.throw) {
              throw e2;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        module2.exports = SEA.work;
      })(USE, "./work");
      ;
      USE(function(module2) {
        var SEA = USE("./root");
        var shim = USE("./shim");
        var S2 = USE("./settings");
        SEA.name = SEA.name || (async (cb, opt) => {
          try {
            if (cb) {
              try {
                cb();
              } catch (e2) {
                console.log(e2);
              }
            }
            return;
          } catch (e2) {
            console.log(e2);
            SEA.err = e2;
            if (SEA.throw) {
              throw e2;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        SEA.pair = SEA.pair || (async (cb, opt) => {
          try {
            var ecdhSubtle = shim.ossl || shim.subtle;
            var sa = await shim.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, ["sign", "verify"]).then(async (keys) => {
              var key2 = {};
              key2.priv = (await shim.subtle.exportKey("jwk", keys.privateKey)).d;
              var pub = await shim.subtle.exportKey("jwk", keys.publicKey);
              key2.pub = pub.x + "." + pub.y;
              return key2;
            });
            try {
              var dh = await ecdhSubtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, true, ["deriveKey"]).then(async (keys) => {
                var key2 = {};
                key2.epriv = (await ecdhSubtle.exportKey("jwk", keys.privateKey)).d;
                var pub = await ecdhSubtle.exportKey("jwk", keys.publicKey);
                key2.epub = pub.x + "." + pub.y;
                return key2;
              });
            } catch (e2) {
              if (SEA.window) {
                throw e2;
              }
              if (e2 == "Error: ECDH is not a supported algorithm") {
                console.log("Ignoring ECDH...");
              } else {
                throw e2;
              }
            }
            dh = dh || {};
            var r2 = { pub: sa.pub, priv: sa.priv, epub: dh.epub, epriv: dh.epriv };
            if (cb) {
              try {
                cb(r2);
              } catch (e2) {
                console.log(e2);
              }
            }
            return r2;
          } catch (e2) {
            console.log(e2);
            SEA.err = e2;
            if (SEA.throw) {
              throw e2;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        module2.exports = SEA.pair;
      })(USE, "./pair");
      ;
      USE(function(module2) {
        var SEA = USE("./root");
        var shim = USE("./shim");
        var S2 = USE("./settings");
        var sha = USE("./sha256");
        var u;
        SEA.sign = SEA.sign || (async (data, pair, cb, opt) => {
          try {
            opt = opt || {};
            if (!(pair || opt).priv) {
              if (!SEA.I) {
                throw "No signing key.";
              }
              pair = await SEA.I(null, { what: data, how: "sign", why: opt.why });
            }
            if (u === data) {
              throw "`undefined` not allowed.";
            }
            var json = await S2.parse(data);
            var check = opt.check = opt.check || json;
            if (SEA.verify && (SEA.opt.check(check) || check && check.s && check.m) && u !== await SEA.verify(check, pair)) {
              var r2 = await S2.parse(check);
              if (!opt.raw) {
                r2 = "SEA" + await shim.stringify(r2);
              }
              if (cb) {
                try {
                  cb(r2);
                } catch (e2) {
                  console.log(e2);
                }
              }
              return r2;
            }
            var pub = pair.pub;
            var priv = pair.priv;
            var jwk = S2.jwk(pub, priv);
            var hash2 = await sha(json);
            var sig = await (shim.ossl || shim.subtle).importKey("jwk", jwk, { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]).then((key2) => (shim.ossl || shim.subtle).sign({ name: "ECDSA", hash: { name: "SHA-256" } }, key2, new Uint8Array(hash2)));
            var r2 = { m: json, s: shim.Buffer.from(sig, "binary").toString(opt.encode || "base64") };
            if (!opt.raw) {
              r2 = "SEA" + await shim.stringify(r2);
            }
            if (cb) {
              try {
                cb(r2);
              } catch (e2) {
                console.log(e2);
              }
            }
            return r2;
          } catch (e2) {
            console.log(e2);
            SEA.err = e2;
            if (SEA.throw) {
              throw e2;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        module2.exports = SEA.sign;
      })(USE, "./sign");
      ;
      USE(function(module2) {
        var SEA = USE("./root");
        var shim = USE("./shim");
        var S2 = USE("./settings");
        var sha = USE("./sha256");
        var u;
        SEA.verify = SEA.verify || (async (data, pair, cb, opt) => {
          try {
            var json = await S2.parse(data);
            if (pair === false) {
              var raw = await S2.parse(json.m);
              if (cb) {
                try {
                  cb(raw);
                } catch (e2) {
                  console.log(e2);
                }
              }
              return raw;
            }
            opt = opt || {};
            var pub = pair.pub || pair;
            var key2 = SEA.opt.slow_leak ? await SEA.opt.slow_leak(pub) : await (shim.ossl || shim.subtle).importKey("jwk", S2.jwk(pub), { name: "ECDSA", namedCurve: "P-256" }, false, ["verify"]);
            var hash2 = await sha(json.m);
            var buf, sig, check, tmp;
            try {
              buf = shim.Buffer.from(json.s, opt.encode || "base64");
              sig = new Uint8Array(buf);
              check = await (shim.ossl || shim.subtle).verify({ name: "ECDSA", hash: { name: "SHA-256" } }, key2, sig, new Uint8Array(hash2));
              if (!check) {
                throw "Signature did not match.";
              }
            } catch (e2) {
              if (SEA.opt.fallback) {
                return await SEA.opt.fall_verify(data, pair, cb, opt);
              }
            }
            var r2 = check ? await S2.parse(json.m) : u;
            if (cb) {
              try {
                cb(r2);
              } catch (e2) {
                console.log(e2);
              }
            }
            return r2;
          } catch (e2) {
            console.log(e2);
            SEA.err = e2;
            if (SEA.throw) {
              throw e2;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        module2.exports = SEA.verify;
        var knownKeys = {};
        var keyForPair = SEA.opt.slow_leak = (pair) => {
          if (knownKeys[pair])
            return knownKeys[pair];
          var jwk = S2.jwk(pair);
          knownKeys[pair] = (shim.ossl || shim.subtle).importKey("jwk", jwk, { name: "ECDSA", namedCurve: "P-256" }, false, ["verify"]);
          return knownKeys[pair];
        };
        var O = SEA.opt;
        SEA.opt.fall_verify = async function(data, pair, cb, opt, f3) {
          if (f3 === SEA.opt.fallback) {
            throw "Signature did not match";
          }
          f3 = f3 || 1;
          var tmp = data || "";
          data = SEA.opt.unpack(data) || data;
          var json = await S2.parse(data), pub = pair.pub || pair, key2 = await SEA.opt.slow_leak(pub);
          var hash2 = f3 <= SEA.opt.fallback ? shim.Buffer.from(await shim.subtle.digest({ name: "SHA-256" }, new shim.TextEncoder().encode(await S2.parse(json.m)))) : await sha(json.m);
          var buf;
          var sig;
          var check;
          try {
            buf = shim.Buffer.from(json.s, opt.encode || "base64");
            sig = new Uint8Array(buf);
            check = await (shim.ossl || shim.subtle).verify({ name: "ECDSA", hash: { name: "SHA-256" } }, key2, sig, new Uint8Array(hash2));
            if (!check) {
              throw "Signature did not match.";
            }
          } catch (e2) {
            try {
              buf = shim.Buffer.from(json.s, "utf8");
              sig = new Uint8Array(buf);
              check = await (shim.ossl || shim.subtle).verify({ name: "ECDSA", hash: { name: "SHA-256" } }, key2, sig, new Uint8Array(hash2));
            } catch (e3) {
              if (!check) {
                throw "Signature did not match.";
              }
            }
          }
          var r2 = check ? await S2.parse(json.m) : u;
          O.fall_soul = tmp["#"];
          O.fall_key = tmp["."];
          O.fall_val = data;
          O.fall_state = tmp[">"];
          if (cb) {
            try {
              cb(r2);
            } catch (e2) {
              console.log(e2);
            }
          }
          return r2;
        };
        SEA.opt.fallback = 2;
      })(USE, "./verify");
      ;
      USE(function(module2) {
        var shim = USE("./shim");
        var S2 = USE("./settings");
        var sha256hash = USE("./sha256");
        const importGen = async (key2, salt, opt) => {
          opt = opt || {};
          const combo = key2 + (salt || shim.random(8)).toString("utf8");
          const hash2 = shim.Buffer.from(await sha256hash(combo), "binary");
          const jwkKey = S2.keyToJwk(hash2);
          return await shim.subtle.importKey("jwk", jwkKey, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
        };
        module2.exports = importGen;
      })(USE, "./aeskey");
      ;
      USE(function(module2) {
        var SEA = USE("./root");
        var shim = USE("./shim");
        var S2 = USE("./settings");
        var aeskey = USE("./aeskey");
        var u;
        SEA.encrypt = SEA.encrypt || (async (data, pair, cb, opt) => {
          try {
            opt = opt || {};
            var key2 = (pair || opt).epriv || pair;
            if (u === data) {
              throw "`undefined` not allowed.";
            }
            if (!key2) {
              if (!SEA.I) {
                throw "No encryption key.";
              }
              pair = await SEA.I(null, { what: data, how: "encrypt", why: opt.why });
              key2 = pair.epriv || pair;
            }
            var msg = typeof data == "string" ? data : await shim.stringify(data);
            var rand = { s: shim.random(9), iv: shim.random(15) };
            var ct = await aeskey(key2, rand.s, opt).then((aes) => shim.subtle.encrypt({
              name: opt.name || "AES-GCM",
              iv: new Uint8Array(rand.iv)
            }, aes, new shim.TextEncoder().encode(msg)));
            var r2 = {
              ct: shim.Buffer.from(ct, "binary").toString(opt.encode || "base64"),
              iv: rand.iv.toString(opt.encode || "base64"),
              s: rand.s.toString(opt.encode || "base64")
            };
            if (!opt.raw) {
              r2 = "SEA" + await shim.stringify(r2);
            }
            if (cb) {
              try {
                cb(r2);
              } catch (e2) {
                console.log(e2);
              }
            }
            return r2;
          } catch (e2) {
            console.log(e2);
            SEA.err = e2;
            if (SEA.throw) {
              throw e2;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        module2.exports = SEA.encrypt;
      })(USE, "./encrypt");
      ;
      USE(function(module2) {
        var SEA = USE("./root");
        var shim = USE("./shim");
        var S2 = USE("./settings");
        var aeskey = USE("./aeskey");
        SEA.decrypt = SEA.decrypt || (async (data, pair, cb, opt) => {
          try {
            opt = opt || {};
            var key2 = (pair || opt).epriv || pair;
            if (!key2) {
              if (!SEA.I) {
                throw "No decryption key.";
              }
              pair = await SEA.I(null, { what: data, how: "decrypt", why: opt.why });
              key2 = pair.epriv || pair;
            }
            var json = await S2.parse(data);
            var buf, bufiv, bufct;
            try {
              buf = shim.Buffer.from(json.s, opt.encode || "base64");
              bufiv = shim.Buffer.from(json.iv, opt.encode || "base64");
              bufct = shim.Buffer.from(json.ct, opt.encode || "base64");
              var ct = await aeskey(key2, buf, opt).then((aes) => shim.subtle.decrypt({
                name: opt.name || "AES-GCM",
                iv: new Uint8Array(bufiv),
                tagLength: 128
              }, aes, new Uint8Array(bufct)));
            } catch (e2) {
              if (opt.encode === "utf8") {
                throw "Could not decrypt";
              }
              if (SEA.opt.fallback) {
                opt.encode = "utf8";
                return await SEA.decrypt(data, pair, cb, opt);
              }
            }
            var r2 = await S2.parse(new shim.TextDecoder("utf8").decode(ct));
            if (cb) {
              try {
                cb(r2);
              } catch (e2) {
                console.log(e2);
              }
            }
            return r2;
          } catch (e2) {
            console.log(e2);
            SEA.err = e2;
            if (SEA.throw) {
              throw e2;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        module2.exports = SEA.decrypt;
      })(USE, "./decrypt");
      ;
      USE(function(module2) {
        var SEA = USE("./root");
        var shim = USE("./shim");
        var S2 = USE("./settings");
        SEA.secret = SEA.secret || (async (key2, pair, cb, opt) => {
          try {
            opt = opt || {};
            if (!pair || !pair.epriv || !pair.epub) {
              if (!SEA.I) {
                throw "No secret mix.";
              }
              pair = await SEA.I(null, { what: key2, how: "secret", why: opt.why });
            }
            var pub = key2.epub || key2;
            var epub = pair.epub;
            var epriv = pair.epriv;
            var ecdhSubtle = shim.ossl || shim.subtle;
            var pubKeyData = keysToEcdhJwk(pub);
            var props = Object.assign({ public: await ecdhSubtle.importKey(...pubKeyData, true, []) }, { name: "ECDH", namedCurve: "P-256" });
            var privKeyData = keysToEcdhJwk(epub, epriv);
            var derived = await ecdhSubtle.importKey(...privKeyData, false, ["deriveBits"]).then(async (privKey) => {
              var derivedBits = await ecdhSubtle.deriveBits(props, privKey, 256);
              var rawBits = new Uint8Array(derivedBits);
              var derivedKey = await ecdhSubtle.importKey("raw", rawBits, { name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
              return ecdhSubtle.exportKey("jwk", derivedKey).then(({ k }) => k);
            });
            var r2 = derived;
            if (cb) {
              try {
                cb(r2);
              } catch (e2) {
                console.log(e2);
              }
            }
            return r2;
          } catch (e2) {
            console.log(e2);
            SEA.err = e2;
            if (SEA.throw) {
              throw e2;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        var keysToEcdhJwk = (pub, d) => {
          var [x2, y] = pub.split(".");
          var jwk = d ? { d } : {};
          return [
            "jwk",
            Object.assign(jwk, { x: x2, y, kty: "EC", crv: "P-256", ext: true }),
            { name: "ECDH", namedCurve: "P-256" }
          ];
        };
        module2.exports = SEA.secret;
      })(USE, "./secret");
      ;
      USE(function(module2) {
        var SEA = USE("./root");
        SEA.certify = SEA.certify || (async (certificants, policy = {}, authority, cb, opt = {}) => {
          try {
            console.log("SEA.certify() is an early experimental community supported method that may change API behavior without warning in any future version.");
            certificants = (() => {
              var data2 = [];
              if (certificants) {
                if ((typeof certificants === "string" || Array.isArray(certificants)) && certificants.indexOf("*") > -1)
                  return "*";
                if (typeof certificants === "string")
                  return certificants;
                if (Array.isArray(certificants)) {
                  if (certificants.length === 1 && certificants[0])
                    return typeof certificants[0] === "object" && certificants[0].pub ? certificants[0].pub : typeof certificants[0] === "string" ? certificants[0] : null;
                  certificants.map((certificant) => {
                    if (typeof certificant === "string")
                      data2.push(certificant);
                    else if (typeof certificant === "object" && certificant.pub)
                      data2.push(certificant.pub);
                  });
                }
                if (typeof certificants === "object" && certificants.pub)
                  return certificants.pub;
                return data2.length > 0 ? data2 : null;
              }
              return;
            })();
            if (!certificants)
              return console.log("No certificant found.");
            const expiry = opt.expiry && (typeof opt.expiry === "number" || typeof opt.expiry === "string") ? parseFloat(opt.expiry) : null;
            const readPolicy = (policy || {}).read ? policy.read : null;
            const writePolicy = (policy || {}).write ? policy.write : typeof policy === "string" || Array.isArray(policy) || policy["+"] || policy["#"] || policy["."] || policy["="] || policy["*"] || policy[">"] || policy["<"] ? policy : null;
            const block = (opt || {}).block || (opt || {}).blacklist || (opt || {}).ban || {};
            const readBlock = block.read && (typeof block.read === "string" || (block.read || {})["#"]) ? block.read : null;
            const writeBlock = typeof block === "string" ? block : block.write && (typeof block.write === "string" || block.write["#"]) ? block.write : null;
            if (!readPolicy && !writePolicy)
              return console.log("No policy found.");
            const data = JSON.stringify(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({
              c: certificants
            }, expiry ? { e: expiry } : {}), readPolicy ? { r: readPolicy } : {}), writePolicy ? { w: writePolicy } : {}), readBlock ? { rb: readBlock } : {}), writeBlock ? { wb: writeBlock } : {}));
            const certificate = await SEA.sign(data, authority, null, { raw: 1 });
            var r2 = certificate;
            if (!opt.raw) {
              r2 = "SEA" + JSON.stringify(r2);
            }
            if (cb) {
              try {
                cb(r2);
              } catch (e2) {
                console.log(e2);
              }
            }
            return r2;
          } catch (e2) {
            SEA.err = e2;
            if (SEA.throw) {
              throw e2;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        module2.exports = SEA.certify;
      })(USE, "./certify");
      ;
      USE(function(module2) {
        var shim = USE("./shim");
        var SEA = USE("./root");
        SEA.work = USE("./work");
        SEA.sign = USE("./sign");
        SEA.verify = USE("./verify");
        SEA.encrypt = USE("./encrypt");
        SEA.decrypt = USE("./decrypt");
        SEA.certify = USE("./certify");
        SEA.random = SEA.random || shim.random;
        SEA.Buffer = SEA.Buffer || USE("./buffer");
        SEA.keyid = SEA.keyid || (async (pub) => {
          try {
            const pb = shim.Buffer.concat(pub.replace(/-/g, "+").replace(/_/g, "/").split(".").map((t2) => shim.Buffer.from(t2, "base64")));
            const id = shim.Buffer.concat([
              shim.Buffer.from([153, pb.length / 256, pb.length % 256]),
              pb
            ]);
            const sha1 = await sha1hash(id);
            const hash2 = shim.Buffer.from(sha1, "binary");
            return hash2.toString("hex", hash2.length - 8);
          } catch (e2) {
            console.log(e2);
            throw e2;
          }
        });
        ((SEA.window || {}).GUN || {}).SEA = SEA;
        module2.exports = SEA;
      })(USE, "./sea");
      ;
      USE(function(module2) {
        var SEA = USE("./sea"), Gun2, u;
        if (SEA.window) {
          Gun2 = SEA.window.GUN || { chain: {} };
        } else {
          Gun2 = USE((u + "" == typeof MODULE ? "." : "") + "./gun", 1);
        }
        SEA.GUN = Gun2;
        function User(root) {
          this._ = { $: this };
        }
        User.prototype = function() {
          function F2() {
          }
          ;
          F2.prototype = Gun2.chain;
          return new F2();
        }();
        User.prototype.constructor = User;
        Gun2.chain.user = function(pub) {
          var gun = this, root = gun.back(-1), user;
          if (pub) {
            pub = SEA.opt.pub((pub._ || "")["#"]) || pub;
            return root.get("~" + pub);
          }
          if (user = root.back("user")) {
            return user;
          }
          var root = root._, at = root, uuid = at.opt.uuid || lex;
          (at = (user = at.user = gun.chain(new User()))._).opt = {};
          at.opt.uuid = function(cb) {
            var id = uuid(), pub2 = root.user;
            if (!pub2 || !(pub2 = pub2.is) || !(pub2 = pub2.pub)) {
              return id;
            }
            id = "~" + pub2 + "/" + id;
            if (cb && cb.call) {
              cb(null, id);
            }
            return id;
          };
          return user;
        };
        function lex() {
          return Gun2.state().toString(36).replace(".", "");
        }
        Gun2.User = User;
        User.GUN = Gun2;
        User.SEA = Gun2.SEA = SEA;
        module2.exports = User;
      })(USE, "./user");
      ;
      USE(function(module2) {
        var u, Gun2 = "" + u != typeof window ? window.Gun || { chain: {} } : USE(("" + u === typeof MODULE ? "." : "") + "./gun", 1);
        Gun2.chain.then = function(cb, opt) {
          var gun = this, p = new Promise(function(res, rej) {
            gun.once(res, opt);
          });
          return cb ? p.then(cb) : p;
        };
      })(USE, "./then");
      ;
      USE(function(module2) {
        var User = USE("./user"), SEA = User.SEA, Gun2 = User.GUN, noop3 = function() {
        };
        User.prototype.create = function(...args) {
          var pair = typeof args[0] === "object" && (args[0].pub || args[0].epub) ? args[0] : typeof args[1] === "object" && (args[1].pub || args[1].epub) ? args[1] : null;
          var alias = pair && (pair.pub || pair.epub) ? pair.pub : typeof args[0] === "string" ? args[0] : null;
          var pass = pair && (pair.pub || pair.epub) ? pair : alias && typeof args[1] === "string" ? args[1] : null;
          var cb = args.filter((arg) => typeof arg === "function")[0] || null;
          var opt = args && args.length > 1 && typeof args[args.length - 1] === "object" ? args[args.length - 1] : {};
          var gun = this, cat = gun._, root = gun.back(-1);
          cb = cb || noop3;
          opt = opt || {};
          if (opt.check !== false) {
            var err;
            if (!alias) {
              err = "No user.";
            }
            if ((pass || "").length < 8) {
              err = "Password too short!";
            }
            if (err) {
              cb({ err: Gun2.log(err) });
              return gun;
            }
          }
          if (cat.ing) {
            (cb || noop3)({ err: Gun2.log("User is already being created or authenticated!"), wait: true });
            return gun;
          }
          cat.ing = true;
          var act = {}, u;
          act.a = function(pubs) {
            act.pubs = pubs;
            if (pubs && !opt.already) {
              var ack = { err: Gun2.log("User already created!") };
              cat.ing = false;
              (cb || noop3)(ack);
              gun.leave();
              return;
            }
            act.salt = String.random(64);
            SEA.work(pass, act.salt, act.b);
          };
          act.b = function(proof) {
            act.proof = proof;
            pair ? act.c(pair) : SEA.pair(act.c);
          };
          act.c = function(pair2) {
            var tmp;
            act.pair = pair2 || {};
            if (tmp = cat.root.user) {
              tmp._.sea = pair2;
              tmp.is = { pub: pair2.pub, epub: pair2.epub, alias };
            }
            act.data = { pub: pair2.pub };
            act.d();
          };
          act.d = function() {
            act.data.alias = alias;
            act.e();
          };
          act.e = function() {
            act.data.epub = act.pair.epub;
            SEA.encrypt({ priv: act.pair.priv, epriv: act.pair.epriv }, act.proof, act.f, { raw: 1 });
          };
          act.f = function(auth) {
            act.data.auth = JSON.stringify({ ek: auth, s: act.salt });
            act.g(act.data.auth);
          };
          act.g = function(auth) {
            var tmp;
            act.data.auth = act.data.auth || auth;
            root.get(tmp = "~" + act.pair.pub).put(act.data).on(act.h);
            var link = {};
            link[tmp] = { "#": tmp };
            root.get("~@" + alias).put(link).get(tmp).on(act.i);
          };
          act.h = function(data, key2, msg, eve) {
            eve.off();
            act.h.ok = 1;
            act.i();
          };
          act.i = function(data, key2, msg, eve) {
            if (eve) {
              act.i.ok = 1;
              eve.off();
            }
            if (!act.h.ok || !act.i.ok) {
              return;
            }
            cat.ing = false;
            cb({ ok: 0, pub: act.pair.pub });
            if (noop3 === cb) {
              pair ? gun.auth(pair) : gun.auth(alias, pass);
            }
          };
          root.get("~@" + alias).once(act.a);
          return gun;
        };
        User.prototype.leave = function(opt, cb) {
          var gun = this, user = gun.back(-1)._.user;
          if (user) {
            delete user.is;
            delete user._.is;
            delete user._.sea;
          }
          if (SEA.window) {
            try {
              var sS = {};
              sS = window.sessionStorage;
              delete sS.recall;
              delete sS.pair;
            } catch (e2) {
            }
            ;
          }
          return gun;
        };
      })(USE, "./create");
      ;
      USE(function(module2) {
        var User = USE("./user"), SEA = User.SEA, Gun2 = User.GUN, noop3 = function() {
        };
        User.prototype.auth = function(...args) {
          var pair = typeof args[0] === "object" && (args[0].pub || args[0].epub) ? args[0] : typeof args[1] === "object" && (args[1].pub || args[1].epub) ? args[1] : null;
          var alias = !pair && typeof args[0] === "string" ? args[0] : null;
          var pass = alias && typeof args[1] === "string" ? args[1] : null;
          var cb = args.filter((arg) => typeof arg === "function")[0] || null;
          var opt = args && args.length > 1 && typeof args[args.length - 1] === "object" ? args[args.length - 1] : {};
          var gun = this, cat = gun._, root = gun.back(-1);
          if (cat.ing) {
            (cb || noop3)({ err: Gun2.log("User is already being created or authenticated!"), wait: true });
            return gun;
          }
          cat.ing = true;
          var act = {}, u;
          act.a = function(data) {
            if (!data) {
              return act.b();
            }
            if (!data.pub) {
              var tmp = [];
              Object.keys(data).forEach(function(k) {
                if (k == "_") {
                  return;
                }
                tmp.push(data[k]);
              });
              return act.b(tmp);
            }
            if (act.name) {
              return act.f(data);
            }
            act.c((act.data = data).auth);
          };
          act.b = function(list) {
            var get = (act.list = (act.list || []).concat(list || [])).shift();
            if (u === get) {
              if (act.name) {
                return act.err("Your user account is not published for dApps to access, please consider syncing it online, or allowing local access by adding your device as a peer.");
              }
              return act.err("Wrong user or password.");
            }
            root.get(get).once(act.a);
          };
          act.c = function(auth) {
            if (u === auth) {
              return act.b();
            }
            if (typeof auth == "string") {
              return act.c(obj_ify(auth));
            }
            SEA.work(pass, (act.auth = auth).s, act.d, act.enc);
          };
          act.d = function(proof) {
            SEA.decrypt(act.auth.ek, proof, act.e, act.enc);
          };
          act.e = function(half) {
            if (u === half) {
              if (!act.enc) {
                act.enc = { encode: "utf8" };
                return act.c(act.auth);
              }
              act.enc = null;
              return act.b();
            }
            act.half = half;
            act.f(act.data);
          };
          act.f = function(pair2) {
            var half = act.half || {}, data = act.data || {};
            act.g(act.lol = { pub: pair2.pub || data.pub, epub: pair2.epub || data.epub, priv: pair2.priv || half.priv, epriv: pair2.epriv || half.epriv });
          };
          act.g = function(pair2) {
            if (!pair2 || !pair2.pub || !pair2.epub) {
              return act.b();
            }
            act.pair = pair2;
            var user = root._.user, at = user._;
            var tmp = at.tag;
            var upt = at.opt;
            at = user._ = root.get("~" + pair2.pub)._;
            at.opt = upt;
            user.is = { pub: pair2.pub, epub: pair2.epub, alias: alias || pair2.pub };
            at.sea = act.pair;
            cat.ing = false;
            try {
              if (pass && u == (obj_ify(cat.root.graph["~" + pair2.pub].auth) || "")[":"]) {
                opt.shuffle = opt.change = pass;
              }
            } catch (e2) {
            }
            opt.change ? act.z() : (cb || noop3)(at);
            if (SEA.window && (gun.back("user")._.opt || opt).remember) {
              try {
                var sS = {};
                sS = window.sessionStorage;
                sS.recall = true;
                sS.pair = JSON.stringify(pair2);
              } catch (e2) {
              }
            }
            try {
              if (root._.tag.auth) {
                root._.on("auth", at);
              } else {
                setTimeout(function() {
                  root._.on("auth", at);
                }, 1);
              }
            } catch (e2) {
              Gun2.log("Your 'auth' callback crashed with:", e2);
            }
          };
          act.z = function() {
            act.salt = String.random(64);
            SEA.work(opt.change, act.salt, act.y);
          };
          act.y = function(proof) {
            SEA.encrypt({ priv: act.pair.priv, epriv: act.pair.epriv }, proof, act.x, { raw: 1 });
          };
          act.x = function(auth) {
            act.w(JSON.stringify({ ek: auth, s: act.salt }));
          };
          act.w = function(auth) {
            if (opt.shuffle) {
              console.log("migrate core account from UTF8 & shuffle");
              var tmp = {};
              Object.keys(act.data).forEach(function(k) {
                tmp[k] = act.data[k];
              });
              delete tmp._;
              tmp.auth = auth;
              root.get("~" + act.pair.pub).put(tmp);
            }
            root.get("~" + act.pair.pub).get("auth").put(auth, cb || noop3);
          };
          act.err = function(e2) {
            var ack = { err: Gun2.log(e2 || "User cannot be found!") };
            cat.ing = false;
            (cb || noop3)(ack);
          };
          act.plugin = function(name) {
            if (!(act.name = name)) {
              return act.err();
            }
            var tmp = [name];
            if (name[0] !== "~") {
              tmp[1] = "~" + name;
              tmp[2] = "~@" + name;
            }
            act.b(tmp);
          };
          if (pair) {
            act.g(pair);
          } else if (alias) {
            root.get("~@" + alias).once(act.a);
          } else if (!alias && !pass) {
            SEA.name(act.plugin);
          }
          return gun;
        };
        function obj_ify(o) {
          if (typeof o != "string") {
            return o;
          }
          try {
            o = JSON.parse(o);
          } catch (e2) {
            o = {};
          }
          ;
          return o;
        }
      })(USE, "./auth");
      ;
      USE(function(module2) {
        var User = USE("./user"), SEA = User.SEA, Gun2 = User.GUN;
        User.prototype.recall = function(opt, cb) {
          var gun = this, root = gun.back(-1), tmp;
          opt = opt || {};
          if (opt && opt.sessionStorage) {
            if (SEA.window) {
              try {
                var sS = {};
                sS = window.sessionStorage;
                if (sS) {
                  root._.opt.remember = true;
                  (gun.back("user")._.opt || opt).remember = true;
                  if (sS.recall || sS.pair)
                    root.user().auth(JSON.parse(sS.pair), cb);
                }
              } catch (e2) {
              }
            }
            return gun;
          }
          return gun;
        };
      })(USE, "./recall");
      ;
      USE(function(module2) {
        var User = USE("./user"), SEA = User.SEA, Gun2 = User.GUN, noop3 = function() {
        };
        User.prototype.pair = function() {
          var user = this, proxy;
          try {
            proxy = new Proxy({ DANGER: "\u2620" }, { get: function(t2, p, r2) {
              if (!user.is || !(user._ || "").sea) {
                return;
              }
              return user._.sea[p];
            } });
          } catch (e2) {
          }
          return proxy;
        };
        User.prototype.delete = async function(alias, pass, cb) {
          console.log("user.delete() IS DEPRECATED AND WILL BE MOVED TO A MODULE!!!");
          var gun = this, root = gun.back(-1), user = gun.back("user");
          try {
            user.auth(alias, pass, function(ack) {
              var pub = (user.is || {}).pub;
              user.map().once(function() {
                this.put(null);
              });
              user.leave();
              (cb || noop3)({ ok: 0 });
            });
          } catch (e2) {
            Gun2.log("User.delete failed! Error:", e2);
          }
          return gun;
        };
        User.prototype.alive = async function() {
          console.log("user.alive() IS DEPRECATED!!!");
          const gunRoot = this.back(-1);
          try {
            await authRecall(gunRoot);
            return gunRoot._.user._;
          } catch (e2) {
            const err = "No session!";
            Gun2.log(err);
            throw { err };
          }
        };
        User.prototype.trust = async function(user) {
          console.log("`.trust` API MAY BE DELETED OR CHANGED OR RENAMED, DO NOT USE!");
          if (Gun2.is(user)) {
            user.get("pub").get((ctx, ev) => {
              console.log(ctx, ev);
            });
          }
          user.get("trust").get(path).put(theirPubkey);
        };
        User.prototype.grant = function(to, cb) {
          console.log("`.grant` API MAY BE DELETED OR CHANGED OR RENAMED, DO NOT USE!");
          var gun = this, user = gun.back(-1).user(), pair = user._.sea, path2 = "";
          gun.back(function(at) {
            if (at.is) {
              return;
            }
            path2 += at.get || "";
          });
          (async function() {
            var enc, sec = await user.get("grant").get(pair.pub).get(path2).then();
            sec = await SEA.decrypt(sec, pair);
            if (!sec) {
              sec = SEA.random(16).toString();
              enc = await SEA.encrypt(sec, pair);
              user.get("grant").get(pair.pub).get(path2).put(enc);
            }
            var pub = to.get("pub").then();
            var epub = to.get("epub").then();
            pub = await pub;
            epub = await epub;
            var dh = await SEA.secret(epub, pair);
            enc = await SEA.encrypt(sec, dh);
            user.get("grant").get(pub).get(path2).put(enc, cb);
          })();
          return gun;
        };
        User.prototype.secret = function(data, cb) {
          console.log("`.secret` API MAY BE DELETED OR CHANGED OR RENAMED, DO NOT USE!");
          var gun = this, user = gun.back(-1).user(), pair = user.pair(), path2 = "";
          gun.back(function(at) {
            if (at.is) {
              return;
            }
            path2 += at.get || "";
          });
          (async function() {
            var enc, sec = await user.get("trust").get(pair.pub).get(path2).then();
            sec = await SEA.decrypt(sec, pair);
            if (!sec) {
              sec = SEA.random(16).toString();
              enc = await SEA.encrypt(sec, pair);
              user.get("trust").get(pair.pub).get(path2).put(enc);
            }
            enc = await SEA.encrypt(data, sec);
            gun.put(enc, cb);
          })();
          return gun;
        };
        module2.exports = User;
      })(USE, "./share");
      ;
      USE(function(module2) {
        var SEA = USE("./sea"), S2 = USE("./settings"), noop3 = function() {
        }, u;
        var Gun2 = "" + u != typeof window ? window.Gun || { on: noop3 } : USE(("" + u === typeof MODULE ? "." : "") + "./gun", 1);
        Gun2.on("opt", function(at) {
          if (!at.sea) {
            at.sea = { own: {} };
            at.on("put", check, at);
          }
          this.to.next(at);
        });
        function check(msg) {
          var eve = this, at = eve.as, put = msg.put, soul = put["#"], key2 = put["."], val = put[":"], state = put[">"], id = msg["#"], tmp;
          if (!soul || !key2) {
            return;
          }
          if ((msg._ || "").faith && (at.opt || "").faith && typeof msg._ == "function") {
            SEA.opt.pack(put, function(raw) {
              SEA.verify(raw, false, function(data) {
                put["="] = SEA.opt.unpack(data);
                eve.to.next(msg);
              });
            });
            return;
          }
          var no = function(why) {
            at.on("in", { "@": id, err: msg.err = why });
          };
          (msg._ || "").DBG && ((msg._ || "").DBG.c = +new Date());
          if (0 <= soul.indexOf("<?")) {
            tmp = parseFloat(soul.split("<?")[1] || "");
            if (tmp && state < Gun2.state() - tmp * 1e3) {
              (tmp = msg._) && tmp.stun && tmp.stun--;
              return;
            }
          }
          if (soul === "~@") {
            check.alias(eve, msg, val, key2, soul, at, no);
            return;
          }
          if (soul.slice(0, 2) === "~@") {
            check.pubs(eve, msg, val, key2, soul, at, no);
            return;
          }
          if (tmp = SEA.opt.pub(soul)) {
            check.pub(eve, msg, val, key2, soul, at, no, at.user || "", tmp);
            return;
          }
          if (0 <= soul.indexOf("#")) {
            check.hash(eve, msg, val, key2, soul, at, no);
            return;
          }
          check.any(eve, msg, val, key2, soul, at, no, at.user || "");
          return;
          eve.to.next(msg);
        }
        check.hash = function(eve, msg, val, key2, soul, at, no) {
          SEA.work(val, null, function(data) {
            if (data && data === key2.split("#").slice(-1)[0]) {
              return eve.to.next(msg);
            }
            no("Data hash not same as hash!");
          }, { name: "SHA-256" });
        };
        check.alias = function(eve, msg, val, key2, soul, at, no) {
          if (!val) {
            return no("Data must exist!");
          }
          if ("~@" + key2 === link_is(val)) {
            return eve.to.next(msg);
          }
          no("Alias not same!");
        };
        check.pubs = function(eve, msg, val, key2, soul, at, no) {
          if (!val) {
            return no("Alias must exist!");
          }
          if (key2 === link_is(val)) {
            return eve.to.next(msg);
          }
          no("Alias not same!");
        };
        check.pub = async function(eve, msg, val, key2, soul, at, no, user, pub) {
          var tmp;
          const raw = await S2.parse(val) || {};
          const verify = (certificate, certificant, cb) => {
            if (certificate.m && certificate.s && certificant && pub)
              return SEA.verify(certificate, pub, (data) => {
                if (u !== data && u !== data.e && msg.put[">"] && msg.put[">"] > parseFloat(data.e))
                  return no("Certificate expired.");
                if (u !== data && data.c && data.w && (data.c === certificant || data.c.indexOf("*") > -1)) {
                  let path2 = soul.indexOf("/") > -1 ? soul.replace(soul.substring(0, soul.indexOf("/") + 1), "") : "";
                  String.match = String.match || Gun2.text.match;
                  const w = Array.isArray(data.w) ? data.w : typeof data.w === "object" || typeof data.w === "string" ? [data.w] : [];
                  for (const lex of w) {
                    if (String.match(path2, lex["#"]) && String.match(key2, lex["."]) || !lex["."] && String.match(path2, lex["#"]) || !lex["#"] && String.match(key2, lex["."]) || String.match(path2 ? path2 + "/" + key2 : key2, lex["#"] || lex)) {
                      if (lex["+"] && lex["+"].indexOf("*") > -1 && path2 && path2.indexOf(certificant) == -1 && key2.indexOf(certificant) == -1)
                        return no(`Path "${path2}" or key "${key2}" must contain string "${certificant}".`);
                      if (data.wb && (typeof data.wb === "string" || (data.wb || {})["#"])) {
                        var root = eve.as.root.$.back(-1);
                        if (typeof data.wb === "string" && data.wb.slice(0, 1) !== "~")
                          root = root.get("~" + pub);
                        return root.get(data.wb).get(certificant).once((value) => {
                          if (value && (value === 1 || value === true))
                            return no(`Certificant ${certificant} blocked.`);
                          return cb(data);
                        });
                      }
                      return cb(data);
                    }
                  }
                  return no("Certificate verification fail.");
                }
              });
            return;
          };
          if (key2 === "pub" && "~" + pub === soul) {
            if (val === pub)
              return eve.to.next(msg);
            return no("Account not same!");
          }
          if ((tmp = user.is) && tmp.pub && !raw["*"] && !raw["+"] && (pub === tmp.pub || pub !== tmp.pub && ((msg._.msg || {}).opt || {}).cert)) {
            SEA.opt.pack(msg.put, (packed) => {
              SEA.sign(packed, user._.sea, async function(data) {
                if (u === data)
                  return no(SEA.err || "Signature fail.");
                msg.put[":"] = { ":": tmp = SEA.opt.unpack(data.m), "~": data.s };
                msg.put["="] = tmp;
                if (pub === user.is.pub) {
                  if (tmp = link_is(val))
                    (at.sea.own[tmp] = at.sea.own[tmp] || {})[pub] = 1;
                  JSON.stringifyAsync(msg.put[":"], function(err, s3) {
                    if (err) {
                      return no(err || "Stringify error.");
                    }
                    msg.put[":"] = s3;
                    return eve.to.next(msg);
                  });
                  return;
                }
                if (pub !== user.is.pub && ((msg._.msg || {}).opt || {}).cert) {
                  const cert = await S2.parse(msg._.msg.opt.cert);
                  if (cert && cert.m && cert.s)
                    verify(cert, user.is.pub, (_) => {
                      msg.put[":"]["+"] = cert;
                      msg.put[":"]["*"] = user.is.pub;
                      JSON.stringifyAsync(msg.put[":"], function(err, s3) {
                        if (err) {
                          return no(err || "Stringify error.");
                        }
                        msg.put[":"] = s3;
                        return eve.to.next(msg);
                      });
                      return;
                    });
                }
              }, { raw: 1 });
            });
            return;
          }
          SEA.opt.pack(msg.put, (packed) => {
            SEA.verify(packed, raw["*"] || pub, function(data) {
              var tmp2;
              data = SEA.opt.unpack(data);
              if (u === data)
                return no("Unverified data.");
              if ((tmp2 = link_is(data)) && pub === SEA.opt.pub(tmp2))
                (at.sea.own[tmp2] = at.sea.own[tmp2] || {})[pub] = 1;
              if (raw["+"] && raw["+"]["m"] && raw["+"]["s"] && raw["*"])
                verify(raw["+"], raw["*"], (_) => {
                  msg.put["="] = data;
                  return eve.to.next(msg);
                });
              else {
                msg.put["="] = data;
                return eve.to.next(msg);
              }
            });
          });
          return;
        };
        check.any = function(eve, msg, val, key2, soul, at, no, user) {
          var tmp, pub;
          if (at.opt.secure) {
            return no("Soul missing public key at '" + key2 + "'.");
          }
          at.on("secure", function(msg2) {
            this.off();
            if (!at.opt.secure) {
              return eve.to.next(msg2);
            }
            no("Data cannot be changed.");
          }).on.on("secure", msg);
          return;
        };
        var valid = Gun2.valid, link_is = function(d, l) {
          return typeof (l = valid(d)) == "string" && l;
        }, state_ify = (Gun2.state || "").ify;
        var pubcut = /[^\w_-]/;
        SEA.opt.pub = function(s3) {
          if (!s3) {
            return;
          }
          s3 = s3.split("~");
          if (!s3 || !(s3 = s3[1])) {
            return;
          }
          s3 = s3.split(pubcut).slice(0, 2);
          if (!s3 || s3.length != 2) {
            return;
          }
          if ((s3[0] || "")[0] === "@") {
            return;
          }
          s3 = s3.slice(0, 2).join(".");
          return s3;
        };
        SEA.opt.stringy = function(t2) {
        };
        SEA.opt.pack = function(d, cb, k, n, s3) {
          var tmp, f3;
          if (SEA.opt.check(d)) {
            return cb(d);
          }
          if (d && d["#"] && d["."] && d[">"]) {
            tmp = d[":"];
            f3 = 1;
          }
          JSON.parseAsync(f3 ? tmp : d, function(err, meta) {
            var sig = u !== (meta || "")[":"] && (meta || "")["~"];
            if (!sig) {
              cb(d);
              return;
            }
            cb({ m: { "#": s3 || d["#"], ".": k || d["."], ":": (meta || "")[":"], ">": d[">"] || Gun2.state.is(n, k) }, s: sig });
          });
        };
        var O = SEA.opt;
        SEA.opt.unpack = function(d, k, n) {
          var tmp;
          if (u === d) {
            return;
          }
          if (d && u !== (tmp = d[":"])) {
            return tmp;
          }
          k = k || O.fall_key;
          if (!n && O.fall_val) {
            n = {};
            n[k] = O.fall_val;
          }
          if (!k || !n) {
            return;
          }
          if (d === n[k]) {
            return d;
          }
          if (!SEA.opt.check(n[k])) {
            return d;
          }
          var soul = n && n._ && n._["#"] || O.fall_soul, s3 = Gun2.state.is(n, k) || O.fall_state;
          if (d && d.length === 4 && soul === d[0] && k === d[1] && fl(s3) === fl(d[3])) {
            return d[2];
          }
          if (s3 < SEA.opt.shuffle_attack) {
            return d;
          }
        };
        SEA.opt.shuffle_attack = 15463296e5;
        var fl = Math.floor;
      })(USE, "./index");
    })();
  }
});

// node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/axe.js
var require_axe = __commonJS({
  "node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/axe.js"(exports, module) {
    (function() {
      function USE(arg, req) {
        return req ? __require(arg) : arg.slice ? USE[R(arg)] : function(mod, path2) {
          arg(mod = { exports: {} });
          USE[R(path2)] = mod.exports;
        };
        function R(p) {
          return p.split("/").slice(-1).toString().replace(".js", "");
        }
      }
      if (typeof module !== "undefined") {
        var MODULE = module;
      }
      ;
      USE(function(module2) {
        if (typeof window !== "undefined") {
          module2.window = window;
        }
        var tmp = module2.window || module2;
        var AXE = tmp.AXE || function() {
        };
        if (AXE.window = module2.window) {
          AXE.window.AXE = AXE;
        }
        try {
          if (typeof MODULE !== "undefined") {
            MODULE.exports = AXE;
          }
        } catch (e2) {
        }
        module2.exports = AXE;
      })(USE, "./root");
      ;
      USE(function(module2) {
        var AXE = USE("./root"), Gun2 = (AXE.window || "").Gun || USE("./gun", 1);
        (Gun2.AXE = AXE).GUN = AXE.Gun = Gun2;
        var ST = 0;
        if (!Gun2.window) {
          try {
            USE("./lib/axe", 1);
          } catch (e2) {
          }
        }
        Gun2.on("opt", function(at) {
          start(at);
          this.to.next(at);
        });
        function start(root) {
          if (root.axe) {
            return;
          }
          var opt = root.opt, peers = opt.peers;
          if (opt.axe === false) {
            return;
          }
          if (typeof process !== "undefined" && "" + (process.env || "").AXE === "false") {
            return;
          }
          if (!Gun2.window) {
            return;
          }
          var axe = root.axe = {}, tmp, id;
          tmp = peers[id = "http://localhost:8765/gun"] = peers[id] || {};
          tmp.id = tmp.url = id;
          tmp.retry = tmp.retry || 0;
          Gun2.log.once("AXE", "AXE enabled: Trying to find network via (1) local peer (2) last used peers (3) hard coded peers.");
          Gun2.log.once("AXEWarn", "Warning: AXE alpha became super slow & laggy, now in testing only mode!");
          var last = JSON.parse((localStorage || "")[(opt.file || "") + "axe/"] || null) || {};
          Object.keys(last.peers || "").forEach(function(key2) {
            tmp = peers[id = key2] = peers[id] || {};
            tmp.id = tmp.url = id;
          });
          tmp = peers[id = "https://guntest.herokuapp.com/gun"] = peers[id] || {};
          tmp.id = tmp.url = id;
          var mesh = opt.mesh = opt.mesh || Gun2.Mesh(root);
          mesh.way = function(msg) {
            if (root.$ === msg.$ || (msg._ || "").via) {
              mesh.say(msg, opt.peers);
              return;
            }
            var at = (msg.$ || "")._;
            if (!at) {
              mesh.say(msg, opt.peers);
              return;
            }
            if (msg.get) {
              if (at.axe) {
                return;
              }
              at.axe = {};
            }
            mesh.say(msg, opt.peers);
          };
        }
        var empty = {}, yes = true, u;
        module2.exports = AXE;
      })(USE, "./axe");
    })();
  }
});

// node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/multicast.js
var require_multicast = __commonJS({
  "node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/multicast.js"() {
    var Gun2 = typeof window !== "undefined" ? window.Gun : require_gun();
    Gun2.on("create", function(root) {
      this.to.next(root);
      var opt = root.opt;
      if (opt.multicast === false) {
        return;
      }
      if (typeof process !== "undefined" && "" + (process.env || {}).MULTICAST === "false") {
        return;
      }
      var udp = opt.multicast = opt.multicast || {};
      udp.address = udp.address || "233.255.255.255";
      udp.pack = udp.pack || 5e4;
      udp.port = udp.port || 8765;
      var noop3 = function() {
      }, u;
      var pid = "2" + Math.random().toString().slice(-8);
      var mesh = opt.mesh = opt.mesh || Gun2.Mesh(root);
      var dgram;
      try {
        dgram = __require("dgram");
      } catch (e2) {
        return;
      }
      var socket = dgram.createSocket({ type: "udp4", reuseAddr: true });
      socket.bind({ port: udp.port, exclusive: true }, function() {
        socket.setBroadcast(true);
        socket.setMulticastTTL(128);
      });
      socket.on("listening", function() {
        try {
          socket.addMembership(udp.address);
        } catch (e2) {
          console.error(e2);
          return;
        }
        udp.peer = { id: udp.address + ":" + udp.port, wire: socket };
        udp.peer.say = function(raw) {
          var buf = Buffer.from(raw, "utf8");
          if (udp.pack <= buf.length) {
            return;
          }
          socket.send(buf, 0, buf.length, udp.port, udp.address, noop3);
        };
        Gun2.log.once("Multicast on", udp.peer.id);
        return;
        setInterval(function broadcast() {
          port = port || (opt.web && opt.web.address() || {}).port;
          if (!port) {
            return;
          }
          udp.peer.say(JSON.stringify({ id: opt.pid || (opt.pid = Math.random().toString(36).slice(2)), port }));
        }, 1e3);
      });
      socket.on("message", function(raw, info) {
        try {
          if (!raw) {
            return;
          }
          raw = raw.toString("utf8");
          if (raw[0] === "2") {
            return check(raw, info);
          }
          opt.mesh.hear(raw, udp.peer);
          return;
          var message;
          message = JSON.parse(raw.toString("utf8"));
          if (opt.pid === message.id) {
            return;
          }
          var url = "http://" + info.address + ":" + (port || (opt.web && opt.web.address() || {}).port) + "/gun";
          if (root.opt.peers[url]) {
            return;
          }
          root.$.opt(url);
        } catch (e2) {
          return;
        }
      });
      function say(msg) {
        this.to.next(msg);
        if (!udp.peer) {
          return;
        }
        mesh.say(msg, udp.peer);
      }
      function check(id, info) {
        var tmp;
        if (!udp.peer) {
          return;
        }
        if (!id) {
          id = check.id = check.id || Buffer.from(pid, "utf8");
          socket.send(id, 0, id.length, udp.port, udp.address, noop3);
          return;
        }
        if ((tmp = root.stats) && (tmp = tmp.gap) && info) {
          (tmp.near || (tmp.near = {}))[info.address] = info.port || 1;
        }
        if (check.on || id === pid) {
          return;
        }
        root.on("out", check.on = say);
      }
      setInterval(check, 1e3 * 1);
    });
  }
});

// node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/stats.js
var require_stats = __commonJS({
  "node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/stats.js"() {
    var Gun2 = typeof window !== "undefined" ? window.Gun : require_gun();
    Gun2.on("opt", function(root) {
      this.to.next(root);
      if (root.once) {
        return;
      }
      if (typeof process === "undefined") {
        return;
      }
      if (typeof __require === "undefined") {
        return;
      }
      if (root.opt.stats === false) {
        return;
      }
      var path2 = __require("path") || {};
      var file = root.opt.file ? path2.resolve(root.opt.file).split(path2.sep).slice(-1)[0] : "radata";
      var noop4 = function() {
      };
      var os = __require("os") || {};
      var fs = __require("fs") || {};
      fs.existsSync = fs.existsSync || path2.existsSync;
      if (!fs.existsSync) {
        return;
      }
      if (!process) {
        return;
      }
      process.uptime = process.uptime || noop4;
      process.cpuUsage = process.cpuUsage || noop4;
      process.memoryUsage = process.memoryUsage || noop4;
      os.totalmem = os.totalmem || noop4;
      os.freemem = os.freemem || noop4;
      os.loadavg = os.loadavg || noop4;
      os.cpus = os.cpus || noop4;
      var S2 = +new Date(), W;
      var obj_ify = function(o) {
        try {
          o = JSON.parse(o);
        } catch (e2) {
          o = {};
        }
        ;
        return o;
      };
      setTimeout(function() {
        root.stats = obj_ify(fs.existsSync(__dirname + "/../stats." + file) && fs.readFileSync(__dirname + "/../stats." + file).toString()) || {};
        root.stats.up = root.stats.up || {};
        root.stats.up.start = root.stats.up.start || +new Date();
        root.stats.up.count = (root.stats.up.count || 0) + 1;
        root.stats.stay = root.stats.stay || {};
        root.stats.over = +new Date();
      }, 1);
      setInterval(function() {
        if (!root.stats) {
          root.stats = {};
        }
        if (W) {
          return;
        }
        var stats = root.stats, tmp;
        stats.over = -(S2 - (S2 = +new Date()));
        (stats.up || {}).time = process.uptime();
        stats.memory = process.memoryUsage() || {};
        stats.memory.totalmem = os.totalmem();
        stats.memory.freemem = os.freemem();
        stats.cpu = process.cpuUsage() || {};
        stats.cpu.loadavg = os.loadavg();
        stats.cpu.stack = (((setTimeout || "").turn || "").s || "").length;
        stats.peers = {};
        stats.peers.count = console.STAT.peers || Object.keys(root.opt.peers || {}).length;
        stats.node = {};
        stats.node.count = Object.keys(root.graph || {}).length;
        stats.all = all;
        stats.sites = console.STAT.sites;
        all = {};
        var dam = root.opt.mesh;
        if (dam) {
          stats.dam = { "in": { count: dam.hear.c, done: dam.hear.d }, "out": { count: dam.say.c, done: dam.say.d } };
          dam.hear.c = dam.hear.d = dam.say.c = dam.say.d = 0;
          stats.peers.time = dam.bye.time || 0;
        }
        var rad = root.opt.store;
        rad = rad && rad.stats;
        if (rad) {
          stats.rad = rad;
          root.opt.store.stats = { get: { time: {}, count: 0 }, put: { time: {}, count: 0 } };
        }
        JSON.stringifyAsync(stats, function(err, raw) {
          if (err) {
            return;
          }
          W = true;
          fs.writeFile(__dirname + "/../stats." + file, raw, function(err2) {
            W = false;
            err2 && console.log(console.STAT.err = err2);
            console.STAT && console.STAT(S2, +new Date() - S2, "stats stash");
          });
        });
      }, 1e3 * 5);
    });
    var exec2 = __require("child_process").exec;
    require_yson();
    var log = Gun2.log;
    var all = {};
    var max = 1e3;
    Gun2.log = console.STAT = function(a, b, c, d) {
      if (typeof a == "number" && typeof b == "number" && typeof c == "string") {
        var tmp = all[c] || (all[c] = []);
        if (max < tmp.push([a, b])) {
          all[c] = [];
        }
      }
      if (!console.LOG || log.off) {
        return a;
      }
      return log.apply(Gun2, arguments);
    };
    Gun2.log.once = function(w, s3, o) {
      return (o = Gun2.log.once)[w] = o[w] || 0, o[w]++ || Gun2.log(s3);
    };
  }
});

// node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/server.js
var require_server = __commonJS({
  "node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/lib/server.js"(exports, module) {
    (function() {
      require_yson();
      var Gun2 = require_gun(), u;
      Gun2.serve = require_serve();
      Gun2.on("opt", function(root) {
        if (u === root.opt.super) {
          root.opt.super = true;
        }
        if (u === root.opt.faith) {
          root.opt.faith = true;
        }
        root.opt.log = root.opt.log || Gun2.log;
        this.to.next(root);
      });
      require_store();
      require_rfs();
      require_rs3();
      require_wire();
      try {
        require_sea();
      } catch (e2) {
      }
      try {
        require_axe();
      } catch (e2) {
      }
      require_multicast();
      require_stats();
      module.exports = Gun2;
    })();
  }
});

// node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/index.js
var require_gun2 = __commonJS({
  "node_modules/.pnpm/gun@0.2020.1237/node_modules/gun/index.js"(exports, module) {
    module.exports = require_server();
  }
});

// node_modules/.pnpm/js-cookie@3.0.1/node_modules/js-cookie/dist/js.cookie.mjs
function assign(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key2 in source) {
      target[key2] = source[key2];
    }
  }
  return target;
}
function init2(converter, defaultAttributes) {
  function set(key2, value, attributes) {
    if (typeof document === "undefined") {
      return;
    }
    attributes = assign({}, defaultAttributes, attributes);
    if (typeof attributes.expires === "number") {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
    }
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString();
    }
    key2 = encodeURIComponent(key2).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
    var stringifiedAttributes = "";
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue;
      }
      stringifiedAttributes += "; " + attributeName;
      if (attributes[attributeName] === true) {
        continue;
      }
      stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
    }
    return document.cookie = key2 + "=" + converter.write(value, key2) + stringifiedAttributes;
  }
  function get(key2) {
    if (typeof document === "undefined" || arguments.length && !key2) {
      return;
    }
    var cookies = document.cookie ? document.cookie.split("; ") : [];
    var jar = {};
    for (var i2 = 0; i2 < cookies.length; i2++) {
      var parts = cookies[i2].split("=");
      var value = parts.slice(1).join("=");
      try {
        var foundKey = decodeURIComponent(parts[0]);
        jar[foundKey] = converter.read(value, foundKey);
        if (key2 === foundKey) {
          break;
        }
      } catch (e2) {
      }
    }
    return key2 ? jar[key2] : jar;
  }
  return Object.create({
    set,
    get,
    remove: function(key2, attributes) {
      set(key2, "", assign({}, attributes, {
        expires: -1
      }));
    },
    withAttributes: function(attributes) {
      return init2(this.converter, assign({}, this.attributes, attributes));
    },
    withConverter: function(converter2) {
      return init2(assign({}, this.converter, converter2), this.attributes);
    }
  }, {
    attributes: { value: Object.freeze(defaultAttributes) },
    converter: { value: Object.freeze(converter) }
  });
}
var defaultConverter, api;
var init_js_cookie = __esm({
  "node_modules/.pnpm/js-cookie@3.0.1/node_modules/js-cookie/dist/js.cookie.mjs"() {
    defaultConverter = {
      read: function(value) {
        if (value[0] === '"') {
          value = value.slice(1, -1);
        }
        return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
      },
      write: function(value) {
        return encodeURIComponent(value).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);
      }
    };
    api = init2(defaultConverter, { path: "/" });
  }
});

// .svelte-kit/output/server/chunks/user-0ecc2e59.js
var import_gun, import_sea, db;
var init_user_0ecc2e59 = __esm({
  ".svelte-kit/output/server/chunks/user-0ecc2e59.js"() {
    import_gun = __toESM(require_gun2(), 1);
    import_sea = __toESM(require_sea(), 1);
    init_index_11e5a9f0();
    init_js_cookie();
    db = (0, import_gun.default)({
      peers: ["http://localhost:8080/gun"]
    });
    db.user().recall({ sessionStorage: true });
  }
});

// .svelte-kit/output/server/chunks/Board-fbd14c15.js
var Move_viewer, Game_state, Board;
var init_Board_fbd14c15 = __esm({
  ".svelte-kit/output/server/chunks/Board-fbd14c15.js"() {
    init_index_11e5a9f0();
    init_user_0ecc2e59();
    Move_viewer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let el;
      let viewableLog = [];
      return `<div class="${"ml-5 font-mono relative h-96 flex flex-col-reverse overflow-y-auto"}"><div${add_attribute("this", el, 0)}>LOG</div>
	<div>${each(viewableLog, (line, i2) => {
        return `<p>${escape2(i2 + 1)}. ${escape2(line)}</p>`;
      })}</div></div>`;
    });
    Game_state = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { state } = $$props;
      if ($$props.state === void 0 && $$bindings.state && state !== void 0)
        $$bindings.state(state);
      return `${state.win || state.stale || state.resign ? `<div class="${"w-screen h-screen bg-[black] opacity-1 fixed top-0 left-0 z-[1000] text-[white] flex justify-center items-center flex-col overflow-hidden"}">${state.win ? `<h1 class="${"text-2xl text-orange"}">${escape2(state.who)} Won!</h1>` : ``}
    ${state.stale ? `<h1 class="${"text-2xl text-orange"}">Stalemate!</h1>` : ``}
    ${state.resign ? `<h1 class="${"text-2xl text-orange"}">${escape2(state.who)} resigned!</h1>` : ``}
    <p class="${"text-xl mt-3"}">${escape2(state.state)}</p>
    <button class="${"text-xl mt-5 z-[5000]"}">Reset</button></div>` : ``}`;
    });
    Board = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let boardElement;
      let { board = {} } = $$props;
      let { multi = false } = $$props;
      if (board.a1 != null) {
        console.log("passed in: ", board);
      } else {
        board = {};
      }
      let cols = new Array(8).fill({});
      let { turn = "w" } = $$props;
      let rows = ["a", "b", "c", "d", "e", "f", "g", "h"];
      if (board.a1 == void 0) {
        rows.forEach((r2) => {
          cols.forEach((_, c) => {
            let id = r2 + (c + 1);
            board[id] = {
              tile: "",
              tile_type: "",
              tile_color: "",
              id
            };
          });
        });
      }
      let { game_state = {} } = $$props;
      if ($$props.board === void 0 && $$bindings.board && board !== void 0)
        $$bindings.board(board);
      if ($$props.multi === void 0 && $$bindings.multi && multi !== void 0)
        $$bindings.multi(multi);
      if ($$props.turn === void 0 && $$bindings.turn && turn !== void 0)
        $$bindings.turn(turn);
      if ($$props.game_state === void 0 && $$bindings.game_state && game_state !== void 0)
        $$bindings.game_state(game_state);
      return `<main>${validate_component(Game_state, "EndScreen").$$render($$result, { state: game_state }, {}, {})}
	<h1 class="${"font-sans"}">Goats and tigers</h1>
	<button>reset</button>

	<div class="${"flex"}"><div id="${"board-holder"}" class="${"h-[25vh] w-[40%] mmd:w-[80%]"}"${add_attribute("this", boardElement, 0)}>${each(rows, (_, rowId) => {
        return `<div class="${"flex relative"}">${each(cols, (_2, colId) => {
          return `${colId % 2 == 0 && rowId % 2 == 0 ? `<div${add_attribute("id", rows[rowId] + (colId + 1), 0)} class="${"w-[30%] pb-[12.6%] relative h-0 bg-green tile"}"${add_attribute("this", board[rows[rowId] + (colId + 1)].el, 0)}><div id="${"indicator"}"><div id="${"overlay"}"></div></div>
								<img${add_attribute("src", board[rows[rowId] + (colId + 1)].tile, 0)} class="${"object-contain p-2"}"${add_attribute("alt", board[rows[rowId] + (colId + 1)].tile, 0)}>
							</div>` : `${rowId % 2 != 0 && colId % 2 != 0 ? `<div${add_attribute("id", rows[rowId] + (colId + 1), 0)} class="${"w-[30%] h-0 pb-[12.6%] relative bg-green tile"}"${add_attribute("this", board[rows[rowId] + (colId + 1)].el, 0)}><div id="${"indicator"}"><div id="${"overlay"}"></div></div>
								<img${add_attribute("src", board[rows[rowId] + (colId + 1)].tile, 0)} class="${"object-contain p-2"}"${add_attribute("alt", board[rows[rowId] + (colId + 1)].tile, 0)}>
							</div>` : `<div${add_attribute("id", rows[rowId] + (colId + 1), 0)} class="${"w-[30%] h-0 pb-[12.6%] relative bg-blush tile"}"${add_attribute("this", board[rows[rowId] + (colId + 1)].el, 0)}><div id="${"indicator"}"><div id="${"overlay"}"></div></div>
								<img${add_attribute("src", board[rows[rowId] + (colId + 1)].tile, 0)} class="${"object-contain p-2"}"${add_attribute("alt", board[rows[rowId] + (colId + 1)].tile, 0)}>
							</div>`}`}`;
        })}
				</div>`;
      })}</div>
		${validate_component(Move_viewer, "Viewer").$$render($$result, {}, {}, {})}</div></main>`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/index.svelte.js
var index_svelte_exports = {};
__export(index_svelte_exports, {
  default: () => Routes
});
var import_gun2, import_sea2, Routes;
var init_index_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/index.svelte.js"() {
    init_index_11e5a9f0();
    init_user_0ecc2e59();
    init_Board_fbd14c15();
    import_gun2 = __toESM(require_gun2(), 1);
    import_sea2 = __toESM(require_sea(), 1);
    init_js_cookie();
    Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      var myDate = new Date();
      var currentHour = myDate.getHours();
      let msg;
      let username;
      if (currentHour < 12)
        msg = "Good Morning";
      else if (currentHour == 12)
        msg = "Good Noon";
      else if (currentHour >= 12 && currentHour <= 17)
        msg = "Good Afternoon";
      else if (currentHour >= 17 && currentHour <= 24)
        msg = "Good Evening";
      return `<h1 class="${"text-2xl font-bold mb-5"}">${escape2(msg)}, ${escape2(username)}.</h1>
${validate_component(Board, "Board").$$render($$result, {}, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  css: () => css3,
  entry: () => entry3,
  js: () => js3,
  module: () => index_svelte_exports
});
var entry3, js3, css3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    init_index_svelte();
    entry3 = "pages/index.svelte-9c220d52.js";
    js3 = ["pages/index.svelte-9c220d52.js", "chunks/index-ec26513d.js", "chunks/user-b5e473cf.js", "chunks/index-63348562.js", "chunks/Board-8ee8ca34.js", "chunks/paths-c0fc83a9.js"];
    css3 = [];
  }
});

// .svelte-kit/output/server/entries/pages/login.svelte.js
var login_svelte_exports = {};
__export(login_svelte_exports, {
  default: () => Login
});
var import_gun3, import_sea3, Login;
var init_login_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/login.svelte.js"() {
    init_index_11e5a9f0();
    init_user_0ecc2e59();
    import_gun3 = __toESM(require_gun2(), 1);
    import_sea3 = __toESM(require_sea(), 1);
    init_js_cookie();
    Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let password;
      let username;
      return `<input placeholder="${"username"}" class="${"text-[black]"}"${add_attribute("value", username, 0)}>
<input placeholder="${"password"}" type="${"password"}" class="${"text-[black]"}"${add_attribute("value", password, 0)}>

<button>Login</button>
<button>signup</button>`;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  css: () => css4,
  entry: () => entry4,
  js: () => js4,
  module: () => login_svelte_exports
});
var entry4, js4, css4;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    init_login_svelte();
    entry4 = "pages/login.svelte-316b62a2.js";
    js4 = ["pages/login.svelte-316b62a2.js", "chunks/index-ec26513d.js", "chunks/user-b5e473cf.js", "chunks/index-63348562.js"];
    css4 = [];
  }
});

// .svelte-kit/output/server/entries/pages/multi.svelte.js
var multi_svelte_exports = {};
__export(multi_svelte_exports, {
  default: () => Multi
});
var import_gun4, import_sea4, Multi;
var init_multi_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/multi.svelte.js"() {
    init_index_11e5a9f0();
    init_Board_fbd14c15();
    init_user_0ecc2e59();
    init_js_cookie();
    import_gun4 = __toESM(require_gun2(), 1);
    import_sea4 = __toESM(require_sea(), 1);
    Multi = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let board_state;
      let this_turn = "w";
      let board_win_state;
      return `${`<div class="${"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-[black] w-screen h-screen bg-opacity-90 flex justify-center items-center flex-col text-xl"}">${`<div><button class="${"m-2 bg-orange p-1"}">New game</button>
				<button class="${"m-2 bg-orange p-1"}">Join game</button></div>`}
		${``}
		${``}</div>`}
<p class="${"-z-10"}">You: ${escape2(this_turn)}</p>
<p class="${"-z-10"}">current turn: ${escape2("")}</p>
<button>Resign</button>
${validate_component(Board, "Board").$$render($$result, {
        multi: true,
        board: board_state,
        turn: this_turn,
        game_state: board_win_state
      }, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  css: () => css5,
  entry: () => entry5,
  js: () => js5,
  module: () => multi_svelte_exports
});
var entry5, js5, css5;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    init_multi_svelte();
    entry5 = "pages/multi.svelte-f635b32f.js";
    js5 = ["pages/multi.svelte-f635b32f.js", "chunks/index-ec26513d.js", "chunks/Board-8ee8ca34.js", "chunks/paths-c0fc83a9.js", "chunks/index-63348562.js", "chunks/user-b5e473cf.js"];
    css5 = [];
  }
});

// .svelte-kit/vercel-tmp/serverless.js
init_install_fetch();

// node_modules/.pnpm/@sveltejs+kit@1.0.0-next.330_svelte@3.48.0/node_modules/@sveltejs/kit/dist/node.js
import { Readable } from "stream";
function get_raw_body(req) {
  return new Promise((fulfil, reject) => {
    const h2 = req.headers;
    if (!h2["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h2["content-length"]);
    if (isNaN(length) && h2["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data, 0);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      fulfil(data);
    });
  });
}
async function getRequest(base2, req) {
  let headers = req.headers;
  if (req.httpVersionMajor === 2) {
    headers = Object.assign({}, headers);
    delete headers[":method"];
    delete headers[":path"];
    delete headers[":authority"];
    delete headers[":scheme"];
  }
  return new Request(base2 + req.url, {
    method: req.method,
    headers,
    body: await get_raw_body(req)
  });
}
async function setResponse(res, response) {
  const headers = Object.fromEntries(response.headers);
  if (response.headers.has("set-cookie")) {
    headers["set-cookie"] = response.headers.raw()["set-cookie"];
  }
  res.writeHead(response.status, headers);
  if (response.body instanceof Readable) {
    response.body.pipe(res);
  } else {
    if (response.body) {
      res.write(await response.arrayBuffer());
    }
    res.end();
  }
}

// .svelte-kit/output/server/index.js
init_index_11e5a9f0();
var __defProp2 = Object.defineProperty;
var __defProps2 = Object.defineProperties;
var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key2, value) => key2 in obj ? __defProp2(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps2 = (a, b) => __defProps2(a, __getOwnPropDescs2(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum2.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  {
    stores.page.set(page);
  }
  return `


${components[1] ? `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => {
      return `${components[2] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
        default: () => {
          return `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}`;
        }
      })}` : `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {})}`}`;
    }
  })}` : `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {})}`}

${``}`;
});
function to_headers(object) {
  const headers = new Headers();
  if (object) {
    for (const key2 in object) {
      const value = object[key2];
      if (!value)
        continue;
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          headers.append(key2, value2);
        });
      } else {
        headers.set(key2, value);
      }
    }
  }
  return headers;
}
function hash(value) {
  let hash2 = 5381;
  let i2 = value.length;
  if (typeof value === "string") {
    while (i2)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i2);
  } else {
    while (i2)
      hash2 = hash2 * 33 ^ value[--i2];
  }
  return (hash2 >>> 0).toString(36);
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key2 in obj) {
    clone2[key2.toLowerCase()] = obj[key2];
  }
  return clone2;
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = params[key2].replace(/%23/g, "#").replace(/%3[Bb]/g, ";").replace(/%2[Cc]/g, ",").replace(/%2[Ff]/g, "/").replace(/%3[Ff]/g, "?").replace(/%3[Aa]/g, ":").replace(/%40/g, "@").replace(/%26/g, "&").replace(/%3[Dd]/g, "=").replace(/%2[Bb]/g, "+").replace(/%24/g, "$");
  }
  return params;
}
function is_pojo(body) {
  if (typeof body !== "object")
    return false;
  if (body) {
    if (body instanceof Uint8Array)
      return false;
    if (body._readableState && typeof body.pipe === "function")
      return false;
    if (typeof ReadableStream !== "undefined" && body instanceof ReadableStream)
      return false;
  }
  return true;
}
function normalize_request_method(event) {
  const method = event.request.method.toLowerCase();
  return method === "delete" ? "del" : method;
}
function error(body) {
  return new Response(body, {
    status: 500
  });
}
function is_string(s22) {
  return typeof s22 === "string" || s22 instanceof String;
}
var text_types = /* @__PURE__ */ new Set([
  "application/xml",
  "application/json",
  "application/x-www-form-urlencoded",
  "multipart/form-data"
]);
function is_text(content_type) {
  if (!content_type)
    return true;
  const type = content_type.split(";")[0].toLowerCase();
  return type.startsWith("text/") || type.endsWith("+xml") || text_types.has(type);
}
async function render_endpoint(event, mod) {
  const method = normalize_request_method(event);
  let handler = mod[method];
  if (!handler && method === "head") {
    handler = mod.get;
  }
  if (!handler) {
    const allowed = [];
    for (const method2 in ["get", "post", "put", "patch"]) {
      if (mod[method2])
        allowed.push(method2.toUpperCase());
    }
    if (mod.del)
      allowed.push("DELETE");
    if (mod.get || mod.head)
      allowed.push("HEAD");
    return event.request.headers.get("x-sveltekit-load") ? new Response(void 0, {
      status: 204
    }) : new Response(`${event.request.method} method not allowed`, {
      status: 405,
      headers: {
        allow: allowed.join(", ")
      }
    });
  }
  const response = await handler(event);
  const preface = `Invalid response from route ${event.url.pathname}`;
  if (typeof response !== "object") {
    return error(`${preface}: expected an object, got ${typeof response}`);
  }
  if (response.fallthrough) {
    throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
  }
  const { status = 200, body = {} } = response;
  const headers = response.headers instanceof Headers ? new Headers(response.headers) : to_headers(response.headers);
  const type = headers.get("content-type");
  if (!is_text(type) && !(body instanceof Uint8Array || is_string(body))) {
    return error(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if (is_pojo(body) && (!type || type.startsWith("application/json"))) {
    headers.set("content-type", "application/json; charset=utf-8");
    normalized_body = JSON.stringify(body);
  } else {
    normalized_body = body;
  }
  if ((typeof normalized_body === "string" || normalized_body instanceof Uint8Array) && !headers.has("etag")) {
    const cache_control = headers.get("cache-control");
    if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
      headers.set("etag", `"${hash(normalized_body)}"`);
    }
  }
  return new Response(method !== "head" ? normalized_body : void 0, {
    status,
    headers
  });
}
var chars$1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped2 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key2) {
            return walk(thing[key2]);
          });
      }
    }
  }
  walk(value);
  var names = /* @__PURE__ */ new Map();
  Array.from(counts).filter(function(entry6) {
    return entry6[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry6, i2) {
    names.set(entry6[0], getName(i2));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i2) {
          return i2 in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key2) {
          return safeKey(key2) + ":" + stringify(thing[key2]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i2) {
            statements_1.push(name + "[" + i2 + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key2) {
            statements_1.push("" + name + safeProp(key2) + "=" + stringify(thing[key2]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars$1[num % chars$1.length] + name;
    num = ~~(num / chars$1.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped2[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escapeUnsafeChars(JSON.stringify(key2));
}
function safeProp(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? "." + key2 : "[" + escapeUnsafeChars(JSON.stringify(key2)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i2 = 0; i2 < str.length; i2 += 1) {
    var char = str.charAt(i2);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped2) {
      result += escaped2[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i2];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop2() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop2) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run2, invalidate = noop2) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop2;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe };
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
var render_json_payload_script_dict = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var render_json_payload_script_regex = new RegExp(`[${Object.keys(render_json_payload_script_dict).join("")}]`, "g");
function render_json_payload_script(attrs, payload) {
  const safe_payload = JSON.stringify(payload).replace(render_json_payload_script_regex, (match) => render_json_payload_script_dict[match]);
  let safe_attrs = "";
  for (const [key2, value] of Object.entries(attrs)) {
    if (value === void 0)
      continue;
    safe_attrs += ` sveltekit:data-${key2}=${escape_html_attr(value)}`;
  }
  return `<script type="application/json"${safe_attrs}>${safe_payload}<\/script>`;
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(`[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`, "g");
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var s2 = JSON.stringify;
function create_prerendering_url_proxy(url) {
  return new Proxy(url, {
    get: (target, prop, receiver) => {
      if (prop === "search" || prop === "searchParams") {
        throw new Error(`Cannot access url.${prop} on a page with prerendering enabled`);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
var encoder = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array = encode$1(data);
  for (let i2 = 0; i2 < array.length; i2 += 16) {
    const w = array.subarray(i2, i2 + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i22 = 0; i22 < 64; i22++) {
      if (i22 < 16) {
        tmp = w[i22];
      } else {
        a = w[i22 + 1 & 15];
        b = w[i22 + 14 & 15];
        tmp = w[i22 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i22 & 15] + w[i22 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i22];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x2) {
    return (x2 - Math.floor(x2)) * 4294967296;
  }
  let prime = 2;
  for (let i2 = 0; i2 < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i2 < 8) {
        init[i2] = frac(prime ** (1 / 2));
      }
      key[i2] = frac(prime ** (1 / 3));
      i2++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i2 = 0; i2 < bytes.length; i2 += 4) {
    const a = bytes[i2 + 0];
    const b = bytes[i2 + 1];
    const c = bytes[i2 + 2];
    const d = bytes[i2 + 3];
    bytes[i2 + 0] = d;
    bytes[i2 + 1] = c;
    bytes[i2 + 2] = b;
    bytes[i2 + 3] = a;
  }
}
function encode$1(str) {
  const encoded = encoder.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i2;
  for (i2 = 2; i2 < l; i2 += 3) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2 | bytes[i2] >> 6];
    result += chars[bytes[i2] & 63];
  }
  if (i2 === l + 1) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4];
    result += "==";
  }
  if (i2 === l) {
    result += chars[bytes[i2 - 2] >> 2];
    result += chars[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars[(bytes[i2 - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var csp_ready;
var generate_nonce;
var generate_hash;
if (typeof crypto !== "undefined") {
  const array = new Uint8Array(16);
  generate_nonce = () => {
    crypto.getRandomValues(array);
    return base64(array);
  };
  generate_hash = sha256;
} else {
  const name = "crypto";
  csp_ready = import(name).then((crypto2) => {
    generate_nonce = () => {
      return crypto2.randomBytes(16).toString("base64");
    };
    generate_hash = (input) => {
      return crypto2.createHash("sha256").update(input, "utf-8").digest().toString("base64");
    };
  });
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var Csp = class {
  #use_hashes;
  #dev;
  #script_needs_csp;
  #style_needs_csp;
  #directives;
  #script_src;
  #style_src;
  constructor({ mode, directives }, { dev, prerender, needs_nonce }) {
    this.#use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.#directives = dev ? __spreadValues2({}, directives) : directives;
    this.#dev = dev;
    const d = this.#directives;
    if (dev) {
      const effective_style_src2 = d["style-src"] || d["default-src"];
      if (effective_style_src2 && !effective_style_src2.includes("unsafe-inline")) {
        d["style-src"] = [...effective_style_src2, "unsafe-inline"];
      }
    }
    this.#script_src = [];
    this.#style_src = [];
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    this.#script_needs_csp = !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0;
    this.#style_needs_csp = !dev && !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0;
    this.script_needs_nonce = this.#script_needs_csp && !this.#use_hashes;
    this.style_needs_nonce = this.#style_needs_csp && !this.#use_hashes;
    if (this.script_needs_nonce || this.style_needs_nonce || needs_nonce) {
      this.nonce = generate_nonce();
    }
  }
  add_script(content) {
    if (this.#script_needs_csp) {
      if (this.#use_hashes) {
        this.#script_src.push(`sha256-${generate_hash(content)}`);
      } else if (this.#script_src.length === 0) {
        this.#script_src.push(`nonce-${this.nonce}`);
      }
    }
  }
  add_style(content) {
    if (this.#style_needs_csp) {
      if (this.#use_hashes) {
        this.#style_src.push(`sha256-${generate_hash(content)}`);
      } else if (this.#style_src.length === 0) {
        this.#style_src.push(`nonce-${this.nonce}`);
      }
    }
  }
  get_header(is_meta = false) {
    const header = [];
    const directives = __spreadValues2({}, this.#directives);
    if (this.#style_src.length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...this.#style_src
      ];
    }
    if (this.#script_src.length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...this.#script_src
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = directives[key2];
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
  get_meta() {
    const content = escape_html_attr(this.get_header(true));
    return `<meta http-equiv="content-security-policy" content=${content}>`;
  }
};
var updated = __spreadProps2(__spreadValues2({}, readable(false)), {
  check: () => false
});
async function render_response({
  branch,
  options,
  state,
  $session,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  stuff
}) {
  if (state.prerender) {
    if (options.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options.template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %svelte.nonce%");
    }
  }
  const stylesheets = new Set(options.manifest._.entry.css);
  const modulepreloads = new Set(options.manifest._.entry.js);
  const styles = /* @__PURE__ */ new Map();
  const serialized_data = [];
  let shadow_props;
  let rendered;
  let is_private = false;
  let cache;
  if (error2) {
    error2.stack = options.get_stack(error2);
  }
  if (resolve_opts.ssr) {
    branch.forEach(({ node, props: props2, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => stylesheets.add(url));
      if (node.js)
        node.js.forEach((url) => modulepreloads.add(url));
      if (node.styles)
        Object.entries(node.styles).forEach(([k, v]) => styles.set(k, v));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (props2)
        shadow_props = props2;
      cache = loaded == null ? void 0 : loaded.cache;
      is_private = (cache == null ? void 0 : cache.private) ?? uses_credentials;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session: __spreadProps2(__spreadValues2({}, session), {
          subscribe: (fn) => {
            is_private = (cache == null ? void 0 : cache.private) ?? true;
            return session.subscribe(fn);
          }
        }),
        updated
      },
      page: {
        error: error2,
        params: event.params,
        routeId: event.routeId,
        status,
        stuff,
        url: state.prerender ? create_prerendering_url_proxy(event.url) : event.url
      },
      components: branch.map(({ node }) => node.module.default)
    };
    const print_error = (property, replacement) => {
      Object.defineProperty(props.page, property, {
        get: () => {
          throw new Error(`$page.${property} has been replaced by $page.url.${replacement}`);
        }
      });
    };
    print_error("origin", "origin");
    print_error("path", "pathname");
    print_error("query", "searchParams");
    for (let i2 = 0; i2 < branch.length; i2 += 1) {
      props[`props_${i2}`] = await branch[i2].loaded.props;
    }
    rendered = options.root.render(props);
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let { head, html: body } = rendered;
  const inlined_style = Array.from(styles.values()).join("\n");
  await csp_ready;
  const csp = new Csp(options.csp, {
    dev: options.dev,
    prerender: !!state.prerender,
    needs_nonce: options.template_contains_nonce
  });
  const target = hash(body);
  const init_app = `
		import { start } from ${s2(options.prefix + options.manifest._.entry.file)};
		start({
			target: document.querySelector('[data-hydrate="${target}"]').parentNode,
			paths: ${s2(options.paths)},
			session: ${try_serialize($session, (error3) => {
    throw new Error(`Failed to serialize session data: ${error3.message}`);
  })},
			route: ${!!page_config.router},
			spa: ${!resolve_opts.ssr},
			trailing_slash: ${s2(options.trailing_slash)},
			hydrate: ${resolve_opts.ssr && page_config.hydrate ? `{
				status: ${status},
				error: ${serialize_error(error2)},
				nodes: [
					${(branch || []).map(({ node }) => `import(${s2(options.prefix + node.entry)})`).join(",\n						")}
				],
				params: ${devalue(event.params)},
				routeId: ${s2(event.routeId)}
			}` : "null"}
		});
	`;
  const init_service_worker = `
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('${options.service_worker}');
		}
	`;
  if (options.amp) {
    const styles2 = `${inlined_style}
${rendered.css.code}`;
    head += `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>

		<style amp-custom>${styles2}</style>`;
    if (options.service_worker) {
      head += '<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"><\/script>';
      body += `<amp-install-serviceworker src="${options.service_worker}" layout="nodisplay"></amp-install-serviceworker>`;
    }
  } else {
    if (inlined_style) {
      const attributes = [];
      if (options.dev)
        attributes.push(" data-sveltekit");
      if (csp.style_needs_nonce)
        attributes.push(` nonce="${csp.nonce}"`);
      csp.add_style(inlined_style);
      head += `
	<style${attributes.join("")}>${inlined_style}</style>`;
    }
    head += Array.from(stylesheets).map((dep) => {
      const attributes = [
        'rel="stylesheet"',
        `href="${options.prefix + dep}"`
      ];
      if (csp.style_needs_nonce) {
        attributes.push(`nonce="${csp.nonce}"`);
      }
      if (styles.has(dep)) {
        attributes.push("disabled", 'media="(max-width: 0)"');
      }
      return `
	<link ${attributes.join(" ")}>`;
    }).join("");
    if (page_config.router || page_config.hydrate) {
      head += Array.from(modulepreloads).map((dep) => `
	<link rel="modulepreload" href="${options.prefix + dep}">`).join("");
      const attributes = ['type="module"', `data-hydrate="${target}"`];
      csp.add_script(init_app);
      if (csp.script_needs_nonce) {
        attributes.push(`nonce="${csp.nonce}"`);
      }
      body += `
		<script ${attributes.join(" ")}>${init_app}<\/script>`;
      body += serialized_data.map(({ url, body: body2, response }) => render_json_payload_script({ type: "data", url, body: typeof body2 === "string" ? hash(body2) : void 0 }, response)).join("\n	");
      if (shadow_props) {
        body += render_json_payload_script({ type: "props" }, shadow_props);
      }
    }
    if (options.service_worker) {
      csp.add_script(init_service_worker);
      head += `
				<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_service_worker}<\/script>`;
    }
  }
  if (state.prerender && !options.amp) {
    const http_equiv = [];
    const csp_headers = csp.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="max-age=${cache.maxage}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  }
  const segments = event.url.pathname.slice(options.paths.base.length).split("/").slice(2);
  const assets2 = options.paths.assets || (segments.length > 0 ? segments.map(() => "..").join("/") : ".");
  const html = await resolve_opts.transformPage({
    html: options.template({ head, body, assets: assets2, nonce: csp.nonce })
  });
  const headers = new Headers({
    "content-type": "text/html",
    etag: `"${hash(html)}"`
  });
  if (cache) {
    headers.set("cache-control", `${is_private ? "private" : "public"}, max-age=${cache.maxage}`);
  }
  if (!options.floc) {
    headers.set("permissions-policy", "interest-cohort=()");
  }
  if (!state.prerender) {
    const csp_header = csp.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
  }
  return new Response(html, {
    status,
    headers
  });
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize(__spreadProps2(__spreadValues2({}, error2), { name, message, stack }));
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
var parse_1 = parse$1;
var serialize_1 = serialize;
var __toString = Object.prototype.toString;
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function parse$1(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  var obj = {};
  var opt = options || {};
  var dec = opt.decode || decode;
  var index = 0;
  while (index < str.length) {
    var eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    var endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    var key2 = str.slice(index, eqIdx).trim();
    if (obj[key2] === void 0) {
      var val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key2] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  var value = enc(val);
  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError("argument val is invalid");
  }
  var str = name + "=" + value;
  if (opt.maxAge != null) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    var expires = opt.expires;
    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
}
function decode(str) {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
}
function encode(val) {
  return encodeURIComponent(val);
}
function isDate(val) {
  return __toString.call(val) === "[object Date]" || val instanceof Date;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch (e2) {
    return str;
  }
}
var setCookie = { exports: {} };
var defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false
};
function isNonEmptyString(str) {
  return typeof str === "string" && !!str.trim();
}
function parseString(setCookieValue, options) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString);
  var nameValue = parts.shift().split("=");
  var name = nameValue.shift();
  var value = nameValue.join("=");
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  try {
    value = options.decodeValues ? decodeURIComponent(value) : value;
  } catch (e2) {
    console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.", e2);
  }
  var cookie = {
    name,
    value
  };
  parts.forEach(function(part) {
    var sides = part.split("=");
    var key2 = sides.shift().trimLeft().toLowerCase();
    var value2 = sides.join("=");
    if (key2 === "expires") {
      cookie.expires = new Date(value2);
    } else if (key2 === "max-age") {
      cookie.maxAge = parseInt(value2, 10);
    } else if (key2 === "secure") {
      cookie.secure = true;
    } else if (key2 === "httponly") {
      cookie.httpOnly = true;
    } else if (key2 === "samesite") {
      cookie.sameSite = value2;
    } else {
      cookie[key2] = value2;
    }
  });
  return cookie;
}
function parse(input, options) {
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  if (!input) {
    if (!options.map) {
      return [];
    } else {
      return {};
    }
  }
  if (input.headers && input.headers["set-cookie"]) {
    input = input.headers["set-cookie"];
  } else if (input.headers) {
    var sch = input.headers[Object.keys(input.headers).find(function(key2) {
      return key2.toLowerCase() === "set-cookie";
    })];
    if (!sch && input.headers.cookie && !options.silent) {
      console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.");
    }
    input = sch;
  }
  if (!Array.isArray(input)) {
    input = [input];
  }
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  if (!options.map) {
    return input.filter(isNonEmptyString).map(function(str) {
      return parseString(str, options);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
      var cookie = parseString(str, options);
      cookies2[cookie.name] = cookie;
      return cookies2;
    }, cookies);
  }
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}
setCookie.exports = parse;
setCookie.exports.parse = parse;
var parseString_1 = setCookie.exports.parseString = parseString;
var splitCookiesString_1 = setCookie.exports.splitCookiesString = splitCookiesString;
function normalize(loaded) {
  if (loaded.fallthrough) {
    throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
  }
  if ("maxage" in loaded) {
    throw new Error("maxage should be replaced with cache: { maxage }");
  }
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return { status: status || 500, error: new Error() };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  if (loaded.dependencies) {
    if (!Array.isArray(loaded.dependencies) || loaded.dependencies.some((dep) => typeof dep !== "string")) {
      return {
        status: 500,
        error: new Error('"dependencies" property returned from load() must be of type string[]')
      };
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
var absolute = /^([a-z]+:)?\/?\//;
var scheme = /^[a-z]+:/;
function resolve(base2, path2) {
  if (scheme.test(path2))
    return path2;
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path2);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path2.slice(path_match[0].length).split("/") : path2.split("/");
  baseparts.pop();
  for (let i2 = 0; i2 < pathparts.length; i2 += 1) {
    const part = pathparts[i2];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
function is_root_relative(path2) {
  return path2[0] === "/" && path2[1] !== "/";
}
function normalize_path(path2, trailing_slash) {
  if (path2 === "/" || trailing_slash === "ignore")
    return path2;
  if (trailing_slash === "never") {
    return path2.endsWith("/") ? path2.slice(0, -1) : path2;
  } else if (trailing_slash === "always" && !path2.endsWith("/")) {
    return path2 + "/";
  }
  return path2;
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path2, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path2 === normalized)
    return true;
  return path2.startsWith(normalized + "/");
}
async function load_node({
  event,
  options,
  state,
  route,
  node,
  $session,
  stuff,
  is_error,
  is_leaf,
  status,
  error: error2
}) {
  const { module } = node;
  let uses_credentials = false;
  const fetched = [];
  const cookies = parse_1(event.request.headers.get("cookie") || "");
  const new_cookies = [];
  let loaded;
  const shadow = is_leaf ? await load_shadow_data(route, event, options, !!state.prerender) : {};
  if (shadow.cookies) {
    shadow.cookies.forEach((header) => {
      new_cookies.push(parseString_1(header));
    });
  }
  if (shadow.error) {
    loaded = {
      status: shadow.status,
      error: shadow.error
    };
  } else if (shadow.redirect) {
    loaded = {
      status: shadow.status,
      redirect: shadow.redirect
    };
  } else if (module.load) {
    const load_input = {
      url: state.prerender ? create_prerendering_url_proxy(event.url) : event.url,
      params: event.params,
      props: shadow.body || {},
      routeId: event.routeId,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let requested;
        if (typeof resource === "string") {
          requested = resource;
        } else {
          requested = resource.url;
          opts = __spreadValues2({
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity
          }, opts);
        }
        opts.headers = new Headers(opts.headers);
        for (const [key2, value] of event.request.headers) {
          if (key2 !== "authorization" && key2 !== "cookie" && key2 !== "host" && key2 !== "if-none-match" && !opts.headers.has(key2)) {
            opts.headers.set(key2, value);
          }
        }
        const resolved = resolve(event.url.pathname, requested.split("?")[0]);
        let response;
        let dependency;
        const prefix = options.paths.assets || options.paths.base;
        const filename = decodeURIComponent(resolved.startsWith(prefix) ? resolved.slice(prefix.length) : resolved).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = options.manifest.assets.has(filename);
        const is_asset_html = options.manifest.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (options.read) {
            const type = is_asset ? options.manifest.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            response = new Response(options.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          } else {
            response = await fetch(`${event.url.origin}/${file}`, opts);
          }
        } else if (is_root_relative(resolved)) {
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            const authorization = event.request.headers.get("authorization");
            const combined_cookies = __spreadValues2({}, cookies);
            for (const cookie2 of new_cookies) {
              if (!domain_matches(event.url.hostname, cookie2.domain))
                continue;
              if (!path_matches(resolved, cookie2.path))
                continue;
              combined_cookies[cookie2.name] = cookie2.value;
            }
            const cookie = Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
            if (cookie) {
              opts.headers.set("cookie", cookie);
            }
            if (authorization && !opts.headers.has("authorization")) {
              opts.headers.set("authorization", authorization);
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          response = await respond(new Request(new URL(requested, event.url).href, __spreadProps2(__spreadValues2({}, opts), { credentials: void 0 })), options, __spreadProps2(__spreadValues2({}, state), {
            initiator: route
          }));
          if (state.prerender) {
            dependency = { response, body: null };
            state.prerender.dependencies.set(resolved, dependency);
          }
        } else {
          if (resolved.startsWith("//")) {
            requested = event.url.protocol + requested;
          }
          if (`.${new URL(requested).hostname}`.endsWith(`.${event.url.hostname}`) && opts.credentials !== "omit") {
            uses_credentials = true;
            const cookie = event.request.headers.get("cookie");
            if (cookie)
              opts.headers.set("cookie", cookie);
          }
          const external_request = new Request(requested, opts);
          response = await options.hooks.externalFetch.call(null, external_request);
        }
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          new_cookies.push(...splitCookiesString_1(set_cookie).map((str) => parseString_1(str)));
        }
        const proxy = new Proxy(response, {
          get(response2, key2, _receiver) {
            async function text() {
              const body = await response2.text();
              const headers = {};
              for (const [key3, value] of response2.headers) {
                if (key3 !== "set-cookie" && key3 !== "etag") {
                  headers[key3] = value;
                }
              }
              if (!opts.body || typeof opts.body === "string") {
                const status_number = Number(response2.status);
                if (isNaN(status_number)) {
                  throw new Error(`response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`);
                }
                fetched.push({
                  url: requested,
                  body: opts.body,
                  response: {
                    status: status_number,
                    statusText: response2.statusText,
                    headers,
                    body
                  }
                });
              }
              if (dependency) {
                dependency.body = body;
              }
              return body;
            }
            if (key2 === "arrayBuffer") {
              return async () => {
                const buffer = await response2.arrayBuffer();
                if (dependency) {
                  dependency.body = new Uint8Array(buffer);
                }
                return buffer;
              };
            }
            if (key2 === "text") {
              return text;
            }
            if (key2 === "json") {
              return async () => {
                return JSON.parse(await text());
              };
            }
            return Reflect.get(response2, key2, response2);
          }
        });
        return proxy;
      },
      stuff: __spreadValues2({}, stuff),
      status: is_error ? status ?? null : null,
      error: is_error ? error2 ?? null : null
    };
    if (options.dev) {
      Object.defineProperty(load_input, "page", {
        get: () => {
          throw new Error("`page` in `load` functions has been replaced by `url` and `params`");
        }
      });
    }
    loaded = await module.load.call(null, load_input);
    if (!loaded) {
      throw new Error(`load function must return a value${options.dev ? ` (${node.entry})` : ""}`);
    }
  } else if (shadow.body) {
    loaded = {
      props: shadow.body
    };
  } else {
    loaded = {};
  }
  if (shadow.body && state.prerender) {
    const pathname = `${event.url.pathname.replace(/\/$/, "")}/__data.json`;
    const dependency = {
      response: new Response(void 0),
      body: JSON.stringify(shadow.body)
    };
    state.prerender.dependencies.set(pathname, dependency);
  }
  return {
    node,
    props: shadow.body,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers: new_cookies.map((new_cookie) => {
      const _a = new_cookie, { name, value } = _a, options2 = __objRest(_a, ["name", "value"]);
      return serialize_1(name, value, options2);
    }),
    uses_credentials
  };
}
async function load_shadow_data(route, event, options, prerender) {
  if (!route.shadow)
    return {};
  try {
    const mod = await route.shadow();
    if (prerender && (mod.post || mod.put || mod.del || mod.patch)) {
      throw new Error("Cannot prerender pages that have endpoints with mutative methods");
    }
    const method = normalize_request_method(event);
    const is_get = method === "head" || method === "get";
    const handler = method === "head" ? mod.head || mod.get : mod[method];
    if (!handler && !is_get) {
      return {
        status: 405,
        error: new Error(`${method} method not allowed`)
      };
    }
    const data = {
      status: 200,
      cookies: [],
      body: {}
    };
    if (!is_get) {
      const result = await handler(event);
      if (result.fallthrough) {
        throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
      }
      const { status, headers, body } = validate_shadow_output(result);
      data.status = status;
      add_cookies(data.cookies, headers);
      if (status >= 300 && status < 400) {
        data.redirect = headers instanceof Headers ? headers.get("location") : headers.location;
        return data;
      }
      data.body = body;
    }
    const get = method === "head" && mod.head || mod.get;
    if (get) {
      const result = await get(event);
      if (result.fallthrough) {
        throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
      }
      const { status, headers, body } = validate_shadow_output(result);
      add_cookies(data.cookies, headers);
      data.status = status;
      if (status >= 400) {
        data.error = new Error("Failed to load data");
        return data;
      }
      if (status >= 300) {
        data.redirect = headers instanceof Headers ? headers.get("location") : headers.location;
        return data;
      }
      data.body = __spreadValues2(__spreadValues2({}, body), data.body);
    }
    return data;
  } catch (e2) {
    const error2 = coalesce_to_error(e2);
    options.handle_error(error2, event);
    return {
      status: 500,
      error: error2
    };
  }
}
function add_cookies(target, headers) {
  const cookies = headers["set-cookie"];
  if (cookies) {
    if (Array.isArray(cookies)) {
      target.push(...cookies);
    } else {
      target.push(cookies);
    }
  }
}
function validate_shadow_output(result) {
  const { status = 200, body = {} } = result;
  let headers = result.headers || {};
  if (headers instanceof Headers) {
    if (headers.has("set-cookie")) {
      throw new Error("Endpoint request handler cannot use Headers interface with Set-Cookie headers");
    }
  } else {
    headers = lowercase_keys(headers);
  }
  if (!is_pojo(body)) {
    throw new Error("Body returned from endpoint request handler must be a plain object");
  }
  return { status, headers, body };
}
async function respond_with_error({
  event,
  options,
  state,
  $session,
  status,
  error: error2,
  resolve_opts
}) {
  try {
    const branch = [];
    let stuff = {};
    if (resolve_opts.ssr) {
      const default_layout = await options.manifest._.nodes[0]();
      const default_error = await options.manifest._.nodes[1]();
      const layout_loaded = await load_node({
        event,
        options,
        state,
        route: null,
        node: default_layout,
        $session,
        stuff: {},
        is_error: false,
        is_leaf: false
      });
      const error_loaded = await load_node({
        event,
        options,
        state,
        route: null,
        node: default_error,
        $session,
        stuff: layout_loaded ? layout_loaded.stuff : {},
        is_error: true,
        is_leaf: false,
        status,
        error: error2
      });
      branch.push(layout_loaded, error_loaded);
      stuff = error_loaded.stuff;
    }
    return await render_response({
      options,
      state,
      $session,
      page_config: {
        hydrate: options.hydrate,
        router: options.router
      },
      stuff,
      status,
      error: error2,
      branch,
      event,
      resolve_opts
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return new Response(error3.stack, {
      status: 500
    });
  }
}
async function respond$1(opts) {
  const { event, options, state, $session, route, resolve_opts } = opts;
  let nodes;
  if (!resolve_opts.ssr) {
    return await render_response(__spreadProps2(__spreadValues2({}, opts), {
      branch: [],
      page_config: {
        hydrate: true,
        router: true
      },
      status: 200,
      error: null,
      event,
      stuff: {}
    }));
  }
  try {
    nodes = await Promise.all(route.a.map((n) => n == void 0 ? n : options.manifest._.nodes[n]()));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return await respond_with_error({
      event,
      options,
      state,
      $session,
      status: 500,
      error: error3,
      resolve_opts
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options);
  if (state.prerender) {
    const should_prerender = leaf.prerender ?? state.prerender.default;
    if (!should_prerender) {
      return new Response(void 0, {
        status: 204
      });
    }
  }
  let branch = [];
  let status = 200;
  let error2 = null;
  let set_cookie_headers = [];
  let stuff = {};
  ssr: {
    for (let i2 = 0; i2 < nodes.length; i2 += 1) {
      const node = nodes[i2];
      let loaded;
      if (node) {
        try {
          loaded = await load_node(__spreadProps2(__spreadValues2({}, opts), {
            node,
            stuff,
            is_error: false,
            is_leaf: i2 === nodes.length - 1
          }));
          set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
          if (loaded.loaded.redirect) {
            return with_cookies(new Response(void 0, {
              status: loaded.loaded.status,
              headers: {
                location: loaded.loaded.redirect
              }
            }), set_cookie_headers);
          }
          if (loaded.loaded.error) {
            ({ status, error: error2 } = loaded.loaded);
          }
        } catch (err) {
          const e2 = coalesce_to_error(err);
          options.handle_error(e2, event);
          status = 500;
          error2 = e2;
        }
        if (loaded && !error2) {
          branch.push(loaded);
        }
        if (error2) {
          while (i2--) {
            if (route.b[i2]) {
              const index = route.b[i2];
              const error_node = await options.manifest._.nodes[index]();
              let node_loaded;
              let j = i2;
              while (!(node_loaded = branch[j])) {
                j -= 1;
              }
              try {
                const error_loaded = await load_node(__spreadProps2(__spreadValues2({}, opts), {
                  node: error_node,
                  stuff: node_loaded.stuff,
                  is_error: true,
                  is_leaf: false,
                  status,
                  error: error2
                }));
                if (error_loaded.loaded.error) {
                  continue;
                }
                page_config = get_page_config(error_node.module, options);
                branch = branch.slice(0, j + 1).concat(error_loaded);
                stuff = __spreadValues2(__spreadValues2({}, node_loaded.stuff), error_loaded.stuff);
                break ssr;
              } catch (err) {
                const e2 = coalesce_to_error(err);
                options.handle_error(e2, event);
                continue;
              }
            }
          }
          return with_cookies(await respond_with_error({
            event,
            options,
            state,
            $session,
            status,
            error: error2,
            resolve_opts
          }), set_cookie_headers);
        }
      }
      if (loaded && loaded.loaded.stuff) {
        stuff = __spreadValues2(__spreadValues2({}, stuff), loaded.loaded.stuff);
      }
    }
  }
  try {
    return with_cookies(await render_response(__spreadProps2(__spreadValues2({}, opts), {
      stuff,
      event,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    })), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return with_cookies(await respond_with_error(__spreadProps2(__spreadValues2({}, opts), {
      status: 500,
      error: error3
    })), set_cookie_headers);
  }
}
function get_page_config(leaf, options) {
  if ("ssr" in leaf) {
    throw new Error("`export const ssr` has been removed \u2014 use the handle hook instead: https://kit.svelte.dev/docs/hooks#handle");
  }
  return {
    router: "router" in leaf ? !!leaf.router : options.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    set_cookie_headers.forEach((value) => {
      response.headers.append("set-cookie", value);
    });
  }
  return response;
}
async function render_page(event, route, options, state, resolve_opts) {
  if (state.initiator === route) {
    return new Response(`Not found: ${event.url.pathname}`, {
      status: 404
    });
  }
  if (route.shadow) {
    const type = negotiate(event.request.headers.get("accept") || "text/html", [
      "text/html",
      "application/json"
    ]);
    if (type === "application/json") {
      return render_endpoint(event, await route.shadow());
    }
  }
  const $session = await options.hooks.getSession(event);
  return respond$1({
    event,
    options,
    state,
    $session,
    resolve_opts,
    route
  });
}
function negotiate(accept, types2) {
  const parts = accept.split(",").map((str, i2) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      return { type, subtype, q: +q, i: i2 };
    }
    throw new Error(`Invalid Accept header: ${accept}`);
  }).sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types2) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex((part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*"));
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function exec(match, names, types2, matchers) {
  const params = {};
  for (let i2 = 0; i2 < names.length; i2 += 1) {
    const name = names[i2];
    const type = types2[i2];
    const value = match[i2 + 1] || "";
    if (type) {
      const matcher = matchers[type];
      if (!matcher)
        throw new Error(`Missing "${type}" param matcher`);
      if (!matcher(value))
        return;
    }
    params[name] = value;
  }
  return params;
}
var DATA_SUFFIX = "/__data.json";
var default_transform = ({ html }) => html;
async function respond(request, options, state) {
  var _a, _b, _c;
  let url = new URL(request.url);
  const { parameter, allowed } = options.method_override;
  const method_override = (_a = url.searchParams.get(parameter)) == null ? void 0 : _a.toUpperCase();
  if (method_override) {
    if (request.method === "POST") {
      if (allowed.includes(method_override)) {
        request = new Proxy(request, {
          get: (target, property, _receiver) => {
            if (property === "method")
              return method_override;
            return Reflect.get(target, property, target);
          }
        });
      } else {
        const verb = allowed.length === 0 ? "enabled" : "allowed";
        const body = `${parameter}=${method_override} is not ${verb}. See https://kit.svelte.dev/docs/configuration#methodoverride`;
        return new Response(body, {
          status: 400
        });
      }
    } else {
      throw new Error(`${parameter}=${method_override} is only allowed with POST requests`);
    }
  }
  let decoded = decodeURI(url.pathname);
  let route = null;
  let params = {};
  if (options.paths.base && !((_b = state.prerender) == null ? void 0 : _b.fallback)) {
    if (!decoded.startsWith(options.paths.base)) {
      return new Response(void 0, { status: 404 });
    }
    decoded = decoded.slice(options.paths.base.length) || "/";
  }
  const is_data_request = decoded.endsWith(DATA_SUFFIX);
  if (is_data_request) {
    decoded = decoded.slice(0, -DATA_SUFFIX.length) || "/";
    url = new URL(url.origin + url.pathname.slice(0, -DATA_SUFFIX.length) + url.search);
  }
  if (!state.prerender || !state.prerender.fallback) {
    const matchers = await options.manifest._.matchers();
    for (const candidate of options.manifest._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.names, candidate.types, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  if ((route == null ? void 0 : route.type) === "page") {
    const normalized = normalize_path(url.pathname, options.trailing_slash);
    if (normalized !== url.pathname && !((_c = state.prerender) == null ? void 0 : _c.fallback)) {
      return new Response(void 0, {
        status: 301,
        headers: {
          "x-sveltekit-normalize": "1",
          location: (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
        }
      });
    }
  }
  const event = {
    get clientAddress() {
      if (!state.getClientAddress) {
        throw new Error(`${"@sveltejs/adapter-vercel"} does not specify getClientAddress. Please raise an issue`);
      }
      Object.defineProperty(event, "clientAddress", {
        value: state.getClientAddress()
      });
      return event.clientAddress;
    },
    locals: {},
    params,
    platform: state.platform,
    request,
    routeId: route && route.id,
    url
  };
  const removed = (property, replacement, suffix = "") => ({
    get: () => {
      throw new Error(`event.${property} has been replaced by event.${replacement}` + suffix);
    }
  });
  const details = ". See https://github.com/sveltejs/kit/pull/3384 for details";
  const body_getter = {
    get: () => {
      throw new Error("To access the request body use the text/json/arrayBuffer/formData methods, e.g. `body = await request.json()`" + details);
    }
  };
  Object.defineProperties(event, {
    method: removed("method", "request.method", details),
    headers: removed("headers", "request.headers", details),
    origin: removed("origin", "url.origin"),
    path: removed("path", "url.pathname"),
    query: removed("query", "url.searchParams"),
    body: body_getter,
    rawBody: body_getter
  });
  let resolve_opts = {
    ssr: true,
    transformPage: default_transform
  };
  try {
    const response = await options.hooks.handle({
      event,
      resolve: async (event2, opts) => {
        if (opts) {
          resolve_opts = {
            ssr: opts.ssr !== false,
            transformPage: opts.transformPage || default_transform
          };
        }
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            event: event2,
            options,
            state,
            $session: await options.hooks.getSession(event2),
            page_config: { router: true, hydrate: true },
            stuff: {},
            status: 200,
            error: null,
            branch: [],
            resolve_opts: __spreadProps2(__spreadValues2({}, resolve_opts), {
              ssr: false
            })
          });
        }
        if (route) {
          let response2;
          if (is_data_request && route.type === "page" && route.shadow) {
            response2 = await render_endpoint(event2, await route.shadow());
            if (request.headers.has("x-sveltekit-load")) {
              if (response2.status >= 300 && response2.status < 400) {
                const location2 = response2.headers.get("location");
                if (location2) {
                  const headers = new Headers(response2.headers);
                  headers.set("x-sveltekit-location", location2);
                  response2 = new Response(void 0, {
                    status: 204,
                    headers
                  });
                }
              }
            }
          } else {
            response2 = route.type === "endpoint" ? await render_endpoint(event2, await route.load()) : await render_page(event2, route, options, state, resolve_opts);
          }
          if (response2) {
            if (response2.status === 200 && response2.headers.has("etag")) {
              let if_none_match_value = request.headers.get("if-none-match");
              if (if_none_match_value == null ? void 0 : if_none_match_value.startsWith('W/"')) {
                if_none_match_value = if_none_match_value.substring(2);
              }
              const etag = response2.headers.get("etag");
              if (if_none_match_value === etag) {
                const headers = new Headers({ etag });
                for (const key2 of [
                  "cache-control",
                  "content-location",
                  "date",
                  "expires",
                  "vary"
                ]) {
                  const value = response2.headers.get(key2);
                  if (value)
                    headers.set(key2, value);
                }
                return new Response(void 0, {
                  status: 304,
                  headers
                });
              }
            }
            return response2;
          }
        }
        if (!state.initiator) {
          const $session = await options.hooks.getSession(event2);
          return await respond_with_error({
            event: event2,
            options,
            state,
            $session,
            status: 404,
            error: new Error(`Not found: ${event2.url.pathname}`),
            resolve_opts
          });
        }
        if (state.prerender) {
          return new Response("not found", { status: 404 });
        }
        return await fetch(request);
      },
      get request() {
        throw new Error("request in handle has been replaced with event" + details);
      }
    });
    if (response && !(response instanceof Response)) {
      throw new Error("handle must return a Response object" + details);
    }
    return response;
  } catch (e2) {
    const error2 = coalesce_to_error(e2);
    options.handle_error(error2, event);
    try {
      const $session = await options.hooks.getSession(event);
      return await respond_with_error({
        event,
        options,
        state,
        $session,
        status: 500,
        error: error2,
        resolve_opts
      });
    } catch (e22) {
      const error3 = coalesce_to_error(e22);
      return new Response(options.dev ? error3.stack : error3.message, {
        status: 500
      });
    }
  }
}
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
var template = ({ head, body, assets: assets2, nonce }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="apple-touch-icon" sizes="180x180" href="' + assets2 + '/apple-touch-icon.png" />\n		<link rel="icon" type="image/png" sizes="32x32" href="' + assets2 + '/favicon-32x32.png" />\n		<link rel="icon" type="image/png" sizes="16x16" href="' + assets2 + '/favicon-16x16.png" />\n		<link rel="manifest" href="' + assets2 + '/site.webmanifest" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		<title>Goats and Tigers</title>\n		' + head + "\n	</head>\n	<body>\n		<div>" + body + "</div>\n	</body>\n</html>\n";
var read = null;
set_paths({ "base": "", "assets": "" });
var Server = class {
  constructor(manifest2) {
    this.options = {
      amp: false,
      csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
      dev: false,
      floc: false,
      get_stack: (error2) => String(error2),
      handle_error: (error2, event) => {
        this.options.hooks.handleError({
          error: error2,
          event,
          get request() {
            throw new Error("request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details");
          }
        });
        error2.stack = this.options.get_stack(error2);
      },
      hooks: null,
      hydrate: true,
      manifest: manifest2,
      method_override: { "parameter": "_method", "allowed": [] },
      paths: { base, assets },
      prefix: assets + "/_app/",
      prerender: true,
      read,
      root: Root,
      service_worker: null,
      router: true,
      template,
      template_contains_nonce: false,
      trailing_slash: "never"
    };
  }
  async respond(request, options = {}) {
    if (!(request instanceof Request)) {
      throw new Error("The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details");
    }
    if (!this.options.hooks) {
      const module = await Promise.resolve().then(() => (init_hooks_1c45ba0b(), hooks_1c45ba0b_exports));
      this.options.hooks = {
        getSession: module.getSession || (() => ({})),
        handle: module.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
        handleError: module.handleError || (({ error: error2 }) => console.error(error2.stack)),
        externalFetch: module.externalFetch || fetch
      };
    }
    return respond(request, this.options, options);
  }
};

// .svelte-kit/vercel-tmp/manifest.js
var manifest = {
  appDir: "_app",
  assets: /* @__PURE__ */ new Set(["android-chrome-192x192.png", "android-chrome-512x512.png", "apple-touch-icon.png", "favicon-16x16.png", "favicon-32x32.png", "favicon.ico", "favicon.png", "site.webmanifest", "tiles/o-bear.svg", "tiles/o-bird.svg", "tiles/o-goat.svg", "tiles/o-horse.svg", "tiles/o-mantis-shrimp.svg", "tiles/o-sloth.svg", "tiles/o-snake.svg", "tiles/o-tiger.svg", "tiles/tiles.zip", "tiles/w-bear.svg", "tiles/w-bird.svg", "tiles/w-goat.svg", "tiles/w-horse.svg", "tiles/w-mantis-shrimp.svg", "tiles/w-sloth.svg", "tiles/w-snake.svg", "tiles/w-tiger.svg"]),
  mimeTypes: { ".png": "image/png", ".ico": "image/vnd.microsoft.icon", ".webmanifest": "application/manifest+json", ".svg": "image/svg+xml", ".zip": "application/zip" },
  _: {
    entry: { "file": "start-45015557.js", "js": ["start-45015557.js", "chunks/index-ec26513d.js", "chunks/index-63348562.js", "chunks/paths-c0fc83a9.js"], "css": [] },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2)),
      () => Promise.resolve().then(() => (init__3(), __exports3)),
      () => Promise.resolve().then(() => (init__4(), __exports4)),
      () => Promise.resolve().then(() => (init__5(), __exports5))
    ],
    routes: [
      {
        type: "page",
        id: "",
        pattern: /^\/$/,
        names: [],
        types: [],
        path: "/",
        shadow: null,
        a: [0, 2],
        b: [1]
      },
      {
        type: "page",
        id: "login",
        pattern: /^\/login\/?$/,
        names: [],
        types: [],
        path: "/login",
        shadow: null,
        a: [0, 3],
        b: [1]
      },
      {
        type: "page",
        id: "multi",
        pattern: /^\/multi\/?$/,
        names: [],
        types: [],
        path: "/multi",
        shadow: null,
        a: [0, 4],
        b: [1]
      }
    ],
    matchers: async () => {
      return {};
    }
  }
};

// .svelte-kit/vercel-tmp/serverless.js
installFetch();
var server = new Server(manifest);
var serverless_default = async (req, res) => {
  let request;
  try {
    request = await getRequest(`https://${req.headers.host}`, req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || "Invalid request body");
  }
  setResponse(res, await server.respond(request, {
    getClientAddress() {
      return request.headers.get("x-forwarded-for");
    }
  }));
};
export {
  serverless_default as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! js-cookie v3.0.1 | MIT */
//!opt && console.log("WHAT IS T?", JSON.stringify(t).length);
