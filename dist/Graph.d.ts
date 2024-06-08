import { Node, Nodes, Metadata } from "./Node.js";
import { ObjectNode } from "./ObjectType.meta.js";
import { TupleNode } from "./TupleType.meta.js";
import { NodeFactory } from "./Graph.meta.js";
export declare class Graph {
    node: NodeFactory;
    constructor(nodeFactory?: NodeFactory);
    createNodes: (qty: number, details: any) => Nodes;
    addNode: (nodes: Nodes, details: any) => Nodes;
    addNodes: (nodes: Nodes, newNodes: Nodes) => Nodes;
    addNodeMetadata: (nodes: Nodes, id: string, metadata: Metadata) => Nodes;
    updateNodeMetadata: (nodes: Nodes, id: string, metadata: Metadata) => Nodes;
    updateNodeCoordinates: (nodes: Nodes, id: string, coordinates: any) => (ObjectNode | TupleNode)[];
    updateNodeIcon: (nodes: Nodes, id: string, icon: any) => (ObjectNode | TupleNode)[];
    updateNode: (nodes: Nodes, id: string, update: any) => (ObjectNode | TupleNode)[];
    findNodeById: (nodes: Nodes, id: string) => Node;
    findNodesByType: (nodes: Nodes, type: string) => Nodes;
    findNodeByCoordinates: (nodes: Nodes, coordinates: any) => Node;
    removeNodeMetadata: (nodes: Nodes, id: string, type: string) => (ObjectNode | TupleNode)[];
    removeNodeById: (nodes: Nodes, id: string) => Nodes;
    translateNode: (nodes: Nodes, id: string, offset: any) => (ObjectNode | TupleNode)[];
}
