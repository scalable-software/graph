import { Utilities } from "./Utilities/Utilities.js";
export const NodeType = {
    START: "start",
    WORKFLOW: "workflow",
    DELAY: "delay",
    END: "end",
    DECISION: "decision",
};
export const NodeMetadataType = {
    ARRIVAL: "arrival",
    DURATION: "duration",
    PREVALENCE: "prevalence",
};
export const GraphType = {
    PIPELINE: "pipeline",
    PATHWAY: "pathway",
    WORKFLOW: "workflow",
};
// Operations on Graph takes nodes as first argument to enable performance testing
// Once performance testing is done, we can refactor to use a class instance
// Also operations can return this to enable fluent interface
export class Graph {
    static createNode = ({ name, type, coordinates, icon }) => ({
        id: Utilities.uuid,
        name,
        type,
        coordinates,
        icon,
    });
    static createConnection = ({ name, source, target, coordinates, }) => ({
        id: Utilities.uuid,
        name,
        source,
        target,
        coordinates,
    });
    static addNodeMetadata = (node, metadata) => ({
        ...node,
        metadata: node.metadata ? [...node.metadata, metadata] : [metadata],
    });
    // Potential refactor to retain the same Id
    static updateNode = (node, update) => update;
    // Potential refactor to retain the same Id
    static updateConnection = (connection, update) => update;
    static updateNodeMetadata = (node, metadata) => {
        let key = Object.keys(metadata)[0];
        node.metadata = node.metadata.map((node) => (node[key] ? metadata : node));
        return node;
    };
    static updateNodeIcon = (node, icon) => ({
        ...node,
        icon,
    });
    static updateNodeCoordinates = (node, coordinates) => ({
        ...node,
        coordinates,
    });
    static updateConnectionCoordinates = (connection, coordinates) => ({
        ...connection,
        coordinates,
    });
    static translateNode = (node, offset) => {
        node.coordinates = {
            x: node.coordinates.x + offset.x,
            y: node.coordinates.y + offset.y,
        };
        return node;
    };
    static translateConnection = (connection, offset) => {
        connection.coordinates = {
            start: {
                x: connection.coordinates.start.x + offset.x,
                y: connection.coordinates.start.y + offset.y,
            },
            end: {
                x: connection.coordinates.end.x + offset.x,
                y: connection.coordinates.end.y + offset.y,
            },
        };
        return connection;
    };
    static removeNodeMetadata = (node, type) => {
        node.metadata = node.metadata.filter((metadata) => metadata[type] === undefined);
        return node;
    };
    metadata;
    nodes = [];
    connections = [];
    constructor(metadata) {
        this.metadata = {
            id: Utilities.uuid,
            name: metadata.name,
            type: metadata.type,
        };
    }
    createNodes = (qty, details) => Array.from({ length: qty }, () => Graph.createNode(details));
    createConnections = (qty, details) => Array.from({ length: qty }, () => Graph.createConnection(details));
    addNode = (details) => (this.nodes = [...this.nodes, Graph.createNode(details)]);
    addConnection = (details) => (this.connections = [...this.connections, Graph.createConnection(details)]);
    addNodes = (newNodes) => (this.nodes = [...this.nodes, ...newNodes]);
    addConnections = (newConnections) => (this.connections = [...this.connections, ...newConnections]);
    addNodeMetadata = (id, metadata) => (this.nodes = this.nodes.map((node) => node.id === id ? Graph.addNodeMetadata(node, metadata) : node));
    updateNodeMetadata = (id, metadata) => (this.nodes = this.nodes.map((node) => node.id === id ? Graph.updateNodeMetadata(node, metadata) : node));
    updateNodeCoordinates = (id, coordinates) => (this.nodes = this.nodes.map((node) => node.id === id ? Graph.updateNodeCoordinates(node, coordinates) : node));
    updateConnectionCoordinates = (id, coordinates) => (this.connections = this.connections.map((connection) => connection.id === id
        ? Graph.updateConnectionCoordinates(connection, coordinates)
        : connection));
    updateNodeIcon = (id, icon) => (this.nodes = this.nodes.map((node) => node.id === id ? Graph.updateNodeIcon(node, icon) : node));
    updateNode = (id, update) => (this.nodes = this.nodes.map((node) => node.id === id ? Graph.updateNode(node, update) : node));
    updateConnection = (id, update) => (this.connections = this.connections.map((connection) => connection.id === id
        ? Graph.updateConnection(connection, update)
        : connection));
    findNodeById = (id) => this.nodes.find((node) => node.id === id);
    findConnectionById = (id) => this.connections.find((connection) => connection.id === id);
    findNodesByType = (type) => this.nodes.filter((node) => node.type === type);
    findNodeByCoordinates = ({ x, y }) => this.nodes.find(({ coordinates }) => coordinates.x === x && coordinates.y === y);
    translateNode = (id, offset) => (this.nodes = this.nodes.map((node) => node.id === id ? Graph.translateNode(node, offset) : node));
    translateConnection = (id, offset) => (this.connections = this.connections.map((connection) => connection.id === id
        ? Graph.translateConnection(connection, offset)
        : connection));
    removeNodeMetadata = (id, type) => (this.nodes = this.nodes.map((node) => node.id === id ? Graph.removeNodeMetadata(node, type) : node));
    removeNodeById = (id) => (this.nodes = this.nodes.filter((node) => node.id !== id));
    removeConnectionById = (id) => (this.connections = this.connections.filter((connection) => connection.id !== id));
}
