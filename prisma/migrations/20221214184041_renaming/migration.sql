/*
  Warnings:

  - You are about to drop the `Whishlist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WhistItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `wishlistId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Whishlist" DROP CONSTRAINT "Whishlist_authorId_fkey";

-- DropForeignKey
ALTER TABLE "WhistItem" DROP CONSTRAINT "WhistItem_whishlistId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "wishlistId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Whishlist";

-- DropTable
DROP TABLE "WhistItem";

-- CreateTable
CREATE TABLE "Wishlist" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "whistListName" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "belongsToUser" BOOLEAN NOT NULL,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishItem" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "priority" SERIAL NOT NULL,
    "wishlistId" INTEGER NOT NULL,
    "description" TEXT,
    "link" TEXT,

    CONSTRAINT "WishItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishItem" ADD CONSTRAINT "WishItem_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
