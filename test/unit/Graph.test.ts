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

import { Graph, IGraph } from "@scalable.software/graph";

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
