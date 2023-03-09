import type { NextFunction, Request, Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import notFoundError from "./notFoundError.js";

describe("Given a notFoundError middleware", () => {
  describe("When it receives a request", () => {
    test("Then it should call its next method with a custom error", () => {
      const req: Partial<Request> = {};
      const res: Partial<Response> = {};
      const next = jest.fn();

      const message = "Endpoint not found";
      const publicMessage = "";
      const statusCode = 0;
      const error = new CustomError(message, statusCode, publicMessage);

      notFoundError(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
