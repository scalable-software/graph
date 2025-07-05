import { Exception } from "@scalable.software/graph";

given("Exception abstract class availability test", () => {
  when("Exception is imported", () => {
    then("Exception is defined", () => {
      expect(Exception).toBeDefined();
    });
  });
});

given("Exception abstract class inheritance test", () => {
  and("Exception is extended", () => {
    class Extended extends Exception.Exception {
      constructor(message: string) {
        super(message);
      }
    }

    when("an instance of the extended class is created with message", () => {
      let message: string;
      let instance: Exception.Exception;

      beforeEach(() => {
        message = "message";
        instance = new Extended(message);
      });

      then("instance is defined", () => {
        expect(instance).toBeDefined();
      });

      and("the instance is defined", () => {
        then("instance is an instance of then extended class", () => {
          expect(instance).toBeInstanceOf(Extended);
        });
        then("instance.name is defined", () => {
          expect(instance.name).toBeDefined();
        });
        then("instance.message is defined", () => {
          expect(instance.message).toBeDefined();
        });

        and("instance.name is defined", () => {
          then("instance.name is the name of the extended class", () => {
            expect(instance.name).toBe(Extended.name);
          });
        });

        and("instance.message is defined", () => {
          then("instance.message is message", () => {
            expect(instance.message).toBe(message);
          });
        });
      });
    });
  });
});

given(`InvalidArgumentException class availability test`, () => {
  and(`InvalidArgumentException is imported`, () => {
    then(`InvalidArgumentException is defined`, () => {
      expect(Exception.InvalidArgumentException).toBeDefined();
    });
  });
});

given(`InvalidArgumentException class instantiation test`, () => {
  when("an InvalidArgumentException is created", () => {
    let parameter: string;
    let reason: string;
    let exception: Exception.Exception;
    beforeEach(() => {
      parameter = "parameter";
      reason = "reason";
      exception = new Exception.InvalidArgumentException(parameter, reason);
    });

    then("exception is defined", () => {
      expect(exception).toBeDefined();
    });

    and("exception is defined", () => {
      then("exception is an instance of InvalidArgumentException", () => {
        expect(exception).toBeInstanceOf(Exception.InvalidArgumentException);
      });
      then("exception.name is defined", () => {
        expect(exception.name).toBeDefined();
      });
      then("exception.message is defined", () => {
        expect(exception.message).toBeDefined();
      });

      and("exception.name is defined", () => {
        then("exception.name is InvalidArgumentException", () => {
          expect(exception.name).toBe("InvalidArgumentException");
        });
      });

      and("exception.message is defined", () => {
        then(
          "exception.message is 'Invalid argument: parameter - reason'",
          () => {
            expect(exception.message).toBe(
              "Invalid argument: parameter - reason"
            );
          }
        );
      });
    });
  });
});

given(`ValidationException class availability test`, () => {
  and(`ValidationException is imported`, () => {
    then(`ValidationException is defined`, () => {
      expect(Exception.ValidationException).toBeDefined();
    });
  });
});

given(`ValidationException class instantiation test`, () => {
  when("a ValidationException is created", () => {
    let errors: Exception.Exception[];
    let exception: Exception.ValidationException;
    beforeEach(() => {
      errors = [new Exception.InvalidArgumentException("test")];
      exception = new Exception.ValidationException(errors);
    });

    then("exception is defined", () => {
      expect(exception).toBeDefined();
    });

    and("exception is defined", () => {
      then("exception is an instance of ValidationException", () => {
        expect(exception).toBeInstanceOf(Exception.ValidationException);
      });
      then("exception.name is defined", () => {
        expect(exception.name).toBeDefined();
      });
      then("exception.message is defined", () => {
        expect(exception.message).toBeDefined();
      });
      then("exception.errors is defined", () => {
        expect(exception.errors).toBeDefined();
      });

      and("exception.name is defined", () => {
        then("exception.name is ValidationException", () => {
          expect(exception.name).toBe(Exception.ValidationException.name);
        });
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

given(`ImmutablePropertyException class availability test`, () => {
  and(`ImmutablePropertyException is imported`, () => {
    then(`ImmutablePropertyException is defined`, () => {
      expect(Exception.ImmutablePropertyException).toBeDefined();
    });
  });
});

given(`ImmutablePropertyException class instantiation test`, () => {
  when("an ImmutablePropertyException is created", () => {
    let property: string;
    let exception: Exception.Exception;
    beforeEach(() => {
      property = "test";
      exception = new Exception.ImmutablePropertyException(property);
    });

    then("exception is defined", () => {
      expect(exception).toBeDefined();
    });

    and("exception is defined", () => {
      then("exception is an instance of ImmutablePropertyException", () => {
        expect(exception).toBeInstanceOf(Exception.ImmutablePropertyException);
      });
      then("exception.name is defined", () => {
        expect(exception.name).toBeDefined();
      });
      then("exception.message is defined", () => {
        expect(exception.message).toBeDefined();
      });

      and("exception.name is defined", () => {
        then("exception.name is ImmutablePropertyException", () => {
          expect(exception.name).toBe(
            Exception.ImmutablePropertyException.name
          );
        });
      });

      and("exception.message is defined", () => {
        then("exception.message is 'Property 'test' is immutable.'", () => {
          expect(exception.message).toBe("Property 'test' is immutable.");
        });
      });
    });
  });
});

given(`AssignedException class availability test`, () => {
  and(`AssignedException is imported`, () => {
    then(`AssignedException is defined`, () => {
      expect(Exception.AssignedException).toBeDefined();
    });
  });
});

given(`AssignedException class instantiation test`, () => {
  when("an AssignedException is created", () => {
    let type: string;
    let hint: string;
    let exception: Exception.AssignedException;
    beforeEach(() => {
      type = "metadata";
      hint = "Use metadata.update(metadata) instead.";
      exception = new Exception.AssignedException(type, hint);
    });

    then("exception is defined", () => {
      expect(exception).toBeDefined();
    });

    and("exception is defined", () => {
      then("exception is an instance of AssignedException", () => {
        expect(exception).toBeInstanceOf(Exception.AssignedException);
      });
      then("exception.name is defined", () => {
        expect(exception.name).toBeDefined();
      });
      then("exception.message is defined", () => {
        expect(exception.message).toBeDefined();
      });

      and("exception.name is defined", () => {
        then("exception.name is AssignedException", () => {
          expect(exception.name).toBe(Exception.AssignedException.name);
        });
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

given(`UnassignedException class availability test`, () => {
  and(`UnassignedException is imported`, () => {
    then(`UnassignedException is defined`, () => {
      expect(Exception.UnassignedException).toBeDefined();
    });
  });
});

given(`UnassignedException class instantiation test`, () => {
  when("an UnassignedException is created", () => {
    let type: string;
    let hint: string;
    let exception: Exception.UnassignedException;
    beforeEach(() => {
      type = "metadata";
      hint = "Use metadata.add(metadata) instead.";
      exception = new Exception.UnassignedException(type, hint);
    });

    then("exception is defined", () => {
      expect(exception).toBeDefined();
    });

    and("exception is defined", () => {
      then("exception is an instance of UnassignedException", () => {
        expect(exception).toBeInstanceOf(Exception.UnassignedException);
      });
      then("exception.name is defined", () => {
        expect(exception.name).toBeDefined();
      });
      then("exception.message is defined", () => {
        expect(exception.message).toBeDefined();
      });

      and("exception.name is defined", () => {
        then("exception.name is UnassignedException", () => {
          expect(exception.name).toBe(Exception.UnassignedException.name);
        });
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

given(`MissMatchException class availability test`, () => {
  and(`MissMatchException is imported`, () => {
    then(`MissMatchException is defined`, () => {
      expect(Exception.MissMatchException).toBeDefined();
    });
  });
});

given(`MissMatchException class instantiation test`, () => {
  when("a MissMatchException is created ", () => {
    let type: string;
    let hint: string;
    let exception: Exception.MissMatchException;
    beforeEach(() => {
      type = "id";
      hint = "Ensure data.id and metadata.id match.";
      exception = new Exception.MissMatchException(type, hint);
    });

    then("exception is defined", () => {
      expect(exception).toBeDefined();
    });

    and("exception is defined", () => {
      then("exception is an instance of MissMatchException", () => {
        expect(exception).toBeInstanceOf(Exception.MissMatchException);
      });
      then("exception.name is defined", () => {
        expect(exception.name).toBeDefined();
      });
      then("exception.message is defined", () => {
        expect(exception.message).toBeDefined();
      });

      and("exception.name is defined", () => {
        then("exception.name is MissMatchException", () => {
          expect(exception.name).toBe(Exception.MissMatchException.name);
        });
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

given(`DuplicateException class availability test`, () => {
  and(`DuplicateException is imported`, () => {
    then(`DuplicateException is defined`, () => {
      expect(Exception.DuplicateException).toBeDefined();
    });
  });
});

given(`DuplicateException class instantiation test`, () => {
  when("a DuplicateException is created", () => {
    let property: string;
    let exception: Exception.Exception;
    beforeEach(() => {
      property = "test";
      exception = new Exception.DuplicateException(property);
    });

    then("exception is defined", () => {
      expect(exception).toBeDefined();
    });

    and("exception is defined", () => {
      then("exception is an instance of DuplicateException", () => {
        expect(exception).toBeInstanceOf(Exception.DuplicateException);
      });
      then("exception.name is defined", () => {
        expect(exception.name).toBeDefined();
      });
      then("exception.message is defined", () => {
        expect(exception.message).toBeDefined();
      });

      and("exception.name is defined", () => {
        then("exception.name is DuplicateException", () => {
          expect(exception.name).toBe(Exception.DuplicateException.name);
        });
      });

      and("exception.message is defined", () => {
        then("exception.message is 'Duplicate found: test'", () => {
          expect(exception.message).toBe("Duplicate found: test");
        });
      });
    });
  });
});

given(`NotFoundException class availability test`, () => {
  and(`NotFoundException is imported`, () => {
    then(`NotFoundException is defined`, () => {
      expect(Exception.NotFoundException).toBeDefined();
    });
  });
});

given(`NotFoundException class instantiation test`, () => {
  when("a NotFoundException is created", () => {
    let item: string;
    let hint: string;
    let exception: Exception.Exception;
    beforeEach(() => {
      item = "item";
      hint = "hint";
      exception = new Exception.NotFoundException(item, hint);
    });

    then("exception is defined", () => {
      expect(exception).toBeDefined();
    });

    and("exception is defined", () => {
      then("exception is an instance of NotFoundException", () => {
        expect(exception).toBeInstanceOf(Exception.NotFoundException);
      });
      then("exception.name is defined", () => {
        expect(exception.name).toBeDefined();
      });
      then("exception.message is defined", () => {
        expect(exception.message).toBeDefined();
      });

      and("exception.name is defined", () => {
        then("exception.name is NotFoundException", () => {
          expect(exception.name).toBe(Exception.NotFoundException.name);
        });
      });

      and("exception.message is defined", () => {
        then("exception.message is 'Not found: item hint'", () => {
          expect(exception.message).toBe("Not found: item hint");
        });
      });
    });
  });
});

given(`InvalidIndexException class availability test`, () => {
  and(`InvalidIndexException is imported`, () => {
    then(`InvalidIndexException is defined`, () => {
      expect(Exception.InvalidIndexException).toBeDefined();
    });
  });
});

given(`InvalidIndexException class instantiation test`, () => {
  when("an InvalidIndexException is created", () => {
    let exception: Exception.Exception;
    beforeEach(() => {
      exception = new Exception.InvalidIndexException();
    });

    then("exception is defined", () => {
      expect(exception).toBeDefined();
    });

    and("exception is defined", () => {
      then("exception is an instance of InvalidIndexException", () => {
        expect(exception).toBeInstanceOf(Exception.InvalidIndexException);
      });
      then("exception.name is defined", () => {
        expect(exception.name).toBeDefined();
      });
      then("exception.message is defined", () => {
        expect(exception.message).toBeDefined();
      });

      and("exception.name is defined", () => {
        then("exception.name is InvalidIndexException", () => {
          expect(exception.name).toBe(Exception.InvalidIndexException.name);
        });
      });

      and("exception.message is defined", () => {
        then(
          "exception.message is 'Invalid index: index is out of bound'",
          () => {
            expect(exception.message).toBe(
              "Invalid index: index is out of bounds"
            );
          }
        );
      });
    });
  });
});
