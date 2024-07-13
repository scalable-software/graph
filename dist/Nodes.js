import { Utilities } from "./Utilities/Utilities.js";
export const NodeType = {
    START: "start",
    WORKFLOW: "workflow",
    DELAY: "delay",
    END: "end",
    DECISION: "decision",
};
export const NodeMetadataType = {
    ARRIVAL: "arrival",
    DURATION: "duration",
    PREVALENCE: "prevalence",
};
export class Nodes extends Array {
    static create = (details) => ({
        id: Utilities.uuid,
        name: details.name,
        type: details.type,
        coordinates: details.coordinates,
        icon: details.icon,
    });
    static getMetadataType = (metadata) => Object.keys(metadata)[0];
    static getMetadataTypes = (node) => node.metadata
        ? node.metadata.map((metadata) => Nodes.getMetadataType(metadata))
        : [];
    static hasMetadata = (node) => !!node.metadata;
    static hasMetadataType = (node, type) => Nodes.getMetadataTypes(node).includes(type);
    static addMetadata = (node, metadata) => Nodes.hasMetadataType(node, Nodes.getMetadataType(metadata))
        ? {
            ...node,
            metadata: node.metadata.map((node) => node[Nodes.getMetadataType(metadata)] ? metadata : node),
        }
        : {
            ...node,
            metadata: node.metadata ? [...node.metadata, metadata] : [metadata],
        };
    static update = (node, update) => ({
        ...update,
        id: node.id,
    });
    static updateMetadata = (node, metadata) => (node.metadata = node.metadata.map((node) => node[Nodes.getMetadataType(metadata)] ? metadata : node)) && node;
    static updateIcon = (node, icon) => ({
        ...node,
        icon,
    });
    static updateCoordinates = (node, coordinates) => ({
        ...node,
        coordinates,
    });
    static translate = (node, offset) => (node.coordinates = {
        x: node.coordinates.x + offset.x,
        y: node.coordinates.y + offset.y,
    }) && node;
    static removeMetadata = (node, type) => (node.metadata = node.metadata.filter((metadata) => metadata[type] === undefined)) && node;
    _getIndex = (id) => this.findIndex((node) => node.id === id);
    create = (details) => this.push(Nodes.create(details)) && this;
    add = (node) => this.push(node) && this;
    addMetadata = (id, metadata) => (this[this._getIndex(id)] = Nodes.addMetadata(this[this._getIndex(id)], metadata)) && this;
    update = (id, update) => (this[this._getIndex(id)] = Nodes.update(this[this._getIndex(id)], update)) && this;
    updateMetadata = (id, metadata) => (this[this._getIndex(id)] = Nodes.updateMetadata(this[this._getIndex(id)], metadata)) && this;
    updateIcon = (id, icon) => (this[this._getIndex(id)] = Nodes.updateIcon(this[this._getIndex(id)], icon)) && this;
    updateCoordinates = (id, coordinates) => (this[this._getIndex(id)] = Nodes.updateCoordinates(this[this._getIndex(id)], coordinates)) && this;
    findById = (id) => this[this._getIndex(id)];
    findByType = (type) => this.filter((node) => node.type === type);
    findByCoordinates = (coordinates) => this.filter((node) => node.coordinates.x === coordinates.x &&
        node.coordinates.y === coordinates.y);
    translate = (id, offset) => (this[this._getIndex(id)] = Nodes.translate(this[this._getIndex(id)], offset)) && this;
    removeMetadata = (id, type) => (this[this._getIndex(id)] = Nodes.removeMetadata(this[this._getIndex(id)], type)) && this;
    remove = (id) => this.splice(this._getIndex(id), 1) && this;
}
