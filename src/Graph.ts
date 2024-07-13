import { Connections } from "./Connections.js";
import { Nodes } from "./Nodes.js";
import { Utilities, UUID } from "./Utilities/Utilities.js";

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
    this.nodes = new Nodes();
    this.connections = new Connections();
    this.metadata = {
      id: Utilities.uuid,
      name: metadata.name,
      type: metadata.type,
    };
  }
}
