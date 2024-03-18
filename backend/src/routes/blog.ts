import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string;
  },
}>();

blogRouter.use("/*", async(c, next) => {
  try{
    const authHeader=c.req.header("authorization") || "";
    const user=await verify(authHeader,c.env.JWT_SECRET);
    if(user){
        c.set("userId",user.id);
        await next();
    }
    else{
        c.status(401);
        return c.text("You are not logged in!");
    }
  }catch(e){
    c.status(403);
    return c.text("You are not logged in!");
  }
  
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const userId=c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: Number(userId),
    },
  });
  return c.json({ id: post.id });
});

blogRouter.get('bulk', async(c) => {
  const prisma=new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const posts=await prisma.post.findMany({
      select:{
        id:true,
        title:true,
        content:true,
        author:{
          select:{
            name:true,
          }
        }
      }


    })
    return c.json({ posts })
});

blogRouter.get("/:id", async(c) => {
    try{
        const id=await c.req.param("id");
        const prisma=new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL,
          }).$extends(withAccelerate())
          const post=await prisma.post.findFirst({
            where:{id:Number(id)}
            })
        return c.json({ post })

    }catch(e){
        c.status(411);
        return c.text('post not found')
    }
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const post = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({ id: post.id });
});

