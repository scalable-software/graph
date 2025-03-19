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
import { Validator } from "./validations/Validator.js";
import { Utilities } from "./utilities/Utilities.js";

export class Edges<T extends IEdge> extends Array<T> {
  public static create = <T extends IEdge>(edges?: T[] | null): Edges<T> =>
    new Edges<T>(...Edges.normalize<T>(edges)) as Edges<T>;

  private static defaults = <T extends IEdge>(): T[] => [];

  private static normalize = <T extends IEdge>(edges?: T[]): T[] =>
    edges ? Validate.edges(edges) : Edges.defaults();

  private _immutable = true;

  constructor(...edges: T[]) {
    super(...edges);
  }

  /**
   * A flag indicating whether to give precedence to performance or memory usage.
   * - `true`, the nodes in the collection is immutable: operations return new instances of a nodes.
   * - `false`, the nodes in the collection is mutable: operations modify the instance in place.
   *
   * @category Configuration
   */
  get immutable(): boolean {
    return this._immutable;
  }
  set immutable(immutable: boolean) {
    this._immutable = Validate.flag(immutable);
  }

  /**
   * Adds new edges to the `Edges` collection while ensuring unique IDs.
   * If a edge does not have an `id`, it will be automatically assigned one.
   *
   * @param edges - A single edge or an array of edges to add.
   * @throws {Error} If a edges with the same ID already exists in the collection.
   * @returns {Edges<T>} The modified `Edges<T>` instance, allowing method chaining.
   *
   * @category Operations
   */
  public add = (edges: T | Omit<T, "id"> | (T | Omit<T, "id">)[]): Edges<T> => {
    ((nodes) => this.push(...nodes))(
      this.validate(Utilities.normalize(Validate.notNull(edges)))
    );
    return this;
  };

  public update = () => {};

  private validate = (edges: T[]): T[] =>
    ((edges) =>
      Validator.compare(
        [this, edges],
        [(sets) => Validate.distinct(sets, (edge) => edge.id)]
      ))(Validate.edges<T>(edges));
}
