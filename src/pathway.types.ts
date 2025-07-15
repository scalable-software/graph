/**
 * This data is a sample from a real-world case of a patient pathway in the context of Acute Coronary Syndrome (ACS) diagnosis.
 * The pathway is a simplified version of the ACS diagnostic pathway, which is a complex process that involves multiple steps and actors.:
 * @module Extension
 */

import type { IGraph, IEdge, IMetadata, INode } from "@scalable.software/graph";

export const ActorType = {
  START: "start",
  WORKFLOW: "workflow",
  GATEWAY: "gateway",
  DELAY: "delay",
  END: "end",
} as const;

export type ActorTypes = (typeof ActorType)[keyof typeof ActorType];

export type ActorMetadata = {
  arrival?: Arrival;
  duration?: Duration;
  prevalence?: Prevalence;
};

export type Arrival = {
  distribution: string;
  parameters: { rate: number }[];
};

export type DurationParameters =
  | { meanlog: number }
  | { sdlog: number }
  | { rate: number };
export type Duration = {
  distribution: string;
  parameters: [DurationParameters, DurationParameters?];
};
export type Prevalence = { target: string; probability: number }[];

export const Mode = {
  DIVERGING: "Diverging",
  CONVERGING: "Converging",
  EXCLUSIVE: "Exclusive",
  PARALLEL: "Parallel",
} as const;

export type Modes = (typeof Mode)[keyof typeof Mode];

/*
{
  id: "c4076ede-bddf-47f3-8237-5712b4d3eda6",
  name: "ACS Diagnostic",
  type: "pathway",
}
*/
export type PathwayMetadata = IMetadata & {
  type: string;
};

/*
{
  id: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
  name: "Start",
  type: "start",
  coordinates: { x: 0, y: 6 },
  icon: "icon.svg",
  metadata: [
    {
      arrival: {
        distribution: "exponential",
        parameters: [{ rate: 0.005469098 }],
      },
    },
  ],
}
*/
export type IActor = INode & {
  name: string;
  type: ActorTypes;
  icon: string;
  metadata?: ActorMetadata[];
} & (
    | { type: "gateway"; mode: Modes }
    | { type: Exclude<ActorTypes, "gateway"> }
  );

/*
{
  id: "6b15e892-d6cd-482a-8cfb-3268a1a4eac1",
  name: "",
  source: "f42ffd29-38ad-488b-b826-bbcadf9043c2",
  target: "97ad8fe3-f06f-4812-958f-b10388fcb6a6",
  coordinates: {
    start: { x: 8, y: 4 },
    end: { x: 10, y: 4 },
  },
}
*/
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
