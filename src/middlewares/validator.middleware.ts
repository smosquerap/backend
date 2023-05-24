import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";

@Middleware({ type: "after" })
export class errorHandler implements ExpressErrorMiddlewareInterface {
    async error(error: any, _request: any, response: any, next: any){
        if (error.errors) {
            const errors = <any>{};
            error.errors.map((err: { property: string; }) => {
                errors[err.property] = `Field ${err.property} is required`
            });
            response.status(error.httpCode).send(errors);
        } else {    
            response.status(error.httpCode).json({ error: error.message });
        }
        next(error);
    }
}