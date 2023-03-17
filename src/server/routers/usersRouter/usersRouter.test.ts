import { MongoMemoryServer } from "mongodb-memory-server";
import connectDatabase from "../../../database/connectDataBase.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import request from "supertest";
import { app } from "../../index.js";
import User from "../../../database/models/User.js";

let mongodbServer: MongoMemoryServer;
const loginPath = "/users/login";

beforeAll(async () => {
  mongodbServer = await MongoMemoryServer.create();
  const mongoServerUrl = mongodbServer.getUri();

  await connectDatabase(mongoServerUrl);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongodbServer.stop();
});

describe("Given a POST '/users/login' endpoint", () => {
  const username = "Pet";
  const email = "pet@pettest.com";
  const password = "PetAdmin";

  beforeAll(async () => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });
  });

  describe("When it receives a request with a registered user with an email 'pet@pettest.com' and a password 'PetAdmin'", () => {
    test("Then it should response with status code 200", async () => {
      const expectedStatusCode = 200;

      await request(app)
        .post(loginPath)
        .send({ email, password })
        .expect(expectedStatusCode);
    });

    test("Then it should response with a token", async () => {
      const response = await request(app)
        .post(loginPath)
        .send({ email, password });

      expect(response.body).toHaveProperty("token");
    });
  });

  describe("When it receives a request with a non-registered user with an email 'pete@pettest.com' and a password 'PetAdmin'", () => {
    test("Then it should response with status code 401", async () => {
      const expectedStatusCode = 401;

      await request(app)
        .post(loginPath)
        .send({ email: "pete@pettest.com", password })
        .expect(expectedStatusCode);
    });

    test("Then it should response with 'Wrong credentials'", async () => {
      const expectedMessage = "Wrong credentials";

      const response = await request(app)
        .post(loginPath)
        .send({ email: "pete@pettest.com", password });

      expect(response.body).toHaveProperty("error", expectedMessage);
    });
  });

  describe("When it receives a request with a non-registered user with an email: 'pet@pettest.com' and a password 'PeteAdmin'", () => {
    test("Then it should response with status code 401", async () => {
      const expectedStatusCode = 401;

      await request(app)
        .post(loginPath)
        .send({ email, password: "PeteAdmin" })
        .expect(expectedStatusCode);
    });

    test("Then it should response with 'Wrong credentials'", async () => {
      const expectedMessage = "Wrong credentials";

      const response = await request(app)
        .post(loginPath)
        .send({ email, password: "PeteAdmin" });

      expect(response.body).toHaveProperty("error", expectedMessage);
    });
  });
});
