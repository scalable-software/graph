/**
 * @module Metadata
 */
import type { UUID, Name } from "./Graph.types.js";
export type IMetadata = {
  id: UUID | null;
  name: Name | null;
};
export declare class Metadata<T extends IMetadata = IMetadata> {
  private static normalize;
  private static ensureId;
  private static defaults;
  /**
   * Validates the metadata object, if provided, to ensure required fields are present and valid.
   *
   * @param metadata The optional metadata object to validate.
   * @returns The validated metadata object or null if invalid.
   *
   * @example
   * ```ts
   * Metadata.validate(null);
   * // => null
   *
   * Metadata.validate({ id: "123e4567-e89b-12d3-a456-426614174000", name: "Test" });
   * // { id: "123e4567-e89b-12d3-a456-426614174000", name: "Test" }
   *
   * Metadata.validate({ id: "123", name: "" });
   * // => ValidationException: Validation failed with 2 error(s).
   * ```
   */
  static validate: <T_1 extends IMetadata>(metadata?: T_1) => T_1;
  /**
   * Creates a new metadata instance with appropriate return type.
   * This is necessary to ensure the correct type is returned when using the class directly.
   *
   * @param metadata The optional metadata object to create.
   * @returns The new metadata instance.
   *
   * @example
   * ```ts
   * const metadata = Metadata.create({ id: "123e4567-e89b-12d3-a456-426614174000", name: "Test" });
   * // { id: "123e4567-e89b-12d3-a456-426614174000", name: "Test" }
   *
   * const metadata = Metadata.create();
   * // { id: null, name: null }
   *
   * const metadata = Metadata.create({ id: "123e4567-e89b-12d3-a456-426614174000", name: "Test", type: "custom" });
   * // { id: "123e4567-e89b-12d3-a456-426614174000", name: "Test", type: "custom" }
   * ```
   */
  static create: <T_1 extends IMetadata>(metadata?: T_1) => Metadata<T_1> & T_1;
  _id: UUID | null;
  _name: Name | null;
  /**
   * Typescript constructors cannot return a value other than the class.
   * As a workaround to support proper types, we must use a static factory method
   */
  private constructor();
  /**
   * The `id` property is immutable:
   * `get` returns value
   * `set` throw exception
   * @throws {ImmutablePropertyException} The id property is immutable.
   *
   * @example
   * ```ts
   * const metadata = Metadata.create();
   * metadata.id = "123e4567-e89b-12d3-a456-426614174000";
   * // => ImmutablePropertyException: id
   * ```
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
   */
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
   */
  get assigned(): boolean;
  /**
   * export required and custom properties from the metadata instance.
   */
  get customProperties(): {
    [key: string]: any;
  };
  /**
   * Adds metadata to the instance if not already assigned.
   * @param metadata The metadata object to add.
   * @throws {AssignedException} A value has already been assigned to metadata.
   *
   * @example
   * ```ts
   * const metadata = Metadata.create();
   * metadata.add({ id: "123e4567-e89b-12d3-a456-426614174000", name: "Test" });
   * // { id: "123e4567-e89b-12d3-a456-426614174000", name: "Test" }
   * ```
   */
  add: (metadata: T) => this;
  /**
   * Updates the metadata instance with new data.
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
}
