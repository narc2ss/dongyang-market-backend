// const request = require("supertest");
// const app = require("../src/index");

// describe("Test the auth api", () => {
//   test("test register", async (done) => {
//     const data = {
//       reqUserId: "test",
//       reqUserPassword: "123456",
//       reqUserEmail: "test@test.com",
//     };
//     const response = await request(app).post("/api/auth/register").send(data);
//     expect(response.statusCode).toBe(200);
//     done();
//   });
// });

import request from "supertest";
import app from "../src/index";

// describe("Test /hello", () => {
//   it("should return ok!", async (done) => {
//     const response = await request(app).get("/");
//     await expect(response.text).toBe("ok");
//     done();
//   });
// });

describe("Test /", () => {
  test("it should create new order", async (done) => {
    const response = await request(app).get("/");
    await expect(response.statusCode).toBe(200);
    done();
  });
});

// describe("Test /", () => {
//   test("it should create new order", async () => {
//     const response = await app.inject({
//       method: "GET",
//       url: "/",
//       payload: JSON.stringify({
//         customer: {
//           email: "asd@gmail.com",
//           phone: "20 51 75 95",
//           city: "Aarhus",
//           zip: "8000",
//           first_name: "jamal",
//           last_name: "soueidan",
//         },
//         properties: [
//           {
//             name: "custom engraving",
//             value: "Happy Birthday Mom!",
//           },
//         ],
//       }),
//     });

//     expect(response.statusCode).toBe(200);
//   });
// });
