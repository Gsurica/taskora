import { PrismaClient } from '@prisma/client';

export const database: PrismaClient = new PrismaClient();
