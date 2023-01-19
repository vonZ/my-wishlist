import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../prisma";
import { publicProcedure, router } from "../trpc";

const ValidationSchema = z.object({
  authorId: z.number(),
  listName: z
    .string()
    .min(3)
    .refine((data) => data.length > 3, {
      message: "Listnamnet behöver innehålla minst tre ord",
    }),
  dueDate: z.date(),
  belongsToUser: z.boolean(),
});

export type ListSchemaType = z.infer<typeof ValidationSchema>;

const defaultWhishlistSelect = Prisma.validator<Prisma.WishListSelect>()({
  id: true,
  author: true,
  authorId: true,
  listName: true,
  listItem: true,
  dueDate: true,
  belongsToUser: true,
  _count: true,
});

export const wishlistRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async () => {
      const items = await prisma.wishList.findMany({
        select: defaultWhishlistSelect,
        where: {},
      });
      return {
        items: items.reverse(),
      };
    }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const inputId = Number(id);
      const post = await prisma.wishList.findUnique({
        where: { id: inputId },
        select: defaultWhishlistSelect,
      });
      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No post with id '${id}'`,
        });
      }
      return post;
    }),
  add: publicProcedure.input(ValidationSchema).mutation(async ({ input }) => {
    const post = await prisma.wishList.create({
      data: input,
      select: defaultWhishlistSelect,
    });
    return post;
  }),
});
