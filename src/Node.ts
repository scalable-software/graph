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
}
