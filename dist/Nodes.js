/**
 * @module Graph
 */
import { Node } from "./node.js";
import { Validate } from "./validations/validate.js";
import { Validator } from "./validations/validator.js";
import { Utilities } from "./utilities/utilities.js";
/**
 * Provides a container for managing a collection of nodes with support for:
 * - Unique identifiers for each node.
 * - Coordinate-based positioning for visual representation.
 * - Immutability control for performance or memory optimization.
 *
 * Supports flexible node structures with custom properties by extending the base `INode`.
 *
 * ```ts
 * const nodes = Nodes
 *   .create([
 *     { id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d", coordinates: { x: 0, y: 0 }},
 *     { id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5", coordinates: { x: 1, y: 1 }},
 *   ])
 *
 * const data = nodes.toJSON();
 * console.log(data);
 *
 * // [
 * //   { id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d", coordinates: { x: 0, y: 0 }},
 * //   { id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5", coordinates: { x: 1, y: 1 }},
 * // ]
 * ```
 *
 * @template T Extends the base {@link INode} type for enhanced flexibility.
 */ export class Nodes extends Array {
    /**
     *
     * Factory method used to create a new instance of an container of nodes.
     *
     * @param nodes object with minimum properties of an INode.
     * @returns A new Nodes instance.
     *
     * @category Factory
     */
    static create = (nodes) => new Nodes(...Nodes.normalize(nodes));
    static defaults = () => [];
    static normalize = (nodes) => nodes ? Validate.nodes(nodes) : Nodes.defaults();
    _immutable = true;
    /**
     * Typescript constructors cannot return a value other than the class.
     * As a workaround to support proper types, we must use a static factory method
     * @category Factory
     */
    constructor(...nodes) {
        super(...nodes);
    }
    /**
     * A flag indicating whether to give precedence to performance or memory usage.
     * - `true`, the nodes in the collection is immutable: operations return new instances of a nodes.
     * - `false`, the nodes in the collection is mutable: operations modify the instance in place.
     *
     * @category Configuration
     */
    get immutable() {
        return this._immutable;
    }
    set immutable(immutable) {
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
     *
     * @category Operations
     */
    add = (nodes) => {
        ((nodes) => this.push(...nodes))(((nodes) => this.validate(nodes))(((nodes) => Utilities.normalize(nodes))(Validate.notNull(nodes))));
        return this;
    };
    /**
     * Updates a node in the `Nodes` collection by applying partial updates to its properties.
     * If the node is not found, an error is thrown.
     *
     * @param {UUID} id - The unique identifier of the node to update.
     * @param {Partial<T>} details - An object containing the properties to update.
     * @returns {Nodes<T>} The modified `Nodes<T>` instance, allowing method chaining.
     *
     * @category Operations
     */
    update = (id, details) => {
        (([id, details]) => this.apply(id, (node) => Node.update(node, details)))(Validator.validate([id, details], [
            ([id, details]) => Validate.id(this, id),
            ([id, details]) => Validate.nodeDetails(details),
        ]));
        return this;
    };
    /**
     * Removes a node from the `Nodes` by its id or throw NotFoundException.
     *
     * @param {UUID} id - The id of the node to be removed.
     * @throws {NotFoundException} If the node with the given ID does not exist in the collection.
     * @returns {Nodes<T>} The modified `Nodes<T>` instance, allowing method chaining.
     *
     * @category Operations
     */
    remove = (id) => {
        ((id) => this.splice(this.index(id), 1))(Validate.id(this, id));
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
     * @category Operations
     */
    findById = (id) => ((id) => this.find((node) => node.id === id))(Validate.uuid(id));
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
     * @category Operations
     */
    findByCoordinates = (coordinates) => ((coordinates) => this.find((node) => node.coordinates.x === coordinates.x &&
        node.coordinates.y === coordinates.y))(Validate.coordinates(coordinates));
    /**
     * Move a node to a new position.
     *
     * @param {UUID} id - The unique identifier of the node to move.
     * @param {Coordinates} coordinates - The new coordinates of the node.
     * @returns {Nodes<T>} The modified `Nodes<T>` instance, allowing method chaining.
     *
     * @category Operations
     */
    move = (id, coordinates) => {
        (([id, coordinates]) => this.apply(id, (node) => Node.move(node, coordinates)))(Validator.validate([id, coordinates], [
            ([id, coordinates]) => Validate.id(this, id),
            ([id, coordinates]) => Validate.coordinates(coordinates),
        ]));
        return this;
    };
    /**
     * Translates the nodes in the collection by the specified offset.
     *
     * @param {UUID | UUID[]} id - The unique identifier(s) of the node(s) to be translated.
     * @param {Offset} offset - The offset to apply to the node(s).
     * @returns {Nodes<T>} The modified `Nodes<T>` instance, allowing method chaining.
     *
     * @category Operations
     */
    translate = (id, offset) => {
        (([id, offset]) => Utilities.toArray(id).forEach((id) => this.apply(id, (node) => Node.translate(node, offset))))(Validator.validate([id, offset], [
            ([id, offset]) => Validate.id(this, id),
            ([id, offset]) => Validate.offset(offset),
        ]));
        return this;
    };
    /**
     * Projects the nodes in the collection by applying a transformation function to their coordinates.
     *
     * @param {function} transform - A function that takes a node's coordinates and returns transformed coordinates.
     * @returns {T[]} An array of nodes with transformed coordinates.
     *
     * @example
     * ```typescript
     * const nodes = Nodes.create([{ id: "1", coordinates: { x: 0, y: 0 } }]);
     * const projectedNodes = nodes.project(({x,y}) => ({ x: x + 1, y: y + 1 }));
     * console.log(projectedNodes); // [{ id: "1", coordinates: { x: 1, y: 1 } }]
     * ```
     *
     * @category Operations
     */
    project = (transform = (coordinates) => coordinates) => [...this].map((node) => ({
        ...node,
        coordinates: transform(node.coordinates, node),
    }));
    /**
     * Converts the `Nodes` collection into a JSON-compatible array.
     *
     * @returns {T[]} An array representation of the nodes.
     *
     * @category Operations
     */
    toJSON = () => [...this];
    index = (id) => Utilities.Index.byId(this, id);
    node = (id) => this.at(Utilities.Index.byId(this, id));
    assign = (node, updatedNode) => this.immutable
        ? (this[this.index(node.id)] = updatedNode)
        : Object.assign(node, updatedNode);
    apply = (id, transform) => ((node) => this.assign(node, transform(node)))(this.node(id));
    validate = (nodes) => ((nodes) => Validator.compare([this, nodes], [
        (sets) => Validate.distinct(sets, (node) => node.id),
        (sets) => Validate.distinct(sets, (node) => node.coordinates),
    ]))(Validate.nodes(nodes));
}
