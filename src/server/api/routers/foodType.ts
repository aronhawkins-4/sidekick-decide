import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const foodTypeRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.foodType.findMany();
  }),
  create: publicProcedure
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
  delete: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.foodType.delete({
        where: {
          title: input.title,
        },
      });
    }),
});
