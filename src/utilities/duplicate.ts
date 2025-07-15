/**
 * @module Utilities
 */

export class Duplicate {
  /**
   * Finds the first duplicate item in an array.
   * - Returns the first duplicate encountered, or `undefined` if all are unique.
   *
   * @template T The input type.
   * @param {T[]} items - The array to search for duplicates.
   * @param {(item: T) => unknown} [extractor]
   *   Function to extract a unique key for each item.
   *   Defaults to returning the item itself.
   * @returns {T | undefined}
   *   The first duplicate item found, or `undefined` if no duplicates exist.
   *
   * @example
   * ```ts
   * const users = [
   *   { id: "123", name: "Alice" },
   *   { id: "456", name: "Bob" },
   *   { id: "123", name: "Charlie" } // First duplicate ID
   * ];
   *
   * console.log(Duplicate.find(users, (user) => user.id));
   * // => { id: "123", name: "Charlie" }
   *
   * console.log(Duplicate.find(users));
   * // => undefined (if no duplicates exist)
   * ```
   */
  public static find = <T>(
    items: T[],
    extractor?: (item: T) => unknown
  ): T | undefined => items.find(Duplicate.isDuplicate(extractor));

  /**
   * Creates a function that determines whether an item is a duplicate.
   * - Uses a `Set` to track seen keys.
   * - Returns `true` if the extracted key was already encountered.
   * - Otherwise, adds it to the `Set` and returns `false`.
   *
   * @template T The input type.
   * @param {(item: T) => unknown} [extractor]
   *   Function to extract a unique key for each item.
   *   Defaults to returning the item itself.
   * @returns {(item: T) => boolean}
   *   A predicate function that returns `true` for duplicates and `false` for unique items.
   */
  private static isDuplicate = <T>(
    extractor?: (item: T) => unknown
  ): ((item: T) => boolean) =>
    (
      (keys, getKey) => (item: T) =>
        keys.has(getKey(item)) || !keys.add(getKey(item))
    )(new Set<string>(), Duplicate.toKey(extractor));

  /**
   * Creates a function that extracts and converts an identifier into a string.
   * Ensures a consistent string representation for comparison.
   */
  private static toKey =
    <T>(
      extractor: (item: T) => unknown = (item) => item
    ): ((item: T) => string) =>
    (item: T) =>
      Duplicate.toString(extractor(item));

  /**
   * Converts a supported input value to a string representation.
   */
  private static toString = <T>(
    input: Exclude<T, symbol | bigint | ((...args: any[]) => any)>
  ): string =>
    typeof input === "string" ? String(input) : JSON.stringify(input);
}
