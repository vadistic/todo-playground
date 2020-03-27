import { ModuleBase } from '@todo/shared-db'
import { PrismaClient, PrismaClientOptions } from '@prisma/client'
import { Services } from './services'

export interface PrismaModule extends ModuleBase {
  prisma: PrismaClient
  service: Services
}

export const createModule = async (): Promise<PrismaModule> => {
  // ! do not use log/loglevel config or tests hang for some reason....
  const opts: PrismaClientOptions = {}

  const prisma = new PrismaClient(opts)

  const service = new Services(prisma)

  const init = async () => {
    await prisma.connect()
  }

  const close = async () => {
    await prisma.disconnect()
  }

  await init()

  return {
    prisma,
    service,
    close,
  }
}
