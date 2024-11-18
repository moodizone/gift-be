-- CreateEnum
CREATE TYPE "gender" AS ENUM ('male', 'female', 'others');

-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "accountStatus" AS ENUM ('active', 'deactive', 'suspended');

-- CreateTable
CREATE TABLE "User" (
    "tel" VARCHAR(256),
    "name" VARCHAR(256),
    "email" VARCHAR(256) NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "role" "userRole" NOT NULL DEFAULT 'user',
    "gender" "gender",
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "age" INTEGER,
    "profilePicture" TEXT,
    "accountStatus" "accountStatus" DEFAULT 'active',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tel" ON "User"("tel");

-- CreateIndex
CREATE UNIQUE INDEX "email" ON "User"("email");
