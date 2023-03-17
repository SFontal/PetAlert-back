import { MongoMemoryServer } from "mongodb-memory-server";
import connectDatabase from "../../../database/connectDataBase.js";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../index.js";
import Pet from "../../../database/models/Pet.js";

let mongodbServer: MongoMemoryServer;
const getPetsPath = "/pets";

beforeAll(async () => {
  mongodbServer = await MongoMemoryServer.create();
  const mongoServerUrl = mongodbServer.getUri();

  await connectDatabase(mongoServerUrl);
  await Pet.create({
    name: "Mute",
    born: new Date(),
    gender: "Male",
    specie: "Dog",
    breed: "French Bulldog",
    colour: "White",
    size: "Small",
    description:
      "Miau miau miau miau miau miau miau miau miau miau miau miau miau miau miau miau miau miau miau miau miau miau miau miau miau miau miau miau miau.",
    imageUrl: "Mute.jpg",
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongodbServer.stop();
});

describe("Given a GET '/pets' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should call its method status with 200", async () => {
      const expectedStatusCode = 200;

      await request(app).get(getPetsPath).expect(expectedStatusCode);
    });
  });
});
