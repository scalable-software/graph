import { type IMetadata, Metadata } from "./Metadata.js";
import { type INode } from "./Node.js";
import { type IEdge } from "./Edge.js";

export type IGraph = {
  metadata: IMetadata;
  nodes: INode[];
  edges: IEdge[];
};

export class Graph<T extends IGraph> {
  constructor() {}
}
