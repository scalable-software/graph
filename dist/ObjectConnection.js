import { Utilities } from "./Utilities/Utilities.js";
export class ObjectConnection {
    static structure = "object";
    static create = ({ name, source, target, coordinates, }) => ({
        id: Utilities.uuid,
        name,
        source,
        target,
        coordinates,
    });
    static update = (connection, update) => update;
    static updateCoordinates = (connection, coordinates) => ({
        ...connection,
        coordinates,
    });
    static translate = (connection, offset) => {
        connection.coordinates = {
            start: {
                x: connection.coordinates.start.x + offset.x,
                y: connection.coordinates.start.y + offset.y,
            },
            end: {
                x: connection.coordinates.end.x + offset.x,
                y: connection.coordinates.end.y + offset.y,
            },
        };
        return connection;
    };
}
