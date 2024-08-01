import { Utilities } from "./Utilities/Utilities.js";
export class Nodes extends Array {
    static create = (details) => ({
        id: Utilities.uuid,
        ...details,
    });
    static update = (node, update) => ({
        ...update,
        id: node.id,
    });
    static updateCoordinates = (node, coordinates) => ({
        ...node,
        coordinates,
    });
    static translate = (node, offset) => (node.coordinates = {
        x: node.coordinates.x + offset.x,
        y: node.coordinates.y + offset.y,
    }) && node;
    _getIndex = (id) => this.findIndex((node) => node.id === id);
    create = (details) => this.push(Nodes.create(details)) && this;
    add = (node) => Array.isArray(node) ? this.push(...node) && this : this.push(node) && this;
    update = (id, update) => (this[this._getIndex(id)] = Nodes.update(this[this._getIndex(id)], update)) && this;
    updateCoordinates = (id, coordinates) => (this[this._getIndex(id)] = Nodes.updateCoordinates(this[this._getIndex(id)], coordinates)) && this;
    findById = (id) => this[this._getIndex(id)];
    findByType = (type) => this.filter((node) => node.type === type);
    findByCoordinates = (coordinates) => this.filter((node) => node.coordinates.x === coordinates.x &&
        node.coordinates.y === coordinates.y);
    translate = (id, offset) => (this[this._getIndex(id)] = Nodes.translate(this[this._getIndex(id)], offset)) && this;
    remove = (id) => this.splice(this._getIndex(id), 1) && this;
}
