import { ObjectNode } from "./ObjectNode.js";
import { TupleNode } from "./TupleNode.js";
export type NodeFactory = typeof ObjectNode | typeof TupleNode;
