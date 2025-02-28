enum RideableType {
  electric = "electric_bike",
  classic = "classic_bike",
}

enum MemberCasual {
  member = "member",
  casual = "casual",
}

// This is the same trip that we use on the backend.
// The header row of the csv is:
// "ride_id","rideable_type","started_at","ended_at","start_station_name","start_station_id","end_station_name","end_station_id","start_lat","start_lng","end_lat","end_lng","member_casual"
type Trip = {
  rideId: string;
  rideableType: RideableType;
  startedAt: Date;
  endedAt: Date;
  startStationName: string;
  startStationId: string;
  endStationName: string;
  endStationId: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  memberCasual: MemberCasual;
};

// TODO: eventually we want to serialize streams as well; the all suffix here means we serialize all trips at once
type ServerResponseAll = {
  trips: Array<Trip>;
};

interface Deserializer {
  name: string;
  deserialize: (data: ReadableStream<Uint8Array>) => Promise<ServerResponseAll>;
}

const DESERIALIZERS: Array<Deserializer> = [
  {
    name: "json",
    deserialize: async (data: ReadableStream<Uint8Array>) => {
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let chunks: Array<string> = [];
      let done = false;
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        chunks.push(decoder.decode(value));
      }
      return JSON.parse(chunks.join(""));
    },
  },
];

type DeserializeAllStats = {
  size: number;
  elapsedDeserializeTime: number;
};

async function deserializeAllTest(
  d: Deserializer,
): Promise<DeserializeAllStats> {
  const response = await fetch(`/${d.name}/all`);
  const body = response.body;
  if (body === null) {
    throw new Error("Response stream is null");
  }
  const deserializeStartTime = performance.now();
  const serverResponse = await d.deserialize(body);
  const elapsedDeserializeTime = performance.now() - deserializeStartTime;

  // Simple thing to defeat the optimizer
  for (const trip of serverResponse.trips) {
    if (trip.rideId === "123") {
      console.log(trip);
    }
  }

  return {
    size: parseInt(response.headers.get("content-length") || "0"),
    elapsedDeserializeTime,
  };
}

async function runDeserializeAllTests() {
  const results = await Promise.all(DESERIALIZERS.map(deserializeAllTest));
  console.table(results);
}

document.addEventListener("DOMContentLoaded", () => {
  runDeserializeAllTests().finally(() => console.log("done"));
});
