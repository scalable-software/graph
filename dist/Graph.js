import { Connections } from "./Connections.js";
import { Nodes } from "./Nodes.js";
import { Utilities } from "./Utilities/Utilities.js";
export const GraphType = {
    PIPELINE: "pipeline",
    PATHWAY: "pathway",
    WORKFLOW: "workflow",
};
export class Graph {
    metadata;
    nodes;
    connections;
    constructor(metadata) {
        this.nodes = new Nodes();
        this.connections = new Connections();
        this.metadata = {
            id: Utilities.uuid,
            name: metadata.name,
            type: metadata.type,
        };
    }
}
