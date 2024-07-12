import { Nodes, Node, NodeType } from "../../src/Nodes.Extended.js";
import { Utilities } from "@scalable-software/graph.structure";

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
describe("Given nodes.add() public method exists", () => {
  let nodes: Nodes<Node>;
  beforeEach(() => {
    nodes = new Nodes<Node>();
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
