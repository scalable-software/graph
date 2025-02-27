import { Exceptions } from "../exceptions/Exceptions.js";

import type { UUID } from "../Graph.types.js";

export class Validate {
  /**
   * Validate id and throw if not valid UUID
   *
   * @param id - The UUID to validate
   * @returns The UUID if valid
   * @throws {InvalidArgumentException} If the UUID is invalid or null
   *
   * @example
   * ```ts
   * Validate.uuid("123e4567-e89b-12d3-a456-426614174000");
   * // => "123e4567-e89b-12d3-a456-426614174000"
   *
   * Validate.uuid("invalid");
   * // => InvalidArgumentException: Invalid argument: id - must be a valid UUID
   *
   * Validate.uuid(null);
   * // => InvalidArgumentException: Invalid argument: id - must be a valid UUID
   * ```
   */
  public static uuid = (id: string | null): UUID =>
    !id || !/^[0-9a-fA-F-]{36}$/.test(id)
      ? Exceptions.invalidArgumentException("id", "must be a valid UUID")
      : (id as UUID);
}
