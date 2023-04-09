// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { type CrossOriginOpenerPolicyValue } from "./constants.ts";

/** Cross-origin opener policy API. */
export interface CrossOriginOpenerPolicy {
  /** opener policy value. */
  readonly value: `${CrossOriginOpenerPolicyValue}`;

  /** Reporting endpoint name. */
  readonly reportTo?: string;
}
