import createDebug from "debug";
import type CustomError from "../../../CustomError/CustomError.js";
import type { NextFunction, Request, Response } from "express";
import debugMessage from "../../../tools/debugMessage.js";

const debug = createDebug("petAlert!:generalError");

export const generalError = (
  { message, statusCode, publicMessage }: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(debugMessage(message));

  res
    .status(statusCode || 500)
    .json({ error: publicMessage || "Internal server error" });
};
