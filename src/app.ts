import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";

const app = express();
app.use(morgan("dev")); // request logs from api
app.use(cors());
app.use(bodyParser.json());

export default app;