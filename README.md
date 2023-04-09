# coop-middleware

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/coop_middleware)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/coop_middleware/mod.ts)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/httpland/coop-middleware)](https://github.com/httpland/coop-middleware/releases)
[![codecov](https://codecov.io/github/httpland/coop-middleware/branch/main/graph/badge.svg)](https://codecov.io/gh/httpland/coop-middleware)
[![GitHub](https://img.shields.io/github/license/httpland/coop-middleware)](https://github.com/httpland/coop-middleware/blob/main/LICENSE)

[![test](https://github.com/httpland/coop-middleware/actions/workflows/test.yaml/badge.svg)](https://github.com/httpland/coop-middleware/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/@httpland/coop-middleware.png?mini=true)](https://nodei.co/npm/@httpland/coop-middleware/)

HTTP cross-origin opener policy(COOP) middleware.

Compliant with
[HTML Living Standard, 7.1.3 Cross-origin opener policies](https://html.spec.whatwg.org/multipage/browsers.html#cross-origin-opener-policies).

## Middleware

For a definition of Universal HTTP middleware, see the
[http-middleware](https://github.com/httpland/http-middleware) project.

## Usage

Middleware adds the `Cross-Origin-Opener-Policy` header to the response.

```ts
import {
  coop,
  type Handler,
} from "https://deno.land/x/coop_middleware@$VERSION/mod.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

declare const request: Request;
declare const handler: Handler;

const middleware = coop();
const response = await middleware(request, handler);

assert(response.headers.has("cross-origin-opener-policy"));
```

yield:

```http
Cross-Origin-Opener-Policy: same-origin
```

## Options

The middleware factory accepts the following fields:

| Name       | Type                                                                       |     Default     | Description                               |
| ---------- | -------------------------------------------------------------------------- | :-------------: | ----------------------------------------- |
| policy     | `"unsafe-none"` &#124; `"same-origin-allow-popups"` &#124; `"same-origin"` | `"same-origin"` | Embedder policy value.                    |
| reportTo   | `string`                                                                   |        -        | Reporting endpoint name.                  |
| reportOnly | `boolean`                                                                  |     `false`     | Whether the header is report-only or not. |

### policy

If specified, change the
[cross-origin opener policy value](https://html.spec.whatwg.org/multipage/browsers.html#cross-origin-opener-policy-value).

```ts
import { coop } from "https://deno.land/x/coop_middleware@$VERSION/middleware.ts";

const middleware = coop({ policy: "same-origin-allow-popups" });
```

yield:

```http
Cross-Origin-Opener-Policy: same-origin-allow-popups
```

### reportTo

If specified, adds a `report-to` param to the output.

```ts
import { coop } from "https://deno.land/x/coop_middleware@$VERSION/middleware.ts";

const middleware = coop({ reportTo: "default" });
```

yield:

```http
Cross-Origin-Opener-Policy: same-origin;report-to=default
```

### reportOnly

Depending on the value, the header will be:

| Value   | Field name                               |
| ------- | ---------------------------------------- |
| `true`  | `Cross-Origin-Opener-Policy-Report-Only` |
| `false` | `Cross-Origin-Opener-Policy`             |

```ts
import { coop } from "https://deno.land/x/coop_middleware@$VERSION/middleware.ts";

const middleware = coop({ reportOnly: true });
```

yield:

```http
Cross-Origin-Opener-Policy-Report-Only: same-origin
```

### Throwing error

If serialization of opener policy fails, it may throw `TypeError`.

The following cases are failures:

- If `reportTo` field is an invalid
  [`<sf-token>`](https://www.rfc-editor.org/rfc/rfc8941.html#section-3.3.4-3)
  syntax

```ts
import { coop } from "https://deno.land/x/coop_middleware@$VERSION/middleware.ts";
import { assertThrows } from "https://deno.land/std/testing/asserts.ts";

assertThrows(() => coop({ reportTo: "<invalid>" }));
```

## Conditions

Middleware will execute if all of the following conditions are met:

- Response does not include `Cross-Origin-Opener-Policy` header
- Response does not include `Cross-Origin-Opener-Policy-Report-Only` header

## Effects

Middleware may make changes to the following elements of the HTTP message.

- HTTP Headers
  - Cross-Origin-Opener-Policy
  - Cross-Origin-Opener-Policy-Report-Only

## API

All APIs can be found in the
[deno doc](https://doc.deno.land/https/deno.land/x/coop_middleware/mod.ts).

## License

Copyright © 2023-present [httpland](https://github.com/httpland).

Released under the [MIT](./LICENSE) license
