import {
  ConnectionFactory,
  Connection,
  Connections,
} from "./ConnectionFactory.js";
import { NodeFactory, Node, Nodes, Metadata } from "./NodeFactory.js";

// Operations on Graph takes nodes as first argument to enable performance testing
// Once performance testing is done, we can refactor to use a class instance
// Also operations can return this to enable fluent interface
export class Graph {
  public nodes: Nodes = [];
  public connections: Connections = [];
  constructor() {}

  public createNodes = (qty: number, details): Nodes =>
    Array.from({ length: qty }, () => NodeFactory.create(details));

  public createConnections = (qty: number, details): Connections =>
    Array.from({ length: qty }, () => ConnectionFactory.create(details));

  public addNode = (details): Nodes =>
    (this.nodes = [...this.nodes, NodeFactory.create(details)]);

  public addConnection = (details): Connections =>
    (this.connections = [
      ...this.connections,
      ConnectionFactory.create(details),
    ]);

  public addNodes = (newNodes: Nodes): Nodes =>
    (this.nodes = [...this.nodes, ...newNodes]);

  public addConnections = (newConnections: Connections): Connections =>
    (this.connections = [...this.connections, ...newConnections]);

  public addNodeMetadata = (id: string, metadata: Metadata): Nodes =>
    (this.nodes = this.nodes.map((node: Node) =>
      node.id === id ? NodeFactory.addMetadata(node, metadata) : node
    ));

  public updateNodeMetadata = (id: string, metadata: Metadata): Nodes =>
    (this.nodes = this.nodes.map((node: Node) =>
      node.id === id ? NodeFactory.updateMetadata(node, metadata) : node
    ));

  public updateNodeCoordinates = (id: string, coordinates) =>
    (this.nodes = this.nodes.map((node: Node) =>
      node.id === id ? NodeFactory.updateCoordinates(node, coordinates) : node
    ));

  public updateConnectionCoordinates = (id: string, coordinates) =>
    (this.connections = this.connections.map((connection: Connection) =>
      connection.id === id
        ? ConnectionFactory.updateCoordinates(connection, coordinates)
        : connection
    ));

  public updateNodeIcon = (id: string, icon) =>
    (this.nodes = this.nodes.map((node: Node) =>
      node.id === id ? NodeFactory.updateIcon(node, icon) : node
    ));

  public updateNode = (id: string, update) =>
    (this.nodes = this.nodes.map((node: Node) =>
      node.id === id ? NodeFactory.update(node, update) : node
    ));

  public updateConnection = (id: string, update) =>
    (this.connections = this.connections.map((connection: Connection) =>
      connection.id === id
        ? ConnectionFactory.update(connection, update)
        : connection
    ));

  public findNodeById = (id: string): Node =>
    this.nodes.find((node: Node) => node.id === id);

  public findConnectionById = (id: string): ConnectionFactory =>
    this.connections.find((connection: Connection) => connection.id === id);

  public findNodesByType = (type: string): Nodes =>
    this.nodes.filter((node: Node) => node.type === type);

  public findNodeByCoordinates = (coordinates): Node =>
    this.nodes.find(
      (node: Node) =>
        node.coordinates.x === coordinates.x &&
        node.coordinates.y === coordinates.y
    );

  public removeNodeMetadata = (id: string, type: string) =>
    (this.nodes = this.nodes.map((node: Node) =>
      node.id === id ? NodeFactory.removeMetadata(node, type) : node
    ));

  public removeNodeById = (id: string): Nodes =>
    (this.nodes = this.nodes.filter((node: Node) => node.id !== id));

  public removeConnectionById = (id: string): Connections =>
    (this.connections = this.connections.filter(
      (connection: Connection) => connection.id !== id
    ));

  public translateNode = (id: string, offset) =>
    (this.nodes = this.nodes.map((node: Node) =>
      node.id === id ? NodeFactory.translate(node, offset) : node
    ));

  public translateConnection = (id: string, offset) =>
    (this.connections = this.connections.map((connection: Connection) =>
      connection.id === id
        ? ConnectionFactory.translate(connection, offset)
        : connection
    ));
}
