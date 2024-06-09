import { TupleNodeType } from "./TupleNode.meta.js";
import { Icon, StructureType, Metadata } from "./Node.js";
export declare class TupleNode {
    static structure: StructureType;
    static create: ({ name, type, coordinates, icon }: {
        name: any;
        type: any;
        coordinates: any;
        icon: any;
    }) => TupleNodeType;
    static addMetadata: (node: TupleNodeType, metadata: Metadata) => TupleNodeType;
    static updateMetadata: (node: TupleNodeType, metadata: Metadata) => TupleNodeType;
    static updateCoordinates: (node: TupleNodeType, coordinates: any) => TupleNodeType;
    static updateIcon: (node: TupleNodeType, icon: Icon) => TupleNodeType;
    static update: (node: TupleNodeType, update: TupleNodeType) => TupleNodeType;
    static removeMetadata: (node: TupleNodeType, type: any) => TupleNodeType;
    static translate: (node: TupleNodeType, offset: any) => TupleNodeType;
}
