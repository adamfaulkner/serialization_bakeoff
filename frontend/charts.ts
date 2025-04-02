import { Chart } from "chart.js/auto";
import { SerializePerformanceStats } from "./deserializer.js";

function getCanvasElement(id: string): HTMLCanvasElement {
  const element = document.getElementById(id);
  if (element?.tagName !== "CANVAS") {
    throw new Error(`Element with id '${id}' must be a canvas`);
  }
  return element as HTMLCanvasElement;
}

const hideCapnpCheckbox = document.getElementById(
  "hideCapnp",
) as HTMLInputElement;

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

export function renderCharts(
  performanceStats: Array<SerializePerformanceStats>,
) {
  const filteredPerformanceStats = performanceStats.filter(
    (stat) => !hideCapnpCheckbox.checked || stat.name !== "capnp",
  );

  new Chart(getCanvasElement("sizes"), {
    type: "bar",
    data: {
      labels: filteredPerformanceStats.map((s) => s.name),
      datasets: [
        {
          label: "Serialized Size",
          data: filteredPerformanceStats.map((s) => s.size),
          ...defaultChartOptions,
        },
      ],
    },
  });

  new Chart(getCanvasElement("compressedSizes"), {
    type: "bar",
    data: {
      labels: filteredPerformanceStats.map((s) => s.name),
      datasets: [
        {
          label: "Compressed Size",
          data: filteredPerformanceStats.map((s) => s.zstdCompressedSize),
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
          label: "Serialize Duration",
          data: filteredPerformanceStats.map((s) => s.serializeDuration),
          ...defaultChartOptions,
        },
      ],
    },
  });

  new Chart(getCanvasElement("zstdDuration"), {
    type: "bar",
    data: {
      labels: filteredPerformanceStats.map((s) => s.name),
      datasets: [
        {
          label: "Zstd Duration",
          data: filteredPerformanceStats.map((s) => s.zstdDuration),
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

  new Chart(getCanvasElement("endToEndPojo"), {
    type: "bar",
    data: {
      labels: filteredPerformanceStats.map((s) => s.name),
      datasets: [
        {
          label: "End to End Duration for Regular JS Object",
          data: filteredPerformanceStats.map(
            (s) =>
              s.serializeDuration +
              s.deserializeDuration +
              s.materializeAsPojoDuration,
          ),
          ...defaultChartOptions,
        },
      ],
    },
  });

  new Chart(getCanvasElement("endToEndPojoValidated"), {
    type: "bar",
    data: {
      labels: filteredPerformanceStats.map((s) => s.name),
      datasets: [
        {
          label: "End to End Duration for Validated JS Object",
          data: filteredPerformanceStats.map(
            (s) =>
              s.serializeDuration +
              s.deserializeDuration +
              s.materializeAsPojoDuration +
              s.validationDuration,
          ),
          ...defaultChartOptions,
        },
      ],
    },
  });

  new Chart(getCanvasElement("endToEndScanForProperty"), {
    type: "bar",
    data: {
      labels: filteredPerformanceStats.map((s) => s.name),
      datasets: [
        {
          label: "End to End Duration to Scan for a single Property",
          data: filteredPerformanceStats.map(
            (s) =>
              s.serializeDuration +
              s.deserializeDuration +
              s.scanForIdPropertyDuration,
          ),
          ...defaultChartOptions,
        },
      ],
    },
  });

  hideCapnpCheckbox.addEventListener("change", function () {
    renderCharts(performanceStats);
  });
}
