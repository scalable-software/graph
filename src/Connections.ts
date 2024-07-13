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

export class Connections extends Array<Connection> {
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

  private _getIndex = (id: UUID) =>
    this.findIndex((connection) => connection.id === id);

  public create = (details: Omit<Connection, "id">) =>
    this.push(Connections.create(details)) && this;

  public update = (id, update) => {
    this[this._getIndex(id)] = Connections.update(
      this[this._getIndex(id)],
      update
    );
    return this;
  };

  public findById = (id: UUID) => this[this._getIndex(id)];

  public translate = (id: UUID, offset: Coordinates) => {
    this[this._getIndex(id)] = Connections.translate(
      this[this._getIndex(id)],
      offset
    );
    return this;
  };

  public remove = (id: UUID) => {
    this.splice(this._getIndex(id), 1);
    return this;
  };
}
