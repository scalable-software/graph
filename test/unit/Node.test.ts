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
