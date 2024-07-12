import { Nodes } from "../../src/Nodes.Extended.js";

// Class Availability
describe("Given Nodes imported", () => {
  it("then Nodes exist", () => {
    expect(Nodes).toBeDefined();
  });
});

// Constructor Behavior
describe("Given Nodes instantiated", () => {
  it("then Nodes is an instance of Array", () => {
    const nodes = new Nodes();
    expect(nodes).toBeInstanceOf(Array);
  });
});

// Method Availability
describe("Given Nodes instantiated", () => {
  const nodes = new Nodes();
  it("then add method exists", () => {
    expect(nodes.add).toBeDefined();
  });
  it("then addMetadata method exists", () => {
    expect(nodes.addMetadata).toBeDefined();
  });
  it("then update method exists", () => {
    expect(nodes.update).toBeDefined();
  });
  it("then updateMetadata method exists", () => {
    expect(nodes.updateMetadata).toBeDefined();
  });
  it("then updateIcon method exists", () => {
    expect(nodes.updateIcon).toBeDefined();
  });
  it("then updateCoordinates method exists", () => {
    expect(nodes.updateCoordinates).toBeDefined();
  });
  it("then findById method exists", () => {
    expect(nodes.findById).toBeDefined();
  });
  it("then findByType method exists", () => {
    expect(nodes.findByType).toBeDefined();
  });
  it("then findByCoordinates method exists", () => {
    expect(nodes.findByCoordinates).toBeDefined();
  });
});
