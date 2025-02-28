import * as help from "./Helper.js";

import { Type, Spec } from "./Helper.js";

const given = (description, spec) => describe(`Given ${description}`, spec);
const and = (description, spec) => describe(`and ${description}`, spec);
const when = (description, spec) => describe(`when ${description}`, spec);
const then = (description, spec) => it(`then ${description}`, spec);

import type { UUID, Name } from "@scalable.software/graph";

import { Metadata, Exception } from "@scalable.software/graph";
import type { IMetadata } from "@scalable.software/graph";

given(`Metadata ${Type.CLASS} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`Metadata is imported`, () => {
    then(`Metadata is defined`, () => {
      expect(Metadata).toBeDefined();
    });
  });
});

given(`Metadata ${Type.CLASS} ${Spec.INSTANTIATION} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.INSTANTIATION);
  });
  when("a metadata instance is created using Metadata.create()", () => {
    let metadata: Metadata;
    beforeEach(() => {
      metadata = Metadata.create();
    });
    then("metadata is defined", () => {
      expect(metadata).toBeDefined();
    });
    and("metadata is defined", () => {
      then("metadata is an instance of Metadata", () => {
        expect(metadata).toBeInstanceOf(Metadata);
      });
    });
  });
  when("a metadata instance is created using Metadata.create(data)", () => {
    let metadata: Metadata;
    let data: IMetadata;

    beforeEach(() => {
      data = { id: "123e4567-e89b-12d3-a456-426614174000", name: "test" };

      metadata = Metadata.create(data);
    });
    then("metadata is defined", () => {
      expect(metadata).toBeDefined();
    });
    and("metadata is defined", () => {
      then("metadata.id is defined", () => {
        expect(metadata.id).toBeDefined();
      });
      and("metadata.id is defined", () => {
        then("metadata.id is data.id", () => {
          expect(metadata.id).toBe(data.id);
        });
      });
      then("metadata.name is defined", () => {
        expect(metadata.name).toBeDefined();
      });
      and("metadata.name is defined", () => {
        then("metadata.name is data.name", () => {
          expect(metadata.name).toBe(data.name);
        });
      });
    });
  });
  when(
    "a metadata instance is created using Metadata.create(data) with custom data",
    () => {
      type CMetadata = { type: string } & IMetadata;
      let metadata: CMetadata;
      let data: CMetadata;
      beforeEach(() => {
        data = {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "test",
          type: "custom",
        };
        metadata = Metadata.create<CMetadata>(data);
      });
      then("metadata is defined", () => {
        expect(metadata).toBeDefined();
      });
      and("metadata is defined", () => {
        then("metadata.id is defined", () => {
          expect(metadata.id).toBeDefined();
        });
        and("metadata.id is defined", () => {
          then("metadata.id is data.id", () => {
            expect(metadata.id).toBe(data.id);
          });
        });
        then("metadata.name is defined", () => {
          expect(metadata.name).toBeDefined();
        });
        and("metadata.name is defined", () => {
          then("metadata.name is data.name", () => {
            expect(metadata.name).toBe(data.name);
          });
        });
        then("metadata.type is defined", () => {
          expect(metadata.type).toBeDefined();
        });
        and("metadata.type is defined", () => {
          then("metadata.type is data.type", () => {
            expect(metadata.type).toBe(data.type);
          });
        });
      });
    }
  );
  when(
    "a metadata instance is created using Metadata.create(data) with invalid data.id",
    () => {
      let data: Partial<IMetadata>;
      let error: Exception.ValidationException;
      beforeEach(() => {
        data = { id: "invalid", name: "test" };
        try {
          Metadata.create(data as IMetadata);
        } catch (e) {
          error = e;
        }
      });
      then("error is defined", () => {
        expect(error).toBeDefined();
      });
      and("error is defined", () => {
        then("error is an instance of Exception.ValidationException", () => {
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
        and("error is an instance of Exception.ValidationException", () => {
          then("error.message is 'Validation failed with 1 error(s).'", () => {
            expect(error.message).toBe("Validation failed with 1 error(s).");
          });
        });
      });
    }
  );
  when(
    "a metadata instance is created using Metadata.create(data) with invalid data.name",
    () => {
      let data: Partial<IMetadata>;
      let error: Exception.ValidationException;
      beforeEach(() => {
        data = { id: "123e4567-e89b-12d3-a456-426614174000", name: "T" };
        try {
          Metadata.create(data as IMetadata);
        } catch (e) {
          error = e;
        }
      });
      then("error is defined", () => {
        expect(error).toBeDefined();
      });
      and("error is defined", () => {
        then("error is an instance of Exception.ValidationException", () => {
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
        and("error is an instance of Exception.ValidationException", () => {
          then("error.message is 'Validation failed with 1 error(s).'", () => {
            expect(error.message).toBe("Validation failed with 1 error(s).");
          });
        });
      });
    }
  );
  when(
    "a metadata instance is created using Metadata.create(data) with invalid data",
    () => {
      let data: Partial<IMetadata>;
      let error: Exception.ValidationException;
      beforeEach(() => {
        data = { id: "invalid", name: "T" };
        try {
          Metadata.create(data as IMetadata);
        } catch (e) {
          error = e;
        }
      });
      then("error is defined", () => {
        expect(error).toBeDefined();
      });
      and("error is defined", () => {
        then("error is an instance of Exception.ValidationException", () => {
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
        and("error is an instance of Exception.ValidationException", () => {
          then("error.message is 'Validation failed with 2 error(s).'", () => {
            expect(error.message).toBe("Validation failed with 2 error(s).");
          });
        });
      });
    }
  );
});

given(`Metadata create ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Metadata.create");
  });
  then("Metadata.create is defined", () => {
    expect(Metadata.create).toBeDefined();
  });
  and("Metadata.create is defined", () => {
    then("Metadata.create is a function", () => {
      expect(Metadata.create).toBeInstanceOf(Function);
    });
    when("Metadata.create() is called", () => {
      let metadata: Metadata;
      beforeEach(() => {
        metadata = Metadata.create();
      });
      then("metadata instance is returned", () => {
        expect(metadata).toBeDefined();
      });
      and("metadata instance is returned", () => {
        then("metadata.id is defined", () => {
          expect(metadata.id).toBeDefined();
        });
        and("metadata.id is defined", () => {
          then("metadata.id is null", () => {
            expect(metadata.id).toBeNull();
          });
        });
        then("metadata.name is defined", () => {
          expect(metadata.name).toBeDefined();
        });
        and("metadata.name is defined", () => {
          then("metadata.name is null", () => {
            expect(metadata.name).toBeNull();
          });
        });
      });
    });
    when("Metadata.create(data) is called", () => {
      let data: IMetadata;
      let metadata: IMetadata;
      beforeEach(() => {
        data = { id: "123e4567-e89b-12d3-a456-426614174000", name: "test" };
        metadata = Metadata.create(data);
      });
      then("metadata instance is returned", () => {
        expect(metadata).toBeDefined();
      });
      and("metadata instance is returned", () => {
        then("metadata.id is defined", () => {
          expect(metadata.id).toBeDefined();
        });
        and("metadata.id is defined", () => {
          then("metadata.id is data.id", () => {
            expect(metadata.id).toBe(data.id);
          });
        });
        then("metadata.name is defined", () => {
          expect(metadata.name).toBeDefined();
        });
        and("metadata.name is defined", () => {
          then("metadata.name is data.name", () => {
            expect(metadata.name).toBe(data.name);
          });
        });
      });
    });
    when("Metadata.create(data) is called with custom data", () => {
      type CMetadata = { type: string } & IMetadata;
      let data: CMetadata;
      let metadata: CMetadata;
      beforeEach(() => {
        data = {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "test",
          type: "custom",
        };
        metadata = Metadata.create<CMetadata>(data);
      });
      then("metadata instance is returned", () => {
        expect(metadata).toBeDefined();
      });
      and("metadata instance is returned", () => {
        then("metadata.id is defined", () => {
          expect(metadata.id).toBeDefined();
        });
        and("metadata.id is defined", () => {
          then("metadata.id is data.id", () => {
            expect(metadata.id).toBe(data.id);
          });
        });
        then("metadata.name is defined", () => {
          expect(metadata.name).toBeDefined();
        });
        and("metadata.name is defined", () => {
          then("metadata.name is data.name", () => {
            expect(metadata.name).toBe(data.name);
          });
        });
        then("metadata.type is defined", () => {
          expect(metadata.type).toBeDefined();
        });
        and("metadata.type is defined", () => {
          then("metadata.type is data.type", () => {
            expect(metadata.type).toBe(data.type);
          });
        });
      });
    });
  });
});

given(`Metadata validate ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Metadata.validate");
  });
  then("Metadata.validate is defined", () => {
    expect(Metadata.validate).toBeDefined();
  });
  and("Metadata.validate is defined", () => {
    then("Metadata.validate is a function", () => {
      expect(Metadata.validate).toBeInstanceOf(Function);
    });
    and("Metadata.validate is a function", () => {
      when("Metadata.validate(data) is called with valid data", () => {
        let data: IMetadata;
        let result: any;
        beforeEach(() => {
          data = { id: "123e4567-e89b-12d3-a456-426614174000", name: "test" };
          result = Metadata.validate(data);
        });
        then("data is returned", () => {
          expect(result).toBe(data);
        });
      });
      when("Metadata.validate(data) is called with invalid data", () => {
        let data: Partial<IMetadata>;
        let result: any;
        let error: Exception.ValidationException;
        beforeEach(() => {
          data = { id: "invalid", name: "T" };
          try {
            result = Metadata.validate(data as IMetadata);
          } catch (e) {
            error = e;
          }
        });
        then("error is defined", () => {
          expect(error).toBeDefined();
        });
        and("error is defined", () => {
          then("error is an instance of Exception.ValidationException", () => {
            expect(error).toBeInstanceOf(Exception.ValidationException);
          });
          and("error is an instance of Exception.ValidationException", () => {
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
              then(
                "error.errors[0] is an Exception.InvalidArgumentException",
                () => {
                  expect(error.errors[0]).toBeInstanceOf(
                    Exception.InvalidArgumentException
                  );
                }
              );
              and(
                "error.errors[0] is an Exception.InvalidArgumentException",
                () => {
                  then(
                    "error.errors[0].message is 'Invalid argument: id - must be a valid UUID'",
                    () => {
                      expect(error.errors[0].message).toBe(
                        "Invalid argument: id - must be a valid UUID"
                      );
                    }
                  );
                }
              );
              then(
                "error.errors[1] is an Exception.InvalidArgumentException",
                () => {
                  expect(error.errors[1]).toBeInstanceOf(
                    Exception.InvalidArgumentException
                  );
                }
              );
              and(
                "error.errors[1] is an Exception.InvalidArgumentException",
                () => {
                  then(
                    "error.errors[1].message is 'Invalid argument: name - must be a valid name'",
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
      });
      when("Metadata.validate(data) is called with invalid data.id", () => {
        let data: Partial<IMetadata>;
        let result: any;
        let error: Exception.ValidationException;
        beforeEach(() => {
          data = { id: "invalid", name: "test" };
          try {
            result = Metadata.validate(data as IMetadata);
          } catch (e) {
            error = e;
          }
        });
        then("error is defined", () => {
          expect(error).toBeDefined();
        });
        and("error is defined", () => {
          then("error is an instance of Exception.ValidationException", () => {
            expect(error).toBeInstanceOf(Exception.ValidationException);
          });
          and("error is an instance of Exception.ValidationException", () => {
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
              then(
                "error.errors[0] is an Exception.InvalidArgumentException",
                () => {
                  expect(error.errors[0]).toBeInstanceOf(
                    Exception.InvalidArgumentException
                  );
                }
              );
              and(
                "error.errors[0] is an Exception.InvalidArgumentException",
                () => {
                  then(
                    "error.errors[0].message is 'Invalid argument: id - must be a valid UUID'",
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
      });
      when("Metadata.validate(data) is called with invalid data.name", () => {
        let data: Partial<IMetadata>;
        let result: any;
        let error: Exception.ValidationException;
        beforeEach(() => {
          data = { id: "123e4567-e89b-12d3-a456-426614174000", name: "T" };
          try {
            result = Metadata.validate(data as IMetadata);
          } catch (e) {
            error = e;
          }
        });
        then("error is defined", () => {
          expect(error).toBeDefined();
        });
        and("error is defined", () => {
          then("error is an instance of Exception.ValidationException", () => {
            expect(error).toBeInstanceOf(Exception.ValidationException);
          });
          and("error is an instance of Exception.ValidationException", () => {
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
              then(
                "error.errors[0] is an Exception.InvalidArgumentException",
                () => {
                  expect(error.errors[0]).toBeInstanceOf(
                    Exception.InvalidArgumentException
                  );
                }
              );
              and(
                "error.errors[0] is an Exception.InvalidArgumentException",
                () => {
                  then(
                    "error.errors[0].message is 'Invalid argument: name - must be a valid name'",
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
      });
      when("Metadata.validate() is called without arguments", () => {
        let result: any;
        beforeEach(() => {
          result = Metadata.validate();
        });
        then("null is returned", () => {
          expect(result).toBeNull();
        });
      });
    });
  });
});

given(`Metadata id ${Type.GETTER} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.GETTER);
    setSpecProperty("spec", "id");
  });
  when(
    "a metadata instance is created using Metadata.create(data) with valid data",
    () => {
      let metadata: Metadata;
      let data: IMetadata;
      beforeEach(() => {
        data = { id: "123e4567-e89b-12d3-a456-426614174000", name: "test" };
        metadata = Metadata.create(data);
      });
      then("metadata.id is defined", () => {
        expect(metadata.id).toBeDefined();
      });
      and("metadata.id is defined", () => {
        then("metadata.id is data.id", () => {
          expect(metadata.id).toBe(data.id);
        });
      });
    }
  );
});

given(`Metadata id ${Type.SETTER} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.SETTER);
    setSpecProperty("spec", "id");
  });
  when("a metadata instance is created", () => {
    let metadata: Metadata;
    beforeEach(() => {
      metadata = Metadata.create();
    });
    then("metadata.id is defined", () => {
      expect(metadata.id).toBeDefined();
    });
    and("metadata.id is defined", () => {
      then("metadata.id is null", () => {
        expect(metadata.id).toBeNull();
      });
    });
  });
  and("a metadata instance is created", () => {
    let metadata: Metadata;
    beforeEach(() => {
      metadata = Metadata.create();
    });
    then("metadata.id setter is defined", () => {
      expect(help.hasSetter(metadata, "id")).toBeTruthy();
    });
    and("metadata.id setter is defined", () => {
      when("metadata.id is set to valid id", () => {
        let id: UUID;
        beforeEach(() => {
          id = "123e4567-e89b-12d3-a456-426614174000";
          metadata.id = id;
        });
        then("metadata.id is set to id", () => {
          expect(metadata.id).toBe(id);
        });
      });
    });
  });
});

given(`Metadata name ${Type.PROPERTY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.PROPERTY);
    setSpecProperty("spec", "name");
  });
  when("a metadata instance is created", () => {
    let metadata: Metadata;
    beforeEach(() => {
      metadata = Metadata.create();
    });
    then("metadata.name is defined", () => {
      expect(metadata.name).toBeDefined();
    });
    and("metadata.name is defined", () => {
      then("metadata.name is null", () => {
        expect(metadata.name).toBeNull();
      });
    });
  });
});
