import {  PrismaModule, createModule } from '@todo/db-prisma'

export type Context = PrismaModule

export const createContext = createModule
