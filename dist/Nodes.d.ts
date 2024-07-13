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
export declare class Nodes extends EventTarget {
    private nodes;
    static init: (nodes?: Node[]) => Node[];
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
    private _proxy;
    /**
     * The private constructor is used by the static init method: no direct instantiation is allowed.
     * This is done so that a different return value, other than an instance of the class can be returned.
     */
    constructor(nodes?: Node[]);
    private _get;
    private _set;
    private _createProxy;
    private _getIndex;
    private add;
    private addMetadata;
    private update;
    private updateMetadata;
    private updateIcon;
    private updateCoordinates;
    private findById;
    private findByType;
    private findByCoordinates;
    private translate;
    private removeMetadata;
    private remove;
}
