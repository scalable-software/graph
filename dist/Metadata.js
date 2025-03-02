/**
 * @module Metadata
 */
import { Validate } from "./validations/Validate.js";
import { Exceptions } from "./exceptions/Exceptions.js";
import { Utilities } from "./utilities/Utilities.js";
export class Metadata {
    static normalize = (metadata) => metadata
        ? Metadata.validate(metadata) || Metadata.defaults()
        : Metadata.defaults();
    static ensureId = (metadata, generator = () => crypto.randomUUID()) => ({
        ...metadata,
        id: "id" in metadata && metadata.id != null ? metadata.id : generator(),
    });
    static defaults = () => ({ id: null, name: null });
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
    static validate = (metadata) => metadata
        ? Validate.rules(metadata, [
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
    static create = (metadata) => new Metadata(metadata);
    _id = null;
    _name = null;
    /**
     * Typescript constructors cannot return a value other than the class.
     * As a workaround to support proper types, we must use a static factory method
     */
    constructor(metadata) {
        this.hydrate(Metadata.normalize(metadata));
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
    get id() {
        return this._id;
    }
    set id(id) {
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
    get name() {
        return this._name;
    }
    set name(name) {
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
     */
    get assigned() {
        return this._id !== null && this._name !== null;
    }
    /**
     * Retrieve required and custom properties from the metadata instance.
     */
    get customProperties() {
        return Utilities.select(this, [
            ([key, value]) => !Utilities.isMethod(value),
            ([key]) => !Utilities.isConstructor(key),
            ([key]) => !Utilities.isGetterOrSetter(this, key),
            ([key]) => !["_id", "_name"].includes(key),
        ]);
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
    add = (metadata) => {
        metadata = Metadata.ensureId(metadata);
        metadata = Metadata.normalize(metadata);
        this.assigned &&
            Exceptions.assignedException("metadata", "Use metadata.update(metadata) instead.");
        this.hydrate(metadata);
        return this;
    };
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
    update = (metadata) => {
        metadata.id && Validate.uuid(metadata.id);
        !this.assigned &&
            Exceptions.unassignedException("metadata", "Use metadata.add(metadata) instead.");
        metadata.id &&
            !this.match(metadata) &&
            Exceptions.missMatchException("identifier", "get metadata.id and verify match.");
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
     */
    remove = (keys) => {
        !keys
            ? (this.reset(), this.hydrate(Metadata.normalize()))
            : Validate.keys(keys, [
                (key) => !Validate.match(key, "id"),
                (key) => !Validate.match(key, "name"),
            ]).forEach((key) => delete this[key]);
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
     */
    toJSON = () => ({
        id: this._id,
        name: this._name,
        ...this.customProperties,
    });
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
    hydrate = ({ id, name, ...properties }) => Object.assign(this, { _id: id, _name: name, ...properties });
    match = ({ id }) => this._id === id;
    reset = () => Object.keys(this.customProperties).forEach((key) => delete this[key]);
}
