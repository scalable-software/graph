import { TupleNode } from "./TupleType.meta.js";
import { Icon, StructureType, Metadata } from "./Node.js";
export declare class TupleType {
    static structure: StructureType;
    static create: ({ name, type, coordinates, icon }: {
        name: any;
        type: any;
        coordinates: any;
        icon: any;
    }) => TupleNode;
    static addMetadata: (node: TupleNode, metadata: Metadata) => TupleNode;
    static updateMetadata: (node: TupleNode, metadata: Metadata) => TupleNode;
    static updateCoordinates: (node: TupleNode, coordinates: any) => TupleNode;
    static updateIcon: (node: TupleNode, icon: Icon) => TupleNode;
    static update: (node: TupleNode, update: TupleNode) => TupleNode;
    static removeMetadata: (node: TupleNode, type: any) => TupleNode;
    static translate: (node: TupleNode, offset: any) => TupleNode;
}
