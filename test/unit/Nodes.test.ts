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
  it("then nodes.default private getter exists", () => {
    expect(nodes["default"]).toBeDefined();
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
  describe("when property = nodes._getPropertyType(symbol, target)", () => {
    let property;
    let symbol = Symbol("test");
    let target = [];
    beforeEach(() => {
      property = nodes["_getPropertyType"](symbol, target);
    });
    it("then property is equal to 'symbol'", () => {
      expect(property).toEqual("symbol");
    });
  });
  describe("when property = nodes._getPropertyType(index, target)", () => {
    let property;
    let index = 0;
    let target = [];
    beforeEach(() => {
      property = nodes["_getPropertyType"](index, target);
    });
    it("then property is equal to 'index'", () => {
      expect(property).toEqual("index");
    });
  });
  describe("when property = nodes._getPropertyType('length', target)", () => {
    let property;
    let target = [];
    beforeEach(() => {
      property = nodes["_getPropertyType"]("length", target);
    });
    it("then property is equal to 'length'", () => {
      expect(property).toEqual("length");
    });
  });
  describe("when property = nodes._getPropertyType('property', target)", () => {
    let property;
    let target = [];
    beforeEach(() => {
      property = nodes["_getPropertyType"]("property", target);
    });
    it("then property is equal to 'property'", () => {
      expect(property).toEqual("property");
    });
  });
  describe("when property = nodes._getPropertyType('method', target)", () => {
    let property;
    let target = [];
    beforeEach(() => {
      target["method"] = () => {};
      property = nodes["_getPropertyType"]("method", target);
    });
    it("then property is equal to 'method'", () => {
      expect(property).toEqual("method");
    });
  });
});

// Proxy Property Availability
describe("Given nodes proxy instance", () => {
  let nodes;
  beforeEach(() => {
    nodes = Nodes.init();
  });
  it("then nodes.length exists", () => {
    expect(nodes.length).toBeDefined();
  });
});

// Proxy Property Value
describe("Given nodes proxy instance", () => {
  let nodes;
  let data = ["test"];
  beforeEach(() => {
    nodes = Nodes.init(data);
  });
  it("then nodes.length is equal to 1", () => {
    expect(nodes.length).toEqual(1);
  });
});
