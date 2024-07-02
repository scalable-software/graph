import { UUID } from "./Utilities/Utilities.js";
export declare const NodeType: {
    readonly START: "start";
    readonly WORKFLOW: "workflow";
    readonly DELAY: "delay";
    readonly END: "end";
    readonly DECISION: "decision";
};
export type NodeType = (typeof NodeType)[keyof typeof NodeType];
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
export declare const NodeMetadataType: {
    readonly ARRIVAL: "arrival";
    readonly DURATION: "duration";
    readonly PREVALENCE: "prevalence";
};
export type NodeMetadataType = (typeof NodeMetadataType)[keyof typeof NodeMetadataType];
export type NodeMetadata = {
    arrival?: Arrival;
    duration?: Duration;
    prevalence?: Prevalence;
};
export type Coordinates = {
    x: number;
    y: number;
};
export type Offset = {
    x: number;
    y: number;
};
export type Node = {
    id: UUID;
    name: string;
    type: NodeType;
    coordinates: Coordinates;
    icon?: Icon;
    metadata?: NodeMetadata[];
};
export type Nodes = Node[];
export type Connection = {
    id?: UUID;
    name: string;
    source: UUID;
    target: UUID;
    coordinates: {
        start: Coordinates;
        end: Coordinates;
    };
};
export type Connections = Connection[];
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
    static createNode: (details: Omit<Node, "id">) => Node;
    static createConnection: (details: Omit<Connection, "id">) => Connection;
    static addNodeMetadata: (node: Node, metadata: NodeMetadata) => Node;
    static updateNode: (node: Node, update: Node) => Node;
    static updateConnection: (connection: Connection, update: Connection) => Connection;
    static updateNodeMetadata: (node: Node, metadata: NodeMetadata) => Node;
    static updateNodeIcon: (node: Node, icon: Icon) => Node;
    static updateNodeCoordinates: (node: Node, coordinates: Coordinates) => Node;
    static updateConnectionCoordinates: (connection: Connection, coordinates: {
        start: Coordinates;
        end: Coordinates;
    }) => Connection;
    static translateNode: (node: Node, offset: any) => Node;
    static translateConnection: (connection: Connection, offset: Offset) => Connection;
    static removeNodeMetadata: (node: Node, type: NodeMetadataType) => Node;
    metadata: GraphMetadata;
    nodes: Nodes;
    connections: Connections;
    constructor(metadata: GraphDetails);
    createNodes: (qty: number, details: Omit<Node, "id">) => Nodes;
    createConnections: (qty: number, details: Omit<Connection, "id">) => Connections;
    addNode: (details: Omit<Node, "id">) => Nodes;
    addConnection: (details: Omit<Connection, "id">) => Connections;
    addNodes: (nodes: Nodes) => Nodes;
    addConnections: (connections: Connections) => Connections;
    addNodeMetadata: (id: UUID, metadata: NodeMetadata) => Nodes;
    updateNodeMetadata: (id: UUID, metadata: NodeMetadata) => Nodes;
    updateNodeCoordinates: (id: UUID, coordinates: Coordinates) => Node[];
    updateConnectionCoordinates: (id: UUID, coordinates: {
        start: Coordinates;
        end: Coordinates;
    }) => Connection[];
    updateNodeIcon: (id: UUID, icon: Icon) => Node[];
    updateNode: (id: UUID, update: Node) => Node[];
    updateConnection: (id: UUID, update: Connection) => Connection[];
    findNodeById: (id: UUID) => Node;
    findConnectionById: (id: UUID) => Connection;
    findNodesByType: (type: NodeType) => Nodes;
    findNodeByCoordinates: (coordinates: Coordinates) => Node;
    translateNode: (id: UUID, offset: Offset) => Node[];
    translateConnection: (id: UUID, offset: Offset) => Connection[];
    removeNodeMetadata: (id: UUID, type: NodeMetadataType) => Node[];
    removeNodeById: (id: UUID) => Nodes;
    removeConnectionById: (id: UUID) => Connections;
}
