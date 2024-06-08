import { Node, Nodes, Metadata } from "./Node.js";
import { ObjectType } from "./ObjectType.js";
import { ObjectNode } from "./ObjectType.meta.js";
import { TupleNode } from "./TupleType.meta.js";

import { NodeFactory } from "./Graph.meta.js";

// Operations on Graph takes nodes as first argument to enable performance testing
// Once performance testing is done, we can refactor to use a class instance
// Also operations can return this to enable fluent interface
export class Graph {
  public node: NodeFactory;
  constructor(nodeFactory: NodeFactory = ObjectType) {
    this.node = nodeFactory;
  }

  createNodes = (qty: number, details): Nodes =>
    Array.from({ length: qty }, () => this.node.create(details));

  addNode = (nodes: Nodes, details): Nodes => [
    ...nodes,
    this.node.create(details),
  ];

  addNodes = (nodes: Nodes, newNodes: Nodes): Nodes => [...nodes, ...newNodes];

  addNodeMetadata = (nodes: Nodes, id: string, metadata: Metadata): Nodes => {
    let addMetadata = (node, metadata) => this.node.addMetadata(node, metadata);
    return this.node.structure === "object"
      ? nodes.map((node: ObjectNode) =>
          node.id === id ? addMetadata(node, metadata) : node
        )
      : nodes.map((node: TupleNode) =>
          node[0] === id ? addMetadata(node, metadata) : node
        );
  };

  updateNodeMetadata = (
    nodes: Nodes,
    id: string,
    metadata: Metadata
  ): Nodes => {
    let updateMetadata = (node, metadata) =>
      this.node.updateMetadata(node, metadata);
    return this.node.structure === "object"
      ? nodes.map((node: ObjectNode) =>
          node.id === id ? updateMetadata(node, metadata) : node
        )
      : nodes.map((node: TupleNode) =>
          node[0] === id ? updateMetadata(node, metadata) : node
        );
  };

  updateNodeCoordinates = (nodes: Nodes, id: string, coordinates) => {
    let updateCoordinates = (node, coordinates) =>
      this.node.updateCoordinates(node, coordinates);
    return this.node.structure === "object"
      ? nodes.map((node: ObjectNode) =>
          node.id === id ? updateCoordinates(node, coordinates) : node
        )
      : nodes.map((node: TupleNode) =>
          node[0] === id ? updateCoordinates(node, coordinates) : node
        );
  };

  updateNodeIcon = (nodes: Nodes, id: string, icon) => {
    let updateIcon = (node, icon) => this.node.updateIcon(node, icon);
    return this.node.structure === "object"
      ? nodes.map((node: ObjectNode) =>
          node.id === id ? updateIcon(node, icon) : node
        )
      : nodes.map((node: TupleNode) =>
          node[0] === id ? updateIcon(node, icon) : node
        );
  };

  updateNode = (nodes: Nodes, id: string, update) => {
    let updateNode = (node, update) => this.node.update(node, update);
    return this.node.structure === "object"
      ? nodes.map((node: ObjectNode) =>
          node.id === id ? updateNode(node, update) : node
        )
      : nodes.map((node: TupleNode) =>
          node[0] === id ? updateNode(node, update) : node
        );
  };

  findNodeById = (nodes: Nodes, id: string): Node =>
    this.node.structure === "object"
      ? nodes.find((node: ObjectNode) => node.id === id)
      : nodes.find((node: TupleNode) => node[0] === id);

  findNodesByType = (nodes: Nodes, type: string): Nodes =>
    this.node.structure === "object"
      ? nodes.filter((node: ObjectNode) => node.type === type)
      : nodes.filter((node: TupleNode) => node[2] === type);

  findNodeByCoordinates = (nodes: Nodes, coordinates): Node => {
    let x = coordinates.x;
    let y = coordinates.y;
    return this.node.structure === "object"
      ? nodes.find(
          (node: ObjectNode) =>
            node.coordinates.x === x && node.coordinates.y === y
        )
      : nodes.find((node: TupleNode) => node[3][0] === x && node[3][1] === y);
  };

  removeNodeMetadata = (nodes: Nodes, id: string, type: string) => {
    let removeMetadata = (node, type) => this.node.removeMetadata(node, type);
    return this.node.structure === "object"
      ? nodes.map((node: ObjectNode) =>
          node.id === id ? removeMetadata(node, type) : node
        )
      : nodes.map((node: TupleNode) =>
          node[0] === id ? removeMetadata(node, type) : node
        );
  };

  removeNodeById = (nodes: Nodes, id: string): Nodes =>
    this.node.structure === "object"
      ? nodes.filter((node: ObjectNode) => node.id !== id)
      : nodes.filter((node: TupleNode) => node[0] !== id);

  translateNode = (nodes: Nodes, id: string, offset) => {
    let translate = (node, offset) => this.node.translate(node, offset);
    return this.node.structure === "object"
      ? nodes.map((node: ObjectNode) =>
          node.id === id ? translate(node, offset) : node
        )
      : nodes.map((node: TupleNode) =>
          node[0] === id ? translate(node, offset) : node
        );
  };
}
