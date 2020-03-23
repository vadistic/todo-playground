export const DB_NAME = process.env.DB_NAME || 'dev'
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_PORT = process.env.DB_PORT || '21017'

export const DB_URL = process.env.DB_URL || `mongodb://${DB_HOST}/${DB_NAME}`
