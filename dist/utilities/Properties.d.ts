/**
 * @module Utilities
 */
export declare class Properties {
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
    static select: <T>(instance: T, filters?: ((key: keyof T) => boolean)[]) => Partial<T>;
    /**
     * exports the properties of an instance.
     */
    private static get;
    /**
     * Filters the properties of an object based on the given filters.
     */
    private static filter;
    /**
     * exports the properties of an instance.
     */
    private static isProperty;
    /**
     * Checks if a property is a constructor on the given instance or its prototype.
     */
    private static isConstructor;
    /**
     * Checks if a property is a method on the given instance or its prototype.
     */
    private static isMethod;
    /**
     * Checks if a property is an accessor (getter or setter) on the given instance or its prototype.
     */
    private static isAccessor;
    /**
     * Checks if a property is a getter on the given instance or its prototype.
     */
    private static isGetter;
    /**
     * Checks if a property is a setter on the given instance or its prototype.
     */
    private static isSetter;
    /**
     * exports the property descriptor from the instance or its prototype.
     */
    private static getDescriptor;
}
