import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const activityTypeRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.activityType.findMany();
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.activityType.create({
        data: {
          title: input.title,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.activityType.delete({
        where: {
          title: input.title,
        },
      });
    }),
});
