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
  UUID,
} from "@scalable-software/graph.structure";

// Instance Members Availability
describe("Given graph = new Graph()", () => {
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
describe("Given graph.nodes.add method exist", () => {
  let graph: Graph;
  beforeEach(() => {
    graph = new Graph({
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    });
  });
  describe("when graph.node.add(details)", () => {
    let details;
    beforeEach(() => {
      details = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      graph.nodes.add(details);
    });
    it("then a node is added to graph.nodes", () => {
      expect(graph.nodes.length).toBe(1);
    });
    describe("given a node is added to graph.nodes", () => {
      let node;
      beforeEach(() => {
        node = graph.nodes[0];
        delete node.id;
      });
      it("then node contains details", () => {
        expect(node).toEqual(details);
      });
    });
  });
});
describe("Given graph.connections.add method exist", () => {
  let graph: Graph;
  beforeEach(() => {
    graph = new Graph({
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    });
  });
  describe("when graph.connection.add(details)", () => {
    let details;
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
      graph.connections.add(details);
    });
    it("then a connection is added to graph.connections", () => {
      expect(graph.connections.length).toBe(1);
    });
    describe("given a connection is added to graph.connections", () => {
      let connection;
      beforeEach(() => {
        connection = graph.connections[0];
        delete connection.id;
      });
      it("then connection contains details", () => {
        expect(connection).toEqual(details);
      });
    });
  });
  describe("when graph.connections.add(details).add(details)", () => {
    beforeEach(() => {
      graph.connections
        .add({
          name: "",
          source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
          target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          coordinates: {
            start: { x: 0, y: 400 },
            end: { x: 100, y: 400 },
          },
        })
        .add({
          name: "",
          source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
          target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          coordinates: {
            start: { x: 0, y: 400 },
            end: { x: 100, y: 400 },
          },
        });
    });
    it("then graph.connections exist", () => {
      expect(graph.connections).toBeDefined();
    });
    it("then graph.connections.length equals 2", () => {
      expect(graph.connections.length).toBe(2);
    });
  });
});
describe("Given graph.nodes.addMetadata method exist", () => {
  let graph: Graph;
  beforeEach(() => {
    const metadata = {
      name: "ACS Diagnostic",
      type: GraphType.PATHWAY,
    };
    graph = new Graph(metadata);
  });
  describe("and graph.nodes contains a node with no metadata", () => {
    let node;
    beforeEach(() => {
      graph.nodes.add({
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      node = graph.nodes[0];
    });
    it("then node.metadata is undefined", () => {
      expect(node.metadata).toBeUndefined();
    });
    describe("when graph.nodes.addMetadata(id, metadata)", () => {
      let metadata: NodeMetadata;
      beforeEach(() => {
        const id = node.id;
        metadata = {
          arrival: {
            distribution: "exponential",
            parameters: [{ rate: 1 }],
          },
        };
        graph.nodes.addMetadata(id, metadata);
        node = graph.nodes[0];
      });
      it("then node.metadata is equal to [metadata]", () => {
        expect(node.metadata).toEqual([metadata]);
      });
    });
  });
});
describe("Given graph.nodes.updateMetadata method exist", () => {
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
      graph.nodes.add({
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = graph.nodes[0].id;
      const metadata = {
        arrival: {
          distribution: "exponential",
          parameters: [{ rate: 1 }],
        },
      };
      graph.nodes.addMetadata(id, metadata);
      updatedMetadata = {
        arrival: {
          distribution: "exponential",
          parameters: [{ rate: 2 }],
        },
      };
      graph.nodes.updateMetadata(id, updatedMetadata);
    });
    it("then graph.nodes exist", () => {
      expect(graph.nodes).toBeDefined();
    });
    it("then nodes.length equals 1", () => {
      expect(graph.nodes.length).toBe(1);
    });
    it("then graph.nodes[0].metadata[0] equals metadata", () => {
      expect(graph.nodes[0].metadata[0]).toEqual(updatedMetadata);
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
      graph.nodes.add({
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = graph.nodes[0].id;
      coordinates = { x: 1, y: 1 };
      graph.updateNodeCoordinates(id, coordinates);
    });
    it("then graph.nodes exist", () => {
      expect(graph.nodes).toBeDefined();
    });
    it("then nodes.length equals 1", () => {
      expect(graph.nodes.length).toBe(1);
    });
    it("then graph.nodes[0].coordinates equals coordinates", () => {
      expect(graph.nodes[0].coordinates).toEqual(coordinates);
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
      graph.nodes.add({
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = graph.nodes[0].id;
      icon = "./newIcon.svg";
      graph.updateNodeIcon(id, icon);
    });
    it("then graph.nodes exist", () => {
      expect(graph.nodes).toBeDefined();
    });
    it("then nodes.length equals 1", () => {
      expect(graph.nodes.length).toBe(1);
    });
    it("then graph.nodes[0].icon equals icon", () => {
      expect(graph.nodes[0].icon).toEqual(icon);
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
      graph.nodes.add({
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      node = graph.nodes[0];
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
    it("then nodes.length equals 1", () => {
      expect(graph.nodes.length).toBe(1);
    });
    it("then graph.nodes[0] equals update", () => {
      expect(graph.nodes[0]).toEqual(update);
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
      graph.connections.add({
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 1, y: 500 },
          end: { x: 500, y: 500 },
        },
      });
      connection = graph.connections[0];
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
    it("then connections.length equals 1", () => {
      expect(graph.connections.length).toBe(1);
    });
    it("then graph.connections[0] equals update", () => {
      update.id = connection.id;
      expect(graph.connections[0]).toEqual(update);
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
      graph.nodes.add({
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = graph.nodes[0].id;
      node = graph.findNodeById(id);
    });
    it("then node exist", () => {
      expect(node).toBeDefined();
    });
    it("then node equals graph.nodes[0]", () => {
      expect(node).toEqual(graph.nodes[0]);
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
      graph.connections.add({
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 1, y: 500 },
          end: { x: 500, y: 500 },
        },
      });
      id = graph.connections[0].id;
      connection = graph.findConnectionById(id);
    });
    it("then connection exist", () => {
      expect(connection).toBeDefined();
    });
    it("then connection equals graph.connections[0]", () => {
      expect(connection).toEqual(graph.connections[0]);
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
    let nodes;
    beforeEach(() => {
      graph.nodes.add({
        name: "Node1",
        type: "workflow",
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      graph.nodes.add({
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
    it("then nodes.length equals 1", () => {
      expect(nodes.length).toBe(1);
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
    let nodes;
    beforeEach(() => {
      let details = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 10, y: 10 },
        icon: "./icon.svg",
      };
      graph.nodes.add(details);
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
        const id = graph.nodes[0].id;
        details = {
          id: id,
          name: "New Node",
          type: "workflow",
          coordinates: { x: 10, y: 10 },
          icon: "./new-icon.svg",
        };
        node = graph.nodes[0];
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
      graph.connections.add(details);
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
      graph.nodes.add({
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = graph.nodes[0].id;
      metadata = {
        arrival: {
          distribution: "exponential",
          parameters: [{ rate: 1 }],
        },
      };
      graph.nodes.addMetadata(id, metadata);
      graph.removeNodeMetadata(id, "arrival");
    });
    it("then graph.nodes exist", () => {
      expect(graph.nodes).toBeDefined();
    });
    it("then graph.nodes[0].metadata does not contain metadata of type", () => {
      expect(graph.nodes[0].metadata).toEqual([]);
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
      graph.nodes.add({
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = graph.nodes[0].id;
      graph.removeNodeById(id);
    });
    it("then graph.nodes exist", () => {
      expect(graph.nodes).toBeDefined();
    });
    it("then graph.nodes.length equals 0", () => {
      expect(graph.nodes.length).toBe(0);
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
      graph.connections.add({
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 1, y: 500 },
          end: { x: 500, y: 500 },
        },
      });
      id = graph.connections[0].id;
      graph.removeConnectionById(id);
    });
    it("then graph.connections exist", () => {
      expect(graph.connections).toBeDefined();
    });
    it("then graph.connections.length equals 0", () => {
      expect(graph.connections.length).toBe(0);
    });
  });
});
