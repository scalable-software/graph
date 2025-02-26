import * as help from "./Helper.js";

import { Type, Spec } from "./Helper.js";

const given = (description, spec) => describe(`Given ${description}`, spec);
const and = (description, spec) => describe(`and ${description}`, spec);
const when = (description, spec) => describe(`when ${description}`, spec);
const then = (description, spec) => it(`then ${description}`, spec);

import { Metadata } from "@scalable.software/graph";

given(`Metadata ${Type.CLASS} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`Metadata is imported`, () => {
    then(`Metadata is defined`, () => {
      expect(Metadata).toBeDefined();
    });
  });
});
