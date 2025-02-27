/**
 * Base exception class. All custom exceptions should extend this class.
 * When using V8, the stack trace is captured.
 */
export abstract class Exception extends Error {
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
