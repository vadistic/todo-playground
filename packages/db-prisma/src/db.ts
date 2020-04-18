import { DbBase, seedAll } from '@todo/lib-db'

import { PrismaClient, PrismaClientOptions } from './generated/client'
import { Service } from './service'

export interface PrismaDb extends DbBase {
  prisma: PrismaClient
  service: Service
}

export const createDb = async (): Promise<PrismaDb> => {
  // ! do not use log/loglevel config or tests hang for some reason....
  const opts: PrismaClientOptions = {}

  const prisma = new PrismaClient(opts)

  const service = new Service(prisma)

  const connect = async () => {
    await prisma.connect()
  }

  const close = async () => {
    await prisma.disconnect()
  }

  const sync = async () => {
    console.warn('NOT IMPLEMENTED', 'sync()')
  }

  const drop = async () => {
    await prisma.task.deleteMany({})
  }

  const seed = async () => {
    await seedAll(service)
  }

  const isConnected = () => {
    console.warn('NOT IMPLEMENTED', 'isConnected()')

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
