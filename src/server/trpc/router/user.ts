import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../prisma";
import { publicProcedure, router } from "../trpc";

const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  email: true,
  whishlist: true,
  name: true,
});

export const userRouter = router({
  getUser: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async () => {
      const items = await prisma.user.findMany({
        select: defaultUserSelect,
        where: {},
      });
      return {
        items: items.reverse(),
      };
    }),
});
