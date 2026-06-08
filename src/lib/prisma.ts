import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const globalForPrisma = globalThis as unknown as {
  prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
};

export const prisma = globalForPrisma.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prismaGlobal = prisma;
