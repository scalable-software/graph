/**
 * @module Validation
 */

import { Exceptions } from "../exceptions/exceptions.js";
import { Utilities } from "../utilities/utilities.js";
import { Validator } from "./validator.js";
import type { IGraph } from "../graph.js";
import type { IMetadata } from "../metadata.js";
import type { INode } from "../node.js";
import type { IEdge, PartialEdge } from "../edge.js";
import type {
  UUID,
  Name,
  Coordinates,
  Offset,
} from "../graph.types.js";

export class Validate {
  public static graph = <T extends IGraph>(
    graph?: Partial<T>
  ): Partial<T> => {
    graph && Validate.metadata<T["metadata"]>(graph.metadata);
    return graph;
  };

  public static graphDetails = <T extends Partial<IGraph>>(
    details: Partial<T>
  ): Partial<T> => {
    details.metadata?.id && Validate.uuid(details.metadata.id);
    details.metadata && Validate.name(details.metadata.name);
    return details;
  };

  /**
   * Validate the metadata, if provided, to ensure required properties are present and valid.
   *
   * @param metadata The optional metadata object to validate.
   * @returns The validated metadata object or null if invalid.
   *
   * @example
   * ```ts
   * Validate.metadata(null);
   * // => null
   *
   * Validate.metadata({ id: "123e4567-e89b-12d3-a456-426614174000", name: "Test" });
   * // { id: "123e4567-e89b-12d3-a456-426614174000", name: "Test" }
   *
   * Validate.metadata({ id: "123", name: "" });
   * // => ValidationException: Validation failed with 2 error(s).
   * ```
   * @category Validation
   */
  public static metadata = <T extends IMetadata>(metadata: T): T =>
    Validator.validate<T>(metadata, [
      ({ id }) => Validate.uuid(id),
      ({ name }) => Validate.name(name),
    ]);

  /**
   * Validate an array of nodes to ensure each nodes have valid `id` and `coordinates`.
   * Also ensures that all nodes have unique `id` and `coordinates`.
   *
   * @param nodes - The nodes to validate.
   * @returns The validated nodes if successful, otherwise throws an exception.
   *
   * @example
   * ```ts
   * const nodes = [{ id: "a1", coordinates: { x: 0, y: 0 } }];
   * Validate.nodes(nodes);
   * // => [{ id: "a1", coordinates: { x: 0, y: 0 } }]
   *
   * Validate.nodes([{ id: "a1", coordinates: { x: 0 } }]);
   * // throws ValidationException: Validation failed with 2 error(s).
   * ```
   */
  public static nodes = <T extends INode>(nodes: T[]): T[] =>
    nodes.some((node) => node.coordinates != null)
      ? Validator.validate<T[]>(nodes, [
          (nodes) => nodes.map(Validate.node),
          (nodes) => Validate.unique(nodes, (node) => node.id),
          (nodes) =>
            Validate.unique(
              nodes.filter((node) => node.coordinates != null),
              (node) => node.coordinates
            ),
        ])
      : Validator.validate<T[]>(nodes, [
          (nodes) => nodes.map(Validate.node),
          (nodes) => Validate.unique(nodes, (node) => node.id),
        ]);

  public static edges = <T extends IEdge>(edges: T[]): T[] =>
    Validator.validate<T[]>(edges, [
      (edges) => edges.map(Validate.edge),
      (nodes) => Validate.unique(nodes, (node) => node.id),
    ]);

  /**
   * Validates a node to ensure it has a valid `id` and `coordinates`.
   *
   * @param node - The node to validate.
   * @returns The validated node if successful, otherwise throws an exception.
   *
   * @example
   * ```ts
   * const node = { id: "a1", coordinates: { x: 0, y: 0 } };
   * Validate.node(node);
   * // => { id: "a1", coordinates: { x: 0, y: 0 } }
   *
   * Validate.node({ id: "a1", coordinates: { x: 0 } });
   * // throws ValidationException: Validation failed with 2 error(s).
   * ```
   * @category Validation
   */
  public static node = <T extends INode>(node?: T): T | void =>
    !node
      ? null
      : "coordinates" in node && node.coordinates != null
      ? (Validator.validate<T>(node, [
          ({ id }) => Validate.uuid(id),
          ({ coordinates }) => Validate.coordinates(coordinates),
        ]) as T)
      : (Validator.validate<T>(node, [
          ({ id }) => Validate.uuid(id),
        ]) as T);

  public static edge = <T extends IEdge>(edge?: T) =>
    !edge
      ? null
      : "coordinates" in edge && edge.coordinates != null
      ? (Validator.validate<T>(edge, [
          ({ id }) => Validate.uuid(id),
          ({ source }) => Validate.uuid(source),
          ({ target }) => Validate.uuid(target),
          ({ coordinates }) =>
            Validate.coordinates(coordinates.start),
          ({ coordinates }) => Validate.coordinates(coordinates.end),
        ]) as T)
      : (Validator.validate<T>(edge, [
          ({ id }) => Validate.uuid(id),
          ({ source }) => Validate.uuid(source),
          ({ target }) => Validate.uuid(target),
        ]) as T);

  public static nodeDetails = <
    T extends { coordinates: Coordinates }
  >(
    details: Partial<T>
  ): Partial<T> => {
    details.coordinates && Validate.coordinates(details.coordinates);
    return details;
  };

  /**
   * Validate an edge to ensure it has valid `source`, `target`, and `coordinates` if provided.
   *
   * @param edge - The edge to validate.
   * @returns The validated edge if successful, otherwise throws an exception.
   *
   * @example
   * ```ts
   * const edge = {
   *   source: "a1",
   *   target: "b2",
   *   coordinates: { start: { x: test, y: 0 }, end: { x: 1, y: 1 } }
   * };
   *
   * Validate.edgeDetails(edge);
   * // Throw InvalidArgumentExceptions
   * ```
   */
  public static edgeDetails = <
    T extends {
      source: UUID;
      target: UUID;
      coordinates: { start: Coordinates; end: Coordinates };
    }
  >(
    details: PartialEdge<T>
  ): PartialEdge<T> => {
    details.source && Validate.uuid(details.source);
    details.target && Validate.uuid(details.target);

    details.coordinates &&
      details.coordinates.start &&
      Validate.coordinates(details.coordinates.start);

    details.coordinates &&
      details.coordinates.end &&
      Validate.coordinates(details.coordinates.end);
    return details;
  };

  /**
   * Validate id and throw if not valid UUID
   *
   * @param id - The UUID to validate
   * @returns The UUID if valid
   * @throws {InvalidArgumentException} If the UUID is invalid or null
   *
   * @example
   * ```ts
   * Validate.uuid("123e4567-e89b-12d3-a456-426614174000");
   * // => "123e4567-e89b-12d3-a456-426614174000"
   *
   * Validate.uuid("invalid");
   * // => InvalidArgumentException: Invalid argument: id - must be a valid UUID
   *
   * Validate.uuid(null);
   * // => InvalidArgumentException: Invalid argument: id - must be a valid UUID
   * ```
   */
  public static uuid = (id: string | null): UUID =>
    !id ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      id
    )
      ? Exceptions.invalidArgumentException(
          "id",
          "must be a valid UUID"
        )
      : (id as UUID);

  /**
   * Validate name and throw if not valid
   *
   * @param name - The name to validate
   * @returns The name if valid
   * @throws {InvalidArgumentException} If the name is invalid or null
   *
   * @example
   * ```ts
   * Validate.name("John Doe");
   * // => "John Doe"
   *
   * Validate.name("J");
   * // => InvalidArgumentException: Invalid argument: name - must be a valid name
   *
   * Validate.name(null);
   * // => InvalidArgumentException: Invalid argument: name - must be a valid name
   * ```
   *
   */
  public static name = (name: string | null): Name =>
    !name || name.length < 3 || name.length > 100
      ? Exceptions.invalidArgumentException(
          "name",
          "must be a valid name"
        )
      : (name as Name);

  /**
   * Validate offset and throw if not valid
   * @param offset - The offset to validate
   * @returns The offset if valid
   * @throws {InvalidArgumentException} If the offset are invalid or null
   * @example
   * ```ts
   * Validate.offset({ x: 0, y: 0 });
   * // => { x: 0, y: 0 }
   * Validate.offset({ x: 0 });
   * // => InvalidArgumentException: Invalid argument: offset - must be valid offset
   * Validate.offset(null);
   * // => InvalidArgumentException: Invalid argument: offset - must be valid offset
   * ```
   */
  public static offset = (offset: Offset | null): Offset =>
    !offset ||
    !("x" in offset) ||
    !("y" in offset) ||
    typeof offset.x !== "number" ||
    typeof offset.y !== "number"
      ? Exceptions.invalidArgumentException(
          "offset",
          "must be valid offset"
        )
      : (offset as Offset);

  /**
   * Validate coordinates and throw if not valid
   * @param coordinates - The coordinates to validate
   * @returns The coordinates if valid
   * @throws {InvalidArgumentException} If the coordinates are invalid or null
   * @example
   * ```ts
   * Validate.coordinates({ x: 0, y: 0 });
   * // => { x: 0, y: 0 }
   * Validate.coordinates({ x: 0 });
   * // => InvalidArgumentException: Invalid argument: coordinates - must be valid coordinates
   * Validate.coordinates(null);
   * // => InvalidArgumentException: Invalid argument: coordinates - must be valid coordinates
   * ```
   *
   */
  public static coordinates = (
    coordinates: Coordinates | null
  ): Coordinates =>
    !coordinates ||
    !("x" in coordinates) ||
    !("y" in coordinates) ||
    typeof coordinates.x !== "number" ||
    typeof coordinates.y !== "number"
      ? Exceptions.invalidArgumentException(
          "coordinates",
          "must be valid coordinates"
        )
      : (coordinates as Coordinates);

  /**
   * Validate keys and throw if key is immutable
   *
   * @param items - The keys to validate
   * @param value - The immutable key to check
   * @returns True if the key is immutable
   * @throws {ImmutablePropertyException} If the key is immutable
   *
   * @example
   * ```ts
   * Validate.includes(["id", "name"], "id");
   * // => ImmutablePropertyException: "Property 'id' is immutable."
   *
   * Validate.includes(["id", "name"], "type");
   * // => false
   * ```
   *
   */
  public static immutable = <T>(items: T[], value: T): unknown =>
    !items.includes(value) ||
    Exceptions.immutablePropertyException(String(value));

  public static many = <T>(item: T | T[], validator: (T) => T) =>
    Array.isArray(item)
      ? item.map((item) => validator(item))
      : validator(item);

  /**
   * Validate a single of multiple ids to ensure they are valid UUIDs.
   *
   * @param ids - The id or ids to validate
   * @returns The id or ids if valid
   * @throws {InvalidArgumentException} If the id or ids are invalid or null
   *
   * @example
   * ```ts
   * Validate.id("123e4567-e89b-12d3-a456-426614174000");
   * // => "123e4567-e89b-12d3-a456-426614174000"
   *
   * Validate.id(["123e4567-e89b-12d3-a456-426614174000", "invalid"]);
   * // => InvalidArgumentException: Invalid argument: id - must be a valid UUID
   * ```
   */
  public static id = <T extends { id: UUID }>(
    nodes: T[],
    ids: UUID | UUID[]
  ): UUID | UUID[] => {
    Validate.many(ids, (id) => Validate.uuid(id));
    Validate.many(ids, (id) => Validate.exist(nodes, id));
    return ids;
  };

  /**
   * Returns index of item with id in items if found
   * throw NotFoundException if no item in items has matching id
   *
   * @param items - The items to search
   * @param id - The id to find
   * @returns The index of the id if found
   * @throws {NotFoundException} If the id is not found
   *
   * @example
   * ```ts
   * const items = [{ id: "a" }, { id: "b" }, { id: "c" }];
   * Validate.exist(items, "b");
   * // => 1
   *
   * Validate.exist(items, "d");
   * // => NotFoundException: id not found: "d"
   * ```
   *
   */
  public static exist = <T extends { id: UUID }>(
    items: T[],
    id: UUID
  ): UUID => {
    try {
      Validate.index(Utilities.Index.byId<T>(items, id));
    } catch (error) {
      Exceptions.notFoundException("id", id);
    }
    return id;
  };

  public static index = (index: number): number =>
    index !== -1 ? index : Exceptions.invalidIndexException();

  public static notNull = <T>(value: T): T =>
    value === undefined || value === null
      ? Exceptions.invalidArgumentException(
          "",
          "operation requires argument"
        )
      : value;

  public static flag = (flag: boolean): boolean =>
    typeof flag !== "boolean"
      ? Exceptions.invalidArgumentException(
          "flag",
          "must be a boolean"
        )
      : flag;

  /**
   * Validate an array of items to ensure they are unique.
   *
   * @param items - The items to validate
   * @param identifier - The unique identifier to check
   * @returns The items if unique
   * @throws {DuplicateException} If the items are not unique
   *
   * @example
   * ```ts
   * Validate.unique(["a", "b", "a"]);
   * // => DuplicateException: Duplicate item found: "a"
   *
   * Validate.unique(["a", "b", "c"]);
   * // => ["a", "b", "c"]
   *
   * Validate.unique([{ id: "a" }, { id: "b" }, { id: "a" }], (item) => item.id);
   * // => DuplicateException: Duplicate item found: "a"
   * ```
   */
  public static unique = (items, identifier?) =>
    ((duplicate) =>
      duplicate
        ? Exceptions.duplicateException(Utilities.toString(duplicate))
        : items)(Utilities.Duplicate.find(items, identifier));

  /**
   * Validate an sets of existing and new entities to ensure the new entities are distinct.
   *
   * @param sets - The sets existing and new entities to validate
   * @param identifier - The unique identifier to check
   * @returns The new entities if distinct
   * @throws {DuplicateException} If the sets are not distinct
   *
   * @example
   * ```ts
   * const sets = [[1, 2, 3], [3, 4, 5]];
   * Validate.distinct(sets);
   * // => DuplicateException: Duplicate item found: "3"
   *
   * const sets = [[{ id: "a" }, { id: "b" }], [{ id: "c" }, { id: "d" }]];
   * Validate.distinct(sets, (item) => item.id);
   * // => [{ id: "c" }, { id: "d" }]
   * ```
   */
  public static distinct = (sets, identifier?) =>
    ((match) =>
      match
        ? Exceptions.duplicateException(Utilities.toString(match))
        : sets[1])(Utilities.Match.find(sets, identifier));
}
