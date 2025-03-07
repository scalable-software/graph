import { Type, Spec } from "../Helper.js";

const given = (description, spec) => describe(`Given ${description}`, spec);
const and = (description, spec) => describe(`and ${description}`, spec);
const when = (description, spec) => describe(`when ${description}`, spec);
const then = (description, spec) => it(`then ${description}`, spec);

import { Validate } from "../../../src/validations/Validate.js";
import {
  ImmutablePropertyException,
  InvalidArgumentException,
  ValidationException,
  DuplicateException,
} from "../../../src/exceptions/Exceptions.js";

import type {
  UUID,
  Coordinates,
  IMetadata,
  INode,
} from "@scalable.software/graph";

given(`Validate ${Type.CLASS} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`Validate is imported`, () => {
    then(`Validate is defined`, () => {
      expect(Validate).toBeDefined();
    });
  });
});

given(`Validate uuid ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Validate.uuid");
  });
  then(`Validate.uuid is defined`, () => {
    expect(Validate.uuid).toBeDefined();
  });
  and(`Validate.uuid is defined`, () => {
    then(`Validate.uuid is a function`, () => {
      expect(Validate.uuid).toBeInstanceOf(Function);
    });
    and(`Validate.uuid is a function`, () => {
      when(`Validate.uuid(id) is called with a valid UUID`, () => {
        let id: string;
        let uuid: UUID;
        beforeEach(() => {
          id = "123e4567-e89b-12d3-a456-426614174000";
          uuid = Validate.uuid(id);
        });
        then(`Validate.uuid returns the id`, () => {
          expect(uuid).toBe(id);
        });
      });
      when(`Validate.uuid(id) is called with an invalid UUID`, () => {
        let id: string;
        let error: Error;
        beforeEach(() => {
          id = "invalid";
          try {
            Validate.uuid(id);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(`error is an instance of InvalidArgumentException`, () => {
            expect(error).toBeInstanceOf(InvalidArgumentException);
          });
          and(`error is an instance of InvalidArgumentException`, () => {
            then(`error is an instance of InvalidArgumentException`, () => {
              expect(error).toBeInstanceOf(InvalidArgumentException);
            });
            then(
              `error.message is "Invalid argument: id - must be a valid UUID"`,
              () => {
                expect(error.message).toBe(
                  "Invalid argument: id - must be a valid UUID"
                );
              }
            );
          });
        });
      });
      when(`Validate.uuid(id) is called with null`, () => {
        let id: string;
        let error: Error;
        beforeEach(() => {
          id = null;
          try {
            Validate.uuid(id);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(`error is an instance of InvalidArgumentException`, () => {
            expect(error).toBeInstanceOf(InvalidArgumentException);
          });
          and(`error is an instance of InvalidArgumentException`, () => {
            then(`error is an instance of InvalidArgumentException`, () => {
              expect(error).toBeInstanceOf(InvalidArgumentException);
            });
            then(
              `error.message is "Invalid argument: id - must be a valid UUID"`,
              () => {
                expect(error.message).toBe(
                  "Invalid argument: id - must be a valid UUID"
                );
              }
            );
          });
        });
      });
    });
  });
});

given(`Validate coordinates ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Validate.coordinates");
  });
  then(`Validate.coordinates is defined`, () => {
    expect(Validate.coordinates).toBeDefined();
  });
  and(`Validate.coordinates is defined`, () => {
    then(`Validate.coordinates is a function`, () => {
      expect(Validate.coordinates).toBeInstanceOf(Function);
    });
    and(`Validate.coordinates is a function`, () => {
      when(
        `Validate.coordinates(coordinates) is called with valid coordinates`,
        () => {
          let coordinates: any;
          let result: any;
          beforeEach(() => {
            coordinates = { x: 0, y: 0 };
            result = Validate.coordinates(coordinates);
          });
          then(`Validate.coordinates returns the coordinates`, () => {
            expect(result).toBe(coordinates);
          });
        }
      );
      when(
        `Validate.coordinates(coordinates) is called with invalid coordinates`,
        () => {
          let coordinates: any;
          let error: Error;
          beforeEach(() => {
            coordinates = { x: 0 };
            try {
              Validate.coordinates(coordinates);
            } catch (e) {
              error = e;
            }
          });
          then(`error is defined`, () => {
            expect(error).toBeDefined();
          });
          and(`error is defined`, () => {
            then(`error is an instance of InvalidArgumentException`, () => {
              expect(error).toBeInstanceOf(InvalidArgumentException);
            });
            and(`error is an instance of InvalidArgumentException`, () => {
              then(`error is an instance of InvalidArgumentException`, () => {
                expect(error).toBeInstanceOf(InvalidArgumentException);
              });
              then(
                `error.message is "Invalid argument: coordinates - must be valid coordinates"`,
                () => {
                  expect(error.message).toBe(
                    "Invalid argument: coordinates - must be valid coordinates"
                  );
                }
              );
            });
          });
        }
      );
      when(`Validate.coordinates(coordinates) is called with null`, () => {
        let coordinates: any;
        let error: Error;
        beforeEach(() => {
          coordinates = null;
          try {
            Validate.coordinates(coordinates);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(`error is an instance of InvalidArgumentException`, () => {
            expect(error).toBeInstanceOf(InvalidArgumentException);
          });
          and(`error is an instance of InvalidArgumentException`, () => {
            then(`error is an instance of InvalidArgumentException`, () => {
              expect(error).toBeInstanceOf(InvalidArgumentException);
            });
            then(
              `error.message is "Invalid argument: coordinates - must be valid coordinates"`,
              () => {
                expect(error.message).toBe(
                  "Invalid argument: coordinates - must be valid coordinates"
                );
              }
            );
          });
        });
      });
    });
  });
});

given(`Validate name ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Validate.name");
  });
  then(`Validate.name is defined`, () => {
    expect(Validate.name).toBeDefined();
  });
  and(`Validate.name is defined`, () => {
    then(`Validate.name is a function`, () => {
      expect(Validate.name).toBeInstanceOf(Function);
    });
    and(`Validate.name is a function`, () => {
      when(`Validate.name(name) is called with a valid name`, () => {
        let name: string;
        let result: string;
        beforeEach(() => {
          name = "John Doe";
          result = Validate.name(name);
        });
        then(`Validate.name returns the name`, () => {
          expect(result).toBe(name);
        });
      });
      when(`Validate.name(name) is called with too short name`, () => {
        let name: string;
        let error: Error;
        beforeEach(() => {
          name = "J";
          try {
            Validate.name(name);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(`error is an instance of InvalidArgumentException`, () => {
            expect(error).toBeInstanceOf(InvalidArgumentException);
          });
          and(`error is an instance of InvalidArgumentException`, () => {
            then(`error is an instance of InvalidArgumentException`, () => {
              expect(error).toBeInstanceOf(InvalidArgumentException);
            });
            then(
              `error.message is "Invalid argument: name - must be a valid name"`,
              () => {
                expect(error.message).toBe(
                  "Invalid argument: name - must be a valid name"
                );
              }
            );
          });
        });
      });
      when(`Validate.name(name) is called with too long name`, () => {
        let name: string;
        let error: Error;
        beforeEach(() => {
          name = "J".repeat(101);
          try {
            Validate.name(name);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(`error is an instance of InvalidArgumentException`, () => {
            expect(error).toBeInstanceOf(InvalidArgumentException);
          });
          and(`error is an instance of InvalidArgumentException`, () => {
            then(`error is an instance of InvalidArgumentException`, () => {
              expect(error).toBeInstanceOf(InvalidArgumentException);
            });
            then(
              `error.message is "Invalid argument: name - must be a valid name"`,
              () => {
                expect(error.message).toBe(
                  "Invalid argument: name - must be a valid name"
                );
              }
            );
          });
        });
      });
      when(`Validate.name(name) is called with null`, () => {
        let name: string;
        let error: Error;
        beforeEach(() => {
          name = null;
          try {
            Validate.name(name);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(`error is an instance of InvalidArgumentException`, () => {
            expect(error).toBeInstanceOf(InvalidArgumentException);
          });
          and(`error is an instance of InvalidArgumentException`, () => {
            then(`error is an instance of InvalidArgumentException`, () => {
              expect(error).toBeInstanceOf(InvalidArgumentException);
            });
            then(
              `error.message is "Invalid argument: name - must be a valid name"`,
              () => {
                expect(error.message).toBe(
                  "Invalid argument: name - must be a valid name"
                );
              }
            );
          });
        });
      });
    });
  });
});

given(`Validate match ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Validate.match");
  });
  then(`Validate.match is defined`, () => {
    expect(Validate.match).toBeDefined();
  });
  and(`Validate.match is defined`, () => {
    then(`Validate.match is a function`, () => {
      expect(Validate.match).toBeInstanceOf(Function);
    });
    and(`Validate.match is a function`, () => {
      when(
        `Validate.match(keys, immutable) is called with a matching key`,
        () => {
          let keys: string[];
          let immutable: string;
          let error: Error;
          beforeEach(() => {
            keys = ["id", "name"];
            immutable = "id";
            try {
              Validate.match(keys, immutable);
            } catch (e) {
              error = e;
            }
          });
          then(`error is defined`, () => {
            expect(error).toBeDefined();
          });
          and(`error is defined`, () => {
            then(`error is an instance of ImmutablePropertyException`, () => {
              expect(error).toBeInstanceOf(ImmutablePropertyException);
            });
            and(`error is an instance of ImmutablePropertyException`, () => {
              then(`error is an instance of ImmutablePropertyException`, () => {
                expect(error).toBeInstanceOf(ImmutablePropertyException);
              });
              then(`error.message is "The id property is immutable."`, () => {
                expect(error.message).toBe("Property 'id' is immutable.");
              });
            });
          });
        }
      );
      when(
        `Validate.match(keys, immutable) is called with a non-matching key`,
        () => {
          let keys: string[];
          let immutable: string;
          let result;
          beforeEach(() => {
            keys = ["id", "name"];
            immutable = "type";
            result = Validate.match(keys, immutable);
          });
          then(`Validate.match returns false`, () => {
            expect(result).toBe(false);
          });
        }
      );
    });
  });
});

given(`Validate metadata ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Validate.metadata");
  });
  then("Validate.metadata is defined", () => {
    expect(Validate.metadata).toBeDefined();
  });
  and("Validate.metadata is defined", () => {
    then("Validate.metadata is a function", () => {
      expect(Validate.metadata).toBeInstanceOf(Function);
    });
    and("Validate.metadata is a function", () => {
      when("Validate.metadata(data) is called with valid data", () => {
        let data: IMetadata;
        let result: any;
        beforeEach(() => {
          data = { id: "123e4567-e89b-12d3-a456-426614174000", name: "test" };
          result = Validate.metadata(data);
        });
        then("data is returned", () => {
          expect(result).toBe(data);
        });
      });
      when("Validate.metadata(data) is called with invalid data", () => {
        let data: Partial<IMetadata>;
        let result: any;
        let error: ValidationException;
        beforeEach(() => {
          data = { id: "invalid", name: "T" };
          try {
            result = Validate.metadata(data as IMetadata);
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
            then(
              "error.message is 'Validation failed with 2 error(s).'",
              () => {
                expect(error.message).toBe(
                  "Validation failed with 2 error(s)."
                );
              }
            );
            then("error.errors is defined", () => {
              expect(error.errors).toBeDefined();
            });
            and("error.errors is defined", () => {
              then("error.errors[0] is an InvalidArgumentException", () => {
                expect(error.errors[0]).toBeInstanceOf(
                  InvalidArgumentException
                );
              });
              and("error.errors[0] is an InvalidArgumentException", () => {
                then(
                  "error.errors[0].message is 'Invalid argument: id - must be a valid UUID'",
                  () => {
                    expect(error.errors[0].message).toBe(
                      "Invalid argument: id - must be a valid UUID"
                    );
                  }
                );
              });
              then("error.errors[1] is an InvalidArgumentException", () => {
                expect(error.errors[1]).toBeInstanceOf(
                  InvalidArgumentException
                );
              });
              and("error.errors[1] is an InvalidArgumentException", () => {
                then(
                  "error.errors[1].message is 'Invalid argument: name - must be a valid name'",
                  () => {
                    expect(error.errors[1].message).toBe(
                      "Invalid argument: name - must be a valid name"
                    );
                  }
                );
              });
            });
          });
        });
      });
      when("Validate.metadata(data) is called with invalid data.id", () => {
        let data: Partial<IMetadata>;
        let result: any;
        let error: ValidationException;
        beforeEach(() => {
          data = { id: "invalid", name: "test" };
          try {
            result = Validate.metadata(data as IMetadata);
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
            then(
              "error.message is 'Validation failed with 1 error(s).'",
              () => {
                expect(error.message).toBe(
                  "Validation failed with 1 error(s)."
                );
              }
            );
            then("error.errors is defined", () => {
              expect(error.errors).toBeDefined();
            });
            and("error.errors is defined", () => {
              then("error.errors[0] is an InvalidArgumentException", () => {
                expect(error.errors[0]).toBeInstanceOf(
                  InvalidArgumentException
                );
              });
              and("error.errors[0] is an InvalidArgumentException", () => {
                then(
                  "error.errors[0].message is 'Invalid argument: id - must be a valid UUID'",
                  () => {
                    expect(error.errors[0].message).toBe(
                      "Invalid argument: id - must be a valid UUID"
                    );
                  }
                );
              });
            });
          });
        });
      });
      when("Validate.metadata(data) is called with invalid data.name", () => {
        let data: Partial<IMetadata>;
        let result: any;
        let error: ValidationException;
        beforeEach(() => {
          data = { id: "123e4567-e89b-12d3-a456-426614174000", name: "T" };
          try {
            result = Validate.metadata(data as IMetadata);
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
            then(
              "error.message is 'Validation failed with 1 error(s).'",
              () => {
                expect(error.message).toBe(
                  "Validation failed with 1 error(s)."
                );
              }
            );
            then("error.errors is defined", () => {
              expect(error.errors).toBeDefined();
            });
            and("error.errors is defined", () => {
              then("error.errors[0] is an InvalidArgumentException", () => {
                expect(error.errors[0]).toBeInstanceOf(
                  InvalidArgumentException
                );
              });
              and("error.errors[0] is an InvalidArgumentException", () => {
                then(
                  "error.errors[0].message is 'Invalid argument: name - must be a valid name'",
                  () => {
                    expect(error.errors[0].message).toBe(
                      "Invalid argument: name - must be a valid name"
                    );
                  }
                );
              });
            });
          });
        });
      });
    });
  });
});
