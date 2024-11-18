import { PrismaClient, gender } from "@prisma/client";

// ensure that PrismaClient is instantiated only once for the app lifecycle.
const prisma = new PrismaClient({
  log: process.env.NODE_Env === "development" ? ["info"] : undefined,
});

async function checkConnection() {
  try {
    await prisma.$connect();
    console.log(`✅ Prisma connected to the database successfully!`);
  } catch (error) {
    console.error(`🚫 Prisma can not connect to the database:\n`, error);
  } finally {
    await prisma.$disconnect();
  }
}

checkConnection();

export default prisma;
