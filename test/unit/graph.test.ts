import {
  type IGraph,
  Graph,
  Metadata,
  Nodes,
  Edges,
  type UUID,
} from "@scalable.software/graph";

// Clinical Pathway
import type { IPathway } from "../../src/pathway.types.js";
import { data } from "../../src/pathway.data.js";

given(`Graph class availability test`, () => {
  and(`Graph is imported`, () => {
    then(`Graph is defined`, () => {
      expect(Graph).toBeDefined();
    });
    and(`Graph is defined`, () => {
      then(`Graph is an instance of Function`, () => {
        expect(Graph).toBeInstanceOf(Function);
      });
    });
  });
});

given(`Graph class instantiation test`, () => {
  when(`Graph is instantiated`, () => {
    let graph: Graph<IGraph>;
    beforeEach(() => {
      graph = new Graph();
    });
    then(`Graph is defined`, () => {
      expect(graph).toBeDefined();
    });
    and(`Graph is defined`, () => {
      then(`Graph is an instance of Graph`, () => {
        expect(graph).toBeInstanceOf(Graph);
      });
      and(`Graph.metadata is defined`, () => {
        then(`Graph.metadata is an instance of Metadata`, () => {
          expect(graph.metadata).toBeInstanceOf(Metadata);
        });
      });
      and(`Graph.nodes is defined`, () => {
        then(`Graph.nodes is an instance of Nodes`, () => {
          expect(graph.nodes).toBeInstanceOf(Nodes);
        });
      });
      and(`Graph.edges is defined`, () => {
        then(`Graph.edges is an instance of Edges`, () => {
          expect(graph.edges).toBeInstanceOf(Edges);
        });
      });
    });
  });
  when(
    `Graph is instantiated with an graph containing metadata`,
    () => {
      let graph: Graph<IGraph>;
      let metadata: IGraph["metadata"];
      beforeEach(() => {
        metadata = {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Clinical Pathway",
        };
        const data: IGraph = {
          metadata,
          nodes: [],
          edges: [],
        };
        graph = new Graph(data);
      });
      then(`Graph is defined`, () => {
        expect(graph).toBeDefined();
      });
      and(`Graph is defined`, () => {
        then(`Graph.metadata is defined`, () => {
          expect(graph.metadata).toBeDefined();
        });
        and(`Graph.metadata is defined`, () => {
          then(`Graph.metadata is instance of Metadata`, () => {
            expect(graph.metadata).toBeInstanceOf(Metadata);
          });
          then(`Graph.metadata.toJSON() returns metadata`, () => {
            expect(graph.metadata.toJSON()).toEqual(metadata);
          });
        });
      });
    }
  );
  when(`Graph is instantiated with an graph containing nodes`, () => {
    let graph: Graph<IGraph>;
    let nodes: IGraph["nodes"];
    beforeEach(() => {
      nodes = [
        {
          id: "123e4567-e89b-12d3-a456-426614174000",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "123e4567-e89b-12d3-a456-426614174001",
          coordinates: { x: 1, y: 1 },
        },
      ];
      const data: IGraph = {
        metadata: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Clinical Pathway",
        },
        nodes,
        edges: [],
      };
      graph = new Graph(data);
    });
    then(`Graph is defined`, () => {
      expect(graph).toBeDefined();
    });
    then(`graph.nodes is defined`, () => {
      expect(graph.nodes).toBeDefined();
    });
    and(`graph.nodes is defined`, () => {
      then(`graph.nodes is an instance of Nodes`, () => {
        expect(graph.nodes).toBeInstanceOf(Nodes);
      });
    });
  });
  when(`Graph is instantiated with an graph containing edges`, () => {
    let graph: Graph<IGraph>;
    let edges: IGraph["edges"];
    beforeEach(() => {
      edges = [
        {
          id: "123e4567-e89b-12d3-a456-426614174000",
          source: "123e4567-e89b-12d3-a456-426614174001",
          target: "123e4567-e89b-12d3-a456-426614174002",
          coordinates: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        },
        {
          id: "123e4567-e89b-12d3-a456-426614174001",
          source: "123e4567-e89b-12d3-a456-426614174002",
          target: "123e4567-e89b-12d3-a456-426614174003",
          coordinates: { start: { x: 1, y: 1 }, end: { x: 2, y: 2 } },
        },
      ];
      const data: IGraph = {
        metadata: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Clinical Pathway",
        },
        nodes: [],
        edges,
      };
      graph = new Graph(data);
    });
    then(`Graph is defined`, () => {
      expect(graph).toBeDefined();
    });
    then(`graph.edges is defined`, () => {
      expect(graph.edges).toBeDefined();
    });
    and(`graph.edges is defined`, () => {
      then(`graph.edges is an instance of Edges`, () => {
        expect(graph.edges).toBeInstanceOf(Edges);
      });
    });
  });
});

given(`Graph.metadata property availability test`, () => {
  when(`Graph is instantiated`, () => {
    let graph: Graph<IGraph>;
    beforeEach(() => {
      graph = new Graph();
    });
    then(`Graph.metadata is defined`, () => {
      expect(graph.metadata).toBeDefined();
    });
  });
});

given(`Graph.nodes property availability test`, () => {
  when(`Graph is instantiated`, () => {
    let graph: Graph<IGraph>;
    beforeEach(() => {
      graph = new Graph();
    });
    then(`Graph.nodes is defined`, () => {
      expect(graph.nodes).toBeDefined();
    });
  });
});

given(`Graph.edges property availability test`, () => {
  when(`Graph is instantiated`, () => {
    let graph: Graph<IGraph>;
    beforeEach(() => {
      graph = new Graph();
    });
    then(`Graph.edges is defined`, () => {
      expect(graph.edges).toBeDefined();
    });
  });
});

given(`Graph.domain getter availability test`, () => {
  when(`Graph is instantiated`, () => {
    let graph: Graph<IGraph>;
    beforeEach(() => {
      graph = new Graph();
    });
    then(`Graph.domain is defined`, () => {
      expect(graph.domain).toBeDefined();
    });
  });
});

given(`Graph.domain getter value test`, () => {
  when(`Graph is instantiated`, () => {
    let graph: Graph<IGraph>;
    let data: IGraph;
    beforeEach(() => {
      graph = new Graph();
    });
    then(`Graph.domain is defined`, () => {
      expect(graph.domain).toBeDefined();
    });
    and(`Graph.domain is defined`, () => {
      then(`Graph.domain returns empty domain`, () => {
        expect(graph.domain).toEqual({
          x: { min: 0, max: 0 },
          y: { min: 0, max: 0 },
        });
      });
    });
    and(`Graph with nodes is imported`, () => {
      beforeEach(() => {
        data = {
          metadata: {
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "Clinical Pathway",
          },
          nodes: [
            {
              id: "123e4567-e89b-12d3-a456-426614174001",
              coordinates: { x: 1, y: 1 },
            },
            {
              id: "123e4567-e89b-12d3-a456-426614174002",
              coordinates: { x: 2, y: 2 },
            },
          ],
          edges: [
            {
              id: "123e4567-e89b-12d3-a456-426614174000",
              source: "123e4567-e89b-12d3-a456-426614174001",
              target: "123e4567-e89b-12d3-a456-426614174002",
              coordinates: {
                start: { x: 1, y: 1 },
                end: { x: 2, y: 2 },
              },
            },
          ],
        };
        graph.import(data);
      });
      then("Graph.domain returns domain of imported graph", () => {
        expect(graph.domain).toEqual({
          x: { min: 1, max: 2 },
          y: { min: 1, max: 2 },
        });
      });
    });
  });
});

given(`Graph.extend getter availability test`, () => {
  when(`Graph is instantiated`, () => {
    let graph: Graph<IGraph>;
    beforeEach(() => {
      graph = new Graph();
    });
    then(`Graph.extend is defined`, () => {
      expect(graph.extend).toBeDefined();
    });
  });
});

given(`Graph.extend getter value test`, () => {
  when(`Graph is instantiated`, () => {
    let graph: Graph<IGraph>;
    let data: IGraph;
    beforeEach(() => {
      graph = new Graph();
    });
    then(`Graph.extend is defined`, () => {
      expect(graph.extend).toBeDefined();
    });
    and(`Graph.extend is defined`, () => {
      then(`Graph.extend returns empty extend`, () => {
        expect(graph.extend).toEqual({
          x: 0,
          y: 0,
        });
      });
    });
    and(`Graph with nodes is imported`, () => {
      beforeEach(() => {
        data = {
          metadata: {
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "Clinical Pathway",
          },
          nodes: [
            {
              id: "123e4567-e89b-12d3-a456-426614174001",
              coordinates: { x: 1, y: 1 },
            },
            {
              id: "123e4567-e89b-12d3-a456-426614174002",
              coordinates: { x: 3, y: 3 },
            },
          ],
          edges: [
            {
              id: "123e4567-e89b-12d3-a456-426614174000",
              source: "123e4567-e89b-12d3-a456-426614174001",
              target: "123e4567-e89b-12d3-a456-426614174002",
              coordinates: {
                start: { x: 1, y: 1 },
                end: { x: 3, y: 3 },
              },
            },
          ],
        };
        graph.import(data);
      });
      then("Graph.extend returns extend of imported graph", () => {
        expect(graph.extend).toEqual({
          x: 3,
          y: 3,
        });
      });
    });
  });
});

given(`Graph.import method availability test`, () => {
  when(`Graph is instantiated`, () => {
    let graph: Graph<IGraph>;
    beforeEach(() => {
      graph = new Graph();
    });
    then(`Graph.import is defined`, () => {
      expect(graph.import).toBeDefined();
    });
  });
});

given(`Graph.import method behavior test`, () => {
  when(`Graph is instantiated`, () => {
    let graph: Graph<IGraph>;
    let data: IGraph;
    beforeEach(() => {
      graph = new Graph();
      data = {
        metadata: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Clinical Pathway",
        },
        nodes: [
          {
            id: "123e4567-e89b-12d3-a456-426614174000",
            coordinates: { x: 0, y: 0 },
          },
        ],
        edges: [
          {
            id: "123e4567-e89b-12d3-a456-426614174000",
            source: "123e4567-e89b-12d3-a456-426614174001",
            target: "123e4567-e89b-12d3-a456-426614174002",
            coordinates: {
              start: { x: 0, y: 0 },
              end: { x: 1, y: 1 },
            },
          },
        ],
      };
      graph.import(data);
    });
    then(`Graph.metadata is defined`, () => {
      expect(graph.metadata).toBeDefined();
    });
    and(`Graph.metadata is defined`, () => {
      then(`Graph.metadata is an instance of Metadata`, () => {
        expect(graph.metadata).toBeInstanceOf(Metadata);
      });
      then(`Graph.metadata.toJSON() returns metadata`, () => {
        expect(graph.metadata.toJSON()).toEqual(data.metadata);
      });
    });
    then(`Graph.nodes is defined`, () => {
      expect(graph.nodes).toBeDefined();
    });
    and(`Graph.nodes is defined`, () => {
      then(`Graph.nodes is an instance of Nodes`, () => {
        expect(graph.nodes).toBeInstanceOf(Nodes);
      });
      then(`Graph.nodes.toJSON() returns nodes`, () => {
        expect(graph.nodes.toJSON()).toEqual(data.nodes);
      });
    });
    then(`Graph.edges is defined`, () => {
      expect(graph.edges).toBeDefined();
    });
    and(`Graph.edges is defined`, () => {
      then(`Graph.edges is an instance of Edges`, () => {
        expect(graph.edges).toBeInstanceOf(Edges);
      });
      then(`Graph.edges.toJSON() returns edges`, () => {
        expect(graph.edges.toJSON()).toEqual(data.edges);
      });
    });
  });
});

given("Graph.export method availability test", () => {
  when("Graph is instantiated", () => {
    let graph: Graph<IGraph>;
    beforeEach(() => {
      graph = new Graph();
    });
    then("Graph.export is defined", () => {
      expect(graph.export).toBeDefined();
    });
  });
});

given(`Graph.export method behavior test`, () => {
  and(`Graph is instantiated width data`, () => {
    let graph: Graph<IGraph>;
    let data: IGraph;
    beforeEach(() => {
      graph = new Graph();
      data = {
        metadata: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Clinical Pathway",
        },
        nodes: [
          {
            id: "123e4567-e89b-12d3-a456-426614174000",
            coordinates: { x: 0, y: 0 },
          },
        ],
        edges: [
          {
            id: "123e4567-e89b-12d3-a456-426614174000",
            source: "123e4567-e89b-12d3-a456-426614174001",
            target: "123e4567-e89b-12d3-a456-426614174002",
            coordinates: {
              start: { x: 0, y: 0 },
              end: { x: 1, y: 1 },
            },
          },
        ],
      };
      graph.import(data);
    });
    when(`Graph.export is called`, () => {
      let result: IGraph;
      beforeEach(() => {
        result = graph.export();
      });
      then(`Graph.export returns data`, () => {
        expect(result).toEqual(data);
      });
    });
  });
});

given("Graph.toJSON method availability test", () => {
  when("Graph is instantiated", () => {
    let graph: Graph<IGraph>;
    beforeEach(() => {
      graph = new Graph();
    });
    then("Graph.toJSON is defined", () => {
      expect(graph.toJSON).toBeDefined();
    });
  });
});

given(`Graph.toJSON method behavior test`, () => {
  and(`Graph is instantiated width data`, () => {
    let graph: Graph<IGraph>;
    let data: IGraph;
    beforeEach(() => {
      graph = new Graph();
      data = {
        metadata: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Clinical Pathway",
        },
        nodes: [
          {
            id: "123e4567-e89b-12d3-a456-426614174000",
            coordinates: { x: 0, y: 0 },
          },
        ],
        edges: [
          {
            id: "123e4567-e89b-12d3-a456-426614174000",
            source: "123e4567-e89b-12d3-a456-426614174001",
            target: "123e4567-e89b-12d3-a456-426614174002",
            coordinates: {
              start: { x: 0, y: 0 },
              end: { x: 1, y: 1 },
            },
          },
        ],
      };
      graph.import(data);
    });
    when(`Graph.toJSON is called`, () => {
      let result: IGraph;
      beforeEach(() => {
        result = graph.toJSON();
      });
      then(`Graph.export returns data`, () => {
        expect(result).toEqual(data);
      });
    });
  });
});

given("Graph.degree method availability test", () => {
  when("Graph is instantiated", () => {
    let graph: Graph<IGraph>;
    beforeEach(() => {
      graph = new Graph();
    });
    then("Graph.degree is defined", () => {
      expect(graph.degree).toBeDefined();
    });
  });
});

given("Graph.degree method behavior test", () => {
  and("graph instantiated using new Graph()", () => {
    let pathway: Graph<IPathway>;
    beforeEach(() => {
      let { metadata, actors, paths } = data;
      pathway = new Graph<IPathway>({
        metadata,
        nodes: actors,
        edges: paths,
      });
    });
    when(
      "Graph.degree is called with a node id having one connection",
      () => {
        let result: number;
        let id: UUID;
        beforeEach(() => {
          id = pathway.nodes[0].id;
          result = pathway.degree(id);
        });
        then("Graph.degree returns the degree of the node", () => {
          expect(result).toBe(1);
        });
      }
    );
    when(
      "Graph.degree is called with a node id having two connections",
      () => {
        let result: number;
        let id: UUID;
        beforeEach(() => {
          id = pathway.nodes[1].id;
          result = pathway.degree(id);
        });
        then("Graph.degree returns the degree of the node", () => {
          expect(result).toBe(2);
        });
      }
    );
  });
});

given("Graph.in method availability test", () => {
  when("Graph is instantiated", () => {
    let graph: Graph<IGraph>;
    beforeEach(() => {
      graph = new Graph();
    });
    then("Graph.in is defined", () => {
      expect(graph.in).toBeDefined();
    });
  });
});

given("Graph.in method behavior test", () => {
  and("graph instantiated using new Graph()", () => {
    let pathway: Graph<IPathway>;
    beforeEach(() => {
      let { metadata, actors, paths } = data;
      pathway = new Graph({ metadata, nodes: actors, edges: paths });
    });
    when(
      "Graph.in is called with a node id having 0 in connections",
      () => {
        let result: number;
        let id: UUID;
        beforeEach(() => {
          id = pathway.nodes[0].id;
          result = pathway.in(id);
        });
        then("Graph.degree returns the degree of the node", () => {
          expect(result).toBe(0);
        });
      }
    );
    when(
      "Graph.degree is called with a node id having 1 in connections",
      () => {
        let result: number;
        let id: UUID;
        beforeEach(() => {
          id = pathway.nodes[1].id;
          result = pathway.in(id);
        });
        then("Graph.degree returns the degree of the node", () => {
          expect(result).toBe(1);
        });
      }
    );
  });
});

given("Graph.out method availability test", () => {
  when("Graph is instantiated", () => {
    let graph: Graph<IGraph>;
    beforeEach(() => {
      graph = new Graph();
    });
    then("Graph.out is defined", () => {
      expect(graph.out).toBeDefined();
    });
  });
});

given("Graph.out method behavior test", () => {
  and("graph instantiated using new Graph()", () => {
    let pathway: Graph<IPathway>;
    beforeEach(() => {
      let { metadata, actors, paths } = data;
      pathway = new Graph({ metadata, nodes: actors, edges: paths });
    });
    when(
      "Graph.out is called with a node id having 1 in connections",
      () => {
        let result: number;
        let id: UUID;
        beforeEach(() => {
          id = pathway.nodes[0].id;
          result = pathway.out(id);
        });
        then("Graph.out returns the degree of the node", () => {
          expect(result).toBe(1);
        });
      }
    );
    when(
      "Graph.out is called with a node id having 1 in connections",
      () => {
        let result: number;
        let id: UUID;
        beforeEach(() => {
          id = pathway.nodes[1].id;
          result = pathway.out(id);
        });
        then("Graph.out returns the degree of the node", () => {
          expect(result).toBe(1);
        });
      }
    );
  });
});

given("Graph.neighbors method availability test", () => {
  when("Graph is instantiated", () => {
    let graph: Graph<IGraph>;
    beforeEach(() => {
      graph = new Graph();
    });
    then("Graph.neighbors is defined", () => {
      expect(graph.neighbors).toBeDefined();
    });
  });
});

given("Graph.neighbors method behavior test", () => {
  and("graph instantiated using new Graph()", () => {
    let pathway: Graph<IPathway>;
    beforeEach(() => {
      let { metadata, actors, paths } = data;
      pathway = new Graph({ metadata, nodes: actors, edges: paths });
    });
    when(
      "Graph.neighbors is called with a node id having 1 neighbors",
      () => {
        let result;
        let id: UUID;
        beforeEach(() => {
          id = pathway.nodes[0].id;
          result = pathway.neighbors(id);
        });
        then(
          "Graph.neighbors returns the neighbors of the node",
          () => {
            expect(result).toEqual([
              "15b6679a-fd9d-4036-b1ab-af0b932fc903",
            ]);
          }
        );
      }
    );
    when(
      "Graph.neighbors is called with a node id having 2 neighbors",
      () => {
        let result;
        let id: UUID;
        beforeEach(() => {
          id = pathway.nodes[1].id;
          result = pathway.neighbors(id);
        });
        then(
          "Graph.neighbors returns the neighbors of the node",
          () => {
            expect(result).toEqual([
              "35c6779a-fd9d-4089-d1ab-af0b932fc912",
              "5a3e4a90-b266-4be3-b04d-abb627d78749",
            ]);
          }
        );
      }
    );
  });
});

given("Graph.trajectories method availability test", () => {
  when("Graph is instantiated", () => {
    let graph: Graph<IGraph>;
    beforeEach(() => {
      graph = new Graph();
    });
    then("Graph.trajectories is defined", () => {
      expect(graph.trajectories).toBeDefined();
    });
  });
});

given("Graph.trajectories method behavior test", () => {
  and("graph instantiated with pathway using new Graph()", () => {
    let pathway: Graph<IPathway>;
    beforeEach(() => {
      let { metadata, actors, paths } = data;
      pathway = new Graph({ metadata, nodes: actors, edges: paths });
    });
    and("one edge connects origin and destination", () => {
      let origin: UUID;
      let destination: UUID;
      beforeEach(() => {
        origin = "35c6779a-fd9d-4089-d1ab-af0b932fc912";
        destination = "15b6679a-fd9d-4036-b1ab-af0b932fc903";
      });
      when(
        "graph.trajectories is called with origin and destination",
        () => {
          let trajectories;
          beforeEach(() => {
            trajectories = pathway.trajectories(origin, destination);
          });
          then("trajectories is an array", () => {
            expect(Array.isArray(trajectories)).toBeTrue();
          });
          then("trajectories contains one trajectory", () => {
            expect(trajectories.length).toBe(1);
          });
          and("trajectories contains one trajectory", () => {
            let trajectory;
            beforeEach(() => {
              trajectory = trajectories[0];
            });
            then("the trajectory is an array", () => {
              expect(Array.isArray(trajectory)).toBeTrue();
            });
            then("the trajectory contains one edge", () => {
              expect(trajectory.length).toBe(1);
            });
            and("the trajectory contains one edge", () => {
              let edge;
              beforeEach(() => {
                edge = trajectory[0];
              });
              then("the edge.source equals origin", () => {
                expect(edge.source).toBe(origin);
              });
              then("then edge.target equals destination", () => {
                expect(edge.target).toBe(destination);
              });
            });
          });
        }
      );
    });
    and("two trajectories connects origin and destination", () => {
      let origin: UUID;
      let destination: UUID;
      beforeEach(() => {
        origin = "251660a8-0e35-4edd-950d-866c5c7cc92c";
        destination = "73f06535-1356-4f15-a184-356ea459680d";
      });

      when("graph.trajectories(origin, destination)", () => {
        let trajectories;
        beforeEach(() => {
          trajectories = pathway.trajectories(origin, destination);
        });
        then("trajectories contain two paths", () => {
          expect(trajectories.length).toBe(2);
        });

        and("trajectories contain two trajectories", () => {
          let one: any[];
          let two: any[];

          beforeEach(() => {
            [one, two] = trajectories;
          });

          then(
            "each trajectory is a sequence of connected edges",
            () => {
              [one, one].forEach((trajectory) =>
                expect(
                  trajectory.every((edge, i, arr) =>
                    i === arr.length - 1
                      ? true
                      : edge.target === arr[i + 1].source
                  )
                ).toBeTrue()
              );
            }
          );

          then(
            "first edge.source in each trajectory equal origin",
            () => {
              [one, one].forEach((trajectory) => {
                const edge = trajectory[0];
                expect(edge.source).toBe(origin);
              });
            }
          );
          then(
            "last edge.target in each trajectory equal destination",
            () => {
              [one, one].forEach((trajectory) => {
                const edge = trajectory[trajectory.length - 1];
                expect(edge.target).toBe(destination);
              });
            }
          );
        });
      });
    });
  });
  and(
    "graph instantiated with cyclic pathway using new Graph()",
    () => {
      let cyclic: Graph<IPathway>;
      beforeEach(() => {
        const metadata = {
          id: "c4076ede-bddf-47f3-8237-5712b4d3eda6",
          name: "ACS Diagnostic",
          type: "pathway",
        } as any;
        const nodes = [
          {
            id: "3d66e968-70e2-42bd-9460-c3a924447da3",
            coordinates: { x: 0, y: 0 },
          },
          {
            id: "8371703f-9bc7-4e7a-9fe0-196cc517fada",
            coordinates: { x: 1, y: 0 },
          },
          {
            id: "e2e558a9-02b4-4a87-a09c-9a0d4b759693",
            coordinates: { x: 2, y: 0 },
          },
        ] as any;
        const edges = [
          {
            id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
            source: "3d66e968-70e2-42bd-9460-c3a924447da3",
            target: "8371703f-9bc7-4e7a-9fe0-196cc517fada",
            coordinates: {
              start: { x: 0, y: 0 },
              end: { x: 1, y: 0 },
            },
          },
          {
            id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
            source: "8371703f-9bc7-4e7a-9fe0-196cc517fada",
            target: "3d66e968-70e2-42bd-9460-c3a924447da3",
            coordinates: {
              start: { x: 1, y: 0 },
              end: { x: 0, y: 0 },
            },
          },
          {
            id: "cccccccc-cccc-cccc-cccc-cccccccccccc",
            source: "8371703f-9bc7-4e7a-9fe0-196cc517fada",
            target: "e2e558a9-02b4-4a87-a09c-9a0d4b759693",
            coordinates: {
              start: { x: 1, y: 0 },
              end: { x: 2, y: 0 },
            },
          },
        ] as any;

        cyclic = new Graph({ metadata, nodes, edges });
      });
      when("graph.trajectories(origin, destination)", () => {
        let trajectories;
        let origin;
        let destination;
        beforeEach(() => {
          origin = "3d66e968-70e2-42bd-9460-c3a924447da3";
          destination = "e2e558a9-02b4-4a87-a09c-9a0d4b759693";
          trajectories = cyclic.trajectories(origin, destination);
        });
        then("trajectories contains one trajectory", () => {
          expect(trajectories.length).toBe(1);
        });
        and("trajectories contains one trajectory", () => {
          let trajectory;
          beforeEach(() => {
            trajectory = trajectories[0];
          });
          then("first edge.source in trajectory is origin", () => {
            const edge = trajectory[0];
            expect(edge.source).toBe(origin);
          });
          then(
            "last edge.target in trajectory is destination",
            () => {
              const edge = trajectory[trajectory.length - 1];
              expect(edge.target).toBe(destination);
            }
          );
          then(
            "each trajectory is a sequence of connected edges",
            () => {
              expect(
                trajectory.every((edge, i, arr) =>
                  i === arr.length - 1
                    ? true
                    : edge.target === arr[i + 1].source
                )
              ).toBeTrue();
            }
          );
        });
      });
    }
  );
});
