import { INode } from "src/Node.js";
import * as help from "./Helper.js";

import { Type, Spec } from "./Helper.js";

const given = (description, spec) => describe(`Given ${description}`, spec);
const and = (description, spec) => describe(`and ${description}`, spec);
const when = (description, spec) => describe(`when ${description}`, spec);
const then = (description, spec) => it(`then ${description}`, spec);

import { Node, Exception } from "@scalable.software/graph";

given(`Node ${Type.CLASS} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`Node is imported`, () => {
    then(`Node is defined`, () => {
      expect(Node).toBeDefined();
    });
  });
});

given(`Node.validate ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.METHOD);
    setSpecProperty("spec", "Node.validate");
  });
  then("Node.validate() public static method exists", () => {
    expect(Node.validate).toBeDefined();
  });
  and("Node.validate() public static method exists", () => {
    when("Node.validate() called with no arguments", () => {
      let response: INode;
      let error: Error;
      beforeEach(() => {
        try {
          response = Node.validate() as INode;
        } catch (e) {
          error = e;
        }
      });
      then("error is undefined", () => {
        expect(error).toBeUndefined();
      });
      then("response is null", () => {
        expect(response).toBeNull();
      });
    });
    when("Node.validate(node) called with valid node", () => {
      let node: INode;
      let response: INode;
      let error: Error;
      beforeEach(() => {
        node = {
          id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          coordinates: { x: 0, y: 0 },
        };
        try {
          response = Node.validate<INode>(node) as INode;
        } catch (e) {
          error = e;
        }
      });
      then("error is undefined", () => {
        expect(error).toBeUndefined();
      });
      then("response is defined", () => {
        expect(response).toBeDefined();
      });
      and("response is defined", () => {
        then("response equals node", () => {
          expect(response).toEqual(node);
        });
      });
    });
    when("Node.validate(node) called with invalid id", () => {
      let node: INode;
      let response: INode;
      let error: Exception.ValidationException;
      beforeEach(() => {
        node = {
          id: "invalid",
          coordinates: { x: 0, y: 0 },
        };
        try {
          response = Node.validate<INode>(node) as INode;
        } catch (e) {
          error = e;
        }
      });
      then("error is defined", () => {
        expect(error).toBeDefined();
      });
      then("response is undefined", () => {
        expect(response).toBeUndefined();
      });
      and("error is defined", () => {
        then("error is an instance of Exception.ValidationException", () => {
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
        then("error.message is 'Validation failed with 1 error(s).'", () => {
          expect(error.message).toBe("Validation failed with 1 error(s).");
        });
        then(
          "error.errors[0] is instance of Exception.InvalidArgumentException",
          () => {
            expect(error.errors[0]).toBeInstanceOf(
              Exception.InvalidArgumentException
            );
          }
        );
        then(
          "error.errors[0].message is 'Invalid argument: id - must be a valid UUID'",
          () => {
            expect(error.errors[0].message).toBe(
              "Invalid argument: id - must be a valid UUID"
            );
          }
        );
      });
    });
    when("Node.validate(node) called with invalid coordinates", () => {
      let node: INode;
      let response: INode;
      let error: Exception.ValidationException;
      beforeEach(() => {
        const x = "invalid" as any;
        node = {
          id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          coordinates: { x, y: 0 },
        };
        try {
          response = Node.validate<INode>(node) as INode;
        } catch (e) {
          error = e;
        }
      });
      then("error is defined", () => {
        expect(error).toBeDefined();
      });
      then("response is undefined", () => {
        expect(response).toBeUndefined();
      });
      and("error is defined", () => {
        then("error is an instance of Exception.ValidationException", () => {
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
        then("error.message is 'Validation failed with 1 error(s).'", () => {
          expect(error.message).toBe("Validation failed with 1 error(s).");
        });
        then(
          "error.errors[0] is instance of Exception.InvalidArgumentException",
          () => {
            expect(error.errors[0]).toBeInstanceOf(
              Exception.InvalidArgumentException
            );
          }
        );
        then(
          "error.errors[0].message is 'Invalid argument: coordinates - must be valid coordinates'",
          () => {
            expect(error.errors[0].message).toBe(
              "Invalid argument: coordinates - must be valid coordinates"
            );
          }
        );
      });
    });
    when("Node.validate(node) called with invalid node", () => {
      let node: INode;
      let response: INode;
      let error: Exception.ValidationException;
      beforeEach(() => {
        const x = "invalid" as any;
        node = {
          id: "invalid",
          coordinates: { x, y: 0 },
        };
        try {
          response = Node.validate<INode>(node) as INode;
        } catch (e) {
          error = e;
        }
      });
      then("error is defined", () => {
        expect(error).toBeDefined();
      });
      then("response is undefined", () => {
        expect(response).toBeUndefined();
      });
      and("error is defined", () => {
        then("error is an instance of Exception.ValidationException", () => {
          expect(error).toBeInstanceOf(Exception.ValidationException);
        });
        then("error.message is 'Validation failed with 2 error(s).'", () => {
          expect(error.message).toBe("Validation failed with 2 error(s).");
        });
        then(
          "error.errors[0] is instance of Exception.InvalidArgumentException",
          () => {
            expect(error.errors[0]).toBeInstanceOf(
              Exception.InvalidArgumentException
            );
          }
        );
        then(
          "error.errors[0].message is 'Invalid argument: id - must be a valid UUID'",
          () => {
            expect(error.errors[0].message).toBe(
              "Invalid argument: id - must be a valid UUID"
            );
          }
        );
        then(
          "error.errors[1] is instance of Exception.InvalidArgumentException",
          () => {
            expect(error.errors[1]).toBeInstanceOf(
              Exception.InvalidArgumentException
            );
          }
        );
        then(
          "error.errors[1].message is 'Invalid argument: coordinates - must be valid coordinates'",
          () => {
            expect(error.errors[1].message).toBe(
              "Invalid argument: coordinates - must be valid coordinates"
            );
          }
        );
      });
    });
  });
});

given(`Node.create ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.METHOD);
    setSpecProperty("spec", "Node.create");
  });
  then("Node.create() public static method exists", () => {
    expect(Node.create).toBeDefined();
  });
  and("Node.create() public static method exists", () => {
    when("Node.create(details)", () => {
      let details: Omit<INode, "id">;
      let node: INode;
      beforeEach(() => {
        details = {
          coordinates: { x: 0, y: 0 },
        };
        node = Node.create(details);
      });
      then("node is defined", () => {
        expect(node).toBeDefined();
      });
      and("node is defined", () => {
        then("node.id is defined", () => {
          expect(node.id).toBeDefined();
        });
        then("node.coordinates is defined", () => {
          expect(node.coordinates).toBeDefined();
        });
        and("node.coordinates is defined", () => {
          then("node.coordinates equals details.coordinates", () => {
            expect(node.coordinates).toEqual(details.coordinates);
          });
        });
      });
    });
  });
});

given(`Node.clone ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.METHOD);
    setSpecProperty("spec", "Node.clone");
  });
  then("Node.clone() public static method exists", () => {
    expect(Node.clone).toBeDefined();
  });
  and("Node.clone() public static method exists", () => {
    when("Node.clone(node)", () => {
      let node;
      let clonedNode;
      beforeEach(() => {
        node = {
          id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          coordinates: { x: 0, y: 0 },
        };
        clonedNode = Node.clone(node);
      });
      then("clonedNode is defined", () => {
        expect(clonedNode).toBeDefined();
      });
      and("clonedNode is defined", () => {
        then("clonedNode is not equal to node", () => {
          expect(clonedNode).not.toBe(node);
        });
        then("clonedNode.id is not equal to node.id", () => {
          expect(clonedNode.id).not.toBe(node.id);
        });
        then("clonedNode.coordinates equals node.coordinates", () => {
          expect(clonedNode.coordinates).toEqual(node.coordinates);
        });
      });
    });
  });
});

given(`Node.update ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.METHOD);
    setSpecProperty("spec", "Node.update");
  });
  then("Node.update() public static method exists", () => {
    expect(Node.update).toBeDefined();
  });
  and("Node.update() public static method exists", () => {
    when("Node.update(node, patch)", () => {
      let node;
      let patch;
      let updatedNode;
      beforeEach(() => {
        node = {
          id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          coordinates: { x: 0, y: 0 },
        };
        patch = {
          coordinates: { x: 100, y: 400 },
        };
        updatedNode = Node.update(node, patch);
      });
      then("updatedNode is defined", () => {
        expect(updatedNode).toBeDefined();
      });
      and("updatedNode is defined", () => {
        then("updatedNode.coordinates equals patch.coordinates", () => {
          expect(updatedNode.coordinates).toEqual(patch.coordinates);
        });
      });
    });
  });
});

given(`Node.move ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.METHOD);
    setSpecProperty("spec", "Node.move");
  });
  then("Node.move() public static method exists", () => {
    expect(Node.move).toBeDefined();
  });
  and("Node.move() public static method exists", () => {
    when("Node.move(node, coordinates)", () => {
      let node;
      let coordinates;
      let updatedNode;
      beforeEach(() => {
        node = {
          id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          coordinates: { x: 0, y: 0 },
        };
        coordinates = { x: 100, y: 400 };
        updatedNode = Node.move(node, coordinates);
      });
      then("updatedNode is defined", () => {
        expect(updatedNode).toBeDefined();
      });
      and("updatedNode is defined", () => {
        then("updatedNode.coordinates equals coordinates", () => {
          expect(updatedNode.coordinates).toEqual(coordinates);
        });
      });
    });
  });
});

given(`Node.translate ${Type.STATIC_METHOD} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.METHOD);
    setSpecProperty("spec", "Node.translate");
  });
  then("Node.translate() public static method exists", () => {
    expect(Node.translate).toBeDefined();
  });
  and("Node.translate() public static method exists", () => {
    when("Node.translate(node, offset)", () => {
      let node;
      let offset;
      let updatedNode;
      beforeEach(() => {
        node = {
          id: "15b6679a-fd9d-4036-b1ab-af0b932fc903",
          coordinates: { x: 0, y: 0 },
        };
        offset = { x: 100, y: 400 };
        updatedNode = Node.translate(node, offset);
      });
      then("updatedNode is defined", () => {
        expect(updatedNode).toBeDefined();
      });
      and("updatedNode is defined", () => {
        then(
          "updatedNode.coordinates equals node.coordinates plus offset",
          () => {
            let updateCoordinates = {
              x: node.coordinates.x + offset.x,
              y: node.coordinates.y + offset.y,
            };
            expect(updatedNode.coordinates).toEqual(updateCoordinates);
          }
        );
      });
    });
  });
});
