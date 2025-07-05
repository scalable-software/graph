/**
 * This data is a sample from a real-world case of a patient pathway in the context of Acute Coronary Syndrome (ACS) diagnosis.
 * The pathway is a simplified version of the ACS diagnostic pathway, which is a complex process that involves multiple steps and actors.:
 * @module Extension
 */
import type { IGraph, IEdge, IMetadata, INode } from "@scalable.software/graph";
export declare const ActorType: {
    readonly START: "start";
    readonly WORKFLOW: "workflow";
    readonly GATEWAY: "gateway";
    readonly DELAY: "delay";
    readonly END: "end";
};
export type ActorTypes = (typeof ActorType)[keyof typeof ActorType];
export type ActorMetadata = {
    arrival?: Arrival;
    duration?: Duration;
    prevalence?: Prevalence;
};
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
} | {
    rate: number;
};
export type Duration = {
    distribution: string;
    parameters: [DurationParameters, DurationParameters?];
};
export type Prevalence = {
    target: string;
    probability: number;
}[];
export declare const Mode: {
    readonly DIVERGING: "Diverging";
    readonly CONVERGING: "Converging";
    readonly EXCLUSIVE: "Exclusive";
    readonly PARALLEL: "Parallel";
};
export type Modes = (typeof Mode)[keyof typeof Mode];
export type PathwayMetadata = IMetadata & {
    type: string;
};
export type IActor = INode & {
    name: string;
    type: ActorTypes;
    icon: string;
    metadata?: ActorMetadata[];
} & ({
    type: "gateway";
    mode: Modes;
} | {
    type: Exclude<ActorTypes, "gateway">;
});
export type IPath = IEdge & {
    name: string;
};
export type IPathway = {
    metadata: PathwayMetadata;
    nodes: IActor[];
    edges: IPath[];
    actors?: IActor[];
    paths?: IPath[];
} & IGraph;
