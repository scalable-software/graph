import { Type, Spec } from "../Helper.js";

const given = (description, spec) => describe(`Given ${description}`, spec);
const and = (description, spec) => describe(`and ${description}`, spec);
const when = (description, spec) => describe(`when ${description}`, spec);
const then = (description, spec) => it(`then ${description}`, spec);

import { Index } from "../../../src/utilities/Index.js";

given(`Index ${Type.ABSTRACT_CLASS} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.ABSTRACT_CLASS);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`Index is imported`, () => {
    then(`Index is defined`, () => {
      expect(Index).toBeDefined();
    });
  });
});

given(`Index byReference ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Index.byReference");
  });
  then(`Index.byReference is defined`, () => {
    expect(Index.byReference).toBeDefined();
  });
  and(`Index.byReference is defined`, () => {
    then(`Index.byReference is a function`, () => {
      expect(Index.byReference).toBeInstanceOf(Function);
    });
  });
});
