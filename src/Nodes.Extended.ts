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

  public static getMetadataTypes = (node: Node) => {};

  constructor(...items: Node[]) {
    super(...items);
  }

  private _getIndex = (id: UUID) => this.findIndex((node) => node.id === id);

  public add = (details: Omit<Node, "id">) =>
    this.push(Nodes.create(details as Omit<Node, "id">) as Node) && this;

  public addMetadata = (item: Node, metadata: any) => {};

  public update = (item: Node, update: Node) => {};

  public updateMetadata = (item: Node, metadata: any) => {};

  public updateIcon = (item: Node, icon: any) => {};

  public updateCoordinates = (item: Node, coordinates: any) => {};

  public findById = (id: any) => {};

  public findByType = (type: any) => {};

  public findByCoordinates = (coordinates: any) => {};
}
