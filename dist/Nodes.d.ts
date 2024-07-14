import { type UUID } from "./Utilities/Utilities.js";
export type Offset = {
    x: number;
    y: number;
};
export declare const NodeType: {
    readonly START: "start";
    readonly WORKFLOW: "workflow";
    readonly DELAY: "delay";
    readonly END: "end";
    readonly DECISION: "decision";
};
export type NodeType = (typeof NodeType)[keyof typeof NodeType];
export type Coordinates = {
    x: number;
    y: number;
};
export type Icon = string;
export type Arrival = {
    distribution: string;
    parameters: {
        rate: number;
    }[];
};
export type DurationParameters = {
    meanlog: number;
} | {
    sdlog: number;
};
export type Duration = {
    distribution: string;
    parameters: [DurationParameters, DurationParameters?];
};
export type Prevalence = {
    target: string;
    probability: number;
}[];
export type NodeMetadata = {
    arrival?: Arrival;
    duration?: Duration;
    prevalence?: Prevalence;
};
export type Node = {
    id: UUID;
    name: string;
    type: NodeType;
    coordinates: Coordinates;
    icon?: Icon;
    metadata?: NodeMetadata[];
};
export declare const NodeMetadataType: {
    readonly ARRIVAL: "arrival";
    readonly DURATION: "duration";
    readonly PREVALENCE: "prevalence";
};
export type NodeMetadataType = (typeof NodeMetadataType)[keyof typeof NodeMetadataType];
export declare class Nodes extends Array<Node> {
    static create: (details: Omit<Node, "id">) => Node;
    static getMetadataType: (metadata: NodeMetadata) => NodeMetadataType;
    static getMetadataTypes: (node: Node) => NodeMetadataType[];
    static hasMetadata: (node: Node) => boolean;
    static hasMetadataType: (node: Node, type: NodeMetadataType) => boolean;
    static addMetadata: (node: Node, metadata: NodeMetadata) => Node;
    static update: (node: Node, update: Node) => Node;
    static updateMetadata: (node: Node, metadata: NodeMetadata) => Node;
    static updateIcon: (node: Node, icon: Icon) => Node;
    static updateCoordinates: (node: Node, coordinates: Coordinates) => Node;
    static translate: (node: Node, offset: any) => Node;
    static removeMetadata: (node: Node, type: NodeMetadataType) => Node;
    private _getIndex;
    create: (details: Omit<Node, "id">) => Nodes;
    add: (node: Node | Node[]) => Nodes;
    addMetadata: (id: UUID, metadata: NodeMetadata) => Nodes;
    update: (id: UUID, update: Node) => Nodes;
    updateMetadata: (id: UUID, metadata: any) => Nodes;
    updateIcon: (id: UUID, icon: any) => Nodes;
    updateCoordinates: (id: UUID, coordinates: Coordinates) => Nodes;
    findById: (id: UUID) => Node;
    findByType: (type: NodeType) => Node[];
    findByCoordinates: (coordinates: any) => Node[];
    translate: (id: UUID, offset: Offset) => Nodes;
    removeMetadata: (id: UUID, type: NodeMetadataType) => Nodes;
    remove: (id: UUID) => Nodes;
}
