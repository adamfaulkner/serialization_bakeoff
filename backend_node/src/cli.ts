/**
 * Command-line tool for performance testing of serialization techniques
 * This tool loads data and serializes it using different methods, then reports performance metrics
 */

import { loadData } from "./loadData.js";
import {
	jsonSerialize,
	msgpackSerialize,
	cborSerialize,
	protoSerialize,
	avroSerialize,
	bebopSerialize,
	flatbuffersSerialize,
	compressWithZstd,
} from "./serializers.js";
import { Trip } from "./types.js";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { Session } from "node:inspector/promises";

// Define available serializers
type SerializerName = "json" | "msgpack" | "cbor" | "proto" | "avro" | "bebop" | "flatbuffers";
const availableSerializers: Record<SerializerName, (trips: Trip[]) => { data: Buffer | string; duration: number }> = {
	json: jsonSerialize,
	msgpack: msgpackSerialize,
	cbor: cborSerialize,
	proto: protoSerialize,
	avro: avroSerialize,
	bebop: bebopSerialize,
	flatbuffers: flatbuffersSerialize,
};

interface RunOptions {
	serializer: SerializerName | "all";
	iterations: number;
	useZstd: boolean;
	outputFile?: string;
	profile?: boolean;
	allocationProfile?: boolean;
}

async function startProfiling(session: Session, name: string) {
	await session.post("Profiler.enable");
	await session.post("Profiler.start");
	console.log(`Started profiling ${name}...`);
}

async function stopProfiling(session: Session, name: string) {
	const { profile } = await session.post("Profiler.stop");
	writeFileSync(`${name}.cpuprofile`, JSON.stringify(profile));
	console.log(`Profile saved to ${name}.cpuprofile`);
}

async function startAllocationSampling(session: Session, name: string) {
	await session.post("HeapProfiler.enable");
	await session.post("HeapProfiler.collectGarbage");
	await session.post("HeapProfiler.startSampling", {
		includeObjectsCollectedByMajorGC: true,
		includeObjectsCollectedByMinorGC: true,
	});
	console.log(`Started allocation sampling ${name}...`);
}

async function stopAllocationSampling(session: Session, name: string) {
	const { profile } = await session.post("HeapProfiler.stopSampling");
	writeFileSync(`${name}.heapprofile`, JSON.stringify(profile));
	console.log(`Profile saved to ${name}.heapprofile`);
}

async function runBenchmark(options: RunOptions): Promise<void> {
	console.log("Loading trip data...");
	const startDataLoad = process.hrtime.bigint();
	const trips = await loadData();
	const endDataLoad = process.hrtime.bigint();
	const loadDuration = Number((endDataLoad - startDataLoad) / 1000000n);

	console.log(`Loaded ${trips.length} trips in ${loadDuration}ms`);

	const serializersToRun: SerializerName[] =
		options.serializer === "all" ? (Object.keys(availableSerializers) as SerializerName[]) : [options.serializer];

	const results: Record<
		string,
		{
			avgDuration: number;
			minDuration: number;
			maxDuration: number;
			dataSize: number;
			compressedSize?: number;
			compressionRatio?: number;
			compressionDuration?: number;
		}
	> = {};

	for (const serializerName of serializersToRun) {
		const serializeFunc = availableSerializers[serializerName];
		console.log(`\nRunning ${serializerName} benchmark (${options.iterations} iterations)...`);

		const durations: number[] = [];
		let serializedData: Buffer | string | undefined;

		// Start profiling if enabled
		let session: Session | undefined;
		if (options.allocationProfile || options.profile) {
			session = new Session();
			session.connect();
		}
		if (options.allocationProfile) {
			await startAllocationSampling(session!, serializerName);
		}
		if (options.profile) {
			await startProfiling(session!, serializerName);
		}

		// Run the serializer for the specified number of iterations
		for (let i = 0; i < options.iterations; i++) {
			const result = serializeFunc(trips);
			durations.push(result.duration);

			// Save the output from the last iteration
			if (i === options.iterations - 1) {
				serializedData = result.data;
			}

			process.stdout.write(".");
		}

		// Stop profiling if enabled
		if (options.profile && session) {
			await stopProfiling(session, serializerName);
		}
		if (options.allocationProfile && session) {
			await stopAllocationSampling(session, serializerName);
		}
		if (session) {
			session.disconnect();
		}

		process.stdout.write("\n");

		// Calculate statistics
		const avgDuration = durations.reduce((sum, val) => sum + val, 0) / durations.length;
		const minDuration = Math.min(...durations);
		const maxDuration = Math.max(...durations);

		// Convert serializedData to Buffer if it's a string
		const dataBuffer = typeof serializedData === "string" ? Buffer.from(serializedData) : (serializedData as Buffer);
		const dataSize = dataBuffer.length;

		console.log(
			`${serializerName} average: ${avgDuration.toFixed(2)}ms (min: ${minDuration}ms, max: ${maxDuration}ms)`,
		);
		console.log(`${serializerName} data size: ${formatBytes(dataSize)}`);

		// Store result
		results[serializerName] = {
			avgDuration,
			minDuration,
			maxDuration,
			dataSize,
		};

		// Optionally compress with zstd
		if (options.useZstd) {
			const compressionResult = compressWithZstd(dataBuffer);
			const compressedSize = compressionResult.data.length;
			const compressionRatio = dataSize / compressedSize;

			console.log(
				`${serializerName} compressed size: ${formatBytes(compressedSize)} (ratio: ${compressionRatio.toFixed(2)}x)`,
			);
			console.log(`${serializerName} compression time: ${compressionResult.duration.toFixed(2)}ms`);

			// Add compression data to results
			results[serializerName].compressedSize = compressedSize;
			results[serializerName].compressionRatio = compressionRatio;
			results[serializerName].compressionDuration = compressionResult.duration;
		}

		// If outputFile is specified and we're only running one serializer, save the output
		if (options.outputFile && options.serializer !== "all") {
			writeFileSync(options.outputFile, dataBuffer);
			console.log(`Output written to ${options.outputFile}`);
		}
	}

	// Print a summary table
	console.log("\n=== SUMMARY ===");
	console.log("Serializer\tAvg (ms)\tSize\t\tCompressed Size\tRatio");
	console.log("--------------------------------------------------------------------------");

	for (const [name, result] of Object.entries(results)) {
		const sizeStr = formatBytes(result.dataSize);
		const compressedSizeStr = result.compressedSize ? formatBytes(result.compressedSize) : "N/A";
		const ratioStr = result.compressionRatio ? result.compressionRatio.toFixed(2) + "x" : "N/A";

		console.log(
			`${name.padEnd(10)}\t${result.avgDuration.toFixed(2)}\t\t${sizeStr}\t${compressedSizeStr}\t\t${ratioStr}`,
		);
	}
}

function formatBytes(bytes: number): string {
	if (bytes < 1024) return bytes + " B";
	else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
	else return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

function parseArgs(): RunOptions {
	const args = process.argv.slice(2);
	let serializer: SerializerName | "all" = "all";
	let iterations = 10;
	let useZstd = false;
	let outputFile: string | undefined;
	let profile = false;
	let allocationProfile = false;

	for (let i = 0; i < args.length; i++) {
		switch (args[i]) {
			case "--serializer":
			case "-s":
				const serializerArg = args[++i];
				if (serializerArg === "all" || serializerArg in availableSerializers) {
					serializer = serializerArg as SerializerName | "all";
				} else {
					console.error(`Invalid serializer: ${serializerArg}`);
					printUsage();
					process.exit(1);
				}
				break;

			case "--iterations":
			case "-i":
				iterations = parseInt(args[++i], 10);
				if (isNaN(iterations) || iterations <= 0) {
					console.error("Iterations must be a positive number");
					printUsage();
					process.exit(1);
				}
				break;

			case "--zstd":
			case "-z":
				useZstd = true;
				break;

			case "--output":
			case "-o":
				outputFile = args[++i];
				break;

			case "--profile":
			case "-p":
				profile = true;
				break;

			case "--allocation-profile":
			case "-a":
				allocationProfile = true;
				break;

			case "--help":
			case "-h":
				printUsage();
				process.exit(0);
				break;

			default:
				console.error(`Unknown option: ${args[i]}`);
				printUsage();
				process.exit(1);
		}
	}

	return { serializer, iterations, useZstd, outputFile, profile, allocationProfile };
}

function printUsage(): void {
	console.log(`
Usage: node cli.js [options]

Options:
  -s, --serializer <name>   Serializer to benchmark (${Object.keys(availableSerializers).join("|")}|all) [default: all]
  -i, --iterations <num>    Number of benchmark iterations [default: 10]
  -z, --zstd               Enable zstd compression
  -o, --output <file>      Save output to file (only works when a single serializer is selected)
  -p, --profile           Enable profiling
  -a, --allocation-profile Enable allocation profiling
  -h, --help               Show this help message
  `);
}

// Main function
async function main(): Promise<void> {
	try {
		const options = parseArgs();
		await runBenchmark(options);
	} catch (error) {
		console.error("Error running benchmark:", error);
		process.exit(1);
	}
}

main();
