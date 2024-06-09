import { Icon, StructureType, Metadata } from "./Node.js";
import { ObjectNodeType, ObjectCoordinates } from "./ObjectNode.meta.js";
export declare class ObjectNode {
    static structure: StructureType;
    static create: ({ name, type, coordinates, icon, }: {
        name: any;
        type: any;
        coordinates: any;
        icon: any;
    }) => ObjectNodeType;
    static addMetadata: (node: ObjectNodeType, metadata: Metadata) => ObjectNodeType;
    static update: (node: ObjectNodeType, update: ObjectNodeType) => ObjectNodeType;
    static updateMetadata: (node: ObjectNodeType, metadata: Metadata) => ObjectNodeType;
    static updateCoordinates: (node: ObjectNodeType, coordinates: ObjectCoordinates) => ObjectNodeType;
    static updateIcon: (node: ObjectNodeType, icon: Icon) => ObjectNodeType;
    static removeMetadata: (node: ObjectNodeType, type: string) => ObjectNodeType;
    static translate: (node: ObjectNodeType, offset: any) => ObjectNodeType;
}
