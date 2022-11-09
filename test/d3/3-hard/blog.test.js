const request = require("supertest");
const app = require("../../../d3/3-hard/blog");
const { Category, Post } = require("../../../d3/3-hard/models");

describe("app", () => {
  beforeEach(async () => {
    await Post.sync({ force: true });
    await Category.sync({ force: true });

    const category = await Category.create({ slug: "news", title: "News" });
    const post = await category.createPost({
      slug: "first-post",
      title: "First Post",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar tellus at nibh facilisis dapibus. Sed sit amet sapien pharetra, consectetur erat nec, accumsan sapien. Maecenas commodo nisi erat, vitae sagittis metus porttitor quis. In tincidunt vitae enim id blandit. Nulla gravida, felis et facilisis gravida, eros nulla feugiat dui, id accumsan quam sapien ut est. Proin sit amet rutrum turpis, semper tincidunt arcu. Phasellus sem dui, commodo sed orci et, vehicula finibus quam. Vivamus ipsum mauris, ultricies ac dolor mattis, mattis iaculis odio. Vestibulum a sem justo.",
    });
  });

  describe("GET /blog", () => {
    test("succeeds", async () => {
      const { statusCode } = await request(app).get(`/blog`);

      expect(statusCode).toBe(200);
    });

    test("responds with application/json", async () => {
      const { headers } = await request(app).get(`/blog`);

      expect(headers["content-type"]).toMatch("application/json");
    });

    test("responds with an collection of posts", async () => {
      const { body } = await request(app).get(`/blog`);

      expect(Array.isArray(body)).toBe(true);
      expect(
        body.every(({ slug, title, category }) => slug && title && category)
      );
    });
  });

  describe("GET /blog/:slug", () => {
    describe("with a valid :slug", () => {
      test("succeeds", async () => {
        const { slug } = await Post.findOne();

        const { statusCode } = await request(app).get(`/blog/${slug}`);

        expect(statusCode).toBe(200);
      });

      test("responds with application/json", async () => {
        const { slug } = await Post.findOne();

        const { headers } = await request(app).get(`/blog/${slug}`);

        expect(headers["content-type"]).toMatch("application/json");
      });

      test("responds with the post", async () => {
        const { slug, title } = await Post.findOne();

        const { body } = await request(app).get(`/blog/${slug}`);

        expect(body.slug).toBe(slug);
        expect(body.title).toBe(title);
      });
    });

    describe("with an invalid :slug", () => {
      test("fails with Not Found", async () => {
        const { statusCode } = await request(app).get(`/blog/does-not-exist`);

        expect(statusCode).toBe(404);
      });
    });
  });

  describe("GET /categories", () => {
    test("succeeds", async () => {
      const { statusCode } = await request(app).get(`/categories`);

      expect(statusCode).toBe(200);
    });

    test("responds with application/json", async () => {
      const { headers } = await request(app).get(`/categories`);

      expect(headers["content-type"]).toMatch("application/json");
    });

    test("responds with an collection of categories", async () => {
      const { body } = await request(app).get(`/categories`);

      expect(Array.isArray(body)).toBe(true);
      expect(body.every(({ slug, title }) => slug && title));
    });
  });

  describe("GET /categories/:slug", () => {
    describe("with a valid :slug", () => {
      test("succeeds", async () => {
        const { slug } = await Category.findOne();

        const { statusCode } = await request(app).get(`/categories/${slug}`);

        expect(statusCode).toBe(200);
      });

      test("responds with application/json", async () => {
        const { slug } = await Category.findOne();

        const { headers } = await request(app).get(`/categories/${slug}`);

        expect(headers["content-type"]).toMatch("application/json");
      });

      test("responds with the category", async () => {
        const { slug, title } = await Category.findOne();

        const { body } = await request(app).get(`/categories/${slug}`);

        expect(body.slug).toBe(slug);
        expect(body.title).toBe(title);
      });

      describe("/posts", () => {
        test("succeeds", async () => {
          const { slug } = await Category.findOne();

          const { statusCode } = await request(app).get(
            `/categories/${slug}/posts`
          );

          expect(statusCode).toBe(200);
        });

        test("responds with application/json", async () => {
          const { slug } = await Category.findOne();

          const { headers } = await request(app).get(
            `/categories/${slug}/posts`
          );

          expect(headers["content-type"]).toMatch("application/json");
        });

        test("responds with an collection of posts", async () => {
          const { slug } = await Category.findOne();

          const { body } = await request(app).get(`/categories/${slug}/posts`);

          expect(Array.isArray(body)).toBe(true);
          expect(body.every(({ slug, title }) => slug && title));
        });
      });
    });

    describe("with an invalid :slug", () => {
      test("fails with Not Found", async () => {
        const { statusCode } = await request(app).get(
          `/categories/does-not-exist`
        );

        expect(statusCode).toBe(404);
      });
    });
  });
});
