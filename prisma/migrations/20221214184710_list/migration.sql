/*
  Warnings:

  - You are about to drop the column `wishlistId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `wishlistId` on the `WishItem` table. All the data in the column will be lost.
  - You are about to drop the column `whistListName` on the `Wishlist` table. All the data in the column will be lost.
  - Added the required column `listId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listId` to the `WishItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listName` to the `Wishlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WishItem" DROP CONSTRAINT "WishItem_wishlistId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "wishlistId",
ADD COLUMN     "listId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "WishItem" DROP COLUMN "wishlistId",
ADD COLUMN     "listId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Wishlist" DROP COLUMN "whistListName",
ADD COLUMN     "listName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "WishItem" ADD CONSTRAINT "WishItem_listId_fkey" FOREIGN KEY ("listId") REFERENCES "Wishlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
