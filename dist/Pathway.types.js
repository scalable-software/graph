/**
 * This data is a sample from a real-world case of a patient pathway in the context of Acute Coronary Syndrome (ACS) diagnosis.
 * The pathway is a simplified version of the ACS diagnostic pathway, which is a complex process that involves multiple steps and actors.:
 * @module Extension
 */
export const ActorType = {
    START: "start",
    WORKFLOW: "workflow",
    GATEWAY: "gateway",
    DELAY: "delay",
    END: "end",
};
export const GatewayType = {
    DIVERGING: "Diverging",
    CONVERGING: "Converging",
};
