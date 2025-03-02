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

given(`Nodes ${Type.CLASS} ${Spec.INSTANTIATION} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.INSTANTIATION);
  });
  when("a nodes instance is created", () => {
    let nodes: Nodes<INode>;
    beforeEach(() => {
      nodes = new Nodes();
    });
    then("nodes is defined", () => {
      expect(nodes).toBeDefined();
    });
    and("nodes is defined", () => {
      then("nodes is an instance of Nodes", () => {
        expect(nodes).toBeInstanceOf(Nodes);
      });
      then("nodes is an instance of Array", () => {
        expect(nodes).toBeInstanceOf(Array);
      });
    });
  });
});

given(`Nodes create ${Type.STATIC_METHOD} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`Nodes is imported`, () => {
    then(`Nodes.create is defined`, () => {
      expect(Nodes.create).toBeDefined();
    });
    and(`Nodes.create is defined`, () => {
      then(`Nodes.create is an instance of Function`, () => {
        expect(Nodes.create).toBeInstanceOf(Function);
      });
    });
  });
});
