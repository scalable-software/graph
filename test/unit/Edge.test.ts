import { Edge } from "@scalable.software/graph";
import type { IEdge, Coordinates, Offset } from "@scalable.software/graph";

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

given(`Edge.clone static method availability test`, () => {
  and(`Edge is defined`, () => {
    then("Edge.clone public static method exists", () => {
      expect(Edge.clone).toBeDefined();
    });
  });
});

given(`Edge.clone static method behavior test`, () => {
  when("Edge.clone called with node", () => {
    let edge: IEdge;
    let clonedEdge: IEdge;
    beforeEach(() => {
      edge = {
        id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        target: "43c6679a-fd9d-4036-b1ab-af0b932fc814",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
      };
      clonedEdge = Edge.clone(edge);
    });

    then("clonedEdge is defined", () => {
      expect(clonedEdge).toBeDefined();
    });

    and("clonedEdge is defined", () => {
      then("clonedEdge is not equal to edge", () => {
        expect(clonedEdge).not.toBe(edge);
      });
      then("clonedEdge.id is not equal to edge.id", () => {
        expect(clonedEdge.id).not.toBe(edge.id);
      });
      then("clonedEdge.coordinates.start equals edge.coordinates.start", () => {
        expect(clonedEdge.coordinates.start).toEqual(edge.coordinates.start);
      });
      then("clonedEdge.coordinates.end equals edge.coordinates.end", () => {
        expect(clonedEdge.coordinates.end).toEqual(edge.coordinates.end);
      });
    });
  });
});

given(`Edge.update static method availability test`, () => {
  and(`Edge is defined`, () => {
    then("Edge.update public static method exists", () => {
      expect(Edge.update).toBeDefined();
    });
  });
});

given(`Edge.update static method behavior test`, () => {
  when("Edge.update called with node and patch", () => {
    let edge: IEdge;
    let patch;
    let updatedEdge;
    beforeEach(() => {
      edge = {
        id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        target: "43c6679a-fd9d-4036-b1ab-af0b932fc814",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
      };
      patch = {
        coordinates: { start: { x: 1, y: 1 }, end: { x: 2, y: 2 } },
      };
      updatedEdge = Edge.update(edge, patch);
    });
    then("updatedEdge is defined", () => {
      expect(updatedEdge).toBeDefined();
    });
    and("updatedEdge is defined", () => {
      then("updatedEdge.id equals edge.id", () => {
        expect(updatedEdge.id).toEqual(edge.id);
      });
      then("updatedEdge.source equals edge.source", () => {
        expect(updatedEdge.source).toEqual(edge.source);
      });
      then("updatedEdge.target equals edge.target", () => {
        expect(updatedEdge.target).toEqual(edge.target);
      });
      then("updatedEdge.coordinates is defined", () => {
        expect(updatedEdge.coordinates).toBeDefined();
      });

      and("updatedEdge.coordinates is defined", () => {
        then(
          "updatedEdge.coordinates.start equals patch.coordinates.start",
          () => {
            expect(updatedEdge.coordinates.start).toEqual(
              patch.coordinates.start
            );
          }
        );
        then("updatedEdge.coordinates.end equals patch.coordinates.end", () => {
          expect(updatedEdge.coordinates.end).toEqual(patch.coordinates.end);
        });
      });
    });
  });
});

given(`Edge.move static method availability test`, () => {
  and(`Edge is defined`, () => {
    then("Edge.move public static method exists", () => {
      expect(Edge.move).toBeDefined();
    });
  });
});

given(`Edge.move static method behavior test`, () => {
  when("Edge.move called with edge and new start and end coordinates", () => {
    let edge: IEdge;
    let coordinates: { start: Coordinates; end: Coordinates };
    let updatedEdge;
    beforeEach(() => {
      edge = {
        id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        target: "43c6679a-fd9d-4036-b1ab-af0b932fc814",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
      };
      coordinates = { start: { x: 1, y: 1 }, end: { x: 2, y: 2 } };
      updatedEdge = Edge.move(edge, coordinates);
    });

    then("updatedEdge is defined", () => {
      expect(updatedEdge).toBeDefined();
    });

    and("updatedEdge is defined", () => {
      then("updatedEdge.id equals edge.id", () => {
        expect(updatedEdge.id).toEqual(edge.id);
      });
      then("updatedEdge.source equals edge.source", () => {
        expect(updatedEdge.source).toEqual(edge.source);
      });
      then("updatedEdge.target equals edge.target", () => {
        expect(updatedEdge.target).toEqual(edge.target);
      });
      then("updatedEdge.coordinates is defined", () => {
        expect(updatedEdge.coordinates).toBeDefined();
      });

      and("updatedEdge.coordinates is defined", () => {
        then("updatedEdge.coordinates.start equals coordinates.start", () => {
          expect(updatedEdge.coordinates.start).toEqual(coordinates.start);
        });
        then("updatedEdge.coordinates.end equals coordinates.end", () => {
          expect(updatedEdge.coordinates.end).toEqual(coordinates.end);
        });
      });
    });
  });

  when("Edge.move called with edge and new start coordinates", () => {
    let edge: IEdge;
    let coordinates: { start: Coordinates };
    let updatedEdge;
    beforeEach(() => {
      edge = {
        id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        target: "43c6679a-fd9d-4036-b1ab-af0b932fc814",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
      };
      coordinates = { start: { x: 1, y: 1 } };
      updatedEdge = Edge.move(edge, coordinates);
    });

    then("updatedEdge is defined", () => {
      expect(updatedEdge).toBeDefined();
    });

    and("updatedEdge is defined", () => {
      then("updatedEdge.id equals edge.id", () => {
        expect(updatedEdge.id).toEqual(edge.id);
      });
      then("updatedEdge.source equals edge.source", () => {
        expect(updatedEdge.source).toEqual(edge.source);
      });
      then("updatedEdge.target equals edge.target", () => {
        expect(updatedEdge.target).toEqual(edge.target);
      });
      then("updatedEdge.coordinates is defined", () => {
        expect(updatedEdge.coordinates).toBeDefined();
      });

      and("updatedEdge.coordinates is defined", () => {
        then("updatedEdge.coordinates.start equals coordinates.start", () => {
          expect(updatedEdge.coordinates.start).toEqual(coordinates.start);
        });
        then("updatedEdge.coordinates.end equals edge.coordinates.end", () => {
          expect(updatedEdge.coordinates.end).toEqual(edge.coordinates.end);
        });
      });
    });
  });

  when("Edge.move called with edge and new end coordinates", () => {
    let edge: IEdge;
    let coordinates: { end: Coordinates };
    let updatedEdge;
    beforeEach(() => {
      edge = {
        id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        target: "43c6679a-fd9d-4036-b1ab-af0b932fc814",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
      };
      coordinates = { end: { x: 2, y: 2 } };
      updatedEdge = Edge.move(edge, coordinates);
    });

    then("updatedEdge is defined", () => {
      expect(updatedEdge).toBeDefined();
    });

    and("updatedEdge is defined", () => {
      then("updatedEdge.id equals edge.id", () => {
        expect(updatedEdge.id).toEqual(edge.id);
      });
      then("updatedEdge.source equals edge.source", () => {
        expect(updatedEdge.source).toEqual(edge.source);
      });
      then("updatedEdge.target equals edge.target", () => {
        expect(updatedEdge.target).toEqual(edge.target);
      });
      then("updatedEdge.coordinates is defined", () => {
        expect(updatedEdge.coordinates).toBeDefined();
      });

      and("updatedEdge.coordinates is defined", () => {
        then(
          "updatedEdge.coordinates.start equals edge.coordinates.start",
          () => {
            expect(updatedEdge.coordinates.start).toEqual(
              edge.coordinates.start
            );
          }
        );
        then("updatedEdge.coordinates.end equals coordinates.end", () => {
          expect(updatedEdge.coordinates.end).toEqual(coordinates.end);
        });
      });
    });
  });
});

given(`Edge.translate static method availability test`, () => {
  and(`Edge is defined`, () => {
    then("Edge.translate public static method exists", () => {
      expect(Edge.translate).toBeDefined();
    });
  });
});

given(`Edge.translate static method behavior test`, () => {
  when("Edge.translate(edge, offset)", () => {
    let edge: IEdge;
    let offset: Offset;
    let updatedEdge: IEdge;
    beforeEach(() => {
      edge = {
        id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        target: "43c6679a-fd9d-4036-b1ab-af0b932fc814",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
      };
      offset = { x: 100, y: 400 };
      updatedEdge = Edge.translate(edge, offset);
    });
    then("updatedEdge is defined", () => {
      expect(updatedEdge).toBeDefined();
    });
    and("updatedEdge is defined", () => {
      then("updatedEdge.id equals edge.id", () => {
        expect(updatedEdge.id).toEqual(edge.id);
      });
      then("updatedEdge.source equals edge.source", () => {
        expect(updatedEdge.source).toEqual(edge.source);
      });
      then("updatedEdge.target equals edge.target", () => {
        expect(updatedEdge.target).toEqual(edge.target);
      });
      then("updatedEdge.coordinates is defined", () => {
        expect(updatedEdge.coordinates).toBeDefined();
      });

      and("updatedEdge.coordinates is defined", () => {
        then(
          "updatedEdge.coordinates.start equals edge.coordinates.start",
          () => {
            expect(updatedEdge.coordinates.start).toEqual({
              x: edge.coordinates.start.x + offset.x,
              y: edge.coordinates.start.y + offset.y,
            });
          }
        );
        then("updatedEdge.coordinates.end equals edge.coordinates.end", () => {
          expect(updatedEdge.coordinates.end).toEqual({
            x: edge.coordinates.end.x + offset.x,
            y: edge.coordinates.end.y + offset.y,
          });
        });
      });
    });
  });
});
