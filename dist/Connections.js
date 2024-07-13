import { Utilities } from "./Utilities/Utilities.js";
export class Connections extends EventTarget {
    connections;
    static init = (connections = []) => new Connections(connections)._proxy;
    static create = (details) => ({
        id: Utilities.uuid,
        name: details.name,
        source: details.source,
        target: details.target,
        coordinates: details.coordinates,
    });
    static update = (connection, update) => ({
        ...update,
        id: connection.id,
    });
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
    _proxy = [];
    constructor(connections) {
        super();
        this.connections = connections;
        this._proxy = this._createProxy(connections);
    }
    _createProxy = (target) => new Proxy(target, {
        get: this._get,
        set: this._set,
    });
    _get = (target, property, receiver) => property === "add" ? this.add : Reflect.get(target, property, receiver);
    _set = (target, property, value, receiver) => Reflect.set(target, property, value, receiver);
    _getIndex = (id) => this.connections.findIndex((connection) => connection.id === id);
    add = (details) => this.connections.push(Connections.create(details)) && this._proxy;
    update = (id, update) => {
        this.connections[this._getIndex(id)] = Connections.update(this.connections[this._getIndex(id)], update);
        return this._proxy;
    };
}
