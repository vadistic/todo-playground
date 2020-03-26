import { PrismaClient } from '@prisma/client'
import { createServices } from './services'

export interface PrismaModule {
  prisma: PrismaClient
  services: ReturnType<typeof createServices>
}

export const createModule = async (): Promise<PrismaModule> => {
  const prisma = new PrismaClient({
    log: [
      {
        level: 'info',
        emit: 'stdout',
      },
      {
        level: 'query',
        emit: 'stdout',
      },
      {
        level: 'warn',
        emit: 'event',
      },
    ],
  })

  await prisma.connect()

  const services = createServices(prisma)

  return {
    prisma,
    services,
  }
}
