export class Utilities {
  public static getProperties = <T>(instance: T) =>
    Object.fromEntries(
      Object.entries(instance).filter(
        ([key, value]) =>
          !Utilities.isMethod(value) &&
          !Utilities.isGetterOrSetter(instance, key) &&
          !Utilities.isConstructor(key)
      )
    );

  private static isConstructor = (key: string): boolean =>
    key === "constructor";

  /** Checks if the key is a getter or setter */
  private static isGetterOrSetter = (instance: any, key: string): boolean =>
    ((descriptor) =>
      descriptor?.get !== undefined || descriptor?.set !== undefined)(
      Object.getOwnPropertyDescriptor(instance, key)
    );

  private static isMethod = (value: any): boolean =>
    typeof value === "function";
}
