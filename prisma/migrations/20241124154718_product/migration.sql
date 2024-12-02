/*
  Warnings:

  - You are about to drop the column `parentCategoryId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `subCategoryIds` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `availability` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `reviewsCount` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - The primary key for the `ProductTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProductTag` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `ProductTag` table. All the data in the column will be lost.
  - You are about to drop the `ProductPriceHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagsOnProducts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createBy` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `ProductTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagId` to the `ProductTag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parentCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductPriceHistory" DROP CONSTRAINT "ProductPriceHistory_productId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnProducts" DROP CONSTRAINT "TagsOnProducts_productId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnProducts" DROP CONSTRAINT "TagsOnProducts_tagId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "parentCategoryId",
DROP COLUMN "subCategoryIds",
ADD COLUMN     "subCategories" INTEGER[],
ADD COLUMN     "superCategory" INTEGER;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "availability",
DROP COLUMN "reviewsCount",
ADD COLUMN     "createBy" INTEGER NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(256);

-- AlterTable
ALTER TABLE "ProductTag" DROP CONSTRAINT "ProductTag_pkey",
DROP COLUMN "id",
DROP COLUMN "label",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "tagId" INTEGER NOT NULL,
ADD CONSTRAINT "ProductTag_pkey" PRIMARY KEY ("tagId", "productId");

-- DropTable
DROP TABLE "ProductPriceHistory";

-- DropTable
DROP TABLE "TagsOnProducts";

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "author" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isChecked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceHistory" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PriceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_author_fkey" FOREIGN KEY ("author") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_superCategory_fkey" FOREIGN KEY ("superCategory") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTag" ADD CONSTRAINT "ProductTag_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTag" ADD CONSTRAINT "ProductTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
