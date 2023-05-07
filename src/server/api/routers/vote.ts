import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { Input } from "postcss";

export const voteRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.vote.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        votedForTitle: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.vote.create({
        data: {
          votedForTitle: input.votedForTitle,
        },
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.vote.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
