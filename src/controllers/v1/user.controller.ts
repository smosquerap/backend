import { 
    JsonController, 
    Post, 
    Body, 
    Get, 
    Param, 
    Put, 
    CurrentUser
} from "routing-controllers";

import { User } from "../../models/v1/user.model";
import { userService } from "../../services/v1/user.service";
import { UserValidator } from '../../validators/user.validator';

@JsonController("/users")
export class UserController {

    private service = new userService();

    @Get("/")
    getAll() {
        return this.service.getAll();
    }

    @Get("/:id")
    getOne(@CurrentUser({ required: true }) @Param("id") id:number) {
        return this.service.getOne(id);
    }

    @Post("/")
    createOne(@CurrentUser({ required: true }) @Body({ validate: true }) user: UserValidator){        
        return this.service.createOne(user as unknown as User);
    }

    @Put("/:id")
    updateOne(@CurrentUser({ required: true }) @Param("id") id:number, @Body() user: User): Promise<User> {
        return this.service.updateOne(id, user);
    }
}
