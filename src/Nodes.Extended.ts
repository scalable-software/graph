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

export class Nodes extends Array<Node> {
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

  private _getIndex = (id: UUID) => this.findIndex((node) => node.id === id);

  public add = (details: Omit<Node, "id">) =>
    this.push(Nodes.create(details as Omit<Node, "id">) as Node) && this;

  public addMetadata = (id: UUID, metadata: NodeMetadata) => {
    this[this._getIndex(id)] = Nodes.addMetadata(
      this[this._getIndex(id)],
      metadata
    );
    return this;
  };

  public update = (id: UUID, update: Node) => {
    this[this._getIndex(id)] = Nodes.update(this[this._getIndex(id)], update);
    return this;
  };

  public updateMetadata = (id: UUID, metadata: any) => {
    this[this._getIndex(id)] = Nodes.updateMetadata(
      this[this._getIndex(id)],
      metadata
    );
    return this;
  };

  public updateIcon = (id: UUID, icon: any) => {
    this[this._getIndex(id)] = Nodes.updateIcon(this[this._getIndex(id)], icon);
    return this;
  };

  public updateCoordinates = (id: UUID, coordinates: Coordinates) => {
    this[this._getIndex(id)] = Nodes.updateCoordinates(
      this[this._getIndex(id)],
      coordinates
    );
    return this;
  };

  public findById = (id: UUID) => this[this._getIndex(id)];

  public findByType = (type: any) => this.filter((node) => node.type === type);

  public findByCoordinates = (coordinates: any) =>
    this.filter(
      (node) =>
        node.coordinates.x === coordinates.x &&
        node.coordinates.y === coordinates.y
    );

  public translate = (id: UUID, offset: Offset) => {};

  public removeMetadata = (id: UUID, type: NodeMetadataType) => {};

  public remove = (id: UUID) => {};
}
