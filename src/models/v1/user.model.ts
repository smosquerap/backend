import { IsBoolean, IsEmail, IsString, Length } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, Unique } from "typeorm";

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

    @Column()
    @Length(6-100)
    password: string;

    @Column({
        default: true
    })
    @IsBoolean()
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}