import { Utilities } from "./Utilities/Utilities.js";
export class TupleConnection {
    static structure = "tuple";
    static create = ({ name, source, target, coordinates, }) => [
        Utilities.uuid,
        name,
        source,
        target,
        [
            [coordinates.start.x, coordinates.start.y],
            [coordinates.end.x, coordinates.end.y],
        ],
    ];
    static update = (connection, update) => update;
    static updateCoordinates = (connection, coordinates) => {
        connection[4] = [
            [coordinates.start.x, coordinates.start.y],
            [coordinates.end.x, coordinates.end.y],
        ];
        return connection;
    };
    static translate = (connection, offset) => {
        connection[4] = [
            [connection[4][0][0] + offset.x, connection[4][0][1] + offset.y],
            [connection[4][1][0] + offset.x, connection[4][1][1] + offset.y],
        ];
        return connection;
    };
}
