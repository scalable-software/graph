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
  `Utilities getProperties ${Type.STATIC_METHOD} ${Spec.AVAILABILITY} test`,
  () => {
    beforeEach(() => {
      setSpecProperty("type", Type.METHOD);
      setSpecProperty("spec", Spec.AVAILABILITY);
    });
    then(`getProperties is defined`, () => {
      expect(Utilities.getProperties).toBeDefined();
    });
    and(`getProperties is defined`, () => {
      when(`Utilities.getProperties(instance) is called`, () => {
        let example;
        let properties;
        beforeEach(() => {
          class Example {
            private _hidden = "secret";

            get hidden() {
              return this._hidden;
            }

            set hidden(value: string) {
              this._hidden = value;
            }

            someMethod = () => "I'm a function";

            anotherMethod() {
              return "I'm another function";
            }
          }
          example = new Example();
          properties = Utilities.getProperties(example);
        });
        then(`properties is defined`, () => {
          expect(properties).toBeDefined();
        });
        and(`properties is defined`, () => {
          then(`properties is { _hidden: 'secret'}`, () => {
            expect(properties).toEqual({ _hidden: "secret" });
          });
        });
      });
    });
  }
);
