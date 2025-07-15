/**
 * @module Utilities
 */

export class Match {
  /**
   * Finds the first item in candidateItems that matches an item in sourceItems.
   * - Returns the first match encountered, or `undefined` if none are found.
   *
   * @template T The input type.
   * @param {[T[], T[]]} sets - tuple of source and candidate items.
   * @param {(item: T) => unknown} [extractor]
   *   Function to extract a unique key for each item.
   *  Defaults to returning the item itself.
   * @returns {T | undefined}
   *   The first matching item found, or `undefined` if no matches exist.
   *
   * @example
   * ```ts
   * const sourceItems = [
   *   { id: "1", name: "Alpha" },
   *   { id: "2", name: "Beta" },
   *   { id: "3", name: "Gamma" },
   * ];
   *
   * const candidateItems = [
   *   { id: "3", name: "Gamma" },
   *   { id: "4", name: "Delta" },
   * ];
   *
   * console.log(Match.find(sourceItems, candidateItems));
   * // => { id: "3", name: "Gamma" }
   * ```
   */
  public static find = <T>(
    sets: [T[], T[]],
    extractor?: (item: T) => unknown
  ): T | undefined => sets[1].find(Match.isMatch(sets[0], extractor));

  private static isMatch =
    <T>(items: T[], extractor?: (item: T) => unknown): ((item: T) => boolean) =>
    (item: T) =>
      new Set(items.map(Match.toKey(extractor))).has(
        Match.toKey(extractor)(item)
      );

  private static toKey =
    <T>(
      extractor: (item: T) => unknown = (item) => item
    ): ((item: T) => string) =>
    (item: T) =>
      Match.toString(extractor(item));

  /**
   * Converts a supported input value to a string representation.
   */
  private static toString = <T>(
    input: Exclude<T, symbol | bigint | ((...args: any[]) => any)>
  ): string =>
    typeof input === "string" ? String(input) : JSON.stringify(input);
}
