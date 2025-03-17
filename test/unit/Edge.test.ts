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

import { Edge, type IEdge } from "@scalable.software/graph";

given(`Edge class availability test`, () => {
  and(`Edge is imported`, () => {
    then(`Edge is defined`, () => {
      expect(Edge).toBeDefined();
    });
  });
});

given(`Edge.create static method availability test`, () => {
  and(`Edge is defined`, () => {
    then("Edge.create public static method exists", () => {
      expect(Edge.create).toBeDefined();
    });
  });
});

given(`Edge.create static method behavior test`, () => {
  when("Edge.create called with details with no id", () => {
    let details: Omit<IEdge, "id">;
    let edge: IEdge;
    beforeEach(() => {
      details = {
        source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        target: "43c6679a-fd9d-4036-b1ab-af0b932fc814",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
      };
      edge = Edge.create(details);
    });

    then("edge is defined", () => {
      expect(edge).toBeDefined();
    });

    and("edge is defined", () => {
      then("edge.id is defined", () => {
        expect(edge.id).toBeDefined();
      });
      then("edge.coordinates is defined", () => {
        expect(edge.coordinates).toBeDefined();
      });

      and("edge.coordinates is defined", () => {
        then("edge.coordinates.start is defined", () => {
          expect(edge.coordinates.start).toBeDefined();
        });
        then("edge.coordinates.end is defined", () => {
          expect(edge.coordinates.end).toBeDefined();
        });

        and("edge.coordinates.start is defined", () => {
          then(
            "edge.coordinates.start equals details.coordinates.start",
            () => {
              expect(edge.coordinates.start).toEqual(details.coordinates.start);
            }
          );
        });

        and("edge.coordinates.end is defined", () => {
          then("edge.coordinates.end equals details.coordinates.end", () => {
            expect(edge.coordinates.end).toEqual(details.coordinates.end);
          });
        });
      });
    });
  });

  when("Edge.create called with details with id", () => {
    let details: IEdge;
    let edge: IEdge;
    beforeEach(() => {
      details = {
        id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        target: "43c6679a-fd9d-4036-b1ab-af0b932fc814",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
      };
      edge = Edge.create(details);
    });

    then("edge is defined", () => {
      expect(edge).toBeDefined();
    });

    and("edge is defined", () => {
      then("edge.id is defined", () => {
        expect(edge.id).toBeDefined();
      });
      then("edge.coordinates is defined", () => {
        expect(edge.coordinates).toBeDefined();
      });

      and("edge.id is defined", () => {
        then("edge.id equals details.id", () => {
          expect(edge.id).toEqual(details.id);
        });
      });

      and("edge.coordinates is defined", () => {
        then("edge.coordinates.start is defined", () => {
          expect(edge.coordinates.start).toBeDefined();
        });
        then("edge.coordinates.end is defined", () => {
          expect(edge.coordinates.end).toBeDefined();
        });

        and("edge.coordinates.start is defined", () => {
          then(
            "edge.coordinates.start equals details.coordinates.start",
            () => {
              expect(edge.coordinates.start).toEqual(details.coordinates.start);
            }
          );
        });
        and("edge.coordinates.end is defined", () => {
          then("edge.coordinates.end equals details.coordinates.end", () => {
            expect(edge.coordinates.end).toEqual(details.coordinates.end);
          });
        });
      });
    });
  });
});
