import { z } from "zod";

export const signupSchemaDef = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

// Zod validation schema for signin
export const signinSchemaDef = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const createBlogInputDef = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlogInputDef = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  id: z.number(),
});

export type signupSchema = z.infer<typeof signupSchemaDef>;
export type signinSchema = z.infer<typeof signinSchemaDef>;
export type createBlogInput = z.infer<typeof createBlogInputDef>;
export type updateBlogInput = z.infer<typeof updateBlogInputDef>;
