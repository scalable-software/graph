/**
 * A graph is a data structure that:
 * - has {@link Edges}
 * - contains contains nodes and edges.
 *
 * Extension with new properties is supported.
 * @module Graph
 */

import { IEdge } from "./Edge.js";

export class Edges<T extends IEdge> extends Array<T> {}
