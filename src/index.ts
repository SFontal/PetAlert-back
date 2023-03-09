import "./loadEnvirontment.js";
import startServer from "./server/startServer.js";
import connectDatabase from "./database/connectDataBase.js";

const port = process.env.PORT ?? 4000;
const mongoDbUrl = process.env.MONGODB_URL!;

await startServer(+port);
await connectDatabase(mongoDbUrl);
