var RideableType;
(function (RideableType) {
    RideableType["electric"] = "electric_bike";
    RideableType["classic"] = "classic_bike";
})(RideableType || (RideableType = {}));
var MemberCasual;
(function (MemberCasual) {
    MemberCasual["member"] = "member";
    MemberCasual["casual"] = "casual";
})(MemberCasual || (MemberCasual = {}));
const DESERIALIZERS = [
    {
        name: "json",
        deserialize: async (data) => {
            const reader = data.getReader();
            const decoder = new TextDecoder();
            let chunks = [];
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
async function deserializeAllTest(d) {
    const response = await fetch(`/${d.name}/all`);
    const body = response.body;
    if (body === null) {
        throw new Error("Response stream is null");
    }
    const deserializeStartTime = performance.now();
    const serverResponse = await d.deserialize(body);
    const elapsedDeserializeTime = performance.now() - deserializeStartTime;
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
