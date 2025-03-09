/**
 * @module Utilities
 */

import { Properties } from "./Properties.js";
import { Duplicate } from "./Duplicate.js";
import { Match } from "./Match.js";
import { Index } from "./Index.js";

export class Utilities {
  public static Properties = Properties;
  public static Duplicate = Duplicate;
  public static Match = Match;
  public static Index = Index;

  /**
   * Ensures that every item in a collection has an `id` property.
   * If an item already has an `id`, it remains unchanged; otherwise, a new `id` is generated.
   *
   * @param items - An array of objects, some of which may lack an `id` property.
   * @param generator - A function that generates unique `id` values (default: `crypto.randomUUID()`).
   * @returns A new array where each object has a unique `id`.
   *
   * @remarks
   * - The generator function should return a unique string identifier.
   * - Items that already have an `id` are left unchanged.
   *
   * @example
   * ```ts
   * const items = [{ name: "Item A" }, { id: "b2", name: "Item B" }];
   *
   * Utilities.idify(items);
   * // Returns: [{ id: "generated-id", name: "Item A" }, { id: "b2", name: "Item B" }]
   * ```
   */
  public static idify = <T>(
    items: Omit<T, "id">[] | T[],
    generator: () => string = () => crypto.randomUUID()
  ): T[] =>
    items.map((item) =>
      "id" in item ? (item as T) : ({ id: generator(), ...item } as T)
    );

  /**
   * Converts a supported input value to a string representation.
   * - If the input is a string, it remains unchanged.
   * - If the input is an object, array, `null`, or `undefined`, it is serialized into a JSON-formatted string using `JSON.stringify()`.
   * - If the input is a number or boolean, it is converted using `String()`.
   * - Unsupported types (`Symbol`, `BigInt`, and functions) are excluded at compile time to prevent errors.
   *
   * @template T The input type.
   * @param {Exclude<T, symbol | bigint | ((...args: any[]) => any)>} input
   *   The value to convert. Must not be a `Symbol`, `BigInt`, or function.
   * @returns {string} The stringified version of the input.
   *
   * @example
   * ```ts
   * Utilities.toString("Hello, world!");
   * // => "Hello, world!"
   *
   * Utilities.toString(42);
   * // => "42"
   *
   * Utilities.toString(true);
   * // => "true"
   *
   * Utilities.toString({ key: "value" });
   * // => '{"key":"value"}'
   *
   * Utilities.toString([1, 2, 3]);
   * // => '[1,2,3]'
   * ```
   */
  public static toString = <T>(
    input: Exclude<T, symbol | bigint | ((...args: any[]) => any)>
  ): string =>
    typeof input === "string" ? String(input) : JSON.stringify(input);

  /**
   * Converts a single value or an array of values to an array.
   * - If the input is an array, it remains unchanged.
   * - If the input is not an array, it is wrapped in an array.
   *
   * @template T The input type.
   * @param {T | T[]} input The value to convert.
   * @returns {T[]} The array containing the input value(s).
   *
   * @example
   * ```ts
   * Utilities.toArray("Hello, world!");
   * // => ["Hello, world!"]
   *
   * Utilities.toArray([1, 2, 3]);
   * // => [1, 2, 3]
   * ```
   */
  public static toArray = <T>(input: T | T[]): T[] =>
    Array.isArray(input) ? input : [input];
}
