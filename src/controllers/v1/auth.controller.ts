import { Body, JsonController, Post } from "routing-controllers";

import { userService } from "../../services/v1/user.service";
import { AuthSignInValidator } from "../../validators/user.validator";

@JsonController("/auth")
export class AuthController {

    private service = new userService();

    @Post("/login")
    login(@Body({ validate: true }) body: AuthSignInValidator) {
        return this.service.signIn(body.email, body.password);
    }
}
