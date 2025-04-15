import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create a new Prisma client or reuse the global one
const prisma = globalForPrisma.prisma ?? new PrismaClient();

// Assign the prisma instance to the global object in non-production environments
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Named export of the prisma instance
export { prisma };
