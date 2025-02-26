import * as help from "../Helper.js";

import { Type, Spec } from "../Helper.js";

const given = (description, spec) => describe(`Given ${description}`, spec);
const and = (description, spec) => describe(`and ${description}`, spec);
const when = (description, spec) => describe(`when ${description}`, spec);
const then = (description, spec) => it(`then ${description}`, spec);

import { Exception } from "../../../src/exceptions/Exceptions.js";

given(`Exception ${Type.ABSTRACT_CLASS} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.ABSTRACT_CLASS);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`Exception is imported`, () => {
    then(`Exception is defined`, () => {
      expect(Exception).toBeDefined();
    });
  });
});

given(`Exception ${Type.ABSTRACT_CLASS} ${Spec.INSTANTIATION} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.ABSTRACT_CLASS);
    setSpecProperty("spec", Spec.INSTANTIATION);
  });
  when("a new Exception is created using new Exception(message)", () => {
    class TestException extends Exception {
      constructor(message: string) {
        super(message);
      }
    }
    let message: string;
    let exception: Exception;

    beforeEach(() => {
      message = "test";
      exception = new TestException(message);
    });
    then("exception is defined", () => {
      expect(exception).toBeDefined();
    });
    and("exception is defined", () => {
      then("exception is an instance of TestException", () => {
        expect(exception).toBeInstanceOf(TestException);
      });
      then("exception.name is defined", () => {
        expect(exception.name).toBeDefined();
      });
      and("exception.name is defined", () => {
        then("exception.name is TestException", () => {
          expect(exception.name).toBe("TestException");
        });
      });
      then("exception.message is defined", () => {
        expect(exception.message).toBeDefined();
      });
      and("exception.message is defined", () => {
        then("exception.message is message", () => {
          expect(exception.message).toBe(message);
        });
      });
    });
  });
});
