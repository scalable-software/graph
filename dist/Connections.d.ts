import { type UUID } from "./Utilities/Utilities.js";
import { type Coordinates, type Offset } from "./Graph.Types.js";
import { type Connection } from "./Connections.Types.js";
export declare class Connections<T extends Connection> extends Array<T> {
    static create: <T_1 extends Connection>(details: Omit<T_1, "id">) => T_1;
    static update: <T_1 extends Connection>(connection: T_1, update: T_1) => T_1;
    static updateCoordinates: <T_1 extends Connection>(connection: T_1, coordinates: {
        start: Coordinates;
        end: Coordinates;
    }) => T_1;
    static translate: <T_1 extends Connection>(connection: T_1, offset: Offset) => T_1;
    private _getIndex;
    create: (details: Omit<T, "id">) => Connections<T>;
    add: (connection: T | T[]) => Connections<T>;
    update: (id: UUID, update: T) => this;
    findById: (id: UUID) => T;
    translate: (id: UUID, offset: Coordinates) => this;
    remove: (id: UUID) => Connections<T>;
}
