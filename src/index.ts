import "./loadEnvirontment.js";
import mongoose from "mongoose";
import startServer from "./server/routers/startServer.js";
import connectDatabase from "./database/connectDataBase.js";

const port = process.env.PORT ?? 4000;
const mongoDbUrl = process.env.MONGODB_URL!;

await startServer(+port);
await connectDatabase(mongoDbUrl);
