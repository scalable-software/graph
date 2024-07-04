export class Nodes extends EventTarget {
  public static init = (nodes = []) => new Nodes(nodes);

  /**
   * The private constructor is used by the static init method: no direct instantiation is allowed.
   * This is done so that a different return value, other than an instance of the class can be returned.
   */
  constructor(private nodes) {
    super();
  }
}
