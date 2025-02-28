import type { UUID, Name } from "./Graph.types.js";

export type IMetadata = {
  id: UUID | null;
  name: Name | null;
};
export class Metadata {
  public static validate = () => {};

  public id: UUID | null = null;
  public name: Name | null = null;

  constructor(metadata?: IMetadata) {
    this.id = metadata?.id ?? null;
    this.name = metadata?.name ?? null;
  }
}
