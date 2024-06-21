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

  public addNode = (nodes: Nodes, details): Nodes => [
    ...nodes,
    NodeFactory.create(details),
  ];

  public addConnection = (connections: Connections, details): Connections => [
    ...connections,
    ConnectionFactory.create(details),
  ];

  public addNodes = (nodes: Nodes, newNodes: Nodes): Nodes => [
    ...nodes,
    ...newNodes,
  ];

  public addConnections = (
    connections: Connections,
    newConnections: Connections
  ): Connections => [...connections, ...newConnections];

  public addNodeMetadata = (
    nodes: Nodes,
    id: string,
    metadata: Metadata
  ): Nodes =>
    nodes.map((node: Node) =>
      node.id === id ? NodeFactory.addMetadata(node, metadata) : node
    );

  public updateNodeMetadata = (
    nodes: Nodes,
    id: string,
    metadata: Metadata
  ): Nodes =>
    nodes.map((node: Node) =>
      node.id === id ? NodeFactory.updateMetadata(node, metadata) : node
    );

  public updateNodeCoordinates = (nodes: Nodes, id: string, coordinates) =>
    nodes.map((node: Node) =>
      node.id === id ? NodeFactory.updateCoordinates(node, coordinates) : node
    );

  public updateConnectionCoordinates = (
    connections: Connections,
    id: string,
    coordinates
  ) =>
    connections.map((connection: Connection) =>
      connection.id === id
        ? ConnectionFactory.updateCoordinates(connection, coordinates)
        : connection
    );

  public updateNodeIcon = (nodes: Nodes, id: string, icon) =>
    nodes.map((node: Node) =>
      node.id === id ? NodeFactory.updateIcon(node, icon) : node
    );

  public updateNode = (nodes: Nodes, id: string, update) =>
    nodes.map((node: Node) =>
      node.id === id ? NodeFactory.update(node, update) : node
    );

  public updateConnection = (connections: Connections, id: string, update) =>
    connections.map((connection: Connection) =>
      connection.id === id
        ? ConnectionFactory.update(connection, update)
        : connection
    );

  public findNodeById = (nodes: Nodes, id: string): Node =>
    nodes.find((node: Node) => node.id === id);

  public findConnectionById = (
    connections: Connections,
    id: string
  ): ConnectionFactory =>
    connections.find((connection: Connection) => connection.id === id);

  public findNodesByType = (nodes: Nodes, type: string): Nodes =>
    nodes.filter((node: Node) => node.type === type);

  public findNodeByCoordinates = (nodes: Nodes, coordinates): Node =>
    nodes.find(
      (node: Node) =>
        node.coordinates.x === coordinates.x &&
        node.coordinates.y === coordinates.y
    );

  public removeNodeMetadata = (nodes: Nodes, id: string, type: string) =>
    nodes.map((node: Node) =>
      node.id === id ? NodeFactory.removeMetadata(node, type) : node
    );

  public removeNodeById = (nodes: Nodes, id: string): Nodes =>
    nodes.filter((node: Node) => node.id !== id);

  public removeConnectionById = (
    connections: Connections,
    id: string
  ): Connections =>
    connections.filter((connection: Connection) => connection.id !== id);

  public translateNode = (nodes: Nodes, id: string, offset) =>
    nodes.map((node: Node) =>
      node.id === id ? NodeFactory.translate(node, offset) : node
    );

  public translateConnection = (connections: Connections, id: string, offset) =>
    connections.map((connection: Connection) =>
      connection.id === id
        ? ConnectionFactory.translate(connection, offset)
        : connection
    );
}
