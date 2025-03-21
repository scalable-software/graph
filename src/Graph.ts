import { type IMetadata, Metadata } from "./Metadata.js";
import { type INode } from "./Node.js";
import { type IEdge } from "./Edge.js";

import { Nodes } from "./Nodes.js";
import { Edges } from "./Edges.js";

export type IGraph = {
  metadata: IMetadata;
  nodes: INode[];
  edges: IEdge[];
};

export class Graph<T extends IGraph> {
  public metadata: Metadata<T["metadata"]> & T["metadata"];
  public nodes: Nodes<T["nodes"][number]>;
  public edges: Edges<T["edges"][number]>;

  constructor(graph?: IGraph) {
    this.metadata = graph?.metadata
      ? Metadata.create<T["metadata"]>(graph.metadata)
      : Metadata.create<T["metadata"]>();

    this.nodes = graph?.nodes
      ? Nodes.create<T["nodes"][number]>(graph.nodes)
      : Nodes.create<T["nodes"][number]>();

    this.edges = graph?.edges
      ? Edges.create<T["edges"][number]>(graph.edges)
      : ([] as any);
  }
}
