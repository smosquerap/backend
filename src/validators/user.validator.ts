import { IsEmail, IsString, Length } from "class-validator";
import { Entity, Column } from "typeorm";

@Entity()
export class UserValidator {
    @Column()
    @IsString()
    name: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @Length(6-100)
    password: string;
}

@Entity()
export class AuthValidator {
    @Column()
    @IsString()
    token: string;
}