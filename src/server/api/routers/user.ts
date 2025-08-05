import {
  userSchema,
  updateNameUserSchema,
  updateEmailUserSchema,
  updatePasswordUserSchema,
} from "@/zodSchemas";
import bcrypt from "bcryptjs";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const userRouter = createTRPCRouter({
  createNewUser: publicProcedure
    .input(userSchema)
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

  getUserById: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const user = await ctx.prisma.user.findUnique({
      where: { id: userId },
      select: {
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
    .input(updateNameUserSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const updated = await ctx.prisma.user.update({
        where: { id: userId },
        data: { name: input.name },
      });
      return { success: true, name: updated.name };
    }),

  updateEmail: protectedProcedure
    .input(updateEmailUserSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const existing = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      });
      if (existing) throw new Error("this email is already registered");

      const updated = await prisma.user.update({
        where: { id: userId },
        data: { email: input.email },
      });

      return { success: true, email: updated.email };
    }),

  updatePassword: protectedProcedure
    .input(updatePasswordUserSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error("User not found");

      const isValid = await bcrypt.compare(input.oldPassword, user.password);
      if (!isValid) throw new Error("Wrong password");

      const hashed = await bcrypt.hash(input.newPassword, 10);

      await prisma.user.update({
        where: { id: userId },
        data: { password: hashed },
      });

      return { success: true };
    }),

  deleteById: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    await ctx.prisma.entry.deleteMany({
      where: { userId },
    });
    await ctx.prisma.user.delete({ where: { id: userId } });
    return { success: true };
  }),
});
