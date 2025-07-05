/**
 * This data is a sample from a real-world case of a patient pathway in the context of Acute Coronary Syndrome (ACS) diagnosis.
 * The pathway is a simplified version of the ACS diagnostic pathway, which is a complex process that involves multiple steps and actors.:
 * @module Extension
 */
import type { IPathway } from "./Pathway.types.js";
export declare const data: Omit<IPathway, "nodes" | "edges">;
