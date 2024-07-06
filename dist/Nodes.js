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
    static addMetadata = (node, metadata) => ({
        ...node,
        metadata: node.metadata ? [...node.metadata, metadata] : [metadata],
    });
    static update = (node, update) => ({
        ...update,
        id: node.id,
    });
    static updateMetadata = (node, metadata) => {
        let key = Object.keys(metadata)[0];
        node.metadata = node.metadata.map((node) => (node[key] ? metadata : node));
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
        return (target, property, receiver) => property === "add" ? this.add : Reflect.get(target, property, receiver);
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
    add = (details) => this.nodes.push(Nodes.create(details)) && this._proxy;
    addMetadata = (id, metadata) => { };
    update = (id, update) => { };
    updateMetadata = (id, metadata) => { };
    updateIcon = (id, icon) => { };
    updateCoordinates = (id, coordinates) => { };
    findById = (id) => { };
    findByType = (type) => { };
    findByCoordinates = (coordinates) => { };
    translate = (id, offset) => { };
    removeMetadata = (id, type) => { };
    remove = (id) => { };
}
