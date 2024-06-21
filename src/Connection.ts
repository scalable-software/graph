import { Utilities } from "./Utilities/Utilities.js";
import { StructureType } from "./Node.meta.js";

import { Connection as iConnection, Coordinates } from "./Connection.meta.js";

export class Connection {
  public static create = ({
    name,
    source,
    target,
    coordinates,
  }): iConnection => ({
    id: Utilities.uuid,
    name,
    source,
    target,
    coordinates,
  });

  public static update = (
    connection: iConnection,
    update: iConnection
  ): iConnection => update;

  public static updateCoordinates = (
    connection: iConnection,
    coordinates: {
      start: Coordinates;
      end: Coordinates;
    }
  ): iConnection => ({
    ...connection,
    coordinates,
  });

  public static translate = (connection: iConnection, offset: any) => {
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
