import {
  Nodes,
  NodeType,
  Node,
  NodeMetadata,
  Coordinates,
} from "@scalable-software/graph.structure/Nodes";

import {
  NodeMetadataType,
  Utilities,
} from "@scalable-software/graph.structure";

import { Helper } from "./Helper.js";

// Static Members Availability
describe("Given Nodes imported", () => {
  it("then Nodes exist", () => {
    expect(Nodes).toBeDefined();
  });
  it("then Nodes.init exists", () => {
    expect(Nodes.init).toBeDefined();
  });
  it("then Nodes.create exists", () => {
    expect(Nodes.create).toBeDefined();
  });
  it("then Nodes.getMetadataType exists", () => {
    expect(Nodes.getMetadataType).toBeDefined();
  });
  it("then Nodes.getMetadataTypes exists", () => {
    expect(Nodes.getMetadataTypes).toBeDefined();
  });
  it("then Nodes.hasMetadata exists", () => {
    expect(Nodes.hasMetadata).toBeDefined();
  });
  it("then Nodes.hasMetadataType exists", () => {
    expect(Nodes.hasMetadataType).toBeDefined();
  });
  it("then Nodes.addMetadata exists", () => {
    expect(Nodes.addMetadata).toBeDefined();
  });
  it("then Nodes.update exists", () => {
    expect(Nodes.update).toBeDefined();
  });
  it("then Nodes.updateMetadata exists", () => {
    expect(Nodes.updateMetadata).toBeDefined();
  });
  it("then Nodes.updateIcon exists", () => {
    expect(Nodes.updateIcon).toBeDefined();
  });
  it("then Nodes.updateCoordinates exists", () => {
    expect(Nodes.updateCoordinates).toBeDefined();
  });
  it("then Nodes.translate exists", () => {
    expect(Nodes.translate).toBeDefined();
  });
  it("then Nodes.removeMetadata exists", () => {
    expect(Nodes.removeMetadata).toBeDefined();
  });
});

// Static Methods Behavior
describe("Given Nodes.init() static method exist", () => {
  describe("when nodes = Nodes.init()", () => {
    let nodes;
    beforeEach(() => {
      nodes = Nodes.init();
    });
    it("then nodes is an instance of Nodes", () => {
      expect(nodes instanceof Array).toBe(true);
    });
  });
});
describe("Given Nodes.create() static method exist", () => {
  describe("when node = Nodes.create(details)", () => {
    let details;
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
  describe("and node exist", () => {
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
describe("Given Nodes.updateIcon() static method exist", () => {
  describe("and node exist", () => {
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
    describe("when updatedNode = Nodes.updateIcon(node, icon)", () => {
      let newIcon: string;
      beforeEach(() => {
        newIcon = "./newIcon.svg";
        node = Nodes.updateIcon(node, newIcon);
      });
      it("then node icon is updated", () => {
        expect(node.icon).toEqual(newIcon);
      });
    });
  });
});
describe("Given Nodes.updateCoordinates() static method exist", () => {
  describe("when updateNode = Nodes.updateCoordinates(node, coordinates)", () => {
    let node: Node;
    let coordinates: Coordinates;
    let updatedNode: Node;
    beforeEach(() => {
      node = {
        id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        name: "Node",
        type: "workflow",
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
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
describe("Given Nodes.translate() static method exist", () => {
  describe("and node exist", () => {
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
    describe("when node = Graph.translate(node, offset)", () => {
      let coordinates;
      let offset;
      beforeEach(() => {
        coordinates = node.coordinates;
        offset = {
          x: 10,
          y: 10,
        };
        node = Nodes.translate(node, offset);
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
describe("Given Nodes.removeMetadata() static method exist", () => {
  describe("Given node with metadata exist in nodes", () => {
    let node: Node;
    beforeEach(() => {
      node = Nodes.create({
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeType),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      node = Nodes.addMetadata(node, {
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
        node = Nodes.removeMetadata(node, type);
      });
      it("then node does not contain metadata of type", () => {
        expect(node.metadata).toEqual([]);
      });
    });
  });
});

// Instance Properties Availability
describe("Given nodes instance", () => {
  let nodes;
  beforeEach(() => {
    nodes = new Nodes();
  });
  it("then nodes._proxy private property exists", () => {
    expect(nodes["_proxy"]).toBeDefined();
  });
});

// Instance Properties Value
describe("Given nodes instance", () => {
  let nodes;
  let node: Node;
  beforeEach(() => {
    node = {
      id: "1",
      name: "Node1",
      type: NodeType.START,
      coordinates: { x: 0, y: 0 },
      icon: "./icon.svg",
    };
    nodes = Nodes.init([node]);
  });
  it("then nodes is an data", () => {
    expect(nodes).toEqual([node]);
  });
});

// Instance Methods Availability
describe("Given nodes instance", () => {
  let nodes;
  beforeEach(() => {
    nodes = new Nodes();
  });
  it("then nodes._get exists", () => {
    expect(nodes["_get"]).toBeDefined();
  });
  it("then nodes._set exists", () => {
    expect(nodes["_set"]).toBeDefined();
  });
  it("then nodes._createProxy exists", () => {
    expect(nodes["_createProxy"]).toBeDefined();
  });
  it("then nodes._getIndex exists", () => {
    expect(nodes["_getIndex"]).toBeDefined();
  });
  it("then nodes.add exists", () => {
    expect(nodes["add"]).toBeDefined();
  });
  it("then nodes.addMetadata exists", () => {
    expect(nodes["addMetadata"]).toBeDefined();
  });
  it("then nodes.update exists", () => {
    expect(nodes["update"]).toBeDefined();
  });
  it("then nodes.updateMetadata exists", () => {
    expect(nodes["updateMetadata"]).toBeDefined();
  });
  it("then nodes.updateIcon exists", () => {
    expect(nodes["updateIcon"]).toBeDefined();
  });
  it("then nodes.updateCoordinates exists", () => {
    expect(nodes["updateCoordinates"]).toBeDefined();
  });
  it("then nodes.findById exists", () => {
    expect(nodes["findById"]).toBeDefined();
  });
  it("then nodes.findByType exists", () => {
    expect(nodes["findByType"]).toBeDefined();
  });
  it("then nodes.findByCoordinates exists", () => {
    expect(nodes["findByCoordinates"]).toBeDefined();
  });
  it("then nodes.translate exists", () => {
    expect(nodes["translate"]).toBeDefined();
  });
  it("then nodes.removeMetadata exists", () => {
    expect(nodes["removeMetadata"]).toBeDefined();
  });
  it("then nodes.remove exists", () => {
    expect(nodes["remove"]).toBeDefined();
  });
});

// Instance Getters Availability

// Instance Setters Availability

// Instance Methods Behavior
describe("Given nodes instance", () => {
  let nodes;
  beforeEach(() => {
    nodes = new Nodes();
  });
  describe("when proxy = nodes._createProxy(array)", () => {
    let proxy;
    let array = [];
    beforeEach(() => {
      proxy = nodes["_createProxy"](array);
    });
    it("then proxy is equal to an empty array", () => {
      expect(proxy).toEqual(array);
    });
  });
  describe("when index = nodes._getIndex(id)", () => {
    let node;
    let index;
    beforeEach(() => {
      index = 0;
      node = {
        id: "1",
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes["nodes"][index] = node;
    });
    it("then index is equal to index", () => {
      expect(nodes._getIndex(node.id)).toEqual(index);
    });
  });
  describe("when nodes.add(node)", () => {
    let node: Omit<Node, "id">;
    beforeEach(() => {
      node = {
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes.add(node);
    });
    it("then nodes.nodes is equal to [node]", () => {
      (node as Node).id = nodes["nodes"][0].id;
      expect(nodes["nodes"]).toEqual([node]);
    });
  });
});

// Proxy Property Value
describe("Given nodes proxy instance", () => {
  let nodes;
  beforeEach(() => {
    nodes = Nodes.init();
  });
  it("then nodes.length is equal to 1", () => {
    expect(nodes.length).toEqual(0);
  });
});
describe("Given element of type symbol", () => {
  const symbol = Symbol("test");
  const value = "value";
  describe("when nodes proxy instance", () => {
    let nodes;
    beforeEach(() => {
      nodes = Nodes.init();
      nodes[symbol] = value;
    });
    it("then nodes[symbol] is equal to value", () => {
      expect(nodes[symbol]).toEqual(value);
    });
  });
});
describe("Given element of type index", () => {
  const index = 0;
  const value = "value";
  describe("when nodes proxy instance", () => {
    let nodes;
    beforeEach(() => {
      nodes = Nodes.init();
      nodes[index] = value;
    });
    it("then nodes[index] is equal to value", () => {
      expect(nodes[index]).toEqual(value);
    });
  });
});
describe("Given element of type function", () => {
  const property = "method";
  const value = () => {};
  describe("when nodes proxy instance", () => {
    let nodes;
    beforeEach(() => {
      nodes = Nodes.init();
      nodes[property] = value;
    });
    it("then nodes[property] is equal to value", () => {
      expect(nodes[property]).toEqual(value);
    });
    it("then nodes[property] is a function", () => {
      expect(typeof nodes[property]).toEqual("function");
    });
  });
});
describe("Given element of type property", () => {
  const property = "property";
  const value = "value";
  describe("when nodes proxy instance", () => {
    let nodes;
    beforeEach(() => {
      nodes = Nodes.init();
      nodes[property] = value;
    });
    it("then nodes[property] is equal to value", () => {
      expect(nodes[property]).toEqual(value);
    });
  });
});

// Proxy Method Availability
describe("Given nodes proxy instance", () => {
  let nodes;
  beforeEach(() => {
    nodes = Nodes.init();
  });
  it("then nodes.add exists", () => {
    expect(nodes.add).toBeDefined();
  });
  it("then nodes.addMetadata exists", () => {
    expect(nodes.addMetadata).toBeDefined();
  });
  it("then nodes.update exists", () => {
    expect(nodes.update).toBeDefined();
  });
  it("then nodes.updateMetadata exists", () => {
    expect(nodes.updateMetadata).toBeDefined();
  });
  it("then nodes.updateIcon exists", () => {
    expect(nodes.updateIcon).toBeDefined();
  });
  it("then nodes.updateCoordinates exists", () => {
    expect(nodes.updateCoordinates).toBeDefined();
  });
  it("then nodes.findById exists", () => {
    expect(nodes.findById).toBeDefined();
  });
  it("then nodes.findByType exists", () => {
    expect(nodes.findByType).toBeDefined();
  });
  it("then nodes.findByCoordinates exists", () => {
    expect(nodes.findByCoordinates).toBeDefined();
  });
  it("then nodes.translate exists", () => {
    expect(nodes.translate).toBeDefined();
  });
  it("then nodes.removeMetadata exists", () => {
    expect(nodes.removeMetadata).toBeDefined();
  });
  it("then nodes.remove exists", () => {
    expect(nodes.remove).toBeDefined();
  });
});

// Proxy Method Behavior
describe("Given nodes proxy instance", () => {
  let nodes;
  beforeEach(() => {
    nodes = Nodes.init();
  });
  describe("when nodes.add(node)", () => {
    let node: Omit<Node, "id">;
    beforeEach(() => {
      node = {
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes.add(node);
    });
    it("then node is added to nodes", () => {
      delete nodes[0].id;
      expect(nodes).toEqual([node]);
    });
    it("then node in nodes has id", () => {
      expect(nodes[0].id).toBeDefined();
    });
    it("then node in nodes has name", () => {
      expect(nodes[0].name).toEqual(node.name);
    });
    it("then node in nodes has type", () => {
      expect(nodes[0].type).toEqual(node.type);
    });
    it("then node in nodes has coordinates", () => {
      expect(nodes[0].coordinates).toEqual(node.coordinates);
    });
    it("then node in nodes has icon", () => {
      expect(nodes[0].icon).toEqual(node.icon);
    });
  });
  describe("when nodes.addMetadata(node, metadata)", () => {
    let nodes;
    let node: Omit<Node, "id">;
    let metadata: NodeMetadata;
    beforeEach(() => {
      nodes = Nodes.init();
      node = {
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes.add(node);
      metadata = {
        arrival: {
          distribution: "exponential",
          parameters: [{ rate: 1 }],
        },
      };
      nodes.addMetadata(nodes[0].id, metadata);
    });
    it("then node in nodes has metadata", () => {
      expect(nodes[0].metadata).toEqual([metadata]);
    });
  });
  describe("when nodes.update(node, update)", () => {
    let node: Omit<Node, "id">;
    let update: Partial<Node>;
    beforeEach(() => {
      node = {
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes.add(node);
      update = {
        name: "Node2",
        type: NodeType.END,
        coordinates: { x: 1, y: 1 },
        icon: "./icon2.svg",
      };
      nodes.update(nodes[0].id, update);
    });
    it("then node in nodes is updated", () => {
      (update as Node).id = nodes[0].id;
      expect(nodes[0]).toEqual(update);
    });
  });
  describe("when nodes.updateMetadata(node, metadata)", () => {
    let node: Omit<Node, "id">;
    let metadata: NodeMetadata;
    beforeEach(() => {
      node = {
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes.add(node);
      metadata = {
        arrival: {
          distribution: "exponential",
          parameters: [{ rate: 10 }],
        },
      };
      nodes.addMetadata(nodes[0].id, {
        arrival: {
          distribution: "exponential",
          parameters: [{ rate: 1 }],
        },
      });
      nodes.updateMetadata(nodes[0].id, metadata);
    });
    it("then node in nodes has updated metadata", () => {
      expect(nodes[0].metadata).toEqual([metadata]);
    });
  });
  describe("when nodes.updateIcon(node, icon)", () => {
    let node: Omit<Node, "id">;
    let icon: string;
    beforeEach(() => {
      node = {
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes.add(node);
      icon = "./icon2.svg";
      nodes.updateIcon(nodes[0].id, icon);
    });
    it("then node in nodes has updated icon", () => {
      expect(nodes[0].icon).toEqual(icon);
    });
  });
  describe("when nodes.updateCoordinates(node, coordinates)", () => {
    let node: Omit<Node, "id">;
    let coordinates: Coordinates;
    beforeEach(() => {
      node = {
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes.add(node);
      coordinates = { x: 1, y: 1 };
      nodes.updateCoordinates(nodes[0].id, coordinates);
    });
    it("then node in nodes has updated coordinates", () => {
      expect(nodes[0].coordinates).toEqual(coordinates);
    });
  });
  describe("when nodes.findById(id)", () => {
    let node: Omit<Node, "id">;
    let result: Node;
    beforeEach(() => {
      const id = "1";
      node = {
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes.add(node);
      result = nodes.findById(nodes[0].id);
    });
    it("then result is equal to node", () => {
      expect(result).toEqual(nodes[0]);
    });
  });
  describe("when nodes.findByType(type)", () => {
    let node: Omit<Node, "id">;
    let result: Node[];
    beforeEach(() => {
      const type = NodeType.START;
      node = {
        name: "Node1",
        type: type,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes.add(node);
      result = nodes.findByType(type);
    });
    it("then result is equal to [node]", () => {
      expect(result).toEqual([nodes[0]]);
    });
  });
  describe("when nodes.findByCoordinates(coordinates)", () => {
    let node: Omit<Node, "id">;
    let result: Node[];
    beforeEach(() => {
      const coordinates = { x: 0, y: 0 };
      node = {
        name: "Node1",
        type: NodeType.START,
        coordinates: coordinates,
        icon: "./icon.svg",
      };
      nodes.add(node);
      result = nodes.findByCoordinates(coordinates);
    });
    it("then result is equal to [node]", () => {
      expect(result).toEqual([nodes[0]]);
    });
  });
  describe("when nodes.translate(id, offset)", () => {
    let node: Omit<Node, "id">;
    let offset: Coordinates;
    beforeEach(() => {
      node = {
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes.add(node);
      offset = { x: 1, y: 1 };
      nodes.translate(nodes[0].id, offset);
    });
    it("then node in nodes has updated coordinates", () => {
      const updatedCoordinates = {
        x: node.coordinates.x + offset.x,
        y: node.coordinates.y + offset.y,
      };
      expect(nodes[0].coordinates).toEqual(updatedCoordinates);
    });
  });
  describe("when nodes.removeMetadata(id, type)", () => {
    let node: Omit<Node, "id">;
    let metadata: NodeMetadata;
    beforeEach(() => {
      node = {
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes.add(node);
      metadata = {
        arrival: {
          distribution: "exponential",
          parameters: [{ rate: 1 }],
        },
      };
      nodes.addMetadata(nodes[0].id, metadata);
      nodes.removeMetadata(nodes[0].id, "arrival");
    });
    it("then node in nodes does not contain metadata", () => {
      expect(nodes[0].metadata).toEqual([]);
    });
  });
  describe("when nodes.remove(id)", () => {
    let node: Omit<Node, "id">;
    beforeEach(() => {
      node = {
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes.add(node);
      nodes.remove(nodes[0].id);
    });
    it("then nodes is empty", () => {
      expect(nodes).toEqual([]);
    });
  });
});

// Workflow
describe("Given nodes proxy instance", () => {
  let nodes;
  beforeEach(() => {
    nodes = Nodes.init();
  });
  describe("when nodes.add(node) multiple times", () => {
    let start: Omit<Node, "id">;
    let workflow: Omit<Node, "id">;
    let end: Omit<Node, "id">;
    let metadata: NodeMetadata;
    beforeEach(() => {
      start = {
        name: "Start",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      workflow = {
        name: "Workflow",
        type: NodeType.WORKFLOW,
        coordinates: { x: 1, y: 1 },
        icon: "./icon.svg",
      };
      end = {
        name: "End",
        type: NodeType.END,
        coordinates: { x: 2, y: 2 },
        icon: "./icon.svg",
      };
      nodes.add(start).add(workflow).add(end);
    });
    it("then nodes is equal to [Start, Workflow, End]", () => {
      const types = nodes.map((node) => node.type);
      expect(types).toEqual([NodeType.START, NodeType.WORKFLOW, NodeType.END]);
    });
  });
});
