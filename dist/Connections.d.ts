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
export declare class Connections extends EventTarget {
    private connections;
    static init: (connections?: Connection[]) => Connection[];
    static create: (details: Omit<Connection, "id">) => Connection;
    static update: (connection: Connection, update: Connection) => Connection;
    static updateCoordinates: (connection: Connection, coordinates: {
        start: Coordinates;
        end: Coordinates;
    }) => Connection;
    static translate: (connection: Connection, offset: Coordinates) => Connection;
    private _proxy;
    constructor(connections: Connection[]);
    private _createProxy;
    private _get;
    private _set;
    private _getIndex;
    private add;
    private update;
}
