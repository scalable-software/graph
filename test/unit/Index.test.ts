import { Index } from "../../src/utilities/Index.js";

given(`Index class availability test`, () => {
  and(`Index is imported`, () => {
    then(`Index is defined`, () => {
      expect(Index).toBeDefined();
    });
  });
});

given(`Index.byReference static method availability test`, () => {
  then(`Index.byReference is defined`, () => {
    expect(Index.byReference).toBeDefined();
  });
  and(`Index.byReference is defined`, () => {
    then(`Index.byReference is a function`, () => {
      expect(Index.byReference).toBeInstanceOf(Function);
    });
  });
});

given(`Index.byReference static method behavior test`, () => {
  when("Index.byReference called with items and valid item", () => {
    let items: { id: string }[];
    let item: { id: string };
    let result: number;
    beforeEach(() => {
      item = { id: "a1" };
      const obj2 = { id: "b2" };
      items = [item, obj2];
      result = Index.byReference(items, item);
    });
    then("result is the index of the matching item", () => {
      expect(result).toEqual(0);
    });
  });
  when("Index.byReference called with items and invalid item", () => {
    let item: { id: string };
    let items: { id: string }[];
    let result: number;
    beforeEach(() => {
      item = { id: "a1" };
      items = [item];
      result = Index.byReference(items, { id: "a1" });
    });
    then("result is -1", () => {
      expect(result).toEqual(-1);
    });
  });
});

given(`Index.byId static method availability test`, () => {
  then(`Index.byId is defined`, () => {
    expect(Index.byId).toBeDefined();
  });
  and(`Index.byId is defined`, () => {
    then(`Index.byId is a function`, () => {
      expect(Index.byId).toBeInstanceOf(Function);
    });
  });
});

given(`Index.byId static method behavior test`, () => {
  when("Index.byId called with items and valid id", () => {
    let items: { id: string; name: string }[];
    let id: string;
    let result: number;
    beforeEach(() => {
      items = [
        { id: "a1", name: "Item A" },
        { id: "b2", name: "Item B" },
      ];
      id = "b2";
      result = Index.byId(items, id);
    });
    then("result is the index of the matching item", () => {
      expect(result).toEqual(1);
    });
  });
  when("Index.byId called with items and invalid id", () => {
    let items: { id: string; name: string }[];
    let id: string;
    let result: number;
    beforeEach(() => {
      items = [
        { id: "a1", name: "Item A" },
        { id: "b2", name: "Item B" },
      ];
      id = "c3";
      result = Index.byId(items, id);
    });
    then("result is -1", () => {
      expect(result).toEqual(-1);
    });
  });
});

given(`Index.find static method availability test`, () => {
  then(`Index.find is defined`, () => {
    expect(Index.find).toBeDefined();
  });
  and(`Index.find is defined`, () => {
    then(`Index.find is a function`, () => {
      expect(Index.find).toBeInstanceOf(Function);
    });
  });
});

given(`Index.find static method behavior test`, () => {
  when("Index.find is called with items and valid id", () => {
    let items: { id: string; name: string }[];
    let id: string;
    let result: number;
    beforeEach(() => {
      items = [
        { id: "a1", name: "Item A" },
        { id: "b2", name: "Item B" },
      ];
      id = "b2";
      result = Index.find(items, id);
    });
    then("result is the index of the matching item", () => {
      expect(result).toEqual(1);
    });
  });
  when("Index.find is called with items and invalid id", () => {
    let items: { id: string; name: string }[];
    let id: string;
    let result: number;
    beforeEach(() => {
      items = [
        { id: "a1", name: "Item A" },
        { id: "b2", name: "Item B" },
      ];
      id = "c3";
      result = Index.find(items, id);
    });
    then("result is -1", () => {
      expect(result).toEqual(-1);
    });
  });
  when("Index.find is called with items and valid item", () => {
    let item: { id: string };
    let items: { id: string }[];
    let result: number;
    beforeEach(() => {
      item = { id: "a1" };
      const obj2 = { id: "b2" };
      items = [item, obj2];
      result = Index.find(items, item);
    });
    then("result is the index of the matching item", () => {
      expect(result).toEqual(0);
    });
  });
  when("Index.find is called with items and invalid item", () => {
    let item: { id: string };
    let items: { id: string }[];
    let result: number;
    beforeEach(() => {
      item = { id: "a1" };
      items = [item];
      result = Index.find(items, { id: "a1" });
    });
    then("result is -1", () => {
      expect(result).toEqual(-1);
    });
  });
});
