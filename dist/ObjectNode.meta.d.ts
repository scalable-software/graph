import { UUID } from "./Utilities/Utilities.js";
import { NodeType, Icon, Metadata } from "./Node.js";
export type ObjectCoordinates = {
    x: number;
    y: number;
};
export type ObjectNodeType = {
    id: UUID;
    name: string;
    type: NodeType;
    coordinates: ObjectCoordinates;
    icon?: Icon;
    metadata?: Metadata[];
};
