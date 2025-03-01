import * as help from "../Helper.js";

import { Type, Spec } from "../Helper.js";

const given = (description, spec) => describe(`Given ${description}`, spec);
const and = (description, spec) => describe(`and ${description}`, spec);
const when = (description, spec) => describe(`when ${description}`, spec);
const then = (description, spec) => it(`then ${description}`, spec);

import { Utilities } from "../../../src/utilities/Utilities.js";

given(`Utilities ${Type.ABSTRACT_CLASS} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.ABSTRACT_CLASS);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`Utilities is imported`, () => {
    then(`Utilities is defined`, () => {
      expect(Utilities).toBeDefined();
    });
  });
});

given(
  `Utilities getProperties ${Type.METHOD} ${Spec.AVAILABILITY} test`,
  () => {
    beforeEach(() => {
      setSpecProperty("type", Type.METHOD);
      setSpecProperty("spec", Spec.AVAILABILITY);
    });
    and(`Utilities getProperties is called`, () => {
      when(`getProperties is called`, () => {
        then(`getProperties is defined`, () => {
          expect(Utilities.getProperties).toBeDefined();
        });
      });
    });
  }
);
