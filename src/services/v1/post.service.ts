import { AppDataSource } from "../../config/dbConfig";
import { BadRequestError, InternalServerError } from "../../utils/exceptions";
import { Post } from "../../models/v1/post.model";
import { PostCreateValidator, PostUpdateValidator } from "../../validators/post.validator";

export class postService {

    private readonly postRepository;

    constructor() {
        this.postRepository = AppDataSource.getRepository(Post);
    }

    async getAll(): Promise<Post[]>  {
        try {
            return await this.postRepository.find({
                relations: {
                    user: true
                }
            });
        } catch (error) {
            throw new InternalServerError("Server internal error");
        }
    }

    async getOne(id: number): Promise<Post> {
        try {
            const post = await this.postRepository.findOne({
                where: {
                    id,
                },
                relations: {
                    user: true
                }
            });
            if(!post) throw new BadRequestError("Post not found"); 
            return post;
        } catch (error) {
            throw new BadRequestError("Post not found");            
        }
    }

    async createOne(post: PostCreateValidator): Promise<Post> {
        try {
            return await this.postRepository.save(post);
        } catch (error) {
            throw new InternalServerError("Server internal error");
        }   
    }

    async updateOne(id:number, post: PostUpdateValidator): Promise<Post> {
        console.log(id, post);
        try {
            return await this.postRepository.save({ id, ...post });
        } catch (error) {
            console.log(error);
            
            throw new InternalServerError("Server internal error");
        }
    }

}