import "reflect-metadata";
import { Action, useExpressServer } from "routing-controllers";
import { resolve } from "path";
import { verify } from "jsonwebtoken";

import app from "./app";
import { AppDataSource } from "./config/dbConfig";
import { UnauthorizedError } from "./utils/exceptions";
import { envConfig } from "./config/envConfig";

useExpressServer(app, {
    currentUserChecker: async (action: Action) => {
        const token = action.request.headers['authorization'];
        if (!token) throw new UnauthorizedError("Invalid token");
        const decodedToken = verify(token, envConfig.api.secretKey, (err: any, decoded: any) => {
            if (err) throw new UnauthorizedError("Invalid token");
            return decoded;
        });
        return  decodedToken;
    },
    cors: true,
    routePrefix: "/api",
    defaultErrorHandler: false,
    controllers: [resolve(__dirname, "./controllers/**/*{.ts, .js}")],
    middlewares: [resolve(__dirname, "./middlewares/**/*{.ts, .js}")]
});

async function main() {
    const port = envConfig.api.port;
    try {
        await AppDataSource.initialize()
        app.listen(port);
        console.log('||SERVER ON||');
    } catch (error) {
        console.error(error);
    }
};

main();

