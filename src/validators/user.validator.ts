import { IsBoolean, IsEmail, IsNotEmpty, IsObject, IsString, Length } from "class-validator";
import { Entity, Column } from "typeorm";

@Entity()
export class UserCreateValidator {
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
export class UserUpdateValidator {
    @Column()
    @IsString()
    name: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @IsBoolean()
    isActive: boolean;
}

@Entity()
export class AuthValidator {
    @Column()
    @IsString()
    token: string;

    @Column()
    @IsObject()
    user: object;
}

@Entity()
export class AuthSignInValidator {
    @Column()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    password: string;
}