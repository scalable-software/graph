/**
 * Base exception class. All custom exceptions should extend this class.
 * When using V8, the stack trace is captured.
 */
export class Exception extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        // Capture stack trace only if the method is available (avoids breaking non-V8 environments)
        Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
    }
}
/**
 * Exception thrown when an argument is invalid.
 */
export class InvalidArgumentException extends Exception {
    constructor(parameter, reason) {
        super(`Invalid argument: ${parameter}${reason ? ` - ${reason}` : ""}`);
    }
}
/**
 * Exception thrown when validation of arguments fails.
 */
export class ValidationException extends Exception {
    errors;
    constructor(errors) {
        super(`Validation failed with ${errors.length} error(s).`);
        this.errors = errors;
    }
}
/**
 * Exception thrown when an attempt is made to set an immutable property.
 */
export class ImmutablePropertyException extends Exception {
    constructor(property) {
        super(`Property '${property}' is immutable.`);
    }
}
/**
 * Exception thrown when a value is already assigned.
 */
export class AssignedException extends Exception {
    constructor(type, hint) {
        super(`Cannot reassign ${type}. ${hint}`);
    }
}
/**
 * Exception thrown when a value is not assigned.
 */
export class UnassignedException extends Exception {
    constructor(type, hint) {
        super(`No value has been assigned to ${type}: ${hint}`);
    }
}
export class MissMatchException extends Exception {
    constructor(type, hint) {
        super(`${type} does not match: ${hint}`);
    }
}
/**
 * Set of exceptions thrown via static methods.
 */
export class Exceptions {
    static invalidArgumentException = (parameter, reason) => {
        throw new InvalidArgumentException(parameter, reason);
    };
    static validationException = (errors) => {
        throw new ValidationException(errors);
    };
    static immutablePropertyException = (property) => {
        throw new ImmutablePropertyException(property);
    };
    static assignedException = (type, hint) => {
        throw new AssignedException(type, hint);
    };
    static unassignedException = (type, hint) => {
        throw new UnassignedException(type, hint);
    };
    static missMatchException = (type, hint) => {
        throw new MissMatchException(type, hint);
    };
}
