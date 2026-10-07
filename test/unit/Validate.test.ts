import type {
  UUID,
  Coordinates,
  IGraph,
  IMetadata,
  INode,
  IEdge,
  PartialEdge,
} from "@scalable.software/graph";

import { Graph, Exception, Validate } from "@scalable.software/graph";

given(`Validate class availability test`, () => {
  and(`Validate is imported`, () => {
    then(`Validate is defined`, () => {
      expect(Validate).toBeDefined();
    });
  });
});

given(`Validate.index static method availability test`, () => {
  then(`Validate.index is defined`, () => {
    expect(Validate.index).toBeDefined();
  });
  and(`Validate.index is defined`, () => {
    then(`Validate.index is a function`, () => {
      expect(Validate.index).toBeInstanceOf(Function);
    });
  });
});

given(`Validate.index static method behavior test`, () => {
  when(`Validate.index called with 0`, () => {
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
  when(`Validate.index called with -1`, () => {
    let index: number;
    let result: number;
    let error: Exception.Exception;
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
        expect(error).toBeInstanceOf(Exception.InvalidIndexException);
      });
    });
  });
});

given(`Validate.notNull static method availability test`, () => {
  then(`Validate.notNull is defined`, () => {
    expect(Validate.notNull).toBeDefined();
  });
  and(`Validate.notNull is defined`, () => {
    then(`Validate.notNull is a function`, () => {
      expect(Validate.notNull).toBeInstanceOf(Function);
    });
  });
});

given(`Validate.notNull static method behavior test`, () => {
  when(`Validate.notNull called with value`, () => {
    let value: any;
    let result: number;
    let error: Error;
    beforeEach(() => {
      value = 0;
      try {
        result = Validate.notNull(value);
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
      then(`result is value`, () => {
        expect(result).toBe(value);
      });
    });
  });
  when(`Validate.notNull called with undefined`, () => {
    let value: any;
    let result: number;
    let error: Exception.Exception;
    beforeEach(() => {
      value = undefined;
      try {
        result = Validate.notNull(value);
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
      then(`error is an instance of InvalidArgumentException`, () => {
        expect(error).toBeInstanceOf(
          Exception.InvalidArgumentException
        );
      });
    });
  });
  when(`Validate.notNull called with null`, () => {
    let value: any;
    let result: number;
    let error: Exception.Exception;
    beforeEach(() => {
      value = null;
      try {
        result = Validate.notNull(value);
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
      then(`error is an instance of InvalidArgumentException`, () => {
        expect(error).toBeInstanceOf(
          Exception.InvalidArgumentException
        );
      });
    });
  });
});

given(`Validate.exist static method availability test`, () => {
  then(`Validate.exist is defined`, () => {
    expect(Validate.exist).toBeDefined();
  });
  and(`Validate.exist is defined`, () => {
    then(`Validate.exist is a function`, () => {
      expect(Validate.exist).toBeInstanceOf(Function);
    });
  });
});

given(`Validate.exist static method behavior test`, () => {
  when(`Validate.exist is called with items and valid id`, () => {
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
  when(`Validate.exist is called with items and invalid id`, () => {
    type Item = { id: string };
    let items: Item[];
    let id: UUID;
    let error: Exception.Exception;
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
        expect(error).toBeInstanceOf(Exception.NotFoundException);
      });
    });
  });
});

given(`Validate.id static method availability test`, () => {
  then(`Validate.id is defined`, () => {
    expect(Validate.id).toBeDefined();
  });
  and(`Validate.id is defined`, () => {
    then(`Validate.id is a function`, () => {
      expect(Validate.id).toBeInstanceOf(Function);
    });
  });
});

given(`Validate.id static method behavior test`, () => {
  when(`Validate.id is called with nodes and valid UUID`, () => {
    let nodes: { id: string }[];
    let id: string;
    let result: UUID | UUID[];
    beforeEach(() => {
      id = "123e4567-e89b-12d3-a456-426614174000";
      nodes = [{ id: id }];
      result = Validate.id(nodes, id);
    });
    then(`Validate.id returns the id`, () => {
      expect(result).toBe(id);
    });
  });
  when(`Validate.id is called with nodes and valid UUIDs`, () => {
    let nodes: { id: string }[];
    let ids: string[];
    let result: UUID | UUID[];
    beforeEach(() => {
      ids = [
        "123e4567-e89b-12d3-a456-426614174000",
        "123e4567-e89b-12d3-a456-426614174001",
      ];
      nodes = [{ id: ids[0] }, { id: ids[1] }];
      result = Validate.id(nodes, ids);
    });
    then(`Validate.id returns the ids`, () => {
      expect(result).toEqual(ids);
    });
  });
  when(`Validate.id is called with nodes and invalid UUIDs`, () => {
    let nodes: { id: string }[];
    let id: UUID[];
    let error: Exception.Exception;
    beforeEach(() => {
      id = ["invalid", "invalid"] as UUID[];
      nodes = [{ id: id[0] }, { id: id[1] }];
      try {
        Validate.id(nodes, id);
      } catch (e) {
        error = e;
      }
    });
    then(`error is defined`, () => {
      expect(error).toBeDefined();
    });
    and(`error is defined`, () => {
      then(`error is an instance of InvalidArgumentException`, () => {
        expect(error).toBeInstanceOf(
          Exception.InvalidArgumentException
        );
      });
    });
  });
  when(`Validate.id is called with nodes and empty UUIDs`, () => {
    let nodes: { id: string }[];
    let id: string[];
    let result: UUID | UUID[];
    beforeEach(() => {
      id = [];
      nodes = [];
      result = Validate.id(nodes, id);
    });
    then(`Validate.id returns the id`, () => {
      expect(result).toEqual(id);
    });
  });
  when(`Validate.id is called with nodes and invalid UUID`, () => {
    let nodes: { id: string }[];
    let id: string;
    let error: Exception.Exception;
    beforeEach(() => {
      id = "invalid";
      nodes = [];
      try {
        Validate.id(nodes, id);
      } catch (e) {
        error = e;
      }
    });
    then(`error is defined`, () => {
      expect(error).toBeDefined();
    });
    and(`error is defined`, () => {
      then(`error is an instance of InvalidArgumentException`, () => {
        expect(error).toBeInstanceOf(
          Exception.InvalidArgumentException
        );
      });
    });
  });
  when(`Validate.id is called with nodes and null`, () => {
    let nodes: { id: string }[];
    let id: string;
    let error: Exception.Exception;
    beforeEach(() => {
      id = null;
      nodes = [];
      try {
        Validate.id(nodes, id);
      } catch (e) {
        error = e;
      }
    });
    then(`error is defined`, () => {
      expect(error).toBeDefined();
    });
    and(`error is defined`, () => {
      then(`error is an instance of InvalidArgumentException`, () => {
        expect(error).toBeInstanceOf(
          Exception.InvalidArgumentException
        );
      });
    });
  });
  when(`Validate.id is called with nodes and valid id`, () => {
    let nodes: { id: string }[];
    let id: UUID | UUID[];
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
  when(`Validate.id is called with nodes and unknown id`, () => {
    let nodes: { id: string }[];
    let id: UUID | UUID[];
    let result: UUID | UUID[];
    let error: Exception.Exception;
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
        expect(error).toBeInstanceOf(Exception.NotFoundException);
      });
    });
  });
});

given(`Validate.flag static method availability test`, () => {
  then(`Validate.flag is defined`, () => {
    expect(Validate.flag).toBeDefined();
  });
  and(`Validate.flag is defined`, () => {
    then(`Validate.flag is a function`, () => {
      expect(Validate.flag).toBeInstanceOf(Function);
    });
  });
});

given(`Validate.flag static method behavior test`, () => {
  when(`Validate.flag is called with true`, () => {
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
  when(`Validate.flag is called with false`, () => {
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
  when(`Validate.flag is called with null`, () => {
    let flag: boolean;
    let error: Exception.Exception;
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
        expect(error).toBeInstanceOf(
          Exception.InvalidArgumentException
        );
      });
    });
  });
  when(`Validate.flag is called with number`, () => {
    let flag: boolean;
    let error: Exception.Exception;
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
        expect(error).toBeInstanceOf(
          Exception.InvalidArgumentException
        );
      });
    });
  });
  when(`Validate.flag is called with string`, () => {
    let flag: boolean;
    let error: Exception.Exception;
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
        expect(error).toBeInstanceOf(
          Exception.InvalidArgumentException
        );
      });
    });
  });
});

given(`Validate.uuid static method availability test`, () => {
  then(`Validate.uuid is defined`, () => {
    expect(Validate.uuid).toBeDefined();
  });
  and(`Validate.uuid is defined`, () => {
    then(`Validate.uuid is a function`, () => {
      expect(Validate.uuid).toBeInstanceOf(Function);
    });
  });
});

given(`Validate.uuid static method behavior test`, () => {
  when(`Validate.uuid is called with valid UUID`, () => {
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
  when(`Validate.uuid is called with invalid UUID`, () => {
    let id: string;
    let error: Exception.Exception;
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
        expect(error).toBeInstanceOf(
          Exception.InvalidArgumentException
        );
      });
    });
  });
  when(`Validate.uuid is called with null`, () => {
    let id: string;
    let error: Exception.Exception;
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
        expect(error).toBeInstanceOf(
          Exception.InvalidArgumentException
        );
      });
    });
  });
});

given(`Validate.coordinates static method availability test`, () => {
  then(`Validate.coordinates is defined`, () => {
    expect(Validate.coordinates).toBeDefined();
  });
  and(`Validate.coordinates is defined`, () => {
    then(`Validate.coordinates is a function`, () => {
      expect(Validate.coordinates).toBeInstanceOf(Function);
    });
  });
});

given(`Validate.coordinates static method behavior test`, () => {
  when(
    `Validate.coordinates is called with valid coordinates`,
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
    `Validate.coordinates is called with invalid coordinates`,
    () => {
      let coordinates: any;
      let error: Exception.Exception;
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
        then(
          `error is an instance of InvalidArgumentException`,
          () => {
            expect(error).toBeInstanceOf(
              Exception.InvalidArgumentException
            );
          }
        );
      });
    }
  );
  when(`Validate.coordinates is called with null`, () => {
    let coordinates: any;
    let error: Exception.Exception;
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
        expect(error).toBeInstanceOf(
          Exception.InvalidArgumentException
        );
      });
    });
  });
});

given(`Validate.name static method availability test`, () => {
  then(`Validate.name is defined`, () => {
    expect(Validate.name).toBeDefined();
  });
  and(`Validate.name is defined`, () => {
    then(`Validate.name is a function`, () => {
      expect(Validate.name).toBeInstanceOf(Function);
    });
  });
});

given(`Validate.name static method behavior test`, () => {
  when(`Validate.name is called with valid name`, () => {
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
  when(`Validate.name is called with too short name`, () => {
    let name: string;
    let error: Exception.Exception;
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
        expect(error).toBeInstanceOf(
          Exception.InvalidArgumentException
        );
      });
    });
  });
  when(`Validate.name is called with too long name`, () => {
    let name: string;
    let error: Exception.Exception;
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
        expect(error).toBeInstanceOf(
          Exception.InvalidArgumentException
        );
      });
    });
  });
  when(`Validate.name is called with null`, () => {
    let name: string;
    let error: Exception.Exception;
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
        expect(error).toBeInstanceOf(
          Exception.InvalidArgumentException
        );
      });
    });
  });
});

given(`Validate.unique static method availability test`, () => {
  then(`Validate.unique is defined`, () => {
    expect(Validate.unique).toBeDefined();
  });
  and(`Validate.unique is defined`, () => {
    then(`Validate.unique is a function`, () => {
      expect(Validate.unique).toBeInstanceOf(Function);
    });
  });
});

given(`Validate.unique static method behavior test`, () => {
  when(`Validate.unique is called with unique values`, () => {
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
  when(`Validate.unique is called with duplicate values`, () => {
    let array: any[];
    let error: Exception.Exception;
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
        expect(error).toBeInstanceOf(Exception.DuplicateException);
      });
    });
  });
  when(
    `Validate.unique is called with objects with unique ids and id extractor`,
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
    `Validate.unique is called with objects with duplicate ids and id extractor`,
    () => {
      let array: any[];
      let error: Exception.Exception;
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
          expect(error).toBeInstanceOf(Exception.DuplicateException);
        });
      });
    }
  );
});

given(`Validate.distinct static method availability test`, () => {
  then(`Validate.distinct is defined`, () => {
    expect(Validate.distinct).toBeDefined();
  });
  and(`Validate.distinct is defined`, () => {
    then(`Validate.distinct is a function`, () => {
      expect(Validate.distinct).toBeInstanceOf(Function);
    });
  });
});

given(`Validate.distinct static method behavior test`, () => {
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
    let error: Exception.Exception;
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
        expect(error).toBeInstanceOf(Exception.DuplicateException);
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
      let error: Exception.Exception;
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
          expect(error).toBeInstanceOf(Exception.DuplicateException);
        });
      });
    }
  );
});

given(`Validate.immutable static method availability test`, () => {
  then(`Validate.immutable is defined`, () => {
    expect(Validate.immutable).toBeDefined();
  });
  and(`Validate.immutable is defined`, () => {
    then(`Validate.immutable is a function`, () => {
      expect(Validate.immutable).toBeInstanceOf(Function);
    });
  });
});

given(`Validate.immutable static method behavior test`, () => {
  when(
    `Validate.immutable is called with keys and matching key`,
    () => {
      let keys: string[];
      let immutable: string;
      let error: Exception.Exception;
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
        then(
          `error is an instance of ImmutablePropertyException`,
          () => {
            expect(error).toBeInstanceOf(
              Exception.ImmutablePropertyException
            );
          }
        );
      });
    }
  );
  when(
    `Validate.immutable is called with keys and non-matching key`,
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

given(`Validate.metadata static method availability test`, () => {
  then("Validate.metadata is defined", () => {
    expect(Validate.metadata).toBeDefined();
  });
  and("Validate.metadata is defined", () => {
    then("Validate.metadata is a function", () => {
      expect(Validate.metadata).toBeInstanceOf(Function);
    });
  });
});

given(`Validate.metadata static method behavior test`, () => {
  when("Validate.metadata is called with valid data", () => {
    let data: IMetadata;
    let result: any;
    beforeEach(() => {
      data = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "test",
      };
      result = Validate.metadata(data);
    });
    then("data is returned", () => {
      expect(result).toBe(data);
    });
  });
  when("Validate.metadata is called with invalid data", () => {
    let data: Partial<IMetadata>;
    let result: any;
    let error: Exception.ValidationException;
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
        expect(error).toBeInstanceOf(Exception.ValidationException);
      });
    });
  });
  when("Validate.metadata is called with invalid data.id", () => {
    let data: Partial<IMetadata>;
    let result: any;
    let error: Exception.ValidationException;
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
        expect(error).toBeInstanceOf(Exception.ValidationException);
      });
    });
  });
  when("Validate.metadata is called with invalid data.name", () => {
    let data: Partial<IMetadata>;
    let result: any;
    let error: Exception.ValidationException;
    beforeEach(() => {
      data = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "T",
      };
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
        expect(error).toBeInstanceOf(Exception.ValidationException);
      });
    });
  });
});

given(`Validate.node static method availability test`, () => {
  then("Validate.node is defined", () => {
    expect(Validate.node).toBeDefined();
  });
  and("Validate.node is defined", () => {
    then("Validate.node is a function", () => {
      expect(Validate.node).toBeInstanceOf(Function);
    });
  });
});

given(`Validate.node static method behavior test`, () => {
  when("Validate.node(node)", () => {
    and("node is undefined", () => {
      let response: INode;
      let error: Exception.Exception;
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
    and("node is valid node with coordinates", () => {
      let node: INode;
      let response: INode;
      let error: Exception.Exception;
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
    and("node is valid node with no coordinates", () => {
      let node: INode;
      let response: INode;
      let error: Exception.Exception;
      beforeEach(() => {
        node = {
          id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
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
    and("node has invalid id and valid coordinates", () => {
      let node: INode;
      let response: INode;
      let error: Exception.Exception;
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
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    });
    and("node has valid id and invalid coordinates", () => {
      let node: INode;
      let response: INode;
      let error: Exception.Exception;
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
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    });
    and("node has invalid id and invalid coordinates", () => {
      let node: INode;
      let response: INode;
      let error: Exception.Exception;
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
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    });
    and("node has invalid id and no coordinates", () => {
      let node: INode;
      let response: INode;
      let error: Exception.Exception;
      beforeEach(() => {
        const x = "invalid" as any;
        node = {
          id: "invalid",
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
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    });
  });
});

given(`Validate.edge static method availability test`, () => {
  then("Validate.edge is defined", () => {
    expect(Validate.edge).toBeDefined();
  });
  and("Validate.edge is defined", () => {
    then("Validate.edge is a function", () => {
      expect(Validate.edge).toBeInstanceOf(Function);
    });
  });
});

given(`Validate.edge static method behavior test`, () => {
  when(`Validate.edge(edge)`, () => {
    and("edge is undefined", () => {
      let response: IEdge;
      let error: Exception.Exception;
      beforeEach(() => {
        try {
          response = Validate.edge() as IEdge;
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
    and("edge is valid edge with coordinates", () => {
      let edge: IEdge;
      let response: IEdge;
      let error: Exception.Exception;
      beforeEach(() => {
        edge = {
          id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          target: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
          coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        };
        try {
          response = Validate.edge<IEdge>(edge) as IEdge;
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
        then("response equals edge", () => {
          expect(response).toEqual(edge);
        });
      });
    });
    and("edge is valid edge with no coordinates", () => {
      let edge: IEdge;
      let response: IEdge;
      let error: Exception.Exception;
      beforeEach(() => {
        edge = {
          id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          target: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
        };
        try {
          response = Validate.edge<IEdge>(edge) as IEdge;
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
        then("response equals edge", () => {
          expect(response).toEqual(edge);
        });
      });
    });
    and("edge has invalid id with coordinates", () => {
      let edge: IEdge;
      let response: IEdge;
      let error: Exception.Exception;
      beforeEach(() => {
        edge = {
          id: "invalid",
          source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          target: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
          coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        };
        try {
          response = Validate.edge<IEdge>(edge) as IEdge;
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
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    });
    and("edge has invalid id with no coordinates", () => {
      let edge: IEdge;
      let response: IEdge;
      let error: Exception.Exception;
      beforeEach(() => {
        edge = {
          id: "invalid",
          source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          target: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
        };
        try {
          response = Validate.edge<IEdge>(edge) as IEdge;
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
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    });
    and("edge has invalid source with coordinates", () => {
      let edge: IEdge;
      let response: IEdge;
      let error: Exception.Exception;
      beforeEach(() => {
        edge = {
          id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          source: "invalid",
          target: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
          coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        };
        try {
          response = Validate.edge<IEdge>(edge) as IEdge;
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
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    });
    and("edge has invalid source with no coordinates", () => {
      let edge: IEdge;
      let response: IEdge;
      let error: Exception.Exception;
      beforeEach(() => {
        edge = {
          id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          source: "invalid",
          target: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
        };
        try {
          response = Validate.edge<IEdge>(edge) as IEdge;
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
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    });
    and("edge has invalid target with coordinates", () => {
      let edge: IEdge;
      let response: IEdge;
      let error: Exception.Exception;
      beforeEach(() => {
        edge = {
          id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          target: "invalid",
          coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        };
        try {
          response = Validate.edge<IEdge>(edge) as IEdge;
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
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    });
    and("edge has invalid target with no coordinates", () => {
      let edge: IEdge;
      let response: IEdge;
      let error: Exception.Exception;
      beforeEach(() => {
        edge = {
          id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          target: "invalid",
        };
        try {
          response = Validate.edge<IEdge>(edge) as IEdge;
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
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    });
    and("edge has invalid start coordinates", () => {
      let edge: IEdge;
      let response: IEdge;
      let error: Exception.Exception;
      beforeEach(() => {
        const x = "invalid" as any;
        edge = {
          id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          target: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
          coordinates: { start: { x, y: 0 }, end: { x: 1, y: 1 } },
        };
        try {
          response = Validate.edge<IEdge>(edge) as IEdge;
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
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    });
    and("edge has invalid end coordinates", () => {
      let edge: IEdge;
      let response: IEdge;
      let error: Exception.Exception;
      beforeEach(() => {
        const x = "invalid" as any;
        edge = {
          id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          target: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
          coordinates: { start: { x: 0, y: 0 }, end: { x, y: 1 } },
        };
        try {
          response = Validate.edge<IEdge>(edge) as IEdge;
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
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    });
  });
});

given(`Validate.nodes static method availability test`, () => {
  then("Validate.nodes is defined", () => {
    expect(Validate.nodes).toBeDefined();
  });
  and("Validate.nodes is defined", () => {
    then("Validate.nodes is a function", () => {
      expect(Validate.nodes).toBeInstanceOf(Function);
    });
  });
});

given(`Validate.nodes static method behavior test`, () => {
  when("Validate.nodes called with valid nodes", () => {
    let nodes: INode[];
    let response: INode[];
    let error: Exception.Exception;
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
    let error: Exception.Exception;
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
        expect(error).toBeInstanceOf(Exception.ValidationException);
      });
    });
  });
  when(
    "Validate.nodes called with invalid coordinates in nodes",
    () => {
      let nodes: INode[];
      let response: INode[];
      let error: Exception.Exception;
      beforeEach(() => {
        nodes = [
          {
            id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
            coordinates: {
              x: "invalid",
              y: 0,
            } as unknown as Coordinates,
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
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    }
  );
  when("Validate.nodes called with duplicate ids in nodes", () => {
    let nodes: INode[];
    let response: INode[];
    let error: Exception.Exception;
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
        expect(error).toBeInstanceOf(Exception.ValidationException);
      });
    });
  });
  when(
    "Validate.nodes called with duplicate coordinates in nodes",
    () => {
      let nodes: INode[];
      let response: INode[];
      let error: Exception.Exception;
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
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    }
  );
});

given(`Validate.nodes static method behavior test`, () => {
  when("Validate.nodes(nodes)", () => {
    and("nodes are valid nodes with coordinates", () => {
      let nodes: INode[];
      let response: INode[];
      let error: Exception.Exception;
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
    and("nodes are valid nodes with no coordinates", () => {
      let nodes: INode[];
      let response: INode[];
      let error: Exception.Exception;
      beforeEach(() => {
        nodes = [
          {
            id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          },
          {
            id: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
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
    and("nodes has invalid ids and valid coordinates", () => {
      let nodes: INode[];
      let response: INode[];
      let error: Exception.Exception;
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
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    });
    and("nodes has invalid ids and no coordinates", () => {
      let nodes: INode[];
      let response: INode[];
      let error: Exception.Exception;
      beforeEach(() => {
        nodes = [
          {
            id: "invalid",
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
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    });
    and("nodes has valid ids and invalid coordinates", () => {
      let nodes: INode[];
      let response: INode[];
      let error: Exception.Exception;
      beforeEach(() => {
        nodes = [
          {
            id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
            coordinates: {
              x: "invalid",
              y: 0,
            } as unknown as Coordinates,
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
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    });
    and("nodes has duplicate ids and valid coordinates", () => {
      let nodes: INode[];
      let response: INode[];
      let error: Exception.Exception;
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
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    });
    and("nodes has valid ids and duplicate coordinates", () => {
      let nodes: INode[];
      let response: INode[];
      let error: Exception.Exception;
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
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    });
  });
});

given(`Validate.edges static method availability test`, () => {
  then("Validate.edges is defined", () => {
    expect(Validate.edges).toBeDefined();
  });
  and("Validate.edges is defined", () => {
    then("Validate.edges is a function", () => {
      expect(Validate.edges).toBeInstanceOf(Function);
    });
  });
});

given(`Validate.edges static method behavior test`, () => {
  when("Validate.edges called with valid edges", () => {
    let edges: IEdge[];
    let response: IEdge[];
    let error: Exception.Exception;
    beforeEach(() => {
      edges = [
        {
          id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          target: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
          coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        },
        {
          id: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
          source: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
          target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          coordinates: { start: { x: 1, y: 1 }, end: { x: 0, y: 0 } },
        },
      ];
      try {
        response = Validate.edges(edges) as IEdge[];
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
      then("response equals edges", () => {
        expect(response).toEqual(edges);
      });
    });
  });
  when("Validate.edges called with invalid id in edges", () => {
    let edges: IEdge[];
    let response: IEdge[];
    let error: Exception.Exception;
    beforeEach(() => {
      edges = [
        {
          id: "1",
          source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          target: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
          coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        },
        {
          id: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
          source: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
          target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          coordinates: { start: { x: 1, y: 1 }, end: { x: 0, y: 0 } },
        },
      ];
      try {
        response = Validate.edges(edges) as IEdge[];
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
        expect(error).toBeInstanceOf(Exception.ValidationException);
      });
    });
  });
  when("Validate.edges called with invalid source in edges", () => {
    let edges: IEdge[];
    let response: IEdge[];
    let error: Exception.Exception;
    beforeEach(() => {
      edges = [
        {
          id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          source: "1",
          target: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
          coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        },
        {
          id: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
          source: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
          target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          coordinates: { start: { x: 1, y: 1 }, end: { x: 0, y: 0 } },
        },
      ];
      try {
        response = Validate.edges(edges) as IEdge[];
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
        expect(error).toBeInstanceOf(Exception.ValidationException);
      });
    });
  });
  when("Validate.edges called with invalid target in edges", () => {
    let edges: IEdge[];
    let response: IEdge[];
    let error: Exception.Exception;
    beforeEach(() => {
      edges = [
        {
          id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          target: "1",
          coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        },
        {
          id: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
          source: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
          target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          coordinates: { start: { x: 1, y: 1 }, end: { x: 0, y: 0 } },
        },
      ];
      try {
        response = Validate.edges(edges) as IEdge[];
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

    and("response is defined", () => {
      then("error is an instance of ValidationException", () => {
        expect(error).toBeInstanceOf(Exception.ValidationException);
      });
    });
  });
  when(
    "Validate.edges called with invalid start coordinates in edges",
    () => {
      let edges: IEdge[];
      let response: IEdge[];
      let error: Exception.Exception;
      beforeEach(() => {
        edges = [
          {
            id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
            source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
            target: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
            coordinates: {
              start: { x: "invalid" as unknown as number, y: 0 },
              end: { x: 1, y: 1 },
            },
          },
          {
            id: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
            source: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
            target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
            coordinates: {
              start: { x: 1, y: 1 },
              end: { x: 0, y: 0 },
            },
          },
        ];
        try {
          response = Validate.edges(edges) as IEdge[];
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

      and("response is defined", () => {
        then("error is an instance of ValidationException", () => {
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    }
  );
  when(
    "Validate.edges called with invalid end coordinates in edges",
    () => {
      let edges: IEdge[];
      let response: IEdge[];
      let error: Exception.Exception;
      beforeEach(() => {
        edges = [
          {
            id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
            source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
            target: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
            coordinates: {
              start: { x: 0, y: 0 },
              end: { x: "invalid" as unknown as number, y: 1 },
            },
          },
          {
            id: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
            source: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
            target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
            coordinates: {
              start: { x: 1, y: 1 },
              end: { x: 0, y: 0 },
            },
          },
        ];
        try {
          response = Validate.edges(edges) as IEdge[];
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

      and("response is defined", () => {
        then("error is an instance of ValidationException", () => {
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    }
  );
  when("Validate.edges called with duplicate ids in edges", () => {
    let edges: IEdge[];
    let response: IEdge[];
    let error: Exception.Exception;
    beforeEach(() => {
      edges = [
        {
          id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          target: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
          coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        },
        {
          id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          source: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
          target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          coordinates: { start: { x: 1, y: 1 }, end: { x: 0, y: 0 } },
        },
      ];
      try {
        response = Validate.edges(edges) as IEdge[];
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

    and("response is defined", () => {
      then("error is an instance of ValidationException", () => {
        expect(error).toBeInstanceOf(Exception.ValidationException);
      });
    });
  });
});

given(`Validate.edgeDetails static method availability test`, () => {
  then("Validate.edgeDetails is defined", () => {
    expect(Validate.edgeDetails).toBeDefined();
  });
  and("Validate.edgeDetails is defined", () => {
    then("Validate.edgeDetails is a function", () => {
      expect(Validate.edgeDetails).toBeInstanceOf(Function);
    });
  });
});

given(`Validate.edgesDetails static method behavior test`, () => {
  when(`Validate.edgeDetails called with valid data`, () => {
    let data: PartialEdge<IEdge>;
    let result: PartialEdge<IEdge>;
    let error: Exception.Exception;
    beforeEach(() => {
      data = {
        source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        target: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
      };
      try {
        result = Validate.edgeDetails(data);
      } catch (e) {
        error = e;
      }
    });
    then(`error is undefined`, () => {
      expect(error).toBeUndefined();
    });
    and(`result is defined`, () => {
      then(`result equals data`, () => {
        expect(result).toEqual(data);
      });
    });
  });
  when(
    `Validate.edgeDetails called with data containing valid source`,
    () => {
      let data: PartialEdge<IEdge>;
      let result: PartialEdge<IEdge>;
      let error: Exception.Exception;
      beforeEach(() => {
        data = {
          source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        };
        try {
          result = Validate.edgeDetails(data);
        } catch (e) {
          error = e;
        }
      });
      then(`error is undefined`, () => {
        expect(error).toBeUndefined();
      });
      and(`result is defined`, () => {
        then(`result equals data`, () => {
          expect(result).toEqual(data);
        });
      });
    }
  );
  when(
    `Validate.edgeDetails called with data containing valid target`,
    () => {
      let data: PartialEdge<IEdge>;
      let result: PartialEdge<IEdge>;
      let error: Exception.Exception;
      beforeEach(() => {
        data = {
          target: "11b6679a-fd9d-4036-b1ab-af0b932fc923",
        };
        try {
          result = Validate.edgeDetails(data);
        } catch (e) {
          error = e;
        }
      });
      then(`error is undefined`, () => {
        expect(error).toBeUndefined();
      });
      and(`result is defined`, () => {
        then(`result equals data`, () => {
          expect(result).toEqual(data);
        });
      });
    }
  );
  when(
    `Validate.edgeDetails called with data containing valid start coordinates`,
    () => {
      let data: PartialEdge<IEdge>;
      let result: PartialEdge<IEdge>;
      let error: Exception.Exception;
      beforeEach(() => {
        data = {
          coordinates: { start: { x: 0, y: 0 } } as any,
        };
        try {
          result = Validate.edgeDetails(data);
        } catch (e) {
          error = e;
        }
      });
      then(`error is undefined`, () => {
        expect(error).toBeUndefined();
      });
      and(`result is defined`, () => {
        then(`result equals data`, () => {
          expect(result).toEqual(data);
        });
      });
    }
  );
  when(
    `Validate.edgeDetails called with data containing valid end coordinates`,
    () => {
      let data: PartialEdge<IEdge>;
      let result: PartialEdge<IEdge>;
      let error: Exception.Exception;
      beforeEach(() => {
        data = {
          coordinates: { end: { x: 0, y: 0 } } as any,
        };
        try {
          result = Validate.edgeDetails(data);
        } catch (e) {
          error = e;
        }
      });
      then(`error is undefined`, () => {
        expect(error).toBeUndefined();
      });
      and(`result is defined`, () => {
        then(`result equals data`, () => {
          expect(result).toEqual(data);
        });
      });
    }
  );
  when(
    `Validate.edgeDetails called with data containing invalid source`,
    () => {
      let data: PartialEdge<IEdge>;
      let result: PartialEdge<IEdge>;
      let error: Exception.Exception;
      beforeEach(() => {
        data = {
          source: "invalid",
        };
        try {
          result = Validate.edgeDetails(data);
        } catch (e) {
          error = e;
        }
      });
      then(`error is defined`, () => {
        expect(error).toBeDefined();
      });
      and(`result is undefined`, () => {
        then(
          `error is an instance of InvalidArgumentException`,
          () => {
            expect(error).toBeInstanceOf(
              Exception.InvalidArgumentException
            );
          }
        );
      });
    }
  );
  when(
    `Validate.edgeDetails called with data containing invalid target`,
    () => {
      let data: PartialEdge<IEdge>;
      let result: PartialEdge<IEdge>;
      let error: Exception.Exception;
      beforeEach(() => {
        data = {
          target: "invalid",
        };
        try {
          result = Validate.edgeDetails(data);
        } catch (e) {
          error = e;
        }
      });
      then(`error is defined`, () => {
        expect(error).toBeDefined();
      });
      and(`result is undefined`, () => {
        then(
          `error is an instance of InvalidArgumentException`,
          () => {
            expect(error).toBeInstanceOf(
              Exception.InvalidArgumentException
            );
          }
        );
      });
    }
  );
  when(
    `Validate.edgeDetails called with data containing invalid start coordinates`,
    () => {
      let data: PartialEdge<IEdge>;
      let result: PartialEdge<IEdge>;
      let error: Exception.Exception;
      beforeEach(() => {
        data = {
          coordinates: {
            start: { x: "invalid" as any, y: 0 },
          } as any,
        };
        try {
          result = Validate.edgeDetails(data);
        } catch (e) {
          error = e;
        }
      });
      then(`error is defined`, () => {
        expect(error).toBeDefined();
      });
      and(`result is undefined`, () => {
        then(
          `error is an instance of InvalidArgumentException`,
          () => {
            expect(error).toBeInstanceOf(
              Exception.InvalidArgumentException
            );
          }
        );
      });
    }
  );
  when(
    `Validate.edgeDetails called with data containing invalid end coordinates`,
    () => {
      let data: PartialEdge<IEdge>;
      let result: PartialEdge<IEdge>;
      let error: Exception.Exception;
      beforeEach(() => {
        data = {
          coordinates: { end: { x: "invalid" as any, y: 0 } } as any,
        };
        try {
          result = Validate.edgeDetails(data);
        } catch (e) {
          error = e;
        }
      });
      then(`error is defined`, () => {
        expect(error).toBeDefined();
      });
      and(`result is undefined`, () => {
        then(
          `error is an instance of InvalidArgumentException`,
          () => {
            expect(error).toBeInstanceOf(
              Exception.InvalidArgumentException
            );
          }
        );
      });
    }
  );
});

given(`Validate.graph static method availability test`, () => {
  then("Validate.graph is defined", () => {
    expect(Validate.graph).toBeDefined();
  });
  and("Validate.graph is defined", () => {
    then("Validate.graph is a function", () => {
      expect(Validate.graph).toBeInstanceOf(Function);
    });
  });
});

given(`Validate.graph static method behavior test`, () => {
  when(`Validate.graph called with no arguments`, () => {
    let response: Partial<IGraph>;
    let error: Exception.Exception;
    beforeEach(() => {
      try {
        response = Validate.graph() as Partial<IGraph>;
      } catch (e) {
        error = e;
      }
    });
    then(`error is undefined`, () => {
      expect(error).toBeUndefined();
    });
    and(`response is undefined`, () => {
      then(`response is undefined`, () => {
        expect(response).toBeUndefined();
      });
    });
  });
  when(`Validate.graph called with valid graph`, () => {
    let graph: Partial<IGraph>;
    let response: Partial<IGraph>;
    let error: Exception.Exception;
    beforeEach(() => {
      graph = {
        metadata: {
          id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          name: "graph",
        },
      };
      try {
        response = Validate.graph<IGraph>(graph);
      } catch (e) {
        error = e;
      }
    });
    then(`error is undefined`, () => {
      expect(error).toBeUndefined();
    });
    and(`response is defined`, () => {
      then(`response equals graph`, () => {
        expect(response).toEqual(graph);
      });
    });
  });
  when(`Validate.graph called with graph with metadata with no id`, () => {
    let graph: Partial<IGraph>;
    let response: Partial<IGraph>;
    let error: Exception.Exception;
    beforeEach(() => {
      graph = {
        metadata: { name: "graph" },
      } as Partial<IGraph>;
      try {
        response = Validate.graph<IGraph>(graph);
      } catch (e) {
        error = e;
      }
    });
    then(`error is undefined`, () => {
      expect(error).toBeUndefined();
    });
    then(`response equals graph`, () => {
      expect(response).toEqual(graph);
    });
  });
  when(`Validate.graph called with graph with metadata with id null`, () => {
    let graph: Partial<IGraph>;
    let response: Partial<IGraph>;
    let error: Exception.Exception;
    beforeEach(() => {
      graph = {
        metadata: { id: null, name: "graph" },
      };
      try {
        response = Validate.graph<IGraph>(graph);
      } catch (e) {
        error = e;
      }
    });
    then(`error is undefined`, () => {
      expect(error).toBeUndefined();
    });
    then(`response equals graph`, () => {
      expect(response).toEqual(graph);
    });
  });
  when(`Validate.graph called with graph with no metadata`, () => {
    let graph: Partial<IGraph>;
    let response: Partial<IGraph>;
    let error: Exception.Exception;
    beforeEach(() => {
      graph = { nodes: [], edges: [] };
      try {
        response = Validate.graph<IGraph>(graph);
      } catch (e) {
        error = e;
      }
    });
    then(`error is undefined`, () => {
      expect(error).toBeUndefined();
    });
    then(`response equals graph`, () => {
      expect(response).toEqual(graph);
    });
  });
  when(`Validate.graph called with invalid graph`, () => {
    let graph: Partial<IGraph>;
    let response: Partial<IGraph>;
    let error: Exception.Exception;
    beforeEach(() => {
      graph = {
        metadata: {
          id: "invalid",
          name: "graph",
        },
      };
      try {
        response = Validate.graph<IGraph>(graph);
      } catch (e) {
        error = e;
      }
    });

    then(`response is undefined`, () => {
      expect(response).toBeUndefined();
    });
    then(`error is defined`, () => {
      expect(error).toBeDefined();
    });

    and(`error is defined`, () => {
      then(`error is an instance of ValidationException`, () => {
        expect(error).toBeInstanceOf(Exception.ValidationException);
      });
    });
  });
});

given(`Validate.graphDetails static method availability test`, () => {
  then("Validate.graphDetails is defined", () => {
    expect(Validate.graphDetails).toBeDefined();
  });
  and("Validate.graphDetails is defined", () => {
    then("Validate.graphDetails is a function", () => {
      expect(Validate.graphDetails).toBeInstanceOf(Function);
    });
  });
});

given(`Validate.graphDetails static method behavior test`, () => {
  when(`Validate.graphDetails called with valid graph`, () => {
    let graph;
    let response: Partial<IGraph>;
    let error: Exception.Exception;
    beforeEach(() => {
      graph = {
        metadata: {
          name: "graph",
        },
      };
      try {
        response = Validate.graphDetails<IGraph>(graph);
      } catch (e) {
        error = e;
      }
    });
    then(`error is undefined`, () => {
      expect(error).toBeUndefined();
    });
    and(`response is defined`, () => {
      then(`response equals graph`, () => {
        expect(response).toEqual(graph);
      });
    });
  });
  when(`Validate.graphDetails called with invalid graph`, () => {
    let graph: Partial<IGraph>;
    let response: Partial<IGraph>;
    let error: Exception.Exception;
    beforeEach(() => {
      graph = {
        metadata: {
          id: "invalid",
          name: "graph",
        },
      };
      try {
        response = Validate.graphDetails<IGraph>(graph);
      } catch (e) {
        error = e;
      }
    });

    then(`response is undefined`, () => {
      expect(response).toBeUndefined();
    });
    then(`error is defined`, () => {
      expect(error).toBeDefined();
    });

    and(`error is defined`, () => {
      then(`error is an instance of InvalidArgumentException`, () => {
        expect(error).toBeInstanceOf(
          Exception.InvalidArgumentException
        );
      });
    });
  });
});
