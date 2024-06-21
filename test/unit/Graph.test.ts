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
    it("then graph.connections exists", () => {
      expect(graph.connections).toBeDefined();
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

describe("Given graph.createNodes exist", () => {
  let graph: Graph;
  beforeEach(() => {
    graph = new Graph();
  });
  it("then graph exist", () => {
    expect(graph).toBeDefined();
  });
  it("then graph.createNodes exist", () => {
    expect(graph.createNodes).toBeDefined();
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
});

describe("Given graph.addNodes exist", () => {
  let graph: Graph;
  beforeEach(() => {
    graph = new Graph();
  });
  it("then graph exist", () => {
    expect(graph).toBeDefined();
  });
  it("then graph.addNodes exist", () => {
    expect(graph.addNodes).toBeDefined();
  });
  describe("when graph.addNode(details)", () => {
    beforeEach(() => {
      let details = {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      graph.addNode(details);
    });
    it("then graph.nodes exist", () => {
      expect(graph.nodes).toBeDefined();
    });
    it("then graph.nodes.length equals 1", () => {
      expect(graph.nodes.length).toBe(1);
    });
  });
});

describe("Given graph.addNodes exist", () => {
  let graph: Graph;
  beforeEach(() => {
    graph = new Graph();
  });
  it("then graph exist", () => {
    expect(graph).toBeDefined();
  });
  it("then graph.addNodes exist", () => {
    expect(graph.addNodes).toBeDefined();
  });
  describe("when graph.addNodes(newNodes)", () => {
    let newNodes: Nodes;
    beforeEach(() => {
      graph.nodes = graph.createNodes(2, {
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
      graph.addNodes(newNodes);
    });
    it("then graph.graph.nodes exist", () => {
      expect(graph.nodes).toBeDefined();
    });
    it("then nodes.length equals 4", () => {
      expect(graph.nodes.length).toBe(4);
    });
  });
});

describe("Given graph.addNodeMetadata exist", () => {
  let graph: Graph;
  beforeEach(() => {
    graph = new Graph();
  });
  it("then graph exist", () => {
    expect(graph).toBeDefined();
  });
  it("then graph.addNodeMetadata exist", () => {
    expect(graph.addNodeMetadata).toBeDefined();
  });
  describe("when graph.addNodeMetadata(existingNodes, id, metadata)", () => {
    let id: UUID;
    let metadata: Metadata;
    beforeEach(() => {
      graph.nodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = graph.nodes[1].id;
      metadata = {
        arrival: {
          distribution: "exponential",
          parameters: [{ rate: 1 }],
        },
      };
      graph.addNodeMetadata(id, metadata);
    });
    it("then graph.nodes exist", () => {
      expect(graph.nodes).toBeDefined();
    });
    it("then graph.nodes.length equals 2", () => {
      expect(graph.nodes.length).toBe(2);
    });
    it("then graph.nodes[1].metadata[0] equals metadata", () => {
      expect(graph.nodes[1].metadata[0]).toEqual(metadata);
    });
  });
});

describe("Given graph.findNodeById exist", () => {
  let graph: Graph;
  beforeEach(() => {
    graph = new Graph();
  });
  it("then graph exist", () => {
    expect(graph).toBeDefined();
  });
  it("then graph.findNodeById exist", () => {
    expect(graph.findNodeById).toBeDefined();
  });
  describe("when node = graph.findNodeById(existingNodes, id)", () => {
    let node: Node;
    let id: UUID;
    beforeEach(() => {
      graph.nodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = graph.nodes[1].id;
      node = graph.findNodeById(id);
    });
    it("then node exist", () => {
      expect(node).toBeDefined();
    });
    it("then node equals graph.nodes[1]", () => {
      expect(node).toEqual(graph.nodes[1]);
    });
  });
});

describe("Given graph.findNodesByType exist", () => {
  let graph: Graph;
  beforeEach(() => {
    graph = new Graph();
  });
  it("then graph exist", () => {
    expect(graph).toBeDefined();
  });
  it("then graph.findNodesByType exist", () => {
    expect(graph.findNodesByType).toBeDefined();
  });
  describe("when graph.findNodesByType(type)", () => {
    let type: NodeType;
    let nodes: Nodes;
    beforeEach(() => {
      graph.nodes = graph.createNodes(2, {
        name: "Node1",
        type: "workflow",
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      graph.addNode({
        name: "Node2",
        type: "decision",
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      type = "workflow";
      nodes = graph.findNodesByType(type);
    });
    it("then nodes exist", () => {
      expect(nodes).toBeDefined();
    });
    it("then nodes.length equals 4", () => {
      expect(nodes.length).toBe(2);
    });
  });
});

describe("Given graph.updateNodeMetadata exist", () => {
  let graph: Graph;
  beforeEach(() => {
    graph = new Graph();
  });
  it("then graph exist", () => {
    expect(graph).toBeDefined();
  });
  it("then graph.updateNodeMetadata exist", () => {
    expect(graph.updateNodeMetadata).toBeDefined();
  });
  describe("when node with metadata exist in nodes", () => {
    let id: UUID;
    beforeEach(() => {
      graph.nodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = graph.nodes[1].id;
      let metadata = {
        arrival: {
          distribution: "exponential",
          parameters: [{ rate: 1 }],
        },
      };
      graph.addNodeMetadata(id, metadata);
    });
    describe("when graph.updateNodeMetadata(id, metadata)", () => {
      let metadata: Metadata;
      beforeEach(() => {
        metadata = {
          arrival: {
            distribution: "exponential",
            parameters: [{ rate: 10 }],
          },
        };
        graph.updateNodeMetadata(id, metadata);
      });
      it("then graph.nodes exist", () => {
        expect(graph.nodes).toBeDefined();
      });
      it("then nodes.length equals 2", () => {
        expect(graph.nodes.length).toBe(2);
      });
      it("then graph.nodes[1].metadata[0] equals metadata", () => {
        expect(graph.nodes[1].metadata[0]).toEqual(metadata);
      });
    });
    describe("when graph.removeNodeMetadata(id, type)", () => {
      let type: string;
      beforeEach(() => {
        type = "arrival";
        graph.removeNodeMetadata(id, type);
      });
      it("then graph.nodes[1].metadata is empty", () => {
        expect(graph.nodes[1].metadata).toEqual([]);
      });
    });
  });
});

describe("Given graph.translateNode exist", () => {
  let graph: Graph;
  beforeEach(() => {
    graph = new Graph();
  });
  it("then graph exist", () => {
    expect(graph).toBeDefined();
  });
  it("then graph.translateNode exist", () => {
    expect(graph.translateNode).toBeDefined();
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
      graph.nodes = graph.createNodes(1, details);
      id = graph.nodes[0].id;
    });
    describe("when graph.translateNode(id, offset)", () => {
      let offset;
      let coordinates: Coordinates;
      beforeEach(() => {
        coordinates = graph.nodes[0].coordinates;
        offset = { x: 10, y: 10 };
        graph.translateNode(id, offset);
      });
      it("then graph.nodes[0].coordinates.x equals coordinates.x + offset.x", () => {
        expect(graph.nodes[0].coordinates.x).toEqual(coordinates.x + offset.x);
      });
      it("then graph.nodes[0].coordinates.y equals coordinates.y + offset.y", () => {
        expect(graph.nodes[0].coordinates.y).toEqual(coordinates.y + offset.y);
      });
    });
    describe("when graph.updateNodeCoordinates(id, coordinates)", () => {
      let coordinates: Coordinates;
      beforeEach(() => {
        coordinates = { x: 10, y: 10 };
        graph.updateNodeCoordinates(id, coordinates);
      });
      it("then graph.nodes[0].coordinates equals coordinates", () => {
        expect(graph.nodes[0].coordinates).toEqual(coordinates);
      });
    });
    describe("When graph.updateNodeIcon(id, icon)", () => {
      let icon: Icon;
      beforeEach(() => {
        icon = "./new-icon.svg";
        graph.updateNodeIcon(id, icon);
      });
      it("then graph.nodes[0].icon equals icon", () => {
        expect(graph.nodes[0].icon).toEqual(icon);
      });
    });
    describe("When graph.updateNode(id, update)", () => {
      let update;
      beforeEach(() => {
        update = {
          name: "New Node",
          type: "workflow",
          coordinates: { x: 10, y: 10 },
          icon: "./new-icon.svg",
        };
        graph.updateNode(id, update);
      });
      it("then graph.nodes[0] equals update", () => {
        expect(graph.nodes[0]).toEqual(update);
      });
    });
    describe("When graph.findNodeByCoordinates(coordinates)", () => {
      let coordinates: Coordinates;
      let node: Node;
      beforeEach(() => {
        coordinates = { x: 10, y: 10 };
        node = graph.findNodeByCoordinates(coordinates);
      });
      it("then node exists", () => {
        expect(node).toBeDefined();
      });
    });
  });
});

describe("Given graph.removeNodeById exist", () => {
  let graph: Graph;
  beforeEach(() => {
    graph = new Graph();
  });
  it("then graph exist", () => {
    expect(graph).toBeDefined();
  });
  it("then graph.removeNodeById exist", () => {
    expect(graph.removeNodeById).toBeDefined();
  });
  describe("when graph.removeNodeById(existingNodes, id)", () => {
    let id: UUID;
    beforeEach(() => {
      graph.nodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = graph.nodes[1].id;
      graph.removeNodeById(id);
    });
    it("then graph.nodes exist", () => {
      expect(graph.nodes).toBeDefined();
    });
    it("then graph.nodes.length equals 1", () => {
      expect(graph.nodes.length).toBe(1);
    });
  });
});
