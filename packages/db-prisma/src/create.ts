import { PrismaClient, PrismaClientOptions } from '@prisma/client'
import { createServices } from './services'

export interface PrismaModule {
  prisma: PrismaClient
  services: ReturnType<typeof createServices>
}

export const createModule = async (): Promise<PrismaModule> => {
  // ! do not use log/loglevel config or tests hang for some reason....
  const opts: PrismaClientOptions = {}

  const prisma = new PrismaClient(opts)

  await prisma.connect()

  const services = createServices(prisma)

  return {
    prisma,
    services,
  }
}
