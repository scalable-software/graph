import {
  Nodes,
  NodeType,
  Node,
} from "@scalable-software/graph.structure/Nodes";

import { Helper } from "./Helper.js";

// Static Members Availability
describe("Given Nodes imported", () => {
  it("then Nodes exist", () => {
    expect(Nodes).toBeDefined();
  });
  it("then Nodes.init exists", () => {
    expect(Nodes.init).toBeDefined();
  });
  it("then Nodes.addMetadata exists", () => {
    expect(Nodes.addMetadata).toBeDefined();
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
  let node: Node;
  beforeEach(() => {
    node = {
      id: "1",
      name: "Node1",
      type: NodeType.START,
      coordinates: { x: 0, y: 0 },
      icon: "./icon.svg",
    };
    nodes = Nodes.init([node]);
  });
  it("then nodes is an data", () => {
    expect(nodes).toEqual([node]);
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
  it("then nodes.create exists", () => {
    expect(nodes.create).toBeDefined();
  });
  it("then nodes.addMetadata exists", () => {
    expect(nodes.addMetadata).toBeDefined();
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

// Instance Setters Availability
describe("Given nodes instance", () => {
  let nodes;
  beforeEach(() => {
    nodes = new Nodes();
  });
  it("then nodes.property private setter exists", () => {
    Helper.hasSetter(nodes, "property");
    expect(Helper.hasSetter(nodes, "property")).toEqual(true);
  });
  it("then nodes.symbol private setter exists", () => {
    Helper.hasSetter(nodes, "symbol");
    expect(Helper.hasSetter(nodes, "symbol")).toEqual(true);
  });
  it("then nodes.index private setter exists", () => {
    Helper.hasSetter(nodes, "index");
    expect(Helper.hasSetter(nodes, "index")).toEqual(true);
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
  describe("when property = nodes._getPropertyType(property, target)", () => {
    let target;
    beforeEach(() => {
      target = [];
    });
    describe("and property is a symbol", () => {
      let property;
      let symbol = Symbol("test");
      beforeEach(() => {
        property = nodes["_getPropertyType"](symbol, target);
      });
      it("then property is equal to 'symbol'", () => {
        expect(property).toEqual("symbol");
      });
    });
    describe("and property is an index", () => {
      let property;
      let index = 0;
      beforeEach(() => {
        property = nodes["_getPropertyType"](index, target);
      });
      it("then property is equal to 'index'", () => {
        expect(property).toEqual("index");
      });
    });
    describe("and property is length", () => {
      let property;
      beforeEach(() => {
        property = nodes["_getPropertyType"]("length", target);
      });
      it("then property is equal to 'length'", () => {
        expect(property).toEqual("length");
      });
    });
    describe("and property is property", () => {
      let property;
      beforeEach(() => {
        property = nodes["_getPropertyType"]("property", target);
      });
      it("then property is equal to 'property'", () => {
        expect(property).toEqual("property");
      });
    });
    describe("and property is method", () => {
      let property;
      beforeEach(() => {
        target["method"] = () => {};
        property = nodes["_getPropertyType"]("method", target);
      });
      it("then property is equal to 'method'", () => {
        expect(property).toEqual("method");
      });
    });
  });
  describe("when nodes.create(node)", () => {
    let node: Node;
    beforeEach(() => {
      node = {
        id: "1",
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes.create(node);
    });
    it("then nodes.nodes is equal to [node]", () => {
      expect(nodes["nodes"]).toEqual([node]);
    });
  });
});

// Proxy Property Value
describe("Given nodes proxy instance", () => {
  let nodes;
  beforeEach(() => {
    nodes = Nodes.init();
  });
  it("then nodes.length is equal to 1", () => {
    expect(nodes.length).toEqual(0);
  });
});
describe("Given element of type symbol", () => {
  const symbol = Symbol("test");
  const value = "value";
  describe("when nodes proxy instance", () => {
    let nodes;
    beforeEach(() => {
      nodes = Nodes.init();
      nodes[symbol] = value;
    });
    it("then nodes[symbol] is equal to value", () => {
      expect(nodes[symbol]).toEqual(value);
    });
  });
});
describe("Given element of type index", () => {
  const index = 0;
  const value = "value";
  describe("when nodes proxy instance", () => {
    let nodes;
    beforeEach(() => {
      nodes = Nodes.init();
      nodes[index] = value;
    });
    it("then nodes[index] is equal to value", () => {
      expect(nodes[index]).toEqual(value);
    });
  });
});
describe("Given element of type function", () => {
  const property = "method";
  const value = () => {};
  describe("when nodes proxy instance", () => {
    let nodes;
    beforeEach(() => {
      nodes = Nodes.init();
      nodes[property] = value;
    });
    it("then nodes[property] is equal to value", () => {
      expect(nodes[property]).toEqual(value);
    });
    it("then nodes[property] is a function", () => {
      expect(typeof nodes[property]).toEqual("function");
    });
  });
});
describe("Given element of type property", () => {
  const property = "property";
  const value = "value";
  describe("when nodes proxy instance", () => {
    let nodes;
    beforeEach(() => {
      nodes = Nodes.init();
      nodes[property] = value;
    });
    it("then nodes[property] is equal to value", () => {
      expect(nodes[property]).toEqual(value);
    });
  });
});

// Proxy Method Availability
describe("Given nodes proxy instance", () => {
  let nodes;
  beforeEach(() => {
    nodes = Nodes.init();
  });
  it("then nodes.create exists", () => {
    expect(nodes.create).toBeDefined();
  });
});

// Proxy Method Behavior
describe("Given nodes proxy instance", () => {
  let nodes;
  beforeEach(() => {
    nodes = Nodes.init();
  });
  describe("when nodes.create(node)", () => {
    let node: Omit<Node, "id">;
    beforeEach(() => {
      node = {
        name: "Node1",
        type: NodeType.START,
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes.create(node);
    });
    it("then node is added to nodes", () => {
      delete nodes[0].id;
      expect(nodes).toEqual([node]);
    });
    it("then node in nodes has id", () => {
      expect(nodes[0].id).toBeDefined();
    });
    it("then node in nodes has name", () => {
      expect(nodes[0].name).toEqual(node.name);
    });
    it("then node in nodes has type", () => {
      expect(nodes[0].type).toEqual(node.type);
    });
    it("then node in nodes has coordinates", () => {
      expect(nodes[0].coordinates).toEqual(node.coordinates);
    });
    it("then node in nodes has icon", () => {
      expect(nodes[0].icon).toEqual(node.icon);
    });
  });
});
