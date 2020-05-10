import { MarshallDb, createDb } from '@todo/db-marshall'

export type Context = MarshallDb

export const createContext = createDb
