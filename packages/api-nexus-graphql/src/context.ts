import { PrismaClient, PrismaModule, createModule } from '@todo/db-prisma'

export const prisma = new PrismaClient()

export type Context = PrismaModule

export const createContext = async (): Promise<Context> => {
  return createModule()
}
