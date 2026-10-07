/**
 * @module Exceptions
 */

/**
 * Base exception class. All custom exceptions should extend this class.
 * When using V8, the stack trace is captured.
 */
export abstract class Exception extends Error {
  public errors?: Exception[];
  constructor(message: string) {
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
  constructor(parameter: string, reason?: string) {
    super(`Invalid argument: ${parameter}${reason ? ` - ${reason}` : ""}`);
  }
}

/**
 * Exception thrown when validation of arguments fails.
 */
export class ValidationException extends Exception {
  public declare errors: Exception[];
  constructor(errors: Exception[]) {
    // Flatten nested ValidationExceptions by extracting their errors
    const flattenedErrors = errors.flatMap((error) =>
      error instanceof ValidationException ? error.errors : error
    );

    super(`Validation failed with ${flattenedErrors.length} error(s).`);
    this.errors = flattenedErrors;
  }
}

/**
 * Exception thrown when an attempt is made to set an immutable property.
 */
export class ImmutablePropertyException extends Exception {
  constructor(property: string) {
    super(`Property '${property}' is immutable.`);
  }
}

/**
 * Exception thrown when a value is already assigned.
 */
export class AssignedException extends Exception {
  constructor(type: string, hint: string) {
    super(`Cannot reassign ${type}. ${hint}`);
  }
}

/**
 * Exception thrown when a value is not assigned.
 */
export class UnassignedException extends Exception {
  constructor(type: string, hint: string) {
    super(`No value has been assigned to ${type}: ${hint}`);
  }
}

export class MissMatchException extends Exception {
  constructor(type: string, hint: string) {
    super(`${type} does not match: ${hint}`);
  }
}

export class DuplicateException extends Exception {
  constructor(duplicate: string) {
    super(`Duplicate found: ${duplicate}`);
  }
}

export class NotFoundException extends Exception {
  constructor(type: string, hint: string) {
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
  public static invalidArgumentException = (
    parameter: string,
    reason?: string
  ) => {
    throw new InvalidArgumentException(parameter, reason);
  };

  public static validationException = (errors: Exception[]) => {
    throw new ValidationException(errors);
  };

  public static immutablePropertyException = (property: string) => {
    throw new ImmutablePropertyException(property);
  };

  public static assignedException = (type: string, hint: string) => {
    throw new AssignedException(type, hint);
  };

  public static unassignedException = (type: string, hint: string) => {
    throw new UnassignedException(type, hint);
  };

  public static missMatchException = (type: string, hint: string) => {
    throw new MissMatchException(type, hint);
  };

  public static duplicateException = (duplicate: string) => {
    throw new DuplicateException(duplicate);
  };

  public static notFoundException = (type: string, hint: string) => {
    throw new NotFoundException(type, hint);
  };

  public static invalidIndexException = () => {
    throw new InvalidIndexException();
  };
}
