import { createTRPCRouter } from "@/server/api/trpc";
import { exampleRouter } from "@/server/api/routers/example";
import { foodTypeRouter } from "./routers/foodType";
import { activityTypeRouter } from "./routers/activityType";
import { voteRouter } from "./routers/vote";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  foodType: foodTypeRouter,
  activityType: activityTypeRouter,
  vote: voteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
