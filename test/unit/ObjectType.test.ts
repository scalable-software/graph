import { Utilities } from "../../src/Utilities/Utilities.js";
import { NodeTypes, NodeType, Metadata } from "../../src/Node.js";
import { ObjectNode, ObjectCoordinates } from "../../src/ObjectType.meta.js";
import { ObjectType } from "../../src/ObjectType.js";

describe("Given ObjectType imported", () => {
  it("then ObjectType is defined", () => {
    expect(ObjectType).toBeDefined();
  });
  it("then ObjectType.structure static property is defined", () => {
    expect(ObjectType.structure).toBeDefined();
  });
  it("then ObjectType.create static method is defined", () => {
    expect(ObjectType.create).toBeDefined();
  });
  it("then ObjectType.addMetadata static method is defined", () => {
    expect(ObjectType.addMetadata).toBeDefined();
  });
  it("then ObjectType.updateCoordinates static method is defined", () => {
    expect(ObjectType.updateCoordinates).toBeDefined();
  });
  it("then ObjectType.updateIcon static method is defined", () => {
    expect(ObjectType.updateIcon).toBeDefined();
  });
  it("then ObjectType.update static method is defined", () => {
    expect(ObjectType.update).toBeDefined();
  });
  it("then ObjectType.removeMetadata static method is defined", () => {
    expect(ObjectType.removeMetadata).toBeDefined();
  });
  it("then ObjectType.translate static method is defined", () => {
    expect(ObjectType.translate).toBeDefined();
  });
});

describe("Given ObjectType.structure static property exist", () => {
  it("then Object.structure equals object", () => {
    expect(ObjectType.structure).toEqual("object");
  });
});

describe("Given ObjectType.create static method exist", () => {
  describe("when node = Object.create(details)", () => {
    let details;
    let node: ObjectNode;
    beforeEach(() => {
      details = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      node = ObjectType.create(details);
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

describe("Given ObjectType.addMetadata static method exist", () => {
  describe("when extendedNode = Object.extend(node, metadata)", () => {
    let node: ObjectNode;
    let metadata: Metadata;
    let extendedNode: ObjectNode;
    beforeEach(() => {
      node = ObjectType.create({
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      metadata = {
        arrival: {
          distribution: "exponential",
          parameters: [{ rate: 1 }],
        },
      };
      extendedNode = ObjectType.addMetadata(node, metadata);
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

describe("Given ObjectType.updateMetadata static method exist", () => {
  describe("and node with metadata exist", () => {
    let node: ObjectNode;
    beforeEach(() => {
      node = ObjectType.create({
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      let metadata = {
        arrival: {
          distribution: "exponential",
          parameters: [{ rate: 1 }],
        },
      };
      node = ObjectType.addMetadata(node, metadata);
    });
    describe("when updatedNode = Object.updateMetadata(node, metadata)", () => {
      let metadata: Metadata;
      let updatedNode: ObjectNode;
      beforeEach(() => {
        metadata = {
          arrival: {
            distribution: "exponential",
            parameters: [{ rate: 10 }],
          },
        };
        updatedNode = ObjectType.updateMetadata(node, metadata);
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

describe("Given ObjectType.updateCoordinates static method exist", () => {
  describe("when updateNode = Object.updateCoordinates(node, coordinates)", () => {
    let node: ObjectNode;
    let coordinates: ObjectCoordinates;
    let updatedNode: ObjectNode;
    beforeEach(() => {
      node = ObjectType.create({
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      coordinates = { x: 1, y: 1 };
      updatedNode = ObjectType.updateCoordinates(node, coordinates);
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

describe("Given ObjectType.updateNodeIcon exist", () => {
  describe("and node exist", () => {
    let node: ObjectNode;
    beforeEach(() => {
      node = ObjectType.create({
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
    });
    describe("when updatedNode = Object.updateNodeIcon(node, icon)", () => {
      let icon: string;
      let newIcon: string;
      beforeEach(() => {
        icon = node.icon;
        newIcon = "./newIcon.svg";
        node = ObjectType.updateIcon(node, newIcon);
      });
      it("then node icon is updated", () => {
        expect(node.icon).toEqual(newIcon);
      });
    });
  });
});

describe("Given ObjectType.update exist", () => {
  describe("and node exist", () => {
    let node: ObjectNode;
    beforeEach(() => {
      node = ObjectType.create({
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
    });
    describe("when updatedNode = Object.update(node, update)", () => {
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
        node = ObjectType.update(node, details);
      });
      it("then node icon is updated", () => {
        expect(node).toEqual(details);
      });
    });
  });
});

describe("Given ObjectType.removeMetadata exist", () => {
  describe("Given node with metadata exist in nodes", () => {
    let node: ObjectNode;
    beforeEach(() => {
      node = ObjectType.create({
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      node = ObjectType.addMetadata(node, {
        arrival: {
          distribution: "exponential",
          parameters: [{ rate: 1 }],
        },
      });
    });
    describe("When ObjectType.removeMetadata(node, type)", () => {
      let type: string;
      beforeEach(() => {
        type = "arrival";
        node = ObjectType.removeMetadata(node, type);
      });
      it("then node does not contain metadata of type", () => {
        expect(node.metadata).toEqual([]);
      });
    });
  });
});

describe("Given ObjectType.translate static method exist", () => {
  describe("and node exist", () => {
    let node: ObjectNode;
    beforeEach(() => {
      node = ObjectType.create({
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
    });
    describe("when node = ObjectType.translate(node, offset)", () => {
      let coordinates;
      let offset;
      beforeEach(() => {
        coordinates = node.coordinates;
        offset = {
          x: 10,
          y: 10,
        };
        node = ObjectType.translate(node, offset);
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
