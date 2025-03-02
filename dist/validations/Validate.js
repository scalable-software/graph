import { Exceptions, } from "../exceptions/Exceptions.js";
export class Validate {
    static applyRule = (details) => (exceptions, rule) => {
        try {
            rule(details);
        }
        catch (exception) {
            exceptions.push(exception);
        }
        return exceptions;
    };
    static applyRules = (details, rules) => rules.reduce(Validate.applyRule(details), []);
    static throwIfExceptions = (exceptions, details) => exceptions.length ? Exceptions.validationException(exceptions) : details;
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
    static keys = (keys, rules) => Validate.throwIfExceptions(Validate.applyRules(keys, rules), keys);
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
    static match = (keys, immutable) => keys.includes(immutable) &&
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
    static uuid = (id) => !id ||
        !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
        ? Exceptions.invalidArgumentException("id", "must be a valid UUID")
        : id;
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
    static name = (name) => !name || name.length < 3 || name.length > 100
        ? Exceptions.invalidArgumentException("name", "must be a valid name")
        : name;
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
    static rules = (details, rules) => Validate.throwIfExceptions(Validate.applyRules(details, rules), details);
}
