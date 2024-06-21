import { Connection } from "../../src/Connection.js";
import {
  Connection as iConnection,
  Coordinates,
} from "../../src/Connection.meta.js";

describe("Given Connection imported", () => {
  it("then Connection is defined", () => {
    expect(Connection).toBeDefined();
  });
  it("then Connection.create static method is defined", () => {
    expect(Connection.create).toBeDefined();
  });
  it("then Connection.updateCoordinates static method is defined", () => {
    expect(Connection.updateCoordinates).toBeDefined();
  });
  it("then Connection.update static method is defined", () => {
    expect(Connection.update).toBeDefined();
  });
  it("then Connection.translate static method is defined", () => {
    expect(Connection.translate).toBeDefined();
  });
});

describe("Given Connection.create static method exist", () => {
  describe("when connection = Object.create(details)", () => {
    let details;
    let connection: iConnection;
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
      connection = Connection.create(details);
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

describe("Given Connection.updateCoordinates static method exist", () => {
  describe("when updateNode = Connection.updateCoordinates(connection, coordinates)", () => {
    let connection: iConnection;
    let coordinates: { start: Coordinates; end: Coordinates };
    let updatedNode: iConnection;
    beforeEach(() => {
      connection = Connection.create({
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
      updatedNode = Connection.updateCoordinates(connection, coordinates);
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

describe("Given Connection.update exist", () => {
  describe("and connection exist", () => {
    let connection: iConnection;
    beforeEach(() => {
      connection = Connection.create({
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 0, y: 400 },
          end: { x: 100, y: 400 },
        },
      });
    });
    describe("when updatedNode = Object.update(connection, update)", () => {
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
        connection = Connection.update(connection, details);
      });
      it("then connection icon is updated", () => {
        expect(connection).toEqual(details);
      });
    });
  });
});

describe("Given Connection.translate static method exist", () => {
  describe("and connection exist", () => {
    let connection: iConnection;
    beforeEach(() => {
      connection = Connection.create({
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 1, y: 500 },
          end: { x: 500, y: 500 },
        },
      });
    });
    describe("when connection = Connection.translate(connection, offset)", () => {
      let coordinates;
      let offset;
      beforeEach(() => {
        coordinates = connection.coordinates;
        offset = {
          x: 10,
          y: 10,
        };
        connection = Connection.translate(connection, offset);
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
