import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    posts:string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  try {
    const authHeader = c.req.header("authorization") || "";
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(401);
      return c.text("You are not logged in!");
    }
  } catch (e) {
    c.status(403);
    return c.text("You are not logged in!");
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: Number(userId),
      PostPhoto: {
        create: {
          imageUrl: body.image,
        },
      },
      tags: {
        create: Array.isArray(body.tags) ? body.tags.map((tag: string) => ({
          name: tag,
        })) : [],
      },
    },
  });
  return c.json({ id: post.id });
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true,
        },
      },
      tags: {
        select: {
          name: true,
        },
      },
      PostPhoto: {
        select: {
          imageUrl: true,
          createdAt: true,
        },
      },
    },
  });
  return c.json({ posts });
});

blogRouter.put("/:id", async (c) => {
  try{
    const id=c.req.param("id")
    const tags=c.req.json()
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        tags: {
          connectOrCreate: Array.isArray(tags) ? tags.map(tag => ({
            where: { name: tag.name }, // Use the tag name to find existing tags
            create: tag // If no existing tag is found, create a new one
          })) : [] 
        }
      },
      include: {
        tags: true 
      }
    });
    return c.json({post});
  }catch(e){
    console.error(e)
  }
})

blogRouter.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const post = await prisma.post.findFirst({
      where: { id: Number(id) },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
        PostPhoto: {
          select: {
            imageUrl: true,
            createdAt: true,
          },
        },
      },
    });
    return c.json({ post });
  } catch (e) {
    c.status(411);
    return c.text("post not found");
  }
});

blogRouter.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const tags = body.tags; // Extract tags from the body
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        tags: {
          connectOrCreate: tags.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });
  
    c.json(updatedPost);
  } catch (error) {
    console.error(error); // Log the error message to the console
    c.status(500);
    return c.json({ error: 'Something went wrong', details: (error as Error).message });
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
      PostPhoto: body.image,
    },
  });
  return c.json({ id: post.id });
});
