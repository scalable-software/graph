import { Graph, Metadata, Nodes, Edges } from "@scalable.software/graph";

import type {
  IPathway,
  PathwayMetadata,
  IActor,
  IPath,
} from "../../src/pathway.types.js";

import { Pathway } from "../../src/pathway.js";
import { data } from "../../src/pathway.data.js";

// Typical Use Case

given("pathway graph instantiation test", () => {
  and("pathway instantiated using new Graph()", () => {
    let pathway: Graph<Pathway>;
    beforeEach(() => {
      pathway = new Graph();
    });
    then("pathway.metadata is an instance of Metadata", () => {
      expect(pathway.metadata).toBeInstanceOf(Metadata);
    });
    then("pathway.nodes is an instance of Nodes", () => {
      expect(pathway.nodes).toBeInstanceOf(Nodes);
    });
    then("pathway.edges is an instance of Edges", () => {
      expect(pathway.edges).toBeInstanceOf(Edges);
    });
  });
  and("pathway instantiated using new Graph(data)", () => {
    let pathway: Graph<IPathway>;
    let data: IPathway;
    beforeEach(() => {
      data = {
        metadata: {
          id: "c4076ede-bddf-47f3-8237-5712b4d3eda6",
          name: "ACS Diagnostic",
          type: "pathway",
        },
        nodes: [
          {
            id: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
            name: "Start",
            type: "start",
            coordinates: { x: 0, y: 6 },
            icon: "icon.svg",
            metadata: [
              {
                arrival: {
                  distribution: "exponential",
                  parameters: [{ rate: 0.005469098 }],
                },
              },
            ],
          },
          {
            id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
            name: "Triage",
            type: "workflow",
            coordinates: { x: 2, y: 6 },
            icon: "icon.svg",
            metadata: [
              {
                duration: {
                  distribution: "log normal",
                  parameters: [{ meanlog: 0.1640238 }, { sdlog: 0.4169375 }],
                },
              },
            ],
          },
        ],
        edges: [
          {
            id: "d5bc29b2-75ea-4d1a-a0ed-22f4de79a580",
            name: "",
            source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
            target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
            coordinates: {
              start: { x: 0, y: 6 },
              end: { x: 2, y: 6 },
            },
          },
        ],
      };
      pathway = new Graph<IPathway>(data);
    });
    then("pathway.metadata is equal to data.metadata", () => {
      expect(pathway.metadata).toEqual(jasmine.objectContaining(data.metadata));
    });
    then("pathway.nodes is equal to data.nodes", () => {
      expect(pathway.nodes).toEqual(jasmine.objectContaining(data.nodes));
    });
    then("pathway.edges is equal to data.edges", () => {
      expect(pathway.edges).toEqual(jasmine.objectContaining(data.edges));
    });
  });
});

given("pathway.import method behavior test", () => {
  and("pathway instantiated using new Graph()", () => {
    let pathway: Graph<IPathway>;
    beforeEach(() => {
      pathway = new Graph();
    });
    then("pathway.import() public method exists", () => {
      expect(pathway.import).toBeDefined();
    });
    and("pathway.import() updates metadata, nodes, and edges", () => {
      let data: IPathway;
      beforeEach(() => {
        data = {
          metadata: {
            id: "c4076ede-bddf-47f3-8237-5712b4d3eda6",
            name: "ACS Diagnostic",
            type: "pathway",
          },
          nodes: [
            {
              id: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
              name: "Start",
              type: "start",
              coordinates: { x: 0, y: 6 },
              icon: "icon.svg",
              metadata: [
                {
                  arrival: {
                    distribution: "exponential",
                    parameters: [{ rate: 0.005469098 }],
                  },
                },
              ],
            },
            {
              id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
              name: "Triage",
              type: "workflow",
              coordinates: { x: 2, y: 6 },
              icon: "icon.svg",
              metadata: [
                {
                  duration: {
                    distribution: "log normal",
                    parameters: [{ meanlog: 0.1640238 }, { sdlog: 0.4169375 }],
                  },
                },
              ],
            },
          ],
          edges: [
            {
              id: "d5bc29b2-75ea-4d1a-a0ed-22f4de79a580",
              name: "",
              source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
              target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
              coordinates: {
                start: { x: 0, y: 6 },
                end: { x: 2, y: 6 },
              },
            },
          ],
        };
        pathway.import(data);
      });
      then("pathway.metadata equals to data.metadata", () => {
        expect(pathway.metadata).toEqual(
          jasmine.objectContaining(data.metadata)
        );
      });
      then("pathway.nodes equals to data.nodes", () => {
        expect(pathway.nodes).toEqual(jasmine.objectContaining(data.nodes));
      });
      then("pathway.edges equals to data.edges", () => {
        expect(pathway.edges).toEqual(jasmine.objectContaining(data.edges));
      });
    });
  });
});

given("pathway.export method behavior test", () => {
  and("pathway instantiated using new Graph(data)", () => {
    let pathway: Graph<IPathway>;
    let data: IPathway;
    beforeEach(() => {
      data = {
        metadata: {
          id: "c4076ede-bddf-47f3-8237-5712b4d3eda6",
          name: "ACS Diagnostic",
          type: "pathway",
        },
        nodes: [
          {
            id: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
            name: "Start",
            type: "start",
            coordinates: { x: 0, y: 6 },
            icon: "icon.svg",
            metadata: [
              {
                arrival: {
                  distribution: "exponential",
                  parameters: [{ rate: 0.005469098 }],
                },
              },
            ],
          },
          {
            id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
            name: "Triage",
            type: "workflow",
            coordinates: { x: 2, y: 6 },
            icon: "icon.svg",
            metadata: [
              {
                duration: {
                  distribution: "log normal",
                  parameters: [{ meanlog: 0.1640238 }, { sdlog: 0.4169375 }],
                },
              },
            ],
          },
        ],
        edges: [
          {
            id: "d5bc29b2-75ea-4d1a-a0ed-22f4de79a580",
            name: "",
            source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
            target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
            coordinates: {
              start: { x: 0, y: 6 },
              end: { x: 2, y: 6 },
            },
          },
        ],
      };
      pathway = new Graph(data);
    });
    then("pathway.export() public method exists", () => {
      expect(pathway.export).toBeDefined();
    });
    when("pathway.export() returns expected data", () => {
      let exportd;
      beforeEach(() => {
        exportd = pathway.export();
      });
      then("exportd.metadata equal data.metadata", () => {
        expect(exportd.metadata).toEqual(data.metadata);
      });
      then("exportd.nodes equal data.nodes", () => {
        expect(exportd.nodes).toEqual(data.nodes);
      });
      then("exportd.edges equal data.edges", () => {
        expect(exportd.edges).toEqual(data.edges);
      });
    });
  });
});

given("pathway.metadata.add method behavior test", () => {
  and("pathway instantiated using new Graph()", () => {
    let pathway: Graph<IPathway>;
    beforeEach(() => {
      pathway = new Graph<IPathway>();
    });
    then("pathway.metadata is an instance of Metadata", () => {
      expect(pathway.metadata).toBeInstanceOf(Metadata);
    });

    and("pathway.metadata is an instance of Metadata", () => {
      then("pathway.metadata.id is a generated UUID", () => {
        expect(pathway.metadata.id).toMatch(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        );
      });
      then("pathway.metadata.name is null", () => {
        expect(pathway.metadata.name).toBe(null);
      });
      then("pathway.metadata.type is undefined", () => {
        expect(pathway.metadata.type).toBeUndefined();
      });

      when("pathway.metadata.create(metadata)", () => {
        let metadata: Omit<{ type: string; name: string }, "id">;
        beforeEach(() => {
          metadata = {
            name: "ACS Diagnostic",
            type: "pathway",
          };
          pathway.metadata.add(metadata);
        });
        then("pathway.metadata.id exist", () => {
          expect(pathway.metadata.id).toBeDefined();
        });
        then("pathway.metadata.name is defined", () => {
          expect(pathway.metadata.name).toBeDefined();
        });
        and("pathway.metadata.name is defined", () => {
          then("pathway.metadata.name equal metadata.name", () => {
            expect(pathway.metadata.name).toEqual(metadata.name);
          });
        });
        then("pathway.metadata.type is defined", () => {
          expect(pathway.metadata.type).toBeDefined();
        });
        and("pathway.metadata.type is defined", () => {
          then("pathway.metadata.type equal metadata.type", () => {
            expect(pathway.metadata.type).toEqual(metadata.type);
          });
        });
      });
    });
  });
});

given("pathway.nodes.add method behavior test", () => {
  and("pathway instantiated using new Graph()", () => {
    let pathway: Graph<IPathway>;
    beforeEach(() => {
      pathway = new Graph<IPathway>();
    });
    then("pathway.nodes is an instance of Nodes", () => {
      expect(pathway.nodes).toBeInstanceOf(Nodes);
    });

    and("pathway.nodes is an instance of Nodes", () => {
      then("pathway.nodes.length is 0", () => {
        expect(pathway.nodes.length).toBe(0);
      });

      when("pathway.nodes.add(actor)", () => {
        let actor: IActor;
        beforeEach(() => {
          actor = {
            id: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
            name: "Start",
            type: "start",
            coordinates: { x: 0, y: 6 },
            icon: "icon.svg",
            metadata: [
              {
                arrival: {
                  distribution: "exponential",
                  parameters: [{ rate: 0.005469098 }],
                },
              },
            ],
          };
          pathway.nodes.add(actor);
        });
        then("pathway.nodes.length is 1", () => {
          expect(pathway.nodes.length).toBe(1);
        });

        and("pathway.nodes.length is 1", () => {
          then("pathway.nodes[0] equals actor", () => {
            expect(pathway.nodes[0]).toEqual(actor);
          });
        });
      });
    });
  });
});

given("pathways.edges.add method behavior test", () => {
  and("pathway instantiated using new Graph()", () => {
    let pathway: Graph<IPathway>;
    beforeEach(() => {
      pathway = new Graph<IPathway>();
    });
    then("pathway.edges is an instance of Edges", () => {
      expect(pathway.edges).toBeInstanceOf(Edges);
    });

    and("pathway.edges is an instance of Edges", () => {
      then("pathway.edges.length is 0", () => {
        expect(pathway.edges.length).toBe(0);
      });

      when("pathway.edges.add(actor)", () => {
        let path: IPath;
        beforeEach(() => {
          path = {
            id: "d5bc29b2-75ea-4d1a-a0ed-22f4de79a580",
            name: "",
            source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
            target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
            coordinates: {
              start: { x: 0, y: 6 },
              end: { x: 2, y: 6 },
            },
          };
          pathway.edges.add(path);
        });
        then("pathway.edges.length is 1", () => {
          expect(pathway.edges.length).toBe(1);
        });

        and("pathway.edges.length is 1", () => {
          then("pathway.edges[0] equals path", () => {
            expect(pathway.edges[0]).toEqual(path);
          });
        });
      });
    });
  });
});

given("pathway.import method workflow test", () => {
  and("pathway instantiated using new Graph()", () => {
    let graph: Graph<IPathway>;
    beforeEach(() => {
      graph = new Graph<IPathway>();
    });
    when("graph.import(pathway)", () => {
      beforeEach(() => {
        graph.import({
          metadata: data.metadata,
          nodes: data.actors,
          edges: data.paths,
        });
      });
      and("graph.export()", () => {
        let exported;
        beforeEach(() => {
          exported = graph.export();
        });
        then("exported equals data", () => {
          let { metadata, nodes, edges } = exported;
          expect(metadata).toEqual(data.metadata);
          expect(nodes).toEqual(data.actors);
          expect(edges).toEqual(data.paths);
        });
      });
    });
  });
});

given("pathway workflow sequence test", () => {
  and("pathway instantiated using new Graph()", () => {
    let pathway: Graph<IPathway>;
    beforeEach(() => {
      pathway = new Graph<IPathway>();
    });
    and("pathway.metadata.add(metadata)", () => {
      let metadata: Omit<PathwayMetadata, "id">;
      beforeEach(() => {
        metadata = {
          name: "ACS Diagnostic",
          type: "pathway",
        };
        pathway.metadata.add(metadata);
      });
      and("pathway.nodes.add(actorTwo).add(actorTwo)", () => {
        let actorOne: IActor;
        let actorTwo: IActor;
        beforeEach(() => {
          actorOne = {
            id: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
            name: "Start",
            type: "start",
            coordinates: { x: 0, y: 6 },
            icon: "icon.svg",
            metadata: [
              {
                arrival: {
                  distribution: "exponential",
                  parameters: [{ rate: 0.005469098 }],
                },
              },
            ],
          };
          actorTwo = {
            id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
            name: "Triage",
            type: "workflow",
            coordinates: { x: 2, y: 6 },
            icon: "icon.svg",
            metadata: [
              {
                duration: {
                  distribution: "log normal",
                  parameters: [{ meanlog: 0.1640238 }, { sdlog: 0.4169375 }],
                },
              },
            ],
          };
          pathway.nodes.add(actorOne).add(actorTwo);
        });
        and("pathway.edges.add(path)", () => {
          let path: IPath;
          beforeEach(() => {
            path = {
              id: "d5bc29b2-75ea-4d1a-a0ed-22f4de79a580",
              name: "",
              source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
              target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
              coordinates: {
                start: { x: 0, y: 6 },
                end: { x: 2, y: 6 },
              },
            };
            pathway.edges.add(path);
          });
          and("pathway.export()", () => {
            let exported;
            beforeEach(() => {
              exported = pathway.export();
            });
            then("exported.metadata contains metadata", () => {
              expect(exported.metadata).toEqual(
                jasmine.objectContaining(metadata)
              );
            });
            then("exported.nodes contains actorOne", () => {
              expect(exported.nodes).toContain(actorOne);
            });
            then("exported.nodes contains actorTwo", () => {
              expect(exported.nodes).toContain(actorTwo);
            });
            then("exported.edges contains path", () => {
              expect(exported.edges).toContain(path);
            });
          });
        });
      });
    });
  });
});

// Extended Use Case

given(`Pathway class availability test`, () => {
  and(`Pathway is imported`, () => {
    then(`Pathway is defined`, () => {
      expect(Pathway).toBeDefined();
    });
    and(`Pathway is defined`, () => {
      then(`Pathway is an instance of Function`, () => {
        expect(Pathway).toBeInstanceOf(Function);
      });
    });
  });
});

given(`Pathway class instantiation test`, () => {
  when(`Pathway is instantiated`, () => {
    let pathway: Pathway;
    beforeEach(() => {
      pathway = new Pathway();
    });
    then(`pathway is defined`, () => {
      expect(pathway).toBeDefined();
    });
    and(`pathway is defined`, () => {
      then(`pathway is an instance of Pathway`, () => {
        expect(pathway).toBeInstanceOf(Pathway);
      });
      then(`pathway.metadata is defined`, () => {
        expect(pathway.metadata).toBeDefined();
      });
      then(`pathway.nodes is defined`, () => {
        expect(pathway.nodes).toBeDefined();
      });
      then(`pathway.edges is defined`, () => {
        expect(pathway.edges).toBeDefined();
      });
    });
  });
  when(`Pathway is instantiated with an pathway containing metadata`, () => {
    let pathway: Pathway;
    let metadata: IPathway["metadata"];
    beforeEach(() => {
      metadata = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Clinical Pathway",
        type: "pathway",
      };
      const data: IPathway = {
        metadata,
        nodes: [],
        edges: [],
      };
      pathway = new Pathway(data);
    });
    then(`pathway is defined`, () => {
      expect(pathway).toBeDefined();
    });
    and(`pathway is defined`, () => {
      then(`pathway.metadata is defined`, () => {
        expect(pathway.metadata).toBeDefined();
      });
    });
  });
  when(`Pathway is instantiated with an pathway containing nodes`, () => {
    let pathway: Pathway;
    let actors: IPathway["actors"];
    beforeEach(() => {
      actors = [
        {
          id: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
          name: "Start",
          type: "start",
          coordinates: { x: 0, y: 6 },
          icon: "icon.svg",
          metadata: [
            {
              arrival: {
                distribution: "exponential",
                parameters: [{ rate: 0.005469098 }],
              },
            },
          ],
        },
        {
          id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          name: "Triage",
          type: "workflow",
          coordinates: { x: 2, y: 6 },
          icon: "icon.svg",
          metadata: [
            {
              duration: {
                distribution: "log normal",
                parameters: [{ meanlog: 0.1640238 }, { sdlog: 0.4169375 }],
              },
            },
          ],
        },
      ];
      const data: IPathway = {
        metadata: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Clinical Pathway",
          type: "pathway",
        },
        nodes: actors,
        edges: [],
      };
      pathway = new Pathway(data);
    });
    then(`pathway is defined`, () => {
      expect(pathway).toBeDefined();
    });
    then(`pathway.actors is defined`, () => {
      expect(pathway.actors).toBeDefined();
    });
  });
  when(`Pathway is instantiated with an pathway containing paths`, () => {
    let pathway: Pathway;
    let paths: IPathway["paths"];
    beforeEach(() => {
      paths = [
        {
          id: "d5bc29b2-75ea-4d1a-a0ed-22f4de79a580",
          name: "",
          source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
          target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          coordinates: {
            start: { x: 0, y: 6 },
            end: { x: 2, y: 6 },
          },
        },
        {
          id: "d4ae89b2-74ea-4d1a-a0ed-22f4de79a580",
          name: "",
          source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          target: "5a3e4a90-b266-4be3-b04d-abb627d78749",
          coordinates: {
            start: { x: 2, y: 6 },
            end: { x: 4, y: 6 },
          },
        },
      ];
      const data: IPathway = {
        metadata: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Clinical Pathway",
          type: "pathway",
        },
        nodes: [],
        edges: paths,
      };
      pathway = new Pathway(data);
    });
    then(`pathway is defined`, () => {
      expect(pathway).toBeDefined();
    });
    then(`pathway.paths is defined`, () => {
      expect(pathway.paths).toBeDefined();
    });
  });
});

given(`pathway.import method availability test`, () => {
  when(`Pathway is instantiated`, () => {
    let pathway: Pathway;
    beforeEach(() => {
      pathway = new Pathway();
    });
    then(`pathway.import is defined`, () => {
      expect(pathway.import).toBeDefined();
    });
  });
});

given("pathway.import method workflow test", () => {
  and("pathway instantiated using new Graph()", () => {
    let pathway: Pathway;
    beforeEach(() => {
      pathway = new Pathway();
    });
    when("pathway.import(data)", () => {
      beforeEach(() => {
        pathway.import(data);
      });
      then("pathway.metadata is defined", () => {
        expect(pathway.metadata).toBeDefined();
      });
      and("pathway.metadata is defined", () => {
        then("pathway.metadata.toJSON() returns metadata", () => {
          expect(pathway.metadata.toJSON()).toEqual(data.metadata);
        });
      });
    });
  });
});

given(`pathway.export method availability test`, () => {
  when(`Pathway is instantiated`, () => {
    let pathway: Pathway;
    beforeEach(() => {
      pathway = new Pathway();
    });
    then(`pathway.export is defined`, () => {
      expect(pathway.export).toBeDefined();
    });
  });
});

given("pathway.export method workflow test", () => {
  and("pathway instantiated using new Graph()", () => {
    let pathway: Pathway;
    beforeEach(() => {
      pathway = new Pathway();
    });
    and("pathway imported with data", () => {
      beforeEach(() => {
        pathway.import(data);
      });
      when("pathway.export()", () => {
        let result: IPathway;
        beforeEach(() => {
          result = pathway.export();
        });
        then("result is defined", () => {
          expect(result).toBeDefined();
        });
        and("result is defined", () => {
          then("result.metadata is defined", () => {
            expect(result.metadata).toBeDefined();
          });
          then("result.actors is defined", () => {
            expect(result.actors).toBeDefined();
          });
          then("result.paths is defined", () => {
            expect(result.paths).toBeDefined();
          });
          and("result.metadata is defined", () => {
            then("result.metadata is equal to data.metadata", () => {
              expect(result.metadata).toEqual(data.metadata);
            });
          });
          and("result.actors is defined", () => {
            then("result.actors is equal to data.actors", () => {
              expect(result.actors).toEqual(data.actors);
            });
          });
          and("result.paths is defined", () => {
            then("result.paths is equal to data.paths", () => {
              expect(result.paths).toEqual(data.paths);
            });
          });
        });
      });
    });
  });
});
