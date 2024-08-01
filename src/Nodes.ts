import { type UUID, Utilities } from "./Utilities/Utilities.js";
import { type Coordinates, type Offset } from "./Graph.Types.js";
import { type Node, type NodeType } from "./Nodes.Types.js";

export class Nodes<T extends Node> extends Array<T> {
  public static create = <T extends Node>(details: Omit<T, "id">): T =>
    ({
      id: Utilities.uuid,
      ...details,
    } as T);

  public static update = <T extends Node>(node: T, update: T): T => ({
    ...update,
    id: node.id,
  });

  public static updateCoordinates = <T extends Node>(
    node: T,
    coordinates: Coordinates
  ): T => ({
    ...node,
    coordinates,
  });

  public static translate = <T extends Node>(node: T, offset: any): T =>
    (node.coordinates = {
      x: node.coordinates.x + offset.x,
      y: node.coordinates.y + offset.y,
    }) && node;

  private _getIndex = (id: UUID): number =>
    this.findIndex((node) => node.id === id);

  public create = (details: Omit<T, "id">): Nodes<T> =>
    this.push(Nodes.create(details as Omit<T, "id">) as T) && this;

  public add = (node: T | T[]): Nodes<T> =>
    Array.isArray(node) ? this.push(...node) && this : this.push(node) && this;

  public update = (id: UUID, update: T): Nodes<T> =>
    (this[this._getIndex(id)] = Nodes.update(
      this[this._getIndex(id)],
      update
    )) && this;

  public updateCoordinates = (id: UUID, coordinates: Coordinates): Nodes<T> =>
    (this[this._getIndex(id)] = Nodes.updateCoordinates(
      this[this._getIndex(id)],
      coordinates
    )) && this;

  public findById = (id: UUID): T => this[this._getIndex(id)];

  public findByType = (type: NodeType): T[] =>
    this.filter((node) => node.type === type);

  public findByCoordinates = (coordinates: Coordinates): T[] =>
    this.filter(
      (node) =>
        node.coordinates.x === coordinates.x &&
        node.coordinates.y === coordinates.y
    );

  public translate = (id: UUID, offset: Offset): Nodes<T> =>
    (this[this._getIndex(id)] = Nodes.translate(
      this[this._getIndex(id)],
      offset
    )) && this;

  public remove = (id: UUID): Nodes<T> =>
    this.splice(this._getIndex(id), 1) && this;
}
