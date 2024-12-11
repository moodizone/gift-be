/*
  Warnings:

  - A unique constraint covering the columns `[sourceProductId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_sourceProductId_key" ON "Product"("sourceProductId");
