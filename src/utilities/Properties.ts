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
  public static select = <T>(
    instance: T,
    filters: ((key: keyof T) => boolean)[] = []
  ): Partial<T> =>
    ((properties) =>
      filters.length ? Properties.filter(properties, filters) : properties)(
      Properties.get(instance)
    );

  /**
   * Retrieves the properties of an instance.
   */
  private static get = <T>(instance: T): Partial<T> =>
    Object.fromEntries(
      Object.entries(instance).filter(([key, value]) =>
        Properties.isProperty(instance, key as keyof T, value)
      )
    ) as Partial<T>;

  /**
   * Filters the properties of an object based on the given filters.
   */
  private static filter = <T>(
    properties: Partial<T>,
    filters: ((key: keyof T) => boolean)[]
  ): Partial<T> =>
    Object.fromEntries(
      Object.entries(properties).filter(([key]) =>
        filters.every((filter) => filter(key as keyof T))
      )
    ) as Partial<T>;

  /**
   * Retrieves the properties of an instance.
   */
  private static isProperty = <T>(
    instance: T,
    key: keyof T,
    value: unknown
  ): boolean =>
    !Properties.isConstructor(key) &&
    !Properties.isMethod(value) &&
    !Properties.isAccessor(instance, key);

  /**
   * Checks if a property is a constructor on the given instance or its prototype.
   */
  private static isConstructor = <T>(key: keyof T): boolean =>
    key === "constructor";

  /**
   * Checks if a property is a method on the given instance or its prototype.
   */
  private static isMethod = (value: any): boolean =>
    typeof value === "function";

  /**
   * Checks if a property is an accessor (getter or setter) on the given instance or its prototype.
   */
  private static isAccessor = <T>(instance: T, key: keyof T): boolean =>
    Properties.isGetter(instance, key) || Properties.isSetter(instance, key);

  /**
   * Checks if a property is a getter on the given instance or its prototype.
   */
  private static isGetter = <T>(instance: T, key: keyof T): boolean =>
    Properties.getDescriptor(instance, key)?.get !== undefined;

  /**
   * Checks if a property is a setter on the given instance or its prototype.
   */
  private static isSetter = <T>(instance: T, key: keyof T): boolean =>
    Properties.getDescriptor(instance, key)?.set !== undefined;

  /**
   * Retrieves the property descriptor from the instance or its prototype.
   */
  private static getDescriptor = <T>(
    instance: T,
    key: keyof T
  ): PropertyDescriptor | undefined =>
    Object.getOwnPropertyDescriptor(instance, key) ??
    Object.getOwnPropertyDescriptor(Object.getPrototypeOf(instance), key);
}
