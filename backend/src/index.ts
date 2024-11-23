import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.use("/api/v1/blog/*", async (c, next) => {
  const header = c.req.header("Authorization") || "";
  const response = await verify(header, "secret");

  if (response.id) {
    next();
  } else {
    c.status(403);
    return c.json({
      error: "unauthorized",
    });
  }
});

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { email, password } = await c.req.json();
  const user = await prisma.user.create({
    data: {
      email,
      password,
    },
  });

  const token = await sign(
    {
      id: user.id,
    },
    "secret"
  );

  return c.json({
    jwt: token,
  });
});

app.post("/api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { email, password } = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email,
      password,
    },
  });

  return c.json({
    data: user,
    msg: "signed in successfully",
  });
});
app.post("/api/v1/blog", (c) => {
  return c.text("Blog added");
});
app.put("/api/v1/blog", (c) => {
  return c.text("blog update");
});
app.get("/api/v1/blog/:id", (c) => {
  return c.text("signup");
});

export default app;
