import { StructureType } from "./Node.js";
import { ObjectConnectionType, ObjectCoordinates } from "./ObjectConnection.meta.js";
export declare class ObjectConnection {
    static structure: StructureType;
    static create: ({ name, source, target, coordinates, }: {
        name: any;
        source: any;
        target: any;
        coordinates: any;
    }) => ObjectConnectionType;
    static update: (connection: ObjectConnectionType, update: ObjectConnectionType) => ObjectConnectionType;
    static updateCoordinates: (connection: ObjectConnectionType, coordinates: {
        start: ObjectCoordinates;
        end: ObjectCoordinates;
    }) => ObjectConnectionType;
    static translate: (connection: ObjectConnectionType, offset: any) => ObjectConnectionType;
    static getConnectionBySource: (connections: ObjectConnectionType[], nodeId: string) => ObjectConnectionType[];
}
