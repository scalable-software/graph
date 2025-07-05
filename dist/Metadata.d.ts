/**
 * @module Graph
 */
import type { UUID, Name } from "./graph.types.js";
/**
 * The metadata object has an `id` and `name` property.
 * - The `id` property is immutable.
 * - The `name` property is mutable but gets validated.
 */
export type IMetadata = {
    id: UUID | null;
    name: Name | null;
};
/**
 * Build-in support for custom type with extended properties.
 *
 * ```ts
 * type T = IMetadata & { custom: string };
 *
 * const metadata = Metadata
 *     .create<T>()
 *     .add({ id: "123e4567-e89b-12d3-a456-426614174000", name: "Test", custom: "value" });
 *
 * const data = metadata.toJSON();
 * console.log(data);
 *
 * // { id: "123e4567-e89b-12d3-a456-426614174000", name: "Test", custom: "value" }
 * ```
 * @template T Is by default {@link IMetadata} but extends {@link IMetadata} with custom properties (see example).
 */
export declare class Metadata<T extends IMetadata = IMetadata> {
    /**
     *
     * Factory method used to create a new metadata instance.
     *
     * @param metadata The metadata object to hydrate the instance with.
     * @returns A new metadata instance.
     *
     * @category Factory
     */
    static create: <T_1 extends IMetadata>(metadata?: T_1) => Metadata<T_1> & T_1;
    private static defaults;
    private static normalize;
    private _id;
    private _name;
    /**
     * Typescript constructors cannot return a value other than the class.
     * As a workaround to support proper types, we must use a static factory method
     */
    private constructor();
    /**
     * The `id` property is immutable:
     * `get` returns value
     * `set` throw exception
     *
     * @throws {ImmutablePropertyException} The id property is immutable.
     *
     * @example
     * ```ts
     * const metadata = Metadata.create();
     * metadata.id = "123e4567-e89b-12d3-a456-426614174000";
     * // => ImmutablePropertyException: id
     * ```
     * @category Data
     *
     */
    get id(): UUID | null;
    set id(id: UUID | null);
    /**
     * The `name` property is mutable but gets validated:
     * `get` returns value
     * `set` validates and updates value
     *
     * @example
     * ```ts
     * const metadata = Metadata.create();
     * metadata.name = "Test";
     * metadata.name;
     * // => "Test"
     * ```
     *
     * @category Data
     * */
    get name(): Name | null;
    set name(name: Name | null);
    /**
     * Determines if the metadata instance has data assigned.
     * @returns True if the id and name properties are not null.
     *
     * @example
     * ```ts
     * const metadata = Metadata.create();
     * metadata.assigned;
     * // => false
     *
     * const data = { id: "123e4567-e89b-12d3-a456-426614174000", name: "Test" };
     * const metadata = Metadata.create(data);
     * metadata.assigned;
     * // => true
     * ```
     * @category State
     */
    get assigned(): boolean;
    /**
     * export extended properties from the metadata instance.
     * @category  State
     */
    get properties(): {
        [key: string]: any;
    };
    /**
     * Adds metadata to the instance if not already assigned.
     *
     * @param metadata The metadata object to add.
     * @throws {AssignedException} A value has already been assigned to metadata.
     *
     * @example
     * ```ts
     * const metadata = Metadata.create();
     * metadata.add({ id: "123e4567-e89b-12d3-a456-426614174000", name: "Test" });
     * // { id: "123e4567-e89b-12d3-a456-426614174000", name: "Test" }
     * ```
     * @category Operations
     */
    add: (metadata: T | Omit<T, "id">) => this;
    /**
     * Updates the metadata instance with new data.
     *
     *
     * @param metadata The new metadata object to update.
     * @throws {UnassignedException} No value has been assigned to metadata.
     *
     * @example
     * ```ts
     * const metadata = Metadata.create({ id: "123e4567-e89b-12d3-a456-426614174000", name: "Test" });
     * metadata.update({ id: "123e4567-e89b-12d3-a456-426614174000", name: "Test" });
     * // { id: "123e4567-e89b-12d3-a456-426614174000", name: "Test" }
     *
     * const metadata = Metadata.create();
     * metadata.update({ id: "123e4567-e89b-12d3-a456-426614174000", name: "Test" });
     * // UnassignedException: metadata - Use metadata.add(metadata) instead.
     * ```
     * @category Operations
     */
    update: (metadata: Partial<T>) => this;
    /**
     * Removes metadata properties.
     * - If `keys` are provided, removes only those keys.
     * - If no `keys` are provided, resets all properties.
     *
     * @example
     * ```ts
     * metadata.remove(["customKey"]); // ✅ Removes only "customKey"
     * metadata.remove(); // ✅ Clears all custom properties but keeps id & name
     * ```
     * @category Operations
     */
    remove: <K extends Extract<keyof T, string>>(keys?: K[]) => this;
    /**
     * Returns required and customer property values as a JSON object.
     *
     * @example
     * ```ts
     * const metadata = Metadata.create({ id: "123e4567-e89b-12d3-a456-426614174000", name: "Test", custom: "value" });
     * metadata.toJSON()
     * // { id: "123e4567-e89b-12d3-a456-426614174000", name: "Test", custom: "value" }
     * ```
     * @category Operations
     */
    toJSON: () => T;
    /**
     * Updates the metadata instance with new data.
     * @param metadata The new metadata object to update.
     *
     * @example
     * ```ts
     * const metadata = Metadata.create();
     * metadata.update({ id: "123e4567-e89b-12d3-a456-426614174000", name: "Test" });
     * // { id: "123e4567-e89b-12d3-a456-426614174000", name: "Test" }
     * ```
     */
    private hydrate;
    private match;
    private reset;
    private validateUnassigned;
    private validateAssigned;
    private validateMatch;
}
