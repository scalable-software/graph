import { Type, Spec } from "./Helper.js";

const given = (description, spec) => describe(`Given ${description}`, spec);
const and = (description, spec) => describe(`and ${description}`, spec);
const when = (description, spec) => describe(`when ${description}`, spec);
const then = (description, spec) => it(`then ${description}`, spec);

import { Nodes, type INode, Exception } from "@scalable.software/graph";

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
          expect(error.errors[0]).toBeInstanceOf(Exception.ValidationException);
        });
        and("error.errors[0] is Exception.ValidationException", () => {
          then(
            "error.errors[0].errors[0] is Exception.InvalidArgumentException",
            () => {
              expect(error.errors[0].errors[0]).toBeInstanceOf(
                Exception.InvalidArgumentException
              );
            }
          );
          and(
            "error.errors[0].errors[0] is Exception.InvalidArgumentException",
            () => {
              then(
                "error.errors[0].errors[0].message is 'Invalid argument: id'",
                () => {
                  expect(error.errors[0].errors[0].message).toBe(
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
