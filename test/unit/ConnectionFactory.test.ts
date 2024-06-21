import {
  ConnectionFactory,
  Connection,
  Coordinates,
} from "../../src/ConnectionFactory.js";

describe("Given ConnectionFactory imported", () => {
  it("then ConnectionFactory is defined", () => {
    expect(ConnectionFactory).toBeDefined();
  });
  it("then ConnectionFactory.create static method is defined", () => {
    expect(ConnectionFactory.create).toBeDefined();
  });
  it("then ConnectionFactory.updateCoordinates static method is defined", () => {
    expect(ConnectionFactory.updateCoordinates).toBeDefined();
  });
  it("then ConnectionFactory.update static method is defined", () => {
    expect(ConnectionFactory.update).toBeDefined();
  });
  it("then ConnectionFactory.translate static method is defined", () => {
    expect(ConnectionFactory.translate).toBeDefined();
  });
});

describe("Given ConnectionFactory.create static method exist", () => {
  describe("when connection = Object.create(details)", () => {
    let details;
    let connection: Connection;
    beforeEach(() => {
      details = {
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 0, y: 400 },
          end: { x: 100, y: 400 },
        },
      };
      connection = ConnectionFactory.create(details);
    });
    it("then connection is exist", () => {
      expect(connection).toBeDefined();
    });
    it("then connection.id exist", () => {
      expect(connection.id).toBeDefined();
    });
    it("then connection.name exist", () => {
      expect(connection.name).toBeDefined();
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
    it("then connection.name equals details.name", () => {
      expect(connection.name).toBe(details.name);
    });
    it("then connection.coordinates equals details.coordinates", () => {
      expect(connection.coordinates).toEqual(details.coordinates);
    });
  });
});

describe("Given ConnectionFactory.updateCoordinates static method exist", () => {
  describe("when updateNode = ConnectionFactory.updateCoordinates(connection, coordinates)", () => {
    let connection: Connection;
    let coordinates: { start: Coordinates; end: Coordinates };
    let updatedNode: Connection;
    beforeEach(() => {
      connection = ConnectionFactory.create({
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 0, y: 400 },
          end: { x: 100, y: 400 },
        },
      });
      coordinates = {
        start: { x: 1, y: 500 },
        end: { x: 200, y: 500 },
      };
      updatedNode = ConnectionFactory.updateCoordinates(
        connection,
        coordinates
      );
    });
    it("then updatedNode exist", () => {
      expect(updatedNode).toBeDefined();
    });
    it("then updatedNode.id exist", () => {
      expect(updatedNode.id).toBeDefined();
    });
    it("then updatedNode.name exist", () => {
      expect(updatedNode.name).toBeDefined();
    });
    it("then updatedNode.coordinates exist", () => {
      expect(updatedNode.coordinates).toBeDefined();
    });
    it("then updatedNode.id equals connection.id", () => {
      expect(updatedNode.id).toEqual(connection.id);
    });
    it("then updatedNode.name equals connection.name", () => {
      expect(updatedNode.name).toEqual(connection.name);
    });
    it("then result.coordinates equals coordinates", () => {
      expect(updatedNode.coordinates).toEqual(coordinates);
    });
    it("then result.coordinates is not equal to connection.coordinates", () => {
      expect(updatedNode.coordinates).not.toEqual(connection.coordinates);
    });
  });
});

describe("Given ConnectionFactory.update exist", () => {
  describe("and connection exist", () => {
    let connection: Connection;
    beforeEach(() => {
      connection = ConnectionFactory.create({
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 0, y: 400 },
          end: { x: 100, y: 400 },
        },
      });
    });
    describe("when updatedNode = ConnectionFactory.update(connection, update)", () => {
      let details;
      beforeEach(() => {
        details = {
          id: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
          name: "",
          source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
          target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          coordinates: {
            start: { x: 1, y: 500 },
            end: { x: 500, y: 500 },
          },
        };
        connection = ConnectionFactory.update(connection, details);
      });
      it("then connection icon is updated", () => {
        expect(connection).toEqual(details);
      });
    });
  });
});

describe("Given ConnectionFactory.translate static method exist", () => {
  describe("and connection exist", () => {
    let connection: Connection;
    beforeEach(() => {
      connection = ConnectionFactory.create({
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 1, y: 500 },
          end: { x: 500, y: 500 },
        },
      });
    });
    describe("when connection = ConnectionFactory.translate(connection, offset)", () => {
      let coordinates;
      let offset;
      beforeEach(() => {
        coordinates = connection.coordinates;
        offset = {
          x: 10,
          y: 10,
        };
        connection = ConnectionFactory.translate(connection, offset);
      });
      it("then connection coordinates is original coordinates plus offset ", () => {
        let updateCoordinates = {
          start: {
            x: coordinates.start.x + offset.x,
            y: coordinates.start.y + offset.y,
          },
          end: {
            x: coordinates.end.x + offset.x,
            y: coordinates.end.y + offset.y,
          },
        };
        expect(connection.coordinates).toEqual(updateCoordinates);
      });
    });
  });
});
