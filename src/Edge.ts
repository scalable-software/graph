/**
 * A graph is a data structure that:
 * - has {@link Edge}
 * - contains contains nodes and edges.
 *
 * Extension with new properties is supported.
 * @module Graph
 */

import type { UUID, Coordinates } from "./Graph.types";

export type IEdge = {
  id: UUID;
  source: UUID;
  target: UUID;
  coordinates: {
    start: Coordinates;
    end: Coordinates;
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
  public static create = <T extends IEdge>(details: Omit<T, "id">): T =>
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
  public static update = <T extends IEdge>(edge: T, patch: Partial<T>): T => ({
    ...edge,
    ...patch,
    id: edge.id,
  });

  public static move = () => {};
}
