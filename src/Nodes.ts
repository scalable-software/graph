import { type INode } from "./Node.js";
import { Validate } from "./validations/Validate.js";
import { Validator } from "./validations/Validator.js";
import { Utilities } from "./utilities/Utilities.js";

export class Nodes<T extends INode> extends Array<T> {
  /**
   *
   * Factory method used to create a new instance of an container of nodes.
   *
   * @param node object with minimum properties of an INode.
   * @returns A new Nodes instance.
   *
   * @category Factory
   */
  public static create = <T extends INode>(nodes?: T[] | null): Nodes<T> & T =>
    new Nodes<T>(...this.normalize<T>(nodes)) as Nodes<T> & T;

  private static defaults = <T extends INode>(): T[] => [];

  private static normalize = <T extends INode>(nodes?: T[]): T[] =>
    nodes ? Validate.nodes<T>(nodes) : Nodes.defaults<T>();

  constructor(...nodes: T[]) {
    super(...nodes);
  }

  public add = <N extends T | Omit<T, "id">>(nodes: N | N[]): Nodes<T> => {
    this.push(...this.validate(Utilities.idify(Utilities.toArray<N>(nodes))));
    return this;
  };

  private validate = (nodes: T[]): T[] =>
    ((nodes) =>
      Validator.compare(
        [this, nodes],
        [
          (sets) => Validate.distinct(sets, (node) => node.id),
          (sets) => Validate.distinct(sets, (node) => node.coordinates),
        ]
      ))(Validate.nodes<T>(nodes));
}
