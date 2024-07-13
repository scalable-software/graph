import { Connection, Connections } from "../../src/Connections.js";

describe("Given Connections imported", () => {
  it("then Connections exist", () => {
    expect(Connections).toBeDefined();
  });
});

// Static Methods Availability
describe("Given Connections has static methods", () => {
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

// Instance Methods Availability
describe("Given method = connections['_getIndex']", () => {
  let method;
  beforeEach(() => {
    const connections = new Connections();
    method = connections["_getIndex"];
  });
  it("then method exists", () => {
    expect(method).toBeDefined();
  });
});
describe("Given method = connections['add']", () => {
  let method;
  beforeEach(() => {
    const connections = new Connections();
    method = connections["add"];
  });
  it("then method exists", () => {
    expect(method).toBeDefined();
  });
});
describe("Given method = connections['update']", () => {
  let method;
  beforeEach(() => {
    const connections = new Connections();
    method = connections["update"];
  });
  it("then method exists", () => {
    expect(method).toBeDefined();
  });
});
describe("Given method = connections['findById']", () => {
  let method;
  beforeEach(() => {
    const connections = new Connections();
    method = connections["findById"];
  });
  it("then method exists", () => {
    expect(method).toBeDefined();
  });
});
describe("Given method = connections['translate']", () => {
  let method;
  beforeEach(() => {
    const connections = new Connections();
    method = connections["translate"];
  });
  it("then method exists", () => {
    expect(method).toBeDefined();
  });
});
describe("Given method = connections['remove']", () => {
  let method;
  beforeEach(() => {
    const connections = new Connections();
    method = connections["remove"];
  });
  it("then method exists", () => {
    expect(method).toBeDefined();
  });
});

// Instance Methods Behavior
describe("Given connections._getIndex() private method exist", () => {
  let connections;
  beforeEach(() => {
    connections = new Connections();
  });
  describe("when connections._getIndex(id)", () => {
    let id;
    beforeEach(() => {
      id = "15b6679a-fd9d-4036-b1ab-af0b932fc903";
    });
    it("then connections._getIndex(id) is -1", () => {
      expect(connections["_getIndex"](id)).toEqual(-1);
    });
  });
});
describe("Given connections.add() private method exist", () => {
  let connections;
  beforeEach(() => {
    connections = new Connections();
  });
  describe("when connections.add(details)", () => {
    let details;
    beforeEach(() => {
      details = {
        name: "Connections",
        source: "source",
        target: "target",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
      };
      connections.add(details);
    });
    it("then connections.length is 1", () => {
      expect(connections.length).toEqual(1);
    });
    it("then connections.connections[0] is equal to details", () => {
      details.id = connections[0].id;
      expect(connections[0]).toEqual(details);
    });
  });
});
describe("Given connections.update() private method exist", () => {
  let connections;
  beforeEach(() => {
    connections = new Connections();
  });
  describe("when connections.update(id, update)", () => {
    let id;
    let connection;
    let update;
    beforeEach(() => {
      connection = {
        name: "Connections",
        source: "source",
        target: "target",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
      };
      connections.add(connection);
      update = {
        id: connections[0].id,
        name: "Updated Connections",
        source: "source",
        target: "target",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
      };
      id = connections[0].id;
      connections.update(id, update);
    });
    it("then connections.length is 1", () => {
      expect(connections.length).toEqual(1);
    });
    it("then connections[0] is equal to update", () => {
      expect(connections[0]).toEqual(update);
    });
  });
});
describe("Given connections.findById() private method exist", () => {
  let connections;
  beforeEach(() => {
    connections = new Connections();
  });
  describe("when connections.findById(id)", () => {
    let id;
    let connection;
    beforeEach(() => {
      connection = {
        name: "Connections",
        source: "source",
        target: "target",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
      };
      connections.add(connection);
      id = connections[0].id;
      connection.id = id;
    });
    it("then connections.findById(id) is equal to connection", () => {
      expect(connections.findById(id)).toEqual(connection);
    });
  });
});
describe("Given connections.translate() private method exist", () => {
  let connections;
  beforeEach(() => {
    connections = new Connections();
  });
  describe("when connections.translate(id, offset)", () => {
    let id;
    let connection;
    let offset;
    beforeEach(() => {
      connection = {
        name: "Connections",
        source: "source",
        target: "target",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
      };
      connections.add(connection);
      id = connections[0].id;
      offset = { x: 10, y: 10 };
      connections.translate(id, offset);
    });
    it("then connections.length is 1", () => {
      expect(connections.length).toEqual(1);
    });
    it("then connections[0].coordinates.start.x is equal to offset.x", () => {
      expect(connections[0].coordinates.start.x).toEqual(offset.x);
    });
    it("then connections[0].coordinates.start.y is equal to offset.y", () => {
      expect(connections[0].coordinates.start.y).toEqual(offset.y);
    });
    it("then connections[0].coordinates.end.x is equal to offset.x", () => {
      expect(connections[0].coordinates.end.x).toEqual(offset.x);
    });
    it("then connections[0].coordinates.end.y is equal to offset.y", () => {
      expect(connections[0].coordinates.end.y).toEqual(offset.y);
    });
  });
});
describe("Given connections.remove() private method exist", () => {
  let connections;
  beforeEach(() => {
    connections = new Connections();
  });
  describe("when connections.remove(id)", () => {
    let id;
    let connection;
    beforeEach(() => {
      connection = {
        name: "Connections",
        source: "source",
        target: "target",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
      };
      connections.add(connection);
      id = connections[0].id;
      connections.remove(id);
    });
    it("then connections.length is 0", () => {
      expect(connections.length).toEqual(0);
    });
  });
});
