import { PrismaClient, gender } from "@prisma/client";

// Ensure that PrismaClient is instantiated only once for the app lifecycle.
const prisma = new PrismaClient();

export default prisma;
