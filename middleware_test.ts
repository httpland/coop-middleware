import { coop } from "./middleware.ts";
import {
  assert,
  assertThrows,
  CrossOriginOpenerPolicyValue,
  describe,
  equalsResponse,
  it,
  PolicyHeader,
} from "./_dev_deps.ts";

describe("coop", () => {
  it("should return same response if the response include the header", async () => {
    const middleware = coop();
    const initResponse = new Response(null, {
      headers: {
        [PolicyHeader.CrossOriginOpenerPolicy]: "",
      },
    });
    const response = await middleware(
      new Request("test:"),
      () => initResponse,
    );

    assert(response === initResponse);
  });

  it("should return response what include coop header and the value is same-origin by default", async () => {
    const middleware = coop();
    const response = await middleware(
      new Request("test:"),
      () => new Response(),
    );

    assert(equalsResponse(
      response,
      new Response(null, {
        headers: {
          [PolicyHeader.CrossOriginOpenerPolicy]:
            CrossOriginOpenerPolicyValue.SameOrigin,
        },
      }),
    ));
  });

  it("should change coop header via arg", async () => {
    const middleware = coop({
      policy: CrossOriginOpenerPolicyValue.SameOriginAllowPopups,
    });
    const response = await middleware(
      new Request("test:"),
      () => new Response(),
    );

    assert(equalsResponse(
      response,
      new Response(null, {
        headers: {
          [PolicyHeader.CrossOriginOpenerPolicy]:
            CrossOriginOpenerPolicyValue.SameOriginAllowPopups,
        },
      }),
    ));
  });

  it("should add report-to param via endpoint", async () => {
    const reportTo = "default";
    const middleware = coop({ reportTo });
    const response = await middleware(
      new Request("test:"),
      () => new Response(),
    );

    assert(equalsResponse(
      response,
      new Response(null, {
        headers: {
          [PolicyHeader.CrossOriginOpenerPolicy]:
            `${CrossOriginOpenerPolicyValue.SameOrigin};report-to=${reportTo}`,
        },
      }),
    ));
  });

  it("should change to report only header", async () => {
    const middleware = coop({ reportOnly: true });
    const response = await middleware(
      new Request("test:"),
      () => new Response(),
    );

    assert(equalsResponse(
      response,
      new Response(null, {
        headers: {
          [PolicyHeader.CrossOriginOpenerPolicyReportOnly]:
            CrossOriginOpenerPolicyValue.SameOrigin,
        },
      }),
    ));
  });

  it("should throw error if the Cross origin opener policy is invalid", () => {
    assertThrows(() => coop({ reportTo: "?" }));
  });
});
