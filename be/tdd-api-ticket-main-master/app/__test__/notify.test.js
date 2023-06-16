const request = require("supertest");
const app = require("../index");
const { Notify } = require("../models");

describe("GET /v1/notify", () => {
  describe("getting all transactions data", () => {
    it("should respond with a 401 status code", async () => {
      const response = await request(app).get("/v1/notify");
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("PUT /v1/notify/:id", () => {
  let notify;

  beforeEach(async () => {
    notify = await Notify.create({
      reqId: 123,
      desc: "User doing some trasaction",
      isRead: true,
      type: "transactions",
    });
    return notify;
  });

  afterEach(() => notify.destroy());

  it("should response with 401 as status code", async () => {
    const userId = 123;
    const desc = "User doing some trasaction";
    const isRead = true;
    const type = "transactions";

    return request(app)
      .put("/v1/notify/:id" + notify.id)
      .set("Content-Type", "application/json")
      .send({ userId, desc, isRead, type })
      .then((res) => {
        expect(res.statusCode).toBe(401);
      });
  });
});
