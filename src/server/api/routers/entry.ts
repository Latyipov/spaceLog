import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const entryRouter = createTRPCRouter({
  list: publicProcedure.query(() => {
    return prisma.entry.findMany({
      include: { user: true },
    });
  }),

  create: publicProcedure
    .input(
      z.object({
        userId: z.string(), // либо получай из сессии
        title: z.string(),
        mediaUrl: z.string().url(),
        date: z.string(),
        explanation: z.string(),
        comment: z.string().optional(),
        tags: z.array(z.string()),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.entry.create({
        data: {
          ...input,
          date: new Date(input.date),
        },
      });
    }),
});
