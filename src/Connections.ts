import { type UUID, Utilities } from "./Utilities/Utilities.js";
import { type Coordinates, type Offset } from "./Graph.Types.js";
import { type Connection } from "./Connections.Types.js";

export class Connections<T extends Connection> extends Array<T> {
  public static create = <T extends Connection>(details: Omit<T, "id">): T =>
    ({
      ...details,
      id: Utilities.uuid,
    } as T);

  public static update = <T extends Connection>(
    connection: T,
    update: T
  ): T => ({
    ...update,
    id: connection.id,
  });

  public static updateCoordinates = <T extends Connection>(
    connection: T,
    coordinates: { start: Coordinates; end: Coordinates }
  ): T => ({
    ...connection,
    coordinates,
  });

  public static translate = <T extends Connection>(
    connection: T,
    offset: Offset
  ): T => {
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

  private _getIndex = (id: UUID) =>
    this.findIndex((connection) => connection.id === id);

  public create = (details: Omit<T, "id">): Connections<T> =>
    this.push(Connections.create(details)) && this;

  public add = (connection: T | T[]): Connections<T> =>
    Array.isArray(connection)
      ? this.push(...connection) && this
      : this.push(connection) && this;

  public update = (id: UUID, update: T) =>
    (this[this._getIndex(id)] = Connections.update(
      this[this._getIndex(id)],
      update
    )) && this;

  public findById = (id: UUID): T => this[this._getIndex(id)];

  public translate = (id: UUID, offset: Coordinates) =>
    (this[this._getIndex(id)] = Connections.translate(
      this[this._getIndex(id)],
      offset
    )) && this;

  public remove = (id: UUID): Connections<T> =>
    this.splice(this._getIndex(id), 1) && this;
}
