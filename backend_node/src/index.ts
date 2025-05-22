import express, { Request, Response, NextFunction } from "express";
import https from "node:https";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadData } from "./loadData.js";
import {
	jsonSerialize,
	msgpackSerialize,
	cborSerialize,
	protoSerialize,
	avroSerialize,
	compressWithZstd,
	bebopSerialize,
	flatbuffersSerialize,
} from "./serializers.js";
import { Trip } from "./types.js";

// Setup paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../../");

// Configure SSL
const sslOptions = {
	key: fs.readFileSync(path.join(projectRoot, "self_signed_cert/localhost.key")),
	cert: fs.readFileSync(path.join(projectRoot, "self_signed_cert/localhost.crt")),
};

// Initialize the app
const app = express();
const PORT = 3001; // Using a different port from the Rust backend

// Middleware to add security headers for high precision timers
app.use((req: Request, res: Response, next: NextFunction) => {
	res.set("Cross-Origin-Opener-Policy", "same-origin");
	res.set("Cross-Origin-Embedder-Policy", "require-corp");
	next();
});

// Middleware to log request stats
app.use((req: Request, res: Response, next: NextFunction) => {
	const start = process.hrtime.bigint();
	res.on("finish", () => {
		const end = process.hrtime.bigint();
		const duration = Number((end - start) / 1000000n); // Convert to milliseconds
		console.log(`${req.path} Request duration: ${duration}ms`);
	});
	next();
});

// Middleware for zstd compression if requested
app.use((req: Request, res: Response, next: NextFunction) => {
	const originalSend = res.send;

	res.send = function (body: any) {
		if (req.headers["x-zstd-enabled"] === "true") {
			// Convert string to Buffer if needed
			const dataToCompress = typeof body === "string" ? Buffer.from(body) : body;
			const compressed = compressWithZstd(dataToCompress);
			res.set("Content-Encoding", "zstd");
			res.set("X-Zstd-Duration", compressed.duration.toString());
			return originalSend.call(this, compressed.data);
		}
		return originalSend.call(this, body);
	};

	next();
});

// Serve static frontend files
app.use("/index.html", express.static(path.join(projectRoot, "frontend/index.html")));
app.use("/dist", express.static(path.join(projectRoot, "frontend/dist")));

// Load data before starting the server
let trips: Trip[] = [];

// JSON endpoint
app.get("/json", (req: Request, res: Response) => {
	const result = jsonSerialize(trips);
	res.set("X-Encode-Duration", result.duration.toString());
	res.set("Content-Type", "application/json; charset=utf-8");
	res.send(result.data);
});

// MessagePack endpoint
app.get("/msgpack", (req: Request, res: Response) => {
	const result = msgpackSerialize(trips);
	res.set("X-Encode-Duration", result.duration.toString());
	res.type("application/octet-stream");
	res.send(result.data);
});

// CBOR endpoint
app.get("/cbor", (req: Request, res: Response) => {
	const result = cborSerialize(trips);
	res.set("X-Encode-Duration", result.duration.toString());
	res.type("application/octet-stream");
	res.send(result.data);
});

// Protocol Buffers endpoint
app.get("/proto", (req: Request, res: Response) => {
	const result = protoSerialize(trips);
	res.set("X-Encode-Duration", result.duration.toString());
	res.type("application/octet-stream");
	res.send(result.data);
});

// Avro endpoint
app.get("/avro", (req: Request, res: Response) => {
	try {
		const result = avroSerialize(trips);
		res.set("X-Encode-Duration", result.duration.toString());
		res.type("application/octet-stream");
		res.send(result.data);
	} catch (error) {
		console.error("Error in Avro serialization:", error);
		res.status(501).send("Avro serialization not fully implemented in this TypeScript/ESM version");
	}
});

// Bebop endpoint
app.get("/bebop", (req: Request, res: Response) => {
	try {
		const result = bebopSerialize(trips);
		res.set("X-Encode-Duration", result.duration.toString());
		res.type("application/octet-stream");
		res.send(result.data);
	} catch (error) {
		console.error("Error in Bebop serialization:", error);
		res.status(500).send("Error during Bebop serialization");
	}
});

app.get("/capnp", (req: Request, res: Response) => {
	res.status(501).send("Cap'n Proto serialization not yet implemented in Node.js backend");
});

app.get("/flatbuffers", (req: Request, res: Response) => {
	try {
		const result = flatbuffersSerialize(trips);
		res.set("X-Encode-Duration", result.duration.toString());
		res.type("application/octet-stream");
		res.send(result.data);
	} catch (error) {
		console.error("Error in FlatBuffers serialization:", error);
		res.status(500).send("Error during FlatBuffers serialization");
	}
});

// Start the server
async function startServer() {
	console.log("Loading trip data...");
	const startTime = process.hrtime.bigint();

	try {
		trips = await loadData();
		const endTime = process.hrtime.bigint();
		const duration = Number((endTime - startTime) / 1000000n); // Convert to milliseconds
		console.log(`Data loaded in ${duration}ms`);

		// Start HTTPS server
		https.createServer(sslOptions, app).listen(PORT, () => {
			console.log(`TypeScript Node.js backend server listening on https://localhost:${PORT}`);
		});
	} catch (error) {
		console.error("Failed to load data:", error);
		process.exit(1);
	}
}

startServer();
