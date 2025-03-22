import { type IMetadata, Metadata } from "./Metadata.js";
import { type INode } from "./Node.js";
import { type IEdge } from "./Edge.js";

import { Nodes } from "./Nodes.js";
import { Edges } from "./Edges.js";
import { Validate } from "./Index.js";

import { type UUID } from "./Graph.types.js";

export type IGraph = {
  metadata: IMetadata;
  nodes: INode[];
  edges: IEdge[];
};

export class Graph<T extends IGraph> {
  public metadata: Metadata<T["metadata"]> & T["metadata"];
  public nodes: Nodes<T["nodes"][number]>;
  public edges: Edges<T["edges"][number]>;

  constructor(graph?: Partial<T>) {
    ((graph) => {
      this.metadata = graph?.metadata
        ? Metadata.create<T["metadata"]>(graph.metadata)
        : Metadata.create<T["metadata"]>();

      this.nodes = graph?.nodes
        ? Nodes.create<T["nodes"][number]>(graph.nodes)
        : Nodes.create<T["nodes"][number]>();

      this.edges = graph?.edges
        ? Edges.create<T["edges"][number]>(graph.edges)
        : Edges.create<T["edges"][number]>();
    })(Validate.graph(graph));
  }

  /**
   * Import a graph in JSON format into a graph data structure.
   * @param graph - The graph in JSON format.
   *
   * @category Operation
   */
  public import = (graph) => this._import(graph);

  protected _import = (graph) => {
    ((graph) => {
      graph.metadata && this.metadata.add(graph.metadata);
      graph.nodes && this.nodes.add(graph.nodes);
      graph.edges && this.edges.add(graph.edges);
    })(Validate.graphDetails(graph));
    return this;
  };

  /**
   * Export the graph data structure into a graph in JSON format.
   * @returns The graph in JSON format.
   * @category Operation
   */
  public export = (): T =>
    ({
      metadata: this.metadata.toJSON(),
      nodes: this.nodes.toJSON(),
      edges: this.edges.toJSON(),
    } as T);

  /**
   * Export the graph data structure into a graph in JSON format.
   * @returns The graph in JSON format.
   * @category Operation
   */
  public toJSON = () => this.export();

  /**
   * Returns the degree: number of connections, of a node.
   * @param id - The id of the node.
   * @returns The degree of the node.
   *
   * @category Operation
   */
  public degree = (id: UUID): number =>
    this.edges.findByTarget(id).length + this.edges.findBySource(id).length;

  /**
   * Returns the in-degree: number of incoming connections, of a node.
   * @param id - The id of the node.
   * @returns The in-degree of the node.
   *
   * @category Operation
   */
  public in = (id: UUID): number => this.edges.findByTarget(id).length;

  /**
   * Returns the out-degree: number of outgoing connections, of a node.
   * @param id  - The id of the node.
   * @returns The out-degree of the node.
   * @category Operation
   */
  public out = (id: UUID): number => this.edges.findBySource(id).length;

  /**
   * Returns the ids of the neighbors of a node.
   * @param id - The id of the node.
   * @returns The ids of the neighbors of the node.
   * @category Operation
   */
  public neighbors = (id: UUID) => [
    ...new Set(
      this.getEdges(id).flatMap(({ source, target }) =>
        source === id ? [target] : [source]
      )
    ),
  ];

  private getEdges = (id: UUID) =>
    this.edges.filter(({ source, target }) => source === id || target === id);
}
