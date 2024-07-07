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
export class Nodes extends EventTarget {
    nodes;
    static init = (nodes = []) => new Nodes(nodes)._proxy;
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
    static updateMetadata = (node, metadata) => {
        let type = Nodes.getMetadataType(metadata);
        node.metadata = node.metadata.map((node) => (node[type] ? metadata : node));
        return node;
    };
    static updateIcon = (node, icon) => ({
        ...node,
        icon,
    });
    static updateCoordinates = (node, coordinates) => ({
        ...node,
        coordinates,
    });
    static translate = (node, offset) => {
        node.coordinates = {
            x: node.coordinates.x + offset.x,
            y: node.coordinates.y + offset.y,
        };
        return node;
    };
    static removeMetadata = (node, type) => {
        node.metadata = node.metadata.filter((metadata) => metadata[type] === undefined);
        return node;
    };
    _proxy = [];
    _result = false;
    /**
     * The private constructor is used by the static init method: no direct instantiation is allowed.
     * This is done so that a different return value, other than an instance of the class can be returned.
     */
    constructor(nodes = []) {
        super();
        this.nodes = nodes;
        this._proxy = this._createProxy(nodes);
    }
    get symbol() {
        return (target, property, receiver) => Reflect.get(target, property, receiver);
    }
    set symbol({ target, property, value, receiver }) {
        this._result = Reflect.set(target, property, value, receiver);
    }
    get index() {
        return (target, property, receiver) => Reflect.get(target, property, receiver);
    }
    set index({ target, property, value, receiver }) {
        this._result = Reflect.set(target, property, value, receiver);
    }
    get length() {
        return (target, property, receiver) => Reflect.get(target, property, receiver);
    }
    set length({ target, property, value, receiver }) {
        this._result = Reflect.set(target, property, value, receiver);
    }
    get property() {
        return (target, property, receiver) => property === "add"
            ? this.add
            : property === "addMetadata"
                ? this.addMetadata
                : property === "update"
                    ? this.update
                    : property === "updateMetadata"
                        ? this.updateMetadata
                        : property === "updateIcon"
                            ? this.updateIcon
                            : property === "updateCoordinates"
                                ? this.updateCoordinates
                                : property === "findById"
                                    ? this.findById
                                    : property === "findByType"
                                        ? this.findByType
                                        : property === "findByCoordinates"
                                            ? this.findByCoordinates
                                            : property === "translate"
                                                ? this.translate
                                                : property === "removeMetadata"
                                                    ? this.removeMetadata
                                                    : property === "remove"
                                                        ? this.remove
                                                        : Reflect.get(target, property, receiver);
    }
    set property({ target, property, value, receiver }) {
        this._result = Reflect.set(target, property, value, receiver);
    }
    get method() {
        return (target, property, receiver) => Reflect.get(target, property, receiver);
    }
    set method({ target, property, value, receiver }) {
        this._result = Reflect.set(target, property, value, receiver);
    }
    get default() {
        return (target, property, receiver) => Reflect.get(target, property, receiver);
    }
    set default({ target, property, value, receiver }) {
        this._result = Reflect.set(target, property, value, receiver);
    }
    _get = (target, property, receiver) => this[this._getPropertyType(property, target)](target, property, receiver);
    _set = (target, property, value, receiver) => (this[this._getPropertyType(property, target)] = {
        target,
        property,
        value,
        receiver,
    }) && this._result;
    _createProxy = (target) => new Proxy(target, { get: this._get, set: this._set });
    _getPropertyType = (property, target) => typeof property === "symbol"
        ? "symbol"
        : Number.isInteger(Number(property))
            ? "index"
            : property === "length"
                ? "length"
                : typeof target[property] === "function"
                    ? "method"
                    : typeof property === "string" &&
                        !(typeof target[property] === "function")
                        ? "property"
                        : "default";
    _getIndex = (id) => this.nodes.findIndex((node) => node.id === id);
    add = (details) => this.nodes.push(Nodes.create(details)) && this._proxy;
    addMetadata = (id, metadata) => {
        this.nodes[this._getIndex(id)] = Nodes.addMetadata(this.nodes[this._getIndex(id)], metadata);
        return this._proxy;
    };
    update = (id, update) => {
        this.nodes[this._getIndex(id)] = Nodes.update(this.nodes[this._getIndex(id)], update);
        return this._proxy;
    };
    updateMetadata = (id, metadata) => {
        this.nodes[this._getIndex(id)] = Nodes.updateMetadata(this.nodes[this._getIndex(id)], metadata);
        return this._proxy;
    };
    updateIcon = (id, icon) => {
        this.nodes[this._getIndex(id)] = Nodes.updateIcon(this.nodes[this._getIndex(id)], icon);
        return this._proxy;
    };
    updateCoordinates = (id, coordinates) => {
        this.nodes[this._getIndex(id)] = Nodes.updateCoordinates(this.nodes[this._getIndex(id)], coordinates);
        return this._proxy;
    };
    findById = (id) => this.nodes[this._getIndex(id)];
    findByType = (type) => this.nodes.filter((node) => node.type === type);
    findByCoordinates = (coordinates) => this.nodes.filter((node) => node.coordinates.x === coordinates.x &&
        node.coordinates.y === coordinates.y);
    translate = (id, offset) => {
        this.nodes[this._getIndex(id)] = Nodes.translate(this.nodes[this._getIndex(id)], offset);
        return this._proxy;
    };
    removeMetadata = (id, type) => {
        this.nodes[this._getIndex(id)] = Nodes.removeMetadata(this.nodes[this._getIndex(id)], type);
        return this._proxy;
    };
    remove = (id) => {
        this.nodes.splice(this._getIndex(id), 1);
        return this._proxy;
    };
}
