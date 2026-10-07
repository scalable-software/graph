import { Validate, Validator, Exception } from "@scalable.software/graph";

given(`Validator class availability test`, () => {
  and(`Validator is imported`, () => {
    then(`Validator is defined`, () => {
      expect(Validator).toBeDefined();
    });
  });
});

given(`Validator.validate static method availability test`, () => {
  then(`Validator.validate is defined`, () => {
    expect(Validator.validate).toBeDefined();
  });
  and(`Validator.validate is defined`, () => {
    then(`Validator.validate is a function`, () => {
      expect(Validator.validate).toBeInstanceOf(Function);
    });
  });
});

given(`Validator.validate static method behavior test`, () => {
  when(`Validator.validate is called with entity and validators`, () => {
    let entity: any;
    let validators: any[];
    let result: any;
    let error: Exception.Exception;
    beforeEach(() => {
      entity = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "John Doe",
      };
      validators = [
        ({ id }) => Validate.uuid(id),
        ({ name }) => Validate.name(name),
      ];

      try {
        result = Validator.validate(entity, validators);
      } catch (e) {
        error = e;
      }
    });
    then(`result is defined`, () => {
      expect(result).toBeDefined();
    });
    then(`Validator.validate returns the entity`, () => {
      expect(result).toBe(entity);
    });
    then(`error is undefined`, () => {
      expect(error).toBeUndefined();
    });
  });
  when(
    `Validator.validate is called with invalid entity.id and validators`,
    () => {
      let entity: any;
      let validators: any[];
      let result: any;
      let error: Exception.Exception;
      beforeEach(() => {
        entity = {
          id: "invalid",
          name: "John Doe",
        };
        validators = [
          ({ id }) => Validate.uuid(id),
          ({ name }) => Validate.name(name),
        ];
        try {
          result = Validator.validate(entity, validators);
        } catch (e) {
          error = e;
        }
      });
      then(`result is undefined`, () => {
        expect(result).toBeUndefined();
      });
      then(`error is defined`, () => {
        expect(error).toBeDefined();
      });
      and(`error is defined`, () => {
        then(`error is an instance of ValidationException`, () => {
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    }
  );
  when(
    `Validate.validate is called with invalid entity.name and validators`,
    () => {
      let entity: any;
      let validators: any[];
      let result: any;
      let error: Exception.Exception;
      beforeEach(() => {
        entity = {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "J".repeat(101),
        };
        validators = [
          ({ id }) => Validate.uuid(id),
          ({ name }) => Validate.name(name),
        ];
        try {
          result = Validator.validate(entity, validators);
        } catch (e) {
          error = e;
        }
      });
      then(`result is undefined`, () => {
        expect(result).toBeUndefined();
      });
      then(`error is defined`, () => {
        expect(error).toBeDefined();
      });
      and(`error is defined`, () => {
        then(`error is an instance of ValidationException`, () => {
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    }
  );
  when(`Validate.validate is called with invalid entity and validators`, () => {
    let entity: any;
    let validators: any[];
    let result: any;
    let error: Exception.Exception;
    beforeEach(() => {
      entity = {
        id: "invalid",
        name: "J".repeat(101),
      };
      validators = [
        ({ id }) => Validate.uuid(id),
        ({ name }) => Validate.name(name),
      ];
      try {
        result = Validator.validate(entity, validators);
      } catch (e) {
        error = e;
      }
    });
    then(`result is undefined`, () => {
      expect(result).toBeUndefined();
    });
    then(`error is defined`, () => {
      expect(error).toBeDefined();
    });
    and(`error is defined`, () => {
      then(`error is an instance of ValidationException`, () => {
        expect(error).toBeInstanceOf(Exception.ValidationException);
      });
    });
  });
});

given(`Validator.compare static method availability test`, () => {
  then(`Validator.compare is defined`, () => {
    expect(Validator.compare).toBeDefined();
  });
  and(`Validator.compare is defined`, () => {
    then(`Validator.compare is a function`, () => {
      expect(Validator.compare).toBeInstanceOf(Function);
    });
  });
});

given(`Validator compare static method behavior test`, () => {
  when(`Validator.compare is called two unique sets and validators`, () => {
    let sets: [any[], any[]];
    let result: any;
    let error: Exception.Exception;
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
      try {
        result = Validator.compare(sets, [(sets) => Validate.distinct(sets)]);
      } catch (e) {
        error = e;
      }
    });
    then(`result is defined`, () => {
      expect(result).toBeDefined();
    });
    and(`result is defined`, () => {
      then(`result is the second set`, () => {
        expect(result).toEqual(sets[1]);
      });
    });
    then(`error is undefined`, () => {
      expect(error).toBeUndefined();
    });
  });
  when(`Validator.compare is called with duplicate sets and validators`, () => {
    let sets: [any[], any[]];
    let result: any;
    let error: Exception.Exception;
    beforeEach(() => {
      const one = [
        { id: "1", name: "Alpha" },
        { id: "2", name: "Beta" },
        { id: "3", name: "Gamma" },
      ];

      const two = [
        { id: "1", name: "Alpha" },
        { id: "2", name: "Beta" },
        { id: "3", name: "Gamma" },
      ];

      sets = [one, two];
      try {
        result = Validator.compare(sets, [(sets) => Validate.distinct(sets)]);
      } catch (e) {
        error = e;
      }
    });
    then(`result is undefined`, () => {
      expect(result).toBeUndefined();
    });
    then(`error is defined`, () => {
      expect(error).toBeDefined();
    });
    and(`error is defined`, () => {
      then(`error is an instance of ValidationException`, () => {
        expect(error).toBeInstanceOf(Exception.ValidationException);
      });
    });
  });
  when(
    `Validator.compare is called with duplicate sets and multiple validators`,
    () => {
      let sets: [any[], any[]];
      let result: any;
      let error: Exception.Exception;
      beforeEach(() => {
        const one = [
          { id: "1", name: "Alpha" },
          { id: "2", name: "Beta" },
          { id: "3", name: "Gamma" },
        ];

        const two = [
          { id: "1", name: "Alpha" },
          { id: "2", name: "Beta" },
          { id: "3", name: "Gamma" },
        ];

        sets = [one, two];
        try {
          result = Validator.compare(sets, [
            (sets) => Validate.distinct(sets, (node) => node.id),
            (sets) => Validate.distinct(sets, (node) => node.name),
          ]);
        } catch (e) {
          error = e;
        }
      });
      then(`result is undefined`, () => {
        expect(result).toBeUndefined();
      });
      then(`error is defined`, () => {
        expect(error).toBeDefined();
      });
      and(`error is defined`, () => {
        then(`error is an instance of ValidationException`, () => {
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
      });
    }
  );
});
