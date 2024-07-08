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
  it("then Connections.updateCoordinates static method exists", () => {
    expect(Connections.updateCoordinates).toBeDefined();
  });
  it("then Connections.translate static method exists", () => {
    expect(Connections.translate).toBeDefined();
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
describe("Given Connections.update() static method exist", () => {
  describe("and connections exist", () => {
    let connection: Connection;
    beforeEach(() => {
      connection = {
        id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        name: "Connection",
        source: "source",
        target: "target",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
      };
    });
    describe("when updatedConnection = Connections.update(connection, update)", () => {
      let update;
      beforeEach(() => {
        update = {
          id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          name: "Connection",
          source: "source",
          target: "target",
          coordinates: { start: { x: 0, y: 0 }, end: { x: 10, y: 10 } },
        };
        connection = Connections.update(connection, update);
      });
      it("then connection icon is updated", () => {
        expect(connection).toEqual(update);
      });
    });
  });
});
describe("Given Connections.updateCoordinates() static method exist", () => {
  describe("and connections exist", () => {
    let connection: Connection;
    beforeEach(() => {
      connection = {
        id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        name: "Connection",
        source: "source",
        target: "target",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
      };
    });
    describe("when updatedConnection = Connections.updateCoordinates(connection, coordinates)", () => {
      let coordinates;
      beforeEach(() => {
        coordinates = { start: { x: 0, y: 0 }, end: { x: 10, y: 10 } };
        connection = Connections.updateCoordinates(connection, coordinates);
      });
      it("then connection.coordinates is equal to coordinates", () => {
        expect(connection.coordinates).toEqual(coordinates);
      });
    });
  });
});
describe("Given Connections.translate() static method exist", () => {
  describe("and connections exist", () => {
    let connection: Connection;
    beforeEach(() => {
      connection = {
        id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        name: "Connection",
        source: "source",
        target: "target",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
      };
    });
    describe("when updatedConnection = Connections.translate(connection, offset)", () => {
      let offset;
      beforeEach(() => {
        offset = { x: 10, y: 10 };
        connection = Connections.translate(connection, offset);
      });
      it("then connection.coordinates.start.x is equal to offset.x", () => {
        expect(connection.coordinates.start.x).toEqual(offset.x);
      });
      it("then connection.coordinates.start.y is equal to offset.y", () => {
        expect(connection.coordinates.start.y).toEqual(offset.y);
      });
      it("then connection.coordinates.end.x is equal to offset.x", () => {
        expect(connection.coordinates.end.x).toEqual(offset.x);
      });
      it("then connection.coordinates.end.y is equal to offset.y", () => {
        expect(connection.coordinates.end.y).toEqual(offset.y);
      });
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

// Instance Methods Availability
describe("Given connections instance", () => {
  let connections;
  beforeEach(() => {
    connections = new Connections([]);
  });
  it("then connections._createProxy() method exists", () => {
    expect(connections["_createProxy"]).toBeDefined();
  });
  it("then connections._get() method exists", () => {
    expect(connections["_get"]).toBeDefined();
  });
  it("then connections._set() method exists", () => {
    expect(connections["_set"]).toBeDefined();
  });
});

// Instance Methods Behavior
describe("Given connections._createProxy() method exist", () => {
  let connections;
  beforeEach(() => {
    connections = new Connections([]);
  });
  describe("when proxy = connections._createProxy(target)", () => {
    let proxy;
    beforeEach(() => {
      proxy = connections["_createProxy"]([]);
    });
    it("then proxy is defined", () => {
      expect(proxy).toBeDefined();
    });
    it("then proxy is an array", () => {
      expect(proxy).toBeInstanceOf(Array);
    });
  });
});
describe("Given connections._get() method exist", () => {
  let connections;
  beforeEach(() => {
    connections = new Connections([]);
  });
  describe("when proxy = new Proxy(target, handler)", () => {
    let proxy;
    let target;
    beforeEach(() => {
      target = [1, 2, 3];
      proxy = new Proxy(target, {
        get: connections["_get"],
        set: (target, property, value, receiver) =>
          Reflect.set(target, property, value, receiver),
      });
    });
    it("then proxy.length is equal to target.length", () => {
      expect(proxy.length).toEqual(target.length);
    });
  });
});
