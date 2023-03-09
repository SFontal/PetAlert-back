import "../../loadEnvirontment.js";
import { app } from "../index.js";
import createDebug from "debug";
import type CustomError from "../../CustomError/CustomError.js";
import debugMessage from "../../tools/debugMessage.js";

const debug = createDebug("petAlert!:startServer");
const startServer = async (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(debugMessage(`Server is listening requests on port ${port}`));

      resolve(server);
    });

    server.on("error", (error: CustomError) => {
      if (error.code === "EADDRINUSE") {
        error.message = `Port ${port} is already in use`;

        debug(debugMessage(error.message));
      } else {
        reject(debugMessage(error.message));
      }
    });
  });

export default startServer;
