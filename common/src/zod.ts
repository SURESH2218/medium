import z from "zod";

export const signUpInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export const signInInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});

export const udpateBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  id: z.string(),
});

export type SingUpInput = z.infer<typeof signUpInput>;
export type SingInInput = z.infer<typeof signInInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdpateBlogInput = z.infer<typeof udpateBlogInput>;
