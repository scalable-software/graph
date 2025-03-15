import { Type, Test } from "../Helper.js";

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
  NotFoundException,
  InvalidIndexException,
} from "../../../src/exceptions/Exceptions.js";

import type {
  UUID,
  Coordinates,
  IMetadata,
  INode,
} from "@scalable.software/graph";

given(`Validate ${Type.CLASS} ${Test.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Test.AVAILABILITY);
  });
  and(`Validate is imported`, () => {
    then(`Validate is defined`, () => {
      expect(Validate).toBeDefined();
    });
  });
});

given(`Validate index ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Validate.index");
  });
  then(`Validate.index is defined`, () => {
    expect(Validate.index).toBeDefined();
  });
  and(`Validate.index is defined`, () => {
    then(`Validate.index is a function`, () => {
      expect(Validate.index).toBeInstanceOf(Function);
    });
    when(`Validate.index called with number 0`, () => {
      let index: number;
      let result: number;
      let error: Error;
      beforeEach(() => {
        index = 0;
        try {
          result = Validate.index(index);
        } catch (e) {
          error = e;
        }
      });
      then(`error is undefined`, () => {
        expect(error).toBeUndefined();
      });
      then(`result is defined`, () => {
        expect(result).toBeDefined();
      });
      and(`result is defined`, () => {
        then(`result is 0`, () => {
          expect(result).toBe(0);
        });
      });
    });
    when(`Validate.index called with number -1`, () => {
      let index: number;
      let result: number;
      let error: Error;
      beforeEach(() => {
        index = -1;
        try {
          result = Validate.index(index);
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
        then(`error is an instance of InvalidIndexException`, () => {
          expect(error).toBeInstanceOf(InvalidIndexException);
        });
        and(`error is an instance of InvalidIndexException`, () => {
          then(
            `error.message is "Invalid index: index is out of bounds"`,
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

given(`Validate exist ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Validate.exist");
  });
  then(`Validate.exist is defined`, () => {
    expect(Validate.exist).toBeDefined();
  });
  and(`Validate.exist is defined`, () => {
    when(`Validate.exist(items, id) is called with items and valid id`, () => {
      type Item = { id: string };
      let items: Item[];
      let id: UUID;
      let result: UUID;
      beforeEach(() => {
        items = [{ id: "1" }, { id: "2" }, { id: "3" }];
        id = "1";
        result = Validate.exist(items, id);
      });
      then(`result is defined`, () => {
        expect(result).toBeDefined();
      });
      and(`result is defined`, () => {
        then(`result is id`, () => {
          expect(result).toBe(id);
        });
      });
    });
    when(
      `Validate.exist(items, id) is called with items and invalid id`,
      () => {
        type Item = { id: string };
        let items: Item[];
        let id: UUID;
        let error: Error;
        beforeEach(() => {
          items = [{ id: "1" }, { id: "2" }, { id: "3" }];
          id = "4";
          try {
            Validate.exist(items, id);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(`error is an instance of NotFoundException`, () => {
            expect(error).toBeInstanceOf(NotFoundException);
          });
          and(`error is an instance of NotFoundException`, () => {
            then(`error.message is "Not found: id 4"`, () => {
              expect(error.message).toBe("Not found: id 4");
            });
          });
        });
      }
    );
  });
});

given(`Validate id ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Validate.id");
  });
  then(`Validate.id is defined`, () => {
    expect(Validate.id).toBeDefined();
  });
  and(`Validate.id is defined`, () => {
    then(`Validate.id is a function`, () => {
      expect(Validate.id).toBeInstanceOf(Function);
    });
    and(`Validate.id is a function`, () => {
      when(`Validate.id(id) is called with a valid UUID`, () => {
        let id: string;
        let result: UUID | UUID[];
        beforeEach(() => {
          id = "123e4567-e89b-12d3-a456-426614174000";
          result = Validate.id([{ id }], id);
        });
        then(`Validate.id returns the id`, () => {
          expect(result).toBe(id);
        });
      });
      when(`Validate.id(id) is called with an array of valid UUIDs`, () => {
        let id: string[];
        let result: UUID | UUID[];
        beforeEach(() => {
          id = [
            "123e4567-e89b-12d3-a456-426614174000",
            "123e4567-e89b-12d3-a456-426614174001",
          ];
          result = Validate.id([{ id: id[0] }, { id: id[1] }], id);
        });
        then(`Validate.id returns the id`, () => {
          expect(result).toEqual(id);
        });
      });
      when(`Validate.id(id) is called with an array of invalid UUIDs`, () => {
        type Node = { id: string };
        let id: UUID[];
        let error: Error;
        beforeEach(() => {
          id = ["invalid", "invalid"] as UUID[];
          try {
            Validate.id([{ id: id[0] }], id);
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
      when(`Validate.id(id) is called with an empty array`, () => {
        let id: string[];
        let result: UUID | UUID[];
        beforeEach(() => {
          id = [];
          result = Validate.id([], id);
        });
        then(`Validate.id returns the id`, () => {
          expect(result).toEqual(id);
        });
      });
      when(`Validate.id(id) is called with an invalid UUID`, () => {
        let id: string;
        let error: Error;
        beforeEach(() => {
          id = "invalid";
          try {
            Validate.id([], id);
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
      when(`Validate.id(id) is called with null`, () => {
        let id: string;
        let error: Error;
        beforeEach(() => {
          id = null;
          try {
            Validate.id([], id);
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
      when(`Validate.id(id, nodes) is called with valid id and nodes`, () => {
        type Node = { id: string };
        let id: UUID | UUID[];
        let nodes: Node[];
        let result: UUID | UUID[];
        beforeEach(() => {
          id = "123e4567-e89b-12d3-a456-426614174000";
          nodes = [
            { id: "123e4567-e89b-12d3-a456-426614174000" },
            { id: "123e4567-e89b-12d3-a456-426614174001" },
            { id: "123e4567-e89b-12d3-a456-426614174001" },
          ];
          result = Validate.id(nodes, id);
        });
        then(`Validate.id returns the node`, () => {
          expect(result).toBe(id);
        });
      });
      when(`Validate.id(id, nodes) is called with valid id and nodes`, () => {
        type Node = { id: string };
        let id: UUID | UUID[];
        let nodes: Node[];
        let result: UUID | UUID[];
        let error: Error;
        beforeEach(() => {
          id = "123e4567-e89b-12d3-a456-426614174020";
          nodes = [
            { id: "123e4567-e89b-12d3-a456-426614174000" },
            { id: "123e4567-e89b-12d3-a456-426614174001" },
            { id: "123e4567-e89b-12d3-a456-426614174001" },
          ];
          try {
            result = Validate.id(nodes, id);
          } catch (e) {
            error = e;
          }
        });
        then(`results is undefined`, () => {
          expect(result).toBeUndefined();
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(`error is an instance of NotFoundException`, () => {
            expect(error).toBeInstanceOf(NotFoundException);
          });
          and(`error is an instance of NotFoundException`, () => {
            then(
              `error.message is "Not found: id 123e4567-e89b-12d3-a456-426614174020"`,
              () => {
                expect(error.message).toBe(
                  "Not found: id 123e4567-e89b-12d3-a456-426614174020"
                );
              }
            );
          });
        });
      });
    });
  });
});

given(`Validate flag ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Validate.exist");
  });
  then(`Validate.flag is defined`, () => {
    expect(Validate.flag).toBeDefined();
  });
  and(`Validate.flag is defined`, () => {
    then(`Validate.flag is a function`, () => {
      expect(Validate.flag).toBeInstanceOf(Function);
    });
    and(`Validate.flag is a function`, () => {
      when(`Validate.flag(flag) is called with true`, () => {
        let flag: boolean;
        let result: boolean;
        beforeEach(() => {
          flag = true;
          result = Validate.flag(flag);
        });
        then(`result is true`, () => {
          expect(result).toBe(true);
        });
      });
      when(`Validate.flag(flag) is called with false`, () => {
        let flag: boolean;
        let result: boolean;
        beforeEach(() => {
          flag = false;
          result = Validate.flag(flag);
        });
        then(`result is false`, () => {
          expect(result).toBe(false);
        });
      });
      when(`Validate.flag(flag) is called with null`, () => {
        let flag: boolean;
        let error: Error;
        beforeEach(() => {
          flag = null;
          try {
            Validate.flag(flag);
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
              `error.message is "Invalid argument: flag - must be a boolean"`,
              () => {
                expect(error.message).toBe(
                  "Invalid argument: flag - must be a boolean"
                );
              }
            );
          });
        });
      });
      when(`Validate.flag(flag) is called with number`, () => {
        let flag: boolean;
        let error: Error;
        beforeEach(() => {
          flag = 1 as any;
          try {
            Validate.flag(flag);
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
              `error.message is "Invalid argument: flag - must be a boolean"`,
              () => {
                expect(error.message).toBe(
                  "Invalid argument: flag - must be a boolean"
                );
              }
            );
          });
        });
      });
      when(`Validate.flag(flag) is called with string`, () => {
        let flag: boolean;
        let error: Error;
        beforeEach(() => {
          flag = "true" as any;
          try {
            Validate.flag(flag);
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
              `error.message is "Invalid argument: flag - must be a boolean"`,
              () => {
                expect(error.message).toBe(
                  "Invalid argument: flag - must be a boolean"
                );
              }
            );
          });
        });
      });
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

given(`Validate unique ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Validate.unique");
  });
  then(`Validate.unique is defined`, () => {
    expect(Validate.unique).toBeDefined();
  });
  and(`Validate.unique is defined`, () => {
    then(`Validate.unique is a function`, () => {
      expect(Validate.unique).toBeInstanceOf(Function);
    });
    and(`Validate.unique is a function`, () => {
      when(`Validate.unique is called with array of unique values`, () => {
        let array: any[];
        let result: any[];
        beforeEach(() => {
          array = [1, 2, 3];
          result = Validate.unique(array);
        });
        then(`Validate.unique returns the array`, () => {
          expect(result).toBe(array);
        });
      });
      when(`Validate.unique is called with array of duplicate values`, () => {
        let array: any[];
        let error: Error;
        beforeEach(() => {
          array = [1, 2, 2, 3];
          try {
            Validate.unique(array);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(`error is an instance of DuplicateException`, () => {
            expect(error).toBeInstanceOf(DuplicateException);
          });
          and(`error is an instance of DuplicateException`, () => {
            then(`error.message is "Duplicate found: 2."`, () => {
              expect(error.message).toBe("Duplicate found: 2");
            });
          });
        });
      });
      when(
        `Validate.unique is called with array of objects with unique ids and id extractor`,
        () => {
          let array: any[];
          let result: any[];
          let extractor: (item: any) => any;
          beforeEach(() => {
            extractor = (item) => item.id;
            array = [
              { id: 1, name: "Alice" },
              { id: 2, name: "Bob" },
              { id: 3, name: "Charlie" },
            ];
            result = Validate.unique(array, extractor);
          });
          then(`Validate.unique returns the array`, () => {
            expect(result).toBe(array);
          });
        }
      );
      when(
        `Validate.unique is called with array of objects with duplicate ids and id extractor`,
        () => {
          let array: any[];
          let error: Error;
          let extractor: (item: any) => any;
          beforeEach(() => {
            extractor = (item) => item.id;
            array = [
              { id: 1, name: "Alice" },
              { id: 2, name: "Bob" },
              { id: 2, name: "Charlie" },
            ];
            try {
              Validate.unique(array, extractor);
            } catch (e) {
              error = e;
            }
          });
          then(`error is defined`, () => {
            expect(error).toBeDefined();
          });
          and(`error is defined`, () => {
            then(`error is an instance of DuplicateException`, () => {
              expect(error).toBeInstanceOf(DuplicateException);
            });
            and(`error is an instance of DuplicateException`, () => {
              then(
                `error.message is "Duplicate found: {"id":2,"name":"Charlie"}"`,
                () => {
                  expect(error.message).toBe(
                    'Duplicate found: {"id":2,"name":"Charlie"}'
                  );
                }
              );
            });
          });
        }
      );
    });
  });
});

given(`Validate distinct ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Validate.distinct");
  });
  then(`Validate.distinct is defined`, () => {
    expect(Validate.distinct).toBeDefined();
  });
  and(`Validate.distinct is defined`, () => {
    then(`Validate.distinct is a function`, () => {
      expect(Validate.distinct).toBeInstanceOf(Function);
    });
    and(`Validate.distinct is a function`, () => {
      when(`Validate.distinct is called with two unique sets`, () => {
        let sets: [any[], any[]];
        let result: any[];
        beforeEach(() => {
          const one = [1, 2, 3];
          const two = [4, 5, 6];
          sets = [one, two];
          result = Validate.distinct(sets);
        });
        then(`Validate.unique returns the array`, () => {
          expect(result).toBe(sets[1]);
        });
      });
      when(`Validate.distinct is called with two sets`, () => {
        let sets: [any[], any[]];
        let error: Error;
        beforeEach(() => {
          const one = [1, 2, 3];
          const two = [3, 4, 5];
          sets = [one, two];
          try {
            Validate.distinct(sets);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(`error is an instance of DuplicateException`, () => {
            expect(error).toBeInstanceOf(DuplicateException);
          });
          and(`error is an instance of DuplicateException`, () => {
            then(`error.message is "Duplicate found: 3."`, () => {
              expect(error.message).toBe("Duplicate found: 3");
            });
          });
        });
      });
      when(
        `Validate.distinct is called with two sets with unique ids and id extractor`,
        () => {
          let sets: [any[], any[]];
          let result: any[];
          let extractor: (item: any) => any;
          beforeEach(() => {
            extractor = (item) => item.id;
            const one = [
              { id: 1, name: "Alice" },
              { id: 2, name: "Bob" },
              { id: 3, name: "Charlie" },
            ];
            const two = [
              { id: 4, name: "David" },
              { id: 5, name: "Edward" },
              { id: 6, name: "Frank" },
            ];
            sets = [one, two];
            result = Validate.distinct(sets, extractor);
          });
          then(`Validate.unique returns the array`, () => {
            expect(result).toBe(sets[1]);
          });
        }
      );
      when(
        `Validate.distinct is called with two sets with matching ids and id extractor`,
        () => {
          let sets: [any[], any[]];
          let error: Error;
          let extractor: (item: any) => any;
          beforeEach(() => {
            extractor = (item) => item.id;
            const one = [
              { id: 1, name: "Alice" },
              { id: 2, name: "Bob" },
              { id: 3, name: "Charlie" },
            ];
            const two = [
              { id: 3, name: "David" },
              { id: 4, name: "Edward" },
              { id: 5, name: "Frank" },
            ];
            sets = [one, two];
            try {
              Validate.distinct(sets, extractor);
            } catch (e) {
              error = e;
            }
          });
          then(`error is defined`, () => {
            expect(error).toBeDefined();
          });
          and(`error is defined`, () => {
            then(`error is an instance of DuplicateException`, () => {
              expect(error).toBeInstanceOf(DuplicateException);
            });
            and(`error is an instance of DuplicateException`, () => {
              then(
                `error.message is "Duplicate found: {"id":3,"name":"David"}"`,
                () => {
                  expect(error.message).toBe(
                    'Duplicate found: {"id":3,"name":"David"}'
                  );
                }
              );
            });
          });
        }
      );
    });
  });
});

given(`Validate immutable ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Validate.immutable");
  });
  then(`Validate.immutable is defined`, () => {
    expect(Validate.immutable).toBeDefined();
  });
  and(`Validate.immutable is defined`, () => {
    then(`Validate.immutable is a function`, () => {
      expect(Validate.immutable).toBeInstanceOf(Function);
    });
    and(`Validate.immutable is a function`, () => {
      when(
        `Validate.immutable(keys, immutable) is called with a matching key`,
        () => {
          let keys: string[];
          let immutable: string;
          let error: Error;
          beforeEach(() => {
            keys = ["id", "name"];
            immutable = "id";
            try {
              Validate.immutable(keys, immutable);
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
        `Validate.immutable(keys, immutable) is called with a non-matching key`,
        () => {
          let keys: string[];
          let immutable: string;
          let result;
          beforeEach(() => {
            keys = ["id", "name"];
            immutable = "type";
            result = Validate.immutable(keys, immutable);
          });
          then(`Validate.immutable returns true`, () => {
            expect(result).toBe(true);
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

given(`Validate node ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Validate.node");
  });
  then("Validate.node is defined", () => {
    expect(Validate.node).toBeDefined();
  });
  and("Validate.node is defined", () => {
    then("Validate.node is a function", () => {
      expect(Validate.node).toBeInstanceOf(Function);
    });
    and("Validate.node is a function", () => {
      when("Validate.node() called with no arguments", () => {
        let response: INode;
        let error: Error;
        beforeEach(() => {
          try {
            response = Validate.node() as INode;
          } catch (e) {
            error = e;
          }
        });
        then("error is undefined", () => {
          expect(error).toBeUndefined();
        });
        then("response is null", () => {
          expect(response).toBeNull();
        });
      });
      when("Validate.node(node) called with valid node", () => {
        let node: INode;
        let response: INode;
        let error: Error;
        beforeEach(() => {
          node = {
            id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
            coordinates: { x: 0, y: 0 },
          };
          try {
            response = Validate.node<INode>(node) as INode;
          } catch (e) {
            error = e;
          }
        });
        then("error is undefined", () => {
          expect(error).toBeUndefined();
        });
        then("response is defined", () => {
          expect(response).toBeDefined();
        });
        and("response is defined", () => {
          then("response equals node", () => {
            expect(response).toEqual(node);
          });
        });
      });
      when("Validate.node(node) called with invalid id", () => {
        let node: INode;
        let response: INode;
        let error: ValidationException;
        beforeEach(() => {
          node = {
            id: "invalid",
            coordinates: { x: 0, y: 0 },
          };
          try {
            response = Validate.node<INode>(node) as INode;
          } catch (e) {
            error = e;
          }
        });
        then("error is defined", () => {
          expect(error).toBeDefined();
        });
        then("response is undefined", () => {
          expect(response).toBeUndefined();
        });
        and("error is defined", () => {
          then("error is an instance of ValidationException", () => {
            expect(error).toBeInstanceOf(ValidationException);
          });
          then("error.message is 'Validation failed with 1 error(s).'", () => {
            expect(error.message).toBe("Validation failed with 1 error(s).");
          });
          then(
            "error.errors[0] is instance of InvalidArgumentException",
            () => {
              expect(error.errors[0]).toBeInstanceOf(InvalidArgumentException);
            }
          );
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
      when("Validate.node(node) called with invalid coordinates", () => {
        let node: INode;
        let response: INode;
        let error: ValidationException;
        beforeEach(() => {
          const x = "invalid" as any;
          node = {
            id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
            coordinates: { x, y: 0 },
          };
          try {
            response = Validate.node<INode>(node) as INode;
          } catch (e) {
            error = e;
          }
        });
        then("error is defined", () => {
          expect(error).toBeDefined();
        });
        then("response is undefined", () => {
          expect(response).toBeUndefined();
        });
        and("error is defined", () => {
          then("error is an instance of ValidationException", () => {
            expect(error).toBeInstanceOf(ValidationException);
          });
          then("error.message is 'Validation failed with 1 error(s).'", () => {
            expect(error.message).toBe("Validation failed with 1 error(s).");
          });
          then(
            "error.errors[0] is instance of InvalidArgumentException",
            () => {
              expect(error.errors[0]).toBeInstanceOf(InvalidArgumentException);
            }
          );
          then(
            "error.errors[0].message is 'Invalid argument: coordinates - must be valid coordinates'",
            () => {
              expect(error.errors[0].message).toBe(
                "Invalid argument: coordinates - must be valid coordinates"
              );
            }
          );
        });
      });
      when("Validate.node(node) called with invalid node", () => {
        let node: INode;
        let response: INode;
        let error: ValidationException;
        beforeEach(() => {
          const x = "invalid" as any;
          node = {
            id: "invalid",
            coordinates: { x, y: 0 },
          };
          try {
            response = Validate.node<INode>(node) as INode;
          } catch (e) {
            error = e;
          }
        });
        then("error is defined", () => {
          expect(error).toBeDefined();
        });
        then("response is undefined", () => {
          expect(response).toBeUndefined();
        });
        and("error is defined", () => {
          then("error is an instance of ValidationException", () => {
            expect(error).toBeInstanceOf(ValidationException);
          });
          then("error.message is 'Validation failed with 2 error(s).'", () => {
            expect(error.message).toBe("Validation failed with 2 error(s).");
          });
          then(
            "error.errors[0] is instance of InvalidArgumentException",
            () => {
              expect(error.errors[0]).toBeInstanceOf(InvalidArgumentException);
            }
          );
          then(
            "error.errors[0].message is 'Invalid argument: id - must be a valid UUID'",
            () => {
              expect(error.errors[0].message).toBe(
                "Invalid argument: id - must be a valid UUID"
              );
            }
          );
          then(
            "error.errors[1] is instance of InvalidArgumentException",
            () => {
              expect(error.errors[1]).toBeInstanceOf(InvalidArgumentException);
            }
          );
          then(
            "error.errors[1].message is 'Invalid argument: coordinates - must be valid coordinates'",
            () => {
              expect(error.errors[1].message).toBe(
                "Invalid argument: coordinates - must be valid coordinates"
              );
            }
          );
        });
      });
    });
  });
});

given(`Validate nodes ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", "Validate.nodes");
  });
  then("Validate.nodes is defined", () => {
    expect(Validate.nodes).toBeDefined();
  });
  and("Validate.nodes is defined", () => {
    then("Validate.nodes is a function", () => {
      expect(Validate.nodes).toBeInstanceOf(Function);
    });
    and("Validate.nodes is a function", () => {
      when("Validate.nodes called with valid nodes", () => {
        let nodes: INode[];
        let response: INode[];
        let error: Error;
        beforeEach(() => {
          nodes = [
            {
              id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
              coordinates: { x: 0, y: 0 },
            },
            {
              id: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
              coordinates: { x: 1, y: 1 },
            },
          ];
          try {
            response = Validate.nodes(nodes) as INode[];
          } catch (e) {
            error = e;
          }
        });
        then("error is undefined", () => {
          expect(error).toBeUndefined();
        });
        then("response is defined", () => {
          expect(response).toBeDefined();
        });
        and("response is defined", () => {
          then("response equals nodes", () => {
            expect(response).toEqual(nodes);
          });
        });
      });
      when("Validate.nodes called with invalid id in nodes", () => {
        let nodes: INode[];
        let response: INode[];
        let error: ValidationException;
        beforeEach(() => {
          nodes = [
            {
              id: "invalid",
              coordinates: { x: 0, y: 0 },
            },
          ];
          try {
            response = Validate.nodes(nodes) as INode[];
          } catch (e) {
            error = e;
          }
        });
        then("response is undefined", () => {
          expect(response).toBeUndefined();
        });
        then("error is defined", () => {
          expect(error).toBeDefined();
        });
        and("error is defined", () => {
          then("error is an instance of ValidationException", () => {
            expect(error).toBeInstanceOf(ValidationException);
          });
          then("error.message is 'Validation failed with 1 error(s).'", () => {
            expect(error.message).toBe("Validation failed with 1 error(s).");
          });
          then(
            "error.errors[0] is instance of InvalidArgumentException",
            () => {
              expect(error.errors[0]).toBeInstanceOf(InvalidArgumentException);
            }
          );
          and("error.errors[0] is instance of InvalidArgumentException", () => {
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
      when("Validate.nodes called with invalid coordinates in nodes", () => {
        let nodes: INode[];
        let response: INode[];
        let error: ValidationException;
        beforeEach(() => {
          nodes = [
            {
              id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
              coordinates: { x: "invalid", y: 0 } as unknown as Coordinates,
            },
          ];
          try {
            response = Validate.nodes(nodes) as INode[];
          } catch (e) {
            error = e;
          }
        });
        then("response is undefined", () => {
          expect(response).toBeUndefined();
        });
        then("error is defined", () => {
          expect(error).toBeDefined();
        });
        and("error is defined", () => {
          then("error is an instance of ValidationException", () => {
            expect(error).toBeInstanceOf(ValidationException);
          });
          then("error.message is 'Validation failed with 1 error(s).'", () => {
            expect(error.message).toBe("Validation failed with 1 error(s).");
          });
          then(
            "error.errors[0] is instance of InvalidArgumentException",
            () => {
              expect(error.errors[0]).toBeInstanceOf(InvalidArgumentException);
            }
          );
          and("error.errors[0] is instance of InvalidArgumentException", () => {
            then(
              "error.errors[0].message is 'Invalid argument: coordinates - must be valid coordinates'",
              () => {
                expect(error.errors[0].message).toBe(
                  "Invalid argument: coordinates - must be valid coordinates"
                );
              }
            );
          });
        });
      });
      when("Validate.nodes called with duplicate ids in nodes", () => {
        let nodes: INode[];
        let response: INode[];
        let error: DuplicateException;
        beforeEach(() => {
          nodes = [
            {
              id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
              coordinates: { x: 0, y: 0 },
            },
            {
              id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
              coordinates: { x: 1, y: 1 },
            },
          ];
          try {
            response = Validate.nodes(nodes) as INode[];
          } catch (e) {
            error = e;
          }
        });
        then("response is undefined", () => {
          expect(response).toBeUndefined();
        });
        then("error is defined", () => {
          expect(error).toBeDefined();
        });
        and("error is defined", () => {
          then("error is an instance of ValidationException", () => {
            expect(error).toBeInstanceOf(ValidationException);
          });
          then("error.message is 'Validation failed with 1 error(s).'", () => {
            expect(error.message).toBe("Validation failed with 1 error(s).");
          });
          then("error.errors[0] is instance of DuplicateException", () => {
            expect(error.errors[0]).toBeInstanceOf(DuplicateException);
          });
        });
      });
      when("Validate.nodes called with duplicate coordinates in nodes", () => {
        let nodes: INode[];
        let response: INode[];
        let error: DuplicateException;
        beforeEach(() => {
          nodes = [
            {
              id: "12b6679a-fd9d-4036-b1ab-af0b932fc902",
              coordinates: { x: 0, y: 0 },
            },
            {
              id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
              coordinates: { x: 0, y: 0 },
            },
          ];
          try {
            response = Validate.nodes(nodes) as INode[];
          } catch (e) {
            error = e;
          }
        });
        then("response is undefined", () => {
          expect(response).toBeUndefined();
        });
        then("error is defined", () => {
          expect(error).toBeDefined();
        });
        and("error is defined", () => {
          then("error is an instance of ValidationException", () => {
            expect(error).toBeInstanceOf(ValidationException);
          });
          then("error.message is 'Validation failed with 1 error(s).'", () => {
            expect(error.message).toBe("Validation failed with 1 error(s).");
          });
          then("error.errors[0] is instance of DuplicateException", () => {
            expect(error.errors[0]).toBeInstanceOf(DuplicateException);
          });
        });
      });
    });
  });
});
