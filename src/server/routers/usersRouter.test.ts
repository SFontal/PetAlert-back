import { MongoMemoryServer } from "mongodb-memory-server";
import connectDatabase from "../../database/connectDataBase.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import request from "supertest";
import { app } from "../index.js";
import User from "../../database/models/User.js";

let mongodbServer: MongoMemoryServer;
const loginEndpoint = "/users/login";

beforeAll(async () => {
  mongodbServer = await MongoMemoryServer.create();
  const mongoServerUrl = mongodbServer.getUri();

  await connectDatabase(mongoServerUrl);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongodbServer.stop();
});

describe("Given a POST '/user/login' endpoint", () => {
  const username = "Pet";
  const password = "PetAdmin";

  beforeAll(async () => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
  });

  describe("When it receives a request with a registered user with a username 'Pet' and a password 'PetAdmin'", () => {
    test("Then it should response with status code 200", async () => {
      const expectedStatusCode = 200;

      const response = await request(app)
        .post(loginEndpoint)
        .send({ username, password })
        .expect(expectedStatusCode);
    });

    test("Then it should response with a token", async () => {
      const response = await request(app)
        .post(loginEndpoint)
        .send({ username, password });

      expect(response.body).toHaveProperty("token");
    });
  });

  describe("When it receives a request with a non-registered user with a username 'Pete' and d password 'PetAdmin'", () => {
    test("Then it should response with status code 401", async () => {
      const expectedStatusCode = 401;

      const response = await request(app)
        .post(loginEndpoint)
        .send({ username: "Pete", password })
        .expect(expectedStatusCode);
    });

    test("Then it should response with 'Wrong credentials'", async () => {
      const expectedMessage = "Wrong credentials";

      const response = await request(app)
        .post(loginEndpoint)
        .send({ username: "Pete", password });

      expect(response.body).toHaveProperty("error", expectedMessage);
    });
  });

  describe("When it receives a request with a non-registered user with a username 'Pet' and d password 'PeteAdmin'", () => {
    test("Then it should response with status code 401", async () => {
      const expectedStatusCode = 401;

      const response = await request(app)
        .post(loginEndpoint)
        .send({ username, password: "PeteAdmin" })
        .expect(expectedStatusCode);
    });

    test("Then it should response with 'Wrong credentials'", async () => {
      const expectedMessage = "Wrong credentials";

      const response = await request(app)
        .post(loginEndpoint)
        .send({ username, password: "PeteAdmin" });

      expect(response.body).toHaveProperty("error", expectedMessage);
    });
  });
});
