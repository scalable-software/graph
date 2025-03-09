import { Type, Spec } from "../Helper.js";

const given = (description, spec) => describe(`Given ${description}`, spec);
const and = (description, spec) => describe(`and ${description}`, spec);
const when = (description, spec) => describe(`when ${description}`, spec);
const then = (description, spec) => it(`then ${description}`, spec);

import { Match } from "../../../src/utilities/Match.js";

given(`Match ${Type.ABSTRACT_CLASS} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.ABSTRACT_CLASS);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`Match is imported`, () => {
    then(`Match is defined`, () => {
      expect(Match).toBeDefined();
    });
  });
});

given(`Match find ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.METHOD);
    setSpecProperty("spec", "Match.find");
  });
  then(`Match.find is defined`, () => {
    expect(Match.find).toBeDefined();
  });
  and(`Match.find is defined`, () => {
    then(`Match.find is a function`, () => {
      expect(Match.find).toBeInstanceOf(Function);
    });
  });
});
