import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../prisma";
import { publicProcedure, router } from "../trpc";

const defaultWhishlistSelect = Prisma.validator<Prisma.WhishlistSelect>()({
  id: true,
  author: true,
  authorId: true,
  whistListName: true,
  whishlistItem: true,
  dueDate: true,
  belongsToUser: true,
  _count: true,
});

export const wishlistRouter = router({
  getAllWishlists: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async () => {
      const items = await prisma.whishlist.findMany({
        select: defaultWhishlistSelect,
        where: {},
      });
      return {
        items: items.reverse(),
      };
    }),
});
