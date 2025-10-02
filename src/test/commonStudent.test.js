require("iconv-lite").encodingExists("cesu8");
const request = require("supertest");
const app = require("../app");

describe("POST /api/register", () => {
  it("should return 400 if student is missing", async () => {
    const res = await request(app).post("/api/suspend").send({});
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: "Student email is required" });
  });
});