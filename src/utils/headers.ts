import type { Entry } from "har-format";

// Copied from har-to-openapi https://github.com/jonluca/har-to-openapi
const ignoreTheseHeaders = [
  ":authority",
  ":method",
  ":path",
  ":scheme",
  ":status",
  "a-im",
  "accept-additions",
  "accept-ch-lifetime",
  "accept-ch",
  "accept-charset",
  "accept-datetime",
  "accept-encoding",
  "accept-features",
  "accept-language",
  "accept-patch",
  "accept-post",
  "accept-ranges",
  "accept",
  "access-control-allow-credentials",
  "access-control-allow-headers",
  "access-control-allow-methods",
  "access-control-allow-origin",
  "access-control-expose-headers",
  "access-control-max-age",
  "access-control-request-headers",
  "access-control-request-method",
  "age",
  "allow",
  "alpn",
  "alt-svc",
  "alternate-protocol",
  "alternates",
  "amp-access-control-allow-source-origin",
  "apply-to-redirect-ref",
  "authentication-info",
  "authorization",
  "c-ext",
  "c-man",
  "c-opt",
  "c-pep-info",
  "c-pep",
  "cache-control",
  "ch",
  "connection",
  "content-base",
  "content-disposition",
  "content-dpr",
  "content-encoding",
  "content-id",
  "content-language",
  "content-length",
  "content-location",
  "content-md5",
  "content-range",
  "content-script-type",
  "content-security-policy-report-only",
  "content-security-policy",
  "content-style-type",
  "content-type",
  "content-version",
  "cross-origin-resource-policy",
  "dasl",
  "date",
  "dav",
  "default-style",
  "delta-base",
  "depth",
  "derived-from",
  "destination",
  "differential-id",
  "digest",
  "dnt",
  "dpr",
  "encryption-key",
  "encryption",
  "etag",
  "expect-ct",
  "expect",
  "expires",
  "ext",
  "forwarded",
  "from",
  "front-end-https",
  "getprofile",
  "host",
  "http2-settings",
  "if-match",
  "if-modified-since",
  "if-none-match",
  "if-range",
  "if-schedule-tag-match",
  "if-unmodified-since",
  "if",
  "im",
  "keep-alive",
  "key",
  "label",
  "last-event-id",
  "last-modified",
  "link-template",
  "link",
  "location",
  "lock-token",
  "man",
  "max-forwards",
  "md",
  "meter",
  "mime-version",
  "negotiate",
  "nice",
  "opt",
  "ordering-type",
  "origin-trial",
  "origin",
  "overwrite",
  "p3p",
  "pep-info",
  "pep",
  "pics-label",
  "poe-links",
  "poe",
  "position",
  "pragma",
  "prefer",
  "preference-applied",
  "profileobject",
  "protocol-info",
  "protocol-query",
  "protocol-request",
  "protocol",
  "proxy-authenticate",
  "proxy-authentication-info",
  "proxy-authorization",
  "proxy-connection",
  "proxy-features",
  "proxy-instruction",
  "public",
  "range",
  "redirect-ref",
  "referer",
  "referrer-policy",
  "report-to",
  "retry-after",
  "rw",
  "safe",
  "save-data",
  "schedule-reply",
  "schedule-tag",
  "sec-ch-ua-mobile",
  "sec-ch-ua-platform",
  "sec-ch-ua",
  "sec-fetch-dest",
  "sec-fetch-mode",
  "sec-fetch-site",
  "sec-fetch-user",
  "sec-websocket-accept",
  "sec-websocket-extensions",
  "sec-websocket-key",
  "sec-websocket-protocol",
  "sec-websocket-version",
  "security-scheme",
  "server-timing",
  "server",
  "set-cookie",
  "set-cookie2",
  "setprofile",
  "slug",
  "soapaction",
  "status-uri",
  "strict-transport-security",
  "sunset",
  "surrogate-capability",
  "surrogate-control",
  "tcn",
  "te",
  "timeout",
  "timing-allow-origin",
  "tk",
  "trailer",
  "transfer-encoding",
  "upgrade-insecure-requests",
  "upgrade",
  "uri",
  "user-agent",
  "variant-vary",
  "vary",
  "via",
  "want-digest",
  "warning",
  "www-authenticate",
  "x-att-deviceid",
  "x-csrf-token",
  "x-forwarded-for",
  "x-forwarded-host",
  "x-forwarded-proto",
  "x-frame-options",
  "x-frontend",
  "x-http-method-override",
  "x-powered-by",
  "x-request-id",
  "x-requested-with",
  "x-uidh",
  "x-wap-profile",
  "x-xss-protection",
] as const;
const headersToIgnore = new Set<string>(ignoreTheseHeaders);

export const filterIgnoreHeaders = (headers: Entry["request"]["headers"]) => {
  return headers.filter(({ name }) => {
    return !headersToIgnore.has(name.toLowerCase());
  });
};

export const defaultAuthHeaders = [
  "access-key",
  "access-token",
  "api-key",
  "apikey",
  "auth-token",
  "authorization-token",
  "authorization",
  "cookie",
  "key",
  "secret",
  "token",
  "x-access-token",
  "x-api-key",
  "x-auth-token",
  "x-auth",
  "x-csrf-token",
  "x-secret",
] as const;

export const authHeaders = new Set<string>(defaultAuthHeaders);

export const isAuthHeader = (header: string) => {
  return authHeaders.has(header.toLowerCase());
};
