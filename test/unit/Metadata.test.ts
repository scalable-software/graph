import * as help from "./Helper.js";

import { Type, Spec } from "./Helper.js";

const given = (description, spec) => describe(`Given ${description}`, spec);
const and = (description, spec) => describe(`and ${description}`, spec);
const when = (description, spec) => describe(`when ${description}`, spec);
const then = (description, spec) => it(`then ${description}`, spec);

import { Metadata } from "@scalable.software/graph";

given(`Metadata ${Type.CLASS} ${Spec.AVAILABILITY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.CLASS);
    setSpecProperty("spec", Spec.AVAILABILITY);
  });
  and(`Metadata is imported`, () => {
    then(`Metadata is defined`, () => {
      expect(Metadata).toBeDefined();
    });
  });
});

given(`Metadata id ${Type.PROPERTY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.PROPERTY);
    setSpecProperty("spec", "id");
  });
  when("a metadata instance is created", () => {
    let metadata: Metadata;
    beforeEach(() => {
      metadata = new Metadata();
    });
    then("metadata.id is defined", () => {
      expect(metadata.id).toBeDefined();
    });
    and("metadata.id is defined", () => {
      then("metadata.id is null", () => {
        expect(metadata.id).toBeNull();
      });
    });
  });
});

given(`Metadata name ${Type.PROPERTY} test`, () => {
  beforeEach(() => {
    setSpecProperty("type", Type.PROPERTY);
    setSpecProperty("spec", "name");
  });
  when("a metadata instance is created", () => {
    let metadata: Metadata;
    beforeEach(() => {
      metadata = new Metadata();
    });
    then("metadata.name is defined", () => {
      expect(metadata.name).toBeDefined();
    });
    and("metadata.name is defined", () => {
      then("metadata.name is null", () => {
        expect(metadata.name).toBeNull();
      });
    });
  });
});
