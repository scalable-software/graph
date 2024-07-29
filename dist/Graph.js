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
    constructor() {
        this.nodes = new Nodes();
        this.connections = new Connections();
    }
    create = (details) => {
        this.metadata = {
            id: Utilities.uuid,
            name: details.name,
            type: details.type,
        };
    };
    add = (data) => {
        this.metadata = data.metadata;
        this.nodes.add(data.nodes);
        this.connections.add(data.connections);
    };
    retrieve = () => ({
        metadata: this.metadata,
        nodes: [...this.nodes],
        connections: [...this.connections],
    });
}
