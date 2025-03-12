import * as esbuild from "esbuild";

let buildContext = await esbuild.context({
  entryPoints: ["code.ts"],
  bundle: true,
  outfile: "dist/code.js",
  format: "esm",
  platform: "browser",
  sourcemap: true,
});

buildContext.watch();
