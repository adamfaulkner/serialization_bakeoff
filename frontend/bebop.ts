import { ServerResponseAll as ServerResponseAllBebop } from "./bops.gen.js";
import { ServerResponseAll } from "./trip.js";

export const bebop = {
  name: "bebop",
  deserializeAll: (data: Uint8Array) => {
    return ServerResponseAllBebop.decode(data);
  },
  materializeAsPojo: (deserialized: any): ServerResponseAll => {
    return deserialized;
  },
  scanForIdProperty: (deserialized: ServerResponseAll, targetId: string) => {
    const trip = deserialized.trips.find((trip) => trip.rideId === targetId);
    return trip !== undefined;
  },
};
