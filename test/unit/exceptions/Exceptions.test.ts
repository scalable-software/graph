import * as help from "../Helper.js";

import { Type, Test } from "../Helper.js";

const given = (description, spec) => describe(`Given ${description}`, spec);
const and = (description, spec) => describe(`and ${description}`, spec);
const when = (description, spec) => describe(`when ${description}`, spec);
const then = (description, spec) => it(`then ${description}`, spec);

import {
  Exception,
  InvalidArgumentException,
  ValidationException,
  ImmutablePropertyException,
  AssignedException,
  UnassignedException,
  MissMatchException,
  DuplicateException,
  NotFoundException,
  Exceptions,
  InvalidIndexException,
} from "../../../src/exceptions/Exceptions.js";

given(`Exceptions ${Type.CLASS} ${Test.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Test.AVAILABILITY);
  });
  and(`Exceptions is imported`, () => {
    then(`Exceptions is defined`, () => {
      expect(Exceptions).toBeDefined();
    });
  });
});

given(`Exceptions ${Type.CLASS} ${Test.INSTANTIATION} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Test.INSTANTIATION);
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

given(
  `Exceptions immutablePropertyException ${Type.STATIC_METHOD} test`,
  () => {
    beforeEach(() => {
      setSpecProperty("type", Type.STATIC_METHOD);
      setSpecProperty("spec", "Exceptions.immutablePropertyException");
    });
    then(`Exceptions.immutablePropertyException is defined`, () => {
      expect(Exceptions.immutablePropertyException).toBeDefined();
    });
    and(`Exceptions.immutablePropertyException is defined`, () => {
      then(`Exceptions.immutablePropertyException is a function`, () => {
        expect(Exceptions.immutablePropertyException).toBeInstanceOf(Function);
      });
      and(`Exceptions.immutablePropertyException is a function`, () => {
        when("Exceptions.immutablePropertyException(errors) is called", () => {
          let error: Error;
          beforeEach(() => {
            try {
              Exceptions.immutablePropertyException("test");
            } catch (e) {
              error = e;
            }
          });
          then("error is defined", () => {
            expect(error).toBeDefined();
          });
          and("error is defined", () => {
            then("error is an instance of ImmutablePropertyException", () => {
              expect(error).toBeInstanceOf(ImmutablePropertyException);
            });
            and("error is an instance of ImmutablePropertyException", () => {
              then("error.name is ImmutablePropertyException", () => {
                expect(error.name).toBe("ImmutablePropertyException");
              });
              then("error.message is 'Property 'test' is immutable.'", () => {
                expect(error.message).toBe("Property 'test' is immutable.");
              });
            });
          });
        });
      });
    });
  }
);

given(`Exceptions assignedException ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Exceptions.assignedException");
  });
  then(`Exceptions.assignedException is defined`, () => {
    expect(Exceptions.assignedException).toBeDefined();
  });
  and(`Exceptions.assignedException is defined`, () => {
    then(`Exceptions.assignedException is a function`, () => {
      expect(Exceptions.assignedException).toBeInstanceOf(Function);
    });
    and(`Exceptions.assignedException is a function`, () => {
      when("Exceptions.assignedException(type, hint) is called", () => {
        let error: Error;
        beforeEach(() => {
          try {
            Exceptions.assignedException("test", "reason");
          } catch (e) {
            error = e;
          }
        });
        then("error is defined", () => {
          expect(error).toBeDefined();
        });
        and("error is defined", () => {
          then("error is an instance of AssignedException", () => {
            expect(error).toBeInstanceOf(AssignedException);
          });
          and("error is an instance of AssignedException", () => {
            then("error.name is AssignedException", () => {
              expect(error.name).toBe("AssignedException");
            });
            then(
              "error.message is 'A value has already been assigned to test: reason'",
              () => {
                expect(error.message).toBe("Cannot reassign test. reason");
              }
            );
          });
        });
      });
    });
  });
});

given(`Exceptions unassignedException ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Exceptions.unassignedException");
  });
  then(`Exceptions.unassignedException is defined`, () => {
    expect(Exceptions.unassignedException).toBeDefined();
  });
  and(`Exceptions.unassignedException is defined`, () => {
    then(`Exceptions.unassignedException is a function`, () => {
      expect(Exceptions.unassignedException).toBeInstanceOf(Function);
    });
    and(`Exceptions.unassignedException is a function`, () => {
      when("Exceptions.unassignedException(type, hint) is called", () => {
        let error: Error;
        beforeEach(() => {
          try {
            Exceptions.unassignedException("test", "reason");
          } catch (e) {
            error = e;
          }
        });
        then("error is defined", () => {
          expect(error).toBeDefined();
        });
        and("error is defined", () => {
          then("error is an instance of UnassignedException", () => {
            expect(error).toBeInstanceOf(UnassignedException);
          });
          and("error is an instance of UnassignedException", () => {
            then("error.name is UnassignedException", () => {
              expect(error.name).toBe("UnassignedException");
            });
            then(
              "error.message is 'No value has been assigned to test: reason'",
              () => {
                expect(error.message).toBe(
                  "No value has been assigned to test: reason"
                );
              }
            );
          });
        });
      });
    });
  });
});

given(`Exceptions missMatchException ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Exceptions.missMatchException");
  });
  then(`Exceptions.missMatchException is defined`, () => {
    expect(Exceptions.missMatchException).toBeDefined();
  });
  and(`Exceptions.missMatchException is defined`, () => {
    then(`Exceptions.missMatchException is a function`, () => {
      expect(Exceptions.missMatchException).toBeInstanceOf(Function);
    });
    and(`Exceptions.missMatchException is a function`, () => {
      when("Exceptions.missMatchException(type, hint) is called", () => {
        let error: Error;
        beforeEach(() => {
          try {
            Exceptions.missMatchException("test", "reason");
          } catch (e) {
            error = e;
          }
        });
        then("error is defined", () => {
          expect(error).toBeDefined();
        });
        and("error is defined", () => {
          then("error is an instance of MissMatchException", () => {
            expect(error).toBeInstanceOf(MissMatchException);
          });
          and("error is an instance of MissMatchException", () => {
            then("error.name is MissMatchException", () => {
              expect(error.name).toBe("MissMatchException");
            });
            then(
              "error.message is 'No value has been assigned to test: reason'",
              () => {
                expect(error.message).toBe("test does not match: reason");
              }
            );
          });
        });
      });
    });
  });
});

given(`Exceptions duplicateException ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Exceptions.duplicateException");
  });
  then(`Exceptions.duplicateException is defined`, () => {
    expect(Exceptions.duplicateException).toBeDefined();
  });
  and(`Exceptions.duplicateException is defined`, () => {
    then(`Exceptions.duplicateException is a function`, () => {
      expect(Exceptions.duplicateException).toBeInstanceOf(Function);
    });
    and(`Exceptions.duplicateException is a function`, () => {
      when("Exceptions.duplicateException(errors) is called", () => {
        let error: Error;
        beforeEach(() => {
          try {
            Exceptions.duplicateException("test");
          } catch (e) {
            error = e;
          }
        });
        then("error is defined", () => {
          expect(error).toBeDefined();
        });
        and("error is defined", () => {
          then("error is an instance of DuplicateException", () => {
            expect(error).toBeInstanceOf(DuplicateException);
          });
          and("error is an instance of DuplicateException", () => {
            then("error.name is DuplicateException", () => {
              expect(error.name).toBe("DuplicateException");
            });
            then("error.message is 'Duplicate found: test'", () => {
              expect(error.message).toBe("Duplicate found: test");
            });
          });
        });
      });
    });
  });
});

given(`Exceptions notFoundException ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Exceptions.notFoundException");
  });
  then(`Exceptions.notFoundException is defined`, () => {
    expect(Exceptions.notFoundException).toBeDefined();
  });
  and(`Exceptions.notFoundException is defined`, () => {
    then(`Exceptions.notFoundException is a function`, () => {
      expect(Exceptions.notFoundException).toBeInstanceOf(Function);
    });
    and(`Exceptions.notFoundException is a function`, () => {
      when("Exceptions.notFoundException(errors) is called", () => {
        let error: Error;
        beforeEach(() => {
          try {
            Exceptions.notFoundException("test", "hint");
          } catch (e) {
            error = e;
          }
        });
        then("error is defined", () => {
          expect(error).toBeDefined();
        });
        and("error is defined", () => {
          then("error is an instance of NotFoundException", () => {
            expect(error).toBeInstanceOf(NotFoundException);
          });
          and("error is an instance of NotFoundException", () => {
            then("error.name is NotFoundException", () => {
              expect(error.name).toBe("NotFoundException");
            });
            then("error.message is 'Not found: test hint'", () => {
              expect(error.message).toBe("Not found: test hint");
            });
          });
        });
      });
    });
  });
});

given(`Exceptions invalidIndexException ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Exceptions.invalidIndexException");
  });
  then(`Exceptions.invalidIndexException is defined`, () => {
    expect(Exceptions.invalidIndexException).toBeDefined();
  });
  and(`Exceptions.invalidIndexException is defined`, () => {
    then(`Exceptions.invalidIndexException is a function`, () => {
      expect(Exceptions.invalidIndexException).toBeInstanceOf(Function);
    });
    and(`Exceptions.invalidIndexException is a function`, () => {
      when("Exceptions.invalidIndexException() is called", () => {
        let error: Error;
        beforeEach(() => {
          try {
            Exceptions.invalidIndexException();
          } catch (e) {
            error = e;
          }
        });
        then("error is defined", () => {
          expect(error).toBeDefined();
        });
        and("error is defined", () => {
          then("error is an instance of InvalidIndexException", () => {
            expect(error).toBeInstanceOf(InvalidIndexException);
          });
          and("error is an instance of InvalidIndexException", () => {
            then("error.name is InvalidIndexException", () => {
              expect(error.name).toBe("InvalidIndexException");
            });
            then(
              "error.message is 'Invalid index: index is out of bounds'",
              () => {
                expect(error.message).toBe(
                  "Invalid index: index is out of bounds"
                );
              }
            );
          });
        });
      });
    });
  });
});
