/**
 * @module Validation
 */

import { Exception, Exceptions } from "../exceptions/Exceptions.js";

import type { UUID, Name } from "../Graph.types.js";

export class Validate {
  private static applyRule =
    <T>(details: T) =>
    (exceptions: Exception[], rule: (details: T) => unknown): Exception[] => {
      try {
        rule(details);
      } catch (exception) {
        exceptions.push(exception);
      }
      return exceptions;
    };

  private static applyRules = <T>(
    details: T,
    rules: ((details: T) => unknown)[]
  ): Exception[] => rules.reduce<Exception[]>(Validate.applyRule(details), []);

  private static throwIfExceptions = <T>(
    exceptions: Exception[],
    details: T
  ): T =>
    exceptions.length ? Exceptions.validationException(exceptions) : details;

  /**
   * Validate keys and throw if any rules fail
   *
   * @param keys - The keys to validate
   * @param rules - The rules to apply
   * @returns The keys if all rules pass
   * @throws {ValidationException} If any rule fails
   *
   * @example
   * ```ts
   * Validate.keys([""id", "name""], [
   *  (keys) => Validate.match(keys, "id"),
   * (keys) => Validate.match(keys, "name"),
   * ]);
   * // throws ValidationException: Validation failed with 2 error(s).
   *
   * Validate.keys(["custom"], [
   *  (keys) => Validate.match(keys, "id"),
   * (keys) => Validate.match(keys, "name"),
   * ])
   * // => ["custom"]
   * ```
   */
  public static keys = <T>(keys: T, rules: ((details: T) => unknown)[]) =>
    Validate.throwIfExceptions(Validate.applyRules(keys, rules), keys);

  /**
   * Validate keys and throw if key is immutable
   *
   * @param keys - The keys to validate
   * @param immutable - The immutable key to check
   * @returns True if the key is immutable
   * @throws {ImmutablePropertyException} If the key is immutable
   *
   * @example
   * ```ts
   * Validate.match(["id", "name"], "id");
   * // => ImmutablePropertyException: "Property 'id' is immutable."
   *
   * Validate.match(["id", "name"], "type");
   * // => false
   * ```
   *
   */
  public static match = <T>(keys: T[], immutable: T): unknown =>
    keys.includes(immutable) &&
    Exceptions.immutablePropertyException(String(immutable));

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
    !id ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
      ? Exceptions.invalidArgumentException("id", "must be a valid UUID")
      : (id as UUID);

  /**
   * Validate name and throw if not valid
   *
   * @param name - The name to validate
   * @returns The name if valid
   * @throws {InvalidArgumentException} If the name is invalid or null
   *
   * @example
   * ```ts
   * Validate.name("John Doe");
   * // => "John Doe"
   *
   * Validate.name("J");
   * // => InvalidArgumentException: Invalid argument: name - must be a valid name
   *
   * Validate.name(null);
   * // => InvalidArgumentException: Invalid argument: name - must be a valid name
   * ```
   *
   */
  public static name = (name: string | null): Name =>
    !name || name.length < 3 || name.length > 100
      ? Exceptions.invalidArgumentException("name", "must be a valid name")
      : (name as Name);

  /**
   * Validate details against a set of rules and throw ValidationException if any fail
   *
   * @param details - The details to validate
   * @param rules - The rules to apply
   * @returns The details if all rules pass
   * @throws {ValidationException} If any rule fails
   *
   * @example
   * ```ts
   * Validate.rules({ id: "123e4567-e89b-12d3-a456-426614174000", name: "John Doe" }, [
   *   ({ id }) => Validate.uuid(id),
   *   ({ name }) => Validate.name(name),
   * ]);
   * // => { id: "123e4567-e89b-12d3-a456-426614174000", name: "John Doe" }
   *
   * Validate.rules({ id: "invalid", name: "J" }, [
   *   ({ id }) => Validate.uuid(id),
   *   ({ name }) => Validate.name(name),
   * ]);
   * // => ValidationException: Validation failed with 2 error(s).
   * ```
   */
  public static rules = <T>(
    details: T,
    rules: ((details: T) => unknown)[]
  ): T =>
    Validate.throwIfExceptions(Validate.applyRules(details, rules), details);
}
