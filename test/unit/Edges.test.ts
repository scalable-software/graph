import * as help from "./Helper.js";

const given = (description, spec) =>
  describe(`Given ${description}`, () => {
    beforeEach(() => {
      const { context, type, test } = help.metadata(description);
      setSpecProperty("context", context);
      setSpecProperty("type", type);
      setSpecProperty("test", test);
    });
    spec();
  });
const and = (description, spec) => describe(`and ${description}`, spec);
const when = (description, spec) => describe(`when ${description}`, spec);
const then = (description, spec) => it(`then ${description}`, spec);

import type { IEdge } from "@scalable.software/graph";
import { Edges, Exception } from "@scalable.software/graph";

given(`Edges class availability test`, () => {
  and(`Edges is imported`, () => {
    then(`Edges is defined`, () => {
      expect(Edges).toBeDefined();
    });
    and(`Edges is defined`, () => {
      then(`Edges is an instance of Function`, () => {
        expect(Edges).toBeInstanceOf(Function);
      });
    });
  });
});

given(`Edges class instantiation test`, () => {
  when("a nodes instance is created", () => {
    let edges: Edges<IEdge>;
    beforeEach(() => {
      edges = new Edges();
    });
    then("edges is defined", () => {
      expect(edges).toBeDefined();
    });
    and("edges is defined", () => {
      then("edges is an instance of Edges", () => {
        expect(edges).toBeInstanceOf(Edges);
      });
      then("edges is an instance of Array", () => {
        expect(edges).toBeInstanceOf(Array);
      });
    });
  });
});

given(`Edges.create static method availability test`, () => {
  and(`Edges is imported`, () => {
    then(`Edges.create is defined`, () => {
      expect(Edges.create).toBeDefined();
    });
    and(`Edges.create is defined`, () => {
      then(`Edges.create is an instance of Function`, () => {
        expect(Edges.create).toBeInstanceOf(Function);
      });
    });
  });
});

given(`Edges.create static method behavior test`, () => {
  when("Edges.create is called", () => {
    let edges: Edges<IEdge>;
    beforeEach(() => {
      edges = Edges.create();
    });
    then("edges is defined", () => {
      expect(edges).toBeDefined();
    });
    and("edges is defined", () => {
      then("edges is an instance of Edges", () => {
        expect(edges).toBeInstanceOf(Edges);
      });
      and("edges is an instance of Edges", () => {
        then("edges.length is 0", () => {
          expect(edges.length).toBe(0);
        });
      });
    });
  });

  when("Edges.create is called with valid edges", () => {
    let edges: Edges<IEdge>;
    let data: IEdge[];
    beforeEach(() => {
      data = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          target: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
        },
      ];
      edges = Edges.create(data);
    });

    then("edges is defined", () => {
      expect(edges).toBeDefined();
    });

    and("edges is defined", () => {
      then("edges is an instance of Edges", () => {
        expect(edges).toBeInstanceOf(Edges);
      });

      and("edges is an instance of Edges", () => {
        then("edges.length is 1", () => {
          expect(edges.length).toBe(1);
        });

        and("edges.length is 1", () => {
          then("edges[0] is data[0]", () => {
            expect(edges[0]).toEqual(data[0]);
          });
        });
      });
    });
  });

  when("Edges.create is called with invalid edges", () => {
    let edges: Edges<IEdge>;
    let data: IEdge[];
    let error: Exception.Exception;
    beforeEach(() => {
      data = [
        {
          id: "1",
          source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1",
          target: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1",
          coordinates: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
        },
      ];
      try {
        edges = Edges.create(data);
      } catch (e) {
        error = e;
      }
    });

    then("edges is undefined", () => {
      expect(edges).toBeUndefined();
    });
    then("error is defined", () => {
      expect(error).toBeDefined();
    });
  });

  when("Edges.create is called with duplicate edges", () => {
    let edges: Edges<IEdge>;
    let data: IEdge[];
    let error: Exception.Exception;
    beforeEach(() => {
      data = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          target: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
        },
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          target: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
        },
      ];
      try {
        edges = Edges.create(data);
      } catch (e) {
        error = e;
      }
    });

    then("edges is undefined", () => {
      expect(edges).toBeUndefined();
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

given(`edges.add method availability test`, () => {
  when(`an instance of Edges is created`, () => {
    let instance: Edges<IEdge>;
    beforeEach(() => {
      instance = Edges.create();
    });
    then(`instance.add is defined`, () => {
      expect(instance.add).toBeDefined();
    });
  });
});

given(`edges.add method behavior test`, () => {
  and(`an instance of Edges is created`, () => {
    let instance: Edges<IEdge>;
    beforeEach(() => {
      instance = Edges.create();
    });

    when(`instance.add is called with valid edge`, () => {
      let edge: IEdge;
      beforeEach(() => {
        edge = {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          target: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
        };
        instance.add(edge);
      });
      then(`instance.length is 1`, () => {
        expect(instance.length).toBe(1);
      });
      and(`instance.length is 1`, () => {
        then(`instance[0] is edge`, () => {
          expect(instance[0]).toEqual(edge);
        });
      });
    });
    when(`instance.add is called with valid edges`, () => {
      let edges: IEdge[];
      beforeEach(() => {
        edges = [
          {
            id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
            source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
            target: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
            coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
          },
          {
            id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1e",
            source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1e",
            target: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1e",
            coordinates: { start: { x: 1, y: 1 }, end: { x: 2, y: 2 } },
          },
        ];
        instance.add(edges);
      });
      then(`instance.length is 2`, () => {
        expect(instance.length).toBe(2);
      });

      and(`instance.length is 2`, () => {
        then(`instance[0] is edges[0]`, () => {
          expect(instance[0]).toEqual(edges[0]);
        });
        then(`instance[1] is edges[1]`, () => {
          expect(instance[1]).toEqual(edges[1]);
        });
      });
    });
    when(`instance.add is called with edge containing no id`, () => {
      let edge: Omit<IEdge, "id">;
      beforeEach(() => {
        edge = {
          source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          target: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        };
        instance.add(edge);
      });
      then(`instance.length is 1`, () => {
        expect(instance.length).toBe(1);
      });
      and(`instance.length is 1`, () => {
        then(`instance[0].id is defined`, () => {
          expect(instance[0].id).toBeDefined();
        });
      });
    });
    when(`instance.add is called with edges containing no ids`, () => {
      let edges: Omit<IEdge, "id">[];
      beforeEach(() => {
        edges = [
          {
            source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
            target: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
            coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
          },
          {
            source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1e",
            target: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1e",
            coordinates: { start: { x: 1, y: 1 }, end: { x: 2, y: 2 } },
          },
        ];
        instance.add(edges);
      });
      then(`instance.length is 2`, () => {
        expect(instance.length).toBe(2);
      });
      and(`instance.length is 2`, () => {
        then(`instance[0].id is defined`, () => {
          expect(instance[0].id).toBeDefined();
        });
        then(`instance[1].id is defined`, () => {
          expect(instance[1].id).toBeDefined();
        });
      });
    });
    when(`instance.add is called with null`, () => {
      let edge: IEdge;
      let error: Exception.Exception;
      beforeEach(() => {
        try {
          instance.add(null);
        } catch (e) {
          error = e;
        }
      });
      then(`instance.length is 0`, () => {
        expect(instance.length).toBe(0);
      });
      then(`error is defined`, () => {
        expect(error).toBeDefined();
      });

      and(`error is defined`, () => {
        then(`error is an instance of InvalidArgumentException`, () => {
          expect(error).toBeInstanceOf(Exception.InvalidArgumentException);
        });
      });
    });
    when(`instance.add is called with invalid edge`, () => {
      let edge: IEdge;
      let error: Exception.Exception;
      beforeEach(() => {
        edge = {
          id: "1",
          source: "1",
          target: "1",
          coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        };
        try {
          instance.add(edge);
        } catch (e) {
          error = e;
        }
      });
      then(`instance.length is 0`, () => {
        expect(instance.length).toBe(0);
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
});

given(`edges.update method availability test`, () => {
  when(`an instance of Edges is created`, () => {
    let instance: Edges<IEdge>;
    beforeEach(() => {
      instance = Edges.create();
    });
    then(`instance.update is defined`, () => {
      expect(instance.update).toBeDefined();
    });
  });
});
