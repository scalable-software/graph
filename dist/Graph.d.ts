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
    static createNode: ({ name, type, coordinates, icon, }: Omit<Node, "id">) => Node;
    static createConnection: ({ name, source, target, coordinates, }: Omit<Connection, "id">) => Connection;
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
    static translateConnection: (connection: Connection, offset: any) => Connection;
    static removeNodeMetadata: (node: Node, type: NodeMetadataType) => Node;
    metadata: GraphMetadata;
    nodes: Nodes;
    connections: Connections;
    constructor(metadata: GraphDetails);
    createNodes: (qty: number, details: any) => Nodes;
    createConnections: (qty: number, details: any) => Connections;
    addNode: (details: any) => Nodes;
    addConnection: (details: any) => Connections;
    addNodes: (newNodes: Nodes) => Nodes;
    addConnections: (newConnections: Connections) => Connections;
    addNodeMetadata: (id: string, metadata: NodeMetadata) => Nodes;
    updateNodeMetadata: (id: string, metadata: NodeMetadata) => Nodes;
    updateNodeCoordinates: (id: string, coordinates: any) => Node[];
    updateConnectionCoordinates: (id: string, coordinates: any) => Connection[];
    updateNodeIcon: (id: string, icon: Icon) => Node[];
    updateNode: (id: string, update: Node) => Node[];
    updateConnection: (id: string, update: Connection) => Connection[];
    findNodeById: (id: string) => Node;
    findConnectionById: (id: string) => Connection;
    findNodesByType: (type: NodeType) => Nodes;
    findNodeByCoordinates: ({ x, y }: Coordinates) => Node;
    translateNode: (id: string, offset: Offset) => Node[];
    translateConnection: (id: string, offset: Offset) => Connection[];
    removeNodeMetadata: (id: string, type: NodeMetadataType) => Node[];
    removeNodeById: (id: string) => Nodes;
    removeConnectionById: (id: string) => Connections;
}
