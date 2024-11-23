-- CreateEnum
CREATE TYPE "language" AS ENUM ('en', 'fa');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "language" "language" DEFAULT 'fa';
