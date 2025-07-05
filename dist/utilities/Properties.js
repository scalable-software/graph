/**
 * @module Utilities
 */
export class Properties {
    /**
     * Selects instance properties, applying optional filters to exclude certain keys.
     *
     * @template T The object type.
     * @param {T} instance The object whose properties to extract.
     * @param {((key: keyof T) => boolean)[]} [filters=[]] Optional filters to apply.
     * @returns {Partial<T>} A new object containing only the filtered properties.
     *
     * @example
     * ```ts
     * Properties.select(this, [
     *   (key) => key !== "_id",
     *   (key) => key !== "_name",
     * ]);
     * ```
     */
    static select = (instance, filters = []) => ((properties) => filters.length ? Properties.filter(properties, filters) : properties)(Properties.get(instance));
    /**
     * exports the properties of an instance.
     */
    static get = (instance) => Object.fromEntries(Object.entries(instance).filter(([key, value]) => Properties.isProperty(instance, key, value)));
    /**
     * Filters the properties of an object based on the given filters.
     */
    static filter = (properties, filters) => Object.fromEntries(Object.entries(properties).filter(([key]) => filters.every((filter) => filter(key))));
    /**
     * exports the properties of an instance.
     */
    static isProperty = (instance, key, value) => !Properties.isConstructor(key) &&
        !Properties.isMethod(value) &&
        !Properties.isAccessor(instance, key);
    /**
     * Checks if a property is a constructor on the given instance or its prototype.
     */
    static isConstructor = (key) => key === "constructor";
    /**
     * Checks if a property is a method on the given instance or its prototype.
     */
    static isMethod = (value) => typeof value === "function";
    /**
     * Checks if a property is an accessor (getter or setter) on the given instance or its prototype.
     */
    static isAccessor = (instance, key) => Properties.isGetter(instance, key) || Properties.isSetter(instance, key);
    /**
     * Checks if a property is a getter on the given instance or its prototype.
     */
    static isGetter = (instance, key) => Properties.getDescriptor(instance, key)?.get !== undefined;
    /**
     * Checks if a property is a setter on the given instance or its prototype.
     */
    static isSetter = (instance, key) => Properties.getDescriptor(instance, key)?.set !== undefined;
    /**
     * exports the property descriptor from the instance or its prototype.
     */
    static getDescriptor = (instance, key) => Object.getOwnPropertyDescriptor(instance, key) ??
        Object.getOwnPropertyDescriptor(Object.getPrototypeOf(instance), key);
}
