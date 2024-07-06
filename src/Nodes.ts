export class Nodes extends EventTarget {
  public static init = (nodes = []) => new Nodes(nodes)._proxy;

  private _proxy = [];

  /**
   * The private constructor is used by the static init method: no direct instantiation is allowed.
   * This is done so that a different return value, other than an instance of the class can be returned.
   */
  constructor(private nodes = []) {
    super();
    this._proxy = this._createProxy(nodes);
  }

  private get symbol() {
    return (target, property, receiver) =>
      Reflect.get(target, property, receiver);
  }

  private get index() {
    return (target, property, receiver) =>
      Reflect.get(target, property, receiver);
  }

  private get length() {
    return (target, property, receiver) =>
      Reflect.get(target, property, receiver);
  }

  private get property() {
    return (target, property, receiver) =>
      Reflect.get(target, property, receiver);
  }

  private get method() {
    return (target, property, receiver) =>
      Reflect.get(target, property, receiver);
  }

  private _get = (target, property, receiver) => {
    const isSymbol = typeof property === "symbol";
    if (isSymbol) return this.symbol(target, property, receiver);

    const index = Number(property);
    const isIndex = Number.isInteger(index);
    if (isIndex) return this.index(target, property, receiver);

    const isLength = property === "length";
    if (isLength) return this.length(target, property, receiver);

    const isMethod = typeof target[property] === "function";
    if (isMethod) return this.method(target, property, receiver);

    const isProperty =
      typeof property === "string" && !(typeof target[property] === "function");

    if (isProperty) return this.property(target, property, receiver);

    return Reflect.get(target, property, receiver);
  };

  private _set = (target, property, value, receiver) =>
    Reflect.set(target, property, value, receiver);

  private _createProxy = (target) =>
    new Proxy(target, { get: this._get, set: this._set });

  private _getPropertyType = (property) => {};
}
