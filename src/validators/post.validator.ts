import { User } from "../models/v1/user.model";
import { IsObject, IsString, Length } from "class-validator";
import { Entity, Column } from "typeorm";

@Entity()
export class PostCreateValidator {
    @Column()
    @IsString()
    @Length(3-200)
    title: string;

    @Column()
    @IsString()
    @Length(6-400)
    content: string;

    @Column()
    @IsObject()
    user: User;
}

@Entity()
export class PostUpdateValidator {
    @Column()
    @IsString()
    @Length(3-200)
    title: string;

    @Column()
    @IsString()
    @Length(6-400)
    content: string;

    @Column()
    @IsObject()
    user: User;
}