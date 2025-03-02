import { INode } from "src/Node.js";
import * as help from "./Helper.js";

import { Type, Spec } from "./Helper.js";

const given = (description, spec) => describe(`Given ${description}`, spec);
const and = (description, spec) => describe(`and ${description}`, spec);
const when = (description, spec) => describe(`when ${description}`, spec);
const then = (description, spec) => it(`then ${description}`, spec);

import { Node } from "@scalable.software/graph";

given(`Node ${Type.CLASS} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`Node is imported`, () => {
    then(`Node is defined`, () => {
      expect(Node).toBeDefined();
    });
  });
});

given(`Node.create ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.METHOD);
    setSpecProperty("spec", "Node.create");
  });
  then("Node.create() public static method exists", () => {
    expect(Node.create).toBeDefined();
  });
  and("Node.create() public static method exists", () => {
    when("Node.create(details)", () => {
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
});

given(`Node.clone ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.METHOD);
    setSpecProperty("spec", "Node.clone");
  });
  then("Node.clone() public static method exists", () => {
    expect(Node.clone).toBeDefined();
  });
  and("Node.clone() public static method exists", () => {
    when("Node.clone(node)", () => {
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
});

given(`Node.update ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.METHOD);
    setSpecProperty("spec", "Node.update");
  });
  then("Node.update() public static method exists", () => {
    expect(Node.update).toBeDefined();
  });
  and("Node.update() public static method exists", () => {
    when("Node.update(node, patch)", () => {
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
});
