import dotenv from 'dotenv';
dotenv.config()

export const envConfig = {
    api: {
        port: process.env.PORT as string,
        secretKey: process.env.JWT_SECRET as string
    },
    db: {
        host: process.env.PG_HOST as string,
        username: process.env.PG_USER as string,
        password: process.env.PG_PASSWORD as string,
        database: process.env.PG_DATABASE as string,
    }
}