/**
 * @module Graph
 */

import { Edge, type IEdge, type PartialEdge } from "./edge.js";
import { Validate } from "./validations/validate.js";
import { Validator } from "./validations/validator.js";
import { Utilities } from "./utilities/utilities.js";
import type { Coordinates, UUID, Offset } from "./graph.types.js";
import { ValidationException } from "./exceptions/exceptions.js";

/**
 * Provides a container for managing a collection of edges with support for:
 * - Unique identifiers for each edge.
 * - Coordinate-based positioning for visual representation.
 * - Immutability control for performance or memory optimization.
 *
 * Supports flexible edge structures with custom properties by extending the base `IEdge`.
 *
 * ```ts
 * const edges = Edges
 *     .create([
 *         {
 *             id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
 *             source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
 *             target: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
 *             coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } }
 *         }
 *     ])
 *
 * const data = edges.toJSON();
 * console.log(data);
 *
 * // [
 * //   {
 * //     id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
 * //     source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
 * //     target: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
 * //     coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
 * //   }
 * // ]
 * ```
 *
 * @template T Extends the base {@link IEdge} type for enhanced flexibility.
 */
export class Edges<T extends IEdge> extends Array<T> {
  /**
   * @category Factory
   */
  public static create = <T extends IEdge>(edges?: T[] | null): Edges<T> =>
    new Edges<T>(...Edges.normalize<T>(edges)) as Edges<T>;

  private static defaults = <T extends IEdge>(): T[] => [];

  private static normalize = <T extends IEdge>(edges?: T[] | null): T[] =>
    edges ? Validate.edges(edges) : Edges.defaults();

  private _immutable = true;

  /**
   * Each edge can be accessed via index notation.
   * @param {number} n - The index of the edge to export.
   * @returns {T} The edge at the specified index.
   * @example
   * ```typescript
   * const edges = Edges.create([edge]);
   * edges[0]; // edge
   * ```
   * @category Factory
   */
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

  get geometric(): boolean {
    return this.every(
      (node) =>
        "coordinates" in node &&
        node.coordinates?.start != null &&
        node.coordinates?.start?.x != null &&
        node.coordinates?.start?.y != null &&
        node.coordinates?.end != null &&
        node.coordinates?.end?.x != null &&
        node.coordinates?.end?.y != null
    );
  }

  /**
   * Adds new edges to the `Edges` collection while ensuring unique IDs.
   * If a edge does not have an `id`, it will be automatically assigned one.
   *
   * @param edges - A single edge or an array of edges to add.
   * @throws {ValidationException} If a edges with the same ID already exists in the collection.
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
   * @throws {ValidationException} If the edge does not exist in the collection or id or details are invalid.
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
   * @throws {ValidationException} If the edge does not exist in the collection or id or coordinates are invalid.
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
    this.geometric &&
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

  /**
   * Translate one or more edges in the collection based on their IDs and using the provided offset.
   *
   * @param id - The ID or IDs of the edges to translate.
   * @param offset - The offset to translate the edges by.
   * @throws {ValidationException} If the edge does not exist in the collection or id or offset are invalid.
   *
   * @returns {Edges<T>} The modified `Edges<T>` instance, allowing method chaining.
   *
   * @example
   * ```typescript
   * const edges = Edges.create([
   * { id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d", start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
   * { id: "a3f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c4a1e", start: { x: 1, y: 1 }, end: { x: 2, y: 2 } },
   * ]);
   * edges.translate("d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d", { x: 1, y: 1 });
   * ```
   *
   * @category Operations
   */
  public translate = (id: UUID | UUID[], offset: Offset): Edges<T> => {
    this.geometric &&
      (([id, offset]) =>
        Utilities.toArray(id).forEach((id) =>
          this.apply(id, (node) => Edge.translate(node, offset))
        ))(
        Validator.validate<[UUID, Offset]>(
          [id as UUID, offset],
          [
            ([id, offset]) => Validate.id(this, id),
            ([id, offset]) => Validate.offset(offset),
          ]
        )
      );
    return this;
  };

  /**
   * Remove a edge from the collection based on its ID.
   *
   * @param id - The ID of the edge to remove.
   * @throws {ValidationException} If the edge does not exist in the collection or id is invalid.
   *
   * @returns {Edges<T>} The modified `Edges<T>` instance, allowing method chaining.
   *
   * @example
   * ```typescript
   * const edges = Edges.create([
   * { id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d", start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
   * { id: "a3f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c4a1e", start: { x: 1, y: 1 }, end: { x: 2, y: 2 } },
   * ]);
   *
   * edges.remove("d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d");
   * ```
   *
   * @category Operations
   */
  public remove = (id: UUID): Edges<T> => {
    ((id) => this.splice(this.index(id), 1))(Validate.id(this, id) as UUID);
    return this;
  };

  /**
   * Find a edge in the collection based on its ID.
   * If the edge does not exist, `undefined` is returned.
   * @param id - The ID of the edge to find.
   * @returns The edge with the specified ID, or `undefined` if not found.
   * @throws {InvalidArgumentException} If the ID is invalid.
   *
   * @example
   * ```typescript
   * const edges = Edges.create([
   * { id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d", start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
   * { id: "a3f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c4a1e", start: { x: 1, y: 1 }, end: { x: 2, y: 2 } },
   * ]);
   *
   * const edge = edges.findById("d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d");
   * console.log(edge); // { id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d", start: { x: 0, y: 0 }, end: { x: 1, y: 1 } }
   * ```
   * @category Operations
   */
  public findById = (id: UUID): T | undefined =>
    ((id) => this.find((node) => node.id === id))(Validate.uuid(id));

  /**
   * Filter the edges in the collection based on the source identifier.
   * If no edges are found, an empty array is returned.
   * @param source - The source identifier to filter by.
   * @returns The edges with the specified source identifier, or an empty array if not found.
   * @throws {InvalidArgumentException} If the source identifier is invalid.
   *
   * @example
   * ```typescript
   * const instance = Edges.create([
   *     {
   *      source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
   *      target: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
   *      coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
   *     },
   *     {
   *      source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1e",
   *      target: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1e",
   *      coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
   *     },
   * ]);
   *
   * const edges = edges.findBySource("d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1e");
   * console.log(edges); // [{ id: ..., source: "a3f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c4a1e", target: ..., coordinates: ... }]
   * ```
   *
   * @category Operations
   */
  public findBySource = (source: UUID): T[] =>
    ((source) => this.filter((edge) => edge.source === source))(
      Validate.uuid(source)
    );

  /**
   * Filter the edges in the collection based on the target identifier.
   * If no edges are found, an empty array is returned.
   * @param target - The target identifier to filter by.
   * @returns The edges with the specified target identifier, or an empty array if not found.
   * @throws {InvalidArgumentException} If the target identifier is invalid.
   *
   * @example
   * ```typescript
   * const instance = Edges.create([
   *     {
   *      source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
   *      target: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
   *      coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
   *     },
   *     {
   *      source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1e",
   *      target: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1e",
   *      coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
   *     },
   * ]);
   *
   * const edges = edges.findByTarget("d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1e");
   * console.log(edges); // [{ id: ..., source: ..., target: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1e", coordinates: ... }]
   * ```
   *
   * @category Operations
   */
  public findByTarget = (target: UUID): T[] =>
    ((target) => this.filter((edge) => edge.target === target))(
      Validate.uuid(target)
    );

  /**
   * Projects the edges in the collection by applying a transformation function to their coordinates.
   *
   * @param {function} transform - A function that takes an edge's coordinates and returns transformed coordinates.
   * @returns {T[]} An array of edges with transformed coordinates.
   *
   * @example
   * ```typescript
   * const edges = Edges.create([{ id: "1", coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } } }]);
   * const projectedEdges = edges.project(({start, end}) => ({ start: { x: start.x + 1, y: start.y + 1 }, end: { x: end.x + 1, y: end.y + 1 } }));
   * console.log(projectedEdges); // [{ id: "1", coordinates: { start: { x: 1, y: 1 }, end: { x: 2, y: 2 } } }]
   * ```
   *
   * @category Operations
   */
  public project = (
    transform: (coordinates: Coordinates, edge?: T) => Coordinates = (
      coordinates
    ) => coordinates
  ): T[] =>
    this.geometric
      ? [...this].map((edge) => ({
          ...edge,
          coordinates: {
            start: transform(edge.coordinates!.start, edge),
            end: transform(edge.coordinates!.end, edge),
          },
        }))
      : [...this];

  /**
   * Converts the `Edges` collection into a JSON-compatible array.
   *
   * @returns {T[]} An array representation of the edges.
   *
   * @category Operations
   */
  public toJSON = (): T[] => [...this];

  private index = (id: UUID): number => Utilities.Index.byId<T>(this, id);

  private edge = (id: UUID): T => this.at(Utilities.Index.byId<T>(this, id))!;

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
