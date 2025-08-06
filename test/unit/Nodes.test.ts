import { Nodes, Exception } from "@scalable.software/graph";
import type {
  INode,
  UUID,
  Coordinates,
  Offset,
} from "@scalable.software/graph";

given(`Nodes class availability test`, () => {
  and(`Nodes is imported`, () => {
    then(`Nodes is defined`, () => {
      expect(Nodes).toBeDefined();
    });
    and(`Nodes is defined`, () => {
      then(`Nodes is an instance of Function`, () => {
        expect(Nodes).toBeInstanceOf(Function);
      });
    });
  });
});

given(`Nodes class instantiation test`, () => {
  when("a nodes instance is created", () => {
    let nodes: Nodes<INode>;
    beforeEach(() => {
      nodes = Nodes.create();
    });
    then("nodes is defined", () => {
      expect(nodes).toBeDefined();
    });
    and("nodes is defined", () => {
      then("nodes is an instance of Nodes", () => {
        expect(nodes).toBeInstanceOf(Nodes);
      });
      then("nodes is an instance of Array", () => {
        expect(nodes).toBeInstanceOf(Array);
      });
    });
  });
});

given(`Nodes.create static method availability test`, () => {
  and(`Nodes is imported`, () => {
    then(`Nodes.create is defined`, () => {
      expect(Nodes.create).toBeDefined();
    });
    and(`Nodes.create is defined`, () => {
      then(`Nodes.create is an instance of Function`, () => {
        expect(Nodes.create).toBeInstanceOf(Function);
      });
    });
  });
});

given(`Nodes.create static method behavior test`, () => {
  when("Nodes.create is called", () => {
    let nodes: Nodes<INode>;
    beforeEach(() => {
      nodes = Nodes.create();
    });
    then("nodes is defined", () => {
      expect(nodes).toBeDefined();
    });
    and("nodes is defined", () => {
      then("nodes is an instance of Nodes", () => {
        expect(nodes).toBeInstanceOf(Nodes);
      });
      and("nodes is an instance of Nodes", () => {
        then("nodes.length is 0", () => {
          expect(nodes.length).toBe(0);
        });
      });
    });
  });
  when("Nodes.create() is called with valid nodes", () => {
    let nodes: Nodes<INode>;
    let data: INode[];
    beforeEach(() => {
      data = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 1, y: 1 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d745",
          coordinates: { x: 2, y: 3 },
        },
      ];
      nodes = Nodes.create(data);
    });
    then("nodes is defined", () => {
      expect(nodes).toBeDefined();
    });
    and("nodes is defined", () => {
      then("nodes is an instance of Nodes", () => {
        expect(nodes).toBeInstanceOf(Nodes);
      });
      and("nodes is an instance of Nodes", () => {
        then("nodes.length is data.length", () => {
          expect(nodes.length).toBe(data.length);
        });
        then("nodes contains is data", () => {
          nodes.forEach((node, index) => {
            expect(node).toEqual(data[index]);
          });
        });
      });
    });
  });
  when("Nodes.create() is called with invalid nodes", () => {
    let nodes: INode[];
    let error: Exception.Exception;
    beforeEach(() => {
      nodes = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 1, y: 1 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d745",
          coordinates: { x: 2, y: 3 },
        },
        {
          id: "1",
          coordinates: { x: 2, y: 3 },
        },
      ];
      try {
        nodes = Nodes.create(nodes);
      } catch (e) {
        error = e;
      }
    });
    then("error is defined", () => {
      expect(error).toBeDefined();
    });
    and("error is defined", () => {
      then(
        "error is an instance of Exception.ValidationException",
        () => {
          expect(error).toBeInstanceOf(Exception.ValidationException);
        }
      );
      and(
        "error is an instance of Exception.ValidationException",
        () => {
          then(
            "error.errors[0] is Exception.ValidationException",
            () => {
              expect(error.errors[0]).toBeInstanceOf(
                Exception.InvalidArgumentException
              );
            }
          );
          and(
            "error.errors[0] is Exception.InvalidArgumentException",
            () => {
              then(
                "error.errors[0].message is 'Invalid argument: id'",
                () => {
                  expect(error.errors[0].message).toBe(
                    "Invalid argument: id - must be a valid UUID"
                  );
                }
              );
            }
          );
        }
      );
    });
  });
  when("Nodes.create() is called with duplicate nodes", () => {
    let nodes: INode[];
    let error: Exception.Exception;
    beforeEach(() => {
      nodes = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 1, y: 1 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d745",
          coordinates: { x: 2, y: 3 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d745",
          coordinates: { x: 2, y: 3 },
        },
      ];
      try {
        nodes = Nodes.create(nodes);
      } catch (e) {
        error = e;
      }
    });
    then("error is defined", () => {
      expect(error).toBeDefined();
    });
    and("error is defined", () => {
      then(
        "error is an instance of Exception.ValidationException",
        () => {
          expect(error).toBeInstanceOf(Exception.ValidationException);
        }
      );
      and(
        "error is an instance of Exception.ValidationException",
        () => {
          then(
            "error.errors[0] is Exception.DuplicateException",
            () => {
              expect(error.errors[0]).toBeInstanceOf(
                Exception.DuplicateException
              );
            }
          );
          and(
            "error.errors[0] is Exception.DuplicateException",
            () => {
              then(
                "error.errors[0].message is 'Duplicate found: ${JSON.stringify(nodes[3])}",
                () => {
                  expect(error.errors[0].message).toBe(
                    `Duplicate found: ${JSON.stringify(nodes[3])}`
                  );
                }
              );
            }
          );
        }
      );
    });
  });
});

given(`Node.immutable accessor availability test`, () => {
  and(`a nodes instance is created`, () => {
    let nodes: Nodes<INode>;
    beforeEach(() => {
      nodes = Nodes.create();
    });
    then(`nodes.immutable getter is defined`, () => {
      expect(nodes.immutable).toBeDefined();
    });
    then(`nodes.immutable setter is defined`, () => {
      expect(hasSetter(nodes, "immutable")).toBeTruthy();
    });
  });
});

given(`Node.immutable accessor behavior test`, () => {
  and(`a nodes instance is created`, () => {
    let nodes: Nodes<INode>;
    beforeEach(() => {
      nodes = Nodes.create();
    });
    then(`nodes.immutable is by default true`, () => {
      expect(nodes.immutable).toBeTruthy();
    });
    when(`nodes.immutable is set to false`, () => {
      beforeEach(() => {
        nodes.immutable = false;
      });
      then(`nodes.immutable is false`, () => {
        expect(nodes.immutable).toBeFalsy();
      });
    });
    when(`nodes.immutable is set to number`, () => {
      let error: Exception.Exception;
      beforeEach(() => {
        try {
          nodes.immutable = 1 as any;
        } catch (e) {
          error = e;
        }
      });
      then(`error is defined`, () => {
        expect(error).toBeDefined();
      });
      and(`error is defined`, () => {
        then(
          `error is an instance of Exception.InvalidArgumentException`,
          () => {
            expect(error).toBeInstanceOf(
              Exception.InvalidArgumentException
            );
          }
        );
        and(
          `error is an instance of Exception.InvalidArgumentException`,
          () => {
            then(
              `error.message is 'Invalid argument: flag - must be a boolean'`,
              () => {
                expect(error.message).toBe(
                  "Invalid argument: flag - must be a boolean"
                );
              }
            );
          }
        );
      });
    });
    when(`nodes.immutable is set to string`, () => {
      let error: Exception.Exception;
      beforeEach(() => {
        try {
          nodes.immutable = "test" as any;
        } catch (e) {
          error = e;
        }
      });
      then(`error is defined`, () => {
        expect(error).toBeDefined();
      });
      and(`error is defined`, () => {
        then(
          `error is an instance of Exception.InvalidArgumentException`,
          () => {
            expect(error).toBeInstanceOf(
              Exception.InvalidArgumentException
            );
          }
        );
        and(
          `error is an instance of Exception.InvalidArgumentException`,
          () => {
            then(
              `error.message is 'Invalid argument: flag - must be a boolean'`,
              () => {
                expect(error.message).toBe(
                  "Invalid argument: flag - must be a boolean"
                );
              }
            );
          }
        );
      });
    });
  });
});

given(`nodes.add method availability test`, () => {
  and(`a nodes instance is created`, () => {
    let nodes: Nodes<INode>;
    beforeEach(() => {
      nodes = Nodes.create();
    });
    then(`nodes.add is defined`, () => {
      expect(nodes.add).toBeDefined();
    });
  });
});

given(`nodes.add method behavior test`, () => {
  and(`a nodes instance is created`, () => {
    let nodes: Nodes<INode>;
    beforeEach(() => {
      nodes = Nodes.create();
    });
    when(`nodes.add called with valid nodes`, () => {
      let data: INode[];
      beforeEach(() => {
        data = [
          {
            id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
            coordinates: { x: 0, y: 0 },
          },
          {
            id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
            coordinates: { x: 1, y: 1 },
          },
        ];
        nodes.add(data);
      });
      then(`nodes.length is data.length`, () => {
        expect(nodes.length).toBe(data.length);
      });
      and(`nodes.length is data.length`, () => {
        then(`nodes contains data`, () => {
          nodes.forEach((node, index) => {
            expect(node).toEqual(data[index]);
          });
        });
      });
    });
    when(`nodes.add called with valid node`, () => {
      let data: INode;
      beforeEach(() => {
        data = {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        };
        nodes.add(data);
      });
      then(`nodes.length is 1`, () => {
        expect(nodes.length).toBe(1);
      });
      and(`nodes.length is 1`, () => {
        then(`nodes contains data`, () => {
          expect(nodes[0]).toEqual(data);
        });
      });
    });
    when(`nodes.add called with undefined argument`, () => {
      let error: Exception.Exception;
      beforeEach(() => {
        try {
          // @ts-ignore
          nodes.add();
        } catch (e) {
          error = e;
        }
      });
      then(`error is defined`, () => {
        expect(error).toBeDefined();
      });
      and(`error is defined`, () => {
        then(
          `error is an instance of Exception.InvalidArgumentException`,
          () => {
            expect(error).toBeInstanceOf(
              Exception.InvalidArgumentException
            );
          }
        );
      });
    });
    when(`nodes.add called with null argument`, () => {
      let error: Exception.Exception;
      beforeEach(() => {
        try {
          nodes.add(null);
        } catch (e) {
          error = e;
        }
      });
      then(`error is defined`, () => {
        expect(error).toBeDefined();
      });
      and(`error is defined`, () => {
        then(
          `error is an instance of InvalidArgumentException`,
          () => {
            expect(error).toBeInstanceOf(
              Exception.InvalidArgumentException
            );
          }
        );
      });
    });
    when(`nodes.add called with nodes having no ids`, () => {
      let data: Omit<INode, "id">[];
      let result: INode[];
      let error: Exception.Exception;
      beforeEach(() => {
        data = [
          {
            coordinates: { x: 0, y: 0 },
          },
          {
            coordinates: { x: 1, y: 1 },
          },
        ];
        try {
          nodes.add(data);
        } catch (e) {
          error = e;
        }
      });
      then(`error is undefined`, () => {
        expect(error).toBeUndefined();
      });
      then(`nodes.length is equal to data.length`, () => {
        expect(nodes.length).toBe(data.length);
      });
      and(`nodes.length is equal to data.length`, () => {
        then(`each node in node has an id`, () => {
          nodes.forEach((node) => {
            expect(node.id).toBeDefined();
          });
        });
      });
    });
    when(`nodes.add called with duplicate nodes`, () => {
      let data: INode[];
      let error: Exception.Exception;
      beforeEach(() => {
        data = [
          {
            id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
            coordinates: { x: 0, y: 0 },
          },
          {
            id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
            coordinates: { x: 0, y: 0 },
          },
        ];
        try {
          nodes.add(data);
        } catch (e) {
          error = e;
        }
      });
      then(`error is defined`, () => {
        expect(error).toBeDefined();
      });
      and(`error is defined`, () => {
        then(
          `error is an instance of Exception.ValidationException`,
          () => {
            expect(error).toBeInstanceOf(
              Exception.ValidationException
            );
          }
        );
        and(
          `error is an instance of Exception.ValidationException`,
          () => {
            then(
              `error.message is 'Validation failed with 2 error(s).'`,
              () => {
                expect(error.message).toBe(
                  "Validation failed with 2 error(s)."
                );
              }
            );
          }
        );
      });
    });
    when(`nodes.add called with nodes with invalid id`, () => {
      let data: INode[];
      let error: Exception.Exception;
      beforeEach(() => {
        data = [
          {
            id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
            coordinates: { x: 0, y: 0 },
          },
          {
            id: "1",
            coordinates: { x: 1, y: 1 },
          },
        ];
        try {
          nodes.add(data);
        } catch (e) {
          error = e;
        }
      });
      then(`error is defined`, () => {
        expect(error).toBeDefined();
      });
      and(`error is defined`, () => {
        then(
          `error is an instance of Exception.ValidationException`,
          () => {
            expect(error).toBeInstanceOf(
              Exception.ValidationException
            );
          }
        );
        and(
          `error is an instance of Exception.ValidationException`,
          () => {
            then(
              `error.message is 'Validation failed with 1 error(s).'`,
              () => {
                expect(error.message).toBe(
                  "Validation failed with 1 error(s)."
                );
              }
            );
          }
        );
      });
    });
    when(
      `nodes.add called with nodes with invalid x coordinates`,
      () => {
        let data: INode[];
        let error: Exception.Exception;
        beforeEach(() => {
          data = [
            {
              id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
              coordinates: { x: 0, y: 0 },
            },
            {
              id: "a5f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a2d",
              coordinates: { x: "1" as unknown as number, y: 0 },
            },
          ];
          try {
            nodes.add(data);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(
            `error is an instance of Exception.ValidationException`,
            () => {
              expect(error).toBeInstanceOf(
                Exception.ValidationException
              );
            }
          );
          and(
            `error is an instance of Exception.ValidationException`,
            () => {
              then(
                `error.message is 'Validation failed with 1 error(s).'`,
                () => {
                  expect(error.message).toBe(
                    "Validation failed with 1 error(s)."
                  );
                }
              );
            }
          );
        });
      }
    );
  });
  and(`nodes instance is created with nodes`, () => {
    let data: INode[];
    let nodes: Nodes<INode>;
    beforeEach(() => {
      data = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 1, y: 1 },
        },
      ];
      nodes = Nodes.create(data);
    });
    when(`nodes.add called with new valid nodes`, () => {
      let data: INode[];
      beforeEach(() => {
        data = [
          {
            id: "2e9c2b68-7d53-4e99-b6c3-2f98a1e4d745",
            coordinates: { x: 2, y: 2 },
          },
          {
            id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d745",
            coordinates: { x: 2, y: 3 },
          },
        ];
        nodes.add(data);
      });
      then(`nodes.length is 4`, () => {
        expect(nodes.length).toBe(4);
      });
    });
    when(`nodes.add called with existing valid nodes`, () => {
      let data: INode[];
      let error: Exception.Exception;
      beforeEach(() => {
        data = [
          {
            id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
            coordinates: { x: 0, y: 0 },
          },
          {
            id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
            coordinates: { x: 1, y: 1 },
          },
        ];
        try {
          nodes.add(data);
        } catch (e) {
          error = e;
        }
      });
      then(`error is defined`, () => {
        expect(error).toBeDefined();
      });
      and(`error is defined`, () => {
        then(
          `error is an instance of Exception.ValidationException`,
          () => {
            expect(error).toBeInstanceOf(
              Exception.ValidationException
            );
          }
        );
        and(
          `error is an instance of Exception.ValidationException`,
          () => {
            then(
              `error.message is 'Validation failed with 2 error(s).'`,
              () => {
                expect(error.message).toBe(
                  "Validation failed with 2 error(s)."
                );
              }
            );
            and(
              `error.message is 'Validation failed with 2 error(s).'`,
              () => {
                then(
                  `error.errors[0] is Exception.DuplicateException`,
                  () => {
                    expect(error.errors[0]).toBeInstanceOf(
                      Exception.DuplicateException
                    );
                  }
                );
              }
            );
          }
        );
      });
    });
  });
});

given(`nodes.update method availability test`, () => {
  and(`a nodes instance is created`, () => {
    let nodes: Nodes<INode>;
    beforeEach(() => {
      nodes = Nodes.create();
    });
    then(`nodes.update is defined`, () => {
      expect(nodes.update).toBeDefined();
    });
  });
});

given(`nodes.update method behavior test`, () => {
  and(`a nodes instance is created with nodes`, () => {
    let nodes: Nodes<INode>;
    let data: INode[];
    beforeEach(() => {
      data = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 1, y: 1 },
        },
      ];
      nodes = Nodes.create(data);
    });
    when(`nodes.update called with valid id details`, () => {
      let id: UUID;
      let details: Partial<INode>;
      beforeEach(() => {
        id = data[0].id;
        details = { coordinates: { x: 1, y: 1 } };
        nodes.update(id, details);
      });
      then(`node with id is updated with details`, () => {
        expect(nodes.find((node) => node.id === id)).toEqual({
          ...data[0],
          ...details,
        });
      });
    });
    when(
      `nodes.update called with invalid id and valid details`,
      () => {
        let id: UUID;
        let details: Partial<INode>;
        let error: Exception.Exception;
        beforeEach(() => {
          id = "1";
          try {
            nodes.update(id, details);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(
            `error is an instance of Exception.ValidationException`,
            () => {
              expect(error).toBeInstanceOf(
                Exception.ValidationException
              );
            }
          );
        });
      }
    );
    when(
      `nodes.update called with unknown id and valid details`,
      () => {
        let id: UUID;
        let details: Partial<INode>;
        let error: Exception.Exception;
        beforeEach(() => {
          id = "453a4547-e89b-12d3-a456-426614174011";
          details = { coordinates: { x: 1, y: 1 } };
          try {
            nodes.update(id, details);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(
            `error is an instance of Exception.ValidationException`,
            () => {
              expect(error).toBeInstanceOf(
                Exception.ValidationException
              );
            }
          );
        });
      }
    );
    when(
      `nodes.update called with valid id and details with invalid coordinates`,
      () => {
        let id: UUID;
        let details: Partial<INode>;
        let error: Exception.Exception;
        beforeEach(() => {
          id = data[0].id;
          details = {
            coordinates: { x: "1" as unknown as number, y: 1 },
          };
          try {
            nodes.update(id, details);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(
            `error is an instance of Exception.ValidationException`,
            () => {
              expect(error).toBeInstanceOf(
                Exception.ValidationException
              );
            }
          );
        });
      }
    );
    when(
      `nodes.update called with valid id and details with no coordinates`,
      () => {
        let id: UUID;
        let details: Partial<INode>;
        let error: Exception.Exception;
        beforeEach(() => {
          id = data[0].id;
          details = { name: "test" } as any;
          try {
            nodes.update(id, details);
          } catch (e) {
            error = e;
          }
        });
        then(`error is undefined`, () => {
          expect(error).toBeUndefined();
        });
        then(`node with id is updated with details`, () => {
          expect(nodes.find((node) => node.id === id)).toEqual({
            ...data[0],
            ...details,
          });
        });
      }
    );
  });
});

given(`nodes.remove method availability test`, () => {
  and(`a nodes instance is created with nodes`, () => {
    let nodes: Nodes<INode>;
    let data: INode[];
    beforeEach(() => {
      data = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 1, y: 1 },
        },
      ];
      nodes = Nodes.create(data);
    });
    then(`nodes.remove is defined`, () => {
      expect(nodes.remove).toBeDefined();
    });
    and(`nodes.remove is defined`, () => {
      then(`nodes.remove is an instance of Function`, () => {
        expect(nodes.remove).toBeInstanceOf(Function);
      });
    });
  });
});

given(`nodes.remove method behavior test`, () => {
  and(`a nodes instance is created with nodes`, () => {
    let nodes: Nodes<INode>;
    let data: INode[];
    beforeEach(() => {
      data = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 1, y: 1 },
        },
      ];
      nodes = Nodes.create(data);
    });
    when(`nodes.remove called with valid id`, () => {
      let id: UUID;
      beforeEach(() => {
        id = data[0].id;
        nodes.remove(id);
      });
      then(`nodes does not contain node with id`, () => {
        expect(nodes.find((node) => node.id === id)).toBeUndefined();
      });
    });
    when(`nodes.remove called with invalid id`, () => {
      let id: UUID;
      let error: Exception.Exception;
      beforeEach(() => {
        id = "1";
        try {
          nodes.remove(id);
        } catch (e) {
          error = e;
        }
      });
      then(`error is defined`, () => {
        expect(error).toBeDefined();
      });
      and(`error is defined`, () => {
        then(
          `error is an instance of Exception.InvalidArgumentException`,
          () => {
            expect(error).toBeInstanceOf(
              Exception.InvalidArgumentException
            );
          }
        );
        and(
          `error is an instance of Exception.InvalidArgumentException`,
          () => {
            then(
              `error.message is 'Invalid argument: id - must be a valid UUID'`,
              () => {
                expect(error.message).toBe(
                  "Invalid argument: id - must be a valid UUID"
                );
              }
            );
          }
        );
      });
    });
    when(`nodes.remove called with unknown id`, () => {
      let id: UUID;
      let error: Exception.Exception;
      beforeEach(() => {
        id = "453a4547-e89b-12d3-a456-426614174011";
        try {
          nodes.remove(id);
        } catch (e) {
          error = e;
        }
      });
      then(`error is defined`, () => {
        expect(error).toBeDefined();
      });
      and(`error is defined`, () => {
        then(
          `error is an instance of Exception.NotFoundException`,
          () => {
            expect(error).toBeInstanceOf(Exception.NotFoundException);
          }
        );
        and(
          `error is an instance of Exception.NotFoundException`,
          () => {
            then(
              `error.message is 'Not found: id 453a4547-e89b-12d3-a456-426614174011'`,
              () => {
                expect(error.message).toBe(
                  `Not found: id 453a4547-e89b-12d3-a456-426614174011`
                );
              }
            );
          }
        );
      });
    });
  });
});

given(`nodes.findById method availability test`, () => {
  and(`a nodes instance is created with nodes`, () => {
    let nodes: Nodes<INode>;
    let data: INode[];
    beforeEach(() => {
      data = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 1, y: 1 },
        },
      ];
      nodes = Nodes.create(data);
    });
    then(`nodes.findById is defined`, () => {
      expect(nodes.findById).toBeDefined();
    });
    and(`nodes.findById is defined`, () => {
      then(`nodes.findById is an instance of Function`, () => {
        expect(nodes.findById).toBeInstanceOf(Function);
      });
    });
  });
});

given(`nodes.findById method behavior test`, () => {
  and(`a nodes instance is created with nodes`, () => {
    let nodes: Nodes<INode>;
    let data: INode[];
    beforeEach(() => {
      data = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 1, y: 1 },
        },
      ];
      nodes = Nodes.create(data);
    });
    when(`nodes.findById called with existing id`, () => {
      let id: UUID;
      let result: INode;
      beforeEach(() => {
        id = data[0].id;
        result = nodes.findById(id);
      });
      then(`result is defined`, () => {
        expect(result).toBeDefined();
      });
      and(`result is defined`, () => {
        then(`result is equal to data[0]`, () => {
          expect(result).toEqual(data[0]);
        });
      });
    });
    when(`nodes.findById called with unknown id`, () => {
      let id: UUID;
      let result: INode;
      beforeEach(() => {
        id = "453a4547-e89b-12d3-a456-426614174011";
        result = nodes.findById(id);
      });
      then(`result is undefined`, () => {
        expect(result).toBeUndefined();
      });
    });
    when(`nodes.findById called with invalid id`, () => {
      let id: UUID;
      let error: Exception.Exception;
      beforeEach(() => {
        id = "1";
        try {
          nodes.findById(id);
        } catch (e) {
          error = e;
        }
      });
      then(`error is defined`, () => {
        expect(error).toBeDefined();
      });
      and(`error is defined`, () => {
        then(
          `error is an instance of Exception.InvalidArgumentException`,
          () => {
            expect(error).toBeInstanceOf(
              Exception.InvalidArgumentException
            );
          }
        );
        and(
          `error is an instance of Exception.InvalidArgumentException`,
          () => {
            then(
              `error.message is 'Invalid argument: id - must be a valid UUID'`,
              () => {
                expect(error.message).toBe(
                  "Invalid argument: id - must be a valid UUID"
                );
              }
            );
          }
        );
      });
    });
  });
});

given(`nodes.findByCoordinates method availability test`, () => {
  and(`a nodes instance is created with nodes`, () => {
    let nodes: Nodes<INode>;
    let data: INode[];
    beforeEach(() => {
      data = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 1, y: 1 },
        },
      ];
      nodes = Nodes.create(data);
    });
    then(`nodes.findByCoordinates is defined`, () => {
      expect(nodes.findByCoordinates).toBeDefined();
    });
    and(`nodes.findByCoordinates is defined`, () => {
      then(
        `nodes.findByCoordinates is an instance of Function`,
        () => {
          expect(nodes.findByCoordinates).toBeInstanceOf(Function);
        }
      );
    });
  });
});

given(`nodes.findByCoordinates method behavior test`, () => {
  and(`a nodes instance is created with nodes`, () => {
    let nodes: Nodes<INode>;
    let data: INode[];
    beforeEach(() => {
      data = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 1, y: 1 },
        },
      ];
      nodes = Nodes.create(data);
    });
    when(
      `nodes.findByCoordinates called with existing coordinates`,
      () => {
        let coordinates: Coordinates;
        let result: INode;
        beforeEach(() => {
          coordinates = data[0].coordinates;
          result = nodes.findByCoordinates(coordinates);
        });
        then(`result is defined`, () => {
          expect(result).toBeDefined();
        });
        and(`result is defined`, () => {
          then(`result is equal to data[0]`, () => {
            expect(result).toEqual(data[0]);
          });
        });
      }
    );
    when(
      `nodes.findByCoordinates called with unknown coordinates`,
      () => {
        let coordinates: Coordinates;
        let result: INode;
        beforeEach(() => {
          coordinates = { x: 2, y: 2 };
          result = nodes.findByCoordinates(coordinates);
        });
        then(`result is undefined`, () => {
          expect(result).toBeUndefined();
        });
      }
    );
    when(
      `nodes.findByCoordinates called with invalid coordinates`,
      () => {
        let coordinates: Coordinates;
        let error: Exception.Exception;
        beforeEach(() => {
          coordinates = { x: "1" as unknown as number, y: 1 };
          try {
            nodes.findByCoordinates(coordinates);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(
            `error is an instance of Exception.InvalidArgumentException`,
            () => {
              expect(error).toBeInstanceOf(
                Exception.InvalidArgumentException
              );
            }
          );
          and(
            `error is an instance of Exception.InvalidArgumentException`,
            () => {
              then(
                `error.message is 'Invalid argument: coordinates - must be a valid Coordinates'`,
                () => {
                  expect(error.message).toBe(
                    "Invalid argument: coordinates - must be valid coordinates"
                  );
                }
              );
            }
          );
        });
      }
    );
  });
});

given(`nodes.move method availability test`, () => {
  and(`a nodes instance is created with nodes`, () => {
    let nodes: Nodes<INode>;
    let data: INode[];
    beforeEach(() => {
      data = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 1, y: 1 },
        },
      ];
      nodes = Nodes.create(data);
    });
    then(`nodes.move is defined`, () => {
      expect(nodes.move).toBeDefined();
    });
    and(`nodes.move is defined`, () => {
      then(`nodes.move is an instance of Function`, () => {
        expect(nodes.move).toBeInstanceOf(Function);
      });
    });
  });
});

given(`nodes.move method behavior test`, () => {
  and(`a nodes instance is created with nodes`, () => {
    let nodes: Nodes<INode>;
    let data: INode[];
    beforeEach(() => {
      data = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 1, y: 1 },
        },
      ];
      nodes = Nodes.create(data);
    });
    when(`nodes.move called with existing coordinates`, () => {
      let coordinates: Coordinates;
      beforeEach(() => {
        coordinates = { x: 2, y: 2 };
        nodes.move(data[0].id, coordinates);
      });
      then(`nodes[0].coordinates is equal to coordinates`, () => {
        expect(nodes[0].coordinates).toEqual(coordinates);
      });
    });
  });
});

given(`nodes.translate method availability test`, () => {
  and(`a nodes instance is created with nodes`, () => {
    let nodes: Nodes<INode>;
    let data: INode[];
    beforeEach(() => {
      data = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 1, y: 1 },
        },
      ];
      nodes = Nodes.create(data);
    });
    then(`nodes.translate is defined`, () => {
      expect(nodes.move).toBeDefined();
    });
    and(`nodes.translate is defined`, () => {
      then(`nodes.translate is an instance of Function`, () => {
        expect(nodes.translate).toBeInstanceOf(Function);
      });
    });
  });
});

given(`nodes.translate method behavior test`, () => {
  and(`a nodes instance is created with nodes`, () => {
    let nodes: Nodes<INode>;
    let data: INode[];
    beforeEach(() => {
      data = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 2, y: 2 },
        },
      ];
      nodes = Nodes.create(data);
    });
    when(`nodes.translate called with valid id and offset`, () => {
      let ids: UUID[];
      let offset: Offset;
      beforeEach(() => {
        ids = data[0].id as any;
        offset = { x: 1, y: 1 };
        nodes.translate(ids, offset);
      });
      then(`nodes[0].coordinates is { x: 1, y: 1 }`, () => {
        expect(nodes[0].coordinates).toEqual({ x: 1, y: 1 });
      });
    });
    when(
      `nodes.translate called with invalid id and valid offset`,
      () => {
        let ids: UUID[];
        let offset: Offset;
        let error: Exception.Exception;
        beforeEach(() => {
          ids = ["1"];
          offset = { x: 1, y: 1 };
          try {
            nodes.translate(ids, offset);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(
            `error is an instance of Exception.ValidationException`,
            () => {
              expect(error).toBeInstanceOf(
                Exception.ValidationException
              );
            }
          );
        });
      }
    );
    when(`nodes.translate called with valid ids and offset`, () => {
      let ids: UUID[];
      let offset: Offset;
      beforeEach(() => {
        ids = [data[0].id, data[1].id];
        offset = { x: 1, y: 1 };
        nodes.translate(ids, offset);
      });
      then(`nodes[0].coordinates is { x: 1, y: 1 }`, () => {
        expect(nodes[0].coordinates).toEqual({ x: 1, y: 1 });
      });
      then(`nodes[1].coordinates is { x: 2, y: 2 }`, () => {
        expect(nodes[1].coordinates).toEqual({ x: 3, y: 3 });
      });
    });
    when(
      `nodes.translate called with valid ids and invalid offset`,
      () => {
        let ids: UUID[];
        let offset: Offset;
        let error: Exception.Exception;
        beforeEach(() => {
          ids = [data[0].id, data[1].id];
          offset = { x: "1" as unknown as number, y: 1 };
          try {
            nodes.translate(ids, offset);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(`error is an instance of ValidationException`, () => {
            expect(error).toBeInstanceOf(
              Exception.ValidationException
            );
          });
        });
      }
    );
    when(
      `nodes.translate called with unknown ids and valid offset`,
      () => {
        let ids: UUID[];
        let offset: Offset;
        let error: Exception.Exception;
        beforeEach(() => {
          ids = ["453a4547-e89b-12d3-a456-426614174011"];
          offset = { x: 1, y: 1 };
          try {
            nodes.translate(ids, offset);
          } catch (e) {
            error = e;
          }
        });
        then(`error is defined`, () => {
          expect(error).toBeDefined();
        });
        and(`error is defined`, () => {
          then(`error is an instance of ValidationException`, () => {
            expect(error).toBeInstanceOf(
              Exception.ValidationException
            );
          });
        });
      }
    );
  });
});

given(`nodes.project method availability test`, () => {
  and(`a nodes instance is created with nodes`, () => {
    let nodes: Nodes<INode>;
    let data: INode[];
    beforeEach(() => {
      data = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 1, y: 1 },
        },
      ];
      nodes = Nodes.create(data);
    });
    then(`nodes.project is defined`, () => {
      expect(nodes.project).toBeDefined();
    });
    and(`nodes.project is defined`, () => {
      then(`nodes.project is an instance of Function`, () => {
        expect(nodes.project).toBeInstanceOf(Function);
      });
    });
  });
});

given(`nodes.project method behavior test`, () => {
  and(`a nodes instance is created with nodes`, () => {
    let nodes: Nodes<INode>;
    let data: INode[];
    beforeEach(() => {
      data = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 2, y: 2 },
        },
      ];
      nodes = Nodes.create(data);
    });
    when(`nodes.project called with no transform function`, () => {
      let projected: INode[];
      beforeEach(() => {
        projected = nodes.project();
      });
      then(`projected equal [...nodes]`, () => {
        expect(projected).toEqual([...nodes]);
      });
    });
    when(`nodes.project called with transform function`, () => {
      let projected: INode[];
      let transform: (Coordinates, INode) => Coordinates;
      beforeEach(() => {
        transform = ({ x, y }, node) => ({ x: x + 1, y: y + 1 });
        projected = nodes.project(transform);
      });
      then(
        `projected coordinates equal to nodes coordinates transformed`,
        () => {
          expect(projected).toEqual(
            [...nodes].map((node) => ({
              ...node,
              coordinates: transform(node.coordinates, node),
            }))
          );
        }
      );
    });
  });
});

given(`nodes.toJSON method availability test`, () => {
  and(`a nodes instance is created with nodes`, () => {
    let nodes: Nodes<INode>;
    let data: INode[];
    beforeEach(() => {
      data = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 1, y: 1 },
        },
      ];
      nodes = Nodes.create(data);
    });
    then(`nodes.toJSON is defined`, () => {
      expect(nodes.toJSON).toBeDefined();
    });
    and(`nodes.toJSON is defined`, () => {
      then(`nodes.toJSON is an instance of Function`, () => {
        expect(nodes.toJSON).toBeInstanceOf(Function);
      });
    });
  });
});

given(`nodes.toJSON method behavior test`, () => {
  and(`a nodes instance is created with nodes`, () => {
    let nodes: Nodes<INode>;
    let data: INode[];
    beforeEach(() => {
      data = [
        {
          id: "d6f8a7b2-1c4e-4d3b-9e2f-8a6e4f7c5a1d",
          coordinates: { x: 0, y: 0 },
        },
        {
          id: "3e9c2b68-7d51-4e99-b6c3-2f98a1e4d7b5",
          coordinates: { x: 1, y: 1 },
        },
      ];
      nodes = Nodes.create(data);
    });
    when(`nodes.toJSON called`, () => {
      let result: INode[];
      beforeEach(() => {
        result = nodes.toJSON();
      });
      then(`result is equal to nodes`, () => {
        expect(result).toEqual(data);
      });
    });
  });
});
