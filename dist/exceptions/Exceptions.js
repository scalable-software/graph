/**
 * @module Exceptions
 */
/**
 * Base exception class. All custom exceptions should extend this class.
 * When using V8, the stack trace is captured.
 */
export class Exception extends Error {
    errors;
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
    constructor(errors) {
        // Flatten nested ValidationExceptions by extracting their errors
        const flattenedErrors = errors.flatMap((error) => error instanceof ValidationException ? error.errors : error);
        super(`Validation failed with ${flattenedErrors.length} error(s).`);
        this.errors = flattenedErrors;
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
export class DuplicateException extends Exception {
    constructor(duplicate) {
        super(`Duplicate found: ${duplicate}`);
    }
}
export class NotFoundException extends Exception {
    constructor(type, hint) {
        super(`Not found: ${type} ${hint}`);
    }
}
export class InvalidIndexException extends Exception {
    constructor() {
        super(`Invalid index: index is out of bounds`);
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
    static duplicateException = (duplicate) => {
        throw new DuplicateException(duplicate);
    };
    static notFoundException = (type, hint) => {
        throw new NotFoundException(type, hint);
    };
    static invalidIndexException = () => {
        throw new InvalidIndexException();
    };
}
