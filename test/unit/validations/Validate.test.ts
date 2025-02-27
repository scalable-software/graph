import * as help from "../Helper.js";

import { Type, Spec } from "../Helper.js";

const given = (description, spec) => describe(`Given ${description}`, spec);
const and = (description, spec) => describe(`and ${description}`, spec);
const when = (description, spec) => describe(`when ${description}`, spec);
const then = (description, spec) => it(`then ${description}`, spec);

import { Validate } from "../../../src/validations/Validate.js";
import {
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
  });
});
