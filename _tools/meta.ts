import { BuildOptions } from "https://deno.land/x/dnt@0.34.0/mod.ts";

export const makeOptions = (version: string): BuildOptions => ({
  test: false,
  shims: {},
  compilerOptions: {
    lib: ["dom", "esnext"],
  },
  typeCheck: true,
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  package: {
    name: "@httpland/coop-middleware",
    version,
    description: "HTTP cross-origin opener policy(COOP) middleware",
    keywords: [
      "http",
      "middleware",
      "header",
      "coop",
      "cross-origin",
      "opener-policy",
      "cross-origin-opener-policy",
      "cross-origin-opener-policy-report-only",
      "policy",
      "report-to",
      "security",
      "fetch-api",
    ],
    license: "MIT",
    homepage: "https://github.com/httpland/coop-middleware",
    repository: {
      type: "git",
      url: "git+https://github.com/httpland/coop-middleware.git",
    },
    bugs: {
      url: "https://github.com/httpland/coop-middleware/issues",
    },
    sideEffects: false,
    type: "module",
    publishConfig: {
      access: "public",
    },
  },
  packageManager: "pnpm",
  mappings: {
    "https://deno.land/x/http_middleware@1.0.0/mod.ts": {
      name: "@httpland/http-middleware",
      version: "1.0.0",
    },
    "https://deno.land/x/http_utils@1.0.0/message.ts": {
      name: "@httpland/http-utils",
      version: "1.0.0",
      subPath: "message.js",
    },
    "https://deno.land/x/isx@1.1.1/is_string.ts": {
      name: "@miyauci/isx",
      version: "1.1.1",
      subPath: "is_string",
    },
    "https://deno.land/x/sfv_parser@1.0.1/mod.ts": {
      name: "@httpland/sfv-parser",
      version: "1.0.1",
    },
  },
});
