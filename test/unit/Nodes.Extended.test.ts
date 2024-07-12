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
});
