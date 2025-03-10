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
  ImmutablePropertyException,
  AssignedException,
  UnassignedException,
  MissMatchException,
  DuplicateException,
  NotFoundException,
  Exceptions,
  InvalidIndexException,
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

given(
  `ImmutablePropertyException ${Type.CLASS} ${Spec.AVAILABILITY} test`,
  () => {
    beforeEach(() => {
      setSpecProperty("type", Type.CLASS);
      setSpecProperty("spec", Spec.AVAILABILITY);
    });
    and(`ImmutablePropertyException is imported`, () => {
      then(`ImmutablePropertyException is defined`, () => {
        expect(ImmutablePropertyException).toBeDefined();
      });
    });
  }
);

given(
  `ImmutablePropertyException ${Type.CLASS} ${Spec.INSTANTIATION} test`,
  () => {
    beforeEach(() => {
      setSpecProperty("type", Type.CLASS);
      setSpecProperty("spec", Spec.INSTANTIATION);
    });
    when("a new ImmutablePropertyException is created", () => {
      let property: string;
      let exception: Exception;
      beforeEach(() => {
        property = "test";
        exception = new ImmutablePropertyException(property);
      });
      then("exception is defined", () => {
        expect(exception).toBeDefined();
      });
      and("exception is defined", () => {
        then("exception is an instance of ImmutablePropertyException", () => {
          expect(exception).toBeInstanceOf(ImmutablePropertyException);
        });
        then("exception.name is defined", () => {
          expect(exception.name).toBeDefined();
        });
        and("exception.name is defined", () => {
          then("exception.name is ImmutablePropertyException", () => {
            expect(exception.name).toBe("ImmutablePropertyException");
          });
        });
        then("exception.message is defined", () => {
          expect(exception.message).toBeDefined();
        });
        and("exception.message is defined", () => {
          then("exception.message is 'Property 'test' is immutable.'", () => {
            expect(exception.message).toBe("Property 'test' is immutable.");
          });
        });
      });
    });
  }
);

given(`AssignedException ${Type.CLASS} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`AssignedException is imported`, () => {
    then(`AssignedException is defined`, () => {
      expect(AssignedException).toBeDefined();
    });
  });
});

given(`AssignedException ${Type.CLASS} ${Spec.INSTANTIATION} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.INSTANTIATION);
  });
  when("a new AssignedException is created", () => {
    let type: string;
    let hint: string;
    let exception: AssignedException;
    beforeEach(() => {
      type = "metadata";
      hint = "Use metadata.update(metadata) instead.";
      exception = new AssignedException(type, hint);
    });
    then("exception is defined", () => {
      expect(exception).toBeDefined();
    });
    and("exception is defined", () => {
      then("exception is an instance of AssignedException", () => {
        expect(exception).toBeInstanceOf(AssignedException);
      });
      then("exception.name is defined", () => {
        expect(exception.name).toBeDefined();
      });
      and("exception.name is defined", () => {
        then("exception.name is AssignedException", () => {
          expect(exception.name).toBe("AssignedException");
        });
      });
      then("exception.message is defined", () => {
        expect(exception.message).toBeDefined();
      });
      and("exception.message is defined", () => {
        then(
          "exception.message is 'A value has already been assigned to 'type': 'hint''",
          () => {
            expect(exception.message).toBe(`Cannot reassign ${type}. ${hint}`);
          }
        );
      });
    });
  });
});

given(`UnassignedException ${Type.CLASS} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`UnassignedException is imported`, () => {
    then(`UnassignedException is defined`, () => {
      expect(UnassignedException).toBeDefined();
    });
  });
});

given(`UnassignedException ${Type.CLASS} ${Spec.INSTANTIATION} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.INSTANTIATION);
  });
  when("a new UnassignedException is created", () => {
    let type: string;
    let hint: string;
    let exception: UnassignedException;
    beforeEach(() => {
      type = "metadata";
      hint = "Use metadata.add(metadata) instead.";
      exception = new UnassignedException(type, hint);
    });
    then("exception is defined", () => {
      expect(exception).toBeDefined();
    });
    and("exception is defined", () => {
      then("exception is an instance of UnassignedException", () => {
        expect(exception).toBeInstanceOf(UnassignedException);
      });
      then("exception.name is defined", () => {
        expect(exception.name).toBeDefined();
      });
      and("exception.name is defined", () => {
        then("exception.name is UnassignedException", () => {
          expect(exception.name).toBe("UnassignedException");
        });
      });
      then("exception.message is defined", () => {
        expect(exception.message).toBeDefined();
      });
      and("exception.message is defined", () => {
        then(
          "exception.message is 'No value has been assigned to 'type': 'hint''",
          () => {
            expect(exception.message).toBe(
              `No value has been assigned to ${type}: ${hint}`
            );
          }
        );
      });
    });
  });
});

given(`MissMatchException ${Type.CLASS} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`MissMatchException is imported`, () => {
    then(`MissMatchException is defined`, () => {
      expect(MissMatchException).toBeDefined();
    });
  });
});

given(`MissMatchException ${Type.CLASS} ${Spec.INSTANTIATION} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.INSTANTIATION);
  });
  when("a new MissMatchException is created ", () => {
    let type: string;
    let hint: string;
    let exception: MissMatchException;
    beforeEach(() => {
      type = "id";
      hint = "Ensure data.id and metadata.id match.";
      exception = new MissMatchException(type, hint);
    });
    then("exception is defined", () => {
      expect(exception).toBeDefined();
    });
    and("exception is defined", () => {
      then("exception is an instance of MissMatchException", () => {
        expect(exception).toBeInstanceOf(MissMatchException);
      });
      then("exception.name is defined", () => {
        expect(exception.name).toBeDefined();
      });
      and("exception.name is defined", () => {
        then("exception.name is MissMatchException", () => {
          expect(exception.name).toBe("MissMatchException");
        });
      });
      then("exception.message is defined", () => {
        expect(exception.message).toBeDefined();
      });
      and("exception.message is defined", () => {
        then(
          "exception.message is 'No value has been assigned to 'type': 'hint''",
          () => {
            expect(exception.message).toBe(`${type} does not match: ${hint}`);
          }
        );
      });
    });
  });
});

given(`DuplicateException ${Type.CLASS} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`DuplicateException is imported`, () => {
    then(`DuplicateException is defined`, () => {
      expect(DuplicateException).toBeDefined();
    });
  });
});

given(`DuplicateException ${Type.CLASS} ${Spec.INSTANTIATION} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.INSTANTIATION);
  });
  when("a new DuplicateException is created", () => {
    let property: string;
    let exception: Exception;
    beforeEach(() => {
      property = "test";
      exception = new DuplicateException(property);
    });
    then("exception is defined", () => {
      expect(exception).toBeDefined();
    });
    and("exception is defined", () => {
      then("exception is an instance of DuplicateException", () => {
        expect(exception).toBeInstanceOf(DuplicateException);
      });
      then("exception.name is defined", () => {
        expect(exception.name).toBeDefined();
      });
      and("exception.name is defined", () => {
        then("exception.name is DuplicateException", () => {
          expect(exception.name).toBe("DuplicateException");
        });
      });
      then("exception.message is defined", () => {
        expect(exception.message).toBeDefined();
      });
      and("exception.message is defined", () => {
        then("exception.message is 'Duplicate found: test'", () => {
          expect(exception.message).toBe("Duplicate found: test");
        });
      });
    });
  });
});

given(`NotFoundException ${Type.CLASS} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`NotFoundException is imported`, () => {
    then(`NotFoundException is defined`, () => {
      expect(NotFoundException).toBeDefined();
    });
  });
});

given(`NotFoundException ${Type.CLASS} ${Spec.INSTANTIATION} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.INSTANTIATION);
  });
  when("a new NotFoundException is created", () => {
    let item: string;
    let hint: string;
    let exception: Exception;
    beforeEach(() => {
      item = "item";
      hint = "hint";
      exception = new NotFoundException(item, hint);
    });
    then("exception is defined", () => {
      expect(exception).toBeDefined();
    });
    and("exception is defined", () => {
      then("exception is an instance of NotFoundException", () => {
        expect(exception).toBeInstanceOf(NotFoundException);
      });
      then("exception.name is defined", () => {
        expect(exception.name).toBeDefined();
      });
      and("exception.name is defined", () => {
        then("exception.name is NotFoundException", () => {
          expect(exception.name).toBe("NotFoundException");
        });
      });
      then("exception.message is defined", () => {
        expect(exception.message).toBeDefined();
      });
      and("exception.message is defined", () => {
        then("exception.message is 'Not found: item hint'", () => {
          expect(exception.message).toBe("Not found: item hint");
        });
      });
    });
  });
});

given(`InvalidIndexException ${Type.CLASS} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`InvalidIndexException is imported`, () => {
    then(`InvalidIndexException is defined`, () => {
      expect(InvalidIndexException).toBeDefined();
    });
  });
});

given(`InvalidIndexException ${Type.CLASS} ${Spec.INSTANTIATION} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.INSTANTIATION);
  });
  when("a new InvalidIndexException is created", () => {
    let exception: Exception;
    beforeEach(() => {
      exception = new InvalidIndexException();
    });
    then("exception is defined", () => {
      expect(exception).toBeDefined();
    });
    and("exception is defined", () => {
      then("exception is an instance of InvalidIndexException", () => {
        expect(exception).toBeInstanceOf(InvalidIndexException);
      });
      then("exception.name is defined", () => {
        expect(exception.name).toBeDefined();
      });
      and("exception.name is defined", () => {
        then("exception.name is InvalidIndexException", () => {
          expect(exception.name).toBe("InvalidIndexException");
        });
      });
      then("exception.message is defined", () => {
        expect(exception.message).toBeDefined();
      });
      and("exception.message is defined", () => {
        then("exception.message is 'Not found: item hint'", () => {
          expect(exception.message).toBe(
            "Invalid index: index is out of bounds"
          );
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
