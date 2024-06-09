import { Utilities } from "./Utilities/Utilities.js";
import { StructureType } from "./Node.js";

import {
  ObjectConnectionType,
  ObjectCoordinates,
} from "./ObjectConnection.meta.js";

export class ObjectConnection {
  public static structure: StructureType = "object";
  public static create = ({
    name,
    source,
    target,
    coordinates,
  }): ObjectConnectionType => ({
    id: Utilities.uuid,
    name,
    source,
    target,
    coordinates,
  });

  public static update = (
    connection: ObjectConnectionType,
    update: ObjectConnectionType
  ): ObjectConnectionType => update;

  public static updateCoordinates = (
    connection: ObjectConnectionType,
    coordinates: {
      start: ObjectCoordinates;
      end: ObjectCoordinates;
    }
  ): ObjectConnectionType => ({
    ...connection,
    coordinates,
  });

  public static translate = (connection: ObjectConnectionType, offset: any) => {
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
