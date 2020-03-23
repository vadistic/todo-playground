import { PrismaClient } from '@prisma/client'
import { createServices } from './services'

export interface PrismaModule {
  prisma: PrismaClient
  services: ReturnType<typeof createServices>
}

export const createModule = async (): Promise<PrismaModule> => {
  const prisma = new PrismaClient()

  await prisma.connect()

  const services = createServices(prisma)

  return {
    prisma,
    services,
  }
}
