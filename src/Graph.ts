import { type IMetadata, Metadata } from "./Metadata.js";
import { type INode } from "./Node.js";
import { type IEdge } from "./Edge.js";

import { Nodes } from "./Nodes.js";

export type IGraph = {
  metadata: IMetadata;
  nodes: INode[];
  edges: IEdge[];
};

export class Graph<T extends IGraph> {
  public metadata: Metadata<T["metadata"]> & T["metadata"];
  public nodes: Nodes<T["nodes"][number]>;

  constructor() {
    this.metadata = {} as any;
    this.nodes = [] as any;
  }
}
