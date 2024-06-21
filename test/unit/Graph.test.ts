import { Utilities } from "../../src/Utilities/Utilities.js";
import { NodeTypes, NodeType } from "../../src/Node.js";
import { Graph } from "../../src/Graph.js";
import { Benchmark } from "./Benchmark.js"

describe("Given Graph imported", () => {
  it("then Graph exist", () => {
    expect(Graph).toBeDefined();
  });
  describe("when graph = new Graph()", () => {
    let graph;
    beforeEach(() => {
      graph = new Graph();
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

import { ObjectNode } from "../../src/ObjectNode.js";
import { ObjectConnection } from "../../src/ObjectConnection.js";
describe("Given graph = new Graph(Object)", () => {
  let graph;
  beforeEach(() => {
    graph = new Graph(ObjectNode, ObjectConnection);
  });
  it("then graph exist", () => {
    expect(graph).toBeDefined();
  });
  it("then graph.node exist", () => {
    expect(graph.node).toBeDefined();
  });
  it("then graph.node equals ObjectType", () => {
    expect(graph.node).toBe(ObjectNode);
  });
  it("then graph.connection exist", () => {
    expect(graph.connection).toBeDefined();
  });
  it("then graph.connection equals Object", () => {
    expect(graph.connection).toBe(ObjectConnection);
  });
  describe("when nodes = graph.createNodes(1, details)", () => {
    let nodes;
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
  describe("when connections = graph.createConnections(1, details)", () => {
    let connections;
    beforeEach(() => {
      let details = {
        name: "Node",
        source: "Node 1",
        target: "Node 2",
        coordinates: {
          start: { x: 0, y: 0 },
          end: { x: 10, y: 10 }
        },
      };
      connections = graph.createConnections(1, details);
    });
    it("then connections exist", () => {
      expect(connections).toBeDefined();
    });
    it("then connections.length equals 1", () => {
      expect(connections.length).toBe(1);
    });
  });

  // TODO: Benchmark

  describe("when nodes = graph.addNode([], details)", () => {
    let details;
    beforeEach(() => {
      details = {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
    });
    // For powers of 10 
    for (const i of [10, 100, 1000, 10000, 100000]) {
      const baseSpecMessage = `then adding 1 node to an existing set of ${i} nodes`;
      const performanceSpecMessage = `${baseSpecMessage} has a performance time of`;
      const memorySpecMessage = `${baseSpecMessage} takes up a certain amount of memory`;
      it(performanceSpecMessage, () => {
        let nodes = graph.createNodes(i, details);
        let meta = { structure: "Object", action: "addNode", after: i };
        nodes = structuredClone(nodes);
        let results = Benchmark.Performance(meta, graph.addNode, nodes, details);
        expect(results).toBeDefined();
        expect(results.length).toEqual(1 + i);
      });
      it(memorySpecMessage, () => {
        let nodes = graph.createNodes(i, details);
        let meta = { structure: "Object", action: "addNode", after: i };
        nodes = structuredClone(nodes);
        let results = Benchmark.Memory(meta, graph.addNode, nodes, details);
        expect(results).toBeDefined();
        expect(results.length).toEqual(1 + i);
      });
    }
  });
  
  describe("when connections = graph.addConnection([], details)", () => {
    let details;
    beforeEach(() => {
      details = {
        name: "",
        source: "Node 1",
        target: "Node 2",
        coordinates: {
          start: { x: 0, y: 0 },
          end: { x: 10, y: 10 }
        }
      };
    });
    // For powers of 10 
    for (const i of [10, 100, 1000, 10000, 100000]) {
      const baseSpecMessage = `then adding 1 connection to an existing set of ${i} connections`;
      const performanceSpecMessage = `${baseSpecMessage} has a performance time of`;
      const memorySpecMessage = `${baseSpecMessage} takes up a certain amount of memory`;
      it(performanceSpecMessage, () => {
        let connections = graph.createConnections(i, details);
        let meta = { structure: "Object", action: "addConnection", after: i };
        connections = structuredClone(connections);
        let results = Benchmark.Performance(meta, graph.addConnection, connections, details);
        expect(results).toBeDefined();
        expect(results.length).toEqual(1 + i);
      });
      it(memorySpecMessage, () => {
        let connections = graph.createConnections(i, details);
        let meta = { structure: "Object", action: "addConnection", after: i };
        connections = structuredClone(connections);
        let results = Benchmark.Memory(meta, graph.addConnection, connections, details);
        expect(results).toBeDefined();
        expect(results.length).toEqual(1 + i);
      });
    }
  });

  // TODO: Benchmark
  describe("when nodes = graph.addNodes(existingNodes, newNodes)", () => {
    let existingNodes;
    let newNodes;
    let nodes;
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

  describe("when nodes = graph.addNodes(existingNodes, newNodes)", () => {
    let details;
    let existingNodes;
    beforeEach(() => {
      details = {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };

      existingNodes = graph.createNodes(10000, details)
    });
    // For powers of 10 
    for (const i of [10, 100, 1000, 10000, 100000]) {
      const baseSpecMessage = `then adding 1 node to an existing set of ${i} nodes`;
      const performanceSpecMessage = `${baseSpecMessage} has a performance time of`;
      const memorySpecMessage = `${baseSpecMessage} takes up a certain amount of memory`;
      it(performanceSpecMessage, () => {
        let nodes = graph.createNodes(i, details);
        let meta = { structure: "Object", action: "addNode", after: i };
        nodes = structuredClone(nodes);
        let results = Benchmark.Performance(meta, graph.addNodes, existingNodes, nodes);
        expect(results).toBeDefined();
        expect(results.length).toEqual(existingNodes.length + i);
      });
      it(memorySpecMessage, () => {
        let nodes = graph.createNodes(i, details);
        let meta = { structure: "Object", action: "addNode", after: i };
        nodes = structuredClone(nodes);
        let results = Benchmark.Memory(meta, graph.addNodes, existingNodes, nodes);
        expect(results).toBeDefined();
        expect(results.length).toEqual(existingNodes.length + i);
      });
    }
  });

  // TODO: Benchmark
  describe("when connections = graph.addConnections(existingConnections, newConnections)", () => {
    let details;
    let existingConnections;
    beforeEach(() => {
      details = {
        name: "Node",
        source: "Node 1",
        target: "Node 2",
        coordinates: {
          start: { x: 0, y: 0 },
          end: { x: 10, y: 10 }
        },
      };

      existingConnections = graph.createConnections(10000, details)
    });
    // For powers of 10 
    for (const i of [10, 100, 1000, 10000, 100000]) {
      const baseSpecMessage = `then adding 1 connection to an existing set of ${i} connection`;
      const performanceSpecMessage = `${baseSpecMessage} has a performance time of`;
      const memorySpecMessage = `${baseSpecMessage} takes up a certain amount of memory`;
      it(performanceSpecMessage, () => {
        let connections = graph.createConnections(i, details);
        let meta = { structure: "Object", action: "addConnections", after: i };
        connections = structuredClone(connections);
        let results = Benchmark.Performance(meta, graph.addConnections, existingConnections, connections);
        expect(results).toBeDefined();
        expect(results.length).toEqual(existingConnections.length + i);
      });
      it(memorySpecMessage, () => {
        let connections = graph.createConnections(i, details);
        let meta = { structure: "Object", action: "addConnections", after: i };
        connections = structuredClone(connections);
        let results = Benchmark.Memory(meta, graph.addConnections, existingConnections, connections);
        expect(results).toBeDefined();
        expect(results.length).toEqual(existingConnections.length + i);
      });
    }
  });

  describe("when nodes = graph.addNodeMetadata(existingNodes, id, metadata)", () => {
    let details;
    let existingNodes;
    let newMetaData;
    beforeEach(() => {
      details = {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      newMetaData = { test: "test", test2: "test2" };
      existingNodes = graph.createNodes(10000, details)
    });
    // For powers of 10 
    for (const i of [10, 100, 1000, 10000, 100000]) {
      const baseSpecMessage = `then adding metadata to the node at the ${i}th position of an exisiting set of nodes`;
      const performanceSpecMessage = `${baseSpecMessage} has a performance time of`;
      const memorySpecMessage = `${baseSpecMessage} takes up a certain amount of memory`;
      it(performanceSpecMessage, () => {
        let node = existingNodes[i-1];
        let meta = { structure: "Object", action: "addNodeMetadata", after: existingNodes.length };
        existingNodes = structuredClone(existingNodes);
        let results = Benchmark.Performance(meta, graph.addNodeMetadata, existingNodes, node.id, newMetaData);
        expect(results).toBeDefined();
        expect(results.length).toEqual(existingNodes.length);
        expect(results[i-1].metadata).toEqual([newMetaData]);
      });
      it(memorySpecMessage, () => {
        let node = existingNodes[i-1];
        let meta = { structure: "Object", action: "addNodeMetadata", after: existingNodes.length };
        existingNodes = structuredClone(existingNodes);
        let results = Benchmark.Memory(meta, graph.addNodeMetadata, existingNodes, node.id, newMetaData);
        expect(results).toBeDefined();
        expect(results.length).toEqual(existingNodes.length);
        expect(results[i-1].metadata).toEqual([newMetaData]);
      });
    }
  });

  // TODO: Benchmark
  describe("when nodes = graph.addNodeMetadata(existingNodes, id, metadata)", () => {
    let existingNodes;
    let id;
    let metadata;
    let nodes;
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
  // TODO: Benchmark
  describe("when node = graph.findNodeById(existingNodes, id)", () => {
    let existingNodes;
    let id;
    let node;
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
  // TODO: Benchmark
  describe("when connection = graph.findConnectionById(existingConnections, id)", () => {
    let existingConnections;
    let id;
    let connection;
    beforeEach(() => {
      existingConnections = graph.createConnections(2, {
        name: "Node",
        source: "Node 1",
        target: "Node 2",
        coordinates: {
          start: { x: 0, y: 0 },
          end: { x: 10, y: 10 }
        },
      });
      id = existingConnections[1].id;
      connection = graph.findConnectionById(existingConnections, id);
    });
    it("then connection exist", () => {
      expect(connection).toBeDefined();
    });
    it("then connection equals existingConnections[1]", () => {
      expect(connection).toEqual(existingConnections[1]);
    });
  });
  describe("when nodes = graph.findNodesByType(existingNodes, type)", () => {
    let existingNodes;
    let type;
    let nodes;
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
    let id;
    let nodes;
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

    // TODO: Benchmark
    describe("when nodes = graph.updateNodeMetadata(nodes, id, metadata)", () => {
      let metadata;
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
      let type;
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
    let id;
    let nodes;
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
    // TODO: Benchmark
    describe("when nodes = graph.translateNode(nodes, id, offset)", () => {
      let offset;
      let coordinates;
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
      let coordinates;
      beforeEach(() => {
        coordinates = { x: 10, y: 10 };
        nodes = graph.updateNodeCoordinates(nodes, id, coordinates);
      });
      it("then nodes[0].coordinates equals coordinates", () => {
        expect(nodes[0].coordinates).toEqual(coordinates);
      });
    });
    describe("When nodes = graph.updateNodeIcon(nodes, id, icon)", () => {
      let icon;
      beforeEach(() => {
        icon = "./new-icon.svg";
        nodes = graph.updateNodeIcon(nodes, id, icon);
      });
      it("then nodes[0].icon equals icon", () => {
        expect(nodes[0].icon).toEqual(icon);
      });
    });
    // TODO: Benchmark
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
      let coordinates;
      let node;
      beforeEach(() => {
        coordinates = { x: 10, y: 10 };
        node = graph.findNodeByCoordinates(nodes, coordinates);
      });
      it("then node exists", () => {
        expect(node).toBeDefined();
      });
    });
  });
  describe("When connection exists in connections", () => {
    let id;
    let connections;
    beforeEach(() => {
      let details = {
        name: "Node",
        source: "Node 1",
        target: "Node 2",
        coordinates: {
          start: { x: 0, y: 0 },
          end: { x: 10, y: 10 }
        },
      };
      connections = graph.createConnections(1, details);
      id = connections[0].id;
    });

    // TODO: Benchmark
    describe("when connections = graph.translateConnection(connections, id, offset)", () => {
      let offset;
      let coordinates;
      beforeEach(() => {
        coordinates = connections[0].coordinates;
        offset = { x: 10, y: 10 };
        connections = graph.translateConnection(connections, id, offset);
      });
      it("then connections[0].coordinates.start.x equals coordinates.start.x + offset.x", () => {
        expect(connections[0].coordinates.start.x).toEqual(coordinates.start.x + offset.x);
      });
      it("then connections[0].coordinates.end.x equals coordinates.end.x + offset.x", () => {
        expect(connections[0].coordinates.end.x).toEqual(coordinates.end.x + offset.x);
      });
      it("then connections[0].coordinates.start.y equals coordinates.start.y + offset.y", () => {
        expect(connections[0].coordinates.start.y).toEqual(coordinates.start.y + offset.y);
      });
      it("then connections[0].coordinates.end.y equals coordinates.end.y + offset.y", () => {
        expect(connections[0].coordinates.end.y).toEqual(coordinates.end.y + offset.y);
      });
    });
    describe("when connections = graph.updateConnectionCoordinates(connections, id, coordinates)", () => {
      let coordinates;
      beforeEach(() => {
        coordinates = { x: 10, y: 10 };
        connections = graph.updateConnectionCoordinates(connections, id, coordinates);
      });
      it("then connections[0].coordinates equals coordinates", () => {
        expect(connections[0].coordinates).toEqual(coordinates);
      });
    });

    // TODO: Benchmark
    describe("When connections = graph.updateConnection(connections, id, update)", () => {
      let update;
      beforeEach(() => {
        update = {
          name: "New Node",
          source: "",
          target: "",
          coordinates: {
            start: { x: 0, y: 0 },
            end: { x: 10, y: 10 }
          },
        };
        connections = graph.updateConnection(connections, id, update);
      });
      it("then connections[0] equals update", () => {
        expect(connections[0]).toEqual(update);
      });
    });
  });

  // TODO: Benchmark
  describe("when nodes = graph.removeNodeById(existingNodes, id)", () => {
    let existingNodes;
    let id;
    let nodes;
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

  // TODO: Benchmark
  describe("when connections = graph.removeConnectionById(existingConnections, id)", () => {
    let existingConnections;
    let id;
    let connections;
    beforeEach(() => {
      existingConnections = graph.createConnections(2, {
        name: "Node",
        source: "Node 1",
        target: "Node 2",
        coordinates: {
          start: { x: 0, y: 0 },
          end: { x: 10, y: 10 }
        },
      });
      id = existingConnections[1].id;
      connections = graph.removeConnectionById(existingConnections, id);
    });
    it("then connections exist", () => {
      expect(connections).toBeDefined();
    });
    it("then connections.length equals 1", () => {
      expect(connections.length).toBe(1);
    });
  });
});

import { TupleNode } from "../../src/TupleNode.js";
import { TupleConnection } from "../../src/TupleConnection.js";
describe("Given graph = new Graph(Tuple)", () => {
  let graph;
  beforeEach(() => {
    graph = new Graph(TupleNode, TupleConnection);
  });
  it("then graph exist", () => {
    expect(graph).toBeDefined();
  });
  it("then graph.node exist", () => {
    expect(graph.node).toBeDefined();
  });
  it("then graph.node equals Tuple", () => {
    expect(graph.node).toBe(TupleNode);
  });
  it("then graph.connection exist", () => {
    expect(graph.connection).toBeDefined();
  });
  it("then graph.connection equals Tuple", () => {
    expect(graph.connection).toBe(TupleConnection);
  });
  describe("when nodes = graph.createNodes(1, details)", () => {
    let nodes;
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
  describe("when connections = graph.createConnections(1, details)", () => {
    let connections;
    beforeEach(() => {
      let details = {
        name: "Node",
        source: "Node 1",
        target: "Node 2",
        coordinates: {
          start: { x: 0, y: 0 },
          end: { x: 10, y: 10 }
        }
      };
      connections = graph.createConnections(1, details);
    });
    it("then connections exist", () => {
      expect(connections).toBeDefined();
    });
    it("then connections.length equals 1", () => {
      expect(connections.length).toBe(1);
    });
  });
  describe("when nodes = graph.addNode([], details)", () => {
    let nodes;
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
  describe("when connections = graph.addConnection([], details)", () => {
    let connections;
    beforeEach(() => {
      let details = {
        name: "Node",
        source: "Node 1",
        target: "Node 2",
        coordinates: {
          start: { x: 0, y: 0 },
          end: { x: 10, y: 10 }
        }
      };
      connections = graph.addConnection([], details);
    });
    it("then connections exist", () => {
      expect(connections).toBeDefined();
    });
    it("then connections.length equals 1", () => {
      expect(connections.length).toBe(1);
    });
  });
  describe("when nodes = graph.addNodes(existingNodes, newNodes)", () => {
    let existingNodes;
    let newNodes;
    let nodes;
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
  describe("when connections = graph.addConnections(existingConnections, newConnections)", () => {
    let existingConnections;
    let newConnections;
    let connections;
    beforeEach(() => {
      existingConnections = graph.createConnections(2, {
        name: "Node",
        source: "Node 1",
        target: "Node 2",
        coordinates: {
          start: { x: 0, y: 0 },
          end: { x: 10, y: 10 }
        },
      });
      newConnections = graph.createConnections(2, {
        name: "Node2",
        source: "Node 10",
        target: "Node 20",
        coordinates: {
          start: { x: 10, y: 10 },
          end: { x: 100, y: 100 }
        },
      });
      connections = graph.addConnections(existingConnections, newConnections);
    });
    it("then connections exist", () => {
      expect(connections).toBeDefined();
    });
    it("then connections.length equals 4", () => {
      expect(connections.length).toBe(4);
    });
  });
  describe("when node = graph.findNodeById(existingNodes, id)", () => {
    let existingNodes;
    let id;
    let node;
    beforeEach(() => {
      existingNodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = existingNodes[1][0];
      node = graph.findNodeById(existingNodes, id);
    });
    it("then node exist", () => {
      expect(node).toBeDefined();
    });
    it("then node equals existingNodes[1]", () => {
      expect(node).toEqual(existingNodes[1]);
    });
  });
  describe("when connection = graph.findConnectionById(existingConnections, id)", () => {
    let existingConnections;
    let id;
    let connection;
    beforeEach(() => {
      existingConnections = graph.createConnections(2, {
        name: "Node",
        source: "Node 1",
        target: "Node 2",
        coordinates: {
          start: { x: 0, y: 0 },
          end: { x: 10, y: 10 }
        },
      });
      id = existingConnections[1][0];
      connection = graph.findConnectionById(existingConnections, id);
    });
    it("then connection exist", () => {
      expect(connection).toBeDefined();
    });
    it("then connection equals existingConnections[1]", () => {
      expect(connection).toEqual(existingConnections[1]);
    });
  });
  describe("when nodes = graph.findNodesByType(existingNodes, type)", () => {
    let existingNodes;
    let type;
    let nodes;
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
  describe("when nodes = graph.addNodeMetadata(existingNodes, id, metadata)", () => {
    let existingNodes;
    let id;
    let metadata;
    let nodes;
    beforeEach(() => {
      existingNodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = existingNodes[1][0];
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
    it("then nodes[1][5][0] equals metadata", () => {
      expect(nodes[1][5][0]).toEqual(metadata);
    });
  });
  describe("when node with metadata exist in nodes", () => {
    let id;
    let nodes;
    beforeEach(() => {
      let existingNodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = existingNodes[1][0];
      let metadata = {
        arrival: {
          distribution: "exponential",
          parameters: [{ rate: 1 }],
        },
      };
      nodes = graph.addNodeMetadata(existingNodes, id, metadata);
    });
    describe("when nodes = graph.updateNodeMetadata(nodes, id, metadata)", () => {
      let metadata;
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
        expect(nodes[1][5][0]).toEqual(metadata);
      });
    });
    describe("when nodes = graph.removeNodeMetadata(nodes, id, type)", () => {
      let type;
      beforeEach(() => {
        type = "arrival";
        nodes = graph.removeNodeMetadata(nodes, id, type);
      });
      it("then nodes[1][5] is empty", () => {
        expect(nodes[1][5]).toEqual([]);
      });
    });
  });
  describe("When node exists in nodes", () => {
    let id;
    let nodes;
    beforeEach(() => {
      let details = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 10, y: 10 },
        icon: "./icon.svg",
      };
      nodes = graph.createNodes(1, details);
      id = nodes[0][0];
    });
    describe("when nodes = graph.translateNode(nodes, id, offset)", () => {
      let offset;
      let coordinates;
      beforeEach(() => {
        coordinates = nodes[0][3];
        offset = { x: 10, y: 10 };
        nodes = graph.translateNode(nodes, id, offset);
      });
      it("then nodes[0][3][0] equals coordinates.x + offset.x", () => {
        expect(nodes[0][3][0]).toEqual(coordinates[0] + offset.x);
      });
      it("then nodes[0][3][1] equals coordinates.y + offset.y", () => {
        expect(nodes[0][3][1]).toEqual(coordinates[1] + offset.y);
      });
    });
    describe("when nodes = graph.updateNodeCoordinates(nodes, id, coordinates)", () => {
      let coordinates;
      beforeEach(() => {
        coordinates = { x: 10, y: 10 };
        nodes = graph.updateNodeCoordinates(nodes, id, coordinates);
      });
      it("then nodes[0][3] equals coordinates", () => {
        expect(nodes[0][3]).toEqual([coordinates.x, coordinates.y]);
      });
    });
    describe("When nodes = graph.updateNodeIcon(nodes, id, icon)", () => {
      let icon;
      beforeEach(() => {
        icon = "./new-icon.svg";
        nodes = graph.updateNodeIcon(nodes, id, icon);
      });
      it("then nodes[0][4] equals icon", () => {
        expect(nodes[0][4]).toEqual(icon);
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
      let coordinates;
      let node;
      beforeEach(() => {
        coordinates = { x: 10, y: 10 };
        node = graph.findNodeByCoordinates(nodes, coordinates);
      });
      it("then node exists", () => {
        expect(node).toBeDefined();
      });
    });
  });
  describe("When connection exists in connections", () => {
    let id;
    let connections;
    beforeEach(() => {
      let details = {
        name: "Node",
        source: "Node 1",
        target: "Node 2",
        coordinates: {
          start: { x: 0, y: 0 },
          end: { x: 10, y: 10 }
        },
      };
      connections = graph.createConnections(1, details);
      id = connections[0][0];
    });
    describe("when connections = graph.translateConnection(connections, id, offset)", () => {
      let offset;
      let coordinates;
      let translatedConnection;
      let translatedStart, translatedEnd;
      beforeEach(() => {
        coordinates = connections[0][4];
        offset = { x: 10, y: 10 };
        connections = graph.translateConnection(connections, id, offset);
        translatedConnection = connections[0];
        translatedStart = translatedConnection[4][0];
        translatedEnd = translatedConnection[4][1];
      });
      it("then translatedStart.x equals coordinates.start.x + offset.x", () => {
        expect(translatedStart[0]).toEqual(coordinates[0][0] + offset.x);
      });
      it("then translatedEnd.x equals coordinates.end.x + offset.x", () => {
        expect(translatedEnd[0]).toEqual(coordinates[1][0] + offset.x);
      });
      it("then translatedStart.y equals coordinates.start.y + offset.y", () => {
        expect(translatedStart[1]).toEqual(coordinates[0][0] + offset.y);
      });
      it("then translatedEnd.y equals coordinates.end.y + offset.y", () => {
        expect(translatedEnd[1]).toEqual(coordinates[1][1] + offset.y);
      });
    });
    describe("when connections = graph.updateConnectionCoordinates(connections, id, coordinates)", () => {
      let coordinates;
      let updatedStart, updatedEnd;
      beforeEach(() => {
        coordinates = { 
          start: { x: 0, y: 0}, 
          end: { x: 10, y: 10 } 
        };
        connections = graph.updateConnectionCoordinates(connections, id, coordinates);
        updatedStart = connections[0][4][0];
        updatedEnd = connections[0][4][1];
      });
      it("then updatedStart[0] equals coordinates.start.x", () => {
        expect(updatedStart[0]).toEqual(coordinates.start.x);
      });
      it("then updatedEnd[0] equals coordinates.end.x", () => {
        expect(updatedEnd[0]).toEqual(coordinates.end.x);
      });
      it("then updatedStart[1] equals coordinates.start.y", () => {
        expect(updatedStart[1]).toEqual(coordinates.start.y);
      });
      it("then updatedEnd[1] equals coordinates.end.y", () => {
        expect(updatedEnd[1]).toEqual(coordinates.end.y);
      });
    });
    describe("When connections = graph.updateConnection(connections, id, update)", () => {
      let update;
      beforeEach(() => {
        update = {
          name: "New Node",
          source: "",
          target: "",
          coordinates: {
            start: { x: 0, y: 0 },
            end: { x: 10, y: 10 }
          },
        };
        connections = graph.updateConnection(connections, id, update);
      });
      it("then connections[0] equals update", () => {
        expect(connections[0]).toEqual(update);
      });
    });
  });
  describe("when nodes = graph.removeNodeById(existingNodes, id)", () => {
    let existingNodes;
    let id;
    let nodes;
    beforeEach(() => {
      existingNodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = existingNodes[1][0];
      nodes = graph.removeNodeById(existingNodes, id);
    });
    it("then nodes exist", () => {
      expect(nodes).toBeDefined();
    });
    it("then nodes.length equals 1", () => {
      expect(nodes.length).toBe(1);
    });
  });
  describe("when connections = graph.removeConnectionById(existingConnections, id)", () => {
    let existingConnections;
    let id;
    let connections;
    beforeEach(() => {
      existingConnections = graph.createConnections(2, {
        name: "Node",
        source: "Node 1",
        target: "Node 2",
        coordinates: {
          start: { x: 0, y: 0 },
          end: { x: 10, y: 10 }
        },
      });
      id = existingConnections[1][0];
      connections = graph.removeConnectionById(existingConnections, id);
    });
    it("then connections exist", () => {
      expect(connections).toBeDefined();
    });
    it("then connections.length equals 1", () => {
      expect(connections.length).toBe(1);
    });
  });
});

