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

import type {
  Coordinates,
  IEdge,
  PartialEdge,
  UUID,
} from "@scalable.software/graph";
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

given(`edges.update method behavior test`, () => {
  and(`an instance of Edges is created`, () => {
    let instance: Edges<IEdge>;
    beforeEach(() => {
      instance = Edges.create();
    });

    when(`instance.update is called with valid id and updated source`, () => {
      let edge: IEdge;
      let updatedEdge: PartialEdge<IEdge>;
      beforeEach(() => {
        edge = {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          target: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        };
        updatedEdge = {
          source: "c4f8a7b1-1c4e-4d3b-9e2f-8a6e4f7c5a2a",
        };
        instance.add(edge);
        instance.update(edge.id, updatedEdge);
      });

      then(`instance.length is 1`, () => {
        expect(instance.length).toBe(1);
      });

      and(`instance.length is 1`, () => {
        then(`instance[0].source is updatedEdge.source`, () => {
          expect(instance[0].source).toEqual(updatedEdge.source);
        });
      });
    });
    when(`instance.update is called with valid id and updated target`, () => {
      let edge: IEdge;
      let updatedEdge: PartialEdge<IEdge>;
      beforeEach(() => {
        edge = {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          target: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        };
        updatedEdge = {
          target: "c4f8a7b1-1c4e-4d3b-9e2f-8a6e4f7c5a2a",
        };
        instance.add(edge);
        instance.update(edge.id, updatedEdge);
      });
      then(`instance.length is 1`, () => {
        expect(instance.length).toBe(1);
      });
      and(`instance.length is 1`, () => {
        then(`instance[0].target is updatedEdge.target`, () => {
          expect(instance[0].target).toEqual(updatedEdge.target);
        });
      });
    });
    when(
      `instance.update is called with valid id and updated start coordinates`,
      () => {
        let edge: IEdge;
        let updatedEdge: PartialEdge<IEdge>;
        beforeEach(() => {
          edge = {
            id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
            source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
            target: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
            coordinates: { start: { x: 0, y: 0 }, end: { x: 2, y: 2 } },
          };
          updatedEdge = {
            coordinates: { start: { x: 1, y: 1 } },
          };
          instance.add(edge);
          instance.update(edge.id, updatedEdge);
        });
        then(`instance.length is 1`, () => {
          expect(instance.length).toBe(1);
        });
        and(`instance.length is 1`, () => {
          then(
            `instance[0].coordinates.start is updatedEdge.coordinates.start`,
            () => {
              expect(instance[0].coordinates.start).toEqual(
                updatedEdge.coordinates.start
              );
            }
          );
        });
      }
    );
    when(
      `instance.update is called with valid id and updated end coordinates`,
      () => {
        let edge: IEdge;
        let updatedEdge: PartialEdge<IEdge>;
        beforeEach(() => {
          edge = {
            id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
            source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
            target: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
            coordinates: { start: { x: 0, y: 0 }, end: { x: 2, y: 2 } },
          };
          updatedEdge = {
            coordinates: { end: { x: 1, y: 1 } },
          };
          instance.add(edge);
          instance.update(edge.id, updatedEdge);
        });
        then(`instance.length is 1`, () => {
          expect(instance.length).toBe(1);
        });
        and(`instance.length is 1`, () => {
          then(
            `instance[0].coordinates.end is updatedEdge.coordinates.end`,
            () => {
              expect(instance[0].coordinates.end).toEqual(
                updatedEdge.coordinates.end
              );
            }
          );
        });
      }
    );
    when(`instance.update is called with invalid id`, () => {
      let edge: IEdge;
      let updatedEdge: PartialEdge<IEdge>;
      let error: Exception.Exception;
      beforeEach(() => {
        edge = {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          target: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        };
        updatedEdge = {
          source: "c4f8a7b1-1c4e-4d3b-9e2f-8a6e4f7c5a2a",
        };
        instance.add(edge);
        let id = "1";
        try {
          instance.update(id, updatedEdge);
        } catch (e) {
          error = e;
        }
      });
      then(`errors is defined`, () => {
        expect(error).toBeDefined();
      });
      and(`errors is defined`, () => {
        then(`errors is an instance of ValidationException`, () => {
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    });
    when(
      `instance.update is called with valid id and invalid updated edge`,
      () => {
        let edge: IEdge;
        let updatedEdge: PartialEdge<IEdge>;
        let error: Exception.Exception;
        beforeEach(() => {
          edge = {
            id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
            source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
            target: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
            coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
          };
          updatedEdge = {
            coordinates: {
              start: { x: "invalid" as unknown as number, y: 1 },
              end: { x: 2, y: 2 },
            },
          };
          instance.add(edge);
          try {
            instance.update(edge.id, updatedEdge);
          } catch (e) {
            error = e;
          }
        });

        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });

        and(`error is defined`, () => {
          then(`error is an instance of ValidationException`, () => {
            expect(error).toBeInstanceOf(Exception.ValidationException);
          });
        });
      }
    );
  });
});

given(`edges.move method availability test`, () => {
  when(`an instance of Edges is created`, () => {
    let instance: Edges<IEdge>;
    beforeEach(() => {
      instance = Edges.create();
    });
    then(`instance.move is defined`, () => {
      expect(instance.move).toBeDefined();
    });
  });
});

given(`edges.move method behavior test`, () => {
  and(`an instance of Edges is created containing an edge`, () => {
    let instance: Edges<IEdge>;
    let edge: IEdge;
    beforeEach(() => {
      instance = Edges.create();
      edge = {
        id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
        source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
        target: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
      };
      instance.add(edge);
    });

    when(
      `instance.move is called with valid id and updated coordinates`,
      () => {
        let id: UUID;
        let coordinates: { start: Coordinates; end: Coordinates };
        beforeEach(() => {
          id = edge.id;
          coordinates = {
            start: { x: 1, y: 1 },
            end: { x: 2, y: 2 },
          };
          instance.move(id, coordinates);
        });
        then(`instance[0].coordinates.start is coordinates.start`, () => {
          expect(instance[0].coordinates.start).toEqual(coordinates.start);
        });
        then(`instance[0].coordinates.end is coordinates.end`, () => {
          expect(instance[0].coordinates.end).toEqual(coordinates.end);
        });
      }
    );
    when(
      `instance.move is called with valid id and update start coordinates`,
      () => {
        let id: UUID;
        let coordinates: { start: Coordinates };
        beforeEach(() => {
          id = edge.id;
          coordinates = {
            start: { x: 1, y: 1 },
          };
          instance.move(id, coordinates);
        });
        then(`instance[0].coordinates.start is coordinates.start`, () => {
          expect(instance[0].coordinates.start).toEqual(coordinates.start);
        });
        then(`instance[0].coordinates.end is edge.coordinates.end`, () => {
          expect(instance[0].coordinates.end).toEqual(edge.coordinates.end);
        });
      }
    );
    when(
      `instance.move is called with valid id and update end coordinates`,
      () => {
        let id: UUID;
        let coordinates: { end: Coordinates };
        beforeEach(() => {
          id = edge.id;
          coordinates = {
            end: { x: 2, y: 2 },
          };
          instance.move(id, coordinates);
        });
        then(`instance[0].coordinates.start is edge.coordinates.start`, () => {
          expect(instance[0].coordinates.start).toEqual(edge.coordinates.start);
        });
        then(`instance[0].coordinates.end is coordinates.end`, () => {
          expect(instance[0].coordinates.end).toEqual(coordinates.end);
        });
      }
    );
    when(
      `instance.move is called with unknown id and updated coordinates`,
      () => {
        let id: UUID;
        let coordinates: { start: Coordinates; end: Coordinates };
        let error: Exception.Exception;
        beforeEach(() => {
          id = "a3f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c4a1e";
          coordinates = {
            start: { x: 1, y: 1 },
            end: { x: 2, y: 2 },
          };
          try {
            instance.move(id, coordinates);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(`error is an instance of ValidationException`, () => {
            expect(error).toBeInstanceOf(Exception.ValidationException);
          });
        });
      }
    );
    when(
      `instance.move is called with invalid id and updated coordinates`,
      () => {
        let id: UUID;
        let coordinates: { start: Coordinates; end: Coordinates };
        let error: Exception.Exception;
        beforeEach(() => {
          id = "1";
          coordinates = {
            start: { x: 1, y: 1 },
            end: { x: 2, y: 2 },
          };
          try {
            instance.move(id, coordinates);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(`error is an instance of ValidationException`, () => {
            expect(error).toBeInstanceOf(Exception.ValidationException);
          });
        });
      }
    );
    when(
      `instance.move is called with valid id and invalid coordinates`,
      () => {
        let id: UUID;
        let coordinates: { start: Coordinates; end: Coordinates };
        let error: Exception.Exception;
        beforeEach(() => {
          id = edge.id;
          coordinates = {
            start: { x: "invalid" as unknown as number, y: 1 },
            end: { x: 2, y: 2 },
          };
          try {
            instance.move(id, coordinates);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(`error is an instance of ValidationException`, () => {
            expect(error).toBeInstanceOf(Exception.ValidationException);
          });
        });
      }
    );
  });
});

given(`edges.translate method availability test`, () => {
  when(`an instance of Edges is created`, () => {
    let instance: Edges<IEdge>;
    beforeEach(() => {
      instance = Edges.create();
    });
    then(`instance.translate is defined`, () => {
      expect(instance.translate).toBeDefined();
    });
  });
});

given(`edges.translate method behavior test`, () => {
  and(`an instance of Edges is created containing an edge`, () => {
    let instance: Edges<IEdge>;
    let edge: IEdge;
    beforeEach(() => {
      instance = Edges.create();
      edge = {
        id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
        source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
        target: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
      };
      instance.add(edge);
    });

    when(`instance.translate is called with valid id and offset`, () => {
      let id: UUID;
      let offset: Coordinates;
      beforeEach(() => {
        id = edge.id;
        offset = { x: 1, y: 1 };
        instance.translate(id, offset);
      });
      then(`instance[0].coordinates.start.x is 1`, () => {
        expect(instance[0].coordinates.start.x).toBe(1);
      });
      then(`instance[0].coordinates.start.y is 1`, () => {
        expect(instance[0].coordinates.start.y).toBe(1);
      });
      then(`instance[0].coordinates.end.x is 2`, () => {
        expect(instance[0].coordinates.end.x).toBe(2);
      });
      then(`instance[0].coordinates.end.y is 2`, () => {
        expect(instance[0].coordinates.end.y).toBe(2);
      });
    });
    when(`instance.translate is called with unknown id and offset`, () => {
      let id: UUID;
      let offset: Coordinates;
      let error: Exception.Exception;
      beforeEach(() => {
        id = "a3f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c4a1e";
        offset = { x: 1, y: 1 };
        try {
          instance.translate(id, offset);
        } catch (e) {
          error = e;
        }
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
    when(`instance.translate is called with invalid id and offset`, () => {
      let id: UUID;
      let offset: Coordinates;
      let error: Exception.Exception;
      beforeEach(() => {
        id = "1";
        offset = { x: 1, y: 1 };
        try {
          instance.translate(id, offset);
        } catch (e) {
          error = e;
        }
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
    when(
      `instance.translate is called with valid id and invalid offset`,
      () => {
        let id: UUID;
        let offset: Coordinates;
        let error: Exception.Exception;
        beforeEach(() => {
          id = edge.id;
          offset = { x: "invalid" as unknown as number, y: 1 };
          try {
            instance.translate(id, offset);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(`error is an instance of ValidationException`, () => {
            expect(error).toBeInstanceOf(Exception.ValidationException);
          });
        });
      }
    );
  });
  and(`an instance of Edges is created containing edges`, () => {
    let instance: Edges<IEdge>;
    let edges: IEdge[];
    beforeEach(() => {
      instance = Edges.create();
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
          coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        },
      ];
      instance.add(edges);
    });
    when(`instance.translate is called with valid ids and offset`, () => {
      let ids: UUID[];
      let offset: Coordinates;
      beforeEach(() => {
        ids = edges.map((edge) => edge.id);
        offset = { x: 1, y: 1 };
        instance.translate(ids, offset);
      });
      then(`instance[0].coordinates.start.x is 1`, () => {
        expect(instance[0].coordinates.start.x).toBe(1);
      });
      then(`instance[0].coordinates.start.y is 1`, () => {
        expect(instance[0].coordinates.start.y).toBe(1);
      });
      then(`instance[0].coordinates.end.x is 2`, () => {
        expect(instance[0].coordinates.end.x).toBe(2);
      });
      then(`instance[0].coordinates.end.y is 2`, () => {
        expect(instance[0].coordinates.end.y).toBe(2);
      });
      then(`instance[1].coordinates.start.x is 1`, () => {
        expect(instance[1].coordinates.start.x).toBe(1);
      });
      then(`instance[1].coordinates.start.y is 1`, () => {
        expect(instance[1].coordinates.start.y).toBe(1);
      });
      then(`instance[1].coordinates.end.x is 2`, () => {
        expect(instance[1].coordinates.end.x).toBe(2);
      });
      then(`instance[1].coordinates.end.y is 2`, () => {
        expect(instance[1].coordinates.end.y).toBe(2);
      });
    });
    when(`instance.translate is called with unknown ids and offset`, () => {
      let ids: UUID[];
      let offset: Coordinates;
      let error: Exception.Exception;
      beforeEach(() => {
        ids = ["a3f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c4a1e"];
        offset = { x: 1, y: 1 };
        try {
          instance.translate(ids, offset);
        } catch (e) {
          error = e;
        }
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
    when(`instance.translate is called with invalid ids and offset`, () => {
      let ids: UUID[];
      let offset: Coordinates;
      let error: Exception.Exception;
      beforeEach(() => {
        ids = ["1"];
        offset = { x: 1, y: 1 };
        try {
          instance.translate(ids, offset);
        } catch (e) {
          error = e;
        }
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
    when(
      `instance.translate is called with valid ids and invalid offset`,
      () => {
        let ids: UUID[];
        let offset: Coordinates;
        let error: Exception.Exception;
        beforeEach(() => {
          ids = edges.map((edge) => edge.id);
          offset = { x: "invalid" as unknown as number, y: 1 };
          try {
            instance.translate(ids, offset);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(`error is an instance of ValidationException`, () => {
            expect(error).toBeInstanceOf(Exception.ValidationException);
          });
        });
      }
    );
  });
});

given(`edges.remove method availability test`, () => {
  when(`an instance of Edges is created`, () => {
    let instance: Edges<IEdge>;
    beforeEach(() => {
      instance = Edges.create();
    });
    then(`instance.remove is defined`, () => {
      expect(instance.remove).toBeDefined();
    });
  });
});

given(`edges.remove method behavior test`, () => {
  and(`an instance of Edges is created containing edges`, () => {
    let instance: Edges<IEdge>;
    let edges: IEdge[];
    beforeEach(() => {
      instance = Edges.create();
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
          coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        },
      ];
      instance.add(edges);
    });
    when(`instance.remove is called with valid id`, () => {
      let id: UUID;
      beforeEach(() => {
        id = edges[0].id;
        instance.remove(id);
      });
      then(`instance.length is 1`, () => {
        expect(instance.length).toBe(1);
      });
      and(`instance.length is 1`, () => {
        then(`instance[0].id is edges[1].id`, () => {
          expect(instance[0].id).toEqual(edges[1].id);
        });
      });
    });
    when(`instance.remove is called with unknown id`, () => {
      let id: UUID;
      let error: Exception.Exception;
      beforeEach(() => {
        id = "a3f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c4a1e";
        try {
          instance.remove(id);
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
    when(`instance.remove is called with invalid id`, () => {
      let id: UUID;
      let error: Exception.Exception;
      beforeEach(() => {
        id = "1";
        try {
          instance.remove(id);
        } catch (e) {
          error = e;
        }
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
  });
});

given(`edges.findById method availability test`, () => {
  when(`an instance of Edges is created`, () => {
    let instance: Edges<IEdge>;
    beforeEach(() => {
      instance = Edges.create();
    });
    then(`instance.findById is defined`, () => {
      expect(instance.findById).toBeDefined();
    });
  });
});

given(`edges.findById method behavior test`, () => {
  and(`an instance of Edges is created containing edges`, () => {
    let instance: Edges<IEdge>;
    let edges: IEdge[];
    beforeEach(() => {
      instance = Edges.create();
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
          coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        },
      ];
      instance.add(edges);
    });
    when(`instance.findById is called with valid id`, () => {
      let id: UUID;
      let result: IEdge | undefined;
      beforeEach(() => {
        id = edges[0].id;
        result = instance.findById(id);
      });
      then(`result is defined`, () => {
        expect(result).toBeDefined();
      });
      and(`result is defined`, () => {
        then(`result.id is id`, () => {
          expect(result.id).toEqual(id);
        });
      });
    });
    when(`instance.findById is called with unknown id`, () => {
      let id: UUID;
      let result: IEdge | undefined;
      beforeEach(() => {
        id = "a3f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c4a1e";
        result = instance.findById(id);
      });
      then(`result is undefined`, () => {
        expect(result).toBeUndefined();
      });
    });
    when(`instance.findById is called with invalid id`, () => {
      let id: UUID;
      let error: Exception.Exception;
      beforeEach(() => {
        id = "1";
        try {
          instance.findById(id);
        } catch (e) {
          error = e;
        }
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
  });
});

given(`edges.findBySource method availability test`, () => {
  when(`an instance of Edges is created`, () => {
    let instance: Edges<IEdge>;
    beforeEach(() => {
      instance = Edges.create();
    });
    then(`instance.findBySource is defined`, () => {
      expect(instance.findBySource).toBeDefined();
    });
  });
});

given(`edges.findBySource method behavior test`, () => {
  and(
    `an instance of Edges is created containing edges with unique source`,
    () => {
      let instance: Edges<IEdge>;
      let edges: IEdge[];
      beforeEach(() => {
        instance = Edges.create();
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
            coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
          },
        ];
        instance.add(edges);
      });
      when(`instance.findBySource is called with valid source`, () => {
        let source: UUID;
        let result: IEdge[] | undefined;
        beforeEach(() => {
          source = edges[0].source;
          result = instance.findBySource(source);
        });
        then(`result is defined`, () => {
          expect(result).toBeDefined();
        });
        and(`result is defined`, () => {
          then(`result.source is source`, () => {
            expect(result[0].source).toEqual(source);
          });
        });
      });
      when(`instance.findBySource is called with unknown source`, () => {
        let source: UUID;
        let result: IEdge[] | undefined;
        beforeEach(() => {
          source = "a3f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c4a1e";
          result = instance.findBySource(source);
        });
        then(`result.length is 0`, () => {
          expect(result.length).toBe(0);
        });
      });
      when(`instance.findBySource is called with invalid source`, () => {
        let source: UUID;
        let error: Exception.Exception;
        beforeEach(() => {
          source = "1";
          try {
            instance.findById(source);
          } catch (e) {
            error = e;
          }
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
    }
  );
  and(
    `an instance of Edges is created containing edges with duplicate source`,
    () => {
      let instance: Edges<IEdge>;
      let edges: IEdge[];
      beforeEach(() => {
        instance = Edges.create();
        edges = [
          {
            id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
            source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1e",
            target: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
            coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
          },
          {
            id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1e",
            source: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1e",
            target: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1e",
            coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
          },
        ];
        instance.add(edges);
      });
      when(`instance.findBySource is called with valid source`, () => {
        let source: UUID;
        let result: IEdge[] | undefined;
        beforeEach(() => {
          source = edges[0].source;
          result = instance.findBySource(source);
        });
        then(`result is defined`, () => {
          expect(result).toBeDefined();
        });
        and(`result is defined`, () => {
          then(`result.length is 2`, () => {
            expect(result.length).toEqual(2);
          });
        });
      });
      when(`instance.findBySource is called with unknown source`, () => {
        let source: UUID;
        let result: IEdge[] | undefined;
        beforeEach(() => {
          source = "a3f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c4a1e";
          result = instance.findBySource(source);
        });
        then(`result.length is 0`, () => {
          expect(result.length).toBe(0);
        });
      });
      when(`instance.findBySource is called with invalid source`, () => {
        let source: UUID;
        let error: Exception.Exception;
        beforeEach(() => {
          source = "1";
          try {
            instance.findById(source);
          } catch (e) {
            error = e;
          }
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
    }
  );
});

given(`edges.immutable accessor availability test`, () => {
  and(`a edges instance is created`, () => {
    let edges: Edges<IEdge>;
    beforeEach(() => {
      edges = Edges.create();
    });
    then(`edges.immutable getter is defined`, () => {
      expect(edges.immutable).toBeDefined();
    });
    then(`edges.immutable setter is defined`, () => {
      expect(help.hasSetter(edges, "immutable")).toBeTruthy();
    });
  });
});

given(`edges.immutable accessor behavior test`, () => {
  and(`a edges instance is created`, () => {
    let edges: Edges<IEdge>;
    beforeEach(() => {
      edges = Edges.create();
    });
    then(`edges.immutable is by default true`, () => {
      expect(edges.immutable).toBeTruthy();
    });
    when(`edges.immutable is set to false`, () => {
      beforeEach(() => {
        edges.immutable = false;
      });
      then(`edges.immutable is false`, () => {
        expect(edges.immutable).toBeFalsy();
      });
    });
    when(`edges.immutable is set to number`, () => {
      let error: Exception.Exception;
      beforeEach(() => {
        try {
          edges.immutable = 1 as any;
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
              `error.message is 'Invalid argument: flag - must be a boolean'`,
              () => {
                expect(error.message).toBe(
                  "Invalid argument: flag - must be a boolean"
                );
              }
            );
          }
        );
      });
    });
    when(`edges.immutable is set to string`, () => {
      let error: Exception.Exception;
      beforeEach(() => {
        try {
          edges.immutable = "test" as any;
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
              `error.message is 'Invalid argument: flag - must be a boolean'`,
              () => {
                expect(error.message).toBe(
                  "Invalid argument: flag - must be a boolean"
                );
              }
            );
          }
        );
      });
    });
  });
});
