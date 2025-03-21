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

import type { IMetadata } from "@scalable.software/graph";

import { Graph } from "@scalable.software/graph";
import { Metadata, Nodes, Edges } from "@scalable.software/graph";

import type {
  Actor,
  Pathway,
  Path,
  PathwayMetadata,
} from "./Use_Case.Pathway.Types.js";

// Clinical Pathway
import { pathway } from "./Use_Case.Pathway.example.js";

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
    let pathway: Graph<Pathway>;
    let data: Pathway;
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
      pathway = new Graph<Pathway>(data);
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
    let pathway: Graph<Pathway>;
    beforeEach(() => {
      pathway = new Graph();
    });
    then("pathway.import() public method exists", () => {
      expect(pathway.import).toBeDefined();
    });
    and("pathway.import() updates metadata, nodes, and edges", () => {
      let data: Pathway;
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
    let pathway: Graph<Pathway>;
    let data: Pathway;
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
    let pathway: Graph<Pathway>;
    beforeEach(() => {
      pathway = new Graph<Pathway>();
    });
    then("pathway.metadata is an instance of Metadata", () => {
      expect(pathway.metadata).toBeInstanceOf(Metadata);
    });

    and("pathway.metadata is an instance of Metadata", () => {
      then("pathway.metadata.id is null", () => {
        expect(pathway.metadata.id).toBeNull();
      });
      then("pathway.metadata.name is null", () => {
        expect(pathway.metadata.name).toBe(null);
      });
      then("pathway.metadata.type is undefined", () => {
        expect(pathway.metadata.type).toBeUndefined();
      });

      when("pathway.metadata.create(metadata)", () => {
        let metadata: Omit<IMetadata & { type: string }, "id">;
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
    let pathway: Graph<Pathway>;
    beforeEach(() => {
      pathway = new Graph<Pathway>();
    });
    then("pathway.nodes is an instance of Nodes", () => {
      expect(pathway.nodes).toBeInstanceOf(Nodes);
    });

    and("pathway.nodes is an instance of Nodes", () => {
      then("pathway.nodes.length is 0", () => {
        expect(pathway.nodes.length).toBe(0);
      });

      when("pathway.nodes.add(actor)", () => {
        let actor: Actor;
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
    let pathway: Graph<Pathway>;
    beforeEach(() => {
      pathway = new Graph<Pathway>();
    });
    then("pathway.edges is an instance of Edges", () => {
      expect(pathway.edges).toBeInstanceOf(Edges);
    });

    and("pathway.edges is an instance of Edges", () => {
      then("pathway.edges.length is 0", () => {
        expect(pathway.edges.length).toBe(0);
      });

      when("pathway.edges.add(actor)", () => {
        let path: Path;
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
    let graph: Graph<Pathway>;
    beforeEach(() => {
      graph = new Graph<Pathway>();
    });
    when("graph.import(pathway)", () => {
      beforeEach(() => {
        graph.import(pathway);
      });
      and("graph.export()", () => {
        let exportd;
        beforeEach(() => {
          exportd = graph.export();
        });
        then("exportd equals pathway", () => {
          expect(exportd).toEqual(pathway);
        });
      });
    });
  });
});

given("pathway workflow sequence test", () => {
  and("pathway instantiated using new Graph()", () => {
    let pathway: Graph<Pathway>;
    beforeEach(() => {
      pathway = new Graph<Pathway>();
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
        let actorOne: Actor;
        let actorTwo: Actor;
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
          let path: Path;
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
            let exportd;
            beforeEach(() => {
              exportd = pathway.export();
            });
            then("exportd.metadata contains metadata", () => {
              expect(exportd.metadata).toEqual(
                jasmine.objectContaining(metadata)
              );
            });
            then("exportd.nodes contains actorOne", () => {
              expect(exportd.nodes).toContain(actorOne);
            });
            then("exportd.nodes contains actorTwo", () => {
              expect(exportd.nodes).toContain(actorTwo);
            });
            then("exportd.edges contains path", () => {
              expect(exportd.edges).toContain(path);
            });
          });
        });
      });
    });
  });
});
