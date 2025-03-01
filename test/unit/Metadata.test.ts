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
        let error: Exception.ImmutablePropertyException;
        beforeEach(() => {
          id = "123e4567-e89b-12d3-a456-426614174000";
          try {
            metadata.id = id;
          } catch (e) {
            error = e;
          }
        });
        then("error is defined", () => {
          expect(error).toBeDefined();
        });
        and("error is defined", () => {
          then(
            "error is an instance of Exception.ImmutablePropertyException",
            () => {
              expect(error).toBeInstanceOf(
                Exception.ImmutablePropertyException
              );
            }
          );
          and(
            "error is an instance of Exception.ImmutablePropertyException",
            () => {
              then("error.message is 'Property 'id' is immutable.'", () => {
                expect(error.message).toBe("Property 'id' is immutable.");
              });
            }
          );
        });
      });
    });
  });
});

given(`Metadata name ${Type.GETTER} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.GETTER);
    setSpecProperty("spec", "name");
  });
  when("a metadata instance is created", () => {
    let metadata: Metadata;
    let data: IMetadata;
    beforeEach(() => {
      data = { id: "123e4567-e89b-12d3-a456-426614174000", name: "test" };
      metadata = Metadata.create(data);
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

given(`Metadata name ${Type.SETTER} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.SETTER);
    setSpecProperty("spec", "id");
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
  and("a metadata instance is created", () => {
    let metadata: Metadata;
    beforeEach(() => {
      metadata = Metadata.create();
    });
    then("metadata.name setter is defined", () => {
      expect(help.hasSetter(metadata, "name")).toBeTruthy();
    });
    and("metadata.name setter is defined", () => {
      when("metadata.name is set to valid name", () => {
        let name: Name;
        beforeEach(() => {
          name = "test";
          metadata.name = name;
        });
        then("metadata.name is name", () => {
          expect(metadata.name).toBe(name);
        });
      });
      when("metadata.name is set to invalid name", () => {
        let name: Name;
        let error: Exception.InvalidArgumentException;
        beforeEach(() => {
          name = "T";
          try {
            metadata.name = name;
          } catch (e) {
            error = e;
          }
        });
        then("error is defined", () => {
          expect(error).toBeDefined();
        });
        and("error is defined", () => {
          then(
            "error is an instance of Exception.InvalidArgumentException",
            () => {
              expect(error).toBeInstanceOf(Exception.InvalidArgumentException);
            }
          );
          and(
            "error is an instance of Exception.InvalidArgumentException",
            () => {
              then(
                "error.message is 'Invalid argument: name - must be a valid name'",
                () => {
                  expect(error.message).toBe(
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
});

given(`Metadata assigned ${Type.GETTER} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.GETTER);
    setSpecProperty("spec", "assigned");
  });
  when("a metadata instance is created with data", () => {
    let metadata: Metadata;
    let data: IMetadata;
    beforeEach(() => {
      data = { id: "123e4567-e89b-12d3-a456-426614174000", name: "test" };
      metadata = Metadata.create(data);
    });
    then("metadata.assigned is defined", () => {
      expect(metadata.assigned).toBeDefined();
    });
    and("metadata.assigned is defined", () => {
      then("metadata.assigned is true", () => {
        expect(metadata.assigned).toBe(true);
      });
    });
  });
  when("a metadata instance is created without data", () => {
    let metadata: Metadata;
    beforeEach(() => {
      metadata = Metadata.create();
    });
    then("metadata.assigned is defined", () => {
      expect(metadata.assigned).toBeDefined();
    });
    and("metadata.assigned is defined", () => {
      then("metadata.assigned is false", () => {
        expect(metadata.assigned).toBe(false);
      });
    });
  });
});

given(`Metadata customProperties ${Type.GETTER} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.GETTER);
    setSpecProperty("spec", "properties");
  });
  when("a metadata instance is created with data", () => {
    type T = { custom: string } & IMetadata;
    let metadata: Metadata<T> & T;
    let data: T;
    beforeEach(() => {
      data = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "test",
        custom: "custom",
      };
      metadata = Metadata.create(data);
    });
    then("metadata.customProperties is defined", () => {
      expect(metadata.customProperties).toBeDefined();
    });
    and("metadata.customProperties is defined", () => {
      then("metadata.customProperties is an object", () => {
        expect(metadata.customProperties).toBeInstanceOf(Object);
      });
      and("metadata.customProperties is an object", () => {
        then("metadata.customProperties has custom properties", () => {
          expect(metadata.customProperties).toEqual({ custom: "custom" });
        });
      });
    });
  });
});

given(`Metadata add ${Type.METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.METHOD);
    setSpecProperty("spec", "add");
  });
  when("a metadata instance is created", () => {
    type T = { custom: string } & IMetadata;
    let metadata: Metadata<T> & T;
    beforeEach(() => {
      metadata = Metadata.create();
    });
    then("metadata.add is defined", () => {
      expect(metadata.add).toBeDefined();
    });
    and("metadata.add is defined", () => {
      then("metadata.add is a function", () => {
        expect(metadata.add).toBeInstanceOf(Function);
      });
    });
    when("metadata.add(data) is called with valid data", () => {
      let data: T;
      beforeEach(() => {
        data = {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "test",
          custom: "custom",
        };
        metadata.add(data);
      });
      then("metadata.id is data.id", () => {
        expect(metadata.id).toBe(data.id);
      });
      then("metadata.name is data.name", () => {
        expect(metadata.name).toBe(data.name);
      });
      then("metadata.custom is data.custom", () => {
        expect(metadata.custom).toBe(data.custom);
      });
    });
    when("metadata.add(data) is called with no id", () => {
      let data: Omit<T, "id">;
      beforeEach(() => {
        data = {
          name: "test",
          custom: "custom",
        };
        metadata.add(data as T);
      });
      then("metadata.id is defined", () => {
        expect(metadata.id).toBeDefined();
      });
    });
  });
  when("a metadata instance is created with data", () => {
    type T = { custom: string } & IMetadata;
    let metadata: Metadata<T> & T;
    let data: T;
    beforeEach(() => {
      data = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "test",
        custom: "custom",
      };
      metadata = Metadata.create(data);
    });
    then("metadata.add is defined", () => {
      expect(metadata.add).toBeDefined();
    });
    and("metadata.add is defined", () => {
      then("metadata.add is a function", () => {
        expect(metadata.add).toBeInstanceOf(Function);
      });
    });
    when("metadata.add(data) is called with valid data", () => {
      let data: T;
      let error: Exception.AssignedException;
      beforeEach(() => {
        data = {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "test",
          custom: "custom",
        };
        try {
          metadata.add(data);
        } catch (e) {
          error = e;
        }
      });
      then("error is defined", () => {
        expect(error).toBeDefined();
      });
      and("error is defined", () => {
        then("error is an instance of Exception.AssignedException", () => {
          expect(error).toBeInstanceOf(Exception.AssignedException);
        });
        and("error is an instance of Exception.AssignedException", () => {
          then(
            "error.message is 'A value has already been assigned to Metadata: id'",
            () => {
              expect(error.message).toBe(
                "A value has already been assigned to metadata: Use metadata.update(metadata) instead."
              );
            }
          );
        });
      });
    });
  });
});

given(`Metadata update ${Type.METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.METHOD);
    setSpecProperty("spec", "update");
  });
  when("a metadata instance is created", () => {
    type T = { custom: string } & IMetadata;
    let metadata: Metadata<T> & T;
    beforeEach(() => {
      metadata = Metadata.create();
    });
    then("metadata.update is defined", () => {
      expect(metadata.update).toBeDefined();
    });
    and("metadata.update is defined", () => {
      then("metadata.update is a function", () => {
        expect(metadata.update).toBeInstanceOf(Function);
      });
      and("metadata.update is a function", () => {
        when("metadata.update(data) is called with valid data", () => {
          let data: T;
          let error: Exception.UnassignedException;
          beforeEach(() => {
            data = {
              id: "123e4567-e89b-12d3-a456-426614174000",
              name: "test",
              custom: "custom",
            };
            try {
              metadata.update(data);
            } catch (e) {
              error = e;
            }
          });
          then("error is defined", () => {
            expect(error).toBeDefined();
          });
          and("error is defined", () => {
            then(
              "error is an instance of Exception.UnassignedException",
              () => {
                expect(error).toBeInstanceOf(Exception.UnassignedException);
              }
            );
            and("error is an instance of Exception.UnassignedException", () => {
              then(
                "error.message is 'No value has been assigned to metadata: Use metadata.add(metadata) instead.'",
                () => {
                  expect(error.message).toBe(
                    "No value has been assigned to metadata: Use metadata.add(metadata) instead."
                  );
                }
              );
            });
          });
        });
      });
    });
  });
  when("a metadata instance is created with data", () => {
    type T = { custom: string } & IMetadata;
    let metadata: Metadata<T> & T;
    let data: T;
    beforeEach(() => {
      data = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "test",
        custom: "custom",
      };
      metadata = Metadata.create(data);
    });
    then("metadata.update is defined", () => {
      expect(metadata.update).toBeDefined();
    });
    and("metadata.update is defined", () => {
      then("metadata.update is a function", () => {
        expect(metadata.update).toBeInstanceOf(Function);
      });
      and("metadata.update is a function", () => {
        when("metadata.update(data) is called with valid data", () => {
          let data: T;
          beforeEach(() => {
            data = {
              id: "123e4567-e89b-12d3-a456-426614174000",
              name: "test",
              custom: "custom",
            };
            metadata.update(data);
          });
          then("metadata.id is data.id", () => {
            expect(metadata.id).toBe(data.id);
          });
          then("metadata.name is data.name", () => {
            expect(metadata.name).toBe(data.name);
          });
          then("metadata.custom is data.custom", () => {
            expect(metadata.custom).toBe(data.custom);
          });
        });
        when(
          "metadata.update(data) is called with data with different identifier",
          () => {
            let data: T;
            let error: Exception.MissMatchException;
            beforeEach(() => {
              data = {
                id: "123e4567-e89b-12d3-a456-426614174111",
                name: "test",
                custom: "custom",
              };
              try {
                metadata.update(data);
              } catch (e) {
                error = e;
              }
            });
            then("error is defined", () => {
              expect(error).toBeDefined();
            });
            and("error is defined", () => {
              then(
                "error is an instance of Exception.MissMatchException",
                () => {
                  expect(error).toBeInstanceOf(Exception.MissMatchException);
                }
              );
              and(
                "error is an instance of Exception.MissMatchException",
                () => {
                  then(
                    "error.message is 'Metadata identifier does not match: Use metadata.add(metadata) instead.'",
                    () => {
                      expect(error.message).toBe(
                        "identifier does not match: get metadata.id and verify match."
                      );
                    }
                  );
                }
              );
            });
          }
        );
      });
    });
  });
});

given(`Metadata remove ${Type.METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.METHOD);
    setSpecProperty("spec", "remove");
  });
  when("a metadata instance is created with data", () => {
    type T = { custom: string } & IMetadata;
    let metadata: Metadata<T> & T;
    let data: T;
    beforeEach(() => {
      data = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "test",
        custom: "custom",
      };
      metadata = Metadata.create(data);
    });
    then("metadata.remove is defined", () => {
      expect(metadata.remove).toBeDefined();
    });
    and("metadata.remove is defined", () => {
      then("metadata.remove is a function", () => {
        expect(metadata.remove).toBeInstanceOf(Function);
      });
      when("metadata.remove() is called", () => {
        beforeEach(() => {
          metadata.remove();
        });
        then("metadata.id is null", () => {
          expect(metadata.id).toBeNull();
        });
        then("metadata.name is null", () => {
          expect(metadata.name).toBeNull();
        });
        then("metadata.custom is undefined", () => {
          expect(metadata.custom).toBeUndefined();
        });
      });
      when("metadata.remove(['custom']) is called", () => {
        let key: keyof Metadata<T> & T;
        beforeEach(() => {
          key = "custom" as keyof Metadata<T> & T;
          metadata.remove([key]);
        });
        then("metadata.id is data.id", () => {
          expect(metadata.id).toBe(data.id);
        });
        then("metadata.name is data.name", () => {
          expect(metadata.name).toBe(data.name);
        });
        then("metadata.custom is undefined", () => {
          expect(metadata.custom).toBeUndefined();
        });
      });
      when("metadata.remove(['id']) is called", () => {
        let key: keyof (Metadata<T> & T);
        let error: Exception.ValidationException;
        beforeEach(() => {
          try {
            key = "id" as keyof (Metadata<T> & T);
            metadata.remove([key]);
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
            then("error.length is 1", () => {
              expect(error.errors.length).toBe(1);
            });
            and("error.length is 1", () => {
              then(
                "error.errors[0] is an Exception.ImmutablePropertyException",
                () => {
                  expect(error.errors[0]).toBeInstanceOf(
                    Exception.ImmutablePropertyException
                  );
                }
              );
              and(
                "error.errors[0] is an Exception.ImmutablePropertyException",
                () => {
                  then(
                    "error.errors[0].message is 'Property 'id' is immutable.'",
                    () => {
                      expect(error.errors[0].message).toBe(
                        "Property 'id' is immutable."
                      );
                    }
                  );
                }
              );
            });
          });
        });
      });
      when("metadata.remove(['name']) is called", () => {
        let key: keyof (Metadata<T> & T);
        let error: Exception.ValidationException;
        beforeEach(() => {
          try {
            key = "name" as keyof (Metadata<T> & T);
            metadata.remove([key]);
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
            then("error.length is 1", () => {
              expect(error.errors.length).toBe(1);
            });
            and("error.length is 1", () => {
              then(
                "error.errors[0] is an Exception.ImmutablePropertyException",
                () => {
                  expect(error.errors[0]).toBeInstanceOf(
                    Exception.ImmutablePropertyException
                  );
                }
              );
              and(
                "error.errors[0] is an Exception.ImmutablePropertyException",
                () => {
                  then(
                    "error.errors[0].message is 'Property 'name' is immutable.'",
                    () => {
                      expect(error.errors[0].message).toBe(
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
      when("metadata.remove(['id', 'name']) is called", () => {
        let keys: Array<keyof (Metadata<T> & T)>;
        let error: Exception.ValidationException;
        beforeEach(() => {
          try {
            keys = ["id", "name"];
            metadata.remove(keys);
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
            then("error.length is 2", () => {
              expect(error.errors.length).toBe(2);
            });
            and("error.length is 2", () => {
              then(
                "error.errors[0] is an Exception.ImmutablePropertyException",
                () => {
                  expect(error.errors[0]).toBeInstanceOf(
                    Exception.ImmutablePropertyException
                  );
                }
              );
              and(
                "error.errors[0] is an Exception.ImmutablePropertyException",
                () => {
                  then(
                    "error.errors[0].message is 'Property 'id' is immutable.'",
                    () => {
                      expect(error.errors[0].message).toBe(
                        "Property 'id' is immutable."
                      );
                    }
                  );
                }
              );
              then(
                "error.errors[1] is an Exception.ImmutablePropertyException",
                () => {
                  expect(error.errors[1]).toBeInstanceOf(
                    Exception.ImmutablePropertyException
                  );
                }
              );
              and(
                "error.errors[1] is an Exception.ImmutablePropertyException",
                () => {
                  then(
                    "error.errors[1].message is 'Property 'name' is immutable.'",
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

given(`Metadata toJSON ${Type.METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.METHOD);
    setSpecProperty("spec", "toJSON");
  });
  when("a metadata instance is created with data", () => {
    type T = { custom: string } & IMetadata;
    let metadata: Metadata<T> & T;
    let data: T;
    let json: any;
    beforeEach(() => {
      data = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "test",
        custom: "custom",
      };
      metadata = Metadata.create(data);
      json = metadata.toJSON();
    });
    then("metadata.toJSON() is defined", () => {
      expect(metadata.toJSON).toBeDefined();
    });
    and("metadata.toJSON() is defined", () => {
      then("metadata.toJSON() is a function", () => {
        expect(metadata.toJSON).toBeInstanceOf(Function);
      });
      and("metadata.toJSON() is a function", () => {
        then("metadata.toJSON() returns an object", () => {
          expect(json).toBeInstanceOf(Object);
        });
        and("metadata.toJSON() returns an object", () => {
          then("metadata.toJSON() returns data", () => {
            expect(json).toEqual(data);
          });
        });
      });
    });
  });
});

given(`Metadata workflow test`, () => {
  when("a metadata instance is created without data", () => {
    type T = { custom?: string; type?: string } & IMetadata;
    let metadata: Metadata<T> & T;
    beforeEach(() => {
      metadata = Metadata.create();
    });
    then("metadata is defined", () => {
      expect(metadata).toBeDefined();
    });
    and("metadata is defined", () => {
      then("metadata.id is null", () => {
        expect(metadata.id).toBeNull();
      });
      then("metadata.name is null", () => {
        expect(metadata.name).toBeNull();
      });
      then("metadata.custom is undefined", () => {
        expect(metadata.custom).toBeUndefined();
      });
    });
    and("metadata.add(data) is called with valid data", () => {
      let data: T;
      beforeEach(() => {
        data = {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "test",
        };
        metadata.add(data);
      });
      then("metadata.id is data.id", () => {
        expect(metadata.id).toBe(data.id);
      });
      then("metadata.name is data.name", () => {
        expect(metadata.name).toBe(data.name);
      });
      then("metadata.custom is undefined", () => {
        expect(metadata.custom).toBeUndefined();
      });
      then("metadata.type is undefined", () => {
        expect(metadata.type).toBeUndefined();
      });
      and("metadata.update(data) is called with custom data", () => {
        let data: T;
        beforeEach(() => {
          data = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "test",
            custom: "custom",
          };
          metadata.update(data);
        });
        then("metadata.id is data.id", () => {
          expect(metadata.id).toBe(data.id);
        });
        then("metadata.name is data.name", () => {
          expect(metadata.name).toBe(data.name);
        });
        then("metadata.custom is data.custom", () => {
          expect(metadata.custom).toBe(data.custom);
        });
        and("metadata.remove(keys) is called", () => {
          let key: keyof (Metadata<T> & T);
          beforeEach(() => {
            key = "custom" as keyof (Metadata<T> & T);
            metadata.remove([key]);
          });
          then("metadata.id is data.id", () => {
            expect(metadata.id).toBe(data.id);
          });
          then("metadata.name is data.name", () => {
            expect(metadata.name).toBe(data.name);
          });
          then("metadata.custom is undefined", () => {
            expect(metadata.custom).toBeUndefined();
          });
          and("metadata.update(data) is called with type data", () => {
            let data: T;
            beforeEach(() => {
              data = {
                id: "123e4567-e89b-12d3-a456-426614174000",
                name: "test",
                type: "type",
              };
              metadata.update(data);
            });
            then("metadata.id is data.id", () => {
              expect(metadata.id).toBe(data.id);
            });
            then("metadata.name is data.name", () => {
              expect(metadata.name).toBe(data.name);
            });
            then("metadata.custom is undefined", () => {
              expect(metadata.custom).toBeUndefined();
            });
            then("metadata.type is data.type", () => {
              expect(metadata.type).toBe(data.type);
            });
          });
        });
      });
    });
  });
});
