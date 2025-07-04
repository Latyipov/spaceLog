import { z } from "zod";

export const userSchema = z.object({
  id: z.string().min(1),
  email: z.string().email("wrong email").optional(),
  password: z.string().min(3, "more than 3 symbols").max(100, "too much"),
  name: z.string().optional(),
  image: z.string().url().optional(),
});

export const newUserSchema = userSchema.pick({
  name: true,
  email: true,
  password: true,
});

export type AppUser = z.infer<typeof userSchema>;
export type NewUser = z.infer<typeof newUserSchema>;
