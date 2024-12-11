/*
  Warnings:

  - You are about to drop the column `images` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `priceId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `scrapedAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sourceId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `PriceHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Source` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PriceHistory" DROP CONSTRAINT "PriceHistory_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sourceId_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "images",
DROP COLUMN "priceId",
DROP COLUMN "scrapedAt",
DROP COLUMN "sourceId",
DROP COLUMN "updatedAt",
ADD COLUMN     "alt" TEXT,
ADD COLUMN     "pics" TEXT[],
ADD COLUMN     "price" DOUBLE PRECISION,
ADD COLUMN     "rateCount" INTEGER,
ADD COLUMN     "sourceLink" TEXT,
ADD COLUMN     "sourceName" TEXT,
ADD COLUMN     "thumbnail" TEXT;

-- DropTable
DROP TABLE "PriceHistory";

-- DropTable
DROP TABLE "Source";
