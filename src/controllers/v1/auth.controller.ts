import { JsonController, Post, Body } from "routing-controllers";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

import { User } from "../../models/v1/user.model";

@JsonController("/auth")
export class AuthController {
    @Post("/login")
    async login(@Body() body: { email: string; password: string }) {
        try {
            const user = await User.findOneBy({ email: body.email });
            if (!user) return { error: "El usuario no existe" };

            const isPasswordCorrect = await compare(body.password, user.password);
            if (!isPasswordCorrect) return { error: "Contraseña incorrecta" };

            const token = sign({ ...body }, process.env.JWT_SECRET as string, { expiresIn: '10h' });
            return {
                ...body,
                token
            }
        } catch (error) {
            return { error }
        }
        
    }
}
