import {
  Graph,
  GraphType,
  NodeType,
  NodeMetadataType,
  Utilities,
  Connection,
  Coordinates,
  Icon,
  NodeMetadata,
  Node,
  Nodes,
  UUID,
} from "@scalable-software/graph.structure";

// Static Members Availability
describe("Given Graph imported", () => {
  it("then Graph exist", () => {
    expect(Graph).toBeDefined();
  });
  it("then Graph.createNode static method exist", () => {
    expect(Graph.createNode).toBeDefined();
  });
  it("then Graph.createConnection static method exist", () => {
    expect(Graph.createConnection).toBeDefined();
  });
  it("then Graph.addNodeMetadata static method exist", () => {
    expect(Graph.addNodeMetadata).toBeDefined();
  });
  it("then Graph.updateNode static method exist", () => {
    expect(Graph.updateNode).toBeDefined();
  });
  it("then Graph.updateConnection static method exist", () => {
    expect(Graph.updateConnection).toBeDefined();
  });
  it("then Graph.updateNodeMetadata static method exist", () => {
    expect(Graph.updateNodeMetadata).toBeDefined();
  });
  it("then Graph.updateNodeIcon static method exist", () => {
    expect(Graph.updateNodeIcon).toBeDefined();
  });
  it("then Graph.updateNodeCoordinates static method exist", () => {
    expect(Graph.updateNodeCoordinates).toBeDefined();
  });
  it("then Graph.updateConnectionCoordinates", () => {
    expect(Graph.updateConnectionCoordinates).toBeDefined();
  });
  it("then Graph.translateNode static method exist", () => {
    expect(Graph.translateNode).toBeDefined();
  });
  it("then Graph.translateConnection static method exist", () => {
    expect(Graph.translateConnection).toBeDefined();
  });
  it("then Graph.removeNodeMetadata static method exist", () => {
    expect(Graph.removeNodeMetadata).toBeDefined();
  });
});

// Static Methods Behavior
describe("Given Graph.createNode static method exist", () => {
  describe("when node = Graph.createNode(details)", () => {
    let details;
    let node: Node;
    beforeEach(() => {
      details = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      node = Graph.createNode(details);
    });
    it("then node is exist", () => {
      expect(node).toBeDefined();
    });
    it("then node.id exist", () => {
      expect(node.id).toBeDefined();
    });
    it("then node.name exist", () => {
      expect(node.name).toBeDefined();
    });
    it("then node.type exist", () => {
      expect(node.type).toBeDefined();
    });
    it("then node.coordinates exist", () => {
      expect(node.coordinates).toBeDefined();
    });
    it("then node.icon exist", () => {
      expect(node.icon).toBeDefined();
    });
    it("then node.name equals details.name", () => {
      expect(node.name).toBe(details.name);
    });
    it("then node.type equals details.type", () => {
      expect(node.type).toEqual(details.type);
    });
    it("then node.coordinates equals details.coordinates", () => {
      expect(node.coordinates).toEqual(details.coordinates);
    });
    it("then node.icon equals details.icon", () => {
      expect(node.icon).toEqual(details.icon);
    });
  });
});
describe("Given Graph.createConnection static method exist", () => {
  describe("when connection = Graph.createConnection(details)", () => {
    let details;
    let connection: Connection;
    beforeEach(() => {
      details = {
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 0, y: 400 },
          end: { x: 100, y: 400 },
        },
      };
      connection = Graph.createConnection(details);
    });
    it("then connection is exist", () => {
      expect(connection).toBeDefined();
    });
    it("then connection.id exist", () => {
      expect(connection.id).toBeDefined();
    });
    it("then connection.name exist", () => {
      expect(connection.name).toBeDefined();
    });
    it("then connection.source exist", () => {
      expect(connection.source).toBeDefined();
    });
    it("then connection.target exist", () => {
      expect(connection.target).toBeDefined();
    });
    it("then connection.coordinates exist", () => {
      expect(connection.coordinates).toBeDefined();
    });
    it("then connection.name equals details.name", () => {
      expect(connection.name).toBe(details.name);
    });
    it("then connection.coordinates equals details.coordinates", () => {
      expect(connection.coordinates).toEqual(details.coordinates);
    });
  });
});
describe("Given Graph.addNodeMetadata static method exist", () => {
  describe("when extendedNode = Graph.extend(node, metadata)", () => {
    let node: Node;
    let metadata: NodeMetadata;
    let extendedNode: Node;
    beforeEach(() => {
      node = Graph.createNode({
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      metadata = {
        arrival: {
          distribution: "exponential",
          parameters: [{ rate: 1 }],
        },
      };
      extendedNode = Graph.addNodeMetadata(node, metadata);
    });
    it("then extendedNode exist", () => {
      expect(extendedNode).toBeDefined();
    });
    it("then extendedNode.id exist", () => {
      expect(extendedNode.id).toBeDefined();
    });
    it("then extendedNode.name exist", () => {
      expect(extendedNode.name).toBeDefined();
    });
    it("then extendedNode.type exist", () => {
      expect(extendedNode.type).toBeDefined();
    });
    it("then extendedNode.coordinates exist", () => {
      expect(extendedNode.coordinates).toBeDefined();
    });
    it("then extendedNode.icon exist", () => {
      expect(extendedNode.icon).toBeDefined();
    });
    it("then extendedNode.metadata exist", () => {
      expect(extendedNode.metadata).toBeDefined();
    });
    it("then extendedNode.id equals node.id", () => {
      expect(extendedNode.id).toEqual(node.id);
    });
    it("then extendedNode.name equals node.name", () => {
      expect(extendedNode.name).toEqual(node.name);
    });
    it("then extendedNode.type equals node.type", () => {
      expect(extendedNode.type).toEqual(node.type);
    });
    it("then extendedNode.coordinates equals node.coordinates", () => {
      expect(extendedNode.coordinates).toEqual(node.coordinates);
    });
    it("then extendedNode.icon equals node.icon", () => {
      expect(extendedNode.icon).toEqual(node.icon);
    });
    it("then result.metadata equals metadata", () => {
      expect(extendedNode.metadata[0]).toEqual(metadata);
    });
  });
});
describe("Given Graph.updateNode static method exist", () => {
  describe("and node exist", () => {
    let node: Node;
    beforeEach(() => {
      node = Graph.createNode({
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
    });
    describe("when updatedNode = Graph.updateNode(node, update)", () => {
      let details;
      beforeEach(() => {
        details = {
          id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          name: "Triage",
          type: "workflow",
          coordinates: { x: 100, y: 400 },
          icon: "icon.svg",
          metadata: [
            {
              duration: {
                distribution: "log normal",
                parameters: [{ meanlog: 0.1640238 }, { sdlog: 0.4169375 }],
              },
            },
          ],
        };
        node = Graph.updateNode(node, details);
      });
      it("then node icon is updated", () => {
        details.id = node.id;
        expect(node).toEqual(details);
      });
    });
  });
});
describe("Given Graph.updateConnection static method exist", () => {
  describe("and connection exist", () => {
    let connection: Connection;
    beforeEach(() => {
      connection = Graph.createConnection({
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 0, y: 400 },
          end: { x: 100, y: 400 },
        },
      });
    });
    describe("when updatedNode = Graph.updateConnection(connection, update)", () => {
      let details;
      beforeEach(() => {
        details = {
          id: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
          name: "",
          source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
          target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          coordinates: {
            start: { x: 1, y: 500 },
            end: { x: 500, y: 500 },
          },
        };
        connection = Graph.updateConnection(connection, details);
      });
      it("then connection icon is updated", () => {
        details.id = connection.id;
        expect(connection).toEqual(details);
      });
    });
  });
});
describe("Given Graph.updateNodeMetadata static method exist", () => {
  describe("and node with metadata exist", () => {
    let node: Node;
    beforeEach(() => {
      node = Graph.createNode({
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      let metadata = {
        arrival: {
          distribution: "exponential",
          parameters: [{ rate: 1 }],
        },
      };
      node = Graph.addNodeMetadata(node, metadata);
    });
    describe("when updatedNode = Graph.updateMetadata(node, metadata)", () => {
      let metadata: NodeMetadata;
      let updatedNode: Node;
      beforeEach(() => {
        metadata = {
          arrival: {
            distribution: "exponential",
            parameters: [{ rate: 10 }],
          },
        };
        updatedNode = Graph.updateNodeMetadata(node, metadata);
      });
      it("then updatedNode exist", () => {
        expect(updatedNode).toBeDefined();
      });
      it("then updatedNode.id exist", () => {
        expect(updatedNode.id).toBeDefined();
      });
      it("then updatedNode.name exist", () => {
        expect(updatedNode.name).toBeDefined();
      });
      it("then updatedNode.type exist", () => {
        expect(updatedNode.type).toBeDefined();
      });
      it("then updatedNode.coordinates exist", () => {
        expect(updatedNode.coordinates).toBeDefined();
      });
      it("then updatedNode.icon exist", () => {
        expect(updatedNode.icon).toBeDefined();
      });
      it("then updatedNode.metadata exist", () => {
        expect(updatedNode.metadata).toBeDefined();
      });
      it("then updatedNode.id equals node.id", () => {
        expect(updatedNode.id).toEqual(node.id);
      });
      it("then updatedNode.name equals node.name", () => {
        expect(updatedNode.name).toEqual(node.name);
      });
      it("then extendedNode.type equals node.type", () => {
        expect(updatedNode.type).toEqual(node.type);
      });
      it("then extendedNode.coordinates equals node.coordinates", () => {
        expect(updatedNode.coordinates).toEqual(node.coordinates);
      });
      it("then updatedNode.icon equals node.icon", () => {
        expect(updatedNode.icon).toEqual(node.icon);
      });
      it("then updatedNode.metadata equals metadata", () => {
        expect(updatedNode.metadata[0]).toEqual(metadata);
      });
    });
  });
});
describe("Given Graph.updateNodeIcon static method exist", () => {
  describe("and node exist", () => {
    let node: Node;
    beforeEach(() => {
      node = Graph.createNode({
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
    });
    describe("when updatedNode = Graph.updateNodeIcon(node, icon)", () => {
      let icon: string;
      let newIcon: string;
      beforeEach(() => {
        icon = node.icon;
        newIcon = "./newIcon.svg";
        node = Graph.updateNodeIcon(node, newIcon);
      });
      it("then node icon is updated", () => {
        expect(node.icon).toEqual(newIcon);
      });
    });
  });
});
describe("Given Graph.updateNodeCoordinates static method exist", () => {
  describe("when updateNode = Graph.updateNodeCoordinates(node, coordinates)", () => {
    let node: Node;
    let coordinates: Coordinates;
    let updatedNode: Node;
    beforeEach(() => {
      node = Graph.createNode({
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      coordinates = { x: 1, y: 1 };
      updatedNode = Graph.updateNodeCoordinates(node, coordinates);
    });
    it("then updatedNode exist", () => {
      expect(updatedNode).toBeDefined();
    });
    it("then updatedNode.id exist", () => {
      expect(updatedNode.id).toBeDefined();
    });
    it("then updatedNode.name exist", () => {
      expect(updatedNode.name).toBeDefined();
    });
    it("then updatedNode.type exist", () => {
      expect(updatedNode.type).toBeDefined();
    });
    it("then updatedNode.coordinates exist", () => {
      expect(updatedNode.coordinates).toBeDefined();
    });
    it("then updatedNode.icon exist", () => {
      expect(updatedNode.icon).toBeDefined();
    });
    it("then updatedNode.id equals node.id", () => {
      expect(updatedNode.id).toEqual(node.id);
    });
    it("then updatedNode.name equals node.name", () => {
      expect(updatedNode.name).toEqual(node.name);
    });
    it("then updatedNode.type equals node.type", () => {
      expect(updatedNode.type).toEqual(node.type);
    });
    it("then result.coordinates equals coordinates", () => {
      expect(updatedNode.coordinates).toEqual(coordinates);
    });
    it("then result.coordinates is not equal to node.coordinates", () => {
      expect(updatedNode.coordinates).not.toEqual(node.coordinates);
    });
    it("then updatedNode.icon equals node.icon", () => {
      expect(updatedNode.icon).toEqual(node.icon);
    });
  });
});
describe("Given Graph.updateNodeCoordinates static method exist", () => {
  describe("when updateNode = Graph.updateNodeCoordinates(connection, coordinates)", () => {
    let connection: Connection;
    let coordinates: { start: Coordinates; end: Coordinates };
    let updatedNode: Connection;
    beforeEach(() => {
      connection = Graph.createConnection({
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 0, y: 400 },
          end: { x: 100, y: 400 },
        },
      });
      coordinates = {
        start: { x: 1, y: 500 },
        end: { x: 200, y: 500 },
      };
      updatedNode = Graph.updateConnectionCoordinates(connection, coordinates);
    });
    it("then updatedNode exist", () => {
      expect(updatedNode).toBeDefined();
    });
    it("then updatedNode.id exist", () => {
      expect(updatedNode.id).toBeDefined();
    });
    it("then updatedNode.name exist", () => {
      expect(updatedNode.name).toBeDefined();
    });
    it("then updatedNode.coordinates exist", () => {
      expect(updatedNode.coordinates).toBeDefined();
    });
    it("then updatedNode.id equals connection.id", () => {
      expect(updatedNode.id).toEqual(connection.id);
    });
    it("then updatedNode.name equals connection.name", () => {
      expect(updatedNode.name).toEqual(connection.name);
    });
    it("then result.coordinates equals coordinates", () => {
      expect(updatedNode.coordinates).toEqual(coordinates);
    });
    it("then result.coordinates is not equal to connection.coordinates", () => {
      expect(updatedNode.coordinates).not.toEqual(connection.coordinates);
    });
  });
});
describe("Given Graph.translate static method exist", () => {
  describe("and node exist", () => {
    let node: Node;
    beforeEach(() => {
      node = Graph.createNode({
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
    });
    describe("when node = Graph.translate(node, offset)", () => {
      let coordinates;
      let offset;
      beforeEach(() => {
        coordinates = node.coordinates;
        offset = {
          x: 10,
          y: 10,
        };
        node = Graph.translateNode(node, offset);
      });
      it("then node coordinates is original coordinates plus offset ", () => {
        let updateCoordinates = {
          x: coordinates.x + offset.x,
          y: coordinates.y + offset.y,
        };
        expect(node.coordinates).toEqual(updateCoordinates);
      });
    });
  });
});
describe("Given Graph.translateConnection static method exist", () => {
  describe("and connection exist", () => {
    let connection: Connection;
    beforeEach(() => {
      connection = Graph.createConnection({
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 0, y: 400 },
          end: { x: 100, y: 400 },
        },
      });
    });
    describe("when connection = Graph.translateConnection(connection, offset)", () => {
      let coordinates;
      let offset;
      beforeEach(() => {
        coordinates = connection.coordinates;
        offset = {
          x: 10,
          y: 10,
        };
        connection = Graph.translateConnection(connection, offset);
      });
      it("then connection coordinates is original coordinates plus offset ", () => {
        let updateCoordinates = {
          start: {
            x: coordinates.start.x + offset.x,
            y: coordinates.start.y + offset.y,
          },
          end: {
            x: coordinates.end.x + offset.x,
            y: coordinates.end.y + offset.y,
          },
        };
        expect(connection.coordinates).toEqual(updateCoordinates);
      });
    });
  });
});
describe("Given Graph.removeNodeMetadata static method exist", () => {
  describe("Given node with metadata exist in nodes", () => {
    let node: Node;
    beforeEach(() => {
      node = Graph.createNode({
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      node = Graph.addNodeMetadata(node, {
        arrival: {
          distribution: "exponential",
          parameters: [{ rate: 1 }],
        },
      });
    });
    describe("When Graph.removeNodeMetadata(node, type)", () => {
      let type: NodeMetadataType;
      beforeEach(() => {
        type = "arrival";
        node = Graph.removeNodeMetadata(node, type);
      });
      it("then node does not contain metadata of type", () => {
        expect(node.metadata).toEqual([]);
      });
    });
  });
});
describe("Given Graph.translateConnection static method exist", () => {
  describe("and connection exist", () => {
    let connection: Connection;
    beforeEach(() => {
      connection = Graph.createConnection({
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 1, y: 500 },
          end: { x: 500, y: 500 },
        },
      });
    });
    describe("when connection = Graph.translateConnection(connection, offset)", () => {
      let coordinates;
      let offset;
      beforeEach(() => {
        coordinates = connection.coordinates;
        offset = {
          x: 10,
          y: 10,
        };
        connection = Graph.translateConnection(connection, offset);
      });
      it("then connection coordinates is original coordinates plus offset ", () => {
        let updateCoordinates = {
          start: {
            x: coordinates.start.x + offset.x,
            y: coordinates.start.y + offset.y,
          },
          end: {
            x: coordinates.end.x + offset.x,
            y: coordinates.end.y + offset.y,
          },
        };
        expect(connection.coordinates).toEqual(updateCoordinates);
      });
    });
  });
});

// Instance Members Availability
describe("when graph = new Graph()", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  it("then graph.metadata exist", () => {
    expect(graph.metadata).toBeDefined();
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

// Instance Property Values
describe("Given graph.metadata public property exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  it("then graph.metadata.id exist", () => {
    expect(graph.metadata.id).toBeDefined();
  });
  it("then graph.metadata.name equals 'ACS Diagnostic'", () => {
    expect(graph.metadata.name).toBe("ACS Diagnostic");
  });
  it("then graph.metadata.type equals GraphType.PATHWAY", () => {
    expect(graph.metadata.type).toBe(GraphType.PATHWAY as GraphType);
  });
});
describe("Given graph.nodes public property exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  it("then graph.nodes exist", () => {
    expect(graph.nodes).toBeDefined();
  });
  it("then graph.nodes is empty", () => {
    expect(graph.nodes.length).toBe(0);
  });
});
describe("Given graph.connections public property exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  it("then graph.connections exist", () => {
    expect(graph.connections).toBeDefined();
  });
  it("then graph.connections is empty", () => {
    expect(graph.connections.length).toBe(0);
  });
});

// Instance Method Behavior
describe("Given graph.createNodes method exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  describe("when nodes = graph.createNodes(1, details)", () => {
    let nodes: Nodes;
    beforeEach(() => {
      let details = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeType),
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
describe("Given graph.createConnections method exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  describe("when connections = graph.createConnections(1, details)", () => {
    let connections: Connection[];
    beforeEach(() => {
      let details = {
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 0, y: 400 },
          end: { x: 100, y: 400 },
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
});
describe("Given graph.addNode method exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  describe("when graph.addNode(details)", () => {
    beforeEach(() => {
      let details = {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeType),
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
describe("Given graph.addConnection method exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  describe("when graph.addConnection(details)", () => {
    beforeEach(() => {
      let details = {
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 0, y: 400 },
          end: { x: 100, y: 400 },
        },
      };
      graph.addConnection(details);
    });
    it("then graph.connections exist", () => {
      expect(graph.connections).toBeDefined();
    });
    it("then graph.connections.length equals 1", () => {
      expect(graph.connections.length).toBe(1);
    });
  });
});
describe("Given graph.addNodes method exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  describe("when graph.addNodes(newNodes)", () => {
    let newNodes: Nodes;
    beforeEach(() => {
      graph.nodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      newNodes = graph.createNodes(2, {
        name: "Node2",
        type: Utilities.getRandomElement<NodeType>(NodeType),
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
describe("Given graph.addConnections method exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  describe("when graph.addConnections(newConnections)", () => {
    let newConnections: Connection[];
    beforeEach(() => {
      graph.connections = graph.createConnections(2, {
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 0, y: 400 },
          end: { x: 100, y: 400 },
        },
      });
      newConnections = graph.createConnections(2, {
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 0, y: 400 },
          end: { x: 100, y: 400 },
        },
      });
      graph.addConnections(newConnections);
    });
    it("then graph.connections exist", () => {
      expect(graph.connections).toBeDefined();
    });
    it("then graph.connections.length equals 4", () => {
      expect(graph.connections.length).toBe(4);
    });
  });
});
describe("Given graph.addNodeMetadata method exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  describe("when graph.addNodeMetadata(existingNodes, id, metadata)", () => {
    let id: UUID;
    let metadata: NodeMetadata;
    beforeEach(() => {
      graph.nodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeType),
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
describe("Given graph.updateNodeMetadata method exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  describe("when graph.updateNodeMetadata(id, metadata)", () => {
    let id: UUID;
    let updatedMetadata: NodeMetadata;
    beforeEach(() => {
      graph.nodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = graph.nodes[1].id;
      const metadata = {
        arrival: {
          distribution: "exponential",
          parameters: [{ rate: 1 }],
        },
      };
      graph.addNodeMetadata(id, metadata);
      updatedMetadata = {
        arrival: {
          distribution: "exponential",
          parameters: [{ rate: 2 }],
        },
      };
      graph.updateNodeMetadata(id, updatedMetadata);
    });
    it("then graph.nodes exist", () => {
      expect(graph.nodes).toBeDefined();
    });
    it("then nodes.length equals 2", () => {
      expect(graph.nodes.length).toBe(2);
    });
    it("then graph.nodes[1].metadata[0] equals metadata", () => {
      expect(graph.nodes[1].metadata[0]).toEqual(updatedMetadata);
    });
  });
});
describe("Given graph.updateNodeCoordinates method exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  describe("when graph.updateNodeCoordinates(id, coordinates)", () => {
    let id: UUID;
    let coordinates: Coordinates;
    beforeEach(() => {
      graph.nodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = graph.nodes[1].id;
      coordinates = { x: 1, y: 1 };
      graph.updateNodeCoordinates(id, coordinates);
    });
    it("then graph.nodes exist", () => {
      expect(graph.nodes).toBeDefined();
    });
    it("then nodes.length equals 2", () => {
      expect(graph.nodes.length).toBe(2);
    });
    it("then graph.nodes[1].coordinates equals coordinates", () => {
      expect(graph.nodes[1].coordinates).toEqual(coordinates);
    });
  });
});
describe("Given graph.updateConnectionCoordinates method exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  describe("when graph.updateConnectionCoordinates(id, coordinates)", () => {
    let id: UUID;
    let coordinates: { start: Coordinates; end: Coordinates };
    beforeEach(() => {
      graph.connections = graph.createConnections(2, {
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 1, y: 500 },
          end: { x: 500, y: 500 },
        },
      });
      id = graph.connections[1].id;
      coordinates = {
        start: { x: 1, y: 1 },
        end: { x: 1, y: 1 },
      };
      graph.updateConnectionCoordinates(id, coordinates);
    });
    it("then graph.connections exist", () => {
      expect(graph.connections).toBeDefined();
    });
    it("then connections.length equals 2", () => {
      expect(graph.connections.length).toBe(2);
    });
    it("then graph.connections[1].coordinates equals coordinates", () => {
      expect(graph.connections[1].coordinates).toEqual(coordinates);
    });
  });
});
describe("Given graph.updateNodeIcon method exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  describe("when graph.updateNodeIcon(id, icon)", () => {
    let id: UUID;
    let icon: string;
    beforeEach(() => {
      graph.nodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = graph.nodes[1].id;
      icon = "./newIcon.svg";
      graph.updateNodeIcon(id, icon);
    });
    it("then graph.nodes exist", () => {
      expect(graph.nodes).toBeDefined();
    });
    it("then nodes.length equals 2", () => {
      expect(graph.nodes.length).toBe(2);
    });
    it("then graph.nodes[1].icon equals icon", () => {
      expect(graph.nodes[1].icon).toEqual(icon);
    });
  });
});
describe("Given graph.updateNode method exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  describe("when updatedNode = graph.updateNode(existingNodes, update)", () => {
    let node: Node;
    let update: Node;
    beforeEach(() => {
      graph.nodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      node = graph.nodes[1];
      update = {
        id: node.id,
        name: "Node2",
        type: "workflow",
        coordinates: { x: 1, y: 1 },
        icon: "./icon.svg",
      };
      graph.updateNode(node.id, update);
    });
    it("then graph.nodes exist", () => {
      expect(graph.nodes).toBeDefined();
    });
    it("then nodes.length equals 2", () => {
      expect(graph.nodes.length).toBe(2);
    });
    it("then graph.nodes[1] equals update", () => {
      expect(graph.nodes[1]).toEqual(update);
    });
  });
});
describe("Given graph.updateConnection method exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  describe("when updatedConnection = graph.updateConnection(existingConnections, update)", () => {
    let connection: Connection;
    let update: Connection;
    beforeEach(() => {
      graph.connections = graph.createConnections(2, {
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 1, y: 500 },
          end: { x: 500, y: 500 },
        },
      });
      connection = graph.connections[1];
      update = {
        id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 1, y: 1 },
          end: { x: 1, y: 1 },
        },
      };
      graph.updateConnection(connection.id, update);
    });
    it("then graph.connections exist", () => {
      expect(graph.connections).toBeDefined();
    });
    it("then connections.length equals 2", () => {
      expect(graph.connections.length).toBe(2);
    });
    it("then graph.connections[1] equals update", () => {
      update.id = connection.id;
      expect(graph.connections[1]).toEqual(update);
    });
  });
});
describe("Given graph.findNodeById method exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  describe("when node = graph.findNodeById(existingNodes, id)", () => {
    let node: Node;
    let id: UUID;
    beforeEach(() => {
      graph.nodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeType),
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
describe("Given graph.findConnectionById method exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  describe("when connection = graph.findConnectionById(existingConnections, id)", () => {
    let connection: Connection;
    let id: UUID;
    beforeEach(() => {
      graph.connections = graph.createConnections(2, {
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 1, y: 500 },
          end: { x: 500, y: 500 },
        },
      });
      id = graph.connections[1].id;
      connection = graph.findConnectionById(id);
    });
    it("then connection exist", () => {
      expect(connection).toBeDefined();
    });
    it("then connection equals graph.connections[1]", () => {
      expect(connection).toEqual(graph.connections[1]);
    });
  });
});
describe("Given graph.findNodesByType method exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
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
      type = NodeType.WORKFLOW;
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
describe("Given graph.findNodeByCoordinates method exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  describe("when node = graph.findNodeByCoordinates(coordinates)", () => {
    let coordinates: Coordinates;
    let node: Node;
    beforeEach(() => {
      graph.nodes = graph.createNodes(1, {
        name: "Node1",
        type: "workflow",
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      coordinates = { x: 0, y: 0 };
      node = graph.findNodeByCoordinates(coordinates);
    });
    it("then node exist", () => {
      expect(node).toBeDefined();
    });
    it("then node equals graph.nodes[1]", () => {
      expect(node).toEqual(graph.nodes[0]);
    });
  });
});
describe("Given graph.translateNode method exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  describe("When node exists in nodes", () => {
    let id: UUID;
    let nodes: Nodes;
    beforeEach(() => {
      let details = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeType),
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
      let details;
      let node;
      beforeEach(() => {
        details = {
          name: "New Node",
          type: "workflow",
          coordinates: { x: 10, y: 10 },
          icon: "./new-icon.svg",
        };
        node = Graph.createNode(details);
        graph.updateNode(id, node);
      });
      it("then graph.nodes[0] equals update", () => {
        node.id = graph.nodes[0].id;
        expect(graph.nodes[0]).toEqual(node);
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
describe("Given graph.translateConnection method exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  describe("When connection exists in connections", () => {
    let id: UUID;
    let connections: Connection[];
    beforeEach(() => {
      let details = {
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 1, y: 500 },
          end: { x: 500, y: 500 },
        },
      };
      graph.connections = graph.createConnections(1, details);
      id = graph.connections[0].id;
    });
    describe("when graph.translateConnection(id, offset)", () => {
      let offset;
      let coordinates;
      beforeEach(() => {
        coordinates = graph.connections[0].coordinates;
        offset = { x: 10, y: 10 };
        graph.translateConnection(id, offset);
      });
      it("then graph.connections[0].coordinates.start.x equals coordinates.start.x + offset.x", () => {
        expect(graph.connections[0].coordinates.start.x).toEqual(
          coordinates.start.x + offset.x
        );
      });
      it("then graph.connections[0].coordinates.start.y equals coordinates.start.y + offset.y", () => {
        expect(graph.connections[0].coordinates.start.y).toEqual(
          coordinates.start.y + offset.y
        );
      });
      it("then graph.connections[0].coordinates.end.x equals coordinates.end.x + offset.x", () => {
        expect(graph.connections[0].coordinates.end.x).toEqual(
          coordinates.end.x + offset.x
        );
      });
      it("then graph.connections[0].coordinates.end.y equals coordinates.end.y + offset.y", () => {
        expect(graph.connections[0].coordinates.end.y).toEqual(
          coordinates.end.y + offset.y
        );
      });
    });
  });
});
describe("Given graph.removeNodeMetadata method exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  describe("when graph.removeNodeMetadata(id, type)", () => {
    let id: UUID;
    let metadata: NodeMetadata;
    beforeEach(() => {
      graph.nodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeType),
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
      graph.removeNodeMetadata(id, "arrival");
    });
    it("then graph.nodes exist", () => {
      expect(graph.nodes).toBeDefined();
    });
    it("then graph.nodes[1].metadata does not contain metadata of type", () => {
      expect(graph.nodes[1].metadata).toEqual([]);
    });
  });
});
describe("Given graph.removeNodeById exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  describe("when graph.removeNodeById(existingNodes, id)", () => {
    let id: UUID;
    beforeEach(() => {
      graph.nodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeType),
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
describe("Given graph.removeConnectionById exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  describe("when graph.removeConnectionById(existingConnections, id)", () => {
    let id: UUID;
    beforeEach(() => {
      graph.connections = graph.createConnections(2, {
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 1, y: 500 },
          end: { x: 500, y: 500 },
        },
      });
      id = graph.connections[1].id;
      graph.removeConnectionById(id);
    });
    it("then graph.connections exist", () => {
      expect(graph.connections).toBeDefined();
    });
    it("then graph.connections.length equals 1", () => {
      expect(graph.connections.length).toBe(1);
    });
  });
});
