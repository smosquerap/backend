import { IsBoolean, IsEmail, IsString, Length } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    name: string;

    @Column({ unique: true })
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