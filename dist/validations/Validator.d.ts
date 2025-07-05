/**
 * @module Validation
 */
export declare class Validator {
    /**
     * Validate entity against a set of validators and throw ValidationException if any fail
     *
     * @param entity - The details to validate
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
    static validate: <T>(entity: T, validators: ((entity: T) => unknown)[]) => T;
    /**
     * Compare two sets of entities against a set of validators and throw ValidationException if any fail
     *
     * @param entities - The entities to compare
     * @param validators - The validators to process
     * @returns The second set of entities if all validators pass
     * @throws {ValidationException} If any validator fails
     *
     * @example
     * ```ts
     * const sets = [[
     *  { id: "123e4567-e89b-12d3-a456-426614174000", name: "John Doe" },
     * ], [
     *  { id: "123e4567-e89b-12d3-a456-426614174000", name: "Jane Doe" },
     * ]]
     *
     * Validator.compare(sets, [
     *   (sets) => Validate.distinct(sets, (node) => node.id),
     *   (sets) => Validate.distinct(sets, (node) => node.name),
     * ])
     * // => ValidationException: Validation failed with 2 error(s).
     * ```
     */
    static compare: <T, C extends T>(entities: [C[], T[]], validators: ((entities: [C[], T[]]) => unknown)[]) => T[];
    private static process;
}
