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

import { postService } from "../../services/v1/post.service";
import { Post as PostEntity } from "../../models/v1/post.model";
import { PostCreateValidator, PostUpdateValidator } from "../../validators/post.validator";

@JsonController("/posts")
export class PostController {

    private service = new postService();

    @Get("/")
    getAll(@CurrentUser({ required: true }) _post: PostEntity, @QueryParam("page") page: number, @QueryParam("size") size: number) {
        return this.service.getAll(page, size);
    }

    @Get("/:id")
    getOne(@CurrentUser({ required: true }) @Param("id") id: string) {
        return this.service.getOne(id);
    }

    @Post("/")
    createOne(@Body({ validate: true }) post: PostCreateValidator){        
        return this.service.createOne(post);
    }

    @Put("/:id")
    updateOne(@CurrentUser({ required: true }) @Param("id") id: string, @Body() postUpdate: PostUpdateValidator) {
        return this.service.updateOne(id, postUpdate);
    }
}
