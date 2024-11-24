import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { singInUpInput } from "../zod";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { email, password } = await c.req.json();
  const { success } = singInUpInput.safeParse(email, password);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "invalid inputs",
    });
  }
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
    c.env.JWT_SECRET
  );

  return c.json({
    jwt: token,
  });
});

userRouter.post("/signin", async (c) => {
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
