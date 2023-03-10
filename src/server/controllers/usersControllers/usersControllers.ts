import "../../../loadEnvirontment.js";
import type { NextFunction, Request, Response } from "express";
import type { UserCredentials, CustomJwtPayload } from "../types.js";
import createDebug from "debug";
import User from "../../../database/models/User.js";
import CustomError from "../../../CustomError/CustomError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import debugMessage from "../../../tools/debugMessage.js";

export const loginUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserCredentials
  >,
  res: Response,
  next: NextFunction
) => {
  const debug = createDebug("petAlert!:loginUser");

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).exec();

    if (!user) {
      const message = "User not found!";
      const publicMessage = "Wrong credentials";
      const statusCode = 401;
      const error = new CustomError(message, statusCode, publicMessage);

      throw error;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      const message = "Incorrect password!";
      const publicMessage = "Wrong credentials";
      const statusCode = 401;
      const error = new CustomError(message, statusCode, publicMessage);

      throw error;
    }

    const jwtPayload: CustomJwtPayload = {
      username: user.username,
      email: user.email!,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
      expiresIn: "2d",
    });

    debug(debugMessage(`${username} is logged!`));

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
