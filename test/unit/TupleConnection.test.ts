import {
  TupleConnectionType,
  TupleCoordinates,
} from "../../src/TupleConnection.meta.js";

import { TupleConnection } from "../../src/TupleConnection.js";

describe("Given TupleConnection imported", () => {
  it("then TupleConnection is defined", () => {
    expect(TupleConnection).toBeDefined();
  });
  it("then TupleConnection.structure static property is defined", () => {
    expect(TupleConnection.structure).toBeDefined();
  });
  it("then TupleConnection.create static method is defined", () => {
    expect(TupleConnection.create).toBeDefined();
  });
  it("then TupleConnection.updateCoordinates static method is defined", () => {
    expect(TupleConnection.updateCoordinates).toBeDefined();
  });
  it("then TupleConnection.update static method is defined", () => {
    expect(TupleConnection.update).toBeDefined();
  });
  it("then TupleConnection.translate static method is defined", () => {
    expect(TupleConnection.translate).toBeDefined();
  });
  it("then TupleConnection.getConnectionBySource static method is defined", () => {
    expect(TupleConnection.getConnectionBySource).toBeDefined();
  });
});

describe("Given TupleConnection.structure static property exist", () => {
  it("then TupleConnection.structure equals object", () => {
    expect(TupleConnection.structure).toEqual("tuple");
  });
});

describe("Given TupleConnection.create static method exist", () => {
  describe("when connection = TupleConnection.create(details)", () => {
    let details;
    let connection: TupleConnectionType;
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
      connection = TupleConnection.create(details);
    });
    it("then connection is exist", () => {
      expect(connection).toBeDefined();
    });
    it("then connection[0] exist", () => {
      expect(connection[0]).toBeDefined();
    });
    it("then connection[1] exist", () => {
      expect(connection[1]).toBeDefined();
    });
    it("then connection[2] exist", () => {
      expect(connection[2]).toBeDefined();
    });
    it("then connection[3] exist", () => {
      expect(connection[3]).toBeDefined();
    });
    it("then connection[4] exist", () => {
      expect(connection[4]).toBeDefined();
    });
    it("then connection[1] equals details.name", () => {
      expect(connection[1]).toBe(details.name);
    });
    it("then connection[4] equals details.coordinates", () => {
      const expectedCoordinates: [TupleCoordinates, TupleCoordinates] = [
        [details.coordinates.start.x, details.coordinates.start.y],
        [details.coordinates.end.x, details.coordinates.end.y],
      ];
      expect(connection[4]).toEqual(expectedCoordinates);
    });
  });
});

describe("Given TupleConnection.updateCoordinates static method exist", () => {
  describe("when updateNode = Object.updateCoordinates(connection, coordinates)", () => {
    let connection: TupleConnectionType;
    let coordinates: {
      start: { x: number; y: number };
      end: { x: number; y: number };
    };
    let updatedConnection: TupleConnectionType;
    beforeEach(() => {
      connection = TupleConnection.create({
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
        end: { x: 500, y: 500 },
      };

      updatedConnection = TupleConnection.updateCoordinates(
        connection,
        coordinates
      );
    });
    it("then updatedConnection exist", () => {
      expect(updatedConnection).toBeDefined();
    });
    it("then updatedConnection[0] exist", () => {
      expect(updatedConnection[0]).toBeDefined();
    });
    it("then updatedConnection[1] exist", () => {
      expect(updatedConnection[1]).toBeDefined();
    });
    it("then updatedConnection[4] exist", () => {
      expect(updatedConnection[4]).toBeDefined();
    });
    it("then updatedConnection[0] equals connection[0]", () => {
      expect(updatedConnection[0]).toEqual(connection[0]);
    });
    it("then updatedConnection[1] equals connection[1]", () => {
      expect(updatedConnection[1]).toEqual(connection[1]);
    });
    it("then result.coordinates equals coordinates", () => {
      let expectedCoordinates: [TupleCoordinates, TupleCoordinates] = [
        [coordinates.start.x, coordinates.start.y],
        [coordinates.end.x, coordinates.end.y],
      ];
      expect(updatedConnection[4]).toEqual(expectedCoordinates);
    });
  });
});

describe("Given ObjectType.update exist", () => {
  describe("and connection exist", () => {
    let connection: TupleConnectionType;
    beforeEach(() => {
      connection = TupleConnection.create({
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 0, y: 400 },
          end: { x: 100, y: 400 },
        },
      });
    });
    describe("when updatedConnection = Object.update(connection, update)", () => {
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
        connection = TupleConnection.update(connection, details);
      });
      it("then connection icon is updated", () => {
        expect(connection).toEqual(details);
      });
    });
  });
});

describe("Given ObjectType.translate static method exist", () => {
  describe("and connection exist", () => {
    let connection: TupleConnectionType;
    beforeEach(() => {
      connection = TupleConnection.create({
        name: "",
        source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
        target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
        coordinates: {
          start: { x: 1, y: 500 },
          end: { x: 500, y: 500 },
        },
      });
    });
    describe("when connection = ObjectType.translate(connection, offset)", () => {
      let coordinates;
      let offset;
      beforeEach(() => {
        coordinates = connection[4];
        offset = {
          x: 10,
          y: 10,
        };
        connection = TupleConnection.translate(connection, offset);
      });
      it("then connection coordinates is original coordinates plus offset ", () => {
        let updateCoordinates: [TupleCoordinates, TupleCoordinates] = [
          [coordinates[0][0] + offset.x, coordinates[0][1] + offset.y],
          [coordinates[1][0] + offset.x, coordinates[1][1] + offset.y],
        ];
        expect(connection[4]).toEqual(updateCoordinates);
      });
    });
  });
});

describe("Given TupleConnection.getConnectionBySource static method exist", () => {
  describe("and connections exist", () => {
    let connections: TupleConnectionType[];
    beforeEach(() => {
      connections = [
        TupleConnection.create({
          name: "",
          source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
          target: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          coordinates: {
            start: { x: 1, y: 500 },
            end: { x: 500, y: 500 },
          },
        }),
        TupleConnection.create({
          name: "",
          source: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          target: "5a3e4a90-b266-4be3-b04d-abb627d78749",
          coordinates: {
            start: { x: 100, y: 400 },
            end: { x: 200, y: 400 }
          }
        }),
        TupleConnection.create({
          name: "",
          source: "35c6779a-fd9d-4089-d1ab-af0b932fc912",
          target: "5a3e4a90-b266-4be3-b04d-abb627d78749",
          coordinates: {
            start: { x: 200, y: 400 },
            end: { x: 1, y: 500 }
          }
        })
      ];
    });

    describe("when connections = ObjectType.getConnectionBySource(connections, nodeId)", () => {
      let nodeId;
      let result: TupleConnectionType[];
      beforeEach(() => {
        nodeId = "35c6779a-fd9d-4089-d1ab-af0b932fc912";
        result = TupleConnection.getConnectionBySource(connections, nodeId);
      });
      it("then result is exist", () => {
        expect(result).toBeDefined();
      });
      it("then result is an array", () => {
        expect(result).toBeInstanceOf(Array);
      });
      it("then result length is 2", () => {
        expect(result.length).toBe(2);
      });
      it("then result[0].source equals nodeId", () => {
        expect(result[0][2]).toBe(nodeId);
      });
    });
  });
});
