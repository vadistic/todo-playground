import { createDb, MarshallDb } from '@todo/db-marshall'

export type Context = MarshallDb

export const createContext = createDb
