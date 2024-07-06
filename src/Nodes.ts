export class Nodes extends EventTarget {
  public static init = (nodes = []) => new Nodes(nodes)._proxy;

  private _proxy = [];
  private _result: boolean = false;

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
  private set symbol({ target, property, value, receiver }: any) {
    this._result = Reflect.set(target, property, value, receiver);
  }

  private get index() {
    return (target, property, receiver) =>
      Reflect.get(target, property, receiver);
  }
  private set index({ target, property, value, receiver }: any) {
    this._result = Reflect.set(target, property, value, receiver);
  }

  private get length() {
    return (target, property, receiver) =>
      Reflect.get(target, property, receiver);
  }
  private set length({ target, property, value, receiver }: any) {
    this._result = Reflect.set(target, property, value, receiver);
  }

  private get property() {
    return (target, property, receiver) =>
      Reflect.get(target, property, receiver);
  }
  private set property({ target, property, value, receiver }: any) {
    this._result = Reflect.set(target, property, value, receiver);
  }

  private get method() {
    return (target, property, receiver) =>
      Reflect.get(target, property, receiver);
  }
  private set method({ target, property, value, receiver }: any) {
    this._result = Reflect.set(target, property, value, receiver);
  }

  private get default() {
    return (target, property, receiver) =>
      Reflect.get(target, property, receiver);
  }
  private set default({ target, property, value, receiver }: any) {
    this._result = Reflect.set(target, property, value, receiver);
  }

  private _get = (target, property, receiver) =>
    this[this._getPropertyType(property, target)](target, property, receiver);

  private _set = (target, property, value, receiver) =>
    (this[this._getPropertyType(property, target)] = {
      target,
      property,
      value,
      receiver,
    }) && this._result;

  private _createProxy = (target) =>
    new Proxy(target, { get: this._get, set: this._set });

  private _getPropertyType = (property, target) =>
    typeof property === "symbol"
      ? "symbol"
      : Number.isInteger(Number(property))
      ? "index"
      : property === "length"
      ? "length"
      : typeof target[property] === "function"
      ? "method"
      : typeof property === "string" &&
        !(typeof target[property] === "function")
      ? "property"
      : "default";
}
