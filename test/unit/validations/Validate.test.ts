import * as help from "../Helper.js";

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
} from "../../../src/exceptions/Exceptions.js";

import type { UUID } from "@scalable.software/graph";

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

given(`Validate rules ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Validate.rules");
  });
  then(`Validate.rules is defined`, () => {
    expect(Validate.rules).toBeDefined();
  });
  and(`Validate.rules is defined`, () => {
    then(`Validate.rules is a function`, () => {
      expect(Validate.rules).toBeInstanceOf(Function);
    });
    and(`Validate.rules is a function`, () => {
      when(
        `Validate.rules(details, rules) is called with valid details`,
        () => {
          let details: any;
          let rules: any[];
          let result: any;
          beforeEach(() => {
            details = {
              id: "123e4567-e89b-12d3-a456-426614174000",
              name: "John Doe",
            };
            rules = [
              ({ id }) => Validate.uuid(id),
              ({ name }) => Validate.name(name),
            ];
            result = Validate.rules(details, rules);
          });
          then(`Validate.rules returns the details`, () => {
            expect(result).toBe(details);
          });
        }
      );
      when(
        `Validate.rules(details, rules) is called with invalid details.id`,
        () => {
          let details: any;
          let rules: any[];
          let result: any;
          let error: ValidationException;
          beforeEach(() => {
            details = {
              id: "invalid",
              name: "John Doe",
            };
            rules = [
              ({ id }) => Validate.uuid(id),
              ({ name }) => Validate.name(name),
            ];
            try {
              result = Validate.rules(details, rules);
            } catch (e) {
              error = e;
            }
          });
          then(`error is defined`, () => {
            expect(error).toBeDefined();
          });
          and(`error is defined`, () => {
            then(`error is an instance of ValidationException`, () => {
              expect(error).toBeInstanceOf(ValidationException);
            });
            and(`error is an instance of ValidationException`, () => {
              then(`error.errors.length is 1`, () => {
                expect(error.errors.length).toBe(1);
              });
              and(`error.errors.length is 1`, () => {
                then(
                  `error.errors[0] is an instance of InvalidArgumentException`,
                  () => {
                    expect(error.errors[0]).toBeInstanceOf(
                      InvalidArgumentException
                    );
                  }
                );
                and(
                  `error.errors[0] is an instance of InvalidArgumentException`,
                  () => {
                    then(
                      `error.errors[0].message is "Invalid argument: id - must be a valid UUID"`,
                      () => {
                        expect(error.errors[0].message).toBe(
                          "Invalid argument: id - must be a valid UUID"
                        );
                      }
                    );
                  }
                );
              });
            });
          });
        }
      );
      when(
        `Validate.rules(details, rules) is called with invalid details.name`,
        () => {
          let details: any;
          let rules: any[];
          let result: any;
          let error: ValidationException;
          beforeEach(() => {
            details = {
              id: "123e4567-e89b-12d3-a456-426614174000",
              name: "J",
            };
            rules = [
              ({ id }) => Validate.uuid(id),
              ({ name }) => Validate.name(name),
            ];
            try {
              result = Validate.rules(details, rules);
            } catch (e) {
              error = e;
            }
          });
          then(`error is defined`, () => {
            expect(error).toBeDefined();
          });
          and(`error is defined`, () => {
            then(`error is an instance of ValidationException`, () => {
              expect(error).toBeInstanceOf(ValidationException);
            });
            and(`error is an instance of ValidationException`, () => {
              then(`error.errors.length is 1`, () => {
                expect(error.errors.length).toBe(1);
              });
              and(`error.errors.length is 1`, () => {
                then(
                  `error.errors[0] is an instance of InvalidArgumentException`,
                  () => {
                    expect(error.errors[0]).toBeInstanceOf(
                      InvalidArgumentException
                    );
                  }
                );
                and(
                  `error.errors[0] is an instance of InvalidArgumentException`,
                  () => {
                    then(
                      `error.errors[0].message is "Invalid argument: name - must be a valid name"`,
                      () => {
                        expect(error.errors[0].message).toBe(
                          "Invalid argument: name - must be a valid name"
                        );
                      }
                    );
                  }
                );
              });
            });
          });
        }
      );
      when(
        `Validate.rules(details, rules) is called with invalid details`,
        () => {
          let details: any;
          let rules: any[];
          let result: any;
          let error: ValidationException;
          beforeEach(() => {
            details = {
              id: "invalid",
              name: "J",
            };
            rules = [
              ({ id }) => Validate.uuid(id),
              ({ name }) => Validate.name(name),
            ];
            try {
              result = Validate.rules(details, rules);
            } catch (e) {
              error = e;
            }
          });
          then(`error is defined`, () => {
            expect(error).toBeDefined();
          });
          and(`error is defined`, () => {
            then(`error is an instance of ValidationException`, () => {
              expect(error).toBeInstanceOf(ValidationException);
            });
            and(`error is an instance of ValidationException`, () => {
              then(`error.errors.length is 2`, () => {
                expect(error.errors.length).toBe(2);
              });
              and(`error.errors.length is 2`, () => {
                then(
                  `error.errors[0] is an instance of InvalidArgumentException`,
                  () => {
                    expect(error.errors[0]).toBeInstanceOf(
                      InvalidArgumentException
                    );
                  }
                );
                and(
                  `error.errors[0] is an instance of InvalidArgumentException`,
                  () => {
                    then(
                      `error.errors[0].message is "Invalid argument: id - must be a valid UUID"`,
                      () => {
                        expect(error.errors[0].message).toBe(
                          "Invalid argument: id - must be a valid UUID"
                        );
                      }
                    );
                  }
                );
                then(
                  `error.errors[1] is an instance of InvalidArgumentException`,
                  () => {
                    expect(error.errors[1]).toBeInstanceOf(
                      InvalidArgumentException
                    );
                  }
                );
                and(
                  `error.errors[1] is an instance of InvalidArgumentException`,
                  () => {
                    then(
                      `error.errors[1].message is "Invalid argument: name - must be a valid name"`,
                      () => {
                        expect(error.errors[1].message).toBe(
                          "Invalid argument: name - must be a valid name"
                        );
                      }
                    );
                  }
                );
              });
            });
          });
        }
      );
    });
  });
});

given(`Validate keys ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Validate.keys");
  });
  then(`Validate.keys is defined`, () => {
    expect(Validate.keys).toBeDefined();
  });
  and(`Validate.keys is defined`, () => {
    then(`Validate.keys is a function`, () => {
      expect(Validate.keys).toBeInstanceOf(Function);
    });
    and(`Validate.keys is a function`, () => {
      when(`Validate.keys(keys, rules) is called with valid keys`, () => {
        let keys: string[];
        let rules: ((details: string[]) => unknown)[];
        let result: string[];
        beforeEach(() => {
          keys = ["custom"];
          rules = [
            (keys) => Validate.match(keys, "id"),
            (keys) => Validate.match(keys, "name"),
          ];
          result = Validate.keys(keys, rules);
        });
        then(`Validate.keys returns the keys`, () => {
          expect(result).toBe(keys);
        });
      });
      when(`Validate.keys(keys, rules) is called with invalid keys`, () => {
        let keys: string[];
        let rules: ((details: string[]) => unknown)[];
        let error: ValidationException;
        beforeEach(() => {
          keys = ["id", "name"];
          rules = [
            (keys) => Validate.match(keys, "id"),
            (keys) => Validate.match(keys, "name"),
          ];
          try {
            Validate.keys(keys, rules);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(`error is an instance of ValidationException`, () => {
            expect(error).toBeInstanceOf(ValidationException);
          });
          and(`error is an instance of ValidationException`, () => {
            then(`error.errors.length is 2`, () => {
              expect(error.errors.length).toBe(2);
            });
            and(`error.errors.length is 2`, () => {
              then(
                `error.errors[0] is an instance of ImmutablePropertyException`,
                () => {
                  expect(error.errors[0]).toBeInstanceOf(
                    ImmutablePropertyException
                  );
                }
              );
              and(
                `error.errors[0] is an instance of ImmutablePropertyException`,
                () => {
                  then(
                    `error.errors[0].message is "Property 'id' is immutable."`,
                    () => {
                      expect(error.errors[0].message).toBe(
                        "Property 'id' is immutable."
                      );
                    }
                  );
                }
              );
              then(
                `error.errors[1] is an instance of ImmutablePropertyException`,
                () => {
                  expect(error.errors[1]).toBeInstanceOf(
                    ImmutablePropertyException
                  );
                }
              );
              and(
                `error.errors[1] is an instance of ImmutablePropertyException`,
                () => {
                  then(
                    `error.errors[1].message is "Property 'name' is immutable."`,
                    () => {
                      expect(error.errors[1].message).toBe(
                        "Property 'name' is immutable."
                      );
                    }
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
