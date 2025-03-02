/**
 * Base exception class. All custom exceptions should extend this class.
 * When using V8, the stack trace is captured.
 */
export declare abstract class Exception extends Error {
    constructor(message: string);
}
/**
 * Exception thrown when an argument is invalid.
 */
export declare class InvalidArgumentException extends Exception {
    constructor(parameter: string, reason?: string);
}
/**
 * Exception thrown when validation of arguments fails.
 */
export declare class ValidationException extends Exception {
    errors: Exception[];
    constructor(errors: Exception[]);
}
/**
 * Exception thrown when an attempt is made to set an immutable property.
 */
export declare class ImmutablePropertyException extends Exception {
    constructor(property: string);
}
/**
 * Exception thrown when a value is already assigned.
 */
export declare class AssignedException extends Exception {
    constructor(type: string, hint: string);
}
/**
 * Exception thrown when a value is not assigned.
 */
export declare class UnassignedException extends Exception {
    constructor(type: string, hint: string);
}
export declare class MissMatchException extends Exception {
    constructor(type: string, hint: string);
}
/**
 * Set of exceptions thrown via static methods.
 */
export declare class Exceptions {
    static invalidArgumentException: (parameter: string, reason?: string) => never;
    static validationException: (errors: Exception[]) => never;
    static immutablePropertyException: (property: string) => never;
    static assignedException: (type: string, hint: string) => never;
    static unassignedException: (type: string, hint: string) => never;
    static missMatchException: (type: string, hint: string) => never;
}
