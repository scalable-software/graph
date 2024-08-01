import { type Node } from "./Nodes.Types.js";

export type Icon = string;

export type Arrival = {
  distribution: string;
  parameters: { rate: number }[];
};

export type DurationParameters = { meanlog: number } | { sdlog: number };
export type Duration = {
  distribution: string;
  parameters: [DurationParameters, DurationParameters?];
};
export type Prevalence = { target: string; probability: number }[];

export type PathwayNodeMetadata = {
  arrival?: Arrival;
  duration?: Duration;
  prevalence?: Prevalence;
};

export type PathwayNode = Node & {
  icon?: Icon;
  metadata?: PathwayNodeMetadata[];
};

export const PathwayNodeMetadataType = {
  ARRIVAL: "arrival",
  DURATION: "duration",
  PREVALENCE: "prevalence",
} as const;
export type PathwayNodeMetadataType =
  (typeof PathwayNodeMetadataType)[keyof typeof PathwayNodeMetadataType];
