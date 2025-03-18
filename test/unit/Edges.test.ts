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

import type { IEdge } from "@scalable.software/graph";
import { Edges } from "@scalable.software/graph";

given(`Edges class availability test`, () => {
  and(`Edges is imported`, () => {
    then(`Edges is defined`, () => {
      expect(Edges).toBeDefined();
    });
    and(`Edges is defined`, () => {
      then(`Edges is an instance of Function`, () => {
        expect(Edges).toBeInstanceOf(Function);
      });
    });
  });
});

given(`Edges class instantiation test`, () => {
  when("a nodes instance is created", () => {
    let edges: Edges<IEdge>;
    beforeEach(() => {
      edges = new Edges();
    });
    then("edges is defined", () => {
      expect(edges).toBeDefined();
    });
    and("edges is defined", () => {
      then("edges is an instance of Edges", () => {
        expect(edges).toBeInstanceOf(Edges);
      });
      then("edges is an instance of Array", () => {
        expect(edges).toBeInstanceOf(Array);
      });
    });
  });
});
