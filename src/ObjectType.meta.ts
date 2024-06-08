import { UUID } from "./Utilities/Utilities.js";

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

export type ObjectCoordinates = {
  x: number;
  y: number;
};

export type ObjectNode = {
  id: UUID;
  name: string;
  type: NodeType;
  coordinates: ObjectCoordinates;
  icon?: Icon;
  metadata?: Metadata[];
};
