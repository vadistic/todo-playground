export const getDbUrl = (name: string, host: string) => `mongodb://${host}/${name}`

const DB_NAME = process.env.DB_NAME || 'dev'
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_PORT = process.env.DB_PORT || '21017'

const DB_URL = process.env.DB_URL || getDbUrl(DB_NAME, DB_HOST)

export const CONFIG = {
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_URL,
}
