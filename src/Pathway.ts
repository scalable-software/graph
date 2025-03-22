/**
 * This data is a sample from a real-world case of a patient pathway in the context of Acute Coronary Syndrome (ACS) diagnosis.
 * The pathway is a simplified version of the ACS diagnostic pathway, which is a complex process that involves multiple steps and actors.:
 * @module Extension
 */

import { Graph } from "./Graph.js";
import { Nodes } from "./Nodes.js";
import { Edges } from "./Edges.js";

import { IPathway } from "./Pathway.types.js";

export class Pathway extends Graph<IPathway> {
  public get actors(): Nodes<IPathway["actors"][number]> {
    return this.nodes;
  }

  public get paths(): Edges<IPathway["paths"][number]> {
    return this.edges;
  }

  public import = ({
    metadata,
    actors: nodes,
    paths: edges,
  }: Partial<IPathway>) => this._import({ metadata, nodes, edges });

  public export = (): IPathway =>
    ({
      metadata: this.metadata.toJSON(),
      actors: this.nodes.toJSON(),
      paths: this.edges.toJSON(),
    } as IPathway);
}
