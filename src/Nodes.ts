import { type INode } from "./Node.js";
import { Validate } from "./validations/Validate.js";
import { Validator } from "./validations/Validator.js";
import { Utilities } from "./utilities/Utilities.js";
import { type UUID } from "./Graph.types.js";

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

  /**
   * Adds new nodes to the `Nodes` collection while ensuring unique IDs and coordinates.
   * If a node does not have an `id`, it will be automatically assigned one.
   *
   * @template N - A type extending `T` or an object omitting the `id` field.
   * @param {N | N[]} nodes - A single node or an array of nodes to be added.
   * @throws {Error} If a node with the same ID or coordinates already exists in the collection.
   * @returns {Nodes<T>} The modified `Nodes<T>` instance, allowing method chaining.
   */
  public add = <N extends T | Omit<T, "id">>(nodes: N | N[]): Nodes<T> => {
    this.push(
      ...this.validate(Utilities.idify<T>(Utilities.toArray<N>(nodes)))
    );
    return this;
  };

  /**
   * Removes a node from the `Nodes` by its id or throw NotFoundException.
   *
   * @param {UUID} id - The id of the node to be removed.
   * @throws {NotFoundException} If the node with the given ID does not exist in the collection.
   * @returns {Nodes<T>} The modified `Nodes<T>` instance, allowing method chaining.
   *
   */
  public remove = (id: UUID): Nodes<T> => {
    this.splice(Validate.id<T>(this, id), 1);
    return this;
  };

  /**
   * Searches for a node in the `Nodes` collection using its unique identifier.
   *
   * @param {UUID} id - The unique identifier of the node to find.
   * @returns {T | undefined} The matching node if found, otherwise `undefined`.
   *
   * @example
   * ```typescript
   * const data = [
   *     {
   *         id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
   *         coordinates: { x: 0, y: 0 },
   *     }];
   * const nodes = Nodes.create(data);
   *
   * const node = nodes.findById("d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d");
   * console.log(node); // { id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d", coordinates: { x: 0, y: 0 } }
   * ```
   */
  public findById = (id: UUID): T | undefined =>
    ((id) => this.find((node) => node.id === id))(Validate.uuid(id));

  public findByCoordinates = (coordinates: T["coordinates"]): T | undefined =>
    this.find((node) => node.coordinates === coordinates);

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
