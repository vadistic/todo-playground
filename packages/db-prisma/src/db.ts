import { DbBase, seedAll } from '@todo/lib-db'

import { config } from './config'
import { PrismaClient, PrismaClientOptions } from './generated/client'
import { Service } from './service'

export interface PrismaDb extends DbBase {
  prisma: PrismaClient
  service: Service
}

export const createDb = async (): Promise<PrismaDb> => {
  // ! do not use log/loglevel config or tests hang for some reason....
  const opts: PrismaClientOptions = { __internal: { debug: config.debug } }

  const prisma = new PrismaClient(opts)

  const service = new Service(prisma)

  await prisma.connect()

  const connect = async () => {
    await prisma.connect()
  }

  const close = async () => {
    await prisma.disconnect()
  }

  const sync = async () => {
    // manually
  }

  const drop = async () => {
    await prisma.task.deleteMany({})
  }

  const seed = async () => {
    await seedAll(service)
  }

  const isConnected = () => {
    return true
  }

  return {
    prisma,
    service,
    connect,
    close,
    isConnected,
    sync,
    drop,
    seed,
  }
}
