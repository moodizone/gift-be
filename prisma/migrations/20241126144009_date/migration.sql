/*
  Warnings:

  - The `age` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createAt" SET DATA TYPE TIMESTAMP(0),
DROP COLUMN "age",
ADD COLUMN     "age" TIMESTAMP(0);
