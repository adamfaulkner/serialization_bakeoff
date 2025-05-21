import { Chart } from "chart.js/auto";
import type { SerializePerformanceStats } from "./deserializer.js";

function getCanvasElement(id: string): HTMLCanvasElement {
	const element = document.getElementById(id);
	if (element?.tagName !== "CANVAS") {
		throw new Error(`Element with id '${id}' must be a canvas`);
	}
	return element as HTMLCanvasElement;
}

const hideCapnpCheckbox = document.getElementById("hideCapnp") as HTMLInputElement;

const defaultChartOptions = {
	backgroundColor: [
		"rgba(255, 99, 132, 0.2)",
		"rgba(255, 159, 64, 0.2)",
		"rgba(255, 205, 86, 0.2)",
		"rgba(75, 192, 192, 0.2)",
		"rgba(54, 162, 235, 0.2)",
		"rgba(153, 102, 255, 0.2)",
		"rgba(201, 203, 207, 0.2)",
	],
	borderColor: [
		"rgb(255, 99, 132)",
		"rgb(255, 159, 64)",
		"rgb(255, 205, 86)",
		"rgb(75, 192, 192)",
		"rgb(54, 162, 235)",
		"rgb(153, 102, 255)",
		"rgb(201, 203, 207)",
	],
	borderWidth: 1,
};

function pickPerformanceStats(
	performanceStats: Array<SerializePerformanceStats>,
	picks: Array<string>,
): Array<SerializePerformanceStats> {
	const result: Array<SerializePerformanceStats> = [];
	for (const pick of picks) {
		const found = performanceStats.find((stat) => stat.name === pick);
		if (found === undefined) {
			throw new Error(`No ${pick}`);
		}
		result.push(found);
	}
	return result;
}

export function renderCharts(performanceStats: Array<SerializePerformanceStats>) {
	const filteredPerformanceStats = performanceStats.filter(
		(stat) => !hideCapnpCheckbox.checked || stat.name !== "capnp",
	);

	const sizePerformanceStats = pickPerformanceStats(filteredPerformanceStats, [
		"json",
		"proto",
		"msgpack",
		"cbor",
		"bebop",
		"capnp",
		"flatbuffers",
		"avro",
	]);

	new Chart(getCanvasElement("sizes"), {
		type: "bar",
		data: {
			labels: sizePerformanceStats.map((ps) => ps.name),
			datasets: [
				{
					label: "Serialized Size",
					data: sizePerformanceStats.map((s) => s.size),
					...defaultChartOptions,
				},
			],
		},
	});

	const frontRunnerStats = pickPerformanceStats(filteredPerformanceStats, [
		"json",
		"updated proto",
		"bebop",
		"updated avro",
		"msgpack",
		"cbor",
		"flatbuffers",
	]);

	new Chart(getCanvasElement("endToEndClientSideUnverifiedPojo"), {
		type: "bar",
		data: {
			labels: frontRunnerStats.map((s) => s.name),
			datasets: [
				{
					label: "End to End client side deserialize (milliseconds)",
					data: frontRunnerStats.map(
						(s) => s.endToEndMaterializeUnverifiedPojoDuration - s.serializeDuration - s.zstdDuration,
					),
					...defaultChartOptions,
				},
			],
		},
	});

	new Chart(getCanvasElement("compressedSizes"), {
		type: "bar",
		data: {
			labels: sizePerformanceStats.map((s) => s.name),
			datasets: [
				{
					label: "Compressed Size",
					data: sizePerformanceStats.map((s) => s.zstdCompressedSize),
					...defaultChartOptions,
				},
			],
		},
	});

	new Chart(getCanvasElement("serializationTime"), {
		type: "bar",
		data: {
			labels: filteredPerformanceStats.map((s) => s.name),
			datasets: [
				{
					label: "Serialize Duration (milliseconds)",
					data: filteredPerformanceStats.map((s) => s.serializeDuration),
					...defaultChartOptions,
				},
			],
		},
	});

	new Chart(getCanvasElement("zstdDuration"), {
		type: "bar",
		data: {
			labels: sizePerformanceStats.map((s) => s.name),
			datasets: [
				{
					label: "Compression Duration (milliseconds)",
					data: sizePerformanceStats.map((s) => s.zstdDuration),
					...defaultChartOptions,
				},
			],
		},
	});

	new Chart(getCanvasElement("bodyReadDuration"), {
		type: "bar",
		data: {
			labels: frontRunnerStats.map((s) => s.name),
			datasets: [
				{
					label: "Body Read Duration (milliseconds)",
					data: frontRunnerStats.map((s) => s.bodyReadDuration),
					...defaultChartOptions,
				},
			],
		},
	});

	new Chart(getCanvasElement("deserializationTime"), {
		type: "bar",
		data: {
			labels: filteredPerformanceStats.map((s) => s.name),
			datasets: [
				{
					label: "Deserialize Duration",
					data: filteredPerformanceStats.map((s) => s.deserializeDuration),
					...defaultChartOptions,
				},
			],
		},
	});

	new Chart(getCanvasElement("materializeVerified"), {
		type: "bar",
		data: {
			labels: frontRunnerStats.map((s) => s.name),
			datasets: [
				{
					label: "End to End client side deserialize and verify (milliseconds)",
					data: frontRunnerStats.map(
						(s) =>
							s.endToEndMaterializeUnverifiedPojoDuration -
							s.serializeDuration -
							s.zstdDuration -
							s.materializeAsUnverifiedPojoDuration +
							s.materializeAsVerifiedPojoDuration,
					),
					...defaultChartOptions,
				},
			],
		},
	});

	new Chart(getCanvasElement("endToEndScanForProperty"), {
		type: "bar",
		data: {
			labels: frontRunnerStats.map((s) => s.name),
			datasets: [
				{
					label: "Duration to Scan for a single Property (milliseconds)",
					data: frontRunnerStats.map((s) => s.deserializeDuration + s.scanForIdPropertyDuration),
					...defaultChartOptions,
				},
			],
		},
	});

	const avroStats = pickPerformanceStats(filteredPerformanceStats, ["avro", "updated avro"]);

	new Chart(getCanvasElement("newAvroVsOld"), {
		type: "bar",
		data: {
			labels: avroStats.map((s) => s.name),
			datasets: [
				{
					label: "New Avro vs Current Implementation -- Deserialization (milliseconds)",
					data: avroStats.map((s) => s.deserializeDuration),
					...defaultChartOptions,
				},
			],
		},
	});

	const protobufStats = pickPerformanceStats(filteredPerformanceStats, ["proto", "updated proto"]);

	new Chart(getCanvasElement("newProtobufVsOld"), {
		type: "bar",
		data: {
			labels: protobufStats.map((s) => s.name),
			datasets: [
				{
					label: "New Protobuf vs Current Implementation -- Deserialization (milliseconds)",
					data: protobufStats.map((s) => s.deserializeDuration),
					...defaultChartOptions,
				},
			],
		},
	});

	const capnpStats = pickPerformanceStats(filteredPerformanceStats, ["json", "proto", "capnp"]);

	new Chart(getCanvasElement("capnpStats"), {
		type: "bar",
		data: {
			labels: capnpStats.map((s) => s.name),
			datasets: [
				{
					label: "End to End client side deserialize (milliseconds)",
					data: capnpStats.map(
						(s) => s.endToEndMaterializeUnverifiedPojoDuration - s.serializeDuration - s.zstdDuration,
					),
					...defaultChartOptions,
				},
			],
		},
	});

	hideCapnpCheckbox.addEventListener("change", () => {
		renderCharts(performanceStats);
	});
}
