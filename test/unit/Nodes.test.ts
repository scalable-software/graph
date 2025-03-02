import { INode } from "src/Node.js";
import * as help from "./Helper.js";

import { Type, Spec } from "./Helper.js";

const given = (description, spec) => describe(`Given ${description}`, spec);
const and = (description, spec) => describe(`and ${description}`, spec);
const when = (description, spec) => describe(`when ${description}`, spec);
const then = (description, spec) => it(`then ${description}`, spec);

import { Nodes } from "@scalable.software/graph";

given(`Nodes ${Type.CLASS} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`Nodes is imported`, () => {
    then(`Nodes is defined`, () => {
      expect(Nodes).toBeDefined();
    });
    and(`Nodes is defined`, () => {
      then(`Nodes is an instance of Function`, () => {
        expect(Nodes).toBeInstanceOf(Function);
      });
    });
  });
});
