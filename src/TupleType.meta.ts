import { UUID } from "./Utilities/Utilities.js";
import { Metadata } from "./Metadata.js";

export const NodeTypes = [
  "start",
  "workflow",
  "delay",
  "end",
  "decision",
] as const;
export type NodeType = (typeof NodeTypes)[number];

export type Icon = string;

export type TupleCoordinates = [number, number];
export type TupleNode = [
  UUID,
  string,
  NodeType,
  TupleCoordinates,
  Icon?,
  Metadata[]?
];
