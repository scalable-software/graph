import { type UUID, Utilities } from "./Utilities/Utilities.js";

export const NodeType = {
  START: "start",
  WORKFLOW: "workflow",
  DELAY: "delay",
  END: "end",
  DECISION: "decision",
} as const;
export type NodeType = (typeof NodeType)[keyof typeof NodeType];

export type Coordinates = {
  x: number;
  y: number;
};

export type Icon = string;

export type Arrival = {
  distribution: string;
  parameters: { rate: number }[];
};
export type Duration = {
  distribution: string;
  parameters: { meanlog: number; sdlog?: number }[];
};
export type Prevalence = { target: string; probability: number }[];

export type NodeMetadata = {
  arrival?: Arrival;
  duration?: Duration;
  prevalence?: Prevalence;
};

export type Node = {
  id: UUID;
  name: string;
  type: NodeType;
  coordinates: Coordinates;
  icon?: Icon;
  metadata?: NodeMetadata[];
};

export class Nodes extends EventTarget {
  public static init = (nodes: Node[] = []): Node[] => new Nodes(nodes)._proxy;

  public static create = (details: Omit<Node, "id">): Node => ({
    id: Utilities.uuid,
    name: details.name,
    type: details.type,
    coordinates: details.coordinates,
    icon: details.icon,
  });
  public static addMetadata = (node: Node, metadata: NodeMetadata): Node => ({
    ...node,
    metadata: node.metadata ? [...node.metadata, metadata] : [metadata],
  });

  private _proxy: Node[] = [];
  private _result: boolean = false;

  /**
   * The private constructor is used by the static init method: no direct instantiation is allowed.
   * This is done so that a different return value, other than an instance of the class can be returned.
   */
  constructor(private nodes: Node[] = []) {
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
      property === "add" ? this.add : Reflect.get(target, property, receiver);
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

  private _createProxy = (target: Node[]): Node[] =>
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

  private add = (details: Omit<Node, "id">) =>
    this.nodes.push(Nodes.create(details)) && this._proxy;

  private addMetadata = (id, metadata) => {};
}
