/**
 * This data is a sample from a real-world case of a patient pathway in the context of Acute Coronary Syndrome (ACS) diagnosis.
 * The pathway is a simplified version of the ACS diagnostic pathway, which is a complex process that involves multiple steps and actors.:
 * @module Extension
 */

import { Graph, type PartialGraph } from "./graph.js";
import { Nodes } from "./nodes.js";
import { Edges } from "./edges.js";

import { IPathway } from "./pathway.types.js";

export class Pathway extends Graph<IPathway> {
  public get actors(): Nodes<NonNullable<IPathway["actors"]>[number]> {
    return this.nodes;
  }

  public get paths(): Edges<NonNullable<IPathway["paths"]>[number]> {
    return this.edges;
  }

  public import = ({
    metadata,
    actors: nodes,
    paths: edges,
  }: PartialGraph<IPathway> & Partial<Pick<IPathway, "actors" | "paths">>) =>
    this._import({ metadata, nodes, edges });

  public export = (): IPathway =>
    ({
      metadata: this.metadata.toJSON(),
      actors: this.nodes.toJSON(),
      paths: this.edges.toJSON(),
    } as IPathway);
}
