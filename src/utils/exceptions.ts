import { HttpError } from "routing-controllers";

/**
 * Exception for 400 HTTP error.
 */
export class BadRequestError extends HttpError {
    constructor(message?: any) {
        super(400, message);
    }
}

/**
 * Exception for 401 HTTP error.
 */
export class UnauthorizedError extends HttpError {
    constructor(message?: any) {
        super(401, message);
    }
}

/**
 * Exception for 403 HTTP error.
 */
export class ForbiddenError extends HttpError {
    constructor(message?: any) {
        super(403, message);
    }
}

/**
 * Exception for 404 HTTP error.
 */
export class NotFoundError extends HttpError {
    constructor(message?: any) {
        super(404, message);
    }
}

/**
 * Exception for 422 HTTP error.
 */
export class UnprocessableEntityError extends HttpError {
    constructor(message?: any) {
        super(422, message);
    }
}

/**
 * Exception for 426 HTTP error.
 */
export class dNotFoundError extends HttpError {
    constructor(message?: any) {
        super(426, message);
    }
}

/**
 * Exception for 500 HTTP error.
 */
export class InternalServerError extends HttpError {
    constructor(message?: any) {
        super(500, message);
    }
}

/**
 * Exception for 405 HTTP error.
 */
export class MethodNotAllowedError extends HttpError {
    constructor(message?: any) {
        super(405, message);
    }
}
