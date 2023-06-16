const request = require("supertest");
const app = require("../index");
const { User } = require("../models");

//for admin
//getting list of member
describe("GET /v1/admin/all", () => {
  describe("getting all users data", () => {
    it("should respond with a 200 status code", async () => {
      const response = await request(app).get("/v1/ticket");
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("PUT /v1/admin/update/:id", () => {
  let user;

  beforeEach(async () => {
    user = await User.create({
      name: "Lovelly Super Admin",
      email: "superadmin@gmail.com",
      password: "test",
      image:
        "https://res.cloudinary.com/dptgh7efj/image/upload/v1668438995/user/k4qprdipa96sl2c3ugd0.jpg",
      phone: "+62 898 1234 4321",
      birth: new Date("02/02/2022"),
      role: "superadmin",
      isExist: true,
      isVerify: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return user;
  });

  afterEach(() => user.destroy());

  it("should response with 401 as status code", async () => {
    const name = "Lovelly Super Admin";
    const email = "superadmin@gmail.com";
    const password = "test";
    const image =
      "https://res.cloudinary.com/dptgh7efj/image/upload/v1668438995/user/k4qprdipa96sl2c3ugd0.jpg";
    const phone = "+62 898 1234 4321";
    const birth = new Date("02/02/2022");
    const role = "superadmin";
    const isExist = true;
    const isVerify = true;
    const createdAt = new Date();
    const updatedAt = new Date();

    return request(app)
      .put("/v1/admin/update/" + user.id)
      .set("Content-Type", "application/json")
      .send({
        name,
        email,
        password,
        image,
        phone,
        birth,
        role,
        isExist,
        isVerify,
        createdAt,
        updatedAt,
      })
      .then((res) => {
        expect(res.statusCode).toBe(401);
        // expect(res.body).toEqual(
        //   expect.objectContaining({
        //     name,
        //     email,
        //     password,
        //     image,
        //     phone,
        //     birth,
        //     role,
        //     isExist,
        //     isVerify,
        //     createdAt,
        //     updatedAt
        //   })
        // )
      });
  });
});

describe("DELETE /v1/admin/delete/:id", () => {
  let user;

  beforeEach(async () => {
    user = await User.create({
      name: "Lovelly Super Admin",
      email: "superadmin@gmail.com",
      password: "test",
      image:
        "https://res.cloudinary.com/dptgh7efj/image/upload/v1668438995/user/k4qprdipa96sl2c3ugd0.jpg",
      phone: "+62 898 1234 4321",
      birth: new Date("02/02/2022"),
      role: "superadmin",
      isExist: true,
      isVerify: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return user;
  });

  afterEach(() => user.destroy());

  it("should response with 401 as status code", async () => {
    return request(app)
      .delete("/v1/admin/delete/" + user.id)
      .then((res) => {
        expect(res.statusCode).toBe(401);
      });
  });
});
