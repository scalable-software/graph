import { ObjectConnectionType } from "./ObjectConnection.meta.js";
import { TupleConnectionType } from "./TupleConnection.meta.js";
export type Connection = ObjectConnectionType | TupleConnectionType;
export type Connections = Connection[];
