import { Body, JsonController, Post } from "routing-controllers";

import { userService } from "../../services/v1/user.service";

@JsonController("/auth")
export class AuthController {

    private service = new userService();

    @Post("/login")
    login(@Body() body: { email: string, password: string }) {
        return this.service.signIn(body.email, body.password);
    }
}
