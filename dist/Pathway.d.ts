/**
 * This data is a sample from a real-world case of a patient pathway in the context of Acute Coronary Syndrome (ACS) diagnosis.
 * The pathway is a simplified version of the ACS diagnostic pathway, which is a complex process that involves multiple steps and actors.:
 * @module Extension
 */
import { Graph } from "./graph.js";
import { Nodes } from "./nodes.js";
import { Edges } from "./edges.js";
import { IPathway } from "./pathway.types.js";
export declare class Pathway extends Graph<IPathway> {
    get actors(): Nodes<IPathway["actors"][number]>;
    get paths(): Edges<IPathway["paths"][number]>;
    import: ({ metadata, actors: nodes, paths: edges, }: Partial<IPathway>) => this;
    export: () => IPathway;
}
