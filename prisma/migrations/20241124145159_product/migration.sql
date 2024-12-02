/*
  Warnings:

  - You are about to drop the column `productId` on the `ProductTag` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `ProductTag` table. All the data in the column will be lost.
  - Added the required column `label` to the `ProductTag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "subCategoryIds" INTEGER[];

-- AlterTable
ALTER TABLE "ProductTag" DROP COLUMN "productId",
DROP COLUMN "tag",
ADD COLUMN     "label" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TagsOnProducts" (
    "tagId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "TagsOnProducts_pkey" PRIMARY KEY ("tagId","productId")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentCategoryId_fkey" FOREIGN KEY ("parentCategoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnProducts" ADD CONSTRAINT "TagsOnProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnProducts" ADD CONSTRAINT "TagsOnProducts_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "ProductTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
