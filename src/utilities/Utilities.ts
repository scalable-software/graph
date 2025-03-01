export class Utilities {
  public static select = <T>(
    instance: T,
    filters: ((entry: [string, unknown]) => boolean)[]
  ): { [key: string]: any } =>
    Object.fromEntries(
      Object.entries(instance).filter((property) =>
        filters.every((filter) => filter(property))
      )
    );

  public static isConstructor = (key: string): boolean => key === "constructor";

  /** Checks if the key is a getter or setter */
  public static isGetterOrSetter = (instance: any, key: string): boolean =>
    ((descriptor) =>
      descriptor?.get !== undefined || descriptor?.set !== undefined)(
      Object.getOwnPropertyDescriptor(instance, key)
    );

  public static isMethod = (value: any): boolean => typeof value === "function";
}
