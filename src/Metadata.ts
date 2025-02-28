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

  get id(): UUID | null {
    return this._id;
  }

  /**
   * The id property is immutable and cannot be set directly.
   */
  set id(id: UUID | null) {
    Exceptions.immutablePropertyException("id");
  }

  get name(): Name | null {
    return this._name;
  }

  set name(name: Name | null) {
    this._name = name;
  }

  private hydrate(metadata: T): void {
    const { id, name, ...properties } = Metadata.normalize<T>(metadata);
    this._id = id;
    this._name = name;
    Object.assign(this, properties);
  }
}
