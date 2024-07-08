import { Connections } from "@scalable-software/graph.structure/Connections";

describe("Given Connections imported", () => {
  it("then Connections exist", () => {
    expect(Connections).toBeDefined();
  });
});

// Instance Properties Availability
describe("Given connections instance", () => {
  let connections;
  beforeEach(() => {
    connections = new Connections();
  });
  it("then connections._proxy private property exists", () => {
    expect(connections["_proxy"]).toBeDefined();
  });
});
