import {
  Connection,
  Connections,
  Coordinates,
  Offset,
  Utilities,
  UUID,
} from "@scalable-software/graph.structure";

// Class Availability
describe("Given Connections imported", () => {
  it("then Connections exist", () => {
    expect(Connections).toBeDefined();
  });
});

// Static Methods Availability
describe("Given Connections Exists", () => {
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
    let details: Omit<Connection, "id">;
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
      let update: Connection;
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
        id: Utilities.uuid,
        name: "Connection",
        source: "source",
        target: "target",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
      };
    });
    describe("when updatedConnection = Connections.updateCoordinates(connection, coordinates)", () => {
      let coordinates: { start: Coordinates; end: Coordinates };
      let updatedConnection: Connection;
      beforeEach(() => {
        coordinates = { start: { x: 0, y: 0 }, end: { x: 10, y: 10 } };
        updatedConnection = Connections.updateCoordinates(
          connection,
          coordinates
        );
      });
      it("then updatedConnection.coordinates is equal to coordinates", () => {
        expect(updatedConnection.coordinates).toEqual(coordinates);
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
      let offset: Offset;
      let updatedConnection: Connection;
      beforeEach(() => {
        offset = { x: 10, y: 10 };
        updatedConnection = Connections.translate(connection, offset);
      });
      it("then updatedConnection.coordinates.start.x is equal to offset.x", () => {
        expect(updatedConnection.coordinates.start.x).toEqual(offset.x);
      });
      it("then updatedConnection.coordinates.start.y is equal to offset.y", () => {
        expect(updatedConnection.coordinates.start.y).toEqual(offset.y);
      });
      it("then updatedConnection.coordinates.end.x is equal to offset.x", () => {
        expect(updatedConnection.coordinates.end.x).toEqual(offset.x);
      });
      it("then updatedConnection.coordinates.end.y is equal to offset.y", () => {
        expect(updatedConnection.coordinates.end.y).toEqual(offset.y);
      });
    });
  });
});

// Instance Methods Availability
describe("Given Connections instantiated", () => {
  const connections = new Connections();
  it("then _getIndex private method exists", () => {
    expect(connections["_getIndex"]).toBeDefined();
  });
  it("then create public method exists", () => {
    expect(connections.create).toBeDefined();
  });
  it("then add public method exists", () => {
    expect(connections.add).toBeDefined();
  });
  it("then update public method exists", () => {
    expect(connections.update).toBeDefined();
  });
  it("then findById public method exists", () => {
    expect(connections.findById).toBeDefined();
  });
  it("then translate public method exists", () => {
    expect(connections.translate).toBeDefined();
  });
  it("then remove public method exists", () => {
    expect(connections.remove).toBeDefined();
  });
});

// Instance Methods Behavior
describe("Given connections._getIndex() private method exist", () => {
  let connections: Connections;
  beforeEach(() => {
    connections = new Connections();
  });
  describe("and connections contains a connection with id", () => {
    let id: UUID;
    beforeEach(() => {
      const details = {
        name: "Connections",
        source: "source",
        target: "target",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
      };
      connections.create(details);
      id = connections[0].id;
    });
    describe("when index = connections._getIndex(id)", () => {
      let index: number;
      beforeEach(() => {
        index = connections["_getIndex"](id);
      });
      it("then index is 0", () => {
        expect(index).toEqual(0);
      });
    });
  });
});
describe("Given connections.create() private method exist", () => {
  let connections: Connections;
  beforeEach(() => {
    connections = new Connections();
  });
  describe("when connections.create(details)", () => {
    let details: Omit<Connection, "id">;
    let connection: Connection;
    beforeEach(() => {
      details = {
        name: "Connections",
        source: "source",
        target: "target",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
      };
      connections.create(details);
      connection = { ...details, id: connections[0].id };
    });
    it("then connections.length is 1", () => {
      expect(connections.length).toEqual(1);
    });
    it("then connections with details is added to connections", () => {
      expect(connections[0]).toEqual(connection);
    });
  });
});
describe("Given connections.add() private method exist", () => {
  let connections: Connections;
  beforeEach(() => {
    connections = new Connections();
  });
  describe("when connections.add(connection)", () => {
    let connection: Connection;
    beforeEach(() => {
      connection = {
        id: Utilities.uuid,
        name: "Connections",
        source: "source",
        target: "target",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
      };
      connections.add(connection);
    });
    it("then connections.length is 1", () => {
      expect(connections.length).toEqual(1);
    });
    it("then connection is added to connections", () => {
      expect(connections[0]).toEqual(connection);
    });
  });
});
describe("Given connections.update() private method exist", () => {
  let connections: Connections;
  beforeEach(() => {
    connections = new Connections();
  });
  describe("and connections contains a connection", () => {
    let id: UUID;
    beforeEach(() => {
      connections.create({
        name: "Connections",
        source: "source",
        target: "target",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
      });
      id = connections[0].id;
    });
    describe("when connections.update(id, update)", () => {
      let connection: Connection;
      let update: Connection;
      beforeEach(() => {
        update = {
          id: id,
          name: "Updated Connections",
          source: "source",
          target: "target",
          coordinates: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
        };
        connections.update(id, update);
        connection = connections[0];
      });
      it("then connection is updated", () => {
        expect(connection).toEqual(update);
      });
    });
  });
});
describe("Given connections.findById() private method exist", () => {
  let connections: Connections;
  beforeEach(() => {
    connections = new Connections();
  });
  describe("and connections contains a connection width id", () => {
    let id: UUID;
    beforeEach(() => {
      connections.create({
        name: "Connections",
        source: "source",
        target: "target",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
      });
      id = connections[0].id;
    });
    describe("when connection = connections.findById(id)", () => {
      let connection: Connection;
      beforeEach(() => {
        connection = connections.findById(id);
      });
      it("then connection in connections is returns", () => {
        expect(connection).toEqual(connections[0]);
      });
    });
  });
});
describe("Given connections.translate() private method exist", () => {
  let connections: Connections;
  beforeEach(() => {
    connections = new Connections();
  });
  describe("and connections contains a connection", () => {
    let id: UUID;
    beforeEach(() => {
      connections.create({
        name: "Connections",
        source: "source",
        target: "target",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
      });
      id = connections[0].id;
    });
    describe("when connections.translate(id, offset)", () => {
      let connection: Connection;
      let offset: Offset;
      beforeEach(() => {
        offset = { x: 10, y: 10 };
        connections.translate(id, offset);
        connection = connections[0];
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
});
describe("Given connections.remove() private method exist", () => {
  let connections: Connections;
  beforeEach(() => {
    connections = new Connections();
  });
  describe("and connections contains a connection", () => {
    let id: UUID;
    beforeEach(() => {
      connections.create({
        name: "Connections",
        source: "source",
        target: "target",
        coordinates: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } },
      });
      id = connections[0].id;
    });
    describe("when connections.remove(id)", () => {
      let connection: Connection;
      beforeEach(() => {
        connections.remove(id);
        connection = connections[0];
      });
      it("then connection is removed from nodes", () => {
        expect(connection).toBeUndefined();
      });
    });
  });
});
