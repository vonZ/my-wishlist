import { publicProcedure, router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { userRouter } from "./user";
import { wishlistRouter } from "./wishlist";

export const appRouter = router({
  healthcheck: publicProcedure.query(() => "yay!"),
  example: exampleRouter,
  auth: authRouter,
  user: userRouter,
  wishlist: wishlistRouter,
});

export type AppRouter = typeof appRouter;
