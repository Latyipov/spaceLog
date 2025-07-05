import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email("wrong email").optional(),
  password: z.string().min(3, "more than 3 symbols").max(20, "too much"),
  name: z.string().min(3),
});
export const updateNameUserSchema = z.object({
  name: z.string().min(3),
});
export const updateEmailUserSchema = z.object({
  email: z.string().email("wrong email"),
});
export const updatePasswordUserSchema = z.object({
  oldPassword: z.string().min(3),
  newPassword: z.string().min(3, "more than 3 symbols").max(20, "too much"),
});

export type CreateUser = z.infer<typeof createUserSchema>;
export type updateNameUser = z.infer<typeof updateNameUserSchema>;
export type updateEmailUser = z.infer<typeof updateEmailUserSchema>;
export type updatePasswordUser = z.infer<typeof updatePasswordUserSchema>;
