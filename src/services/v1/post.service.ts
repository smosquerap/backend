import { AppDataSource } from "../../config/dbConfig";
import { BadRequestError, InternalServerError } from "../../utils/exceptions";
import { Post } from "../../models/v1/post.model";
import { PostCreateValidator, PostUpdateValidator } from "../../validators/post.validator";

export class postService {

    private readonly postRepository;

    constructor() {
        this.postRepository = AppDataSource.getRepository(Post);
    }

    async getAll(page: number, size: number): Promise<Object>  {
        try {
            const offset = (page - 1) * size;

            const [data, totalData] = await this.postRepository
                .createQueryBuilder('post')
                .leftJoinAndSelect('post.user', 'user')
                .skip(offset)
                .take(size)
                .getManyAndCount();

            const pages = Math.ceil(totalData / size);

            return {
                totalData,
                pages,
                data
            }
        } catch (error) {
            throw new InternalServerError("Server internal error");
        }
    }

    async getOne(id: string): Promise<Post> {
        try {
            const post = await this.postRepository
                .createQueryBuilder('post')
                .leftJoinAndSelect('post.user', 'user')
                .where('post.id = :id', { id })
                .getOne();

            if (!post) throw new BadRequestError("Post not found");

            return post;
        } catch (error) {
            throw new BadRequestError("Post not found");            
        }
    }

    async createOne(post: PostCreateValidator): Promise<Post> {
        try {
            const newPost = this.postRepository.create(post);
            return await this.postRepository.save(newPost);
        } catch (error) {
            throw new InternalServerError("Server internal error");
        }   
    }

    async updateOne(id: string, postUpdate: PostUpdateValidator): Promise<Post> {
        try {
            await this.postRepository
                .createQueryBuilder('post')
                .update(Post)
                .set(postUpdate)
                .where('id = :id', { id })
                .execute();

            const updatedPost = await this.getOne(id);
            if (!updatedPost) throw new BadRequestError("Post not found");

            return updatedPost;
        } catch (error) {
            console.log(error);
            
            throw new InternalServerError("Server internal error");
        }
    }
}