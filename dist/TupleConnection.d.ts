import { StructureType } from "./Node.js";
import { TupleConnectionType } from "./TupleConnection.meta.js";
export declare class TupleConnection {
    static structure: StructureType;
    static create: ({ name, source, target, coordinates, }: {
        name: any;
        source: any;
        target: any;
        coordinates: any;
    }) => TupleConnectionType;
    static update: (connection: TupleConnectionType, update: TupleConnectionType) => TupleConnectionType;
    static updateCoordinates: (connection: TupleConnectionType, coordinates: {
        start: {
            x: number;
            y: number;
        };
        end: {
            x: number;
            y: number;
        };
    }) => TupleConnectionType;
    static translate: (connection: TupleConnectionType, offset: any) => TupleConnectionType;
    static getConnectionBySource: (connections: TupleConnectionType[], nodeId: string) => TupleConnectionType[];
}
