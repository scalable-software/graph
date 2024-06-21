import { UUID } from "./Utilities/Utilities.js";
export declare const NodeTypes: readonly ["start", "workflow", "delay", "end", "decision"];
export type NodeType = (typeof NodeTypes)[number];
export type Icon = string;
export type Arrival = {
    distribution: string;
    parameters: {
        rate: number;
    }[];
};
export type Duration = {
    distribution: string;
    parameters: {
        meanlog: number;
        sdlog?: number;
    }[];
};
export type Prevalence = {
    target: string;
    probability: number;
}[];
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
export type Connection = {
    id: UUID;
    name: string;
    source: UUID;
    target: UUID;
    coordinates: {
        start: Coordinates;
        end: Coordinates;
    };
};
export type Connections = Connection[];
export declare class Graph {
    static createNode: ({ name, type, coordinates, icon }: {
        name: any;
        type: any;
        coordinates: any;
        icon: any;
    }) => Node;
    static createConnection: ({ name, source, target, coordinates, }: {
        name: any;
        source: any;
        target: any;
        coordinates: any;
    }) => Connection;
    static addNodeMetadata: (node: Node, metadata: Metadata) => Node;
    static updateNode: (node: Node, update: Node) => Node;
    static updateConnection: (connection: Connection, update: Connection) => Connection;
    static updateNodeMetadata: (node: Node, metadata: Metadata) => Node;
    static updateNodeIcon: (node: Node, icon: Icon) => Node;
    static removeNodeMetadata: (node: Node, type: string) => Node;
    static updateNodeCoordinates: (node: Node, coordinates: Coordinates) => Node;
    static updateConnectionCoordinates: (connection: Connection, coordinates: {
        start: Coordinates;
        end: Coordinates;
    }) => Connection;
    static translateNode: (node: Node, offset: any) => Node;
    static translateConnection: (connection: Connection, offset: any) => Connection;
    nodes: Nodes;
    connections: Connections;
    constructor();
    createNodes: (qty: number, details: any) => Nodes;
    createConnections: (qty: number, details: any) => Connections;
    addNode: (details: any) => Nodes;
    addConnection: (details: any) => Connections;
    addNodes: (newNodes: Nodes) => Nodes;
    addConnections: (newConnections: Connections) => Connections;
    addNodeMetadata: (id: string, metadata: Metadata) => Nodes;
    updateNodeMetadata: (id: string, metadata: Metadata) => Nodes;
    updateNodeCoordinates: (id: string, coordinates: any) => Node[];
    updateConnectionCoordinates: (id: string, coordinates: any) => Connection[];
    updateNodeIcon: (id: string, icon: any) => Node[];
    updateNode: (id: string, update: any) => Node[];
    updateConnection: (id: string, update: any) => Connection[];
    findNodeById: (id: string) => Node;
    findConnectionById: (id: string) => Connection;
    findNodesByType: (type: string) => Nodes;
    findNodeByCoordinates: (coordinates: any) => Node;
    removeNodeMetadata: (id: string, type: string) => Node[];
    removeNodeById: (id: string) => Nodes;
    removeConnectionById: (id: string) => Connections;
    translateNode: (id: string, offset: any) => Node[];
    translateConnection: (id: string, offset: any) => Connection[];
}
