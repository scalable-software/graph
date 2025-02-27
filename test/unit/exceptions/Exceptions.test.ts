import * as help from "../Helper.js";

import { Type, Spec } from "../Helper.js";

const given = (description, spec) => describe(`Given ${description}`, spec);
const and = (description, spec) => describe(`and ${description}`, spec);
const when = (description, spec) => describe(`when ${description}`, spec);
const then = (description, spec) => it(`then ${description}`, spec);

import {
  Exception,
  InvalidArgumentException,
  ValidationException,
  Exceptions,
} from "../../../src/exceptions/Exceptions.js";

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

given(
  `InvalidArgumentException ${Type.CLASS} ${Spec.AVAILABILITY} test`,
  () => {
    beforeEach(() => {
      setSpecProperty("type", Type.CLASS);
      setSpecProperty("spec", Spec.AVAILABILITY);
    });
    and(`InvalidArgumentException is imported`, () => {
      then(`InvalidArgumentException is defined`, () => {
        expect(InvalidArgumentException).toBeDefined();
      });
    });
  }
);

given(
  `InvalidArgumentException ${Type.CLASS} ${Spec.INSTANTIATION} test`,
  () => {
    beforeEach(() => {
      setSpecProperty("type", Type.CLASS);
      setSpecProperty("spec", Spec.INSTANTIATION);
    });
    when("a new InvalidArgumentException is created", () => {
      let parameter: string;
      let reason: string;
      let exception: Exception;
      beforeEach(() => {
        parameter = "test";
        reason = "reason";
        exception = new InvalidArgumentException(parameter, reason);
      });
      then("exception is defined", () => {
        expect(exception).toBeDefined();
      });
      and("exception is defined", () => {
        then("exception is an instance of InvalidArgumentException", () => {
          expect(exception).toBeInstanceOf(InvalidArgumentException);
        });
        then("exception.name is defined", () => {
          expect(exception.name).toBeDefined();
        });
        and("exception.name is defined", () => {
          then("exception.name is InvalidArgumentException", () => {
            expect(exception.name).toBe("InvalidArgumentException");
          });
        });
        then("exception.message is defined", () => {
          expect(exception.message).toBeDefined();
        });
        and("exception.message is defined", () => {
          then("exception.message is 'Invalid argument: test - reason'", () => {
            expect(exception.message).toBe("Invalid argument: test - reason");
          });
        });
      });
    });
  }
);

given(`ValidationException ${Type.CLASS} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`ValidationException is imported`, () => {
    then(`ValidationException is defined`, () => {
      expect(ValidationException).toBeDefined();
    });
  });
});

given(`ValidationException ${Type.CLASS} ${Spec.INSTANTIATION} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.INSTANTIATION);
  });
  when("a new ValidationException is created", () => {
    let errors: Exception[];
    let exception: ValidationException;
    beforeEach(() => {
      errors = [new InvalidArgumentException("test")];
      exception = new ValidationException(errors);
    });
    then("exception is defined", () => {
      expect(exception).toBeDefined();
    });
    and("exception is defined", () => {
      then("exception is an instance of ValidationException", () => {
        expect(exception).toBeInstanceOf(ValidationException);
      });
      then("exception.name is defined", () => {
        expect(exception.name).toBeDefined();
      });
      and("exception.name is defined", () => {
        then("exception.name is ValidationException", () => {
          expect(exception.name).toBe("ValidationException");
        });
      });
      then("exception.message is defined", () => {
        expect(exception.message).toBeDefined();
      });
      and("exception.message is defined", () => {
        then(
          "exception.message is 'Validation failed with 1 error(s).'",
          () => {
            expect(exception.message).toBe(
              "Validation failed with 1 error(s)."
            );
          }
        );
      });
      then("exception.errors is defined", () => {
        expect(exception.errors).toBeDefined();
      });
      and("exception.errors is defined", () => {
        then("exception.errors is an array", () => {
          expect(exception.errors).toBeInstanceOf(Array);
        });
        and("exception.errors is an array", () => {
          then("exception.errors has length 1", () => {
            expect(exception.errors.length).toBe(1);
          });
          and("exception.errors has length 1", () => {
            then(
              "exception.errors[0] is an instance of InvalidArgumentException",
              () => {
                expect(exception.errors[0]).toBeInstanceOf(
                  InvalidArgumentException
                );
              }
            );
          });
        });
      });
    });
  });
});

given(`Exceptions ${Type.CLASS} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`Exceptions is imported`, () => {
    then(`Exceptions is defined`, () => {
      expect(Exceptions).toBeDefined();
    });
  });
});

given(`Exceptions ${Type.CLASS} ${Spec.INSTANTIATION} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.INSTANTIATION);
  });
  when("a new Exceptions is created", () => {
    let exception: Exceptions;
    beforeEach(() => {
      exception = new Exceptions();
    });
    then("exception is defined", () => {
      expect(exception).toBeDefined();
    });
    and("exception is defined", () => {
      then("exception is an instance of Exceptions", () => {
        expect(exception).toBeInstanceOf(Exceptions);
      });
    });
  });
});

given(`Exceptions invalidArgumentException ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Exceptions.invalidArgumentException");
  });
  then(`Exceptions.invalidArgumentException is defined`, () => {
    expect(Exceptions.invalidArgumentException).toBeDefined();
  });
  and(`Exceptions.invalidArgumentException is defined`, () => {
    then(`Exceptions.invalidArgumentException is a function`, () => {
      expect(Exceptions.invalidArgumentException).toBeInstanceOf(Function);
    });
    and(`Exceptions.invalidArgumentException is a function`, () => {
      when(
        "Exceptions.invalidArgumentException(parameter, reason) is called",
        () => {
          let error: Error;
          beforeEach(() => {
            try {
              Exceptions.invalidArgumentException("test", "reason");
            } catch (e) {
              error = e;
            }
          });
          then("error is defined", () => {
            expect(error).toBeDefined();
          });
          and("error is defined", () => {
            then("error is an instance of InvalidArgumentException", () => {
              expect(error).toBeInstanceOf(InvalidArgumentException);
            });
            and("error is an instance of InvalidArgumentException", () => {
              then("error.name is InvalidArgumentException", () => {
                expect(error.name).toBe("InvalidArgumentException");
              });
              then("error.message is 'Invalid argument: test - reason'", () => {
                expect(error.message).toBe("Invalid argument: test - reason");
              });
            });
          });
        }
      );
    });
  });
});

given(`Exceptions validationException ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Exceptions.validationException");
  });
  then(`Exceptions.validationException is defined`, () => {
    expect(Exceptions.validationException).toBeDefined();
  });
  and(`Exceptions.validationException is defined`, () => {
    then(`Exceptions.validationException is a function`, () => {
      expect(Exceptions.validationException).toBeInstanceOf(Function);
    });
    and(`Exceptions.validationException is a function`, () => {
      when("Exceptions.validationException(errors) is called", () => {
        let error: Error;
        beforeEach(() => {
          try {
            Exceptions.validationException([
              new InvalidArgumentException("test"),
            ]);
          } catch (e) {
            error = e;
          }
        });
        then("error is defined", () => {
          expect(error).toBeDefined();
        });
        and("error is defined", () => {
          then("error is an instance of ValidationException", () => {
            expect(error).toBeInstanceOf(ValidationException);
          });
          and("error is an instance of ValidationException", () => {
            then("error.name is ValidationException", () => {
              expect(error.name).toBe("ValidationException");
            });
            then(
              "error.message is 'Validation failed with 1 error(s).'",
              () => {
                expect(error.message).toBe(
                  "Validation failed with 1 error(s)."
                );
              }
            );
          });
        });
      });
    });
  });
});
