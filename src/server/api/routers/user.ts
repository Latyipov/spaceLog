import { z } from "zod";
import { newUserSchema } from "@/zodSchemas";
import bcrypt from "bcryptjs";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const userRouter = createTRPCRouter({
  createNewUser: publicProcedure
    .input(newUserSchema)
    .mutation(async ({ input }) => {
      const existingUser = await prisma.user.findUnique({
        where: { email: input.email },
      });
      if (existingUser) {
        throw new Error("this email is already registered");
      }
      const hashedPassword = await bcrypt.hash(input.password, 10);

      const newUser = await prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
          password: hashedPassword,
        },
      });
      return { success: true, userId: newUser.id };
    }),

  getUserById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      });
      if (!user) {
        throw new Error("can't find the user");
      }
      return user;
    }),

  updateUserName: protectedProcedure
    .input(z.object({ id: z.string().uuid(), name: z.string().min(2) }))
    .mutation(async ({ input }) => {
      const updated = await prisma.user.update({
        where: { id: input.id },
        data: { name: input.name },
      });
      return { success: true, name: updated.name };
    }),

  updateEmail: protectedProcedure
    .input(z.object({ id: z.string().uuid(), email: z.string().email() }))
    .mutation(async ({ input }) => {
      const existing = await prisma.user.findUnique({
        where: { email: input.email },
      });
      if (existing) throw new Error("this email is already registered");

      await prisma.user.update({
        where: { id: input.id },
        data: { email: input.email },
      });

      return { success: true };
    }),

  updatePassword: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        oldPassword: z.string().min(6),
        newPassword: z.string().min(6),
      })
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.findUnique({ where: { id: input.id } });
      if (!user) throw new Error("User not found");

      const isValid = await bcrypt.compare(input.oldPassword, user.password);
      if (!isValid) throw new Error("Wrong password");

      const hashed = await bcrypt.hash(input.newPassword, 10);

      await prisma.user.update({
        where: { id: input.id },
        data: { password: hashed },
      });

      return { success: true };
    }),

  deleteById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ input }) => {
      await prisma.user.delete({ where: { id: input.id } });
      return { success: true };
    }),
});
