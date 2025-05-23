import * as esbuild from "esbuild";

const buildContext = await esbuild.context({
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
		stream: "stream-browserify",
		buffer: "buffer",
		util: "util",
		events: "events",
		path: "path",
	},
});

buildContext.watch();
