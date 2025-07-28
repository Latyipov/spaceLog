import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  createEntrySchema,
  updateEntrySchema,
  GetByIdOrDeleteEntrySchema,
} from "@/zodSchemas";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";

export const entryRouter = createTRPCRouter({
  createEntry: protectedProcedure
    .input(createEntrySchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      try {
        const entry = await ctx.prisma.entry.create({
          data: {
            userId,
            date: new Date(input.date),
            title: input.title,
            explanation: input.explanation,
            url: input.url,
            hdurl: input.hdurl ?? null,
            media_type: input.media_type,
            comment: input.comment ?? null,
            tags: input.tags ?? [],
            type: input.type,
          },
        });
        return { success: true, entry };
      } catch (error) {
        console.log(error instanceof PrismaClientKnownRequestError);
        if (
          typeof error === "object" &&
          error !== null &&
          "code" in error &&
          error.code === "P2002"
        ) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "This entry has already been created before.",
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unexpected server error",
          cause: error,
        });
      }
    }),

  getAllEntries: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return await ctx.prisma.entry.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
  }),

  getEntryById: protectedProcedure
    .input(GetByIdOrDeleteEntrySchema)
    .query(async ({ input, ctx }) => {
      const entry = await ctx.prisma.entry.findUnique({
        where: { id: input.id },
      });
      if (!entry) {
        throw new Error("Not found");
      }
      if (entry.userId !== ctx.session.user.id) {
        throw new Error("Unauthorized");
      }
      return entry;
    }),

  updateEntry: protectedProcedure
    .input(updateEntrySchema)
    .mutation(async ({ input, ctx }) => {
      const entry = await ctx.prisma.entry.findUnique({
        where: { id: input.id },
      });
      if (!entry) {
        throw new Error("Not found");
      }
      if (entry.userId !== ctx.session.user.id) {
        throw new Error("Unauthorized");
      }
      const updated = await ctx.prisma.entry.update({
        where: { id: input.id },
        data: {
          comment: input.comment,
          tags: input.tags,
        },
      });
      return { success: true, entry: updated };
    }),

  deleteEntry: protectedProcedure
    .input(GetByIdOrDeleteEntrySchema)
    .mutation(async ({ input, ctx }) => {
      const entry = await ctx.prisma.entry.findUnique({
        where: { id: input.id },
      });
      if (!entry) {
        throw new Error("Not found");
      }
      if (entry.userId !== ctx.session.user.id) {
        throw new Error("Unauthorized");
      }
      await ctx.prisma.entry.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),
});
