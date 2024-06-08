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
