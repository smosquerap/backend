import { Exclude } from "class-transformer";
import { IsBoolean, IsEmail, IsString, Length } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, Unique, OneToMany } from "typeorm";
import { Post } from "./post.model";

@Entity()
@Unique('unique_email', ['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}