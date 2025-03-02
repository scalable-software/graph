import type { UUID, Name, Coordinates } from "./Graph.types.js";

export type INode = {
  id: UUID;
  coordinates: Coordinates;
};

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
}
