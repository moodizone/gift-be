import { PrismaClient } from "@prisma/client";

const isDev = process.env.NODE_Env === "development";

// ensure that PrismaClient is instantiated only once for the app lifecycle.
const prisma = new PrismaClient({
  log: isDev
    ? [
        {
          emit: "event",
          level: "query",
        },
        {
          emit: "stdout",
          level: "error",
        },
        {
          emit: "stdout",
          level: "info",
        },
        {
          emit: "stdout",
          level: "warn",
        },
      ]
    : [],
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

// Add Middleware
if (isDev) {
  prisma.$on("query", (e) => {
    console.log("Query: " + e.query);
    console.log("Params: " + e.params);
    console.log("Duration: " + e.duration + "ms");
  });
}

export default prisma;
