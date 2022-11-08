const app = require("../../../d2/2-medium/get-post");
const request = require("supertest");

describe("app", () => {
  describe("GET /data", () => {
    test("succeeds", async () => {
      const { statusCode } = await request(app).get("/data");

      expect(statusCode).toBe(200);
    });

    test("response body contains `application/json`", async () => {
      const { headers } = await request(app).get("/data");

      expect(headers["content-type"]).toMatch("application/json");
    });

    test("response body contains the persisted data", async () => {
      await request(app).post("/data").type("form").send({ a: "a", b: "b" });

      const { body } = await request(app).get("/data");

      expect(body).toMatchObject({ a: "a", b: "b" });
    });
  });

  describe("POST /data", () => {
    describe("with no parameters", () => {
      test("fails with 400 Bad Request", async () => {
        const { statusCode } = await request(app)
          .post("/data")
          .type("form")
          .send({});

        expect(statusCode).toBe(400);
      });
    });

    describe("with some parameters", () => {
      test("succeeds with 302 Found", async () => {
        const { statusCode } = await request(app)
          .post("/data")
          .type("form")
          .send({ one: "1", two: "2" });

        expect(statusCode).toBe(302);
      });

      test("redirects to '/'", async () => {
        const { headers } = await request(app)
          .post("/data")
          .type("form")
          .send({ one: "1", two: "2" });

        expect(headers["location"]).toBe("/data");
      });

      test("persists the data", async () => {
        await request(app)
          .post("/data")
          .type("form")
          .send({ one: "1", two: "2" });

        const { body } = await request(app).get("/data");

        expect(body).toMatchObject({ one: "1", two: "2" });
      });
    });
  });
});
