import {
  Connection,
  Connections,
} from "@scalable-software/graph.structure/Connections";

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
  it("then Connections.create static method exists", () => {
    expect(Connections.create).toBeDefined();
  });
  it("then Connections.update static method exists", () => {
    expect(Connections.update).toBeDefined();
  });
});

// Static Methods Behavior
describe("Given Connections.init static method", () => {
  describe("when connections = Connections.init()", () => {
    let connections;
    beforeEach(() => {
      connections = Connections.init();
    });
    it("then connections is defined", () => {
      expect(connections).toBeDefined();
    });
    it("then connections is an array", () => {
      expect(connections).toBeInstanceOf(Array);
    });
  });
});
describe("Given Connections.create() static method exist", () => {
  describe("when connections = Connections.create(details)", () => {
    let details;
    let connection: Connection;
    beforeEach(() => {
      details = {
        name: "Connections",
        source: "source",
        target: "target",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
      };
      connection = Connections.create(details);
    });
    it("then connection is exist", () => {
      expect(connection).toBeDefined();
    });
    it("then connection.id exist", () => {
      expect(connection.id).toBeDefined();
    });
    it("then connection.source exist", () => {
      expect(connection.source).toBeDefined();
    });
    it("then connection.target exist", () => {
      expect(connection.target).toBeDefined();
    });
    it("then connection.coordinates exist", () => {
      expect(connection.coordinates).toBeDefined();
    });
    it("then connection.source equals details.source", () => {
      expect(connection.source).toEqual(details.source);
    });
    it("then connection.target equals details.target", () => {
      expect(connection.target).toBe(details.target);
    });
    it("then connection.coordinates equals details.coordinates", () => {
      expect(connection.coordinates).toEqual(details.coordinates);
    });
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
