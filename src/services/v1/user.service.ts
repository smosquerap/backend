import { compare, hashSync } from "bcryptjs";
import { QueryFailedError } from "typeorm";

import { AppDataSource } from "../../config/dbConfig";
import { User } from '../../models/v1/user.model';
import { BadRequestError, InternalServerError } from "../../utils/exceptions";
import { sign } from "jsonwebtoken";
import { AuthValidator } from "@/validators/user.validator";
import { envConfig } from "../../config/envConfig";

export class userService {

    private readonly userRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    async getAll(): Promise<User[]>  {
        try {
            return await this.userRepository.find();
        } catch (error) {
            throw new InternalServerError("Server internal error");
        }
    }

    async getOne(id: number): Promise<User> {
        try {
            return await this.userRepository.findOneByOrFail({ id });
        } catch (error) {
            throw new InternalServerError("get_one_user_service");            
        }
    }

    async getOneByEmail(email: string): Promise<User> {
        try {
            return await this.userRepository.findOneByOrFail({ email });
        } catch (error) {
            throw new InternalServerError("Server internal error");            
        }
    }

    async createOne(user: User): Promise<User> {
        try {            
            const passwordHashed = hashSync(user.password, 10);
            user.password = passwordHashed;
            return await this.userRepository.save(user);
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
            return await this.userRepository.save(user);
        } catch (error) {
            throw new InternalServerError("Server internal error");
        }
    }

    async signIn(email: string, password: string): Promise<AuthValidator> {
        try {
            const user = await this.getOneByEmail(email);
            const isPasswordCorrect = await compare(password, user.password);
            if (!isPasswordCorrect) throw new BadRequestError("Email/Password incorrect");

            const token = sign({ ...user }, envConfig.api.secretKey, { expiresIn: '10h' });
            return {
                token
            }
        } catch (error) {
            throw new InternalServerError("sign_in_user_service");
        }
    }
}