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
    static find = (sets, extractor) => sets[1].find(Match.isMatch(sets[0], extractor));
    static isMatch = (items, extractor) => (item) => new Set(items.map(Match.toKey(extractor))).has(Match.toKey(extractor)(item));
    static toKey = (extractor = (item) => item) => (item) => Match.toString(extractor(item));
    /**
     * Converts a supported input value to a string representation.
     */
    static toString = (input) => typeof input === "string" ? String(input) : JSON.stringify(input);
}
