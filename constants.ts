// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

/** Cross-origin embedded policy value.
 * @see [cross-origin opener policy value](https://html.spec.whatwg.org/multipage/browsers.html#cross-origin-opener-policy-value)
 */
export enum CrossOriginOpenerPolicyValue {
  /** The document will occupy the same [top-level browsing context](https://html.spec.whatwg.org/multipage/document-sequences.html#top-level-browsing-context) as its predecessor,
   * unless that document specified a different [cross-origin opener policy](https://html.spec.whatwg.org/multipage/browsers.html#cross-origin-opener-policy).
   * @see ["unsafe-none"](https://html.spec.whatwg.org/multipage/browsers.html#coop-unsafe-none)
   */
  UnsafeNone = "unsafe-none",

  /** This forces the creation of a new [top-level browsing context](https://html.spec.whatwg.org/multipage/document-sequences.html#top-level-browsing-context) for the document,
   * unless its predecessor specified the same [cross-origin opener policy](https://html.spec.whatwg.org/multipage/browsers.html#cross-origin-opener-policy) and they are [same origin](https://html.spec.whatwg.org/multipage/browsers.html#same-origin).
   * @see ["same-origin-allow-popups"](https://html.spec.whatwg.org/multipage/browsers.html#coop-same-origin-allow-popups)
   */
  SameOriginAllowPopups = "same-origin-allow-popups",

  /** This behaves the same as {@link SameOriginAllowPopups},
   * with the addition that any [auxiliary browsing context](https://html.spec.whatwg.org/multipage/document-sequences.html#auxiliary-browsing-context) created needs to contain [same origin](https://html.spec.whatwg.org/multipage/browsers.html#same-origin) documents
   * that also have the same [cross-origin opener policy](https://html.spec.whatwg.org/multipage/browsers.html#cross-origin-opener-policy) or it will appear closed to the opener.
   * @see ["same-origin"](https://html.spec.whatwg.org/multipage/browsers.html#coop-same-origin)
   */
  SameOrigin = "same-origin",
}

export const enum PolicyHeader {
  CrossOriginOpenerPolicy = "cross-origin-opener-policy",
  CrossOriginOpenerPolicyReportOnly =
    `${PolicyHeader.CrossOriginOpenerPolicy}-report-only`,
}
