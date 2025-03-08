/**
 * @module Utilities
 */

import { Properties } from "./Properties.js";
import { Duplicate } from "./Duplicate.js";

export class Utilities {
  public static Properties = Properties;
  public static Duplicate = Duplicate;

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

  public static toArray = () => {};
}
