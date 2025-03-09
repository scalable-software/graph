export class Index {
  public static find = () => {};

  /**
   * Finds the index of a specific item in a collection by reference comparison.
   *
   * @param items - An array of items to search through.
   * @param item - The item to find in the collection.
   * @returns The index of the item in the array, or `-1` if not found.
   *
   * @remarks
   * This method uses `indexOf`, which checks for strict reference equality (`===`).
   * It does not perform deep equality comparisons.
   *
   * @example
   * ```ts
   * const obj1 = { id: "a1" };
   * const obj2 = { id: "b2" };
   * const items = [obj1, obj2];
   *
   * Index.byReference(items, obj1); // Returns 0
   * Index.byReference(items, { id: "a1" }); // Returns -1 (different reference)
   * ```
   */
  public static byReference = <T>(items: T[], item: T): number =>
    items.indexOf(item);

  /**
   * Finds the index of an item in a collection by matching its `id` property.
   *
   * @param items - An array of objects, each containing an `id` property.
   * @param id - The `id` value to search for.
   * @returns The index of the matching item in the array, or `-1` if not found.
   *
   * @example
   * ```ts
   * const items = [
   *   { id: "a1", name: "Item A" },
   *   { id: "b2", name: "Item B" },
   * ];
   *
   * Index.byId(items, "b2"); // Returns 1
   * Index.byId(items, "c3"); // Returns -1 (not found)
   * ```
   */
  public static byId = <T extends { id: string }>(
    items: T[],
    id: string
  ): number => items.findIndex((item) => item.id === id);
}
