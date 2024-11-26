/*
  Warnings:

  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "age",
DROP COLUMN "name",
ADD COLUMN     "birthday" TIMESTAMP(0),
ADD COLUMN     "firstName" VARCHAR(256),
ADD COLUMN     "lastName" VARCHAR(256);
