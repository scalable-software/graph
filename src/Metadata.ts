import { Validate } from "./validations/Validate.js";
import type { UUID, Name } from "./Graph.types.js";

export type IMetadata = {
  id: UUID | null;
  name: Name | null;
};
export class Metadata<T extends IMetadata = IMetadata> {
  private static initialize = <T extends IMetadata>(metadata?: T) =>
    Metadata.validate<T>(metadata) ?? ({ id: null, name: null } as T);

  public static validate = <T extends IMetadata>(metadata?: T): T | null =>
    metadata
      ? Validate.rules<T>(metadata, [
          ({ id }) => Validate.uuid(id),
          ({ name }) => Validate.name(name),
        ])
      : null;

  public static create = <T extends IMetadata>(metadata?: T): Metadata<T> & T =>
    new Metadata<T>(metadata) as Metadata<T> & T;

  public id: UUID | null = null;
  public name: Name | null = null;

  constructor(metadata?: T) {
    Object.assign(this, Metadata.initialize<T>(metadata));
  }
}
