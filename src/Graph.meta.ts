import { ObjectType } from "./ObjectType.js";
import { TupleType } from "./TupleType.js";
export type NodeFactory = typeof ObjectType | typeof TupleType;
