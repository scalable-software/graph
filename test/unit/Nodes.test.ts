import { Nodes } from "@scalable-software/graph.structure/Nodes";

// Static Members Availability
describe("Given Nodes imported", () => {
  it("then Nodes exist", () => {
    expect(Nodes).toBeDefined();
  });
  it("then Nodes.init exists", () => {
    expect(Nodes.init).toBeDefined();
  });
});

// Static Methods Behavior
describe("Given Nodes.init() static method exist", () => {
  describe("when nodes = Nodes.init()", () => {
    let nodes;
    beforeEach(() => {
      nodes = Nodes.init();
    });
    it("then nodes is an instance of Nodes", () => {
      expect(nodes instanceof Array).toBe(true);
    });
  });
});

// Instance Properties Availability
describe("Given nodes instance", () => {
  let nodes;
  beforeEach(() => {
    nodes = new Nodes();
  });
  it("then nodes._proxy private property exists", () => {
    expect(nodes["_proxy"]).toBeDefined();
  });
});

// Instance Properties Value
describe("Given nodes instance", () => {
  let nodes;
  let data = ["test"];
  beforeEach(() => {
    nodes = Nodes.init(data);
  });
  it("then nodes is an data", () => {
    expect(nodes).toEqual(data);
  });
});

// Instance Methods Availability
describe("Given nodes instance", () => {
  let nodes;
  beforeEach(() => {
    nodes = new Nodes();
  });
  it("then nodes._get exists", () => {
    expect(nodes["_get"]).toBeDefined();
  });
  it("then nodes._set exists", () => {
    expect(nodes["_set"]).toBeDefined();
  });
  it("then nodes._createProxy exists", () => {
    expect(nodes["_createProxy"]).toBeDefined();
  });
  it("then nodes._getPropertyType exists", () => {
    expect(nodes["_getPropertyType"]).toBeDefined();
  });
});

// Instance Getters Availability
describe("Given nodes instance", () => {
  let nodes;
  beforeEach(() => {
    nodes = new Nodes();
  });
  it("then nodes.symbol private getter exists", () => {
    expect(nodes["symbol"]).toBeDefined();
  });
  it("then nodes.index private getter exists", () => {
    expect(nodes["index"]).toBeDefined();
  });
  it("then nodes.length private getter exists", () => {
    expect(nodes["length"]).toBeDefined();
  });
  it("then nodes.property private getter exists", () => {
    expect(nodes["property"]).toBeDefined();
  });
  it("then nodes.method private getter exists", () => {
    expect(nodes["method"]).toBeDefined();
  });
});

// Instance Methods Behavior
describe("Given nodes instance", () => {
  let nodes;
  beforeEach(() => {
    nodes = new Nodes();
  });
  describe("when proxy = nodes._createProxy(array)", () => {
    let proxy;
    let array = [];
    beforeEach(() => {
      proxy = nodes["_createProxy"](array);
    });
    it("then proxy is equal to an empty array", () => {
      expect(proxy).toEqual(array);
    });
  });
});
