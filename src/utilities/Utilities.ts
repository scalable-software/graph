export class Utilities {
  public static select = <T>(
    instance: T,
    filters: ((entry: [string, unknown]) => boolean)[]
  ): Record<string, unknown> =>
    Object.fromEntries(
      Object.entries(instance).filter((entry) =>
        filters.every((filter) => filter(entry))
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
