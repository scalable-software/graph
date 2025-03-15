/**
 * A graph is a data structure that:
 * - has {@link Nodes}
 * - contains contains nodes and edges.
 *
 * Extension with new properties is supported.
 * @module Graph
 */

import { Node, type INode } from "./Node.js";
import { Validate } from "./validations/Validate.js";
import { Validator } from "./validations/Validator.js";
import { Utilities } from "./utilities/Utilities.js";
import type { UUID, Coordinates, Offset } from "./Graph.types.js";

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
    new Nodes<T>(...Nodes.normalize<T>(nodes)) as Nodes<T> & T;

  private static defaults = <T extends INode>(): T[] => [];

  private static normalize = <T extends INode>(nodes?: T[]): T[] =>
    nodes ? Validate.nodes(nodes) : Nodes.defaults();

  private _immutable = true;

  /**
   * Typescript constructors cannot return a value other than the class.
   * As a workaround to support proper types, we must use a static factory method
   */
  private constructor(...nodes: T[]) {
    super(...nodes);
  }

  /**
   * A flag indicating whether to give precedence to performance or memory usage.
   * - `true`, the nodes in the collection is immutable: operations return new instances of a nodes.
   * - `false`, the nodes in the collection is mutable: operations modify the instance in place.
   */
  get immutable(): boolean {
    return this._immutable;
  }
  set immutable(immutable: boolean) {
    this._immutable = Validate.flag(immutable);
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
  public add = (nodes: T | Omit<T, "id"> | (T | Omit<T, "id">)[]): Nodes<T> => {
    ((nodes) => this.push(...nodes))(this.validate(Utilities.normalize(nodes)));
    return this;
  };

  /**
   * Updates a node in the `Nodes` collection by applying partial updates to its properties.
   * If the node is not found, an error is thrown.
   *
   * @param {UUID} id - The unique identifier of the node to update.
   * @param {Partial<T>} patch - An object containing the properties to update.
   * @returns {Nodes<T>} The modified `Nodes<T>` instance, allowing method chaining.
   */
  public update = (id: UUID, details: Partial<T>): Nodes<T> => {
    ((id, details) => this.apply(id, (node) => Node.update(node, details)))(
      Validate.id(this, id) as UUID,
      Validate.nodeDetails(details)
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
    ((id) => this.splice(this.index(id), 1))(Validate.id(this, id) as UUID);
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

  /**
   * Searches for a node in the `Nodes` collection using its coordinates.
   *
   * @param {Coordinates} coordinates - The coordinates of the node to find.
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
   * const node = nodes.findByCoordinates({ x: 0, y: 0 });
   * console.log(node); // { id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d", coordinates: { x: 0, y: 0 } }
   * ```
   */
  public findByCoordinates = (coordinates: Coordinates): T | undefined =>
    ((coordinates) =>
      this.find(
        (node) =>
          node.coordinates.x === coordinates.x &&
          node.coordinates.y === coordinates.y
      ))(Validate.coordinates(coordinates));

  /**
   * Move a node to a new position.
   *
   * @param {UUID} id - The unique identifier of the node to move.
   * @param {Coordinates} coordinates - The new coordinates of the node.
   * @returns {Nodes<T>} The modified `Nodes<T>` instance, allowing method chaining.
   */
  public move = (id: UUID, coordinates: Coordinates): Nodes<T> => {
    ((id, coordinates) =>
      this.apply(id, (node) => Node.move(node, coordinates)))(
      Validate.id(this, id) as UUID,
      Validate.coordinates(coordinates)
    );
    return this;
  };

  /**
   * Translates the nodes in the collection by the specified offset.
   *
   * @param {UUID | UUID[]} targets - The unique identifier(s) of the node(s) to be translated.
   * @param {Offset} offset - The offset to apply to the node(s).
   * @returns {Nodes<T>} The modified `Nodes<T>` instance, allowing method chaining.
   */
  public translate = (id: UUID | UUID[], offset: Offset): Nodes<T> => {
    ((id, offset) =>
      Utilities.toArray(id).forEach((id) =>
        this.apply(id, (node) => Node.translate(node, offset))
      ))(Validate.id(this, id), Validate.offset(offset));
    return this;
  };

  /**
   * Converts the `Nodes` collection into a JSON-compatible array.
   *
   * @returns {T[]} An array representation of the nodes.
   */
  public toJSON = (): T[] => [...this];

  private index = (id: UUID): number => Utilities.Index.byId<T>(this, id);

  private node = (id: UUID): T => this.at(Utilities.Index.byId<T>(this, id));

  private clone = ({ id }: T, updatedNode: T): T =>
    (this[this.index(id)] = updatedNode);

  private mutate = (node: T, updatedNode: T): T =>
    Object.assign(node, updatedNode);

  private apply = (id: UUID, transform: (node: T) => T): T =>
    ((node) =>
      this.immutable
        ? this.clone(node, transform(node))
        : this.mutate(node, transform(node)))(this.node(id));

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
