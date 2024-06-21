import { Utilities } from "../../src/Utilities/Utilities.js";

describe("Given Utilities imported", () => {
  it("then Utilities exist", () => {
    expect(Utilities).toBeDefined();
  });
  describe("Given Utilities exist", () => {
    it("then Utilities has a isUUID method", () => {
      expect(Utilities.isUUID).toBeDefined();
    });
    describe("when Utilities.isUUID() is called with a valid UUID", () => {
      it("then it returns true", () => {
        const uuid = "c4076ede-bddf-47f3-8237-5712b4d3eda6";
        expect(Utilities.isUUID(uuid)).toBe(true);
      });
    });
    describe("when Utilities.isUUID() is called with an invalid UUID", () => {
      it("then it returns false", () => {
        const uuid = "invalid-uuid";
        expect(Utilities.isUUID(uuid)).toBe(false);
      });
    });
    it("then Utilities has a uuid property", () => {
      expect(Utilities.uuid).toBeDefined();
    });
    describe("when value = Utilities.uuid", () => {
      it("then values is a valid UUID", () => {
        const uuid = Utilities.uuid;
        expect(Utilities.isUUID(uuid)).toBe(true);
      });
    });
    it("then Utilities has a getRandomElement method", () => {
      expect(Utilities.getRandomElement).toBeDefined();
    });
    describe("when Utilities.getRandomElement() is called with an array", () => {
      it("then it returns a random element from the array", () => {
        const array = ["start", "workflow", "delay", "end", "decision"];
        const randomElement = Utilities.getRandomElement(array);
        expect(array).toContain(randomElement);
      });
    });
  });
});
