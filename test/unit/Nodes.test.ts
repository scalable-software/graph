import { Type, Spec } from "./Helper.js";

const given = (description, spec) => describe(`Given ${description}`, spec);
const and = (description, spec) => describe(`and ${description}`, spec);
const when = (description, spec) => describe(`when ${description}`, spec);
const then = (description, spec) => it(`then ${description}`, spec);

import { Nodes, Exception } from "@scalable.software/graph";
import type { INode, UUID } from "@scalable.software/graph";

given(`Nodes ${Type.CLASS} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`Nodes is imported`, () => {
    then(`Nodes is defined`, () => {
      expect(Nodes).toBeDefined();
    });
    and(`Nodes is defined`, () => {
      then(`Nodes is an instance of Function`, () => {
        expect(Nodes).toBeInstanceOf(Function);
      });
    });
  });
});

given(`Nodes ${Type.CLASS} ${Spec.INSTANTIATION} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.INSTANTIATION);
  });
  when("a nodes instance is created", () => {
    let nodes: Nodes<INode>;
    beforeEach(() => {
      nodes = new Nodes();
    });
    then("nodes is defined", () => {
      expect(nodes).toBeDefined();
    });
    and("nodes is defined", () => {
      then("nodes is an instance of Nodes", () => {
        expect(nodes).toBeInstanceOf(Nodes);
      });
      then("nodes is an instance of Array", () => {
        expect(nodes).toBeInstanceOf(Array);
      });
    });
  });
});

given(`Nodes create ${Type.STATIC_METHOD} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`Nodes is imported`, () => {
    then(`Nodes.create is defined`, () => {
      expect(Nodes.create).toBeDefined();
    });
    and(`Nodes.create is defined`, () => {
      then(`Nodes.create is an instance of Function`, () => {
        expect(Nodes.create).toBeInstanceOf(Function);
      });
    });
  });
});

given(`Nodes create ${Type.STATIC_METHOD} ${Spec.BEHAVIOR} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.STATIC_METHOD);
    setSpecProperty("spec", Spec.BEHAVIOR);
  });
  when("Nodes.create is called", () => {
    let nodes: Nodes<INode>;
    beforeEach(() => {
      nodes = Nodes.create();
    });
    then("nodes is defined", () => {
      expect(nodes).toBeDefined();
    });
    and("nodes is defined", () => {
      then("nodes is an instance of Nodes", () => {
        expect(nodes).toBeInstanceOf(Nodes);
      });
      and("nodes is an instance of Nodes", () => {
        then("nodes.length is 0", () => {
          expect(nodes.length).toBe(0);
        });
      });
    });
  });
  when("Nodes.create() is called with valid nodes", () => {
    let nodes: Nodes<INode>;
    let data: INode[];
    beforeEach(() => {
      data = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 1, y: 1 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d745",
          coordinates: { x: 2, y: 3 },
        },
      ];
      nodes = Nodes.create(data);
    });
    then("nodes is defined", () => {
      expect(nodes).toBeDefined();
    });
    and("nodes is defined", () => {
      then("nodes is an instance of Nodes", () => {
        expect(nodes).toBeInstanceOf(Nodes);
      });
      and("nodes is an instance of Nodes", () => {
        then("nodes.length is data.length", () => {
          expect(nodes.length).toBe(data.length);
        });
        then("nodes contains is data", () => {
          nodes.forEach((node, index) => {
            expect(node).toEqual(data[index]);
          });
        });
      });
    });
  });
  when("Nodes.create() is called with invalid nodes", () => {
    let nodes: INode[];
    let error: Exception.Exception;
    beforeEach(() => {
      nodes = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 1, y: 1 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d745",
          coordinates: { x: 2, y: 3 },
        },
        {
          id: "1",
          coordinates: { x: 2, y: 3 },
        },
      ];
      try {
        nodes = Nodes.create(nodes);
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
        then("error.errors[0] is Exception.ValidationException", () => {
          expect(error.errors[0]).toBeInstanceOf(
            Exception.InvalidArgumentException
          );
        });
        and("error.errors[0] is Exception.InvalidArgumentException", () => {
          then("error.errors[0].message is 'Invalid argument: id'", () => {
            expect(error.errors[0].message).toBe(
              "Invalid argument: id - must be a valid UUID"
            );
          });
        });
      });
    });
  });
  when("Nodes.create() is called with duplicate nodes", () => {
    let nodes: INode[];
    let error: Exception.Exception;
    beforeEach(() => {
      nodes = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 1, y: 1 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d745",
          coordinates: { x: 2, y: 3 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d745",
          coordinates: { x: 2, y: 3 },
        },
      ];
      try {
        nodes = Nodes.create(nodes);
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
        then("error.errors[0] is Exception.DuplicateException", () => {
          expect(error.errors[0]).toBeInstanceOf(Exception.DuplicateException);
        });
        and("error.errors[0] is Exception.DuplicateException", () => {
          then(
            "error.errors[0].message is 'Duplicate found: ${JSON.stringify(nodes[3])}",
            () => {
              expect(error.errors[0].message).toBe(
                `Duplicate found: ${JSON.stringify(nodes[3])}`
              );
            }
          );
        });
      });
    });
  });
});

given(`nodes.add ${Type.METHOD} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.METHOD);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`nodes instance is created`, () => {
    let nodes: Nodes<INode>;
    beforeEach(() => {
      nodes = new Nodes();
    });
    then(`nodes.add is defined`, () => {
      expect(nodes.add).toBeDefined();
    });
  });
});

given(`nodes.add ${Type.METHOD} ${Spec.BEHAVIOR} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.METHOD);
    setSpecProperty("spec", Spec.BEHAVIOR);
  });
  and(`nodes instance is created`, () => {
    let nodes: Nodes<INode>;
    beforeEach(() => {
      nodes = Nodes.create();
    });
    and(`nodes.add is defined`, () => {
      when(`nodes.add called with valid nodes`, () => {
        let data: INode[];
        beforeEach(() => {
          data = [
            {
              id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
              coordinates: { x: 0, y: 0 },
            },
            {
              id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
              coordinates: { x: 1, y: 1 },
            },
          ];
          nodes.add(data);
        });
        then(`nodes.length is data.length`, () => {
          expect(nodes.length).toBe(data.length);
        });
        and(`nodes.length is data.length`, () => {
          then(`nodes contains data`, () => {
            nodes.forEach((node, index) => {
              expect(node).toEqual(data[index]);
            });
          });
        });
      });
      when(`nodes.add called with nodes having no ids`, () => {
        let data: Omit<INode, "id">[];
        let result: INode[];
        let error: Exception.Exception;
        beforeEach(() => {
          data = [
            {
              coordinates: { x: 0, y: 0 },
            },
            {
              coordinates: { x: 1, y: 1 },
            },
          ];
          try {
            nodes.add(data);
          } catch (e) {
            error = e;
          }
        });
        then(`error is undefined`, () => {
          expect(error).toBeUndefined();
        });
        then(`nodes.length is equal to data.length`, () => {
          expect(nodes.length).toBe(data.length);
        });
        and(`nodes.length is equal to data.length`, () => {
          then(`each node in node has an id`, () => {
            nodes.forEach((node) => {
              expect(node.id).toBeDefined();
            });
          });
        });
      });
      when(`nodes.add called with duplicate nodes`, () => {
        let data: INode[];
        let error: Exception.Exception;
        beforeEach(() => {
          data = [
            {
              id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
              coordinates: { x: 0, y: 0 },
            },
            {
              id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
              coordinates: { x: 0, y: 0 },
            },
          ];
          try {
            nodes.add(data);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(`error is an instance of Exception.ValidationException`, () => {
            expect(error).toBeInstanceOf(Exception.ValidationException);
          });
          and(`error is an instance of Exception.ValidationException`, () => {
            then(
              `error.message is 'Validation failed with 2 error(s).'`,
              () => {
                expect(error.message).toBe(
                  "Validation failed with 2 error(s)."
                );
              }
            );
          });
        });
      });
      when(`nodes.add called with valid node`, () => {
        let data: INode;
        beforeEach(() => {
          data = {
            id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
            coordinates: { x: 0, y: 0 },
          };
          nodes.add(data);
        });
        then(`nodes.length is 1`, () => {
          expect(nodes.length).toBe(1);
        });
        and(`nodes.length is 1`, () => {
          then(`nodes contains data`, () => {
            expect(nodes[0]).toEqual(data);
          });
        });
      });
      when(`nodes.add called with nodes having invalid id`, () => {
        let data: INode[];
        let error: Exception.Exception;
        beforeEach(() => {
          data = [
            {
              id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
              coordinates: { x: 0, y: 0 },
            },
            {
              id: "1",
              coordinates: { x: 1, y: 1 },
            },
          ];
          try {
            nodes.add(data);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(`error is an instance of Exception.ValidationException`, () => {
            expect(error).toBeInstanceOf(Exception.ValidationException);
          });
          and(`error is an instance of Exception.ValidationException`, () => {
            then(
              `error.message is 'Validation failed with 1 error(s).'`,
              () => {
                expect(error.message).toBe(
                  "Validation failed with 1 error(s)."
                );
              }
            );
          });
        });
      });
      when(
        `nodes.add called with nodes having invalid string x coordinates`,
        () => {
          let data: INode[];
          let error: Exception.Exception;
          beforeEach(() => {
            data = [
              {
                id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
                coordinates: { x: 0, y: 0 },
              },
              {
                id: "a5f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a2d",
                coordinates: { x: "1" as unknown as number, y: 0 },
              },
            ];
            try {
              nodes.add(data);
            } catch (e) {
              error = e;
            }
          });
          then(`error is defined`, () => {
            expect(error).toBeDefined();
          });
          and(`error is defined`, () => {
            then(
              `error is an instance of Exception.ValidationException`,
              () => {
                expect(error).toBeInstanceOf(Exception.ValidationException);
              }
            );
            and(`error is an instance of Exception.ValidationException`, () => {
              then(
                `error.message is 'Validation failed with 1 error(s).'`,
                () => {
                  expect(error.message).toBe(
                    "Validation failed with 1 error(s)."
                  );
                }
              );
            });
          });
        }
      );
    });
  });
  and(`nodes instance is created with nodes`, () => {
    let data: INode[];
    let nodes: Nodes<INode>;
    beforeEach(() => {
      data = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 1, y: 1 },
        },
      ];
      nodes = Nodes.create(data);
    });
    and(`nodes.add is defined`, () => {
      when(`nodes.add called with new valid nodes`, () => {
        let data: INode[];
        beforeEach(() => {
          data = [
            {
              id: "2e9c2b68-7d53-4e99-b6c3-2f98a1e4d745",
              coordinates: { x: 2, y: 2 },
            },
            {
              id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d745",
              coordinates: { x: 2, y: 3 },
            },
          ];
          nodes.add(data);
        });
        then(`nodes.length is 4`, () => {
          expect(nodes.length).toBe(4);
        });
      });
      when(`nodes.add called with existing valid nodes`, () => {
        let data: INode[];
        let error: Exception.Exception;
        beforeEach(() => {
          data = [
            {
              id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
              coordinates: { x: 0, y: 0 },
            },
            {
              id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
              coordinates: { x: 1, y: 1 },
            },
          ];
          try {
            nodes.add(data);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(`error is an instance of Exception.ValidationException`, () => {
            expect(error).toBeInstanceOf(Exception.ValidationException);
          });
          and(`error is an instance of Exception.ValidationException`, () => {
            then(
              `error.message is 'Validation failed with 2 error(s).'`,
              () => {
                expect(error.message).toBe(
                  "Validation failed with 2 error(s)."
                );
              }
            );
            and(`error.message is 'Validation failed with 2 error(s).'`, () => {
              then(`error.errors[0] is Exception.DuplicateException`, () => {
                expect(error.errors[0]).toBeInstanceOf(
                  Exception.DuplicateException
                );
              });
            });
          });
        });
      });
    });
  });
});

given(`nodes.remove ${Type.METHOD} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.METHOD);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`nodes instance is created with nodes`, () => {
    let nodes: Nodes<INode>;
    let data: INode[];
    beforeEach(() => {
      data = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 1, y: 1 },
        },
      ];
      nodes = Nodes.create(data);
    });
    then(`nodes.remove is defined`, () => {
      expect(nodes.remove).toBeDefined();
    });
    and(`nodes.remove is defined`, () => {
      then(`nodes.remove is an instance of Function`, () => {
        expect(nodes.remove).toBeInstanceOf(Function);
      });
    });
  });
});

given(`nodes.remove ${Type.METHOD} ${Spec.BEHAVIOR} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.METHOD);
    setSpecProperty("spec", Spec.BEHAVIOR);
  });
  and(`nodes instance is created with nodes`, () => {
    let nodes: Nodes<INode>;
    let data: INode[];
    beforeEach(() => {
      data = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 1, y: 1 },
        },
      ];
      nodes = Nodes.create(data);
    });
    when(`nodes.remove called with valid id`, () => {
      let id: UUID;
      beforeEach(() => {
        id = data[0].id;
        nodes.remove(id);
      });
      then(`nodes does not contain node with id`, () => {
        expect(nodes.find((node) => node.id === id)).toBeUndefined();
      });
    });
    when(`nodes.remove called with invalid id`, () => {
      let id: UUID;
      let error: Exception.Exception;
      beforeEach(() => {
        id = "1";
        try {
          nodes.remove(id);
        } catch (e) {
          error = e;
        }
      });
      then(`error is defined`, () => {
        expect(error).toBeDefined();
      });
      and(`error is defined`, () => {
        then(
          `error is an instance of Exception.InvalidArgumentException`,
          () => {
            expect(error).toBeInstanceOf(Exception.InvalidArgumentException);
          }
        );
        and(
          `error is an instance of Exception.InvalidArgumentException`,
          () => {
            then(
              `error.message is 'Invalid argument: id - must be a valid UUID'`,
              () => {
                expect(error.message).toBe(
                  "Invalid argument: id - must be a valid UUID"
                );
              }
            );
          }
        );
      });
    });
    when(`nodes.remove called with unknown id`, () => {
      let id: UUID;
      let error: Exception.Exception;
      beforeEach(() => {
        id = "453a4547-e89b-12d3-a456-426614174011";
        try {
          nodes.remove(id);
        } catch (e) {
          error = e;
        }
      });
      then(`error is defined`, () => {
        expect(error).toBeDefined();
      });
      and(`error is defined`, () => {
        then(`error is an instance of Exception.NotFoundException`, () => {
          expect(error).toBeInstanceOf(Exception.NotFoundException);
        });
        and(`error is an instance of Exception.NotFoundException`, () => {
          then(`error.message is 'Not found: ${id}'`, () => {
            expect(error.message).toBe(`Not found: id ${id}`);
          });
        });
      });
    });
  });
});

given(`nodes.findById ${Type.METHOD} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.METHOD);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`nodes instance is created with nodes`, () => {
    let nodes: Nodes<INode>;
    let data: INode[];
    beforeEach(() => {
      data = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 1, y: 1 },
        },
      ];
      nodes = Nodes.create(data);
    });
    then(`nodes.findById is defined`, () => {
      expect(nodes.findById).toBeDefined();
    });
    and(`nodes.findById is defined`, () => {
      then(`nodes.findById is an instance of Function`, () => {
        expect(nodes.findById).toBeInstanceOf(Function);
      });
    });
  });
});

given(`nodes.findById ${Type.METHOD} ${Spec.BEHAVIOR} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.METHOD);
    setSpecProperty("spec", Spec.BEHAVIOR);
  });
  and(`nodes instance is created with nodes`, () => {
    let nodes: Nodes<INode>;
    let data: INode[];
    beforeEach(() => {
      data = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 1, y: 1 },
        },
      ];
      nodes = Nodes.create(data);
    });
    when(`nodes.findById called with existing id`, () => {
      let id: UUID;
      let result: INode;
      beforeEach(() => {
        id = data[0].id;
        result = nodes.findById(id);
      });
      then(`result is defined`, () => {
        expect(result).toBeDefined();
      });
      and(`result is defined`, () => {
        then(`result is equal to data[0]`, () => {
          expect(result).toEqual(data[0]);
        });
      });
    });
    when(`nodes.findById called with unknown id`, () => {
      let id: UUID;
      let result: INode;
      beforeEach(() => {
        id = "453a4547-e89b-12d3-a456-426614174011";
        result = nodes.findById(id);
      });
      then(`result is undefined`, () => {
        expect(result).toBeUndefined();
      });
    });
  });
});
