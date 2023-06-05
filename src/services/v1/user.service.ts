import { compare, hashSync } from "bcryptjs";
import { EntityNotFoundError, QueryFailedError } from "typeorm";
import { sign } from "jsonwebtoken";

import { AppDataSource } from "../../config/dbConfig";
import { envConfig } from "../../config/envConfig";
import { AuthValidator, UserCreateValidator, UserUpdateValidator } from "../../validators/user.validator";
import { BadRequestError, InternalServerError } from "../../utils/exceptions";
import { User } from '../../models/v1/user.model';

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

    async getOne(id: string): Promise<User> {
        try {
            return await this.userRepository.findOneByOrFail({ id });
        } catch (error) {
            throw new BadRequestError("User not found");            
        }
    }

    async getOneByEmail(email: string): Promise<User> {
        try {
            return await this.userRepository.findOneByOrFail({ email });
        } catch (error) {
            throw error;
        }
    }

    async createOne(user: UserCreateValidator): Promise<User> {
        try {            
            const passwordHashed = hashSync(user.password, 10);
            user.password = passwordHashed;
            await this.userRepository.save(user);
            return await this.getOneByEmail(user.email);
        } catch (error) {
            if (error instanceof QueryFailedError) {
                if (error.toString().includes('unique_email')) {
                    throw new BadRequestError("Email already exists");
                }
            } else if (error instanceof Error) {
                throw new InternalServerError(error.message);
            }
            throw new InternalServerError("Server internal error");
        }
    }

    async updateOne(id: string, user: UserUpdateValidator): Promise<User> {
        try {
            return await this.userRepository.save({ id, ...user });
        } catch (error) {
            throw new InternalServerError("Server internal error");
        }
    }

    async signIn(email: string, password: string): Promise<AuthValidator> {
        try {
            const user = await this.getOneByEmail(email);
            const isPasswordCorrect = await compare(password, user.password);
            if (!isPasswordCorrect) throw new BadRequestError("Email / Password incorrect");

            const token = sign({ ...user }, envConfig.api.secretKey, { expiresIn: '10h' });
            return {
                token,
                user,
            }
        } catch (error) {
            if (error instanceof EntityNotFoundError || error instanceof BadRequestError) {
                throw new BadRequestError("Email / Password incorrect");
            } else if (error instanceof Error) {
                throw new InternalServerError(error.message);
            }
            throw error;
        }
    }
}