import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email("wrong email").optional(),
  password: z.string().min(3, "more than 3 symbols").max(20, "too much"),
  name: z.string().min(3),
});
export const updateNameUserSchema = userSchema.pick({ name: true });
export const updateEmailUserSchema = userSchema.pick({ email: true });
export const updatePasswordUserSchema = z.object({
  oldPassword: userSchema.shape.password,
  newPassword: userSchema.shape.password,
});

export type user = z.infer<typeof userSchema>;
export type updateNameUser = z.infer<typeof updateNameUserSchema>;
export type updateEmailUser = z.infer<typeof updateEmailUserSchema>;
export type updatePasswordUser = z.infer<typeof updatePasswordUserSchema>;
