import { INode } from "./Node.js";

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
  public static create = <T extends INode>(node?: T): Nodes<T> & T =>
    new Nodes<T>(node) as Nodes<T> & T;

  constructor(node?: T) {
    super();
  }
}
