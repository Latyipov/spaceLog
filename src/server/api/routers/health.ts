import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const healthRouter = createTRPCRouter({
  dbOk: publicProcedure.query(async () => {
    const count = await prisma.user.count();
    return { message: "DB connected", users: count };
  }),
});
