export class Index {
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

  public static byId = () => {};
}
