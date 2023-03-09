import type { Request, Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { generalError } from "./generalError.js";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const req: Partial<Request> = {};
const next = jest.fn();

describe("Given a generalError middleware", () => {
  describe("When it receives an error with a 404 statusCode", () => {
    test("Then it should call its status method with a 404", () => {
      const statusCode = 404;
      const error = new CustomError(
        "There was an error",
        404,
        "Somethig went wrong"
      );

      generalError(error, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });
  });

  describe("When it receives an error with an empty status", () => {
    test("Then it should call its status method with a 500", () => {
      const statusCode = 500;
      const error = new Error();

      generalError(error as CustomError, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });
  });

  describe("When it receives an error with an empty publicMessage", () => {
    test("Then it should call its json method with 'Internal server error'", () => {
      const publicMessage = { error: "Internal server error" };
      const error = new Error();

      generalError(error as CustomError, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(publicMessage);
    });
  });
});
