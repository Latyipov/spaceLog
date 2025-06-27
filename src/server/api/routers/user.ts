import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const userRouter = createTRPCRouter({
  updateName: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.upsert({
        where: { email: input.email },
        update: { name: input.name },
        create: {
          email: input.email,
          name: input.name,
        },
      });
      return user;
    }),
  helloById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: { id: input.id },
      });

      if (!user || !user.name) {
        return { message: "Пользователь не найден" };
      }

      return { message: `Привет, ${user.name}!` };
    }),
});
