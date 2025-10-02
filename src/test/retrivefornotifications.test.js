require("iconv-lite").encodingExists("cesu8");
const request = require("supertest");
const app = require("../app");

describe("POST /api/retrievefornotifications", () => {
  it("should return 400 if teacher is missing", async () => {
    const res = await request(app)
      .post("/api/retrievefornotifications")
      .send({ notification: "Hi" });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: "Teacher email is required" });
  });

  it("should return 400 if notification is missing", async () => {
    const res = await request(app)
      .post("/api/retrievefornotifications")
      .send({ teacher: "teacherken@gmail.com" });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: "Notification message is required" });
  });
});