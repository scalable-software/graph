import { UUID } from "./Utilities/Utilities.js";
export declare const GraphType: {
    readonly PIPELINE: "pipeline";
    readonly PATHWAY: "pathway";
    readonly WORKFLOW: "workflow";
};
export type GraphType = (typeof GraphType)[keyof typeof GraphType];
export type GraphMetadata = {
    id: UUID;
    name: string;
    type: GraphType;
};
export type GraphDetails = {
    name: string;
    type: GraphType;
};
export declare class Graph {
    metadata: GraphMetadata;
    nodes: any;
    connections: any;
    constructor(metadata: GraphDetails);
}
