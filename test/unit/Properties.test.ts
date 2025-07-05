import { Properties } from "../../src/utilities/properties.js";

given(`Properties class availability test`, () => {
  and(`Properties is imported`, () => {
    then(`Properties is defined`, () => {
      expect(Properties).toBeDefined();
    });
  });
});

given(`Properties.select static method availability test`, () => {
  then(`Properties.select is defined`, () => {
    expect(Properties.select).toBeDefined();
  });
  and(`Properties.select is defined`, () => {
    then(`Properties.select is a function`, () => {
      expect(Properties.select).toBeInstanceOf(Function);
    });
  });
});

given(`Properties.select static method behavior test`, () => {
  when(`Properties.select is called with instance of a class`, () => {
    let result;
    let parameters;
    let instance;
    beforeEach(() => {
      parameters = { id: "123", name: "Alice" };
      class Example {
        private _id: string;
        private _name: string;
        constructor({ id, name }) {
          this._id = id;
          this._name = name;
        }
        get id() {
          return this._id;
        }
        get name() {
          return this._name;
        }
        test() {
          return "test";
        }
      }
      instance = new Example(parameters);
      result = Properties.select(instance);
    });
    then(`result is instance`, () => {
      expect(result).toEqual({
        _id: parameters.id,
        _name: parameters.name,
      });
    });
  });
  when(
    `Properties.select is called with instance of a class and filters`,
    () => {
      let result;
      let parameters;
      let instance;
      beforeEach(() => {
        parameters = { id: "123", name: "Alice" };
        class Example {
          private _id: string;
          private _name: string;
          constructor({ id, name }) {
            this._id = id;
            this._name = name;
          }
          get id() {
            return this._id;
          }
          get name() {
            return this._name;
          }
          test() {
            return "test";
          }
        }
        instance = new Example(parameters);
        result = Properties.select(instance, [
          (key) => key !== "_id",
          (key) => key !== "_name",
        ]);
      });
      then(`result is instance`, () => {
        expect(result).toEqual({});
      });
    }
  );
});
