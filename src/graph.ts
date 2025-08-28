/**
 * A {@link Graph} is a data structure that:
 * - has {@link Metadata}
 * - contains {@link Nodes}
 * - contains {@link Edges}
 *
 * Extension with new properties is supported.
 * @module Graph
 */

import { type IMetadata, Metadata } from "./metadata.js";
import { type INode } from "./node.js";
import { type IEdge } from "./edge.js";

import { Nodes } from "./nodes.js";
import { Edges } from "./edges.js";
import { Validate } from "./index.js";

import { type UUID } from "./graph.types.js";

export type IGraph = {
  metadata: IMetadata;
  nodes: INode[];
  edges: IEdge[];
};

/**
 * Represents a graph data structure containing:
 * - {@link Metadata} for graph-wide information.
 * - {@link Nodes} for individual entities with coordinates.
 * - {@link Edges} to define connections between nodes.
 *
 * The graph supports operations such as importing, exporting, and analyzing node connections.
 *
 * @example
 * ```typescript
 * import { Graph, type IGraph } from "@scalable.software/graph";
 *
 * const graph = new Graph<IGraph>().import({
 *   metadata: {
 *     name: "Clinical Pathway",
 *   },
 *   nodes: [
 *     {
 *       coordinates: { x: 5, y: 10 },
 *     },
 *   ],
 * });
 *
 * const data = graph.export();
 * console.log(data);
 *
 * // {
 * //   metadata: { id: "123e4567-e89b-12d3-a456-426614174000", name: "Clinical Pathway" },
 * //   nodes: [{ id: "123e4567-e89b-12d3-a456-426614174001", coordinates: { x: 5, y: 10 }}],
 * //   edges: []
 * // }
 * ```
 */
export class Graph<T extends IGraph> {
  /**
   * The graph's metadata containing details such as `id` and `name`.
   * @category Data
   */
  public metadata: Metadata<T["metadata"]> & T["metadata"];
  /**
   * A collection of nodes representing entities within the graph.
   * @category Data
   */
  public nodes: Nodes<T["nodes"][number]>;
  /**
   * A collection of edges defining connections between nodes.
   * @category Data
   */
  public edges: Edges<T["edges"][number]>;

  /**
   * Creates a new instance of the `Graph`.
   *
   * @param {Partial<T>} [graph] - Optional initial data for metadata, nodes, and edges.
   * Ensures that provided data is validated before being assigned.
   * @category Factory
   */
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
   * Computes the rectangular domain of the graph by determining the minimum and maximum
   * x and y coordinates across all nodes. The domain represents the logical bounds
   * of the graph in coordinate space and is useful for layout, viewport, and rendering decisions.
   *
   * If the graph contains no nodes, the domain defaults to:
   * `{ x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }`
   *
   * @example
   * ```ts
   * const data = {
   *   metadata: {
   *     id: "123e4567-e89b-12d3-a456-426614174000",
   *     name: "Clinical Pathway",
   *   },
   *   nodes: [
   *     {
   *       id: "123e4567-e89b-12d3-a456-426614174001",
   *       coordinates: { x: 1, y: 1 },
   *     },
   *     {
   *       id: "123e4567-e89b-12d3-a456-426614174002",
   *       coordinates: { x: 2, y: 2 },
   *     },
   *   ],
   *   edges: [
   *     {
   *        id: "123e4567-e89b-12d3-a456-426614174000",
   *        source: "123e4567-e89b-12d3-a456-426614174001",
   *        target: "123e4567-e89b-12d3-a456-426614174002",
   *        coordinates: {
   *          start: { x: 1, y: 1 },
   *          end: { x: 2, y: 2 },
   *        },
   *     },
   *   ],
   * };
   *
   * const graph = new Graph<IGraph>().import(data);
   *
   * console.log(graph.domain);
   * // { x: { min: 1, max: 2 }, y: { min: 1, max: 2 } }
   * ```
   *
   * @returns An object containing `x` and `y` ranges, each with `min` and `max` values.
   * @category Data
   */
  public get domain(): {
    x: { min: number; max: number };
    y: { min: number; max: number };
  } {
    return this.nodes.length === 0
      ? { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }
      : {
          x: {
            min: Math.min(
              ...this.nodes.map(({ coordinates }) => coordinates.x)
            ),
            max: Math.max(
              ...this.nodes.map(({ coordinates }) => coordinates.x)
            ),
          },
          y: {
            min: Math.min(
              ...this.nodes.map(({ coordinates }) => coordinates.y)
            ),
            max: Math.max(
              ...this.nodes.map(({ coordinates }) => coordinates.y)
            ),
          },
        };
  }

  /**
   * Computes the spatial extent of the graph in coordinate space.
   * This is derived from the {@link Graph.domain} and reflects the number of discrete
   * coordinate units required to fully enclose all nodes — including both endpoints.
   *
   * If the graph contains no nodes, the extent is `{ x: 0, y: 0 }`.
   * If the graph contains a single node, the extent is `{ x: 1, y: 1 }`,
   * as the graph still occupies one unit in both directions.
   *
   * The result is useful for layout, rendering, and grid-based visualization systems
   * where the number of occupied coordinate units matters.
   *
   * @example
   * ```ts
   * const data = {
   *   metadata: {
   *     id: "123e4567-e89b-12d3-a456-426614174000",
   *     name: "Clinical Pathway",
   *   },
   *   nodes: [
   *     {
   *       id: "123e4567-e89b-12d3-a456-426614174001",
   *       coordinates: { x: 1, y: 1 },
   *     },
   *     {
   *       id: "123e4567-e89b-12d3-a456-426614174002",
   *       coordinates: { x: 3, y: 3 },
   *     },
   *   ],
   *   edges: [
   *     {
   *       id: "123e4567-e89b-12d3-a456-426614174000",
   *       source: "123e4567-e89b-12d3-a456-426614174001",
   *       target: "123e4567-e89b-12d3-a456-426614174002",
   *       coordinates: {
   *         start: { x: 1, y: 1 },
   *         end: { x: 3, y: 3 },
   *       },
   *     },
   *   ],
   * };
   *
   * const graph = new Graph<IGraph>().import(data);
   *
   * console.log(graph.extend);
   * // { x: 3, y: 3 } → includes both 1 and 3, so: (3 - 1 + 1)
   * ```
   *
   * @returns An object with `x` and `y` representing the inclusive span of the graph’s domain.
   * @category Data
   */
  public get extend() {
    if (this.nodes.length === 0) {
      return { x: 0, y: 0 };
    }

    const { x, y } = this.domain;
    return {
      x: x.max - x.min + 1,
      y: y.max - y.min + 1,
    };
  }

  /**
   * Imports new graph data by merging with existing data.
   *
   * @param {Partial<T>} graph - The graph data to import.
   * Merges metadata, nodes, and edges if they are provided.
   *
   * @returns {this} The updated graph instance.
   * @category Operation
   */
  public import = (graph) => this._import(graph);

  /**
   * Exports the graph data as a JSON-compatible object.
   *
   * @returns {T} A JSON-like object representing the graph's metadata, nodes, and edges.
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
    this.edges.findByTarget(id).length +
    this.edges.findBySource(id).length;

  /**
   * Returns the in-degree: number of incoming connections, of a node.
   * @param id - The id of the node.
   * @returns The in-degree of the node.
   *
   * @category Operation
   */
  public in = (id: UUID): number =>
    this.edges.findByTarget(id).length;

  /**
   * Returns the out-degree: number of outgoing connections, of a node.
   * @param id  - The id of the node.
   * @returns The out-degree of the node.
   * @category Operation
   */
  public out = (id: UUID): number =>
    this.edges.findBySource(id).length;

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

  public trajectories = (origin: UUID, destination: UUID) => {
    const results = [];
    this.traverse(origin, destination, results);
    return results;
  };

  private traverse = (
    node: UUID,
    destination: UUID,
    results: any[],
    stack: any[] = [],
    visited: Set<UUID> = new Set()
  ) =>
    node === destination
      ? results.push([...stack])
      : this.edges.findBySource(node).forEach((edge) => {
          if (visited.has(edge.target)) return;

          stack.push(edge);
          visited.add(edge.target);

          this.traverse(
            edge.target,
            destination,
            results,
            stack,
            visited
          );

          visited.delete(edge.target);
          stack.pop();
        });

  protected _import = (graph) => {
    ((graph) => {
      graph.metadata && this.metadata.add(graph.metadata);
      graph.nodes && this.nodes.add(graph.nodes);
      graph.edges && this.edges.add(graph.edges);
    })(Validate.graphDetails(graph));
    return this;
  };

  private getEdges = (id: UUID) =>
    this.edges.filter(
      ({ source, target }) => source === id || target === id
    );
}
