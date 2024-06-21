import { UUID, Utilities } from "../../src/Utilities/Utilities.js";
import {
  Coordinates,
  Icon,
  Metadata,
  Node,
  NodeType,
  NodeTypes,
  Nodes,
} from "../../src/NodeFactory.js";

import { Graph } from "../../src/Graph.js";

describe("Given Graph imported", () => {
  it("then Graph exist", () => {
    expect(Graph).toBeDefined();
  });
  describe("when graph = new Graph()", () => {
    let graph: Graph;
    beforeEach(() => {
      graph = new Graph();
    });
    it("then graph.nodes exists", () => {
      expect(graph.nodes).toBeDefined();
    });
    it("then graph.createNodes exist", () => {
      expect(graph.createNodes).toBeDefined();
    });
    it("then graph.createConnections exist", () => {
      expect(graph.createConnections).toBeDefined();
    });
    it("then graph.addNode exist", () => {
      expect(graph.addNode).toBeDefined();
    });
    it("then graph.addConnection exist", () => {
      expect(graph.addConnection).toBeDefined();
    });
    it("then graph.addNodes exist", () => {
      expect(graph.addNodes).toBeDefined();
    });
    it("then graph.addConnections exist", () => {
      expect(graph.addConnections).toBeDefined();
    });
    it("then graph.findNodeById exist", () => {
      expect(graph.findNodeById).toBeDefined();
    });
    it("then graph.findConnectionById exist", () => {
      expect(graph.findConnectionById).toBeDefined();
    });
    it("then graph.findNodesByType exist", () => {
      expect(graph.findNodesByType).toBeDefined();
    });
    it("then graph.findNodeByCoordinates exist", () => {
      expect(graph.findNodeByCoordinates).toBeDefined();
    });
    it("then graph.addNodeMetadata exist", () => {
      expect(graph.addNodeMetadata).toBeDefined();
    });
    it("then graph.updateNodeMetadata exist", () => {
      expect(graph.updateNodeMetadata).toBeDefined();
    });
    it("then graph.updateNodeCoordinates exist", () => {
      expect(graph.updateNodeCoordinates).toBeDefined();
    });
    it("then graph.updateConnectionCoordinates exist", () => {
      expect(graph.updateConnectionCoordinates).toBeDefined();
    });
    it("then graph.updateNodeIcon exist", () => {
      expect(graph.updateNodeIcon).toBeDefined();
    });
    it("then graph.updateNode exist", () => {
      expect(graph.updateNode).toBeDefined();
    });
    it("then graph.updateConnection exist", () => {
      expect(graph.updateConnection).toBeDefined();
    });
    it("then graph.removeNodeMetadata exist", () => {
      expect(graph.removeNodeMetadata).toBeDefined();
    });
    it("then graph.removeNodeById exist", () => {
      expect(graph.removeNodeById).toBeDefined();
    });
    it("then graph.removeConnectionById exist", () => {
      expect(graph.removeConnectionById).toBeDefined();
    });
    it("then graph.translateNode exist", () => {
      expect(graph.translateNode).toBeDefined();
    });
    it("then graph.translateConnection exist", () => {
      expect(graph.translateConnection).toBeDefined();
    });
  });
});

describe("Given graph = new Graph()", () => {
  let graph: Graph;
  beforeEach(() => {
    graph = new Graph();
  });
  it("then graph exist", () => {
    expect(graph).toBeDefined();
  });
  describe("when nodes = graph.createNodes(1, details)", () => {
    let nodes: Nodes;
    beforeEach(() => {
      let details = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes = graph.createNodes(1, details);
    });
    it("then nodes exist", () => {
      expect(nodes).toBeDefined();
    });
    it("then nodes.length equals 1", () => {
      expect(nodes.length).toBe(1);
    });
  });
  describe("when nodes = graph.addNode([], details)", () => {
    let nodes: Nodes;
    beforeEach(() => {
      let details = {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes = graph.addNode([], details);
    });
    it("then nodes exist", () => {
      expect(nodes).toBeDefined();
    });
    it("then nodes.length equals 1", () => {
      expect(nodes.length).toBe(1);
    });
  });
  describe("when nodes = graph.addNodes(existingNodes, newNodes)", () => {
    let existingNodes: Nodes;
    let newNodes: Nodes;
    let nodes: Nodes;
    beforeEach(() => {
      existingNodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      newNodes = graph.createNodes(2, {
        name: "Node2",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      nodes = graph.addNodes(existingNodes, newNodes);
    });
    it("then nodes exist", () => {
      expect(nodes).toBeDefined();
    });
    it("then nodes.length equals 4", () => {
      expect(nodes.length).toBe(4);
    });
  });
  describe("when nodes = graph.addNodeMetadata(existingNodes, id, metadata)", () => {
    let existingNodes: Nodes;
    let id: UUID;
    let metadata: Metadata;
    let nodes: Nodes;
    beforeEach(() => {
      existingNodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = existingNodes[1].id;
      metadata = {
        arrival: {
          distribution: "exponential",
          parameters: [{ rate: 1 }],
        },
      };
      nodes = graph.addNodeMetadata(existingNodes, id, metadata);
    });
    it("then nodes exist", () => {
      expect(nodes).toBeDefined();
    });
    it("then nodes.length equals 2", () => {
      expect(nodes.length).toBe(2);
    });
    it("then nodes[1].metadata[0] equals metadata", () => {
      expect(nodes[1].metadata[0]).toEqual(metadata);
    });
  });
  describe("when node = graph.findNodeById(existingNodes, id)", () => {
    let existingNodes: Nodes;
    let id: UUID;
    let node: Node;
    beforeEach(() => {
      existingNodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = existingNodes[1].id;
      node = graph.findNodeById(existingNodes, id);
    });
    it("then node exist", () => {
      expect(node).toBeDefined();
    });
    it("then node equals existingNodes[1]", () => {
      expect(node).toEqual(existingNodes[1]);
    });
  });
  describe("when nodes = graph.findNodesByType(existingNodes, type)", () => {
    let existingNodes: Nodes;
    let type: NodeType;
    let nodes: Nodes;
    beforeEach(() => {
      existingNodes = graph.createNodes(2, {
        name: "Node1",
        type: "workflow",
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      existingNodes = graph.addNode(existingNodes, {
        name: "Node2",
        type: "decision",
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      type = "workflow";
      nodes = graph.findNodesByType(existingNodes, type);
    });
    it("then nodes exist", () => {
      expect(nodes).toBeDefined();
    });
    it("then nodes.length equals 4", () => {
      expect(nodes.length).toBe(2);
    });
  });
  describe("when node with metadata exist in nodes", () => {
    let id: UUID;
    let nodes: Nodes;
    beforeEach(() => {
      let existingNodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = existingNodes[1].id;
      let metadata = {
        arrival: {
          distribution: "exponential",
          parameters: [{ rate: 1 }],
        },
      };
      nodes = graph.addNodeMetadata(existingNodes, id, metadata);
    });
    describe("when nodes = graph.updateNodeMetadata(nodes, id, metadata)", () => {
      let metadata: Metadata;
      beforeEach(() => {
        metadata = {
          arrival: {
            distribution: "exponential",
            parameters: [{ rate: 10 }],
          },
        };
        nodes = graph.updateNodeMetadata(nodes, id, metadata);
      });
      it("then nodes exist", () => {
        expect(nodes).toBeDefined();
      });
      it("then nodes.length equals 2", () => {
        expect(nodes.length).toBe(2);
      });
      it("then nodes[1].metadata[0] equals metadata", () => {
        expect(nodes[1].metadata[0]).toEqual(metadata);
      });
    });
    describe("when nodes = graph.removeNodeMetadata(nodes, id, type)", () => {
      let type: string;
      beforeEach(() => {
        type = "arrival";
        nodes = graph.removeNodeMetadata(nodes, id, type);
      });
      it("then nodes[1].metadata is empty", () => {
        expect(nodes[1].metadata).toEqual([]);
      });
    });
  });
  describe("When node exists in nodes", () => {
    let id: UUID;
    let nodes: Nodes;
    beforeEach(() => {
      let details = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 10, y: 10 },
        icon: "./icon.svg",
      };
      nodes = graph.createNodes(1, details);
      id = nodes[0].id;
    });
    describe("when nodes = graph.translateNode(nodes, id, offset)", () => {
      let offset;
      let coordinates: Coordinates;
      beforeEach(() => {
        coordinates = nodes[0].coordinates;
        offset = { x: 10, y: 10 };
        nodes = graph.translateNode(nodes, id, offset);
      });
      it("then nodes[0].coordinates.x equals coordinates.x + offset.x", () => {
        expect(nodes[0].coordinates.x).toEqual(coordinates.x + offset.x);
      });
      it("then nodes[0].coordinates.y equals coordinates.y + offset.y", () => {
        expect(nodes[0].coordinates.y).toEqual(coordinates.y + offset.y);
      });
    });
    describe("when nodes = graph.updateNodeCoordinates(nodes, id, coordinates)", () => {
      let coordinates: Coordinates;
      beforeEach(() => {
        coordinates = { x: 10, y: 10 };
        nodes = graph.updateNodeCoordinates(nodes, id, coordinates);
      });
      it("then nodes[0].coordinates equals coordinates", () => {
        expect(nodes[0].coordinates).toEqual(coordinates);
      });
    });
    describe("When nodes = graph.updateNodeIcon(nodes, id, icon)", () => {
      let icon: Icon;
      beforeEach(() => {
        icon = "./new-icon.svg";
        nodes = graph.updateNodeIcon(nodes, id, icon);
      });
      it("then nodes[0].icon equals icon", () => {
        expect(nodes[0].icon).toEqual(icon);
      });
    });
    describe("When nodes = graph.updateNode(nodes, id, update)", () => {
      let update;
      beforeEach(() => {
        update = {
          name: "New Node",
          type: "workflow",
          coordinates: { x: 10, y: 10 },
          icon: "./new-icon.svg",
        };
        nodes = graph.updateNode(nodes, id, update);
      });
      it("then nodes[0] equals update", () => {
        expect(nodes[0]).toEqual(update);
      });
    });
    describe("When node = graph.findNodeByCoordinates(nodes, coordinates)", () => {
      let coordinates: Coordinates;
      let node: Node;
      beforeEach(() => {
        coordinates = { x: 10, y: 10 };
        node = graph.findNodeByCoordinates(nodes, coordinates);
      });
      it("then node exists", () => {
        expect(node).toBeDefined();
      });
    });
  });
  describe("when nodes = graph.removeNodeById(existingNodes, id)", () => {
    let existingNodes: Nodes;
    let id: UUID;
    let nodes: Nodes;
    beforeEach(() => {
      existingNodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = existingNodes[1].id;
      nodes = graph.removeNodeById(existingNodes, id);
    });
    it("then nodes exist", () => {
      expect(nodes).toBeDefined();
    });
    it("then nodes.length equals 1", () => {
      expect(nodes.length).toBe(1);
    });
  });
});
