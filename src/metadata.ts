/**
 * @module Graph
 */

import { Validate } from "./validations/validate.js";
import { Validator } from "./validations/validator.js";
import { Exceptions } from "./exceptions/exceptions.js";
import { Utilities } from "./utilities/utilities.js";
import type { UUID, Name } from "./graph.types.js";

/**
 * The metadata object has an `id` and `name` property.
 * - The `id` property is immutable, and is generated when none is given.
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
export class Metadata<T extends IMetadata = IMetadata> {
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
    ({ id: crypto.randomUUID(), name: null } as T);

  private static normalize = <T extends IMetadata>(metadata?: T): T =>
    metadata
      ? Validate.metadata(Metadata.identify<T>(metadata))
      : Metadata.defaults();

  /**
   * Ensures that metadata has an `id`.
   * A missing or `null` id becomes the given id, or a generated one when none is given.
   * An id that is present is left unchanged, also when it is not a valid UUID.
   */
  private static identify = <T extends IMetadata>(
    metadata: T | Omit<T, "id">,
    id?: UUID | null
  ): T =>
    "id" in metadata && metadata.id != null
      ? metadata
      : ({ ...metadata, id: id ?? crypto.randomUUID() } as T);

  /**
   * A missing or empty name is always held as `null`.
   */
  private static named = (name?: Name | null): Name | null =>
    name == null || name === "" ? null : name;

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
   * `get` returns value, or `null` when there is no name
   * `set` validates and updates value; an empty value removes the name
   *
   * @example
   * ```ts
   * const metadata = Metadata.create();
   * metadata.name = "Test";
   * metadata.name;
   * // => "Test"
   *
   * metadata.name = "";
   * metadata.name;
   * // => null
   * ```
   *
   * @category Data
   * */
  get name(): Name | null {
    return this._name;
  }
  set name(name: Name | null) {
    this._name = Metadata.named(Validate.name(name));
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
   * export extended properties from the metadata instance.
   * @category  State
   */
  get properties(): { [key: string]: any } {
    return Utilities.Properties.select(this, [
      (key) => key !== "_id",
      (key) => key !== "_name",
    ]);
  }

  /**
   * Adds metadata to the instance if not already assigned.
   * When the metadata has no `id`, the instance keeps the id it already has.
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
  public add = (metadata: T | Omit<T, "id">) => {
    this.validateUnassigned();

    metadata = Metadata.identify<T>(metadata, this._id);
    metadata = Validate.metadata<T>(metadata as T);

    this.hydrate(metadata as T);
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
    this.validateAssigned();
    this.validateMatch(metadata);

    metadata.id && Validate.uuid(metadata.id);

    metadata = { ...this.toJSON(), ...metadata };

    this.hydrate(metadata);
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
   * metadata.remove(); // ✅ Clears all custom properties and the name, but keeps the id
   * ```
   * @category Operations
   */
  public remove = <K extends Extract<keyof T, string>>(keys?: K[]) => {
    !keys
      ? (this.reset(),
        this.hydrate({ ...Metadata.defaults<T>(), id: this._id }))
      : Validator.validate<K[]>(keys, [
          (key) => Validate.immutable(key, "id" as K),
          (key) => Validate.immutable(key, "name" as K),
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
    Object.keys(this.properties).forEach(
      (key) => delete this[key as keyof this]
    );

  private validateUnassigned = () =>
    this.assigned &&
    Exceptions.assignedException(
      "metadata",
      "Use metadata.update(metadata) instead."
    );

  private validateAssigned = () =>
    !this.assigned &&
    Exceptions.unassignedException(
      "metadata",
      "Use metadata.add(metadata) instead."
    );

  private validateMatch = (metadata: Partial<T>) =>
    metadata.id &&
    !this.match(metadata) &&
    Exceptions.missMatchException(
      "identifier",
      "get metadata.id and verify match."
    );
}
