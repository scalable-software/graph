/**
 * @module Graph
 */

import type { UUID, Coordinates, Offset } from "./graph.types";

export type IEdge = {
  id: UUID;
  source: UUID;
  target: UUID;
  coordinates: {
    start: Coordinates;
    end: Coordinates;
  };
};

export type PartialEdge<T> = Partial<Omit<T, "coordinates">> & {
  coordinates?: {
    start?: Coordinates;
    end?: Coordinates;
  };
};

/**
 * The `Edge` class provides utility methods for working with edges.
 */
export class Edge {
  /**
   * Creates a new edge with a unique `id` while preserving other details.
   *
   * @param details - The edge details, excluding the `id` property.
   * @returns A new edge with all provided details and a generated `id`.
   *
   * @remarks
   * - The `id` is generated using `crypto.randomUUID()` and cast as `UUID`.
   * - This method ensures that every created edge has a unique identifier.
   *
   * @example
   * ```ts
   * const details = {
   *   source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
   *   target: "43c6679a-fd9d-4036-b1ab-af0b932fc814",
   *   coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
   * }
   *
   * const edge = Edge.create(details);
   * // Returns: { id: "generated-uuid", ...details }
   * ```
   * @category Utilities
   */
  public static create = <T extends IEdge>(
    details: Omit<T, "id">
  ): T =>
    ({
      id: crypto.randomUUID() as UUID,
      ...details,
    } as T);

  /**
   * Creates a clone of a given edge with a new unique `id`.
   *
   * @param edge - The edge to clone.
   * @returns A new edge with the same properties as the original, but with a newly generated `id`.
   *
   * @remarks
   * - The `id` is regenerated using `crypto.randomUUID()` and cast as `UUID`.
   * - This method is useful when duplicating edges while ensuring uniqueness.
   *
   * @example
   * ```ts
   * const originalEdge = {
   *     id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
   *     source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
   *     target: "43c6679a-fd9d-4036-b1ab-af0b932fc814",
   *     coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
   * }
   *
   * const clonedEdge = Edge.clone(originalEdge);
   *
   * console.log(clonedEdge);
   * // Returns: { id: "new-generated-uuid", ...originalEdge }
   * ```
   * @category Utilities
   */
  public static clone = <T extends IEdge>(edge: T): T =>
    ({
      ...edge,
      id: crypto.randomUUID() as UUID,
    } as T);

  /**
   * Updates a given edge with new properties while preserving its `id`.
   *
   * @param edge - The original edge to update.
   * @param patch - A partial update object containing the properties to modify.
   * @returns A new edge with the updated properties while keeping the original `id`.
   *
   * @remarks
   * - The `id` is always preserved from the original edge, even if included in `patch`.
   * - This method performs a shallow merge of the `patch` properties into the `edge`.
   *
   * @example
   * ```ts
   * const edge = {
   *    id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
   *    source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
   *    target: "43c6679a-fd9d-4036-b1ab-af0b932fc814",
   *    coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
   * };
   *
   * const updatedEdge = Edge.update(edge, { coordinates: { start: { x: 1, y: 1 }, end: { x: 2, y: 2} } });
   * console.log(updatedEdge);
   * // Returns: { ...edge, coordinates: { start: { x: 1, y: 1 }, end: { x: 4, y: 4 } }, id: edge.id }
   * ```
   * @category Utilities
   */
  public static update = <T extends IEdge>(
    edge: T,
    patch: PartialEdge<T>
  ): T => ({
    ...edge,
    ...patch,
    id: edge.id,
  });

  /**
   * Moves a edge's start, end or both to a new set of coordinates while preserving its other properties.
   *
   * @param edge - The edge to move.
   * @param coordinates - The new start, end or both set of coordinates to assign to the edge.
   * @returns A new edge with updated `coordinates` while keeping all other properties unchanged.
   *
   * @remarks
   * - This method replaces the `coordinates` property with the new value.
   * - All other properties, including `id`, remain unchanged.
   *
   * @example
   * ```ts
   * const edge = {
   *   id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
   *   source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
   *   target: "43c6679a-fd9d-4036-b1ab-af0b932fc814",
   *   coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
   * };
   *
   * const movedEdge = Edge.move(edge, { start: { x: 5, y: 5 }, end: { x: 6, y: 6 } });
   *
   * console.log(movedEdge);
   * // Returns: { id: "15b6679a-fd9d-4036-b1ab-af0b932fc903", source: "15b6679a-fd9d-4036-b1ab-af0b932fc903", target: "43c6679a-fd9d-4036-b1ab-af0b932fc814", coordinates: { start: { x: 5, y: 5 }, end: { x: 6, y: 6 } } }
   * ```
   *
   * @category Utilities
   */
  public static move = <T extends IEdge>(
    edge: T,
    coordinates: Partial<{ start: Coordinates; end: Coordinates }>
  ): T => ({
    ...edge,
    coordinates: {
      start: coordinates.start ?? edge.coordinates.start,
      end: coordinates.end ?? edge.coordinates.end,
    },
  });

  /**
   * Translates a edge by applying an offset to its `coordinates`.
   *
   * @param edge - The edge to translate.
   * @param offset - The amount to move the edge along the x and y axes.
   * @returns A new edge with updated `coordinates` reflecting the translation.
   *
   * @remarks
   * - The `coordinates` are modified by adding `offset.x` and `offset.y` to the existing values.
   * - All other properties, including `id`, remain unchanged.
   *
   * @example
   * ```ts
   * const edge = {
   *  id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
   * source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
   * target: "43c6679a-fd9d-4036-b1ab-af0b932fc814",
   * coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
   * };
   *
   * const movedEdge = Edge.translate(edge, { x: 5, y: 5 });
   *
   * console.log(movedEdge);
   * // Returns: { id: "15b6679a-fd9d-4036-b1ab-af0b932fc903", source: "15b6679a-fd9d-4036-b1ab-af0b932fc903", target: "43c6679a-fd9d-4036-b1ab-af0b932fc814", coordinates: { start: { x: 5, y: 5 }, end: { x: 6, y: 6 } } }
   * ```
   * @category Utilities
   */
  public static translate = <T extends IEdge>(
    edge: T,
    offset: Offset
  ): T => ({
    ...edge,
    coordinates: {
      start: {
        x: edge.coordinates.start.x + offset.x,
        y: edge.coordinates.start.y + offset.y,
      },
      end: {
        x: edge.coordinates.end.x + offset.x,
        y: edge.coordinates.end.y + offset.y,
      },
    },
  });
}
