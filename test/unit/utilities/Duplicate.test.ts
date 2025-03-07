import { Type, Spec } from "../Helper.js";

const given = (description, spec) => describe(`Given ${description}`, spec);
const and = (description, spec) => describe(`and ${description}`, spec);
const when = (description, spec) => describe(`when ${description}`, spec);
const then = (description, spec) => it(`then ${description}`, spec);

import { Duplicate } from "../../../src/utilities/Duplicate.js";

given(`Duplicate ${Type.ABSTRACT_CLASS} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.ABSTRACT_CLASS);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`Duplicate is imported`, () => {
    then(`Duplicate is defined`, () => {
      expect(Duplicate).toBeDefined();
    });
  });
});
