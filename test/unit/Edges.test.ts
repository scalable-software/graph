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
  });
});
