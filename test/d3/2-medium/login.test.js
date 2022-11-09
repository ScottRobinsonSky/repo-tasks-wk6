const app = require("../../../d3/2-medium/login");
const { User } = require("../../../d3/2-medium/model/user");
const request = require("supertest");

describe("app", () => {
  beforeEach(async () => {
    await User.sync({ force: true });
    await User.create({
      username: "alice",
      email: "alice@example.com",
      password: "s3cr3t",
    });
  });

  describe("POST /login", () => {
    describe("with no parameters", () => {
      test("fails with 400 Bad Request", async () => {
        const { statusCode } = await request(app).post("/login").send({});

        expect(statusCode).toBe(400);
      });
    });

    describe("with no `username_or_email` parameter", () => {
      test("fails with 400 Bad Request", async () => {
        const { statusCode } = await request(app).post("/login").send({
          password: "s3cr3t",
        });

        expect(statusCode).toBe(400);
      });
    });

    describe("with no `password` parameter", () => {
      test("fails with 400 Bad Request", async () => {
        const { statusCode } = await request(app).post("/login").send({
          username_or_email: "alice",
        });

        expect(statusCode).toBe(400);
      });
    });

    describe("with valid username and password", () => {
      test("succeds with 302 Found", async () => {
        const { statusCode } = await request(app)
          .post("/login")
          .send({ username_or_email: "alice", password: "s3cr3t" });

        expect(statusCode).toBe(302);
      });

      test("redirects to '/'", async () => {
        const { headers } = await request(app)
          .post("/login")
          .send({ username_or_email: "alice", password: "s3cr3t" });

        expect(headers["location"]).toBe("/");
      });
    });

    describe("with valid eamil and password", () => {
      test("succeds with 302 Found", async () => {
        const { statusCode } = await request(app)
          .post("/login")
          .send({ username_or_email: "alice@example.com", password: "s3cr3t" });

        expect(statusCode).toBe(302);
      });

      test("redirects to '/'", async () => {
        const { headers } = await request(app)
          .post("/login")
          .send({ username_or_email: "alice@example.com", password: "s3cr3t" });

        expect(headers["location"]).toBe("/");
      });
    });

    describe("with an incorrect username_or_email parameter", () => {
      test("succeds with 401 Unauthorized", async () => {
        const { statusCode } = await request(app)
          .post("/login")
          .send({ username_or_email: "bob", password: "s3cr3t" });

        expect(statusCode).toBe(401);
      });
    });

    describe("with an incorrect password parameter", () => {
      test("succeds with 401 Unauthorized", async () => {
        const { statusCode } = await request(app)
          .post("/login")
          .send({ username_or_email: "alice", password: "p4ssw0rd" });

        expect(statusCode).toBe(401);
      });
    });
  });
});
