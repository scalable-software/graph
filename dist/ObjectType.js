import { Utilities } from "./Utilities/Utilities.js";
export class ObjectType {
    static structure = "object";
    static create = ({ name, type, coordinates, icon }) => ({
        id: Utilities.uuid,
        name,
        type,
        coordinates,
        icon,
    });
    static addMetadata = (node, metadata) => ({
        ...node,
        metadata: node.metadata ? [...node.metadata, metadata] : [metadata],
    });
    static update = (node, update) => update;
    static updateMetadata = (node, metadata) => {
        let key = Object.keys(metadata)[0];
        node.metadata = node.metadata.map((node) => (node[key] ? metadata : node));
        return node;
    };
    static updateCoordinates = (node, coordinates) => ({
        ...node,
        coordinates,
    });
    static updateIcon = (node, icon) => ({
        ...node,
        icon,
    });
    static removeMetadata = (node, type) => {
        node.metadata = node.metadata.filter((metadata) => metadata[type] === undefined);
        return node;
    };
    static translate = (node, offset) => {
        node.coordinates = {
            x: node.coordinates.x + offset.x,
            y: node.coordinates.y + offset.y,
        };
        return node;
    };
}
