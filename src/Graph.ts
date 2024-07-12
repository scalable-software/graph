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

  public removeConnectionById = (id: UUID): Connections =>
    this.connections.remove(id);
}
