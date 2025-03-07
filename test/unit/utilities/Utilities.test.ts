import { Type, Spec } from "../Helper.js";

const given = (description, spec) => describe(`Given ${description}`, spec);
const and = (description, spec) => describe(`and ${description}`, spec);
const when = (description, spec) => describe(`when ${description}`, spec);
const then = (description, spec) => it(`then ${description}`, spec);

import { Utilities } from "../../../src/utilities/Utilities.js";
import { Properties } from "../../../src/utilities/Properties.js";
import { Duplicate } from "../../../src/utilities/Duplicate.js";

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

given(`Utilities Properties ${Type.STATIC_PROPERTY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.PROPERTY);
    setSpecProperty("spec", "Utilities.Properties");
  });
  then(`Utilities.Properties is defined`, () => {
    expect(Utilities.Properties).toBeDefined();
  });
  and(`Utilities.Properties is defined`, () => {
    then(`Utilities.Properties is Properties`, () => {
      expect(Utilities.Properties).toBe(Properties);
    });
  });
});

given(`Utilities Duplicate ${Type.STATIC_PROPERTY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.PROPERTY);
    setSpecProperty("spec", "Utilities.Duplicate");
  });
  then(`Utilities.Duplicate is defined`, () => {
    expect(Utilities.Duplicate).toBeDefined();
  });
  and(`Utilities.Duplicate is defined`, () => {
    then(`Utilities.Duplicate is Duplicate`, () => {
      expect(Utilities.Duplicate).toBe(Duplicate);
    });
  });
});
