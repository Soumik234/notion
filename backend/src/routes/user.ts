import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupSchemaDef, signinSchemaDef } from "@soumik007/notion-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signupSchemaDef.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({
      message: "Incorrect inputs",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
 
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
    
    c.status(411);
    return c.json(e);
  }
});
userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success } = signinSchemaDef.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({
      message: "Incorrect inputs",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());


try{
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
}catch(e){
  c.status(411);
  return c.text('user not found')
}  
});

userRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try{
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name:true,
        password:true,
      },
      
    });
    return c.json({ users });
  }catch(e){
    c.status(411);
    return c.text('user not found')
  }
  
  
});
