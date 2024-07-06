export class Utilities {
  public static hasSetter = (obj, propName) => {
    while (obj) {
      let descriptor = Object.getOwnPropertyDescriptor(obj, propName);
      if (descriptor) return !!descriptor.set;
      obj = Object.getPrototypeOf(obj);
    }
    return false;
  };
}
