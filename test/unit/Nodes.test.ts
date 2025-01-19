import {
  Nodes,
  PathwayNode,
  NodeType,
  Coordinates,
  Offset,
  Utilities,
  UUID,
} from "@scalable-software/graph";

// Class Availability
describe("Given Nodes imported", () => {
  it("then Nodes exist", () => {
    expect(Nodes).toBeDefined();
  });
});

// Static Method Availability
describe("Given Nodes Exists", () => {
  it("then Nodes.create public static method exists", () => {
    expect(Nodes.create).toBeDefined();
  });
  it("then Nodes.update public static method exists", () => {
    expect(Nodes.update).toBeDefined();
  });
  it("then Nodes.updateCoordinates public static method exists", () => {
    expect(Nodes.updateCoordinates).toBeDefined();
  });
  it("then Nodes.translate public static method exists", () => {
    expect(Nodes.translate).toBeDefined();
  });
});

// Static Method Behavior
describe("Given Nodes.create() static method exist", () => {
  describe("when node = Nodes.create(details)", () => {
    let details: Omit<PathwayNode, "id">;
    let node: PathwayNode;
    beforeEach(() => {
      details = {
        name: "PathwayNode",
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
describe("Given Nodes.update() static method exist", () => {
  describe("and nodes exist", () => {
    let node: PathwayNode;
    beforeEach(() => {
      node = {
        id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        name: "PathwayNode",
        type: "workflow",
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
    });
    describe("when updatedNode = PathwayNode.update(node, update)", () => {
      let update: PathwayNode;
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
describe("Given Nodes.updateCoordinates() static method exist", () => {
  describe("and node exist", () => {
    let node: PathwayNode;
    beforeEach(() => {
      node = {
        id: Utilities.uuid,
        name: "PathwayNode",
        type: "workflow",
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
    });
    describe("when updateNode = Nodes.updateCoordinates(node, coordinates)", () => {
      let coordinates: Coordinates;
      let updatedNode: PathwayNode;
      beforeEach(() => {
        coordinates = { x: 1, y: 1 };
        updatedNode = Nodes.updateCoordinates(node, coordinates);
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
});
describe("Given Nodes.translate() static method exist", () => {
  describe("and node exist", () => {
    let node: PathwayNode;
    beforeEach(() => {
      node = {
        id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        name: "PathwayNode",
        type: "workflow",
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
    });
    describe("when updatedNode = Graph.translate(node, offset)", () => {
      let coordinates: Coordinates;
      let offset: Offset;
      let updatedNode: PathwayNode;
      beforeEach(() => {
        coordinates = node.coordinates;
        offset = {
          x: 10,
          y: 10,
        };
        updatedNode = Nodes.translate(node, offset);
      });
      it("then updatedNode coordinates is original coordinates plus offset ", () => {
        let updateCoordinates = {
          x: coordinates.x + offset.x,
          y: coordinates.y + offset.y,
        };
        expect(updatedNode.coordinates).toEqual(updateCoordinates);
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

// Instance Method Availability
describe("Given Nodes instantiated", () => {
  const nodes = new Nodes();
  it("then _getIndex private method exists", () => {
    expect(nodes["_getIndex"]).toBeDefined();
  });
  it("then create public method exists", () => {
    expect(nodes.create).toBeDefined();
  });
  it("then add public method exists", () => {
    expect(nodes.add).toBeDefined();
  });
  it("then update public method exists", () => {
    expect(nodes.update).toBeDefined();
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
  it("then translate public method exists", () => {
    expect(nodes.translate).toBeDefined();
  });
  it("then remove public method exists", () => {
    expect(nodes.remove).toBeDefined();
  });
});

// Instance Method Behavior
describe("Given nodes._getIndex(id) private method exists", () => {
  let nodes: Nodes<PathwayNode>;
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
      nodes.create(details);
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
describe("Given nodes.create() public method exists", () => {
  let nodes: Nodes<PathwayNode>;
  beforeEach(() => {
    nodes = new Nodes();
  });
  describe("when nodes.create(details)", () => {
    let details: Omit<PathwayNode, "id">;
    let node: PathwayNode;
    beforeEach(() => {
      details = {
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes.create(details);
      node = { ...nodes[0], id: nodes[0].id };
    });
    it("then node with details is added to nodes", () => {
      expect(nodes[0]).toEqual(node);
    });
  });
});
describe("Given nodes.add() public method exists", () => {
  let nodes: Nodes<PathwayNode>;
  beforeEach(() => {
    nodes = new Nodes();
  });
  describe("when nodes.add(node)", () => {
    let node: PathwayNode;
    beforeEach(() => {
      node = {
        id: Utilities.uuid,
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes.add(node);
    });
    it("then node is added to nodes", () => {
      expect(nodes[0]).toEqual(node);
    });
  });
  describe("when nodes.add([nodeOne,nodeTwo])", () => {
    let nodeOne: PathwayNode;
    let nodeTwo: PathwayNode;
    beforeEach(() => {
      nodeOne = {
        id: Utilities.uuid,
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodeTwo = {
        id: Utilities.uuid,
        name: "Node2",
        type: NodeType.END,
        coordinates: { x: 100, y: 100 },
        icon: "./icon2.svg",
      };
      nodes.add([nodeOne, nodeTwo]);
    });
    it("then nodes contain nodeOne", () => {
      expect(nodes[0]).toEqual(nodeOne);
    });
    it("then nodes contain nodeTwo", () => {
      expect(nodes[1]).toEqual(nodeTwo);
    });
  });
});
describe("Given nodes.update() public method exists", () => {
  let nodes: Nodes<PathwayNode>;
  beforeEach(() => {
    nodes = new Nodes();
  });
  describe("and nodes contain a node", () => {
    let id: UUID;
    beforeEach(() => {
      nodes.create({
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = nodes[0].id;
    });
    describe("when nodes.update(id, update)", () => {
      let update: PathwayNode;
      let node: PathwayNode;
      beforeEach(() => {
        update = {
          id: id,
          name: "Node2",
          type: NodeType.END,
          coordinates: { x: 100, y: 100 },
          icon: "./icon2.svg",
        };
        nodes.update(id, update);
        node = nodes[0];
      });
      it("then node is updated", () => {
        expect(node).toEqual(update);
      });
    });
  });
});
describe("Given nodes.updateCoordinates() public method exists", () => {
  let nodes: Nodes<PathwayNode>;
  beforeEach(() => {
    nodes = new Nodes();
  });
  describe("and nodes contain node", () => {
    let id: UUID;
    beforeEach(() => {
      nodes.create({
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = nodes[0].id;
    });
    describe("when nodes.updateCoordinates(id, coordinates)", () => {
      let coordinates: Coordinates;
      let node: PathwayNode;
      beforeEach(() => {
        coordinates = { x: 100, y: 100 };
        nodes.updateCoordinates(id, coordinates);
        node = nodes[0];
      });
      it("then coordinates is updated in node", () => {
        expect(node.coordinates).toEqual(coordinates);
      });
    });
  });
});
describe("Given nodes.findById() public method exists", () => {
  let nodes: Nodes<PathwayNode>;
  beforeEach(() => {
    nodes = new Nodes();
  });
  describe("and nodes contains a node with id", () => {
    let id: UUID;
    beforeEach(() => {
      nodes.create({
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = nodes[0].id;
    });
    describe("when node = nodes.findById(id)", () => {
      let node: PathwayNode;
      beforeEach(() => {
        node = nodes.findById(id);
      });
      it("then node in nodes is returned", () => {
        expect(node).toEqual(nodes[0]);
      });
    });
  });
});
describe("Given nodes.findByType() public method exists", () => {
  let nodes: Nodes<PathwayNode>;
  beforeEach(() => {
    nodes = new Nodes();
  });
  describe("and nodes contain node with type", () => {
    let type: NodeType;
    let node: PathwayNode;
    beforeEach(() => {
      type = NodeType.START;
      nodes.create({
        name: "Node1",
        type: type,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      node = nodes[0];
    });
    describe("when results = nodes.findByType(type)", () => {
      let results: PathwayNode[];
      beforeEach(() => {
        results = nodes.findByType(type);
      });
      it("then results[1] is equal to node", () => {
        expect(results[0]).toEqual(node);
      });
    });
  });
});
describe("Given nodes.findByCoordinates() public method exists", () => {
  let nodes: Nodes<PathwayNode>;
  beforeEach(() => {
    nodes = new Nodes();
  });
  describe("and nodes contain node with coordinates", () => {
    let coordinates: Coordinates;
    let node: PathwayNode;
    beforeEach(() => {
      coordinates = { x: 0, y: 0 };
      nodes.create({
        name: "Node1",
        type: NodeType.START,
        coordinates: coordinates,
        icon: "./icon.svg",
      });
      node = nodes[0];
    });
    describe("when results = nodes.findByCoordinates(coordinates)", () => {
      let results: PathwayNode[];
      beforeEach(() => {
        results = nodes.findByCoordinates(coordinates);
      });
      it("then results[1] is equal to node", () => {
        expect(results[0]).toEqual(node);
      });
    });
  });
});
describe("Given nodes.translate() public method exists", () => {
  let nodes: Nodes<PathwayNode>;
  beforeEach(() => {
    nodes = new Nodes();
  });
  describe("and nodes contain node", () => {
    let id: UUID;
    beforeEach(() => {
      nodes.create({
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = nodes[0].id;
    });
    describe("when nodes.translate(id, offset)", () => {
      let offset: Offset;
      let node: PathwayNode;
      beforeEach(() => {
        offset = { x: 10, y: 10 };
        nodes.translate(id, offset);
        node = nodes[0];
      });
      it("then coordinates is updated in node", () => {
        expect(node.coordinates).toEqual({
          x: 10,
          y: 10,
        });
      });
    });
  });
});
describe("Given nodes.remove() public method exists", () => {
  let nodes: Nodes<PathwayNode>;
  beforeEach(() => {
    nodes = new Nodes();
  });
  describe("and nodes contain node", () => {
    let id: UUID;
    beforeEach(() => {
      nodes.create({
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = nodes[0].id;
    });
    describe("when nodes.remove(id)", () => {
      let node: PathwayNode;
      beforeEach(() => {
        nodes.remove(id);
        node = nodes[0];
      });
      it("then node is removed from nodes", () => {
        expect(node).toBeUndefined();
      });
    });
  });
});
