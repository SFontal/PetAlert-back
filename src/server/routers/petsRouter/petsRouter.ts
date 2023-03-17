import { Router } from "express";
import { getPets } from "../../controllers/petsControllers/petsControllers.js";

const petsRouter = Router();

petsRouter.get("/", getPets);

export default petsRouter;
