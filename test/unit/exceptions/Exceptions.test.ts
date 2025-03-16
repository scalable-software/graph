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

import { Exceptions, Exception } from "@scalable.software/graph";

given(`Exceptions class availability test`, () => {
  and(`Exceptions is imported`, () => {
    then(`Exceptions is defined`, () => {
      expect(Exceptions).toBeDefined();
    });
  });
});

given(
  `Exceptions.invalidArgumentException static method availability test`,
  () => {
    then(`Exceptions.invalidArgumentException is defined`, () => {
      expect(Exceptions.invalidArgumentException).toBeDefined();
    });
    and(`Exceptions.invalidArgumentException is defined`, () => {
      then(`Exceptions.invalidArgumentException is a function`, () => {
        expect(Exceptions.invalidArgumentException).toBeInstanceOf(Function);
      });
    });
  }
);

given(`Exceptions.invalidArgumentException static method behavior test`, () => {
  and(`Exceptions.invalidArgumentException is a function`, () => {
    when(
      "Exceptions.invalidArgumentException is called with parameter and reason",
      () => {
        let parameter: string;
        let reason: string;
        let error: Exception.Exception;
        beforeEach(() => {
          parameter = "parameter";
          reason = "reason";
          try {
            Exceptions.invalidArgumentException(parameter, reason);
          } catch (e) {
            error = e;
          }
        });
        then("error is defined", () => {
          expect(error).toBeDefined();
        });
        and("error is defined", () => {
          then("error is an instance of InvalidArgumentException", () => {
            expect(error).toBeInstanceOf(Exception.InvalidArgumentException);
          });
          and("error is an instance of InvalidArgumentException", () => {
            then("error.name is InvalidArgumentException", () => {
              expect(error.name).toBe(Exception.InvalidArgumentException.name);
            });
            then("error.message is 'Invalid argument: test - reason'", () => {
              expect(error.message).toBe(
                "Invalid argument: parameter - reason"
              );
            });
          });
        });
      }
    );
  });
});

given(`Exceptions.validationException static method availability test`, () => {
  then(`Exceptions.validationException is defined`, () => {
    expect(Exceptions.validationException).toBeDefined();
  });
  and(`Exceptions.validationException is defined`, () => {
    then(`Exceptions.validationException is a function`, () => {
      expect(Exceptions.validationException).toBeInstanceOf(Function);
    });
  });
});

given(`Exceptions.validationException static method behavior test`, () => {
  and(`Exceptions.validationException is a function`, () => {
    when("Exceptions.validationException is called with errors", () => {
      let errors: Exception.Exception[];
      let error: Exception.Exception;
      beforeEach(() => {
        errors = [new Exception.InvalidArgumentException("test")];
        try {
          Exceptions.validationException(errors);
        } catch (e) {
          error = e;
        }
      });
      then("error is defined", () => {
        expect(error).toBeDefined();
      });
      and("error is defined", () => {
        then("error is an instance of ValidationException", () => {
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
        and("error is an instance of ValidationException", () => {
          then("error.name is ValidationException", () => {
            expect(error.name).toBe(Exception.ValidationException.name);
          });
          then("error.message is 'Validation failed with 1 error(s).'", () => {
            expect(error.message).toBe("Validation failed with 1 error(s).");
          });
          then("error.errors.length is 1", () => {
            expect(error.errors.length).toBe(1);
          });
          and("error.errors.length is 1", () => {
            then(
              "error.errors[0] is an instance of ValidationException",
              () => {
                expect(error.errors[0]).toBeInstanceOf(
                  Exception.InvalidArgumentException
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
  `Exceptions.immutablePropertyException static method availability test`,
  () => {
    then(`Exceptions.immutablePropertyException is defined`, () => {
      expect(Exceptions.immutablePropertyException).toBeDefined();
    });
    and(`Exceptions.immutablePropertyException is defined`, () => {
      then(`Exceptions.immutablePropertyException is a function`, () => {
        expect(Exceptions.immutablePropertyException).toBeInstanceOf(Function);
      });
    });
  }
);

given(
  `Exceptions.immutablePropertyException static method behavior test`,
  () => {
    and(`Exceptions.immutablePropertyException is a function`, () => {
      when(
        "Exceptions.immutablePropertyException is called with property",
        () => {
          let property: string;
          let error: Exception.Exception;
          beforeEach(() => {
            property = "property";
            try {
              Exceptions.immutablePropertyException(property);
            } catch (e) {
              error = e;
            }
          });
          then("error is defined", () => {
            expect(error).toBeDefined();
          });
          and("error is defined", () => {
            then("error is an instance of ImmutablePropertyException", () => {
              expect(error).toBeInstanceOf(
                Exception.ImmutablePropertyException
              );
            });
            and("error is an instance of ImmutablePropertyException", () => {
              then("error.name is ImmutablePropertyException", () => {
                expect(error.name).toBe(
                  Exception.ImmutablePropertyException.name
                );
              });
              then(
                "error.message is 'Property 'property' is immutable.'",
                () => {
                  expect(error.message).toBe(
                    "Property 'property' is immutable."
                  );
                }
              );
            });
          });
        }
      );
    });
  }
);

given(`Exceptions.assignedException static method availability test`, () => {
  then(`Exceptions.assignedException is defined`, () => {
    expect(Exceptions.assignedException).toBeDefined();
  });
  and(`Exceptions.assignedException is defined`, () => {
    then(`Exceptions.assignedException is a function`, () => {
      expect(Exceptions.assignedException).toBeInstanceOf(Function);
    });
  });
});

given(`Exceptions.assignedException static method behavior test`, () => {
  and(`Exceptions.assignedException is a function`, () => {
    when("Exceptions.assignedException is called with type and hint", () => {
      let type: string;
      let hint: string;
      let error: Exception.Exception;
      beforeEach(() => {
        type = "type";
        hint = "hint";
        try {
          Exceptions.assignedException(type, hint);
        } catch (e) {
          error = e;
        }
      });
      then("error is defined", () => {
        expect(error).toBeDefined();
      });
      and("error is defined", () => {
        then("error is an instance of AssignedException", () => {
          expect(error).toBeInstanceOf(Exception.AssignedException);
        });
        and("error is an instance of AssignedException", () => {
          then("error.name is AssignedException", () => {
            expect(error.name).toBe(Exception.AssignedException.name);
          });
          then("error.message is 'Cannot reassign type. hint'", () => {
            expect(error.message).toBe("Cannot reassign type. hint");
          });
        });
      });
    });
  });
});

given(`Exceptions.unassignedException static method availability test`, () => {
  then(`Exceptions.unassignedException is defined`, () => {
    expect(Exceptions.unassignedException).toBeDefined();
  });
  and(`Exceptions.unassignedException is defined`, () => {
    then(`Exceptions.unassignedException is a function`, () => {
      expect(Exceptions.unassignedException).toBeInstanceOf(Function);
    });
  });
});

given(`Exceptions.unassignedException static method behavior test`, () => {
  and(`Exceptions.unassignedException is a function`, () => {
    when("Exceptions.unassignedException is called with type and hint", () => {
      let type: string;
      let hint: string;
      let error: Exception.Exception;
      beforeEach(() => {
        type = "type";
        hint = "hint";
        try {
          Exceptions.unassignedException(type, hint);
        } catch (e) {
          error = e;
        }
      });
      then("error is defined", () => {
        expect(error).toBeDefined();
      });
      and("error is defined", () => {
        then("error is an instance of UnassignedException", () => {
          expect(error).toBeInstanceOf(Exception.UnassignedException);
        });
        and("error is an instance of UnassignedException", () => {
          then("error.name is UnassignedException", () => {
            expect(error.name).toBe(Exception.UnassignedException.name);
          });
          then(
            "error.message is 'No value has been assigned to type: hint'",
            () => {
              expect(error.message).toBe(
                "No value has been assigned to type: hint"
              );
            }
          );
        });
      });
    });
  });
});

given(`Exceptions.missMatchException static method availability test`, () => {
  then(`Exceptions.missMatchException is defined`, () => {
    expect(Exceptions.missMatchException).toBeDefined();
  });
  and(`Exceptions.missMatchException is defined`, () => {
    then(`Exceptions.missMatchException is a function`, () => {
      expect(Exceptions.missMatchException).toBeInstanceOf(Function);
    });
  });
});

given(`Exceptions.missMatchException static method behavior test`, () => {
  and(`Exceptions.missMatchException is a function`, () => {
    when("Exceptions.missMatchException is called with type and hint", () => {
      let type: string;
      let hint: string;
      let error: Exception.Exception;
      beforeEach(() => {
        type = "type";
        hint = "hint";
        try {
          Exceptions.missMatchException(type, hint);
        } catch (e) {
          error = e;
        }
      });
      then("error is defined", () => {
        expect(error).toBeDefined();
      });
      and("error is defined", () => {
        then("error is an instance of MissMatchException", () => {
          expect(error).toBeInstanceOf(Exception.MissMatchException);
        });
        and("error is an instance of MissMatchException", () => {
          then("error.name is MissMatchException", () => {
            expect(error.name).toBe(Exception.MissMatchException.name);
          });
          then("error.message is 'type does not match: hint'", () => {
            expect(error.message).toBe("type does not match: hint");
          });
        });
      });
    });
  });
});

given(`Exceptions.duplicateException static method availability test`, () => {
  then(`Exceptions.duplicateException is defined`, () => {
    expect(Exceptions.duplicateException).toBeDefined();
  });
  and(`Exceptions.duplicateException is defined`, () => {
    then(`Exceptions.duplicateException is a function`, () => {
      expect(Exceptions.duplicateException).toBeInstanceOf(Function);
    });
  });
});

given(`Exceptions.duplicateException static method behavior test`, () => {
  and(`Exceptions.duplicateException is a function`, () => {
    when("Exceptions.duplicateException is called duplicate", () => {
      let duplicate: string;
      let error: Exception.Exception;
      beforeEach(() => {
        duplicate = "duplicate";
        try {
          Exceptions.duplicateException(duplicate);
        } catch (e) {
          error = e;
        }
      });
      then("error is defined", () => {
        expect(error).toBeDefined();
      });
      and("error is defined", () => {
        then("error is an instance of DuplicateException", () => {
          expect(error).toBeInstanceOf(Exception.DuplicateException);
        });
        and("error is an instance of DuplicateException", () => {
          then("error.name is DuplicateException", () => {
            expect(error.name).toBe(Exception.DuplicateException.name);
          });
          then("error.message is 'Duplicate found: duplicate'", () => {
            expect(error.message).toBe("Duplicate found: duplicate");
          });
        });
      });
    });
  });
});

given(`Exceptions.notFoundException static method availability test`, () => {
  then(`Exceptions.notFoundException is defined`, () => {
    expect(Exceptions.notFoundException).toBeDefined();
  });
  and(`Exceptions.notFoundException is defined`, () => {
    then(`Exceptions.notFoundException is a function`, () => {
      expect(Exceptions.notFoundException).toBeInstanceOf(Function);
    });
  });
});

given(`Exceptions.notFoundException static method behavior test`, () => {
  and(`Exceptions.notFoundException is a function`, () => {
    when("Exceptions.notFoundException is called with type and hint", () => {
      let type: string;
      let hint: string;
      let error: Exception.Exception;
      beforeEach(() => {
        type = "type";
        hint = "hint";
        try {
          Exceptions.notFoundException(type, hint);
        } catch (e) {
          error = e;
        }
      });
      then("error is defined", () => {
        expect(error).toBeDefined();
      });
      and("error is defined", () => {
        then("error is an instance of NotFoundException", () => {
          expect(error).toBeInstanceOf(Exception.NotFoundException);
        });
        and("error is an instance of NotFoundException", () => {
          then("error.name is NotFoundException", () => {
            expect(error.name).toBe(Exception.NotFoundException.name);
          });
          then("error.message is 'Not found: type hint'", () => {
            expect(error.message).toBe("Not found: type hint");
          });
        });
      });
    });
  });
});

given(
  `Exceptions.invalidIndexException static method availability test`,
  () => {
    then(`Exceptions.invalidIndexException is defined`, () => {
      expect(Exceptions.invalidIndexException).toBeDefined();
    });
    and(`Exceptions.invalidIndexException is defined`, () => {
      then(`Exceptions.invalidIndexException is a function`, () => {
        expect(Exceptions.invalidIndexException).toBeInstanceOf(Function);
      });
    });
  }
);

given(`Exceptions.invalidIndexException static method behavior test`, () => {
  and(`Exceptions.invalidIndexException is a function`, () => {
    when("Exceptions.invalidIndexException is called", () => {
      let error: Exception.Exception;
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
          expect(error).toBeInstanceOf(Exception.InvalidIndexException);
        });
        and("error is an instance of InvalidIndexException", () => {
          then("error.name is InvalidIndexException", () => {
            expect(error.name).toBe(Exception.InvalidIndexException.name);
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
