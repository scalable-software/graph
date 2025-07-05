/**
 * @module Graph
 */
import { Validate } from "./validations/Validate.js";
import { Validator } from "./validations/Validator.js";
import { Exceptions } from "./exceptions/Exceptions.js";
import { Utilities } from "./utilities/Utilities.js";
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
export class Metadata {
    /**
     *
     * Factory method used to create a new metadata instance.
     *
     * @param metadata The metadata object to hydrate the instance with.
     * @returns A new metadata instance.
     *
     * @category Factory
     */
    static create = (metadata) => new Metadata(Metadata.normalize(metadata));
    static defaults = () => ({ id: null, name: null });
    static normalize = (metadata) => metadata ? Validate.metadata(metadata) : Metadata.defaults();
    _id = null;
    _name = null;
    /**
     * Typescript constructors cannot return a value other than the class.
     * As a workaround to support proper types, we must use a static factory method
     */
    constructor(metadata) {
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
     *
     * @category Data
     * */
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
     * @category State
     */
    get assigned() {
        return this._id !== null && this._name !== null;
    }
    /**
     * export extended properties from the metadata instance.
     * @category  State
     */
    get properties() {
        return Utilities.Properties.select(this, [
            (key) => key !== "_id",
            (key) => key !== "_name",
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
    add = (metadata) => {
        this.validateUnassigned();
        metadata = Utilities.idify(metadata);
        metadata = Validate.metadata(metadata);
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
    update = (metadata) => {
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
     * metadata.remove(); // ✅ Clears all custom properties but keeps id & name
     * ```
     * @category Operations
     */
    remove = (keys) => {
        !keys
            ? (this.reset(), this.hydrate(Metadata.normalize()))
            : Validator.validate(keys, [
                (key) => Validate.immutable(key, "id"),
                (key) => Validate.immutable(key, "name"),
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
     * @category Operations
     */
    toJSON = () => ({
        id: this._id,
        name: this._name,
        ...this.properties,
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
    reset = () => Object.keys(this.properties).forEach((key) => delete this[key]);
    validateUnassigned = () => this.assigned &&
        Exceptions.assignedException("metadata", "Use metadata.update(metadata) instead.");
    validateAssigned = () => !this.assigned &&
        Exceptions.unassignedException("metadata", "Use metadata.add(metadata) instead.");
    validateMatch = (metadata) => metadata.id &&
        !this.match(metadata) &&
        Exceptions.missMatchException("identifier", "get metadata.id and verify match.");
}
