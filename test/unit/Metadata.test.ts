import { Metadata, Exception } from "@scalable.software/graph";
import type { UUID, Name, IMetadata } from "@scalable.software/graph";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

given(`Metadata class availability test`, () => {
  and(`Metadata is imported`, () => {
    then(`Metadata is defined`, () => {
      expect(Metadata).toBeDefined();
    });
  });
});

given(`Metadata.create static method test`, () => {
  then("Metadata.create is defined", () => {
    expect(Metadata.create).toBeDefined();
  });
  and("Metadata.create is defined", () => {
    then("Metadata.create is a function", () => {
      expect(Metadata.create).toBeInstanceOf(Function);
    });
  });
});

given(`Metadata.create static method behavior test`, () => {
  when("an instance is created using Metadata.create", () => {
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
      then("metadata.id is a generated UUID", () => {
        expect(metadata.id).toMatch(UUID_PATTERN);
      });
      then("metadata.name is null", () => {
        expect(metadata.name).toBeNull();
      });
    });
  });
  when("two instances are created using Metadata.create", () => {
    let first: Metadata;
    let second: Metadata;
    beforeEach(() => {
      first = Metadata.create();
      second = Metadata.create();
    });
    then("first.id is not second.id", () => {
      expect(first.id).not.toBe(second.id);
    });
  });
  when(
    "an instance is created using Metadata.create and data with no id",
    () => {
      let data: Omit<IMetadata, "id">;
      let metadata: Metadata;
      beforeEach(() => {
        data = { name: "test" };

        metadata = Metadata.create(data as IMetadata);
      });
      then("metadata.id is a generated UUID", () => {
        expect(metadata.id).toMatch(UUID_PATTERN);
      });
      then("metadata.name is data.name", () => {
        expect(metadata.name).toBe(data.name);
      });
    }
  );
  when(
    "an instance is created using Metadata.create and data with id null",
    () => {
      let data: IMetadata;
      let metadata: Metadata;
      beforeEach(() => {
        data = { id: null, name: "test" };

        metadata = Metadata.create(data);
      });
      then("metadata.id is a generated UUID", () => {
        expect(metadata.id).toMatch(UUID_PATTERN);
      });
      then("metadata.name is data.name", () => {
        expect(metadata.name).toBe(data.name);
      });
    }
  );
  when("an instance is created using Metadata.create and data", () => {
    let data: IMetadata;
    let metadata: Metadata;
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
  when("an instance is created using Metadata.create and custom data", () => {
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
  });
  when(
    "an instance is created using Metadata.create and invalid data.id",
    () => {
      let data: Partial<IMetadata>;
      let error: Exception.Exception;
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
        then("error is an instance of ValidationException", () => {
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
        and("error is an instance of ValidationException", () => {
          then("error.message is 'Validation failed with 1 error(s).'", () => {
            expect(error.message).toBe("Validation failed with 1 error(s).");
          });
        });
      });
    }
  );
  when(
    "an instance is created using Metadata.create and invalid data.name",
    () => {
      let data: Partial<IMetadata>;
      let error: Exception.Exception;
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
        then("error is an instance of ValidationException", () => {
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
        and("error is an instance of ValidationException", () => {
          then("error.message is 'Validation failed with 1 error(s).'", () => {
            expect(error.message).toBe("Validation failed with 1 error(s).");
          });
        });
      });
    }
  );
  when("an instance is created using Metadata.create and invalid data", () => {
    let data: Partial<IMetadata>;
    let error: Exception.Exception;
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
      then("error is an instance of ValidationException", () => {
        expect(error).toBeInstanceOf(Exception.ValidationException);
      });
      and("error is an instance of ValidationException", () => {
        then("error.message is 'Validation failed with 2 error(s).'", () => {
          expect(error.message).toBe("Validation failed with 2 error(s).");
        });
      });
    });
  });
});

given(`Metadata.id getter availability test`, () => {
  and(`a metadata instance is created`, () => {
    let metadata: Metadata;
    beforeEach(() => {
      metadata = Metadata.create();
    });
    then(`metadata.id is defined`, () => {
      expect(metadata.id).toBeDefined();
    });
  });
});

given(`Metadata.id getter behavior test`, () => {
  when("a metadata instance is created with valid data", () => {
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
  });
});

given(`Metadata.id setter availability test`, () => {
  and("a metadata instance is created", () => {
    let metadata: Metadata;
    beforeEach(() => {
      metadata = Metadata.create();
    });
    then("metadata.id setter is defined", () => {
      expect(hasSetter(metadata, "id")).toBeTruthy();
    });
  });
});

given(`Metadata.id setter behavior test`, () => {
  and("a metadata instance is created", () => {
    let metadata: Metadata;
    beforeEach(() => {
      metadata = Metadata.create();
    });
    when("metadata.id is set to valid id", () => {
      let id: UUID;
      let error: Exception.Exception;
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
        then("error is an instance of ImmutablePropertyException", () => {
          expect(error).toBeInstanceOf(Exception.ImmutablePropertyException);
        });
      });
    });
  });
});

given(`Metadata.name getter availability test`, () => {
  and("a metadata instance is created", () => {
    let metadata: Metadata;
    beforeEach(() => {
      metadata = Metadata.create();
    });
    then("metadata.name is defined", () => {
      expect(metadata.name).toBeDefined();
    });
  });
});

given(`Metadata.name getter behavior test`, () => {
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

given(`Metadata.name setter availability test`, () => {
  and("a metadata instance is created", () => {
    let metadata: Metadata;
    beforeEach(() => {
      metadata = Metadata.create();
    });
    then("metadata.name setter is defined", () => {
      expect(hasSetter(metadata, "name")).toBeTruthy();
    });
  });
});

given(`Metadata.name setter behavior test`, () => {
  and("a metadata instance is created", () => {
    let metadata: Metadata;
    beforeEach(() => {
      metadata = Metadata.create();
    });
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
      let error: Exception.Exception;
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
        then("error is an instance of InvalidArgumentException", () => {
          expect(error).toBeInstanceOf(Exception.InvalidArgumentException);
        });
      });
    });
  });
});

given(`Metadata.assigned getter availability test`, () => {
  and("a metadata instance is created", () => {
    let metadata: Metadata;
    beforeEach(() => {
      metadata = Metadata.create();
    });
    then("metadata.assigned is defined", () => {
      expect(metadata.assigned).toBeDefined();
    });
  });
});

given(`Metadata.assigned getter behavior test`, () => {
  when("a metadata instance is created with data", () => {
    let metadata: Metadata;
    let data: IMetadata;
    beforeEach(() => {
      data = { id: "123e4567-e89b-12d3-a456-426614174000", name: "test" };
      metadata = Metadata.create(data);
    });
    then("metadata.assigned is true", () => {
      expect(metadata.assigned).toBe(true);
    });
  });
  when("a metadata instance is created without data", () => {
    let metadata: Metadata;
    beforeEach(() => {
      metadata = Metadata.create();
    });
    then("metadata.assigned is false", () => {
      expect(metadata.assigned).toBe(false);
    });
  });
});

given(`Metadata.properties getter availability test`, () => {
  and("a metadata instance is created", () => {
    let metadata: Metadata;
    beforeEach(() => {
      metadata = Metadata.create();
    });
    then("metadata.properties is defined", () => {
      expect(metadata.properties).toBeDefined();
    });
  });
});

given(`Metadata.properties getter behavior test`, () => {
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
    then("metadata.properties is defined", () => {
      expect(metadata.properties).toBeDefined();
    });
    and("metadata.properties is defined", () => {
      then("metadata.properties is an object", () => {
        expect(metadata.properties).toBeInstanceOf(Object);
      });
      and("metadata.properties is an object", () => {
        then("metadata.properties has custom properties", () => {
          expect(metadata.properties).toEqual({ custom: "custom" });
        });
      });
    });
  });
});

given(`Metadata.add method availability test`, () => {
  and("a metadata instance is created", () => {
    let metadata: Metadata;
    beforeEach(() => {
      metadata = Metadata.create();
    });
    then("metadata.add is defined", () => {
      expect(metadata.add).toBeDefined();
    });
  });
});

given(`Metadata.add method behavior test`, () => {
  and("a metadata instance is created", () => {
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
    when("metadata.add is called with valid data", () => {
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
    when("metadata.add is called with no id", () => {
      let data: Omit<T, "id">;
      let id: UUID | null;
      beforeEach(() => {
        id = metadata.id;
        data = {
          name: "test",
          custom: "custom",
        };
        metadata.add(data as T);
      });
      then("metadata.id is defined", () => {
        expect(metadata.id).toBeDefined();
      });
      then("metadata.id is the id generated when metadata was created", () => {
        expect(metadata.id).toBe(id);
      });
    });
    when("metadata.add is called with id null", () => {
      let data: T;
      let id: UUID | null;
      beforeEach(() => {
        id = metadata.id;
        data = {
          id: null,
          name: "test",
          custom: "custom",
        };
        metadata.add(data);
      });
      then("metadata.id is the id generated when metadata was created", () => {
        expect(metadata.id).toBe(id);
      });
    });
    when("metadata.add is called with invalid id", () => {
      let error: Exception.Exception;
      let id: UUID | null;
      beforeEach(() => {
        id = metadata.id;
        try {
          metadata.add({ id: "invalid", name: "test", custom: "custom" });
        } catch (e) {
          error = e;
        }
      });
      then("error is an instance of ValidationException", () => {
        expect(error).toBeInstanceOf(Exception.ValidationException);
      });
      then("metadata.id is the id generated when metadata was created", () => {
        expect(metadata.id).toBe(id);
      });
    });
  });
  and("a metadata instance is created with data", () => {
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
    when("metadata.add is called with valid data", () => {
      let data: T;
      let error: Exception.Exception;
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
        then("error is an instance of AssignedException", () => {
          expect(error).toBeInstanceOf(Exception.AssignedException);
        });
      });
    });
  });
});

given(`Metadata.update method availability test`, () => {
  and("a metadata instance is created", () => {
    let metadata: Metadata;
    beforeEach(() => {
      metadata = Metadata.create();
    });
    then("metadata.update is defined", () => {
      expect(metadata.update).toBeDefined();
    });
  });
});

given(`Metadata.update method behavior test`, () => {
  and("a metadata instance is created", () => {
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
        when("metadata.update is called with valid data", () => {
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
  and("a metadata instance is created with data", () => {
    type T = { custom: string } & IMetadata;
    let metadata: Metadata<T> & T;
    let data: T;
    let id: UUID;
    beforeEach(() => {
      id = "123e4567-e89b-12d3-a456-426614174000";
      data = {
        id,
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
        when("metadata.update is called with valid data", () => {
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
        when("metadata.update is called with data with no id", () => {
          let data: Omit<T, "id">;
          beforeEach(() => {
            data = {
              name: "test",
              custom: "custom",
            };
            metadata.update(data);
          });
          then("metadata.id is id", () => {
            expect(metadata.id).toBe(id);
          });
          then("metadata.name is data.name", () => {
            expect(metadata.name).toBe(data.name);
          });
          then("metadata.custom is data.custom", () => {
            expect(metadata.custom).toBe(data.custom);
          });
        });
        when(
          "metadata.update is called with data with different identifier",
          () => {
            let data: T;
            let error: Exception.Exception;
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
              then("error is an instance of MissMatchException", () => {
                expect(error).toBeInstanceOf(Exception.MissMatchException);
              });
            });
          }
        );
      });
    });
  });
});

given(`Metadata.remove method availability test`, () => {
  and("a metadata instance is created", () => {
    let metadata: Metadata;
    beforeEach(() => {
      metadata = Metadata.create();
    });
    then("metadata.remove is defined", () => {
      expect(metadata.remove).toBeDefined();
    });
  });
});

given(`Metadata.remove method behavior test`, () => {
  and("a metadata instance is created with data", () => {
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
    when("metadata.remove is called", () => {
      beforeEach(() => {
        metadata.remove();
      });
      then("metadata.id is data.id", () => {
        expect(metadata.id).toBe(data.id);
      });
      then("metadata.name is null", () => {
        expect(metadata.name).toBeNull();
      });
      then("metadata.custom is undefined", () => {
        expect(metadata.custom).toBeUndefined();
      });
    });
    when("metadata.remove is called with ['custom']", () => {
      let key;
      beforeEach(() => {
        key = "custom";
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
    when("metadata.remove is called with ['id']", () => {
      let key;
      let error: Exception.Exception;
      beforeEach(() => {
        try {
          key = "id";
          metadata.remove([key]);
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
      });
    });
    when("metadata.remove is called with ['name']", () => {
      let key;
      let error: Exception.Exception;
      beforeEach(() => {
        try {
          key = "name";
          metadata.remove([key]);
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
      });
    });
    when("metadata.remove is called with ['id', 'name']", () => {
      let keys;
      let error: Exception.Exception;
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
        then("error is an instance of ValidationException", () => {
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    });
  });
});

given(`Metadata.toJSON method availability test`, () => {
  and("a metadata instance is created", () => {
    let metadata: Metadata;
    beforeEach(() => {
      metadata = Metadata.create();
    });
    then("metadata.toJSON is defined", () => {
      expect(metadata.toJSON).toBeDefined();
    });
  });
});

given(`Metadata.toJSON method behavior test`, () => {
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
