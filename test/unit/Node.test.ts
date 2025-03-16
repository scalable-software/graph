import * as help from "./Helper.js";

const given = (description, spec) =>
  describe(`Given ${description}`, () => {
    beforeEach(() => {
      const { context, type, test } = help.metadata(description);
      setSpecProperty("context", context);
      setSpecProperty("type", type);
      setSpecProperty("test", test);
    });
    spec();
  });
const and = (description, spec) => describe(`and ${description}`, spec);
const when = (description, spec) => describe(`when ${description}`, spec);
const then = (description, spec) => it(`then ${description}`, spec);

import { Node, type INode } from "@scalable.software/graph";

given(`Node class availability test`, () => {
  and(`Node is imported`, () => {
    then(`Node is defined`, () => {
      expect(Node).toBeDefined();
    });
  });
});

given(`Node.create static method availability test`, () => {
  and(`Node is defined`, () => {});
  then("Node.create public static method exists", () => {
    expect(Node.create).toBeDefined();
  });
});

given(`Node.create static method behavior test`, () => {
  when("Node.create called with details", () => {
    let details: Omit<INode, "id">;
    let node: INode;
    beforeEach(() => {
      details = {
        coordinates: { x: 0, y: 0 },
      };
      node = Node.create(details);
    });
    then("node is defined", () => {
      expect(node).toBeDefined();
    });
    and("node is defined", () => {
      then("node.id is defined", () => {
        expect(node.id).toBeDefined();
      });
      then("node.coordinates is defined", () => {
        expect(node.coordinates).toBeDefined();
      });
      and("node.coordinates is defined", () => {
        then("node.coordinates equals details.coordinates", () => {
          expect(node.coordinates).toEqual(details.coordinates);
        });
      });
    });
  });
});

given(`Node.clone static method availability test`, () => {
  and(`Node is defined`, () => {
    then("Node.clone public static method exists", () => {
      expect(Node.clone).toBeDefined();
    });
  });
});

given(`Node.clone static method behavior test`, () => {
  when("Node.clone called with node", () => {
    let node;
    let clonedNode;
    beforeEach(() => {
      node = {
        id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: { x: 0, y: 0 },
      };
      clonedNode = Node.clone(node);
    });
    then("clonedNode is defined", () => {
      expect(clonedNode).toBeDefined();
    });
    and("clonedNode is defined", () => {
      then("clonedNode is not equal to node", () => {
        expect(clonedNode).not.toBe(node);
      });
      then("clonedNode.id is not equal to node.id", () => {
        expect(clonedNode.id).not.toBe(node.id);
      });
      then("clonedNode.coordinates equals node.coordinates", () => {
        expect(clonedNode.coordinates).toEqual(node.coordinates);
      });
    });
  });
});

given(`Node.update static method availability test`, () => {
  and(`Node is defined`, () => {
    then("Node.update public static method exists", () => {
      expect(Node.update).toBeDefined();
    });
  });
});

given(`Node.update static method behavior test`, () => {
  when("Node.update called with node and patch)", () => {
    let node;
    let patch;
    let updatedNode;
    beforeEach(() => {
      node = {
        id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: { x: 0, y: 0 },
      };
      patch = {
        coordinates: { x: 100, y: 400 },
      };
      updatedNode = Node.update(node, patch);
    });
    then("updatedNode is defined", () => {
      expect(updatedNode).toBeDefined();
    });
    and("updatedNode is defined", () => {
      then("updatedNode.coordinates equals patch.coordinates", () => {
        expect(updatedNode.coordinates).toEqual(patch.coordinates);
      });
    });
  });
});

given(`Node.move static method availability test`, () => {
  and(`Node is defined`, () => {
    then("Node.move public static method exists", () => {
      expect(Node.move).toBeDefined();
    });
  });
});

given(`Node.move static method behavior test`, () => {
  when("Node.move called with node and coordinates", () => {
    let node;
    let coordinates;
    let updatedNode;
    beforeEach(() => {
      node = {
        id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: { x: 0, y: 0 },
      };
      coordinates = { x: 100, y: 400 };
      updatedNode = Node.move(node, coordinates);
    });
    then("updatedNode is defined", () => {
      expect(updatedNode).toBeDefined();
    });
    and("updatedNode is defined", () => {
      then("updatedNode.coordinates equals coordinates", () => {
        expect(updatedNode.coordinates).toEqual(coordinates);
      });
    });
  });
});

given(`Node.translate static method availability test`, () => {
  and(`Node is defined`, () => {
    then("Node.translate public static method exists", () => {
      expect(Node.translate).toBeDefined();
    });
  });
});

given(`Node.translate static method behavior test`, () => {
  when("Node.translate(node, offset)", () => {
    let node;
    let offset;
    let updatedNode;
    beforeEach(() => {
      node = {
        id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: { x: 0, y: 0 },
      };
      offset = { x: 100, y: 400 };
      updatedNode = Node.translate(node, offset);
    });
    then("updatedNode is defined", () => {
      expect(updatedNode).toBeDefined();
    });
    and("updatedNode is defined", () => {
      then(
        "updatedNode.coordinates equals node.coordinates plus offset",
        () => {
          let updateCoordinates = {
            x: node.coordinates.x + offset.x,
            y: node.coordinates.y + offset.y,
          };
          expect(updatedNode.coordinates).toEqual(updateCoordinates);
        }
      );
    });
  });
});
