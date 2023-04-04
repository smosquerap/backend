import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";

@Middleware({ type: "after" })
export class errorHandler implements ExpressErrorMiddlewareInterface {
    async error(error: any, _request: any, response: any, next: any){
        if (error.errors) {
            response.status(error.httpCode).send({ message: `Invalid body` });
        } else {
            response.status(error.httpCode).json(error.message);
        }
        next(error);
    }
}