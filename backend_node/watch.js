import * as esbuild from "esbuild";

async function watch() {
	let context = await esbuild.context({
		entryPoints: ["src/index.ts", "src/cli.ts"],
		bundle: true,
		platform: "node",
		target: "node18",
		format: "esm",
		outdir: "dist",
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
			"protobufjs",
		],
		logLevel: "info",
	});

	await context.watch();
	console.log("Watching for changes...");
}

watch().catch((err) => {
	console.error("Watch setup failed:", err);
	process.exit(1);
});
