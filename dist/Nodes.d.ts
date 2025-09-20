/**
 * @module Graph
 */
import { type INode } from "./node.js";
import type { UUID, Coordinates, Offset } from "./graph.types.js";
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
 */ export declare class Nodes<T extends INode> extends Array<T> {
    /**
     * Each node can be accessed via index notation.
     *
     * @param {number} n - The index of the node to export.
     * @returns {T} The node at the specified index.
     *
     * @example
     * ```typescript
     * const nodes = Nodes.create([node]);
     * nodes[0]; // node
     * ```
     */
    [n: number]: T;
    /**
     *
     * Factory method used to create a new instance of an container of nodes.
     *
     * @param nodes object with minimum properties of an INode.
     * @returns A new Nodes instance.
     *
     * @category Factory
     */
    static create: <T_1 extends INode>(nodes?: T_1[] | null) => Nodes<T_1>;
    private static defaults;
    private static normalize;
    private _immutable;
    /**
     * Typescript constructors cannot return a value other than the class.
     * As a workaround to support proper types, we must use a static factory method
     * @category Factory
     */
    private constructor();
    /**
     * A flag indicating whether to give precedence to performance or memory usage.
     * - `true`, the nodes in the collection is immutable: operations return new instances of a nodes.
     * - `false`, the nodes in the collection is mutable: operations modify the instance in place.
     *
     * @category Configuration
     */
    get immutable(): boolean;
    set immutable(immutable: boolean);
    get geometric(): boolean;
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
    add: (nodes: T | Omit<T, "id"> | (T | Omit<T, "id">)[]) => Nodes<T>;
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
    update: (id: UUID, details: Partial<T>) => Nodes<T>;
    /**
     * Removes a node from the `Nodes` by its id or throw NotFoundException.
     *
     * @param {UUID} id - The id of the node to be removed.
     * @throws {NotFoundException} If the node with the given ID does not exist in the collection.
     * @returns {Nodes<T>} The modified `Nodes<T>` instance, allowing method chaining.
     *
     * @category Operations
     */
    remove: (id: UUID) => Nodes<T>;
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
    findById: (id: UUID) => T | undefined;
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
    findByCoordinates: (coordinates: Coordinates) => T | undefined;
    /**
     * Move a node to a new position.
     *
     * @param {UUID} id - The unique identifier of the node to move.
     * @param {Coordinates} coordinates - The new coordinates of the node.
     * @returns {Nodes<T>} The modified `Nodes<T>` instance, allowing method chaining.
     *
     * @category Operations
     */
    move: (id: UUID, coordinates: Coordinates) => Nodes<T>;
    /**
     * Translates the nodes in the collection by the specified offset.
     *
     * @param {UUID | UUID[]} id - The unique identifier(s) of the node(s) to be translated.
     * @param {Offset} offset - The offset to apply to the node(s).
     * @returns {Nodes<T>} The modified `Nodes<T>` instance, allowing method chaining.
     *
     * @category Operations
     */
    translate: (id: UUID | UUID[], offset: Offset) => Nodes<T>;
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
    project: (transform?: (coordinates: Coordinates, node?: T) => Coordinates) => T[];
    /**
     * Converts the `Nodes` collection into a JSON-compatible array.
     *
     * @returns {T[]} An array representation of the nodes.
     *
     * @category Operations
     */
    toJSON: () => T[];
    private index;
    private node;
    private assign;
    private apply;
    private validate;
}
