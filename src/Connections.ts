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

  public static update = (
    connection: Connection,
    update: Connection
  ): Connection => ({
    ...update,
    id: connection.id,
  });

  public static updateCoordinates = (
    connection: Connection,
    coordinates: { start: Coordinates; end: Coordinates }
  ): Connection => ({
    ...connection,
    coordinates,
  });

  public static translate = (
    connection: Connection,
    offset: Coordinates
  ): Connection => {
    connection.coordinates = {
      start: {
        x: connection.coordinates.start.x + offset.x,
        y: connection.coordinates.start.y + offset.y,
      },
      end: {
        x: connection.coordinates.end.x + offset.x,
        y: connection.coordinates.end.y + offset.y,
      },
    };
    return connection;
  };

  private _proxy: Connection[] = [];

  constructor(private connections: Connection[]) {
    super();
  }

  private _createProxy = (target: Connection[]) => {};
}
