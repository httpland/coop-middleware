// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { CrossOriginOpenerPolicyValue, PolicyHeader } from "./constants.ts";
import { CrossOriginOpenerPolicy } from "./types.ts";
import { type Middleware, withHeader } from "./deps.ts";
import { stringifyCrossOriginOpenerPolicy } from "./utils.ts";

/** Middleware options. */
export interface Options
  extends Partial<Pick<CrossOriginOpenerPolicy, "reportTo">> {
  /** Opener policy value.
   * @default "same-origin"
   */
  readonly policy?: `${CrossOriginOpenerPolicyValue}`;

  /** Whether header is report-only or not.
   * Depending on the value, the header will be:
   * - `true`: `Cross-Origin-Opener-Policy-Report-Only`
   * - `false`: `Cross-Origin-Opener-Policy`
   * @default false
   */
  readonly reportOnly?: boolean;
}

/** Create cross-origin opener policy middleware.
 *
 * @example
 * ```ts
 * import {
 *   coop,
 *   type Handler,
 * } from "https://deno.land/x/coop_middleware@$VERSION/mod.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const request: Request;
 * declare const handler: Handler;
 *
 * const middleware = coop();
 * const response = await middleware(request, handler);
 *
 * assert(response.headers.has("cross-origin-opener-policy"));
 * ```
 */
export function coop(options?: Options): Middleware {
  const {
    policy: value = CrossOriginOpenerPolicyValue.SameOrigin,
    reportOnly,
    reportTo,
  } = options ?? {};

  const fieldValue = stringifyCrossOriginOpenerPolicy({ value, reportTo });
  const fieldName = reportOnly
    ? PolicyHeader.CrossOriginOpenerPolicyReportOnly
    : PolicyHeader.CrossOriginOpenerPolicy;

  return async (request, next) => {
    const response = await next(request);

    if (response.headers.has(fieldName)) return response;

    return withHeader(response, fieldName, fieldValue);
  };
}
