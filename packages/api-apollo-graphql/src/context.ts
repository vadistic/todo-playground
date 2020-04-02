import { createDb, PrismaDb } from '@todo/db-prisma'

export type Context = PrismaDb

export const createContext = createDb
