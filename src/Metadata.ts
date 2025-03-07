/**
 * A graph is a data structure that:
 * - has {@link Metadata}
 * - contains contains nodes and edges.
 *
 *
 * Extension with new properties is supported.
 * @module Graph
 */

import { Validate } from "./validations/Validate.js";
import { Validator } from "./validations/Validator.js";
import { Exceptions } from "./exceptions/Exceptions.js";
import { Utilities } from "./utilities/Utilities.js";
import type { UUID, Name } from "./Graph.types.js";

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
 * type CustomMetadata = IMetadata & { custom: string };
 * const metadata = Metadata.create<CustomMetadata>();
 *
 * metadata.add({ id: "123e4567-e89b-12d3-a456-426614174000", name: "Test", custom: "value" });
 *
 * metadata.toJSON();
 * // { id: "123e4567-e89b-12d3-a456-426614174000", name: "Test", custom: "value" }
 * ```
 * @template T Is by default {@link IMetadata} but extends {@link IMetadata} with custom properties (see example).
 */
export class Metadata<T extends IMetadata = IMetadata> {
  /**
   * Validate the metadata, if provided, to ensure required properties are present and valid.
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
   * @category Validation
   */
  public static validate = <T extends IMetadata>(metadata: T): T =>
    Validator.validate<T>(metadata, [
      ({ id }) => Validate.uuid(id),
      ({ name }) => Validate.name(name),
    ]);

  /**
   *
   * Factory method used to create a new metadata instance.
   *
   * @param metadata The metadata object to hydrate the instance with.
   * @returns A new metadata instance.
   *
   * @category Factory
   */
  public static create = <T extends IMetadata>(metadata?: T): Metadata<T> & T =>
    new Metadata<T>(Metadata.normalize<T>(metadata)) as Metadata<T> & T;

  private static defaults = <T extends IMetadata>(): T =>
    ({ id: null, name: null } as T);

  private static normalize = <T extends IMetadata>(metadata?: T) =>
    metadata ? Metadata.validate<T>(metadata) : Metadata.defaults<T>();

  private static ensureId = <T extends IMetadata>(
    metadata: T | Omit<T, "id">,
    generator: () => UUID = () => crypto.randomUUID()
  ): T =>
    ({
      ...metadata,
      id: "id" in metadata && metadata.id != null ? metadata.id : generator(),
    } as T);

  private _id: UUID | null = null;
  private _name: Name | null = null;

  /**
   * Typescript constructors cannot return a value other than the class.
   * As a workaround to support proper types, we must use a static factory method
   */
  private constructor(metadata: T) {
    this.hydrate(metadata);
  }

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
  get id(): UUID | null {
    return this._id;
  }
  set id(id: UUID | null) {
    Exceptions.immutablePropertyException("id");
  }

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
  get name(): Name | null {
    return this._name;
  }
  set name(name: Name | null) {
    this._name = Validate.name(name);
  }

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
  get assigned(): boolean {
    return this._id !== null && this._name !== null;
  }

  /**
   * Retrieve extended properties from the metadata instance.
   * @category  State
   */
  get properties(): { [key: string]: any } {
    return Utilities.select(this, [
      ({ value }) => !Utilities.isMethod(value),
      ({ key }) => !Utilities.isConstructor(key),
      ({ key }) => !Utilities.isGetterOrSetter(this, key),
      ({ key }) => !(["_id", "_name"] as (keyof this)[]).includes(key),
    ]);
  }

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
  public add = (metadata: T) => {
    metadata = Metadata.ensureId<T>(metadata);
    metadata = Metadata.normalize<T>(metadata);

    this.assigned &&
      Exceptions.assignedException(
        "metadata",
        "Use metadata.update(metadata) instead."
      );

    this.hydrate(metadata);

    return this;
  };

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
  public update = (metadata: Partial<T>) => {
    metadata.id && Validate.uuid(metadata.id);

    !this.assigned &&
      Exceptions.unassignedException(
        "metadata",
        "Use metadata.add(metadata) instead."
      );

    metadata.id &&
      !this.match(metadata) &&
      Exceptions.missMatchException(
        "identifier",
        "get metadata.id and verify match."
      );

    this.hydrate({ id: this._id, ...this.toJSON(), ...metadata });

    return this;
  };

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
  public remove = <K extends Extract<keyof T, string>>(keys?: K[]) => {
    !keys
      ? (this.reset(), this.hydrate(Metadata.normalize<T>()))
      : Validator.validate<K[]>(keys, [
          (key) => !Validate.match(key, "id" as K),
          (key) => !Validate.match(key, "name" as K),
        ]).forEach((key) => delete this[key as keyof this]);

    return this;
  };

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
  public toJSON = (): T =>
    ({
      id: this._id,
      name: this._name,
      ...this.properties,
    } as T);

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
  private hydrate = ({ id, name, ...properties }: Partial<T>) =>
    Object.assign(this, { _id: id, _name: name, ...properties });

  private match = ({ id }: Partial<T>): boolean => this._id === id;

  private reset = () =>
    Object.keys(this.properties).forEach((key) => delete this[key]);
}
