/**
 * @module Graph
 */

/**
 * A UUID is a 128-bit number used to identify information in computer systems.
 * @example
 * ```ts
 * const uuid: UUID = "123e4567-e89b-12d3-a456-426614174000";
 * ```
 */
export type UUID = string & { __uuid?: never };

/**
 * A Name is a string used to identify the any name used for and in a graph data structure.
 * @example
 * ```ts
 * const name: Name = "Graph Name";
 * ```
 */
export type Name = string & { __name?: never };

/**
 * Graph contains Nodes and Edges located at specific Coordinates.
 * @example
 * ```ts
 * const coordinates: Coordinates = { x: 0, y: 0 };
 * ```
 */
export type Coordinates = {
  x: number;
  y: number;
};
