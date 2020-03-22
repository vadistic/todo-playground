import { PrismaClient } from '@prisma/client'
import { createServices } from './services'

export interface DbPrisma {
  prisma: PrismaClient
  services: ReturnType<typeof createServices>
}

export const createDb = async (): Promise<DbPrisma> => {
  const prisma = new PrismaClient()

  // await prisma.connect()

  const services = createServices(prisma)

  return {
    prisma,
    services,
  }
}
