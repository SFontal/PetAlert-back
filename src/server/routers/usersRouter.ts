import { Router } from "express";
import { loginUser } from "../controllers/usersControllers/usersControllers.js";

const usersRouter = Router();
const loginEndpoint = "/login";

usersRouter.post(loginEndpoint, loginUser);

export default usersRouter;
