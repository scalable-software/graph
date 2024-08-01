import { type UUID } from "./Utilities/Utilities.js";
import { type Coordinates } from "./Graph.Types.js";

export const NodeType = {
  START: "start",
  WORKFLOW: "workflow",
  DELAY: "delay",
  END: "end",
  DECISION: "decision",
} as const;
export type NodeType = (typeof NodeType)[keyof typeof NodeType];

export type Node = {
  id: UUID;
  type: NodeType;
  name: string;
  coordinates: Coordinates;
};
