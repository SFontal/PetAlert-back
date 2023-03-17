import type { NextFunction, Request, Response } from "express";
import createDebug from "debug";
import Pet from "../../../database/models/Pet.js";
import debugMessage from "../../../tools/debugMessage.js";
import CustomError from "../../../CustomError/CustomError.js";
import type { PetsStructure } from "../types.js";

export const getPets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const debug = createDebug("petAlert!:getPets");

  try {
    const pets: PetsStructure = await Pet.find().exec();

    if (pets.length === 0) {
      const message = "Couldn't retrieve pets!";
      const publicMessage = message;
      const statusCode = 204;
      const error = new CustomError(message, statusCode, publicMessage);

      throw error;
    }

    debug(debugMessage(`getPets petition successful!`));

    res.status(200).json({ pets });
  } catch (error) {
    next(error);
  }
};
