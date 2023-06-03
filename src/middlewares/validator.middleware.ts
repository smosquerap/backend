import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";
import { ValidationError } from "class-validator";

@Middleware({ type: "after" })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, _request: any, response: any, next: (err: any) => any) {
    if (error.errors) {
      const errors: ValidationError[] = error.errors
      const formattedErrors: Record<string, any> = {}
      for (const err of errors) {
        formattedErrors[err.property] = Object.values(err.constraints as object)
      }
      response.status(error.httpCode).json(formattedErrors)
    } else {
        response.status(error.httpCode).json({ error: error.message });
    }
    next(error)
  }
}