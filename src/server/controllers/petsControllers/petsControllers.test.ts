import type { Request, Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import Pet from "../../../database/models/Pet";
import { type PetStructure, type PetsStructure } from "../types";
import { getPets } from "./petsControllers";

const req: Partial<Request> = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next = jest.fn();

describe("Given a getPets controller", () => {
  describe("When it receives a response and yo k sé, tío", () => {
    test("Then it should call its next method with a status 500 and a message 'Couldn't retrieve pets!'", async () => {
      const pets: PetsStructure = [];
      Pet.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(pets),
      }));

      const statusCode = 500;
      const message = "Couldn't retrieve pets!";
      const publicMessage = message;
      const expectedError = new CustomError(message, statusCode, publicMessage);

      await getPets(req as Request, res as Response, next);

      expect(next).toBeCalledWith(expectedError);
    });
  });

  describe("When it receives a response with a list of one pet", () => {
    const pet: Partial<PetStructure> = {};
    const pets: PetsStructure = [pet as PetStructure];

    test("Then it should call its method status with a 200", async () => {
      Pet.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(pets),
      }));

      const statusCode = 200;

      await getPets(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });

    test("Then it should call its method json with an object with a property pets", async () => {
      Pet.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(pets),
      }));

      await getPets(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(pets);
    });
  });
});
