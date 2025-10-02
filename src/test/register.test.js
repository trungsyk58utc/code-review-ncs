require("iconv-lite").encodingExists("cesu8");
const request = require("supertest");
const app = require("../app");

describe("POST /api/register", () => {
  it("should return 400 if teacher missing", async () => {
    const res = await request(app)
      .post("/api/register")
      .send({ students: ["studentjon@gmail.com"] })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: "Teacher email is required" });
  });

  it("should return 400 if students is not array", async () => {
    const res = await request(app)
      .post("/api/register")
      .send({ teacher: "t@gmail.com", students: "notArray" });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: "Students must be an array" });
  });
});
