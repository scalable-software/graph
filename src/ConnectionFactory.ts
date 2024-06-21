import { Utilities, UUID } from "./Utilities/Utilities.js";

export type Coordinates = {
  x: number;
  y: number;
};

export type Connection = {
  id: UUID;
  name: string;
  source: UUID;
  target: UUID;
  coordinates: {
    start: Coordinates;
    end: Coordinates;
  };
};

export type Connections = Connection[];

export class ConnectionFactory {
  public static create = ({
    name,
    source,
    target,
    coordinates,
  }): Connection => ({
    id: Utilities.uuid,
    name,
    source,
    target,
    coordinates,
  });

  public static update = (
    connection: Connection,
    update: Connection
  ): Connection => update;

  public static updateCoordinates = (
    connection: Connection,
    coordinates: {
      start: Coordinates;
      end: Coordinates;
    }
  ): Connection => ({
    ...connection,
    coordinates,
  });

  public static translate = (connection: Connection, offset: any) => {
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
}
