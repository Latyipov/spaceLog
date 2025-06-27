import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { entryRouter } from "./routers/entry";
import { healthRouter } from "./routers/health";
import { userRouter } from "./routers/user";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  entry: entryRouter,
  health: healthRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
