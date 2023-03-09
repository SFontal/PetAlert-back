import type { NextFunction, Request, Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";

const notFoundError = (req: Request, res: Response, next: NextFunction) => {
  const message = "Enpoint not found";
  const publicMessage = message;
  const statusCode = 404;

  const error = new CustomError(message, statusCode, publicMessage);

  next(error);
};

export default notFoundError;
