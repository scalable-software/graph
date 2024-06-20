import { ObjectNode } from "./ObjectNode.js";
import { TupleNode } from "./TupleNode.js";
export type NodeFactory = typeof ObjectNode | typeof TupleNode;
import { ObjectConnection } from "./ObjectConnection.js";
import { TupleConnection } from "./TupleConnection.js";
export type ConnectionFactory = typeof ObjectConnection | typeof TupleConnection;
