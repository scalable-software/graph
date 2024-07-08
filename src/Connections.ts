import { type UUID, Utilities } from "./Utilities/Utilities.js";

export type Coordinates = {
  x: number;
  y: number;
};

export type Connection = {
  id?: UUID;
  name: string;
  source: UUID;
  target: UUID;
  coordinates: {
    start: Coordinates;
    end: Coordinates;
  };
};

export class Connections extends EventTarget {
  public static init = (connections: Connection[] = []) =>
    new Connections(connections)._proxy;

  public static create = (details: Omit<Connection, "id">): Connection => ({
    id: Utilities.uuid,
    name: details.name,
    source: details.source,
    target: details.target,
    coordinates: details.coordinates,
  });

  private _proxy: Connection[] = [];

  constructor(private connections: Connection[]) {
    super();
  }
}
