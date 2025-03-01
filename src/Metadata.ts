import { Validate } from "./validations/Validate.js";
import { Exceptions } from "./exceptions/Exceptions.js";
import type { UUID, Name } from "./Graph.types.js";

export type IMetadata = {
  id: UUID | null;
  name: Name | null;
};
export class Metadata<T extends IMetadata = IMetadata> {
  private static normalize = <T extends IMetadata>(metadata?: T) =>
    Metadata.validate<T>(metadata) ?? ({ id: null, name: null } as T);

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
  public static validate = <T extends IMetadata>(metadata?: T): T | null =>
    metadata
      ? Validate.rules<T>(metadata, [
          ({ id }) => Validate.uuid(id),
          ({ name }) => Validate.name(name),
        ])
      : null;

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
  public static create = <T extends IMetadata>(metadata?: T): Metadata<T> & T =>
    new Metadata<T>(metadata) as Metadata<T> & T;

  public _id: UUID | null = null;
  public _name: Name | null = null;

  /**
   * Typescript constructors cannot return a value other than the class.
   * As a workaround to support proper types, we must use a static factory method
   */
  private constructor(metadata?: T) {
    this.hydrate(metadata);
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
   */
  get assigned(): boolean {
    return this._id !== null && this._name !== null;
  }

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
   */
  get name(): Name | null {
    return this._name;
  }
  set name(name: Name | null) {
    this._name = Validate.name(name);
  }

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
  public add = (metadata: T) => {
    this.assigned &&
      Exceptions.assignedException(
        "metadata",
        "Use metadata.update(metadata) instead."
      );
    this.hydrate(metadata);
  };

  public update = (metadata: T) => this.hydrate(metadata);

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
  private hydrate(metadata: T): void {
    const { id, name, ...properties } = Metadata.normalize<T>(metadata);

    this._id = id;
    this._name = name;

    Object.assign(this, properties);
  }
}
