import { type UUID } from "./Utilities/Utilities.js";
import { type Coordinates, type Offset } from "./Graph.Types.js";
import { type Node, type NodeType } from "./Nodes.Types.js";
export declare class Nodes<T extends Node> extends Array<T> {
    static create: <T_1 extends Node>(details: Omit<T_1, "id">) => T_1;
    static update: <T_1 extends Node>(node: T_1, update: T_1) => T_1;
    static updateCoordinates: <T_1 extends Node>(node: T_1, coordinates: Coordinates) => T_1;
    static translate: <T_1 extends Node>(node: T_1, offset: any) => T_1;
    private _getIndex;
    create: (details: Omit<T, "id">) => Nodes<T>;
    add: (node: T | T[]) => Nodes<T>;
    update: (id: UUID, update: T) => Nodes<T>;
    updateCoordinates: (id: UUID, coordinates: Coordinates) => Nodes<T>;
    findById: (id: UUID) => T;
    findByType: (type: NodeType) => T[];
    findByCoordinates: (coordinates: Coordinates) => T[];
    translate: (id: UUID, offset: Offset) => Nodes<T>;
    remove: (id: UUID) => Nodes<T>;
}
