import * as help from "../Helper.js";

const given = (description, spec) =>
  describe(`Given ${description}`, () => {
    beforeEach(() => {
      const { context, type, test } = help.metadata(description);
      setSpecProperty("context", context);
      setSpecProperty("type", type);
      setSpecProperty("test", test);
    });
    spec();
  });
const and = (description, spec) => describe(`and ${description}`, spec);
const when = (description, spec) => describe(`when ${description}`, spec);
const then = (description, spec) => it(`then ${description}`, spec);

import { Utilities } from "../../../src/utilities/Utilities.js";
import { Properties } from "../../../src/utilities/Properties.js";
import { Duplicate } from "../../../src/utilities/Duplicate.js";
import { Match } from "../../../src/utilities/Match.js";
import { Index } from "../../../src/utilities/Index.js";

given(`Utilities class availability test`, () => {
  and(`Utilities is imported`, () => {
    then(`Utilities is defined`, () => {
      expect(Utilities).toBeDefined();
    });
  });
});

given(`Utilities.Properties static property availability test`, () => {
  then(`Utilities.Properties is defined`, () => {
    expect(Utilities.Properties).toBeDefined();
  });
  and(`Utilities.Properties is defined`, () => {
    then(`Utilities.Properties is Properties`, () => {
      expect(Utilities.Properties).toBe(Properties);
    });
  });
});

given(`Utilities.Duplicate static property availability test`, () => {
  then(`Utilities.Duplicate is defined`, () => {
    expect(Utilities.Duplicate).toBeDefined();
  });
  and(`Utilities.Duplicate is defined`, () => {
    then(`Utilities.Duplicate is Duplicate`, () => {
      expect(Utilities.Duplicate).toBe(Duplicate);
    });
  });
});

given(`Utilities.Match static property availability test`, () => {
  then(`Utilities.Match is defined`, () => {
    expect(Utilities.Match).toBeDefined();
  });
  and(`Utilities.Match is defined`, () => {
    then(`Utilities.Match is Match`, () => {
      expect(Utilities.Match).toBe(Match);
    });
  });
});

given(`Utilities.Index static property availability test`, () => {
  then(`Utilities.Index is defined`, () => {
    expect(Utilities.Index).toBeDefined();
  });
  and(`Utilities.Index is defined`, () => {
    then(`Utilities.Index is Index`, () => {
      expect(Utilities.Index).toBe(Index);
    });
  });
});

given(`Utilities.idify static property availability test`, () => {
  then("Utilities.idify is defined", () => {
    expect(Utilities.idifies).toBeDefined();
  });
  and("Utilities.idify is defined", () => {
    then("Utilities.idify is a function", () => {
      expect(Utilities.idifies).toBeInstanceOf(Function);
    });
  });
});

given(`Utilities.idify static property behavior test`, () => {
  when("Utilities.idify called with items which has ids", () => {
    let items: { id: string; name: string }[];
    let result;
    beforeEach(() => {
      items = [
        { id: "a1", name: "Item A" },
        { id: "b2", name: "Item B" },
      ];
      result = Utilities.idifies(items);
    });
    then("result is the same as items", () => {
      expect(result).toEqual(items);
    });
  });
  when("Utilities.idify called with items which has no ids", () => {
    type T = { id: string; name: string };
    let items: Omit<T, "id">[];
    let result;
    beforeEach(() => {
      items = [{ name: "Item A" }, { name: "Item B" }];
      result = Utilities.idifies<T>(items);
    });
    then("result contains items with id", () => {
      result.forEach((item) => {
        expect(item.id).toBeDefined();
      });
    });
  });
});

given(`Utilities.toString static property availability test`, () => {
  then(`Utilities.toString is defined`, () => {
    expect(Utilities.toString).toBeDefined();
  });
  and(`Utilities.toString is defined`, () => {
    then(`Utilities.toString is a function`, () => {
      expect(Utilities.toString).toBeInstanceOf(Function);
    });
  });
});

given(`Utilities.toString static property behavior test`, () => {
  when(`Utilities.toString is called with string`, () => {
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
  when(`Utilities.toString is called with number`, () => {
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
  when(`Utilities.toString is called with boolean`, () => {
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
  when(`Utilities.toString is called with object`, () => {
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
  when(`Utilities.toString is called with array`, () => {
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

given(`Utilities.toArray static property availability test`, () => {
  then(`Utilities.toArray is defined`, () => {
    expect(Utilities.toArray).toBeDefined();
  });
  and(`Utilities.toArray is defined`, () => {
    then(`Utilities.toArray is a function`, () => {
      expect(Utilities.toArray).toBeInstanceOf(Function);
    });
  });
});

given(`Utilities.toArray static property behavior test`, () => {
  when(`Utilities.toArray is called with items`, () => {
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
  when(`Utilities.toArray is called with item`, () => {
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

given(`Utilities.toTuple static property availability test`, () => {
  then(`Utilities.toTuple is defined`, () => {
    expect(Utilities.toTuple).toBeDefined();
  });
  and(`Utilities.toTuple is defined`, () => {
    then(`Utilities.toTuple is a function`, () => {
      expect(Utilities.toTuple).toBeInstanceOf(Function);
    });
  });
});

given(`Utilities.toTuple static property behavior test`, () => {
  when(`Utilities.toTuple(items) is called with items`, () => {
    let items: { id: string; name: string }[];
    let result: Record<string, { id: string; name: string }>;
    beforeEach(() => {
      items = [
        { id: "a1", name: "Item A" },
        { id: "b2", name: "Item B" },
      ];
      result = Utilities.toTuple(items);
    });
    then(`result is a record`, () => {
      expect(result).toEqual({
        a1: { id: "a1", name: "Item A" },
        b2: { id: "b2", name: "Item B" },
      });
    });
  });
});
