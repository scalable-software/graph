import { Node } from "./Node.js";
import { TupleNode } from "./TupleNode.js";
export type NodeFactory = typeof Node | typeof TupleNode;
import { ObjectConnection } from "./Connection.js";
import { TupleConnection } from "./TupleConnection.js";
export type ConnectionFactory =
  | typeof ObjectConnection
  | typeof TupleConnection;
