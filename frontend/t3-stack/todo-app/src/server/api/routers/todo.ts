import {
  createTaskSchema,
  getSingleTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
} from "../../../schema/todo";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const todoRouter = createTRPCRouter({
  createTask: protectedProcedure
    .input(createTaskSchema)
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.create({
        data: {
          ...input,
          user: {
            connect: {
              id: ctx.session?.user?.id,
            },
          },
        },
      });
      return task;
    }),
});
