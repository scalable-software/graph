/**
 * @module Utilities
 */
import { Properties } from "./Properties.js";
import { Duplicate } from "./Duplicate.js";
import { Match } from "./Match.js";
import { Index } from "./Index.js";
export class Utilities {
    static Properties = Properties;
    static Duplicate = Duplicate;
    static Match = Match;
    static Index = Index;
    static normalize = (nodes) => Utilities.idifies(Utilities.toArray(nodes));
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
    static idifies = (items, generator) => Array.isArray(items)
        ? items.map((item) => Utilities.idify(item, generator))
        : Utilities.idify(items, generator);
    /**
     * Ensures that an object has an `id` property.
     * If the object already has an `id`, it remains unchanged; otherwise, a new `id` is generated.
     *
     * @param item - An object that may lack an `id` property.
     * @param generator - A function that generates unique `id` values (default: `crypto.randomUUID()`).
     * @returns The object with a unique `id`.
     *
     * @remarks
     * - The generator function should return a unique string identifier.
     * - Items that already have an `id` are left unchanged.
     *
     * @example
     * ```ts
     * const item = { name: "Item A" };
     * Utilities.idify(item);
     * // Returns: { id: "generated-id", name: "Item A" }
     * ```
     */
    static idify = (item, generator = () => crypto.randomUUID()) => "id" in item && item.id != null
        ? item
        : { id: generator(), ...item };
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
    static toString = (input) => typeof input === "string" ? String(input) : JSON.stringify(input);
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
    static toArray = (input) => Array.isArray(input) ? input : [input];
    /**
     * Transforms an array of objects into an object where each key is the value
     * of the object's `id` property, and the corresponding value is the object itself.
     *
     * @param items - An array of objects, each containing a unique `id` property.
     * @returns A record where keys are `id` values and values are the corresponding objects.
     *
     * @example
     * ```ts
     * const items = [
     *   { id: "a1", name: "Item A" },
     *   { id: "b2", name: "Item B" },
     * ];
     *
     * const result = Utilities.keyById(items);
     * // Returns: { "a1": { id: "a1", name: "Item A" }, "b2": { id: "b2", name: "Item B" } }
     * ```
     */
    static toTuple = (items) => Object.fromEntries(items.map((item) => [item.id, item]));
}
