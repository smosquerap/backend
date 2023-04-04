import { DataSource } from "typeorm";
import dotenv from "dotenv";

import { User } from "../models/v1/user.model";

dotenv.config()

export const AppDataSource =  new DataSource({
    type: 'postgres',
    host: process.env.PG_HOST,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    port: 5432,
    database: process.env.PG_DATABASE,
    entities: [
        User
    ],
    logging: true, // request from db
    synchronize: true // to restart the entities
});