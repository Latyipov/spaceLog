import { createTRPCRouter } from "./trpc";
import { entryRouter } from "./routers/entry";
import { userRouter } from "./routers/user";

export const appRouter = createTRPCRouter({
  entry: entryRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
