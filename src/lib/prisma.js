const { PrismaClient } = require('@prisma/client');

const prismaClientSingleton = () => new PrismaClient();

const globalForPrisma = globalThis || global;

const prisma = globalForPrisma.prisma || prismaClientSingleton();

module.exports = prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
