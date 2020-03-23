import path from 'path'

export const getDbFile = (dbName: string): string => path.join(process.cwd(), `temp/${dbName}.db`)
export const getDbUrl = (dbName: string): string => `file:temp/${dbName}.db`

const DB_NAME = process.env.DB_NAME || 'dev'
const DB_FILE = process.env.DB_NAME || getDbFile(DB_NAME)
const DB_URL = process.env.DB_URL || getDbUrl(DB_NAME)

export const CONFIG = {
  DB_NAME,
  DB_FILE,
  DB_URL,
}
