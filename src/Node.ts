/**
 * A graph is a data structure that:
 * - has {@link Node}
 * - contains contains nodes and edges.
 *
 * Extension with new properties is supported.
 * @module Graph
 */

import type { UUID, Coordinates, Offset } from "./Graph.types.js";

export type INode = {
  id: UUID;
  coordinates: Coordinates;
};

/**
 * The `Node` class provides utility methods for working with nodes.
 */
export class Node {
  /**
   * Creates a new node with a unique `id` while preserving other details.
   *
   * @param details - The node details, excluding the `id` property.
   * @returns A new node with all provided details and a generated `id`.
   *
   * @remarks
   * - The `id` is generated using `crypto.randomUUID()` and cast as `UUID`.
   * - This method ensures that every created node has a unique identifier.
   *
   * @example
   * ```ts
   * const node = Node.create({ coordinates: { x: 0, y:0 } });
   * // Returns: { id: "generated-uuid", coordinates: { x: 0, y:0 } }
   * ```
   * @category Utilities
   */
  public static create = <T extends INode>(details: Omit<T, "id">): T =>
    ({
      id: crypto.randomUUID() as UUID,
      ...details,
    } as T);

  /**
   * Creates a clone of a given node with a new unique `id`.
   *
   * @param node - The node to clone.
   * @returns A new node with the same properties as the original, but with a newly generated `id`.
   *
   * @remarks
   * - The `id` is regenerated using `crypto.randomUUID()` and cast as `UUID`.
   * - This method is useful when duplicating nodes while ensuring uniqueness.
   *
   * @example
   * ```ts
   * const originalNode = { id: "a1", coordinates: { x: 0, y:0 } };
   * const clonedNode = Node.clone(originalNode);
   *
   * console.log(clonedNode);
   * // Returns: { id: "new-generated-uuid", coordinates: { x: 0, y:0 } }
   * ```
   * @category Utilities
   */
  public static clone = <T extends INode>(node: T): T => ({
    ...node,
    id: crypto.randomUUID() as UUID,
  });

  /**
   * Updates a given node with new properties while preserving its `id`.
   *
   * @param node - The original node to update.
   * @param patch - A partial update object containing the properties to modify.
   * @returns A new node with the updated properties while keeping the original `id`.
   *
   * @remarks
   * - The `id` is always preserved from the original node, even if included in `patch`.
   * - This method performs a shallow merge of the `patch` properties into the `node`.
   *
   * @example
   * ```ts
   * const node = { id: "a1", coordinates: { x: 0, y: 0 } };
   * const updatedNode = Node.update(node, { coordinates: { x: 1, y: 1 } });
   *
   * console.log(updatedNode);
   * // Returns: { id: "a1", coordinates: { x: 1, y: 1 } }
   * ```
   * @category Utilities
   */
  public static update = <T extends INode>(node: T, patch: Partial<T>): T => ({
    ...node,
    ...patch,
    id: node.id,
  });

  /**
   * Moves a node to a new set of coordinates while preserving its other properties.
   *
   * @param node - The node to move.
   * @param coordinates - The new coordinates to assign to the node.
   * @returns A new node with updated `coordinates` while keeping all other properties unchanged.
   *
   * @remarks
   * - This method replaces the `coordinates` property with the new value.
   * - All other properties, including `id`, remain unchanged.
   *
   * @example
   * ```ts
   * const node = { id: "a1", coordinates: { x: 0, y: 0 } };
   * const movedNode = Node.move(node, { x: 5, y: 5 });
   *
   * console.log(movedNode);
   * // Returns: { id: "a1", coordinates: { x: 5, y: 5 } }
   * ```
   * @category Utilities
   */
  public static move = <T extends INode>(
    node: T,
    coordinates: Coordinates
  ): T => ({
    ...node,
    coordinates,
  });

  /**
   * Translates a node by applying an offset to its `coordinates`.
   *
   * @param node - The node to translate.
   * @param offset - The amount to move the node along the x and y axes.
   * @returns A new node with updated `coordinates` reflecting the translation.
   *
   * @remarks
   * - The `coordinates` are modified by adding `offset.x` and `offset.y` to the existing values.
   * - All other properties, including `id`, remain unchanged.
   *
   * @example
   * ```ts
   * const node = { id: "a1", coordinates: { x: 0, y: 0 } };
   * const translatedNode = Node.translate(node, { x: 3, y: -2 });
   *
   * console.log(translatedNode);
   * // Returns: { id: "a1", coordinates: { x: 3, y: -2 } }
   * ```
   * @category Utilities
   */
  public static translate = <T extends INode>(node: T, offset: Offset): T => ({
    ...node,
    coordinates: {
      x: node.coordinates.x + offset.x,
      y: node.coordinates.y + offset.y,
    },
  });
}
