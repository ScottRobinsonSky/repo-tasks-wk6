const request = require("supertest");
const app = require("../../../d2/3-hard/contacts");
const { Contact } = require("../../../d2/3-hard/models/contact");

describe("app", () => {
  beforeEach(async () => {
    await Contact.sync({ force: true });
    await Contact.create({
      firstName: "Olive",
      lastName: "Rudd",
    });
  });

  describe("GET /contacts", () => {
    test("succeeds", async () => {
      const { statusCode } = await request(app).get("/contacts");

      expect(statusCode).toBe(200);
    });

    test("responds with application/json", async () => {
      const { headers } = await request(app).get("/contacts");

      expect(headers["content-type"]).toMatch("application/json");
    });

    test("responds with an collection of contacts", async () => {
      const { body } = await request(app).get("/contacts");

      expect(Array.isArray(body)).toBe(true);
      expect(body.every(({ firstName, lastName }) => firstName && lastName));
    });
  });

  describe("GET /contacts/:id", () => {
    describe("with a valid :id", () => {
      test("succeeds", async () => {
        const contact = await Contact.findOne();

        const { statusCode } = await request(app).get(
          `/contacts/${contact.id}`
        );

        expect(statusCode).toBe(200);
      });

      test("responds with application/json", async () => {
        const contact = await Contact.findOne();

        const { headers } = await request(app).get(`/contacts/${contact.id}`);

        expect(headers["content-type"]).toMatch("application/json");
      });

      test("responds with the contact", async () => {
        const contact = await Contact.findOne();

        const { body } = await request(app).get(`/contacts/${contact.id}`);

        expect(body).toMatchObject(JSON.parse(JSON.stringify(contact)));
      });
    });

    describe("with an invalid :id", () => {
      test("fails with Not Found", async () => {
        const { statusCode } = await request(app).get(`/contacts/0`);

        expect(statusCode).toBe(404);
      });
    });
  });

  describe("DELETE /contacts/:id", () => {
    describe("with a valid :id", () => {
      test("succeeds", async () => {
        const { id } = await Contact.create({
          firstName: "Alf",
          lastName: "Brockwell",
        });

        const { statusCode } = await request(app).delete(`/contacts/${id}`);

        expect(statusCode).toBe(200);
      });

      test("deletes the contact", async () => {
        const { id } = await Contact.create({
          firstName: "Alf",
          lastName: "Brockwell",
        });

        await request(app).delete(`/contacts/${id}`);

        expect(await Contact.findByPk(id)).toBeNull();
      });
    });

    describe("with an invalid :id", () => {
      test("succeeds", async () => {
        const { statusCode } = await request(app).delete(`/contacts/0`);

        expect(statusCode).toBe(200);
      });
    });
  });

  describe("POST /contacts", () => {
    describe("with valid parameters", () => {
      test("succeeds", async () => {
        const { statusCode } = await request(app)
          .post(`/contacts`)
          .send({ firstName: "Alf", lastName: "Brockwell" });

        expect(statusCode).toBe(201);
      });

      test("creates a new contact", async () => {
        const count = await Contact.count();

        await request(app)
          .post(`/contacts`)
          .send({ firstName: "Alf", lastName: "Brockwell" });

        const newCount = await Contact.count();

        expect(newCount).toBe(count + 1);
      });
    });

    describe("with missing firstName parameter", () => {
      test("fails with Bad Request", async () => {
        const { statusCode } = await request(app)
          .post(`/contacts`)
          .send({ firstName: "Alf" });

        expect(statusCode).toBe(400);
      });
    });

    describe("with missing lastName parameter", () => {
      test("fails with Bad Request", async () => {
        const { statusCode } = await request(app)
          .post(`/contacts`)
          .send({ lastName: "Brockwell" });

        expect(statusCode).toBe(400);
      });
    });
  });

  describe("PUT /contacts/:id", () => {
    describe("with a valid :id", () => {
      describe("and valid parameters", () => {
        test("succeeds", async () => {
          const { id } = await Contact.findOne();

          const { statusCode } = await request(app)
            .put(`/contacts/${id}`)
            .send({ firstName: "Olive", lastName: "Brockwell" });

          expect(statusCode).toBe(200);
        });

        test("updates the contact", async () => {
          const { id } = await Contact.findOne();

          await request(app)
            .put(`/contacts/${id}`)
            .send({ firstName: "Olive", lastName: "Brockwell" });

          const contact = await Contact.findByPk(id);

          expect(contact.firstName).toBe("Olive");
          expect(contact.lastName).toBe("Brockwell");
        });
      });

      describe("with missing firstName parameter", () => {
        test("fails with Bad Request", async () => {
          const { id } = await Contact.findOne();

          const { statusCode } = await request(app)
            .put(`/contacts/${id}`)
            .send({ firstName: "Olive" });

          expect(statusCode).toBe(400);
        });
      });

      describe("with missing lastName parameter", () => {
        test("fails with Bad Request", async () => {
          const { id } = await Contact.findOne();

          const { statusCode } = await request(app)
            .put(`/contacts/${id}`)
            .send({ lastName: "Brockwell" });

          expect(statusCode).toBe(400);
        });
      });
    });

    describe("with an invalid :id", () => {
      test("fails with Not Found", async () => {
        const { statusCode } = await request(app)
          .put(`/contacts/0`)
          .send({ firstName: "Olive", lastName: "Brockwell" });

        expect(statusCode).toBe(404);
      });
    });
  });

  describe("PATCH /contacts/:id", () => {
    describe("with a valid :id", () => {
      describe("and valid parameters", () => {
        test("succeeds", async () => {
          const { id } = await Contact.findOne();

          const { statusCode } = await request(app)
            .patch(`/contacts/${id}`)
            .send({ emailAddress: "alice@example.com" });

          expect(statusCode).toBe(200);
        });

        test("updates the contact", async () => {
          const { id } = await Contact.findOne();

          await request(app)
            .patch(`/contacts/${id}`)
            .send({ emailAddress: "alice@example.com" });

          const contact = await Contact.findByPk(id);

          expect(contact.emailAddress).toBe("alice@example.com");
        });
      });
    });

    describe("with an invalid :id", () => {
      test("fails with Not Found", async () => {
        const { statusCode } = await request(app)
          .patch(`/contacts/0`)
          .send({ emailAddress: "alice@example.com" });

        expect(statusCode).toBe(404);
      });
    });
  });
});
