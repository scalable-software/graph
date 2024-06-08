import { Icon, StructureType, Metadata } from "./Node.js";
import { ObjectNode, ObjectCoordinates } from "./ObjectType.meta.js";
export declare class ObjectType {
    static structure: StructureType;
    static create: ({ name, type, coordinates, icon }: {
        name: any;
        type: any;
        coordinates: any;
        icon: any;
    }) => ObjectNode;
    static addMetadata: (node: ObjectNode, metadata: Metadata) => ObjectNode;
    static update: (node: ObjectNode, update: ObjectNode) => ObjectNode;
    static updateMetadata: (node: ObjectNode, metadata: Metadata) => ObjectNode;
    static updateCoordinates: (node: ObjectNode, coordinates: ObjectCoordinates) => ObjectNode;
    static updateIcon: (node: ObjectNode, icon: Icon) => ObjectNode;
    static removeMetadata: (node: ObjectNode, type: string) => ObjectNode;
    static translate: (node: ObjectNode, offset: any) => ObjectNode;
}
