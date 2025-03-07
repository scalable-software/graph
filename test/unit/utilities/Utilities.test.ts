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

given(`Utilities isMethod ${Type.STATIC_METHOD}test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.METHOD);
    setSpecProperty("spec", "Utilities.isMethod");
  });
  then(`isMethod is defined`, () => {
    expect(Utilities.isMethod).toBeDefined();
  });
  and(`isMethod is defined`, () => {
    then(`isMethod is a function`, () => {
      expect(Utilities.isMethod).toBeInstanceOf(Function);
    });
    and(`isMethod is a function`, () => {
      when(`Utilities.isMethod(value) is called`, () => {
        let value;
        let result;
        beforeEach(() => {
          value = () => "I'm a function";
          result = Utilities.isMethod(value);
        });
        then(`result is true`, () => {
          expect(result).toBe(true);
        });
        and(`result is true`, () => {
          when(`Utilities.isMethod(value) is called`, () => {
            let value;
            let result;
            beforeEach(() => {
              value = "I'm not a function";
              result = Utilities.isMethod(value);
            });
            then(`result is false`, () => {
              expect(result).toBe(false);
            });
          });
        });
      });
    });
  });
});

given(`Utilities isConstructor ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.METHOD);
    setSpecProperty("spec", "Utilities.isConstructor");
  });
  then(`isConstructor is defined`, () => {
    expect(Utilities.isConstructor).toBeDefined();
  });
  and(`isConstructor is defined`, () => {
    then(`isConstructor is a function`, () => {
      expect(Utilities.isConstructor).toBeInstanceOf(Function);
    });
    and(`isConstructor is a function`, () => {
      when(`Utilities.isConstructor(key) is called`, () => {
        let key;
        let result;
        beforeEach(() => {
          key = "constructor";
          result = Utilities.isConstructor<never>(key);
        });
        then(`result is true`, () => {
          expect(result).toBe(true);
        });
        and(`result is true`, () => {
          when(`Utilities.isConstructor(key) is called`, () => {
            let key;
            let result;
            beforeEach(() => {
              key = "not a constructor";
              result = Utilities.isConstructor<never>(key);
            });
            then(`result is false`, () => {
              expect(result).toBe(false);
            });
          });
        });
      });
    });
  });
});

given(`Utilities isGetterOrSetter ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.METHOD);
    setSpecProperty("spec", "Utilities.isGetterOrSetter");
  });
  then(`isGetterOrSetter is defined`, () => {
    expect(Utilities.isGetterOrSetter).toBeDefined();
  });
  and(`isGetterOrSetter is defined`, () => {
    then(`isGetterOrSetter is a function`, () => {
      expect(Utilities.isGetterOrSetter).toBeInstanceOf(Function);
    });
    and(`isGetterOrSetter is a function`, () => {
      when(`Utilities.isGetterOrSetter(instance, key) is called`, () => {
        let instance;
        let key;
        let result;

        beforeEach(() => {
          class Example {
            private _hidden = "secret";

            someMethod = () => "I'm a function";
            anotherMethod() {
              return "I'm another function";
            }
          }

          instance = new Example();

          Object.defineProperty(instance, "hidden", {
            get: () => "dynamic getter",
            configurable: true,
          });

          key = "hidden";
          result = Utilities.isGetterOrSetter<Example>(instance, key);
        });

        then(`result is true`, () => {
          expect(result).toBe(true);
        });
      });
    });
  });
});
