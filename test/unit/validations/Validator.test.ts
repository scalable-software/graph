import { Type, Spec } from "../Helper.js";

const given = (description, spec) => describe(`Given ${description}`, spec);
const and = (description, spec) => describe(`and ${description}`, spec);
const when = (description, spec) => describe(`when ${description}`, spec);
const then = (description, spec) => it(`then ${description}`, spec);

import { Validate } from "../../../src/validations/Validate.js";
import { Validator } from "../../../src/validations/Validator.js";

import {
  InvalidArgumentException,
  ValidationException,
} from "../../../src/exceptions/Exceptions.js";

given(`Validator ${Type.CLASS} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`Validator is imported`, () => {
    then(`Validator is defined`, () => {
      expect(Validator).toBeDefined();
    });
  });
});
