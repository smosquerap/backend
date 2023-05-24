import { 
    JsonController, 
    Post, 
    Body, 
    Get, 
    Param, 
    Put, 
    CurrentUser
} from "routing-controllers";

import { postService } from "../../services/v1/post.service";
import { Post as PostEntity } from "../../models/v1/post.model";
import { PostCreateValidator, PostUpdateValidator } from "../../validators/post.validator";

@JsonController("/posts")
export class PostController {

    private service = new postService();

    @Get("/")
    getAll(@CurrentUser({ required: true }) _post: PostEntity) {
        return this.service.getAll();
    }

    @Get("/:id")
    getOne(@CurrentUser({ required: true }) @Param("id") id: number) {
        return this.service.getOne(id);
    }

    @Post("/")
    createOne(@Body({ validate: true }) post: PostCreateValidator){        
        return this.service.createOne(post);
    }

    @Put("/:id")
    updateOne(@CurrentUser({ required: true }) @Param("id") id: number, @Body() post: PostUpdateValidator) {
        return this.service.updateOne(id, post);
    }
}
