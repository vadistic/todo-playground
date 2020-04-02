import { PrismaDb, createDb } from '@todo/db-prisma'

export type Context = PrismaDb

export const createContext = createDb
