import express from "express";
import helmet from "helmet";
import usersRouter from "./routers/usersRouter.js";
import { generalError } from "./middlewares/generalError/generalError.js";
import notFoundError from "./middlewares/notFoundError/notFoundError.js";
import morgan from "morgan";

export const app = express();
const userEndpoint = "/users";

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use(userEndpoint, usersRouter);

app.use(notFoundError);
app.use(generalError);
