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
