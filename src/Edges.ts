/**
 * A graph is a data structure that:
 * - has {@link Edges}
 * - contains contains nodes and edges.
 *
 * Extension with new properties is supported.
 * @module Graph
 */

import { IEdge } from "./Edge.js";
import { Validate } from "./validations/Validate.js";

export class Edges<T extends IEdge> extends Array<T> {
  public static create = <T extends IEdge>(edges?: T[] | null): Edges<T> =>
    new Edges<T>(...Edges.normalize<T>(edges)) as Edges<T>;

  private static defaults = <T extends IEdge>(): T[] => [];

  private static normalize = <T extends IEdge>(edges?: T[]): T[] =>
    edges ? Validate.edges(edges) : Edges.defaults();

  constructor(...edges: T[]) {
    super(...edges);
  }

  public add = (edges: T): Edges<T> => {
    this.push(Validate.notNull(edges));
    return this;
  };
}
