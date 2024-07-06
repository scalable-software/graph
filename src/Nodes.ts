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

  private _get = (target, property, receiver) => {
    const isSymbol = typeof property === "symbol";
    if (isSymbol) return this._getSymbol(target, property, receiver);

    const index = Number(property);
    const isIndex = Number.isInteger(index);
    if (isIndex) return this._getIndex(target, index, receiver);

    const isLength = property === "length";
    if (isLength) return this._getLength(target, property, receiver);

    const isMethod = typeof target[property] === "function";
    if (isMethod) return Reflect.get(target, property, receiver);

    const isProperty =
      typeof property === "string" && !(typeof target[property] === "function");

    if (isProperty) return this._getProperty(target, property, receiver);

    return Reflect.get(target, property, receiver);
  };

  private _set = (target, property, value, receiver) =>
    Reflect.set(target, property, value, receiver);

  private _createProxy = (target) =>
    new Proxy(target, { get: this._get, set: this._set });

  private _getSymbol = (target, property, receiver) =>
    Reflect.get(target, property, receiver);

  private _getIndex = (target, property, receiver) =>
    Reflect.get(target, property, receiver);

  private _getLength = (target, property, receiver) =>
    Reflect.get(target, property, receiver);

  private _getProperty = (target, property, receiver) =>
    Reflect.get(target, property, receiver);
}
