import { ObjectNode } from "./ObjectType.meta.js";
import { TupleNode } from "./TupleType.meta.js";
export declare const StructureTypes: readonly ["object", "tuple"];
export type StructureType = (typeof StructureTypes)[number];
export type Icon = string;
export declare const NodeTypes: readonly ["start", "workflow", "delay", "end", "decision"];
export type NodeType = (typeof NodeTypes)[number];
export type Node = ObjectNode | TupleNode;
export type Nodes = Node[];
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
