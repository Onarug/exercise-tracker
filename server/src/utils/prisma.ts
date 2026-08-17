import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

import { PrismaClient } from '../generated/prisma/client.js'
import { PrismaNeon } from '@prisma/adapter-neon'

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const disconnectDB = async () => {
    await prisma.$disconnect();
};

const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

export {prisma,disconnectDB}

