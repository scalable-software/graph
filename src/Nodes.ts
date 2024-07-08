import { type UUID, Utilities } from "./Utilities/Utilities.js";

export type Offset = {
  x: number;
  y: number;
};

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

export type DurationParameters = { meanlog: number } | { sdlog: number };
export type Duration = {
  distribution: string;
  parameters: [DurationParameters, DurationParameters?];
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

export const NodeMetadataType = {
  ARRIVAL: "arrival",
  DURATION: "duration",
  PREVALENCE: "prevalence",
} as const;
export type NodeMetadataType =
  (typeof NodeMetadataType)[keyof typeof NodeMetadataType];

export class Nodes extends EventTarget {
  public static init = (nodes: Node[] = []): Node[] => new Nodes(nodes)._proxy;

  public static create = (details: Omit<Node, "id">): Node => ({
    id: Utilities.uuid,
    name: details.name,
    type: details.type,
    coordinates: details.coordinates,
    icon: details.icon,
  });

  public static getMetadataType = (metadata: NodeMetadata): NodeMetadataType =>
    Object.keys(metadata)[0] as NodeMetadataType;

  public static getMetadataTypes = (node: Node) =>
    node.metadata
      ? node.metadata.map((metadata) => Nodes.getMetadataType(metadata))
      : [];

  public static hasMetadata = (node: Node): boolean => !!node.metadata;

  public static hasMetadataType = (
    node: Node,
    type: NodeMetadataType
  ): boolean => Nodes.getMetadataTypes(node).includes(type);

  public static addMetadata = (node: Node, metadata: NodeMetadata): Node =>
    Nodes.hasMetadataType(node, Nodes.getMetadataType(metadata))
      ? {
          ...node,
          metadata: node.metadata.map((node) =>
            node[Nodes.getMetadataType(metadata)] ? metadata : node
          ),
        }
      : {
          ...node,
          metadata: node.metadata ? [...node.metadata, metadata] : [metadata],
        };

  public static update = (node: Node, update: Node): Node => ({
    ...update,
    id: node.id,
  });

  public static updateMetadata = (node: Node, metadata: NodeMetadata): Node => {
    let type = Nodes.getMetadataType(metadata);
    node.metadata = node.metadata.map((node) => (node[type] ? metadata : node));
    return node;
  };

  public static updateIcon = (node: Node, icon: Icon): Node => ({
    ...node,
    icon,
  });

  public static updateCoordinates = (
    node: Node,
    coordinates: Coordinates
  ): Node => ({
    ...node,
    coordinates,
  });

  public static translate = (node: Node, offset: any) => {
    node.coordinates = {
      x: node.coordinates.x + offset.x,
      y: node.coordinates.y + offset.y,
    };
    return node;
  };

  public static removeMetadata = (node: Node, type: NodeMetadataType): Node => {
    node.metadata = node.metadata.filter(
      (metadata) => metadata[type] === undefined
    );
    return node;
  };

  private _proxy: Node[] = [];

  /**
   * The private constructor is used by the static init method: no direct instantiation is allowed.
   * This is done so that a different return value, other than an instance of the class can be returned.
   */
  constructor(private nodes: Node[] = []) {
    super();
    this._proxy = this._createProxy(nodes);
  }

  private _get = (target, property, receiver) =>
    property === "add"
      ? this.add
      : property === "addMetadata"
      ? this.addMetadata
      : property === "update"
      ? this.update
      : property === "updateMetadata"
      ? this.updateMetadata
      : property === "updateIcon"
      ? this.updateIcon
      : property === "updateCoordinates"
      ? this.updateCoordinates
      : property === "findById"
      ? this.findById
      : property === "findByType"
      ? this.findByType
      : property === "findByCoordinates"
      ? this.findByCoordinates
      : property === "translate"
      ? this.translate
      : property === "removeMetadata"
      ? this.removeMetadata
      : property === "remove"
      ? this.remove
      : Reflect.get(target, property, receiver);

  private _set = (target, property, value, receiver) =>
    Reflect.set(target, property, value, receiver);

  private _createProxy = (target: Node[]): Node[] =>
    new Proxy(target, { get: this._get, set: this._set });

  private _getIndex = (id: UUID) =>
    this.nodes.findIndex((node) => node.id === id);

  private add = (details: Omit<Node, "id">) =>
    this.nodes.push(Nodes.create(details)) && this._proxy;

  private addMetadata = (id: UUID, metadata: NodeMetadata) => {
    this.nodes[this._getIndex(id)] = Nodes.addMetadata(
      this.nodes[this._getIndex(id)],
      metadata
    );
    return this._proxy;
  };

  private update = (id, update) => {
    this.nodes[this._getIndex(id)] = Nodes.update(
      this.nodes[this._getIndex(id)],
      update
    );
    return this._proxy;
  };

  private updateMetadata = (id, metadata) => {
    this.nodes[this._getIndex(id)] = Nodes.updateMetadata(
      this.nodes[this._getIndex(id)],
      metadata
    );
    return this._proxy;
  };

  private updateIcon = (id, icon) => {
    this.nodes[this._getIndex(id)] = Nodes.updateIcon(
      this.nodes[this._getIndex(id)],
      icon
    );
    return this._proxy;
  };

  private updateCoordinates = (id, coordinates) => {
    this.nodes[this._getIndex(id)] = Nodes.updateCoordinates(
      this.nodes[this._getIndex(id)],
      coordinates
    );
    return this._proxy;
  };

  private findById = (id) => this.nodes[this._getIndex(id)];

  private findByType = (type) =>
    this.nodes.filter((node) => node.type === type);

  private findByCoordinates = (coordinates) =>
    this.nodes.filter(
      (node) =>
        node.coordinates.x === coordinates.x &&
        node.coordinates.y === coordinates.y
    );

  private translate = (id, offset) => {
    this.nodes[this._getIndex(id)] = Nodes.translate(
      this.nodes[this._getIndex(id)],
      offset
    );
    return this._proxy;
  };

  private removeMetadata = (id, type) => {
    this.nodes[this._getIndex(id)] = Nodes.removeMetadata(
      this.nodes[this._getIndex(id)],
      type
    );
    return this._proxy;
  };

  private remove = (id) => {
    this.nodes.splice(this._getIndex(id), 1);
    return this._proxy;
  };
}
