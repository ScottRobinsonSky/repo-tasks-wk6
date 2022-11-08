const app = require("../../../d2/1-easy/library");
const request = require("supertest");

describe("app", () => {
  describe("GET /books", () => {
    test("succeeds", async () => {
      const { statusCode } = await request(app).get("/books");

      expect(statusCode).toBe(200);
    });

    test("response body contains application/json", async () => {
      const { headers } = await request(app).get("/books");

      expect(headers["content-type"]).toMatch("application/json");
    });

    test("response body contains a list of books", async () => {
      const { body } = await request(app).get("/books");

      expect(Array.isArray(body)).toBe(true);
      expect(body.every(({ isbn }) => isbn)).toBe(true);
    });
  });

  describe("GET /books/978-1491973899", () => {
    test("succeeds", async () => {
      const { statusCode } = await request(app).get("/books/978-1491973899");

      expect(statusCode).toBe(200);
    });

    test("response body contains application/json", async () => {
      const { headers } = await request(app).get("/books/978-1491973899");

      expect(headers["content-type"]).toMatch("application/json");
    });

    test("response body contains Fournier's book", async () => {
      const { body } = await request(app).get("/books/978-1491973899");

      expect(body.author).toBe("Camille Fournier");
      expect(body.title).toMatch("The Manager`s Path");
    });
  });

  describe("GET /books/978-1119056072", () => {
    test("fails with Not Found response", async () => {
      const { statusCode } = await request(app).get("/books/978-1119056072");

      expect(statusCode).toBe(404);
    });
  });
});
