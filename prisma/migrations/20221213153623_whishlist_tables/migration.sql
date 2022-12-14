/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Whishlist" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "whistListName" TEXT NOT NULL,

    CONSTRAINT "Whishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhistItem" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT,
    "priority" SERIAL NOT NULL,
    "whishlistId" INTEGER,

    CONSTRAINT "WhistItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Whishlist" ADD CONSTRAINT "Whishlist_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhistItem" ADD CONSTRAINT "WhistItem_whishlistId_fkey" FOREIGN KEY ("whishlistId") REFERENCES "Whishlist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
