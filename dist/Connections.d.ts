import { type UUID } from "./Utilities/Utilities.js";
export type Coordinates = {
    x: number;
    y: number;
};
export type Connection = {
    id?: UUID;
    name: string;
    source: UUID;
    target: UUID;
    coordinates: {
        start: Coordinates;
        end: Coordinates;
    };
};
export declare class Connections extends Array<Connection> {
    static create: (details: Omit<Connection, "id">) => Connection;
    static update: (connection: Connection, update: Connection) => Connection;
    static updateCoordinates: (connection: Connection, coordinates: {
        start: Coordinates;
        end: Coordinates;
    }) => Connection;
    static translate: (connection: Connection, offset: Coordinates) => Connection;
    private _getIndex;
    create: (details: Omit<Connection, "id">) => this;
    add: (connection: Connection | Connection[]) => Connections;
    update: (id: any, update: any) => this;
    findById: (id: UUID) => Connection;
    translate: (id: UUID, offset: Coordinates) => this;
    remove: (id: UUID) => this;
}
