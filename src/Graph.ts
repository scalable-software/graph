import { Node as iNode, Nodes, Metadata } from "./Node.meta.js";
import { Connection as iConnection, Connections } from "./Connection.meta.js";
import { Connection } from "./Connection.js";
import { Node } from "./Node.js";

import { NodeFactory, ConnectionFactory } from "./Graph.meta.js";

// Operations on Graph takes nodes as first argument to enable performance testing
// Once performance testing is done, we can refactor to use a class instance
// Also operations can return this to enable fluent interface
export class Graph {
  public nodeFactory: NodeFactory;
  public connectionFactory: ConnectionFactory;
  constructor() {
    this.nodeFactory = Node;
    this.connectionFactory = Connection;
  }

  public createNodes = (qty: number, details): Nodes =>
    Array.from({ length: qty }, () => this.nodeFactory.create(details));

  public createConnections = (qty: number, details): Connections =>
    Array.from({ length: qty }, () => this.connectionFactory.create(details));

  public addNode = (nodes: Nodes, details): Nodes => [
    ...nodes,
    this.nodeFactory.create(details),
  ];

  public addConnection = (connections: Connections, details): Connections => [
    ...connections,
    this.connectionFactory.create(details),
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
    nodes.map((node: iNode) =>
      node.id === id ? this.nodeFactory.addMetadata(node, metadata) : node
    );

  public updateNodeMetadata = (
    nodes: Nodes,
    id: string,
    metadata: Metadata
  ): Nodes =>
    nodes.map((node: iNode) =>
      node.id === id ? this.nodeFactory.updateMetadata(node, metadata) : node
    );

  public updateNodeCoordinates = (nodes: Nodes, id: string, coordinates) =>
    nodes.map((node: iNode) =>
      node.id === id
        ? this.nodeFactory.updateCoordinates(node, coordinates)
        : node
    );

  public updateConnectionCoordinates = (
    connections: Connections,
    id: string,
    coordinates
  ) =>
    connections.map((connection: iConnection) =>
      connection.id === id
        ? this.connectionFactory.updateCoordinates(connection, coordinates)
        : connection
    );

  public updateNodeIcon = (nodes: Nodes, id: string, icon) =>
    nodes.map((node: iNode) =>
      node.id === id ? this.nodeFactory.updateIcon(node, icon) : node
    );

  public updateNode = (nodes: Nodes, id: string, update) =>
    nodes.map((node: iNode) =>
      node.id === id ? this.nodeFactory.update(node, update) : node
    );

  public updateConnection = (connections: Connections, id: string, update) =>
    connections.map((connection: iConnection) =>
      connection.id === id
        ? this.connectionFactory.update(connection, update)
        : connection
    );

  public findNodeById = (nodes: Nodes, id: string): iNode =>
    nodes.find((node: iNode) => node.id === id);

  public findConnectionById = (
    connections: Connections,
    id: string
  ): Connection =>
    connections.find((connection: iConnection) => connection.id === id);

  public findNodesByType = (nodes: Nodes, type: string): Nodes =>
    nodes.filter((node: iNode) => node.type === type);

  public findNodeByCoordinates = (nodes: Nodes, coordinates): iNode =>
    nodes.find(
      (node: iNode) =>
        node.coordinates.x === coordinates.x &&
        node.coordinates.y === coordinates.y
    );

  public removeNodeMetadata = (nodes: Nodes, id: string, type: string) =>
    nodes.map((node: iNode) =>
      node.id === id ? this.nodeFactory.removeMetadata(node, type) : node
    );

  public removeNodeById = (nodes: Nodes, id: string): Nodes =>
    nodes.filter((node: iNode) => node.id !== id);

  public removeConnectionById = (
    connections: Connections,
    id: string
  ): Connections =>
    connections.filter((connection: iConnection) => connection.id !== id);

  public translateNode = (nodes: Nodes, id: string, offset) =>
    nodes.map((node: iNode) =>
      node.id === id ? this.nodeFactory.translate(node, offset) : node
    );

  public translateConnection = (connections: Connections, id: string, offset) =>
    connections.map((connection: iConnection) =>
      connection.id === id
        ? this.connectionFactory.translate(connection, offset)
        : connection
    );
}
