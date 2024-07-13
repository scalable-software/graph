import {
  Nodes,
  Node,
  NodeType,
  NodeMetadata,
  NodeMetadataType,
} from "../../src/Nodes.Extended.js";
import { Utilities, UUID } from "@scalable-software/graph.structure";

// Class Availability
describe("Given Nodes imported", () => {
  it("then Nodes exist", () => {
    expect(Nodes).toBeDefined();
  });
});

// Static Method Availability
describe("Given Nodes Imported", () => {
  it("then Nodes.create public static method exists", () => {
    expect(Nodes.create).toBeDefined();
  });
  it("then Nodes.getMetadataType public static method exists", () => {
    expect(Nodes.getMetadataType).toBeDefined();
  });
  it("then Nodes.getMetadataTypes public static method exists", () => {
    expect(Nodes.getMetadataTypes).toBeDefined();
  });
  it("then Nodes.hasMetadata public static method exists", () => {
    expect(Nodes.hasMetadata).toBeDefined();
  });
  it("then Nodes.hasMetadataType public static method exists", () => {
    expect(Nodes.hasMetadataType).toBeDefined();
  });
  it("then Nodes.addMetadata public static method exists", () => {
    expect(Nodes.addMetadata).toBeDefined();
  });
  it("then Nodes.update public static method exists", () => {
    expect(Nodes.update).toBeDefined();
  });
  it("then Nodes.updateMetadata public static method exists", () => {
    expect(Nodes.updateMetadata).toBeDefined();
  });
  it("then Nodes.updateIcon public static method exists", () => {
    expect(Nodes.updateIcon).toBeDefined();
  });
});

// Static Method Behavior
describe("Given Nodes.create() static method exist", () => {
  describe("when node = Nodes.create(details)", () => {
    let details: Omit<Node, "id">;
    let node: Node;
    beforeEach(() => {
      details = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      node = Nodes.create(details);
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
describe("Given Nodes.getMetadataType() static method exist", () => {
  describe("when metadataType = Nodes.getMetadataType(metadata)", () => {
    let metadata: NodeMetadata;
    let metadataType: NodeMetadataType;
    beforeEach(() => {
      metadata = {
        arrival: {
          distribution: "exponential",
          parameters: [{ rate: 1 }],
        },
      };
      metadataType = Nodes.getMetadataType(metadata);
    });
    it("then metadataType is exist", () => {
      expect(metadataType).toBeDefined();
    });
    it("then metadataType is equal to 'arrival'", () => {
      expect(metadataType).toEqual("arrival");
    });
  });
});
describe("Given Nodes.getMetadataTypes() static method exist", () => {
  describe("and node has no metadata", () => {
    describe("when metadataTypes = Nodes.getMetadataTypes(node)", () => {
      let node: Node;
      let metadataTypes: NodeMetadataType[];
      beforeEach(() => {
        node = {
          id: Utilities.uuid,
          name: "Node",
          type: Utilities.getRandomElement<NodeType>(NodeType),
          coordinates: { x: 0, y: 0 },
          icon: "./icon.svg",
          metadata: [
            {
              arrival: {
                distribution: "exponential",
                parameters: [{ rate: 1 }],
              },
            },
            {
              duration: {
                distribution: "log normal",
                parameters: [{ meanlog: 0.1640238 }, { sdlog: 0.4169375 }],
              },
            },
          ],
        };
        metadataTypes = Nodes.getMetadataTypes(node);
      });
      it("then metadataTypes is exist", () => {
        expect(metadataTypes).toBeDefined();
      });
      it("then metadataTypes is an array", () => {
        expect(metadataTypes).toBeInstanceOf(Array);
      });
      it("then metadataTypes is equal to ['arrival', 'duration']", () => {
        expect(metadataTypes).toEqual(["arrival", "duration"]);
      });
    });
  });
  describe("and node has metadata", () => {
    describe("when metadataTypes = Nodes.getMetadataTypes(node)", () => {
      let node: Node;
      let metadataTypes: NodeMetadataType[];
      beforeEach(() => {
        node = {
          id: Utilities.uuid,
          name: "Node",
          type: Utilities.getRandomElement<NodeType>(NodeType),
          coordinates: { x: 0, y: 0 },
          icon: "./icon.svg",
        };
        metadataTypes = Nodes.getMetadataTypes(node);
      });
      it("then metadataTypes is exist", () => {
        expect(metadataTypes).toBeDefined();
      });
      it("then metadataTypes is an array", () => {
        expect(metadataTypes).toBeInstanceOf(Array);
      });
      it("then metadataTypes is equal to []", () => {
        expect(metadataTypes).toEqual([]);
      });
    });
  });
});
describe("Given Nodes.hasMetadata() static method exist", () => {
  describe("and node has metadata", () => {
    let node: Node;
    beforeEach(() => {
      node = {
        id: Utilities.uuid,
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
        metadata: [
          {
            arrival: {
              distribution: "exponential",
              parameters: [{ rate: 1 }],
            },
          },
          {
            duration: {
              distribution: "log normal",
              parameters: [{ meanlog: 0.1640238 }, { sdlog: 0.4169375 }],
            },
          },
        ],
      };
    });
    describe("when hasMetadata = Nodes.hasMetadata(node)", () => {
      let hasMetadata: boolean;
      beforeEach(() => {
        hasMetadata = Nodes.hasMetadata(node);
      });
      it("then hasMetadata is exist", () => {
        expect(hasMetadata).toBeDefined();
      });
      it("then hasMetadata is equal to true", () => {
        expect(hasMetadata).toEqual(true);
      });
    });
  });
  describe("and node has no metadata", () => {
    let node: Node;
    beforeEach(() => {
      node = {
        id: Utilities.uuid,
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
    });
    describe("when hasMetadata = Nodes.hasMetadata(node)", () => {
      let hasMetadata: boolean;
      beforeEach(() => {
        hasMetadata = Nodes.hasMetadata(node);
      });
      it("then hasMetadata is exist", () => {
        expect(hasMetadata).toBeDefined();
      });
      it("then hasMetadata is equal to false", () => {
        expect(hasMetadata).toEqual(false);
      });
    });
  });
});
describe("Given Nodes.hasMetadataType() static method exist", () => {
  describe("and type = 'arrival'", () => {
    let node: Node;
    let type: NodeMetadataType;
    beforeEach(() => {
      node = {
        id: Utilities.uuid,
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
        metadata: [
          {
            arrival: {
              distribution: "exponential",
              parameters: [{ rate: 1 }],
            },
          },
          {
            duration: {
              distribution: "log normal",
              parameters: [{ meanlog: 0.1640238 }, { sdlog: 0.4169375 }],
            },
          },
        ],
      };
      type = "arrival";
    });
    describe("when hasMetadataType = Nodes.hasMetadataType(node, type)", () => {
      let hasMetadataType: boolean;
      beforeEach(() => {
        hasMetadataType = Nodes.hasMetadataType(node, type);
      });
      it("then hasMetadataType is exist", () => {
        expect(hasMetadataType).toBeDefined();
      });
      it("then hasMetadataType is equal to true", () => {
        expect(hasMetadataType).toEqual(true);
      });
    });
  });
  describe("and type = 'prevalence'", () => {
    let node: Node;
    let type: NodeMetadataType;
    beforeEach(() => {
      node = {
        id: Utilities.uuid,
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
        metadata: [
          {
            arrival: {
              distribution: "exponential",
              parameters: [{ rate: 1 }],
            },
          },
          {
            duration: {
              distribution: "log normal",
              parameters: [{ meanlog: 0.1640238 }, { sdlog: 0.4169375 }],
            },
          },
        ],
      };
      type = "prevalence";
    });
    describe("when hasMetadataType = Nodes.hasMetadataType(node, type)", () => {
      let hasMetadataType: boolean;
      beforeEach(() => {
        hasMetadataType = Nodes.hasMetadataType(node, type);
      });
      it("then hasMetadataType is exist", () => {
        expect(hasMetadataType).toBeDefined();
      });
      it("then hasMetadataType is equal to false", () => {
        expect(hasMetadataType).toEqual(false);
      });
    });
  });
});
describe("Given Nodes.addMetadata() static method exist", () => {
  describe("and node has no metadata", () => {
    describe("when extendedNode = Nodes.addMetadata(node, metadata)", () => {
      let node: Node;
      let metadata: NodeMetadata;
      let extendedNode;
      beforeEach(() => {
        node = {
          id: Utilities.uuid,
          name: "Node",
          type: Utilities.getRandomElement<NodeType>(NodeType),
          coordinates: { x: 0, y: 0 },
          icon: "./icon.svg",
        };
        metadata = {
          arrival: {
            distribution: "exponential",
            parameters: [{ rate: 1 }],
          },
        };
        extendedNode = Nodes.addMetadata(node, metadata);
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
  describe("and node has metadata of same type", () => {
    describe("when extendedNode = Nodes.addMetadata(node, metadata)", () => {
      let node: Node;
      let metadata: NodeMetadata;
      let extendedNode;
      beforeEach(() => {
        node = {
          id: Utilities.uuid,
          name: "Node",
          type: Utilities.getRandomElement<NodeType>(NodeType),
          coordinates: { x: 0, y: 0 },
          icon: "./icon.svg",
          metadata: [
            {
              arrival: {
                distribution: "exponential",
                parameters: [{ rate: 1 }],
              },
            },
          ],
        };
        metadata = {
          arrival: {
            distribution: "exponential",
            parameters: [{ rate: 10 }],
          },
        };
        extendedNode = Nodes.addMetadata(node, metadata);
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
  describe("and node has metadata of different type", () => {
    describe("when extendedNode = Nodes.addMetadata(node, metadata)", () => {
      let node: Node;
      let metadata: NodeMetadata;
      let extendedNode;
      beforeEach(() => {
        node = {
          id: Utilities.uuid,
          name: "Node",
          type: Utilities.getRandomElement<NodeType>(NodeType),
          coordinates: { x: 0, y: 0 },
          icon: "./icon.svg",
          metadata: [
            {
              arrival: {
                distribution: "exponential",
                parameters: [{ rate: 1 }],
              },
            },
          ],
        };
        metadata = {
          duration: {
            distribution: "log normal",
            parameters: [{ meanlog: 0.1640238 }, { sdlog: 0.4169375 }],
          },
        };
        extendedNode = Nodes.addMetadata(node, metadata);
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
        expect(extendedNode.metadata[1]).toEqual(metadata);
      });
    });
  });
});
describe("Given Nodes.update() static method exist", () => {
  describe("and nodes exist", () => {
    let node: Node;
    beforeEach(() => {
      node = {
        id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        name: "Node",
        type: "workflow",
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
    });
    describe("when updatedNode = Node.update(node, update)", () => {
      let update;
      beforeEach(() => {
        update = {
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
        node = Nodes.update(node, update);
      });
      it("then node icon is updated", () => {
        expect(node).toEqual(update);
      });
    });
  });
});
describe("Given Nodes.updateMetadata() static method exist", () => {
  describe("and node with metadata exist", () => {
    let node: Node;
    beforeEach(() => {
      node = {
        id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        name: "Node",
        type: "workflow",
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
        metadata: [
          {
            arrival: {
              distribution: "exponential",
              parameters: [{ rate: 5 }],
            },
          },
        ],
      };
    });
    describe("when updatedNode = Node.updateMetadata(node, metadata)", () => {
      let metadata: NodeMetadata;
      let updatedNode: Node;
      beforeEach(() => {
        metadata = {
          arrival: {
            distribution: "exponential",
            parameters: [{ rate: 10 }],
          },
        };
        updatedNode = Nodes.updateMetadata(node, metadata);
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

// Constructor Behavior
describe("Given Nodes instantiated", () => {
  it("then Nodes is an instance of Array", () => {
    const nodes = new Nodes();
    expect(nodes).toBeInstanceOf(Array);
  });
});

// Method Availability
describe("Given Nodes instantiated", () => {
  const nodes = new Nodes();
  it("then _getIndex private method exists", () => {
    expect(nodes["_getIndex"]).toBeDefined();
  });
  it("then add public method exists", () => {
    expect(nodes.add).toBeDefined();
  });
  it("then addMetadata public method exists", () => {
    expect(nodes.addMetadata).toBeDefined();
  });
  it("then update public method exists", () => {
    expect(nodes.update).toBeDefined();
  });
  it("then updateMetadata public method exists", () => {
    expect(nodes.updateMetadata).toBeDefined();
  });
  it("then updateIcon public method exists", () => {
    expect(nodes.updateIcon).toBeDefined();
  });
  it("then updateCoordinates public method exists", () => {
    expect(nodes.updateCoordinates).toBeDefined();
  });
  it("then findById public method exists", () => {
    expect(nodes.findById).toBeDefined();
  });
  it("then findByType public method exists", () => {
    expect(nodes.findByType).toBeDefined();
  });
  it("then findByCoordinates public method exists", () => {
    expect(nodes.findByCoordinates).toBeDefined();
  });
});

// Method Behavior
describe("given nodes._getIndex(id) private method exists", () => {
  let nodes: Nodes;
  beforeEach(() => {
    nodes = new Nodes();
  });
  describe("and nodes contains a node with id", () => {
    let id: UUID;
    beforeEach(() => {
      const details = {
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes.add(details);
      id = nodes[0].id;
    });
    describe("when index = nodes._getIndex(id)", () => {
      let index: number;
      beforeEach(() => {
        index = nodes["_getIndex"](id);
      });
      it("then index is 0", () => {
        expect(index).toBe(0);
      });
    });
  });
});
describe("Given nodes.add() public method exists", () => {
  let nodes: Nodes;
  beforeEach(() => {
    nodes = new Nodes();
  });
  describe("when nodes.add(details)", () => {
    let details: Omit<Node, "id">;
    let node: Node;
    beforeEach(() => {
      details = {
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes.add(details);
      node = { ...nodes[0], id: nodes[0].id };
    });
    it("then node with details is added to nodes", () => {
      expect(nodes[0]).toEqual(node);
    });
  });
});
describe("Given nodes.addMetadata() private method exists", () => {
  let nodes;
  beforeEach(() => {
    nodes = new Nodes();
  });
  describe("and nodes contain node without metadata", () => {
    let details: Omit<Node, "id">;
    let id: UUID;
    beforeEach(() => {
      details = {
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes.add(details);
      id = nodes[0].id;
    });
    describe("when nodes.addMetadata(id, metadata)", () => {
      let metadata: NodeMetadata;
      let node: Node;
      beforeEach(() => {
        metadata = {
          arrival: {
            distribution: "exponential",
            parameters: [{ rate: 1 }],
          },
        };
        nodes.addMetadata(id, metadata);
        node = nodes[0];
      });
      it("then metadata is added to node in nodes", () => {
        expect(node.metadata).toEqual([metadata]);
      });
    });
  });
});
describe("Given nodes.update() public method exists", () => {
  let nodes;
  beforeEach(() => {
    nodes = new Nodes();
  });
  describe("and nodes contain node", () => {
    let id: UUID;
    beforeEach(() => {
      nodes.add({
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = nodes[0].id;
    });
    describe("when nodes.update(id, update)", () => {
      let update;
      let node;
      beforeEach(() => {
        update = {
          name: "Node2",
          type: NodeType.END,
          coordinates: { x: 100, y: 100 },
          icon: "./icon2.svg",
        };
        nodes.update(id, update);
        node = nodes[0];
        delete node.id;
      });
      it("then node is updated", () => {
        expect(nodes[0]).toEqual(update);
      });
    });
  });
});
