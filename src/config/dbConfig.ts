import { DataSource } from "typeorm";

import { User } from "../models/v1/user.model";
import { envConfig } from "./envConfig";

export const AppDataSource =  new DataSource({
    type: 'postgres',
    host: envConfig.db.host,
    username: envConfig.db.username,
    password: envConfig.db.password,
    port: 5432,
    database: envConfig.db.database,
    entities: [
        User
    ],
    logging: true, // request from db
    synchronize: true // to restart the entities
});