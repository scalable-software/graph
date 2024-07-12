export class Nodes<T> extends Array<T> {
  constructor(...items: T[]) {
    super(...items);
  }

  public add = (item: T) => {};
}
