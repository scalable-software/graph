import {
  Exceptions,
  Exception,
  ValidationException,
} from "../exceptions/Exceptions.js";

export class Validator {
  /**
   * Validate details against a set of validators and throw ValidationException if any fail
   *
   * @param details - The details to validate
   * @param validators - The validators to process
   * @returns The details if all validators pass
   * @throws {ValidationException} If any validator fails
   *
   * @example
   * ```ts
   * Validator.validate({ id: "123e4567-e89b-12d3-a456-426614174000", name: "John Doe" }, [
   *   ({ id }) => Validate.uuid(id),
   *   ({ name }) => Validate.name(name),
   * ]);
   * // => { id: "123e4567-e89b-12d3-a456-426614174000", name: "John Doe" }
   *
   * Validator.validate({ id: "invalid", name: "J" }, [
   *   ({ id }) => Validate.uuid(id),
   *   ({ name }) => Validate.name(name),
   * ]);
   * // => ValidationException: Validation failed with 2 error(s).
   * ```
   */
  public static validate = <T>(
    entity: T,
    validators: ((entity: T) => unknown)[]
  ): T =>
    ((exceptions) =>
      exceptions.length ? Exceptions.validationException(exceptions) : entity)(
      Validator.process(entity, validators)
    );

  public static compare = () => {};

  private static process = <T>(
    entity: T | [T[], T[]],
    validators: ((entity: T | [T[], T[]]) => unknown)[]
  ): Exception[] =>
    validators.reduce<Exception[]>((exceptions, validate) => {
      try {
        validate(entity);
      } catch (exception) {
        exceptions.push(exception);
      }
      return exceptions;
    }, []);
}
