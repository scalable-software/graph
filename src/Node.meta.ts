import { UUID } from "./Utilities/Utilities.js";

export const StructureTypes = ["object", "tuple"] as const;
export type StructureType = (typeof StructureTypes)[number];

export const NodeTypes = [
  "start",
  "workflow",
  "delay",
  "end",
  "decision",
] as const;
export type NodeType = (typeof NodeTypes)[number];

export type Icon = string;

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

export type Coordinates = {
  x: number;
  y: number;
};

export type Node = {
  id: UUID;
  name: string;
  type: NodeType;
  coordinates: Coordinates;
  icon?: Icon;
  metadata?: Metadata[];
};
export type Nodes = Node[];
