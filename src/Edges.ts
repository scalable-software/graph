/**
 * A graph is a data structure that:
 * - has {@link Edges}
 * - contains contains nodes and edges.
 *
 * Extension with new properties is supported.
 * @module Graph
 */

import { Edge, type IEdge, type PartialEdge } from "./Edge.js";
import { Validate } from "./validations/Validate.js";
import { Validator } from "./validations/Validator.js";
import { Utilities } from "./utilities/Utilities.js";
import type { Coordinates, UUID } from "./Graph.types.js";

export class Edges<T extends IEdge> extends Array<T> {
  public static create = <T extends IEdge>(edges?: T[] | null): Edges<T> =>
    new Edges<T>(...Edges.normalize<T>(edges)) as Edges<T>;

  private static defaults = <T extends IEdge>(): T[] => [];

  private static normalize = <T extends IEdge>(edges?: T[]): T[] =>
    edges ? Validate.edges(edges) : Edges.defaults();

  private _immutable = true;

  constructor(...edges: T[]) {
    super(...edges);
  }

  /**
   * A flag indicating whether to give precedence to performance or memory usage.
   * - `true`, the nodes in the collection is immutable: operations return new instances of a nodes.
   * - `false`, the nodes in the collection is mutable: operations modify the instance in place.
   *
   * @category Configuration
   */
  get immutable(): boolean {
    return this._immutable;
  }
  set immutable(immutable: boolean) {
    this._immutable = Validate.flag(immutable);
  }

  /**
   * Adds new edges to the `Edges` collection while ensuring unique IDs.
   * If a edge does not have an `id`, it will be automatically assigned one.
   *
   * @param edges - A single edge or an array of edges to add.
   * @throws {Error} If a edges with the same ID already exists in the collection.
   * @returns {Edges<T>} The modified `Edges<T>` instance, allowing method chaining.
   *
   * @category Operations
   */
  public add = (edges: T | Omit<T, "id"> | (T | Omit<T, "id">)[]): Edges<T> => {
    ((edges) => this.push(...edges))(
      ((edges) => this.validate(edges))(
        ((edges) => Utilities.normalize(edges))(Validate.notNull(edges))
      )
    );
    return this;
  };

  /**
   * Update the details of a edge in the collection based on its ID.
   *
   * @param id - The ID of the edge to update.
   * @param details - The details to update.
   * @throws {Error} If the edge does not exist in the collection or id or details are invalid.
   *
   * @returns {Edges<T>} The modified `Edges<T>` instance, allowing method chaining.
   *
   * @category Operations
   */
  public update = (id: UUID, details: PartialEdge<T>): Edges<T> => {
    (([id, details]) =>
      this.apply(id as UUID, (edge) => Edge.update(edge, details)))(
      Validator.validate<[UUID, PartialEdge<T>]>(
        [id, details],
        [
          ([id, details]) => Validate.id(this, id),
          ([id, details]) => Validate.edgeDetails(details),
        ]
      )
    );
    return this;
  };

  /**
   * Move an edge in the collection based on its ID and using the provided coordinates.
   *
   * @param id - The ID of the edge to move.
   * @param coordinates - The coordinates to move the edge to.
   * @throws {Error} If the edge does not exist in the collection or id or coordinates are invalid.
   *
   * @returns {Edges<T>} The modified `Edges<T>` instance, allowing method chaining.
   *
   * @example
   * ```typescript
   * const edges = Edges.create([
   *  { id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d", start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
   *  { id: "a3f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c4a1e", start: { x: 1, y: 1 }, end: { x: 2, y: 2 } },
   * ]);
   * edges.move("d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d", { start: { x: 2, y: 2 } });
   * ```
   *
   * @category Operations
   *
   */
  public move = (
    id: UUID,
    coordinates: { start?: Coordinates; end?: Coordinates }
  ): Edges<T> => {
    (([id, coordinates]) =>
      this.apply(id as UUID, (edge) => Edge.move(edge, coordinates)))(
      Validator.validate<[UUID, { start?: Coordinates; end?: Coordinates }]>(
        [id, coordinates],
        [
          ([id, coordinates]) => Validate.id(this, id),
          ([id, coordinates]) =>
            coordinates.start && Validate.coordinates(coordinates.start),
          ([id, coordinates]) =>
            coordinates.end && Validate.coordinates(coordinates.end),
        ]
      )
    );
    return this;
  };

  public translate = () => {};

  private index = (id: UUID): number => Utilities.Index.byId<T>(this, id);

  private edge = (id: UUID): T => this.at(Utilities.Index.byId<T>(this, id));

  private assign = (edge: T, updatedEdge: T): T =>
    this.immutable
      ? (this[this.index(edge.id)] = updatedEdge)
      : Object.assign(edge, updatedEdge);

  private apply = (id: UUID, transform: (edge: T) => T): T =>
    ((edge) => this.assign(edge, transform(edge)))(this.edge(id));

  private validate = (edges: T[]): T[] =>
    ((edges) =>
      Validator.compare(
        [this, edges],
        [(sets) => Validate.distinct(sets, (edge) => edge.id)]
      ))(Validate.edges<T>(edges));
}
