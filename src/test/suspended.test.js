require("iconv-lite").encodingExists("cesu8");
const request = require("supertest");
const app = require("../app");

describe("POST /api/register", () => {
  it("should return 400 if no teacher param", async () => {
    const res = await request(app).get("/api/commonstudents");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: "At least one teacher is required" });
  });
});