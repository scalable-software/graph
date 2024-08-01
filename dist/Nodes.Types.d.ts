import { type UUID } from "./Utilities/Utilities.js";
import { type Coordinates } from "./Graph.Types.js";
export declare const NodeType: {
    readonly START: "start";
    readonly WORKFLOW: "workflow";
    readonly DELAY: "delay";
    readonly END: "end";
    readonly DECISION: "decision";
};
export type NodeType = (typeof NodeType)[keyof typeof NodeType];
export type Node = {
    id: UUID;
    type: NodeType;
    name: string;
    coordinates: Coordinates;
};
