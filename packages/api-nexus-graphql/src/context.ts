import { createDb, DbPrisma, PrismaClient } from '@todo/db-prisma'

export const prisma = new PrismaClient()

export interface Context {
  db: DbPrisma
}

export const createContext = async (): Promise<Context> => {
  return { db: await createDb() }
}
