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

import { Duplicate } from "../../../src/utilities/Duplicate.js";

given(`Duplicate class availability test`, () => {
  and(`Duplicate is imported`, () => {
    then(`Duplicate is defined`, () => {
      expect(Duplicate).toBeDefined();
    });
  });
});

given(`Duplicate.find static method availability test`, () => {
  then(`Duplicate.find is defined`, () => {
    expect(Duplicate.find).toBeDefined();
  });
  and(`Duplicate.find is defined`, () => {
    then(`Duplicate.find is a function`, () => {
      expect(Duplicate.find).toBeInstanceOf(Function);
    });
  });
});

given(`Duplicate.find static method availability test`, () => {
  when(`Duplicate.find is called with empty entities`, () => {
    let result;
    let entities;
    beforeEach(() => {
      entities = [];
      result = Duplicate.find(entities);
    });
    then(`result is undefined`, () => {
      expect(result).toBeUndefined();
    });
  });
  when(`Duplicate.find is called with unique entities`, () => {
    let result;
    let entities;
    beforeEach(() => {
      entities = [
        { id: "123", name: "Alice" },
        { id: "456", name: "Bob" },
        { id: "123", name: "Charlie" },
      ];
      result = Duplicate.find(entities);
    });
    then(`result is undefined`, () => {
      expect(result).toBeUndefined();
    });
  });
  when(`Duplicate.find is called with duplicate entities`, () => {
    let result;
    let entities;
    let duplicate;
    beforeEach(() => {
      entities = [
        { id: "123", name: "Alice" },
        { id: "456", name: "Bob" },
        { id: "123", name: "Alice" },
      ];
      duplicate = { id: "123", name: "Alice" };
      result = Duplicate.find(entities);
    });
    then(`result is equal to duplicate`, () => {
      expect(result).toEqual(duplicate);
    });
  });
  when(`Duplicate.find is called with entities and id extractor`, () => {
    let entities;
    let extractor;
    let result;
    beforeEach(() => {
      entities = [
        { id: "123", name: "Alice" },
        { id: "456", name: "Bob" },
        { id: "321", name: "Alice" },
      ];
      extractor = (entity) => entity.id;
      result = Duplicate.find(entities, extractor);
    });
    then(`result is undefined`, () => {
      expect(result).toBeUndefined();
    });
  });
  when(
    `Duplicate.find is called with duplicate entities and id extractor`,
    () => {
      let entities;
      let extractor;
      let result;
      let duplicate;
      beforeEach(() => {
        entities = [
          { id: "123", name: "Alice" },
          { id: "456", name: "Bob" },
          { id: "123", name: "Alice" },
        ];
        extractor = (entity) => entity.id;
        result = Duplicate.find(entities, extractor);
        duplicate = { id: "123", name: "Alice" };
      });
      then(`result is equal to duplicate`, () => {
        expect(result).toEqual(duplicate);
      });
    }
  );
});
