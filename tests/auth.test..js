import request from "supertest";
import app from "../src/index";

describe("Test /", () => {
  it("jest test", async (done) => {
    const response = await request(app).get("/");
    await expect(response.statusCode).toBe(200);
    done();
  });
});

describe("Test /api/auth", () => {
  it("test", () => {
    expect(null).toBe(null);
  });
  // test("Test register API", async (done) => {
  //   try {
  //     const data = await JSON.stringify({
  //       reqUserId: "test",
  //       reqUserPassword: "123456",
  //       reqUserEmail: "test@test.com",
  //     });
  //     const response = await request(app).post("/api/auth/register").send(data);
  //     await expect(response.statusCode).toBe(200);
  //     done();
  //   } catch (error) {
  //     console.log(error);
  //   }
});

// test("Test register API 2", async (done) => {
//   try {
//     const data = JSON.stringify({
//       reqUserId: "test",
//       reqUserPassword: "123",
//       reqUserEmail: "test@test.com",
//     });
//     const response = await request(app).post("/api/auth/register").send(data);
//     await expect(response.statusCode).toBe(200);
//     done();
//   } catch (error) {
//     console.log(error);
//   }
// });
// });
