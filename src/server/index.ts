import express from "express";
import helmet from "helmet";
import usersRouter from "./routers/usersRouter/usersRouter.js";
import { generalError } from "./middlewares/generalError/generalError.js";
import notFoundError from "./middlewares/notFoundError/notFoundError.js";
import morgan from "morgan";
import cors from "cors";
import petsRouter from "./routers/petsRouter/petsRouter.js";

const allowedOrigins = [
  process.env.LOCAL_ORIGIN!,
  process.env.PRODUCTION_ORIGIN!,
];

const options: cors.CorsOptions = { origin: allowedOrigins };

export const app = express();
const userEndpoint = "/user";
const petEndpoint = "/pets";

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors(options));

app.use(userEndpoint, usersRouter);
app.use(petEndpoint, petsRouter);

app.use(notFoundError);
app.use(generalError);
