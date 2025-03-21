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

import {
  type IGraph,
  Graph,
  Metadata,
  Nodes,
  Edges,
} from "@scalable.software/graph";

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
  when(`Graph is instantiated with an graph containing metadata`, () => {
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
  });
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
        metadata: undefined,
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
        metadata: undefined,
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
