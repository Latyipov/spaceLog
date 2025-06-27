import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return {
        message: `Привет, ${input.name ?? "мир"}!`,
      };
    }),

  greet: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(({ input }) => {
      return {
        message: `Добро пожаловать, ${input.name}!`,
      };
    }),
});
