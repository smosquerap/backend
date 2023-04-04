import { hashSync } from "bcryptjs";
import { QueryFailedError } from "typeorm";

import { User } from "../../models/v1/user.model";
import { BadRequestError, InternalServerError } from "../../utils/exceptions";

export class userService {
    async getAll(): Promise<User[]>  {
        try {
            return await User.find();
        } catch (error) {
            throw new InternalServerError("Server internal error");
        }
    }

    async getOne(id: number): Promise<User> {
        try {
            return await User.findOneByOrFail({ id });
        } catch (error) {
            throw new InternalServerError("get_one_user_service");            
        }
    }

    async getOneByEmail(email: string): Promise<User> {
        try {
            return await User.findOneByOrFail({ email });
        } catch (error) {
            throw new InternalServerError("Server internal error");            
        }
    }

    async createOne(user: User): Promise<User> {
        try {            
            const passwordHashed = hashSync(user.password, 10);
            user.password = passwordHashed;
            return await User.save(user);
        } catch (error) {
            if(error instanceof QueryFailedError) {
                if (error.toString().includes('unique_email')) {
                    throw new BadRequestError("Email already exists");
                }
            }
            throw new InternalServerError("Server internal error");
        }
    }

    async updateOne(id:number, user: User): Promise<User> {
        user.id = id
        try {
            return await User.save(user);
        } catch (error) {
            throw new InternalServerError("Server internal error");
        }
    }
}