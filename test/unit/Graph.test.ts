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
  describe("when nodes = graph.createNodes(1, detail)", () => {
    let nodes;
    beforeEach(() => {
      let detail = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes = graph.createNodes(1, detail);
    });
    it("then nodes exist", () => {
      expect(nodes).toBeDefined();
    });
    it("then nodes.length equals 1", () => {
      expect(nodes.length).toBe(1);
    });
  });
  describe("when connections = graph.createConnections(1, detail)", () => {
    let connections;
    beforeEach(() => {
      let detail = {
        name: "Node",
        source: "Node 1",
        target: "Node 2",
        coordinates: {
          start: { x: 0, y: 0 },
          end: { x: 10, y: 10 }
        },
      };
      connections = graph.createConnections(1, detail);
    });
    it("then connections exist", () => {
      expect(connections).toBeDefined();
    });
    it("then connections.length equals 1", () => {
      expect(connections.length).toBe(1);
    });
  });

  describe("when nodes = graph.addNode([], detail)", () => {
    let detail;
    beforeEach(() => {
      detail = {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
    });

    const runBenchmark = (specMsg, i) => {
      const benchmarkFunction = specMsg.toLowerCase().includes("performance") ?
        Benchmark.Performance : Benchmark.Memory
      it(specMsg, () => {
        let meta = { structure: "Object", action: "addNode", after: i };
        let nodes = structuredClone(graph.createNodes(i, detail));
        nodes = structuredClone(nodes);
        let results = benchmarkFunction(meta, graph.addNode, nodes, detail);
        expect(results).toBeDefined();
        expect(results.length).toEqual(1 + i);
      });
    }
    // For powers of 10 
    for (const i of [10, 100, 1000, 10000, 100000]) {
      const baseSpecMessage = `then adding 1 node to an existing set of ${i} nodes`;
      const performanceSpecMessage = `${baseSpecMessage} has a performance time of`;
      const memorySpecMessage = `${baseSpecMessage} takes up a certain amount of memory`;
      runBenchmark(performanceSpecMessage, i);
      runBenchmark(memorySpecMessage, i);
    }
  });
  
  describe("when connections = graph.addConnection([], detail)", () => {
    let detail;
    beforeEach(() => {
      detail = {
        name: "",
        source: "Node 1",
        target: "Node 2",
        coordinates: {
          start: { x: 0, y: 0 },
          end: { x: 10, y: 10 }
        }
      };
    });

    const runBenchmark = (specMsg, i) => {
      const benchmarkFunction = specMsg.toLowerCase().includes("performance") ?
        Benchmark.Performance : Benchmark.Memory
      it(specMsg, () => {
        let meta = { structure: "Object", action: "addConnection", after: i };
        let connections = structuredClone(graph.createConnections(i, detail));
        let results = benchmarkFunction(meta, graph.addConnection, connections, detail);
        expect(results).toBeDefined();
        expect(results.length).toEqual(1 + i);
      });
    }

    // For powers of 10 
    for (const i of [10, 100, 1000, 10000, 100000]) {
      const baseSpecMessage = `then adding 1 connection to an existing set of ${i} connections`;
      const performanceSpecMessage = `${baseSpecMessage} has a performance time of`;
      const memorySpecMessage = `${baseSpecMessage} takes up a certain amount of memory`;
      runBenchmark(performanceSpecMessage, i);
      runBenchmark(memorySpecMessage, i);
    }
  });

  describe("when nodes = graph.addNodes(existingNodes, newNodes)", () => {
    let detail;
    let existingNodes;
    beforeEach(() => {
      detail = {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };

      existingNodes = graph.createNodes(100000, detail)
    });
    const runBenchmark = (specMsg, i) => {
      const benchmarkFunction = specMsg.toLowerCase().includes("performance") ?
        Benchmark.Performance : Benchmark.Memory
      it(specMsg, () => {
        let meta = { structure: "Object", action: "addNodes", after: i };
        let nodes = structuredClone(graph.createNodes(i, detail));
        let results = benchmarkFunction(meta, graph.addNodes, existingNodes, nodes);
        expect(results).toBeDefined();
        expect(results.length).toEqual(existingNodes.length + i);
      });
    }
    // For powers of 10 
    for (const i of [10, 100, 1000, 10000, 100000]) {
      const baseSpecMessage = `then adding 1 node to an existing set of ${i} nodes`;
      const performanceSpecMessage = `${baseSpecMessage} has a performance time of`;
      const memorySpecMessage = `${baseSpecMessage} takes up a certain amount of memory`;
      runBenchmark(performanceSpecMessage, i);
      runBenchmark(memorySpecMessage, i);
    }
  });

  describe("when connections = graph.addConnections(existingConnections, newConnections)", () => {
    let detail;
    let existingConnections;
    beforeEach(() => {
      detail = {
        name: "Node",
        source: "Node 1",
        target: "Node 2",
        coordinates: {
          start: { x: 0, y: 0 },
          end: { x: 10, y: 10 }
        },
      };
      existingConnections = graph.createConnections(100000, detail)
    });
    const runBenchmark = (specMsg, i) => {
      const benchmarkFunction = specMsg.toLowerCase().includes("performance") ?
        Benchmark.Performance : Benchmark.Memory
      it(specMsg, () => {
        let meta = { structure: "Object", action: "addConnections", after: i };
        let connections = structuredClone(graph.createConnections(i, detail));
        let results = benchmarkFunction(meta, graph.addConnections, existingConnections, connections);
        expect(results).toBeDefined();
        expect(results.length).toEqual(existingConnections.length + i);
      });
    }

    // For powers of 10 
    for (const i of [10, 100, 1000, 10000, 100000]) {
      const baseSpecMessage = `then adding 1 connection to an existing set of ${i} connection`;
      const performanceSpecMessage = `${baseSpecMessage} has a performance time of`;
      const memorySpecMessage = `${baseSpecMessage} takes up a certain amount of memory`;
      runBenchmark(performanceSpecMessage, i)
      runBenchmark(memorySpecMessage, i)
    }
  });

  describe("when nodes = graph.addNodeMetadata(existingNodes, id, metadata)", () => {
    let detail;
    let existingNodes;
    let newMetaData;
    beforeEach(() => {
      detail = {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      newMetaData = { test: "test", test2: "test2" };
      existingNodes = graph.createNodes(100000, detail);
    });

    const runBenchmark = (specMsg, i) => {
      const benchmarkFunction = specMsg.toLowerCase().includes("performance") ?
        Benchmark.Performance : Benchmark.Memory
      it(specMsg, () => {
        let node = existingNodes[i-1];
        let meta = { structure: "Object", action: "addNodeMetadata", after: existingNodes.length };
        existingNodes = structuredClone(existingNodes);
        let results = benchmarkFunction(meta, graph.addNodeMetadata, existingNodes, node.id, newMetaData);
        expect(results).toBeDefined();
        expect(results.length).toEqual(existingNodes.length);
        expect(results[i-1].metadata).toEqual([newMetaData]);
      });
    }
    // For powers of 10 
    for (const i of [10, 100, 1000, 10000, 100000]) {
      const baseSpecMessage = `then adding metadata to the node at the ${i}th position of an existing set of nodes`;
      const performanceSpecMessage = `${baseSpecMessage} has a performance time of`;
      const memorySpecMessage = `${baseSpecMessage} takes up a certain amount of memory`;
      runBenchmark(performanceSpecMessage, i);
      runBenchmark(memorySpecMessage, i);
    }
  });

  describe("when node = graph.findNodeById(existingNodes, id)", () => {
    let detail;
    let existingNodes;
    beforeEach(() => {
      detail = {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      existingNodes = graph.createNodes(100000, detail)
    });

    const runBenchmark = (specMsg, i) => {
      const benchmarkFunction = specMsg.toLowerCase().includes("performance") ?
        Benchmark.Performance : Benchmark.Memory
      it(specMsg, () => {
        let node = existingNodes[i-1];
        let meta = { structure: "Object", action: "findNodeById", after: existingNodes.length };
        existingNodes = structuredClone(existingNodes);
        let results = benchmarkFunction(meta, graph.findNodeById, existingNodes, node.id);
        expect(results).toBeDefined();
        expect(results.id).toEqual(node.id);
      });
    }

    // For powers of 10 
    for (const i of [10, 100, 1000, 10000, 100000]) {
      const baseSpecMessage = `then finding the ID of the node at the ${i}th position of an existing set of nodes`;
      const performanceSpecMessage = `${baseSpecMessage} has a performance time of`;
      const memorySpecMessage = `${baseSpecMessage} takes up a certain amount of memory`;
      runBenchmark(performanceSpecMessage, i);
      runBenchmark(memorySpecMessage, i);
    }
  });

  describe("when connection = graph.findConnectionById(existingConnections, id)", () => {
    let detail;
    let existingConnections;
    beforeEach(() => {
      detail = {
        name: "Node",
        source: "Node 1",
        target: "Node 2",
        coordinates: {
          start: { x: 0, y: 0 },
          end: { x: 10, y: 10 }
        },
      };
      existingConnections = graph.createNodes(100000, detail)
    });

    const runBenchmark = (specMsg, i) => {
      const benchmarkFunction = specMsg.toLowerCase().includes("performance") ?
        Benchmark.Performance : Benchmark.Memory
      it(specMsg, () => {
        let connection = existingConnections[i-1];
        let meta = { structure: "Object", action: "findConnectionById", after: existingConnections.length };
        existingConnections = structuredClone(existingConnections);
        let results = benchmarkFunction(meta, graph.findConnectionById, existingConnections, connection.id);
        expect(results).toBeDefined();
        expect(results.id).toEqual(connection.id);
      });
    }

    // For powers of 10 
    for (const i of [10, 100, 1000, 10000, 100000]) {
      const baseSpecMessage = `then finding the ID of the connection at the ${i}th position of an existing set of connections`;
      const performanceSpecMessage = `${baseSpecMessage} has a performance time of`;
      const memorySpecMessage = `${baseSpecMessage} takes up a certain amount of memory`;
      runBenchmark(performanceSpecMessage, i);
      runBenchmark(memorySpecMessage, i);
    }
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
      let existingNodes = graph.createNodes(100000, {
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
      nodes = existingNodes;
      for (const i of [10, 100, 1000, 10000, 100000]) {
        nodes = graph.addNodeMetadata(nodes, existingNodes[i-1].id, metadata);
      }

    });

    describe("when nodes = graph.updateNodeMetadata(nodes, id, metadata)", () => {
      let metadata;
      let existingNodes;
      let detail;

      beforeEach(() => {
        metadata = {
          arrival: {
            distribution: "exponential",
            parameters: [{ rate: 10 }],
          },
        };
        //nodes = graph.updateNodeMetadata(existingNodes, id, metadata);
        detail = {
          name: "Node1",
          type: Utilities.getRandomElement<NodeType>(NodeTypes),
          coordinates: { x: 0, y: 0 },
          icon: "./icon.svg",
        };
      });

      const runBenchmark = (specMsg, i) => {
        const benchmarkFunction = specMsg.toLowerCase().includes("performance") ?
          Benchmark.Performance : Benchmark.Memory
        it(specMsg, () => {
          existingNodes = nodes;
          let meta = { structure: "Object", action: "updateNodeMetadata", after: existingNodes.length };
          let node = existingNodes[i-1];
          expect(node.metadata).toBeDefined();
          existingNodes = structuredClone(existingNodes);
          let results = benchmarkFunction(meta, graph.updateNodeMetadata, existingNodes, node.id, metadata);
          expect(results).toBeDefined();
          expect(results.length).toEqual(existingNodes.length);
          expect(results[i-1].metadata[0]).toEqual(metadata);
        });
      }
      // For powers of 10 
      for (const i of [10, 100, 1000, 10000, 100000]) {
        const baseSpecMessage = `then updating the metadata of the node at the ${i}th position of an existing set of nodes`;
        const performanceSpecMessage = `${baseSpecMessage} has a performance time of`;
        const memorySpecMessage = `${baseSpecMessage} takes up a certain amount of memory`;
        runBenchmark(performanceSpecMessage, i);
        runBenchmark(memorySpecMessage, i);
      }
    });

    describe("when nodes = graph.removeNodeMetadata(nodes, id, type)", () => {
      let type;
      beforeEach(() => {
        type = "arrival";
        id = nodes[10-1].id;
        nodes = graph.removeNodeMetadata(nodes, id, type);
      });
      it(`then nodes[10-1].metadata is empty`, () => {
        expect(nodes[10-1].metadata).toEqual([]);
      });
    });
  });
  describe("When node exists in nodes", () => {
    let id;
    let nodes;
    let detail;
    beforeEach(() => {
      detail = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 10, y: 10 },
        icon: "./icon.svg",
      };
      nodes = graph.createNodes(1, detail);
      id = nodes[0].id;
    });
    describe("when nodes = graph.translateNode(nodes, id, offset)", () => {
      let offset;
      let coordinates;
      beforeEach(() => {
        offset = { x: 10, y: 10 };
      });
      const runBenchmark = (specMsg, i) => {
        const benchmarkFunction = specMsg.toLowerCase().includes("performance") ?
          Benchmark.Performance : Benchmark.Memory;
        it(specMsg, () => {
          let existingNodes = structuredClone(graph.createNodes(i, detail))
          let meta = { structure: "Object", action: "translateNode", after: existingNodes.length };
          let node = existingNodes[i-1];
          coordinates = node.coordinates;
          let results = benchmarkFunction(meta, graph.translateNode, existingNodes, node.id, offset);
          let translatedCoordinates = results[i-1].coordinates;
          expect(results).toBeDefined();
          expect(translatedCoordinates.x).toEqual(coordinates.x + offset.x);
          expect(translatedCoordinates.y).toEqual(coordinates.y + offset.y);
        });
      }
      // For powers of 10 
      for (const i of [10, 100, 1000, 10000, 100000]) {
        const baseSpecMessage = `then translating the node at the ${i}th position of an existing set of nodes`;
        const performanceSpecMessage = `${baseSpecMessage} has a performance time of`;
        const memorySpecMessage = `${baseSpecMessage} takes up a certain amount of memory`;
        runBenchmark(performanceSpecMessage, i);
        runBenchmark(memorySpecMessage, i);
      }
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
      const runBenchmark = (specMsg, i) => {
        const benchmarkFunction = specMsg.toLowerCase().includes("performance") ?
          Benchmark.Performance : Benchmark.Memory;
        it(specMsg, () => {
          let existingNodes = structuredClone(graph.createNodes(i, detail))
          let meta = { structure: "Object", action: "updateNode", after: existingNodes.length };
          let node = existingNodes[i-1];
          let results = benchmarkFunction(meta, graph.updateNode, existingNodes, node.id, update);
          expect(results).toBeDefined();
          expect(results[i-1]).toEqual(update);
        });
      }
      // For powers of 10 
      for (const i of [10, 100, 1000, 10000, 100000]) {
        const baseSpecMessage = `then updating the node at the ${i}th position of an existing set of nodes`;
        const performanceSpecMessage = `${baseSpecMessage} has a performance time of`;
        const memorySpecMessage = `${baseSpecMessage} takes up a certain amount of memory`;
        runBenchmark(performanceSpecMessage, i);
        runBenchmark(memorySpecMessage, i);
      }
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
    let detail;
    beforeEach(() => {
      detail= {
        name: "Node",
        source: "Node 1",
        target: "Node 2",
        coordinates: {
          start: { x: 0, y: 0 },
          end: { x: 10, y: 10 }
        },
      };
      connections = graph.createConnections(1, detail);
      id = connections[0].id;
    });

    describe("when connections = graph.translateConnection(connections, id, offset)", () => {
      let offset;
      let coordinates;
      beforeEach(() => {
        coordinates = connections[0].coordinates;
        offset = { x: 10, y: 10 };
        connections = graph.translateConnection(connections, id, offset);
      });
      const runBenchmark = (specMsg, i) => {
        const benchmarkFunction = specMsg.toLowerCase().includes("performance") ?
          Benchmark.Performance : Benchmark.Memory;
        it(specMsg, () => {
          let existingConnections = structuredClone(graph.createNodes(i, detail))
          let connection = existingConnections[i-1];
          coordinates = connection.coordinates;
          let meta = { structure: "Object", action: "translateConnection", after: existingConnections.length };
          existingConnections = structuredClone(existingConnections);
          let results = benchmarkFunction(meta, graph.translateConnection, existingConnections, connection.id, offset);
          let translatedCoordinates = results[i-1].coordinates;
          expect(results).toBeDefined();
          expect(translatedCoordinates.start.x).toEqual(coordinates.start.x + offset.x);
          expect(translatedCoordinates.end.x).toEqual(coordinates.end.x + offset.x);
          expect(translatedCoordinates.start.y).toEqual(coordinates.start.y + offset.y);
          expect(translatedCoordinates.end.y).toEqual(coordinates.end.y + offset.y);
        });
      }
      // For powers of 10 
      for (const i of [10, 100, 1000, 10000, 100000]) {
        const baseSpecMessage = `then translating the connection at the ${i}th position of an existing set of connections`;
        const performanceSpecMessage = `${baseSpecMessage} has a performance time of`;
        const memorySpecMessage = `${baseSpecMessage} takes up a certain amount of memory`;
        runBenchmark(performanceSpecMessage, i);
        runBenchmark(memorySpecMessage, i);
      }
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
      const runBenchmark = (specMsg, i) => {
        const benchmarkFunction = specMsg.toLowerCase().includes("performance") ?
          Benchmark.Performance : Benchmark.Memory;
        it(specMsg, () => {
          let existingConnections = structuredClone(graph.createConnections(i, detail))
          let connection = existingConnections[i-1];
          let meta = { structure: "Object", action: "updateConnection", after: existingConnections.length };
          existingConnections = structuredClone(existingConnections);
          let results = benchmarkFunction(meta, graph.updateConnection, existingConnections, connection.id, update);
          expect(results).toBeDefined();
          expect(results[i-1]).toEqual(update);
        });
      }
      // For powers of 10 
      for (const i of [10, 100, 1000, 10000, 100000]) {
        const baseSpecMessage = `then updating the connection at the ${i}th position of an existing set of connections`;
        const performanceSpecMessage = `${baseSpecMessage} has a performance time of`;
        const memorySpecMessage = `${baseSpecMessage} takes up a certain amount of memory`;
        runBenchmark(performanceSpecMessage, i);
        runBenchmark(memorySpecMessage, i);
      }
    });
  });

  describe("when nodes = graph.removeNodeById(existingNodes, id)", () => {
    let detail;
    let existingNodes;
    beforeEach(() => {
      detail = {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      existingNodes = graph.createNodes(100000, detail)
    });

    const runBenchmark = (specMsg, i) => {
      const benchmarkFunction = specMsg.toLowerCase().includes("performance") ?
        Benchmark.Performance : Benchmark.Memory
      it(specMsg, () => {
        let node = existingNodes[i-1];
        let meta = { structure: "Object", action: "removeNodeById", after: existingNodes.length };
        existingNodes = structuredClone(existingNodes);
        let results = benchmarkFunction(meta, graph.removeNodeById, existingNodes, node.id);
        expect(results).toBeDefined();
        expect(results.length).toEqual(existingNodes.length - 1);
      });
    }

    // For powers of 10 
    for (const i of [10, 100, 1000, 10000, 100000]) {
      const baseSpecMessage = `then removing the node with a specific ID at the ${i}th position of an existing set of nodes`;
      const performanceSpecMessage = `${baseSpecMessage} has a performance time of`;
      const memorySpecMessage = `${baseSpecMessage} takes up a certain amount of memory`;
      runBenchmark(performanceSpecMessage, i);
      runBenchmark(memorySpecMessage, i);
    }
  });

  describe("when connections = graph.removeConnectionById(existingConnections, id)", () => {
    let detail;
    let existingConnections;
    beforeEach(() => {
      detail = {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      existingConnections = graph.createNodes(100000, detail)
    });

    const runBenchmark = (specMsg, i) => {
      const benchmarkFunction = specMsg.toLowerCase().includes("performance") ?
        Benchmark.Performance : Benchmark.Memory
      it(specMsg, () => {
        let connection = existingConnections[i-1];
        let meta = { structure: "Object", action: "removeConnectionById", after: existingConnections.length };
        existingConnections = structuredClone(existingConnections);
        let results = benchmarkFunction(meta, graph.removeConnectionById, existingConnections, connection.id);
        expect(results).toBeDefined();
        expect(results.length).toEqual(existingConnections.length - 1);
      });
    }

    // For powers of 10 
    for (const i of [10, 100, 1000, 10000, 100000]) {
      const baseSpecMessage = `then removing the node with a specific ID at the ${i}th position of an existing set of nodes`;
      const performanceSpecMessage = `${baseSpecMessage} has a performance time of`;
      const memorySpecMessage = `${baseSpecMessage} takes up a certain amount of memory`;
      runBenchmark(performanceSpecMessage, i);
      runBenchmark(memorySpecMessage, i);
    }
  });
});
