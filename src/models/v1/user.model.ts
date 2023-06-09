import { Entity, Column, Unique, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { IsBoolean, IsEmail, IsString, Length } from "class-validator";

import { CustomBaseEntity } from "./base.model";
import { Post } from "./post.model";

@Entity()
@Unique('unique_email', ['email'])
export class User extends CustomBaseEntity {

    @Column()
    @IsString()
    name: string;

    @Column()
    @IsEmail()
    email: string;

    @Column({
        nullable: true,
    })
    photo: string;

    @Column()
    @Length(6-100)
    @Exclude()
    password: string;

    @Column({
        default: true
    })
    @IsBoolean()
    isActive: boolean;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]

}