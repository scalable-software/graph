import { Connections } from "@scalable-software/graph.structure/Connections";

describe("Given Connections imported", () => {
  it("then Connections exist", () => {
    expect(Connections).toBeDefined();
  });
});

// Static Methods Availability
describe("Given Connections static methods", () => {
  it("then Connections exist", () => {
    expect(Connections).toBeDefined();
  });
  it("then Connections.init static method exists", () => {
    expect(Connections.init).toBeDefined();
  });
});

// Instance Properties Availability
describe("Given connections instance", () => {
  let connections;
  beforeEach(() => {
    connections = new Connections([]);
  });
  it("then connections._proxy private property exists", () => {
    expect(connections["_proxy"]).toBeDefined();
  });
  it("then connections.connections private property exists", () => {
    expect(connections["connections"]).toBeDefined();
  });
});
