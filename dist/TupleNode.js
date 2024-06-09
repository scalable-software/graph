import { Utilities } from "./Utilities/Utilities.js";
export class TupleNode {
    static structure = "tuple";
    static create = ({ name, type, coordinates, icon }) => [
        Utilities.uuid,
        name,
        type,
        [coordinates.x, coordinates.y],
        icon,
    ];
    static addMetadata = (node, metadata) => {
        node[5] = Array.isArray(node[5]) ? [...node[5], metadata] : [metadata];
        return node;
    };
    static updateMetadata = (node, metadata) => {
        let key = Object.keys(metadata)[0];
        node[5] = node[5].map((node) => (node[key] ? metadata : node));
        return node;
    };
    static updateCoordinates = (node, coordinates) => {
        node[3] = [coordinates.x, coordinates.y];
        return node;
    };
    static updateIcon = (node, icon) => {
        node[4] = icon;
        return node;
    };
    static update = (node, update) => update;
    static removeMetadata = (node, type) => {
        node[5] = node[5].filter((metadata) => metadata[type] === undefined);
        return node;
    };
    static translate = (node, offset) => {
        node[3] = [node[3][0] + offset.x, node[3][0] + offset.y];
        return node;
    };
}
