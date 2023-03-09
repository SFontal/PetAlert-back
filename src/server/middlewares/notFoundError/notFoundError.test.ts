import type { NextFunction, Request, Response } from "express";
import notFoundError from "./notFoundError.js";

describe("Given a notFoundError middleware", () => {
  describe("When it receives a request", () => {
    test("Then it should call its next method", () => {
      const req = {} as Request;
      const res = {} as Response;
      const next = jest.fn() as NextFunction;

      notFoundError(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
