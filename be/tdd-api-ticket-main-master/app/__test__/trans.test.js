const request = require("supertest");
const app = require("../index");
const { Transaction } = require("../models");

describe("GET /v1/trans", () => {
  describe("getting all transactions data", () => {
    it("should respond with a 401 status code", async () => {
      const response = await request(app).get("/v1/trans");
      expect(response.statusCode).toBe(401);
    });
  });
});
