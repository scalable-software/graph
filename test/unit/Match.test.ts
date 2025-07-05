import { Match } from "../../src/utilities/match.js";

given(`Match class availability test`, () => {
  and(`Match is imported`, () => {
    then(`Match is defined`, () => {
      expect(Match).toBeDefined();
    });
  });
});

given(`Match.find static method availability test`, () => {
  then(`Match.find is defined`, () => {
    expect(Match.find).toBeDefined();
  });
  and(`Match.find is defined`, () => {
    then(`Match.find is a function`, () => {
      expect(Match.find).toBeInstanceOf(Function);
    });
  });
});

given(`Match.find static method behavior test`, () => {
  when(`Match.find is called with sets having two unique sets`, () => {
    let sets: [any[], any[]];
    let result;
    beforeEach(() => {
      const one = [
        { id: "1", name: "Alpha" },
        { id: "2", name: "Beta" },
        { id: "3", name: "Gamma" },
      ];
      const two = [
        { id: "4", name: "Delta" },
        { id: "5", name: "Epsilon" },
      ];
      sets = [one, two];
      result = Match.find(sets);
    });
    then(`results is undefined`, () => {
      expect(result).toBeUndefined();
    });
  });
  when(`Match.find is called with sets having two sets`, () => {
    let sets: [any[], any[]];
    let result;
    beforeEach(() => {
      const one = [
        { id: "1", name: "Alpha" },
        { id: "2", name: "Beta" },
        { id: "3", name: "Gamma" },
      ];
      const two = [
        { id: "3", name: "Gamma" },
        { id: "4", name: "Delta" },
      ];
      sets = [one, two];
      result = Match.find(sets);
    });
    then(`results is defined`, () => {
      expect(result).toBeDefined();
    });
    and(`results is defined`, () => {
      then(`results is an object`, () => {
        expect(result).toBeInstanceOf(Object);
      });
      and(`results is an object`, () => {
        then(`results is the matching entity`, () => {
          expect(result).toEqual({ id: "3", name: "Gamma" });
        });
      });
    });
  });
  when(`Match.find is called with sets having two sets using id`, () => {
    let sets: [any[], any[]];
    let result;
    beforeEach(() => {
      const one = [
        { id: "1", name: "Alpha" },
        { id: "2", name: "Beta" },
        { id: "3", name: "Gamma" },
      ];
      const two = [
        { id: "3", name: "Test" },
        { id: "4", name: "Delta" },
      ];
      sets = [one, two];
      result = Match.find(sets, (item) => item.id);
    });
    then(`results is defined`, () => {
      expect(result).toBeDefined();
    });
    and(`results is defined`, () => {
      then(`results is an object`, () => {
        expect(result).toBeInstanceOf(Object);
      });
      and(`results is an object`, () => {
        then(`results is the matching entity`, () => {
          expect(result).toEqual({ id: "3", name: "Test" });
        });
      });
    });
  });
  when(`Match.find is called with sets having two empty sets`, () => {
    let sets: [any[], any[]];
    let result;
    beforeEach(() => {
      const one = [];
      const two = [];
      sets = [one, two];
      result = Match.find(sets);
    });
    then(`results is undefined`, () => {
      expect(result).toBeUndefined();
    });
  });
  when(`Match.find is called with sets having one empty set`, () => {
    let sets: [any[], any[]];
    let result;
    beforeEach(() => {
      const one = [{ id: "1", name: "Alpha" }];
      const two = [];
      sets = [one, two];
      result = Match.find(sets);
    });
    then(`results is undefined`, () => {
      expect(result).toBeUndefined();
    });
  });
});
