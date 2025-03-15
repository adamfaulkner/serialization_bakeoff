import * as esbuild from "esbuild";

let buildContext = await esbuild.context({
  entryPoints: ["code.ts"],
  bundle: true,
  outfile: "dist/code.js",
  format: "esm",
  platform: "browser",
  sourcemap: true,
  define: {
    "process.env.NODE_DEBUG": "false",
    "process.platform": '"browser"',
  },
  alias: {
    zlib: "browserify-zlib",
  },
});

buildContext.watch();
