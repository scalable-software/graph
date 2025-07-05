/**
 * A {@link Graph} is a data structure that:
 * - has {@link Metadata}
 * - contains {@link Nodes}
 * - contains {@link Edges}
 *
 * Extension with new properties is supported.
 * @module Graph
 */
import { Metadata } from "./Metadata.js";
import { Nodes } from "./Nodes.js";
import { Edges } from "./Edges.js";
import { Validate } from "./Index.js";
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
export class Graph {
    /**
     * The graph's metadata containing details such as `id` and `name`.
     * @category Data
     */
    metadata;
    /**
     * A collection of nodes representing entities within the graph.
     * @category Data
     */
    nodes;
    /**
     * A collection of edges defining connections between nodes.
     * @category Data
     */
    edges;
    /**
     * Creates a new instance of the `Graph`.
     *
     * @param {Partial<T>} [graph] - Optional initial data for metadata, nodes, and edges.
     * Ensures that provided data is validated before being assigned.
     * @category Factory
     */
    constructor(graph) {
        ((graph) => {
            this.metadata = graph?.metadata
                ? Metadata.create(graph.metadata)
                : Metadata.create();
            this.nodes = graph?.nodes
                ? Nodes.create(graph.nodes)
                : Nodes.create();
            this.edges = graph?.edges
                ? Edges.create(graph.edges)
                : Edges.create();
        })(Validate.graph(graph));
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
    import = (graph) => this._import(graph);
    /**
     * Exports the graph data as a JSON-compatible object.
     *
     * @returns {T} A JSON-like object representing the graph's metadata, nodes, and edges.
     * @category Operation
     */
    export = () => ({
        metadata: this.metadata.toJSON(),
        nodes: this.nodes.toJSON(),
        edges: this.edges.toJSON(),
    });
    /**
     * Export the graph data structure into a graph in JSON format.
     * @returns The graph in JSON format.
     * @category Operation
     */
    toJSON = () => this.export();
    /**
     * Returns the degree: number of connections, of a node.
     * @param id - The id of the node.
     * @returns The degree of the node.
     *
     * @category Operation
     */
    degree = (id) => this.edges.findByTarget(id).length + this.edges.findBySource(id).length;
    /**
     * Returns the in-degree: number of incoming connections, of a node.
     * @param id - The id of the node.
     * @returns The in-degree of the node.
     *
     * @category Operation
     */
    in = (id) => this.edges.findByTarget(id).length;
    /**
     * Returns the out-degree: number of outgoing connections, of a node.
     * @param id  - The id of the node.
     * @returns The out-degree of the node.
     * @category Operation
     */
    out = (id) => this.edges.findBySource(id).length;
    /**
     * Returns the ids of the neighbors of a node.
     * @param id - The id of the node.
     * @returns The ids of the neighbors of the node.
     * @category Operation
     */
    neighbors = (id) => [
        ...new Set(this.getEdges(id).flatMap(({ source, target }) => source === id ? [target] : [source])),
    ];
    _import = (graph) => {
        ((graph) => {
            graph.metadata && this.metadata.add(graph.metadata);
            graph.nodes && this.nodes.add(graph.nodes);
            graph.edges && this.edges.add(graph.edges);
        })(Validate.graphDetails(graph));
        return this;
    };
    getEdges = (id) => this.edges.filter(({ source, target }) => source === id || target === id);
}
