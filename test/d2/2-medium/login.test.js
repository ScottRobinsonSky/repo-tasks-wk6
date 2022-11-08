const app = require("../../../d2/2-medium/login");
const request = require("supertest");

describe("app", () => {
  describe("POST /login", () => {
    describe("with no parameters", () => {
      test("fails with 400 Bad Request", async () => {
        const { statusCode } = await request(app)
          .post("/login")
          .type("form")
          .send({});

        expect(statusCode).toBe(400);
      });
    });

    describe("with no `username` parameter", () => {
      test("fails with 400 Bad Request", async () => {
        const { statusCode } = await request(app)
          .post("/login")
          .type("form")
          .send({
            password: "s3cr3t",
          });

        expect(statusCode).toBe(400);
      });
    });

    describe("with no `password` parameter", () => {
      test("fails with 400 Bad Request", async () => {
        const { statusCode } = await request(app)
          .post("/login")
          .type("form")
          .send({
            username: "alice",
          });

        expect(statusCode).toBe(400);
      });
    });

    describe("with valid parameters", () => {
      test("succeds with 302 Found", async () => {
        const { statusCode } = await request(app)
          .post("/login")
          .type("form")
          .send({ username: "alice", password: "s3cr3t" });

        expect(statusCode).toBe(302);
      });

      test("redirects to '/'", async () => {
        const { headers } = await request(app)
          .post("/login")
          .type("form")
          .send({ username: "alice", password: "s3cr3t" });

        expect(headers["location"]).toBe("/");
      });
    });

    describe("with an incorrect username parameter", () => {
      test("succeds with 401 Unauthorized", async () => {
        const { statusCode } = await request(app)
          .post("/login")
          .type("form")
          .send({ username: "bob", password: "s3cr3t" });

        expect(statusCode).toBe(401);
      });
    });

    describe("with an incorrect password parameter", () => {
      test("succeds with 401 Unauthorized", async () => {
        const { statusCode } = await request(app)
          .post("/login")
          .type("form")
          .send({ username: "alice", password: "p4ssw0rd" });

        expect(statusCode).toBe(401);
      });
    });
  });
});
