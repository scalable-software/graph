import { ObjectNodeType } from "./ObjectNode.meta.js";
import { TupleNodeType } from "./TupleNode.meta.js";

export const StructureTypes = ["object", "tuple"] as const;
export type StructureType = (typeof StructureTypes)[number];

export type Icon = string;

export const NodeTypes = [
  "start",
  "workflow",
  "delay",
  "end",
  "decision",
] as const;
export type NodeType = (typeof NodeTypes)[number];

export type Node = ObjectNodeType | TupleNodeType;
export type Nodes = Node[];

export type Arrival = {
  distribution: string;
  parameters: { rate: number }[];
};
export type Duration = {
  distribution: string;
  parameters: { meanlog: number; sdlog?: number }[];
};
export type Prevalence = { target: string; probability: number }[];

export type Metadata = {
  arrival?: Arrival;
  duration?: Duration;
  prevalence?: Prevalence;
};
