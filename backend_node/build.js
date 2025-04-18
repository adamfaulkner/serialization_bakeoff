import * as esbuild from "esbuild";

async function build() {
  let result = await esbuild.build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    platform: "node",
    target: "node18",
    format: "esm",
    outfile: "dist/index.js",
    sourcemap: true,
    external: [
      // Node.js built-in modules
      "node:*",
      "fs",
      "path",
      "url",
      "https",
      // External packages that should not be bundled
      "@toondepauw/node-zstd",
      "csv-parser",
      "avsc",
      "express",
      "protobufjs"
    ],
    logLevel: "info"
  });

  console.log("Build complete", result);
}

build().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});