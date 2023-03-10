import { loginUser } from "./usersControllers.js";
import type { NextFunction, Request, Response } from "express";
import type { UserCredentials } from "../types.js";
import CustomError from "../../../CustomError/CustomError.js";
import User from "../../../database/models/User.js";
import bcrypt from "bcryptjs";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const req: Partial<
  Request<Record<string, unknown>, Record<string, unknown>, UserCredentials>
> = {};
const next = jest.fn() as NextFunction;

beforeEach(() => jest.clearAllMocks());

describe("Given a loginUser controller", () => {
  const user: UserCredentials = {
    username: "Pet",
    password: "PetAdmin",
  };

  describe("When it receives a request with a user which has a username 'Pet' and a password 'PetAdmin' and the user is not in the database", () => {
    test("Then it should call its next method with a status 401 and the message 'User not found!'", async () => {
      const message = "User not found!";
      const publicMessage = "Wrong credentials";
      const statusCode = 401;
      const expectedError = new CustomError(message, statusCode, publicMessage);

      req.body = user;

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(undefined),
      }));

      await loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          UserCredentials
        >,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request with a user which has a username 'Pet' and a password 'PetAdmin' and the user is in the database but the password is not correct", () => {
    test("Then it should call its next method with a status 401 and the message 'Incorrect password!'", async () => {
      const message = "Incorrect password!";
      const publicMessage = "Wrong credentials";
      const statusCode = 401;
      const expectedError = new CustomError(message, statusCode, publicMessage);

      req.body = user;

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValueOnce(user),
      }));

      await loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          UserCredentials
        >,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request with a user which has a username 'Pet' and a password 'PetAdmin' and the user is in the database and the password is correct", () => {
    test("Then it should call its status method with a 200", async () => {
      const statusCode = 200;
      req.body = user;

      bcrypt.compare = jest.fn().mockResolvedValue(true);

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValueOnce(user),
      }));

      await loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          UserCredentials
        >,
        res as Response,
        next
      );

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });

    test("Then it should call its json method with a token", async () => {
      req.body = user;

      bcrypt.compare = jest.fn().mockResolvedValue(true);

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValueOnce(user),
      }));

      await loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          UserCredentials
        >,
        res as Response,
        next
      );

      expect(res.json).toHaveReturned();
    });
  });
});
