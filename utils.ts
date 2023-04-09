// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import type { CrossOriginOpenerPolicy } from "./types.ts";
import { isString, Item, Parameters, stringifySfv, Token } from "./deps.ts";

const enum Param {
  ReportTo = "report-to",
}

/** Serialize {@link CrossOriginOpenerPolicy} into string.
 * @throws {TypeError} If the {@link CrossOriginOpenerPolicy} is invalid.
 */
export function stringifyCrossOriginOpenerPolicy(
  policy: CrossOriginOpenerPolicy,
): string {
  const token = new Token(policy.value);
  const parameters = isString(policy.reportTo)
    ? new Parameters({
      [Param.ReportTo]: new Token(policy.reportTo),
    })
    : new Parameters();
  const item = new Item([token, parameters]);

  try {
    return stringifySfv(item);
  } catch (cause) {
    throw TypeError(Msg.InvalidCrossOriginOpenerPolicy, { cause });
  }
}

const enum Msg {
  InvalidCrossOriginOpenerPolicy = "invalid CrossOriginOpenerPolicy format.",
}
