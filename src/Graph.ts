import { Connections } from "./Connections.js";
import { Nodes } from "./Nodes.js";
import { Utilities, UUID } from "./Utilities/Utilities.js";

export const NodeType = {
  START: "start",
  WORKFLOW: "workflow",
  DELAY: "delay",
  END: "end",
  DECISION: "decision",
} as const;
export type NodeType = (typeof NodeType)[keyof typeof NodeType];

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

export const NodeMetadataType = {
  ARRIVAL: "arrival",
  DURATION: "duration",
  PREVALENCE: "prevalence",
} as const;
export type NodeMetadataType =
  (typeof NodeMetadataType)[keyof typeof NodeMetadataType];

export type NodeMetadata = {
  arrival?: Arrival;
  duration?: Duration;
  prevalence?: Prevalence;
};

export type Coordinates = {
  x: number;
  y: number;
};

export type Offset = {
  x: number;
  y: number;
};

export type Node = {
  id: UUID;
  name: string;
  type: NodeType;
  coordinates: Coordinates;
  icon?: Icon;
  metadata?: NodeMetadata[];
};

export type Connection = {
  id?: UUID;
  name: string;
  source: UUID;
  target: UUID;
  coordinates: {
    start: Coordinates;
    end: Coordinates;
  };
};

export const GraphType = {
  PIPELINE: "pipeline",
  PATHWAY: "pathway",
  WORKFLOW: "workflow",
} as const;
export type GraphType = (typeof GraphType)[keyof typeof GraphType];

export type GraphMetadata = {
  id: UUID;
  name: string;
  type: GraphType;
};

export type GraphDetails = {
  name: string;
  type: GraphType;
};

export class Graph {
  public metadata: GraphMetadata;
  public nodes;
  public connections;
  constructor(metadata: GraphDetails) {
    this.nodes = Nodes.init();
    this.connections = Connections.init();
    this.metadata = {
      id: Utilities.uuid,
      name: metadata.name,
      type: metadata.type,
    };
  }

  public findNodeById = (id: UUID): Node => this.nodes.findById(id);

  public findConnectionById = (id: UUID): Connection =>
    this.connections.findById(id);

  public findNodesByType = (type: NodeType): Nodes =>
    this.nodes.findByType(type);

  public findNodeByCoordinates = (coordinates: Coordinates): Node =>
    this.nodes.findByCoordinates(coordinates);

  public translateNode = (id: UUID, offset: Offset) =>
    this.nodes.translate(id, offset);

  public translateConnection = (id: UUID, offset: Offset) =>
    this.connections.translate(id, offset);

  public removeNodeMetadata = (id: UUID, type: NodeMetadataType) =>
    this.nodes.removeMetadata(id, type);

  public removeNodeById = (id: UUID): Nodes => this.nodes.remove(id);

  public removeConnectionById = (id: UUID): Connections =>
    this.connections.remove(id);
}
