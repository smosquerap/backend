import { 
    JsonController, 
    Post, 
    Body, 
    Get, 
    Param, 
    Put, 
    CurrentUser,
    QueryParam
} from "routing-controllers";

import { userService } from "../../services/v1/user.service";
import { UserCreateValidator, UserUpdateValidator } from '../../validators/user.validator';
import { User } from "../../models/v1/user.model";

@JsonController("/users")
export class UserController {

    private service = new userService();

    @Get("/")
    getAll(@CurrentUser({ required: true }) _user: User, @QueryParam("page") page: number, @QueryParam("size") size: number) {
        return this.service.getAll(page, size);
    }

    @Get("/:id")
    getOne(@CurrentUser({ required: true }) @Param("id") id: string) {
        return this.service.getOne(id);
    }

    @Post("/")
    createOne(@Body({ validate: true }) user: UserCreateValidator){        
        return this.service.createOne(user);
    }

    @Put("/:id")
    updateOne(@CurrentUser({ required: true }) @Param("id") id: string, @Body() user: UserUpdateValidator) {
        return this.service.updateOne(id, user);
    }
}
