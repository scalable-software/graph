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
