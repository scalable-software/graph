import { ObjectNode } from "./ObjectNode.js";
import { ObjectConnection } from "./ObjectConnection.js";
// Operations on Graph takes nodes as first argument to enable performance testing
// Once performance testing is done, we can refactor to use a class instance
// Also operations can return this to enable fluent interface
export class Graph {
    node;
    connection;
    constructor(nodeFactory = ObjectNode, connectionFactory = ObjectConnection) {
        this.node = nodeFactory;
        this.connection = connectionFactory;
    }
    createNodes = (qty, details) => Array.from({ length: qty }, () => this.node.create(details));
    createConnections = (qty, details) => Array.from({ length: qty }, () => this.connection.create(details));
    addNode = (nodes, details) => [
        ...nodes,
        this.node.create(details),
    ];
    addConnection = (connections, details) => [
        ...connections,
        this.connection.create(details),
    ];
    addNodes = (nodes, newNodes) => [
        ...nodes,
        ...newNodes,
    ];
    addConnections = (connections, newConnections) => [...connections, ...newConnections];
    addNodeMetadata = (nodes, id, metadata) => {
        let addMetadata = (node, metadata) => this.node.addMetadata(node, metadata);
        return this.node.structure === "object"
            ? nodes.map((node) => node.id === id ? addMetadata(node, metadata) : node)
            : nodes.map((node) => node[0] === id ? addMetadata(node, metadata) : node);
    };
    updateNodeMetadata = (nodes, id, metadata) => {
        let updateMetadata = (node, metadata) => this.node.updateMetadata(node, metadata);
        return this.node.structure === "object"
            ? nodes.map((node) => node.id === id ? updateMetadata(node, metadata) : node)
            : nodes.map((node) => node[0] === id ? updateMetadata(node, metadata) : node);
    };
    updateNodeCoordinates = (nodes, id, coordinates) => {
        let updateCoordinates = (node, coordinates) => this.node.updateCoordinates(node, coordinates);
        return this.node.structure === "object"
            ? nodes.map((node) => node.id === id ? updateCoordinates(node, coordinates) : node)
            : nodes.map((node) => node[0] === id ? updateCoordinates(node, coordinates) : node);
    };
    updateConnectionCoordinates = (connections, id, coordinates) => {
        let updateCoordinates = (connection, coordinates) => this.connection.updateCoordinates(connection, coordinates);
        return this.node.structure === "object"
            ? connections.map((connection) => connection.id === id
                ? updateCoordinates(connection, coordinates)
                : connection)
            : connections.map((connection) => connection[0] === id
                ? updateCoordinates(connection, coordinates)
                : connection);
    };
    updateNodeIcon = (nodes, id, icon) => {
        let updateIcon = (node, icon) => this.node.updateIcon(node, icon);
        return this.node.structure === "object"
            ? nodes.map((node) => node.id === id ? updateIcon(node, icon) : node)
            : nodes.map((node) => node[0] === id ? updateIcon(node, icon) : node);
    };
    updateNode = (nodes, id, update) => {
        let updateNode = (node, update) => this.node.update(node, update);
        return this.node.structure === "object"
            ? nodes.map((node) => node.id === id ? updateNode(node, update) : node)
            : nodes.map((node) => node[0] === id ? updateNode(node, update) : node);
    };
    updateConnection = (connections, id, update) => {
        let updateConnection = (connection, update) => this.connection.update(connection, update);
        return this.connection.structure === "object"
            ? connections.map((connection) => connection.id === id
                ? updateConnection(connection, update)
                : connection)
            : connections.map((connection) => connection[0] === id
                ? updateConnection(connection, update)
                : connection);
    };
    findNodeById = (nodes, id) => this.node.structure === "object"
        ? nodes.find((node) => node.id === id)
        : nodes.find((node) => node[0] === id);
    findConnectionById = (connections, id) => this.connection.structure === "object"
        ? connections.find((connection) => connection.id === id)
        : connections.find((connection) => connection[0] === id);
    findNodesByType = (nodes, type) => this.node.structure === "object"
        ? nodes.filter((node) => node.type === type)
        : nodes.filter((node) => node[2] === type);
    findNodeByCoordinates = (nodes, coordinates) => {
        let x = coordinates.x;
        let y = coordinates.y;
        return this.node.structure === "object"
            ? nodes.find((node) => node.coordinates.x === x && node.coordinates.y === y)
            : nodes.find((node) => node[3][0] === x && node[3][1] === y);
    };
    removeNodeMetadata = (nodes, id, type) => {
        let removeMetadata = (node, type) => this.node.removeMetadata(node, type);
        return this.node.structure === "object"
            ? nodes.map((node) => node.id === id ? removeMetadata(node, type) : node)
            : nodes.map((node) => node[0] === id ? removeMetadata(node, type) : node);
    };
    removeNodeById = (nodes, id) => this.node.structure === "object"
        ? nodes.filter((node) => node.id !== id)
        : nodes.filter((node) => node[0] !== id);
    removeConnectionById = (connections, id) => this.connection.structure === "object"
        ? connections.filter((connection) => connection.id !== id)
        : connections.filter((connection) => connection[0] !== id);
    translateNode = (nodes, id, offset) => {
        let translate = (node, offset) => this.node.translate(node, offset);
        return this.node.structure === "object"
            ? nodes.map((node) => node.id === id ? translate(node, offset) : node)
            : nodes.map((node) => node[0] === id ? translate(node, offset) : node);
    };
    translateConnection = (connections, id, offset) => {
        let translate = (connection, offset) => this.connection.translate(connection, offset);
        return this.connection.structure === "object"
            ? connections.map((connection) => connection.id === id ? translate(connection, offset) : connection)
            : connections.map((connection) => connection[0] === id ? translate(connection, offset) : connection);
    };
}
