import { initTRPC } from "@trpc/server";
import { prisma } from "@/server/db";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";

export const createContext = (opts: CreateNextContextOptions) => ({});
type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
