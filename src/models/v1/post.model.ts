import { IsString } from "class-validator";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

import { User } from "./user.model";
import { CustomBaseEntity } from "./base.model";

@Entity()
export class Post extends CustomBaseEntity {

    @Column()
    @IsString()
    title: string;

    @Column()
    @IsString()
    content: string;

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'user_id'})
    user: User

    @Column('string', { name: 'user_id'})
    userId: string

}