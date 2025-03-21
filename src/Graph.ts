import { IMetadata } from "./Metadata.js";
import { INode } from "./Node.js";
import { IEdge } from "./Edge.js";

export type IGraph = {
  metadata: IMetadata;
  nodes: INode[];
  edges: IEdge[];
};

export class Graph<T extends IGraph> {}
