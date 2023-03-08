import "./loadEnvirontment.js";
import startServer from "./server/routers/startServer.js";

const port = process.env.PORT ?? 4000;

await startServer(+port);
