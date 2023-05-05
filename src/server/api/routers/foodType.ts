import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const foodTypeRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.foodType.findMany();
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.foodType.create({
        data: {
          title: input.title,
        },
      });
    }),
});
