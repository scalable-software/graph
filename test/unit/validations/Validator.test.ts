import { Type, Spec } from "../Helper.js";

const given = (description, spec) => describe(`Given ${description}`, spec);
const and = (description, spec) => describe(`and ${description}`, spec);
const when = (description, spec) => describe(`when ${description}`, spec);
const then = (description, spec) => it(`then ${description}`, spec);

import { Validate } from "../../../src/validations/Validate.js";
import { Validator } from "../../../src/validations/Validator.js";

import {
  InvalidArgumentException,
  ValidationException,
} from "../../../src/exceptions/Exceptions.js";

given(`Validator ${Type.CLASS} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`Validator is imported`, () => {
    then(`Validator is defined`, () => {
      expect(Validator).toBeDefined();
    });
  });
});

given(`Validator validate ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Validator.validate");
  });
  then(`Validator.validate is defined`, () => {
    expect(Validator.validate).toBeDefined();
  });
  and(`Validator.validate is defined`, () => {
    then(`Validator.validate is a function`, () => {
      expect(Validator.validate).toBeInstanceOf(Function);
    });
    and(`Validator.validate is a function`, () => {
      when(
        `Validator.validate(entity, validators) is called with valid entity`,
        () => {
          let entity: any;
          let validators: any[];
          let result: any;
          let error: ValidationException;
          beforeEach(() => {
            entity = {
              id: "123e4567-e89b-12d3-a456-426614174000",
              name: "John Doe",
            };
            validators = [
              ({ id }) => Validate.uuid(id),
              ({ name }) => Validate.name(name),
            ];

            try {
              result = Validator.validate(entity, validators);
            } catch (e) {
              error = e;
            }
          });
          then(`result is defined`, () => {
            expect(result).toBeDefined();
          });
          then(`Validator.validate returns the entity`, () => {
            expect(result).toBe(entity);
          });
          then(`error is undefined`, () => {
            expect(error).toBeUndefined();
          });
        }
      );
      when(
        `Validator.validate(entity, validators) is called with invalid entity.id`,
        () => {
          let entity: any;
          let validators: any[];
          let result: any;
          let error: ValidationException;
          beforeEach(() => {
            entity = {
              id: "invalid",
              name: "John Doe",
            };
            validators = [
              ({ id }) => Validate.uuid(id),
              ({ name }) => Validate.name(name),
            ];
            try {
              result = Validator.validate(entity, validators);
            } catch (e) {
              error = e;
            }
          });
          then(`result is undefined`, () => {
            expect(result).toBeUndefined();
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
        `Validate.validate(entity, validators) is called with invalid entity.name`,
        () => {
          let entity: any;
          let validators: any[];
          let result: any;
          let error: ValidationException;
          beforeEach(() => {
            entity = {
              id: "123e4567-e89b-12d3-a456-426614174000",
              name: "J",
            };
            validators = [
              ({ id }) => Validate.uuid(id),
              ({ name }) => Validate.name(name),
            ];
            try {
              result = Validator.validate(entity, validators);
            } catch (e) {
              error = e;
            }
          });
          then(`result is undefined`, () => {
            expect(result).toBeUndefined();
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
        `Validate.validate(entity, validators) is called with invalid entity`,
        () => {
          let entity: any;
          let validators: any[];
          let result: any;
          let error: ValidationException;
          beforeEach(() => {
            entity = {
              id: "invalid",
              name: "J",
            };
            validators = [
              ({ id }) => Validate.uuid(id),
              ({ name }) => Validate.name(name),
            ];
            try {
              result = Validator.validate(entity, validators);
            } catch (e) {
              error = e;
            }
          });
          then(`result is undefined`, () => {
            expect(result).toBeUndefined();
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

given(`Validator compare ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Validator.compare");
  });
  then(`Validator.compare is defined`, () => {
    expect(Validator.compare).toBeDefined();
  });
  and(`Validator.compare is defined`, () => {
    then(`Validator.compare is a function`, () => {
      expect(Validator.compare).toBeInstanceOf(Function);
    });
  });
});
