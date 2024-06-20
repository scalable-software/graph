import { Utilities } from "./Utilities/Utilities.js";
import { StructureType } from "./Node.js";

import {
  TupleConnectionType,
  TupleCoordinates,
} from "./TupleConnection.meta.js";

export class TupleConnection {
  public static structure: StructureType = "tuple";
  public static create = ({
    name,
    source,
    target,
    coordinates,
  }): TupleConnectionType => [
    Utilities.uuid,
    name,
    source,
    target,
    [
      [coordinates.start.x, coordinates.start.y],
      [coordinates.end.x, coordinates.end.y],
    ],
  ];

  public static update = (
    connection: TupleConnectionType,
    update: TupleConnectionType
  ): TupleConnectionType => update;

  public static updateCoordinates = (
    connection: TupleConnectionType,
    coordinates: {
      start: { x: number; y: number };
      end: { x: number; y: number };
    }
  ): TupleConnectionType => {
    connection[4] = [
      [coordinates.start.x, coordinates.start.y],
      [coordinates.end.x, coordinates.end.y],
    ];
    return connection;
  };

  public static translate = (connection: TupleConnectionType, offset: any) => {
    connection[4] = [
      [connection[4][0][0] + offset.x, connection[4][0][1] + offset.y],
      [connection[4][1][0] + offset.x, connection[4][1][1] + offset.y],
    ];
    return connection;
  };

  public static getConnectionBySource = (
    connections: TupleConnectionType[], 
    nodeId: string
  ): TupleConnectionType[] => 
    connections.filter(connection => connection[2] === nodeId);
  
}
