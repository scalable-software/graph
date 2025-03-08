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

given(`Utilities toString ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.METHOD);
    setSpecProperty("spec", "Utilities.toString");
  });
  then(`Utilities.toString is defined`, () => {
    expect(Utilities.toString).toBeDefined();
  });
  and(`Utilities.toString is defined`, () => {
    then(`Utilities.toString is a function`, () => {
      expect(Utilities.toString).toBeInstanceOf(Function);
    });
    and(`Utilities.toString is a function`, () => {
      when(`Utilities.toString(value) is called with string`, () => {
        let value: string;
        let isString: boolean;
        beforeEach(() => {
          value = `test`;
          isString = typeof Utilities.toString(value) === "string";
        });
        then(`isString is true`, () => {
          expect(isString).toBe(true);
        });
      });
      when(`Utilities.toString(value) is called with number`, () => {
        let value: number;
        let isString: boolean;
        beforeEach(() => {
          value = 42;
          isString = typeof Utilities.toString(value) === "string";
        });
        then(`isString is true`, () => {
          expect(isString).toBe(true);
        });
      });
      when(`Utilities.toString(value) is called with boolean`, () => {
        let value: boolean;
        let isString: boolean;
        beforeEach(() => {
          value = true;
          isString = typeof Utilities.toString(value) === "string";
        });
        then(`isString is true`, () => {
          expect(isString).toBe(true);
        });
      });
      when(`Utilities.toString(value) is called with object`, () => {
        let value: object;
        let isString: boolean;
        beforeEach(() => {
          value = { key: "value" };
          isString = typeof Utilities.toString(value) === "string";
        });
        then(`isString is true`, () => {
          expect(isString).toBe(true);
        });
      });
      when(`Utilities.toString(value) is called with array`, () => {
        let value: any[];
        let isString: boolean;
        beforeEach(() => {
          value = [1, 2, 3];
          isString = typeof Utilities.toString(value) === "string";
        });
        then(`isString is true`, () => {
          expect(isString).toBe(true);
        });
      });
    });
  });
});

given(`Utilities toArray ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.METHOD);
    setSpecProperty("spec", "Utilities.toArray");
  });
  then(`Utilities.toArray is defined`, () => {
    expect(Utilities.toArray).toBeDefined();
  });
  and(`Utilities.toArray is defined`, () => {
    then(`Utilities.toArray is a function`, () => {
      expect(Utilities.toArray).toBeInstanceOf(Function);
    });
    and(`Utilities.toArray is a function`, () => {
      when(`Utilities.toArray(value) is called with array`, () => {
        let value: any[];
        let isArray: boolean;
        beforeEach(() => {
          value = [1, 2, 3];
          isArray = Array.isArray(Utilities.toArray(value));
        });
        then(`isArray is true`, () => {
          expect(isArray).toBe(true);
        });
      });
      when(`Utilities.toArray(value) is called with non-array`, () => {
        let value: any;
        let isArray: boolean;
        beforeEach(() => {
          value = 42;
          isArray = Array.isArray(Utilities.toArray(value));
        });
        then(`isArray is true`, () => {
          expect(isArray).toBe(true);
        });
      });
    });
  });
});
